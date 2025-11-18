// src/components/About.tsx

"use client";

import Image from "next/image";
import aboutImage from "../assets/about.png";
import { trpc } from "@/trpc/client";
import { useEffect } from "react";
import { useLoadingContext } from "@/context/LoadingContext";

export default function About() {
  const { setAboutReady } = useLoadingContext();
  const { data: about, isLoading } = trpc.about.get.useQuery();

  useEffect(() => {
    if (!isLoading) {
      setAboutReady(true);
    }
  }, [isLoading, setAboutReady]);

  // Hapus loading spinner intenal, ganti dengan placeholder tak terlihat
  if (isLoading) {
    return (
      <div className="bg-white font-sans min-h-screen invisible" id="about">
        {/* Placeholder untuk menjaga layout */}
        <div className="h-screen"></div>
      </div>
    );
  }

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
              <span className="font-bold text-gray-900">Dusun Kembang</span>
            </h1>

            {/* Isi */}
            <div className="mt-6 space-y-8">
              <div>
                <h2 className="text-xl font-bold text-gray-900">VISI</h2>
                <p className="mt-3 text-gray-600 leading-relaxed whitespace-pre-line">
                  {about?.visi ||
                    "Bertujuan untuk berkontribusi positif bagi masyarakat."}
                </p>
              </div>

              <div>
                <h2 className="text-xl font-bold text-gray-900">MISI</h2>
                <p className="mt-3 text-gray-600 leading-relaxed whitespace-pre-line">
                  {about?.misi ||
                    "Meningkatkan kepedulian terhadap lingkungan sosial masyarakat."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
