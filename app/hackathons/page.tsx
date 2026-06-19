import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import profileData from "../../data/profile.json";

type Hackathon = {
  date: string;
  title: string;
  location: string;
  description: string;
  badge: string;
  logo?: string;
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
  title: "All Hackathons | Aaron Aludo",
  description: "Browse all hackathons Aaron Aludo has joined.",
};

const hackathons: Hackathon[] =
  (profileData as { hackathons?: Hackathon[] }).hackathons ?? [];

const HackathonBadge = ({
  title,
  badge,
  logo,
}: {
  title: string;
  badge?: string;
  logo?: string;
}) => {
  const fallback =
    badge ??
    title
      .replace(/[^a-zA-Z0-9 ]/g, " ")
      .split(" ")
      .filter(Boolean)
      .slice(0, 3)
      .map((word) => word[0])
      .join("")
      .toUpperCase();

  return (
    <div className="flex h-12 w-12 items-center justify-center rounded-md border border-white/15 bg-white/10 text-[10px] font-semibold text-white/90">
      {logo ? (
        <Image
          src={logo}
          alt={`${title} logo`}
          width={36}
          height={36}
          className="h-9 w-9 object-contain"
        />
      ) : (
        <span className="px-1 text-center leading-tight">{fallback}</span>
      )}
    </div>
  );
};

export default function HackathonsPage() {
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
              <h1 className="text-2xl font-semibold sm:text-3xl">All Hackathons</h1>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {hackathons.map((hackathon) => (
              <article
                key={`${hackathon.title}-${hackathon.date}`}
                className="grid grid-cols-[auto_1fr] gap-4 rounded-md border border-white/10 bg-white/5 p-5 transition duration-200 hover:-translate-y-0.5 hover:border-white/20"
              >
                <div className="pt-1">
                  <HackathonBadge
                    title={hackathon.title}
                    badge={hackathon.badge}
                    logo={hackathon.logo}
                  />
                </div>
                <div className="space-y-1">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/70">
                    {hackathon.date}
                  </p>
                  <p className="text-sm font-semibold text-white sm:text-base">
                    {hackathon.title}
                  </p>
                  <p className="text-sm text-white/80">{hackathon.location}</p>
                  <p className="text-sm text-white/70">{hackathon.description}</p>
                </div>
              </article>
            ))}
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
