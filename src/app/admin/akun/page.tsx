"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Plus, Edit, Trash2, X } from "lucide-react";

export default function ManajemenAkunPage() {
  const [users, setUsers] = useState([
    { id: 1, nik: "123456", nama: "Sinta Ayu", username: "sintaayu1", telepon: "0812345678", role: "user", status: "aktif" },
    { id: 2, nik: "123456", nama: "John Doe", username: "johndoe", telepon: "0812345679", role: "user", status: "nonaktif" },
    { id: 3, nik: "123456", nama: "Jane Smith", username: "janesmith", telepon: "0812345680", role: "admin", status: "aktif" },
    { id: 4, nik: "123456", nama: "Bob Wilson", username: "bobwilson", telepon: "0812345681", role: "user", status: "aktif" },
    { id: 5, nik: "123456", nama: "Alice Brown", username: "alicebrown", telepon: "0812345682", role: "user", status: "aktif" },
  ]);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const [formData, setFormData] = useState({
    nik: "",
    nama: "",
    username: "",
    telepon: "",
    password: "",
    confirmPassword: "",
    role: "user",
    status: "aktif"
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleAddAccount = () => {
    const newUser = {
      id: users.length + 1,
      nik: formData.nik,
      nama: formData.nama,
      username: formData.username,
      telepon: formData.telepon,
      role: formData.role,
      status: formData.status
    };
    setUsers([...users, newUser]);
    setIsAddModalOpen(false);
    resetForm();
  };

  const handleEditAccount = () => {
    setUsers(users.map(user => 
      user.id === selectedUser.id 
        ? { ...user, ...formData }
        : user
    ));
    setIsEditModalOpen(false);
    resetForm();
  };

  const handleDeleteAccount = () => {
    setUsers(users.filter(user => user.id !== selectedUser.id));
    setIsDeleteModalOpen(false);
    setSelectedUser(null);
  };

  const openEditModal = (user) => {
    setSelectedUser(user);
    setFormData({
      nik: user.nik,
      nama: user.nama,
      username: user.username,
      telepon: user.telepon,
      password: "",
      confirmPassword: "",
      role: user.role,
      status: user.status
    });
    setIsEditModalOpen(true);
  };

  const openDeleteModal = (user) => {
    setSelectedUser(user);
    setIsDeleteModalOpen(true);
  };

  const resetForm = () => {
    setFormData({
      nik: "",
      nama: "",
      username: "",
      telepon: "",
      password: "",
      confirmPassword: "",
      role: "user",
      status: "aktif"
    });
    setSelectedUser(null);
  };

  return (
    <div className="space-y-6 p-6">
      <h2 className="text-2xl font-bold text-teal-600">Manajemen Akun</h2>
      
      <Card>
        <CardContent className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-gray-600 font-medium">Daftar Akun</h3>
            <Button 
              onClick={() => setIsAddModalOpen(true)}
              className="bg-lime-400 hover:bg-lime-500 text-black font-semibold"
            >
              <Plus className="w-4 h-4 mr-2" /> Tambah Akun
            </Button>
          </div>

          <Table>
            <TableHeader className="bg-lime-300">
              <TableRow>
                <TableHead className="w-[50px] text-gray-700 font-bold">No</TableHead>
                <TableHead className="text-gray-700 font-bold">NIK</TableHead>
                <TableHead className="text-gray-700 font-bold">Nama</TableHead>
                <TableHead className="text-gray-700 font-bold">Username</TableHead>
                <TableHead className="text-gray-700 font-bold">No HP</TableHead>
                <TableHead className="text-gray-700 font-bold">Peran</TableHead>
                <TableHead className="text-gray-700 font-bold">Status</TableHead>
                <TableHead className="text-right text-gray-700 font-bold">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user, index) => (
                <TableRow key={user.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{user.nik}</TableCell>
                  <TableCell>{user.nama}</TableCell>
                  <TableCell>{user.username}</TableCell>
                  <TableCell>{user.telepon}</TableCell>
                  <TableCell className="capitalize">{user.role}</TableCell>
                  <TableCell>
                    <span className={`py-1 px-3 rounded text-sm ${
                      user.status === 'aktif'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {user.status === 'aktif' ? 'Aktif' : 'Nonaktif'}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button 
                        onClick={() => openEditModal(user)}
                        variant="outline" 
                        size="icon" 
                        className="h-8 w-8 text-blue-500 border-blue-200 hover:bg-blue-50"
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button 
                        onClick={() => openDeleteModal(user)}
                        variant="outline" 
                        size="icon" 
                        className="h-8 w-8 text-red-500 border-red-200 hover:bg-red-50"
                      >
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

      {/* Modal Tambah Akun */}
      <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
        <DialogContent className="max-w-3xl [&>button]:hidden">
          <DialogHeader className="bg-teal-500 text-white p-4 -m-6 mb-6 flex flex-row items-center justify-between">
            <DialogTitle className="text-xl">Tambah Akun</DialogTitle>
            <Button
              onClick={() => setIsAddModalOpen(false)}
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-white hover:bg-teal-600"
            >
              <X className="h-5 w-5" />
            </Button>
          </DialogHeader>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="nik">NIK</Label>
              <Input
                id="nik"
                value={formData.nik}
                onChange={(e) => handleInputChange("nik", e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="nama">Nama Lengkap</Label>
              <Input
                id="nama"
                value={formData.nama}
                onChange={(e) => handleInputChange("nama", e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                value={formData.username}
                onChange={(e) => handleInputChange("username", e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="telepon">No.Hp</Label>
              <Input
                id="telepon"
                value={formData.telepon}
                onChange={(e) => handleInputChange("telepon", e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) => handleInputChange("password", e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="confirmPassword">Konfirmasi Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="role">Peran</Label>
              <Select value={formData.role} onValueChange={(value) => handleInputChange("role", value)}>
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="user">User</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="status">Status</Label>
              <Select value={formData.status} onValueChange={(value) => handleInputChange("status", value)}>
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="aktif">Aktif</SelectItem>
                  <SelectItem value="nonaktif">Nonaktif</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <Button
              onClick={() => setIsAddModalOpen(false)}
              variant="outline"
              className="border-teal-500 text-teal-500 hover:bg-teal-50"
            >
              Batal
            </Button>
            <Button
              onClick={handleAddAccount}
              className="bg-teal-500 hover:bg-teal-600 text-white"
            >
              Simpan
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Modal Edit Akun */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="max-w-3xl [&>button]:hidden">
          <DialogHeader className="bg-teal-500 text-white p-4 -m-6 mb-6 flex flex-row items-center justify-between">
            <DialogTitle className="text-xl">Edit Akun</DialogTitle>
            <Button
              onClick={() => setIsEditModalOpen(false)}
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-white hover:bg-teal-600"
            >
              <X className="h-5 w-5" />
            </Button>
          </DialogHeader>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="edit-nik">NIK</Label>
              <Input
                id="edit-nik"
                value={formData.nik}
                onChange={(e) => handleInputChange("nik", e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="edit-nama">Nama Lengkap</Label>
              <Input
                id="edit-nama"
                value={formData.nama}
                onChange={(e) => handleInputChange("nama", e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="edit-username">Username</Label>
              <Input
                id="edit-username"
                value={formData.username}
                onChange={(e) => handleInputChange("username", e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="edit-telepon">No.Hp</Label>
              <Input
                id="edit-telepon"
                value={formData.telepon}
                onChange={(e) => handleInputChange("telepon", e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="edit-password">Password</Label>
              <Input
                id="edit-password"
                type="password"
                value={formData.password}
                onChange={(e) => handleInputChange("password", e.target.value)}
                placeholder="Kosongkan jika tidak ingin mengubah"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="edit-confirmPassword">Konfirmasi Password</Label>
              <Input
                id="edit-confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="edit-role">Peran</Label>
              <Select value={formData.role} onValueChange={(value) => handleInputChange("role", value)}>
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="user">User</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="edit-status">Status</Label>
              <Select value={formData.status} onValueChange={(value) => handleInputChange("status", value)}>
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="aktif">Aktif</SelectItem>
                  <SelectItem value="nonaktif">Nonaktif</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <Button
              onClick={() => setIsEditModalOpen(false)}
              variant="outline"
              className="border-teal-500 text-teal-500 hover:bg-teal-50"
            >
              Batal
            </Button>
            <Button
              onClick={handleEditAccount}
              className="bg-teal-500 hover:bg-teal-600 text-white"
            >
              Simpan
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Modal Hapus Akun */}
      <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
        <DialogContent className="max-w-md [&>button]:hidden">
          <DialogHeader className="bg-teal-500 text-white p-4 -m-6 mb-6 flex flex-row items-center justify-between">
            <DialogTitle className="text-xl">Hapus Akun?</DialogTitle>
            <Button
              onClick={() => setIsDeleteModalOpen(false)}
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-white hover:bg-teal-600"
            >
              <X className="h-5 w-5" />
            </Button>
          </DialogHeader>

          <div className="py-4">
            <p className="text-gray-700">
              Apakah Anda yakin ingin menghapus akun ini? Tindakan ini tidak dapat dibatalkan
            </p>
          </div>

          <div className="flex justify-end gap-3">
            <Button
              onClick={() => setIsDeleteModalOpen(false)}
              className="bg-teal-500 hover:bg-teal-600 text-white"
            >
              Batal
            </Button>
            <Button
              onClick={handleDeleteAccount}
              variant="outline"
              className="border-teal-500 text-teal-500 hover:bg-teal-50"
            >
              Hapus
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}