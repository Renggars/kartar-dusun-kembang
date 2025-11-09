"use client";
const dusunData = {
  kepalaDusun: { position: "Kepala Dusun", name: "Murtaji" },
  DataRt: [
    { position: "Ketua RT 1", name: "Pak Saman" },
    { position: "Ketua RT 2", name: "Bu Lina" },
  ],
  DataRtS: [
    { position: "Ketua RT 3", name: "Pak Budi" },
    { position: "Ketua RT 4", name: "Bu Sari" },
  ],
};

const MemberCard = ({
  name,
  position,
}: {
  name: string;
  position?: string;
}) => (
  <div className="min-w-32 group relative flex flex-col items-center justify-center py-2 px-3 rounded-xl shadow-lg bg-gray-800 border border-gray-700 hover:scale-105 transition-all duration-300 ease-in-out">
    <h3 className="text-sm font-semibold text-gray-100">{name}</h3>
    {position && <p className="text-xs text-gray-400">{position}</p>}
  </div>
);

export default function DusunChart() {
  return (
    <section
      id="dusun"
      className="w-full bg-black text-white flex flex-col items-center "
    >
      <div className="flex flex-col items-center">
        <div
          className="text-white mb-2"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          Kepala Dusun
        </div>
        <MemberCard name={dusunData.kepalaDusun.name} />
        <div
          className="w-0.5 h-6 bg-white"
          data-aos="fade-up"
          data-aos-delay="100"
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

        {/* Ketua RT 1 & Ketua RT 2 */}
        <div className="flex justify-center items-center gap-x-[105px] sm:gap-x-[202px] md:gap-x-[172px] lg:gap-x-[366px] xl:gap-[396px]">
          <div className="text-white my-1">Ketua RT 1</div>
          <div className="text-white">Ketua RT 2</div>
        </div>
        <div
          className="flex justify-center items-start gap-x-[54px] sm:gap-x-[150px] md:gap-x-[120px] lg:gap-x-[314px] xl:gap-[340px]"
          data-aos="fade-up"
          data-aos-delay="450"
        >
          {dusunData.DataRt.map((member, index) => (
            <div
              key={`rt-${index}`}
              className="flex flex-col items-center"
              data-aos="fade-up"
              data-aos-delay={650 + index * 50}
            >
              <MemberCard name={member.name} />
              {/* Garis vertikal di bawah masing-masing MemberCard */}
              <div
                className="w-0.5 h-5 md:h-6 lg:h-8 xl:h-10 bg-white"
                data-aos="fade-up"
                data-aos-delay={700 + index * 50}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center items-center gap-x-[105px] sm:gap-x-[202px] md:gap-x-[200px] lg:gap-x-[366px] xl:gap-[396px]">
        <div className="text-white my-1 xl:ml-4">Ketua RT 3</div>
        <div className="text-white">Ketua RT 4</div>
      </div>

      <div
        className="flex justify-center items-start gap-x-[54px] sm:gap-x-[150px] md:gap-x-[120px] lg:gap-x-[314px] xl:gap-[340px]"
        data-aos="fade-up"
        data-aos-delay="450"
      >
        {dusunData.DataRt.map((member, index) => (
          <div
            key={`rt-${index}`}
            data-aos="fade-up"
            data-aos-delay={650 + index * 50}
          >
            <MemberCard name={member.name} />
            {/* Garis vertikal di bawah masing-masing MemberCard */}
          </div>
        ))}
      </div>
    </section>
  );
}
