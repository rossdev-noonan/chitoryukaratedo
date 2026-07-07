import type { MockCountry } from "@/lib/mock-data";

interface FederationCardProps {
  country: MockCountry;
}

export function FederationCard({ country }: FederationCardProps) {
  return (
    <div className="border-border border p-4 text-sm">
      <p className="font-medium">{country.federationName}</p>
      <p className="text-muted-foreground mt-1">{country.representative}</p>
      {country.federationSiteUrl && (
        <a
          href={country.federationSiteUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-block underline underline-offset-4"
        >
          Visit official {country.name} site
        </a>
      )}
    </div>
  );
}
