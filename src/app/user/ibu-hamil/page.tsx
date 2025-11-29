import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react"; // PERBAIKAN: Menghapus 'Download'

export default function UserIbuHamilPage() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-[#00BFA6] mb-6">Data Ibu Hamil</h2>

      {/* KARTU PROFIL & RINGKASAN */}
      <Card className="overflow-hidden border shadow-md">
        <div className="p-6 flex flex-col md:flex-row gap-8">
          
          {/* Kolom Kiri: Profil Singkat */}
          <div className="flex flex-col items-center gap-4 min-w-[200px]">
            <div className="w-32 h-32 bg-gray-200 rounded-full flex items-center justify-center border-4 border-white shadow">
              <span className="text-6xl text-gray-400">👤</span>
            </div>
            <div className="bg-gray-200 px-4 py-1 rounded-full text-sm font-medium text-gray-600">
              Nama User
            </div>
          </div>

          {/* Kolom Kanan: Detail Data */}
          <div className="flex-1 space-y-6">
            {/* Header Data */}
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-xl font-bold text-[#004D40]">Data Ibu Hamil</h3>
                <p className="text-gray-600 font-medium mt-1">Ringkasan Riwayat Pemeriksaan</p>
                <div className="mt-2 space-y-1 text-sm text-gray-600">
                  <p>Status Terakhir: Normal</p>
                  <p>Kunjungan Berikutnya</p>
                  <p className="font-bold text-black">25 Desember 2025</p>
                </div>
              </div>
              <div className="bg-[#00BFA6] p-2 rounded-full text-white">
                🤰
              </div>
            </div>

            {/* Kotak Putih Dalam */}
            <div className="border rounded-lg p-6 shadow-sm relative bg-white">
              <div className="absolute top-4 right-4 text-[#00BFA6]">
                ℹ️
              </div>
              <h4 className="text-lg font-bold text-[#004D40] mb-2">Data Ibu Hamil</h4>
              <p className="text-gray-600 mb-4">Riwayat Pemeriksaan</p>
              
              <div className="space-y-1 mb-6 text-gray-700">
                <p>Trimester: 20 Minggu</p>
                <p>Kunjungan Posyandu: 25 Desember 2025</p>
              </div>

              <Button className="w-full bg-[#00BFA6] hover:bg-[#00a892]">Lihat Riwayat Lengkap</Button>
            </div>
          </div>
        </div>
      </Card>

      {/* GRAFIK PERTUMBUHAN JANIN */}
      <Card className="border shadow-md">
        <CardContent className="p-6">
          <h3 className="text-center font-bold text-lg text-[#004D40] mb-6">Grafik Pertumbuhan Janin</h3>
          
          <div className="bg-gray-50 h-80 rounded border flex items-center justify-center relative">
            <span className="text-gray-400">[Area Grafik Chart.js]</span>
            {/* Placeholder Visual Grafik */}
            <div className="absolute inset-0 p-8 opacity-50 pointer-events-none">
                {/* Visual Dummy Chart Lines */}
                <div className="w-full h-full border-l border-b border-gray-300 relative">
                    <div className="absolute bottom-0 left-0 w-full h-full bg-gradient-to-tr from-green-100 to-transparent skew-y-6 transform origin-bottom-left"></div>
                </div>
            </div>
          </div>

          <div className="flex justify-between items-center mt-6">
            <Button variant="outline" className="flex items-center gap-2 rounded-full bg-gray-200 border-none text-black hover:bg-gray-300 px-6">
              Zoom In-Out <CheckCircle className="w-4 h-4 text-[#00BFA6]" />
            </Button>
            <Button variant="outline" className="flex items-center gap-2 rounded-full bg-gray-200 border-none text-black hover:bg-gray-300 px-6">
              <span className="text-[#00BFA6] font-bold">⚙️</span> Unduh Laporan
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}