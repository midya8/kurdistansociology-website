import { getDictionary } from "@/i18n/getDictionary";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  return { title: dict.resources.title };
}

export default async function ResourcesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  const r = dict.resources;

  return (
    <>
      {/* Page header */}
      <header className="mx-auto max-w-[1240px] px-6 lg:px-8 pt-20 pb-14">
        <h1 className="font-serif font-medium tracking-tight text-foreground text-[clamp(2.8rem,6vw,5rem)] leading-[1.02] max-w-[980px]">
          {r.title}
        </h1>
        <p className="mt-7 max-w-[720px] font-serif text-[1.5rem] leading-[1.45] text-foreground-soft">
          {r.lead}
        </p>
      </header>

      <section className="mx-auto max-w-[1240px] px-6 lg:px-8 pb-24 flex flex-col gap-14">
        {r.groups.map((g) => (
          <section key={g.title}>
            <div className="flex items-baseline gap-4 mb-5 reverse-on-rtl">
              <h2 className="font-serif text-[clamp(1.5rem,3vw,2rem)] font-medium tracking-tight">
                {g.title}
              </h2>
              <div className="flex-1 border-t border-border -translate-y-1.5" />
              <div className="font-mono text-xs text-muted">
                {String(g.items.length).padStart(2, "0")}
              </div>
            </div>
            <ul className="list-none p-0 m-0 grid sm:grid-cols-2 sm:gap-x-8">
              {g.items.map((item) => (
                <li key={item.u} className="border-b border-dotted border-border">
                  <a
                    href={`https://${item.u}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex justify-between gap-4 py-3 hover:text-accent transition-colors reverse-on-rtl"
                  >
                    <span className="font-serif text-lg">{item.n}</span>
                    <span className="font-mono text-xs text-muted tracking-[0.03em] whitespace-nowrap self-center">
                      ↗ {item.u}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </section>
    </>
  );
}
