"use server";

import { createClient } from "@supabase/supabase-js";
import { revalidatePath } from "next/cache";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// --- KADER: GET ALL ANAK ---
export async function getAllAnak() {
  const { data, error } = await supabase
    .from('anak')
    .select(`
      id,
      nik,
      nama,
      tgl_lahir,
      jenis_kelamin,
      orang_tua!inner(nama as nama_ibu, alamat)
    `)
    .order('nama', { ascending: true });

  if (error) {
    console.error("Error fetching anak:", error);
    return [];
  }
  return data;
}

// --- KADER: GET ALL ORANG TUA ---
export async function getAllOrangTua() {
  const { data, error } = await supabase
    .from('orang_tua')
    .select('*')
    .order('nama', { ascending: true });

  if (error) {
    console.error("Error fetching orang tua:", error);
    return [];
  }
  return data;
}

// --- KADER: GET ALL KADER ---
export async function getAllKader() {
  const { data, error } = await supabase
    .from('kader_profiles')
    .select(`
      id,
      nama,
      telepon,
      users!inner(clerk_user_id)
    `)
    .order('nama', { ascending: true });

  if (error) {
    console.error("Error fetching kader:", error);
    return [];
  }
  return data;
}

// --- KADER: ADD ANAK ---
export async function addAnak(formData: FormData) {
  const nama = formData.get('nama') as string;
  const nik = formData.get('nik') as string;
  const tgl_lahir = formData.get('tgl_lahir') as string;
  const jenis_kelamin = formData.get('jenis_kelamin') as string;
  const orang_tua_id = formData.get('orang_tua_id') as string;

  const { data, error } = await supabase
    .from('anak')
    .insert({
      nik,
      nama,
      tgl_lahir,
      jenis_kelamin,
      orang_tua_id
    })
    .select()
    .single();

  if (error) {
    console.error("Error adding anak:", error);
    return { success: false, message: error.message };
  }

  revalidatePath('/kader/anak');
  return { success: true, message: "Data anak berhasil ditambahkan", data };
}

// --- KADER: UPDATE ANAK ---
export async function updateAnak(formData: FormData) {
  const id = formData.get('id') as string;
  const nama = formData.get('nama') as string;
  const nik = formData.get('nik') as string;
  const tgl_lahir = formData.get('tgl_lahir') as string;
  const jenis_kelamin = formData.get('jenis_kelamin') as string;
  const orang_tua_id = formData.get('orang_tua_id') as string;

  const { error } = await supabase
    .from('anak')
    .update({
      nik,
      nama,
      tgl_lahir,
      jenis_kelamin,
      orang_tua_id
    })
    .eq('id', id);

  if (error) {
    console.error("Error updating anak:", error);
    return { success: false, message: error.message };
  }

  revalidatePath('/kader/anak');
  return { success: true, message: "Data anak berhasil diperbarui" };
}

// --- KADER: DELETE ANAK ---
export async function deleteAnak(id: string) {
  const { error } = await supabase
    .from('anak')
    .delete()
    .eq('id', id);

  if (error) {
    console.error("Error deleting anak:", error);
    return { success: false, message: error.message };
  }

  revalidatePath('/kader/anak');
  return { success: true, message: "Data anak berhasil dihapus" };
}

// --- KADER: ADD PEMERIKSAAN ANAK ---
export async function addPemeriksaanAnak(formData: FormData) {
  const anak_id = formData.get('anak_id') as string;
  const berat_badan = formData.get('berat_badan') as string;
  const tinggi_badan = formData.get('tinggi_badan') as string;
  const lingkar_kepala = formData.get('lingkar_kepala') as string;
  const usia_bulan = parseInt(formData.get('usia_bulan') as string || '0');
  const hasil_pemeriksaan = formData.get('hasil_pemeriksaan') as string;
  const imunisasi_terakhir = formData.get('imunisasi_terakhir') as string;
  const catatan_dokter = formData.get('catatan_dokter') as string;

  const { data, error } = await supabase
    .from('pemeriksaan_anak')
    .insert({
      anak_id,
      berat_badan: parseFloat(berat_badan) || 0,
      tinggi_badan: parseFloat(tinggi_badan) || 0,
      lingkar_kepala: parseFloat(lingkar_kepala) || 0,
      usia_bulan,
      hasil_pemeriksaan,
      imunisasi_terakhir,
      catatan_dokter
    })
    .select()
    .single();

  if (error) {
    console.error("Error adding pemeriksaan anak:", error);
    return { success: false, message: error.message };
  }

  revalidatePath('/kader/pemeriksaan-anak');
  return { success: true, message: "Data pemeriksaan anak berhasil ditambahkan", data };
}

// --- KADER: ADD PEMERIKSAAN IBU HAMIL ---
export async function addPemeriksaanIbuHamil(formData: FormData) {
  const ibu_id = formData.get('ibu_id') as string;
  const berat_badan = formData.get('berat_badan') as string;
  const tekanan_darah = formData.get('tekanan_darah') as string;
  const tinggi_badan = formData.get('tinggi_badan') as string;
  const usia_kehamilan = parseInt(formData.get('usia_kehamilan') as string || '0');
  const trimester = formData.get('trimester') as string;
  const hasil_pemeriksaan = formData.get('hasil_pemeriksaan') as string;
  const catatan_dokter = formData.get('catatan_dokter') as string;

  const { data, error } = await supabase
    .from('pemeriksaan_ibu_hamil')
    .insert({
      ibu_id,
      berat_badan: parseFloat(berat_badan) || 0,
      tekanan_darah,
      tinggi_badan: parseInt(tinggi_badan) || 0,
      usia_kehamilan,
      trimester,
      hasil_pemeriksaan,
      catatan_dokter
    })
    .select()
    .single();

  if (error) {
    console.error("Error adding pemeriksaan ibu hamil:", error);
    return { success: false, message: error.message };
  }

  revalidatePath('/kader/pemeriksaan-ibu');
  return { success: true, message: "Data pemeriksaan ibu hamil berhasil ditambahkan", data };
}

// --- KADER: GET JADWAL POSYANDU ---
export async function getAllJadwalPosyandu() {
  const { data, error } = await supabase
    .from('jadwal_posyandu')
    .select(`
      id,
      tanggal_posyandu,
      hari,
      waktu_mulai,
      waktu_selesai,
      tempat,
      kader_profiles!inner(nama as nama_kader, telepon as telepon_kader)
    `)
    .order('tanggal_posyandu', { ascending: false });

  if (error) {
    console.error("Error fetching jadwal posyandu:", error);
    return [];
  }
  return data;
}

// --- KADER: ADD JADWAL POSYANDU ---
export async function addJadwalPosyandu(formData: FormData) {
  const kader_id = formData.get('kader_id') as string;
  const tanggal_posyandu = formData.get('tanggal_posyandu') as string;
  const hari = formData.get('hari') as string;
  const waktu_mulai = formData.get('waktu_mulai') as string;
  const waktu_selesai = formData.get('waktu_selesai') as string;
  const tempat = formData.get('tempat') as string;

  const { data, error } = await supabase
    .from('jadwal_posyandu')
    .insert({
      kader_id,
      tanggal_posyandu,
      hari,
      waktu_mulai,
      waktu_selesai,
      tempat
    })
    .select()
    .single();

  if (error) {
    console.error("Error adding jadwal posyandu:", error);
    return { success: false, message: error.message };
  }

  revalidatePath('/kader/jadwal');
  return { success: true, message: "Jadwal posyandu berhasil ditambahkan", data };
}