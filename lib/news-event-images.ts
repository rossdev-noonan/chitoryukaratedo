import { randomUUID } from "crypto";

import type { createSupabaseServerClient } from "@/lib/supabase/server";

type SupabaseServerClient = Awaited<ReturnType<typeof createSupabaseServerClient>>;

const MAX_IMAGE_BYTES = 5 * 1024 * 1024;
const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];

export function validateImage(file: FormDataEntryValue | null, required: boolean): string | null {
  if (!(file instanceof File) || file.size === 0) {
    return required ? "Attach an image." : null;
  }
  if (file.size > MAX_IMAGE_BYTES) {
    return "Image is too large (max 5MB).";
  }
  if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
    return "Only JPG, PNG, or WEBP images are accepted.";
  }
  return null;
}

export async function uploadImage(
  supabase: SupabaseServerClient,
  userId: string,
  file: File,
): Promise<{ url: string | null; error: string | null }> {
  const extension = file.name.split(".").pop() ?? "bin";
  const path = `${userId}/${randomUUID()}.${extension}`;

  const { error: uploadError } = await supabase.storage
    .from("news-event-images")
    .upload(path, file, { contentType: file.type });

  if (uploadError) {
    return { url: null, error: `Image upload failed: ${uploadError.message}` };
  }

  const { data } = supabase.storage.from("news-event-images").getPublicUrl(path);
  return { url: data.publicUrl, error: null };
}
