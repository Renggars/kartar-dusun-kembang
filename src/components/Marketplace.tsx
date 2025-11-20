// app/components/Marketplace.tsx
"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import Link from "next/link";
import { trpc } from "@/trpc/client";
import { MarketplaceItem } from "@/types";
import { useLoadingContext } from "@/context/LoadingContext";
import { motion, AnimatePresence } from "motion/react";

type CategoryFilter = "Semua" | "UMKM" | "Wisata" | "Cafe" | "Event";

export default function Marketplace({ limit }: { limit?: number }) {
  const { setMarketplaceReady } = useLoadingContext();
  const [selectedCategory, setSelectedCategory] =
    useState<CategoryFilter>("Semua");

  // Fetch Data (Tetap dipertahankan)
  const { data: items = [], isLoading } = trpc.marketplace.list.useQuery();

  // Set Ready State untuk Splash Screen
  useEffect(() => {
    if (!isLoading) {
      setMarketplaceReady(true);
    }
  }, [isLoading, setMarketplaceReady]);

  // Jika Loading, return elemen kosong (invisible) agar layout tidak bergeser drastis
  // atau biarkan Splash Screen yang menutupi ini.
  if (isLoading) {
    return (
      <div className="py-20 bg-gray-50 min-h-[50vh] flex items-center justify-center invisible">
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const categories = ["Semua", "UMKM", "Wisata", "Cafe", "Event"];

  // Filter Logic
  const filtered: MarketplaceItem[] =
    selectedCategory === "Semua"
      ? items
      : items.filter((item) => item.category === selectedCategory);

  // Limit Data untuk Homepage
  const finalData = limit ? filtered.slice(0, limit) : filtered;

  return (
    <section
      id="marketplace"
      className="py-20 bg-gray-50 min-h-screen overflow-hidden"
    >
      <div className="container mx-auto px-4 sm:px-10 xl:px-20">
        {/* --- HEADER SECTION --- */}
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold text-gray-950"
          >
            Marketplace Dusun Kembang
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-md md:text-lg text-gray-900 mt-2"
          >
            Jelajahi produk lokal, event, wisata, dan café di Dusun Kembang.
          </motion.p>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="w-24 h-1 bg-[#1581bc] mx-auto mt-4 rounded-full origin-center"
          />
        </div>

        {/* --- FILTER BUTTONS --- */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((cat, index) => (
            <motion.button
              key={cat}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }} // Stagger effect tombol
              onClick={() => setSelectedCategory(cat as CategoryFilter)}
              className={`px-5 py-2 rounded-full text-sm font-semibold border transition-colors duration-300 cursor-pointer min-w-24 relative
                ${
                  selectedCategory === cat
                    ? "text-gray-900 border-[#1581bc] bg-gray-300c"
                    : "bg-transparent text-gray-800 border-gray-300 hover:bg-gray-200"
                }`}
            >
              {/* Background Animasi untuk tombol aktif */}
              {selectedCategory === cat && (
                <motion.div
                  layoutId="activeCategory"
                  className="absolute inset-0 bg-[#1581bc] rounded-full -z-10"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              {cat}
            </motion.button>
          ))}
        </div>

        {/* --- CARD GRID (Dengan AnimatePresence & Layout Animation) --- */}
        <motion.div
          layout // Properti sakti agar grid menyesuaikan diri dengan mulus saat item berkurang/bertambah
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10"
        >
          <AnimatePresence mode="popLayout">
            {finalData.map((item, i) => (
              <motion.div
                layout // Memungkinkan kartu bergeser posisi dengan animasi
                key={item.slug} // Gunakan ID unik atau Slug
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3 }}
                className={`bg-gray-50 rounded-2xl h-full shadow-lg hover:shadow-xl transition-shadow duration-300
                  ${i >= 3 && limit ? "hidden md:block" : ""} 
                `}
                // Catatan: logic hidden md:block di atas mungkin akan sedikit konflik dengan motion exit
                // Jika ingin animasi smooth sempurna di mobile, sebaiknya atur limit via JS bukan CSS hidden.
              >
                <Link
                  href={`/marketplace/${item.slug}`}
                  className="block h-full overflow-hidden rounded-2xl group"
                >
                  {/* Gambar */}
                  <div className="relative w-full h-56 overflow-hidden">
                    <Image
                      src={item.imageUrl ?? "/placeholder.png"}
                      alt={item.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    {/* Overlay Kategori di pojok gambar */}
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-[#1581bc] shadow-sm">
                      {item.category}
                    </div>
                  </div>

                  {/* Konten Text */}
                  <div className="p-5 flex flex-col justify-between h-[calc(100%-14rem)]">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 group-hover:text-[#1581bc] transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-gray-500 text-sm mt-2 line-clamp-2">
                        {item.description}
                      </p>
                    </div>

                    {/* Tombol panah kecil atau indikator */}
                    <div className="mt-4 flex items-center text-[#1581bc] text-sm font-semibold opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                      Lihat Detail →
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* --- EMPTY STATE --- */}
        {finalData.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20 text-gray-500"
          >
            Tidak ada item di kategori ini.
          </motion.div>
        )}

        {/* --- TOMBOL LIHAT SEMUA --- */}
        {limit && items.length > limit && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-16 text-center"
          >
            <Link
              href="/marketplace"
              className="inline-block px-8 py-3 bg-[#1581bc] text-white font-semibold rounded-full shadow-lg hover:bg-[#1895d9] hover:-translate-y-1 hover:shadow-xl transition-all duration-300"
            >
              Lihat Semua Marketplace
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  );
}
