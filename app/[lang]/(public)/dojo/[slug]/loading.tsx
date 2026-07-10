import { PageHeaderSkeleton } from "@/components/ui/PageHeaderSkeleton";
import { Skeleton } from "@/components/ui/Skeleton";

export default function Loading() {
  return (
    <>
      <PageHeaderSkeleton />
      <div className="mx-auto mt-8 max-w-6xl px-4 sm:px-6">
        <Skeleton className="h-4 w-48" />
      </div>
    </>
  );
}
