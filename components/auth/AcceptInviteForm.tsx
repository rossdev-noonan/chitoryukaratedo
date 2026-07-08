"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { createSupabaseBrowserClient } from "@/lib/supabase/client";

const EXPIRED_LINK_MESSAGE =
  "This invite link is invalid or has expired. Ask your Sohonbu Admin to send a new invite.";

// Supabase invite links carry an access_token in the URL hash. Without this
// check, a browser tab that already had an unrelated user signed in (e.g. an
// admin testing invites) would show that ambient session as "ready" even
// when the link itself was dead — silently letting the form change the
// WRONG account's password. This must be checked before anything else,
// independent of whatever session happens to already exist.
function hasValidInviteToken(hash: string): boolean {
  if (!hash) return false;
  const params = new URLSearchParams(hash.replace(/^#/, ""));
  return params.has("access_token") && !params.has("error");
}

export function AcceptInviteForm() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [hasToken] = useState(() =>
    typeof window !== "undefined" ? hasValidInviteToken(window.location.hash) : false,
  );
  const [error, setError] = useState<string | null>(() => (hasToken ? null : EXPIRED_LINK_MESSAGE));
  const [pending, setPending] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!hasToken) return;

    const supabase = createSupabaseBrowserClient();
    supabase.auth.getSession().then(({ data }) => {
      setReady(!!data.session);
      if (!data.session) {
        setError(EXPIRED_LINK_MESSAGE);
      }
    });
  }, [hasToken]);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError(null);

    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setPending(true);
    const supabase = createSupabaseBrowserClient();
    const { error: updateError } = await supabase.auth.updateUser({ password });
    setPending(false);

    if (updateError) {
      setError(updateError.message);
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
