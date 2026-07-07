import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Accept Invite",
  robots: { index: false, follow: false },
};

export default function AcceptInvitePage() {
  return (
    <div className="border-border w-full max-w-sm border p-6">
      <h1 className="text-center text-sm font-medium tracking-wide">Accept Invite</h1>
      <p className="text-muted-foreground mt-2 text-center text-xs">
        Sets password and MFA enrolment. Not wired up yet — lands in Phase 4 (Supabase Auth).
      </p>
      <form className="mt-6 flex flex-col gap-3">
        <label className="flex flex-col gap-1 text-sm">
          New password
          <input
            type="password"
            name="password"
            className="border-border border px-3 py-2"
            disabled
          />
        </label>
        <label className="flex flex-col gap-1 text-sm">
          Confirm password
          <input
            type="password"
            name="confirmPassword"
            className="border-border border px-3 py-2"
            disabled
          />
        </label>
        <button
          type="submit"
          disabled
          className="border-border border px-4 py-2 text-sm disabled:opacity-50"
        >
          Set password (disabled — backend pending)
        </button>
      </form>
    </div>
  );
}
