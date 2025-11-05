// components/Node.jsx

import Image from "next/image";
import React from "react";

const Node = ({ name, title, department, imageUrl }) => {
  return (
    <div className="flex flex-col items-center p-3 m-2 bg-gray-800 text-white rounded-lg shadow-xl border border-gray-700 w-40 min-h-[90px]">
      {/* Gambar opsional */}
      {imageUrl && (
        <div className="mb-2 w-10 h-10 rounded-full overflow-hidden bg-gray-600 flex items-center justify-center">
          {/* Menggunakan Next/Image jika Anda mengimpornya, namun di sini menggunakan img biasa */}
          <Image
            src={imageUrl}
            alt={name}
            width={40}
            height={40}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* Nama & Jabatan (Gaya seperti Gambar 2) */}
      <p className="font-bold text-sm text-center line-clamp-2">{name}</p>
      {title && (
        <p className="text-xs text-blue-400 text-center mt-0.5 line-clamp-1">
          {title}
        </p>
      )}
      {department && (
        <p className="text-xs text-gray-400 text-center mt-0.5 line-clamp-1">
          {department}
        </p>
      )}
    </div>
  );
};

export default Node;
