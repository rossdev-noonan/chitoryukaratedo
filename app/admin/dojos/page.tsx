import type { Metadata } from "next";

import { StatusBadge } from "@/components/admin/StatusBadge";
import { SubmitDojoForm } from "@/components/admin/SubmitDojoForm";
import { getAllDojosForAdmin } from "@/lib/admin-records";
import { getCountries } from "@/lib/directory";

export const metadata: Metadata = {
  title: "Admin — Dojos",
  robots: { index: false, follow: false },
};

export default async function AdminDojosPage() {
  const [dojos, countries] = await Promise.all([getAllDojosForAdmin(), getCountries()]);

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

      <h2 className="text-muted-foreground mt-8 text-sm font-medium tracking-wide uppercase">
        Submit a new dojo
      </h2>
      <p className="text-muted-foreground mt-1 text-xs">
        Goes to the approval queue — it won&apos;t appear publicly until Sohonbu Admin approves it.
      </p>
      <SubmitDojoForm countries={countries} />
    </>
  );
}
