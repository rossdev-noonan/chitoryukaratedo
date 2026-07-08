import type { Metadata } from "next";

import { AcceptInviteForm } from "@/components/auth/AcceptInviteForm";

export const metadata: Metadata = {
  title: "Accept Invite",
  robots: { index: false, follow: false },
};

export default function AcceptInvitePage() {
  return (
    <div className="border-border w-full max-w-sm border p-6">
      <h1 className="text-center text-sm font-medium tracking-wide">Accept Invite</h1>
      <p className="text-muted-foreground mt-2 text-center text-xs">
        Set a password to finish setting up your account.
      </p>
      <AcceptInviteForm />
    </div>
  );
}
