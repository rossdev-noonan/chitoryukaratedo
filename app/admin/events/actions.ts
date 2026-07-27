"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";

import { getCurrentUser } from "@/lib/auth";
import { uploadImage, validateImage } from "@/lib/news-event-images";
import { createSupabaseServerClient } from "@/lib/supabase/server";

const submitEventSchema = z.object({
  slug: z
    .string()
    .min(1)
    .max(100)
    .regex(/^[a-z0-9-]+$/, "Lowercase letters, numbers, and hyphens only."),
  title: z.string().min(1).max(200),
  tags: z.string().min(1).max(200),
  location: z.string().min(1).max(200),
  startDate: z.string().min(1),
  endDate: z.string().optional(),
  addressLine1: z.string().max(300).optional(),
  addressLine2: z.string().max(300).optional(),
  showOnMobile: z.boolean(),
  countryId: z.string().uuid().optional().or(z.literal("")),
});

export interface SubmitEventActionState {
  error: string | null;
  success: boolean;
}

export async function submitEventAction(
  _prevState: SubmitEventActionState,
  formData: FormData,
): Promise<SubmitEventActionState> {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return { error: "You must be logged in.", success: false };
  }
  if (currentUser.role === "teacher") {
    return { error: "Teachers cannot submit events.", success: false };
  }

  const parsed = submitEventSchema.safeParse({
    slug: formData.get("slug"),
    title: formData.get("title"),
    tags: formData.get("tags"),
    location: formData.get("location"),
    startDate: formData.get("startDate"),
    endDate: formData.get("endDate") || undefined,
    addressLine1: formData.get("addressLine1") || undefined,
    addressLine2: formData.get("addressLine2") || undefined,
    showOnMobile: formData.get("showOnMobile") === "on",
    countryId: formData.get("countryId") || undefined,
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid submission.", success: false };
  }

  const posterDesktopFile = formData.get("posterDesktop");
  const posterMobileFile = formData.get("posterMobile");
  const desktopError = validateImage(posterDesktopFile, false);
  if (desktopError) return { error: desktopError, success: false };
  const mobileError = validateImage(posterMobileFile, false);
  if (mobileError) return { error: mobileError, success: false };

  const supabase = await createSupabaseServerClient();
  const countryId = parsed.data.countryId || null;

  if (currentUser.role === "country_admin") {
    if (countryId !== currentUser.countryId) {
      return { error: "You can only submit events for your assigned country.", success: false };
    }
  }

  if (currentUser.role === "dojo_admin") {
    const { data: dojo } = await supabase
      .from("dojos")
      .select("country_id")
      .eq("id", currentUser.dojoId ?? "")
      .maybeSingle();

    if (!dojo || countryId !== dojo.country_id) {
      return { error: "You can only submit events for your dojo's country.", success: false };
    }
  }

  let posterDesktopUrl: string | null = null;
  if (posterDesktopFile instanceof File && posterDesktopFile.size > 0) {
    const upload = await uploadImage(supabase, currentUser.id, posterDesktopFile);
    if (upload.error) return { error: upload.error, success: false };
    posterDesktopUrl = upload.url;
  }

  let posterMobileUrl: string | null = null;
  if (posterMobileFile instanceof File && posterMobileFile.size > 0) {
    const upload = await uploadImage(supabase, currentUser.id, posterMobileFile);
    if (upload.error) return { error: upload.error, success: false };
    posterMobileUrl = upload.url;
  }

  const tags = parsed.data.tags
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);

  const { error } = await supabase.from("approvals").insert({
    entity_type: "event",
    action: "create",
    payload: {
      slug: parsed.data.slug,
      title: parsed.data.title,
      tags,
      location: parsed.data.location,
      start_date: parsed.data.startDate,
      end_date: parsed.data.endDate ?? null,
      address_line1: parsed.data.addressLine1 ?? null,
      address_line2: parsed.data.addressLine2 ?? null,
      poster_desktop: posterDesktopUrl,
      poster_mobile: posterMobileUrl,
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
