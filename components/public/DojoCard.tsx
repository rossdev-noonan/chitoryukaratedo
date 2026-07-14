import { ArrowRight, MapPin } from "lucide-react";
import Link from "next/link";

import type { Dojo } from "@/lib/directory";
import type { Locale } from "@/lib/i18n/locales";

interface DojoCardProps {
  dojo: Dojo;
  lang: Locale;
}

export function DojoCard({ dojo, lang }: DojoCardProps) {
  return (
    <Link
      href={`/${lang}/dojo/${dojo.slug}`}
      className="border-border/60 group flex min-h-32 items-center gap-4 rounded-xl border bg-white p-5 text-sm shadow-[0_4px_6px_rgba(0,0,0,0.02)] transition-transform hover:-translate-y-0.5"
    >
      <span className="text-primary flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#fff4f4]">
        <MapPin className="h-5 w-5" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="font-heading block text-base font-bold text-[#1f2937]">{dojo.name}</span>
        {dojo.city && <span className="mt-1 block text-xs text-[#4b5563]">{dojo.city}</span>}
        {dojo.headInstructor && (
          <span className="mt-1 block text-xs text-[#4b5563]">{dojo.headInstructor}</span>
        )}
      </span>
      <ArrowRight className="text-primary h-4 w-4 shrink-0 transition-transform group-hover:translate-x-1" />
    </Link>
  );
}
