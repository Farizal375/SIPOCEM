"use client";

import { useState } from "react";
import LandingHeader from "@/components/layout/landing-header";
import LandingFooter from "@/components/layout/landing-footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Eye, User, Mail, Lock, Phone, MapPin } from "lucide-react";
import Link from "next/link";

// LANGKAH 1: IDENTITAS DASAR
const Step1 = ({ onNext }: { onNext: () => void }) => (
  <div className="space-y-4">
    <div className="space-y-2">
      <Label htmlFor="nama" className="text-[#00BFA6] font-semibold flex items-center gap-2">
        <User className="w-4 h-4" /> Nama Lengkap
      </Label>
      <Input id="nama" placeholder="Masukkan nama lengkap" className="border-[#00BFA6] focus-visible:ring-[#00BFA6]" />
    </div>
    <div className="space-y-2">
      <Label htmlFor="email" className="text-[#00BFA6] font-semibold flex items-center gap-2">
        <Mail className="w-4 h-4" /> Email
      </Label>
      <Input id="email" type="email" placeholder="Masukkan email" className="border-[#00BFA6] focus-visible:ring-[#00BFA6]" />
    </div>
    <div className="space-y-2 relative">
      <Label htmlFor="password" className="text-[#00BFA6] font-semibold flex items-center gap-2">
        <Lock className="w-4 h-4" /> Kata Sandi
      </Label>
      <div className="relative">
        <Input id="password" type="password" placeholder="Masukkan kata sandi" className="border-[#00BFA6] focus-visible:ring-[#00BFA6] pr-10" />
        <Eye className="absolute right-3 top-3 w-4 h-4 text-gray-400 cursor-pointer" />
      </div>
      <p className="text-xs text-gray-500">Password harus memiliki minimal 8 karakter</p>
    </div>
    <div className="space-y-2">
      <Label htmlFor="hp" className="text-[#00BFA6] font-semibold flex items-center gap-2">
        <Phone className="w-4 h-4" /> No. Telepon
      </Label>
      <Input id="hp" placeholder="Masukkan nomor telepon" className="border-[#00BFA6] focus-visible:ring-[#00BFA6]" />
    </div>
    <div className="space-y-2">
      <Label htmlFor="alamat" className="text-[#00BFA6] font-semibold flex items-center gap-2">
        <MapPin className="w-4 h-4" /> Alamat
      </Label>
      <Input id="alamat" placeholder="Masukkan alamat lengkap" className="border-[#00BFA6] focus-visible:ring-[#00BFA6]" />
    </div>
    <div className="pt-4 flex justify-between">
      <Link href="/">
        <Button variant="outline" className="border-[#00BFA6] text-[#00BFA6]">Kembali</Button>
      </Link>
      <Button onClick={onNext} className="bg-[#00BFA6] hover:bg-[#00a892]">Lanjut</Button>
    </div>
  </div>
);

// LANGKAH 2: IDENTITAS IBU
const Step2 = ({ onNext, onBack }: { onNext: () => void, onBack: () => void }) => (
  <div className="space-y-4">
    <div className="border-b pb-2 mb-4">
      <span className="text-gray-500 text-sm">Langkah 2 dari 6</span>
      <h3 className="text-lg font-bold text-black mt-1">IDENTITAS IBU</h3>
    </div>
    <div className="grid grid-cols-1 gap-4">
      <div className="space-y-1"><Label>NIK</Label><Input className="border-gray-300" /></div>
      <div className="space-y-1"><Label>No. JKN</Label><Input className="border-gray-300" /></div>
      <div className="space-y-1"><Label>Faskes</Label><Input className="border-gray-300" /></div>
      <div className="space-y-1"><Label>Pendidikan Terakhir</Label><Input className="border-gray-300" /></div>
      <div className="space-y-1"><Label>Pekerjaan</Label><Input className="border-gray-300" /></div>
      <div className="space-y-1"><Label>Gol. Darah</Label><Input className="border-gray-300" /></div>
      <div className="space-y-1"><Label>Tempat Lahir</Label><Input className="border-gray-300" /></div>
      <div className="space-y-1"><Label>Tanggal Lahir</Label><Input type="date" className="border-gray-300" /></div>
      <div className="space-y-1"><Label>Asuransi</Label><Input className="border-gray-300" /></div>
      <div className="space-y-1"><Label>Jumlah Anak</Label><Input type="number" className="border-gray-300" /></div>
    </div>
    <div className="pt-4 flex justify-between">
      <Button variant="outline" onClick={onBack} className="border-[#00BFA6] text-[#00BFA6]">Kembali</Button>
      <Button onClick={onNext} className="bg-[#00BFA6] hover:bg-[#00a892]">Lanjut</Button>
    </div>
  </div>
);

// LANGKAH 3: IDENTITAS SUAMI
const Step3 = ({ onNext, onBack }: { onNext: () => void, onBack: () => void }) => (
  <div className="space-y-4">
    <div className="border-b pb-2 mb-4">
      <span className="text-gray-500 text-sm">Langkah 3 dari 6</span>
      <h3 className="text-lg font-bold text-black mt-1">IDENTITAS SUAMI</h3>
    </div>
    <div className="grid grid-cols-1 gap-4">
      <div className="space-y-1"><Label>Nama Lengkap</Label><Input className="border-gray-300" /></div>
      <div className="space-y-1"><Label>NIK</Label><Input className="border-gray-300" /></div>
      <div className="space-y-1"><Label>Alamat</Label><Input className="border-gray-300" /></div>
      <div className="space-y-1"><Label>No. JKN</Label><Input className="border-gray-300" /></div>
      <div className="space-y-1"><Label>Faskes</Label><Input className="border-gray-300" /></div>
      <div className="space-y-1"><Label>Pendidikan Terakhir</Label><Input className="border-gray-300" /></div>
      <div className="space-y-1"><Label>Pekerjaan</Label><Input className="border-gray-300" /></div>
      <div className="space-y-1"><Label>Gol. Darah</Label><Input className="border-gray-300" /></div>
      <div className="space-y-1"><Label>Tempat Lahir</Label><Input className="border-gray-300" /></div>
      <div className="space-y-1"><Label>Tanggal Lahir</Label><Input type="date" className="border-gray-300" /></div>
      <div className="space-y-1"><Label>Asuransi</Label><Input className="border-gray-300" /></div>
      <div className="space-y-1"><Label>No. Telepon</Label><Input className="border-gray-300" /></div>
    </div>
    <div className="pt-4 flex justify-between">
      <Button variant="outline" onClick={onBack} className="border-[#00BFA6] text-[#00BFA6]">Kembali</Button>
      <Button onClick={onNext} className="bg-[#00BFA6] hover:bg-[#00a892]">Lanjut</Button>
    </div>
  </div>
);

// LANGKAH 4: IDENTITAS ANAK
const Step4 = ({ onNext, onBack }: { onNext: () => void, onBack: () => void }) => (
  <div className="space-y-4">
    <div className="border-b pb-2 mb-4">
      <span className="text-gray-500 text-sm">Langkah 4 dari 6</span>
      <h3 className="text-lg font-bold text-black mt-1">IDENTITAS ANAK</h3>
    </div>
    <div className="grid grid-cols-1 gap-4">
      <div className="space-y-1"><Label>Nama Lengkap</Label><Input className="border-gray-300" /></div>
      <div className="space-y-1"><Label>NIK</Label><Input className="border-gray-300" /></div>
      <div className="space-y-1"><Label>Anak Ke</Label><Input className="border-gray-300" /></div>
      <div className="space-y-1"><Label>JKN</Label><Input className="border-gray-300" /></div>
      <div className="space-y-1"><Label>Tempat Lahir</Label><Input className="border-gray-300" /></div>
      <div className="space-y-1"><Label>Tanggal Lahir</Label><Input type="date" className="border-gray-300" /></div>
      <div className="space-y-1"><Label>Nama Ibu</Label><Input className="border-gray-300" /></div>
      <div className="space-y-1"><Label>Nama Ayah</Label><Input className="border-gray-300" /></div>
    </div>
    <div className="pt-4 flex justify-between">
      <Button variant="outline" onClick={onBack} className="border-[#00BFA6] text-[#00BFA6]">Kembali</Button>
      <Button onClick={onNext} className="bg-[#00BFA6] hover:bg-[#00a892]">Lanjut</Button>
    </div>
  </div>
);

// LANGKAH 6: RIWAYAT KESEHATAN IBU (Langsung lompat ke 6 sesuai gambar, bisa disesuaikan)
const Step6 = ({ onNext, onBack }: { onNext: () => void, onBack: () => void }) => (
  <div className="space-y-4">
    <div className="border-b pb-2 mb-4">
      <span className="text-gray-500 text-sm">Langkah 6 dari 6</span>
      <h3 className="text-lg font-bold text-black mt-1">RIWAYAT KESEHATAN IBU</h3>
    </div>
    <div className="grid grid-cols-1 gap-4">
      <div className="space-y-1"><Label>Usia</Label><Input className="border-gray-300" /></div>
      <div className="space-y-1"><Label>Kehamilan Ke</Label><Input className="border-gray-300" /></div>
      <div className="space-y-1"><Label>Riwayat Keguguran</Label><Input className="border-gray-300" /></div>
      <div className="space-y-1"><Label>Riwayat Penyakit</Label><Input className="border-gray-300" /></div>
    </div>
    
    <div className="flex items-center space-x-2 mt-4">
        {/* Checkbox manual style */}
        <input type="checkbox" id="terms" className="w-4 h-4 text-[#00BFA6] border-gray-300 rounded focus:ring-[#00BFA6]" />
        <label htmlFor="terms" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-[#00BFA6]">
            Saya menyetujui <span className="underline cursor-pointer">Syarat & Ketentuan</span>
        </label>
    </div>

    <div className="pt-4 flex justify-between">
      <Button variant="outline" onClick={onBack} className="border-[#00BFA6] text-[#00BFA6]">Kembali</Button>
      <Button onClick={onNext} className="bg-[#00BFA6] hover:bg-[#00a892] w-full ml-4">Daftar</Button>
    </div>
  </div>
);

// HALAMAN SUKSES (MENUNGGU VALIDASI)
const SuccessPage = () => (
  <div className="text-center space-y-6 py-10">
    <div className="flex flex-col items-center gap-4">
      <div className="flex items-center gap-2 mb-4">
        {/* Placeholder Logo */}
        <div className="w-8 h-8 bg-[#00BFA6] rounded-full flex items-center justify-center text-white font-bold">S</div>
        <span className="text-2xl font-bold text-yellow-400">SIPOCEM</span>
      </div>
      
      <h2 className="text-xl font-bold">Terimakasih<br/>Akun Anda Sudah Terdaftar</h2>
      
      {/* Icon Tanda Seru Besar */}
      <div className="my-6">
        <div className="mx-auto w-16 h-40 bg-[#00BFA6] rounded-full flex flex-col items-center justify-between p-4 shadow-lg animate-pulse" style={{clipPath: "polygon(0% 0%, 100% 0%, 80% 80%, 20% 80%)"}}>
           {/* Custom Exclamation Mark Shape */}
        </div>
        <div className="mx-auto w-6 h-6 bg-[#00BFA6] rounded-full mt-2"></div>
      </div>

      <h3 className="text-lg font-bold">Menunggu Validasi Kader</h3>
    </div>
  </div>
);

export default function SignUpPage() {
  const [step, setStep] = useState(1);

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <LandingHeader />
      
      <main className="flex-1 flex items-center justify-center pt-24 pb-10 bg-white">
        <div className="container px-4">
          <div className="max-w-2xl mx-auto">
            {/* Breadcrumb sederhana */}
            {step < 7 && (
                <div className="text-sm text-gray-500 mb-6">
                <Link href="/" className="hover:underline">Beranda</Link> / Daftar
                </div>
            )}

            {step < 7 ? (
                <>
                    <h1 className="text-3xl font-bold text-center text-[#1B5E20] mb-8">Daftar SIPOCEM</h1>
                    
                    <Card className="border border-gray-300 shadow-lg">
                    <CardContent className="p-8">
                        {/* Logo Tengah Form */}
                        <div className="flex justify-center mb-8">
                            <div className="flex items-center gap-2">
                                <div className="w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center text-[#00BFA6] font-bold text-xs">S</div>
                                <span className="text-xl font-bold text-yellow-400 tracking-wider">SIPOCEM</span>
                            </div>
                        </div>

                        {/* Render Step Content */}
                        {step === 1 && <Step1 onNext={nextStep} />}
                        {step === 2 && <Step2 onNext={nextStep} onBack={prevStep} />}
                        {step === 3 && <Step3 onNext={nextStep} onBack={prevStep} />}
                        {step === 4 && <Step4 onNext={nextStep} onBack={prevStep} />}
                        {step === 5 && <Step4 onNext={nextStep} onBack={prevStep} />} {/* Placeholder Step 5 (Identitas Anak lg?) */}
                        {step === 6 && <Step6 onNext={nextStep} onBack={prevStep} />}
                    </CardContent>
                    </Card>
                </>
            ) : (
                // Tampilan Sukses
                <Card className="border border-gray-300 shadow-lg max-w-md mx-auto">
                    <CardContent className="p-8">
                        <SuccessPage />
                    </CardContent>
                </Card>
            )}
          </div>
        </div>
      </main>

      <LandingFooter />
    </div>
  );
}