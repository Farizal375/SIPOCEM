import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { Plus } from "lucide-react";

export default function JadwalPage() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-[#00BFA6] mb-6">Jadwal Posyandu</h2>

      <Card>
        <CardContent className="p-6 space-y-8">
          
          {/* TABEL JADWAL POSYANDU */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-gray-500 text-sm font-medium">Jadwal Posyandu</h3>
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
                <TableRow className="border-b">
                  <TableCell>1</TableCell>
                  <TableCell>Santi</TableCell>
                  <TableCell>Minggu/23-11-2025</TableCell>
                  <TableCell>+6281234567890</TableCell>
                  <TableCell>Posyandu Cempaka</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>

          {/* TABEL IMUNISASI */}
          <div>
            <h3 className="text-gray-500 text-sm font-medium mb-4">Imunisasi</h3>
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
                <TableRow className="border-b">
                  <TableCell>1</TableCell>
                  <TableCell>Dewi</TableCell>
                  <TableCell>Sabtu/06-11-2025</TableCell>
                  <TableCell>Campak</TableCell>
                  <TableCell>Posyandu Cempaka</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>

        </CardContent>
      </Card>
    </div>
  );
}