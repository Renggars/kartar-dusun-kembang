"use client";

import { trpc } from "@/trpc/client";
import Link from "next/link";

export default function Hero() {
  const { data: hero, isLoading } = trpc.hero.get.useQuery();

  if (isLoading) return <p className="w-full h-screen">Loading...</p>;

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
      <div className="relative z-10">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white mb-4">
          {title}
        </h1>
        <p className="text-lg text-gray-200 mb-8 max-w-3xl mx-auto">
          {description}
        </p>
        <Link
          href="#about"
          className="inline-block rounded-xl bg-[#1581bc] text-white px-8 py-4 font-bold hover:-translate-y-1 transition-transform duration-300 hover:shadow-xl hover:shadow-[#c4ff54]/30"
        >
          Lihat profil
        </Link>
      </div>
    </section>
  );
}
