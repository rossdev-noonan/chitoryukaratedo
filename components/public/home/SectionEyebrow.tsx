interface SectionEyebrowProps {
  children: string;
  centered?: boolean;
}

export function SectionEyebrow({ children, centered = false }: SectionEyebrowProps) {
  return (
    <p
      data-visual-label={children}
      className={`figma-eyebrow relative text-sm font-semibold tracking-widest text-[#806735] uppercase ${centered ? "text-center" : ""}`}
    >
      {children}
    </p>
  );
}
