import Image from "next/image";

import { OriginsAccordion } from "@/components/public/home/OriginsAccordion";

export function HomeOrigins() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-10">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
        <div className="relative mx-auto aspect-[4/3] w-full max-w-md overflow-hidden lg:aspect-[4/5]">
          <Image
            src="/images/homepage/founder-portrait.jpeg"
            alt="Portrait of O-Sensei Tsuyoshi Chitose, founder of Chito-Ryu Karate-Do"
            fill
            sizes="(min-width: 1024px) 448px, 100vw"
            className="object-cover"
          />
          <span className="font-heading absolute bottom-4 left-4 text-lg font-bold text-white drop-shadow">
            千歳 强直
          </span>
        </div>

        <div>
          <p className="text-primary text-sm font-semibold tracking-widest uppercase">Leadership</p>
          <h2 className="font-heading mt-2 text-3xl font-bold sm:text-4xl">起源 / Origins</h2>
          <p className="text-muted-foreground mt-4">
            O-Sensei was told by Arigaki Sensei that Karate-do originated approximately one thousand
            years ago in China. Based on this, O-Sensei named his style &lsquo;Chito Ryu&rsquo;,
            according to the origins of Karate-do.
          </p>
          <OriginsAccordion />
        </div>
      </div>
    </section>
  );
}
