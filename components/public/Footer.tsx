import { Mail } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { FacebookIcon, InstagramIcon, YoutubeIcon } from "@/components/public/SocialIcons";
import { footerLegalItems } from "@/lib/nav-items";

const quickLinks = [
  { href: "/about", label: "About" },
  { href: "/history", label: "History" },
  { href: "/dojo-directory", label: "Dojo Directory" },
  { href: "/events", label: "Events" },
];

const resourceLinks = [
  { href: "/resources/downloads", label: "Downloads" },
  { href: "/resources", label: "Examinations" },
  { href: "/resources", label: "Technical Documents" },
  { href: "/resources", label: "Rules & Guidelines" },
];

export function Footer() {
  return (
    <footer className="bg-foreground text-background">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-10">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3">
              <Image
                src="/brand/chito-ryu-logo.svg"
                alt=""
                width={40}
                height={40}
                className="h-10 w-10"
              />
              <span className="font-heading leading-tight">
                <span className="block text-xs opacity-70">千唐流国際</span>
                <span className="block text-sm font-semibold">Chito Ryu International</span>
              </span>
            </div>
            <p className="mt-4 text-sm opacity-70">
              The International Chito-Ryu Karate-Do Federation promotes and preserves Chito-Ryu
              Karate-Do around the world.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold">Quick Links</h3>
            <ul className="mt-4 flex flex-col gap-3">
              {quickLinks.map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="text-sm opacity-70 hover:opacity-100">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold">Resources</h3>
            <ul className="mt-4 flex flex-col gap-3">
              {resourceLinks.map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="text-sm opacity-70 hover:opacity-100">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold">Connect</h3>
            <div className="mt-4 flex flex-col gap-4">
              <a
                href="mailto:info@chitoryu.org"
                className="flex items-center gap-2 text-sm opacity-70 hover:opacity-100"
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
                  <FacebookIcon className="h-5 w-5" />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="opacity-70 hover:opacity-100"
                >
                  <InstagramIcon className="h-5 w-5" />
                </a>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="YouTube"
                  className="opacity-70 hover:opacity-100"
                >
                  <YoutubeIcon className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-6 text-xs opacity-70 sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {new Date().getFullYear()} International Chito-Ryu Karate-Do Federation. All
            rights reserved.
          </p>
          <nav aria-label="Legal and administrative" className="flex items-center gap-4">
            {footerLegalItems.map((item) => (
              <Link key={item.href} href={item.href} className="hover:opacity-100">
                {item.label}
              </Link>
            ))}
            <Link href="/login" className="hover:opacity-100">
              Admin
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
