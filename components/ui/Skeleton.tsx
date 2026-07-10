interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className }: SkeletonProps) {
  return <div className={`bg-muted animate-pulse ${className ?? ""}`} />;
}
