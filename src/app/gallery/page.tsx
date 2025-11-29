"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { X, ArrowLeft, Image as ImageIcon, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react"; // Menggunakan motion untuk animasi filter

import { trpc } from "@/trpc/client";
import { Gallery as GalleryType, GalleryCategory } from "@prisma/client"; // Ambil tipe dari prisma client

// Tipe untuk Filter Kategori (menggabungkan 'Semua' dengan enum Prisma)
type CategoryFilter = "Semua" | GalleryCategory;

// --- Komponen Utama Galeri ---
export default function GalleryPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedTitle, setSelectedTitle] = useState("");

  // State untuk filter kategori
  const [selectedCategory, setSelectedCategory] =
    useState<CategoryFilter>("Semua");

  // --- INTEGRASI TRPC: Mengambil data Galeri ---
  const { data: items = [], isLoading } = trpc.gallery.getAll.useQuery();

  // Menggabungkan "Semua" dengan semua nilai dari enum GalleryCategory
  const categories: CategoryFilter[] = [
    "Semua",
    ...Object.values(GalleryCategory),
  ];

  // --- LOGIKA FILTER ---
  const filtered: GalleryType[] =
    selectedCategory === "Semua"
      ? items
      : items.filter((item) => item.category === selectedCategory);

  const openModal = (imageUrl: string, title: string) => {
    setSelectedImage(imageUrl);
    setSelectedTitle(title);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedImage(null);
    setSelectedTitle("");
  };

  // --- Loading State ---
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-black py-20">
        <Loader2 className="w-8 h-8 animate-spin mr-2 text-gray-700" />
        <p>Memuat Galeri...</p>
      </div>
    );
  }

  // --- Render ---
  return (
    <section className="pt-20 pb-24 bg-white min-h-screen text-black">
      <div className="container mx-auto sm:px-6 lg:px-12">
        {/*  HEADER SECTION */}
        <div className="text-center mb-10 md:mb-16">
          <h1 className="text-4xl md:text-6xl font-extrabold uppercase tracking-tighter text-black mb-4">
            GALERI KEGIATAN & UMKM
          </h1>
          <p className="text-gray-600 max-w-xl mx-auto text-sm md:text-base font-medium px-4">
            Dokumentasi kegiatan karang taruna dusun Kembang.
          </p>
        </div>

        {/* --- FILTER BAR (Horizontal Scroll) --- */}
        <div className="flex justify-center mb-10">
          <div className="flex gap-2 overflow-x-auto pb-2 scrol mask-linear-fade no-scrollbar px-4">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`
                                    cursor-pointer px-6 py-2.5 rounded-full text-xs md:text-sm font-bold uppercase tracking-wide border transition-all duration-300 whitespace-nowrap
                                    ${
                                      selectedCategory === cat
                                        ? "bg-black text-white border-black shadow-lg"
                                        : "bg-white text-gray-500 border-gray-200 hover:border-black hover:text-black"
                                    }
                                `}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* GALLERY GRID */}
        <motion.div
          layout // Mengaktifkan layout animation dari motion
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10 md:gap-12 px-4"
        >
          <AnimatePresence mode="wait">
            {" "}
            {/* Menunggu item hilang sebelum item baru muncul */}
            {filtered.map((item) => (
              <motion.div
                layout
                key={item.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="group flex flex-col h-full cursor-pointer"
                onClick={() => openModal(item.imageUrl, item.title)}
              >
                <div className="relative bg-[#F4F4F4] aspect-4/3 w-full overflow-hidden rounded-xl mb-4 shadow-lg">
                  <div className="absolute top-3 right-3 z-10">
                    <span className="inline-block px-3 py-1 text-[10px] font-black tracking-widest uppercase bg-black text-white rounded-sm">
                      {item.category}
                    </span>
                  </div>
                  <Image
                    src={item.imageUrl}
                    alt={item.title}
                    fill
                    className="object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <ImageIcon className="w-8 h-8 text-white" />
                  </div>
                </div>
                <div className="flex flex-col items-start">
                  <h3 className="text-md md:text-lg font-bold text-black uppercase leading-tight group-hover:underline decoration-1 underline-offset-4 mb-1">
                    {item.title}
                  </h3>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* --- EMPTY STATE --- */}
          {filtered.length === 0 && (
            <div className="col-span-full text-center py-10">
              <p className="text-gray-400 font-medium uppercase tracking-wide">
                Tidak ada item galeri ditemukan dalam kategori{" "}
                {selectedCategory}.
              </p>
            </div>
          )}
        </motion.div>

        {/* Tombol Kembali */}
        <div className="text-center mt-16">
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-black text-white font-bold px-8 py-3 rounded-full shadow-lg hover:bg-gray-800 hover:-translate-y-0.5 transition-all duration-300 uppercase tracking-wider"
          >
            <ArrowLeft className="w-4 h-4" /> Kembali ke Beranda
          </Link>
        </div>
      </div>

      {/* --- MODAL COMPONENT (Pop-up Gambar) --- (Tidak diubah) */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/10 backdrop-blur-sm backdrop-brightness-90 p-2 sm:p-4"
          onClick={closeModal}
        >
          <div
            className="relative w-full max-w-md sm:max-w-2xl lg:max-w-4xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-1 right-1 sm:-top-4 sm:-right-4 z-50 p-2 sm:p-3 bg-white text-black rounded-full shadow-lg hover:scale-110 transition cursor-pointer"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            {/* Modal Card */}
            <div className="bg-white/90 backdrop-blur-xl rounded-xl sm:rounded-2xl shadow-2xl overflow-hidden">
              <div className="relative w-full h-[50vh] sm:h-[65vh] lg:h-[75vh] bg-gray-100">
                {selectedImage && (
                  <Image
                    src={selectedImage}
                    alt={selectedTitle}
                    fill
                    className="object-contain"
                    sizes="100vw"
                  />
                )}
              </div>

              {/* Title Section */}
              <div className="px-4 sm:px-6 py-3 sm:py-4 text-center bg-white">
                <h3 className="text-sm sm:text-lg md:text-xl font-bold uppercase tracking-wider text-gray-800">
                  {selectedTitle}
                </h3>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
