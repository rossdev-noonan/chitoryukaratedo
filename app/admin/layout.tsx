import { redirect } from "next/navigation";

import { logoutAction } from "@/app/admin/actions";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { getCurrentUser } from "@/lib/auth";

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="flex flex-1">
      <AdminSidebar />
      <div className="flex flex-1 flex-col">
        <header className="border-border flex items-center justify-between border-b px-6 py-3 text-sm">
          <span className="text-muted-foreground">
            {user.email} · {user.role.replace("_", " ")}
          </span>
          <form action={logoutAction}>
            <button type="submit" className="underline underline-offset-4">
              Log out
            </button>
          </form>
        </header>
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
