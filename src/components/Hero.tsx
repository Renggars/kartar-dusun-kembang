// components/Hero.jsx (Diperbarui dengan Framer Motion)
"use client";

import { useLoadingContext } from "@/context/LoadingContext";
import { trpc } from "@/trpc/client";
import Link from "next/link";
import { useEffect } from "react";
import { motion, Variants } from "motion/react";

const itemVariants: Variants = {
  initial: { y: 20, opacity: 0 },
  animate: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 100, damping: 20, duration: 0.5 },
  },
};

// Definisikan Varian untuk Container (Stagger Effect)
// Ini memastikan elemen anak (Judul, Deskripsi, Tombol) muncul secara berurutan
const containerVariants: Variants = {
  animate: {
    transition: {
      staggerChildren: 0.2, // Jeda 0.2 detik antar elemen
      delayChildren: 0.1, // Mulai animasi 0.1 detik setelah Hero Section muncul
    },
  },
};

export default function Hero() {
  const { setHeroReady } = useLoadingContext();

  const { data: hero, isLoading } = trpc.hero.get.useQuery();

  useEffect(() => {
    if (!isLoading) {
      setHeroReady(true);
    }
  }, [isLoading, setHeroReady]);

  // Jika data masih loading (sebelum splash screen hilang), tampilkan placeholder tak terlihat
  if (isLoading)
    return <section id="beranda" className="h-screen invisible"></section>;

  // Jika data kosong setelah loading selesai, tampilkan null (atau fallback)
  if (!hero) return null;

  const title = hero?.title || "Karang Taruna Bhakti Pertiwi";
  const description =
    hero?.description ||
    "Membangun Generasi Muda Dusun Kembang yang Kreatif, Inovatif, dan Berkarakter.";
  const imageUrl = hero?.imageUrl || "/hero.jpg";

  const heroStyle = {
    backgroundImage: `linear-gradient(to top, rgba(18,18,18,0.8), rgba(138,43,226,0.3), rgba(255,20,147,0.3)), url('${imageUrl}')`,
  };

  return (
    <section
      id="beranda"
      className="relative h-screen flex items-center justify-center text-center bg-cover bg-center px-4"
      style={heroStyle}
    >
      {/* Menggunakan motion.div sebagai Container untuk Stagger Effect */}
      <motion.div
        className="relative z-10"
        variants={containerVariants}
        initial="initial"
        animate="animate"
      >
        {/* JUDUL: Menggunakan motion.h1 dengan Varian Item */}
        <motion.h1
          className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white mb-4"
          variants={itemVariants}
        >
          {title}
        </motion.h1>

        {/* DESKRIPSI: Menggunakan motion.p dengan Varian Item (akan muncul setelah Judul karena Stagger) */}
        <motion.p
          className="text-lg text-gray-200 mb-8 max-w-3xl mx-auto"
          variants={itemVariants}
        >
          {description}
        </motion.p>

        {/* TOMBOL: Menggunakan Link yang dibungkus motion.div dengan Varian Item (akan muncul terakhir) */}
        <motion.div variants={itemVariants}>
          <Link
            href="#about"
            className="inline-block rounded-xl bg-[#1581bc] text-white px-8 py-4 font-bold hover:-translate-y-1 transition-transform duration-300 hover:shadow-xl hover:shadow-[#1581bc]/30"
          >
            Lihat profil
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
