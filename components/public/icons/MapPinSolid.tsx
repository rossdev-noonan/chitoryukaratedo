// Literal Figma "map-pin" asset (node 507:359 / 92:1157) — a solid filled
// pin, not lucide's stroke-outline MapPin. Inlined (not <img>) so it can
// inherit `text-*` color via currentColor the same way lucide icons do.
export function MapPinSolid({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path
        d="M7.99902 0.5C9.59023 0.5 11.117 1.13244 12.2422 2.25781C13.3672 3.38316 13.999 4.90954 13.999 6.50098C13.999 10.2462 9.84511 14.1469 8.4502 15.3516C8.32026 15.4493 8.16157 15.502 7.99902 15.502C7.83665 15.5018 7.67863 15.4492 7.54883 15.3516C6.15391 14.1469 2 10.2462 2 6.50098C2 4.90954 2.63179 3.38316 3.75684 2.25781C4.88187 1.13256 6.40799 0.500128 7.99902 0.5ZM8 4.25098C6.75731 4.25098 5.74902 5.25829 5.74902 6.50098C5.74902 7.74367 6.75731 8.75098 8 8.75098C9.24247 8.75071 10.25 7.74351 10.25 6.50098C10.25 5.25845 9.24247 4.25124 8 4.25098Z"
        fill="currentColor"
      />
    </svg>
  );
}
