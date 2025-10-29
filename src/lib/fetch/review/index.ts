import { ReviewResponse } from "@/app/api/review/route.type";
import { baseUrl } from "@/lib/constants/url";

export async function fetchReview(): Promise<ReviewResponse | null> {
  try {
    const response = await fetch(`${baseUrl}/api/review`);

    if (!response.ok) {
      throw new Error(`Failed to fetch review: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching review:", error);
    return null;
  }
}
