import { Mail } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { FacebookIcon, InstagramIcon, YoutubeIcon } from "@/components/public/SocialIcons";
import type { Locale } from "@/lib/i18n/locales";
import type { Dictionary } from "@/lib/i18n/types";
import { getFooterLegalItems } from "@/lib/nav-items";

interface FooterProps {
  lang: Locale;
  dictionary: Dictionary;
}

export function Footer({ lang, dictionary }: FooterProps) {
  const legalItems = getFooterLegalItems(dictionary);

  const quickLinks = [
    { href: "/about", label: dictionary.nav.about },
    { href: "/history", label: dictionary.nav.history },
    { href: "/dojo-directory", label: dictionary.nav.dojoDirectory },
    { href: "/events", label: dictionary.nav.events },
  ];

  const resourceLinks = [
    { href: "/resources/downloads", label: dictionary.footer.downloads },
    { href: "/resources", label: dictionary.footer.examinations },
    { href: "/resources", label: dictionary.footer.technicalDocuments },
    { href: "/resources", label: dictionary.footer.rulesAndGuidelines },
  ];

  return (
    <footer className="bg-foreground text-background">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-16 md:px-8 md:pt-16 md:pb-12 xl:px-0">
        <div className="grid grid-cols-1 gap-y-7 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-10 md:grid-cols-3 md:gap-x-10 md:gap-y-10 xl:grid-cols-4">
          <div className="mb-3 min-h-[110px] sm:col-span-2 sm:mb-0 sm:min-h-0 md:col-span-3 xl:col-span-1">
            <div className="flex items-center gap-3">
              <span className="relative block h-10 w-10 shrink-0">
                <Image
                  src="/brand/chito-ryu-logo.svg"
                  alt=""
                  fill
                  sizes="40px"
                  className="object-contain"
                />
              </span>
              <span className="font-heading leading-tight">
                <span className="block text-xs font-bold opacity-70 md:text-sm xl:text-xs">
                  千唐流国際
                </span>
                <span className="block text-sm font-semibold md:text-[10px] xl:text-sm">
                  Chito Ryu International
                </span>
              </span>
            </div>
            <p className="mt-4 text-[13px] leading-[1.5] opacity-70 sm:text-sm">
              {dictionary.footer.tagline}
            </p>
          </div>

          <div className="min-h-[117px] sm:min-h-0">
            <h3 className="text-sm leading-[17px] font-semibold">{dictionary.footer.quickLinks}</h3>
            <ul className="mt-3 flex flex-col gap-2 sm:mt-4 sm:gap-3">
              {quickLinks.map((item, index) => (
                <li key={item.label} className={index === 3 ? "md:hidden xl:list-item" : undefined}>
                  <Link
                    href={`/${lang}${item.href}`}
                    className="block text-[13px] leading-4 opacity-70 hover:opacity-100 sm:text-sm"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="min-h-[117px] sm:min-h-0">
            <h3 className="text-sm leading-[17px] font-semibold">
              {dictionary.footer.resourcesHeading}
            </h3>
            <ul className="mt-3 flex flex-col gap-2 sm:mt-4 sm:gap-3">
              {resourceLinks.map((item, index) => (
                <li key={item.label} className={index === 3 ? "md:hidden xl:list-item" : undefined}>
                  <Link
                    href={`/${lang}${item.href}`}
                    className="block text-[13px] leading-4 opacity-70 hover:opacity-100 sm:text-sm"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="min-h-[81px] sm:col-span-2 sm:min-h-0 md:col-span-1">
            <h3 className="text-sm leading-[17px] font-semibold">{dictionary.footer.connect}</h3>
            <div className="mt-3 flex flex-col gap-3 sm:mt-4 sm:gap-4">
              <a
                href="mailto:info@chitoryu.org"
                className="flex items-center gap-2 text-[13px] leading-4 opacity-70 hover:opacity-100 sm:text-sm"
              >
                <Mail className="h-4 w-4" />
                info@chitoryu.org
              </a>
              <div className="flex items-center gap-4">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="opacity-70 hover:opacity-100"
                >
                  <FacebookIcon className="h-6 w-6 sm:h-5 sm:w-5" />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="opacity-70 hover:opacity-100"
                >
                  <InstagramIcon className="h-6 w-6 sm:h-5 sm:w-5" />
                </a>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="YouTube"
                  className="opacity-70 hover:opacity-100 md:hidden xl:block"
                >
                  <YoutubeIcon className="h-6 w-6 sm:h-5 sm:w-5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-white/10 pt-4 text-xs opacity-70 sm:mt-12 sm:flex-row sm:items-center sm:justify-between sm:pt-6">
          <p>{dictionary.footer.copyright.replace("{year}", String(new Date().getFullYear()))}</p>
          <nav aria-label="Legal and administrative" className="flex items-center gap-4 md:gap-6">
            {legalItems.map((item) => (
              <Link key={item.href} href={`/${lang}${item.href}`} className="hover:opacity-100">
                {item.label}
              </Link>
            ))}
            <Link href={`/${lang}/login`} className="hover:opacity-100 md:hidden xl:block">
              {dictionary.footer.admin}
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
