import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { AddDownloadDocumentForm } from "@/components/admin/AddDownloadDocumentForm";
import { DownloadDocumentActions } from "@/components/admin/DownloadDocumentActions";
import { getCurrentUser } from "@/lib/auth";
import { getAdminDownloadDocuments } from "@/lib/downloads";
import { downloadCategories } from "@/lib/downloads-content";

export const metadata: Metadata = {
  title: "Admin — Downloads",
  robots: { index: false, follow: false },
};

export default async function AdminDownloadsPage() {
  const currentUser = await getCurrentUser();
  if (!currentUser) redirect("/login");

  const canManage = currentUser.role === "sohonbu_admin";
  const rows = await getAdminDownloadDocuments();
  const categoryTitleById = new Map(downloadCategories.map((c) => [c.id, c.title]));

  return (
    <>
      <h1 className="text-muted-foreground text-sm font-medium tracking-wide uppercase">
        Downloads
      </h1>
      <p className="text-muted-foreground mt-1 text-xs">
        Federation documents shown on /resources/downloads, grouped by category. Only Sohonbu
        Admin can add or remove documents — there&apos;s no approval queue for this content.
      </p>
      {rows.length === 0 ? (
        <p className="border-border text-muted-foreground mt-3 border p-4 text-sm">
          No documents yet.
        </p>
      ) : (
        <table className="mt-3 w-full border-collapse text-sm">
          <thead>
            <tr className="border-border border-b text-left">
              <th className="py-2">Category</th>
              <th className="py-2">Title</th>
              <th className="py-2">Type</th>
              <th className="py-2">Size</th>
              <th className="py-2">File</th>
              {canManage && <th className="py-2">Actions</th>}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id} className="border-border border-b">
                <td className="py-2">{categoryTitleById.get(row.categoryId) ?? row.categoryId}</td>
                <td className="py-2">{row.title}</td>
                <td className="py-2">{row.fileType}</td>
                <td className="py-2">{row.fileSizeLabel ?? "—"}</td>
                <td className="py-2">
                  {row.fileUrl ? (
                    <a
                      href={row.fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline underline-offset-2"
                    >
                      View
                    </a>
                  ) : (
                    <span className="text-muted-foreground">No file yet</span>
                  )}
                </td>
                {canManage && (
                  <td className="py-2">
                    <DownloadDocumentActions documentId={row.id} filePath={row.filePath} />
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {canManage && (
        <>
          <h2 className="text-muted-foreground mt-8 text-sm font-medium tracking-wide uppercase">
            Add a document
          </h2>
          <AddDownloadDocumentForm categories={downloadCategories} />
        </>
      )}
    </>
  );
}
