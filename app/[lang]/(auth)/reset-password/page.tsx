import type { Metadata } from "next";

import { ResetPasswordForm } from "@/components/auth/ResetPasswordForm";

export const metadata: Metadata = {
  title: "Reset Password",
  robots: { index: false, follow: false },
};

export default function ResetPasswordPage() {
  return (
    <div className="border-border w-full max-w-sm border p-6">
      <h1 className="text-center text-sm font-medium tracking-wide">Reset Password</h1>
      <p className="text-muted-foreground mt-2 text-center text-xs">
        Enter your email to get a reset link, or set your new password if you&apos;ve just clicked
        one.
      </p>
      <ResetPasswordForm />
    </div>
  );
}
