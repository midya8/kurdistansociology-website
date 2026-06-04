import { getDictionary } from "@/i18n/getDictionary";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  return { title: dict.about.title };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  const a = dict.about;

  return (
    <>
      {/* Page header */}
      <header className="mx-auto max-w-[1240px] px-6 lg:px-8 pt-20 pb-14">
        <div className="eyebrow mb-[18px]">§ {dict.nav.about}</div>
        <h1 className="font-serif font-medium tracking-tight text-foreground text-[clamp(2.8rem,6vw,5rem)] leading-[1.02] max-w-[980px]">
          {a.title}
        </h1>
        <p className="mt-7 max-w-[720px] font-serif text-[1.5rem] leading-[1.45] text-foreground-soft">
          {a.lead}
        </p>
      </header>

      <div className="mx-auto max-w-[760px] px-6 lg:px-8 pb-20">
        <hr className="rule" />

        {/* Intro prose */}
        <div className="prose-body py-10 text-[1.15rem]">
          {a.intro.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>

        {/* Mission / Vision */}
        <div className="grid gap-6 sm:grid-cols-2 my-16">
          <div className="border-t-2 border-accent pt-6">
            <div className="smallcaps mb-3">{a.missionTitle}</div>
            <p className="font-serif text-[1.2rem] leading-[1.55] text-foreground">
              {a.mission}
            </p>
          </div>
          <div className="border-t-2 border-gold pt-6">
            <div className="smallcaps mb-3">{a.visionTitle}</div>
            <p className="font-serif text-[1.2rem] leading-[1.55] text-foreground">
              {a.vision}
            </p>
          </div>
        </div>

        {/* Core values */}
        <hr className="rule-double mb-8" />
        <h2 className="font-serif text-[clamp(1.75rem,3.6vw,2.5rem)] font-medium tracking-tight mb-8">
          {a.valuesTitle}
        </h2>
        <ol className="list-none p-0 m-0">
          {a.values.map((v, i) => (
            <li
              key={i}
              className={`grid grid-cols-[64px_1fr] sm:grid-cols-[80px_1fr] gap-6 sm:gap-8 py-7 border-b border-border reverse-on-rtl ${
                i === 0 ? "border-t border-border" : ""
              }`}
            >
              <div className="num-display text-5xl">
                {String(i + 1).padStart(2, "0")}
              </div>
              <div>
                <h3 className="font-serif text-xl font-medium text-foreground">
                  {v.title}
                </h3>
                <p className="mt-2.5 text-foreground-soft leading-relaxed">
                  {v.body}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </>
  );
}
