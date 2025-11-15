"use client";

import Link from "next/link";
import Image from "next/image";
import { trpc } from "@/trpc/client";
import { ProgramItem } from "@/types";

export default function Activities() {
  const { data: programs, isLoading } = trpc.program.list.useQuery({
    take: 3,
  });

  if (isLoading) {
    return (
      <section className="pt-20 pb-10 bg-gray-50">
        <div className="container mx-auto px-6 text-center">Loading...</div>
      </section>
    );
  }

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
          {programs?.map((item: ProgramItem) => (
            <div
              key={item.id}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
            >
              <div className="relative h-48 md:h-52 xl:h-56 w-full">
                <Image
                  src={item.imageUrl || "/placeholder-400x300.png"}
                  alt={item.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <p className="text-gray-500 mb-1">
                  {new Date(item.date).toLocaleDateString("id-ID")}
                </p>
                <h3 className="text-lg font-bold text-gray-800 mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {item.description}
                </p>
                <Link
                  href={`/program/${item.slug}`}
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
