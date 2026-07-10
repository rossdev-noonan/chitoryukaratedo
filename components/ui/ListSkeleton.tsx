import { Skeleton } from "@/components/ui/Skeleton";

interface ListSkeletonProps {
  count?: number;
}

export function ListSkeleton({ count = 5 }: ListSkeletonProps) {
  return (
    <ul className="mt-8">
      {Array.from({ length: count }).map((_, index) => (
        <li key={index} className="border-border border-b py-3">
          <Skeleton className="h-4 w-64 max-w-full" />
        </li>
      ))}
    </ul>
  );
}
