import { Resend } from 'resend'
import { adminNotificationEmail, customerFollowUpEmail, type EmailSubmissionData } from '@/lib/server/email-templates'

let resendClient: Resend | null = null

function getResendClient(): Resend {
  if (!resendClient) {
    const apiKey = process.env.RESEND_API_KEY
    if (!apiKey) {
      throw new Error('Resend API key is not configured')
    }
    resendClient = new Resend(apiKey)
  }
  return resendClient
}

const FOLLOW_UP_DELAY_MS = 10 * 60 * 1000

export async function sendAdminNotification(data: EmailSubmissionData): Promise<string | undefined> {
  const resend = getResendClient()
  const from = process.env.RESEND_FROM_EMAIL
  const to = process.env.ADMIN_NOTIFICATION_EMAIL
  if (!from || !to) {
    console.error('RESEND_FROM_EMAIL or ADMIN_NOTIFICATION_EMAIL is not configured')
    return undefined
  }

  const { subject, html } = adminNotificationEmail(data)
  const { data: result, error } = await resend.emails.send({ from, to, subject, html })

  if (error) {
    console.error('Failed to send admin notification email:', error)
    return undefined
  }
  return result?.id
}

export async function scheduleCustomerFollowUp(
  data: EmailSubmissionData
): Promise<{ id?: string; scheduledFor: string } | undefined> {
  const resend = getResendClient()
  const from = process.env.RESEND_FROM_EMAIL
  if (!from) {
    console.error('RESEND_FROM_EMAIL is not configured')
    return undefined
  }

  const scheduledFor = new Date(Date.now() + FOLLOW_UP_DELAY_MS).toISOString()
  const { subject, html } = customerFollowUpEmail(data)
  const { data: result, error } = await resend.emails.send({
    from,
    to: data.email,
    subject,
    html,
    scheduledAt: scheduledFor,
  })

  if (error) {
    console.error('Failed to schedule customer follow-up email:', error)
    return undefined
  }
  return { id: result?.id, scheduledFor }
}
