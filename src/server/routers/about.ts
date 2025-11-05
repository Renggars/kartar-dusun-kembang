import { z } from "zod";
import { publicProcedure, router } from "../trpc";

export const aboutRouter = router({
  get: publicProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.about.findFirst();
  }),

  update: publicProcedure
    .input(
      z.object({
        visi: z.string().optional(),
        misi: z.string().optional(),
        imageUrl: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const existing = await ctx.prisma.about.findFirst();

      if (existing) {
        return await ctx.prisma.about.update({
          where: { id: existing.id },
          data: input,
        });
      } else {
        return await ctx.prisma.about.create({
          data: input,
        });
      }
    }),
});
