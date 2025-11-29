import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { Eye, Trash2, CheckSquare, Key } from "lucide-react";

export default function PusatNotifikasiPage() {
  // Mock Data sesuai gambar
  const notifications = [
    { no: 1, pelapor: "Anggi Putri", jenis: "Pemeriksaan Anak", tgl: "31-12-2025", ringkasan: "Jadwal imunisasi anak sudah tersedia", status: "Selesai" },
    { no: 2, pelapor: "Rina Marlina", jenis: "Pemeriksaan Ibu Hamil", tgl: "23-12-2025", ringkasan: "Hasil pemeriksaan terbaru sudah...", status: "Pending" },
    { no: 3, pelapor: "Siti Fatimah", jenis: "Pengingat Posyandu", tgl: "20-11-2025", ringkasan: "Pengingat jadwal posyandu bulan...", status: "Pending" },
    { no: 4, pelapor: "Deni Rahmat", jenis: "Kesehatan Anak", tgl: "13-11-2025", ringkasan: "Anak mengalami demam dan...", status: "Selesai" },
    { no: 5, pelapor: "Yulia Citra", jenis: "Pendaftaran Akun", tgl: "11-11-2025", ringkasan: "Pengajuan akun baru sangat...", status: "Pending" },
  ];

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
              {notifications.map((notif) => (
                <TableRow key={notif.no} className="border-b">
                  <TableCell>{notif.no}</TableCell>
                  <TableCell>{notif.pelapor}</TableCell>
                  <TableCell>{notif.jenis}</TableCell>
                  <TableCell>{notif.tgl}</TableCell>
                  <TableCell className="max-w-[200px] truncate">{notif.ringkasan}</TableCell>
                  <TableCell>{notif.status}</TableCell>
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
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}