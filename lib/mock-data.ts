export interface MockCountry {
  slug: string;
  name: string;
  hasOwnFederationSite: boolean;
  federationSiteUrl: string | null;
  federationName: string | null;
  representative: string | null;
}

export interface MockDojo {
  slug: string;
  name: string;
  countrySlug: string;
  city: string;
  headInstructor: string;
  contactEmail: string;
}

export interface MockTeacher {
  slug: string;
  nameNative: string;
  nameRomaji: string;
  rank: string;
  dojoSlug: string;
  countrySlug: string;
}

export interface MockPost {
  slug: string;
  title: string;
  date: string;
  location?: string;
}

export const mockCountries: MockCountry[] = [
  {
    slug: "canada",
    name: "Canada",
    hasOwnFederationSite: true,
    federationSiteUrl: "https://ickf.ca",
    federationName: "ICKF Canada",
    representative: "— (placeholder, pending Mike confirmation)",
  },
  {
    slug: "usa",
    name: "United States",
    hasOwnFederationSite: true,
    federationSiteUrl: "https://usa-ickf.com",
    federationName: "USA-ICKF",
    representative: "— (placeholder, pending Mike confirmation)",
  },
  {
    slug: "australia",
    name: "Australia",
    hasOwnFederationSite: false,
    federationSiteUrl: null,
    federationName: null,
    representative: null,
  },
];

export const mockDojos: MockDojo[] = [
  {
    slug: "example-dojo-1",
    name: "Example Dojo",
    countrySlug: "australia",
    city: "— (placeholder city)",
    headInstructor: "— (placeholder instructor)",
    contactEmail: "—",
  },
];

export const mockTeachers: MockTeacher[] = [
  {
    slug: "example-teacher-1",
    nameNative: "—",
    nameRomaji: "— (placeholder)",
    rank: "— (placeholder rank)",
    dojoSlug: "example-dojo-1",
    countrySlug: "australia",
  },
];

export const mockNewsPosts: MockPost[] = [
  { slug: "example-news-1", title: "— (placeholder headline)", date: "—" },
];

export const mockEvents: MockPost[] = [
  { slug: "example-event-1", title: "— (placeholder event)", date: "—", location: "—" },
];
