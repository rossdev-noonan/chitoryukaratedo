import type { Metadata } from "next";

import { StatusBadge } from "@/components/admin/StatusBadge";
import { getAllDojosForAdmin } from "@/lib/admin-records";

export const metadata: Metadata = {
  title: "Admin — Dojos",
  robots: { index: false, follow: false },
};

export default async function AdminDojosPage() {
  const dojos = await getAllDojosForAdmin();

  return (
    <>
      <h1 className="text-muted-foreground text-sm font-medium tracking-wide uppercase">
        Dojo submissions &amp; records
      </h1>
      {dojos.length === 0 ? (
        <p className="border-border text-muted-foreground mt-3 border p-4 text-sm">
          No dojo records yet.
        </p>
      ) : (
        <table className="mt-3 w-full border-collapse text-sm">
          <thead>
            <tr className="border-border border-b text-left">
              <th className="py-2">Name</th>
              <th className="py-2">City</th>
              <th className="py-2">Head instructor</th>
              <th className="py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {dojos.map((dojo) => (
              <tr key={dojo.id} className="border-border border-b">
                <td className="py-2">{dojo.name}</td>
                <td className="py-2">{dojo.city ?? "—"}</td>
                <td className="py-2">{dojo.headInstructor ?? "—"}</td>
                <td className="py-2">
                  <StatusBadge status={dojo.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <p className="text-muted-foreground mt-3 text-xs">
        New dojos and edits go through the approval queue, not direct edits here — country/dojo
        admin submission forms land in a later pass.
      </p>
    </>
  );
}
