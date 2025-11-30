import { Card, CardContent } from "@/components/ui/card";
import { LayoutDashboard, Users, Calendar } from "lucide-react";
import { getKaderStats, getGrafikBeratBadan } from "@/lib/actions/dashboard-actions";
import GrafikAnak from "@/components/dashboard/grafik-anak";

export default async function KaderDashboard() {
  // 1. Ambil data real dari Backend (Server Action)
  const stats = await getKaderStats();
  const grafikData = await getGrafikBeratBadan();

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-[#00BFA6] mb-6">Dashboard Kader</h2>

      {/* STATS CARDS (Dinamis dari Database) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-[#74C9D3] text-white border-none shadow-md h-32 relative overflow-hidden">
          <CardContent className="p-6">
            <p className="text-xs font-bold uppercase tracking-wider mb-2 opacity-90">TOTAL ANAK</p>
            <div className="flex items-center gap-4">
              <LayoutDashboard className="w-8 h-8 opacity-90" />
              <span className="text-4xl font-bold">{stats.totalAnak}</span>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-[#74C9D3] text-white border-none shadow-md h-32 relative overflow-hidden">
          <CardContent className="p-6">
            <p className="text-xs font-bold uppercase tracking-wider mb-2 opacity-90">TOTAL ORANG TUA</p>
            <div className="flex items-center gap-4">
              <Users className="w-8 h-8 opacity-90" />
              <span className="text-4xl font-bold">{stats.totalOrangTua}</span>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-[#74C9D3] text-white border-none shadow-md h-32 relative overflow-hidden">
          <CardContent className="p-6">
            <p className="text-xs font-bold uppercase tracking-wider mb-2 opacity-90">JADWAL HARI INI</p>
            <div className="flex items-center gap-4">
              <Calendar className="w-8 h-8 opacity-90" />
              <span className="text-4xl font-bold">{stats.jadwalHariIni}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* GRAFIK (Fungsional dengan Recharts) */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="font-bold text-gray-700 mb-6">Rata-rata Kenaikan Berat Badan Anak (Kg)</h3>
              <GrafikAnak data={grafikData} />
            </CardContent>
          </Card>
        </div>

        {/* NOTIFIKASI TERBARU (Dinamis) */}
        <div className="lg:col-span-1">
          <Card>
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-[#00BFA6]">Notifikasi Terbaru</h3>
                <button className="text-xs text-gray-500 hover:text-[#00BFA6]">Lihat Semua</button>
              </div>
              <div className="space-y-6 relative pl-4 border-l border-gray-200">
                {stats.notifikasi.map((item, i) => (
                  <div key={i} className="relative">
                    <div className={`absolute -left-[21px] top-1.5 w-2.5 h-2.5 rounded-full ${item.color} ring-4 ring-white`}></div>
                    <p className="font-bold text-gray-800 text-sm">{item.title}</p>
                    <p className="text-xs text-gray-500">{item.desc}</p>
                    <p className="text-[10px] text-gray-400 mt-1">{item.time}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}