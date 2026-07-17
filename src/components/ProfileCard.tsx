import Image from "next/image";

export type Profile = {
  role: string;
  name: string;
  title: string;
  affiliation: string;
  email: string;
  img: string;
  bio: string;
};

export function ProfileCard({
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
