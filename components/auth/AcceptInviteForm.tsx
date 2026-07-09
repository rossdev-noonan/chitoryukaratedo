"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState, useSyncExternalStore } from "react";

import { createSupabaseBrowserClient } from "@/lib/supabase/client";

const EXPIRED_LINK_MESSAGE =
  "This invite link is invalid or has expired. Ask your Sohonbu Admin to send a new invite.";

// Without this check, a browser tab that already had an unrelated user
// signed in (e.g. an admin testing invites) would show that ambient session
// as "ready" even when the link itself was dead — silently letting the form
// change the WRONG account's password. This must be checked before anything
// else, independent of whatever session happens to already exist.
//
// Supabase can deliver the token two ways depending on the project's auth
// flow: the older implicit flow puts it in the URL hash (#access_token=...),
// while @supabase/ssr defaults to PKCE, which puts a one-time code in the
// query string (?code=...) instead. The client auto-exchanges that code for
// a session on load (detectSessionInUrl), but only if we don't block it here
// by only recognizing the hash format.
function hasValidInviteToken(hash: string, search: string): boolean {
  if (hash) {
    const hashParams = new URLSearchParams(hash.replace(/^#/, ""));
    if (hashParams.has("access_token") && !hashParams.has("error")) return true;
  }
  if (search) {
    const searchParams = new URLSearchParams(search);
    if (searchParams.has("code")) return true;
  }
  return false;
}

function subscribeNoop() {
  return () => {};
}

export function AcceptInviteForm() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [pending, setPending] = useState(false);
  const [ready, setReady] = useState(false);
  const [sessionError, setSessionError] = useState<string | null>(null);

  // The URL hash is never sent to the server, so SSR has no way to know it.
  // useSyncExternalStore renders the server snapshot (false) during hydration
  // and swaps to the real client value right after — the correct, mismatch-
  // free way to read browser-only state on first render.
  const hasToken = useSyncExternalStore(
    subscribeNoop,
    () => hasValidInviteToken(window.location.hash, window.location.search),
    () => false,
  );

  useEffect(() => {
    if (!hasToken) return;

    const supabase = createSupabaseBrowserClient();
    supabase.auth.getSession().then(({ data }) => {
      setReady(!!data.session);
      if (!data.session) {
        setSessionError(EXPIRED_LINK_MESSAGE);
      }
    });
  }, [hasToken]);

  const error = sessionError ?? (!hasToken ? EXPIRED_LINK_MESSAGE : null);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setSessionError(null);

    if (password.length < 8) {
      setSessionError("Password must be at least 8 characters.");
      return;
    }
    if (password !== confirmPassword) {
      setSessionError("Passwords do not match.");
      return;
    }

    setPending(true);
    const supabase = createSupabaseBrowserClient();
    const { error: updateError } = await supabase.auth.updateUser({ password });
    setPending(false);

    if (updateError) {
      setSessionError(updateError.message);
      return;
    }

    router.push("/admin");
  }

  return (
    <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-3">
      <label className="flex flex-col gap-1 text-sm">
        New password
        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
          minLength={8}
          disabled={!ready}
          className="border-border border px-3 py-2"
        />
      </label>
      <label className="flex flex-col gap-1 text-sm">
        Confirm password
        <input
          type="password"
          value={confirmPassword}
          onChange={(event) => setConfirmPassword(event.target.value)}
          required
          disabled={!ready}
          className="border-border border px-3 py-2"
        />
      </label>
      {error && (
        <p role="alert" className="text-sm text-red-600">
          {error}
        </p>
      )}
      <button
        type="submit"
        disabled={!ready || pending}
        className="border-border border px-4 py-2 text-sm disabled:opacity-50"
      >
        {pending ? "Setting password…" : "Set password"}
      </button>
    </form>
  );
}
