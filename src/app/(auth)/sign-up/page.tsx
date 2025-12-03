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

interface FormData {
  nama: string;
  email: string;
  password: string;
  telepon: string;
  alamat: string;
  nik: string;
  role: string;
}

interface StepProps {
  onNext?: () => void;
  onBack?: () => void;
  onSubmit?: () => void;
  data?: FormData;
  onChange?: (key: keyof FormData, value: string) => void;
  error?: string;
  isLoading?: boolean;
  onVerify?: (code: string) => void;
}

const Step1 = ({ onNext, data, onChange, error }: StepProps) => {
  const [showPass, setShowPass] = useState(false);
  if (!data || !onChange) return null;

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

const Step2 = ({ onNext, onBack, data, onChange }: StepProps) => {
  if (!onChange) return null;
  return (
    <div className="space-y-4">
        <div className="border-b pb-2 mb-4"><h3 className="text-lg font-bold">PILIH PERAN</h3></div>
        <div className="space-y-2">
          <Label className="text-[#00BFA6] font-semibold">Peran Akun</Label>
          <div className="grid grid-cols-3 gap-4">
            <button
              onClick={() => onChange('role', 'user')}
              className={`border rounded-lg p-4 text-center ${data?.role === 'user' ? 'border-[#00BFA6] bg-[#00BFA6] text-white' : 'border-gray-300'}`}
            >
              <div className="text-lg mb-1">👤</div>
              <div>User</div>
            </button>
            <button
              onClick={() => onChange('role', 'kader')}
              className={`border rounded-lg p-4 text-center ${data?.role === 'kader' ? 'border-[#00BFA6] bg-[#00BFA6] text-white' : 'border-gray-300'}`}
            >
              <div className="text-lg mb-1">⚕</div>
              <div>Kader</div>
            </button>
            <button
              onClick={() => onChange('role', 'admin')}
              className={`border rounded-lg p-4 text-center ${data?.role === 'admin' ? 'border-[#00BFA6] bg-[#00BFA6] text-white' : 'border-gray-300'}`}
            >
              <div className="text-lg mb-1">👑</div>
              <div>Admin</div>
            </button>
          </div>
        </div>
        <div className="pt-4 flex justify-between">
        <Button variant="outline" onClick={onBack} className="border-[#00BFA6] text-[#00BFA6]">Kembali</Button>
        <Button onClick={onNext} className="bg-[#00BFA6]">Lanjut</Button>
        </div>
    </div>
  );
};

const Step3 = ({ onNext, onBack, data, onChange }: StepProps) => {
  if (!onChange || !data) return null;
  if (data.role === 'user') {
    return (
      <div className="space-y-4">
          <div className="border-b pb-2 mb-4"><h3 className="text-lg font-bold">IDENTITAS</h3></div>
          <div className="space-y-2">
            <Label>NIK</Label>
            <Input
              value={data.nik}
              onChange={(e) => onChange('nik', e.target.value)}
              className="border-gray-300"
              placeholder="Nomor Induk Kependudukan"
            />
          </div>
          <div className="pt-4 flex justify-between">
          <Button variant="outline" onClick={onBack} className="border-[#00BFA6] text-[#00BFA6]">Kembali</Button>
          <Button onClick={onNext} className="bg-[#00BFA6]">Lanjut</Button>
          </div>
      </div>
    );
  } else {
    return (
      <div className="space-y-4">
          <div className="border-b pb-2 mb-4"><h3 className="text-lg font-bold">KONFIRMASI</h3></div>
          <p className="text-gray-600">Data yang akan Anda daftarkan:</p>
          <div className="bg-gray-100 p-4 rounded">
              <p>Peran: <span className="font-semibold">{data.role === 'admin' ? 'Admin' : 'Kader'}</span></p>
              <p>Nama: <span className="font-semibold">{data.nama}</span></p>
              <p>Email: <span className="font-semibold">{data.email}</span></p>
          </div>
          <div className="pt-4 flex justify-between">
          <Button variant="outline" onClick={onBack} className="border-[#00BFA6] text-[#00BFA6]">Kembali</Button>
          <Button onClick={onNext} className="bg-[#00BFA6]">Lanjut</Button>
          </div>
      </div>
    );
  }
};

const Step4 = ({ onSubmit, onBack, isLoading, error }: StepProps) => (
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

const StepOTP = ({ onVerify, onBack, isLoading, error }: StepProps) => {
  const [code, setCode] = useState("");
  return (
    <div className="space-y-4">
      <div className="border-b pb-2 mb-4">
        <h3 className="text-lg font-bold">VERIFIKASI EMAIL</h3>
      </div>

      <p className="text-gray-600">
        Kode OTP telah dikirim ke email Anda. Masukkan kode untuk melanjutkan.
      </p>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-3 py-2 rounded text-sm flex items-center gap-2">
          <AlertCircle className="w-4 h-4" /> {error}
        </div>
      )}

      <Input
        placeholder="Masukkan kode OTP"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        className="border-[#00BFA6]"
      />

      <div className="pt-4 flex justify-between">
        <Button variant="outline" onClick={onBack} className="border-[#00BFA6] text-[#00BFA6]">
          Kembali
        </Button>
        <Button onClick={() => onVerify?.(code)} disabled={isLoading} className="bg-[#00BFA6]">
          {isLoading ? "Memproses..." : "Verifikasi"}
        </Button>
      </div>
    </div>
  );
};

const SuccessPage = () => (
  <div className="text-center space-y-6 py-10">
    <h2 className="text-xl font-bold">Pendaftaran Berhasil!</h2>
    <div className="mx-auto w-16 h-16 bg-[#00BFA6] rounded-full flex items-center justify-center text-white text-3xl font-bold">✓</div>
    <p className="text-gray-600">Silakan cek email Anda untuk verifikasi atau tunggu validasi kader.</p>
    <Link href="/sign-in"><Button className="bg-[#00BFA6]">Ke Halaman Login</Button></Link>
  </div>
);

export default function SignUpPage() {
  const { isLoaded, signUp } = useSignUp();
  const { signOut } = useClerk();

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    nama: "", email: "", password: "", telepon: "", alamat: "", nik: "", role: "user"
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // helper
  const updateForm = (key: keyof FormData, value: string) => {
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
    if (step === 2) {
      if (formData.role === 'admin') {
        setStep(4);
        return;
      }
    }
    if (step === 3 && formData.role !== 'user') {
      setStep(4);
      return;
    }
    setError("");
    setStep(step + 1);
  };

  const handleRegister = async () => {
    if (!isLoaded || !signUp) {
      setError("Clerk belum siap. Coba sebentar lagi.");
      return;
    }
    setIsLoading(true);
    setError("");

    try {
      // DO NOT signOut() here — must keep signUp instance
      await signUp.create({
        emailAddress: formData.email,
        password: formData.password,
        firstName: formData.nama,
        publicMetadata: {
            role: formData.role,
            telepon: formData.telepon,
            alamat: formData.alamat,
            nik: formData.role === "user" ? formData.nik : null
        }
      });

      // DEBUG: lihat objek signUp di console
      console.debug("signUp after create:", signUp);

      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      setStep(5); // show OTP input
    } catch (err: any) {
      console.error("Signup error:", err);
      let errorMessage = "Gagal mendaftar. Coba lagi.";
      if (err?.errors?.[0]?.code === "form_identifier_exists") {
        errorMessage = "Email sudah terdaftar. Silakan login.";
      } else if (err?.errors?.[0]?.message) {
        errorMessage = err.errors[0].message;
      }
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerify = async (rawCode: string) => {
    if (!isLoaded || !signUp) {
      setError("Clerk belum siap untuk verifikasi.");
      return;
    }
    setIsLoading(true);
    setError("");

    const code = String(rawCode || "").trim(); // trim — penting

    try {
      console.debug("Attempting verification with code:", code);
      const attempt = await signUp.attemptEmailAddressVerification({ code });

      console.debug("verification attempt:", attempt);

      // some Clerk SDKs return status string; handle both shapes
      const status = (attempt as any)?.status || (attempt as any)?.verification?.status;
      if (status === "complete" || (attempt as any)?.verifications?.emailAddress?.status === "verified") {
        setStep(6);
      } else {
        // provide Clerk raw message when possible
        const clerkMsg = (attempt as any)?.errors?.[0]?.message || (attempt as any)?.message;
        setError(clerkMsg || "Kode OTP salah atau kadaluarsa.");
      }
    } catch (err: any) {
      console.error("Verify error:", err);
      const clerkErr = err?.errors?.[0]?.message || err?.message || JSON.stringify(err);
      setError(clerkErr || "Verifikasi gagal. Pastikan kode benar.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <LandingHeader />
      <main className="flex-1 flex items-center justify-center pt-24 pb-10 bg-white">
        <div className="container px-4 max-w-2xl mx-auto">
            {step < 5 && (
                <div className="text-sm text-gray-500 mb-6">
                <Link href="/" className="hover:underline">Beranda</Link> / Daftar
                </div>
            )}
            <Card className="border border-gray-300 shadow-lg">
                <CardContent className="p-8">
                    {step === 1 && <Step1 onNext={handleNext} data={formData} onChange={updateForm} error={error} />}
                    {step === 2 && <Step2 onNext={handleNext} onBack={() => setStep(step-1)} data={formData} onChange={updateForm} />}
                    {step === 3 && <Step3 onNext={handleNext} onBack={() => setStep(step-1)} data={formData} onChange={updateForm} />}
                    {step === 4 && <Step4 onSubmit={handleRegister} onBack={() => setStep(step-1)} isLoading={isLoading} error={error} />}
                    {step === 5 && (
                      <StepOTP 
                        onVerify={handleVerify}
                        onBack={() => setStep(4)}
                        isLoading={isLoading}
                        error={error}
                      />
                    )}
                    {step === 6 && <SuccessPage />}
                </CardContent>
            </Card>
        </div>
      </main>
      <LandingFooter />
    </div>
  );
}