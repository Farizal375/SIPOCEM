import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, Edit, Trash2 } from "lucide-react";

export default function DataOrangTuaPage() {
  const parents = [
    { nik: "123456", nama: "Ririn", tgl: "13/07/1995", kategori: "Ibu Hamil", anak: 1, lokasi: "Kp. Melati RT 02", posyandu: "Posyandu Cempaka" },
    { nik: "123456", nama: "Lia", tgl: "15/07/1995", kategori: "Orang Tua", anak: 4, lokasi: "Kp. Melati RT 02", posyandu: "Posyandu Cempaka" },
    // ... data lainnya
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-[#00BFA6] mb-6">Data Orang Tua</h2>

      <Card>
        <CardContent className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-gray-500 text-sm font-medium">Daftar Orang Tua</h3>
            <Button className="bg-[#D4E157] hover:bg-[#cddc39] text-black font-bold text-xs px-4">
              <Plus className="w-4 h-4 mr-2" /> Tambah Data
            </Button>
          </div>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-[#D4E157]">
                <TableRow>
                  <TableHead className="text-black font-bold">NIK</TableHead>
                  <TableHead className="text-black font-bold">Nama Lengkap</TableHead>
                  <TableHead className="text-black font-bold">Tanggal Lahir</TableHead>
                  <TableHead className="text-black font-bold">Kategori</TableHead>
                  <TableHead className="text-black font-bold text-center">Jumlah Anak</TableHead>
                  <TableHead className="text-black font-bold">Lokasi</TableHead>
                  <TableHead className="text-black font-bold">Posyandu</TableHead>
                  <TableHead className="text-center text-black font-bold">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {parents.map((p, i) => (
                  <TableRow key={i} className="border-b">
                    <TableCell>{p.nik}</TableCell>
                    <TableCell>{p.nama}</TableCell>
                    <TableCell>{p.tgl}</TableCell>
                    <TableCell>{p.kategori}</TableCell>
                    <TableCell className="text-center">{p.anak}</TableCell>
                    <TableCell>{p.lokasi}</TableCell>
                    <TableCell>{p.posyandu}</TableCell>
                    <TableCell className="text-center">
                      <div className="flex justify-center gap-2">
                        <Button variant="ghost" size="icon" className="h-7 w-7 bg-white border border-blue-300 text-blue-400 hover:bg-blue-50 rounded"><Edit className="w-3.5 h-3.5" /></Button>
                        <Button variant="ghost" size="icon" className="h-7 w-7 bg-white border border-red-300 text-red-400 hover:bg-red-50 rounded"><Trash2 className="w-3.5 h-3.5" /></Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}