"use client";

import { useState, useTransition } from "react";

import { deleteDownloadDocumentAction } from "@/app/admin/downloads/actions";

interface DownloadDocumentActionsProps {
  documentId: string;
  filePath: string | null;
}

export function DownloadDocumentActions({ documentId, filePath }: DownloadDocumentActionsProps) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  function handleDelete() {
    if (!window.confirm("Remove this document? This can't be undone.")) return;
    setError(null);
    startTransition(async () => {
      const result = await deleteDownloadDocumentAction(documentId, filePath);
      if (result.error) setError(result.error);
    });
  }

  return (
    <div>
      <button
        type="button"
        disabled={isPending}
        onClick={handleDelete}
        className="border-border border px-2 py-1 text-xs disabled:opacity-50"
      >
        Remove
      </button>
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
}
