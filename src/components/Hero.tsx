import Link from "next/link";

const Hero = () => {
  const heroStyle = {
    backgroundImage:
      "linear-gradient(to top, rgba(18, 18, 18, 0.8) 0%, rgba(138, 43, 226, 0.3) 70%, rgba(255, 20, 147, 0.3) 100%), url('/hero.jpg')",
  };
  return (
    <section
      id="beranda"
      className="relative h-screen flex items-center justify-center text-center bg-cover bg-center px-4"
      style={heroStyle}
    >
      <div className="absolute inset-0 "></div>
      <div className="relative z-10">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white leading-tight mb-4">
          Karang Taruna Bhakti Pertiwi
        </h1>
        <p className="text-md sm:text-lg md:text-xl text-gray-200 font-medium mb-8 max-w-3xl mx-auto">
          Membangun Generasi Muda Dusun Kembang yang Kreatif, Inovatif, dan
          Berkarakter.
        </p>
        <Link
          href="#about"
          // PERUBAHAN DI SINI: Menggunakan arbitrary value untuk warna background
          className="mt-8 inline-block rounded-xl bg-[#1581bc] text-white px-8 py-4 font-bold  transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#c4ff54]/30"
        >
          Lihat profil
        </Link>
      </div>
    </section>
  );
};

export default Hero;
