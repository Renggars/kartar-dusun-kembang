"use client";

import Link from "next/link";

const ActivityCard = ({ title, description, icon, href }) => (
  <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between">
    <div>
      <div className="text-blue-600 mb-4">{icon}</div>
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
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 
                  2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 
                  4.5 2.09C13.09 3.81 14.76 3 16.5 3 
                  19.58 3 22 5.42 22 8.5c0 3.78-3.4 
                  6.86-8.55 11.54L12 21.35z"
                />
              </svg>
            }
          />
          <ActivityCard
            title="Pengembangan Skill Pemuda"
            description="Workshop dan pelatihan seperti public speaking, digital marketing, dan desain untuk meningkatkan keahlian."
            href="/program/pengembangan-skill"
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.663 17h4.673M12 3v1m6.364 
                  1.636l-.707.707M21 12h-1M4 12H3m15.364 
                  6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 
                  0l-.707.707"
                />
              </svg>
            }
          />
          <ActivityCard
            title="Olahraga & Seni"
            description="Menyelenggarakan turnamen olahraga dan pentas seni untuk menyalurkan bakat serta mempererat persaudaraan."
            href="/program/olahraga-seni"
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14.752 11.168l-3.197-2.132A1 
                  1 0 0010 9.87v4.263a1 1 0 
                  001.555.832l3.197-2.132a1 1 0 
                  000-1.664z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 12a9 9 0 
                  11-18 0 9 9 0 0118 0z"
                />
              </svg>
            }
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
