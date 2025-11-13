"use client";

import Image from "next/image";
import Link from "next/link";

import gallery1 from "../assets/gallery1.png";
import gallery2 from "../assets/gallery2.png";
import gallery3 from "../assets/gallery3.png";
import gallery4 from "../assets/gallery4.png";
import gallery5 from "../assets/gallery5.png";

export default function GalleryPage() {
  const items = [
    { image: gallery1, title: "UMKM Kopi Kembang" },
    { image: gallery2, title: "Lomba 17 Agustus" },
    { image: gallery3, title: "Pasar Mingguan" },
    { image: gallery4, title: "Senam Pagi" },
    { image: gallery5, title: "Festival Panen Raya" },
    { image: gallery4, title: "Senam Pagi" },
    { image: gallery5, title: "Festival Panen Raya" },
  ];

  const imageWrapperClass =
    "relative w-[120px] sm:w-[180px] md:w-[220px] lg:w-[260px] xl:w-[320px] aspect-[3/4] rounded-3xl overflow-hidden shadow-lg transition-transform duration-500 ease-in-out";

  const itemStyles = [
    {
      transform: "rotate-[-12deg] translate-y-6 sm:translate-y-15",
      zIndex: "z-10",
    },
    {
      transform: "rotate-[-8deg] translate-y-3 sm:translate-y-7",
      zIndex: "z-20",
    },
    {
      transform: "rotate-[-4deg] translate-y-1 sm:translate-y-3",
      zIndex: "z-30",
    },
    { transform: "rotate-0 translate-y-0", zIndex: "z-40" },
    {
      transform: "rotate-[4deg] translate-y-1 sm:translate-y-3",
      zIndex: "z-30",
    },
    {
      transform: "rotate-[8deg] translate-y-3 sm:translate-y-7",
      zIndex: "z-20",
    },
    {
      transform: "rotate-[12deg] translate-y-6 sm:translate-y-15",
      zIndex: "z-10",
    },
  ];

  return (
    <section className="py-24 bg-[#f5f5ef] text-gray-900 flex flex-col items-center justify-center overflow-hidden min-h-screen">
      <h2 className="text-center leading-tight mb-24">
        <span className="block text-4xl md:text-5xl font-extrabold tracking-tight uppercase font-['Mona_Sans']">
          Galeri Kegiatan
        </span>
        <span className="block text-4xl md:text-5xl font-serif">
          Karang Taruna
        </span>
      </h2>

      <div className="flex justify-center items-end pb-12">
        {items.map((item, index) => (
          <div
            key={index}
            className={`
              ${imageWrapperClass} 
              ${itemStyles[index].transform} 
              ${itemStyles[index].zIndex}
              ${
                index > 0
                  ? "ml-[-60px] sm:ml-[-90px] md:ml-[-110px] lg:ml-[-130px] xl:-ml-40"
                  : ""
              }
              hover:scale-110 hover:!rotate-0 hover:!-translate-y-4 hover:z-50
            `}
          >
            <Image
              src={item.image}
              alt={item.title}
              fill
              className="object-cover"
            />
          </div>
        ))}
      </div>

      {/* Tombol "Lihat Semua Galeri" */}
      <Link
        href="/gallery"
        className="mt-16 px-6 py-3 bg-lime-600 hover:bg-lime-700 text-white text-sm md:text-base font-semibold rounded-full shadow-lg transition-all duration-300"
      >
        Lihat Semua Galeri
      </Link>
    </section>
  );
}
