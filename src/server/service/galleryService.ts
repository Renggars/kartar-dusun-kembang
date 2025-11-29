// server/service/galleryService.ts

import { PrismaClient, Gallery, GalleryCategory } from "@prisma/client";

const prisma = new PrismaClient();

// Tipe data untuk input membuat item galeri
type CreateGalleryInput = {
  title: string;
  category: GalleryCategory;
  imageUrl: string;
};

// Tipe data untuk input update item galeri
type UpdateGalleryInput = Partial<CreateGalleryInput>;

export const galleryService = {
  // 1. Mendapatkan semua item galeri
  async getAllGalleries(): Promise<Gallery[]> {
    return await prisma.gallery.findMany({
      orderBy: { createdAt: "desc" },
    });
  },

  // 2. Membuat item galeri baru
  async createGallery(data: CreateGalleryInput): Promise<Gallery> {
    return await prisma.gallery.create({ data });
  },

  // 3. Menghapus item galeri berdasarkan ID
  async deleteGallery(id: number): Promise<Gallery> {
    return await prisma.gallery.delete({
      where: { id },
    });
  },

  // 4. Mengubah item galeri
  async updateGallery(id: number, data: UpdateGalleryInput): Promise<Gallery> {
    return await prisma.gallery.update({
      where: { id },
      data: data,
    });
  },
};
