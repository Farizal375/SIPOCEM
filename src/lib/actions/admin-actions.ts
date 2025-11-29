"use server";

import { createClient } from "@supabase/supabase-js";
import { clerkClient } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

// Setup Supabase Admin Client
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// --- READ (AMBIL DATA DASHBOARD) ---
export async function getAdminDashboardStats() {
  const { count: totalKader } = await supabaseAdmin
    .from('users')
    .select('*', { count: 'exact', head: true })
    .eq('role', 'kader');

  const { count: totalUser } = await supabaseAdmin
    .from('users')
    .select('*', { count: 'exact', head: true })
    .eq('role', 'user');

  const { count: laporanMasuk } = await supabaseAdmin
    .from('laporan_kendala')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'Pending');

  const { data: aktivitas } = await supabaseAdmin
    .from('log_aktivitas')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(5);

  return {
    totalKader: totalKader || 0,
    totalUser: totalUser || 0,
    laporanMasuk: laporanMasuk || 0,
    aktivitas: aktivitas || []
  };
}

// --- READ (AMBIL SEMUA USER) ---
export async function getAllUsers() {
  const { data: users, error } = await supabaseAdmin
    .from('users')
    .select('*')
    .order('created_at', { ascending: false });

  if (error || !users) return [];

  const detailedUsers = await Promise.all(users.map(async (u) => {
    // Default values agar tidak error jika data profil belum ada
    let detail = { nama: 'Belum dilengkapi', telepon: '-', nik: '-' };
    
    if (u.role === 'kader') {
      const { data } = await supabaseAdmin.from('kader').select('nama, telepon').eq('user_id', u.id).single();
      if (data) detail = { ...detail, ...data };
    } else if (u.role === 'user') {
      const { data } = await supabaseAdmin.from('ibu').select('nama, telepon, nik').eq('user_id', u.id).single();
      if (data) detail = { ...detail, ...data };
    } else {
      const { data } = await supabaseAdmin.from('admin').select('nama, telepon').eq('user_id', u.id).single();
      if (data) detail = { ...detail, ...data };
    }

    return {
      id: u.id,
      email: u.email,
      role: u.role,
      status: u.status,
      nama: detail.nama,
      telepon: detail.telepon,
      nik: detail.nik,
    };
  }));

  return detailedUsers;
}

// --- CREATE (TAMBAH USER) ---
export async function createFullUser(formData: FormData) {
  const client = await clerkClient();

  const nama = formData.get('nama') as string;
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const role = formData.get('role') as string;
  const telepon = formData.get('telepon') as string;
  const nik = formData.get('nik') as string;

  try {
    // 1. Buat di Clerk
    const clerkUser = await client.users.createUser({
      emailAddress: [email],
      password: password,
      publicMetadata: { role: role },
      skipPasswordChecks: false,
      skipPasswordRequirement: false,
    });

    const userId = clerkUser.id;

    // 2. Simpan ke Supabase (Tabel Users)
    const { error: userError } = await supabaseAdmin.from('users').insert({
      id: userId,
      email: email,
      role: role,
      status: 'aktif'
    });

    if (userError) {
        // Rollback jika gagal simpan DB
        await client.users.deleteUser(userId);
        return { success: false, message: 'Gagal simpan ke database: ' + userError.message };
    }

    // 3. Simpan ke Tabel Profil
    if (role === 'kader') {
      await supabaseAdmin.from('kader').insert({
        user_id: userId,
        nama: nama,
        telepon: telepon,
        no_registrasi_kohort: '-',
        no_catatan_medik: '-'
      });
    } else if (role === 'user') {
      await supabaseAdmin.from('ibu').insert({
        user_id: userId,
        nik: nik || `NIK-${Date.now()}`,
        nama: nama,
        telepon: telepon,
        status_validasi: 'valid'
      });
    } else if (role === 'admin') {
       await supabaseAdmin.from('admin').insert({
        user_id: userId,
        nama: nama,
        telepon: telepon
      });
    }

    revalidatePath('/admin/akun');
    return { success: true, message: 'Berhasil menambah akun' };

  } catch (error: unknown) {
    console.error("Clerk Error:", error);
    
    let errorMessage = "Terjadi kesalahan sistem";

    // Type Guard untuk menangani error Clerk tanpa 'any'
    if (typeof error === "object" && error !== null && "errors" in error) {
        const clerkError = error as { errors: { longMessage: string }[] };
        if (Array.isArray(clerkError.errors) && clerkError.errors.length > 0) {
            errorMessage = clerkError.errors[0].longMessage;
        }
    } else if (error instanceof Error) {
        errorMessage = error.message;
    }

    return { success: false, message: 'Gagal membuat akun: ' + errorMessage };
  }
}

// --- DELETE (HAPUS USER) ---
export async function deleteFullUser(userId: string) {
  const client = await clerkClient();

  try {
    await client.users.deleteUser(userId);
    const { error } = await supabaseAdmin.from('users').delete().eq('id', userId);

    if (error) {
        return { success: false, message: "Gagal hapus data database" };
    }

    revalidatePath('/admin/akun');
    return { success: true, message: "Akun berhasil dihapus" };

  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Gagal menghapus user";
    return { success: false, message };
  }
}

// --- UPDATE (EDIT USER) ---
export async function updateUserProfile(formData: FormData) {
  const id = formData.get('id') as string;
  const role = formData.get('role') as string;
  const nama = formData.get('nama') as string;
  const telepon = formData.get('telepon') as string;
  const nik = formData.get('nik') as string;

  let error;

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