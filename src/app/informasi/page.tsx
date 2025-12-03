"use client";

import React from "react";
import LandingHeader from "@/components/layout/landing-header";
import LandingFooter from "@/components/layout/landing-footer";
import Link from "next/link";
import { Check, Facebook, Instagram, Youtube } from "lucide-react";

const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* HEADER (REUSABLE) */}
            <LandingHeader />
      
            {/* Spacer for fixed header height */}
            <div className="h-20"></div>
      
            {/* Breadcrumb */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
              <p className="text-sm text-gray-600">
                Beranda / <span className="font-semibold">Kontak</span>
              </p>
            </div>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-teal-400 to-teal-500 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Tentang SIPOCEM</h1>
          <p className="text-lg md:text-xl text-teal-50 leading-relaxed">
            Posyandu Cempaka merupakan layanan kesehatan berbasis masyarakat
            yang berfokus pada pemantauan tumbuh kembang balita, kesehatan ibu
            hamil, serta edukasi kesehatan untuk meningkatkan kesejahteraan warga
            di lingkungan Nagarawangi.
          </p>
        </div>
      </div>

      {/* Main Image */}
      <div className="max-w-6xl mx-auto px-4 -mt-8">
        <div className="bg-gray-200 rounded-lg overflow-hidden shadow-xl h-64 md:h-96 flex items-center justify-center">
          <p className="text-gray-500">Gambar aktivitas Posyandu</p>
        </div>
      </div>

      {/* Services Section */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-teal-500 mb-12">
          Layanan Kami
        </h2>

        <div className="space-y-8">
          {/* Service 1 */}
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="bg-yellow-400 text-teal-600 rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold shadow-lg">
              1
            </div>
            <div className="bg-yellow-300 rounded-lg p-6 flex-1 shadow-md">
              <h3 className="text-xl font-bold text-gray-800 mb-2">Pemantauan Balita</h3>
              <p className="text-gray-700">
                Meliputi penimbangan, pengukuran tinggi badan, pencatatan
                perkembangan, serta edukasi gizi bagi orang tua.
              </p>
            </div>
          </div>

          {/* Service 2 */}
          <div className="flex flex-col md:flex-row-reverse items-center gap-6">
            <div className="bg-teal-500 text-white rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold shadow-lg">
              2
            </div>
            <div className="bg-yellow-300 rounded-lg p-6 flex-1 shadow-md">
              <h3 className="text-xl font-bold text-gray-800 mb-2">Pemeriksaan Ibu Hamil</h3>
              <p className="text-gray-700">
                Pemeriksaan kesehatan rutin untuk ibu hamil, termasuk pemantauan
                kondisi kehamilan dan edukasi penting.
              </p>
            </div>
          </div>

          {/* Service 3 */}
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="bg-yellow-400 text-teal-600 rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold shadow-lg">
              3
            </div>
            <div className="bg-yellow-300 rounded-lg p-6 flex-1 shadow-md">
              <h3 className="text-xl font-bold text-gray-800 mb-2">Imunisasi</h3>
              <p className="text-gray-700">
                Pemberian imunisasi dasar sesuai jadwal kepada balita guna
                pencegahan penyakit.
              </p>
            </div>
          </div>
        </div>

        {/* Images Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
          <div className="bg-gray-200 rounded-lg overflow-hidden h-56 flex items-center justify-center">
            <p className="text-gray-500">Gambar kegiatan 1</p>
          </div>
          <div className="bg-gray-200 rounded-lg overflow-hidden h-56 flex items-center justify-center">
            <p className="text-gray-500">Gambar kegiatan 2</p>
          </div>
        </div>
      </div>

      {/* Program Impact Section */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-teal-500 mb-12">
            Dampak Program
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="bg-gray-200 rounded-lg overflow-hidden h-64 flex items-center justify-center">
              <p className="text-gray-500">Gambar dampak program</p>
            </div>

            <div className="bg-yellow-300 rounded-lg p-8 shadow-lg space-y-4">
              {[
                "Meningkatnya keterlibatan dan akurasi pencatatan layanan",
                "Orang tua lebih mudah memantau perkembangan anak",
                "Menghindari risiko hilangnya data layanan posyandu",
              ].map((text, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="bg-teal-500 rounded-full p-1 mt-1">
                    <Check className="w-5 h-5 text-white" />
                  </div>
                  <p className="text-gray-800 font-medium">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-teal-500 text-white">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Company Info */}
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
                  <span className="text-teal-600 font-bold text-sm">S</span>
                </div>
                <span className="text-xl font-bold">SIPOCEM</span>
              </div>
              <p className="text-sm text-teal-100">
                Mendukung Tumbuh Kembang Anak Bersama Posyandu Cempaka
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-bold mb-4">Tautan Cepat</h3>
              <ul className="space-y-2 text-sm text-teal-100">
                <li><Link href="#" className="hover:text-yellow-300">Tentang Kami</Link></li>
                <li><Link href="#" className="hover:text-yellow-300">Tim Kami</Link></li>
                <li><Link href="#" className="hover:text-yellow-300">Kontak</Link></li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="font-bold mb-4">Kontak Kami</h3>
              <ul className="space-y-2 text-sm text-teal-100">
                <li className="flex items-center gap-2">
                  <span>📍</span> Mugarsari, Tasikmalaya
                </li>
                <li className="flex items-center gap-2">
                  <span>📞</span> +62 123 4567 890
                </li>
                <li className="flex items-center gap-2">
                  <span>✉️</span> infosipocem@google.com
                </li>
              </ul>
            </div>

            {/* Social Media */}
            <div>
              <h3 className="font-bold mb-4">Media Sosial</h3>
              <div className="flex space-x-3">
                <a className="border-2 border-white p-2 rounded-full hover:bg-white hover:text-teal-500 transition">
                  <Facebook className="w-5 h-5" />
                </a>
                <a className="border-2 border-white p-2 rounded-full hover:bg-white hover:text-teal-500 transition">
                  <Instagram className="w-5 h-5" />
                </a>
                <a className="border-2 border-white p-2 rounded-full hover:bg-white hover:text-teal-500 transition">
                  <Youtube className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-teal-400 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-teal-100">
            <p>© 2025 Posyandu Cempaka. Hak Cipta Dilindungi</p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <Link href="#" className="hover:text-yellow-300">
                Kebijakan Privasi
              </Link>
              <Link href="#" className="hover:text-yellow-300">
                Syarat & Ketentuan
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AboutPage;
