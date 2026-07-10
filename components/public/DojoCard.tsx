import Link from "next/link";

import type { Dojo } from "@/lib/directory";
import type { Locale } from "@/lib/i18n/locales";

interface DojoCardProps {
  dojo: Dojo;
  lang: Locale;
}

export function DojoCard({ dojo, lang }: DojoCardProps) {
  return (
    <Link href={`/${lang}/dojo/${dojo.slug}`} className="border-border block border p-4 text-sm">
      <p className="font-medium">{dojo.name}</p>
      <p className="text-muted-foreground mt-1">{dojo.city}</p>
      <p className="text-muted-foreground">{dojo.headInstructor}</p>
    </Link>
  );
}
