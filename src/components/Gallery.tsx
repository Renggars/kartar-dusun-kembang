"use client";

import Image from "next/image";

import gallery1 from "../assets/gallery1.png";
import gallery2 from "../assets/gallery2.png";
import gallery3 from "../assets/gallery3.png";
import gallery4 from "../assets/gallery4.png";
import gallery5 from "../assets/gallery5.png";
import gallery6 from "../assets/gallery6.png";

export default function GalleryPage() {
  const items = [
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
    <section className="py-20 bg-gray-950">
      <div className="container mx-auto px-4 sm:px-10 xl:px-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-100">
            Galeri Kegiatan & UMKM Dusun
          </h2>
          <p className="text-md md:text-lg text-gray-400 mt-2">
            Dokumentasi kegiatan dan karya UMKM warga Dusun Kembang.
          </p>
          <div className="w-24 h-1 bg-lime-500 mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Gaya kartu seperti Marketplace (tanpa rectangle) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {items.map((item, index) => (
            <div
              key={index}
              className="bg-gray-900 rounded-2xl overflow-hidden shadow-lg hover:-translate-y-2 transition-transform duration-300"
            >
              <div className="relative w-full h-56">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-5">
                <h3 className="text-lg font-bold text-gray-100">
                  {item.title}
                </h3>
                <p className="text-gray-400 text-sm mt-1">{item.desc}</p>
                <span className="inline-block mt-3 px-3 py-1 text-xs font-semibold bg-lime-100 text-lime-700 rounded-full">
                  {item.category}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
