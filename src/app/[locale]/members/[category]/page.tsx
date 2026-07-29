import Link from "next/link";
import { notFound } from "next/navigation";
import { getDictionary, type Dictionary } from "@/i18n/getDictionary";
import { ProfileCard, type Profile } from "@/components/ProfileCard";

const CATEGORIES = ["academic", "graduate-students"] as const;

export function generateStaticParams() {
  return CATEGORIES.map((category) => ({ category }));
}

function getGroup(
  m: Dictionary["members"],
  category: string
): { title: string; lead: string; members: Profile[] } | null {
  if (category === "academic") {
    return { title: m.academicTitle, lead: m.academicLead, members: m.academicMembers };
  }
  if (category === "graduate-students") {
    return { title: m.gradTitle, lead: m.gradLead, members: m.gradMembers };
  }
  return null;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; category: string }>;
}) {
  const { locale, category } = await params;
  const dict = await getDictionary(locale);
  const group = getGroup(dict.members, category);
  return { title: group?.title ?? dict.members.title };
}

export default async function MemberCategoryPage({
  params,
}: {
  params: Promise<{ locale: string; category: string }>;
}) {
  const { locale, category } = await params;
  const dict = await getDictionary(locale);
  const group = getGroup(dict.members, category);
  if (!group) notFound();

  return (
    <>
      {/* Page header */}
      <header className="mx-auto max-w-[1240px] px-6 lg:px-8 pt-16 pb-12">
        <Link
          href={`/${locale}/members`}
          className="font-mono text-xs tracking-[0.12em] text-muted hover:text-accent transition-colors"
        >
          ← {dict.members.title}
        </Link>
        <h1 className="mt-8 font-serif font-medium tracking-tight text-foreground text-[clamp(2.8rem,6vw,5rem)] leading-[1.02] max-w-[980px]">
          {group.title}
        </h1>
        <p className="mt-7 max-w-[720px] font-serif text-[1.5rem] leading-[1.45] text-foreground-soft">
          {group.lead}
        </p>
      </header>

      <div className="mx-auto max-w-[1240px] px-6 lg:px-8">
        <hr className="rule-double mb-8" />
      </div>

      {/* Member profiles */}
      {group.members.map((p) => (
        <section key={p.name} className="mx-auto max-w-[1240px] px-6 lg:px-8 pb-[72px]">
          <div className="smallcaps mb-6">{p.role}</div>
          <ProfileCard p={p} badge={p.role.toUpperCase()} objectTop />
        </section>
      ))}
    </>
  );
}
