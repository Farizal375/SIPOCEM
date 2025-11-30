"use server";

import { createClient } from "@supabase/supabase-js";
import { revalidatePath } from "next/cache";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// --- USER: GET USER PROFILE ---
export async function getUserProfile(userId: string) {
  const { data, error } = await supabase
    .from('users')
    .select(`
      id,
      clerk_user_id,
      email,
      role,
      status,
      admin_profiles!inner (*),
      kader_profiles!inner (*),
      ibu_profiles!inner (*)
    `)
    .eq('clerk_user_id', userId)
    .single();

  if (error) {
    console.error("Error fetching user profile:", error);
    return null;
  }
  
  return data;
}

// --- USER: GET IBU PROFILE ---
export async function getIbuProfile(userId: string) {
  const { data, error } = await supabase
    .from('ibu_profiles')
    .select('*')
    .eq('user_id', userId)
    .single();

  if (error) {
    console.error("Error fetching ibu profile:", error);
    return null;
  }
  
  return data;
}

// --- USER: GET ANAK BY ORANG TUA ---
export async function getAnakByOrangTua(orang_tua_id: string) {
  const { data, error } = await supabase
    .from('anak')
    .select('*')
    .eq('orang_tua_id', orang_tua_id)
    .order('tgl_lahir', { ascending: false });

  if (error) {
    console.error("Error fetching anak by orang tua:", error);
    return [];
  }
  
  return data;
}

// --- USER: GET PEMERIKSAAN ANAK BY ANAK ID ---
export async function getPemeriksaanAnakByAnakId(anak_id: string) {
  const { data, error } = await supabase
    .from('pemeriksaan_anak')
    .select('*')
    .eq('anak_id', anak_id)
    .order('tanggal_pemeriksaan', { ascending: false });

  if (error) {
    console.error("Error fetching pemeriksaan anak:", error);
    return [];
  }
  
  return data;
}

// --- USER: GET PEMERIKSAAN IBU HAMIL BY USER ID ---
export async function getPemeriksaanIbuHamilByUserId(ibu_id: string) {
  const { data, error } = await supabase
    .from('pemeriksaan_ibu_hamil')
    .select('*')
    .eq('ibu_id', ibu_id)
    .order('tanggal_pemeriksaan', { ascending: false });

  if (error) {
    console.error("Error fetching pemeriksaan ibu hamil:", error);
    return [];
  }
  
  return data;
}

// --- USER: GET JADWAL POSYANDU TERDEKAT ---
export async function getJadwalPosyanduTerdekat() {
  const { data, error } = await supabase
    .from('jadwal_posyandu')
    .select(`
      id,
      tanggal_posyandu,
      hari,
      waktu_mulai,
      waktu_selesai,
      tempat,
      kader_profiles!inner(nama as nama_kader)
    `)
    .gte('tanggal_posyandu', new Date().toISOString().split('T')[0])
    .order('tanggal_posyandu', { ascending: true })
    .limit(5);

  if (error) {
    console.error("Error fetching jadwal posyandu:", error);
    return [];
  }
  
  return data;
}

// --- USER: UPDATE USER PROFILE ---
export async function updateUserProfile(formData: FormData) {
  const userId = formData.get('userId') as string;
  const nama = formData.get('nama') as string;
  const telepon = formData.get('telepon') as string;
  const alamat = formData.get('alamat') as string;
  const nik = formData.get('nik') as string;

  // Determine which profile table to update based on user role
  // For now, update all profile tables but only the relevant one will have data
  const { data: userData, error: userError } = await supabase
    .from('users')
    .select('role')
    .eq('id', userId)
    .single();

  if (userError) {
    console.error("Error fetching user role:", userError);
    return { success: false, message: userError.message };
  }

  let profileError = null;
  if (userData.role === 'admin') {
    const result = await supabase
      .from('admin_profiles')
      .update({ nama, telepon })
      .eq('user_id', userId);
    profileError = result.error;
  } else if (userData.role === 'kader') {
    const result = await supabase
      .from('kader_profiles')
      .update({ nama, telepon })
      .eq('user_id', userId);
    profileError = result.error;
  } else if (userData.role === 'user') {
    const result = await supabase
      .from('ibu_profiles')
      .update({ nama, telepon, nik })
      .eq('user_id', userId);
    profileError = result.error;
  }

  if (profileError) {
    console.error("Error updating profile:", profileError);
    return { success: false, message: profileError.message };
  }

  revalidatePath('/user/pengaturan');
  return { success: true, message: "Profil berhasil diperbarui" };
}