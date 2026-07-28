import { NextResponse } from 'next/server'
import { sendMessage } from '@/lib/server/gemini'
import { getClientIp, isRateLimited } from '@/lib/server/rate-limit'
import type { Message } from '@/lib/types'

export async function POST(request: Request) {
  const ip = getClientIp(request)
  if (isRateLimited(ip)) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 })
  }

  const body = await request.json().catch(() => null)
  const history = body?.history as Message[] | undefined
  const message = body?.message as string | undefined
  const pageContext = (body?.pageContext as 'agency' | 'academy' | undefined) ?? 'agency'

  if (!message || typeof message !== 'string') {
    return NextResponse.json({ error: 'Message is required' }, { status: 400 })
  }

  try {
    const reply = await sendMessage(history ?? [], message, pageContext)
    return NextResponse.json({ reply })
  } catch (error) {
    console.error('Chat route error:', error)
    return NextResponse.json({ error: 'Failed to get a response' }, { status: 500 })
  }
}

