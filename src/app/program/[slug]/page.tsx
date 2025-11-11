import Image from "next/image";
import Link from "next/link";
import {
  FaFacebook,
  FaTwitter,
  FaWhatsapp,
  FaInstagram,
  FaRegCalendarAlt,
} from "react-icons/fa";

const programs = {
  "bakti-sosial": {
    title: "Bakti Sosial & Lingkungan",
    date: "28 Agustus 2025",
    description:
      "Program kepedulian sosial seperti kerja bakti, penghijauan, dan bantuan masyarakat.",
    image: "https://images.unsplash.com/photo-1590490360182-c33d57733427",
  },
  "pengembangan-skill": {
    title: "Pengembangan Skill Pemuda",
    date: "28 Agustus 2025",
    description:
      "Pelatihan digital, public speaking, dan kewirausahaan untuk generasi muda.",
    image: "https://images.unsplash.com/photo-1581091215360-6df03e0c6af5",
  },
  "turnamen-olahraga": {
    title: "Turnamen Olahraga Antar RW",
    date: "28 August 2025",
    description:
      "Menyelenggarakan turnamen futsal dan bulu tangkis untuk mempererat persaudaraan antarwarga desa.",
    image: "https://images.unsplash.com/photo-1508804185872-d7badad00f7d",
  },
};

const relatedPrograms = Object.entries(programs)
  .map(([slug, program]) => ({
    slug,
    title: program.title,
    image: program.image,
  }))
  .slice(0, 3);

interface PageProps {
  params: {
    slug: string;
  };
}

export default async function ProgramDetail({ params }: PageProps) {
  const { slug } = await params;
  const program = programs[slug as keyof typeof programs];

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
    <div className="min-h-screen bg-gray-50 ">
      {/* Header Biru */}
      <div className="bg-blue-600 text-white py-16 px-6 text-center relative">
        <div className="max-w-5xl mx-auto">
          <nav className="text-sm mb-4">
            <Link href="/" className="hover:underline">
              Beranda
            </Link>{" "}
            /{" "}
            <Link href="/program" className="hover:underline">
              Program
            </Link>{" "}
            / <span className="opacity-90">{program.title}</span>
          </nav>
          <h1 className="text-4xl md:text-5xl font-bold mb-3">
            {program.title}
          </h1>
          <p className="text-sm opacity-90">
            Oleh{" "}
            <span className="font-semibold">Karang Taruna Lorem Ipsum</span> ·
            Diterbitkan pada {program.date}
          </p>
        </div>
      </div>

      {/* Konten Utama + Sidebar */}
      <div className="max-w-6xl mx-auto mt-10 px-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Konten Utama */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl shadow-md overflow-hidden">
            <Image
              src={program.image}
              alt={program.title}
              width={800}
              height={400}
              className="w-full h-72 object-cover"
            />
            <div className="p-8">
              {/* Tombol Bagikan */}
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

        {/* Sidebar Program Terkait */}
        <aside className="space-y-4 mb-5">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Program Terkait
          </h3>
          <div className="space-y-4">
            {relatedPrograms.map((related) => (
              <Link
                key={related.slug}
                href={`/program/${related.slug}`}
                className="flex items-center gap-4 bg-white p-4 rounded-lg shadow hover:shadow-md transition-all"
              >
                <Image
                  src={related.image}
                  alt={related.title}
                  width={64}
                  height={64}
                  className="w-16 h-16 rounded-md object-cover"
                />
                <div>
                  <p className="font-semibold text-gray-800 text-sm leading-snug">
                    {related.title}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
}
