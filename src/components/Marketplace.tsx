"use client";

import Image from "next/image";
import { useState } from "react";

import rectangle from "../assets/rectangle.png";
import umkm1 from "../assets/gallery1.png";
import umkm2 from "../assets/gallery3.png";
import wisata1 from "../assets/gallery2.png";
import cafe1 from "../assets/gallery4.png";
import event1 from "../assets/gallery5.png";

export default function Marketplace() {
  const [selectedCategory, setSelectedCategory] = useState("Semua");

  const data = [
    {
      id: 1,
      title: "Kopi Kembang",
      category: "UMKM",
      desc: "Kopi lokal khas Dusun Kembang hasil olahan warga.",
      image: umkm1,
    },
    {
      id: 2,
      title: "Toko Batik Bunga Desa",
      category: "UMKM",
      desc: "Kerajinan batik dengan motif khas daerah.",
      image: umkm2,
    },
    {
      id: 3,
      title: "Bukit Senja",
      category: "Wisata",
      desc: "Destinasi wisata alam dengan panorama sunset indah.",
      image: wisata1,
    },
    {
      id: 4,
      title: "Warung Kopi Pinggir Jalan",
      category: "Café",
      desc: "Tempat nongkrong santai dengan suasana pedesaan.",
      image: cafe1,
    },
    {
      id: 5,
      title: "Festival Panen Raya",
      category: "Event",
      desc: "Perayaan hasil panen warga dengan berbagai lomba.",
      image: event1,
    },
  ];

  const categories = ["Semua", "UMKM", "Wisata", "Café", "Event"];

  const filteredData =
    selectedCategory === "Semua"
      ? data
      : data.filter((item) => item.category === selectedCategory);

  return (
    <section className="py-20 bg-gray-950">
      <div className="container mx-auto px-4 sm:px-10 xl:px-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-100">
            Marketplace Dusun Kembang
          </h2>
          <p className="text-md md:text-lg text-gray-400 mt-2">
            Jelajahi produk lokal, event, dan destinasi menarik di sekitar Dusun
            Kembang.
          </p>
          <div className="w-24 h-1 bg-lime-500 mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Filter kategori tetap ada */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2 rounded-full text-sm font-semibold border transition-all duration-300 ${
                selectedCategory === cat
                  ? "bg-lime-500 text-gray-900 border-lime-500"
                  : "bg-transparent text-gray-300 border-gray-600 hover:bg-gray-800"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredData.map((item) => (
            <div
              key={item.id}
              className="relative group cursor-pointer transition-transform duration-500 hover:-translate-y-2"
            >
              <div className="relative w-full h-[200px] sm:h-[380px] overflow-hidden rounded-2xl shadow-lg">
                {/* Background Rectangle */}
                <Image
                  src={rectangle}
                  alt="Card background"
                  fill
                  className="object-contain z-0"
                />

                {/* Konten utama */}
                <div className="absolute inset-0 z-10 flex flex-col items-center justify-start p-1 lg:p-5">
                  <div className="relative w-full h-20 lg:h-40 overflow-hidden rounded-xl mt-2">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>

                  <div className="mt-4 text-center px-2">
                    <h3 className="text-xs lg:text-lg font-bold text-gray-900">
                      {item.title}
                    </h3>
                    <p className="text-xs text-gray-600 mt-1">{item.desc}</p>
                  </div>
                </div>

                {/* Badge kategori di pojok kanan bawah */}
                <span className="absolute bottom-[103px] -right-3 z-20 px-3 py-1 text-[10px] text-xs font-semibold  text-lime-300 rounded-full shadow-md">
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
