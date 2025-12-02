"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, Edit, Eye, Trash2, LayoutGrid, X } from "lucide-react";

interface KaderFormData {
  nik: string;
  namaLengkap: string;
  jenisKelamin: string;
  noHp: string;
}

interface FormErrors {
  nik?: string;
  namaLengkap?: string;
  jenisKelamin?: string;
  noHp?: string;
}

export default function DataKaderPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState<KaderFormData>({
    nik: '',
    namaLengkap: '',
    jenisKelamin: '',
    noHp: ''
  });
  const [errors, setErrors] = useState<FormErrors>({});

  const kaders = [
    { no: 1, nama: "Siti Atikah", jk: "Perempuan", hp: "+6212345678901" },
    { no: 2, nama: "Susan Aisyah", jk: "Perempuan", hp: "+6212345678901" },
    { no: 3, nama: "Titin", jk: "Perempuan", hp: "+6212345678901" },
    { no: 4, nama: "Lina Setiawati", jk: "Perempuan", hp: "+6212345678901" },
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

    if (!formData.jenisKelamin) {
      newErrors.jenisKelamin = 'Jenis kelamin harus dipilih';
    }

    if (!formData.noHp.trim()) {
      newErrors.noHp = 'No. HP harus diisi';
    } else if (!/^[0-9+\-\s()]+$/.test(formData.noHp)) {
      newErrors.noHp = 'Format nomor HP tidak valid';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSimpan = () => {
    if (validateForm()) {
      console.log('Data yang disimpan:', formData);
      alert('Data kader berhasil disimpan!');
      handleCloseModal();
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setFormData({
      nik: '',
      namaLengkap: '',
      jenisKelamin: '',
      noHp: ''
    });
    setErrors({});
  };

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

      {/* Modal Tambah Data Kader */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in duration-200">
            {/* Header */}
            <div className="bg-[#00BFA6] text-white px-6 py-4 rounded-t-lg flex justify-between items-center sticky top-0">
              <h2 className="text-xl font-semibold">Tambah Data Kader</h2>
              <button
                onClick={handleCloseModal}
                className="hover:bg-[#00a693] p-1 rounded transition"
                aria-label="Tutup"
              >
                <X size={24} />
              </button>
            </div>

            {/* Form Content */}
            <div className="p-6 space-y-4">
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

              {/* Jenis Kelamin Field */}
              <div>
                <label htmlFor="jenisKelamin" className="block text-gray-700 font-medium mb-2">
                  Jenis Kelamin
                </label>
                <select
                  id="jenisKelamin"
                  name="jenisKelamin"
                  value={formData.jenisKelamin}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00BFA6] ${
                    errors.jenisKelamin ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">Pilih jenis kelamin</option>
                  <option value="Laki-laki">Laki-laki</option>
                  <option value="Perempuan">Perempuan</option>
                </select>
                {errors.jenisKelamin && (
                  <p className="text-red-500 text-sm mt-1">{errors.jenisKelamin}</p>
                )}
              </div>

              {/* No.Hp Field */}
              <div>
                <label htmlFor="noHp" className="block text-gray-700 font-medium mb-2">
                  No.Hp
                </label>
                <input
                  type="tel"
                  id="noHp"
                  name="noHp"
                  value={formData.noHp}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00BFA6] ${
                    errors.noHp ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Masukkan nomor HP"
                />
                {errors.noHp && (
                  <p className="text-red-500 text-sm mt-1">{errors.noHp}</p>
                )}
              </div>
            </div>

            {/* Footer Buttons */}
            <div className="px-6 py-4 bg-gray-50 rounded-b-lg flex justify-end space-x-3 sticky bottom-0">
              <Button
                onClick={handleCloseModal}
                variant="outline"
                className="px-6 py-2 border-[#00BFA6] text-[#00BFA6] hover:bg-[#00BFA6] hover:text-white"
              >
                Batal
              </Button>
              <Button
                onClick={handleSimpan}
                className="px-6 py-2 bg-[#00BFA6] hover:bg-[#00a693] text-white"
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