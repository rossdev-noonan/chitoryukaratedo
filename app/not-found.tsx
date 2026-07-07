import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-6xl flex-1 flex-col items-start justify-center px-4 py-24 sm:px-6">
      <h1 className="text-2xl font-semibold tracking-tight">Page not found</h1>
      <p className="text-muted-foreground mt-2">
        The page you are looking for does not exist or has been moved.
      </p>
      <Link href="/" className="mt-6 text-sm underline underline-offset-4">
        Return home
      </Link>
    </div>
  );
}
