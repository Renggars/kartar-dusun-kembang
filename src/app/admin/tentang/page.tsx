"use client";

import { useState, useEffect } from "react";
import { trpc } from "@/server/client";
import Image from "next/image";
import { uploadAboutImage, deleteAboutImage } from "@/lib/uploadAboutImage";

export default function AboutPage() {
  const { data: about, isLoading, refetch } = trpc.about.get.useQuery();
  const updateAbout = trpc.about.update.useMutation();

  const [form, setForm] = useState({
    id: about?.id || "",
    visi: "",
    misi: "",
    imageUrl: "",
  });

  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (about) {
      setForm({
        id: about.id,
        visi: about.visi || "",
        misi: about.misi || "",
        imageUrl: about.imageUrl || "",
      });
    }
  }, [about]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.visi || !form.misi) {
      alert("Visi dan misi harus diisi!");
      return;
    }

    setUploading(true);
    let imageUrl = form.imageUrl || "";

    try {
      if (selectedImage) {
        // Hapus gambar lama jika ada
        if (form.imageUrl) {
          await deleteAboutImage(form.imageUrl);
        }

        // Upload gambar baru
        const uploadedUrl = await uploadAboutImage(selectedImage);
        if (!uploadedUrl) {
          alert("Gagal mengunggah gambar.");
          setUploading(false);
          return;
        }
        imageUrl = uploadedUrl;
      }

      // Update data di database
      await updateAbout.mutateAsync({
        ...form,
        imageUrl,
      });

      await refetch();
      alert("Data Tentang Kami berhasil disimpan!");
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
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Tentang Kami</h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block font-semibold mb-1">Visi</label>
          <textarea
            value={form.visi}
            onChange={(e) => setForm({ ...form, visi: e.target.value })}
            className="w-full border border-gray-300 px-3 py-2 rounded"
            placeholder="Tuliskan visi organisasi..."
            rows={3}
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Misi</label>
          <textarea
            value={form.misi}
            onChange={(e) => setForm({ ...form, misi: e.target.value })}
            className="w-full border border-gray-300 px-3 py-2 rounded"
            placeholder="Tuliskan misi organisasi..."
            rows={4}
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
                alt="Tentang Kami Banner"
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
