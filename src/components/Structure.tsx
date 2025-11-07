// pages/structure.jsx
"use client";

import React, { useState } from "react";
import OrganizationChart from "./OrganizationChart";

const StructurePage = () => {
  // 'kartar' sebagai default, bisa juga 'dusun'
  const [activeStructure, setActiveStructure] = useState("kartar");

  return (
    <div className="min-h-screen text-white bg-white">
      {/* Konten Halaman */}
      <div className="pt-16 px-4 sm:px-6 lg:px-8">
        <h1 className="text-5xl font-extrabold text-center text-black">
          Structure
        </h1>

        {/* Tombol Pilihan (mirip Gambar 2) */}
        <div className="flex justify-center mb-5 space-x-4 mt-8">
          <button
            onClick={() => setActiveStructure("kartar")}
            className={`py-3 px-8 text-lg font-semibold rounded-lg transition duration-300 shadow-md ${
              activeStructure === "kartar"
                ? "bg-blue-500 text-white shadow-indigo-500/50 hover:bg-blue-600"
                : "bg-gray-400 text-black hover:bg-gray-500"
            }`}
          >
            Kartar
          </button>

          <button
            onClick={() => setActiveStructure("dusun")}
            className={`py-3 px-8 text-lg font-semibold rounded-lg transition duration-300 shadow-md ${
              activeStructure === "dusun"
                ? "bg-blue-500 text-white shadow-indigo-500/50 hover:bg-blue-600"
                : "bg-gray-500 text-black hover:bg-gray-500"
            }`}
          >
            Dusun
          </button>
        </div>
      </div>

      {/* Tampilkan Struktur yang Aktif */}
      <OrganizationChart />
    </div>
  );
};

export default StructurePage;
