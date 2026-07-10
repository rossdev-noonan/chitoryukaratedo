"use client";

import { useActionState, useState } from "react";
import { toRomaji, isJapanese } from "wanakana";

import { submitTeacherAction, type SubmitTeacherActionState } from "@/app/admin/teachers/actions";
import type { AdminDojoRow, AdminTeacherRow } from "@/lib/admin-records";

const initialState: SubmitTeacherActionState = { error: null, success: false };

function normalizeName(name: string): string {
  return name.trim().toLowerCase().replace(/\s+/g, " ");
}

function findLikelyDuplicate(
  candidate: string,
  teachers: AdminTeacherRow[],
): AdminTeacherRow | null {
  const normalizedCandidate = normalizeName(candidate);
  if (!normalizedCandidate) return null;

  return (
    teachers.find((teacher) => {
      if (!teacher.nameRomaji) return false;
      const normalizedExisting = normalizeName(teacher.nameRomaji);
      return (
        normalizedExisting === normalizedCandidate ||
        normalizedExisting.includes(normalizedCandidate) ||
        normalizedCandidate.includes(normalizedExisting)
      );
    }) ?? null
  );
}

interface SubmitTeacherFormProps {
  dojos: AdminDojoRow[];
  teachers: AdminTeacherRow[];
}

export function SubmitTeacherForm({ dojos, teachers }: SubmitTeacherFormProps) {
  const [state, formAction, pending] = useActionState(submitTeacherAction, initialState);
  const [selectedDojoId, setSelectedDojoId] = useState("");
  const selectedDojo = dojos.find((dojo) => dojo.id === selectedDojoId);
  const [nameKana, setNameKana] = useState("");
  const [nameRomajiAuto, setNameRomajiAuto] = useState("");
  const [nameRomajiFinal, setNameRomajiFinal] = useState("");
  const [romajiTouchedByUser, setRomajiTouchedByUser] = useState(false);
  const likelyDuplicate = findLikelyDuplicate(nameRomajiFinal, teachers);

  function handleKanaChange(value: string) {
    setNameKana(value);
    if (!isJapanese(value)) {
      setNameRomajiAuto("");
      return;
    }
    const romaji = toRomaji(value).trim();
    setNameRomajiAuto(romaji);
    if (!romajiTouchedByUser) {
      setNameRomajiFinal(romaji);
    }
  }

  return (
    <form action={formAction} className="border-border mt-3 flex max-w-md flex-col gap-3 border p-4">
      <label className="flex flex-col gap-1 text-sm">
        Dojo
        <select
          name="dojoId"
          required
          value={selectedDojoId}
          onChange={(event) => setSelectedDojoId(event.target.value)}
          className="border-border border px-3 py-2"
        >
          <option value="" disabled>
            Select a dojo
          </option>
          {dojos.map((dojo) => (
            <option key={dojo.id} value={dojo.id}>
              {dojo.name}
            </option>
          ))}
        </select>
      </label>
      <input type="hidden" name="countryId" value={selectedDojo?.countryId ?? ""} />
      <label className="flex flex-col gap-1 text-sm">
        Slug
        <input name="slug" required placeholder="e.g. jane-smith" className="border-border border px-3 py-2" />
      </label>
      <label className="flex flex-col gap-1 text-sm">
        Name (native script — kanji)
        <input name="nameNative" className="border-border border px-3 py-2" />
      </label>
      <label className="flex flex-col gap-1 text-sm">
        Name (kana — hiragana/katakana)
        <input
          name="nameKana"
          value={nameKana}
          onChange={(event) => handleKanaChange(event.target.value)}
          placeholder="e.g. ヤマダ タロウ"
          className="border-border border px-3 py-2"
        />
        <span className="text-muted-foreground text-xs">
          Romaji is auto-suggested from this field. Kanji can&apos;t be converted automatically
          (readings are ambiguous) — enter kana here for an accurate suggestion.
        </span>
      </label>
      <input type="hidden" name="nameRomajiAuto" value={nameRomajiAuto} />
      <label className="flex flex-col gap-1 text-sm">
        Name (Romaji — final, editable)
        <input
          name="nameRomajiFinal"
          required
          value={nameRomajiFinal}
          onChange={(event) => {
            setRomajiTouchedByUser(true);
            setNameRomajiFinal(event.target.value);
          }}
          className="border-border border px-3 py-2"
        />
        {likelyDuplicate && (
          <span className="text-xs text-amber-600">
            This looks similar to an existing teacher: &quot;{likelyDuplicate.nameRomaji}&quot;
            ({likelyDuplicate.status}). Double-check this isn&apos;t a duplicate before
            submitting.
          </span>
        )}
      </label>
      <label className="flex flex-col gap-1 text-sm">
        Rank
        <input name="rank" className="border-border border px-3 py-2" />
      </label>
      {state.error && (
        <p role="alert" className="text-sm text-red-600">
          {state.error}
        </p>
      )}
      {state.success && <p className="text-sm text-green-700">Submitted for approval.</p>}
      <button
        type="submit"
        disabled={pending}
        className="border-border border px-4 py-2 text-sm disabled:opacity-50"
      >
        {pending ? "Submitting…" : "Submit for approval"}
      </button>
    </form>
  );
}
