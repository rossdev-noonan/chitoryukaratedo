import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { homeNewsCards } from "@/lib/homepage-content";

export function HomeNewsEvents() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-10">
      <div className="flex items-end justify-between">
        <p className="text-primary text-sm font-semibold tracking-widest uppercase">
          News &amp; Events
        </p>
        <Link
          href="/news"
          className="text-primary hidden text-sm font-semibold hover:underline sm:inline"
        >
          View all news
        </Link>
      </div>
      <h2 className="font-heading mt-2 text-3xl font-bold sm:text-4xl">Latest Updates</h2>

      <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {homeNewsCards.map((card) => (
          <Link key={card.title} href={card.href} className="group block">
            <div className="relative aspect-[16/10] w-full overflow-hidden">
              <Image
                src={card.imageSrc}
                alt=""
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover transition-transform group-hover:scale-105"
              />
            </div>
            <p className="text-primary mt-4 text-xs font-semibold tracking-wide uppercase">
              {card.category}
            </p>
            <h3 className="font-heading mt-1 text-lg font-bold">{card.title}</h3>
            <p className="text-muted-foreground mt-2 flex items-center gap-1.5 text-sm">
              {card.detail}
              <ArrowRight className="h-3.5 w-3.5 shrink-0 transition-transform group-hover:translate-x-0.5" />
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}
