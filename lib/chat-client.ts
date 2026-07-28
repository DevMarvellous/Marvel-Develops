import type { Message } from '@/lib/types'

export async function sendChatMessage(
  history: Message[],
  userMessage: string,
  pageContext: 'agency' | 'academy' = 'agency'
): Promise<string> {
  const res = await fetch('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ history, message: userMessage, pageContext }),
  })

  if (!res.ok) {
    throw new Error('Failed to get a response')
  }

  const data = await res.json()
  return data.reply as string
}

