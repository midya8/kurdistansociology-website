import Link from "next/link";
import Image from "next/image";
import { locales, localeMeta, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/getDictionary";

export function Header({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const governanceChildren = [
    { href: `/${locale}/governance/international`, label: dict.nav.boardInternational },
    { href: `/${locale}/governance/kurdistan-region`, label: dict.nav.boardKurdistan },
  ];

  const navItems = [
    { href: `/${locale}/about`, label: dict.nav.about },
    { href: null, label: dict.nav.governance, children: governanceChildren },
    { href: `/${locale}/members`, label: dict.nav.members },
    { href: `/${locale}/journal`, label: dict.nav.journal },
    { href: `/${locale}/conference`, label: dict.nav.conference },
    { href: `/${locale}/news`, label: dict.nav.news },
    { href: `/${locale}/gallery`, label: dict.nav.gallery },
    { href: `/${locale}/resources`, label: dict.nav.resources },
    { href: `/${locale}/contact`, label: dict.nav.contact },
  ];

  // Compact nav has no hover — surface the board pages as their own links
  const compactNavItems = navItems.flatMap((item) =>
    item.children ? item.children : [{ href: item.href as string, label: item.label }]
  );

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur supports-[backdrop-filter]:bg-background/75">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8 py-4 flex items-center gap-4 sm:gap-7 reverse-on-rtl">
        {/* Brand */}
        <Link
          href={`/${locale}`}
          className="flex items-center gap-3 sm:gap-3.5 reverse-on-rtl hover:opacity-90 transition-opacity min-w-0"
        >
          <Image
            src="/logo-icon.png"
            alt="KISA"
            width={48}
            height={48}
            className="rounded-full object-cover ring-1 ring-gold-soft/50 shadow-sm shrink-0 w-10 h-10 sm:w-12 sm:h-12"
            priority
          />
          <span className="leading-tight min-w-0">
            <span className="block font-serif text-xl sm:text-2xl font-medium tracking-tight text-foreground truncate">
              {dict.siteName}
            </span>
            <span className="block font-mono text-[10px] uppercase tracking-[0.14em] text-muted mt-0.5 truncate">
              {dict.footer.est} <span className="text-gold-deep">2023</span>
            </span>
          </span>
        </Link>

        {/* Primary nav */}
        <nav className="hidden xl:flex items-center gap-6 text-[0.92rem] ms-auto">
          {navItems.map((item) =>
            item.children ? (
              <div key={item.label} className="relative nav-dropdown-group">
                <span
                  tabIndex={0}
                  aria-haspopup="true"
                  className="nav-link font-medium text-foreground/85 hover:text-accent focus:text-accent transition-colors py-2 inline-flex items-center gap-1.5 cursor-default select-none"
                >
                  {item.label}
                  <span aria-hidden="true" className="text-[0.6rem] leading-none translate-y-px">
                    ▾
                  </span>
                </span>
                <div className="nav-dropdown absolute start-0 top-full pt-3 z-50">
                  <div className="min-w-[240px] border border-border bg-surface shadow-lg py-1.5">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="block px-4 py-2.5 text-foreground/85 hover:text-accent hover:bg-bg-alt transition-colors whitespace-nowrap"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <Link
                key={item.href}
                href={item.href as string}
                className="nav-link font-medium text-foreground/85 hover:text-accent transition-colors py-2"
              >
                {item.label}
              </Link>
            )
          )}
        </nav>

        {/* Locale switcher — full names */}
        <div className="flex items-center gap-1 sm:gap-1.5 ps-2 sm:ps-4 xl:ms-0 ms-auto border-s border-border shrink-0">
          {locales.map((l) => (
            <Link
              key={l}
              href={`/${l}`}
              aria-current={l === locale ? "page" : undefined}
              className={`px-2 sm:px-2.5 py-1.5 rounded-[2px] border text-[0.7rem] sm:text-[0.78rem] font-medium transition-colors whitespace-nowrap ${
                l === locale
                  ? "border-accent bg-accent text-accent-foreground"
                  : "border-border text-foreground-soft hover:border-accent hover:text-accent"
              } ${localeMeta[l].dir === "rtl" ? "font-kurdish" : ""}`}
            >
              {localeMeta[l].shortLabel}
            </Link>
          ))}
        </div>
      </div>

      {/* Mobile / compact nav */}
      <nav className="xl:hidden border-t border-border">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 py-3 flex gap-6 overflow-x-auto text-[0.92rem] reverse-on-rtl">
          {compactNavItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="whitespace-nowrap font-medium text-foreground/85 hover:text-accent"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
