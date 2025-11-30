-- Create the users table to manage all users
CREATE TABLE IF NOT EXISTS public.users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  clerk_user_id TEXT UNIQUE NOT NULL, -- Store the Clerk user ID
  email TEXT UNIQUE NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('admin', 'kader', 'user')),
  status TEXT DEFAULT 'aktif' CHECK (status IN ('aktif', 'nonaktif', 'pending')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create the admin profiles table
CREATE TABLE IF NOT EXISTS public.admin_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  nama TEXT NOT NULL,
  telepon TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create the kader profiles table
CREATE TABLE IF NOT EXISTS public.kader_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  nama TEXT NOT NULL,
  telepon TEXT,
  no_registrasi_kohort TEXT DEFAULT '-',
  no_catatan_medik TEXT DEFAULT '-',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create the ibu profiles (for users) table
CREATE TABLE IF NOT EXISTS public.ibu_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  nik TEXT UNIQUE,
  nama TEXT NOT NULL,
  telepon TEXT,
  status_validasi TEXT DEFAULT 'pending' CHECK (status_validasi IN ('valid', 'pending', 'rejected')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create the orang_tua table
CREATE TABLE IF NOT EXISTS public.orang_tua (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  nik TEXT UNIQUE,
  nama TEXT NOT NULL,
  telepon TEXT,
  alamat TEXT,
  status_ibu_hamil BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create the anak table
CREATE TABLE IF NOT EXISTS public.anak (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  orang_tua_id UUID REFERENCES public.orang_tua(id) ON DELETE CASCADE,
  nik TEXT UNIQUE,
  nama TEXT NOT NULL,
  tgl_lahir DATE NOT NULL,
  jenis_kelamin TEXT CHECK (jenis_kelamin IN ('laki-laki', 'perempuan')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create the jadwal_posyandu table
CREATE TABLE IF NOT EXISTS public.jadwal_posyandu (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  kader_id UUID REFERENCES public.kader_profiles(id) ON DELETE CASCADE,
  tanggal_posyandu DATE NOT NULL,
  hari TEXT NOT NULL,
  waktu_mulai TIME NOT NULL,
  waktu_selesai TIME NOT NULL,
  tempat TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create the pemeriksaan_ibu_hamil table
CREATE TABLE IF NOT EXISTS public.pemeriksaan_ibu_hamil (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  ibu_id UUID REFERENCES public.orang_tua(id) ON DELETE CASCADE,
  berat_badan DECIMAL(5,2),
  tekanan_darah TEXT,
  tinggi_badan INTEGER,
  usia_kehamilan INTEGER, -- in weeks
  trimester TEXT CHECK (trimester IN ('trimester_1', 'trimester_2', 'trimester_3')),
  hasil_pemeriksaan TEXT,
  catatan_dokter TEXT,
  tanggal_pemeriksaan DATE DEFAULT CURRENT_DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create the pemeriksaan_anak table
CREATE TABLE IF NOT EXISTS public.pemeriksaan_anak (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  anak_id UUID REFERENCES public.anak(id) ON DELETE CASCADE,
  berat_badan DECIMAL(5,2),
  tinggi_badan DECIMAL(5,2),
  lingkar_kepala DECIMAL(5,2),
  usia_bulan INTEGER, -- age in months
  hasil_pemeriksaan TEXT,
  imunisasi_terakhir TEXT,
  catatan_dokter TEXT,
  tanggal_pemeriksaan DATE DEFAULT CURRENT_DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create the notifikasi table
CREATE TABLE IF NOT EXISTS public.notifikasi (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  judul TEXT NOT NULL,
  isi TEXT NOT NULL,
  jenis_notifikasi TEXT CHECK (jenis_notifikasi IN ('pemeriksaan', 'jadwal', 'validasi', 'umum')),
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'read', 'archived')),
  tanggal_kirim TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create the log_aktivitas table
CREATE TABLE IF NOT EXISTS public.log_aktivitas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  aktivitas TEXT NOT NULL,
  deskripsi TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security on all tables
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.kader_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ibu_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orang_tua ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.anak ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.jadwal_posyandu ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pemeriksaan_ibu_hamil ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pemeriksaan_anak ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifikasi ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.log_aktivitas ENABLE ROW LEVEL SECURITY;

-- RLS Policies for users table
CREATE POLICY "Users can view own data" ON public.users
  FOR SELECT USING (auth.jwt() ->> 'sub' = clerk_user_id);

CREATE POLICY "Users can update own data" ON public.users
  FOR UPDATE USING (auth.jwt() ->> 'sub' = clerk_user_id);

-- RLS Policies for profile tables
CREATE POLICY "Users can view own profile" ON public.admin_profiles
  FOR SELECT USING (auth.jwt() ->> 'sub' = (SELECT clerk_user_id FROM public.users WHERE id = user_id));

CREATE POLICY "Admins can manage all profiles" ON public.admin_profiles
  FOR ALL USING (EXISTS (SELECT 1 FROM public.users WHERE clerk_user_id = auth.jwt() ->> 'sub' AND role = 'admin'));

CREATE POLICY "Users can view own profile" ON public.kader_profiles
  FOR SELECT USING (auth.jwt() ->> 'sub' = (SELECT clerk_user_id FROM public.users WHERE id = user_id));

CREATE POLICY "Admins can manage all profiles" ON public.kader_profiles
  FOR ALL USING (EXISTS (SELECT 1 FROM public.users WHERE clerk_user_id = auth.jwt() ->> 'sub' AND role = 'admin'));

CREATE POLICY "Users can view own profile" ON public.ibu_profiles
  FOR SELECT USING (auth.jwt() ->> 'sub' = (SELECT clerk_user_id FROM public.users WHERE id = user_id));

CREATE POLICY "Admins can manage all profiles" ON public.ibu_profiles
  FOR ALL USING (EXISTS (SELECT 1 FROM public.users WHERE clerk_user_id = auth.jwt() ->> 'sub' AND role = 'admin'));

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_users_clerk_id ON public.users(clerk_user_id);
CREATE INDEX IF NOT EXISTS idx_users_role ON public.users(role);
CREATE INDEX IF NOT EXISTS idx_users_status ON public.users(status);
CREATE INDEX IF NOT EXISTS idx_anak_parent ON public.anak(orang_tua_id);
CREATE INDEX IF NOT EXISTS idx_jadwal_kader ON public.jadwal_posyandu(kader_id);
CREATE INDEX IF NOT EXISTS idx_jadwal_date ON public.jadwal_posyandu(tanggal_posyandu);
CREATE INDEX IF NOT EXISTS idx_pemeriksaan_ibu_ibu_id ON public.pemeriksaan_ibu_hamil(ibu_id);
CREATE INDEX IF NOT EXISTS idx_pemeriksaan_anak_anak_id ON public.pemeriksaan_anak(anak_id);
CREATE INDEX IF NOT EXISTS idx_notifikasi_user_id ON public.notifikasi(user_id);
CREATE INDEX IF NOT EXISTS idx_notifikasi_status ON public.notifikasi(status);

-- Create updated_at triggers
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_users_updated_at
  BEFORE UPDATE ON public.users
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_admin_profiles_updated_at
  BEFORE UPDATE ON public.admin_profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_kader_profiles_updated_at
  BEFORE UPDATE ON public.kader_profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_ibu_profiles_updated_at
  BEFORE UPDATE ON public.ibu_profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_orang_tua_updated_at
  BEFORE UPDATE ON public.orang_tua
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_anak_updated_at
  BEFORE UPDATE ON public.anak
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_jadwal_posyandu_updated_at
  BEFORE UPDATE ON public.jadwal_posyandu
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_pemeriksaan_ibu_hamil_updated_at
  BEFORE UPDATE ON public.pemeriksaan_ibu_hamil
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_pemeriksaan_anak_updated_at
  BEFORE UPDATE ON public.pemeriksaan_anak
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_notifikasi_updated_at
  BEFORE UPDATE ON public.notifikasi
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();