// Static content matching the Figma design, hardcoded until Sanity is
// provisioned (see project memory — Sanity was never actually created).
// Isolated here so swapping this for live Sanity queries later only means
// changing the functions that read this file, not the components.

export interface HomeNewsCard {
  category: "Event" | "News";
  title: string;
  detail: string;
  imageSrc: string;
  href: string;
}

export const homeNewsCards: HomeNewsCard[] = [
  {
    category: "Event",
    title: "15th Chito-Ryu Karate Soke Cup",
    detail: "Aug 13 - Aug 15, 2026 · Gold Coast, Australia",
    imageSrc: "/images/homepage/news-soke-cup.jpeg",
    href: "/events",
  },
  {
    category: "News",
    title: "Message from the Soke",
    detail: "Read the latest message from our Soke.",
    imageSrc: "/images/homepage/news-message-from-soke.jpeg",
    href: "/news",
  },
  {
    category: "News",
    title: "New Dojo In Brazil",
    detail: "Chito Ryu continues to grow in South America.",
    imageSrc: "/images/homepage/news-new-dojo.jpeg",
    href: "/news",
  },
  {
    category: "Event",
    title: "Spring Camp",
    detail: "Train together in Kumamoto, Japan.",
    imageSrc: "/images/homepage/news-spring-camp.png",
    href: "/events",
  },
];

export interface HomeUpcomingEvent {
  startDate: string;
  href: string;
}

export const homeUpcomingEvents: HomeUpcomingEvent[] = [{ startDate: "2026-08-13", href: "/events" }];

export interface OriginsAccordionItem {
  title: string;
  body: string;
}

export const originsAccordionItems: OriginsAccordionItem[] = [
  {
    title: "The Meaning of CHI, TO, RYU",
    body: "“Chi” refers to the Tang Dynasty of China, “To” also references China (the old name “To”/唐), and “Ryu” means style or school — together honoring the Chinese origins of the art within a Japanese style.",
  },
  {
    title: "From Tang Dynasty to Okinawa",
    body: "Karate-do's roots trace back roughly a thousand years to Chinese martial traditions of the Tang Dynasty, which travelled to and were refined on Okinawa over centuries before reaching mainland Japan.",
  },
  {
    title: "Chitose Sensei and the Modern Era",
    body: "O-Sensei Tsuyoshi Chitose consolidated these teachings into a single, coherent style in 1946, emphasizing safety, anatomical study, and preserving the practical fighting techniques often lost in sport-focused karate.",
  },
];
