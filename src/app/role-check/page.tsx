"use client";

import { useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export default function RoleCheckPage() {
  const { isLoaded, isSignedIn, user } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      const userRole = user?.publicMetadata?.role as string || 'user';
      
      if (userRole === "admin") {
        router.push("/admin/dashboard");
      } else if (userRole === "kader") {
        router.push("/kader/dashboard");
      } else {
        router.push("/user/dashboard");
      }
    } else if (isLoaded && !isSignedIn) {
      // If not signed in, redirect to sign-in page
      router.push("/sign-in");
    }
  }, [isLoaded, isSignedIn, user, router]);

  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#00BFA6] mx-auto mb-4"></div>
        <p className="text-gray-600">Mengarahkan...</p>
      </div>
    </div>
  );
}