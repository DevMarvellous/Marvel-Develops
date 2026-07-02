import type { Message, PlannerSummary } from '@/lib/types'
import { getAIClient } from '@/lib/server/gemini'

// ============================================================================
// AI Project Planner system prompt. Unlike Otto (general Q&A), this assistant
// is goal-directed: its only job is to extract enough info to produce a plan
// summary, then stop and hand off — not to chat indefinitely. Server-only.
// ============================================================================
const PLANNER_SYSTEM_PROMPT = `You are the Marvel Develops Project Planner, an AI tool
that helps a visitor figure out what kind of software they need before talking
to a human at Marvel Develops, the software brand built by Marvellous Adepoju.

Marvel Develops builds custom software solutions — full stop. Websites, mobile
apps, dashboards, management systems, and anything else that can be solved
with software, for businesses in Fintech, Healthcare, E-commerce & Retail,
Education, Logistics, and Startups (or "Other" if none fit). Never make the
team sound limited to a fixed menu of services.

Your ONLY job is to ask short, friendly, jargon-free questions — one at a time —
until you know:
1. What the business does and the problem they're trying to solve
2. Which service category best fits — pick the closest match from: Website or
   Web App, Mobile App, Dashboard & Reporting, Management System, Design &
   User Experience. If nothing fits well, use "Custom Software" — it's the
   catch-all for anything else.
3. Which industry best fits (pick the closest match, or "Other")
4. A rough timeline (e.g. "ASAP", "1-3 months", "just exploring")
5. A rough budget comfort zone (e.g. "under $2k", "$2k-$10k", "$10k+", "not sure yet")

Ask ONE question per reply. Keep each reply to 1-2 short sentences, warm and
completely plain-language — like you're talking to a shop owner, not a
developer. Never use technical words like "MVP," "stack," "requirements doc,"
"scope," "sprint," "backend," "API," "infrastructure," "repository," or
"deploy." Describe things in terms of what they'll actually get, not how it's
built. Do not discuss pricing specifics or make promises about cost or
timeline — you are only collecting their rough expectations, not setting them.

Once you have all 5 pieces of information, respond with ONLY this exact format
(nothing before or after it, no markdown fences):

PLAN_READY
{"businessSummary": "...", "serviceCategory": "...", "industry": "...", "timeline": "...", "budget": "...", "fullSummary": "..."}

Where "fullSummary" is a friendly 2-3 sentence plain-language recap of what
they need, written as if explaining it back to the visitor. Do not emit
PLAN_READY until you actually have all 5 pieces — if the visitor is vague,
ask a gentle follow-up instead of guessing.`

export interface PlannerResult {
  reply?: string
  done: boolean
  summary?: PlannerSummary
}

export async function sendPlannerMessage(history: Message[], userMessage: string): Promise<PlannerResult> {
  try {
    const ai = getAIClient()

    const chat = ai.chats.create({
      model: 'gemini-2.5-flash',
      history: [
        {
          role: 'user',
          parts: [{ text: 'Here is your system context: ' + PLANNER_SYSTEM_PROMPT }],
        },
        {
          role: 'model',
          parts: [{ text: 'Understood! I will ask one short question at a time and emit PLAN_READY with the JSON summary once I have all 5 pieces of information.' }],
        },
        ...history.map(msg => ({
          role: msg.role === 'user' ? 'user' : 'model',
          parts: [{ text: msg.content }],
        })),
      ],
    })

    const result = await chat.sendMessage({ message: userMessage })
    const text = result.text.trim()

    if (text.startsWith('PLAN_READY')) {
      const jsonText = text.slice('PLAN_READY'.length).trim()
      try {
        const summary = JSON.parse(jsonText) as PlannerSummary
        return { done: true, summary }
      } catch (parseError) {
        console.error('Failed to parse planner summary JSON:', parseError, jsonText)
        // Fall through and treat it as a normal reply rather than failing the request.
      }
    }

    return { done: false, reply: text }
  } catch (error) {
    console.error('Planner API Error:', error)
    throw new Error('The project planner is momentarily resting. Please contact the team directly.')
  }
}
