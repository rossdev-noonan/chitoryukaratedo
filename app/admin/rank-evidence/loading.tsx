import { Skeleton } from "@/components/ui/Skeleton";
import { TableSkeleton } from "@/components/ui/TableSkeleton";

export default function Loading() {
  return (
    <>
      <Skeleton className="h-4 w-32" />
      <TableSkeleton />
    </>
  );
}
