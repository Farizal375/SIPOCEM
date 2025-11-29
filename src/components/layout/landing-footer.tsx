import Link from "next/link";
import { Facebook, Instagram, Twitter, Youtube, MapPin, Phone, Mail } from "lucide-react";

export default function LandingFooter() {
  return (
    <footer className="bg-[#00BFA6] text-white pt-16 pb-6">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          
          {/* COLUMN 1: BRAND */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center text-[#00BFA6] font-bold">
                S
              </div>
              <span className="text-2xl font-bold text-yellow-300">SIPOCEM</span>
            </div>
            <h2 className="text-3xl font-bold mb-4">SIPOCEM</h2>
            <p className="text-teal-50 text-sm leading-relaxed max-w-xs">
              Mendukung Tumbuh Kembang Anak Bersama Posyandu Cempaka
            </p>
          </div>

          {/* COLUMN 2: TAUTAN CEPAT */}
          <div>
            <h3 className="font-semibold text-lg mb-6">Tautan Cepat</h3>
            <ul className="space-y-4 text-teal-50">
              <li><Link href="#" className="hover:text-yellow-200 transition-colors">Tentang Kami</Link></li>
              <li><Link href="#" className="hover:text-yellow-200 transition-colors">Tim Kami</Link></li>
              <li><Link href="#" className="hover:text-yellow-200 transition-colors">Kontak</Link></li>
            </ul>
          </div>

          {/* COLUMN 3: KONTAK KAMI */}
          <div>
            <h3 className="font-semibold text-lg mb-6">Kontak Kami</h3>
            <ul className="space-y-4 text-teal-50">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 shrink-0 mt-0.5" />
                <span>Mugarsari, Tasikmalaya</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 shrink-0" />
                <span>+62 123 4567 890</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 shrink-0" />
                <span>infosipocem@google.com</span>
              </li>
            </ul>
          </div>

          {/* COLUMN 4: MEDIA SOSIAL */}
          <div>
            <h3 className="font-semibold text-lg mb-6">Media Sosial</h3>
            <div className="flex gap-4">
              <Link href="#" className="w-10 h-10 border border-white rounded-full flex items-center justify-center hover:bg-white hover:text-[#00BFA6] transition-all">
                <Facebook className="w-5 h-5" />
              </Link>
              <Link href="#" className="w-10 h-10 border border-white rounded-full flex items-center justify-center hover:bg-white hover:text-[#00BFA6] transition-all">
                <Instagram className="w-5 h-5" />
              </Link>
              <Link href="#" className="w-10 h-10 border border-white rounded-full flex items-center justify-center hover:bg-white hover:text-[#00BFA6] transition-all">
                <Twitter className="w-5 h-5" />
              </Link>
              <Link href="#" className="w-10 h-10 border border-white rounded-full flex items-center justify-center hover:bg-white hover:text-[#00BFA6] transition-all">
                <Youtube className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div className="border-t border-teal-400/50 pt-6 flex flex-col md:flex-row justify-between items-center text-sm text-teal-100 gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold border border-white rounded-full w-5 h-5 flex items-center justify-center text-xs">C</span>
            <p>2025 Posyandu Cempaka. Hak Cipta Dilindungi</p>
          </div>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-white">Kebijakan Privasi</Link>
            <Link href="#" className="hover:text-white">Syarat & Ketentuan</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}