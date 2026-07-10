import type { Metadata } from "next";

import { HomeCTA } from "@/components/public/home/HomeCTA";
import { HomeDojoFinder } from "@/components/public/home/HomeDojoFinder";
import { HomeHero } from "@/components/public/home/HomeHero";
import { HomeNewsEvents } from "@/components/public/home/HomeNewsEvents";
import { HomeOrigins } from "@/components/public/home/HomeOrigins";

export const metadata: Metadata = {
  title: "Chito-Ryu International",
  description:
    "The official international home for Chito-Ryu — lineage, dojo directory, and teacher registry.",
};

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <HomeOrigins />
      <HomeNewsEvents />
      <HomeCTA />
      <HomeDojoFinder />
    </>
  );
}
