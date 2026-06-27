import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

// Session-bound Supabase client for Server Components, Server Actions, and
// Route Handlers under app/admin/. Uses the anon key — RLS-respecting, scoped
// to whichever user is logged in (or no one). Never used for the submissions
// service-role writes — see lib/server/supabase.ts for that.
export async function createClient() {
  const cookieStore = await cookies()

  return createServerClient(process.env.SUPABASE_URL!, process.env.SUPABASE_ANON_KEY!, {
    cookies: {
      getAll() {
        return cookieStore.getAll()
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options))
        } catch {
          // Called from a Server Component — middleware handles session refresh instead.
        }
      },
    },
  })
}
