import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { Plus } from "lucide-react";

export default function PemeriksaanAnakPage() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-[#00BFA6] mb-6">Pemeriksaan Anak</h2>

      <Card>
        <CardContent className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-gray-500 text-sm font-medium">Daftar Anak</h3>
            <Button className="bg-[#D4E157] hover:bg-[#cddc39] text-black font-bold text-xs px-4">
              <Plus className="w-4 h-4 mr-2" /> Tambah Data
            </Button>
          </div>

          <Table>
            <TableHeader className="bg-[#D4E157]">
              <TableRow>
                <TableHead className="w-[50px] text-black font-bold">No</TableHead>
                <TableHead className="text-black font-bold">Nama Anak</TableHead>
                <TableHead className="text-black font-bold">Usia</TableHead>
                <TableHead className="text-black font-bold">Berat Badan</TableHead>
                <TableHead className="text-black font-bold">Tinggi Badan</TableHead>
                <TableHead className="text-black font-bold">Perkembangan</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow className="border-b">
                <TableCell>1</TableCell>
                <TableCell>Budi Santoso</TableCell>
                <TableCell>2 Tahun</TableCell>
                <TableCell>12 kg</TableCell>
                <TableCell>85 cm</TableCell>
                <TableCell>Sesuai Usia</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}