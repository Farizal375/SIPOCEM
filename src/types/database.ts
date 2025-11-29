export type Role = 'admin' | 'kader' | 'user';

export interface User {
  id: string; // Clerk ID
  email: string;
  role: Role;
  status: string;
}

export interface Ibu {
  id: string;
  user_id: string;
  nik: string;
  nama: string;
  alamat: string;
  telepon: string;
  status_validasi: 'menunggu' | 'valid' | 'ditolak';
}

export interface Anak {
  id: string;
  ibu_id: string;
  nama: string;
  nik: string;
  tgl_lahir: string;
  jenis_kelamin: string;
  anak_ke: number;
}

export interface Jadwal {
  id: string;
  jenis_kegiatan: string;
  tanggal: string;
  tempat: string;
}