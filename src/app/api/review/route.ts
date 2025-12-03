import { NextRequest, NextResponse } from "next/server";
import { readFile } from "fs/promises";
import { join } from "path";
import { ReviewResponse } from "./route.type";

export async function GET() {
  try {
    const filePath = join(process.cwd(), "public", "server", "data", "unit-review.json");
    const fileContents = await readFile(filePath, "utf8");
    const jsonContents = JSON.parse(fileContents) as ReviewResponse;

    return NextResponse.json(jsonContents);
  } catch (error) {
    console.error("Error fetching review:", error);
    return NextResponse.json({ error: "Failed to fetch review" }, { status: 500 });
  }
}
