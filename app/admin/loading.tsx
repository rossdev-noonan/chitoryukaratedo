import { Skeleton } from "@/components/ui/Skeleton";
import { TableSkeleton } from "@/components/ui/TableSkeleton";

export default function Loading() {
  return (
    <>
      <Skeleton className="h-4 w-24" />
      <div className="mt-3 grid grid-cols-3 gap-3">
        <Skeleton className="h-16 border" />
        <Skeleton className="h-16 border" />
        <Skeleton className="h-16 border" />
      </div>
      <Skeleton className="mt-8 h-4 w-56" />
      <TableSkeleton />
    </>
  );
}
