import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bell, AlertCircle, Info } from "lucide-react";
import { getJadwalPosyanduTerdekat } from "@/lib/actions/user-actions";

export default async function UserDashboard() {
  const jadwal = await getJadwalPosyanduTerdekat();

  return (
    <div className="space-y-6">
      {/* Header Info */}
      <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
        <span>Halo, Dini Andini</span>
        <span>Hari ini, {new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
      </div>

      <h2 className="text-2xl font-bold text-[#00BFA6] mb-6">Dashboard User</h2>

      {/* SECTION: DATA IBU HAMIL */}
      <div className="space-y-2">
        <h3 className="font-bold text-black text-sm">Data Ibu Hamil</h3>
        <Card className="border shadow-sm">
          <CardContent className="p-6 flex flex-col md:flex-row gap-6">
            <div className="bg-[#00BFA6] rounded-full w-24 h-24 flex items-center justify-center shrink-0">
              {/* Icon Ibu Hamil placeholder */}
              <div className="text-white text-4xl">🤰</div>
            </div>
            <div className="flex-1 space-y-2">
              <h3 className="text-xl font-bold text-[#004D40]">Riwayat Pemeriksaan</h3>
              <p className="text-sm text-gray-600">Status Kehamilan : Normal</p>
              <p className="text-sm text-gray-600">Usia Kehamilan : 20 Minggu</p>
              <p className="text-sm text-gray-600">Kunjungan Terakhir : 12 November 2025</p>
              <Button className="w-full bg-[#00BFA6] hover:bg-[#00a892] mt-2">Lihat Detail Pemeriksaan</Button>
            </div>
            <div className="md:w-1/3 border rounded bg-white p-2 flex items-center justify-center">
               <div className="text-xs text-gray-400">[Grafik Kecil Placeholder]</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* SECTION: DATA ANAK */}
      <div className="space-y-2">
        <h3 className="font-bold text-black text-sm">Data Anak</h3>
        <Card className="border shadow-sm">
          <CardContent className="p-6 flex flex-col md:flex-row gap-6">
            <div className="bg-[#00BFA6] rounded-full w-24 h-24 flex items-center justify-center shrink-0">
              {/* Icon Anak placeholder */}
              <div className="text-white text-4xl">👶</div>
            </div>
            <div className="flex-1 space-y-2">
              <h3 className="text-xl font-bold text-[#004D40]">Riwayat Pemeriksaan</h3>
              <p className="text-sm text-gray-600">Rentang Usia : 24 Bulan</p>
              <p className="text-sm text-gray-600">Status Pemeriksaan : Normal</p>
              <p className="text-sm text-gray-600">Kunjungan Terakhir : 12 November 2025</p>
              <Button className="w-full bg-[#00BFA6] hover:bg-[#00a892] mt-2">Lihat Detail Pemeriksaan</Button>
            </div>
            <div className="md:w-1/3 border rounded bg-white p-2 flex items-center justify-center">
               <div className="text-xs text-gray-400">[Grafik Kecil Placeholder]</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* JADWAL POSYANDU TERDEKAT */}
      <div className="space-y-2">
        <h3 className="font-bold text-black text-sm">Jadwal Posyandu Terdekat</h3>
        <Card className="border shadow-sm">
          {jadwal.length > 0 ? (
            <CardContent className="p-6 grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
              <div>
                <p className="text-gray-600">{jadwal[0].nama_kader} (Kader)</p>
                <p className="font-bold text-gray-800">{jadwal[0].tempat}</p>
              </div>
              <div>
                <p className="text-gray-600">{new Date(jadwal[0].tanggal_posyandu).toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</p>
                <p className="font-bold text-gray-800">{jadwal[0].tempat}</p>
              </div>
              <div className="text-right font-bold text-gray-700">
                {jadwal[0].telepon_kader || '+6212345678901'}
              </div>
            </CardContent>
          ) : (
            <CardContent className="p-6 text-center text-gray-500">
              Tidak ada jadwal posyandu terdekat
            </CardContent>
          )}
        </Card>
      </div>

      {/* NOTIFIKASI */}
      <div className="space-y-2">
        <h3 className="font-bold text-black text-sm">Notifikasi dan Peringatan</h3>
        <Card className="border shadow-sm bg-white">
          <CardContent className="p-4 space-y-4">
            <div className="flex items-center gap-3 text-sm text-gray-700">
              <Bell className="w-5 h-5 text-gray-800" />
              <span>Jadwal imunisasi anak anda 3 hari lagi.</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-700 border-t pt-3">
              <Info className="w-5 h-5 text-gray-800" />
              <span>Anda belum melakukan pemeriksaan kehamilan bulan ini.</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-700 border-t pt-3">
              <AlertCircle className="w-5 h-5 text-gray-800" />
              <span>Berat badan anak anda sedikit dibawah normal.</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}