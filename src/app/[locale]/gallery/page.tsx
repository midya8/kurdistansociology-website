import { getDictionary } from "@/i18n/getDictionary";
import { listEvent } from "@/lib/gallery";
import { GalleryGrid } from "@/components/GalleryGrid";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  return { title: dict.gallery.title };
}

export default async function GalleryPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale);

  const events = await Promise.all(
    dict.gallery.events.map(async (e) => ({
      ...e,
      images: await listEvent(e.key as "2023" | "2024"),
    }))
  );

  return (
    <>
      {/* Page header */}
      <header className="mx-auto max-w-[1240px] px-6 lg:px-8 pt-20 pb-12">
        <div className="eyebrow mb-[18px]">§ {dict.nav.gallery}</div>
        <h1 className="font-serif font-medium tracking-tight text-foreground text-[clamp(2.8rem,6vw,5rem)] leading-[1.02] max-w-[980px]">
          {dict.gallery.title}
        </h1>
        <p className="mt-7 max-w-[720px] font-serif text-[1.5rem] leading-[1.45] text-foreground-soft">
          {dict.gallery.lead}
        </p>
      </header>

      <div className="mx-auto max-w-[1240px] px-6 lg:px-8 pb-24 flex flex-col gap-20">
        {events.map((event) => (
          <section key={event.key}>
            <div className="mb-5 flex items-baseline gap-4 reverse-on-rtl">
              <h2 className="font-serif text-[clamp(1.75rem,3.6vw,2.5rem)] font-medium tracking-tight">
                {event.title}
              </h2>
              <div className="flex-1 border-t border-border -translate-y-2.5" />
              <span className="font-mono text-xs tracking-[0.16em] text-gold-deep whitespace-nowrap">
                {event.images.length} {dict.ui.photographs}
              </span>
            </div>
            <p className="text-lg text-foreground-soft mb-8 max-w-[640px]">
              {event.description}
            </p>
            <GalleryGrid images={event.images} eventKey={event.key} />
          </section>
        ))}
      </div>
    </>
  );
}
