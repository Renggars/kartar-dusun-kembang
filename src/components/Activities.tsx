"use client";

import Link from "next/link";
import Image from "next/image";

const activities = [
  {
    title: "Pelatihan Keterampilan Digital",
    date: "28 Agustus 2025",
    description:
      "Workshop untuk meningkatkan literasi digital dan keterampilan coding bagi pemuda desa.",
    image: "https://images.unsplash.com/photo-1581091215360-6df03e0c6af5",
    href: "/program/pengembangan-skill",
  },
  {
    title: "Kerja Bakti Lingkungan",
    date: "28 Agustus 2025",
    description:
      "Kegiatan gotong royong membersihkan area desa, selokan, dan fasilitas umum setiap bulan.",
    image: "https://images.unsplash.com/photo-1590490360182-c33d57733427",
    href: "/program/bakti-sosial",
  },
  {
    title: "Turnamen Olahraga Antar RW",
    date: "28 Agustus 2025",
    description:
      "Turnamen futsal dan bulu tangkis untuk mempererat persaudaraan antarwarga desa.",
    image: "https://images.unsplash.com/photo-1521412644187-c49fa049e84d",
    href: "/program/olahraga-seni",
  },
];

export default function Activities() {
  return (
    <section className="pt-20 pb-10 bg-gray-50">
      <div className="container mx-auto px-6">
        {/* Judul Section */}
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
            Program & kegiatan
          </h2>
          <p className="text-lg text-gray-600 mt-2">
            Semua program dan kegiatan kerja unggulan yang kami selenggarakan.
          </p>
          <div className="w-24 h-1 bg-blue-600 mx-auto mt-4" />
        </div>

        {/* Kartu Kegiatan */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
          {activities.map((item, i) => (
            <div
              key={i}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
            >
              <div className="relative h-48 md:h-52 xl:h-56 w-full">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <p className=" text-gray-500 mb-1">{item.date}</p>
                <h3 className="text-lg font-bold text-gray-800 mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600 mb-4">{item.description}</p>
                <Link
                  href={item.href}
                  className="bg-blue-500 text-white py-1 px-2 rounded-md font-semibold hover:bg-blue-600 cursor-pointer"
                >
                  Lihat Detail
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Tombol Lihat Semua */}
        <div className="text-center mt-8">
          <Link
            href="/program"
            className="inline-block bg-blue-600 text-white font-semibold px-8 py-3 rounded-full shadow-md hover:bg-blue-700 hover:-translate-y-1 transition-all duration-300"
          >
            Lihat Semua Program
          </Link>
        </div>
      </div>
    </section>
  );
}
