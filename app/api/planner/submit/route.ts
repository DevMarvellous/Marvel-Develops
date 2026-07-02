import { NextResponse } from 'next/server'
import { z } from 'zod'
import { sendAdminNotification, scheduleCustomerFollowUp } from '@/lib/server/email'
import { getClientIp, isRateLimited } from '@/lib/server/rate-limit'

const plannerSubmitSchema = z.object({
  fullName: z.string().min(1).max(200),
  email: z.string().email(),
  whatsapp: z.string().min(1).max(40),
  businessName: z.string().max(200).optional(),
  industry: z.string().max(100).optional(),
  service: z.string().max(100).optional(),
  summary: z.string().min(1).max(5000),
  details: z.record(z.string(), z.unknown()).optional(),
  honeypot: z.string().optional(),
})

export async function POST(request: Request) {
  const ip = getClientIp(request)
  if (isRateLimited(ip)) {
    return NextResponse.json({ ok: false, error: 'Too many requests' }, { status: 429 })
  }

  const body = await request.json().catch(() => null)
  const parsed = plannerSubmitSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: 'Invalid submission' }, { status: 400 })
  }

  const data = parsed.data

  if (data.honeypot) {
    return NextResponse.json({ ok: true })
  }

  try {
    const emailData = {
      source: 'ai_planner' as const,
      fullName: data.fullName,
      businessName: data.businessName,
      email: data.email,
      whatsapp: data.whatsapp,
      industry: data.industry,
      service: data.service,
      message: data.summary,
    }

    await Promise.all([
      sendAdminNotification(emailData),
      scheduleCustomerFollowUp(emailData),
    ])

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('Planner submit route error:', error)
    return NextResponse.json({ ok: false, error: 'Something went wrong' }, { status: 500 })
  }
}
