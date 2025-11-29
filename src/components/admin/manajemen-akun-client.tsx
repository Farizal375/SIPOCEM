"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Edit, Trash2, Search, Loader2 } from "lucide-react";
import { deleteFullUser, createFullUser, updateUserProfile } from "@/lib/actions/admin-actions";
import { useRouter } from "next/navigation";


interface UserData {
  id: string;
  email: string;
  role: string;
  status: string;
  nama: string;
  telepon: string;
  nik: string;
}

export default function ManajemenAkunClient({ initialData }: { initialData: UserData[] }) {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  
  // State Modal Tambah
  const [isAddOpen, setIsAddOpen] = useState(false);
  
  // State Modal Edit
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editData, setEditData] = useState<UserData | null>(null);

  const [isLoading, setIsLoading] = useState(false);

  const filteredData = initialData.filter((user) =>
    (user.nama?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
    (user.email?.toLowerCase() || "").includes(searchTerm.toLowerCase())
  );

  // --- HANDLE TAMBAH ---
  const handleAdd = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData(e.currentTarget);
    
    const res = await createFullUser(formData);
    
    setIsLoading(false);
    if (res.success) {
      setIsAddOpen(false);
      alert("Berhasil! Akun telah dibuat dan bisa digunakan untuk login.");
      router.refresh();
    } else {
      alert("Gagal: " + res.message);
    }
  };

  // --- HANDLE HAPUS ---
  const handleDelete = async (id: string) => {
    if (confirm("Yakin ingin menghapus akun ini? User tidak akan bisa login lagi.")) {
      const res = await deleteFullUser(id);
      if (res.success) {
        alert("Akun berhasil dihapus.");
        router.refresh();
      } else {
        alert("Gagal menghapus: " + res.message);
      }
    }
  };

  // --- HANDLE EDIT ---
  const openEditModal = (user: UserData) => {
    setEditData(user);
    setIsEditOpen(true);
  };

  const handleEdit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData(e.currentTarget);
    
    // Append ID dan Role karena tidak ada di input form (hidden logic)
    if(editData) {
        formData.append('id', editData.id);
        formData.append('role', editData.role);
    }

    const res = await updateUserProfile(formData);
    
    setIsLoading(false);
    if (res.success) {
      setIsEditOpen(false);
      setEditData(null);
      alert("Data berhasil diperbarui.");
      router.refresh();
    } else {
      alert("Gagal update: " + res.message);
    }
  };

  return (
    <div className="space-y-4">
      {/* HEADER & PENCARIAN */}
      <div className="flex flex-col md:flex-row justify-between items-center bg-white p-4 rounded-lg shadow-sm border gap-4">
        <div className="relative w-full md:w-72">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
          <Input 
            placeholder="Cari nama atau email..." 
            className="pl-8" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* MODAL TAMBAH AKUN */}
        <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
          <DialogTrigger asChild>
            <Button className="bg-[#D4E157] hover:bg-[#cddc39] text-black font-semibold">
              <Plus className="w-4 h-4 mr-2" /> Tambah Akun
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Buat Akun Baru</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleAdd} className="space-y-4">
              <div className="space-y-2">
                <Label>Nama Lengkap</Label>
                <Input name="nama" required placeholder="Nama User" />
              </div>
              <div className="space-y-2">
                <Label>Email (Untuk Login)</Label>
                <Input name="email" type="email" required placeholder="user@sipocem.com" />
              </div>
              <div className="space-y-2">
                <Label>Password</Label>
                <Input name="password" type="password" required minLength={8} placeholder="Minimal 8 karakter" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>No HP</Label>
                  <Input name="telepon" required placeholder="0812..." />
                </div>
                <div className="space-y-2">
                  <Label>Peran</Label>
                  <Select name="role" defaultValue="user">
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih Peran" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="user">User (Ibu)</SelectItem>
                      <SelectItem value="kader">Kader</SelectItem>
                      <SelectItem value="admin">Admin</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label>NIK (Opsional untuk Kader/Admin)</Label>
                <Input name="nik" placeholder="16 digit NIK" />
              </div>
              <DialogFooter>
                <Button type="submit" className="bg-teal-500 hover:bg-teal-600 text-white" disabled={isLoading}>
                  {isLoading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                  {isLoading ? "Memproses..." : "Buat Akun"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>

        {/* MODAL EDIT AKUN */}
        <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Data Akun</DialogTitle>
            </DialogHeader>
            {editData && (
                <form onSubmit={handleEdit} className="space-y-4">
                <div className="space-y-2">
                    <Label>Email (Read Only)</Label>
                    <Input value={editData.email} disabled className="bg-gray-100" />
                </div>
                <div className="space-y-2">
                    <Label>Nama Lengkap</Label>
                    <Input name="nama" defaultValue={editData.nama} required />
                </div>
                <div className="space-y-2">
                    <Label>No HP</Label>
                    <Input name="telepon" defaultValue={editData.telepon} required />
                </div>
                {editData.role === 'user' && (
                    <div className="space-y-2">
                        <Label>NIK</Label>
                        <Input name="nik" defaultValue={editData.nik} />
                    </div>
                )}
                <DialogFooter>
                    <Button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white" disabled={isLoading}>
                    {isLoading ? "Menyimpan..." : "Simpan Perubahan"}
                    </Button>
                </DialogFooter>
                </form>
            )}
          </DialogContent>
        </Dialog>
      </div>

      {/* TABEL DATA */}
      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        <Table>
          <TableHeader className="bg-[#D4E157]">
            <TableRow>
              <TableHead className="text-black font-bold w-[50px]">No</TableHead>
              <TableHead className="text-black font-bold">NIK</TableHead>
              <TableHead className="text-black font-bold">Nama</TableHead>
              <TableHead className="text-black font-bold">Email</TableHead>
              <TableHead className="text-black font-bold">No HP</TableHead>
              <TableHead className="text-black font-bold">Peran</TableHead>
              <TableHead className="text-black font-bold">Status</TableHead>
              <TableHead className="text-black font-bold text-right">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-8 text-gray-500">
                  Tidak ada data akun ditemukan.
                </TableCell>
              </TableRow>
            ) : (
              filteredData.map((user, index) => (
                <TableRow key={user.id} className="border-b hover:bg-gray-50">
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{user.nik}</TableCell>
                  <TableCell className="font-medium">{user.nama}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.telepon}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded text-xs font-semibold uppercase
                      ${user.role === 'admin' ? 'bg-purple-100 text-purple-700' : 
                        user.role === 'kader' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'}`}>
                      {user.role}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className="text-green-600 text-xs font-bold bg-green-50 px-2 py-1 rounded">
                      {user.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button 
                        variant="outline" size="icon" 
                        className="h-8 w-8 text-blue-500 border-blue-200 hover:bg-blue-50"
                        onClick={() => openEditModal(user)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button 
                        variant="outline" size="icon" 
                        className="h-8 w-8 text-red-500 border-red-200 hover:bg-red-50"
                        onClick={() => handleDelete(user.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}