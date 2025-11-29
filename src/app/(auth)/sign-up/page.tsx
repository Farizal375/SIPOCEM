"use client";

import { useState, useEffect } from "react";
import LandingHeader from "@/components/layout/landing-header";
import LandingFooter from "@/components/layout/landing-footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Eye, EyeOff, User, Mail, Lock, Phone, MapPin, AlertCircle } from "lucide-react";
import Link from "next/link";
import { useSignUp, useClerk } from "@clerk/nextjs"; 
// PERBAIKAN: Menghapus import useRouter yang tidak dipakai

const Step1 = ({ onNext, data, onChange, error }: any) => {
  const [showPass, setShowPass] = useState(false);
  return (
    <div className="space-y-4">
      {error && <div className="bg-red-50 border border-red-200 text-red-600 px-3 py-2 rounded text-sm flex items-center gap-2"><AlertCircle className="w-4 h-4" /> {error}</div>}
      <div className="space-y-2">
        <Label htmlFor="nama" className="text-[#00BFA6] font-semibold flex items-center gap-2"><User className="w-4 h-4" /> Nama Lengkap</Label>
        <Input id="nama" value={data.nama} onChange={(e) => onChange('nama', e.target.value)} placeholder="Masukkan nama lengkap" className="border-[#00BFA6]" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="email" className="text-[#00BFA6] font-semibold flex items-center gap-2"><Mail className="w-4 h-4" /> Email</Label>
        <Input id="email" type="email" value={data.email} onChange={(e) => onChange('email', e.target.value)} placeholder="Masukkan email" className="border-[#00BFA6]" />
      </div>
      <div className="space-y-2 relative">
        <Label htmlFor="password" className="text-[#00BFA6] font-semibold flex items-center gap-2"><Lock className="w-4 h-4" /> Kata Sandi</Label>
        <div className="relative">
          <Input id="password" type={showPass ? "text" : "password"} value={data.password} onChange={(e) => onChange('password', e.target.value)} placeholder="Masukkan kata sandi" className="border-[#00BFA6] pr-10" />
          <button onClick={() => setShowPass(!showPass)} className="absolute right-3 top-3 text-gray-400">{showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}</button>
        </div>
        <p className="text-xs text-gray-500">Minimal 8 karakter</p>
      </div>
      <div className="space-y-2">
        <Label className="text-[#00BFA6] font-semibold flex items-center gap-2"><Phone className="w-4 h-4" /> No. Telepon</Label>
        <Input value={data.telepon} onChange={(e) => onChange('telepon', e.target.value)} placeholder="08..." className="border-[#00BFA6]" />
      </div>
      <div className="space-y-2">
        <Label className="text-[#00BFA6] font-semibold flex items-center gap-2"><MapPin className="w-4 h-4" /> Alamat</Label>
        <Input value={data.alamat} onChange={(e) => onChange('alamat', e.target.value)} placeholder="Alamat lengkap" className="border-[#00BFA6]" />
      </div>
      <div className="pt-4 flex justify-between">
        <Link href="/"><Button variant="outline" className="border-[#00BFA6] text-[#00BFA6]">Kembali</Button></Link>
        <Button onClick={onNext} className="bg-[#00BFA6] hover:bg-[#00a892]">Lanjut</Button>
      </div>
    </div>
  );
};

const Step2 = ({ onNext, onBack, onChange }: any) => (
  <div className="space-y-4">
    <div className="border-b pb-2 mb-4"><h3 className="text-lg font-bold">IDENTITAS IBU</h3></div>
    <div className="space-y-2"><Label>NIK</Label><Input onChange={(e) => onChange('nik', e.target.value)} className="border-gray-300" /></div>
    <div className="pt-4 flex justify-between">
      <Button variant="outline" onClick={onBack} className="border-[#00BFA6] text-[#00BFA6]">Kembali</Button>
      <Button onClick={onNext} className="bg-[#00BFA6]">Lanjut</Button>
    </div>
  </div>
);

const Step6 = ({ onSubmit, onBack, isLoading, error }: any) => (
  <div className="space-y-4">
    <div className="border-b pb-2 mb-4"><h3 className="text-lg font-bold">KONFIRMASI</h3></div>
    <p className="text-gray-600">Pastikan data yang Anda masukkan sudah benar.</p>
    {error && <div className="bg-red-50 border border-red-200 text-red-600 px-3 py-2 rounded text-sm flex items-center gap-2"><AlertCircle className="w-4 h-4" /> {error}</div>}
    <div className="flex items-center space-x-2 mt-4">
        <input type="checkbox" id="terms" className="w-4 h-4 text-[#00BFA6]" />
        <label htmlFor="terms" className="text-sm text-[#00BFA6]">Saya menyetujui Syarat & Ketentuan</label>
    </div>
    <div className="pt-4 flex justify-between">
      <Button variant="outline" onClick={onBack} className="border-[#00BFA6] text-[#00BFA6]">Kembali</Button>
      <Button onClick={onSubmit} disabled={isLoading} className="bg-[#00BFA6] w-full ml-4">
        {isLoading ? "Memproses..." : "Daftar"}
      </Button>
    </div>
  </div>
);

const SuccessPage = () => (
  <div className="text-center space-y-6 py-10">
    <h2 className="text-xl font-bold">Pendaftaran Berhasil!</h2>
    <div className="mx-auto w-16 h-16 bg-[#00BFA6] rounded-full flex items-center justify-center text-white text-3xl font-bold">✓</div>
    <p className="text-gray-600">Silakan cek email Anda untuk verifikasi atau tunggu validasi kader.</p>
    <Link href="/sign-in"><Button className="bg-[#00BFA6]">Ke Halaman Login</Button></Link>
  </div>
);

export default function SignUpPage() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const { signOut } = useClerk();
  // PERBAIKAN: Menghapus const router = useRouter() karena tidak dipakai
  
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    nama: "", email: "", password: "", telepon: "", alamat: "", nik: ""
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isLoaded) {
      signOut();
    }
  }, [isLoaded]);

  const updateForm = (key: string, value: string) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const handleNext = () => {
    if (step === 1) {
        if (!formData.nama || !formData.email || !formData.password) {
            setError("Mohon lengkapi data wajib.");
            return;
        }
        if (formData.password.length < 8) {
            setError("Password minimal 8 karakter.");
            return;
        }
    }
    setError("");
    setStep(step + 1);
  };

  const handleRegister = async () => {
    if (!isLoaded) return;
    setIsLoading(true);
    setError("");

    try {
      await signOut();

      await signUp.create({
        emailAddress: formData.email,
        password: formData.password,
        firstName: formData.nama,
        unsafeMetadata: { 
            role: 'user', 
            telepon: formData.telepon,
            alamat: formData.alamat 
        }
      });

      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
      setStep(7); 

    } catch (err: any) {
      console.error("Signup error:", err);
      if (err.errors?.[0]?.code === "form_identifier_exists") {
        setError("Email sudah terdaftar. Silakan login.");
      } else if (err.errors?.[0]?.code === "form_password_pwned") {
        setError("Password terlalu umum/mudah ditebak. Gunakan yang lebih kuat.");
      } else {
        if (err.errors?.[0]?.code === "session_exists") {
             await signOut();
             setError("Sesi lama terdeteksi. Silakan coba klik Daftar lagi.");
        } else {
             setError(err.errors?.[0]?.message || "Gagal mendaftar. Coba lagi.");
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <LandingHeader />
      <main className="flex-1 flex items-center justify-center pt-24 pb-10 bg-white">
        <div className="container px-4 max-w-2xl mx-auto">
            {step < 7 && (
                <div className="text-sm text-gray-500 mb-6">
                <Link href="/" className="hover:underline">Beranda</Link> / Daftar
                </div>
            )}
            <Card className="border border-gray-300 shadow-lg">
                <CardContent className="p-8">
                    {step === 1 && <Step1 onNext={handleNext} data={formData} onChange={updateForm} error={error} />}
                    {step >= 2 && step <= 5 && <Step2 onNext={handleNext} onBack={() => setStep(step-1)} onChange={updateForm} />} 
                    {step === 6 && <Step6 onSubmit={handleRegister} onBack={() => setStep(step-1)} isLoading={isLoading} error={error} />}
                    {step === 7 && <SuccessPage />}
                </CardContent>
            </Card>
        </div>
      </main>
      <LandingFooter />
    </div>
  );
}