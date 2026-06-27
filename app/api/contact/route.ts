import { NextResponse } from 'next/server'
import { z } from 'zod'
import { insertSubmission, recordEmailIds } from '@/lib/server/supabase'
import { sendAdminNotification, scheduleCustomerFollowUp } from '@/lib/server/email'
import { getClientIp, isRateLimited } from '@/lib/server/rate-limit'

const contactSchema = z.object({
  fullName: z.string().min(1).max(200),
  businessName: z.string().max(200).optional(),
  email: z.string().email(),
  whatsapp: z.string().min(1).max(40),
  industry: z.string().max(100).optional(),
  service: z.string().max(100).optional(),
  message: z.string().min(1).max(5000),
  honeypot: z.string().optional(),
})

export async function POST(request: Request) {
  const ip = getClientIp(request)
  if (isRateLimited(ip)) {
    return NextResponse.json({ ok: false, error: 'Too many requests' }, { status: 429 })
  }

  const body = await request.json().catch(() => null)
  const parsed = contactSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: 'Invalid submission' }, { status: 400 })
  }

  const data = parsed.data

  // Silently pretend success for bots that fill the honeypot field.
  if (data.honeypot) {
    return NextResponse.json({ ok: true })
  }

  try {
    const submission = await insertSubmission({
      source: 'contact_form',
      full_name: data.fullName,
      business_name: data.businessName,
      email: data.email,
      whatsapp: data.whatsapp,
      industry: data.industry,
      service: data.service,
      message: data.message,
    })

    const emailData = {
      source: 'contact_form' as const,
      fullName: data.fullName,
      businessName: data.businessName,
      email: data.email,
      whatsapp: data.whatsapp,
      industry: data.industry,
      service: data.service,
      message: data.message,
    }

    const [adminEmailId, followUp] = await Promise.all([
      sendAdminNotification(emailData),
      scheduleCustomerFollowUp(emailData),
    ])

    await recordEmailIds(submission.id, {
      admin_email_id: adminEmailId,
      customer_email_id: followUp?.id,
      customer_email_scheduled_for: followUp?.scheduledFor,
    }).catch((error) => console.error('Failed to record email ids:', error))

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('Contact route error:', error)
    return NextResponse.json({ ok: false, error: 'Something went wrong' }, { status: 500 })
  }
}
