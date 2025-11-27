// components/Hero.jsx
"use client";

import Link from "next/link";
import { motion, Variants } from "motion/react";

// --- VARIAN ANIMASI ---
const itemVariants: Variants = {
  initial: { y: 20, opacity: 0 },
  animate: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 100, damping: 20, duration: 0.5 },
  },
};

const containerVariants: Variants = {
  animate: {
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

export default function Hero() {
  // --- DATA STATIC ---
  const title = "Karang Taruna Bhakti Pertiwi";
  const description =
    "Membangun Generasi Muda Dusun Kembang yang Kreatif, Inovatif, dan Berkarakter.";
  const imageUrl = "/hero.jpg";

  const heroStyle = {
    backgroundImage: `linear-gradient(to top, rgba(18,18,18,0.8), rgba(138,43,226,0.3), rgba(255,20,147,0.3)), url('${imageUrl}')`,
  };
  // const heroStyle = {
  //   backgroundImage: `url('${imageUrl}'`,
  // };

  return (
    <section
      id="home"
      className="relative h-screen flex items-center justify-center text-center bg-cover bg-center px-4"
      style={heroStyle}
    >
      {/* Container Animasi */}
      <motion.div
        className="relative z-10"
        variants={containerVariants}
        initial="initial"
        animate="animate"
      >
        {/* JUDUL */}
        <motion.h1
          className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white mb-4"
          variants={itemVariants}
        >
          {title}
        </motion.h1>

        {/* DESKRIPSI */}
        <motion.p
          className="text-lg text-gray-200 mb-8 max-w-3xl mx-auto"
          variants={itemVariants}
        >
          {description}
        </motion.p>

        <motion.div variants={itemVariants}>
          <Link
            href="#about"
            className="relative inline-block rounded-xl bg-[#1581bc] text-white px-8 py-4 font-bold overflow-hidden group hover:-translate-y-1 transition-transform duration-300 hover:shadow-xl hover:shadow-[#1581bc]/30"
          >
            <div className="absolute bg-white/1]20 inset-0 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />

            <span className="relative z-10">Lihat profil</span>
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
