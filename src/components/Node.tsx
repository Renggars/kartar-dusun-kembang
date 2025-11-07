// components/Node.jsx

const Node = ({ nama, jabatan }: { nama: string; jabatan?: string }) => {
  return (
    <div className="flex flex-col items-center p-2 bg-gray-900 text-white rounded-lg shadow-xl border border-gray-700 w-32">
      {/* Nama & Jabatan (Gaya seperti Gambar 2) */}
      <p className="font-bold text-sm text-center line-clamp-2">{jabatan}</p>
      {nama && (
        <p className="text-xs text-blue-400 text-center mt-0.5 line-clamp-1">
          {nama}
        </p>
      )}
    </div>
  );
};

export default Node;
