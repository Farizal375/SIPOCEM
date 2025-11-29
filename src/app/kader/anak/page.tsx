import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, Edit, Trash2 } from "lucide-react";
import { createClient } from "@supabase/supabase-js"; // Import Supabase

// Setup Supabase Client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// Function untuk mengambil data (Server Component)
async function getDataAnak() {
  const { data, error } = await supabase
    .from('anak')
    .select(`
      *,
      ibu (nama, alamat)
    `); // Join table ke Ibu untuk dapat nama ibu dan alamat
  
  if (error) {
    console.error("Error fetching anak:", error);
    return [];
  }
  return data;
}

export default async function DataAnakPage() {
  // Panggil data dari database
  const kids = await getDataAnak();

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-[#00BFA6] mb-6">Data Anak</h2>

      <Card>
        <CardContent className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-gray-500 text-sm font-medium">Daftar Anak ({kids.length})</h3>
            <Button className="bg-[#D4E157] hover:bg-[#cddc39] text-black font-bold text-xs px-4">
              <Plus className="w-4 h-4 mr-2" /> Tambah Data
            </Button>
          </div>

          <Table>
            <TableHeader className="bg-[#D4E157]">
              <TableRow>
                <TableHead className="text-black font-bold">NIK</TableHead>
                <TableHead className="text-black font-bold">Nama Lengkap</TableHead>
                <TableHead className="text-black font-bold">Tanggal Lahir</TableHead>
                <TableHead className="text-black font-bold">Jenis Kelamin</TableHead>
                <TableHead className="text-black font-bold">Nama Ibu</TableHead>
                <TableHead className="text-black font-bold">Lokasi</TableHead>
                <TableHead className="text-center text-black font-bold">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {kids.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                    Belum ada data anak. Silakan tambah data.
                  </TableCell>
                </TableRow>
              ) : (
                kids.map((k: any, i: number) => (
                  <TableRow key={k.id} className="border-b">
                    <TableCell>{k.nik}</TableCell>
                    <TableCell>{k.nama}</TableCell>
                    <TableCell>{k.tgl_lahir}</TableCell>
                    <TableCell>{k.jenis_kelamin}</TableCell>
                    <TableCell>{k.ibu?.nama || '-'}</TableCell> 
                    <TableCell>{k.ibu?.alamat || '-'}</TableCell>
                    <TableCell className="text-center">
                      <div className="flex justify-center gap-2">
                        <Button variant="ghost" size="icon" className="h-7 w-7 border border-blue-300 text-blue-400"><Edit className="w-3.5 h-3.5" /></Button>
                        <Button variant="ghost" size="icon" className="h-7 w-7 border border-red-300 text-red-400"><Trash2 className="w-3.5 h-3.5" /></Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}