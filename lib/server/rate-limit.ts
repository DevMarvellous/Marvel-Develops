// Simple in-memory per-IP sliding-window rate limiter. Resets on cold start —
// fine for a low-traffic marketing site. Swap for an Upstash-backed limiter
// later if traffic ever makes this inadequate.

const WINDOW_MS = 10 * 60 * 1000
const MAX_REQUESTS = 40

const hits = new Map<string, number[]>()

export function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const timestamps = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS)

  if (timestamps.length >= MAX_REQUESTS) {
    hits.set(ip, timestamps)
    return true
  }

  timestamps.push(now)
  hits.set(ip, timestamps)
  return false
}

export function getClientIp(request: Request): string {
  const forwardedFor = request.headers.get('x-forwarded-for')
  if (forwardedFor) return forwardedFor.split(',')[0].trim()
  return request.headers.get('x-real-ip') ?? 'unknown'
}
