export interface Dictionary {
  nav: {
    about: string;
    history: string;
    leadership: string;
    dojoDirectory: string;
    teachers: string;
    news: string;
    events: string;
    resources: string;
    contact: string;
    joinUs: string;
    openMenu: string;
    closeMenu: string;
    language: string;
  };
  footer: {
    tagline: string;
    quickLinks: string;
    resourcesHeading: string;
    downloads: string;
    examinations: string;
    technicalDocuments: string;
    rulesAndGuidelines: string;
    connect: string;
    copyright: string;
    privacy: string;
    terms: string;
    admin: string;
  };
  home: {
    heroTitleLine1: string;
    heroTitleHighlight: string;
    heroTitleLine2: string;
    heroDescription: string;
    aboutChitoRyu: string;
    findADojo: string;
    originsLabel: string;
    originsHeading: string;
    originsDescription: string;
    accordion: { title: string; body: string }[];
    newsEventsLabel: string;
    latestUpdates: string;
    viewAllNews: string;
    newsCards: {
      category: string;
      title: string;
      detail: string;
    }[];
    ctaHeading: string;
    ctaDescription: string;
    dojoFinderLabel: string;
    dojoFinderHeading: string;
    dojoFinderDescription: string;
    searchPlaceholder: string;
    allRegions: string;
    allCountries: string;
    search: string;
    continents: {
      northAmerica: string;
      southAmerica: string;
      europe: string;
      africa: string;
      asia: string;
      australia: string;
    };
    dojoCountLabel: string;
  };
}
