import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { Plus } from "lucide-react";
import { getAllJadwalPosyandu } from "@/lib/actions/kader-actions";

interface JadwalPosyandu {
  id: string;
  nama_kader: string;
  tanggal_posyandu: string;
  hari: string;
  waktu_mulai: string;
  waktu_selesai: string;
  tempat: string;
  telepon_kader: string;
}

interface JadwalImunisasi {
  id: string;
  nama_bidan: string;
  tanggal_imunisasi: string;
  hari: string;
  jenis_imunisasi: string;
  tempat: string;
}

export default async function JadwalPage() {
  const jadwal = await getAllJadwalPosyandu();

  // Mock data for imunisasi for now
  const jadwalImunisasi: JadwalImunisasi[] = [
    { id: '1', nama_bidan: 'Dewi', tanggal_imunisasi: '2025-11-06', hari: 'Sabtu', jenis_imunisasi: 'Campak', tempat: 'Posyandu Cempaka' },
    { id: '2', nama_bidan: 'Sari', tanggal_imunisasi: '2025-11-13', hari: 'Sabtu', jenis_imunisasi: 'Polio', tempat: 'Posyandu Cempaka' },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-[#00BFA6] mb-6">Jadwal Posyandu</h2>

      <Card>
        <CardContent className="p-6 space-y-8">

          {/* TABEL JADWAL POSYANDU */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-gray-500 text-sm font-medium">Jadwal Posyandu ({jadwal.length})</h3>
              <Button className="bg-[#D4E157] hover:bg-[#cddc39] text-black font-bold text-xs px-4">
                <Plus className="w-4 h-4 mr-2" /> Tambah Data
              </Button>
            </div>
            <Table>
              <TableHeader className="bg-[#D4E157]">
                <TableRow>
                  <TableHead className="w-[50px] text-black font-bold">No</TableHead>
                  <TableHead className="text-black font-bold">Nama Kader</TableHead>
                  <TableHead className="text-black font-bold">Hari / Tanggal</TableHead>
                  <TableHead className="text-black font-bold">Kontak WhatsApp</TableHead>
                  <TableHead className="text-black font-bold">Tempat</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {jadwal.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8 text-gray-500">
                      Belum ada jadwal posyandu. Silakan tambah data.
                    </TableCell>
                  </TableRow>
                ) : (
                  jadwal.map((item, index) => (
                    <TableRow key={item.id} className="border-b">
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{item.nama_kader}</TableCell>
                      <TableCell>{item.hari}, {new Date(item.tanggal_posyandu).toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' })}</TableCell>
                      <TableCell>{item.telepon_kader}</TableCell>
                      <TableCell>{item.tempat}</TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          {/* TABEL IMUNISASI */}
          <div>
            <h3 className="text-gray-500 text-sm font-medium mb-4">Imunisasi ({jadwalImunisasi.length})</h3>
            <Table>
              <TableHeader className="bg-[#D4E157]">
                <TableRow>
                  <TableHead className="w-[50px] text-black font-bold">No</TableHead>
                  <TableHead className="text-black font-bold">Nama Bidan</TableHead>
                  <TableHead className="text-black font-bold">Hari / Tanggal</TableHead>
                  <TableHead className="text-black font-bold">Jenis Imunisasi</TableHead>
                  <TableHead className="text-black font-bold">Tempat</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {jadwalImunisasi.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8 text-gray-500">
                      Belum ada jadwal imunisasi. Silakan tambah data.
                    </TableCell>
                  </TableRow>
                ) : (
                  jadwalImunisasi.map((item, index) => (
                    <TableRow key={item.id} className="border-b">
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{item.nama_bidan}</TableCell>
                      <TableCell>{item.hari}, {new Date(item.tanggal_imunisasi).toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' })}</TableCell>
                      <TableCell>{item.jenis_imunisasi}</TableCell>
                      <TableCell>{item.tempat}</TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

        </CardContent>
      </Card>
    </div>
  );
}