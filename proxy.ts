import { createServerClient } from "@supabase/ssr";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { localeFromCountryCode } from "@/lib/i18n/geo";
import { defaultLocale, isLocale, locales } from "@/lib/i18n/locales";

const LOCALE_COOKIE = "NEXT_LOCALE";

// Set by hosting platforms' edge network from the visitor's IP — checked in
// order since we don't know the eventual host yet. Both are absent in local
// dev, which is fine: detection just falls through to Accept-Language.
function getCountryCode(request: NextRequest): string | null {
  return (
    request.headers.get("x-vercel-ip-country") ?? request.headers.get("cf-ipcountry") ?? null
  );
}

function getLocaleFromAcceptLanguage(request: NextRequest): string | null {
  const header = request.headers.get("accept-language");
  if (!header) return null;

  const requested = header
    .split(",")
    .map((part) => part.split(";")[0]?.trim().split("-")[0]?.toLowerCase())
    .filter((tag): tag is string => Boolean(tag));

  for (const tag of requested) {
    if (isLocale(tag)) return tag;
  }
  return null;
}

// Priority: an explicit/previous choice (cookie) beats geo, which beats
// browser language, which beats the site default. This means a visitor in
// Norway lands on /no by default, but once they pick English the cookie
// keeps them there on later visits instead of geo overriding it again.
function getPreferredLocale(request: NextRequest): string {
  const cookieLocale = request.cookies.get(LOCALE_COOKIE)?.value;
  if (cookieLocale && isLocale(cookieLocale)) return cookieLocale;

  const geoLocale = localeFromCountryCode(getCountryCode(request));
  if (geoLocale) return geoLocale;

  return getLocaleFromAcceptLanguage(request) ?? defaultLocale;
}

async function checkAdminAuth(request: NextRequest): Promise<NextResponse> {
  let response = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
          response = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options),
          );
        },
      },
    },
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    const locale = getPreferredLocale(request);
    return NextResponse.redirect(new URL(`/${locale}/login`, request.url));
  }

  return response;
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/admin")) {
    return checkAdminAuth(request);
  }

  const currentLocale = locales.find(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
  );
  if (currentLocale) {
    const response = NextResponse.next();
    // Keep the sticky cookie in sync with whatever locale the visitor is
    // actually browsing — covers both manual picker choices and the
    // redirect below, without needing separate code paths for each.
    response.cookies.set(LOCALE_COOKIE, currentLocale, {
      path: "/",
      maxAge: 60 * 60 * 24 * 365,
      sameSite: "lax",
    });
    return response;
  }

  const locale = getPreferredLocale(request);
  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname}`;
  const response = NextResponse.redirect(url);
  response.cookies.set(LOCALE_COOKIE, locale, {
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
    sameSite: "lax",
  });
  return response;
}

export const config = {
  matcher: [
    // Everything except Next internals, API routes, and static files
    // (anything with a file extension, e.g. favicon.ico, images).
    "/((?!_next|api|.*\\..*).*)",
  ],
};
