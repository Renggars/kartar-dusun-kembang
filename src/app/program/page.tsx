"use client";

import Link from "next/link";
import Image from "next/image";
import { trpc } from "@/trpc/client";
// Import Lucide icons
import { Calendar } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

export type ProgramItem = {
  id: string;
  slug: string;
  title: string;
  description: string;
  imageUrl: string | null;
  date: string; // Tipe string untuk date, akan diolah saat display
  category: "Sosial" | "Budaya" | "Pendidikan" | "Lingkungan" | string; // Tambahkan properti category
};

// Tipe Program untuk Filter (Opsional, tapi baik untuk kejelasan)
type ProgramCategoryFilter =
  | "Semua"
  | "Sosial"
  | "Budaya"
  | "Pendidikan"
  | "Lingkungan";

// Tambahkan data kategori dummy untuk keperluan filter
const programCategories = [
  "Semua",
  "Sosial",
  "Budaya",
  "Pendidikan",
  "Lingkungan",
];

export default function ProgramPage() {
  const { data: programs = [], isLoading } = trpc.program.list.useQuery() as {
    data: ProgramItem[] | undefined;
    isLoading: boolean;
  };
  const [selectedCategory, setSelectedCategory] =
    useState<ProgramCategoryFilter>("Semua");

  // State untuk filtering (asumsi setiap program memiliki properti category)
  const filteredPrograms =
    selectedCategory === "Semua"
      ? programs
      : programs.filter((program) => program.category === selectedCategory);

  if (isLoading) {
    return (
      <section className="bg-white min-h-screen">
        {/* Header Section */}
        <div className="bg-white text-black px-5 pt-20 pb-10 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold uppercase tracking-tighter text-black mb-4">
            PROGRAM & KEGIATAN
          </h1>
          <p className="text-gray-600 max-w-xl mx-auto text-sm md:text-base font-medium px-4">
            Semua agenda dan program kerja unggulan yang kami selenggarakan.
          </p>
        </div>
        <div className="py-20 flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-black border-t-transparent rounded-full animate-spin"></div>
        </div>
      </section>
    );
  }

  return (
    <section className="pt-5 pb-10 md:py-24 bg-white min-h-screen text-black">
      <div className="container mx-auto sm:px-6 lg:px-12">
        <div className="text-center mb-10 md:mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-extrabold uppercase tracking-tighter text-black mb-4"
          >
            PROGRAM & KEGIATAN
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-600 max-w-xl mx-auto text-sm md:text-base font-medium px-4"
          >
            Semua agenda dan program kerja unggulan yang kami selenggarakan.
          </motion.p>
        </div>

        {/* --- FILTER BAR (Horizontal Scroll) --- */}
        <div className="flex justify-center mb-10">
          <div className="flex gap-2 overflow-x-auto pb-2 scrol mask-linear-fade no-scrollbar px-4">
            {programCategories.map((cat) => (
              <button
                key={cat}
                onClick={() =>
                  setSelectedCategory(cat as ProgramCategoryFilter)
                }
                className={`px-6 py-2.5 rounded-full text-xs md:text-sm font-bold uppercase tracking-wide border transition-all duration-300 whitespace-nowrap ${
                  selectedCategory === cat
                    ? "bg-black text-white border-black shadow-lg"
                    : "bg-white text-gray-500 border-gray-200 hover:border-black hover:text-black"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* --- PROGRAM GRID (2 Col Mobile, 3 Col Desktop) --- */}
        <motion.div
          layout
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-8 md:gap-8 px-4"
        >
          <AnimatePresence>
            {filteredPrograms.map((program: ProgramItem, i) => (
              <motion.div
                layout
                key={program.id || i}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="group flex flex-col h-full"
              >
                <Link
                  href={`/program/${program.slug}`}
                  className="block h-full"
                >
                  {/* --- CARD IMAGE AREA (Gray Background Box) --- */}
                  <div className="relative bg-[#F4F4F4] aspect-5/4 w-full overflow-hidden rounded-xl mb-4">
                    {/* Tag Tanggal di pojok kiri atas */}
                    <div className="absolute top-3 left-3 z-10">
                      <span className="inline-flex items-center px-2 py-1 text-[10px] font-bold uppercase tracking-wider bg-black text-white rounded-full">
                        <Calendar className="h-3 w-3 mr-1" />
                        {new Date(program.date).toLocaleDateString("id-ID", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </span>
                    </div>

                    <Image
                      src={program.imageUrl || "/placeholder-400x300.png"}
                      alt={program.title}
                      fill
                      className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                    />

                    {/* Overlay "View" */}
                    <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>

                  {/* --- PROGRAM INFO (Minimalist Text) --- */}
                  <div className="flex flex-col items-start">
                    <h3 className="text-sm md:text-lg font-bold text-black uppercase leading-tight group-hover:underline decoration-1 underline-offset-4 mb-2 line-clamp-2">
                      {program.title}
                    </h3>

                    {/* Deskripsi Pendek */}
                    <p className="text-xs text-gray-500 mb-3 line-clamp-3">
                      {program.description}
                    </p>

                    <div className="inline-block bg-[#1581bc] text-white py-2 px-4 rounded-xl font-semibold hover:bg-opacity-90 hover:shadow-lg transition-all duration-300 text-sm">
                      Lihat Detail
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* --- EMPTY STATE --- */}
        {filteredPrograms.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-400 font-medium uppercase tracking-wide">
              Tidak ada program atau kegiatan ditemukan
            </p>
          </div>
        )}

        {/* --- BUTTON: BROWSE ALL (Jika ada pagination atau lebih dari limit) --- */}
        {/* Asumsi: Jika ada 10 program tapi yang ditampilkan semua, tombol ini tidak perlu. 
                    Saya hanya meninggalkannya jika Anda ingin pagination di masa depan.
                */}
      </div>
    </section>
  );
}
