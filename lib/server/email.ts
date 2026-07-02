import nodemailer from 'nodemailer'
import { adminNotificationEmail, customerFollowUpEmail, type EmailSubmissionData } from '@/lib/server/email-templates'

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

const FROM = 'Marvel Develops <marvellousadepoju79@gmail.com>'

export async function sendAdminNotification(data: EmailSubmissionData): Promise<void> {
  const transport = createTransport()
  const to = process.env.ADMIN_NOTIFICATION_EMAIL!
  const { subject, html } = adminNotificationEmail(data)
  await transport.sendMail({ from: FROM, to, subject, html })
}

// Note: Brevo SMTP sends immediately — no scheduling.
// When marveldevelops.com is verified on Resend, restore email.ts to the
// Resend implementation and the 10-minute scheduledAt delay on the follow-up.
export async function scheduleCustomerFollowUp(data: EmailSubmissionData): Promise<void> {
  const transport = createTransport()
  const { subject, html } = customerFollowUpEmail(data)
  await transport.sendMail({ from: FROM, to: data.email, subject, html })
}
