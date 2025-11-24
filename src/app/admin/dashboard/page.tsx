import Image from "next/image";
import gallery1 from "../../../assets/gallery1.png";
import gallery2 from "../../../assets/gallery2.png";
import gallery3 from "../../../assets/gallery3.png";
import gallery4 from "../../../assets/gallery4.png";

import {
  Calendar,
  Mail,
  Store,
  Users,
  Activity,
  MessageSquare,
  ArrowRight,
} from "lucide-react";

// Data Dummy untuk Card Statistik
const statsData = [
  {
    icon: Mail,
    count: 14,
    label: "Pesan Masuk Baru",
    color: "bg-purple-100 text-purple-600",
  },
  {
    icon: Store,
    count: 87,
    label: "Item Marketplace",
    color: "bg-blue-100 text-blue-600",
  },
  {
    icon: Users,
    count: 45,
    label: "Anggota Aktif",
    color: "bg-orange-100 text-orange-600",
  },
  {
    icon: Activity,
    count: 6,
    label: "Kegiatan Bulan Ini",
    color: "bg-red-100 text-red-600",
  },
];

const latestMessage = {
  tanggal: "24 Nov 2025",
  nama: "Dani Alamsyah",
  email: "tes@gmail.com",
  pesan:
    "Terima kasih atas kegiatan kerja bakti kemarin. Lingkungan jadi lebih bersih dan asri! Mantap",
};

const newsData = [
  {
    title: "Karang Taruna Mengadakan Lomba 17-an Peringati Kemerdekaan RI",
    date: "23 Aug 2025",
    image: gallery1,
  },
  {
    title: "Pelatihan Keterampilan Digital untuk Pemuda Desa",
    date: "18 Aug 2025",
    image: gallery2,
  },
  {
    title: "Kerja Bakti Bersihkan Sungai Desa, Wujud Peduli Lingkungan",
    date: "08 Aug 2025",
    image: gallery3,
  },
  {
    title: "Pentas Seni Budaya Lokal Meriahkan Malam Minggu Desa",
    date: "29 Jul 2025",
    image: gallery4,
  },
];

// Komponen Card Statistik
const StatCard = ({ icon: Icon, count, label, color }) => (
  <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 bg-white p-4 md:p-6 justify-center items-center md:justify-normal md:items-start rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
    <div className="flex items-center space-x-4">
      <div className={`p-3 rounded-full ${color} shrink-0`}>
        <Icon className="h-6 w-6 md:h-8 md:w-8" />
      </div>
      <div className="md:hidden text-2xl font-bold text-gray-900">{count}</div>
    </div>
    <div className="flex flex-col justify-center items-center md:justify-normal md:items-start">
      <div className="hidden md:block text-3xl font-bold text-gray-900">
        {count}
      </div>
      <p className="text-xs sm:text-sm text-center md:text-start text-gray-600 mt-1">
        {label}
      </p>
    </div>
  </div>
);

export default function DashboardPage() {
  const today = new Date();
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const formattedDate = today.toLocaleDateString("id-ID", options);

  // Ambil data untuk Kalender
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();
  const todayDate = today.getDate();

  // Asumsi bulan kalender adalah bulan saat ini
  const monthNames = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];
  const calendarMonthName = monthNames[currentMonth];
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay(); // 0=Minggu, 1=Senin, dst.

  // Array untuk mengisi slot kalender
  const calendarDays = [];
  for (let i = 0; i < firstDayOfMonth; i++) {
    calendarDays.push(null); // Slot kosong di awal bulan
  }
  for (let i = 1; i <= daysInMonth; i++) {
    calendarDays.push(i);
  }

  return (
    <div className="h-screen bg-white font-sans px-4 py-8 sm:p-6 lg:p-8">
      <header className="flex justify-between items-center mb-4 md:mb-8">
        <h1 className="text-xl sm:text-3xl font-extrabold text-gray-900 mb-3 sm:mb-0">
          Selamat Datang di Dashboard Admin Karang Taruna!
        </h1>
        <div className="flex items-center space-x-2 md:space-x-4">
          <div className="bg-white p-3 rounded-full shadow-md">
            <Calendar className="h-5 w-5 md:h-6 md:w-6 text-indigo-600" />
          </div>
          <span className="text-gray-700 font-medium text-sm md:text-lg hidden md:block">
            {formattedDate}
          </span>
        </div>
      </header>

      {/* Bagian Statistik Card (Terinspirasi dari image_82f740.png) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-4 md:mb-6">
        {statsData.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 sm:gap-6">
        {/* Bagian Utama Berita Terbaru (MODIFIKASI) */}
        <main className="lg:col-span-2 bg-white p-4 md:p-6 rounded-2xl shadow-xl">
          {/* padding disesuaikan */}
          <div className="flex justify-between items-center mb-4 sm:mb-5 border-b pb-3 border-gray-200">
            <h2 className="text-lg md:text-xl font-bold text-gray-900">
              Aktivitas Terbaru
            </h2>
            <button className="flex items-center text-indigo-600 hover:text-indigo-800 font-semibold text-xs sm:text-sm transition-colors duration-200">
              Lihat Semua <ArrowRight className="ml-1 h-3 w-3 md:h-4 md:w-4" />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Menggunakan grid untuk 2 kolom */}
            {newsData.slice(0, 4).map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer border border-gray-100"
              >
                <div className="relative w-full h-32 md:h-40">
                  {/* Container gambar dengan tinggi tetap */}
                  <Image
                    src={item.image}
                    alt={item.title}
                    layout="fill"
                    objectFit="cover"
                    className="transform hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-3 md:p-4">
                  <h3 className="text-base md:text-lg text-gray-900 font-bold mb-2 leading-tight">
                    {/* Font lebih tebal */}
                    {item.title}
                  </h3>
                  <p className="text-gray-600 text-xs sm:text-sm">
                    Diterbitkan pada
                    <span className="font-medium text-indigo-700">
                      {item.date}
                    </span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </main>

        {/* Sidebar untuk Kalender dan Informasi Tambahan */}
        <aside className="lg:col-span-1 flex flex-col space-y-4 md:space-y-6">
          <div className="bg-white p-4 md:p-6 rounded-2xl shadow-xl">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4 flex items-center">
              <Calendar className="h-4 w-4 sm:h-5 sm:w-5 text-purple-600 mr-2" />
              Kalender
            </h3>
            <div className="text-center bg-indigo-50 p-3 sm:p-4 rounded-lg text-indigo-800 font-semibold">
              <p className="text-xs sm:text-sm mb-2">
                {calendarMonthName} {currentYear}
              </p>
              <div className="grid grid-cols-7 gap-1 text-xs sm:text-sm">
                {["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"].map(
                  (day) => (
                    <span key={day} className="font-bold text-gray-600">
                      {day}
                    </span>
                  )
                )}
                {calendarDays.map((day, index) => (
                  <span
                    key={index}
                    className={`p-1 rounded-full ${
                      day === null
                        ? "text-transparent"
                        : "text-gray-700 hover:bg-gray-200 cursor-pointer"
                    } ${
                      day === todayDate &&
                      currentMonth === today.getMonth() &&
                      currentYear === today.getFullYear()
                        ? "ring-2 ring-indigo-500 bg-indigo-100 text-indigo-800 font-bold"
                        : ""
                    }`}
                  >
                    {day}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* CARD PESAN MASUK TERBARU */}
          <div className="bg-linear-to-r from-indigo-600 to-purple-700 p-4 sm:p-5 rounded-2xl shadow-xl text-white grow">
            {" "}
            <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 flex items-center">
              <MessageSquare className="h-4 w-4 sm:h-5 sm:w-5 mr-2" /> Pesan
              Terbaru
            </h3>
            <div className="space-y-2 mb-4 bg-indigo-700/50 p-3 rounded-lg">
              <div className="flex justify-between items-center text-xs text-indigo-100">
                <p className="font-bold text-sm sm:text-base text-white truncate">
                  {latestMessage.nama}
                </p>
                <span className="whitespace-nowrap text-xs">
                  {latestMessage.tanggal}
                </span>
              </div>
              <p className="font-semibold text-white mb-1 text-sm">
                Dari:
                <span className="text-indigo-200 font-normal">
                  {latestMessage.email}
                </span>
              </p>
              <p className="text-xs sm:text-sm text-white line-clamp-3 italic">
                {latestMessage.pesan}
              </p>
            </div>
            <button className="flex items-center justify-center w-full bg-white text-indigo-700 font-bold py-2 px-4 rounded-full hover:bg-indigo-100 transition-all duration-300 shadow-md text-sm cursor-pointer">
              <Mail className="h-4 w-4 mr-2" /> Lihat Semua Pesan
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
}
