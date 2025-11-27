"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

import { trpc } from "@/trpc/client";
import { FaFileUpload } from "react-icons/fa";
import { MarketplaceCategory, MarketplaceItem } from "@/types";
import {
  deleteMarketplaceImage,
  uploadMarketplaceImage,
} from "@/lib/uploadMarketplaceImage";

export default function AdminMarketplacePage() {
  const ctx = trpc.useContext();
  const dataQuery = trpc.marketplace.list.useQuery();

  const createMutation = trpc.marketplace.create.useMutation({
    onSuccess: () => ctx.marketplace.list.invalidate(),
  });

  const updateMutation = trpc.marketplace.update.useMutation({
    onSuccess: () => ctx.marketplace.list.invalidate(),
  });

  const deleteMutation = trpc.marketplace.delete.useMutation({
    onSuccess: () => ctx.marketplace.list.invalidate(),
  });

  const [editing, setEditing] = useState<null | {
    id?: number;
    slug: string;
    title: string;
    category: MarketplaceCategory;
    description: string;
    imageUrl?: string;
    noHp?: string | null;
  }>(null);

  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  if (dataQuery.isLoading) return <div className="p-8">Loading...</div>;

  const resetModal = () => {
    setEditing(null);
    setSelectedImage(null);
    setUploading(false);
  };

  return (
    <div className="p-8 max-w-6xl mx-auto text-gray-900">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Admin Marketplace</h1>
        <button
          onClick={() =>
            setEditing({
              slug: `marketplace-${Date.now()}`,
              title: "",
              category: MarketplaceCategory.Umkm,
              description: "",
              imageUrl: undefined,
            })
          }
          className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700"
        >
          + Tambah Item
        </button>
      </div>

      {/* List Items */}
      <div className="grid gap-4">
        {dataQuery.data?.map((item: MarketplaceItem) => (
          <div
            key={item.id}
            className="bg-white p-4 rounded-lg shadow flex items-center justify-between"
          >
            <div className="flex items-center gap-4">
              <Image
                src={item.imageUrl ?? "/placeholder-400x300.png"}
                alt={item.title}
                width={96}
                height={64}
                className="w-24 h-16 object-cover rounded-md"
              />

              <div>
                <Link
                  href={`/marketplace/${item.slug}`}
                  className="font-semibold text-gray-800"
                >
                  {item.title}
                </Link>

                <div className="text-xs text-gray-500">{item.category}</div>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() =>
                  setEditing({
                    id: item.id,
                    slug: item.slug,
                    title: item.title,
                    category: item.category as MarketplaceCategory,
                    description: item.description,
                    imageUrl: item.imageUrl ?? undefined,
                    noHp: "",
                  })
                }
                className="px-3 py-1 bg-yellow-500 text-white rounded-md"
              >
                Edit
              </button>

              <button
                onClick={() => {
                  if (confirm("Hapus item marketplace ini?")) {
                    if (item.imageUrl) deleteMarketplaceImage(item.imageUrl);
                    deleteMutation.mutate({ id: item.id });
                  }
                }}
                className="px-3 py-1 bg-red-600 text-white rounded-md"
              >
                Hapus
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Form */}
      {editing && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
          <div className="bg-white w-full max-w-2xl rounded-lg p-6 relative">
            <button
              className="absolute top-3 right-3 text-gray-500"
              onClick={resetModal}
            >
              ✕
            </button>

            <h2 className="text-lg font-semibold mb-3">
              {editing.id ? "Edit Item" : "Tambah Item"}
            </h2>

            {/* Slug */}
            <label className="block mb-2 text-sm">Slug</label>
            <input
              value={editing.slug}
              onChange={(e) => setEditing({ ...editing, slug: e.target.value })}
              className="w-full px-3 py-2 border rounded mb-3 border-gray-500"
            />

            {/* Title */}
            <label className="block mb-2 text-sm">Judul</label>
            <input
              value={editing.title}
              onChange={(e) =>
                setEditing({ ...editing, title: e.target.value })
              }
              className="w-full px-3 py-2 border rounded mb-3 border-gray-500"
            />

            {/* Category */}
            <label className="block mb-2 text-sm">Kategori</label>
            <select
              value={editing.category}
              onChange={(e) =>
                setEditing({
                  ...editing,
                  category: e.target.value as MarketplaceCategory,
                })
              }
              className="w-full px-3 py-2 border mb-3 rounded border-gray-500"
            >
              {Object.values(MarketplaceCategory).map((cat: string) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>

            {/* No HP */}
            <label className="block mb-2 text-sm">Nomor HP (opsional)</label>
            <input
              value={editing.noHp ?? ""}
              onChange={(e) => setEditing({ ...editing, noHp: e.target.value })}
              placeholder="08xxxxxxxxxx"
              className="w-full px-3 py-2 border rounded mb-3 border-gray-500"
            />

            {/* Description */}
            <label className="block mb-2 text-sm">Deskripsi</label>
            <textarea
              rows={4}
              value={editing.description}
              onChange={(e) =>
                setEditing({ ...editing, description: e.target.value })
              }
              className="w-full px-3 py-2 border rounded mb-3 border-gray-500"
            />

            {/* Image Upload */}
            <label className="block mb-2 text-sm">Gambar</label>
            <div className="flex items-center gap-3 mb-4">
              <div className="relative w-32 h-24 bg-gray-100 rounded overflow-hidden flex items-center justify-center">
                {selectedImage ? (
                  <Image
                    alt="preview"
                    fill
                    src={URL.createObjectURL(selectedImage)}
                    className="object-cover"
                  />
                ) : editing.imageUrl ? (
                  <Image
                    alt="preview"
                    fill
                    src={editing.imageUrl}
                    className="object-cover"
                  />
                ) : (
                  <FaFileUpload className="text-3xl text-gray-500" />
                )}
              </div>

              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) setSelectedImage(file);
                }}
              />
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-2">
              <button onClick={resetModal} className="px-4 py-2 border rounded">
                Batal
              </button>

              <button
                disabled={uploading}
                onClick={async () => {
                  setUploading(true);

                  let finalImageUrl = editing.imageUrl ?? "";

                  if (selectedImage) {
                    if (editing.imageUrl) {
                      await deleteMarketplaceImage(editing.imageUrl);
                    }
                    finalImageUrl = await uploadMarketplaceImage(selectedImage);
                  }

                  const payload = {
                    slug: editing.slug,
                    title: editing.title,
                    category: editing.category,
                    description: editing.description,
                    imageUrl: finalImageUrl,
                    noHp: editing.noHp || null,
                  };

                  if (editing.id) {
                    await updateMutation.mutateAsync({
                      id: editing.id,
                      ...payload,
                    });
                  } else {
                    await createMutation.mutateAsync(payload);
                  }

                  resetModal();
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded"
              >
                {uploading ? "Menyimpan..." : "Simpan"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
