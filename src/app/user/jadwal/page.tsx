import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { getJadwalPosyanduTerdekat } from "@/lib/actions/user-actions";

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

export default async function UserJadwalPage() {
  const jadwal = await getJadwalPosyanduTerdekat();

  // Mock data for imunisasi for now
  const jadwalImunisasi = [
    { id: '1', nama_bidan: 'Dewi', tanggal_imunisasi: '2025-11-06', hari: 'Sabtu', jenis_imunisasi: 'Campak', tempat: 'Posyandu Cempaka' },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-[#00BFA6] mb-6">Jadwal Posyandu</h2>

      <Card>
        <CardContent className="p-6 space-y-8">

          {/* TABEL 1: JADWAL POSYANDU */}
          <div>
            <h3 className="text-gray-500 text-sm font-medium mb-4">Jadwal Posyandu ({jadwal.length})</h3>
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
                      Tidak ada jadwal posyandu terdekat.
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

          {/* TABEL 2: JADWAL IMUNISASI */}
          <div>
            <h3 className="text-gray-500 text-sm font-medium mb-4">Jadwal Imunisasi</h3>
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
                      Tidak ada jadwal imunisasi terdekat.
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