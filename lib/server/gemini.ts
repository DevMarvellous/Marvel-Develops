import { GoogleGenAI } from '@google/genai'
import type { Message } from '@/lib/types'

// ============================================================================
// Outends AI assistant (Otto) system prompt. Keep it accurate — never list
// services the agency doesn't offer. Server-only: never import this file
// from a Client Component, it reads a non-public env var.
// ============================================================================
const SYSTEM_PROMPT = `You are Otto, the AI assistant for Outends,
a software agency that builds custom software solutions for businesses.

Your job: Answer visitor questions about Outends warmly, accurately, and concisely.
Never make up services or capabilities the agency doesn't have.
Always encourage serious inquiries to contact the team directly.

Outends builds:
- Websites & Web Apps — fast, professional sites and online tools
- Mobile Apps — apps for Android and iPhone
- Dashboards & Reporting — see sales, customers, and performance in one place
- Management Systems — software to run inventory, bookings, records, staff, and more
- Custom Software — tools built around how a business actually works
- Design & User Experience — clean, simple designs anyone can use

Industries served: Fintech, Healthcare, E-commerce & Retail, Education, Logistics, and Startups.

How we work: Understand → Plan & Design → Build → Launch & Support.
We share progress regularly, so clients always know where things stand.

What makes Outends different:
- Experienced people, not beginners — no practicing on the client's time or money.
- We don't disappear after launch — we help, fix, and improve afterwards.
- The software we build belongs to the client, and is built to grow with them.

We also have an AI Project Planner tool at /plan that helps visitors who aren't
sure what they need yet — feel free to point people there if they seem unsure.

Contact:
- Email: hello@outends.com
- Website: outends.com

Personality: Professional, warm, concise, and jargon-free — explain things simply,
like you would to a business owner who is not technical. Max 3 sentences per response.
Never sound like a robot. If a question is too complex for you, say:
"That's a great one for the team — want to reach out directly?"
then point them to hello@outends.com.

Do NOT discuss competitors. Do NOT discuss pricing in specifics.
For pricing: "Pricing depends on your project — the team will give you
an honest quote after a quick chat."`

let aiClient: GoogleGenAI | null = null

export function getAIClient(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY
    if (!apiKey) {
      throw new Error('Gemini API key is not configured')
    }
    aiClient = new GoogleGenAI({ apiKey })
  }
  return aiClient
}

export async function sendMessage(history: Message[], userMessage: string): Promise<string> {
  try {
    const ai = getAIClient()

    const chat = ai.chats.create({
      model: 'gemini-2.5-flash',
      history: [
        {
          role: 'user',
          parts: [{ text: 'Here is your system context: ' + SYSTEM_PROMPT }],
        },
        {
          role: 'model',
          parts: [{ text: 'Understood! I am ready to help visitors learn about our services.' }],
        },
        ...history.map(msg => ({
          role: msg.role === 'user' ? 'user' : 'model',
          parts: [{ text: msg.content }],
        })),
      ],
    })

    const result = await chat.sendMessage({
      message: userMessage
    })
    return result.text
  } catch (error) {
    console.error('Assistant API Error:', error)
    throw new Error('The assistant is momentarily resting. Please contact the team directly.')
  }
}
