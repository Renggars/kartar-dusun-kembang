import { z } from "zod";
import { router, publicProcedure } from "../trpc";
import { prisma } from "@/lib/prisma";

export const programRouter = router({
  list: publicProcedure
    .input(
      z
        .object({ take: z.number().optional(), skip: z.number().optional() })
        .optional()
    )
    .query(async ({ input }) => {
      const programs = await prisma.program.findMany({
        orderBy: { createdAt: "desc" },
        take: input?.take ?? 50,
        skip: input?.skip ?? 0,
      });
      return programs;
    }),

  get: publicProcedure
    .input(z.object({ slug: z.string() }))
    .query(async ({ input }) => {
      const p = await prisma.program.findUnique({
        where: { slug: input.slug },
      });
      return p;
    }),

  getBySlug: publicProcedure
    .input(z.object({ slug: z.string() }))
    .query(async ({ ctx, input }) => {
      return ctx.prisma.program.findUnique({
        where: { slug: input.slug },
      });
    }),

  getRelated: publicProcedure.query(async ({ ctx }) => {
    return ctx.prisma.program.findMany({
      take: 3,
      orderBy: { createdAt: "desc" },
      select: {
        slug: true,
        title: true,
        imageUrl: true,
      },
    });
  }),

  create: publicProcedure
    .input(
      z.object({
        slug: z.string().min(3),
        title: z.string().min(1),
        date: z.string(), // ISO string
        description: z.string(),
        imageUrl: z.string().nullable().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const cleanSlug = input.slug
        .toLowerCase()
        .replace(/ /g, "-") // Ganti spasi dengan strip
        .replace(/[^a-z0-9-]/g, ""); // Hapus karakter non-alfanumerik
      const program = await prisma.program.create({
        data: {
          slug: cleanSlug,
          title: input.title,
          date: new Date(input.date),
          description: input.description,
          imageUrl: input.imageUrl ?? null,
        },
      });
      return program;
    }),

  update: publicProcedure
    .input(
      z.object({
        id: z.number(),
        title: z.string(),
        slug: z.string(),
        date: z.string(),
        description: z.string(),
        imageUrl: z.string().nullable().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const cleanSlug = input.slug
        .toLowerCase()
        .replace(/ /g, "-") // Ganti spasi dengan strip
        .replace(/[^a-z0-9-]/g, ""); // Hapus karakter non-alfanumerik

      const updated = await prisma.program.update({
        where: { id: input.id },
        data: {
          title: input.title,
          slug: cleanSlug,
          date: new Date(input.date),
          description: input.description,
          imageUrl: input.imageUrl ?? null,
        },
      });
      return updated;
    }),

  delete: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      const deleted = await prisma.program.delete({ where: { id: input.id } });
      return deleted;
    }),
});
