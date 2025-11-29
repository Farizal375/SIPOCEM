import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs"; 

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SIPOCEM",
  description: "Sistem Informasi Posyandu Cempaka",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="id">
        {/* Tambahkan suppressHydrationWarning di sini untuk mencegah error ekstensi browser */}
        <body className={inter.className} suppressHydrationWarning>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}