import Link from "next/link";

import type { MockTeacher } from "@/lib/mock-data";

interface TeacherCardProps {
  teacher: MockTeacher;
}

export function TeacherCard({ teacher }: TeacherCardProps) {
  return (
    <Link href={`/teachers/${teacher.slug}`} className="border-border block border p-4 text-sm">
      <p className="font-medium">
        {teacher.nameNative} / {teacher.nameRomaji}
      </p>
      <p className="text-muted-foreground mt-1">{teacher.rank}</p>
    </Link>
  );
}
