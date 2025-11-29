import Link from "next/link";
import { kaderMenu } from "@/config/kader-menu";
import { User, Menu, Facebook, Instagram, Twitter, Youtube, MapPin, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function KaderLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex bg-gray-50 font-sans">
      {/* SIDEBAR */}
      <aside className="w-64 bg-[#00BFA6] text-white fixed h-full left-0 top-0 z-10 flex flex-col">
        <div className="h-16 flex items-center px-6 border-b border-teal-400">
          <div className="font-bold text-xl tracking-wide flex items-center gap-2 text-yellow-300">
            <div className="w-6 h-6 bg-yellow-400 rounded-full opacity-80"></div>
            SIPOCEM
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto py-6 px-3 space-y-6">
          {kaderMenu.map((group, idx) => (
            <div key={idx}>
              <h3 className="text-[10px] font-bold text-teal-100 uppercase mb-2 px-3 tracking-wider">
                {group.category}
              </h3>
              <div className="space-y-1">
                {group.items.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="flex items-center px-3 py-2.5 text-sm font-medium rounded-md hover:bg-[#00a892] transition-colors"
                  >
                    <item.icon className="w-5 h-5 mr-3 opacity-90" />
                    {item.title}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <div className="flex-1 ml-64 flex flex-col min-h-screen">
        {/* HEADER */}
        <header className="h-16 bg-[#00BFA6] text-white flex items-center justify-between px-6 sticky top-0 z-20 shadow-sm">
          <Button variant="ghost" size="icon" className="text-white hover:bg-[#00a892]">
            <Menu className="w-6 h-6" />
          </Button>
          <div className="flex items-center gap-2 text-sm font-medium">
            <User className="w-5 h-5" />
            <span>gia_anggia22</span>
          </div>
        </header>

        {/* CONTENT */}
        <main className="flex-1 p-6 bg-gray-50">
          {children}
        </main>

        {/* FOOTER */}
        <footer className="bg-[#00BFA6] text-white pt-12 pb-6 px-8 mt-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div className="col-span-1">
              <div className="flex items-center gap-2 mb-4 font-bold text-xl text-yellow-300">
                 <div className="w-6 h-6 bg-yellow-400 rounded-full"></div> SIPOCEM
              </div>
              <h2 className="text-2xl font-bold mb-4">SIPOCEM</h2>
              <p className="text-teal-100 text-sm leading-relaxed">
                Mendukung Tumbuh Kembang Anak Bersama Posyandu Cempaka
              </p>
            </div>
            {/* ... (Isi Footer sama persis dengan Admin) ... */}
             <div className="col-span-1">
              <h3 className="font-semibold text-lg mb-4">Tautan Cepat</h3>
              <ul className="space-y-2 text-sm text-teal-100">
                <li><Link href="#">Tentang Kami</Link></li>
                <li><Link href="#">Tim Kami</Link></li>
                <li><Link href="#">Kontak</Link></li>
              </ul>
            </div>
            <div className="col-span-1">
              <h3 className="font-semibold text-lg mb-4">Kontak Kami</h3>
              <ul className="space-y-3 text-sm text-teal-100">
                <li className="flex items-start gap-2"><MapPin className="w-4 h-4 mt-1"/> Mugarsari, Tasikmalaya</li>
                <li className="flex items-center gap-2"><Phone className="w-4 h-4"/> +62 123 4567 890</li>
                <li className="flex items-center gap-2"><Mail className="w-4 h-4"/> infosipocem@google.com</li>
              </ul>
            </div>
            <div className="col-span-1">
              <h3 className="font-semibold text-lg mb-4">Media Sosial</h3>
              <div className="flex gap-4">
                <Facebook className="w-6 h-6 border rounded-full p-1"/>
                <Instagram className="w-6 h-6 border rounded-full p-1"/>
                <Twitter className="w-6 h-6 border rounded-full p-1"/>
                <Youtube className="w-6 h-6 border rounded-full p-1"/>
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