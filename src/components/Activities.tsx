// app/components/Activities.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, Variants } from "framer-motion";
import { ProgramItem } from "@/types";
import { trpc } from "@/trpc/client";
import { useEffect } from "react";
import { useLoadingContext } from "@/context/LoadingContext";

// --- VARIAN ANIMASI ---
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1, // Setiap item kartu akan muncul bergantian
      delayChildren: 0.2, // Penundaan sebelum animasi kartu dimulai
    },
  },
};

const cardVariants: Variants = {
  hidden: { y: 50, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 10,
    },
  },
};

const buttonVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      delay: 0.5, // Muncul setelah kartu
      type: "spring",
      stiffness: 100,
      damping: 10,
    },
  },
};

export default function Activities() {
  // --- STATE & CONTEXT ---
  const { setActivitiesReady } = useLoadingContext();

  // --- FETCH DATA MENGGUNAKAN TRPC ---
  const {
    data: programs = [],
    isLoading,
    isError,
  } = trpc.program.list.useQuery({
    take: 3, // Ambil hanya 3 item untuk beranda
  });

  // --- EFFECT UNTUK LOADING CONTEXT ---
  useEffect(() => {
    // Panggil setActivitiesReady(true) setelah data selesai dimuat (isLoading menjadi false)
    if (!isLoading) {
      setActivitiesReady(true);
    }
  }, [isLoading, setActivitiesReady]);

  const activitiesData: ProgramItem[] = programs;

  if (isLoading) {
    return (
      <div className="py-20 bg-white min-h-[50vh] flex items-center justify-center invisible">
        <div className="w-8 h-8 border-4 border-[#1581bc] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (isError) {
    return (
      <section id="activities" className="pt-20 pb-10 bg-white">
        <div className="container mx-auto px-6 lg:px-12 text-center">
          <p className="text-xl text-red-600">
            Terjadi kesalahan saat memuat data program.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section id="activities" className="pt-20 pb-10 bg-white overflow-hidden">
      {" "}
      {/* overflow-hidden untuk animasi masuk */}
      <div className="container mx-auto px-6 lg:px-12">
        {/* Judul Section (Animasi sederhana) */}
        <motion.div
          className="text-center mb-8 md:mb-12"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-4xl md:text-6xl font-extrabold uppercase tracking-tighter text-black mb-4 text-center">
            Program & Kegiatan
          </h2>
          <p className="text-lg text-gray-600 mt-2">
            Semua program dan kegiatan kerja unggulan yang kami selenggarakan.
          </p>
          <div className="w-24 h-1 bg-[#1581bc] mx-auto mt-4" />
        </motion.div>

        {/* Kartu Kegiatan (Container dengan Stagger Effect) */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }} // Animasi saat masuk viewport
        >
          {activitiesData.map((item: ProgramItem) => (
            <motion.div
              key={item.id}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
              variants={cardVariants} // Setiap kartu akan menggunakan varian ini
            >
              <div className="relative h-48 md:h-52 xl:h-56 w-full">
                <Image
                  src={item.imageUrl || "/placeholder-400x300.png"}
                  alt={item.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  priority={false} // Atur ke true jika ini bagian pertama di halaman
                />
              </div>
              <div className="p-6">
                <p className="text-gray-500 mb-1 text-sm">
                  {new Date(item.date).toLocaleDateString("id-ID", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-3 text-base">
                  {item.description}
                </p>
                <Link
                  href={`/program/${item.slug}`}
                  className="inline-block bg-[#1581bc] text-white py-2 px-4 rounded-xl font-semibold hover:bg-opacity-90 hover:shadow-lg transition-all duration-300 text-sm"
                >
                  Lihat Detail
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="text-center mt-12"
          variants={buttonVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
        >
          <Link
            href="/program"
            className="relative inline-block bg-[#1581bc] text-white font-semibold px-10 py-4 rounded-full shadow-md hover:-translate-y-1 hover:shadow-lg transition-all duration-300 text-lg overflow-hidden group"
          >
            <div className="absolute bg-white/20 inset-0 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />

            <span className="relative z-10">Lihat Semua Program</span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
