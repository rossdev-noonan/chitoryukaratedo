interface JsonLdProps {
  data: Record<string, unknown>;
}

// The standard pattern for embedding schema.org structured data in Next.js —
// script tag content isn't a normal React child, so dangerouslySetInnerHTML
// is required here. Safe because the only input is JSON.stringify'd data we
// constructed ourselves (never raw HTML), with "<" escaped so a value
// containing "</script>" can't break out of the tag.
export function JsonLd({ data }: JsonLdProps) {
  const json = JSON.stringify(data).replace(/</g, "\\u003c");
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}
