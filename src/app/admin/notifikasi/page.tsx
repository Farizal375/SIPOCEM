import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { Eye, Trash2, CheckSquare, Key } from "lucide-react";
import { getAllUsers } from "@/lib/actions/admin-actions";

interface Notification {
  id: string;
  judul: string;
  isi: string;
  jenis_notifikasi: string;
  status: string;
  tanggal_kirim: string;
  user_id: string;
}

export default async function PusatNotifikasiPage() {
  // Mock data for now - in a real app this would come from a server action
  const mockNotifications: Notification[] = [
    { id: '1', judul: "Anggi Putri", jenis_notifikasi: "Pemeriksaan Anak", tanggal_kirim: "2025-12-31", isi: "Jadwal imunisasi anak sudah tersedia", status: "read" },
    { id: '2', judul: "Rina Marlina", jenis_notifikasi: "Pemeriksaan Ibu Hamil", tanggal_kirim: "2025-12-23", isi: "Hasil pemeriksaan terbaru sudah...", status: "pending" },
    { id: '3', judul: "Siti Fatimah", jenis_notifikasi: "Pengingat Posyandu", tanggal_kirim: "2025-11-20", isi: "Pengingat jadwal posyandu bulan...", status: "pending" },
    { id: '4', judul: "Deni Rahmat", jenis_notifikasi: "Kesehatan Anak", tanggal_kirim: "2025-11-13", isi: "Anak mengalami demam dan...", status: "read" },
    { id: '5', judul: "Yulia Citra", jenis_notifikasi: "Pendaftaran Akun", tanggal_kirim: "2025-11-11", isi: "Pengajuan akun baru sangat...", status: "pending" },
  ];

  // Get user data to show correct reporter names
  const users = await getAllUsers();

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-teal-400">Pusat Notifikasi</h2>

      <Card>
        <CardContent className="p-6">
          <div className="mb-6">
            <h3 className="text-gray-500 font-medium">Daftar notifikasi</h3>
          </div>

          <Table>
            <TableHeader className="bg-lime-300">
              <TableRow>
                <TableHead className="w-[50px] text-gray-700 font-bold">No</TableHead>
                <TableHead className="text-gray-700 font-bold">Nama Pelapor</TableHead>
                <TableHead className="text-gray-700 font-bold">Jenis Notifikasi</TableHead>
                <TableHead className="text-gray-700 font-bold">Tanggal Kirim</TableHead>
                <TableHead className="text-gray-700 font-bold">Ringkasan</TableHead>
                <TableHead className="text-gray-700 font-bold">Status</TableHead>
                <TableHead className="text-right text-gray-700 font-bold">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockNotifications.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                    Tidak ada notifikasi.
                  </TableCell>
                </TableRow>
              ) : (
                mockNotifications.map((notification, index) => {
                  // Find user associated with this notification
                  const user = users.find(u => u.id === notification.user_id);

                  return (
                    <TableRow key={notification.id} className="border-b">
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{user?.nama || notification.judul}</TableCell>
                      <TableCell className="capitalize">{notification.jenis_notifikasi}</TableCell>
                      <TableCell>{new Date(notification.tanggal_kirim).toLocaleDateString('id-ID', { day: '2-digit', month: '2-digit', year: 'numeric' })}</TableCell>
                      <TableCell className="max-w-[200px] truncate">{notification.isi.substring(0, 50)}{notification.isi.length > 50 ? '...' : ''}</TableCell>
                      <TableCell className={`py-2 px-3 rounded text-center ${
                        notification.status === 'read'
                          ? 'bg-green-100 text-green-800'
                          : notification.status === 'archived'
                          ? 'bg-gray-100 text-gray-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {notification.status === 'read' ? 'Selesai' : notification.status === 'archived' ? 'Arsip' : 'Pending'}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-1">
                          <Button variant="ghost" size="icon" className="h-8 w-8 bg-orange-300 hover:bg-orange-400 text-white rounded">
                            <Key className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8 bg-teal-400 hover:bg-teal-500 text-white rounded">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8 bg-red-400 hover:bg-red-500 text-white rounded">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8 bg-blue-400 hover:bg-blue-500 text-white rounded">
                            <CheckSquare className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  )
                })
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}