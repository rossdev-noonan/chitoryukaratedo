import Image from "next/image";

import type { FeaturedCountry } from "@/lib/countries-featured";

interface CountryFlagProps {
  country: FeaturedCountry;
  shape?: "circle" | "rect";
  className?: string;
}

// Fills its parent — wrap in a sized, `relative`-safe container (this uses
// `fill`, so the parent just needs a fixed height/width).
export function CountryFlag({ country, shape = "circle", className = "" }: CountryFlagProps) {
  const shapeClass = shape === "circle" ? "rounded-full" : "";

  return (
    <span className={`relative block h-full w-full ${shapeClass} ${className}`}>
      <Image
        src={country.flagSrc}
        alt=""
        fill
        sizes="80px"
        className={`object-cover ${shapeClass}`}
      />
    </span>
  );
}
