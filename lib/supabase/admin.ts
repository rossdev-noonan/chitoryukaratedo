import "server-only";
import { createClient } from "@supabase/supabase-js";

/**
 * Bypasses RLS — server-only, never import from a Client Component.
 * Use for admin/audit-log operations that must run outside a user's own permissions.
 */
export function createSupabaseAdminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
  );
}
