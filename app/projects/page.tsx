import type { Metadata } from "next";
import Link from "next/link";
import profileData from "../../data/profile.json";

type Project = {
  name: string;
  description: string;
  link?: string;
  apk?: string;
  googlePlay?: string;
  appStore?: string;
};

const Card = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div
    className={`rounded-2xl border border-white/10 bg-white/5 p-6 shadow-[0_20px_80px_rgba(0,0,0,0.45)] backdrop-blur-xl ${className ?? ""}`}
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

export default function ProjectsPage() {
  return (
    <div className="relative min-h-screen overflow-hidden text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_25%_20%,rgba(255,255,255,0.1),transparent_30%),radial-gradient(circle_at_80%_10%,rgba(255,255,255,0.08),transparent_26%),radial-gradient(circle_at_60%_70%,rgba(255,255,255,0.06),transparent_30%)]" />

      <main className="relative z-10 mx-auto flex max-w-6xl flex-col gap-6 px-3 pb-14 pt-10 sm:px-6 lg:px-8">
        <Card className="bg-gradient-to-r from-white/8 via-white/5 to-white/5">
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
              <Link href="/projects/privacy" className="rounded-full border border-white/10 px-3 py-1 transition hover:border-white/30 hover:text-white">
                Privacy
              </Link>
              <Link href="/projects/terms" className="rounded-full border border-white/10 px-3 py-1 transition hover:border-white/30 hover:text-white">
                Terms
              </Link>
              <Link href="/projects/contact" className="rounded-full border border-white/10 px-3 py-1 transition hover:border-white/30 hover:text-white">
                Contact
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {projects.map((project) => {
              const details = project.link ? formatLink(project.link) : null;

              return (
                <article
                  key={project.name}
                  className="flex h-full flex-col justify-between rounded-2xl border border-white/10 bg-gradient-to-br from-white/8 via-white/5 to-white/5 p-5 transition duration-200 hover:-translate-y-0.5 hover:border-white/20"
                >
                  <div className="space-y-2">
                    <p className="text-lg font-semibold text-white">
                      {project.name}
                    </p>
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
                      className="inline-flex items-center gap-1 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-white"
                    >
                      {details.label}
                      <ArrowIcon />
                    </a>
                  ) : null}
                    {project.apk ? (
                      <a
                        href={project.apk}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold text-white"
                      >
                        Download APK
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
