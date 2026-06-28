import { getDictionary } from "@/i18n/getDictionary";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  return { title: dict.journal.title };
}

export default async function JournalPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  const j = dict.journal;

  return (
    <>
      {/* Page header */}
      <header className="mx-auto max-w-[1240px] px-6 lg:px-8 pt-20 pb-8">
        <h1 className="font-serif font-medium tracking-tight text-foreground text-[clamp(2.8rem,6vw,5rem)] leading-[1.02] max-w-[980px]">
          {j.title}
        </h1>
        <p className="mt-7 max-w-[760px] font-serif text-[1.55rem] italic leading-[1.4] text-foreground-soft">
          {j.subtitle}
        </p>
      </header>

      {/* Cover + body */}
      <section className="mx-auto max-w-[1240px] px-6 lg:px-8 pb-20 grid gap-14 lg:grid-cols-[0.7fr_1fr] items-center">
        {/* Cover mock */}
        <div className="relative aspect-[3/4] bg-[rgb(16_22_42)] text-[rgb(246_240_226)] p-10 flex flex-col justify-between overflow-hidden shadow-2xl">
          <div className="pointer-events-none absolute inset-3.5 border border-gold/35" />
          <div
            className="absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage:
                "repeating-linear-gradient(0deg, rgb(162 121 41) 0 1px, transparent 1px 16px)",
            }}
          />
          <div className="relative">
            <div className="font-mono text-[11px] tracking-[0.28em] text-gold leading-relaxed">
              {j.coverLabel}
            </div>
          </div>
          <div className="relative text-center">
            <div className="font-serif font-light text-[5.3rem] leading-[0.9] tracking-tight">
              KSR
            </div>
            <div className="mx-auto my-4 h-px w-8 bg-gold" />
            <div className="font-serif text-base italic text-[rgb(246_240_226)]/85">
              {j.subtitle}
            </div>
          </div>
          <div className="relative flex justify-between font-mono text-[11px] tracking-[0.18em] text-gold">
            <span>VOL. I</span>
            <span>MMXXVI</span>
          </div>
        </div>

        <div>
          <p className="font-serif text-[1.55rem] leading-[1.5] text-foreground">{j.lead}</p>
          <div className="prose-body mt-8 text-[1.05rem]">
            {j.body.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>
      </section>

      {/* Sections / TOC */}
      <section className="mx-auto max-w-[1240px] px-6 lg:px-8 pb-20">
        <hr className="rule-double mb-5" />
        <div className="eyebrow mb-2">{j.sectionsLabel}</div>
        <h2 className="font-serif text-[clamp(1.75rem,3.6vw,2.5rem)] font-medium tracking-tight mb-8">
          {j.sectionsTitle}
        </h2>
        <div className="border-t border-border">
          {j.sections.map((s) => (
            <div
              key={s.n}
              className="grid grid-cols-[44px_1fr] md:grid-cols-[60px_1fr_2fr] gap-6 md:gap-10 items-baseline py-7 border-b border-border"
            >
              <div className="font-serif text-4xl font-light text-gold">{s.n}</div>
              <h3 className="font-serif text-2xl font-medium">{s.title}</h3>
              <p className="text-lg leading-relaxed text-foreground-soft col-span-2 md:col-span-1">
                {s.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Submit */}
      <section className="mx-auto max-w-[760px] px-6 lg:px-8 pb-20">
        <div className="bg-surface border border-border p-10">
          <div className="smallcaps mb-3">{j.submissionTitle}</div>
          <h2 className="mb-4 font-serif text-[clamp(1.5rem,3vw,2.1rem)] font-medium break-all">
            {dict.contact.email}
          </h2>
          <p className="text-lg leading-relaxed text-foreground-soft">{j.submissionBody}</p>
        </div>
      </section>
    </>
  );
}
