import type { SubmissionSource } from '@/lib/server/supabase'

export interface EmailSubmissionData {
  source: SubmissionSource
  fullName: string
  businessName?: string | null
  email: string
  whatsapp?: string | null
  industry?: string | null
  service?: string | null
  message: string
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

const sourceLabel = (source: SubmissionSource) =>
  source === 'ai_planner' ? 'AI Project Planner' : 'Contact Form'

export function adminNotificationEmail(data: EmailSubmissionData): { subject: string; html: string } {
  const rows: Array<[string, string | null | undefined]> = [
    ['Source', sourceLabel(data.source)],
    ['Name', data.fullName],
    ['Business', data.businessName],
    ['Email', data.email],
    ['WhatsApp', data.whatsapp],
    ['Industry', data.industry],
    ['Service', data.service],
  ]

  const rowsHtml = rows
    .filter(([, value]) => Boolean(value))
    .map(
      ([label, value]) =>
        `<tr><td style="padding:6px 12px;color:#64748B;font-size:13px;">${escapeHtml(label)}</td><td style="padding:6px 12px;font-size:14px;color:#0F172A;">${escapeHtml(String(value))}</td></tr>`
    )
    .join('')

  return {
    subject: `New ${sourceLabel(data.source)} lead — ${data.fullName}`,
    html: `
      <div style="font-family:sans-serif;max-width:560px;margin:0 auto;">
        <h2 style="color:#0F172A;">New lead from ${escapeHtml(sourceLabel(data.source))}</h2>
        <table style="border-collapse:collapse;width:100%;margin-bottom:16px;">${rowsHtml}</table>
        <p style="color:#64748B;font-size:13px;margin-bottom:4px;">Message</p>
        <p style="font-size:14px;color:#0F172A;white-space:pre-wrap;">${escapeHtml(data.message)}</p>
      </div>
    `,
  }
}

export function customerFollowUpEmail(data: EmailSubmissionData): { subject: string; html: string } {
  return {
    subject: `Thanks for reaching out, ${data.fullName.split(' ')[0]} — here's what happens next`,
    html: `
      <div style="font-family:sans-serif;max-width:560px;margin:0 auto;color:#0F172A;">
        <p>Hi ${escapeHtml(data.fullName.split(' ')[0])},</p>
        <p>Thanks for telling us about your project — we've got it, and a real
        person from the Outends team will get back to you within 24 hours.</p>
        <p style="color:#64748B;font-size:13px;margin-bottom:4px;">What you told us:</p>
        <p style="font-size:14px;white-space:pre-wrap;">${escapeHtml(data.message)}</p>
        <p>Want to talk sooner? Chat with us directly on WhatsApp:</p>
        <p>
          <a href="https://wa.me/2349030891731" style="color:#4F46E5;font-weight:600;">
            wa.me/2349030891731
          </a>
        </p>
        <p style="color:#64748B;font-size:13px;">— The Outends team</p>
      </div>
    `,
  }
}
