"use client";

import { useActionState, useState, useTransition } from "react";

import {
  deactivateUserAction,
  reactivateUserAction,
  updateUserAction,
  type UpdateUserActionState,
} from "@/app/admin/users/actions";
import type { AdminDojoRow, AdminTeacherRow } from "@/lib/admin-records";
import type { Country } from "@/lib/directory";
import type { AdminUserRow } from "@/lib/users";

const roleOptions = [
  { value: "sohonbu_admin", label: "Sohonbu Admin" },
  { value: "country_admin", label: "Country Admin" },
  { value: "dojo_admin", label: "Dojo Admin" },
  { value: "teacher", label: "Teacher" },
];

const initialState: UpdateUserActionState = { error: null, success: false };

interface UserRowProps {
  user: AdminUserRow;
  isSelf: boolean;
  countries: Country[];
  dojos: AdminDojoRow[];
  teachers: AdminTeacherRow[];
}

export function UserRow({ user, isSelf, countries, dojos, teachers }: UserRowProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [role, setRole] = useState(user.role);
  const [state, formAction, pending] = useActionState(updateUserAction, initialState);
  const [isTogglingActive, startToggleActiveTransition] = useTransition();
  const [toggleActiveError, setToggleActiveError] = useState<string | null>(null);
  const isDeactivated = Boolean(user.deactivatedAt);

  if (isEditing) {
    return (
      <tr className="border-border border-b align-top">
        <td className="py-2" colSpan={4}>
          <form action={formAction} className="flex flex-wrap items-end gap-2">
            <input type="hidden" name="userId" value={user.id} />
            <label className="flex flex-col gap-1 text-xs">
              Name
              <input
                name="fullName"
                required
                defaultValue={user.fullName ?? ""}
                className="border-border border px-2 py-1 text-sm"
              />
            </label>
            <label className="flex flex-col gap-1 text-xs">
              Role
              <select
                name="role"
                required
                value={role}
                onChange={(event) => setRole(event.target.value as typeof role)}
                className="border-border border px-2 py-1 text-sm"
              >
                {roleOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>
            {role === "country_admin" && (
              <label className="flex flex-col gap-1 text-xs">
                Country
                <select
                  name="countryId"
                  required
                  defaultValue={user.countryId ?? ""}
                  className="border-border border px-2 py-1 text-sm"
                >
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
            )}
            {role === "dojo_admin" && (
              <label className="flex flex-col gap-1 text-xs">
                Dojo
                <select
                  name="dojoId"
                  required
                  defaultValue={user.dojoId ?? ""}
                  className="border-border border px-2 py-1 text-sm"
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
            )}
            {role === "teacher" && (
              <label className="flex flex-col gap-1 text-xs">
                Linked teacher
                <select
                  name="teacherId"
                  required
                  defaultValue={user.teacherId ?? ""}
                  className="border-border border px-2 py-1 text-sm"
                >
                  <option value="" disabled>
                    Select a teacher record
                  </option>
                  {teachers.map((teacher) => (
                    <option key={teacher.id} value={teacher.id}>
                      {teacher.nameRomaji ?? "(unnamed)"}
                    </option>
                  ))}
                </select>
              </label>
            )}
            <button
              type="submit"
              disabled={pending}
              className="border-border border px-3 py-1 text-xs disabled:opacity-50"
            >
              {pending ? "Saving…" : "Save"}
            </button>
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="border-border border px-3 py-1 text-xs"
            >
              Cancel
            </button>
          </form>
          {state.error && <p className="mt-1 text-xs text-red-600">{state.error}</p>}
        </td>
      </tr>
    );
  }

  return (
    <tr className="border-border border-b">
      <td className="py-2">{user.fullName ?? "—"}</td>
      <td className="py-2">{user.email}</td>
      <td className="py-2 capitalize">
        {user.role.replace("_", " ")}
        {isDeactivated && (
          <span className="text-muted-foreground ml-2 text-xs normal-case">(deactivated)</span>
        )}
      </td>
      <td className="py-2">
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setIsEditing(true)}
            className="border-border border px-2 py-1 text-xs"
          >
            Edit
          </button>
          {isDeactivated ? (
            <button
              type="button"
              disabled={isTogglingActive}
              onClick={() => {
                setToggleActiveError(null);
                startToggleActiveTransition(async () => {
                  const result = await reactivateUserAction(user.id);
                  if (result.error) setToggleActiveError(result.error);
                });
              }}
              className="border-border border px-2 py-1 text-xs disabled:opacity-50"
            >
              {isTogglingActive ? "Reactivating…" : "Reactivate"}
            </button>
          ) : (
            <button
              type="button"
              disabled={isSelf || isTogglingActive}
              onClick={() => {
                if (!window.confirm(`Deactivate ${user.email}? They will lose access immediately.`))
                  return;
                setToggleActiveError(null);
                startToggleActiveTransition(async () => {
                  const result = await deactivateUserAction(user.id);
                  if (result.error) setToggleActiveError(result.error);
                });
              }}
              title={isSelf ? "You cannot deactivate your own account" : undefined}
              className="border-border border px-2 py-1 text-xs disabled:opacity-50"
            >
              {isTogglingActive ? "Deactivating…" : "Deactivate"}
            </button>
          )}
        </div>
        {toggleActiveError && <p className="mt-1 text-xs text-red-600">{toggleActiveError}</p>}
      </td>
    </tr>
  );
}
