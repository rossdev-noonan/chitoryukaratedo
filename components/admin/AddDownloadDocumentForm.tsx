"use client";

import { useActionState } from "react";

import {
  addDownloadDocumentAction,
  type AddDownloadDocumentActionState,
} from "@/app/admin/downloads/actions";
import type { DownloadCategoryMeta } from "@/lib/downloads-content";

const initialState: AddDownloadDocumentActionState = { error: null, success: false };

interface AddDownloadDocumentFormProps {
  categories: DownloadCategoryMeta[];
}

export function AddDownloadDocumentForm({ categories }: AddDownloadDocumentFormProps) {
  const [state, formAction, pending] = useActionState(addDownloadDocumentAction, initialState);

  return (
    <form
      action={formAction}
      encType="multipart/form-data"
      className="border-border mt-3 flex max-w-md flex-col gap-3 border p-4"
    >
      <label className="flex flex-col gap-1 text-sm">
        Category
        <select name="categoryId" required defaultValue="" className="border-border border px-3 py-2">
          <option value="" disabled>
            Select a category
          </option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.title}
            </option>
          ))}
        </select>
      </label>
      <label className="flex flex-col gap-1 text-sm">
        Title
        <input name="title" required maxLength={200} className="border-border border px-3 py-2" />
      </label>
      <label className="flex flex-col gap-1 text-sm">
        File type
        <select name="fileType" required defaultValue="" className="border-border border px-3 py-2">
          <option value="" disabled>
            Select a file type
          </option>
          <option value="PDF">PDF</option>
          <option value="DOC">DOC</option>
          <option value="XLS">XLS</option>
        </select>
      </label>
      <label className="flex flex-col gap-1 text-sm">
        File (max 20MB)
        <input
          type="file"
          name="file"
          required
          accept=".pdf,.doc,.docx,.xls,.xlsx"
          className="text-sm"
        />
      </label>
      {state.error && (
        <p role="alert" className="text-sm text-red-600">
          {state.error}
        </p>
      )}
      {state.success && <p className="text-sm text-green-700">Document added.</p>}
      <button
        type="submit"
        disabled={pending}
        className="border-border border px-4 py-2 text-sm disabled:opacity-50"
      >
        {pending ? "Uploading…" : "Add document"}
      </button>
    </form>
  );
}
