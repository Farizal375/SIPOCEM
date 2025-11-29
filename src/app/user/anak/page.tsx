import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

export default function UserAnakPage() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-[#00BFA6] mb-6">Dashboard Anak</h2>

      {/* KARTU PROFIL ANAK */}
      <Card className="overflow-hidden border shadow-md">
        <div className="p-6 flex flex-col md:flex-row gap-8">
          
          <div className="flex flex-col items-center gap-4 min-w-[200px]">
            <div className="w-32 h-32 bg-gray-200 rounded-full flex items-center justify-center border-4 border-white shadow">
              <span className="text-6xl text-gray-400">👤</span>
            </div>
            <div className="bg-gray-200 px-4 py-1 rounded-full text-sm font-medium text-gray-600">
              diniandini_505
            </div>
          </div>

          <div className="flex-1 space-y-6">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-xl font-bold text-[#004D40]">Data Anak</h3>
                <p className="text-gray-600 font-medium mt-1">Ringkasan Riwayat Pemeriksaan</p>
                <div className="mt-2 space-y-1 text-sm text-gray-600">
                  <p>Status Terakhir: Normal</p>
                  <p>Kunjungan Berikutnya</p>
                  <p className="font-bold text-black">25 Desember 2025</p>
                </div>
              </div>
              <div className="bg-[#00BFA6] p-2 rounded-full text-white">
                👶
              </div>
            </div>

            <div className="border rounded-lg p-6 shadow-sm relative bg-white">
              <div className="absolute top-4 right-4 text-[#00BFA6]">ℹ️</div>
              <h4 className="text-lg font-bold text-[#004D40] mb-2">Data Anak</h4>
              <p className="text-gray-600 mb-4">Riwayat Pemeriksaan</p>
              
              <div className="space-y-1 mb-6 text-gray-700">
                <p>Bulan ke-: 20</p>
                <p>Kunjungan Posyandu: 25 Desember 2025</p>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* GRAFIK PERTUMBUHAN ANAK */}
      <Card className="border shadow-md">
        <CardContent className="p-6">
          <h3 className="text-center font-bold text-lg text-[#004D40] mb-6">Grafik Pertumbuhan Anak</h3>
          
          <div className="bg-white h-96 rounded border relative p-4 flex justify-center items-end">
             {/* Simulasi Grafik KMS Sederhana */}
             <div className="w-full h-full relative bg-[#FDF6E3] border-l-2 border-b-2 border-gray-400">
                {/* Zona Hijau */}
                <div className="absolute top-1/4 bottom-1/4 left-0 right-0 bg-[#E8F5E9] opacity-80 flex items-center justify-center text-green-800 font-bold text-sm">Zona Hijau (Normal)</div>
                {/* Zona Kuning Atas */}
                <div className="absolute top-0 h-1/4 left-0 right-0 bg-[#FBE9E7] opacity-80 flex items-center justify-center text-red-800 font-bold text-sm">Risiko</div>
                {/* Zona Kuning Bawah */}
                <div className="absolute bottom-0 h-1/4 left-0 right-0 bg-[#FBE9E7] opacity-80 flex items-center justify-center text-red-800 font-bold text-sm">Gizi Kurang / Gizi Buruk</div>
                
                {/* Garis Data Dummy */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none">
                   <polyline points="20,250 80,200 160,150 240,120 320,125 400,90 480,70 560,60" fill="none" stroke="#00796B" strokeWidth="3" />
                   <circle cx="20" cy="250" r="5" fill="#00796B" />
                   <circle cx="80" cy="200" r="5" fill="#00796B" />
                   <circle cx="160" cy="150" r="5" fill="#00796B" />
                   <circle cx="560" cy="60" r="5" fill="#00796B" />
                </svg>
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