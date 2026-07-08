"use client";

import { useActionState, useState } from "react";

import {
  submitRankEvidenceAction,
  type SubmitRankEvidenceActionState,
} from "@/app/admin/rank-evidence/actions";
import type { RankEvidenceTeacherOption } from "@/lib/rank-evidence";

const initialState: SubmitRankEvidenceActionState = { error: null, success: false };

interface SubmitRankEvidenceFormProps {
  teachers: RankEvidenceTeacherOption[];
}

export function SubmitRankEvidenceForm({ teachers }: SubmitRankEvidenceFormProps) {
  const [state, formAction, pending] = useActionState(submitRankEvidenceAction, initialState);
  const [selectedTeacherId, setSelectedTeacherId] = useState("");
  const selectedTeacher = teachers.find((teacher) => teacher.id === selectedTeacherId);

  return (
    <form
      action={formAction}
      encType="multipart/form-data"
      className="border-border mt-3 flex max-w-md flex-col gap-3 border p-4"
    >
      <label className="flex flex-col gap-1 text-sm">
        Teacher
        <select
          name="teacherId"
          required
          value={selectedTeacherId}
          onChange={(event) => setSelectedTeacherId(event.target.value)}
          className="border-border border px-3 py-2"
        >
          <option value="" disabled>
            Select a teacher
          </option>
          {teachers.map((teacher) => (
            <option key={teacher.id} value={teacher.id}>
              {teacher.name ?? "(unnamed)"}
            </option>
          ))}
        </select>
      </label>
      <input type="hidden" name="dojoId" value={selectedTeacher?.dojoId ?? ""} />
      <label className="flex flex-col gap-1 text-sm">
        Rank claimed
        <input name="rankClaimed" required className="border-border border px-3 py-2" />
      </label>
      <label className="flex flex-col gap-1 text-sm">
        Issued by
        <input name="issuedBy" className="border-border border px-3 py-2" />
      </label>
      <label className="flex flex-col gap-1 text-sm">
        Issued date
        <input type="date" name="issuedDate" className="border-border border px-3 py-2" />
      </label>
      <label className="flex flex-col gap-1 text-sm">
        Evidence file (PDF, JPG, or PNG — max 10MB)
        <input type="file" name="file" required accept=".pdf,.jpg,.jpeg,.png" className="text-sm" />
      </label>
      {state.error && (
        <p role="alert" className="text-sm text-red-600">
          {state.error}
        </p>
      )}
      {state.success && <p className="text-sm text-green-700">Submitted for review.</p>}
      <button
        type="submit"
        disabled={pending}
        className="border-border border px-4 py-2 text-sm disabled:opacity-50"
      >
        {pending ? "Uploading…" : "Submit for review"}
      </button>
    </form>
  );
}
