import { CardGridSkeleton } from "@/components/ui/CardGridSkeleton";
import { PageHeaderSkeleton } from "@/components/ui/PageHeaderSkeleton";
import { Skeleton } from "@/components/ui/Skeleton";

export default function Loading() {
  return (
    <>
      <PageHeaderSkeleton />
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Skeleton className="h-10 w-full max-w-sm" />
        <CardGridSkeleton count={4} />
      </div>
    </>
  );
}
