import type { Metadata } from "next";

import { PageHeader } from "@/components/public/PageHeader";
import { PlaceholderNotice } from "@/components/public/PlaceholderNotice";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact Chito-Ryu International.",
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        title="Contact"
        description="Form submission is not wired up yet — /api/contact, Turnstile bot protection, and rate limiting land in Phase 7."
      />
      <form className="mx-auto mt-8 flex max-w-md flex-col gap-4 px-4 sm:px-6">
        <label className="flex flex-col gap-1 text-sm">
          Name
          <input type="text" name="name" className="border-border border px-3 py-2" disabled />
        </label>
        <label className="flex flex-col gap-1 text-sm">
          Email
          <input type="email" name="email" className="border-border border px-3 py-2" disabled />
        </label>
        <label className="flex flex-col gap-1 text-sm">
          Message
          <textarea name="message" rows={4} className="border-border border px-3 py-2" disabled />
        </label>
        <button
          type="submit"
          disabled
          className="border-border border px-4 py-2 text-sm disabled:opacity-50"
        >
          Send (disabled — backend pending)
        </button>
      </form>
      <PlaceholderNotice source="Supabase (submission), Sanity (page copy)" />
    </>
  );
}
