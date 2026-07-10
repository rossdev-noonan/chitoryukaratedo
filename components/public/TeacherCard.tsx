import Link from "next/link";

import type { Teacher } from "@/lib/directory";
import type { Locale } from "@/lib/i18n/locales";

interface TeacherCardProps {
  teacher: Teacher;
  lang: Locale;
}

export function TeacherCard({ teacher, lang }: TeacherCardProps) {
  return (
    <Link
      href={`/${lang}/teachers/${teacher.slug}`}
      className="border-border block border p-4 text-sm"
    >
      <p className="font-medium">
        {teacher.nameNative} / {teacher.nameRomaji}
      </p>
      <p className="text-muted-foreground mt-1">{teacher.rank}</p>
    </Link>
  );
}
