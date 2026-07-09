"use client";

import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

interface SearchBoxProps {
  placeholder: string;
  initialQuery: string;
}

// Takes the current query as a prop (read from the Server Component page's
// searchParams) rather than calling useSearchParams() itself — that hook
// requires a Suspense boundary around any Client Component that uses it on
// a dynamically-rendered route, otherwise the production build fails. Since
// the page is already a Server Component reading searchParams, passing the
// value down avoids that entirely.
export function SearchBox({ placeholder, initialQuery }: SearchBoxProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [value, setValue] = useState(initialQuery);

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    const params = new URLSearchParams();
    if (value.trim()) {
      params.set("q", value.trim());
    }
    const queryString = params.toString();
    router.push(queryString ? `${pathname}?${queryString}` : pathname);
  }

  return (
    <form onSubmit={handleSubmit} className="mt-4 flex max-w-sm gap-2">
      <input
        type="search"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        placeholder={placeholder}
        className="border-border w-full border px-3 py-2 text-sm"
      />
      <button type="submit" className="border-border border px-4 py-2 text-sm">
        Search
      </button>
    </form>
  );
}
