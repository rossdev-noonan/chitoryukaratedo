import type { Metadata } from "next";

import { StatusBadge } from "@/components/admin/StatusBadge";
import { SubmitNewsForm } from "@/components/admin/SubmitNewsForm";
import { getAllDojosForAdmin } from "@/lib/admin-records";
import { getCurrentUser } from "@/lib/auth";
import { getCountries } from "@/lib/directory";
import { getAllNewsForAdmin } from "@/lib/news";

export const metadata: Metadata = {
  title: "Admin — News",
  robots: { index: false, follow: false },
};

export default async function AdminNewsPage() {
  const [currentUser, news, countries, dojos] = await Promise.all([
    getCurrentUser(),
    getAllNewsForAdmin(),
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
        News submissions &amp; records
      </h1>
      {news.length === 0 ? (
        <p className="border-border text-muted-foreground mt-3 border p-4 text-sm">
          No news posts yet.
        </p>
      ) : (
        <table className="mt-3 w-full border-collapse text-sm">
          <thead>
            <tr className="border-border border-b text-left">
              <th className="py-2">Title</th>
              <th className="py-2">Category</th>
              <th className="py-2">Published</th>
              <th className="py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {news.map((post) => (
              <tr key={post.id} className="border-border border-b">
                <td className="py-2">{post.title}</td>
                <td className="py-2">{post.tag}</td>
                <td className="py-2">{post.publishedAt}</td>
                <td className="py-2">
                  <StatusBadge status={post.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {currentUser && currentUser.role !== "teacher" && (
        <>
          <h2 className="text-muted-foreground mt-8 text-sm font-medium tracking-wide uppercase">
            Submit a news post
          </h2>
          <p className="text-muted-foreground mt-1 text-xs">
            Goes to the approval queue — it won&apos;t appear publicly until Sohonbu Admin
            approves it.
          </p>
          <SubmitNewsForm
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
