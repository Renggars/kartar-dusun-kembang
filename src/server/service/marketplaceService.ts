import type { Context } from "@/server/context";
import { MarketplaceCategory, MarketplaceInput } from "@/types";
import { TRPCError } from "@trpc/server";

export const listMarketplace = (ctx: Context) => {
  return ctx.prisma.marketplaceItem.findMany({
    orderBy: { createdAt: "desc" },
  });
};

export const getMarketplaceBySlug = async (ctx: Context, slug: string) => {
  const item = await ctx.prisma.marketplaceItem.findUnique({
    where: { slug },
  });

  if (!item) {
    throw new TRPCError({ code: "NOT_FOUND", message: "Item tidak ditemukan" });
  }

  return item;
};

export const getRelatedMarketplace = (
  ctx: Context,
  input: { category?: MarketplaceCategory; excludeSlug?: string }
) => {
  return ctx.prisma.marketplaceItem.findMany({
    where: {
      category: input.category,
      slug: { not: input.excludeSlug },
    },
    take: 3,
    orderBy: { createdAt: "desc" },
    select: {
      slug: true,
      title: true,
      imageUrl: true,
      category: true,
    },
  });
};

export const createMarketplace = (ctx: Context, input: MarketplaceInput) => {
  const cleanSlug = input.slug
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^a-z0-9-]/g, "");

  return ctx.prisma.marketplaceItem.create({
    data: {
      title: input.title,
      slug: cleanSlug,
      category: input.category,
      description: input.description,
      imageUrl: input.imageUrl ?? null,
    },
  });
};

export const updateMarketplace = (ctx: Context, input: MarketplaceInput) => {
  const cleanSlug = input.slug
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^a-z0-9-]/g, "");

  return ctx.prisma.marketplaceItem.update({
    where: { id: input.id },
    data: {
      title: input.title,
      slug: cleanSlug,
      category: input.category,
      description: input.description,
      imageUrl: input.imageUrl ?? null,
    },
  });
};

export const deleteMarketplace = (ctx: Context, id: number) => {
  return ctx.prisma.marketplaceItem.delete({
    where: { id },
  });
};
