"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  uploadProgramImage,
  deleteProgramImage,
} from "@/lib/uploadProgramImage";
import { trpc } from "@/trpc/client";
import { FaFileUpload } from "react-icons/fa";

function formatDate(d: string) {
  return new Date(d).toLocaleDateString("id-ID", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function AdminProgramsPage() {
  const ctx = trpc.useContext();
  const programsQuery = trpc.program.list.useQuery();

  const createMutation = trpc.program.create.useMutation({
    onSuccess: () => ctx.program.list.invalidate(),
  });

  const updateMutation = trpc.program.update.useMutation({
    onSuccess: () => ctx.program.list.invalidate(),
  });

  const deleteMutation = trpc.program.delete.useMutation({
    onSuccess: () => ctx.program.list.invalidate(),
  });

  const [editing, setEditing] = useState<null | {
    id?: number;
    slug: string;
    title: string;
    date: string;
    description: string;
    imageUrl?: string;
  }>(null);

  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  if (programsQuery.isLoading) return <div className="p-8">Loading...</div>;

  const resetModal = () => {
    setEditing(null);
    setSelectedImage(null);
    setUploading(false);
  };

  return (
    <div className="p-8 max-w-6xl mx-auto text-gray-900">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Admin Program</h1>

        <button
          onClick={() =>
            setEditing({
              slug: `program-${Date.now()}`,
              title: "",
              date: new Date().toISOString(),
              description: "",
              imageUrl: undefined,
            })
          }
          className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700"
        >
          + Tambah Program
        </button>
      </div>

      {/* List Program */}
      <div className="grid gap-4">
        {programsQuery.data?.map((p) => (
          <div
            key={p.id}
            className="bg-white p-4 rounded-lg shadow flex items-center justify-between"
          >
            <div className="flex items-center gap-4">
              <Image
                src={p.imageUrl ?? "/placeholder-400x300.png"}
                alt={p.title}
                width={96}
                height={64}
                className="w-24 h-16 object-cover rounded-md"
              />
              <div>
                <Link
                  href={`/program/${p.slug}`}
                  className="font-semibold text-gray-800"
                >
                  {p.title}
                </Link>
                <div className="text-xs text-gray-500">
                  {formatDate(p.date.toString())}
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() =>
                  setEditing({
                    id: p.id,
                    slug: p.slug,
                    title: p.title,
                    date: p.date.toISOString(),
                    description: p.description,
                    imageUrl: p.imageUrl ?? undefined,
                  })
                }
                className="px-3 py-1 bg-yellow-500 text-white rounded-md"
              >
                Edit
              </button>
              <button
                onClick={() => {
                  if (confirm("Hapus program ini?")) {
                    if (p.imageUrl) deleteProgramImage(p.imageUrl);
                    deleteMutation.mutate({ id: p.id });
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
              className="absolute top-3 right-3 text-gray-500 cursor-pointer"
              onClick={resetModal}
            >
              ✕
            </button>

            <h2 className="text-lg font-semibold mb-3">
              {editing.id ? "Edit Program" : "Buat Program"}
            </h2>

            {/* Slug */}
            <label className="block mb-2 text-sm">Slug</label>
            <input
              value={editing.slug}
              onChange={(e) => setEditing({ ...editing, slug: e.target.value })}
              className="w-full px-3 py-2 border rounded mb-3 border-gray-500"
            />

            {/* Judul */}
            <label className="block mb-2 text-sm">Judul</label>
            <input
              value={editing.title}
              onChange={(e) =>
                setEditing({ ...editing, title: e.target.value })
              }
              className="w-full px-3 py-2 border rounded mb-3 border-gray-500"
            />

            {/* Tanggal */}
            <label className="block mb-2 text-sm">Tanggal</label>
            <input
              type="date"
              value={editing.date.slice(0, 10)}
              onChange={(e) =>
                setEditing({
                  ...editing,
                  date: new Date(e.target.value).toISOString(),
                })
              }
              className="w-full px-3 py-2 border rounded mb-3 border-gray-500"
            />

            {/* Deskripsi */}
            <label className="block mb-2 text-sm">Deskripsi</label>
            <textarea
              value={editing.description}
              onChange={(e) =>
                setEditing({ ...editing, description: e.target.value })
              }
              rows={4}
              className="w-full px-3 py-2 border rounded mb-3 border-gray-500"
            />

            {/* Upload Gambar */}
            <label className="block mb-2 text-sm">Gambar</label>
            <div className="flex items-center gap-3 mb-4">
              <div className="relative w-32 h-24 bg-gray-100 rounded flex items-center justify-center overflow-hidden">
                {selectedImage ? (
                  // Jika user baru upload gambar → tampilkan preview
                  <Image
                    alt="preview"
                    fill
                    src={URL.createObjectURL(selectedImage)}
                    className="object-cover rounded"
                  />
                ) : editing.imageUrl ? (
                  // Jika sedang edit dan ada gambar lama → tampilkan gambar lama
                  <Image
                    alt="preview"
                    fill
                    src={editing.imageUrl}
                    className="object-cover rounded"
                  />
                ) : (
                  // Jika tidak ada gambar sama sekali → tampilkan icon upload
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
              <button onClick={resetModal} className="px-4 py-2 rounded border">
                Batal
              </button>

              <button
                onClick={async () => {
                  setUploading(true);

                  let finalImageUrl = editing.imageUrl ?? "";

                  // Jika upload gambar baru
                  if (selectedImage) {
                    if (editing.imageUrl) {
                      await deleteProgramImage(editing.imageUrl);
                    }
                    finalImageUrl = await uploadProgramImage(selectedImage);
                  }

                  const payload = {
                    slug: editing.slug,
                    title: editing.title,
                    date: editing.date,
                    description: editing.description,
                    imageUrl: finalImageUrl,
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
                className="px-4 py-2 rounded bg-blue-600 text-white"
                disabled={uploading}
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
