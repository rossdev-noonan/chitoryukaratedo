"use client";

import { useState, useTransition } from "react";

import { reviewApprovalAction } from "@/app/admin/approvals/actions";

interface ApprovalActionsProps {
  approvalId: string;
}

export function ApprovalActions({ approvalId }: ApprovalActionsProps) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  function handleDecision(decision: "approved" | "rejected") {
    setError(null);
    startTransition(async () => {
      const result = await reviewApprovalAction(approvalId, decision);
      if (result.error) setError(result.error);
    });
  }

  return (
    <div>
      <div className="flex gap-2">
        <button
          type="button"
          disabled={isPending}
          onClick={() => handleDecision("approved")}
          className="border-border border px-2 py-1 text-xs disabled:opacity-50"
        >
          Approve
        </button>
        <button
          type="button"
          disabled={isPending}
          onClick={() => handleDecision("rejected")}
          className="border-border border px-2 py-1 text-xs disabled:opacity-50"
        >
          Reject
        </button>
      </div>
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
}
