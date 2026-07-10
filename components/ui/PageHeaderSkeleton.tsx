import { Skeleton } from "@/components/ui/Skeleton";

export function PageHeaderSkeleton() {
  return (
    <div className="mx-auto max-w-6xl px-4 pt-16 sm:px-6">
      <Skeleton className="h-9 w-72 max-w-full" />
    </div>
  );
}
