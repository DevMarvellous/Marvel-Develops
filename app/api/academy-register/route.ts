import { NextResponse } from 'next/server'
import { z } from 'zod'
import { getClientIp, isRateLimited } from '@/lib/server/rate-limit'
import { academyRegistrationEmail, academyConfirmationEmail } from '@/lib/server/email-templates'
import nodemailer from 'nodemailer'

const academySchema = z.object({
  fullName: z.string().min(1).max(200),
  phone: z.string().min(1).max(40),
  email: z.string().email(), // required — needed for confirmation email
  registeringFor: z.string().min(1).max(100),
  message: z.string().max(2000).optional(),
  honeypot: z.string().optional(),
})

function createTransport() {
  const user = process.env.BREVO_SMTP_USER
  const pass = process.env.BREVO_SMTP_KEY
  if (!user || !pass) throw new Error('BREVO_SMTP_USER and BREVO_SMTP_KEY must be set')
  return nodemailer.createTransport({
    host: 'smtp-relay.brevo.com',
    port: 587,
    secure: false,
    auth: { user, pass },
  })
}

const FROM = 'Marvel Develops Academy <marveldevelops@gmail.com>'

export async function POST(request: Request) {
  const ip = getClientIp(request)
  if (isRateLimited(ip)) {
    return NextResponse.json({ ok: false, error: 'Too many requests' }, { status: 429 })
  }

  const body = await request.json().catch(() => null)
  const parsed = academySchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: 'Invalid submission' }, { status: 400 })
  }

  const data = parsed.data

  // Honeypot — silently discard bot submissions
  if (data.honeypot) {
    return NextResponse.json({ ok: true })
  }

  try {
    const transport = createTransport()
    const adminTo = process.env.ADMIN_NOTIFICATION_EMAIL!

    const registrationData = {
      fullName: data.fullName,
      phone: data.phone,
      email: data.email,
      registeringFor: data.registeringFor,
      message: data.message || null,
    }

    // Send both emails in parallel:
    // 1. Admin notification (to ADMIN_NOTIFICATION_EMAIL)
    // 2. Registrant confirmation (to their email address)
    const { subject: adminSubject, html: adminHtml } = academyRegistrationEmail(registrationData)
    const { subject: confirmSubject, html: confirmHtml } = academyConfirmationEmail(registrationData)

    await Promise.all([
      transport.sendMail({ from: FROM, to: adminTo, subject: adminSubject, html: adminHtml }),
      transport.sendMail({ from: FROM, to: data.email, subject: confirmSubject, html: confirmHtml }),
    ])

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('Academy register route error:', error)
    return NextResponse.json({ ok: false, error: 'Something went wrong' }, { status: 500 })
  }
}

