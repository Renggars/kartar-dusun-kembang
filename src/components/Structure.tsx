// pages/structure.jsx
"use client";

import React, { useState } from "react";
import OrganizationChart from "./OrganizationChart";
import {
  karangTarunaStructure,
  dusunStructure,
} from "../constants/structureData";

const StructurePage = () => {
  // 'kartar' sebagai default, bisa juga 'dusun'
  const [activeStructure, setActiveStructure] = useState("kartar");

  const structureData =
    activeStructure === "kartar" ? karangTarunaStructure : dusunStructure;

  return (
    <div className="min-h-screen text-white bg-white">
      {/* Konten Halaman */}
      <div className="pt-12 px-4 sm:px-6 lg:px-8 ">
        <h1 className="text-5xl font-extrabold text-center mb-12 text-black">
          Structure
        </h1>

        {/* Tombol Pilihan (mirip Gambar 2) */}
        <div className="flex justify-center mb-16 space-x-4">
          <button
            onClick={() => setActiveStructure("kartar")}
            className={`py-3 px-8 text-lg font-semibold rounded-lg transition duration-300 shadow-md ${
              activeStructure === "kartar"
                ? "bg-blue-600 text-white shadow-indigo-500/50 hover:bg-blue-700"
                : "bg-gray-500 text-gray-300 hover:bg-gray-600"
            }`}
          >
            Kartar
          </button>

          <button
            onClick={() => setActiveStructure("dusun")}
            className={`py-3 px-8 text-lg font-semibold rounded-lg transition duration-300 shadow-md ${
              activeStructure === "dusun"
                ? "bg-indigo-600 text-white shadow-indigo-500/50 hover:bg-indigo-700"
                : "bg-gray-400 text-black hover:bg-gray-500"
            }`}
          >
            Dusun
          </button>
        </div>
      </div>

      {/* Tampilkan Struktur yang Aktif */}
      <OrganizationChart structureData={structureData} />
    </div>
  );
};

export default StructurePage;
