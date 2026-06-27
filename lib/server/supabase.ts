import { createClient } from '@supabase/supabase-js'

// Service-role client for trusted server code only (Route Handlers).
// Bypasses Row Level Security by design — never import this into a Client Component.
let serviceClient: ReturnType<typeof createClient> | null = null

export function getSupabaseServiceClient() {
  if (!serviceClient) {
    const url = process.env.SUPABASE_URL
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY
    if (!url || !key) {
      throw new Error('Supabase service-role configuration is missing')
    }
    serviceClient = createClient(url, key, {
      auth: { autoRefreshToken: false, persistSession: false },
    })
  }
  return serviceClient
}

export type SubmissionSource = 'contact_form' | 'ai_planner'

export interface SubmissionInsert {
  source: SubmissionSource
  full_name: string
  business_name?: string | null
  email: string
  whatsapp?: string | null
  industry?: string | null
  service?: string | null
  message: string
  details?: Record<string, unknown>
}

export async function insertSubmission(data: SubmissionInsert) {
  const supabase = getSupabaseServiceClient()
  const { data: row, error } = await supabase
    .from('submissions')
    .insert({ ...data, details: data.details ?? {} })
    .select('id')
    .single()

  if (error) throw error
  return row as { id: string }
}

export async function recordEmailIds(
  id: string,
  fields: { admin_email_id?: string; customer_email_id?: string; customer_email_scheduled_for?: string }
) {
  const supabase = getSupabaseServiceClient()
  await supabase.from('submissions').update(fields).eq('id', id)
}
