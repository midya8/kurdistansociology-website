import Link from "next/link";
import Image from "next/image";
import { getDictionary } from "@/i18n/getDictionary";
import { getAllPosts } from "@/lib/posts";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  const posts = (await getAllPosts(locale)).slice(0, 3);
  const h = dict.home;
  const fmtShort = (d: string) =>
    new Date(d).toLocaleDateString(locale === "ku" ? "ckb-IQ" : "en-US", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

  return (
    <>
      {/* ---------- HERO (editorial) ---------- */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="hero-grid-bg absolute inset-0 opacity-60" />
        <div className="relative mx-auto max-w-[1440px] px-6 lg:px-8 py-24 grid gap-20 lg:grid-cols-[1.45fr_1fr] items-center">
          <div>
            <div className="flex items-center gap-4 mb-7 reverse-on-rtl">
              <span className="h-px w-12 bg-gold" />
              <span className="eyebrow">{h.heroEyebrow}</span>
            </div>
            <h1 className="font-serif font-medium tracking-tight text-foreground text-[clamp(2.75rem,6vw,5rem)] leading-[1.02]">
              {h.heroTitle}
            </h1>
            <p className="mt-8 max-w-xl font-serif text-[1.4rem] leading-snug text-foreground-soft">
              {h.heroLead}
            </p>
            <div className="mt-10 flex flex-wrap gap-3 reverse-on-rtl">
              <Link href={`/${locale}/conference`} className="btn btn-primary">
                {h.ctaConference} →
              </Link>
              <Link href={`/${locale}/members`} className="btn btn-ghost">
                {h.ctaJoin}
              </Link>
            </div>
          </div>

          <div className="flex flex-col items-center gap-6">
            <div className="relative w-full max-w-[420px] aspect-square">
              <div
                className="absolute -inset-5 rounded-full"
                style={{
                  background:
                    "radial-gradient(circle, rgba(162,121,41,0.18) 0%, transparent 65%)",
                }}
              />
              <Image
                src="/logo.png"
                alt="KISA medallion"
                fill
                className="object-cover rounded-full relative drop-shadow-xl ring-1 ring-gold-soft/40"
                priority
                sizes="(max-width: 1024px) 70vw, 420px"
              />
            </div>
            <div className="flex items-center gap-4 text-gold-deep">
              {h.heroMeta.map((m, i) => (
                <span key={m} className="flex items-center gap-4">
                  <span className="font-mono text-[10px] tracking-[0.22em]">{m}</span>
                  {i < h.heroMeta.length - 1 && (
                    <span className="h-3.5 w-px bg-border" />
                  )}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ---------- TICKER ---------- */}
      <div className="border-y border-border bg-bg-alt overflow-hidden">
        <div className="mx-auto max-w-[1440px] px-6 lg:px-8 py-2.5 flex flex-wrap gap-x-10 gap-y-1 justify-center font-mono text-[11px] uppercase tracking-[0.16em] text-foreground-soft">
          {h.ticker.map((t, i) => (
            <span key={t} className="flex items-center gap-10">
              <span>{t}</span>
              {i < h.ticker.length - 1 && <span className="text-gold">✦</span>}
            </span>
          ))}
        </div>
      </div>

      {/* ---------- ACTIVITIES ---------- */}
      <section className="mx-auto max-w-[1440px] px-6 lg:px-8 py-24">
        <div className="rule-double mb-5" />
        <div className="eyebrow mb-2">§ 01</div>
        <h2 className="font-serif text-[clamp(1.75rem,3.6vw,2.5rem)] font-medium tracking-tight mb-8">
          {h.highlightsTitle}
        </h2>
        <div className="grid sm:grid-cols-2 border-t border-s border-border">
          {h.highlights.map((item, i) => (
            <article
              key={item.title}
              className="flex items-start gap-8 p-9 border-b border-e border-border bg-surface reverse-on-rtl"
            >
              <div className="num-display text-5xl min-w-[3.5rem]">
                {String(i + 1).padStart(2, "0")}
              </div>
              <div>
                <h3 className="font-serif text-xl font-medium text-foreground">
                  {item.title}
                </h3>
                <p className="mt-2.5 text-foreground-soft leading-relaxed">
                  {item.body}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ---------- CONFERENCE POSTER ---------- */}
      <section className="relative overflow-hidden bg-[rgb(16_22_42)] text-[rgb(246_240_226)]">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 60% 80% at 90% 50%, rgba(162,121,41,0.18) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(135deg, rgb(162 121 41) 0 1px, transparent 1px 24px)",
          }}
        />
        <div className="relative mx-auto max-w-[1440px] px-6 lg:px-8 py-24 grid gap-20 lg:grid-cols-[1.1fr_1fr] items-center">
          <div>
            <div className="font-mono text-[11px] tracking-[0.22em] text-gold mb-6">
              ✦ {h.featureKicker} · KISA · 2026
            </div>
            <h2 className="font-serif text-[clamp(2.25rem,5vw,3.75rem)] leading-[1.05] tracking-tight">
              {h.featureTitle}
            </h2>
            <p className="mt-5 max-w-lg font-serif text-[1.4rem] italic leading-snug text-[rgb(246_240_226)]/85">
              {h.featureSubtitle}
            </p>
            <p className="mt-7 max-w-lg leading-relaxed text-[rgb(246_240_226)]/75">
              {h.featureBody}
            </p>
            <Link
              href={`/${locale}/conference`}
              className="mt-8 inline-flex items-center gap-3 font-mono text-xs uppercase tracking-[0.16em] text-gold border-b border-gold pb-1.5"
            >
              {dict.ui.readCfp}
            </Link>
          </div>

          {/* Date plate */}
          <div className="relative aspect-[1/1.18] border border-gold/40 p-8 flex flex-col justify-between">
            <div className="pointer-events-none absolute inset-3 border border-gold/20" />
            <div className="relative flex justify-between font-mono text-[11px] tracking-[0.2em] text-gold">
              <span>{dict.ui.firstIntlConf}</span>
              <span>№ I</span>
            </div>
            <div className="relative text-center">
              <div className="font-serif text-[clamp(1.6rem,3vw,2.25rem)] leading-snug">
                {dict.conference.dateShort}
              </div>
              <div className="mx-auto my-6 h-px w-16 bg-gold" />
              <div className="font-serif text-[clamp(1.6rem,3vw,2.25rem)] leading-snug tracking-wide">
                Erbil · Hawler
              </div>
              <div className="font-mono text-[11px] tracking-[0.2em] text-[rgb(246_240_226)]/60 mt-2">
                {dict.ui.kurdistanIraq}
              </div>
            </div>
            <div className="relative flex justify-between font-mono text-[11px] tracking-[0.2em] text-gold">
              <span>{dict.ui.twoDays}</span>
              <span>{dict.ui.languagesBadge}</span>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- NEWS ---------- */}
      {posts.length > 0 && (
        <section className="mx-auto max-w-[1440px] px-6 lg:px-8 py-24">
          <div className="rule-double mb-5" />
          <div className="flex items-end justify-between gap-6 mb-8 reverse-on-rtl">
            <div>
              <div className="eyebrow mb-2">§ 04</div>
              <h2 className="font-serif text-[clamp(1.75rem,3.6vw,2.5rem)] font-medium tracking-tight">
                {h.newsTitle}
              </h2>
            </div>
            <Link
              href={`/${locale}/news`}
              className="font-mono text-xs uppercase tracking-[0.12em] text-accent hover:underline underline-offset-4 whitespace-nowrap"
            >
              {h.newsCta} →
            </Link>
          </div>
          <ul className="grid gap-9 md:grid-cols-3 border-t border-border pt-8">
            {posts.map((post, i) => (
              <li key={post.slug}>
                <Link href={`/${locale}/news/${post.slug}`} className="group block">
                  <div className="font-mono text-[11px] tracking-[0.1em] text-muted">
                    №{String(i + 1).padStart(2, "0")} · {fmtShort(post.date)}
                  </div>
                  <h3 className="mt-2.5 font-serif text-xl font-medium leading-snug group-hover:text-accent transition-colors">
                    {post.title}
                  </h3>
                  <p className="mt-3 text-foreground-soft leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </>
  );
}
