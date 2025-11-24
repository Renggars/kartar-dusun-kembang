"use client";

import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { useState } from "react";
// Import Lucide icons untuk modal
import { X, ArrowLeft, Image as ImageIcon } from "lucide-react";

// Import asset lokal (sesuaikan path)
import gallery1 from "../../assets/gallery1.png";
import gallery2 from "../../assets/gallery2.png";
import gallery3 from "../../assets/gallery3.png";
import gallery4 from "../../assets/gallery4.png";
import gallery5 from "../../assets/gallery5.png";
import gallery6 from "../../assets/gallery6.png";

// Tipe Item Galeri untuk kejelasan
type GalleryItem = {
  image: StaticImageData;
  title: string;
  category: string;
  desc: string;
};

export default function GalleryPage() {
  const galleries: GalleryItem[] = [
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
  ]; // --- STATE UNTUK MODAL ---

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<StaticImageData | null>(
    null
  );
  const [selectedTitle, setSelectedTitle] = useState("");

  const openModal = (image: StaticImageData, title: string) => {
    setSelectedImage(image);
    setSelectedTitle(title);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedImage(null);
    setSelectedTitle("");
  };

  return (
    <section className="pt-20 pb-24 bg-white min-h-screen text-black">
      <div className="container mx-auto sm:px-6 lg:px-12">
        {/*  HEADER SECTION (Style Marketplace: Bold & Uppercase) */}

        <div className="text-center mb-10 md:mb-16">
          <h1 className="text-4xl md:text-6xl font-extrabold uppercase tracking-tighter text-black mb-4">
            GALERI KEGIATAN & UMKM
          </h1>
          <p className="text-gray-600 max-w-xl mx-auto text-sm md:text-base font-medium px-4">
            Dokumentasi kegiatan karang taruna dusun Kembang.
          </p>
        </div>
        {/* GALLERY GRID (3 Col Desktop) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10 md:gap-12 px-4">
          {galleries.map((item, index) => (
            <div
              key={index}
              className="group flex flex-col h-full cursor-pointer"
              onClick={() => openModal(item.image, item.title)}
            >
              <div className="relative bg-[#F4F4F4] aspect-4/3 w-full overflow-hidden rounded-xl mb-4 shadow-lg">
                <div className="absolute top-3 right-3 z-10">
                  <span className="inline-block px-3 py-1 text-[10px] font-black tracking-widest uppercase bg-black text-white rounded-sm">
                    {item.category}
                  </span>
                </div>
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <ImageIcon className="w-8 h-8 text-white" />
                </div>
              </div>
              <div className="flex flex-col items-start">
                <h3 className="text-md md:text-lg font-bold text-black uppercase leading-tight group-hover:underline decoration-1 underline-offset-4 mb-1">
                  {item.title}
                </h3>

                <p className="text-xs text-gray-500 line-clamp-2">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-16">
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-black text-white font-bold px-8 py-3 rounded-full shadow-lg hover:bg-gray-800 hover:-translate-y-0.5 transition-all duration-300 uppercase tracking-wider"
          >
            <ArrowLeft className="w-4 h-4" /> Kembali ke Beranda
          </Link>
        </div>
      </div>

      {/* --- MODAL COMPONENT (Pop-up Gambar) --- */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/10 backdrop-blur-sm backdrop-brightness-90 p-2 sm:p-4"
          onClick={closeModal}
        >
          <div
            className="relative w-full max-w-md sm:max-w-2xl lg:max-w-4xl"
            onClick={(e) => e.stopPropagation()} // Cegah penutupan saat klik di dalam modal
          >
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-1 right-1 sm:-top-4 sm:-right-4 z-50 p-2 sm:p-3 bg-white text-black rounded-full shadow-lg hover:scale-110 transition cursor-pointer"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            {/* Modal Card */}
            <div className="bg-white/90 backdrop-blur-xl rounded-xl sm:rounded-2xl shadow-2xl overflow-hidden">
              <div className="relative w-full h-[50vh] sm:h-[65vh] lg:h-[75vh] bg-gray-100">
                {/* selectedImage pasti bertipe StaticImageData */}
                {selectedImage && (
                  <Image
                    src={selectedImage}
                    alt={selectedTitle}
                    fill
                    className="object-contain"
                  />
                )}
              </div>

              {/* Title Section */}
              <div className="px-4 sm:px-6 py-3 sm:py-4 text-center bg-white">
                <h3 className="text-sm sm:text-lg md:text-xl font-bold uppercase tracking-wider text-gray-800">
                  {selectedTitle}
                </h3>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
