'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function login(formData: FormData) {
  const password = String(formData.get('password') ?? '')
  const adminPassword = process.env.ADMIN_PASSWORD

  if (!adminPassword || password !== adminPassword) {
    redirect('/admin/login?error=' + encodeURIComponent('Incorrect password'))
  }

  const cookieStore = await cookies()
  cookieStore.set('admin-session', adminPassword, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7,
    path: '/',
  })

  redirect('/admin')
}

export async function logout() {
  const cookieStore = await cookies()
  cookieStore.delete('admin-session')
  redirect('/admin/login')
}
