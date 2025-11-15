"use client";

import Link from "next/link";
import Image from "next/image";
import { trpc } from "@/trpc/client";

export default function ProgramPage() {
  const { data: programs, isLoading } = trpc.program.list.useQuery();

  if (isLoading) {
    return (
      <section className="bg-gray-50 min-h-screen">
        {/* Header Section */}
        <div className="bg-blue-600 text-white px-5 pt-20 pb-10 text-center shadow-lg">
          <h1 className="text-4xl font-bold mb-3">Program & Kegiatan</h1>
          <p className="text-lg text-blue-100">
            Semua agenda dan program kerja unggulan yang kami selenggarakan.
          </p>
        </div>
        <div className="p-6 text-center">Loading...</div>
      </section>
    );
  }

  return (
    <section className="bg-gray-50 min-h-screen">
      {/* Header Section */}
      <div className="bg-blue-600 text-white px-5 pt-20 pb-10 text-center shadow-lg">
        <h1 className="text-4xl font-bold mb-3">Program & Kegiatan</h1>
        <p className="text-lg text-blue-100">
          Semua agenda dan program kerja unggulan yang kami selenggarakan.
        </p>
      </div>

      <div className="mx-auto px-6 py-6 md:py-10 max-w-7xl">
        {/* Grid Program */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {programs?.map((program) => (
            <div
              key={program.id}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
            >
              <div className="relative h-48 md:h-52 xl:h-56 w-full">
                <Image
                  src={program.imageUrl || "/placeholder-400x300.png"}
                  alt={program.title}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="p-6">
                <p className="text-xs text-gray-500 mb-1">
                  {new Date(program.date).toLocaleDateString("id-ID")}
                </p>

                <h3 className="text-lg font-bold text-gray-800 mb-2">
                  {program.title}
                </h3>

                <p className="text-gray-600 mb-4 line-clamp-3">
                  {program.description}
                </p>

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
