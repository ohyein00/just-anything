import { GiftResponse } from "@/app/api/gift/route.type";
import { ItemsResponse } from "@/app/api/items/route.type";
import { ShortcutResponse } from "@/app/api/shortcut/route.type";
import { baseUrl } from "@/lib/constants/url";

export async function fetchGift(): Promise<GiftResponse | null> {
  try {
    const response = await fetch(`${baseUrl}/api/gift`);

    if (!response.ok) {
      throw new Error(`Failed to fetch gift: ${response.status}`);
    }

    return await response.json();
   } catch (error) {
    console.error("Error fetching gift:", error);
    return null
    };
}
