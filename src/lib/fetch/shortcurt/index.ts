import { ItemsResponse } from "@/app/api/items/route.type";
import { ShortcutResponse } from "@/app/api/shortcut/route.type";
import { baseUrl } from "@/lib/constants/url";

export async function fetchShortcut(): Promise<ShortcutResponse | null> {
  try {
    const response = await fetch(`${baseUrl}/api/shortcut`);

    if (!response.ok) {
      console.log(`Failed to fetch shortcut: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error("Error fetching shortcut:", error);
    return null;
  }
}
