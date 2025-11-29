"use client";

import { useState } from "react";
import LandingHeader from "@/components/layout/landing-header";
import LandingFooter from "@/components/layout/landing-footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Eye, EyeOff, User, Lock, Users, AlertCircle } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSignIn, useClerk } from "@clerk/nextjs"; // 1. Tambahkan useClerk

export default function SignInPage() {
  const { isLoaded, signIn, setActive } = useSignIn();
  const { signOut } = useClerk(); // 2. Ambil fungsi signOut
  const router = useRouter();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState("");
  
  const [errorMsg, setErrorMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    if (!isLoaded) return;
    setIsLoading(true);
    setErrorMsg("");

    try {
      // 3. PERBAIKAN UTAMA: Logout dulu sebelum login baru
      // Ini mencegah error "You're already signed in"
      await signOut(); 

      const result = await signIn.create({
        identifier: email,
        password,
      });

      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });
        
        if (role === "admin") router.push("/admin/dashboard");
        else if (role === "kader") router.push("/kader/dashboard");
        else router.push("/user/dashboard");
      } else {
        console.log(result);
        setErrorMsg("Login belum selesai. Periksa metode verifikasi lanjutan.");
      }
    } catch (err: any) {
      console.error("Login error:", err);
      
      const code = err.errors?.[0]?.code;
      if (code === "form_password_incorrect") {
        setErrorMsg("Kata sandi salah. Silakan coba lagi.");
      } else if (code === "form_identifier_not_found") {
        setErrorMsg("Email tidak ditemukan. Silakan daftar terlebih dahulu.");
      } else if (code === "too_many_attempts") {
        setErrorMsg("Terlalu banyak percobaan. Silakan tunggu beberapa saat.");
      } else {
        // Fallback error message
        setErrorMsg(err.errors?.[0]?.message || "Terjadi kesalahan sistem.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <LandingHeader />
      
      <main className="flex-1 flex items-center justify-center pt-24 pb-12 bg-white">
        {/* ... (Sisa kode UI di bawah ini tetap SAMA persis, tidak perlu diubah) ... */}
        <div className="container px-4">
          
          <div className="text-sm text-gray-500 mb-6 max-w-md mx-auto">
            <Link href="/" className="hover:underline">Beranda</Link> / Masuk
          </div>

          <Card className="border border-gray-300 shadow-lg max-w-md mx-auto">
            <CardContent className="p-0">
              {/* Header Card */}
              <div className="bg-[#00BFA6] text-white text-center py-4 rounded-t-lg text-lg font-medium flex items-center justify-center gap-2">
                <User className="w-5 h-5" /> Masuk ke SIPOCEM
              </div>

              <div className="p-8 space-y-6">
                {/* Logo Tengah */}
                <div className="flex justify-center mb-6">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center text-[#00BFA6] font-bold text-xs">S</div>
                    <span className="text-xl font-bold text-yellow-400 tracking-wider">SIPOCEM</span>
                  </div>
                </div>

                {errorMsg && (
                  <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md text-sm flex items-center gap-2">
                    <AlertCircle className="w-4 h-4" />
                    {errorMsg}
                  </div>
                )}

                <div className="space-y-4">
                  
                  {/* Username */}
                  <div className="space-y-2">
                    <Label className="text-[#00BFA6] font-semibold flex items-center gap-2 text-base">
                      <User className="w-5 h-5" /> Email
                    </Label>
                    <Input 
                      placeholder="Masukkan email anda" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="border-gray-300 h-12 text-base focus-visible:ring-[#00BFA6]" 
                    />
                  </div>

                  {/* Password */}
                  <div className="space-y-2">
                    <Label className="text-[#00BFA6] font-semibold flex items-center gap-2 text-base">
                      <Lock className="w-5 h-5" /> Kata Sandi
                    </Label>
                    <div className="relative">
                      <Input 
                        type={showPassword ? "text" : "password"} 
                        placeholder="Masukkan kata sandi anda" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="border-gray-300 h-12 text-base pr-10 focus-visible:ring-[#00BFA6]" 
                      />
                      <button 
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-3.5 text-gray-500 hover:text-gray-700"
                      >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>

                  {/* Role Dropdown */}
                  <div className="space-y-2">
                    <Label className="text-[#00BFA6] font-semibold flex items-center gap-2 text-base">
                      <Users className="w-5 h-5" /> Role
                    </Label>
                    <Select onValueChange={setRole}>
                      <SelectTrigger className="h-12 border-gray-300 text-base focus:ring-[#00BFA6]">
                        <SelectValue placeholder="Pilih Role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="user">User</SelectItem>
                        <SelectItem value="kader">Kader</SelectItem>
                        <SelectItem value="admin">Admin</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Remember & Forgot Password */}
                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="remember" className="border-[#00BFA6] data-[state=checked]:bg-[#00BFA6]" />
                      <label htmlFor="remember" className="text-sm font-medium leading-none text-[#00BFA6] cursor-pointer">
                        Ingat saya
                      </label>
                    </div>
                    {/* BAGIAN YANG DIPERBAIKI ADA DI SINI */}
                    <Link href="/forgot-password" className="text-sm text-[#00BFA6] hover:underline">
                      Lupa Password?
                    </Link>
                  </div>

                  {/* Submit Button */}
                  <Button 
                    className="w-full bg-[#00BFA6] hover:bg-[#00a892] h-12 text-lg font-medium mt-4"
                    onClick={handleLogin}
                    disabled={isLoading}
                  >
                    {isLoading ? "Memproses..." : "Masuk"}
                  </Button>

                  <div className="text-center text-sm pt-2">
                    <span className="text-[#00BFA6]">Belum punya akun? </span>
                    <Link href="/sign-up" className="text-[#00BFA6] font-semibold hover:underline">
                      Daftar sekarang
                    </Link>
                  </div>

                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <LandingFooter />
    </div>
  );
}