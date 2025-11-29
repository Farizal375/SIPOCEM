"use client";

import { useClerk } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const { signOut } = useClerk();
  const router = useRouter();

  const handleLogout = async () => {
    await signOut(() => router.push("/")); // Redirect ke Beranda setelah logout
  };

  return (
    <Button 
      onClick={handleLogout}
      className="bg-[#D4E157] hover:bg-[#cddc39] text-black font-semibold px-8 w-full md:w-auto"
    >
      <LogOut className="w-4 h-4 mr-2" />
      Logout
    </Button>
  );
}