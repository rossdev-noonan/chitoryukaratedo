"use client";

import { useActionState } from "react";

import { submitNewsAction, type SubmitNewsActionState } from "@/app/admin/news/actions";
import type { AppRole } from "@/lib/auth";
import type { Country } from "@/lib/directory";

const initialState: SubmitNewsActionState = { error: null, success: false };

const NEWS_TAGS = ["Announcements", "Events", "Dojo Updates", "Message from the Soke"];

interface SubmitNewsFormProps {
  countries: Country[];
  currentUserRole: AppRole;
  scopedCountryId: string | null;
  scopedCountryName: string | null;
}

export function SubmitNewsForm({
  countries,
  currentUserRole,
  scopedCountryId,
  scopedCountryName,
}: SubmitNewsFormProps) {
  const [state, formAction, pending] = useActionState(submitNewsAction, initialState);
  const canChooseCountry = currentUserRole === "sohonbu_admin";

  return (
    <form
      action={formAction}
      encType="multipart/form-data"
      className="border-border mt-3 flex max-w-md flex-col gap-3 border p-4"
    >
      <label className="flex flex-col gap-1 text-sm">
        Title
        <input name="title" required className="border-border border px-3 py-2" />
      </label>
      <label className="flex flex-col gap-1 text-sm">
        Slug
        <input
          name="slug"
          required
          placeholder="e.g. new-dojo-in-fiji"
          className="border-border border px-3 py-2"
        />
      </label>
      <label className="flex flex-col gap-1 text-sm">
        Category
        <select name="tag" required defaultValue="" className="border-border border px-3 py-2">
          <option value="" disabled>
            Select a category
          </option>
          {NEWS_TAGS.map((tag) => (
            <option key={tag} value={tag}>
              {tag}
            </option>
          ))}
        </select>
      </label>
      <label className="flex flex-col gap-1 text-sm">
        Subtitle (optional)
        <input name="subtitle" className="border-border border px-3 py-2" />
      </label>
      <label className="flex flex-col gap-1 text-sm">
        Description (optional — only shown if this becomes the featured story)
        <textarea name="description" rows={3} className="border-border border px-3 py-2" />
      </label>
      <label className="flex flex-col gap-1 text-sm">
        Published date
        <input
          type="date"
          name="publishedAt"
          required
          defaultValue={new Date().toISOString().slice(0, 10)}
          className="border-border border px-3 py-2"
        />
      </label>
      <label className="flex flex-col gap-1 text-sm">
        Image (desktop) — JPG, PNG, or WEBP, max 5MB
        <input
          type="file"
          name="imageDesktop"
          required
          accept="image/jpeg,image/png,image/webp"
          className="text-sm"
        />
      </label>
      <label className="flex flex-col gap-1 text-sm">
        Image (mobile, optional)
        <input type="file" name="imageMobile" accept="image/jpeg,image/png,image/webp" className="text-sm" />
      </label>
      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" name="showOnMobile" defaultChecked />
        Show on mobile
      </label>

      {canChooseCountry ? (
        <label className="flex flex-col gap-1 text-sm">
          Country (optional — leave blank for federation-wide news)
          <select name="countryId" defaultValue="" className="border-border border px-3 py-2">
            <option value="">— Global / federation-wide —</option>
            {countries.map((country) => (
              <option key={country.id} value={country.id}>
                {country.name}
              </option>
            ))}
          </select>
        </label>
      ) : (
        <div className="flex flex-col gap-1 text-sm">
          Country
          <input type="hidden" name="countryId" value={scopedCountryId ?? ""} />
          <p className="border-border bg-muted/30 border px-3 py-2 text-sm">
            {scopedCountryName ?? "No country assigned to your account"}
          </p>
        </div>
      )}

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
        {pending ? "Uploading…" : "Submit for approval"}
      </button>
    </form>
  );
}
