import { ArrowRight, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function HomeHero() {
  return (
    <section className="relative h-[600px] overflow-hidden sm:h-[720px]">
      <Image
        src="/images/homepage/hero-practitioner.png"
        alt="A Chito-Ryu Karate-Do practitioner in a fighting stance"
        fill
        priority
        sizes="100vw"
        className="object-cover object-right"
      />

      <span
        aria-hidden="true"
        className="text-background/70 font-heading absolute top-16 right-8 hidden text-6xl font-bold tracking-widest sm:right-16 lg:block"
        style={{ writingMode: "vertical-rl" }}
      >
        力必達
      </span>

      <div className="relative mx-auto flex h-full max-w-7xl items-center px-4 sm:px-6 lg:px-10">
        <div className="max-w-xl">
          <h1 className="font-heading text-4xl leading-tight font-medium sm:text-5xl">
            <span className="text-foreground">Preserving Tradition.</span>
            <br />
            <span className="text-primary">Inspiring</span>{" "}
            <span className="text-foreground">the World.</span>
          </h1>
          <p className="text-muted-foreground mt-6 max-w-md">
            Chito Ryu Karate-Do is one of the oldest styles of karate, founded in Okinawa and
            brought to the world through dedication, discipline and respect.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/about"
              className="bg-primary text-primary-foreground inline-flex items-center gap-2 rounded-md px-6 py-3 text-sm font-bold transition-opacity hover:opacity-90"
            >
              About Chito Ryu
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/dojo-directory"
              className="border-border bg-background/90 text-foreground inline-flex items-center gap-2 rounded-md border px-6 py-3 text-sm font-bold transition-colors hover:bg-white"
            >
              Find a Dojo
              <MapPin className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
