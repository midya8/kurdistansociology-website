#!/usr/bin/env node
// Re-process gallery photos: auto-rotate based on EXIF, resize, write JPEG.
import sharp from "sharp";
import { readdir, mkdir, rm } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";

const SRC_ROOT = "/Users/midyarahmani/Downloads/KISA WEBSITE /pics";
const DST_ROOT = path.join(process.cwd(), "public", "gallery");

const events = [
  { src: "2024 Gathering", dst: "2024" },
  { src: "November 2023 Gathering", dst: "2023" },
];

for (const ev of events) {
  const srcDir = path.join(SRC_ROOT, ev.src);
  const dstDir = path.join(DST_ROOT, ev.dst);
  const thumbDir = path.join(dstDir, "thumb");

  // Clean and recreate
  if (existsSync(dstDir)) await rm(dstDir, { recursive: true, force: true });
  await mkdir(thumbDir, { recursive: true });

  const files = (await readdir(srcDir))
    .filter((f) => /\.(jpe?g|png|heic)$/i.test(f))
    .sort();

  console.log(`\n${ev.dst}: ${files.length} files`);

  let i = 1;
  for (const file of files) {
    const srcPath = path.join(srcDir, file);
    const num = String(i).padStart(2, "0");
    const fullPath = path.join(dstDir, `${num}.jpg`);
    const thumbPath = path.join(thumbDir, `${num}.jpg`);

    try {
      // .rotate() with no args = auto-rotate based on EXIF orientation
      const base = sharp(srcPath).rotate();

      await base
        .clone()
        .resize({ width: 1600, height: 1600, fit: "inside", withoutEnlargement: true })
        .jpeg({ quality: 82, mozjpeg: true })
        .toFile(fullPath);

      await base
        .clone()
        .resize({ width: 600, height: 600, fit: "cover", position: "centre" })
        .jpeg({ quality: 78, mozjpeg: true })
        .toFile(thumbPath);

      process.stdout.write(".");
      i++;
    } catch (e) {
      console.error(`\n  Failed ${file}: ${e.message}`);
    }
  }
  console.log(` done (${i - 1})`);
}
