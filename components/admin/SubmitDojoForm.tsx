"use client";

import { useActionState } from "react";

import { submitDojoAction, type SubmitDojoActionState } from "@/app/admin/dojos/actions";
import type { Country } from "@/lib/directory";

const initialState: SubmitDojoActionState = { error: null, success: false };

interface SubmitDojoFormProps {
  countries: Country[];
}

export function SubmitDojoForm({ countries }: SubmitDojoFormProps) {
  const [state, formAction, pending] = useActionState(submitDojoAction, initialState);

  return (
    <form action={formAction} className="border-border mt-3 flex max-w-md flex-col gap-3 border p-4">
      <label className="flex flex-col gap-1 text-sm">
        Dojo name
        <input name="name" required className="border-border border px-3 py-2" />
      </label>
      <label className="flex flex-col gap-1 text-sm">
        Slug
        <input name="slug" required placeholder="e.g. sydney-north" className="border-border border px-3 py-2" />
      </label>
      <label className="flex flex-col gap-1 text-sm">
        Country
        <select name="countryId" required defaultValue="" className="border-border border px-3 py-2">
          <option value="" disabled>
            Select a country
          </option>
          {countries.map((country) => (
            <option key={country.id} value={country.id}>
              {country.name}
            </option>
          ))}
        </select>
      </label>
      <label className="flex flex-col gap-1 text-sm">
        City
        <input name="city" className="border-border border px-3 py-2" />
      </label>
      <label className="flex flex-col gap-1 text-sm">
        Head instructor
        <input name="headInstructor" className="border-border border px-3 py-2" />
      </label>
      <label className="flex flex-col gap-1 text-sm">
        Contact email
        <input type="email" name="contactEmail" className="border-border border px-3 py-2" />
      </label>
      {state.error && (
        <p role="alert" className="text-sm text-red-600">
          {state.error}
        </p>
      )}
      {state.success && (
        <p className="text-sm text-green-700">Submitted for approval.</p>
      )}
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
