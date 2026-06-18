import Image from "next/image";
import Link from "next/link";
import { IconType } from "react-icons";
import { HiOutlineMail } from "react-icons/hi";
import {
  SiAmazonwebservices,
  SiAuth0,
  SiBootstrap,
  SiClaude,
  SiDiscord,
  SiDocker,
  SiEslint,
  SiFastapi,
  SiFirebase,
  SiGit,
  SiGithub,
  SiGithubactions,
  SiGitlab,
  SiGoogle,
  SiJavascript,
  SiJira,
  SiJsonwebtokens,
  SiLaravel,
  SiMariadb,
  SiMysql,
  SiNextdotjs,
  SiOllama,
  SiOpenai,
  SiPhp,
  SiPostgresql,
  SiPrettier,
  SiPycharm,
  SiPython,
  SiReact,
  SiSass,
  SiSupabase,
  SiTailwindcss,
  SiTensorflow,
  SiTypescript,
  SiVite,
  SiWebpack,
  SiWordpress
} from "react-icons/si";
import { PiCursorFill } from "react-icons/pi";
import { TbApi, TbBrandTeams, TbBrandVscode, TbTopologyStar3 } from "react-icons/tb";
import profileData from "../data/profile.json";

type ButtonVariant = "solid" | "ghost" | "outline";

type PortfolioProject = {
  name: string;
  year?: string;
  company?: string;
  description: string;
  logo?: string;
  link?: string;
  apk?: string;
  appStore?: string;
  highlights?: string[];
  highlightColor?: string;
};

type Hackathon = {
  date: string;
  title: string;
  location: string;
  description: string;
  badge: string;
  logo?: string;
};

type ButtonProps = {
  label: string;
  href: string;
  variant?: ButtonVariant;
  icon?: React.ReactNode;
  fullWidthOnMobile?: boolean;
  className?: string;
};

const Card = ({
  children,
  className
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div
    className={`rounded-md border border-white/10 bg-neutral-950 p-5 sm:p-6 ${className ?? ""}`}
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
        className="text-xs font-semibold text-white/90 hover:text-white"
      >
        {actionLabel}
      </Link>
    ) : null}
  </div>
);

const Pill = ({ label }: { label: string }) => {
  const techStyle = getTechStyle(label);
  const Icon = techStyle.icon;

  return (
    <span className="inline-flex items-center gap-2 rounded-md border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/90">
      {Icon ? (
        <Icon className="h-4 w-4" style={{ color: techStyle.color }} />
      ) : (
        <TechInitial initials={techStyle.initials} color={techStyle.color} />
      )}
      <span>{label}</span>
    </span>
  );
};

const Button = ({
  label,
  href,
  variant = "solid",
  icon,
  fullWidthOnMobile,
  className
}: ButtonProps) => {
  const base =
    "inline-flex items-center gap-2 rounded-md px-3.5 py-1.5 text-sm font-semibold transition duration-150 ease-out";
  const styles: Record<ButtonVariant, string> = {
    solid: "bg-white text-black hover:bg-white/90",
    ghost: "border border-white/15 bg-white/10 text-white hover:border-white/30 hover:bg-white/15",
    outline: "border border-white/25 text-white hover:border-white/40"
  };

  const isAnchor = href.startsWith("http") || href.startsWith("mailto");
  const targetProps = isAnchor ? { target: "_blank", rel: "noreferrer" } : {};

  return (
    <a
      href={href}
      className={`${base} ${styles[variant]} ${fullWidthOnMobile ? "w-full justify-center sm:w-auto" : ""} ${className ?? ""}`}
      {...targetProps}
    >
      {icon ? <span className="text-lg">{icon}</span> : null}
      {label}
    </a>
  );
};

const Divider = () => (
  <span className="h-px w-full bg-white/10" />
);

export default function Home() {
  const data = profileData;
  const projects = data.projects as PortfolioProject[];
  const hackathons = data.hackathons as Hackathon[];

  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      <main className="mx-auto flex max-w-5xl flex-col gap-5 px-4 pb-12 pt-8 sm:px-6 lg:px-8">
        <Card className="border-white/15 bg-neutral-900 p-5 sm:p-6 lg:p-7">

          <div className="grid grid-cols-1 gap-6 text-center md:grid-cols-[auto_1fr] md:text-left lg:grid-cols-[auto_1fr_auto] lg:items-center">
            <div className="flex flex-col items-center gap-4 md:flex-row md:items-center md:gap-5">
              <div className="relative h-20 w-20 overflow-hidden rounded-md border border-white/15 bg-white/10 sm:h-24 sm:w-24 md:h-24 md:w-24">
                <Image
                  src={data.profile.image}
                  alt={data.profile.name}
                  fill
                  sizes="96px"
                  className="object-cover"
                  priority
                />
              </div>
              <div className="space-y-2 text-center md:text-left">
                <div className="flex items-center justify-center gap-2 md:justify-start">
                  <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                    {data.profile.name}
                  </h1>
                </div>
                <div className="flex items-center justify-center gap-2 text-sm text-white/90 md:justify-start">
                  <LocationIcon />
                  <span>{data.profile.location}</span>
                </div>
                <p className="text-base text-white/90 sm:text-lg">{data.profile.role}</p>
                <div className="flex w-full flex-col items-center gap-2 pt-1 text-sm text-white/90 sm:w-auto sm:items-start sm:text-xs">
                  <span className="inline-flex w-full items-center justify-center gap-2 rounded-md border border-white/25 bg-white/10 px-4 py-2.5 font-semibold text-white sm:w-auto sm:justify-start sm:px-3 sm:py-2">
                    <span className="h-2 w-2 shrink-0 rounded-full bg-white/70" />
                    <span className="leading-snug">{data.profile.availability}</span>
                  </span>
                  <span
                    className="inline-flex w-full items-center justify-center gap-2 rounded-md border px-4 py-2.5 font-semibold sm:w-auto sm:justify-start sm:px-3 sm:py-2"
                    style={{
                      borderColor: "rgba(217, 119, 87, 0.4)",
                      backgroundColor: "rgba(217, 119, 87, 0.12)",
                      color: "#E89B82"
                    }}
                  >
                    <ClaudeLogo className="h-4 w-4 shrink-0" />
                    <span className="leading-snug">
                      {data.aiTools.primary.name}: My Coding Assistant Most of the Time
                    </span>
                  </span>
                </div>
              </div>
            </div>
            <div className="flex flex-1 flex-col gap-3 md:items-end">
              <div className="flex w-full flex-col gap-2 sm:flex-row sm:flex-wrap sm:gap-3 md:w-auto md:justify-end">
                {data.profile.ctas?.map((cta) => {
                  const icon =
                    cta.label.toLowerCase().includes("email") || cta.href.startsWith("mailto")
                      ? <HiOutlineMail className="h-4 w-4" />
                      : undefined;

                  return (
                    <Button
                      key={cta.label}
                      label={cta.label}
                      href={cta.href}
                      variant={cta.variant as ButtonVariant}
                      icon={icon}
                      fullWidthOnMobile
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </Card>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.6fr_1fr]">
          <Card>
            <SectionHeading title={data.about.title} />
            <div className="space-y-3 text-sm text-white/90">
              {data.about.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </Card>

          <Card>
            <SectionHeading title="Experience" />
            <div className="relative space-y-4">
              <div className="absolute left-3 top-1 bottom-1 hidden w-px bg-white/10 sm:block" />
              {data.experience.map((item) => (
                <div
                  key={`${item.role}-${item.year}`}
                  className="relative grid gap-2 rounded-md border border-white/10 bg-white/5 px-4 py-3 sm:grid-cols-[1fr_auto] sm:items-start sm:gap-3 sm:rounded-none sm:border-0 sm:bg-transparent sm:px-0 sm:py-0 sm:pl-7"
                >
                  <span className="absolute left-1.5 top-4 hidden h-3 w-3 rounded-full border border-white/30 bg-white/20 sm:block" />
                  <div className="space-y-1">
                    <p className="text-base font-semibold text-white sm:text-sm">{item.role}</p>
                    <p className="text-sm text-white/80 sm:text-xs">{item.company}</p>
                  </div>
                  <span className="flex items-center justify-start text-sm font-semibold text-white/90 sm:justify-end sm:text-xs">
                    {item.year}
                  </span>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <Card>
          <SectionHeading title="Tech Stack" />
          <div className="space-y-4">
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-white/90">
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
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-white/90">
                Backend, APIs &amp; Databases
              </p>
              <div className="flex flex-wrap gap-2">
                {data.techStack.backend.map((item) => (
                  <Pill key={item} label={item} />
                ))}
              </div>
            </div>
            <Divider />
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-white/90">
                DevOps &amp; Cloud
              </p>
              <div className="flex flex-wrap gap-2">
                {data.techStack.devops.map((item) => (
                  <Pill key={item} label={item} />
                ))}
              </div>
            </div>
            <Divider />
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-white/90">
                AI &amp; Machine Learning
              </p>
              <div className="flex flex-wrap gap-2">
                {data.techStack["ai-ml"]?.map((item) => (
                  <Pill key={item} label={item} />
                ))}
              </div>
            </div>
            <Divider />
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-white/90">
                CMS &amp; No-code
              </p>
              <div className="flex flex-wrap gap-2">
                {data.techStack["cms-nocode"]?.map((item) => (
                  <Pill key={item} label={item} />
                ))}
              </div>
            </div>
            <Divider />
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-white/90">
                Developer Tools
              </p>
              <div className="flex flex-wrap gap-2">
                {data.techStack["developer-tools"]?.map((item) => (
                  <Pill key={item} label={item} />
                ))}
              </div>
            </div>
          </div>
        </Card>

        <Card>
          <SectionHeading title="Recent Projects" actionLabel="View all" href="/projects" />
          <div className="grid gap-4 sm:grid-cols-2">
            {projects.map((project) => {
              const isHighlighted = !!project.highlights && project.highlights.length > 0;
              const theme = getHighlightTheme(project.highlightColor);

              return (
              <div
                key={project.name}
                style={
                  isHighlighted
                    ? ({ "--hl": theme.rgb, "--hl-text": theme.text } as React.CSSProperties)
                    : undefined
                }
                className={`group relative flex h-full flex-col justify-between overflow-hidden rounded-md border p-5 transition duration-200 hover:-translate-y-0.5 ${
                  isHighlighted
                    ? "border-[rgba(var(--hl),0.45)] bg-[rgba(var(--hl),0.06)] shadow-[0_0_0_1px_rgba(var(--hl),0.15)] hover:border-[rgba(var(--hl),0.7)]"
                    : "border-white/10 bg-white/5 hover:border-white/25"
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
                <div className="space-y-3">
                  {isHighlighted ? (
                    <div className="flex flex-wrap gap-1.5">
                      {project.highlights!.map((highlight) => (
                        <HighlightPill key={highlight} label={highlight} />
                      ))}
                    </div>
                  ) : null}
                  <div className="flex items-start gap-3">
                    <ProjectLogo name={project.name} logo={project.logo} />
                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="text-lg font-semibold text-white">{project.name}</p>
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
                      <p className="text-sm text-white/90">{project.description}</p>
                    </div>
                  </div>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.link ? (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-md border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-white"
                    >
                      <WebsiteIcon className="h-4 w-4 text-white" />
                      {project.link.replace("https://", "").replace("http://", "")}
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
              </div>
              );
            })}
          </div>
        </Card>

        <Card className="overflow-hidden border-white/12 bg-neutral-950">
          <SectionHeading title="Recent Certifications" actionLabel="View all" href="#" />
          <div className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-3 sm:gap-4">
            {data.certifications.map((cert) => (
              <a
                key={cert.name}
                href={cert.link ?? "#"}
                target="_blank"
                rel="noreferrer"
                className="group flex items-center justify-between gap-4 rounded-md border border-white/10 bg-white/5 px-5 py-4 text-sm text-white/90 transition duration-150 hover:-translate-y-[1px] hover:border-white/25 hover:bg-white/10"
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-white/10 bg-white/10 text-[11px] font-semibold text-white">
                    {getIssuerIcon(cert.issuer) ?? (cert.issuer?.[0] ?? "C")}
                  </span>
                  <div className="space-y-1">
                    <div className="text-sm font-semibold text-white sm:text-base">
                      {cert.name}
                    </div>
                    <div className="text-xs text-white/90">{cert.issuer}</div>
                  </div>
                </div>
                <span className="inline-flex items-center gap-2 rounded-md border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-semibold text-white/90 transition group-hover:border-white/25 group-hover:text-white">
                  View <ArrowIcon />
                </span>
              </a>
            ))}
          </div>
        </Card>

        <Card>
          <SectionHeading title="Joined Hackathons" />
          <div className="relative">
            <div className="absolute left-6 top-4 bottom-4 hidden w-px bg-white/10 sm:block" />
            <div className="space-y-4">
              {hackathons.map((hackathon, index) => {
                const isLast = index === hackathons.length - 1;

                return (
                  <div
                    key={`${hackathon.title}-${hackathon.date}`}
                    className={`grid grid-cols-[auto_1fr] gap-3 rounded-md border border-white/10 bg-white/5 p-4 sm:gap-5 sm:rounded-none sm:border-0 sm:bg-transparent sm:px-0 sm:py-0 ${!isLast ? "sm:pb-4 sm:border-b sm:border-white/10 sm:border-dashed" : ""}`}
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
                  </div>
                );
              })}
            </div>
          </div>
        </Card>

        <Card>
          <SectionHeading title="Social Links" />
          <div className="space-y-2">
            {data.socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-white hover:border-white/20"
              >
                <span className="flex items-center gap-3">
                  <SocialIcon label={link.label} />
                  <span>{link.label}</span>
                </span>
                <ArrowIcon />
              </a>
            ))}
          </div>
        </Card>

        <Card>
          <SectionHeading title="Get in touch" />
          <div className="grid gap-2">
            {data.contacts.map((contact) => (
              <a
                key={contact.label}
                href={contact.href}
                className="flex items-center justify-between rounded-md border border-white/10 bg-white/5 px-4 py-3 text-sm text-white hover:border-white/20"
              >
                <span className="flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-md bg-white/10">
                    <ContactIcon label={contact.label} />
                  </span>
                  <span>
                    <p className="font-semibold">{contact.label}</p>
                    <p className="text-xs text-white/90">{contact.detail}</p>
                  </span>
                </span>
                <ArrowIcon />
              </a>
            ))}
          </div>
        </Card>

      </main>
    </div>
  );
}

const SocialIcon = ({ label }: { label: string }) => {
  const normalized = label.toLowerCase();

  if (normalized.includes("linkedin")) {
    return <LinkedInIcon className="h-5 w-5 text-white" />;
  }

  if (normalized.includes("github")) {
    return <GitHubIcon className="h-5 w-5 text-white" />;
  }

  if (normalized.includes("instagram")) {
    return <InstagramIcon className="h-5 w-5 text-white" />;
  }

  return <DefaultLinkIcon className="h-5 w-5 text-white/90" />;
};

const getIssuerIcon = (issuer?: string) => {
  const normalized = issuer?.toLowerCase() ?? "";

  if (normalized.includes("google")) {
    return <SiGoogle className="h-5 w-5 text-white" />;
  }

  return null;
};

const LinkedInIcon = ({ className }: { className?: string }) => (
  <svg
    aria-hidden
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    className={className}
    fill="currentColor"
  >
    <path d="M22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0zM7.059 20.452H3.558V9h3.501v11.452zM5.308 7.433c-1.121 0-2.029-.916-2.029-2.044 0-1.129.909-2.044 2.029-2.044 1.123 0 2.03.915 2.03 2.044 0 1.128-.907 2.044-2.03 2.044zm15.144 13.019h-3.5v-5.569c0-1.329-.026-3.039-1.852-3.039-1.853 0-2.136 1.447-2.136 2.939v5.669h-3.5V9h3.36v1.561h.047c.468-.89 1.607-1.829 3.304-1.829 3.535 0 4.187 2.313 4.187 5.317v6.403z" />
  </svg>
);

const GitHubIcon = ({ className }: { className?: string }) => (
  <svg
    aria-hidden
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    className={className}
    fill="currentColor"
  >
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577v-2.234c-3.338.725-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.757-1.333-1.757-1.089-.745.083-.73.083-.73 1.205.086 1.84 1.237 1.84 1.237 1.07 1.834 2.809 1.304 3.495.997.107-.776.418-1.305.762-1.605-2.665-.305-5.466-1.334-5.466-5.931 0-1.31.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23a11.52 11.52 0 0 1 3.003-.404c1.018.005 2.045.138 3.003.404 2.291-1.552 3.297-1.23 3.297-1.23.654 1.653.243 2.874.12 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.804 5.624-5.476 5.921.43.372.823 1.102.823 2.222v3.293c0 .322.218.694.825.576C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
  </svg>
);

const InstagramIcon = ({ className }: { className?: string }) => (
  <svg
    aria-hidden
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    className={className}
    fill="currentColor"
  >
    <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2Zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5A4.25 4.25 0 0 0 20.5 16.25v-8.5A4.25 4.25 0 0 0 16.25 3.5h-8.5Zm8.75 2.25a1 1 0 1 1 0 2 1 1 0 0 1 0-2Zm-5.5 1.25a4.5 4.5 0 1 1 0 9 4.5 4.5 0 0 1 0-9Zm0 1.5a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z" />
  </svg>
);

const DefaultLinkIcon = ({ className }: { className?: string }) => (
  <svg
    aria-hidden
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    className={className}
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
  >
    <path d="M10.5 6.75H8A5.25 5.25 0 0 0 8 17.25h2.5m3-10.5H16a5.25 5.25 0 0 1 0 10.5h-2.5M9.75 12h4.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const WebsiteIcon = ({ className }: { className?: string }) => (
  <svg
    aria-hidden
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    className={className}
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
  >
    <path d="M12 3.25A8.75 8.75 0 1 0 20.75 12 8.76 8.76 0 0 0 12 3.25Zm0 0v17.5m-7.25-8.75h14.5m-10 0a12.4 12.4 0 0 0 2.5 7.5m0-15a12.4 12.4 0 0 0-2.5 7.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

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

const techIconColor = "#d8d8d8";

const techIconMap: Record<string, { icon?: IconType }> = {
  javascript: { icon: SiJavascript },
  typescript: { icon: SiTypescript },
  react: { icon: SiReact },
  "next.js": { icon: SiNextdotjs },
  bootstrap: { icon: SiBootstrap },
  "tailwind css": { icon: SiTailwindcss },
  scss: { icon: SiSass },
  vite: { icon: SiVite },
  webpack: { icon: SiWebpack },
  eslint: { icon: SiEslint },
  prettier: { icon: SiPrettier },
  python: { icon: SiPython },
  php: { icon: SiPhp },
  laravel: { icon: SiLaravel },
  fastapi: { icon: SiFastapi },
  postgresql: { icon: SiPostgresql },
  mysql: { icon: SiMysql },
  mariadb: { icon: SiMariadb },
  supabase: { icon: SiSupabase },
  oauth: { icon: SiAuth0 },
  jwt: { icon: SiJsonwebtokens },
  "rest api": { icon: TbApi },
  aws: { icon: SiAmazonwebservices },
  docker: { icon: SiDocker },
  "github actions": { icon: SiGithubactions },
  ollama: { icon: SiOllama },
  openai: { icon: SiOpenai },
  claude: { icon: SiClaude },
  gemini: { icon: SiGoogle },
  tensorflow: { icon: SiTensorflow },
  wordpress: { icon: SiWordpress },
  n8n: { icon: TbTopologyStar3 },
  git: { icon: SiGit },
  github: { icon: SiGithub },
  firebase: { icon: SiFirebase },
  jira: { icon: SiJira },
  gitlab: { icon: SiGitlab },
  "vs code": { icon: TbBrandVscode },
  cursor: { icon: PiCursorFill },
  pycharm: { icon: SiPycharm },
  discord: { icon: SiDiscord },
  "microsoft teams": { icon: TbBrandTeams }
};

const getTechStyle = (
  label: string
): {
  icon?: IconType;
  color: string;
  initials: string;
} => {
  const key = label.toLowerCase();
  const match = techIconMap[key];

  const initials = label
    .split(" ")
    .filter(Boolean)
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return {
    icon: match?.icon,
    color: techIconColor,
    initials: initials || label.slice(0, 2).toUpperCase()
  };
};

const TechInitial = ({ initials, color }: { initials: string; color: string }) => (
  <span
    className="flex h-5 w-5 shrink-0 items-center justify-center rounded-sm border border-white/10 bg-white/10 text-[10px] font-semibold"
    style={{
      color,
      boxShadow: color ? `0 0 0 1px ${color}33` : undefined
    }}
  >
    {initials}
  </span>
);

const HackathonBadge = ({
  title,
  badge,
  logo
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

const HighlightPill = ({ label }: { label: string }) => (
  <span className="inline-flex items-center gap-1.5 rounded-md border border-[rgba(var(--hl),0.4)] bg-[rgba(var(--hl),0.12)] px-2.5 py-1 text-[11px] font-semibold text-[var(--hl-text)]">
    <SparkIcon className="h-3 w-3 shrink-0" />
    {label}
  </span>
);

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

  return { rgb: `${r}, ${g}, ${b}`, text };
};

const ProjectLogo = ({ name, logo }: { name: string; logo?: string }) => {
  const isMaAnoUlam = name === "Ma, Ano Ulam?";
  const initials =
    name
      .replace(/[^a-zA-Z0-9 ]/g, " ")
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((word) => word[0])
      .join("")
      .toUpperCase() || "PR";

  return (
    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md border border-white/15 bg-white/10 transition group-hover:border-white/30 group-hover:bg-white/15">
      {logo ? (
        <Image
          src={logo}
          alt={`${name} logo`}
          width={40}
          height={40}
          className={`${isMaAnoUlam ? "h-[52px] w-[52px]" : "h-10 w-10"} object-contain`}
        />
      ) : (
        <span className="text-xs font-semibold text-white/85">{initials}</span>
      )}
    </div>
  );
};

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
    className="h-4 w-4 fill-none stroke-current text-white/90"
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

const ClaudeLogo = ({ className }: { className?: string }) => (
  <svg
    aria-hidden
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    className={className ?? "h-4 w-4"}
    fill="#D97757"
  >
    <g transform="translate(12 12)">
      {Array.from({ length: 12 }).map((_, i) => (
        <rect
          key={i}
          x={-0.85}
          y={-9}
          width={1.7}
          height={6.4}
          rx={0.85}
          transform={`rotate(${i * 30})`}
        />
      ))}
    </g>
  </svg>
);

const ContactIcon = ({ label }: { label: string }) => {
  const normalized = label.toLowerCase();
  const isEmail = normalized.includes("email");

  if (isEmail) {
    return <HiOutlineMail className="h-5 w-5 text-white" />;
  }

  return <DefaultLinkIcon className="h-5 w-5 text-white/90" />;
};
