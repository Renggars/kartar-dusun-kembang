"use client";

import Link from "next/link";

const programs = {
  "bakti-sosial": {
    title: "Bakti Sosial & Lingkungan",
    description:
      "Program yang berfokus pada kepedulian sosial dan kelestarian lingkungan. Kami rutin melakukan kegiatan bersih desa, penghijauan, dan bantuan sosial untuk masyarakat yang membutuhkan.",
    image: "https://images.unsplash.com/photo-1509099836639-18ba1795216d", // bisa diganti
  },
  "pengembangan-skill": {
    title: "Pengembangan Skill Pemuda",
    description:
      "Pelatihan bagi generasi muda untuk mengasah kemampuan public speaking, digital marketing, desain grafis, serta keahlian lain yang berguna untuk masa depan.",
    image: "https://images.unsplash.com/photo-1581090700227-1e37b190418e",
  },
  "olahraga-seni": {
    title: "Olahraga & Seni",
    description:
      "Kegiatan yang menyalurkan minat dan bakat pemuda melalui turnamen olahraga, lomba futsal, voli, dan pentas seni kreatif untuk mempererat kebersamaan.",
    image: "https://images.unsplash.com/photo-1508804185872-d7badad00f7d",
  },
};

export default function ProgramDetail({ params }) {
  const { slug } = params;
  const program = programs[slug];

  if (!program) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-2xl font-bold text-gray-700">
          Program tidak ditemukan 😢
        </h1>
      </div>
    );
  }

  return (
    <section className="py-20 px-6 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
        <img
          src={program.image}
          alt={program.title}
          className="w-full h-64 object-cover"
        />
        <div className="p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            {program.title}
          </h1>
          <p className="text-gray-700 leading-relaxed mb-8">
            {program.description}
          </p>
          <Link
            href="/program"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-700 transition-all duration-300"
          >
            ← Kembali ke Semua Program
          </Link>
        </div>
      </div>
    </section>
  );
}
