import Link from "next/link";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/getDictionary";
import { getAllPosts } from "@/lib/posts";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  return { title: dict.news.title };
}

export default async function NewsIndexPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  const posts = await getAllPosts(locale);
  const dateLocale = locale === "ku" ? "ckb-IQ" : "en-US";

  return (
    <div className="mx-auto max-w-3xl px-6 py-20">
      <header className="mb-12">
        <h1 className="font-serif text-4xl md:text-5xl tracking-tight">{dict.news.title}</h1>
        <p className="mt-6 text-lg text-foreground/80 leading-relaxed">{dict.news.lead}</p>
      </header>
      {posts.length === 0 ? (
        <p className="text-muted">{dict.news.empty}</p>
      ) : (
        <ul className="divide-y divide-border">
          {posts.map((post) => (
            <li key={post.slug} className="py-8 first:pt-0">
              <Link href={`/${locale}/news/${post.slug}`} className="group block">
                <time className="text-xs text-muted">
                  {new Date(post.date).toLocaleDateString(dateLocale, {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </time>
                <h2 className="mt-2 font-serif text-2xl leading-snug group-hover:text-accent transition-colors">
                  {post.title}
                </h2>
                <p className="mt-3 text-foreground/75 leading-relaxed">{post.excerpt}</p>
                <span className="mt-3 inline-block text-sm text-accent">
                  {dict.news.readMore} →
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
