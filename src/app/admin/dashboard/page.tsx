import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LayoutDashboard, Users, FileText } from "lucide-react";
import { getAdminDashboardStats } from "@/lib/actions/admin-actions";

// Helper function untuk format waktu relative
function formatTime(dateString: string) {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) return "Baru saja";
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} menit yang lalu`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} jam yang lalu`;
  return date.toLocaleDateString('id-ID');
}

// Interface untuk Log Aktivitas agar tidak pakai 'any'
interface LogAktivitas {
  id: string;
  nama_user: string;
  role: string;
  aktivitas: string;
  created_at: string;
  email: string;
}

export default async function AdminDashboardPage() {
  const stats = await getAdminDashboardStats();

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-teal-500 mb-6">Dashboard Admin</h2>

      {/* STATS CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-[#5FBCC0] text-white border-none shadow-md">
          <CardContent className="p-6">
            <p className="text-xs font-bold uppercase tracking-wider mb-2 opacity-80">Total Kader</p>
            <div className="flex items-center gap-4">
              <LayoutDashboard className="w-8 h-8 opacity-80" />
              <span className="text-4xl font-bold">{stats.totalKader}</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#5FBCC0] text-white border-none shadow-md">
          <CardContent className="p-6">
            <p className="text-xs font-bold uppercase tracking-wider mb-2 opacity-80">Total User</p>
            <div className="flex items-center gap-4">
              <Users className="w-8 h-8 opacity-80" />
              <span className="text-4xl font-bold">{stats.totalUser}</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#5FBCC0] text-white border-none shadow-md">
          <CardContent className="p-6">
            <p className="text-xs font-bold uppercase tracking-wider mb-2 opacity-80">Total Anak</p>
            <div className="flex items-center gap-4">
              <Users className="w-8 h-8 opacity-80" />
              <span className="text-4xl font-bold">{stats.totalAnak}</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#5FBCC0] text-white border-none shadow-md">
          <CardContent className="p-6">
            <p className="text-xs font-bold uppercase tracking-wider mb-2 opacity-80">Notifikasi</p>
            <div className="flex items-center gap-4">
              <FileText className="w-8 h-8 opacity-80" />
              <span className="text-4xl font-bold">{stats.notifikasiPending}</span>
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
            {stats.aktivitas.length === 0 ? (
              <p className="text-gray-400 text-sm italic">Belum ada aktivitas tercatat.</p>
            ) : (
              // Cast data ke interface LogAktivitas
              (stats.aktivitas as LogAktivitas[]).map((log) => (
                <div key={log.id} className="relative">
                  <div className={`absolute -left-[21px] top-1 w-3 h-3 rounded-full ring-4 ring-white 
                    ${log.role === 'Admin' ? 'bg-blue-400' : log.role === 'Kader' ? 'bg-yellow-400' : 'bg-teal-400'}`}>
                  </div>
                  
                  <p className="font-bold text-gray-800 text-sm">
                    {log.nama_user} <span className="text-xs font-normal text-gray-500">({log.role})</span>
                  </p>
                  <p className="text-sm text-gray-600">{log.aktivitas}</p>
                  <p className="text-xs text-gray-400 mt-1">{formatTime(log.created_at)}</p>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}