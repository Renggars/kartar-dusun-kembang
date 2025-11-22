// app/components/Activities.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
// import { ProgramItem } from "@/types"; // Import ProgramItem interface
import { motion, Variants } from "framer-motion"; // Ganti 'motion/react' ke 'framer-motion'

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

interface ProgramItemsTes {
  id: number;
  date: string; // Format ISO string, misal '2025-11-15T00:00:00.000Z'
  title: string;
  description: string;
  imageUrl: string | null;
  slug: string;
}

export default function Activities() {
  // --- DATA STATIS ---
  const staticPrograms: ProgramItemsTes[] = [
    {
      id: 1,
      date: "2025-11-15T00:00:00.000Z",
      title: "Turnamen Olahraga Antar RW",
      description:
        "Turnamen futsal dan bulu tangkis untuk mempererat persaudaraan antarwarga desa serta meningkatkan sportifitas.",
      imageUrl: "/gallery1.png",
      slug: "turnamen-olahraga-antar-rw",
    },
    {
      id: 2,
      date: "2025-11-20T00:00:00.000Z",
      title: "Kerja Bakti Lingkungan",
      description:
        "Kegiatan gotong royong membersihkan area desa, selokan, dan fasilitas umum setiap bulan untuk menjaga kebersihan.",
      imageUrl: "/gallery1.png", // Pastikan gambar ini ada di public/
      slug: "",
    },
    {
      id: 3,
      date: "2025-12-01T00:00:00.000Z",
      title: "Pelatihan Keterampilan Digital",
      description:
        "Workshop untuk meningkatkan literasi digital dan keterampilan coding bagi pemuda desa agar siap menghadapi era digital.",
      imageUrl: "/gallery1.png", // Pastikan gambar ini ada di public/
      slug: "pelatihan-keterampilan-digital",
    },
    // Tambahkan lebih banyak item jika diperlukan
  ];

  return (
    <section id="activities" className="pt-20 pb-10 bg-gray-50 overflow-hidden">
      {" "}
      {/* overflow-hidden untuk animasi masuk */}
      <div className="container mx-auto px-6">
        {/* Judul Section (Animasi sederhana) */}
        <motion.div
          className="text-center mb-8 md:mb-12"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
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
          {staticPrograms.map((item: ProgramItemsTes) => (
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
