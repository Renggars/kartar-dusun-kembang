"use client";

const KarangTarunaData = {
  Penasehat: [
    { name: "Muhktar Effendi", position: "Kepala Desa Kembangbelor" },
    { name: "Murtaji", position: "Kepala Dusun Kembang" },
  ],
  ketua: { name: "Wawan", position: "Ketua" },
  wakilKetua: { name: "Didik", position: "Wakil Ketua" },
  sekretaris: { name: "Diana", position: "Sekretaris" },
  divisi: {
    bendahara: [{ name: "Deviana", position: "Bendahara" }, { name: "Resa" }],
    humas: [
      { name: "Yusuf", position: "Humas" },
      { name: "Alul" },
      { name: "Soleh" },
      { name: "Mol" },
    ],
    SeksiKeagamaan: [
      { name: "Saiful", position: "Seksi Keagamaan" },
      { name: "Hudi" },
      { name: "Ust. Mansur" },
    ],
    SeksiSosial: [
      { name: "Mansur", position: "Seksi Sosial" },
      { name: "Konyeng" },
      { name: "Siska" },
      { name: "Mamik" },
    ],
    SeksiKeamanan: [
      { name: "Amin", position: "Seksi Keamanan" },
      { name: "Deni" },
      { name: "Dio" },
    ],
  },
};

const MemberCard = ({
  name,
  position,
}: {
  name: string;
  position?: string;
}) => (
  <div
    className={`${
      position ? "w-44 lg:w-48 " : "min-w-28 lg:min-w-32"
    } group relative flex flex-col items-center justify-center py-2 px-3 rounded-xl shadow-lg bg-gray-800 border border-gray-700 hover:scale-105 transition-all duration-300 ease-in-out`}
  >
    <h3 className="text-sm font-semibold text-gray-100">{name}</h3>
    {position && <p className="text-xs text-gray-400">{position}</p>}
  </div>
);

export default function KarangTarunaChart() {
  return (
    <section
      id="structure"
      className="w-full bg-black text-white flex flex-col items-center scroll-mt-20 sm:scroll-mt-2 md:scroll-mt-28 "
    >
      {/* Dosen */}
      <div className="flex flex-col items-center">
        <div
          className="text-white mb-2"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          Penasehat
        </div>

        <div className="flex flex-col gap-3 items-center">
          {KarangTarunaData.Penasehat.map((member, index) => (
            <div
              key={`acara-${index}`}
              data-aos="fade-up"
              data-aos-delay={550 + index * 50}
            >
              <MemberCard name={member.name} position={member.position} />
            </div>
          ))}
        </div>
      </div>

      {/* LEVEL 2 (Ketua & Wakil Ketua) */}
      <div className="flex flex-col items-center justify-center">
        {/* Vertical line */}
        <div
          className="w-0.5 h-6 lg:h-8 xl:h-10 bg-white"
          data-aos="fade-up"
          data-aos-delay="350"
        />
        <div className="flex w-full justify-center max-w-7xl">
          {/* Horizontal line */}
          <div
            className="w-0.5 h-5 bg-white relative"
            data-aos="fade-up"
            data-aos-delay="400"
          />
          {/* Vertical line */}
          <div
            className="h-0.5 w-[180px] sm:w-[274px] md:w-[246px] lg:w-[440px] xl:w-[466px] bg-white"
            data-aos="fade-up"
            data-aos-delay="400"
          />
          {/* Horizontal line */}
          <div
            className="w-0.5 h-5 bg-white relative"
            data-aos="fade-up"
            data-aos-delay="400"
          />
        </div>
        <div className="flex justify-center items-center gap-x-[115px] sm:gap-x-[216px] md:gap-x-[190px] lg:gap-x-[380px] xl:gap-[410px]">
          <div className="text-white my-1 ml-5 sm:ml-6 md:ml-5 lg:ml-4 xl:ml-10">
            Ketua
          </div>
          <div className="text-white my-1 xl:mr-5">Wakil Ketua</div>
        </div>
        <div className="flex justify-center items-center gap-x-[66px] sm:gap-x-[163px] md:gap-x-[130px] lg:gap-x-[314px] xl:gap-[340px]">
          <div
            className="flex flex-col items-center  sm:mr-0 sm:ml-4 md:mr-2"
            data-aos="fade-up"
            data-aos-delay="450"
          >
            <MemberCard name={KarangTarunaData.ketua.name} />
            <div
              className="w-0.5 h-5 bg-white relative lg:ml-1"
              data-aos="fade-up"
              data-aos-delay="550"
            />
          </div>
          <div
            className="flex flex-col items-center  sm:mr-4 md:mr-3"
            data-aos="fade-up"
            data-aos-delay="450"
          >
            <MemberCard name={KarangTarunaData.wakilKetua.name} />
            <div
              className="w-0.5 h-5 bg-white relative lg:mr-[17px] xl:mr-3"
              data-aos="fade-up"
              data-aos-delay="550"
            />
          </div>
        </div>
        {/* Vertical line */}
        <div
          className="h-0.5 w-[180px] sm:w-[277px] md:w-[252px] md:ml-px lg:ml-0 lg:w-[441px] lg:mr-[3px] xl:mr-0 xl:w-[470px] bg-white"
          data-aos="fade-up"
          data-aos-delay="400"
        />
        {/* Horizontal line */}
        <div
          className="w-0.5 h-4  bg-white relative"
          data-aos="fade-up"
          data-aos-delay="550"
        />
      </div>

      {/* LEVEL 3 (Sekretaris & Bendahara) */}
      <div className="flex flex-col items-center justify-center">
        {/* Vertical line */}
        <div
          className="w-0.5 h-5 md:h-6 lg:h-8 xl:h-10 bg-white"
          data-aos="fade-up"
          data-aos-delay="350"
        />
        <div className="flex w-full justify-center max-w-7xl">
          {/* Horizontal line */}
          <div
            className="w-0.5 h-5 bg-white relative"
            data-aos="fade-up"
            data-aos-delay="400"
          />
          {/* Vertical line */}
          <div
            className="h-0.5 w-[180px] sm:w-[274px] md:w-[250px] lg:w-[440px] xl:w-[466px] bg-white"
            data-aos="fade-up"
            data-aos-delay="400"
          />
          {/* Horizontal line */}
          <div
            className="w-0.5 h-5 bg-white relative"
            data-aos="fade-up"
            data-aos-delay="400"
          />
        </div>
        <div className="flex justify-center items-center gap-x-[103px] sm:gap-x-48 md:gap-x-[175px] lg:gap-x-[370px] xl:gap-[395px]">
          <div className="text-white my-1 xl:ml-4">Sekretaris</div>
          <div className="text-white">Bendahara</div>
        </div>
        <div className="flex justify-center items-center gap-x-10 sm:gap-x-[150px] md:gap-x-[140px] md:ml-3 lg:ml-0 lg:gap-x-[312px] xl:gap-[340px] ">
          <div
            className="flex flex-col items-center mr-6 sm:mr-4 md:mr-0 mt-2"
            data-aos="fade-up"
            data-aos-delay="450"
          >
            <MemberCard name={KarangTarunaData.sekretaris.name} />
            <div
              className="w-0.5 h-[66px] bg-white relative sm:ml-3 md:ml-0 lg:mr-[17px] xl:mr-3"
              data-aos="fade-up"
              data-aos-delay="550"
            />
          </div>

          <div className="flex flex-col justify-center items-center sm:gap-x-5 md:mr-3 lg:mr-0">
            {KarangTarunaData.divisi.bendahara.map((member, index) => (
              <div
                key={`dokumentasi-${index}`}
                data-aos="fade-up"
                data-aos-delay={650 + index * 50}
                className="mt-2"
              >
                <MemberCard name={member.name} />
              </div>
            ))}
            {/* Vertical line */}
            <div
              className="w-0.5 h-5 bg-white relative lg:ml-px xl:ml-0"
              data-aos="fade-up"
              data-aos-delay="550"
            />
          </div>
        </div>

        {/* Horizontal line */}
        <div
          className="h-0.5 w-[178px] sm:-mt-0.5 md:mt-0 sm:w-[272px] sm:ml-1 md:ml-0 md:w-[254px] lg:ml-0 lg:w-[445px] lg:mr-0.5 xl:mr-0 xl:w-[470px] bg-white"
          data-aos="fade-up"
          data-aos-delay="400"
        />

        {/* Vertical line */}
        <div
          className="w-0.5 h-4 sm:h-8 xl:h-10 bg-white relative"
          data-aos="fade-up"
          data-aos-delay="550"
        />

        {/* Horizontal line */}
        <div
          className="h-0.5 w-[178px] sm:w-[274px] sm:ml-2 md:ml-0 md:w-[470px] lg:w-[608px] xl:w-[746px] bg-white"
          data-aos="fade-up"
          data-aos-delay="400"
        />

        {/* Vertical lines */}
        <div className="grid grid-cols-2 md:grid-cols-3 justify-center items-center gap-x-[174px] sm:gap-x-[270px] sm:ml-2 md:ml-0 md:gap-x-[232px] lg:gap-x-[301px] xl:gap-x-[370px]">
          <div
            className="w-0.5 h-5 bg-white relative"
            data-aos="fade-up"
            data-aos-delay="550"
          />
          <div
            className="w-0.5 h-5 bg-white relative"
            data-aos="fade-up"
            data-aos-delay="550"
          />
          <div
            className="hidden md:block w-0.5 h-5 bg-white relative"
            data-aos="fade-up"
            data-aos-delay="550"
          />
        </div>
      </div>

      {/* LEVEL 4 (Seksi Keagamaan, Seksi Sosial, Seksi Keamanan) */}
      <div className="flex flex-col items-center">
        <div className="grid grid-cols-2 md:grid-cols-3 justify-center gap-x-[50px] sm:gap-x-[150px] sm:ml-2 md:ml-0  md:gap-x-32 lg:gap-x-[204px] xl:gap-x-[272px] my-1 text-center">
          <div data-aos="fade-up" data-aos-delay="600">
            Seksi Keagamaan
          </div>
          <div
            data-aos="fade-up"
            data-aos-delay="600"
            className="hidden md:block xl:mr-2"
          >
            Seksi Sosial
          </div>
          <div data-aos="fade-up" data-aos-delay="600">
            Seksi Keamanan
          </div>
        </div>

        {/* Card Anggota */}
        <div className="grid grid-cols-2 md:grid-cols-3 justify-center gap-x-[62px] sm:gap-x-[158px] sm:ml-1 md:ml-0 md:gap-x-[120px] lg:gap-x-[170px] xl:gap-x-[245px]">
          {/* Seksi Keagamaan */}
          <div className="flex flex-col items-center">
            <div className="flex flex-col gap-3 items-center">
              {KarangTarunaData.divisi.SeksiKeagamaan.map((member, index) => (
                <div
                  key={`keagamaan-${index}`}
                  data-aos="fade-up"
                  data-aos-delay={550 + index * 50}
                >
                  <MemberCard name={member.name} />
                </div>
              ))}
            </div>
            <div className="w-0.5 h-5 md:h-[70px] bg-white lg:mr-3" />
          </div>

          {/* Seksi Sosial */}
          <div className="hidden md:flex flex-col items-center">
            <div className="flex flex-col gap-3 items-center">
              {KarangTarunaData.divisi.SeksiSosial.map((member, index) => (
                <div
                  key={`sosial-${index}`}
                  data-aos="fade-up"
                  data-aos-delay={550 + index * 50}
                >
                  <MemberCard name={member.name} />
                </div>
              ))}
            </div>
            <div className="w-0.5 h-5 bg-white ml-3 sm:ml-0" />
          </div>

          {/* Seksi Keamanan */}
          <div className="flex flex-col gap-3 items-center">
            {KarangTarunaData.divisi.SeksiKeamanan.map((member, index) => (
              <div
                key={`keamanan-${index}`}
                data-aos="fade-up"
                data-aos-delay={550 + index * 50}
              >
                <MemberCard name={member.name} />
              </div>
            ))}
            <div className="w-0.5 h-5 md:h-[70px] bg-white sm:ml-2.5 -mt-3" />
          </div>
        </div>

        {/* Garis Horizontal */}
        <div
          className="hidden md:flex h-0.5 bg-white md:w-[471px] md:ml-[5px] lg:w-[609px] lg:ml-[5px] xl:w-[759px] lg:mr-1.5"
          data-aos="fade-up"
          data-aos-delay="650"
        />
      </div>

      {/* LEVEL 5 (Humas) */}
      <div className="flex flex-col items-center">
        {/* Vertical line */}
        <div
          className="hidden md:block w-0.5 h-6 bg-white"
          data-aos="fade-up"
          data-aos-delay="700"
        />
        <div
          className="hidden md:block text-lg text-white my-1"
          data-aos="fade-up"
          data-aos-delay="600"
        >
          Humas
        </div>

        {/* === MOBILE VIEW (2 kolom seperti Level 4) === */}
        <div className="grid grid-cols-2 md:hidden justify-center gap-x-[94px] sm:ml-1.5 text-center my-1">
          <div data-aos="fade-up" data-aos-delay="600">
            Seksi Sosial
          </div>
          <div data-aos="fade-up" data-aos-delay="600">
            Humas
          </div>
        </div>

        <div className="hidden md:flex justify-center gap-3 sm:gap-x-5">
          {KarangTarunaData.divisi.humas.map((member, index) => (
            <div
              key={`dokumentasi-${index}`}
              data-aos="fade-up"
              data-aos-delay={650 + index * 50}
            >
              <MemberCard name={member.name} />
            </div>
          ))}
        </div>

        {/* === MOBILE: CARD ANGGOTA (2 kolom) === */}
        <div className="grid grid-cols-2 md:hidden justify-center gap-x-[62px] sm:gap-x-[158px] sm:ml-1">
          {/* Seksi Sosial */}
          <div className="flex flex-col items-center">
            <div className="flex flex-col gap-3 items-center">
              {KarangTarunaData.divisi.SeksiSosial.map((member, index) => (
                <div
                  key={`sosial-${index}`}
                  data-aos="fade-up"
                  data-aos-delay={650 + index * 50}
                >
                  <MemberCard name={member.name} />
                </div>
              ))}
            </div>
          </div>

          {/* Bendahara */}
          <div className="flex flex-col items-center">
            <div className="flex flex-col gap-3 items-center">
              {KarangTarunaData.divisi.humas.map((member, index) => (
                <div
                  key={`bendahara-${index}`}
                  data-aos="fade-up"
                  data-aos-delay={650 + index * 50}
                >
                  <MemberCard name={member.name} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
