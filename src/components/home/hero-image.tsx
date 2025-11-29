"use client";

import React from "react";

export default function HeroImage() {
  return (
    <div className="relative rounded-3xl overflow-hidden shadow-xl border-4 border-white max-w-lg w-full h-[300px] md:h-[350px] bg-gray-200">
      {/* Update src sesuai lokasi file di folder public */}
      <img
        src="/images/hero-image.jpg" 
        alt="Posyandu Cempaka"
        className="object-cover w-full h-full"
        onError={(e) => {
          // Fallback jika gambar error/tidak ditemukan
          e.currentTarget.src = "https://placehold.co/600x400/e2e8f0/1e293b?text=Foto+Posyandu";
        }}
      />
    </div>
  );
}