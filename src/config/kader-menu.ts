import { LayoutDashboard, Users, User, Baby, Calendar, Stethoscope, Settings } from "lucide-react";

export const kaderMenu = [
  {
    category: "GENERAL",
    items: [
      { title: "Dashboard", href: "/kader/dashboard", icon: LayoutDashboard },
    ],
  },
  {
    category: "DATA MASTER",
    items: [
      { title: "Data Kader", href: "/kader/kader", icon: Users },
      { title: "Data Orang Tua", href: "/kader/orang-tua", icon: User },
      { title: "Data Anak", href: "/kader/anak", icon: Baby },
    ],
  },
  {
    category: "DATA PELAYANAN",
    items: [
      { title: "Jadwal Posyandu", href: "/kader/jadwal", icon: Calendar },
      { title: "Pemeriksaan Ibu Hamil", href: "/kader/pemeriksaan-ibu", icon: User }, // Ikon Ibu Hamil bisa diganti
      { title: "Pemeriksaan Anak", href: "/kader/pemeriksaan-anak", icon: Stethoscope },
    ],
  },
  {
    category: "LAINNYA", // Opsional kategori
    items: [
      { title: "Pengaturan", href: "/kader/pengaturan", icon: Settings },
    ],
  },
];