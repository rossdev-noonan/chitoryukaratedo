import { ArrowRight, ChevronDown, MapPin, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { getApprovedDojos } from "@/lib/directory";

export async function HomeDojoFinder() {
  const dojos = await getApprovedDojos(4);

  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-10">
      <div className="text-center">
        <p className="text-primary text-sm font-semibold tracking-widest uppercase">Find a Dojo</p>
        <h2 className="font-heading mt-2 text-3xl font-bold sm:text-4xl">Dojo Directory</h2>
        <p className="text-muted-foreground mt-2">Find an official Chito Ryu dojo near you.</p>
      </div>

      <Link
        href="/dojo-directory"
        className="border-border bg-background mx-auto mt-8 flex max-w-3xl flex-col gap-3 border p-3 transition-colors hover:bg-black/[0.02] sm:flex-row sm:items-center"
      >
        <span className="border-border text-muted-foreground flex flex-1 items-center gap-2 border-b px-2 py-2 text-sm sm:border-r sm:border-b-0">
          <Search className="h-4 w-4 shrink-0" />
          Search by country or city
        </span>
        <span className="text-muted-foreground flex items-center gap-1.5 px-2 py-2 text-sm">
          All Regions
          <ChevronDown className="h-3.5 w-3.5" />
        </span>
        <span className="text-muted-foreground flex items-center gap-1.5 px-2 py-2 text-sm">
          All Countries
          <ChevronDown className="h-3.5 w-3.5" />
        </span>
        <span className="bg-primary text-primary-foreground px-6 py-2.5 text-center text-sm font-bold">
          Search
        </span>
      </Link>

      <div className="relative mx-auto mt-10 aspect-[1100/480] w-full max-w-5xl">
        <Image
          src="/images/homepage/world-map.png"
          alt="World map showing Chito-Ryu dojo locations"
          fill
          sizes="(min-width: 1024px) 1024px, 100vw"
          className="object-contain"
        />
      </div>

      {dojos.length > 0 && (
        <div className="mx-auto mt-10 flex max-w-5xl flex-col gap-3">
          {dojos.map((dojo) => (
            <Link
              key={dojo.slug}
              href={`/dojo/${dojo.slug}`}
              className="border-border bg-background flex items-center justify-between gap-4 border p-4 transition-colors hover:bg-black/[0.02]"
            >
              <div className="flex items-center gap-4">
                <span className="bg-primary/10 text-primary flex h-12 w-12 shrink-0 items-center justify-center">
                  <MapPin className="h-5 w-5" />
                </span>
                <div>
                  <p className="font-heading font-bold">{dojo.name}</p>
                  {dojo.city && <p className="text-muted-foreground text-sm">{dojo.city}</p>}
                </div>
              </div>
              <div className="hidden items-center gap-6 sm:flex">
                {dojo.contactEmail && (
                  <span className="text-muted-foreground text-sm">{dojo.contactEmail}</span>
                )}
                <ArrowRight className="text-primary h-5 w-5 shrink-0" />
              </div>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}
