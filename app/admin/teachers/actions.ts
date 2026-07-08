"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";

import { getCurrentUser } from "@/lib/auth";
import { createSupabaseServerClient } from "@/lib/supabase/server";

const submitTeacherSchema = z.object({
  slug: z
    .string()
    .min(1)
    .max(100)
    .regex(/^[a-z0-9-]+$/, "Lowercase letters, numbers, and hyphens only."),
  nameNative: z.string().max(200).optional(),
  nameKana: z.string().max(200).optional(),
  nameRomajiAuto: z.string().max(200).optional(),
  nameRomajiFinal: z.string().min(1).max(200),
  rank: z.string().max(100).optional(),
  dojoId: z.string().uuid(),
  countryId: z.string().uuid(),
});

export interface SubmitTeacherActionState {
  error: string | null;
  success: boolean;
}

export async function submitTeacherAction(
  _prevState: SubmitTeacherActionState,
  formData: FormData,
): Promise<SubmitTeacherActionState> {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return { error: "You must be logged in.", success: false };
  }

  const parsed = submitTeacherSchema.safeParse({
    slug: formData.get("slug"),
    nameNative: formData.get("nameNative") || undefined,
    nameKana: formData.get("nameKana") || undefined,
    nameRomajiAuto: formData.get("nameRomajiAuto") || undefined,
    nameRomajiFinal: formData.get("nameRomajiFinal"),
    rank: formData.get("rank") || undefined,
    dojoId: formData.get("dojoId"),
    countryId: formData.get("countryId"),
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid submission.", success: false };
  }

  if (currentUser.role === "country_admin" && currentUser.countryId !== parsed.data.countryId) {
    return { error: "You can only submit teachers for your assigned country.", success: false };
  }

  if (currentUser.role === "dojo_admin" && currentUser.dojoId !== parsed.data.dojoId) {
    return { error: "You can only submit teachers for your own dojo.", success: false };
  }

  if (currentUser.role === "teacher") {
    return { error: "Teachers cannot submit new teacher records.", success: false };
  }

  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.from("approvals").insert({
    entity_type: "teacher",
    action: "create",
    payload: {
      slug: parsed.data.slug,
      name_native: parsed.data.nameNative ?? null,
      name_kana: parsed.data.nameKana ?? null,
      name_romaji_auto: parsed.data.nameRomajiAuto ?? null,
      name_romaji_final: parsed.data.nameRomajiFinal,
      rank: parsed.data.rank ?? null,
      dojo_id: parsed.data.dojoId,
      country_id: parsed.data.countryId,
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
