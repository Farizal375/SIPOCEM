"use server";

import { createClient } from "@supabase/supabase-js";

// Inisialisasi Client Supabase (Pastikan .env.local sudah diisi)
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// 1. Ambil Statistik Dashboard Kader
export async function getKaderStats() {
  const { count: totalAnak } = await supabase.from("anak").select("*", { count: "exact", head: true });
  const { count: totalOrangTua } = await supabase.from("orang_tua").select("*", { count: "exact", head: true });
  
  // Dummy data untuk notifikasi (karena tabel notifikasi belum dibuat di script sql tadi)
  const notifikasi = [
    { title: "Rina Natalia", desc: "Mengajukan Validasi Akun", time: "Hari ini 10:30", color: "bg-green-500" },
    { title: "Pengajuan Diterima", desc: "dari Kader", time: "Hari ini 09:45", color: "bg-blue-500" },
  ];

  return {
    totalAnak: totalAnak || 0,
    totalOrangTua: totalOrangTua || 0,
    notifikasi
  };
}

// 2. Ambil Data Grafik Berat Badan Anak (Untuk Chart)
export async function getGrafikBeratBadan() {
  // Mengambil data dummy jika database masih kosong, agar grafik tetap muncul saat presentasi
  // Nanti bisa diganti dengan: await supabase.from('pemeriksaan_anak').select('usia_bulan, berat_badan');
  
  return [
    { bulan: "Jan", berat: 3.2, standar: 3.0 },
    { bulan: "Feb", berat: 4.5, standar: 4.2 },
    { bulan: "Mar", berat: 5.8, standar: 5.5 },
    { bulan: "Apr", berat: 6.5, standar: 6.8 },
    { bulan: "Mei", berat: 7.2, standar: 7.5 },
    { bulan: "Jun", berat: 8.5, standar: 8.2 },
  ];
}