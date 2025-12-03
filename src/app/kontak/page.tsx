"use client";

import React from "react";
import LandingHeader from "@/components/layout/landing-header";
import LandingFooter from "@/components/layout/landing-footer";
import { MapPin, Phone, Mail, Facebook, Instagram, Youtube } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50">
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

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Hubungi Kami</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Kami siap membantu Anda. Silakan hubungi kami melalui informasi
            yang tersedia di bawah ini.
          </p>
        </div>

        {/* Contact Information */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Informasi Kontak</h2>

          <div className="space-y-4">
            {/* Address */}
            <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition">
              <div className="flex items-start space-x-4">
                <div className="bg-teal-100 p-3 rounded-full">
                  <MapPin className="w-6 h-6 text-teal-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Alamat</h3>
                  <p className="text-gray-600">
                    Jl Nagarawangi Gg. Nusawangi 2 RT 04/RW 05, Kel. Nagarawangi,
                    <br />
                    Kec. Cihideung, Kota Tasikmalaya
                  </p>
                </div>
              </div>
            </div>

            {/* Phone */}
            <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition">
              <div className="flex items-start space-x-4">
                <div className="bg-teal-100 p-3 rounded-full">
                  <Phone className="w-6 h-6 text-teal-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Telepon</h3>
                  <a href="tel:+62123456890" className="text-gray-600 hover:text-teal-600">
                    +62 123 4567 890
                  </a>
                </div>
              </div>
            </div>

            {/* Email */}
            <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition">
              <div className="flex items-start space-x-4">
                <div className="bg-teal-100 p-3 rounded-full">
                  <Mail className="w-6 h-6 text-teal-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Email</h3>
                  <a href="mailto:infosipocem@gmail.com" className="text-gray-600 hover:text-teal-600">
                    infosipocem@gmail.com
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Map Placeholder */}
        <div className="mb-12">
          <div className="bg-gray-200 rounded-lg overflow-hidden h-64 flex items-center justify-center">
            <p className="text-gray-500">Peta Google Maps akan ditampilkan di sini</p>
          </div>
        </div>
      </div>

      {/* FOOTER (REUSABLE) */}
      <LandingFooter />
    </div>
  );
}
