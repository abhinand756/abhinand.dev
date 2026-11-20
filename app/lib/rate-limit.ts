/**
 * JARVIS — rate limiting (server only).
 *
 * A lightweight in-memory sliding-window limiter. On a single long-lived
 * Node.js instance this is exact. On Vercel, each serverless instance keeps
 * its own counters, so the effective limit is per instance — still enough to
 * stop a single visitor from hammering the endpoint or burning the free tier.
 *
 * For multi-instance accuracy you would swap the store for Redis/Upstash, but
 * this keeps the project dependency-free and inside the free tier.
 */

interface WindowEntry {
  timestamps: number[];
  dayKey: string;
  dayCount: number;
}

const store = new Map<string, WindowEntry>();
const MAX_TRACKED_KEYS = 5000;

function prune(now: number, windowMs: number) {
  if (store.size <= MAX_TRACKED_KEYS) return;
  store.forEach((entry, key) => {
    const fresh = entry.timestamps.filter((t) => now - t < windowMs);
    if (fresh.length === 0 && entry.dayKey !== dayKey(now)) {
      store.delete(key);
    }
  });
}

function dayKey(now: number): string {
  return new Date(now).toISOString().slice(0, 10);
}

export interface RateLimitOptions {
  limit: number;
  windowMs: number;
  dailyLimit?: number;
}

export interface RateLimitResult {
  ok: boolean;
  /** Seconds the caller should wait before retrying (only when !ok). */
  retryAfter: number;
  /** Which cap was hit. */
  scope?: "window" | "daily";
  remaining: number;
}

export function checkRateLimit(
  key: string,
  { limit, windowMs, dailyLimit }: RateLimitOptions
): RateLimitResult {
  const now = Date.now();
  prune(now, windowMs);

  const today = dayKey(now);
  let entry = store.get(key);
  if (!entry) {
    entry = { timestamps: [], dayKey: today, dayCount: 0 };
    store.set(key, entry);
  }

  if (entry.dayKey !== today) {
    entry.dayKey = today;
    entry.dayCount = 0;
  }

  entry.timestamps = entry.timestamps.filter((t) => now - t < windowMs);

  if (dailyLimit !== undefined && entry.dayCount >= dailyLimit) {
    const nextDay = new Date(`${today}T00:00:00.000Z`).getTime() + 24 * 60 * 60 * 1000;
    return {
      ok: false,
      retryAfter: Math.max(1, Math.ceil((nextDay - now) / 1000)),
      scope: "daily",
      remaining: 0,
    };
  }

  if (entry.timestamps.length >= limit) {
    const oldest = entry.timestamps[0];
    return {
      ok: false,
      retryAfter: Math.max(1, Math.ceil((oldest + windowMs - now) / 1000)),
      scope: "window",
      remaining: 0,
    };
  }

  entry.timestamps.push(now);
  entry.dayCount += 1;

  return {
    ok: true,
    retryAfter: 0,
    remaining: Math.max(0, limit - entry.timestamps.length),
  };
}

/** Best-effort client identifier for rate limiting. */
export function getClientKey(headers: Headers): string {
  const forwarded = headers.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim();
    if (first) return first;
  }
  return (
    headers.get("x-real-ip")?.trim() ||
    headers.get("cf-connecting-ip")?.trim() ||
    "unknown-client"
  );
}
