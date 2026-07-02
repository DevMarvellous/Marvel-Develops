import nodemailer from 'nodemailer'
import { adminNotificationEmail, customerFollowUpEmail, type EmailSubmissionData } from '@/lib/server/email-templates'

function createTransport() {
  const user = process.env.GMAIL_USER
  const pass = process.env.GMAIL_APP_PASSWORD
  if (!user || !pass) throw new Error('GMAIL_USER and GMAIL_APP_PASSWORD must be set')
  return nodemailer.createTransport({
    service: 'gmail',
    auth: { user, pass },
  })
}

const FROM = () => `Marvel Develops <${process.env.GMAIL_USER}>`

export async function sendAdminNotification(data: EmailSubmissionData): Promise<void> {
  const transport = createTransport()
  const to = process.env.ADMIN_NOTIFICATION_EMAIL ?? process.env.GMAIL_USER!
  const { subject, html } = adminNotificationEmail(data)
  await transport.sendMail({ from: FROM(), to, subject, html })
}

// Note: Gmail SMTP has no scheduling — both emails send immediately.
// When marveldevelops.com is verified on Resend, restore email.ts to the
// Resend implementation and the 10-minute scheduledAt delay on the follow-up.
export async function scheduleCustomerFollowUp(data: EmailSubmissionData): Promise<void> {
  const transport = createTransport()
  const { subject, html } = customerFollowUpEmail(data)
  await transport.sendMail({ from: FROM(), to: data.email, subject, html })
}
