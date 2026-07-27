import type { ApprovalStatus } from "@/lib/approvals";
import type {
  EventsFeaturedEvent,
  EventsMonthOption,
  EventsUpcomingEvent,
} from "@/lib/events-content";
import { createSupabaseServerClient } from "@/lib/supabase/server";

interface EventRow {
  slug: string;
  title: string;
  tags: string[];
  location: string;
  date_range_label: string | null;
  start_date: string;
  address_line1: string | null;
  address_line2: string | null;
  poster_desktop: string | null;
  poster_mobile: string | null;
  show_on_mobile: boolean;
}

const EVENT_COLUMNS =
  "slug, title, tags, location, date_range_label, start_date, address_line1, address_line2, poster_desktop, poster_mobile, show_on_mobile";

const MONTH_ABBR = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

function dateParts(startDate: string) {
  const date = new Date(`${startDate}T00:00:00`);
  const month = MONTH_ABBR[date.getMonth()];
  const day = String(date.getDate());
  const year = date.getFullYear();
  return {
    month,
    day,
    monthGroupId: `month-${month.toLowerCase()}-${year}`,
    monthGroupLabel: `${date.toLocaleDateString("en-US", { month: "long" }).toUpperCase()} ${year}`,
  };
}

function formatSingleDate(startDate: string): string {
  return new Date(`${startDate}T00:00:00`).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function toUpcomingEvent(row: EventRow): EventsUpcomingEvent {
  const { month, day, monthGroupId, monthGroupLabel } = dateParts(row.start_date);
  return {
    slug: row.slug,
    title: row.title,
    location: row.location,
    tag: row.tags[0] ?? "",
    month,
    day,
    monthGroupId,
    monthGroupLabel,
    showOnMobile: row.show_on_mobile,
  };
}

function toFeaturedEvent(row: EventRow): EventsFeaturedEvent {
  const { month, day } = dateParts(row.start_date);
  return {
    title: row.title,
    dateRangeLabel: row.date_range_label ?? formatSingleDate(row.start_date),
    month,
    day,
    addressLine1: row.address_line1 ?? row.location,
    addressLine2: row.address_line2 ?? "",
    tagsDesktop: row.tags,
    tagsMobile: row.tags.slice(0, 3),
    posterSrc: {
      desktop: row.poster_desktop ?? "",
      mobile: row.poster_mobile ?? row.poster_desktop ?? "",
    },
  };
}

export async function getPublicFeaturedEvent(): Promise<EventsFeaturedEvent | null> {
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase
    .from("events")
    .select(EVENT_COLUMNS)
    .eq("featured", true)
    .order("start_date", { ascending: true })
    .limit(1)
    .maybeSingle<EventRow>();

  return data ? toFeaturedEvent(data) : null;
}

export async function getPublicUpcomingEvents(): Promise<EventsUpcomingEvent[]> {
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase
    .from("events")
    .select(EVENT_COLUMNS)
    .eq("featured", false)
    .order("start_date", { ascending: true });

  return ((data ?? []) as EventRow[]).map(toUpcomingEvent);
}

// Month sidebar/chip options are derived from whichever months actually have
// events, in chronological order — the old static content had a fixed
// Sep-Nov (desktop) vs Sep-Dec (mobile) list that no longer means anything
// once this is real data.
export function getEventsMonthOptions(events: EventsUpcomingEvent[]): EventsMonthOption[] {
  const seen = new Set<string>();
  const options: EventsMonthOption[] = [];

  for (const event of events) {
    if (seen.has(event.monthGroupId)) continue;
    seen.add(event.monthGroupId);
    options.push({ id: event.monthGroupId, label: event.monthGroupLabel });
  }

  return options;
}

export interface PublicEvent {
  slug: string;
  title: string;
  startDate: string;
  location: string | null;
}

export async function getEventBySlug(slug: string): Promise<PublicEvent | null> {
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase
    .from("events")
    .select("slug, title, start_date, location")
    .eq("slug", slug)
    .maybeSingle();

  if (!data) return null;

  return {
    slug: data.slug,
    title: data.title,
    startDate: data.start_date,
    location: data.location,
  };
}

export interface PublicEventSlug {
  slug: string;
  startDate: string;
}

// Every approved event's slug + date, featured or not — for the sitemap.
export async function getAllPublicEventSlugs(): Promise<PublicEventSlug[]> {
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase.from("events").select("slug, start_date");

  return (data ?? []).map((row) => ({ slug: row.slug, startDate: row.start_date }));
}

export interface AdminEventRow {
  id: string;
  slug: string;
  title: string;
  location: string;
  startDate: string;
  countryId: string | null;
  status: ApprovalStatus;
}

export async function getAllEventsForAdmin(): Promise<AdminEventRow[]> {
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase
    .from("events")
    .select("id, slug, title, location, start_date, country_id, status")
    .is("deleted_at", null)
    .order("start_date", { ascending: true });

  return (data ?? []).map((row) => ({
    id: row.id,
    slug: row.slug,
    title: row.title,
    location: row.location,
    startDate: row.start_date,
    countryId: row.country_id,
    status: row.status,
  }));
}
