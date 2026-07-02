import { login } from './actions'

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>
}) {
  const { error } = await searchParams

  return (
    <div className="flex min-h-screen items-center justify-center bg-navy-deep px-6">
      <div className="w-full max-w-sm rounded-2xl bg-white p-8">
        <h1 className="mb-1 font-display text-xl font-bold text-text-dark">Marvel Develops Admin</h1>
        <p className="mb-6 font-sans text-sm text-text-mid">Enter your password to continue.</p>

        {error && (
          <div className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-600">{error}</div>
        )}

        <form action={login} className="space-y-4">
          <div>
            <label htmlFor="password" className="sr-only">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              required
              className="w-full rounded-xl border-[1.5px] border-border bg-gray-white px-4 py-3 font-sans text-[15px] text-text-dark placeholder:text-text-muted focus:border-royal-blue focus:outline-none"
            />
          </div>
          <button
            type="submit"
            className="w-full rounded-full bg-royal-blue px-6 py-3 font-sans text-base font-semibold text-white transition-colors hover:bg-royal-blue-dark"
          >
            Sign in
          </button>
        </form>
      </div>
    </div>
  )
}
