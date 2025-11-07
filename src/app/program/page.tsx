"use client";

import Link from "next/link";
import Image from "next/image";

const programs = [
  {
    slug: "bakti-sosial",
    title: "Bakti Sosial & Lingkungan",
    date: "28 Agustus 2025",
    description:
      "Program kepedulian sosial seperti kerja bakti, penghijauan, dan bantuan masyarakat.",
    image: "https://images.unsplash.com/photo-1590490360182-c33d57733427",
  },
  {
    slug: "pengembangan-skill",
    title: "Pengembangan Skill Pemuda",
    date: "28 Agustus 2025",
    description:
      "Pelatihan digital, public speaking, dan kewirausahaan untuk generasi muda.",
    image: "https://images.unsplash.com/photo-1581091215360-6df03e0c6af5",
  },
  {
    slug: "turnamen-olahraga",
    title: "Turnamen Olahraga Antar RW",
    date: "28 August 2025",
    description:
      "Menyelenggarakan turnamen futsal dan bulu tangkis untuk mempererat persaudaraan antarwarga desa.",
    image: "https://images.unsplash.com/photo-1508804185872-d7badad00f7d",
  },
];

export default function ProgramPage() {
  return (
    <section className="bg-gray-50 min-h-screen">
      {/* Header Section */}
      <div className="bg-blue-600 text-white px-5 pt-20 pb-10 text-center shadow-lg">
        <h1 className="text-4xl font-bold mb-3">Program & Kegiatan</h1>
        <p className="text-lg text-blue-100">
          Semua agenda dan program kerja unggulan yang kami selenggarakan.
        </p>
      </div>

      <div className="mx-auto px-6 py-6 md:py-10">
        {/* Grid Program */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {programs.map((program) => (
            <div
              key={program.slug}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
            >
              <div className="relative h-48 md:h-52 xl:h-56 w-full">
                <Image
                  src={program.image}
                  alt={program.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <p className="text-xs text-gray-500 mb-1">{program.date}</p>
                <h3 className="text-lg font-bold text-gray-800 mb-2">
                  {program.title}
                </h3>
                <p className="text-gray-600 mb-4">{program.description}</p>
                <Link
                  href={`/program/${program.slug}`}
                  className="bg-blue-500 text-white py-1 px-2 rounded-md font-semibold hover:bg-blue-600 cursor-pointer"
                >
                  Lihat Detail
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
