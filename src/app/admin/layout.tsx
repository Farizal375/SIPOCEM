import Link from "next/link";
import { adminMenu } from "@/config/admin-menu";
import { Bell, User, Menu, Facebook, Instagram, Twitter, Youtube, MapPin, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex bg-gray-50 font-sans">
      {/* SIDEBAR */}
      <aside className="w-64 bg-teal-500 text-white fixed h-full left-0 top-0 z-10 flex flex-col">
        <div className="h-16 flex items-center px-6 border-b border-teal-400">
          <div className="font-bold text-xl tracking-wide flex items-center gap-2">
            {/* Logo Placeholder */}
            <div className="w-6 h-6 bg-yellow-400 rounded-full opacity-80"></div>
            SIPOCEM
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto py-6 px-3 space-y-6">
          {adminMenu.map((group, idx) => (
            <div key={idx}>
              <h3 className="text-xs font-semibold text-teal-100 uppercase mb-2 px-3">
                {group.category}
              </h3>
              <div className="space-y-1">
                {group.items.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="flex items-center px-3 py-2.5 text-sm font-medium rounded-md hover:bg-teal-600 transition-colors"
                  >
                    <item.icon className="w-5 h-5 mr-3" />
                    {item.title}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </aside>

      {/* MAIN CONTENT WRAPPER */}
      <div className="flex-1 ml-64 flex flex-col min-h-screen">
        
        {/* TOP HEADER */}
        <header className="h-16 bg-teal-500 text-white flex items-center justify-between px-6 sticky top-0 z-20 shadow-sm">
          <Button variant="ghost" size="icon" className="text-white hover:bg-teal-600">
            <Menu className="w-6 h-6" />
          </Button>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="relative text-white hover:bg-teal-600">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
            </Button>
            <div className="flex items-center gap-2 text-sm font-medium">
              <User className="w-5 h-5" />
              <span>anggi_</span>
            </div>
          </div>
        </header>

        {/* PAGE CONTENT */}
        <main className="flex-1 p-6 bg-gray-50">
          {children}
        </main>

        {/* FOOTER (Sesuai Mockup Besar) */}
        <footer className="bg-teal-500 text-white pt-12 pb-6 px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            {/* Brand */}
            <div className="col-span-1">
              <div className="flex items-center gap-2 mb-4 font-bold text-xl">
                 <div className="w-6 h-6 bg-yellow-400 rounded-full"></div> SIPOCEM
              </div>
              <h2 className="text-2xl font-bold mb-4">SIPOCEM</h2>
              <p className="text-teal-100 text-sm leading-relaxed">
                Mendukung Tumbuh Kembang Anak Bersama Posyandu Cempaka
              </p>
            </div>

            {/* Tautan Cepat */}
            <div className="col-span-1">
              <h3 className="font-semibold text-lg mb-4">Tautan Cepat</h3>
              <ul className="space-y-2 text-sm text-teal-100">
                <li><Link href="#">Tentang Kami</Link></li>
                <li><Link href="#">Tim Kami</Link></li>
                <li><Link href="#">Kontak</Link></li>
              </ul>
            </div>

            {/* Kontak Kami */}
            <div className="col-span-1">
              <h3 className="font-semibold text-lg mb-4">Kontak Kami</h3>
              <ul className="space-y-3 text-sm text-teal-100">
                <li className="flex items-start gap-2">
                  <MapPin className="w-5 h-5 shrink-0" /> Mugarsari, Tasikmalaya
                </li>
                <li className="flex items-center gap-2">
                  <Phone className="w-5 h-5 shrink-0" /> +62 123 4567 890
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="w-5 h-5 shrink-0" /> infosipocem@google.com
                </li>
              </ul>
            </div>

            {/* Media Sosial */}
            <div className="col-span-1">
              <h3 className="font-semibold text-lg mb-4">Media Sosial</h3>
              <div className="flex gap-4">
                <div className="p-2 border border-white rounded-full"><Facebook className="w-5 h-5"/></div>
                <div className="p-2 border border-white rounded-full"><Instagram className="w-5 h-5"/></div>
                <div className="p-2 border border-white rounded-full"><Twitter className="w-5 h-5"/></div>
                <div className="p-2 border border-white rounded-full"><Youtube className="w-5 h-5"/></div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-teal-400 pt-6 flex justify-between items-center text-sm text-teal-100">
            <p>© 2025 Posyandu Cempaka. Hak Cipta Dilindungi</p>
            <div className="space-x-4">
              <Link href="#">Kebijakan Privasi</Link>
              <Link href="#">Syarat & Ketentuan</Link>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}