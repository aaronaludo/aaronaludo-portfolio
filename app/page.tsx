import Image from "next/image";
import Link from "next/link";
import profileData from "../data/profile.json";

type ButtonVariant = "solid" | "ghost" | "outline";

type ButtonProps = {
  label: string;
  href: string;
  variant?: ButtonVariant;
};

const Card = ({
  children,
  className
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

const SectionHeading = ({
  title,
  actionLabel,
  href
}: {
  title: string;
  actionLabel?: string;
  href?: string;
}) => (
  <div className="mb-4 flex items-center justify-between gap-4">
    <h2 className="text-lg font-semibold text-white">{title}</h2>
    {href && actionLabel ? (
      <Link
        href={href}
        className="text-xs font-semibold text-white/70 hover:text-white"
      >
        {actionLabel}
      </Link>
    ) : null}
  </div>
);

const Pill = ({ label }: { label: string }) => (
  <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/80">
    {label}
  </span>
);

const Button = ({ label, href, variant = "solid" }: ButtonProps) => {
  const base =
    "inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition duration-150 ease-out";
  const styles: Record<ButtonVariant, string> = {
    solid: "bg-white text-black hover:bg-white/90",
    ghost: "bg-white/10 text-white hover:bg-white/15 border border-white/10",
    outline: "border border-white/20 text-white hover:border-white/40"
  };

  const isAnchor = href.startsWith("http") || href.startsWith("mailto");
  const targetProps = isAnchor ? { target: "_blank", rel: "noreferrer" } : {};

  return (
    <a href={href} className={`${base} ${styles[variant]}`} {...targetProps}>
      {label}
    </a>
  );
};

const Divider = () => (
  <span className="h-px w-full bg-gradient-to-r from-white/10 via-white/20 to-white/10" />
);

export default function Home() {
  const data = profileData;

  return (
    <div className="relative min-h-screen overflow-hidden text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_25%_20%,rgba(156,140,255,0.14),transparent_30%),radial-gradient(circle_at_80%_10%,rgba(255,120,160,0.18),transparent_26%),radial-gradient(circle_at_60%_70%,rgba(95,204,255,0.12),transparent_30%)]" />

      <main className="relative z-10 mx-auto flex max-w-6xl flex-col gap-6 px-3 pb-14 pt-10 sm:px-6 lg:px-8">
        <Card className="bg-gradient-to-r from-white/8 via-white/5 to-white/5">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center">
            <div className="flex items-center gap-4">
              <div className="relative h-28 w-28 overflow-hidden rounded-2xl border border-white/10 bg-white/5">
                <Image
                  src={data.profile.image}
                  alt={data.profile.name}
                  fill
                  sizes="112px"
                  className="object-cover"
                  priority
                />
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h1 className="text-3xl font-semibold">{data.profile.name}</h1>
                  <span className="rounded-full border border-emerald-300/30 bg-emerald-400/15 px-2 py-0.5 text-xs font-semibold text-emerald-100">
                    Verified
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm text-white/60">
                  <LocationIcon />
                  <span>{data.profile.location}</span>
                </div>
                <p className="text-lg text-white/80">{data.profile.role}</p>
                <div className="flex flex-wrap items-center gap-2 pt-1 text-xs text-amber-100">
                  <span className="rounded-full border border-amber-200/30 bg-amber-400/15 px-2 py-1 font-semibold">
                    {data.profile.availability}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex flex-1 flex-col gap-3 lg:items-end">
              <div className="flex flex-wrap gap-2 lg:justify-end">
                {data.profile.ctas?.map((cta) => (
                  <Button
                    key={cta.label}
                    label={cta.label}
                    href={cta.href}
                    variant={cta.variant as ButtonVariant}
                  />
                ))}
              </div>
            </div>
          </div>
        </Card>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.6fr_1fr]">
          <Card>
            <SectionHeading title={data.about.title} />
            <div className="space-y-3 text-sm text-white/70">
              {data.about.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </Card>

          <Card>
            <SectionHeading title="Experience" />
            <div className="relative space-y-5">
              <div className="absolute left-2 top-1 bottom-1 w-px bg-white/10" />
              {data.experience.map((item) => (
                <div key={`${item.role}-${item.year}`} className="relative flex items-start gap-3 pl-6">
                  <span className="absolute left-0 top-2 h-3 w-3 rounded-full border border-white/30 bg-white/20" />
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-white">{item.role}</p>
                    <p className="text-xs text-white/60">{item.company}</p>
                  </div>
                  <span className="text-xs font-semibold text-white/50">{item.year}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.6fr_1fr]">
          <Card>
            <SectionHeading title="Tech Stack" actionLabel="View all" href="#" />
            <div className="space-y-4">
              <div>
                <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-white/50">
                  Frontend
                </p>
                <div className="flex flex-wrap gap-2">
                  {data.techStack.frontend.map((item) => (
                    <Pill key={item} label={item} />
                  ))}
                </div>
              </div>
              <Divider />
              <div>
                <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-white/50">
                  Backend
                </p>
                <div className="flex flex-wrap gap-2">
                  {data.techStack.backend.map((item) => (
                    <Pill key={item} label={item} />
                  ))}
                </div>
              </div>
              <Divider />
              <div>
                <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-white/50">
                  DevOps &amp; Cloud
                </p>
                <div className="flex flex-wrap gap-2">
                  {data.techStack.devops.map((item) => (
                    <Pill key={item} label={item} />
                  ))}
                </div>
              </div>
            </div>
          </Card>

          <Card>
            <SectionHeading title="Beyond Coding" />
            <div className="space-y-3 text-sm text-white/70">
              {data.beyondCoding.map((item) => (
                <p key={item}>{item}</p>
              ))}
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <Card>
            <SectionHeading title="Recent Projects" actionLabel="View all" href="#" />
            <div className="grid gap-3 sm:grid-cols-2">
              {data.projects.map((project) => (
                <div
                  key={project.name}
                  className="rounded-xl border border-white/10 bg-white/5 p-4 hover:border-white/20"
                >
                  <p className="text-sm font-semibold text-white">{project.name}</p>
                  <p className="text-xs text-white/60">{project.description}</p>
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-emerald-100"
                  >
                    {project.link.replace("https://", "")}
                    <ArrowIcon />
                  </a>
                </div>
              ))}
            </div>
          </Card>

          <Card>
            <SectionHeading title="Recommendations" />
            {data.recommendations.map((rec) => (
              <div key={rec.author} className="space-y-3">
                <p className="text-sm leading-relaxed text-white/70">
                  &ldquo;{rec.quote}&rdquo;
                </p>
                <div className="text-sm font-semibold text-white">{rec.author}</div>
                <div className="text-xs text-white/60">{rec.role}</div>
                <div className="flex gap-1 pt-2">
                  {Array.from({ length: 6 }).map((_, index) => (
                    <span
                      key={index}
                      className={`h-1.5 w-6 rounded-full ${index === 0 ? "bg-white" : "bg-white/15"}`}
                    />
                  ))}
                </div>
              </div>
            ))}
          </Card>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.1fr_1fr]">
          <Card>
            <SectionHeading title="Recent Certifications" actionLabel="View all" href="#" />
            <div className="grid gap-3 sm:grid-cols-2">
              {data.certifications.map((cert) => (
                <div
                  key={cert.name}
                  className="rounded-xl border border-white/10 bg-white/5 p-3 text-sm text-white/80"
                >
                  <div className="font-semibold text-white">{cert.name}</div>
                  <div className="text-xs text-white/60">{cert.issuer}</div>
                </div>
              ))}
            </div>
          </Card>

          <Card>
            <SectionHeading title="Community & Social" />
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              <div className="space-y-2">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/50">
                  A member of
                </p>
                <div className="space-y-2">
                  {data.memberships.map((membership) => (
                    <div
                      key={membership}
                      className="rounded-lg border border-white/10 bg-white/5 p-3 text-xs text-white/70"
                    >
                      {membership}
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/50">
                  Social links
                </p>
                <div className="space-y-2">
                  {data.socialLinks.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center justify-between rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white hover:border-white/20"
                    >
                      <span>{link.label}</span>
                      <ArrowIcon />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.1fr_1fr]">
          <Card>
            <SectionHeading title="Speaking" />
            {data.speaking.map((item) => (
              <div key={item.title} className="flex flex-col gap-3 rounded-xl border border-white/10 bg-white/5 p-4">
                <div>
                  <p className="text-sm font-semibold text-white">{item.title}</p>
                  <p className="text-sm text-white/70">{item.description}</p>
                </div>
                <Button
                  label={item.cta.label}
                  href={item.cta.href}
                  variant="ghost"
                />
              </div>
            ))}
          </Card>

          <Card>
            <SectionHeading title="Get in touch" />
            <div className="grid gap-2">
              {data.contacts.map((contact) => (
                <a
                  key={contact.label}
                  href={contact.href}
                  className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white hover:border-white/20"
                >
                  <div>
                    <p className="font-semibold">{contact.label}</p>
                    <p className="text-xs text-white/60">{contact.detail}</p>
                  </div>
                  <ArrowIcon />
                </a>
              ))}
            </div>
          </Card>
        </div>

        <Card>
          <SectionHeading title="Gallery" />
          <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
            {data.gallery.map((photo) => (
              <div
                key={photo.src}
                className="group relative aspect-[4/3] overflow-hidden rounded-xl border border-white/10 bg-white/5"
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="(max-width: 1024px) 50vw, 200px"
                  className="object-cover transition duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/20 to-transparent opacity-0 transition group-hover:opacity-100" />
                <div className="absolute inset-0 flex items-end p-3 opacity-0 transition group-hover:opacity-100">
                  <p className="text-xs text-white/80">{photo.alt}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </main>
    </div>
  );
}

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

const LocationIcon = () => (
  <svg
    aria-hidden
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    className="h-4 w-4 fill-none stroke-current text-white/60"
  >
    <path
      d="M12 21s7-4.5 7-10a7 7 0 1 0-14 0c0 5.5 7 10 7 10Z"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle cx="12" cy="11" r="2.5" strokeWidth="1.8" />
  </svg>
);
