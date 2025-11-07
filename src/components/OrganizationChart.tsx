// components/OrganizationChart.jsx
import Node from "./Node";

export const karangTarunaStructure = {
  ketua: {
    name: "Ketua",
    title: "Wawan",
  },
  wakilKetua: {
    name: "Wakil Ketua",
    title: "Didik",
  },
  sekretaris: {
    name: "Sekretaris",
    title: "Sari",
  },
  bendahara: {
    name: "Bendahara",
    title: "Rina",
  },
  divisi: {
    humas: [
      { name: "Humas 1", title: "Andi" },
      { name: "Humas 2", title: "Budi" },
    ],
    acara: [
      { name: "Acara 1", title: "Citra" },
      { name: "Acara 2", title: "Dewi" },
    ],
    sosial: [
      { name: "Sosial 1", title: "Eka" },
      { name: "Sosial 2", title: "Fajar" },
    ],
  },
};

// --- Perbaikan Data Struktur Dusun ---
export const dusunStructure = {
  kepalaDusun: {
    jabatan: "Kepala Dusun",
    nama: "Bapak Murtaji",
  },
  ketuarRT1: {
    jabatan: "Ketua RT 1",
    nama: "Pak Saman",
  },
  ketuarRT2: {
    jabatan: "Ketua RT 2",
    nama: "Bu Lina",
  },
  ketuarRT3: {
    jabatan: "Ketua RT 3",
    nama: "Bu Lina",
  },
  ketuarRT4: {
    jabatan: "Ketua RT 4",
    nama: "Bu Lina",
  },
};

const renderStructure = (isRoot = true) => {
  return (
    <div className={`flex flex-col items-center ${isRoot ? "w-full" : ""}`}>
      {/* Ketua atau Ketua RT */}
      <Node
        nama={dusunStructure.kepalaDusun.nama}
        jabatan={dusunStructure.kepalaDusun.jabatan}
      />
      <div className="w-0.5 h-5 bg-gray-700" />

      {/* LEVEL 2 Sekretaris & Bendahara atau RT */}
      <div className="flex flex-col items-center justify-center">
        {/* Vertical line */}
        <div
          className="w-0.5 h-5 md:h-6 lg:h-8 xl:h-10 bg-gray-800"
          data-aos="fade-up"
          data-aos-delay="350"
        />
        <div className="flex w-full justify-center max-w-7xl">
          {/* Horizontal line */}
          <div
            className="w-0.5 h-5 bg-gray-800 relative"
            data-aos="fade-up"
            data-aos-delay="400"
          />
          {/* Vertical line */}
          <div
            className="h-0.5 w-40 sm:w-[194px] md:w-[274px] lg:w-[450px] xl:w-[566px] bg-gray-800"
            data-aos="fade-up"
            data-aos-delay="400"
          />
          {/* Horizontal line */}
          <div
            className="w-0.5 h-5 bg-gray-800 relative"
            data-aos="fade-up"
            data-aos-delay="400"
          />
        </div>
        <div className="flex justify-center items-center gap-x-[135px] sm:gap-x-[122px] md:gap-x-[200px] lg:gap-x-[374px] xl:gap-[500px]">
          <div className="text-gray-800 my-1">Sekretaris</div>
          <div className="text-gray-800 my-1">Bendahara</div>
        </div>
        <div className="flex justify-center items-center gap-x-8 sm:gap-x-[35px] md:gap-x-[110px] lg:gap-x-[223px] xl:gap-[360px]">
          <div
            className="flex flex-col items-center sm:mr-4 md:mr-0"
            data-aos="fade-up"
            data-aos-delay="450"
          >
            <Node
              jabatan={dusunStructure.ketuarRT1.jabatan}
              nama={dusunStructure.ketuarRT1.nama}
            />
            <div
              className="w-0.5 h-5 bg-gray-800 relative sm:mr-0 sm:ml-3 md:mr-0 lg:mr-[17px] xl:mr-3"
              data-aos="fade-up"
              data-aos-delay="550"
            />
          </div>
          {/* Vertical line */}

          <div
            className="flex flex-col items-center"
            data-aos="fade-up"
            data-aos-delay="450"
          >
            <Node
              jabatan={dusunStructure.ketuarRT2.jabatan}
              nama={dusunStructure.ketuarRT2.nama}
            />
            <div
              className="w-0.5 h-5 sm:ml-0 sm:mr-[18px] md:mr-2.5 lg:mr-0 bg-gray-800 relative"
              data-aos="fade-up"
              data-aos-delay="550"
            />
          </div>
        </div>
        {/* Vertical line */}
        <div
          className="h-0.5 w-[162px] sm:w-[196px] md:w-[277px] md:ml-px lg:ml-0 lg:w-[435px] lg:mr-[3px] xl:mr-0 xl:w-[570px] bg-gray-800"
          data-aos="fade-up"
          data-aos-delay="400"
        />
        {/* Horizontal line */}
        <div
          className="w-0.5 h-4 md:h-6 lg:h-8 xl:h-10 bg-gray-800 relative"
          data-aos="fade-up"
          data-aos-delay="550"
        />

        <div
          className="h-0.5 w-40 sm:w-[422px] md:w-[470px] lg:w-[608px] xl:w-[746px] bg-gray-800"
          data-aos="fade-up"
          data-aos-delay="400"
        />
        <div className="flex justify-center items-center gap-x-[156px] sm:gap-x-52 md:gap-x-[232px] lg:gap-x-[301px] xl:gap-x-[370px]">
          <div
            className="w-0.5 h-5 bg-gray-800 relative"
            data-aos="fade-up"
            data-aos-delay="550"
          />
          <div
            className="w-0.5 h-5 bg-gray-800 relative"
            data-aos="fade-up"
            data-aos-delay="550"
          />
        </div>
        <div className="flex justify-center items-center gap-x-8 sm:gap-x-[35px] md:gap-x-[110px] lg:gap-x-[223px] xl:gap-[360px]">
          <div
            className="flex flex-col items-center sm:mr-4 md:mr-0"
            data-aos="fade-up"
            data-aos-delay="450"
          >
            <Node
              jabatan={dusunStructure.ketuarRT3.jabatan}
              nama={dusunStructure.ketuarRT3.nama}
            />
          </div>
          {/* Vertical line */}

          <div
            className="flex flex-col items-center"
            data-aos="fade-up"
            data-aos-delay="450"
          >
            <Node
              jabatan={dusunStructure.ketuarRT4.jabatan}
              nama={dusunStructure.ketuarRT4.nama}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * Komponen Utama OrganizationChart
 */
const OrganizationChart = () => {
  return (
    <div className="flex justify-center items-start overflow-x-auto">
      <div className="container max-w-7xl">
        {/* Render struktur dimulai dari root */}
        <div className="flex justify-center pb-12">{renderStructure(true)}</div>
      </div>
    </div>
  );
};

export default OrganizationChart;
