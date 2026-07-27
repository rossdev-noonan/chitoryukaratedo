"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";

import { getCurrentUser } from "@/lib/auth";
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
  imageDesktop: z.string().min(1).max(500),
  imageMobile: z.string().max(500).optional(),
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
    imageDesktop: formData.get("imageDesktop"),
    imageMobile: formData.get("imageMobile") || undefined,
    showOnMobile: formData.get("showOnMobile") === "on",
    countryId: formData.get("countryId") || undefined,
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid submission.", success: false };
  }

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
      image_desktop: parsed.data.imageDesktop,
      image_mobile: parsed.data.imageMobile ?? null,
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
