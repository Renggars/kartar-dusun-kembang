"use client";

import Image from "next/image";
import { trpc } from "@/server/client";
import aboutImage from "../assets/about.png";

export default function About() {
  // Ambil data dari tRPC
  const { data: about, isLoading } = trpc.about.get.useQuery();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-gray-600 animate-pulse">Memuat data...</p>
      </div>
    );
  }

  // // Jika belum ada data, tampilkan fallback
  // if (!about) {
  //   return (
  //     <div className="flex justify-center items-center min-h-screen">
  //       <p className="text-gray-600">Data belum tersedia.</p>
  //     </div>
  //   );
  // }

  return (
    <div className="bg-white font-sans" id="about">
      <main className="flex flex-col md:flex-row min-h-screen">
        {/* Bagian Gambar */}
        <div className="w-full md:w-1/2 h-64 md:h-screen relative">
          <Image
            src={about?.imageUrl || aboutImage}
            alt="Foto kegiatan Karang Taruna Dusun Kembang"
            className="absolute inset-0 w-full h-full object-cover"
            loading="eager"
            width={2070}
            height={1380}
          />
        </div>

        {/* Bagian Konten */}
        <div className="w-full md:w-1/2 bg-gray-50 flex items-center justify-center px-8 py-6 sm:p-12 md:p-16">
          <div className="max-w-lg w-full">
            {/* Judul */}
            <h1 className="text-4xl md:text-5xl font-serif text-gray-800 leading-tight">
              Tentang Karang Taruna <br />
              <span className="font-bold">Dusun Kembang</span>
            </h1>

            {/* Isi */}
            <div className="mt-6 space-y-8">
              <div>
                <h2 className="text-xl font-bold text-gray-900">VISI</h2>
                <p className="mt-3 text-gray-600 leading-relaxed whitespace-pre-line">
                  {about?.visi ||
                    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero incidunt animi, laboriosam, voluptatum ipsa nam dolorum repellendus libero fugit eveniet ratione tempora, dolor ipsum dignissimos maxime sed! Explicabo est delectus."}
                </p>
              </div>

              <div>
                <h2 className="text-xl font-bold text-gray-900">MISI</h2>
                <p className="mt-3 text-gray-600 leading-relaxed whitespace-pre-line">
                  {about?.misi ||
                    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero incidunt animi, laboriosam, voluptatum ipsa nam dolorum repellendus libero fugit eveniet ratione tempora, dolor ipsum dignissimos maxime sed! Explicabo est delectus."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
