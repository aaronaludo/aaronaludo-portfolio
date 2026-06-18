import type { Metadata } from "next";
import Link from "next/link";
import profileData from "../../data/profile.json";

type Project = {
  name: string;
  year?: string;
  company?: string;
  description: string;
  link?: string;
  npm?: string;
  apk?: string;
  googlePlay?: string;
  appStore?: string;
  highlights?: string[];
  highlightColor?: string;
};

const Card = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div
    className={`rounded-md border border-white/10 bg-neutral-950 p-6 ${className ?? ""}`}
  >
    {children}
  </div>
);

export const metadata: Metadata = {
  title: "All Projects | Aaron Aludo",
  description: "Browse Aaron Aludo's full project list.",
};

const projects: Project[] =
  (profileData as { allProjects?: Project[] }).allProjects ??
  (profileData as { projects?: Project[] }).projects ??
  [];

const formatLink = (link: string) => ({
  href: link.startsWith("http") ? link : `https://${link}`,
  label: link.replace(/^https?:\/\//, ""),
});

const SparkIcon = ({ className }: { className?: string }) => (
  <svg
    aria-hidden
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    className={className ?? "h-3 w-3"}
    fill="currentColor"
  >
    <path d="M12 2.5l1.6 5.4a4 4 0 0 0 2.5 2.5l5.4 1.6-5.4 1.6a4 4 0 0 0-2.5 2.5L12 21.5l-1.6-5.4a4 4 0 0 0-2.5-2.5L2.5 12l5.4-1.6a4 4 0 0 0 2.5-2.5L12 2.5z" />
  </svg>
);

const HighlightPill = ({ label }: { label: string }) => {
  if (label.toLowerCase().includes("best work")) {
    return (
      <span className="best-work-pill inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide">
        <SparkIcon className="best-work-star relative z-10 h-3 w-3 shrink-0" />
        <span className="relative z-10">{label}</span>
        <SparkIcon className="best-work-star-delayed relative z-10 h-3 w-3 shrink-0" />
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1.5 rounded-md border border-[rgba(var(--hl),0.4)] bg-[rgba(var(--hl),0.12)] px-2.5 py-1 text-[11px] font-semibold text-[var(--hl-text)]">
      <SparkIcon className="h-3 w-3 shrink-0" />
      {label}
    </span>
  );
};

const HIGHLIGHT_PRESETS: Record<string, string> = {
  orange: "#D97757",
  blue: "#3B82F6",
  green: "#22C55E",
  purple: "#A855F7",
  pink: "#EC4899",
  red: "#EF4444",
  yellow: "#EAB308",
  teal: "#14B8A6",
  cyan: "#06B6D4"
};

const getHighlightTheme = (color?: string) => {
  const hex = !color
    ? "#D97757"
    : color.startsWith("#")
      ? color
      : HIGHLIGHT_PRESETS[color.toLowerCase()] ?? "#D97757";

  const raw = hex.replace("#", "");
  const full =
    raw.length === 3
      ? raw.split("").map((c) => c + c).join("")
      : raw.padEnd(6, "0").slice(0, 6);
  const num = parseInt(full, 16);
  const r = (num >> 16) & 255;
  const g = (num >> 8) & 255;
  const b = num & 255;

  const mix = (c: number) => Math.round(c + (255 - c) * 0.45);
  const text = `#${[mix(r), mix(g), mix(b)]
    .map((c) => c.toString(16).padStart(2, "0"))
    .join("")}`;

  return { rgb: `${r}, ${g}, ${b}` , text };
};

const GooglePlayIcon = ({ className }: { className?: string }) => (
  <svg
    aria-hidden
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    className={className}
  >
    <path fill="#4285f4" d="M4.25 3.2 13.4 12l-9.15 8.8a2.2 2.2 0 0 1-.25-1.02V4.22c0-.36.09-.7.25-1.02Z" />
    <path fill="#34a853" d="m14.26 11.17 2.37-2.28L6.7 3.4c-.84-.47-1.6-.5-2.1-.2l9.66 7.97Z" />
    <path fill="#fbbc04" d="m14.26 12.83-9.66 7.97c.5.3 1.26.27 2.1-.2l9.93-5.49-2.37-2.28Z" />
    <path fill="#ea4335" d="m20.02 10.76-3.39-1.87L13.4 12l3.23 3.11 3.39-1.87c1.3-.72 1.3-1.76 0-2.48Z" />
  </svg>
);

const AppStoreIcon = ({ className }: { className?: string }) => (
  <svg
    aria-hidden
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    className={className}
    fill="currentColor"
  >
    <path d="M16.36 12.78c.02 2.4 2.1 3.2 2.13 3.21-.02.06-.33 1.14-1.1 2.25-.66.96-1.34 1.92-2.42 1.94-1.06.02-1.4-.63-2.61-.63-1.21 0-1.59.61-2.59.65-1.04.04-1.83-1.04-2.5-2-1.36-1.97-2.4-5.56-1-7.98.69-1.2 1.93-1.96 3.27-1.98 1.02-.02 1.99.69 2.61.69.63 0 1.8-.85 3.03-.73.52.02 1.97.21 2.9 1.58-.07.05-1.73 1.01-1.72 3.01ZM14.38 5.4c.55-.67.92-1.6.82-2.53-.79.03-1.76.53-2.33 1.2-.51.59-.96 1.54-.84 2.45.88.07 1.78-.45 2.35-1.12Z" />
  </svg>
);

const NpmIcon = ({ className }: { className?: string }) => (
  <svg
    aria-hidden
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    className={className}
    fill="#CB3837"
  >
    <path d="M1.763 0C.786 0 0 .786 0 1.763v20.474C0 23.214.786 24 1.763 24h20.474c.977 0 1.763-.786 1.763-1.763V1.763C24 .786 23.214 0 22.237 0zM5.13 5.323l13.837.019-.009 13.836h-3.464l.01-10.382h-3.456L12.04 19.17H5.113z" />
  </svg>
);

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      <main className="mx-auto flex max-w-6xl flex-col gap-6 px-3 pb-14 pt-10 sm:px-6 lg:px-8">
        <Card className="bg-neutral-950">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-sm font-semibold text-white/90 transition hover:text-white"
              >
                <ArrowLeftIcon />
                Back to Home
              </Link>
              <h1 className="text-2xl font-semibold sm:text-3xl">All Projects</h1>
            </div>
            <div className="flex items-center gap-2 text-xs font-semibold text-white/90">
              <Link href="/projects/privacy" className="rounded-md border border-white/10 px-3 py-1 transition hover:border-white/30 hover:text-white">
                Privacy
              </Link>
              <Link href="/projects/terms" className="rounded-md border border-white/10 px-3 py-1 transition hover:border-white/30 hover:text-white">
                Terms
              </Link>
              <Link href="/projects/contact" className="rounded-md border border-white/10 px-3 py-1 transition hover:border-white/30 hover:text-white">
                Contact
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {projects.map((project) => {
              const details = project.link ? formatLink(project.link) : null;
              const isHighlighted = !!project.highlights && project.highlights.length > 0;
              const theme = getHighlightTheme(project.highlightColor);

              return (
                <article
                  key={project.name}
                  style={
                    isHighlighted
                      ? ({ "--hl": theme.rgb, "--hl-text": theme.text } as React.CSSProperties)
                      : undefined
                  }
                  className={`relative flex h-full flex-col justify-between overflow-hidden rounded-md border p-5 transition duration-200 hover:-translate-y-0.5 ${
                    isHighlighted
                      ? "border-[rgba(var(--hl),0.45)] bg-[rgba(var(--hl),0.06)] shadow-[0_0_0_1px_rgba(var(--hl),0.15)] hover:border-[rgba(var(--hl),0.7)]"
                      : "border-white/10 bg-white/5 hover:border-white/20"
                  }`}
                >
                  {isHighlighted ? (
                    <span
                      aria-hidden
                      className="pointer-events-none absolute inset-x-0 top-0 h-px"
                      style={{
                        background:
                          "linear-gradient(90deg, transparent, rgba(var(--hl),0.7), transparent)"
                      }}
                    />
                  ) : null}
                  <div className="space-y-2">
                    {isHighlighted ? (
                      <div className="flex flex-wrap gap-1.5">
                        {project.highlights!.map((highlight) => (
                          <HighlightPill key={highlight} label={highlight} />
                        ))}
                      </div>
                    ) : null}
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="text-lg font-semibold text-white">
                        {project.name}
                      </p>
                      {project.year ? (
                        <span className="rounded-md border border-white/10 bg-white/10 px-2 py-0.5 text-xs font-semibold text-white/80">
                          {project.year}
                        </span>
                      ) : null}
                      {project.company ? (
                        <span className="rounded-md border border-white/10 bg-white/10 px-2 py-0.5 text-xs font-semibold text-white/70">
                          @ {project.company}
                        </span>
                      ) : null}
                    </div>
                    <p className="text-sm text-white/90">
                      {project.description}
                    </p>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {details ? (
                      <a
                        href={details.href}
                        target="_blank"
                        rel="noreferrer"
                      className="inline-flex items-center gap-1 rounded-md border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-white"
                    >
                      {details.label}
                      <ArrowIcon />
                    </a>
                  ) : null}
                    {project.npm ? (
                      <a
                        href={project.npm}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 rounded-md border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold text-white transition duration-150 hover:border-white/30 hover:bg-white/15"
                      >
                        <NpmIcon className="h-4 w-4" />
                        npm
                        <ArrowIcon />
                      </a>
                    ) : null}
                    {project.apk ? (
                      <a
                        href={project.apk}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 rounded-md border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold text-white transition duration-150 hover:border-white/30 hover:bg-white/15"
                      >
                        <GooglePlayIcon className="h-4 w-4" />
                        Google Play Store
                        <ArrowIcon />
                      </a>
                    ) : null}
                    {project.appStore ? (
                      <a
                        href={project.appStore}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 rounded-md border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold text-white transition duration-150 hover:border-white/30 hover:bg-white/15"
                      >
                        <AppStoreIcon className="h-4 w-4" />
                        App Store
                        <ArrowIcon />
                      </a>
                    ) : null}
                  </div>
                </article>
              );
            })}
          </div>
        </Card>
      </main>
    </div>
  );
}

const ArrowLeftIcon = () => (
  <svg
    aria-hidden
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    className="h-4 w-4 fill-none stroke-current"
  >
    <path
      d="M19 12H5m6 6-6-6 6-6"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ArrowIcon = () => (
  <svg
    aria-hidden
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    className="h-4 w-4 fill-none stroke-current"
  >
    <path
      d="M5 12h13m-6-6 6 6-6 6"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
