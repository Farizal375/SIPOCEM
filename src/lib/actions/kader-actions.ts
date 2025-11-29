"use server";

import { createClient } from "@supabase/supabase-js";
import { revalidatePath } from "next/cache";

// Inisialisasi Supabase Client (Server Side)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

// 1. Ambil Data Dashboard (Statistik)
export async function getDashboardStats() {
  const { count: totalAnak } = await supabase.from('anak').select('*', { count: 'exact', head: true });
  const { count: totalIbu } = await supabase.from('ibu').select('*', { count: 'exact', head: true });
  const { count: totalKader } = await supabase.from('kader').select('*', { count: 'exact', head: true });

  return {
    totalAnak: totalAnak || 0,
    totalIbu: totalIbu || 0,
    totalKader: totalKader || 0
  };
}

// 2. Ambil Daftar Orang Tua (Ibu)
export async function getDaftarOrangTua() {
  const { data, error } = await supabase
    .from('ibu')
    .select('*')
    .order('nama', { ascending: true });

  if (error) throw new Error(error.message);
  return data;
}

// 3. Tambah Data Orang Tua (Ibu)
export async function addOrangTua(formData: FormData) {
  const rawData = {
    nik: formData.get('nik'),
    nama: formData.get('nama'),
    telepon: formData.get('telepon'),
    alamat: formData.get('alamat'),
    // user_id harusnya diambil dari Clerk saat registrasi, 
    // tapi ini contoh input manual kader
    status_validasi: 'valid' 
  };

  const { error } = await supabase.from('ibu').insert(rawData);

  if (error) {
    console.error(error);
    return { success: false, message: 'Gagal menambah data' };
  }

  revalidatePath('/kader/orang-tua'); // Refresh halaman otomatis
  return { success: true, message: 'Berhasil menambah data' };
}

// 4. Validasi Akun User (Sesuai Activity Diagram)
export async function validasiUser(ibuId: string, status: 'valid' | 'ditolak') {
  const { error } = await supabase
    .from('ibu')
    .update({ status_validasi: status })
    .eq('id', ibuId);

  if (error) return { success: false };
  
  revalidatePath('/kader/validasi');
  return { success: true };
}