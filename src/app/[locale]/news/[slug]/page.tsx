import Link from "next/link";
import { notFound } from "next/navigation";
import { locales } from "@/i18n/config";
import { getDictionary } from "@/i18n/getDictionary";
import { getAllPosts, getPost } from "@/lib/posts";

export async function generateStaticParams() {
  const all = await Promise.all(
    locales.map(async (locale) => {
      const posts = await getAllPosts(locale);
      return posts.map((p) => ({ locale, slug: p.slug }));
    })
  );
  return all.flat();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const post = await getPost(locale, slug);
  if (!post) return {};
  return { title: post.title, description: post.excerpt };
}

export default async function NewsPostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const post = await getPost(locale, slug);
  if (!post) notFound();
  const dict = await getDictionary(locale);
  const dateLocale = locale === "ku" ? "ckb-IQ" : "en-US";

  return (
    <article className="mx-auto max-w-2xl px-6 py-20">
      <Link
        href={`/${locale}/news`}
        className="text-sm text-muted hover:text-foreground transition-colors"
      >
        ← {dict.news.title}
      </Link>
      <header className="mt-8 mb-10">
        <time className="text-xs uppercase tracking-widest text-accent">
          {new Date(post.date).toLocaleDateString(dateLocale, {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </time>
        <h1 className="mt-3 font-serif text-3xl md:text-4xl leading-tight tracking-tight">
          {post.title}
        </h1>
        {post.author && <p className="mt-3 text-muted">— {post.author}</p>}
      </header>
      <div
        className="prose-body text-foreground/85 leading-relaxed text-[1.05rem]"
        dangerouslySetInnerHTML={{ __html: post.contentHtml }}
      />
    </article>
  );
}
