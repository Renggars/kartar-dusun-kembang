import { z } from "zod";

export const createHeroSchema = z.object({
  title: z.string(),
  description: z.string(),
  imageUrl: z.string().url("URL gambar tidak valid").optional(),
});

export const updateHeroSchema = createHeroSchema.extend({
  id: z.string(),
});
