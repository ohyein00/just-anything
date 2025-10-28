import { ItemsResponse } from "@/app/api/items/route.type";
import { baseUrl } from "@/lib/constants/url";

export async function fetchItems(page = 1): Promise<ItemsResponse | null> {
  try {
    const response = await fetch(`${baseUrl}/api/items?page=${page}`);

    if (!response.ok) {
      console.log("Error fetching items:", response);
    }

    return await response.json();
  } catch (error) {
    console.log("Error fetching items:", error);
    return {
      items: [],
      pagination: { total: 0, current: 0, pageSize: 0, itemSize: 0 },
    };
  }
}
