"use server";

import { z } from "zod";

import { checkContactRateLimit } from "@/lib/rate-limit";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { verifyTurnstileToken } from "@/lib/turnstile";

const contactSchema = z.object({
  name: z.string().min(1).max(200),
  email: z.string().email(),
  message: z.string().min(1).max(5000),
  turnstileToken: z.string().min(1),
});

export interface ContactActionState {
  error: string | null;
  success: boolean;
}

export async function submitContactAction(
  _prevState: ContactActionState,
  formData: FormData,
): Promise<ContactActionState> {
  const withinLimit = await checkContactRateLimit();
  if (!withinLimit) {
    return { error: "Too many submissions — please try again in a minute.", success: false };
  }

  const parsed = contactSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    message: formData.get("message"),
    turnstileToken: formData.get("turnstileToken"),
  });

  if (!parsed.success) {
    return { error: "Fill in your name, a valid email, and a message.", success: false };
  }

  const verified = await verifyTurnstileToken(parsed.data.turnstileToken);
  if (!verified) {
    return { error: "Verification failed — please try again.", success: false };
  }

  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.from("contact_submissions").insert({
    name: parsed.data.name,
    email: parsed.data.email,
    message: parsed.data.message,
  });

  if (error) {
    return { error: error.message, success: false };
  }

  return { error: null, success: true };
}
