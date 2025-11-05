"use client";

import Link from "next/link";
import { FaPlayCircle } from "react-icons/fa";

// 💡 terima icon sebagai Komponen, bukan elemen
const ActivityCard = ({ title, description, Icon, href }) => (
  <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between">
    <div>
      {/* pastikan Icon dirender sebagai komponen */}
      <div className="text-blue-600 mb-4">
        <Icon className="text-4xl" />
      </div>
      <h3 className="text-xl font-bold mb-2 text-gray-800">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
    <div className="mt-6 text-right">
      <Link
        href={href}
        className="inline-block bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-blue-700 transition-all duration-300"
      >
        Detail Program →
      </Link>
    </div>
  </div>
);

const Activities = () => {
  return (
    <section id="kegiatan" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        {/* Judul Section */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
            Program & Kegiatan
          </h2>
          <p className="text-lg text-gray-600 mt-2">
            Inisiatif kami untuk memajukan pemuda dan lingkungan.
          </p>
          <div className="w-24 h-1 bg-blue-600 mx-auto mt-4"></div>
        </div>

        {/* Kartu Kegiatan */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <ActivityCard
            title="Bakti Sosial & Lingkungan"
            description="Mengadakan kegiatan kebersihan lingkungan, santunan, dan program sosial lain untuk meningkatkan kepedulian."
            href="/program/bakti-sosial"
            Icon={FaPlayCircle}
          />
          <ActivityCard
            title="Pengembangan Skill Pemuda"
            description="Workshop dan pelatihan seperti public speaking, digital marketing, dan desain untuk meningkatkan keahlian."
            href="/program/pengembangan-skill"
            Icon={FaPlayCircle}
          />
          <ActivityCard
            title="Olahraga & Seni"
            description="Menyelenggarakan turnamen olahraga dan pentas seni untuk menyalurkan bakat serta mempererat persaudaraan."
            href="/program/olahraga-seni"
            Icon={FaPlayCircle}
          />
        </div>

        {/* Tombol Lihat Semua */}
        <div className="text-center mt-12">
          <Link
            href="/program"
            className="inline-block bg-blue-600 text-white font-semibold px-6 py-3 rounded-full shadow-md hover:bg-blue-700 hover:-translate-y-1 transition-all duration-300"
          >
            Lihat Semua Program
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Activities;
