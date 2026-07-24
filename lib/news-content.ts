// Static content matching Gil's Figma News page design (node 723:4498 /
// 731:1105), hardcoded until Sanity is provisioned — same pattern as
// lib/homepage-content.ts and lib/events-content.ts.

export interface NewsFeaturedStory {
  tag: string;
  title: string;
  dateLocationLabel: string;
  description: string;
  bannerSrc: { desktop: string; mobile: string };
}

export const newsFeaturedStory: NewsFeaturedStory = {
  tag: "EVENT",
  title: "15th Chito Ryu Karate Soke Cup Announced",
  dateLocationLabel: "Aug 14 - Aug 15, 2026 · Gold Coast, Australia",
  description:
    "The federation's flagship international competition returns to the Gold Coast this August, bringing together practitioners from over twenty countries.",
  bannerSrc: {
    desktop: "/images/news/featured-banner-desktop.png",
    mobile: "/images/news/featured-banner-mobile.png",
  },
};

export interface NewsArticle {
  slug: string;
  tag: string;
  title: string;
  subtitle?: string;
  date: string;
  visualSrc: { desktop: string; mobile?: string };
  showOnMobile: boolean;
}

export const newsArticles: NewsArticle[] = [
  {
    slug: "message-from-the-soke",
    tag: "MESSAGE FROM THE SOKE",
    title: "Message from the Soke",
    date: "Jul 18, 2026",
    visualSrc: {
      desktop: "/images/news/card-0-desktop.png",
      mobile: "/images/news/card-0-mobile.png",
    },
    showOnMobile: true,
  },
  {
    slug: "new-dojo-in-brazil",
    tag: "DOJO UPDATES",
    title: "New Dojo in Brazil",
    subtitle: "Chito Ryu continues to grow in South America",
    date: "Jul 10, 2026",
    visualSrc: {
      desktop: "/images/news/card-1-desktop.png",
      mobile: "/images/news/card-1-mobile.png",
    },
    showOnMobile: true,
  },
  {
    slug: "2027-grading-calendar-released",
    tag: "ANNOUNCEMENTS",
    title: "2027 Grading Calendar Released",
    date: "Jul 2, 2026",
    visualSrc: {
      desktop: "/images/news/card-2-desktop.png",
      mobile: "/images/news/card-2-mobile.png",
    },
    showOnMobile: true,
  },
  {
    slug: "scotland-dojo-celebrates-20-years",
    tag: "DOJO UPDATES",
    title: "Scotland Dojo Celebrates 20 Years",
    date: "Jun 24, 2026",
    visualSrc: { desktop: "/images/news/card-3-desktop.png" },
    showOnMobile: false,
  },
  {
    slug: "updated-technical-guidelines-published",
    tag: "ANNOUNCEMENTS",
    title: "Updated Technical Guidelines Published",
    date: "Jun 15, 2026",
    visualSrc: { desktop: "/images/news/card-4-desktop.png" },
    showOnMobile: false,
  },
  {
    slug: "canada-hosts-first-national-seminar",
    tag: "DOJO UPDATES",
    title: "Canada Hosts First National Seminar",
    date: "Jun 3, 2026",
    visualSrc: { desktop: "/images/news/card-5-desktop.png" },
    showOnMobile: false,
  },
];

export const newsFilterChipsDesktop = [
  "All",
  "Announcements",
  "Events",
  "Dojo Updates",
  "Message from the Soke",
];

export const newsFilterChipsMobile = ["All", "Announcements", "Events", "Dojo Updates", "Soke Messages"];
