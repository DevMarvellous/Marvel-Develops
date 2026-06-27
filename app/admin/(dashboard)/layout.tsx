import type { ReactNode } from 'react'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { logout } from '../login/actions'

// Route group (dashboard) keeps this shell + auth check scoped to the
// authenticated admin pages only — /admin/login is a sibling outside the
// group and never gets wrapped by it.
export default async function AdminDashboardLayout({ children }: { children: ReactNode }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/admin/login')
  }

  return (
    <div className="min-h-screen bg-gray-white">
      <header className="flex items-center justify-between border-b border-border bg-white px-6 py-4">
        <span className="font-display text-lg font-bold text-text-dark">Outends Admin</span>
        <form action={logout}>
          <button type="submit" className="font-sans text-sm font-semibold text-text-mid hover:text-royal-blue">
            Sign out
          </button>
        </form>
      </header>
      <main className="px-6 py-8">{children}</main>
    </div>
  )
}
