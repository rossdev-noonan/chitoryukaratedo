"use client";

import { useActionState } from "react";

import { inviteAdminAction, type InviteActionState } from "@/app/admin/users/actions";

const initialState: InviteActionState = { error: null, success: false };

const roleOptions = [
  { value: "sohonbu_admin", label: "Sohonbu Admin (global)" },
  { value: "country_admin", label: "Country Admin" },
  { value: "dojo_admin", label: "Dojo Admin" },
  { value: "teacher", label: "Teacher" },
];

export function InviteAdminForm() {
  const [state, formAction, pending] = useActionState(inviteAdminAction, initialState);

  return (
    <form action={formAction} className="border-border mt-3 flex max-w-md flex-col gap-3 border p-4">
      <label className="flex flex-col gap-1 text-sm">
        Full name
        <input name="fullName" required className="border-border border px-3 py-2" />
      </label>
      <label className="flex flex-col gap-1 text-sm">
        Email
        <input type="email" name="email" required className="border-border border px-3 py-2" />
      </label>
      <label className="flex flex-col gap-1 text-sm">
        Role
        <select name="role" required defaultValue="" className="border-border border px-3 py-2">
          <option value="" disabled>
            Select a role
          </option>
          {roleOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>
      {state.error && (
        <p role="alert" className="text-sm text-red-600">
          {state.error}
        </p>
      )}
      {state.success && <p className="text-sm text-green-700">Invite sent.</p>}
      <button
        type="submit"
        disabled={pending}
        className="border-border border px-4 py-2 text-sm disabled:opacity-50"
      >
        {pending ? "Sending…" : "Send invite"}
      </button>
    </form>
  );
}
