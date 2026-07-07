type ApprovalStatus = "pending" | "approved" | "rejected";

interface StatusBadgeProps {
  status: ApprovalStatus;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const label = status.charAt(0).toUpperCase() + status.slice(1);
  return (
    <span className="border-border border px-2 py-0.5 text-xs tracking-wide uppercase">
      {label}
    </span>
  );
}
