export type SubmissionSource = 'contact_form' | 'ai_planner' | 'academy_register'

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
  source === 'ai_planner'
    ? 'AI Project Planner'
    : source === 'academy_register'
    ? 'Academy Registration'
    : 'Contact Form'

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
        person from the Marvel Develops team will get back to you within 24 hours.</p>
        <p style="color:#64748B;font-size:13px;margin-bottom:4px;">What you told us:</p>
        <p style="font-size:14px;white-space:pre-wrap;">${escapeHtml(data.message)}</p>
        <p>Want to talk sooner? Chat with us directly on WhatsApp:</p>
        <p>
          <a href="https://wa.me/2349030891731" style="color:#4F46E5;font-weight:600;">
            wa.me/2349030891731
          </a>
        </p>
        <p style="color:#64748B;font-size:13px;">— The Marvel Develops team</p>
      </div>
    `,
  }
}

// ============================================================================
// Academy registration admin notification
// ============================================================================

export interface AcademyRegistrationData {
  fullName: string
  phone: string
  email: string
  registeringFor: string
  message?: string | null
}

export function academyRegistrationEmail(
  data: AcademyRegistrationData
): { subject: string; html: string } {
  const rows: Array<[string, string | null | undefined]> = [
    ['Name', data.fullName],
    ['Phone / WhatsApp', data.phone],
    ['Email', data.email],
    ['Registering for', data.registeringFor],
  ]

  const rowsHtml = rows
    .filter(([, value]) => Boolean(value))
    .map(
      ([label, value]) =>
        `<tr><td style="padding:6px 12px;color:#64748B;font-size:13px;">${escapeHtml(label)}</td><td style="padding:6px 12px;font-size:14px;color:#0F172A;">${escapeHtml(String(value))}</td></tr>`
    )
    .join('')

  return {
    subject: `🎓 New Academy Registration — ${data.fullName}`,
    html: `
      <div style="font-family:sans-serif;max-width:560px;margin:0 auto;">
        <h2 style="color:#0F172A;">New Academy Registration</h2>
        <p style="color:#64748B;font-size:13px;margin-bottom:12px;">Someone has registered interest in Marvel Develops Academy (August 2026 cohort).</p>
        <table style="border-collapse:collapse;width:100%;margin-bottom:16px;">${rowsHtml}</table>
        ${data.message ? `<p style="color:#64748B;font-size:13px;margin-bottom:4px;">Message</p><p style="font-size:14px;color:#0F172A;white-space:pre-wrap;">${escapeHtml(data.message)}</p>` : ''}
        <hr style="border:none;border-top:1px solid #E5E7EB;margin:20px 0;" />
        <p style="color:#64748B;font-size:12px;">Reply to this email or WhatsApp the registrant to follow up.</p>
      </div>
    `,
  }
}

// ============================================================================
// Academy registration — confirmation email sent TO THE REGISTRANT
// ============================================================================

export function academyConfirmationEmail(
  data: AcademyRegistrationData
): { subject: string; html: string } {
  const firstName = escapeHtml(data.fullName.split(' ')[0])

  return {
    subject: `You're registered! Marvel Develops Academy — August 2026`,
    html: `
      <div style="font-family:sans-serif;max-width:560px;margin:0 auto;color:#0F172A;">

        <!-- Header -->
        <div style="background:#0F172A;border-radius:16px 16px 0 0;padding:32px 32px 24px;text-align:center;">
          <p style="margin:0 0 4px;font-size:11px;letter-spacing:0.14em;text-transform:uppercase;color:#F59E0B;font-weight:600;">Marvel Develops</p>
          <h1 style="margin:0;font-size:26px;font-weight:800;color:#ffffff;letter-spacing:-0.5px;">Academy</h1>
          <p style="margin:12px 0 0;font-size:13px;color:rgba(255,255,255,0.55);">August 17, 2026 &nbsp;&middot;&nbsp; Online &nbsp;&middot;&nbsp; 8 Weeks</p>
        </div>

        <!-- Body -->
        <div style="border:1px solid #E5E7EB;border-top:none;border-radius:0 0 16px 16px;padding:32px;">
          <p style="margin:0 0 16px;">Hi ${firstName},</p>
          <p style="margin:0 0 16px;line-height:1.6;">You're in — we've received your registration for <strong>Marvel Develops Academy (August 2026 cohort)</strong>. We'll be in touch shortly with everything you need to know before the programme starts.</p>

          <!-- What you signed up for -->
          <div style="background:#F4F4F6;border-radius:12px;padding:20px;margin:20px 0;">
            <p style="margin:0 0 12px;font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:0.1em;color:#9CA3AF;">Your registration details</p>
            <table style="border-collapse:collapse;width:100%;">
              <tr>
                <td style="padding:4px 0;font-size:13px;color:#64748B;width:130px;">Name</td>
                <td style="padding:4px 0;font-size:14px;color:#0F172A;font-weight:500;">${escapeHtml(data.fullName)}</td>
              </tr>
              <tr>
                <td style="padding:4px 0;font-size:13px;color:#64748B;">Phone</td>
                <td style="padding:4px 0;font-size:14px;color:#0F172A;font-weight:500;">${escapeHtml(data.phone)}</td>
              </tr>
              <tr>
                <td style="padding:4px 0;font-size:13px;color:#64748B;">Registering for</td>
                <td style="padding:4px 0;font-size:14px;color:#0F172A;font-weight:500;">${escapeHtml(data.registeringFor)}</td>
              </tr>
              <tr>
                <td style="padding:4px 0;font-size:13px;color:#64748B;">Start date</td>
                <td style="padding:4px 0;font-size:14px;color:#0F172A;font-weight:500;">Monday, August 17, 2026</td>
              </tr>
              <tr>
                <td style="padding:4px 0;font-size:13px;color:#64748B;">Format</td>
                <td style="padding:4px 0;font-size:14px;color:#0F172A;font-weight:500;">Online (Zoom / Google Meet)</td>
              </tr>
            </table>
          </div>

          <!-- Key details -->
          <p style="margin:0 0 8px;font-size:13px;color:#64748B;">A few quick things to know:</p>
          <ul style="margin:0 0 20px;padding-left:20px;">
            <li style="font-size:14px;line-height:1.7;color:#374151;">Total programme cost is <strong>&#8358;100,000</strong> &mdash; payable in 3 instalments (&#8358;40k at enrollment, &#8358;30k at week 4, &#8358;30k at week 6).</li>
            <li style="font-size:14px;line-height:1.7;color:#374151;">AI Pro tools are included &mdash; no extra subscriptions needed.</li>
            <li style="font-size:14px;line-height:1.7;color:#374151;">You will receive a certificate of completion at the end.</li>
            <li style="font-size:14px;line-height:1.7;color:#374151;">Full refund available if you withdraw before the end of week 2.</li>
          </ul>

          <p style="margin:0 0 16px;line-height:1.6;">Have a question in the meantime? Message us directly on WhatsApp:</p>

          <!-- WhatsApp CTA -->
          <div style="text-align:center;margin:24px 0;">
            <a href="https://wa.me/2349030891731?text=Hi%2C%20I%20just%20registered%20for%20Marvel%20Develops%20Academy" style="display:inline-block;background:#25D366;color:#ffffff;font-weight:700;font-size:15px;padding:14px 32px;border-radius:9999px;text-decoration:none;">Message on WhatsApp</a>
          </div>

          <p style="margin:24px 0 0;font-size:13px;color:#9CA3AF;">— The Marvel Develops team<br />marveldevelops.com/academy</p>
        </div>

      </div>
    `,
  }
}
