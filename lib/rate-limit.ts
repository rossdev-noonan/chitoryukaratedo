import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { headers } from "next/headers";

const redis =
  process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
    ? new Redis({
        url: process.env.UPSTASH_REDIS_REST_URL,
        token: process.env.UPSTASH_REDIS_REST_TOKEN,
      })
    : null;

// Each limiter gets its own key prefix so a burst on one endpoint (e.g. search)
// never eats into another's budget (e.g. login).
function createLimiter(prefix: string, limit: number, windowSeconds: number): Ratelimit | null {
  if (!redis) return null;
  return new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(limit, `${windowSeconds} s`),
    prefix: `chitoryu:ratelimit:${prefix}`,
  });
}

const loginLimiter = createLimiter("login", 10, 60);
const inviteLimiter = createLimiter("invite", 20, 60);
const contactLimiter = createLimiter("contact", 5, 60);
const searchLimiter = createLimiter("search", 30, 60);

export async function getRequestIp(): Promise<string> {
  const headerList = await headers();
  const forwardedFor = headerList.get("x-forwarded-for");
  if (forwardedFor) return forwardedFor.split(",")[0].trim();
  return headerList.get("x-real-ip") ?? "unknown";
}

async function checkLimit(limiter: Ratelimit | null, key: string): Promise<boolean> {
  // If Upstash isn't configured (e.g. local dev before keys are set), fail
  // open rather than breaking every login/search — rate limiting is a
  // defense-in-depth measure, not the only line of defense.
  if (!limiter) return true;
  const { success } = await limiter.limit(key);
  return success;
}

export async function checkLoginRateLimit(email: string): Promise<boolean> {
  const ip = await getRequestIp();
  return checkLimit(loginLimiter, `${ip}:${email}`);
}

export async function checkInviteRateLimit(userId: string): Promise<boolean> {
  return checkLimit(inviteLimiter, userId);
}

export async function checkContactRateLimit(): Promise<boolean> {
  const ip = await getRequestIp();
  return checkLimit(contactLimiter, ip);
}

export async function checkSearchRateLimit(): Promise<boolean> {
  const ip = await getRequestIp();
  return checkLimit(searchLimiter, ip);
}
