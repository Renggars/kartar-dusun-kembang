"use client";

import Image from "next/image";
import Link from "next/link";

import rectangle from "../../../public/rectangle.png";
import gallery1 from "../../../public/gallery1.png";
import gallery2 from "../../../public/gallery2.png";
import gallery3 from "../../../public/gallery3.png";
import gallery4 from "../../../public/gallery4.png";
import gallery5 from "../../../public/gallery5.png";
import gallery6 from "../../../public/gallery6.png";

export default function GalleryPage() {
  const galleries = [
    {
      image: gallery1,
      title: "UMKM Kopi Kembang",
      category: "UMKM",
      desc: "Kopi asli hasil olahan warga Dusun Kembang.",
    },
    {
      image: gallery2,
      title: "Lomba 17 Agustus",
      category: "Event",
      desc: "Kemeriahan lomba perayaan HUT RI bersama warga.",
    },
    {
      image: gallery3,
      title: "Pasar Mingguan",
      category: "UMKM",
      desc: "Kegiatan jual beli hasil bumi dan kerajinan lokal.",
    },
    {
      image: gallery4,
      title: "Senam Pagi",
      category: "Event",
      desc: "Kegiatan rutin setiap Minggu pagi di lapangan dusun.",
    },
    {
      image: gallery5,
      title: "Rapat Karang Taruna",
      category: "Organisasi",
      desc: "Diskusi dan perencanaan program Karang Taruna.",
    },
    {
      image: gallery6,
      title: "Bazar Produk Lokal",
      category: "UMKM",
      desc: "Pameran produk lokal karya pemuda Dusun Kembang.",
    },
  ];

  return (
    <section className="py-20 bg-gray-950 min-h-screen">
      <div className="container mx-auto px-4 sm:px-10 xl:px-20">
        {/* Judul Halaman */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-100">
            Galeri Kegiatan & UMKM Dusun Kembang
          </h1>
          <p className="text-md md:text-lg text-gray-400 mt-2">
            Dokumentasi lengkap kegiatan sosial, event, dan karya UMKM warga
            Dusun Kembang.
          </p>
          <div className="w-24 h-1 bg-lime-500 mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Grid Galeri */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {galleries.map((item, index) => (
            <div
              key={index}
              className="relative group transition-transform duration-500 hover:-translate-y-2"
            >
              {/* Background Rectangle */}
              <div className="relative w-full h-[380px] sm:h-[400px]">
                <Image
                  src={rectangle}
                  alt="Card background"
                  fill
                  className="object-contain z-0"
                />

                {/* Isi kartu */}
                <div className="absolute inset-0 z-10 flex flex-col items-center justify-start p-5">
                  <div className="relative w-full h-48 overflow-hidden rounded-xl mt-2">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>

                  <div className="mt-4 text-center">
                    <h3 className="text-lg font-bold text-gray-100">
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-400 mt-1">{item.desc}</p>
                    <span className="inline-block mt-2 px-3 py-1 text-xs font-semibold bg-lime-100 text-lime-700 rounded-full">
                      {item.category}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Tombol Kembali */}
        <div className="text-center mt-16">
          <Link
            href="/#galeri"
            className="inline-block bg-lime-500 text-gray-900 font-semibold px-6 py-3 rounded-full shadow-md hover:bg-lime-400 hover:-translate-y-1 transition-all duration-300"
          >
            ← Kembali ke Beranda
          </Link>
        </div>
      </div>
    </section>
  );
}
