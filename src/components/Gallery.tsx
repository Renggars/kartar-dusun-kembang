"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion"; // Import Framer Motion

import gallery1 from "../assets/gallery1.png";
import gallery2 from "../assets/gallery2.png";
import gallery3 from "../assets/gallery3.png";
import gallery4 from "../assets/gallery4.png";
import gallery5 from "../assets/gallery5.png";

// Konfigurasi posisi kartu (Pengganti itemStyles Tailwind)
// Kita ubah ke angka agar bisa dianimasikan dengan halus oleh Framer Motion
const cardConfig = [
  { rotate: -12, y: 60, zIndex: 5 },
  { rotate: -8, y: 30, zIndex: 10 },
  { rotate: -4, y: 10, zIndex: 15 },
  { rotate: 0, y: 0, zIndex: 20 }, // Pusat (Index 3)
  { rotate: 4, y: 10, zIndex: 15 },
  { rotate: 8, y: 30, zIndex: 10 },
  { rotate: 12, y: 60, zIndex: 5 },
];

export default function GalleryPage() {
  const items = [
    { image: gallery1, title: "UMKM Kopi Kembang" },
    { image: gallery2, title: "Lomba 17 Agustus" },
    { image: gallery3, title: "Pasar Mingguan" },
    { image: gallery4, title: "Senam Pagi" },
    { image: gallery5, title: "Festival Panen Raya" },
    { image: gallery4, title: "Senam Pagi" },
    { image: gallery5, title: "Festival Panen Raya" },
  ];

  const imageWrapperClass =
    "relative w-[120px] sm:w-[180px] md:w-[220px] lg:w-[260px] xl:w-[320px] aspect-[3/4] rounded-3xl overflow-hidden shadow-lg cursor-pointer";

  return (
    <section
      id="gallery"
      className="py-24 bg-[#f5f5ef] text-gray-900 flex flex-col items-center justify-center overflow-hidden min-h-screen"
    >
      {/* Judul dengan animasi fade-in sederhana */}
      <motion.h2
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center leading-tight mb-24"
      >
        <span className="block text-4xl md:text-5xl font-extrabold tracking-tight uppercase font-['Mona_Sans']">
          Galeri Kegiatan
        </span>
        <span className="block text-4xl md:text-5xl font-serif">
          Karang Taruna
        </span>
      </motion.h2>
      {/* Container Kartu */}
      <div className="flex justify-center items-end pb-12 relative">
        {items.map((item, index) => {
          const config = cardConfig[index];
          const centerIndex = 3; // Index elemen tengah

          return (
            <motion.div
              key={index}
              className={`
                ${imageWrapperClass}
                /* Margin negatif tetap ditangani Tailwind untuk layout responsif */
                ${
                  index > 0
                    ? "ml-[-60px] sm:ml-[-90px] md:ml-[-110px] lg:ml-[-130px] xl:-ml-40"
                    : ""
                }
              `}
              style={{ zIndex: config.zIndex }} // Z-index tetap static style
              // --- LOGIKA ANIMASI ---
              initial={{
                opacity: 0,
                rotate: 0, // Mulai tegak lurus
                y: 0, // Mulai sejajar vertikal

                // Trik "Stacking":
                // Kita tarik element kiri ke kanan (+), dan kanan ke kiri (-)
                // agar seolah-olah semua bertumpuk di tengah (index 3) saat awal.
                x: (centerIndex - index) * 100,
                scale: 0.8, // Mulai sedikit kecil
              }}
              whileInView={{
                opacity: 1,
                rotate: config.rotate, // Putar ke posisi asli
                y: config.y, // Turun ke posisi asli
                x: 0, // Kembali ke posisi layout margin asli
                scale: 1,
              }}
              viewport={{ once: true, amount: 0.3 }} // Animasi jalan saat 30% terlihat
              transition={{
                type: "spring",
                stiffness: 60, // Kekakuan pegas (makin tinggi makin cepat)
                damping: 15, // Redaman (biar tidak terlalu memantul)
                delay: 0.1 + Math.abs(centerIndex - index) * 0.1, // Delay bergelombang dari tengah
              }}
              // --- INTERAKSI HOVER ---
              whileHover={{
                scale: 1.1, // Zoom in
                rotate: 0, // Tegakkan kartu
                y: -20, // Angkat sedikit ke atas
                zIndex: 50, // Pastikan paling depan
                transition: { duration: 0.3 },
              }}
            >
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 33vw, 20vw"
              />

              {/* Overlay Gelap Tipis (Opsional, biar lebih fokus saat hover) */}
              <div className="absolute inset-0 bg-black/0 hover:bg-black/10 transition-colors duration-300" />
            </motion.div>
          );
        })}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.8, duration: 0.5 }}
        className="mt-16"
      >
        <Link
          href="/gallery"
          className="relative inline-block px-8 py-4 bg-[#1581bc] text-white text-sm md:text-base font-semibold rounded-full shadow-lg transition-all duration-300 overflow-hidden group"
        >
          <div className="absolute bg-white/20 inset-0 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />

          <span className="relative z-10">Lihat Semua Galeri</span>
        </Link>
      </motion.div>
    </section>
  );
}
