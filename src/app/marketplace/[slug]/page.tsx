"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { FaFacebook, FaTwitter, FaWhatsapp, FaInstagram } from "react-icons/fa";
import { trpc } from "@/trpc/client";

export default function MarketplaceDetailPage() {
  const { slug } = useParams() as { slug: string };

  const { data: item, isLoading } = trpc.marketplace.getBySlug.useQuery({
    slug,
  });

  const { data: related } = trpc.marketplace.getRelated.useQuery({
    category: item?.category,
    excludeSlug: slug,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Memuat data...
      </div>
    );
  }

  if (!item) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-300">
        <h1 className="text-2xl font-bold">Data tidak ditemukan</h1>
      </div>
    );
  }

  return (
    <div className="bg-gray-950 text-white min-h-screen pb-16">
      {/* HEADER */}
      <div className="bg-gray-900 py-16 px-6 text-center shadow-lg">
        <h1 className="text-4xl font-bold mb-3">{item.title}</h1>
        <p className="text-gray-400">{item.category}</p>
      </div>

      <div className="max-w-6xl mx-auto mt-10 px-6 grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* MAIN CONTENT */}
        <div className="lg:col-span-2">
          <div className="bg-gray-900 rounded-2xl shadow-lg overflow-hidden">
            <Image
              src={item.imageUrl || "/placeholder-400x300.png"}
              alt={item.title}
              width={800}
              height={400}
              className="w-full h-72 object-cover"
            />

            <div className="p-8">
              {/* Share */}
              <div className="flex items-center gap-4 mb-6">
                <span className="text-gray-300 font-semibold">Bagikan:</span>
                <div className="flex gap-3 text-gray-400">
                  <FaFacebook className="hover:text-blue-600 cursor-pointer" />
                  <FaTwitter className="hover:text-blue-400 cursor-pointer" />
                  <FaWhatsapp className="hover:text-green-500 cursor-pointer" />
                  <FaInstagram className="hover:text-pink-500 cursor-pointer" />
                </div>
              </div>

              <p className="text-gray-300 leading-relaxed text-justify">
                {item.description}
              </p>
            </div>
          </div>

          <Link
            href="/marketplace"
            className="inline-block bg-lime-500 text-gray-900 px-6 py-3 rounded-full font-semibold hover:bg-lime-600 mt-8 transition"
          >
            Kembali ke Marketplace
          </Link>
        </div>

        {/* RELATED */}
        <aside className="">
          <h3 className="text-xl font-semibold mb-4">Rekomendasi Lain</h3>

          <div className="space-y-4">
            {related?.map((r) => (
              <Link
                key={r.slug}
                href={`/marketplace/${r.slug}`}
                className="flex items-center gap-4 bg-gray-900 p-4 rounded-xl shadow hover:shadow-lg transition"
              >
                <Image
                  src={r.imageUrl || "/placeholder-400x300.png"}
                  alt={r.title}
                  width={64}
                  height={64}
                  className="w-20 h-20 rounded-md object-cover"
                />

                <p className="font-semibold text-gray-200">{r.title}</p>
              </Link>
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
}
