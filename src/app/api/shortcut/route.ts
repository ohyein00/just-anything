import { NextResponse } from "next/server";
import { readFile } from "fs/promises";
import { join } from "path";
import { ShortcutResponse } from "./route.type";

export async function GET() {
  try {
    const filePath = join(process.cwd(), "public", "server", "data", "unit-shortcut.json");
    const fileContents = await readFile(filePath, "utf8");
    const jsonContents = JSON.parse(fileContents) as ShortcutResponse;
    return NextResponse.json(jsonContents);
  } catch (error) {
    console.error("Error fetching shortcut:", error);
    return NextResponse.json({ error: "Failed to fetch shortcut" }, { status: 500 });
  }
}
