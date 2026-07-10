"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";

import { getCurrentUser } from "@/lib/auth";
import { checkInviteRateLimit } from "@/lib/rate-limit";
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

  const withinLimit = await checkInviteRateLimit(currentUser.id);
  if (!withinLimit) {
    return { error: "Too many invites sent — please try again in a minute.", success: false };
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
    { redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/accept-invite` },
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

const updateSchema = z.object({
  userId: z.string().uuid(),
  fullName: z.string().min(1).max(200),
  role: z.enum(["sohonbu_admin", "country_admin", "dojo_admin", "teacher"]),
  countryId: z.string().uuid().optional().or(z.literal("")),
  dojoId: z.string().uuid().optional().or(z.literal("")),
  teacherId: z.string().uuid().optional().or(z.literal("")),
});

export interface UpdateUserActionState {
  error: string | null;
  success: boolean;
}

async function countOtherSohonbuAdmins(excludingUserId: string): Promise<number> {
  const supabase = await createSupabaseServerClient();
  const { count } = await supabase
    .from("users")
    .select("id", { count: "exact", head: true })
    .eq("role", "sohonbu_admin")
    .is("deactivated_at", null)
    .neq("id", excludingUserId);
  return count ?? 0;
}

export async function updateUserAction(
  _prevState: UpdateUserActionState,
  formData: FormData,
): Promise<UpdateUserActionState> {
  const currentUser = await getCurrentUser();
  if (!currentUser || currentUser.role !== "sohonbu_admin") {
    return { error: "Only Sohonbu Admin can edit users.", success: false };
  }

  const parsed = updateSchema.safeParse({
    userId: formData.get("userId"),
    fullName: formData.get("fullName"),
    role: formData.get("role"),
    countryId: formData.get("countryId") || undefined,
    dojoId: formData.get("dojoId") || undefined,
    teacherId: formData.get("teacherId") || undefined,
  });

  if (!parsed.success) {
    return { error: "Enter a valid name and role.", success: false };
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

  if (
    parsed.data.userId === currentUser.id &&
    parsed.data.role !== "sohonbu_admin" &&
    (await countOtherSohonbuAdmins(currentUser.id)) === 0
  ) {
    return {
      error: "You are the only Sohonbu Admin — invite another before changing your own role.",
      success: false,
    };
  }

  const supabase = await createSupabaseServerClient();
  const { error } = await supabase
    .from("users")
    .update({
      full_name: parsed.data.fullName,
      role: parsed.data.role,
      country_id: parsed.data.role === "country_admin" ? parsed.data.countryId : null,
      dojo_id: parsed.data.role === "dojo_admin" ? parsed.data.dojoId : null,
      teacher_id: parsed.data.role === "teacher" ? parsed.data.teacherId : null,
    })
    .eq("id", parsed.data.userId);

  if (error) {
    return { error: error.message, success: false };
  }

  revalidatePath("/admin/users");
  return { error: null, success: true };
}

// Deactivate rather than hard-delete: approvals.submitted_by,
// rank_evidence.submitted_by/reviewed_by, and audit_logs.user_id all
// reference users(id) with no ON DELETE rule, so a hard delete fails with a
// foreign key violation for any admin who has ever submitted a request or
// taken a logged action — i.e. any real admin. Deactivating instead keeps
// every historical record's user reference intact.
export async function deactivateUserAction(userId: string): Promise<{ error: string | null }> {
  const currentUser = await getCurrentUser();
  if (!currentUser || currentUser.role !== "sohonbu_admin") {
    return { error: "Only Sohonbu Admin can deactivate users." };
  }

  if (userId === currentUser.id) {
    return { error: "You cannot deactivate your own account." };
  }

  const supabase = await createSupabaseServerClient();
  const { data: target } = await supabase
    .from("users")
    .select("role")
    .eq("id", userId)
    .maybeSingle();

  if (target?.role === "sohonbu_admin" && (await countOtherSohonbuAdmins(userId)) === 0) {
    return { error: "Cannot deactivate the last remaining Sohonbu Admin." };
  }

  const { error } = await supabase
    .from("users")
    .update({ deactivated_at: new Date().toISOString() })
    .eq("id", userId);
  if (error) {
    return { error: error.message };
  }

  // Immediately invalidate any session they're already holding, so
  // deactivation takes effect right away rather than waiting for their
  // current access token to expire on its own.
  const admin = createSupabaseAdminClient();
  await admin.auth.admin.updateUserById(userId, { ban_duration: "876000h" });

  revalidatePath("/admin/users");
  return { error: null };
}

export async function reactivateUserAction(userId: string): Promise<{ error: string | null }> {
  const currentUser = await getCurrentUser();
  if (!currentUser || currentUser.role !== "sohonbu_admin") {
    return { error: "Only Sohonbu Admin can reactivate users." };
  }

  const supabase = await createSupabaseServerClient();
  const { error } = await supabase
    .from("users")
    .update({ deactivated_at: null })
    .eq("id", userId);
  if (error) {
    return { error: error.message };
  }

  const admin = createSupabaseAdminClient();
  await admin.auth.admin.updateUserById(userId, { ban_duration: "none" });

  revalidatePath("/admin/users");
  return { error: null };
}
