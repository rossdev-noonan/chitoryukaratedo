"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState, useSyncExternalStore } from "react";

import { createSupabaseBrowserClient } from "@/lib/supabase/client";

const EXPIRED_LINK_MESSAGE = "This reset link is invalid or has expired. Request a new one below.";

// Same protection as AcceptInviteForm: only trust a session that came from a
// genuine, error-free recovery token in the URL hash. Never trust "a session
// happens to exist" on its own — a browser tab already signed in as someone
// else must never be able to have its password silently changed by a dead
// or missing link.
function hasValidRecoveryToken(hash: string): boolean {
  if (!hash) return false;
  const params = new URLSearchParams(hash.replace(/^#/, ""));
  return params.has("access_token") && !params.has("error");
}

function subscribeNoop() {
  return () => {};
}

export function ResetPasswordForm() {
  const router = useRouter();

  // The URL hash is never sent to the server, so SSR has no way to know it.
  // useSyncExternalStore renders the server snapshot (false) during hydration
  // and swaps to the real client value right after — the correct, mismatch-
  // free way to read browser-only state on first render.
  const hasToken = useSyncExternalStore(
    subscribeNoop,
    () => hasValidRecoveryToken(window.location.hash),
    () => false,
  );

  const [email, setEmail] = useState("");
  const [requestPending, setRequestPending] = useState(false);
  const [requestSent, setRequestSent] = useState(false);
  const [requestError, setRequestError] = useState<string | null>(null);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [ready, setReady] = useState(false);
  const [sessionError, setSessionError] = useState<string | null>(null);
  const [confirmPending, setConfirmPending] = useState(false);

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

  const confirmError = sessionError ?? (!hasToken ? EXPIRED_LINK_MESSAGE : null);

  async function handleRequestSubmit(event: React.FormEvent) {
    event.preventDefault();
    setRequestError(null);
    setRequestPending(true);

    const supabase = createSupabaseBrowserClient();
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });

    setRequestPending(false);

    if (error) {
      setRequestError(error.message);
      return;
    }

    setRequestSent(true);
  }

  async function handleConfirmSubmit(event: React.FormEvent) {
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

    setConfirmPending(true);
    const supabase = createSupabaseBrowserClient();
    const { error } = await supabase.auth.updateUser({ password });
    setConfirmPending(false);

    if (error) {
      setSessionError(error.message);
      return;
    }

    router.push("/admin");
  }

  if (hasToken) {
    return (
      <form onSubmit={handleConfirmSubmit} className="mt-6 flex flex-col gap-3">
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
        {confirmError && (
          <p role="alert" className="text-sm text-red-600">
            {confirmError}
          </p>
        )}
        <button
          type="submit"
          disabled={!ready || confirmPending}
          className="border-border border px-4 py-2 text-sm disabled:opacity-50"
        >
          {confirmPending ? "Setting password…" : "Set password"}
        </button>
      </form>
    );
  }

  return (
    <form onSubmit={handleRequestSubmit} className="mt-6 flex flex-col gap-3">
      <label className="flex flex-col gap-1 text-sm">
        Email
        <input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
          className="border-border border px-3 py-2"
        />
      </label>
      {requestError && (
        <p role="alert" className="text-sm text-red-600">
          {requestError}
        </p>
      )}
      {requestSent && (
        <p className="text-sm text-green-700">
          If that email has an account, a reset link has been sent.
        </p>
      )}
      <button
        type="submit"
        disabled={requestPending}
        className="border-border border px-4 py-2 text-sm disabled:opacity-50"
      >
        {requestPending ? "Sending…" : "Send reset link"}
      </button>
    </form>
  );
}
