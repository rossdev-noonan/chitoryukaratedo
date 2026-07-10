import type { Metadata } from "next";
import Link from "next/link";

import { PageHeader } from "@/components/public/PageHeader";
import { PlaceholderNotice } from "@/components/public/PlaceholderNotice";
import type { Locale } from "@/lib/i18n/locales";

export const metadata: Metadata = {
  title: "Resources",
  description: "Rules, forms, and documents for Chito-Ryu practitioners.",
};

const resourceLinks = [
  { href: "/resources/soke-cup-rules", label: "Soke Cup Rules" },
  { href: "/resources/bogu-kumite", label: "Bogu Kumite" },
  { href: "/resources/downloads", label: "Downloads" },
];

interface ResourcesPageProps {
  params: Promise<{ lang: Locale }>;
}

export default async function ResourcesPage({ params }: ResourcesPageProps) {
  const { lang } = await params;

  return (
    <>
      <PageHeader title="Resources" description="Rules, forms, and documents." />
      <ul className="mx-auto mt-8 max-w-6xl px-4 sm:px-6">
        {resourceLinks.map((link) => (
          <li key={link.href} className="border-border border-b py-3">
            <Link href={`/${lang}${link.href}`} className="text-sm underline underline-offset-4">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
      <PlaceholderNotice source="Sanity" />
    </>
  );
}
