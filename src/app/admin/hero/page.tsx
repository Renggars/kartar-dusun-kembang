"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { uploadHeroImage, deleteHeroImage } from "@/lib/uploadHeroImage";
import { trpc } from "@/trpc/client";

export default function HeroPage() {
  const { data: hero, isLoading, refetch } = trpc.hero.get.useQuery();
  const createHero = trpc.hero.create.useMutation();
  const updateHero = trpc.hero.update.useMutation();

  const [form, setForm] = useState({
    id: "",
    title: "",
    description: "",
    imageUrl: "",
  });

  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.title || !form.description) {
      alert("Judul dan deskripsi harus diisi!");
      return;
    }

    setUploading(true);
    let imageUrl = form.imageUrl || "";

    try {
      // Jika user upload gambar baru
      if (selectedImage) {
        // Hapus gambar lama dulu
        if (form.imageUrl) {
          await deleteHeroImage(form.imageUrl);
        }

        // Upload gambar baru
        const uploadedUrl = await uploadHeroImage(selectedImage);
        if (!uploadedUrl) {
          alert("Gagal mengunggah gambar.");
          setUploading(false);
          return;
        }
        imageUrl = uploadedUrl;
      }

      const payload = {
        ...form,
        imageUrl,
      };

      // Simpan ke database
      if (form.id) {
        await updateHero.mutateAsync(payload);
      } else {
        await createHero.mutateAsync(payload);
      }

      await refetch();
      alert("Hero section berhasil disimpan!");
      setSelectedImage(null);
    } catch (error) {
      console.error(error);
      alert("Terjadi kesalahan saat menyimpan data!");
    } finally {
      setUploading(false);
    }
  };

  if (isLoading) {
    return <p className="text-center mt-6 text-gray-600">Memuat data...</p>;
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow text-gray-900">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Hero Section</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
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

        <div>
          <label className="block font-semibold mb-1">Gambar</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) setSelectedImage(file);
            }}
            className="block text-sm text-gray-600 border border-gray-300 rounded cursor-pointer focus:outline-none px-4 py-1"
          />

          {(form.imageUrl || selectedImage) && (
            <div className="mt-3">
              <p className="text-sm text-gray-700 mb-1">Preview:</p>
              <Image
                src={
                  selectedImage
                    ? URL.createObjectURL(selectedImage)
                    : form.imageUrl
                }
                alt="Hero Banner"
                width={600}
                height={350}
                className="rounded-lg shadow-md border border-gray-200 object-cover"
              />
            </div>
          )}
        </div>

        <button
          type="submit"
          disabled={uploading}
          className={`cursor-pointer px-4 py-2 rounded text-white font-medium ${
            uploading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {uploading ? "Menyimpan..." : "Simpan Perubahan"}
        </button>
      </form>
    </div>
  );
}
