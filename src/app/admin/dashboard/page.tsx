import Image from "next/image";

const newsData = [
  {
    title: "Karang Taruna Mengadakan Lomba 17-an Peringati Kemerdekaan RI",
    date: "23 Aug 2025",
    image: "/img/news1.jpg",
  },
  {
    title: "Pelatihan Keterampilan Digital untuk Pemuda Desa",
    date: "18 Aug 2025",
    image: "/img/news2.jpg",
  },
  {
    title: "Kerja Bakti Bersihkan Sungai Desa, Wujud Peduli Lingkungan",
    date: "08 Aug 2025",
    image: "/img/news3.jpg",
  },
  {
    title: "Pentas Seni Budaya Lokal Meriahkan Malam Minggu Desa",
    date: "29 Jul 2025",
    image: "/img/news4.jpg",
  },
  {
    title: "Pembagian Sembako untuk Warga Kurang Mampu",
    date: "14 Jul 2025",
    image: "/img/news5.jpg",
  },
];

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <main className="flex-1 p-6">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          Berita Terbaru
        </h2>

        <div className="space-y-4">
          {newsData.map((item, index) => (
            <div
              key={index}
              className="flex items-center bg-white p-4 rounded-lg shadow hover:shadow-md transition"
            >
              <Image
                src={item.image}
                alt={item.title}
                width={96}
                height={64}
                className="w-24 h-16 object-cover rounded mr-4"
              />
              <div>
                <h3 className="text-gray-800 font-semibold">{item.title}</h3>
                <p className="text-gray-500 text-sm">
                  Diterbitkan pada {item.date}
                </p>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
