"use server";

import { createClient } from "@supabase/supabase-js";
import { auth, clerkClient } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

// Setup Supabase Admin Client (Bypass RLS untuk Admin)
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY! 
  // Catatan: Idealnya gunakan SERVICE_ROLE_KEY di sini untuk admin action yang benar-benar bypass RLS,
  // tapi untuk starter kit ini kita pakai anon key dengan policy yang sudah kita buat.
);

// --- READ (AMBIL DATA) ---
export async function getAllUsers() {
  const { data: users, error } = await supabaseAdmin
    .from('users')
    .select('*')
    .order('created_at', { ascending: false });

  if (error || !users) return [];

  // Join manual untuk ambil detail profil
  const detailedUsers = await Promise.all(users.map(async (u) => {
    let detail: any = {};
    
    if (u.role === 'kader') {
      const { data } = await supabaseAdmin.from('kader').select('nama, telepon').eq('user_id', u.id).single();
      detail = data || { nama: 'Belum dilengkapi', telepon: '-' };
    } else if (u.role === 'user') {
      const { data } = await supabaseAdmin.from('ibu').select('nama, telepon, nik').eq('user_id', u.id).single();
      detail = data || { nama: 'Belum dilengkapi', telepon: '-', nik: '-' };
    } else {
      const { data } = await supabaseAdmin.from('admin').select('nama, telepon').eq('user_id', u.id).single();
      detail = data || { nama: 'Admin', telepon: '-' };
    }

    return {
      id: u.id,
      email: u.email,
      role: u.role,
      status: u.status,
      nama: detail.nama,
      telepon: detail.telepon,
      nik: detail.nik || '-',
    };
  }));

  return detailedUsers;
}

// --- CREATE (TAMBAH USER BARU KE CLERK & SUPABASE) ---
export async function createFullUser(formData: FormData) {
  const client = await clerkClient(); // Await client instance

  const nama = formData.get('nama') as string;
  const email = formData.get('email') as string;
  const password = formData.get('password') as string; // Input password baru
  const role = formData.get('role') as string;
  const telepon = formData.get('telepon') as string;
  const nik = formData.get('nik') as string;

  try {
    // 1. Buat User di CLERK
    const clerkUser = await client.users.createUser({
      emailAddress: [email],
      password: password,
      publicMetadata: { role: role }, // Simpan role di metadata Clerk
      skipPasswordChecks: false,
      skipPasswordRequirement: false,
    });

    const userId = clerkUser.id;

    // 2. Simpan ke Tabel Users (Induk) Supabase
    const { error: userError } = await supabaseAdmin.from('users').insert({
      id: userId,
      email: email,
      role: role,
      status: 'aktif'
    });

    if (userError) {
        // Rollback: Hapus user di Clerk jika gagal simpan di DB
        await client.users.deleteUser(userId);
        return { success: false, message: 'Gagal simpan ke database: ' + userError.message };
    }

    // 3. Simpan ke Tabel Profil (Admin/Kader/Ibu)
    let profileError;
    if (role === 'kader') {
      const { error } = await supabaseAdmin.from('kader').insert({
        user_id: userId,
        nama: nama,
        telepon: telepon,
        no_registrasi_kohort: '-',
        no_catatan_medik: '-'
      });
      profileError = error;
    } else if (role === 'user') {
      const { error } = await supabaseAdmin.from('ibu').insert({
        user_id: userId,
        nik: nik || `NIK-${Date.now()}`,
        nama: nama,
        telepon: telepon,
        status_validasi: 'valid' // Admin yang buat, langsung valid
      });
      profileError = error;
    } else if (role === 'admin') {
       const { error } = await supabaseAdmin.from('admin').insert({
        user_id: userId,
        nama: nama,
        telepon: telepon
      });
      profileError = error;
    }

    if (profileError) {
       console.error("Profile Error:", profileError);
       // Optional: Rollback logic here
       return { success: false, message: 'User dibuat tapi profil gagal: ' + profileError.message };
    }

    revalidatePath('/admin/akun');
    return { success: true, message: 'Berhasil menambah akun' };

  } catch (error: any) {
    console.error("Clerk Error:", error);
    // Handle error validasi Clerk (misal password kurang panjang, email sudah ada)
    const errorMessage = error.errors ? error.errors[0].longMessage : error.message;
    return { success: false, message: 'Gagal membuat akun: ' + errorMessage };
  }
}

// --- DELETE (HAPUS DARI CLERK & SUPABASE) ---
export async function deleteFullUser(userId: string) {
  const client = await clerkClient();

  try {
    // 1. Hapus dari Clerk
    await client.users.deleteUser(userId);

    // 2. Hapus dari Supabase (Sebenarnya otomatis jika pakai ON DELETE CASCADE di SQL)
    // Tapi untuk memastikan, kita jalankan perintah delete
    const { error } = await supabaseAdmin.from('users').delete().eq('id', userId);

    if (error) {
        console.error("Supabase delete error:", error);
        return { success: false, message: "Gagal hapus data database" };
    }

    revalidatePath('/admin/akun');
    return { success: true, message: "Akun berhasil dihapus" };

  } catch (error: any) {
    console.error("Delete Error:", error);
    return { success: false, message: "Gagal menghapus user: " + error.message };
  }
}

// --- UPDATE (EDIT PROFIL DATA) ---
export async function updateUserProfile(formData: FormData) {
  const id = formData.get('id') as string;
  const role = formData.get('role') as string;
  const nama = formData.get('nama') as string;
  const telepon = formData.get('telepon') as string;
  const nik = formData.get('nik') as string;

  let error;

  // Kita hanya update data profil di Supabase (Nama, HP, NIK)
  // Untuk ganti email/password disarankan lewat fitur "Forgot Password" user sendiri demi keamanan
  if (role === 'kader') {
    const res = await supabaseAdmin.from('kader').update({ nama, telepon }).eq('user_id', id);
    error = res.error;
  } else if (role === 'user') {
    const res = await supabaseAdmin.from('ibu').update({ nama, telepon, nik }).eq('user_id', id);
    error = res.error;
  } else if (role === 'admin') {
    const res = await supabaseAdmin.from('admin').update({ nama, telepon }).eq('user_id', id);
    error = res.error;
  }

  if (error) return { success: false, message: error.message };

  revalidatePath('/admin/akun');
  return { success: true, message: "Data berhasil diperbarui" };
}