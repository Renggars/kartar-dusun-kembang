"use client";

import { trpc } from "@/trpc/client";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  FaFacebook,
  FaTwitter,
  FaWhatsapp,
  FaInstagram,
  FaRegCalendarAlt,
} from "react-icons/fa";

type RelatedProgram = {
  slug: string;
  title: string;
  imageUrl: string | null;
};

export default function ProgramDetailPage() {
  const { slug } = useParams() as { slug: string };

  const { data: program, isLoading } = trpc.program.getBySlug.useQuery({
    slug,
  });

  const { data: relatedPrograms } = trpc.program.getRelated.useQuery();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600 text-lg font-medium">Memuat data...</p>
      </div>
    );
  }

  if (!program) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-2xl font-bold text-gray-700">
          Program tidak ditemukan
        </h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-blue-600 text-white py-16 px-6 text-center relative">
        <div className="max-w-5xl mx-auto">
          <nav className="text-sm mb-4">
            <Link href="/" className="hover:underline">
              Beranda
            </Link>{" "}
            /
            <Link href="/program" className="hover:underline">
              {" "}
              Program
            </Link>{" "}
            /<span className="opacity-90"> {program.title}</span>
          </nav>

          <h1 className="text-4xl md:text-5xl font-bold mb-3">
            {program.title}
          </h1>

          <p className="text-sm opacity-90">
            Oleh{" "}
            <span className="font-semibold">Karang Taruna Lorem Ipsum</span> ·
            Diterbitkan pada {new Date(program.date).toDateString()}
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto mt-10 px-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* MAIN CONTENT */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl shadow-md overflow-hidden">
            <Image
              src={program.imageUrl!}
              alt={program.title}
              width={800}
              height={400}
              className="w-full h-72 object-cover"
            />

            <div className="p-8">
              <div className="flex items-center gap-4 mb-6">
                <span className="text-gray-700 font-semibold">Bagikan:</span>
                <div className="flex gap-3 text-gray-600">
                  <FaFacebook
                    className="hover:text-blue-600 cursor-pointer"
                    size={22}
                  />
                  <FaTwitter
                    className="hover:text-black cursor-pointer"
                    size={22}
                  />
                  <FaWhatsapp
                    className="hover:text-green-500 cursor-pointer"
                    size={22}
                  />
                  <FaInstagram
                    className="hover:text-pink-500 cursor-pointer"
                    size={22}
                  />
                  <FaRegCalendarAlt
                    className="hover:text-blue-400 cursor-pointer"
                    size={22}
                  />
                </div>
              </div>

              <p className="text-gray-700 leading-relaxed text-justify">
                {program.description}
              </p>
            </div>
          </div>

          <div className="mt-8">
            <Link
              href="/program"
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-700 transition-all duration-300"
            >
              Kembali ke Semua Program
            </Link>
          </div>
        </div>

        {/* RELATED PROGRAMS */}
        <aside className="space-y-4 mb-5">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Program Terkait
          </h3>

          <div className="space-y-4">
            {relatedPrograms?.map((related: RelatedProgram) => (
              <Link
                key={related.slug}
                href={`/program/${related.slug}`}
                className="flex items-center gap-4 bg-white p-4 rounded-lg shadow hover:shadow-md transition-all"
              >
                <Image
                  src={related.imageUrl!}
                  alt={related.title}
                  width={64}
                  height={64}
                  className="w-16 h-16 rounded-md object-cover"
                />

                <p className="font-semibold text-gray-800 text-sm">
                  {related.title}
                </p>
              </Link>
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
}
