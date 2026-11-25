import { createSupabaseServer } from "@/lib/supabase/server";

export async function getAdminSession() {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    return { user: null, authorised: false as const };
  }

  const supabase = await createSupabaseServer();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { user: null, authorised: false as const };

  const ownerId = process.env.OWNER_USER_ID;
  const authorised = Boolean(ownerId && user.id === ownerId);

  return { user, authorised };
}
