import { getDictionary } from "@/i18n/getDictionary";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  return { title: dict.conference.title };
}

export default async function ConferencePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  const c = dict.conference;

  return (
    <>
      {/* Poster hero */}
      <section className="relative overflow-hidden border-b border-border bg-[rgb(16_22_42)] text-[rgb(246_240_226)]">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 50% 80% at 90% 50%, rgba(162,121,41,0.2) 0%, transparent 65%)",
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(135deg, rgb(162 121 41) 0 1px, transparent 1px 24px)",
          }}
        />
        <div className="relative mx-auto max-w-[1440px] px-6 lg:px-8 py-24 grid gap-16 lg:grid-cols-[1.2fr_auto] items-center">
          <div>
            <div className="font-mono text-[11px] tracking-[0.22em] text-gold mb-7">
              ✦ {c.eyebrow}
            </div>
            <h1 className="font-serif font-medium tracking-tight text-[clamp(2.4rem,5.4vw,4.5rem)] leading-[1.04]">
              {c.title}
            </h1>
            <p className="mt-6 max-w-[720px] font-serif text-[clamp(1.5rem,2.6vw,1.85rem)] italic leading-[1.35] text-[rgb(246_240_226)]/85">
              {c.theme}
            </p>
            <p className="mt-8 max-w-[620px] leading-relaxed text-[rgb(246_240_226)]/75">
              {c.lead}
            </p>
          </div>
          {/* Compact date plate */}
          <div className="border border-gold/35 p-7 w-[260px] text-center shrink-0">
            <div className="font-mono text-xs tracking-[0.28em] text-gold">
              {dict.ui.september}
            </div>
            <div className="font-serif font-light text-[7rem] leading-[0.9] my-2 tracking-tight">
              02·03
            </div>
            <div className="font-mono text-xs tracking-[0.28em] text-gold">2026</div>
            <div className="mx-auto my-5 h-px w-10 bg-gold" />
            <div className="font-serif text-2xl">Erbil · Hawler</div>
          </div>
        </div>
      </section>

      {/* Facts strip */}
      <section className="border-b border-border bg-bg-alt">
        <div className="mx-auto max-w-[1440px] px-6 lg:px-8 py-9">
          <dl className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
            {c.facts.map((f, i) => (
              <div
                key={f.k}
                className={`px-6 ${
                  i < c.facts.length - 1 ? "lg:border-e border-border" : ""
                }`}
              >
                <dt className="font-mono text-[11px] tracking-[0.18em] uppercase text-gold-deep">
                  {f.k}
                </dt>
                <dd className="mt-2 font-serif text-lg font-medium text-foreground">
                  {f.v}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Overview */}
      <section className="mx-auto max-w-[760px] px-6 lg:px-8 py-20">
        <div className="smallcaps mb-3">{c.overviewTitle}</div>
        <p className="font-serif text-[1.55rem] leading-[1.55] text-foreground">
          {c.overview}
        </p>
        <p className="mt-6 text-lg leading-[1.7] text-foreground-soft">{c.themeBody}</p>
      </section>

      {/* Topics */}
      <section className="mx-auto max-w-[1240px] px-6 lg:px-8 pb-20">
        <hr className="rule-double mb-5" />
        <div className="eyebrow mb-2">§ 01</div>
        <h2 className="font-serif text-[clamp(1.75rem,3.6vw,2.5rem)] font-medium tracking-tight mb-8">
          {c.topicsTitle}
        </h2>
        <div className="grid sm:grid-cols-2 border-t border-s border-border">
          {c.topics.map((t, i) => (
            <article key={t.title} className="p-8 border-b border-e border-border bg-surface">
              <div className="font-mono text-xs tracking-[0.18em] text-gold-deep">
                {dict.ui.stream} {String(i + 1).padStart(2, "0")} / 06
              </div>
              <h3 className="mt-3.5 mb-2.5 font-serif text-2xl font-medium leading-snug">
                {t.title}
              </h3>
              <p className="text-foreground-soft leading-relaxed">{t.body}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Contributions + Dates */}
      <section className="mx-auto max-w-[1240px] px-6 lg:px-8 pb-20 grid gap-14 md:grid-cols-2">
        <div>
          <hr className="rule-double mb-5" />
          <div className="eyebrow mb-2">§ 02</div>
          <h2 className="font-serif text-[clamp(1.5rem,3vw,2.1rem)] font-medium tracking-tight mb-6">
            {c.contributionsTitle}
          </h2>
          <ul className="list-none p-0 m-0">
            {c.contributions.map((item, i) => (
              <li
                key={i}
                className="grid grid-cols-[40px_1fr] gap-4 py-4 border-b border-border-soft"
              >
                <div className="font-mono text-xs tracking-[0.16em] text-gold-deep pt-1">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div className="font-serif text-lg text-foreground">{item}</div>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <hr className="rule-double mb-5" />
          <div className="eyebrow mb-2">§ 03</div>
          <h2 className="font-serif text-[clamp(1.5rem,3vw,2.1rem)] font-medium tracking-tight mb-6">
            {c.datesTitle}
          </h2>
          <dl className="m-0">
            {c.dates.map((d, i) => (
              <div
                key={i}
                className="flex justify-between gap-4 py-4 border-b border-border-soft reverse-on-rtl"
              >
                <dt className="text-foreground-soft">{d.k}</dt>
                <dd className="m-0 font-mono text-sm tracking-[0.04em] text-foreground font-medium">
                  {d.v}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Submission requirements */}
      <section className="mx-auto max-w-[760px] px-6 lg:px-8 pb-16">
        <hr className="rule-double mb-5" />
        <div className="eyebrow mb-2">§ 04</div>
        <h2 className="font-serif text-[clamp(1.5rem,3vw,2.1rem)] font-medium tracking-tight mb-4">
          {c.submissionTitle}
        </h2>
        <p className="text-lg leading-[1.7] text-foreground-soft mb-6">{c.submissionLead}</p>
        <ul className="list-none p-0 m-0">
          {c.submission.map((s, i) => (
            <li
              key={i}
              className={`grid grid-cols-[32px_1fr] gap-3.5 py-3 border-b border-border-soft items-baseline ${
                i === 0 ? "border-t border-border-soft" : ""
              }`}
            >
              <div className="font-mono text-xs tracking-[0.16em] text-gold-deep">{i + 1}.</div>
              <div className="text-foreground">{s}</div>
            </li>
          ))}
        </ul>
        <p className="mt-6 text-base leading-relaxed text-muted">{c.panelNote}</p>
      </section>

      {/* Submit CTA — letterpress */}
      <section className="mx-auto max-w-[1240px] px-6 lg:px-8 pb-20">
        <div className="relative overflow-hidden bg-[rgb(16_22_42)] text-[rgb(246_240_226)] px-12 py-14 grid gap-10 md:grid-cols-[1fr_auto] items-center">
          <div className="pointer-events-none absolute inset-3 border border-gold/25" />
          <div className="relative">
            <div className="font-mono text-xs tracking-[0.22em] text-gold">
              ✦ {dict.ui.submitProposal}
            </div>
            <h2 className="mt-3 mb-2 font-serif text-[clamp(1.6rem,3.4vw,2.5rem)] font-medium break-all">
              {dict.contact.email}
            </h2>
            <p className="text-[rgb(246_240_226)]/75 leading-relaxed">{c.contactBody}</p>
          </div>
          <a
            href={`mailto:${dict.contact.email}`}
            className="relative btn btn-square shrink-0"
            style={{
              background: "rgb(162 121 41)",
              color: "rgb(16 22 42)",
              borderColor: "rgb(162 121 41)",
            }}
          >
            {dict.ui.submitByEmail}
          </a>
        </div>
      </section>
    </>
  );
}
