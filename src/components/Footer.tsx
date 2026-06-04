import Link from "next/link";
import Image from "next/image";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/getDictionary";

export function Footer({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const year = new Date().getFullYear();

  const programmes = [
    { href: `/${locale}/conference`, label: dict.nav.conference },
    { href: `/${locale}/journal`, label: dict.nav.journal },
    { href: `/${locale}/members`, label: dict.nav.members },
    { href: `/${locale}/resources`, label: dict.nav.resources },
  ];
  const association = [
    { href: `/${locale}/about`, label: dict.nav.about },
    { href: `/${locale}/governance`, label: dict.nav.governance },
    { href: `/${locale}/news`, label: dict.nav.news },
    { href: `/${locale}/bylaw`, label: dict.nav.bylaw },
  ];

  return (
    <footer className="mt-20 border-t border-border bg-bg-alt">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-8 py-16 grid gap-12 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        {/* Colophon */}
        <div>
          <div className="flex items-start gap-4 reverse-on-rtl">
            <Image
              src="/logo-icon.png"
              alt="KISA"
              width={56}
              height={56}
              className="rounded-full object-cover ring-1 ring-gold-soft/50"
            />
            <div>
              <div className="font-serif text-2xl leading-tight tracking-tight">
                {dict.siteNameFull}
              </div>
              <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-gold-deep mt-2">
                KISA · 2023
              </div>
            </div>
          </div>
          <p className="mt-6 max-w-md text-sm leading-relaxed text-foreground-soft">
            {dict.footer.tagline}
          </p>
        </div>

        {/* Programmes */}
        <div>
          <div className="smallcaps mb-4">{dict.footer.programmes}</div>
          <ul className="flex flex-col gap-2.5 text-sm text-foreground-soft">
            {programmes.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="hover:text-accent transition-colors">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Association */}
        <div>
          <div className="smallcaps mb-4">{dict.footer.association}</div>
          <ul className="flex flex-col gap-2.5 text-sm text-foreground-soft">
            {association.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="hover:text-accent transition-colors">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <div className="smallcaps mb-4">{dict.nav.contact}</div>
          <Link
            href={`mailto:${dict.contact.email}`}
            className="font-serif text-base text-accent underline underline-offset-4 decoration-gold-soft/60 break-all"
          >
            {dict.contact.email}
          </Link>
          <div className="mt-4 text-sm leading-relaxed text-muted">
            {dict.footer.secretariat}
            <br />
            Toronto · Erbil
          </div>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="mx-auto max-w-[1440px] px-6 lg:px-8 py-5 font-mono text-[11px] tracking-[0.08em] text-muted flex flex-wrap gap-2 justify-between reverse-on-rtl">
          <div>© {year} {dict.siteNameFull} · {dict.footer.rights}</div>
          <div>{dict.footer.independent}</div>
        </div>
      </div>
    </footer>
  );
}
