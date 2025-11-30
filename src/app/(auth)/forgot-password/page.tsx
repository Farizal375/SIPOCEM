"use client";

import { useState } from "react";
import LandingHeader from "@/components/layout/landing-header";
import LandingFooter from "@/components/layout/landing-footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Eye, EyeOff, Lock, UserCircle, AlertCircle } from "lucide-react";
import Link from "next/link";
import { useSignUp } from "@clerk/nextjs";

export default function ForgotPasswordPage() {
  const [showPass1, setShowPass1] = useState(false);
  const [showPass2, setShowPass2] = useState(false);
  const [step, setStep] = useState(1); // 1: email input, 2: reset password
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { signUp } = useSignUp();

  const handleResetPassword = async () => {
    if (!email) {
      setError("Email wajib diisi.");
      return;
    }

    if (!signUp) {
      setError("Tidak dapat mengakses fungsi reset password.");
      return;
    }

    setIsLoading(true);
    setError("");
    try {
      await signUp.create({
        emailAddress: email,
      });

      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
      setStep(2);
      setSuccess("Kode verifikasi telah dikirim ke email Anda.");
    } catch (err: unknown) {
      console.error("Forgot password error:", err);
      let errorMessage = "Gagal mengirim kode verifikasi. Silakan coba lagi.";
      if (typeof err === "object" && err !== null && "errors" in err) {
        const clerkError = err as { errors: { code: string, message: string }[] };
        if (clerkError.errors?.[0]?.code === "form_identifier_not_found") {
          errorMessage = "Email tidak ditemukan.";
        } else {
          errorMessage = clerkError.errors?.[0]?.message || errorMessage;
        }
      }
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyCode = async () => {
    if (!code) {
      setError("Kode verifikasi wajib diisi.");
      return;
    }
    if (newPassword !== confirmNewPassword) {
      setError("Konfirmasi password tidak cocok.");
      return;
    }
    if (newPassword.length < 8) {
      setError("Password minimal 8 karakter.");
      return;
    }

    if (!signUp) {
      setError("Tidak dapat mengakses fungsi reset password.");
      return;
    }

    setIsLoading(true);
    setError("");
    try {
      await signUp.attemptEmailAddressVerification({
        code: code,
      });

      await signUp.update({
        password: newPassword,
      });

      setSuccess("Password berhasil diubah. Silakan login kembali.");
      setStep(3); // Show success
    } catch (err: unknown) {
      console.error("Verify code error:", err);
      let errorMessage = "Kode verifikasi salah atau telah kadaluarsa.";
      if (typeof err === "object" && err !== null && "errors" in err) {
        const clerkError = err as { errors: { code: string, message: string }[] };
        errorMessage = clerkError.errors?.[0]?.message || errorMessage;
      }
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <LandingHeader />

      <main className="flex-1 flex items-center justify-center pt-24 pb-12 bg-white">
        <div className="container px-4">

          <div className="text-sm text-gray-500 mb-6 max-w-md mx-auto">
            <Link href="/" className="hover:underline">Beranda</Link> / Lupa Password
          </div>

          <Card className="border border-gray-300 shadow-lg max-w-md mx-auto">
            <CardContent className="p-0">
              {/* Header Card */}
              <div className="bg-[#00BFA6] text-white text-center py-4 rounded-t-lg text-lg font-medium flex items-center justify-center gap-2">
                <UserCircle className="w-6 h-6" />
                Lupa Password
              </div>

              <div className="p-8 space-y-6">
                {/* Logo Tengah */}
                <div className="flex justify-center mb-6">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center text-[#00BFA6] font-bold text-xs">S</div>
                    <span className="text-xl font-bold text-yellow-400 tracking-wider">SIPOCEM</span>
                  </div>
                </div>

                {/* Form Inputs */}
                <div className="space-y-6">
                  {error && (
                    <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md text-sm flex items-center gap-2">
                      <AlertCircle className="w-4 h-4" />
                      {error}
                    </div>
                  )}
                  {success && (
                    <div className="bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded-md text-sm">
                      {success}
                    </div>
                  )}

                  {step === 1 && (
                    <>
                      {/* Email Input */}
                      <div className="space-y-2">
                        <Label className="text-[#00BFA6] font-semibold flex items-center gap-2 text-base">
                          Email
                        </Label>
                        <Input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Masukkan email Anda"
                          className="border-gray-300 h-12 text-base focus-visible:ring-[#00BFA6]"
                        />
                      </div>

                      {/* Submit Button */}
                      <Button
                        className="w-full bg-[#00BFA6] hover:bg-[#00a892] h-12 text-lg font-medium mt-2"
                        onClick={handleResetPassword}
                        disabled={isLoading}
                      >
                        {isLoading ? "Memproses..." : "Kirim Kode Verifikasi"}
                      </Button>
                    </>
                  )}

                  {step === 2 && (
                    <>
                      {/* Verification Code */}
                      <div className="space-y-2">
                        <Label className="text-[#00BFA6] font-semibold flex items-center gap-2 text-base">
                          Kode Verifikasi
                        </Label>
                        <Input
                          value={code}
                          onChange={(e) => setCode(e.target.value)}
                          placeholder="Masukkan kode verifikasi"
                          className="border-gray-300 h-12 text-base focus-visible:ring-[#00BFA6]"
                        />
                      </div>

                      {/* New Password */}
                      <div className="space-y-2">
                        <Label className="text-[#00BFA6] font-semibold flex items-center gap-2 text-base">
                          <Lock className="w-5 h-5" /> Kata Sandi Baru
                        </Label>
                        <div className="relative">
                          <Input
                            type={showPass1 ? "text" : "password"}
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            placeholder="Masukkan kata sandi baru"
                            className="border-gray-300 h-12 text-base pr-10 focus-visible:ring-[#00BFA6]"
                          />
                          <button
                            onClick={() => setShowPass1(!showPass1)}
                            className="absolute right-3 top-3.5 text-gray-500 hover:text-gray-700"
                          >
                            {showPass1 ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                          </button>
                        </div>
                      </div>

                      {/* Confirm New Password */}
                      <div className="space-y-2">
                        <Label className="text-[#00BFA6] font-semibold flex items-center gap-2 text-base">
                          <Lock className="w-5 h-5" /> Konfirmasi Kata Sandi
                        </Label>
                        <div className="relative">
                          <Input
                            type={showPass2 ? "text" : "password"}
                            value={confirmNewPassword}
                            onChange={(e) => setConfirmNewPassword(e.target.value)}
                            placeholder="Konfirmasi kata sandi baru"
                            className="border-gray-300 h-12 text-base pr-10 focus-visible:ring-[#00BFA6]"
                          />
                          <button
                            onClick={() => setShowPass2(!showPass2)}
                            className="absolute right-3 top-3.5 text-gray-500 hover:text-gray-700"
                          >
                            {showPass2 ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                          </button>
                        </div>
                      </div>

                      {/* Submit Button */}
                      <Button
                        className="w-full bg-[#00BFA6] hover:bg-[#00a892] h-12 text-lg font-medium mt-2"
                        onClick={handleVerifyCode}
                        disabled={isLoading}
                      >
                        {isLoading ? "Memproses..." : "Ubah Password"}
                      </Button>
                    </>
                  )}

                  {step === 3 && (
                    <div className="text-center">
                      <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <h3 className="text-lg font-medium text-gray-900 mb-2">Password berhasil diubah!</h3>
                      <p className="text-gray-600 mb-6">Silakan login dengan password baru Anda.</p>
                      <Link href="/sign-in">
                        <Button className="w-full bg-[#00BFA6] hover:bg-[#00a892] h-12 text-lg font-medium">
                          Ke Halaman Login
                        </Button>
                      </Link>
                    </div>
                  )}

                  <div className="flex items-center justify-center pt-2">
                    <Link href="/sign-in" className="text-sm text-[#00BFA6] hover:underline">
                      Kembali ke Halaman Login
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