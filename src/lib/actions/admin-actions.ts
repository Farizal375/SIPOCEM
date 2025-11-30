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
    .eq('role', 'kader')
    .eq('status', 'aktif');

  const { count: totalUser } = await supabaseAdmin
    .from('users')
    .select('*', { count: 'exact', head: true })
    .eq('role', 'user')
    .eq('status', 'aktif');

  const { count: totalAnak } = await supabaseAdmin
    .from('anak')
    .select('*', { count: 'exact', head: true });

  const { count: notifikasiPending } = await supabaseAdmin
    .from('notifikasi')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'pending');

  const { data: aktivitas } = await supabaseAdmin
    .from('log_aktivitas')
    .select(`
      *,
      users!inner(clerk_user_id, email)
    `)
    .order('created_at', { ascending: false })
    .limit(5);

  return {
    totalKader: totalKader || 0,
    totalUser: totalUser || 0,
    totalAnak: totalAnak || 0,
    notifikasiPending: notifikasiPending || 0,
    aktivitas: aktivitas || []
  };
}

// --- READ (AMBIL SEMUA USER) ---
export async function getAllUsers() {
  const { data: users, error } = await supabaseAdmin
    .from('users')
    .select(`
      id,
      clerk_user_id,
      email,
      role,
      status,
      created_at,
      admin_profiles!left (*),
      kader_profiles!left (*),
      ibu_profiles!left (*)
    `)
    .order('created_at', { ascending: false });

  if (error || !users) return [];

  return users.map((u) => {
    let nama = 'Belum dilengkapi';
    let telepon = '-';
    let nik = '-';

    if (u.role === 'admin' && u.admin_profiles) {
      nama = u.admin_profiles[0]?.nama || 'Belum dilengkapi';
      telepon = u.admin_profiles[0]?.telepon || '-';
    } else if (u.role === 'kader' && u.kader_profiles) {
      nama = u.kader_profiles[0]?.nama || 'Belum dilengkapi';
      telepon = u.kader_profiles[0]?.telepon || '-';
    } else if (u.role === 'user' && u.ibu_profiles) {
      nama = u.ibu_profiles[0]?.nama || 'Belum dilengkapi';
      telepon = u.ibu_profiles[0]?.telepon || '-';
      nik = u.ibu_profiles[0]?.nik || '-';
    }

    return {
      id: u.id,
      clerk_user_id: u.clerk_user_id,
      email: u.email,
      role: u.role,
      status: u.status,
      nama,
      telepon,
      nik,
      created_at: u.created_at
    };
  });
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

    const clerkUserId = clerkUser.id;

    // 2. Simpan ke Supabase (Tabel Users)
    const { data: supabaseUser, error: userError } = await supabaseAdmin
      .from('users')
      .insert({
        clerk_user_id: clerkUserId,
        email: email,
        role: role,
        status: 'aktif'
      })
      .select('id')
      .single();

    if (userError) {
        // Rollback jika gagal simpan DB
        await client.users.deleteUser(clerkUserId);
        return { success: false, message: 'Gagal simpan ke database: ' + userError.message };
    }

    const userId = supabaseUser.id;

    // 3. Simpan ke Tabel Profil Berdasarkan Role
    if (role === 'kader') {
      const { error: profileError } = await supabaseAdmin
        .from('kader_profiles')
        .insert({
          user_id: userId,
          nama: nama,
          telepon: telepon,
          no_registrasi_kohort: '-',
          no_catatan_medik: '-'
        });

      if (profileError) {
        // Rollback jika gagal simpan profil
        await client.users.deleteUser(clerkUserId);
        await supabaseAdmin.from('users').delete().eq('id', userId);
        return { success: false, message: 'Gagal simpan profil kader: ' + profileError.message };
      }
    } else if (role === 'user') {
      const { error: profileError } = await supabaseAdmin
        .from('ibu_profiles')
        .insert({
          user_id: userId,
          nik: nik || `NIK-${Date.now()}`,
          nama: nama,
          telepon: telepon,
          status_validasi: 'pending' // Set to pending initially
        });

      if (profileError) {
        // Rollback jika gagal simpan profil
        await client.users.deleteUser(clerkUserId);
        await supabaseAdmin.from('users').delete().eq('id', userId);
        return { success: false, message: 'Gagal simpan profil ibu: ' + profileError.message };
      }
    } else if (role === 'admin') {
      const { error: profileError } = await supabaseAdmin
        .from('admin_profiles')
        .insert({
          user_id: userId,
          nama: nama,
          telepon: telepon
        });

      if (profileError) {
        // Rollback jika gagal simpan profil
        await client.users.deleteUser(clerkUserId);
        await supabaseAdmin.from('users').delete().eq('id', userId);
        return { success: false, message: 'Gagal simpan profil admin: ' + profileError.message };
      }
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
export async function deleteFullUser(clerkUserId: string) {
  const client = await clerkClient();

  try {
    // Get user ID from our users table
    const { data: user, error: userFetchError } = await supabaseAdmin
      .from('users')
      .select('id')
      .eq('clerk_user_id', clerkUserId)
      .single();

    if (userFetchError || !user) {
      return { success: false, message: "User tidak ditemukan" };
    }

    // Delete from Clerk
    await client.users.deleteUser(clerkUserId);

    // Delete from our users table (this will cascade delete related profiles)
    const { error } = await supabaseAdmin.from('users').delete().eq('id', user.id);

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
  const status = formData.get('status') as string;

  // Update user status in users table
  const { error: userError } = await supabaseAdmin
    .from('users')
    .update({ status })
    .eq('id', id);

  if (userError) {
    return { success: false, message: userError.message };
  }

  // Update profile based on role
  let profileError;
  if (role === 'admin') {
    const res = await supabaseAdmin
      .from('admin_profiles')
      .update({ nama, telepon })
      .eq('user_id', id);
    profileError = res.error;
  } else if (role === 'kader') {
    const res = await supabaseAdmin
      .from('kader_profiles')
      .update({ nama, telepon })
      .eq('user_id', id);
    profileError = res.error;
  } else if (role === 'user') {
    const res = await supabaseAdmin
      .from('ibu_profiles')
      .update({ nama, telepon, nik })
      .eq('user_id', id);
    profileError = res.error;
  }

  if (profileError) return { success: false, message: profileError.message };

  revalidatePath('/admin/akun');
  return { success: true, message: "Data berhasil diperbarui" };
}