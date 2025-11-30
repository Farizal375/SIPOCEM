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
  const { count: jadwalHariIni } = await supabase
    .from("jadwal_posyandu")
    .select("*", { count: "exact", head: true })
    .gte("tanggal_posyandu", new Date().toISOString().split('T')[0])
    .lte("tanggal_posyandu", new Date().toISOString().split('T')[0]);

  // Notifikasi data
  const { data: notifikasiData } = await supabase
    .from("notifikasi")
    .select("*")
    .order("tanggal_kirim", { ascending: false })
    .limit(5);

  const notifikasi = notifikasiData?.map(n => ({
    id: n.id,
    title: n.judul,
    desc: n.isi,
    time: new Date(n.tanggal_kirim).toLocaleString('id-ID', {
      dateStyle: 'medium',
      timeStyle: 'short'
    }),
    status: n.status
  })) || [];

  return {
    totalAnak: totalAnak || 0,
    totalOrangTua: totalOrangTua || 0,
    jadwalHariIni: jadwalHariIni || 0,
    notifikasi
  };
}

// 2. Ambil Data Grafik Berat Badan Anak (Untuk Chart)
export async function getGrafikBeratBadan() {
  // Ambil data pemeriksaan anak untuk grafik berat badan
  const { data: pemeriksaanData } = await supabase
    .from("pemeriksaan_anak")
    .select("usia_bulan, berat_badan")
    .order("usia_bulan", { ascending: true })
    .limit(12); // Ambil 12 data terbaru

  // Jika tidak ada data dari database, gunakan data dummy
  if (!pemeriksaanData || pemeriksaanData.length === 0) {
    return [
      { bulan: "0", berat: 3.2, standar: 3.0 },
      { bulan: "1", berat: 4.0, standar: 3.8 },
      { bulan: "2", berat: 4.8, standar: 4.6 },
      { bulan: "3", berat: 5.5, standar: 5.2 },
      { bulan: "4", berat: 6.2, standar: 5.8 },
      { bulan: "5", berat: 6.8, standar: 6.3 },
    ];
  }

  // Format data sesuai kebutuhan grafik
  return pemeriksaanData.map(p => ({
    bulan: p.usia_bulan?.toString() || "0",
    berat: parseFloat(p.berat_badan?.toString() || "0") || 0,
    standar: 0 // Tambahkan standar nanti berdasarkan usia
  }));
}