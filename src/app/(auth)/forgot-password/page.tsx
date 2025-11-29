"use client";

import { useState } from "react";
import LandingHeader from "@/components/layout/landing-header";
import LandingFooter from "@/components/layout/landing-footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Eye, EyeOff, Lock, UserCircle } from "lucide-react";
import Link from "next/link";

export default function ForgotPasswordPage() {
  const [showPass1, setShowPass1] = useState(false);
  const [showPass2, setShowPass2] = useState(false);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <LandingHeader />
      
      <main className="flex-1 flex items-center justify-center pt-24 pb-12 bg-white">
        <div className="container px-4">
          
          <div className="text-sm text-gray-500 mb-6 max-w-md mx-auto">
            <Link href="/" className="hover:underline">Beranda</Link> / Masuk
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
                  
                  {/* Ubah Sandi */}
                  <div className="space-y-2">
                    <Label className="text-[#00BFA6] font-semibold flex items-center gap-2 text-base">
                      <Lock className="w-5 h-5" /> Ubah Sandi
                    </Label>
                    <div className="relative">
                      <Input 
                        type={showPass1 ? "text" : "password"} 
                        placeholder="Masukkan kata sandi anda" 
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

                  {/* Kata Sandi (Konfirmasi) */}
                  <div className="space-y-2">
                    <Label className="text-[#00BFA6] font-semibold flex items-center gap-2 text-base">
                      <Lock className="w-5 h-5" /> Kata Sandi
                    </Label>
                    <div className="relative">
                      <Input 
                        type={showPass2 ? "text" : "password"} 
                        placeholder="Konfirmasi kata sandi" 
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

                  {/* Ingat Saya Checkbox (Sesuai Mockup) */}
                  <div className="flex items-center space-x-2 pt-2">
                    <Checkbox id="remember" className="border-[#00BFA6] data-[state=checked]:bg-[#00BFA6]" />
                    <label htmlFor="remember" className="text-sm font-medium leading-none text-[#00BFA6] cursor-pointer">
                      Ingat saya
                    </label>
                  </div>

                  {/* Submit Button */}
                  <Button className="w-full bg-[#00BFA6] hover:bg-[#00a892] h-12 text-lg font-medium mt-2">
                    Konfirmasi
                  </Button>

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