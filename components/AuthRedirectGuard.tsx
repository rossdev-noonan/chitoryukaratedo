"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

import { defaultLocale, isLocale } from "@/lib/i18n/locales";

// Supabase auth links (invite, recovery, magic link) only land on the right
// page if whoever triggered them set an explicit redirectTo. Our own app
// flows do this correctly, but anything sent directly from the Supabase
// Dashboard (e.g. clicking "Send password recovery" on a user row) falls
// back to the project's bare Site URL with no path — dropping the token on
// whatever page that happens to be, where nothing is listening for it.
//
// This is a safety net, not the primary fix: it watches for a stray auth
// token on any page and forwards it to /reset-password, which already knows
// how to pick up either link format (hash or PKCE code) and validate it
// properly. It does not trust the token itself — that's still ResetPasswordForm's job.
const AUTH_LANDING_SEGMENTS = ["reset-password", "accept-invite"];

export function AuthRedirectGuard() {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const segments = pathname.split("/").filter(Boolean);
    const maybeLocale = segments[0];
    const locale = isLocale(maybeLocale) ? maybeLocale : defaultLocale;
    const restSegments = isLocale(maybeLocale) ? segments.slice(1) : segments;

    if (AUTH_LANDING_SEGMENTS.includes(restSegments[0])) return;

    const hasHashToken = window.location.hash.includes("access_token=");
    const hasCode = new URLSearchParams(window.location.search).has("code");
    if (!hasHashToken && !hasCode) return;

    router.replace(`/${locale}/reset-password${window.location.search}${window.location.hash}`);
  }, [pathname, router]);

  return null;
}
