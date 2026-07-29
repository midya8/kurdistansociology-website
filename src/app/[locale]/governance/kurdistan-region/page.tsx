import { getDictionary } from "@/i18n/getDictionary";
import { ProfileCard } from "@/components/ProfileCard";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  return { title: dict.governance.kurdistanTitle };
}

export default async function KurdistanRegionBoardPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  const g = dict.governance;

  return (
    <>
      {/* Page header */}
      <header className="mx-auto max-w-[1240px] px-6 lg:px-8 pt-20 pb-12">
        <h1 className="font-serif font-medium tracking-tight text-foreground text-[clamp(2.8rem,6vw,5rem)] leading-[1.02] max-w-[980px]">
          {g.kurdistanTitle}
        </h1>
        <p className="mt-7 max-w-[720px] font-serif text-[1.5rem] leading-[1.45] text-foreground-soft">
          {g.kurdistanLead}
        </p>
      </header>

      <div className="mx-auto max-w-[1240px] px-6 lg:px-8">
        <hr className="rule-double mb-8" />
      </div>

      {/* Board members */}
      {g.board.map((m) => (
        <section key={m.name} className="mx-auto max-w-[1240px] px-6 lg:px-8 pb-[72px]">
          <div className="smallcaps mb-6">{m.role}</div>
          <ProfileCard p={m} badge={m.role.toUpperCase()} objectTop />
        </section>
      ))}
    </>
  );
}
