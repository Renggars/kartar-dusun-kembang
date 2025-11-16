// src/server/service/programService.ts
import { TRPCError } from "@trpc/server";
import type { Context } from "@/server/context";

export const listPrograms = async (
  ctx: Context,
  input?: { take?: number; skip?: number }
) => {
  return ctx.prisma.program.findMany({
    orderBy: { createdAt: "desc" },
    take: input?.take ?? 50,
    skip: input?.skip ?? 0,
  });
};

export const getProgram = async (ctx: Context, slug: string) => {
  const program = await ctx.prisma.program.findUnique({
    where: { slug },
  });

  if (!program) {
    throw new TRPCError({
      code: "NOT_FOUND",
      message: "Program tidak ditemukan",
    });
  }

  return program;
};

export const getProgramBySlug = async (ctx: Context, slug: string) => {
  return ctx.prisma.program.findUnique({ where: { slug } });
};

export const getRelatedPrograms = async (ctx: Context) => {
  return ctx.prisma.program.findMany({
    take: 3,
    orderBy: { createdAt: "desc" },
    select: {
      slug: true,
      title: true,
      imageUrl: true,
    },
  });
};

export const createProgram = async (
  ctx: Context,
  input: {
    slug: string;
    title: string;
    date: string;
    description: string;
    imageUrl?: string | null;
  }
) => {
  const cleanSlug = input.slug
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^a-z0-9-]/g, "");

  return ctx.prisma.program.create({
    data: {
      slug: cleanSlug,
      title: input.title,
      date: new Date(input.date),
      description: input.description,
      imageUrl: input.imageUrl ?? null,
    },
  });
};

export const updateProgram = async (
  ctx: Context,
  input: {
    id: number;
    slug: string;
    title: string;
    date: string;
    description: string;
    imageUrl?: string | null;
  }
) => {
  const cleanSlug = input.slug
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^a-z0-9-]/g, "");

  return ctx.prisma.program.update({
    where: { id: input.id },
    data: {
      slug: cleanSlug,
      title: input.title,
      date: new Date(input.date),
      description: input.description,
      imageUrl: input.imageUrl ?? null,
    },
  });
};

export const deleteProgram = async (ctx: Context, id: number) => {
  return ctx.prisma.program.delete({ where: { id } });
};
