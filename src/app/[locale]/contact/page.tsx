import { getDictionary } from "@/i18n/getDictionary";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  return { title: dict.contact.title };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  const c = dict.contact;
  const lines = [c.submissions, c.journal, c.press];

  return (
    <>
      {/* Page header */}
      <header className="mx-auto max-w-[1240px] px-6 lg:px-8 pt-20 pb-12">
        <h1 className="font-serif font-medium tracking-tight text-foreground text-[clamp(2.8rem,6vw,5rem)] leading-[1.02] max-w-[980px]">
          {c.title}
        </h1>
        <p className="mt-7 max-w-[720px] font-serif text-[1.5rem] leading-[1.45] text-foreground-soft">
          {c.lead}
        </p>
      </header>

      <section className="mx-auto max-w-[1240px] px-6 lg:px-8 pb-24 grid gap-14 lg:grid-cols-[1.4fr_1fr]">
        {/* Email + subject lines */}
        <div>
          <div className="smallcaps mb-3">{c.emailLabel}</div>
          <a
            href={`mailto:${c.email}`}
            className="block font-serif font-medium tracking-tight text-accent text-[clamp(2.25rem,5vw,4.2rem)] underline underline-offset-8 decoration-gold-soft/50 break-all leading-[1.05]"
          >
            {c.email}
          </a>
          <hr className="rule my-10" />
          <ul className="list-none p-0 m-0 flex flex-col gap-5">
            {lines.map((line, i) => (
              <li key={i} className="grid grid-cols-[40px_1fr] gap-6 items-baseline reverse-on-rtl">
                <div className="font-mono text-xs tracking-[0.16em] text-gold-deep">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div className="text-lg leading-relaxed text-foreground-soft">{line}</div>
              </li>
            ))}
          </ul>
        </div>

        {/* Colophon aside */}
        <aside className="bg-surface border border-border p-8 self-start">
          <div className="smallcaps mb-4">{c.colophonTitle}</div>
          <dl className="m-0">
            {c.secretariat.map((s, i) => (
              <div
                key={s.k}
                className={`py-3.5 ${
                  i < c.secretariat.length - 1 ? "border-b border-border-soft" : ""
                }`}
              >
                <dt className="font-mono text-[11px] tracking-[0.14em] uppercase text-muted">
                  {s.k}
                </dt>
                <dd className="m-0 mt-1 font-serif text-xl text-foreground">{s.v}</dd>
              </div>
            ))}
          </dl>
          <hr className="rule-soft my-5" />
          <div className="font-mono text-[11px] tracking-[0.14em] uppercase text-muted">
            {c.addressLabel}
          </div>
          <address className="not-italic mt-2">
            {c.address.map((ln, i) => (
              <div key={i} className="font-serif text-xl leading-snug text-foreground">
                {ln}
              </div>
            ))}
          </address>
        </aside>
      </section>
    </>
  );
}
