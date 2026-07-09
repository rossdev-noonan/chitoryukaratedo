import "server-only";

const VERIFY_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify";

export async function verifyTurnstileToken(token: string): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) {
    // Not configured yet — fail open in that specific case so local dev
    // isn't blocked before keys are set, same fail-open stance as rate
    // limiting. Once TURNSTILE_SECRET_KEY is set, this path is unreachable.
    return true;
  }

  if (!token) return false;

  const response = await fetch(VERIFY_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ secret, response: token }),
  });

  if (!response.ok) return false;

  const result = (await response.json()) as { success: boolean };
  return result.success;
}
