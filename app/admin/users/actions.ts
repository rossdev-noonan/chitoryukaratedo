"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";

import { getCurrentUser } from "@/lib/auth";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { createSupabaseServerClient } from "@/lib/supabase/server";

const inviteSchema = z.object({
  email: z.string().email(),
  fullName: z.string().min(1).max(200),
  role: z.enum(["sohonbu_admin", "country_admin", "dojo_admin", "teacher"]),
  countryId: z.string().uuid().optional().or(z.literal("")),
  dojoId: z.string().uuid().optional().or(z.literal("")),
  teacherId: z.string().uuid().optional().or(z.literal("")),
});

export interface InviteActionState {
  error: string | null;
  success: boolean;
}

export async function inviteAdminAction(
  _prevState: InviteActionState,
  formData: FormData,
): Promise<InviteActionState> {
  const currentUser = await getCurrentUser();
  if (!currentUser || currentUser.role !== "sohonbu_admin") {
    return { error: "Only Sohonbu Admin can invite users.", success: false };
  }

  const parsed = inviteSchema.safeParse({
    email: formData.get("email"),
    fullName: formData.get("fullName"),
    role: formData.get("role"),
    countryId: formData.get("countryId") || undefined,
    dojoId: formData.get("dojoId") || undefined,
    teacherId: formData.get("teacherId") || undefined,
  });

  if (!parsed.success) {
    return { error: "Enter a valid email, name, and role.", success: false };
  }

  if (parsed.data.role === "country_admin" && !parsed.data.countryId) {
    return { error: "Select a country for a Country Admin.", success: false };
  }
  if (parsed.data.role === "dojo_admin" && !parsed.data.dojoId) {
    return { error: "Select a dojo for a Dojo Admin.", success: false };
  }
  if (parsed.data.role === "teacher" && !parsed.data.teacherId) {
    return { error: "Select a teacher record to link this account to.", success: false };
  }

  const admin = createSupabaseAdminClient();
  const { data: invited, error: inviteError } = await admin.auth.admin.inviteUserByEmail(
    parsed.data.email,
  );

  if (inviteError || !invited.user) {
    return { error: inviteError?.message ?? "Failed to send invite.", success: false };
  }

  const supabase = await createSupabaseServerClient();
  const { error: insertError } = await supabase.from("users").insert({
    id: invited.user.id,
    email: parsed.data.email,
    full_name: parsed.data.fullName,
    role: parsed.data.role,
    country_id: parsed.data.role === "country_admin" ? parsed.data.countryId : null,
    dojo_id: parsed.data.role === "dojo_admin" ? parsed.data.dojoId : null,
    teacher_id: parsed.data.role === "teacher" ? parsed.data.teacherId : null,
  });

  if (insertError) {
    return { error: `Invite sent, but profile setup failed: ${insertError.message}`, success: false };
  }

  revalidatePath("/admin/users");
  return { error: null, success: true };
}
