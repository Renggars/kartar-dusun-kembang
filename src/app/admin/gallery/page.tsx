// app/admin/gallery/page.tsx atau components/admin/AdminGalleryPage.tsx

"use client";

import { useState } from "react";
import Image from "next/image";
import { FaFileUpload } from "react-icons/fa";
import { X, Loader2, Save } from "lucide-react"; // Menambahkan beberapa ikon

// Asumsikan path trpc, types, dan lib/uploadGalleryImage benar
import { trpc } from "@/trpc/client";
import { Gallery, GalleryCategory } from "@prisma/client"; // Ambil tipe dari prisma client
import {
  deleteGalleryImage,
  uploadGalleryImage,
} from "@/lib/uploadGalleryImage"; // Fungsi upload baru

// --- Tipe Data Form Modal ---
type EditGalleryForm = {
  id?: number;
  title: string;
  category: GalleryCategory;
  imageUrl?: string;
};

// --- Komponen Utama ---
export default function AdminGalleryPage() {
  const ctx = trpc.useContext();
  // Asumsi trpc.gallery.getAll sudah didefinisikan di router
  const dataQuery = trpc.gallery.getAll.useQuery();

  // Mutations
  const createMutation = trpc.gallery.create.useMutation({
    onSuccess: () => ctx.gallery.getAll.invalidate(),
  });

  const updateMutation = trpc.gallery.update.useMutation({
    onSuccess: () => ctx.gallery.getAll.invalidate(),
  });

  const deleteMutation = trpc.gallery.delete.useMutation({
    onSuccess: () => ctx.gallery.getAll.invalidate(),
  });

  const [editing, setEditing] = useState<EditGalleryForm | null>(null);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  if (dataQuery.isLoading) return <div className="p-8">Loading...</div>;

  const resetModal = () => {
    setEditing(null);
    setSelectedImage(null);
    setUploading(false);
  };

  // --- LOGIKA SUBMIT FORM (CREATE / UPDATE) ---
  const handleSubmit = async () => {
    if (!editing || (editing.id && !editing.imageUrl && !selectedImage)) return;

    // Validasi dasar
    if (!editing.title) {
      alert("Judul harus diisi.");
      return;
    }

    setUploading(true);
    let finalImageUrl = editing.imageUrl ?? "";

    try {
      if (selectedImage) {
        // 1. Jika ini item lama DAN ada gambar baru, hapus gambar lama dulu
        if (editing.id && editing.imageUrl) {
          await deleteGalleryImage(editing.imageUrl);
        }
        // 2. Upload gambar baru
        finalImageUrl = await uploadGalleryImage(selectedImage);
      }

      const payload = {
        title: editing.title,
        category: editing.category,
        imageUrl: finalImageUrl,
      };

      // 3. Panggil tRPC
      if (editing.id) {
        // UPDATE
        await updateMutation.mutateAsync({
          id: editing.id,
          data: payload,
        });
      } else {
        // CREATE
        await createMutation.mutateAsync(payload);
      }

      resetModal();
    } catch (error) {
      console.error("Error saat menyimpan/mengunggah:", error);
      alert(
        `Gagal menyimpan data: ${
          error instanceof Error ? error.message : "Terjadi kesalahan."
        }`
      );
    } finally {
      setUploading(false);
    }
  };

  // --- Render ---
  return (
    <div className="p-6 md:p-8 max-w-6xl mx-auto text-gray-900">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Galeri Kegiatan</h1>
        <button
          onClick={() =>
            setEditing({
              title: "",
              category: GalleryCategory.UMKM,
            })
          }
          className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition"
        >
          + Tambah Item
        </button>
      </div>

      {/* List Items */}
      <div className="grid gap-4">
        {dataQuery.data?.map((item: Gallery) => (
          <div
            key={item.id}
            className="bg-white p-4 rounded-xl shadow-md flex items-center justify-between border border-gray-100"
          >
            <div className="flex items-center gap-4">
              {/* Gambar Item */}
              <Image
                src={item.imageUrl ?? "/placeholder-400x300.png"}
                alt={item.title}
                width={96}
                height={64}
                className="w-24 h-16 object-cover rounded-lg shrink-0"
              />

              {/* Detail Item */}
              <div>
                <span className="font-semibold text-gray-800 block">
                  {item.title}
                </span>
                <span className="text-xs text-blue-600 font-medium bg-blue-50/50 px-2 py-0.5 rounded-full inline-block mt-0.5">
                  {item.category}
                </span>
              </div>
            </div>

            {/* Aksi */}
            <div className="flex gap-2">
              <button
                onClick={() =>
                  setEditing({
                    id: item.id,
                    title: item.title,
                    category: item.category,
                    imageUrl: item.imageUrl,
                  })
                }
                className="px-3 py-1 bg-yellow-500 text-white text-sm rounded-md hover:bg-yellow-600 transition"
              >
                Edit
              </button>

              <button
                onClick={async () => {
                  if (confirm(`Yakin ingin menghapus item "${item.title}"?`)) {
                    // 1. Hapus gambar dari Supabase
                    if (item.imageUrl) await deleteGalleryImage(item.imageUrl);

                    // 2. Hapus data dari database
                    deleteMutation.mutate({ id: item.id });
                  }
                }}
                disabled={deleteMutation.isPending}
                className="px-3 py-1 bg-red-600 text-white text-sm rounded-md hover:bg-red-700 transition"
              >
                {deleteMutation.isPending ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  "Hapus"
                )}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* --- MODAL FORM (CREATE / UPDATE) --- */}
      {editing && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 transition-opacity duration-300">
          <div className="bg-white w-full max-w-2xl rounded-xl p-6 relative shadow-2xl">
            {/* Close Button */}
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-900 transition"
              onClick={resetModal}
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-xl font-bold mb-5 text-gray-800">
              {editing.id ? "Edit Item Galeri" : "Tambah Item Galeri Baru"}
            </h2>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
              }}
            >
              {/* Judul & Kategori */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Judul Foto/Kegiatan
                  </label>
                  <input
                    type="text"
                    value={editing.title}
                    onChange={(e) =>
                      setEditing({ ...editing, title: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Kategori
                  </label>
                  <select
                    value={editing.category}
                    onChange={(e) =>
                      setEditing({
                        ...editing,
                        category: e.target.value as GalleryCategory,
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 bg-white"
                    required
                  >
                    {Object.values(GalleryCategory).map((cat: string) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Image Upload */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Gambar
                </label>
                <div className="flex items-center gap-4">
                  {/* Pratinjau Gambar */}
                  <div className="relative w-32 h-24 bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center border border-dashed border-gray-400">
                    {selectedImage || editing.imageUrl ? (
                      <Image
                        alt="Pratinjau Gambar"
                        fill
                        src={
                          selectedImage
                            ? URL.createObjectURL(selectedImage)
                            : editing.imageUrl!
                        }
                        className="object-cover"
                      />
                    ) : (
                      <FaFileUpload className="text-3xl text-gray-400" />
                    )}
                  </div>

                  {/* Input File */}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) setSelectedImage(file);
                    }}
                    className="text-sm file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  />
                </div>
                {editing.imageUrl && !selectedImage && (
                  <p className="text-xs text-gray-500 mt-1">
                    Gambar saat ini: {editing.imageUrl.substring(0, 50)}...
                  </p>
                )}
                {selectedImage && (
                  <p className="text-xs text-red-500 mt-1">
                    Gambar akan diganti saat disimpan.
                  </p>
                )}
              </div>

              {/* Tombol Aksi */}
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={resetModal}
                  className="px-5 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition"
                >
                  Batal
                </button>

                <button
                  type="submit"
                  disabled={
                    uploading ||
                    createMutation.isPending ||
                    updateMutation.isPending
                  }
                  className="inline-flex items-center gap-2 px-5 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition disabled:opacity-50"
                >
                  {uploading ||
                  createMutation.isPending ||
                  updateMutation.isPending ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" /> Menyimpan...
                    </>
                  ) : (
                    <>
                      <Save className="w-5 h-5" /> Simpan
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
