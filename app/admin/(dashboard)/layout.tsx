import type { ReactNode } from 'react'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { logout } from '../login/actions'

export default async function AdminDashboardLayout({ children }: { children: ReactNode }) {
  const cookieStore = await cookies()
  const session = cookieStore.get('admin-session')

  if (!session || session.value !== process.env.ADMIN_PASSWORD) {
    redirect('/admin/login')
  }

  return (
    <div className="min-h-screen bg-gray-white">
      <header className="flex items-center justify-between border-b border-border bg-white px-6 py-4">
        <span className="font-display text-lg font-bold text-text-dark">Marvel Develops Admin</span>
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
