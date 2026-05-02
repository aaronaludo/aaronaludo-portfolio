import type { Metadata } from "next";
import Link from "next/link";
import profileData from "../../data/profile.json";

type Project = {
  name: string;
  year?: string;
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

              return (
                <article
                  key={project.name}
                  className="flex h-full flex-col justify-between rounded-md border border-white/10 bg-white/5 p-5 transition duration-200 hover:-translate-y-0.5 hover:border-white/20"
                >
                  <div className="space-y-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="text-lg font-semibold text-white">
                        {project.name}
                      </p>
                      {project.year ? (
                        <span className="rounded-md border border-white/10 bg-white/10 px-2 py-0.5 text-xs font-semibold text-white/80">
                          {project.year}
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
