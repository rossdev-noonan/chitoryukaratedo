import { ArrowRight } from "lucide-react";
import Link from "next/link";

export function HomeCTA() {
  return (
    <section className="bg-primary-dark">
      <div className="mx-auto flex max-w-7xl flex-col items-start gap-6 px-4 py-12 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-10">
        <div>
          <h2 className="font-heading text-2xl font-bold text-white sm:text-3xl">
            Join Our Global Community
          </h2>
          <p className="mt-2 text-white/80">
            Find a certified dojo near you and begin your journey.
          </p>
        </div>
        <Link
          href="/dojo-directory"
          className="text-primary-dark inline-flex shrink-0 items-center gap-2 bg-white px-6 py-3 text-sm font-bold transition-opacity hover:opacity-90"
        >
          Find a Dojo
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}
