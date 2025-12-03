import { createClient } from "@supabase/supabase-js";
import { auth } from "@clerk/nextjs/server";

// 1. Client Admin (Bypass RLS - Hati-hati!)
// Gunakan hanya untuk tugas admin sistem, bukan untuk request user biasa
export function createAdminSupabaseClient() {
  if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
    throw new Error("SUPABASE_SERVICE_ROLE_KEY is missing");
  }

  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    }
  );
}

// 2. Client Server dengan Auth User (Respect RLS)
// Gunakan ini di Server Actions atau Server Components
export async function getServerSupabase() {
  // Next.js 15: auth() bersifat async
  const { getToken } = await auth();

  // Ambil token JWT khusus dari Clerk yang sudah di-sign untuk Supabase
  const token = await getToken({ template: "supabase" });

  if (!token) {
    // Jika tidak ada user login, kembalikan client anonim (public access only)
    return createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );
  }

  // Jika user login, inject token ke header Authorization
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      global: {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    }
  );
}