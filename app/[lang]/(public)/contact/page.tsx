import type { Metadata } from "next";

import { ContactForm } from "@/components/public/ContactForm";
import { PageHeader } from "@/components/public/PageHeader";
import { PlaceholderNotice } from "@/components/public/PlaceholderNotice";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact Chito-Ryu International.",
};

export default function ContactPage() {
  const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || null;

  return (
    <>
      <PageHeader title="Contact" description="Send us a message and we'll get back to you." />
      <ContactForm turnstileSiteKey={turnstileSiteKey} />
      <PlaceholderNotice source="Supabase (submission), Sanity (page copy)" />
    </>
  );
}
