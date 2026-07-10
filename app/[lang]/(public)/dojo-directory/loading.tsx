import { ListSkeleton } from "@/components/ui/ListSkeleton";
import { PageHeaderSkeleton } from "@/components/ui/PageHeaderSkeleton";

export default function Loading() {
  return (
    <>
      <PageHeaderSkeleton />
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <ListSkeleton count={8} />
      </div>
    </>
  );
}
