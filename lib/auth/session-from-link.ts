import type { createSupabaseBrowserClient } from "@/lib/supabase/client";

type SupabaseBrowserClient = ReturnType<typeof createSupabaseBrowserClient>;

// Invite/recovery links must never trust an already-existing browser session —
// a tab already signed in as someone else could otherwise have its password
// silently changed by a dead, expired, or forged link, instead of failing
// safely. This explicitly exchanges the link's own token/code for a session,
// so "ready to set a password" is tied to that exchange succeeding, never to
// "some session happens to exist right now" (which could just be the ambient
// one from before the link was ever clicked).
export async function establishSessionFromLink(
  supabase: SupabaseBrowserClient,
  hash: string,
  search: string,
): Promise<boolean> {
  const hashParams = new URLSearchParams(hash.replace(/^#/, ""));
  if (hashParams.has("access_token") && !hashParams.has("error")) {
    const { error } = await supabase.auth.setSession({
      access_token: hashParams.get("access_token")!,
      refresh_token: hashParams.get("refresh_token") ?? "",
    });
    return !error;
  }

  const code = new URLSearchParams(search).get("code");
  if (code) {
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    return !error;
  }

  return false;
}
