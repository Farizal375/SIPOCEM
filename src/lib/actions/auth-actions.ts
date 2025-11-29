"use server";

import { createClient } from "@supabase/supabase-js";
import { currentUser } from "@clerk/nextjs/server";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.CLERK_SECRET_KEY! // Gunakan Service Role Key jika ingin bypass RLS, tapi hati-hati
  // Untuk aman, gunakan anon key dan setup RLS yang benar
);

export async function syncUserToSupabase() {
  const user = await currentUser();

  if (!user) return null;

  // Cek apakah user sudah ada di database public.users
  const { data: existingUser } = await supabase
    .from('users')
    .select('*')
    .eq('id', user.id)
    .single();

  if (!existingUser) {
    // Jika belum ada, insert data dasar
    const role = user.publicMetadata.role || 'user'; // Default user
    
    await supabase.from('users').insert({
      id: user.id,
      email: user.emailAddresses[0].emailAddress,
      role: role,
      status: 'aktif'
    });
  }
}