import Image from "next/image";
import type { CSSProperties } from "react";

interface HistoryPhotoProps {
  src: string;
  alt: string;
  frameClassName: string;
  imageClassName?: string;
  imageStyle?: CSSProperties;
  caption?: string;
  subtitle?: string;
}

export function HistoryPhoto({
  src,
  alt,
  frameClassName,
  imageClassName = "object-contain",
  imageStyle,
  caption,
  subtitle,
}: HistoryPhotoProps) {
  return (
    <figure className="w-full min-w-0">
      <div
        className={`relative overflow-visible bg-transparent ${frameClassName}`}
      >
        <Image
          src={src}
          alt={alt}
          width={1447}
          height={1024}
          sizes="(min-width: 1280px) 772px, 100vw"
          className={`${imageClassName} drop-shadow-[0_20px_40px_rgba(0,0,0,0.06)]`}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            ...imageStyle,
          }}
        />
      </div>
      {caption && (
        <figcaption className="mt-4 text-center text-base font-bold text-black">
          {caption}
        </figcaption>
      )}
      {subtitle && <p className="text-center text-xs text-black">{subtitle}</p>}
    </figure>
  );
}
