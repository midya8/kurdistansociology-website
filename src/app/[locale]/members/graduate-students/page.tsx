import Link from "next/link";
import { getDictionary } from "@/i18n/getDictionary";
import { ProfileCard } from "@/components/ProfileCard";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  return { title: dict.members.gradTitle };
}

export default async function GraduateStudentsPage({
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
      <header className="mx-auto max-w-[1240px] px-6 lg:px-8 pt-16 pb-12">
        <Link
          href={`/${locale}/members`}
          className="font-mono text-xs tracking-[0.12em] text-muted hover:text-accent transition-colors"
        >
          ← {m.title}
        </Link>
        <h1 className="mt-8 font-serif font-medium tracking-tight text-foreground text-[clamp(2.8rem,6vw,5rem)] leading-[1.02] max-w-[980px]">
          {m.gradTitle}
        </h1>
        <p className="mt-7 max-w-[720px] font-serif text-[1.5rem] leading-[1.45] text-foreground-soft">
          {m.gradLead}
        </p>
      </header>

      <div className="mx-auto max-w-[1240px] px-6 lg:px-8">
        <hr className="rule-double mb-8" />
      </div>

      {/* Member profiles */}
      {m.gradMembers.map((p) => (
        <section key={p.name} className="mx-auto max-w-[1240px] px-6 lg:px-8 pb-[72px]">
          <div className="smallcaps mb-6">{p.role}</div>
          <ProfileCard p={p} badge={p.role.toUpperCase()} objectTop />
        </section>
      ))}
    </>
  );
}
