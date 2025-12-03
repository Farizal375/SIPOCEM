"use client";

import { useState } from "react";
import { useSignUp } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { createClient } from "@supabase/supabase-js"; // Atau import client helper Anda
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Loader2, ChevronRight, ChevronLeft, CheckCircle, AlertCircle } from "lucide-react";

// --- 1. KONFIGURASI SUPABASE CLIENT (Inline) ---
// Disarankan tetap menggunakan helper Anda: import { createClient } from "@/lib/supabase/client";
// Jika belum ada, gunakan env vars langsung di sini sementara:
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// --- 2. SKEMA VALIDASI (Zod Schema) [cite: 46-49] ---
const registerSchema = z.object({
  // Step 1: Akun
  username: z.string().min(3, "Username minimal 3 karakter"),
  email: z.string().email("Format email tidak valid"),
  password: z.string().min(8, "Password minimal 8 karakter"),
  
  // Step 2: Identitas Ibu
  nama_lengkap: z.string().min(2, "Nama wajib diisi"),
  nik: z.string().length(16, "NIK harus 16 digit").regex(/^\d+$/, "NIK harus angka"),
  no_telepon: z.string().min(10, "Nomor tidak valid"),
  tgl_lahir: z.string().min(1, "Tanggal lahir wajib diisi"),
  alamat: z.string().min(5, "Alamat terlalu pendek"),
  
  // Step 3: Keluarga (Suami)
  nama_suami: z.string().min(2, "Nama suami wajib diisi"),
  nik_suami: z.string().optional(), // Opsional sesuai kebutuhan
});

type RegisterFormValues = z.infer<typeof registerSchema>;

// --- 3. KOMPONEN UTAMA ---
export default function RegisterPage() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [globalError, setGlobalError] = useState("");

  // Setup Form
  const {
    register,
    trigger,
    getValues,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    mode: "onChange",
  });

  // Logika Next Step
  const handleNext = async () => {
    let fieldsToValidate: (keyof RegisterFormValues)[] = [];
    
    if (step === 1) fieldsToValidate = ["username", "email", "password"];
    if (step === 2) fieldsToValidate = ["nama_lengkap", "nik", "no_telepon", "tgl_lahir", "alamat"];

    const isValidStep = await trigger(fieldsToValidate);
    if (!isValidStep) return;

    // Khusus Step 2: Cek NIK Ganda di Database [cite: 46]
    if (step === 2) {
      setIsLoading(true);
      const nik = getValues("nik");
      
      // Cek ke Supabase
      const { data, error } = await supabase
        .from("users_posyandu") // Pastikan nama tabel sesuai
        .select("id")
        .eq("nik", nik)
        .single();
      
      setIsLoading(false);

      if (data) {
        setGlobalError("NIK sudah terdaftar. Silakan login.");
        return;
      }
      setGlobalError(""); // Reset error jika lolos
    }

    setStep((prev) => prev + 1);
  };

  const handlePrev = () => {
    setGlobalError("");
    setStep((prev) => prev - 1);
  };

  // Logika Submit Final
  const onSubmit = async () => {
    if (!isLoaded) return;
    setIsLoading(true);
    setGlobalError("");

    const data = getValues();

    try {
      // A. Buat User di Clerk (Auth) [cite: 24]
      const clerkRes = await signUp.create({
        emailAddress: data.email,
        password: data.password,
        username: data.username,
      });

      // B. Jika Clerk sukses, simpan data detail ke Supabase
      if (clerkRes.status === "complete") {
        await setActive({ session: clerkRes.createdSessionId });

        // Insert ke tabel users_posyandu
        const { error: dbError } = await supabase.from("users_posyandu").insert({
          clerk_id: clerkRes.createdUserId, // Kunci relasi
          email: data.email,
          username: data.username,
          nama_lengkap: data.nama_lengkap,
          nik: data.nik,
          no_telepon: data.no_telepon,
          alamat: data.alamat,
          tgl_lahir: data.tgl_lahir,
          nama_suami: data.nama_suami,
          nik_suami: data.nik_suami || null,
          role: "user", // [cite: 40]
          status_validasi: "Menunggu Validasi", // [cite: 50]
        });

        if (dbError) {
          console.error("Supabase Error:", dbError);
          throw new Error("Gagal menyimpan data profil. Hubungi admin.");
        }

        // Redirect ke Dashboard
        router.push("/dashboard");
      } else {
        // Handle verifikasi email jika diperlukan
        await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
        router.push("/verify-email");
      }

    } catch (err: any) {
      console.error(err);
      if (err.errors?.[0]?.code === "form_identifier_exists") {
        setGlobalError("Email atau Username sudah digunakan.");
      } else {
        setGlobalError(err.message || "Terjadi kesalahan sistem.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  // --- 4. RENDER UI (Tailwind) ---
  return (
    <div className="min-h-screen flex items-center justify-center bg-teal-50/50 p-4 font-sans">
      <div className="w-full max-w-lg bg-white rounded-xl shadow-xl border border-teal-100 overflow-hidden">
        
        {/* Header */}
        <div className="bg-teal-600 p-6 text-center">
          <h1 className="text-2xl font-bold text-white mb-1">Daftar SIPOCEM</h1>
          <p className="text-teal-100 text-sm">Sistem Informasi Posyandu Cempaka</p>
        </div>

        {/* Progress Bar */}
        <div className="flex w-full h-1.5 bg-gray-100">
          <div className={`h-full bg-teal-500 transition-all duration-300 ${step === 1 ? 'w-1/3' : step === 2 ? 'w-2/3' : 'w-full'}`} />
        </div>

        <div className="p-8">
          {/* Global Error Alert */}
          {globalError && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3 text-red-700">
              <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
              <p className="text-sm">{globalError}</p>
            </div>
          )}

          <form onSubmit={(e) => e.preventDefault()} className="space-y-5">
            
            {/* --- STEP 1: AKUN --- */}
            {step === 1 && (
              <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                <h2 className="text-lg font-semibold text-gray-800 border-b pb-2">Informasi Akun</h2>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                  <input 
                    {...register("username")}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition"
                    placeholder="Contoh: ibu_ani"
                  />
                  {errors.username && <p className="text-red-500 text-xs mt-1">{errors.username.message}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input 
                    type="email"
                    {...register("email")}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition"
                    placeholder="email@contoh.com"
                  />
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                  <input 
                    type="password"
                    {...register("password")}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition"
                    placeholder="Minimal 8 karakter"
                  />
                  {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
                </div>
              </div>
            )}

            {/* --- STEP 2: DATA IBU --- */}
            {step === 2 && (
              <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                <h2 className="text-lg font-semibold text-gray-800 border-b pb-2">Identitas Ibu</h2>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nama Lengkap (Sesuai KTP)</label>
                  <input 
                    {...register("nama_lengkap")}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none"
                  />
                  {errors.nama_lengkap && <p className="text-red-500 text-xs mt-1">{errors.nama_lengkap.message}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">NIK (16 Digit)</label>
                  <input 
                    {...register("nik")}
                    maxLength={16}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none"
                    placeholder="Masukkan 16 digit NIK"
                  />
                  {errors.nik && <p className="text-red-500 text-xs mt-1">{errors.nik.message}</p>}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Tanggal Lahir</label>
                    <input 
                      type="date"
                      {...register("tgl_lahir")}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none"
                    />
                     {errors.tgl_lahir && <p className="text-red-500 text-xs mt-1">{errors.tgl_lahir.message}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">No. WhatsApp</label>
                    <input 
                      type="tel"
                      {...register("no_telepon")}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none"
                    />
                     {errors.no_telepon && <p className="text-red-500 text-xs mt-1">{errors.no_telepon.message}</p>}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Alamat Domisili</label>
                  <textarea 
                    {...register("alamat")}
                    rows={2}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none resize-none"
                  />
                  {errors.alamat && <p className="text-red-500 text-xs mt-1">{errors.alamat.message}</p>}
                </div>
              </div>
            )}

            {/* --- STEP 3: KELUARGA --- */}
            {step === 3 && (
              <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                <h2 className="text-lg font-semibold text-gray-800 border-b pb-2">Data Keluarga</h2>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nama Suami / Kepala Keluarga</label>
                  <input 
                    {...register("nama_suami")}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none"
                  />
                  {errors.nama_suami && <p className="text-red-500 text-xs mt-1">{errors.nama_suami.message}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">NIK Suami (Opsional)</label>
                  <input 
                    {...register("nik_suami")}
                    maxLength={16}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none"
                  />
                </div>

                <div className="bg-blue-50 p-4 rounded-lg flex gap-3 text-blue-700 text-sm">
                  <CheckCircle className="w-5 h-5 shrink-0" />
                  <p>Pastikan semua data sudah benar. Setelah menekan tombol daftar, data akan diverifikasi oleh Kader.</p>
                </div>
              </div>
            )}

            {/* --- NAVIGATION BUTTONS --- */}
            <div className="pt-4 flex justify-between items-center gap-4">
              {step > 1 ? (
                <button
                  type="button"
                  onClick={handlePrev}
                  disabled={isLoading}
                  className="px-6 py-2.5 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition flex items-center gap-2"
                >
                  <ChevronLeft className="w-4 h-4" /> Kembali
                </button>
              ) : (
                <div /> // Spacer
              )}

              {step < 3 ? (
                <button
                  type="button"
                  onClick={handleNext}
                  disabled={isLoading}
                  className="px-6 py-2.5 rounded-lg bg-teal-600 text-white font-medium hover:bg-teal-700 transition flex items-center gap-2 shadow-lg shadow-teal-200"
                >
                  {isLoading ? <Loader2 className="w-4 h-4 animate-spin"/> : <>Lanjut <ChevronRight className="w-4 h-4" /></>}
                </button>
              ) : (
                <button
                  type="button"
                  onClick={onSubmit}
                  disabled={isLoading}
                  className="px-8 py-2.5 rounded-lg bg-teal-600 text-white font-bold hover:bg-teal-700 transition flex items-center gap-2 shadow-lg shadow-teal-200"
                >
                  {isLoading ? <Loader2 className="w-4 h-4 animate-spin"/> : "Daftar Sekarang"}
                </button>
              )}
            </div>

            {/* Login Link */}
            <div className="text-center mt-6 pt-6 border-t border-dashed">
              <p className="text-gray-600 text-sm">
                Sudah punya akun?{" "}
                <a href="/sign-in" className="text-teal-600 font-bold hover:underline">
                  Masuk di sini
                </a>
              </p>
            </div>
            
          </form>
        </div>
      </div>
    </div>
  );
}