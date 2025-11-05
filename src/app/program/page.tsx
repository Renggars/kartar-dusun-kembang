"use client";

import Link from "next/link";

const programs = [
  {
    slug: "bakti-sosial",
    title: "Bakti Sosial & Lingkungan",
    description:
      "Kegiatan peduli sosial dan lingkungan melalui aksi nyata masyarakat.",
  },
  {
    slug: "pengembangan-skill",
    title: "Pengembangan Skill Pemuda",
    description:
      "Pelatihan dan workshop untuk meningkatkan kemampuan pemuda di berbagai bidang.",
  },
  {
    slug: "olahraga-seni",
    title: "Olahraga & Seni",
    description:
      "Turnamen dan pertunjukan seni untuk mempererat solidaritas antarwarga.",
  },
];

export default function ProgramPage() {
  return (
    <section className="py-20 px-6 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">
          Semua Program & Kegiatan
        </h1>
        <p className="text-gray-600 mb-12">
          Berbagai kegiatan positif yang kami laksanakan untuk masyarakat.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {programs.map((program) => (
            <div
              key={program.slug}
              className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
            >
              <h3 className="text-xl font-bold mb-3 text-gray-800">
                {program.title}
              </h3>
              <p className="text-gray-600 mb-6">{program.description}</p>
              <Link
                href={`/program/${program.slug}`}
                className="inline-block bg-blue-600 text-white px-5 py-2 rounded-full font-semibold hover:bg-blue-700 transition-all"
              >
                Detail Program →
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
