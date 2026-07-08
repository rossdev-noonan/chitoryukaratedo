"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";

import { getCurrentUser } from "@/lib/auth";
import { createSupabaseServerClient } from "@/lib/supabase/server";

const submitDojoSchema = z.object({
  slug: z
    .string()
    .min(1)
    .max(100)
    .regex(/^[a-z0-9-]+$/, "Lowercase letters, numbers, and hyphens only."),
  name: z.string().min(1).max(200),
  countryId: z.string().uuid(),
  city: z.string().max(200).optional(),
  headInstructor: z.string().max(200).optional(),
  contactEmail: z.string().email().optional().or(z.literal("")),
});

export interface SubmitDojoActionState {
  error: string | null;
  success: boolean;
}

export async function submitDojoAction(
  _prevState: SubmitDojoActionState,
  formData: FormData,
): Promise<SubmitDojoActionState> {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return { error: "You must be logged in.", success: false };
  }

  const parsed = submitDojoSchema.safeParse({
    slug: formData.get("slug"),
    name: formData.get("name"),
    countryId: formData.get("countryId"),
    city: formData.get("city") || undefined,
    headInstructor: formData.get("headInstructor") || undefined,
    contactEmail: formData.get("contactEmail") || undefined,
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid submission.", success: false };
  }

  if (currentUser.role === "country_admin" && currentUser.countryId !== parsed.data.countryId) {
    return { error: "You can only submit dojos for your assigned country.", success: false };
  }

  if (currentUser.role === "teacher") {
    return { error: "Teachers cannot submit dojo records.", success: false };
  }

  if (currentUser.role === "dojo_admin") {
    return { error: "Dojo Admins cannot submit new dojo records.", success: false };
  }

  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.from("approvals").insert({
    entity_type: "dojo",
    action: "create",
    payload: {
      slug: parsed.data.slug,
      name: parsed.data.name,
      country_id: parsed.data.countryId,
      city: parsed.data.city ?? null,
      head_instructor: parsed.data.headInstructor ?? null,
      contact_email: parsed.data.contactEmail || null,
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
