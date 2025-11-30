import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, Edit, Trash2 } from "lucide-react";
import { getAllUsers } from "@/lib/actions/admin-actions";

export default async function ManajemenAkunPage() {
  const users = await getAllUsers();

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-teal-400">Manajemen Akun</h2>

      <Card>
        <CardContent className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-gray-500 font-medium">Daftar Akun ({users.length})</h3>
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
                <TableHead className="text-gray-700 font-bold">Email</TableHead>
                <TableHead className="text-gray-700 font-bold">No HP</TableHead>
                <TableHead className="text-gray-700 font-bold">Peran</TableHead>
                <TableHead className="text-gray-700 font-bold">Status</TableHead>
                <TableHead className="text-right text-gray-700 font-bold">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-8 text-gray-500">
                    Belum ada data akun.
                  </TableCell>
                </TableRow>
              ) : (
                users.map((user, index) => (
                  <TableRow key={user.id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{user.nik}</TableCell>
                    <TableCell>{user.nama}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.telepon}</TableCell>
                    <TableCell className="capitalize">{user.role}</TableCell>
                    <TableCell className={`py-2 px-3 rounded text-center ${
                      user.status === 'aktif'
                        ? 'bg-green-100 text-green-800'
                        : user.status === 'nonaktif'
                        ? 'bg-red-100 text-red-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {user.status === 'aktif' ? 'Aktif' : user.status === 'nonaktif' ? 'Nonaktif' : 'Pending'}
                    </TableCell>
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
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}