import { Skeleton } from "@/components/ui/Skeleton";

export default function Loading() {
  return (
    <div className="mx-auto max-w-7xl px-4 pt-6 pb-10 sm:px-6 md:px-8 md:pt-8 xl:px-0 xl:pt-10 xl:pb-20">
      <Skeleton className="h-4 w-60" />
      <div className="mt-6 space-y-3">
        <Skeleton className="h-12 w-80 max-w-full" />
        <Skeleton className="h-5 w-[460px] max-w-full" />
      </div>
      <div className="mt-8 flex gap-3">
        <Skeleton className="h-12 flex-1" />
        <Skeleton className="hidden h-12 w-28 md:block" />
      </div>
      <Skeleton className="mt-6 h-8 w-80 max-w-full" />
      <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5 xl:grid-cols-3">
        {Array.from({ length: 8 }).map((_, index) => (
          <Skeleton key={index} className="h-[108px] xl:h-[125px]" />
        ))}
      </div>
    </div>
  );
}
