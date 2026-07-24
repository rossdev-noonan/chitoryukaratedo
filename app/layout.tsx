import type { Metadata } from "next";
import { Cormorant_Garamond, Geist_Mono, Inter, Noto_Serif_JP } from "next/font/google";
import "./globals.css";

import { AuthRedirectGuard } from "@/components/AuthRedirectGuard";
import { JsonLd } from "@/components/public/JsonLd";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const notoSerifJp = Noto_Serif_JP({
  variable: "--font-noto-serif-jp",
  subsets: ["latin"],
  weight: ["500", "700"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Editorial serif used only for the News page's desktop headline per Figma
// (731:1105 / 723:4498) — mobile reverts to the standard font-heading
// (Noto Serif JP), so this stays a scoped utility, not the site default.
const cormorantGaramond = Cormorant_Garamond({
  variable: "--font-cormorant-garamond",
  subsets: ["latin"],
  weight: ["500"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://chitoryukaratedo.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Chito-Ryu International",
    template: "%s | Chito-Ryu International",
  },
  description:
    "The official international home for Chito-Ryu — lineage, dojo directory, and teacher registry.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${notoSerifJp.variable} ${geistMono.variable} ${cormorantGaramond.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "Chito-Ryu International",
            url: siteUrl,
          }}
        />
        <AuthRedirectGuard />
        {children}
      </body>
    </html>
  );
}
