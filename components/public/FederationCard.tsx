import { ArrowRight } from "lucide-react";
import Image from "next/image";

import type { Country } from "@/lib/directory";

interface FederationCardProps {
  country: Country;
}

export function FederationCard({ country }: FederationCardProps) {
  const isAustralia = country.slug === "australia";

  return (
    <div className="border-border/60 flex w-full max-w-[743px] flex-col gap-5 border bg-white px-5 py-6 shadow-[0_4px_6px_rgba(0,0,0,0.02)] sm:flex-row sm:items-center">
      <div className="flex h-[100px] w-full shrink-0 items-center justify-center overflow-hidden sm:w-40">
        {isAustralia ? (
          <Image
            src="/images/figma/flag-australia.png"
            alt="Australian flag"
            width={160}
            height={100}
            className="h-full w-full object-cover"
          />
        ) : (
          <span className="font-heading text-center text-2xl font-bold text-[#1f2937]">
            {country.name}
          </span>
        )}
      </div>
      <div className="min-w-0 flex-1 text-sm">
        <div className="flex flex-wrap items-center gap-2.5">
          <p className="font-heading text-base font-bold text-[#1f2937]">
            {country.federationName ?? `Chito-Ryu ${country.name}`}
          </p>
          <span className="bg-brand-accent rounded-[2px] px-3 py-1 text-xs font-bold text-[#faf9f7] uppercase">
            ICKF Affiliated
          </span>
        </div>
        {country.representative && (
          <p className="mt-2 text-xs text-[#4b5563]">{country.representative}</p>
        )}
        <p className="mt-2 text-xs text-[#4b5563]">
          Officially recognized Chito-Ryu federation for {country.name}.
        </p>
        {country.federationSiteUrl && (
          <a
            href={country.federationSiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary mt-2 inline-flex items-center gap-2 text-xs text-[#4b5563]"
          >
            Visit official {country.name} site
            <ArrowRight className="text-primary h-4 w-4" />
          </a>
        )}
      </div>
    </div>
  );
}
