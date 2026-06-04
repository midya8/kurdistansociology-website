import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  Inter,
  Source_Serif_4,
  Noto_Naskh_Arabic,
  JetBrains_Mono,
} from "next/font/google";
import { locales, localeMeta, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/getDictionary";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const serif = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

const kurdish = Noto_Naskh_Arabic({
  subsets: ["arabic"],
  variable: "--font-kurdish",
  display: "swap",
});

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = await getDictionary(locale);
  return {
    metadataBase: new URL("https://kurdistansociology.com"),
    title: {
      default: dict.siteName,
      template: `%s · ${dict.siteName}`,
    },
    description: dict.tagline,
    openGraph: {
      title: dict.siteName,
      description: dict.tagline,
      siteName: dict.siteName,
      type: "website",
      locale: localeMeta[locale].htmlLang,
    },
    alternates: {
      languages: {
        en: "/en",
        "ckb-IQ": "/ku",
      },
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const meta = localeMeta[locale];
  const dict = await getDictionary(locale);

  return (
    <html
      lang={meta.htmlLang}
      dir={meta.dir}
      className={`${inter.variable} ${serif.variable} ${mono.variable} ${kurdish.variable} h-full`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <Header locale={locale} dict={dict} />
        <main className="flex-1">{children}</main>
        <Footer locale={locale} dict={dict} />
      </body>
    </html>
  );
}
