import Link from "next/link";
import { getDictionary } from "@/i18n/getDictionary";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  return { title: dict.governance.title };
}

export default async function GovernancePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  const g = dict.governance;

  const boards = [
    {
      href: `/${locale}/governance/international`,
      title: g.internationalTitle,
      body: g.internationalLead,
    },
    {
      href: `/${locale}/governance/kurdistan-region`,
      title: g.kurdistanTitle,
      body: g.kurdistanLead,
    },
  ];

  return (
    <>
      {/* Page header */}
      <header className="mx-auto max-w-[1240px] px-6 lg:px-8 pt-20 pb-14">
        <h1 className="font-serif font-medium tracking-tight text-foreground text-[clamp(2.8rem,6vw,5rem)] leading-[1.02] max-w-[980px]">
          {g.title}
        </h1>
        <p className="mt-7 max-w-[720px] font-serif text-[1.5rem] leading-[1.45] text-foreground-soft">
          {g.lead}
        </p>
      </header>

      {/* Board cards */}
      <section className="mx-auto max-w-[1240px] px-6 lg:px-8 pb-24">
        <div className="smallcaps mb-[18px]">{g.boardsTitle}</div>
        <div className="grid sm:grid-cols-2 border-t border-s border-border">
          {boards.map((b) => (
            <Link
              key={b.href}
              href={b.href}
              className="block p-10 border-b border-e border-border bg-surface hover:bg-background transition-colors"
            >
              <div className="w-7 h-0.5 bg-gold mb-4" />
              <h2 className="mb-2.5 font-serif text-2xl font-medium">{b.title}</h2>
              <p className="text-lg leading-relaxed text-foreground-soft">{b.body}</p>
              <div className="mt-5 font-mono text-xs tracking-[0.12em] text-gold-deep">
                {dict.members.viewAll}
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
