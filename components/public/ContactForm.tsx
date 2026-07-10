"use client";

import { useActionState, useState } from "react";

import {
  submitContactAction,
  type ContactActionState,
} from "@/app/[lang]/(public)/contact/actions";
import { TurnstileWidget } from "@/components/public/TurnstileWidget";

const initialState: ContactActionState = { error: null, success: false };

interface ContactFormProps {
  turnstileSiteKey: string | null;
}

export function ContactForm({ turnstileSiteKey }: ContactFormProps) {
  const [state, formAction, pending] = useActionState(submitContactAction, initialState);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);

  return (
    <form action={formAction} className="mx-auto mt-8 flex max-w-md flex-col gap-4 px-4 sm:px-6">
      <label className="flex flex-col gap-1 text-sm">
        Name
        <input type="text" name="name" required className="border-border border px-3 py-2" />
      </label>
      <label className="flex flex-col gap-1 text-sm">
        Email
        <input type="email" name="email" required className="border-border border px-3 py-2" />
      </label>
      <label className="flex flex-col gap-1 text-sm">
        Message
        <textarea name="message" rows={4} required className="border-border border px-3 py-2" />
      </label>
      {turnstileSiteKey && (
        <TurnstileWidget siteKey={turnstileSiteKey} onToken={setTurnstileToken} />
      )}
      <input type="hidden" name="turnstileToken" value={turnstileToken ?? ""} />
      {state.error && (
        <p role="alert" className="text-sm text-red-600">
          {state.error}
        </p>
      )}
      {state.success && (
        <p className="text-sm text-green-700">Thanks — your message has been sent.</p>
      )}
      <button
        type="submit"
        disabled={pending || (!!turnstileSiteKey && !turnstileToken)}
        className="border-border border px-4 py-2 text-sm disabled:opacity-50"
      >
        {pending ? "Sending…" : "Send"}
      </button>
    </form>
  );
}
