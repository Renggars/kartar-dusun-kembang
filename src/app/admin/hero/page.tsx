"use client";

import { useState, useEffect } from "react";
import { trpc } from "@/server/client";
import Image from "next/image";
import { uploadHeroImage } from "@/lib/uploadHeroImage";

export default function HeroPage() {
  // Ambil data hero dari database
  const { data: hero, isLoading, refetch } = trpc.hero.get.useQuery();
  const createHero = trpc.hero.create.useMutation();
  const updateHero = trpc.hero.update.useMutation();

  const [form, setForm] = useState({
    id: "",
    title: "",
    description: "",
    imageUrl: "",
  });
  const [uploading, setUploading] = useState(false);

  // Ketika data hero sudah didapat, isi form
  useEffect(() => {
    if (hero) {
      setForm({
        id: hero.id || "",
        title: hero.title || "",
        description: hero.description || "",
        imageUrl: hero.imageUrl || "",
      });
    }
  }, [hero]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const imageUrl = await uploadHeroImage(file);
    setUploading(false);

    if (imageUrl) {
      setForm({ ...form, imageUrl });
    } else {
      alert("Gagal mengunggah gambar.");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.title || !form.description) {
      alert("Judul dan deskripsi harus diisi!");
      return;
    }

    try {
      if (form.id) {
        await updateHero.mutateAsync(form);
      } else {
        await createHero.mutateAsync(form);
      }
      await refetch(); // refresh data terbaru dari database
      alert("Hero section berhasil disimpan!");
    } catch (error) {
      alert("Terjadi kesalahan saat menyimpan data!");
      console.error(error);
    }
  };

  if (isLoading) {
    return <p className="text-center mt-6 text-gray-600">Memuat data...</p>;
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow text-gray-900">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Hero Section</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* JUDUL */}
        <div>
          <label className="block font-semibold mb-1">Judul</label>
          <input
            type="text"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="w-full border border-gray-300 px-3 py-2 rounded"
            placeholder="Masukkan judul hero section..."
          />
        </div>

        {/* DESKRIPSI */}
        <div>
          <label className="block font-semibold mb-1">Deskripsi Singkat</label>
          <textarea
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="w-full border border-gray-300 px-3 py-2 rounded"
            placeholder="Tuliskan deskripsi singkat..."
            rows={3}
          />
        </div>

        {/* UPLOAD GAMBAR */}
        <div>
          <label className="block font-semibold mb-1">Gambar/Banner</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="block w-full text-sm text-gray-600 border border-gray-300 rounded cursor-pointer focus:outline-none"
          />

          {uploading && (
            <p className="text-sm text-blue-600 mt-2">Mengunggah gambar...</p>
          )}

          {/* Preview gambar dari database */}
          {form.imageUrl && (
            <div className="mt-3">
              <p className="text-sm text-gray-700 mb-1">Gambar saat ini:</p>
              <Image
                src={form.imageUrl}
                alt="Hero Banner"
                width={600}
                height={350}
                className="rounded-lg shadow-md border border-gray-200"
              />
            </div>
          )}
        </div>

        {/* TOMBOL SIMPAN */}
        <button
          type="submit"
          disabled={uploading}
          className={`px-4 py-2 rounded text-white font-medium ${
            uploading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {uploading ? "Menunggu Upload..." : "Simpan Perubahan"}
        </button>
      </form>
    </div>
  );
}
