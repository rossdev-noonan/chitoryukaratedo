import type { Metadata } from "next";

import { LoginForm } from "./LoginForm";

export const metadata: Metadata = {
  title: "Admin Login",
  robots: { index: false, follow: false },
};

export default function LoginPage() {
  return (
    <div className="border-border w-full max-w-sm border p-6">
      <h1 className="text-center text-sm font-medium tracking-wide">Chito-Ryu Admin</h1>
      <p className="text-muted-foreground mt-2 text-center text-xs">
        Invite-only. No open signup.
      </p>
      <LoginForm />
    </div>
  );
}
