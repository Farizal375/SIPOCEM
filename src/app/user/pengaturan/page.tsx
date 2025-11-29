import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Camera } from "lucide-react";

export default function UserPengaturanPage() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-[#00BFA6] mb-6">Pengaturan</h2>

      <Card className="min-h-[500px]">
        <div className="border-b px-6 py-4">
          <div className="flex items-center gap-2 text-[#00BFA6] font-medium border-b-2 border-[#00BFA6] w-fit pb-4 -mb-4.5 z-10 relative">
            <span className="w-4 h-4 bg-[#00BFA6] rounded-full inline-block"></span> Profil
          </div>
        </div>
        
        <CardContent className="p-8">
          <div className="flex flex-col md:flex-row gap-10">
            {/* Avatar Section */}
            <div className="relative">
              <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center text-5xl font-normal text-gray-700 border-4 border-white shadow-lg">
                D
              </div>
              <button className="absolute bottom-0 right-0 bg-white border shadow-sm rounded-full p-2 hover:bg-gray-50">
                <Camera className="w-4 h-4 text-gray-500" />
              </button>
            </div>

            {/* Form Section */}
            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="nama" className="text-gray-500">Nama Lengkap</Label>
                <Input id="nama" defaultValue="Dini Andini" className="border-gray-200" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-500">Email</Label>
                <Input id="email" defaultValue="andini25@gmail.com" className="border-gray-200" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="telp" className="text-gray-500">No. Telepon</Label>
                <Input id="telp" defaultValue="081234567890" className="border-gray-200" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="role" className="text-gray-500">Role</Label>
                <Input id="role" defaultValue="User" disabled className="bg-white border-gray-200 text-gray-700" />
              </div>

              <div className="col-span-1 md:col-span-2 mt-4">
                <Button className="bg-[#D4E157] hover:bg-[#cddc39] text-black font-semibold px-8">
                  Simpan Perubahan
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}