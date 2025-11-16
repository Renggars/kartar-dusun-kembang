import { z } from "zod";
import { router, publicProcedure } from "../trpc";

import {
  listMarketplace,
  getMarketplaceBySlug,
  getRelatedMarketplace,
  createMarketplace,
  updateMarketplace,
  deleteMarketplace,
} from "@/server/service/marketplaceService";
import { MarketplaceInput } from "@/types";

export const marketplaceRouter = router({
  list: publicProcedure.query(({ ctx }) => {
    return listMarketplace(ctx);
  }),

  getBySlug: publicProcedure
    .input(z.object({ slug: z.string() }))
    .query(({ ctx, input }) => {
      return getMarketplaceBySlug(ctx, input.slug);
    }),

  getRelated: publicProcedure
    .input(
      z.object({
        category: z.string().optional(),
        excludeSlug: z.string().optional(),
      })
    )
    .query(({ ctx, input }) => {
      return getRelatedMarketplace(ctx, input as MarketplaceInput);
    }),

  create: publicProcedure
    .input(
      z.object({
        title: z.string(),
        slug: z.string(),
        category: z.enum(["UMKM", "Wisata", "Cafe", "Event"]),
        description: z.string(),
        imageUrl: z.string().nullable().optional(),
      })
    )
    .mutation(({ ctx, input }) =>
      createMarketplace(ctx, input as MarketplaceInput)
    ),

  update: publicProcedure
    .input(
      z.object({
        id: z.number(),
        title: z.string(),
        slug: z.string(),
        category: z.enum(["UMKM", "Wisata", "Cafe", "Event"]),
        description: z.string(),
        imageUrl: z.string().nullable().optional(),
      })
    )
    .mutation(({ ctx, input }) =>
      updateMarketplace(ctx, input as MarketplaceInput)
    ),

  delete: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation(({ ctx, input }) => deleteMarketplace(ctx, input.id)),
});
