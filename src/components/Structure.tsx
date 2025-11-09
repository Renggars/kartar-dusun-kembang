// pages/structure.jsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import KarangTarunaChart from "./Charts/KarangTarunaChart";
import DusunChart from "./Charts/DusunChart";

const StructurePage = () => {
  const [selected, setSelected] = useState<"karangTaruna" | "dusun">(
    "karangTaruna"
  );
  return (
    <div className="min-h-screen text-white bg-white">
      {/* Konten Halaman */}
      <div className="pt-16 px-4 sm:px-6 lg:px-8">
        <h1 className="text-5xl font-extrabold text-center text-black">
          Structure
        </h1>
      </div>

      {/* Tampilkan Struktur yang Aktif */}
      <div className="w-full flex flex-col items-center  bg-black text-white min-h-screen py-10">
        <div className="flex gap-4 mb-8">
          <Button
            variant={selected === "karangTaruna" ? "default" : "outline"}
            onClick={() => setSelected("karangTaruna")}
          >
            Karang Taruna
          </Button>
          <Button
            variant={selected === "dusun" ? "default" : "outline"}
            onClick={() => setSelected("dusun")}
          >
            Dusun
          </Button>
        </div>

        {selected === "karangTaruna" ? <KarangTarunaChart /> : <DusunChart />}
      </div>
    </div>
  );
};

export default StructurePage;
