import type { Metadata } from "next";

import { StatusBadge } from "@/components/admin/StatusBadge";
import { SubmitEventForm } from "@/components/admin/SubmitEventForm";
import { getAllDojosForAdmin } from "@/lib/admin-records";
import { getCurrentUser } from "@/lib/auth";
import { getCountries } from "@/lib/directory";
import { getAllEventsForAdmin } from "@/lib/events";

export const metadata: Metadata = {
  title: "Admin — Events",
  robots: { index: false, follow: false },
};

export default async function AdminEventsPage() {
  const [currentUser, events, countries, dojos] = await Promise.all([
    getCurrentUser(),
    getAllEventsForAdmin(),
    getCountries(),
    getAllDojosForAdmin(),
  ]);

  let scopedCountryId: string | null = null;
  if (currentUser?.role === "country_admin") {
    scopedCountryId = currentUser.countryId;
  } else if (currentUser?.role === "dojo_admin") {
    scopedCountryId = dojos.find((dojo) => dojo.id === currentUser.dojoId)?.countryId ?? null;
  }
  const scopedCountryName = countries.find((country) => country.id === scopedCountryId)?.name ?? null;

  return (
    <>
      <h1 className="text-muted-foreground text-sm font-medium tracking-wide uppercase">
        Event submissions &amp; records
      </h1>
      {events.length === 0 ? (
        <p className="border-border text-muted-foreground mt-3 border p-4 text-sm">
          No events yet.
        </p>
      ) : (
        <table className="mt-3 w-full border-collapse text-sm">
          <thead>
            <tr className="border-border border-b text-left">
              <th className="py-2">Title</th>
              <th className="py-2">Location</th>
              <th className="py-2">Start date</th>
              <th className="py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event) => (
              <tr key={event.id} className="border-border border-b">
                <td className="py-2">{event.title}</td>
                <td className="py-2">{event.location}</td>
                <td className="py-2">{event.startDate}</td>
                <td className="py-2">
                  <StatusBadge status={event.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {currentUser && currentUser.role !== "teacher" && (
        <>
          <h2 className="text-muted-foreground mt-8 text-sm font-medium tracking-wide uppercase">
            Submit an event
          </h2>
          <p className="text-muted-foreground mt-1 text-xs">
            Goes to the approval queue — it won&apos;t appear publicly until Sohonbu Admin
            approves it.
          </p>
          <SubmitEventForm
            countries={countries}
            currentUserRole={currentUser.role}
            scopedCountryId={scopedCountryId}
            scopedCountryName={scopedCountryName}
          />
        </>
      )}
    </>
  );
}
