"use client";

import { useActionState } from "react";

import { submitEventAction, type SubmitEventActionState } from "@/app/admin/events/actions";
import type { AppRole } from "@/lib/auth";
import type { Country } from "@/lib/directory";

const initialState: SubmitEventActionState = { error: null, success: false };

interface SubmitEventFormProps {
  countries: Country[];
  currentUserRole: AppRole;
  scopedCountryId: string | null;
  scopedCountryName: string | null;
}

export function SubmitEventForm({
  countries,
  currentUserRole,
  scopedCountryId,
  scopedCountryName,
}: SubmitEventFormProps) {
  const [state, formAction, pending] = useActionState(submitEventAction, initialState);
  const canChooseCountry = currentUserRole === "sohonbu_admin";

  return (
    <form
      action={formAction}
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
          placeholder="e.g. fiji-dan-grading"
          className="border-border border px-3 py-2"
        />
      </label>
      <label className="flex flex-col gap-1 text-sm">
        Tags (comma-separated)
        <input
          name="tags"
          required
          placeholder="Dan Grading, Seminar"
          className="border-border border px-3 py-2"
        />
      </label>
      <label className="flex flex-col gap-1 text-sm">
        Location
        <input
          name="location"
          required
          placeholder="e.g. Suva, Fiji"
          className="border-border border px-3 py-2"
        />
      </label>
      <label className="flex flex-col gap-1 text-sm">
        Start date
        <input type="date" name="startDate" required className="border-border border px-3 py-2" />
      </label>
      <label className="flex flex-col gap-1 text-sm">
        End date (optional — for multi-day events)
        <input type="date" name="endDate" className="border-border border px-3 py-2" />
      </label>
      <label className="flex flex-col gap-1 text-sm">
        Venue address line 1 (optional — only shown if this becomes the featured event)
        <input name="addressLine1" className="border-border border px-3 py-2" />
      </label>
      <label className="flex flex-col gap-1 text-sm">
        Venue address line 2 (optional)
        <input name="addressLine2" className="border-border border px-3 py-2" />
      </label>
      <label className="flex flex-col gap-1 text-sm">
        Poster image path — desktop (optional)
        <input
          name="posterDesktop"
          placeholder="/images/events/my-poster.png"
          className="border-border border px-3 py-2"
        />
        <span className="text-muted-foreground text-xs">
          Path to an image already placed in the site&apos;s public folder — there is no upload UI
          yet.
        </span>
      </label>
      <label className="flex flex-col gap-1 text-sm">
        Poster image path — mobile (optional)
        <input name="posterMobile" className="border-border border px-3 py-2" />
      </label>
      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" name="showOnMobile" defaultChecked />
        Show on mobile
      </label>

      {canChooseCountry ? (
        <label className="flex flex-col gap-1 text-sm">
          Country (optional — leave blank for federation-wide events)
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
        {pending ? "Submitting…" : "Submit for approval"}
      </button>
    </form>
  );
}
