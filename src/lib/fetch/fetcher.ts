// src/lib/api/fetcher.ts
import { baseUrl } from "@/lib/constants/url";

export async function baseClient<T>(endpoint: string, init: RequestInit = {}): Promise<T | null> {
  try {
    const res = await fetch(`${baseUrl}/api${endpoint}`, {
      ...init,
      headers: {
        accept: "application/json",
        ...(init.headers || {}),
      },
    });

    if (!res.ok) {
      return null;
    }

    return (await res.json()) as T;
  } catch (err) {
    console.error(`error on ${endpoint}:`, err);
    return null;
  }
}
