import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LayoutDashboard, Users, FileText } from "lucide-react";

export default function AdminDashboardPage() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-teal-500 mb-6">Dashboard Admin</h2>

      {/* STATS CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1 */}
        <Card className="bg-[#5FBCC0] text-white border-none shadow-md">
          <CardContent className="p-6">
            <p className="text-xs font-bold uppercase tracking-wider mb-2 opacity-80">Total Kader</p>
            <div className="flex items-center gap-4">
              <LayoutDashboard className="w-8 h-8 opacity-80" />
              <span className="text-4xl font-bold">15</span>
            </div>
          </CardContent>
        </Card>

        {/* Card 2 */}
        <Card className="bg-[#5FBCC0] text-white border-none shadow-md">
          <CardContent className="p-6">
            <p className="text-xs font-bold uppercase tracking-wider mb-2 opacity-80">Total User</p>
            <div className="flex items-center gap-4">
              <Users className="w-8 h-8 opacity-80" />
              <span className="text-4xl font-bold">120</span>
            </div>
          </CardContent>
        </Card>

        {/* Card 3 */}
        <Card className="bg-[#5FBCC0] text-white border-none shadow-md">
          <CardContent className="p-6">
            <p className="text-xs font-bold uppercase tracking-wider mb-2 opacity-80">Laporan Masuk</p>
            <div className="flex items-center gap-4">
              <FileText className="w-8 h-8 opacity-80" />
              <span className="text-4xl font-bold">5</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* AKTIVITAS TERBARU */}
      <Card className="border-none shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg font-semibold text-teal-600">Aktivitas Terbaru</CardTitle>
          <button className="text-xs text-teal-500 hover:underline">Lihat Semua</button>
        </CardHeader>
        <CardContent>
          <div className="space-y-6 relative pl-4 border-l-2 border-gray-100">
            {/* Timeline Item 1 */}
            <div className="relative">
              <div className="absolute -left-[21px] top-1 w-3 h-3 rounded-full bg-teal-400 ring-4 ring-white"></div>
              <p className="font-bold text-gray-800 text-sm">Santi (Kader)</p>
              <p className="text-sm text-gray-600">Login berhasil</p>
              <p className="text-xs text-gray-400 mt-1">Hari ini 09:30</p>
            </div>
            {/* Timeline Item 2 */}
            <div className="relative">
              <div className="absolute -left-[21px] top-1 w-3 h-3 rounded-full bg-yellow-400 ring-4 ring-white"></div>
              <p className="font-bold text-gray-800 text-sm">Siti (Kader)</p>
              <p className="text-sm text-gray-600">Perbarui data Pengguna</p>
              <p className="text-xs text-gray-400 mt-1">Hari ini 08:15</p>
            </div>
            {/* Timeline Item 3 */}
            <div className="relative">
              <div className="absolute -left-[21px] top-1 w-3 h-3 rounded-full bg-blue-400 ring-4 ring-white"></div>
              <p className="font-bold text-gray-800 text-sm">Admin (Anggi)</p>
              <p className="text-sm text-gray-600">Laporan kendala &apos;Selesai&apos;</p>
              <p className="text-xs text-gray-400 mt-1">Kemarin 17:23</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}