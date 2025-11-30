"use client";

import LandingHeader from "@/components/layout/landing-header";
import LandingFooter from "@/components/layout/landing-footer";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import HeroImage from "@/components/home/hero-image";

export default function LandingPage() {
  const { isLoaded, isSignedIn, user } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      // Redirect to role-based dashboard
      router.push("/role-check");
    }
  }, [isLoaded, isSignedIn, router]);

  if (isLoaded && isSignedIn) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#00BFA6] mx-auto mb-4"></div>
          <p className="text-gray-600">Mengarahkan...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* HEADER */}
      <LandingHeader />

      {/* HERO SECTION */}
      <main className="flex-1 flex items-center justify-center pt-20 pb-20">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">

            {/* Left Content */}
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl font-bold leading-tight text-[#00BFA6]">
                <span className="text-blue-400 block mb-2">Sistem Informasi</span>
                Posyandu Cempaka
              </h1>

              <p className="text-lg md:text-xl font-medium text-black">
                Kemudahan memantau kesehatan ibu dan anak dalam satu aplikasi.
              </p>

              <div className="flex gap-4 pt-4">
                <Link href="/sign-up">
                  <Button className="bg-[#17a2b8] hover:bg-[#138496] text-white px-8 py-6 text-lg rounded-md font-semibold">
                    Daftar
                  </Button>
                </Link>
                <Link href="/sign-in">
                  <Button variant="outline" className="border-[#17a2b8] text-[#17a2b8] hover:bg-[#17a2b8] hover:text-white px-8 py-6 text-lg rounded-md font-semibold bg-white">
                    Masuk
                  </Button>
                </Link>
              </div>
            </div>

            {/* Right Image (CLIENT COMPONENT) */}
            <div className="flex justify-center md:justify-end relative">
              <HeroImage /> {/* <--- Gunakan komponen di sini */}
            </div>

          </div>
        </div>
      </main>

      {/* FOOTER */}
      <LandingFooter />
    </div>
  );
}