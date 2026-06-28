import Image from "next/image";
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
  const { president, advisor, placeholder, roles } = g;

  const vacancies = [roles.vicePresident, roles.secretary, roles.treasurer];
  const credentials = [
    { img: g.credentials.krgImg, caption: g.credentials.krg },
    { img: g.credentials.apostilleImg, caption: g.credentials.apostille },
  ];

  return (
    <>
      {/* Page header */}
      <header className="mx-auto max-w-[1240px] px-6 lg:px-8 pt-20 pb-12">
        <h1 className="font-serif font-medium tracking-tight text-foreground text-[clamp(2.8rem,6vw,5rem)] leading-[1.02] max-w-[980px]">
          {g.title}
        </h1>
        <p className="mt-7 max-w-[720px] font-serif text-[1.5rem] leading-[1.45] text-foreground-soft">
          {g.lead}
        </p>
      </header>

      {/* President */}
      <section className="mx-auto max-w-[1240px] px-6 lg:px-8 pb-[72px]">
        <hr className="rule-double mb-8" />
        <div className="smallcaps mb-6">{g.executiveTitle}</div>
        <ProfileCard p={president} badge={president.badge} objectTop={false} />
      </section>

      {/* Executive Board — Dr. Zubeida */}
      <section className="mx-auto max-w-[1240px] px-6 lg:px-8 pb-[72px]">
        <div className="smallcaps mb-6">{advisor.role}</div>
        <ProfileCard p={advisor} badge={advisor.role.toUpperCase()} objectTop />
      </section>

      {/* Executive vacancies */}
      <section className="mx-auto max-w-[1240px] px-6 lg:px-8 pb-[72px]">
        <div className="smallcaps mb-[18px]">{g.vacanciesTitle}</div>
        <div className="grid sm:grid-cols-3 border-t border-s border-border">
          {vacancies.map((role, i) => (
            <div key={role} className="p-7 border-b border-e border-border bg-background">
              <div className="font-mono text-xs tracking-[0.16em] text-gold-deep">
                № {String(i + 2).padStart(2, "0")}
              </div>
              <div className="mt-3 font-serif text-xl font-medium text-foreground">
                {role}
              </div>
              <div className="mt-2 text-base text-muted italic">{placeholder.name}</div>
              <p className="mt-3.5 text-sm leading-relaxed text-foreground-soft">
                {placeholder.bio}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Academic Advisory Board */}
      <section className="mx-auto max-w-[1240px] px-6 lg:px-8 pb-[72px]">
        <div className="smallcaps mb-6">{g.advisoryTitle}</div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 border-t border-s border-border">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="px-[18px] py-[22px] border-b border-e border-border">
              <div className="num-display text-[2.7rem]">
                {String(i + 1).padStart(2, "0")}
              </div>
              <div className="mt-2 font-mono text-[0.7rem] tracking-[0.14em] text-gold-deep">
                {g.advisoryShort}
              </div>
              <div className="mt-2 text-sm text-muted italic">{placeholder.name}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Committees */}
      <section className="mx-auto max-w-[1240px] px-6 lg:px-8 pb-[72px]">
        <div className="smallcaps mb-[18px]">{g.committeesTitle}</div>
        <div className="grid sm:grid-cols-2 border-t border-s border-border">
          {g.committees.map((cm, i) => (
            <article key={cm.title} className="p-8 border-b border-e border-border bg-surface">
              <div className="font-mono text-xs tracking-[0.16em] text-gold-deep">
                {String.fromCharCode(65 + i)} · {g.committeesTitle}
              </div>
              <h3 className="mt-3 mb-2.5 font-serif text-2xl font-medium text-foreground">
                {cm.title}
              </h3>
              <p className="mb-5 text-foreground-soft leading-relaxed">{cm.body}</p>
              <div className="flex flex-wrap gap-2">
                {Array.from({ length: cm.seats }).map((_, s) => (
                  <span
                    key={s}
                    className="font-mono text-xs text-muted border border-border rounded-full px-3 py-1.5 whitespace-nowrap"
                  >
                    {String(s + 1).padStart(2, "0")} · {placeholder.name}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Official Registration */}
      <section className="mx-auto max-w-[1240px] px-6 lg:px-8 pb-24">
        <hr className="rule-double mb-8" />
        <h2 className="font-serif text-[clamp(1.75rem,3.6vw,2.5rem)] font-medium tracking-tight mb-3">
          {g.credentialsTitle}
        </h2>
        <p className="max-w-[640px] text-lg leading-relaxed text-foreground-soft mb-8">
          {g.credentialsLead}
        </p>

        {/* Incorporation PDFs */}
        <div className="smallcaps mb-4">{g.documentsTitle}</div>
        <div className="grid gap-4 sm:grid-cols-2 mb-10">
          {g.documents.map((d) => (
            <a
              key={d.file}
              href={d.file}
              target="_blank"
              rel="noopener noreferrer"
              className="flex gap-[18px] items-center p-5 bg-surface border border-border hover:border-gold transition-colors reverse-on-rtl"
            >
              <div className="shrink-0 w-11 h-14 bg-bg-alt border border-border flex items-end justify-center">
                <div className="font-mono text-[10px] tracking-[0.08em] text-gold-deep mb-1.5">
                  PDF
                </div>
              </div>
              <div className="min-w-0">
                <div className="font-serif text-lg font-medium text-foreground">{d.title}</div>
                <div className="text-sm text-foreground-soft mt-0.5 leading-snug">
                  {d.subtitle}
                </div>
                <div className="font-mono text-xs tracking-[0.1em] text-gold-deep mt-2">
                  {dict.ui.viewPdf}
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* Credential images */}
        <div className="grid gap-6 sm:grid-cols-2">
          {credentials.map((c) => (
            <figure key={c.img} className="m-0 bg-surface border border-border">
              <a
                href={c.img}
                target="_blank"
                rel="noopener noreferrer"
                className="block relative aspect-[4/5] bg-bg-alt overflow-hidden"
              >
                <Image
                  src={c.img}
                  alt={c.caption}
                  fill
                  sizes="(max-width: 768px) 90vw, 560px"
                  className="object-cover object-top"
                />
              </a>
              <figcaption className="px-[22px] py-[18px] border-t border-border">
                <div className="font-mono text-xs tracking-[0.16em] text-gold-deep">
                  {dict.ui.verified}
                </div>
                <div className="mt-1.5 text-foreground-soft leading-snug">{c.caption}</div>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>
    </>
  );
}

type Profile = {
  role: string;
  name: string;
  title: string;
  affiliation: string;
  email: string;
  img: string;
  bio: string;
};

function ProfileCard({
  p,
  badge,
  objectTop,
}: {
  p: Profile;
  badge: string;
  objectTop: boolean;
}) {
  return (
    <article className="grid gap-8 sm:gap-12 md:grid-cols-[260px_1fr]">
      <div className="relative aspect-[3/4] w-full max-w-[260px] overflow-hidden border border-border bg-surface">
        <Image
          src={p.img}
          alt={p.name}
          fill
          sizes="260px"
          className={`object-cover ${objectTop ? "object-top" : ""}`}
        />
        <div
          className="absolute inset-x-0 bottom-0 px-3.5 py-4"
          style={{
            background: "linear-gradient(to top, rgba(16,22,42,0.65), transparent)",
          }}
        >
          <div className="font-mono text-[0.7rem] tracking-[0.2em] text-[rgb(246_240_226)]">
            {badge}
          </div>
        </div>
      </div>
      <div>
        <div className="font-mono text-xs tracking-[0.2em] text-gold-deep">
          {p.role.toUpperCase()}
        </div>
        <h2 className="mt-2.5 mb-1.5 font-serif text-[clamp(2rem,4vw,2.8rem)] font-medium tracking-tight">
          {p.name}
        </h2>
        <p className="font-serif text-xl text-foreground-soft italic">{p.title}</p>
        <p className="mt-1 text-foreground-soft">{p.affiliation}</p>
        <a
          href={`mailto:${p.email}`}
          className="inline-block mt-3 font-mono text-sm text-accent underline underline-offset-4 decoration-gold-soft/60"
        >
          {p.email}
        </a>
        <hr className="rule my-6" />
        <p className="text-lg leading-[1.7] text-foreground-soft">{p.bio}</p>
      </div>
    </article>
  );
}
