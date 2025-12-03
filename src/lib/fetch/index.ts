// src/lib/api/gift.ts
import { baseClient } from "@/lib/fetch/fetcher";
import { GiftResponse } from "@/app/api/gift/route.type";
import { ItemsResponse } from "@/app/api/items/route.type";
import { ShortcutResponse } from "@/app/api/shortcut/route.type";
import { ReviewResponse } from "@/app/api/review/route.type";

export async function fetchItems(page = 1): Promise<ItemsResponse | null> {
  return baseClient<ItemsResponse>(`/items?page=${page}`, { cache: "no-store" });
}
export async function fetchGift(): Promise<GiftResponse | null> {
  return baseClient<GiftResponse>("/gift");
}

export async function fetchShortcut(): Promise<ShortcutResponse | null> {
  return baseClient<ShortcutResponse>("/shortcut");
}

export async function fetchReview(): Promise<ReviewResponse | null> {
  return baseClient<ReviewResponse>("/review");
}
