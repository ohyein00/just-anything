import { NextRequest, NextResponse } from "next/server";
import { readFile } from "fs/promises";
import { join } from "path";
import { ItemsResponse } from "./route.type";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const page = searchParams.get("page") || "1";

    const filePath = join(process.cwd(), "public", "server", "data", "items", `page${page}.json`);
    const fileContents = await readFile(filePath, "utf8");
    const jsonContents = JSON.parse(fileContents) as ItemsResponse;
    return NextResponse.json(jsonContents);
  } catch (error) {
    console.error("Error fetching items:", error);
    return NextResponse.json({ error: "Failed to fetch items" }, { status: 500 });
  }
}
