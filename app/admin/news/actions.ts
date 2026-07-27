"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";

import { getCurrentUser } from "@/lib/auth";
import { uploadImage, validateImage } from "@/lib/news-event-images";
import { createSupabaseServerClient } from "@/lib/supabase/server";

const submitNewsSchema = z.object({
  slug: z
    .string()
    .min(1)
    .max(100)
    .regex(/^[a-z0-9-]+$/, "Lowercase letters, numbers, and hyphens only."),
  title: z.string().min(1).max(200),
  tag: z.string().min(1).max(60),
  subtitle: z.string().max(200).optional(),
  description: z.string().max(2000).optional(),
  publishedAt: z.string().min(1),
  showOnMobile: z.boolean(),
  countryId: z.string().uuid().optional().or(z.literal("")),
});

export interface SubmitNewsActionState {
  error: string | null;
  success: boolean;
}

export async function submitNewsAction(
  _prevState: SubmitNewsActionState,
  formData: FormData,
): Promise<SubmitNewsActionState> {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return { error: "You must be logged in.", success: false };
  }
  if (currentUser.role === "teacher") {
    return { error: "Teachers cannot submit news posts.", success: false };
  }

  const parsed = submitNewsSchema.safeParse({
    slug: formData.get("slug"),
    title: formData.get("title"),
    tag: formData.get("tag"),
    subtitle: formData.get("subtitle") || undefined,
    description: formData.get("description") || undefined,
    publishedAt: formData.get("publishedAt"),
    showOnMobile: formData.get("showOnMobile") === "on",
    countryId: formData.get("countryId") || undefined,
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid submission.", success: false };
  }

  const desktopFile = formData.get("imageDesktop");
  const mobileFile = formData.get("imageMobile");
  const desktopError = validateImage(desktopFile, true);
  if (desktopError) return { error: desktopError, success: false };
  const mobileError = validateImage(mobileFile, false);
  if (mobileError) return { error: mobileError, success: false };

  const supabase = await createSupabaseServerClient();
  const countryId = parsed.data.countryId || null;

  if (currentUser.role === "country_admin") {
    if (countryId !== currentUser.countryId) {
      return { error: "You can only submit news for your assigned country.", success: false };
    }
  }

  if (currentUser.role === "dojo_admin") {
    const { data: dojo } = await supabase
      .from("dojos")
      .select("country_id")
      .eq("id", currentUser.dojoId ?? "")
      .maybeSingle();

    if (!dojo || countryId !== dojo.country_id) {
      return { error: "You can only submit news for your dojo's country.", success: false };
    }
  }

  const desktopUpload = await uploadImage(supabase, currentUser.id, desktopFile as File);
  if (desktopUpload.error) return { error: desktopUpload.error, success: false };

  let mobileImageUrl: string | null = null;
  if (mobileFile instanceof File && mobileFile.size > 0) {
    const mobileUpload = await uploadImage(supabase, currentUser.id, mobileFile);
    if (mobileUpload.error) return { error: mobileUpload.error, success: false };
    mobileImageUrl = mobileUpload.url;
  }

  const { error } = await supabase.from("approvals").insert({
    entity_type: "news_post",
    action: "create",
    payload: {
      slug: parsed.data.slug,
      title: parsed.data.title,
      tag: parsed.data.tag,
      subtitle: parsed.data.subtitle ?? null,
      description: parsed.data.description ?? null,
      published_at: parsed.data.publishedAt,
      image_desktop: desktopUpload.url,
      image_mobile: mobileImageUrl,
      show_on_mobile: parsed.data.showOnMobile,
      country_id: countryId,
      status: "pending",
    },
    submitted_by: currentUser.id,
    status: "pending",
  });

  if (error) {
    return { error: error.message, success: false };
  }

  revalidatePath("/admin/approvals");
  return { error: null, success: true };
}
