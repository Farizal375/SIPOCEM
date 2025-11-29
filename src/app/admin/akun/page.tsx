import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, Edit, Trash2 } from "lucide-react";

export default function ManajemenAkunPage() {
  // Mock Data sesuai gambar
  const users = [
    { no: 1, nik: "123456", nama: "Anggi Putri", username: "anggi.p", hp: "0812345689", peran: "User", status: "Aktif" },
    { no: 2, nik: "123456", nama: "Bila Sabila", username: "sabila_s", hp: "0812345678", peran: "Kader", status: "Nonaktif" },
    { no: 3, nik: "123456", nama: "Citra Diaz", username: "citra.01", hp: "0812334566", peran: "Kader", status: "Aktif" },
    { no: 4, nik: "123456", nama: "Leni Sintia", username: "leni00", hp: "0812345678", peran: "User", status: "Aktif" },
    { no: 5, nik: "123456", nama: "Sinta Ayu", username: "sintayu1", hp: "0812345678", peran: "User", status: "Aktif" },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-teal-400">Manajemen Akun</h2>

      <Card>
        <CardContent className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-gray-500 font-medium">Daftar Akun</h3>
            <Button className="bg-lime-400 hover:bg-lime-500 text-black font-semibold">
              <Plus className="w-4 h-4 mr-2" /> Tambah Akun
            </Button>
          </div>

          <Table>
            <TableHeader className="bg-lime-300">
              <TableRow>
                <TableHead className="w-[50px] text-gray-700 font-bold">No</TableHead>
                <TableHead className="text-gray-700 font-bold">NIK</TableHead>
                <TableHead className="text-gray-700 font-bold">Nama</TableHead>
                <TableHead className="text-gray-700 font-bold">Nama Pengguna</TableHead>
                <TableHead className="text-gray-700 font-bold">No HP</TableHead>
                <TableHead className="text-gray-700 font-bold">Peran</TableHead>
                <TableHead className="text-gray-700 font-bold">Status</TableHead>
                <TableHead className="text-right text-gray-700 font-bold">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.no} className="border-b">
                  <TableCell>{user.no}</TableCell>
                  <TableCell>{user.nik}</TableCell>
                  <TableCell>{user.nama}</TableCell>
                  <TableCell>{user.username}</TableCell>
                  <TableCell>{user.hp}</TableCell>
                  <TableCell>{user.peran}</TableCell>
                  <TableCell>{user.status}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="icon" className="h-8 w-8 text-blue-500 border-blue-200 hover:bg-blue-50">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="icon" className="h-8 w-8 text-red-500 border-red-200 hover:bg-red-50">
                        <Trash2 className="w-4 h-4" />
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