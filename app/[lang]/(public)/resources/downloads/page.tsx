import type { Metadata } from "next";

import { DownloadsBrowser } from "@/components/public/DownloadsBrowser";
import { GlobalCommunityCTA } from "@/components/public/GlobalCommunityCTA";
import { getDownloadDocuments } from "@/lib/downloads";
import type { Locale } from "@/lib/i18n/locales";

export const metadata: Metadata = {
  title: "Downloads",
  description:
    "Grading syllabi, technical guidelines, membership forms, and official federation documents.",
};

interface DownloadsPageProps {
  params: Promise<{ lang: Locale }>;
}

export default async function DownloadsPage({ params }: DownloadsPageProps) {
  const [{ lang }, documents] = await Promise.all([params, getDownloadDocuments()]);

  return (
    <>
      <DownloadsBrowser lang={lang} documents={documents} />
      <GlobalCommunityCTA lang={lang} />
      <div className="h-16 xl:h-20" aria-hidden />
    </>
  );
}
