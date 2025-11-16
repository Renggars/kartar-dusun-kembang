export type ProgramItem = {
  id: number;
  title: string;
  description: string;
  slug: string;
  imageUrl: string | null;
  date: Date;
  createdAt: Date;
  updatedAt: Date;
};

export type MarketplaceItem = {
  id: number;
  slug: string;
  title: string;
  category: string;
  description: string;
  imageUrl: string | null;
  createdAt: Date;
  updatedAt: Date;
};

// src/types/marketplace.ts
export enum MarketplaceCategory {
  Umkm = "UMKM",
  Wisata = "Wisata",
  Cafe = "Cafe",
  Event = "Event",
}

export type MarketplaceCategoryType = keyof typeof MarketplaceCategory;
