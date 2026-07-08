import type { Metadata } from "next";

import { InviteAdminForm } from "@/components/admin/InviteAdminForm";
import { getAllUsers } from "@/lib/users";

export const metadata: Metadata = {
  title: "Admin — Users",
  robots: { index: false, follow: false },
};

export default async function AdminUsersPage() {
  const users = await getAllUsers();

  return (
    <>
      <h1 className="text-muted-foreground text-sm font-medium tracking-wide uppercase">
        User &amp; role management
      </h1>
      <p className="text-muted-foreground mt-1 text-xs">
        Sohonbu Admin only. Invite-only — there is no public signup.
      </p>
      <table className="mt-3 w-full border-collapse text-sm">
        <thead>
          <tr className="border-border border-b text-left">
            <th className="py-2">Name</th>
            <th className="py-2">Email</th>
            <th className="py-2">Role</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="border-border border-b">
              <td className="py-2">{user.fullName ?? "—"}</td>
              <td className="py-2">{user.email}</td>
              <td className="py-2 capitalize">{user.role.replace("_", " ")}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2 className="text-muted-foreground mt-8 text-sm font-medium tracking-wide uppercase">
        Invite a new admin
      </h2>
      <InviteAdminForm />
    </>
  );
}
