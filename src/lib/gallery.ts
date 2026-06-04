import "server-only";
import fs from "node:fs/promises";
import path from "node:path";

export type GalleryEvent = {
  key: "2023" | "2024";
  images: string[];
};

const galleryRoot = path.join(process.cwd(), "public", "gallery");

export async function listEvent(key: GalleryEvent["key"]): Promise<string[]> {
  try {
    const files = await fs.readdir(path.join(galleryRoot, key));
    return files
      .filter((f) => /\.(jpe?g|png|webp)$/i.test(f))
      .sort()
      .map((f) => `/gallery/${key}/${f}`);
  } catch {
    return [];
  }
}
