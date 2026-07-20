import Image from "next/image";

// Individual/paired-person portraits render as circular crops in Figma
// (masked with an ellipse layer on the canvas — the Figma-to-code export
// only describes the underlying rectangle node, so this isn't visible in
// the generated markup, only in the actual rendered design).
export function Portrait({ src, name, caption }: { src: string; name: string; caption: string }) {
  return (
    <div>
      <div className="relative mx-auto aspect-square w-full max-w-[350px] overflow-hidden rounded-full shadow-[0px_20px_40px_0px_rgba(0,0,0,0.06)]">
        <Image src={src} alt={name} fill sizes="350px" className="object-cover" />
      </div>
      <p className="mt-4 text-center text-base font-semibold text-black">{name}</p>
      <p className="text-center text-xs text-black">{caption}</p>
    </div>
  );
}

export function CaptionedPhoto({
  src,
  alt,
  caption,
  subtitle,
  circular = false,
}: {
  src: string;
  alt: string;
  caption?: string;
  subtitle?: string;
  circular?: boolean;
}) {
  return (
    <div className="w-full min-w-0">
      <div
        className={
          circular
            ? "relative mx-auto aspect-square w-full max-w-[420px] overflow-hidden rounded-full shadow-[0px_20px_40px_0px_rgba(0,0,0,0.06)]"
            : "relative h-[320px] w-full shadow-[0px_20px_40px_0px_rgba(0,0,0,0.06)] sm:h-[420px] lg:h-[420px]"
        }
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(min-width: 1024px) 713px, 100vw"
          className="object-cover"
        />
      </div>
      {caption && <p className="mt-4 text-center text-base font-semibold text-black">{caption}</p>}
      {subtitle && <p className="text-center text-xs text-black">{subtitle}</p>}
    </div>
  );
}
