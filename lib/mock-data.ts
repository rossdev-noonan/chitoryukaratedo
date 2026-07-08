export interface MockPost {
  slug: string;
  title: string;
  date: string;
  location?: string;
}

export const mockNewsPosts: MockPost[] = [
  { slug: "example-news-1", title: "— (placeholder headline)", date: "—" },
];

export const mockEvents: MockPost[] = [
  { slug: "example-event-1", title: "— (placeholder event)", date: "—", location: "—" },
];
