import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, Edit, Eye, Trash2, LayoutGrid } from "lucide-react";

export default function DataKaderPage() {
  const kaders = [
    { no: 1, nama: "Siti Atikah", jk: "Perempuan", hp: "+6212345678901" },
    { no: 2, nama: "Susan Aisyah", jk: "Perempuan", hp: "+6212345678901" },
    { no: 3, nama: "Titin", jk: "Perempuan", hp: "+6212345678901" },
    { no: 4, nama: "Lina Setiawati", jk: "Perempuan", hp: "+6212345678901" },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-[#00BFA6] mb-6">Data Kader</h2>

      {/* Info Card */}
      <Card className="bg-[#74C9D3] text-white border-none shadow-md mb-6">
        <CardContent className="p-6">
          <p className="text-xs font-bold uppercase tracking-wider mb-2 opacity-90">TOTAL KADER AKTIF</p>
          <div className="flex items-center gap-4">
            <LayoutGrid className="w-8 h-8 opacity-90" />
            <span className="text-4xl font-bold">4</span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-gray-500 text-sm font-medium">Daftar Kader</h3>
            <Button className="bg-[#D4E157] hover:bg-[#cddc39] text-black font-bold text-xs px-4">
              <Plus className="w-4 h-4 mr-2" /> Tambah Data
            </Button>
          </div>

          <Table>
            <TableHeader className="bg-[#D4E157]">
              <TableRow>
                <TableHead className="w-[50px] text-black font-bold">No</TableHead>
                <TableHead className="text-black font-bold">Nama Kader</TableHead>
                <TableHead className="text-black font-bold">Jenis Kelamin</TableHead>
                <TableHead className="text-black font-bold">Kontak WhatsApp</TableHead>
                <TableHead className="text-center text-black font-bold">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {kaders.map((item) => (
                <TableRow key={item.no} className="border-b">
                  <TableCell>{item.no}</TableCell>
                  <TableCell>{item.nama}</TableCell>
                  <TableCell>{item.jk}</TableCell>
                  <TableCell>{item.hp}</TableCell>
                  <TableCell className="text-center">
                    <div className="flex justify-center gap-2">
                      <Button variant="ghost" size="icon" className="h-7 w-7 bg-blue-400 hover:bg-blue-500 text-white rounded"><Edit className="w-3.5 h-3.5" /></Button>
                      <Button variant="ghost" size="icon" className="h-7 w-7 bg-green-400 hover:bg-green-500 text-white rounded"><Eye className="w-3.5 h-3.5" /></Button>
                      <Button variant="ghost" size="icon" className="h-7 w-7 bg-red-400 hover:bg-red-500 text-white rounded"><Trash2 className="w-3.5 h-3.5" /></Button>
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