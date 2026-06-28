import { getDictionary } from "@/i18n/getDictionary";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  return { title: dict.members.title };
}

export default async function MembersPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  const m = dict.members;

  return (
    <>
      {/* Page header */}
      <header className="mx-auto max-w-[1240px] px-6 lg:px-8 pt-20 pb-14">
        <h1 className="font-serif font-medium tracking-tight text-foreground text-[clamp(2.8rem,6vw,5rem)] leading-[1.02] max-w-[980px]">
          {m.title}
        </h1>
        <p className="mt-7 max-w-[720px] font-serif text-[1.5rem] leading-[1.45] text-foreground-soft">
          {m.lead}
        </p>
      </header>

      {/* Category cards — no numbers, no Apply CTA */}
      <section className="mx-auto max-w-[1240px] px-6 lg:px-8 pb-24">
        <div className="grid sm:grid-cols-2 border-t border-s border-border">
          {m.categories.map((c) => (
            <article key={c.title} className="p-10 border-b border-e border-border bg-surface">
              <div className="w-7 h-0.5 bg-gold mb-4" />
              <h3 className="mb-2.5 font-serif text-2xl font-medium">{c.title}</h3>
              <p className="text-lg leading-relaxed text-foreground-soft">{c.body}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
