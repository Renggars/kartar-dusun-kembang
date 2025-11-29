// server/routers/gallery.ts

import { z } from "zod";
import { galleryService } from "../service/galleryService";
import { GalleryCategory } from "@prisma/client";
import { publicProcedure, router } from "../trpc";

// Skema untuk GalleryCategory (dari Prisma Enum)
const GalleryCategorySchema = z.enum(GalleryCategory);

// Skema Validasi untuk membuat/mengubah
const GalleryInputSchema = z.object({
  title: z.string().min(3, "Judul minimal 3 karakter."),
  category: GalleryCategorySchema,
  imageUrl: z.string().url("URL gambar tidak valid."),
});

export const galleryRouter = router({
  // READ: Mendapatkan semua item galeri (Bisa diakses publik atau admin)
  getAll: publicProcedure.query(() => {
    return galleryService.getAllGalleries();
  }),

  create: publicProcedure.input(GalleryInputSchema).mutation(({ input }) => {
    return galleryService.createGallery(input);
  }),

  delete: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation(({ input }) => {
      return galleryService.deleteGallery(input.id);
    }),

  // UPDATE: Mengubah item galeri (Hanya Admin)
  update: publicProcedure
    .input(
      z.object({
        id: z.number(),
        data: GalleryInputSchema.partial(),
      })
    )
    .mutation(({ input }) => {
      return galleryService.updateGallery(input.id, input.data);
    }),
});
