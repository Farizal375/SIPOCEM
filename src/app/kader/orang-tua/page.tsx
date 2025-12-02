"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, Edit, Eye, Trash2, X } from "lucide-react";

interface OrangTuaFormData {
  nik: string;
  namaLengkap: string;
  tanggalLahir: string;
  kategori: string;
  jumlahAnak: string;
  lokasi: string;
  posyandu: string;
}

interface FormErrors {
  nik?: string;
  namaLengkap?: string;
  tanggalLahir?: string;
  kategori?: string;
  jumlahAnak?: string;
  lokasi?: string;
  posyandu?: string;
}

export default function DataOrangTuaPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState<OrangTuaFormData>({
    nik: '',
    namaLengkap: '',
    tanggalLahir: '',
    kategori: '',
    jumlahAnak: '',
    lokasi: '',
    posyandu: ''
  });
  const [errors, setErrors] = useState<FormErrors>({});

  const orangTuaList = [
    { no: 1, nik: "1234567890123456", nama: "Siti Aminah", kategori: "Ibu Hamil", anak: 2, posyandu: "Posyandu A" },
    { no: 2, nik: "1234567890123457", nama: "Ratna Sari", kategori: "Orang Tua", anak: 1, posyandu: "Posyandu B" },
    { no: 3, nik: "1234567890123458", nama: "Dewi Lestari", kategori: "Ibu Hamil", anak: 3, posyandu: "Posyandu C" },
    { no: 4, nik: "1234567890123459", nama: "Sri Mulyani", kategori: "Orang Tua", anak: 2, posyandu: "Posyandu A" },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.nik.trim()) {
      newErrors.nik = 'NIK harus diisi';
    } else if (formData.nik.length !== 16) {
      newErrors.nik = 'NIK harus 16 digit';
    }

    if (!formData.namaLengkap.trim()) {
      newErrors.namaLengkap = 'Nama lengkap harus diisi';
    }

    if (!formData.tanggalLahir) {
      newErrors.tanggalLahir = 'Tanggal lahir harus diisi';
    }

    if (!formData.kategori) {
      newErrors.kategori = 'Kategori harus dipilih';
    }

    if (!formData.jumlahAnak.trim()) {
      newErrors.jumlahAnak = 'Jumlah anak harus diisi';
    } else if (isNaN(Number(formData.jumlahAnak)) || Number(formData.jumlahAnak) < 0) {
      newErrors.jumlahAnak = 'Jumlah anak harus berupa angka positif';
    }

    if (!formData.lokasi.trim()) {
      newErrors.lokasi = 'Lokasi harus diisi';
    }

    if (!formData.posyandu.trim()) {
      newErrors.posyandu = 'Posyandu harus diisi';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSimpan = () => {
    if (validateForm()) {
      console.log('Data yang disimpan:', formData);
      alert('Data orang tua berhasil disimpan!');
      handleCloseModal();
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setFormData({
      nik: '',
      namaLengkap: '',
      tanggalLahir: '',
      kategori: '',
      jumlahAnak: '',
      lokasi: '',
      posyandu: ''
    });
    setErrors({});
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-[#00BFA6] mb-6">Data Orang Tua</h2>

      <Card>
        <CardContent className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-gray-500 text-sm font-medium">Daftar Orang Tua</h3>
            <Button 
              onClick={() => setIsModalOpen(true)}
              className="bg-[#D4E157] hover:bg-[#cddc39] text-black font-bold text-xs px-4"
            >
              <Plus className="w-4 h-4 mr-2" /> Tambah Data
            </Button>
          </div>

          <Table>
            <TableHeader className="bg-[#D4E157]">
              <TableRow>
                <TableHead className="w-[50px] text-black font-bold">No</TableHead>
                <TableHead className="text-black font-bold">NIK</TableHead>
                <TableHead className="text-black font-bold">Nama Lengkap</TableHead>
                <TableHead className="text-black font-bold">Kategori</TableHead>
                <TableHead className="text-black font-bold">Jumlah Anak</TableHead>
                <TableHead className="text-black font-bold">Posyandu</TableHead>
                <TableHead className="text-center text-black font-bold">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orangTuaList.map((item) => (
                <TableRow key={item.no} className="border-b">
                  <TableCell>{item.no}</TableCell>
                  <TableCell>{item.nik}</TableCell>
                  <TableCell>{item.nama}</TableCell>
                  <TableCell>{item.kategori}</TableCell>
                  <TableCell>{item.anak}</TableCell>
                  <TableCell>{item.posyandu}</TableCell>
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

      {/* Modal Tambah Data Orang Tua */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="bg-[#00BFA6] text-white px-6 py-4 rounded-t-lg flex justify-between items-center sticky top-0">
              <h2 className="text-xl font-semibold">Tambah Data Orang Tua</h2>
              <button
                onClick={handleCloseModal}
                className="hover:bg-[#00a693] p-1 rounded transition"
                aria-label="Tutup"
              >
                <X size={24} />
              </button>
            </div>

            {/* Form Content */}
            <div className="p-6">
              <div className="grid grid-cols-2 gap-6">
                {/* Kolom Kiri */}
                <div className="space-y-4">
                  {/* NIK Field */}
                  <div>
                    <label htmlFor="nik" className="block text-gray-700 font-medium mb-2">
                      NIK
                    </label>
                    <input
                      type="text"
                      id="nik"
                      name="nik"
                      value={formData.nik}
                      onChange={handleInputChange}
                      maxLength={16}
                      className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00BFA6] ${
                        errors.nik ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Masukkan NIK"
                    />
                    {errors.nik && (
                      <p className="text-red-500 text-sm mt-1">{errors.nik}</p>
                    )}
                  </div>

                  {/* Tanggal Lahir Field */}
                  <div>
                    <label htmlFor="tanggalLahir" className="block text-gray-700 font-medium mb-2">
                      Tanggal Lahir
                    </label>
                    <input
                      type="date"
                      id="tanggalLahir"
                      name="tanggalLahir"
                      value={formData.tanggalLahir}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00BFA6] ${
                        errors.tanggalLahir ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {errors.tanggalLahir && (
                      <p className="text-red-500 text-sm mt-1">{errors.tanggalLahir}</p>
                    )}
                  </div>

                  {/* Jumlah Anak Field */}
                  <div>
                    <label htmlFor="jumlahAnak" className="block text-gray-700 font-medium mb-2">
                      Jumlah Anak
                    </label>
                    <input
                      type="number"
                      id="jumlahAnak"
                      name="jumlahAnak"
                      value={formData.jumlahAnak}
                      onChange={handleInputChange}
                      min="0"
                      className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00BFA6] ${
                        errors.jumlahAnak ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Masukkan jumlah anak"
                    />
                    {errors.jumlahAnak && (
                      <p className="text-red-500 text-sm mt-1">{errors.jumlahAnak}</p>
                    )}
                  </div>

                  {/* Posyandu Field */}
                  <div>
                    <label htmlFor="posyandu" className="block text-gray-700 font-medium mb-2">
                      Posyandu
                    </label>
                    <input
                      type="text"
                      id="posyandu"
                      name="posyandu"
                      value={formData.posyandu}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00BFA6] ${
                        errors.posyandu ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Masukkan nama posyandu"
                    />
                    {errors.posyandu && (
                      <p className="text-red-500 text-sm mt-1">{errors.posyandu}</p>
                    )}
                  </div>
                </div>

                {/* Kolom Kanan */}
                <div className="space-y-4">
                  {/* Nama Lengkap Field */}
                  <div>
                    <label htmlFor="namaLengkap" className="block text-gray-700 font-medium mb-2">
                      Nama Lengkap
                    </label>
                    <input
                      type="text"
                      id="namaLengkap"
                      name="namaLengkap"
                      value={formData.namaLengkap}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00BFA6] ${
                        errors.namaLengkap ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Masukkan nama lengkap"
                    />
                    {errors.namaLengkap && (
                      <p className="text-red-500 text-sm mt-1">{errors.namaLengkap}</p>
                    )}
                  </div>

                  {/* Kategori Field */}
                  <div>
                    <label htmlFor="kategori" className="block text-gray-700 font-medium mb-2">
                      Kategori
                    </label>
                    <select
                      id="kategori"
                      name="kategori"
                      value={formData.kategori}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00BFA6] ${
                        errors.kategori ? 'border-red-500' : 'border-gray-300'
                      }`}
                    >
                      <option value="">Pilih kategori</option>
                      <option value="Ibu Hamil">Ibu Hamil</option>
                      <option value="Orang Tua Balita">Orang Tua Balita</option>
                    </select>
                    {errors.kategori && (
                      <p className="text-red-500 text-sm mt-1">{errors.kategori}</p>
                    )}
                  </div>

                  {/* Lokasi Field */}
                  <div>
                    <label htmlFor="lokasi" className="block text-gray-700 font-medium mb-2">
                      Lokasi
                    </label>
                    <input
                      type="text"
                      id="lokasi"
                      name="lokasi"
                      value={formData.lokasi}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00BFA6] ${
                        errors.lokasi ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Masukkan lokasi"
                    />
                    {errors.lokasi && (
                      <p className="text-red-500 text-sm mt-1">{errors.lokasi}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Footer Buttons */}
            <div className="px-6 py-4 bg-gray-50 rounded-b-lg flex justify-end space-x-3 sticky bottom-0">
              <Button
                onClick={handleCloseModal}
                className="px-6 py-2 bg-[#00BFA6] hover:bg-[#00a693] text-white"
              >
                Batal
              </Button>
              <Button
                onClick={handleSimpan}
                className="px-6 py-2 bg-[#00BFA6] hover:bg-[#00a693] text-white border-2 border-white"
              >
                Simpan
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}