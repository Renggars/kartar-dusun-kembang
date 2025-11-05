import { publicProcedure, router } from "../trpc";
import { z } from "zod";
import { createHeroSchema, updateHeroSchema } from "../validation/heroSchema";
import { prisma } from "@/lib/prisma";

export const heroRouter = router({
  // Get hero section (biasanya hanya 1)
  get: publicProcedure.query(async () => {
    const hero = await prisma.heroSection.findFirst();
    return hero;
  }),

  // Create new hero section
  create: publicProcedure
    .input(createHeroSchema)
    .mutation(async ({ input }) => {
      const hero = await prisma.heroSection.create({
        data: input,
      });
      return hero;
    }),

  // Update existing hero
  update: publicProcedure
    .input(updateHeroSchema)
    .mutation(async ({ input }) => {
      const hero = await prisma.heroSection.update({
        where: { id: input.id },
        data: {
          title: input.title,
          description: input.description,
          imageUrl: input.imageUrl,
        },
      });
      return hero;
    }),
});
