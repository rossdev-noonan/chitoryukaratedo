import { notFound } from "next/navigation";

import { Footer } from "@/components/public/Footer";
import { NavBar } from "@/components/public/NavBar";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { isLocale } from "@/lib/i18n/locales";

export default async function PublicLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}>) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const dictionary = await getDictionary(lang);

  return (
    <>
      <NavBar lang={lang} dictionary={dictionary} />
      <main className="flex-1">{children}</main>
      <Footer lang={lang} dictionary={dictionary} />
    </>
  );
}
