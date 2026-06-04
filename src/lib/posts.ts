import "server-only";
import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import { locales, type Locale } from "@/i18n/config";

function normalizeLocale(value: string): Locale | null {
  return (locales as readonly string[]).includes(value) ? (value as Locale) : null;
}

export type PostMeta = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  author?: string;
};

export type Post = PostMeta & { contentHtml: string };

const contentRoot = path.join(process.cwd(), "src", "content", "news");

async function readDir(locale: Locale): Promise<string[]> {
  try {
    const files = await fs.readdir(path.join(contentRoot, locale));
    return files.filter((f) => f.endsWith(".md"));
  } catch {
    return [];
  }
}

export async function getAllPosts(localeInput: string): Promise<PostMeta[]> {
  const locale = normalizeLocale(localeInput);
  if (!locale) return [];
  const files = await readDir(locale);
  const posts = await Promise.all(
    files.map(async (file) => {
      const slug = file.replace(/\.md$/, "");
      const raw = await fs.readFile(path.join(contentRoot, locale, file), "utf8");
      const { data } = matter(raw);
      return {
        slug,
        title: String(data.title ?? slug),
        date: String(data.date ?? ""),
        excerpt: String(data.excerpt ?? ""),
        author: data.author ? String(data.author) : undefined,
      } satisfies PostMeta;
    })
  );
  return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getPost(localeInput: string, slug: string): Promise<Post | null> {
  const locale = normalizeLocale(localeInput);
  if (!locale) return null;
  const filePath = path.join(contentRoot, locale, `${slug}.md`);
  let raw: string;
  try {
    raw = await fs.readFile(filePath, "utf8");
  } catch {
    return null;
  }
  const { data, content } = matter(raw);
  const processed = await remark().use(html).process(content);
  return {
    slug,
    title: String(data.title ?? slug),
    date: String(data.date ?? ""),
    excerpt: String(data.excerpt ?? ""),
    author: data.author ? String(data.author) : undefined,
    contentHtml: processed.toString(),
  };
}
