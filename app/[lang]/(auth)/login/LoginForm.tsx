"use client";

import Link from "next/link";
import { useActionState } from "react";

import type { Locale } from "@/lib/i18n/locales";

import { loginAction, type LoginActionState } from "./actions";

const initialState: LoginActionState = { error: null };

interface LoginFormProps {
  lang: Locale;
}

export function LoginForm({ lang }: LoginFormProps) {
  const [state, formAction, pending] = useActionState(loginAction, initialState);

  return (
    <form action={formAction} className="mt-6 flex flex-col gap-3">
      <label className="flex flex-col gap-1 text-sm">
        Email
        <input type="email" name="email" required className="border-border border px-3 py-2" />
      </label>
      <label className="flex flex-col gap-1 text-sm">
        Password
        <input
          type="password"
          name="password"
          required
          className="border-border border px-3 py-2"
        />
      </label>
      {state.error && (
        <p role="alert" className="text-sm text-red-600">
          {state.error}
        </p>
      )}
      <button
        type="submit"
        disabled={pending}
        className="border-border border px-4 py-2 text-sm disabled:opacity-50"
      >
        {pending ? "Logging in…" : "Log in"}
      </button>
      <Link
        href={`/${lang}/reset-password`}
        className="text-muted-foreground text-center text-xs underline"
      >
        Forgot password?
      </Link>
    </form>
  );
}
