import Image from "next/image";
import Link from "next/link";
import profileData from "../data/profile.json";
import blogData from "../data/blog.json";
import Minimap from "./components/Minimap";

type Project = {
  name: string;
  year?: string;
  company?: string;
  description: string;
  logo?: string;
  link?: string;
  apk?: string;
  appStore?: string;
  highlights?: string[];
};

type BlogPost = { slug: string; title: string; date: string; excerpt: string };

const data = profileData;
const projects = data.projects as Project[];
const posts = ((blogData as { posts?: BlogPost[] }).posts ?? [])
  .slice()
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  .slice(0, 3);
const stack = Object.values(data.techStack).flat();
const firstYear = Math.min(...data.experience.map((e) => Number(e.year)));
const email = data.contacts.find((c) => c.href.startsWith("mailto"));

const SECTIONS = [
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "stack", label: "Stack" },
  { id: "certifications", label: "Certifications" },
  { id: "hackathons", label: "Hackathons" },
  { id: "blog", label: "Blog" }
];

const Chip = ({ children }: { children: React.ReactNode }) => (
  <span className="mx-0.5 my-1 inline-flex items-center gap-1 rounded-md border border-line bg-chip px-1.5 py-px align-middle text-[13px] leading-5 font-medium text-fg">
    {children}
  </span>
);

const Label = ({ n, title, href, action }: { n: number; title: string; href?: string; action?: string }) => (
  <div className="mb-4 flex items-center justify-between border-b border-line pb-3 font-mono text-xs">
    <span className="text-muted">
      {String(n).padStart(2, "0")} — {title}
    </span>
    {href ? (
      <Link href={href} className="uppercase tracking-wider text-muted hover:text-fg">
        {action} →
      </Link>
    ) : null}
  </div>
);

const ExtLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <a href={href} target="_blank" rel="noreferrer" className="font-mono text-xs text-muted underline-offset-4 hover:text-fg hover:underline">
    {children} ↗
  </a>
);

const Logo = ({ p, size = 40, eager }: { p: Project; size?: number; eager?: boolean }) => (
  <span
    className="flex shrink-0 items-center justify-center overflow-hidden rounded-lg border border-line bg-chip font-mono text-xs"
    style={{ width: size, height: size }}
  >
    {p.logo ? (
      <Image src={p.logo} alt="" width={size} height={size} loading={eager ? "eager" : "lazy"} unoptimized={eager} className="h-full w-full object-contain" />
    ) : (
      p.name.slice(0, 2).toUpperCase()
    )}
  </span>
);

const projectLinks = (p: Project) => (
  <span className="flex flex-wrap gap-3">
    {p.link ? <ExtLink href={p.link}>site</ExtLink> : null}
    {p.appStore ? <ExtLink href={p.appStore}>app store</ExtLink> : null}
    {p.apk ? <ExtLink href={p.apk}>google play</ExtLink> : null}
  </span>
);

export default function Home() {
  const [featured, ...rest] = projects;
  const fan = rest.slice(0, 2);

  return (
    <div className="relative min-h-screen">
      <div aria-hidden className="dots pointer-events-none fixed right-0 top-0 h-72 w-96 [mask-image:radial-gradient(at_top_right,black,transparent_70%)]" />
      <div aria-hidden className="dots pointer-events-none fixed bottom-0 left-0 h-72 w-96 [mask-image:radial-gradient(at_bottom_left,black,transparent_70%)]" />

      {/* sidebar */}
      <aside className="fixed inset-y-0 left-0 z-20 hidden w-60 flex-col justify-between border-r border-line bg-bg px-5 py-6 lg:flex">
        <div className="space-y-6">
          <p className="font-mono text-sm">{data.profile.name}</p>
          <nav className="flex flex-col gap-1.5 text-[13px] text-muted">
            <Link href="/blog" className="hover:text-fg">Blog</Link>
            <Link href="/hackathons" className="hover:text-fg">Hackathons</Link>
          </nav>
          <nav className="flex flex-col gap-1.5 border-t border-line pt-4 text-[13px] text-muted">
            {SECTIONS.map((s) => (
              <a key={s.id} href={`#${s.id}`} className="hover:text-fg">{s.label}</a>
            ))}
          </nav>
          <Minimap sections={SECTIONS} />
        </div>
        {email ? (
          <div className="space-y-2 border-t border-line pt-4 text-xs text-muted">
            <p>For work, collabs and everything else, reach me at</p>
            <a href={email.href} className="font-mono text-fg hover:underline">{email.detail}</a>
          </div>
        ) : null}
      </aside>

      {/* mobile top bar */}
      <header className="sticky top-0 z-20 flex items-center justify-between border-b border-line bg-bg/90 px-4 py-3 backdrop-blur lg:hidden">
        <span className="font-mono text-sm">{data.profile.name}</span>
        <nav className="flex gap-4 text-xs text-muted">
          <a href="#projects">Projects</a>
          <Link href="/blog">Blog</Link>
        </nav>
      </header>

      <main className="relative mx-auto max-w-xl space-y-16 px-4 pb-24 pt-12 lg:ml-[calc(15rem+max(0px,(100vw-15rem-36rem)/2))]">
        {/* hero */}
        <section className="grid gap-6 sm:grid-cols-[180px_1fr] sm:items-start">
          <div className="relative aspect-square w-40 overflow-hidden rounded-md border border-line sm:w-full">
            <Image src={data.profile.image} alt={data.profile.name} fill sizes="180px" className="object-cover grayscale" priority />
          </div>
          <div className="space-y-4">
            <h1 className="font-mono text-4xl tracking-tight">{data.profile.name}</h1>
            <p className="text-[15px] leading-9 text-muted">
              I&apos;m an <Chip>AI</Chip> &amp; <Chip>full-stack</Chip> engineer and <Chip>Chief Technology Officer</Chip> at GE LABS LLC.
              I build <Chip>web</Chip>, <Chip>mobile apps</Chip> and the servers behind them.
            </p>
            <p className="text-[15px] leading-9 text-muted">
              Right now I&apos;m building <Chip><Image src="/logos/empire-legends-logo.png" alt="" width={20} height={20} unoptimized className="h-5 w-5 scale-125 object-contain" /> Empire Legends</Chip>, a 5v5 MOBA game, my biggest project yet.
            </p>
            <div className="flex flex-wrap gap-4">
              {data.socialLinks.map((l) => (
                <ExtLink key={l.label} href={l.href}>{l.label.toLowerCase()}</ExtLink>
              ))}
            </div>
          </div>
        </section>

        {/* stats */}
        <section className="grid grid-cols-3 divide-x divide-line border-y border-line font-mono">
          {[
            [`${projects.length}`, "projects"],
            [`${new Date().getFullYear() - firstYear}+ yrs`, "shipping"],
            [`${data.hackathons.length}x`, "hackathons"]
          ].map(([v, k]) => (
            <div key={k} className="px-3 py-4 first:pl-0">
              <p className="text-lg">{v}</p>
              <p className="text-[10px] uppercase tracking-widest text-muted">{k}</p>
            </div>
          ))}
        </section>

        <section className="space-y-4">
          <p className="font-mono text-xs text-muted">about</p>
          {data.about.paragraphs.map((p) => (
            <p key={p} className="text-[15px] leading-7 text-muted">{p}</p>
          ))}
        </section>

        {/* projects */}
        <section id="projects" className="scroll-mt-20">
          <Label n={1} title="projects" />
          {/* fanned featured cards */}
          <div className="relative mx-auto mb-6 mt-6 h-60 max-w-md">
            {fan.map((p, i) => (
              <div
                key={p.name}
                className={`absolute top-6 w-52 rounded-xl border border-line bg-bg p-4 opacity-70 shadow-lg transition hover:opacity-100 ${
                  i === 0 ? "left-0 -rotate-6" : "right-0 rotate-6"
                }`}
              >
                <div className="flex items-center gap-2">
                  <Logo p={p} size={28} />
                  <p className="truncate text-sm font-medium">{p.name}</p>
                </div>
                <p className="mt-2 line-clamp-3 text-xs text-muted">{p.description}</p>
              </div>
            ))}
            <div className="absolute left-1/2 top-0 z-10 w-64 -translate-x-1/2 rounded-xl border border-line bg-bg p-4 shadow-2xl">
              <div className="mb-3 flex flex-wrap gap-1.5">
                {featured.highlights?.map((h) => (
                  <span key={h} className="rounded border border-line px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-wider first:border-fg first:bg-fg first:text-bg">
                    {h}
                  </span>
                ))}
              </div>
              <div className="flex items-center gap-3">
                <Logo p={featured} size={44} eager />
                <div>
                  <p className="font-medium">{featured.name}</p>
                  <p className="font-mono text-[10px] text-muted">{featured.company} · {featured.year}</p>
                </div>
              </div>
              <p className="mt-3 text-xs leading-5 text-muted">{featured.description}</p>
            </div>
          </div>

          <ul className="divide-y divide-line">
            {rest.map((p) => (
              <li key={p.name} className="flex gap-4 py-4">
                <Logo p={p} />
                <div className="min-w-0 flex-1 space-y-1">
                  <div className="flex items-baseline justify-between gap-3">
                    <p className="font-medium">{p.name}</p>
                    <span className="shrink-0 font-mono text-xs text-muted">{p.year}</span>
                  </div>
                  <p className="text-sm text-muted">{p.description}</p>
                  {p.highlights?.length ? (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {p.highlights.map((h) => (
                        <span key={h} className="rounded border border-line px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-wider text-muted">{h}</span>
                      ))}
                    </div>
                  ) : null}
                  <div className="pt-1">{projectLinks(p)}</div>
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* experience */}
        <section id="experience" className="scroll-mt-20">
          <Label n={2} title="experience" />
          <ul className="divide-y divide-line text-sm">
            {data.experience.map((e) => (
              <li key={`${e.role}-${e.year}`} className="grid grid-cols-[3rem_1fr] gap-x-4 py-2.5 sm:grid-cols-[3rem_1fr_auto]">
                <span className="font-mono text-xs leading-5 text-muted">{e.year}</span>
                <span className="font-medium">{e.role}</span>
                <span className="col-start-2 text-muted sm:col-start-3 sm:text-right">{e.company}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* stack */}
        <section id="stack" className="scroll-mt-20">
          <Label n={3} title="stack" />
          <details className="group">
            <summary className="flex cursor-pointer list-none flex-wrap gap-2">
              {stack.slice(0, 14).map((t) => (
                <span key={t} className="rounded-md border border-line px-2 py-1 font-mono text-xs">{t}</span>
              ))}
              <span className="rounded-md border border-dashed border-line px-2 py-1 font-mono text-xs text-muted group-open:hidden">
                + {stack.length - 14} more
              </span>
            </summary>
            <div className="mt-2 flex flex-wrap gap-2">
              {stack.slice(14).map((t) => (
                <span key={t} className="rounded-md border border-line px-2 py-1 font-mono text-xs">{t}</span>
              ))}
            </div>
          </details>
        </section>

        {/* certifications */}
        <section id="certifications" className="scroll-mt-20">
          <Label n={4} title="certifications" />
          <div className="grid gap-3 sm:grid-cols-2">
            {data.certifications.map((c) => (
              <a key={c.name} href={c.link} target="_blank" rel="noreferrer" className="rounded-md border border-line p-4 transition hover:border-fg">
                <p className="text-sm font-medium">{c.name}</p>
                <p className="font-mono text-xs text-muted">{c.issuer} ↗</p>
              </a>
            ))}
          </div>
        </section>

        {/* hackathons */}
        <section id="hackathons" className="scroll-mt-20">
          <Label n={5} title="hackathons" href="/hackathons" action="all" />
          <ul className="divide-y divide-line">
            {data.hackathons.slice(0, 3).map((h) => (
              <li key={h.title} className="space-y-1 py-3">
                <p className="font-mono text-[10px] uppercase tracking-widest text-muted">{h.date}</p>
                <p className="text-sm font-medium">{h.title}</p>
                <p className="text-sm text-muted">{h.description}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* blog */}
        <section id="blog" className="scroll-mt-20">
          <Label n={6} title="blog" href="/blog" action="all posts" />
          <ul className="divide-y divide-line">
            {posts.map((p) => (
              <li key={p.slug}>
                <Link href={`/blog/${p.slug}`} className="block py-3 hover:opacity-70">
                  <div className="flex justify-between gap-4">
                    <p className="text-sm font-medium">{p.title}</p>
                    <span className="shrink-0 font-mono text-xs text-muted">
                      {new Date(p.date).toLocaleDateString("en-US", { month: "short", year: "numeric" })}
                    </span>
                  </div>
                  <p className="truncate text-sm text-muted">{p.excerpt}</p>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        {email ? (
          <section className="border-t border-line pt-8 text-center">
            <p className="font-mono text-xs text-muted">say hello</p>
            <a href={email.href} className="mt-2 inline-block font-mono text-lg hover:underline">{email.detail}</a>
          </section>
        ) : null}
      </main>
    </div>
  );
}
