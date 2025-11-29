// File: src/config/admin-menu.ts
import { LayoutDashboard, Users, Bell, Settings } from "lucide-react";

export const adminMenu = [
  {
    category: "GENERAL",
    items: [
      { title: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
    ],
  },
  {
    category: "DATA MASTER",
    items: [
      { title: "Manajemen Akun", href: "/admin/akun", icon: Users },
      { title: "Pusat Notifikasi", href: "/admin/notifikasi", icon: Bell },
    ],
  },
  {
    category: "DATA LAYANAN",
    items: [
      { title: "Pengaturan", href: "/admin/pengaturan", icon: Settings },
    ],
  },
];