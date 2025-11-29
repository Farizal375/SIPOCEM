import { LayoutDashboard, Baby, User, Calendar, Settings } from "lucide-react";

export const userMenu = [
  {
    category: "GENERAL",
    items: [
      { title: "Dashboard", href: "/user/dashboard", icon: LayoutDashboard },
    ],
  },
  {
    category: "DATA MASTER",
    items: [
      { title: "Data Ibu Hamil", href: "/user/ibu-hamil", icon: User }, // Ikon ibu hamil, sementara pakai User
      { title: "Data Anak", href: "/user/anak", icon: Baby },
    ],
  },
  {
    category: "DATA LAYANAN",
    items: [
      { title: "Jadwal Posyandu", href: "/user/jadwal", icon: Calendar },
      { title: "Pengaturan", href: "/user/pengaturan", icon: Settings },
    ],
  },
];