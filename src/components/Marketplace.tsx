"use client";

import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import { trpc } from "@/trpc/client";
import { MarketplaceItem } from "@/types";

type CategoryFilter = "Semua" | "UMKM" | "Wisata" | "Cafe" | "Event";

export default function Marketplace({ limit }: { limit?: number }) {
  const [selectedCategory, setSelectedCategory] =
    useState<CategoryFilter>("Semua");

  // Ambil data dari server
  const { data: items = [], isLoading } = trpc.marketplace.list.useQuery();

  // Loading UI
  if (isLoading) {
    return (
      <div className="text-center text-gray-400 py-20">
        Memuat data marketplace...
      </div>
    );
  }

  const categories = ["Semua", "UMKM", "Wisata", "Cafe", "Event"];

  // Filter kategori
  const filtered: MarketplaceItem[] =
    selectedCategory === "Semua"
      ? items
      : items.filter(
          (item: MarketplaceItem) => item.category === selectedCategory
        );

  // Homepage → tampilkan maksimal 6 item
  const finalData = limit ? filtered.slice(0, limit) : filtered;

  return (
    <section className="py-20 bg-gray-950 min-h-screen">
      <div className="container mx-auto px-4 sm:px-10 xl:px-20">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-100">
            Marketplace Dusun Kembang
          </h2>
          <p className="text-md md:text-lg text-gray-400 mt-2">
            Jelajahi produk lokal, event, wisata, dan café di Dusun Kembang.
          </p>
          <div className="w-24 h-1 bg-lime-500 mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Filter kategori */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((cat: string) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat as CategoryFilter)}
              className={`px-5 py-2 rounded-full text-sm font-semibold border transition-all duration-300
                ${
                  selectedCategory === cat
                    ? "bg-lime-500 text-gray-900 border-lime-500"
                    : "bg-transparent text-gray-300 border-gray-600 hover:bg-gray-800"
                }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Card List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {finalData.map((item: MarketplaceItem, i: number) => (
            <div
              key={item.id}
              className={`
        bg-gray-900 rounded-2xl overflow-hidden shadow-lg hover:-translate-y-2 transition-transform duration-300
        ${i >= 3 ? "hidden md:block" : ""} 
      `}
            >
              <div className="relative w-full h-56">
                <Image
                  src={item.imageUrl ?? "/placeholder.png"}
                  alt={item.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-5">
                <h3 className="text-lg font-bold text-gray-100">
                  {item.title}
                </h3>
                <p className="text-gray-400 text-sm mt-1">{item.description}</p>
                <span className="inline-block mt-3 px-3 py-1 text-xs font-semibold bg-lime-100 text-lime-700 rounded-full">
                  {item.category}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Tombol Lihat Semua */}
        {limit && items.length > limit && (
          <div className="mt-12 text-center">
            <Link
              href="/marketplace"
              className="inline-block px-6 py-3 bg-lime-500 text-gray-900 font-semibold rounded-full hover:bg-lime-600 transition"
            >
              Lihat Semua Marketplace
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
