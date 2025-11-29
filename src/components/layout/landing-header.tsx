import Link from "next/link";
import { Home, Info, Phone, UserPlus, LogIn } from "lucide-react";
// PERBAIKAN: Menghapus import { Button } yang tidak terpakai

export default function LandingHeader() {
  return (
    <header className="fixed top-0 w-full z-50 bg-[#00BFA6] text-white shadow-sm">
      <div className="container mx-auto px-6 h-20 flex items-center justify-between">
        {/* LOGO */}
        <div className="flex items-center gap-2">
          {/* Ganti dengan Image logo asli Anda */}
          <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center text-[#00BFA6] font-bold">
            S
          </div>
          <span className="text-2xl font-bold tracking-wide text-yellow-300">SIPOCEM</span>
        </div>

        {/* NAVIGATION LINKS */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          <Link href="/" className="flex items-center gap-2 hover:text-yellow-200 transition-colors border-b-2 border-white pb-1">
            <Home className="w-4 h-4" />
            Beranda
          </Link>
          <Link href="/informasi" className="flex items-center gap-2 hover:text-yellow-200 transition-colors opacity-90 hover:opacity-100">
            <Info className="w-4 h-4" />
            Informasi
          </Link>
          <Link href="/kontak" className="flex items-center gap-2 hover:text-yellow-200 transition-colors opacity-90 hover:opacity-100">
            <Phone className="w-4 h-4" />
            Kontak
          </Link>
        </nav>

        {/* AUTH BUTTONS */}
        <div className="hidden md:flex items-center gap-4">
          <Link href="/sign-up" className="flex items-center gap-2 hover:text-yellow-200 transition-colors font-medium opacity-90 hover:opacity-100">
            <UserPlus className="w-4 h-4" />
            Daftar
          </Link>
          <Link href="/sign-in" className="flex items-center gap-2 hover:text-yellow-200 transition-colors font-medium opacity-90 hover:opacity-100">
            <LogIn className="w-4 h-4" />
            Masuk
          </Link>
        </div>
      </div>
    </header>
  );
}