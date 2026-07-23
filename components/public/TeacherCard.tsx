export interface TeacherRegistryEntry {
  id: string;
  slug: string;
  nameNative: string | null;
  nameRomaji: string | null;
  rank: string | null;
  dojoName: string | null;
  dojoSlug: string | null;
  dojoEmail: string | null;
  countryName: string | null;
  photoUrl: string | null;
}

interface TeacherCardProps {
  teacher: TeacherRegistryEntry;
  view: "grid" | "list";
  onSelect: (teacher: TeacherRegistryEntry) => void;
}

const rankSymbols: Record<string, string> = {
  Hanshi: "範",
  Kyoshi: "教",
  Renshi: "錬",
};

export function getRankCategory(rank: string | null) {
  if (!rank) return null;
  return Object.keys(rankSymbols).find((category) =>
    rank.toLowerCase().includes(category.toLowerCase()),
  );
}

function getInitials(teacher: TeacherRegistryEntry) {
  const source = teacher.nameRomaji || teacher.nameNative || "Teacher";
  const initials = source
    .split(/\s+/)
    .map((part) => part.match(/[\p{L}\p{N}]/u)?.[0] ?? "")
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return initials || "—";
}

export function TeacherAvatar({
  teacher,
  size = "card",
}: {
  teacher: TeacherRegistryEntry;
  size?: "card" | "modal";
}) {
  const dimensions =
    size === "modal" ? "h-14 w-14 text-xl" : "h-11 w-11 text-sm xl:h-12 xl:w-12 xl:text-base";

  if (teacher.photoUrl) {
    return (
      <span
        role="img"
        aria-label={`${teacher.nameRomaji || teacher.nameNative || "Teacher"} portrait`}
        className={`${dimensions} block shrink-0 rounded-full bg-cover bg-center`}
        style={{ backgroundImage: `url("${teacher.photoUrl}")` }}
      />
    );
  }

  return (
    <span
      aria-hidden="true"
      className={`${dimensions} flex shrink-0 items-center justify-center rounded-full bg-[#d8cba8] font-semibold text-[#664d33] md:bg-[#8b7355] md:text-white xl:bg-[#d8cba8]`}
    >
      {getInitials(teacher)}
    </span>
  );
}

export function TeacherRankBadge({ rank }: { rank: string | null }) {
  const category = getRankCategory(rank);
  const label = category || rank || "Verified";

  return (
    <span className="bg-brand-accent inline-flex max-w-full items-center gap-1 rounded-sm px-1.5 py-[3px] text-[10px] leading-none font-semibold text-white xl:px-2 xl:py-1 xl:text-[11px]">
      {category && <span className="font-bold">{rankSymbols[category]}</span>}
      <span className="truncate">{label}</span>
    </span>
  );
}

export function TeacherCard({ teacher, view, onSelect }: TeacherCardProps) {
  return (
    <button
      type="button"
      onClick={() => onSelect(teacher)}
      className={`group focus-visible:outline-primary w-full border border-[#f3f4f6] bg-white p-4 text-left shadow-[0_4px_6px_rgba(0,0,0,0.02)] transition-[border-color,box-shadow,transform] hover:-translate-y-0.5 hover:border-[#d8cba8] hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 ${
        view === "list" ? "md:flex md:items-center md:justify-between" : ""
      } rounded-md md:rounded-sm xl:p-5`}
      aria-label={`View ${teacher.nameRomaji || teacher.nameNative || "teacher"} profile`}
    >
      <span className="flex min-w-0 items-center gap-3 xl:gap-4">
        <TeacherAvatar teacher={teacher} />
        <span className="min-w-0 flex-1">
          <span className="font-heading text-foreground block truncate text-[15px] leading-[1.45] font-bold xl:text-base">
            {teacher.nameNative || teacher.nameRomaji || "Name pending"}
          </span>
          <span className="text-muted-foreground block truncate text-xs leading-[1.25] xl:text-[13px]">
            {teacher.nameRomaji || teacher.nameNative || "Approved instructor"}
          </span>
        </span>
      </span>

      <span
        className={`mt-3 flex min-w-0 items-center ${
          view === "grid"
            ? "justify-between md:justify-start md:gap-3"
            : "md:mt-0 md:w-[42%] md:justify-between"
        } xl:mt-4`}
      >
        <TeacherRankBadge rank={teacher.rank} />
        <span className="text-muted-foreground truncate text-xs xl:text-[13px]">
          {teacher.countryName || "Country pending"}
        </span>
      </span>
    </button>
  );
}
