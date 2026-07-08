import Link from "next/link";

import type { Dojo } from "@/lib/directory";

interface DojoCardProps {
  dojo: Dojo;
}

export function DojoCard({ dojo }: DojoCardProps) {
  return (
    <Link href={`/dojo/${dojo.slug}`} className="border-border block border p-4 text-sm">
      <p className="font-medium">{dojo.name}</p>
      <p className="text-muted-foreground mt-1">{dojo.city}</p>
      <p className="text-muted-foreground">{dojo.headInstructor}</p>
    </Link>
  );
}
