"use client";

import { useState, useTransition } from "react";

import {
  getRankEvidenceSignedUrlAction,
  reviewRankEvidenceAction,
} from "@/app/admin/rank-evidence/actions";

interface RankEvidenceActionsProps {
  rankEvidenceId: string;
  canReview: boolean;
}

export function RankEvidenceActions({ rankEvidenceId, canReview }: RankEvidenceActionsProps) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  function handleDecision(decision: "approved" | "rejected") {
    setError(null);
    startTransition(async () => {
      const result = await reviewRankEvidenceAction(rankEvidenceId, decision);
      if (result.error) setError(result.error);
    });
  }

  function handleView() {
    setError(null);
    startTransition(async () => {
      const result = await getRankEvidenceSignedUrlAction(rankEvidenceId);
      if (result.error || !result.url) {
        setError(result.error ?? "Could not open file.");
        return;
      }
      window.open(result.url, "_blank", "noopener,noreferrer");
    });
  }

  return (
    <div>
      <div className="flex gap-2">
        <button
          type="button"
          disabled={isPending}
          onClick={handleView}
          className="border-border border px-2 py-1 text-xs disabled:opacity-50"
        >
          View file
        </button>
        {canReview && (
          <>
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
          </>
        )}
      </div>
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
}
