import Image from "next/image";
import Link from "next/link";
import { IconType } from "react-icons";
import { HiOutlineMail } from "react-icons/hi";
import {
  SiAmazonwebservices,
  SiAuth0,
  SiBootstrap,
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
  SiLangchain,
  SiLaravel,
  SiMake,
  SiMariadb,
  SiMysql,
  SiNextdotjs,
  SiOllama,
  SiOpenai,
  SiPhp,
  SiPostgresql,
  SiPrettier,
  SiPycharm,
  SiPytorch,
  SiPython,
  SiReact,
  SiSass,
  SiTailwindcss,
  SiTensorflow,
  SiTypescript,
  SiVite,
  SiWebflow,
  SiWebpack,
  SiWordpress,
  SiZapier
} from "react-icons/si";
import { PiCursorFill } from "react-icons/pi";
import { TbApi, TbBrandTeams, TbBrandVscode, TbTopologyStar3 } from "react-icons/tb";
import profileData from "../data/profile.json";

type ButtonVariant = "solid" | "ghost" | "outline";

type ButtonProps = {
  label: string;
  href: string;
  variant?: ButtonVariant;
  icon?: React.ReactNode;
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
    <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/90">
      {Icon ? (
        <Icon className="h-4 w-4" style={{ color: techStyle.color }} />
      ) : (
        <TechInitial initials={techStyle.initials} color={techStyle.color} />
      )}
      <span>{label}</span>
    </span>
  );
};

const Button = ({ label, href, variant = "solid", icon }: ButtonProps) => {
  const base =
    "inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-sm font-semibold transition duration-150 ease-out shadow-md shadow-black/15";
  const styles: Record<ButtonVariant, string> = {
    solid: "bg-white text-black hover:bg-white/90",
    ghost: "border border-white/15 bg-white/10 text-white hover:border-white/30 hover:bg-white/15",
    outline: "border border-white/25 text-white hover:border-white/40"
  };

  const isAnchor = href.startsWith("http") || href.startsWith("mailto");
  const targetProps = isAnchor ? { target: "_blank", rel: "noreferrer" } : {};

  return (
    <a href={href} className={`${base} ${styles[variant]}`} {...targetProps}>
      {icon ? <span className="text-lg">{icon}</span> : null}
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
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_25%_20%,rgba(255,255,255,0.1),transparent_30%),radial-gradient(circle_at_80%_10%,rgba(255,255,255,0.08),transparent_26%),radial-gradient(circle_at_60%_70%,rgba(255,255,255,0.06),transparent_30%)]" />

      <main className="relative z-10 mx-auto flex max-w-5xl flex-col gap-5 px-4 pb-12 pt-8 sm:px-6 lg:px-8">
        <Card className="relative overflow-hidden border-white/15 bg-gradient-to-r from-neutral-950/80 via-neutral-900/60 to-neutral-800/40 p-5 sm:p-6 lg:p-7">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -left-12 -top-20 h-40 w-40 rounded-full bg-white/12 blur-3xl" />
            <div className="absolute right-8 top-6 h-32 w-32 rounded-full bg-white/10 blur-3xl" />
            <div className="absolute -bottom-8 right-0 h-48 w-48 rounded-full bg-white/8 blur-3xl" />
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-white/5" />
          </div>

          <div className="relative grid grid-cols-1 items-center gap-5 lg:grid-cols-[auto_1fr_auto]">
            <div className="flex items-center gap-4">
              <div className="relative h-20 w-20 overflow-hidden rounded-3xl border border-white/15 bg-white/10 shadow-2xl ring-2 ring-white/10 sm:h-24 sm:w-24">
                <Image
                  src={data.profile.image}
                  alt={data.profile.name}
                  fill
                  sizes="96px"
                  className="object-cover"
                  priority
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                    {data.profile.name}
                  </h1>
                </div>
                <div className="flex items-center gap-2 text-sm text-white/90">
                  <LocationIcon />
                  <span>{data.profile.location}</span>
                </div>
                <p className="text-base text-white/90 sm:text-lg">{data.profile.role}</p>
                <div className="flex flex-wrap items-center gap-2 pt-1 text-xs text-white/90">
                  <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3 py-1 font-semibold text-white shadow-inner shadow-white/10">
                    <span className="h-2 w-2 rounded-full bg-white/70 shadow-[0_0_0_2px_rgba(255,255,255,0.12)]" />
                    {data.profile.availability}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex flex-1 flex-col gap-3 lg:items-end">
              <div className="flex flex-wrap gap-3 lg:justify-end">
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
            <div className="relative space-y-5">
              <div className="absolute left-2 top-1 bottom-1 w-px bg-white/10" />
              {data.experience.map((item) => (
                <div key={`${item.role}-${item.year}`} className="relative flex items-start gap-3 pl-6">
                  <span className="absolute left-0 top-2 h-3 w-3 rounded-full border border-white/30 bg-white/20" />
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-white">{item.role}</p>
                    <p className="text-xs text-white/90">{item.company}</p>
                  </div>
                  <span className="text-xs font-semibold text-white/90">{item.year}</span>
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
            {data.projects.map((project) => (
              <div
                key={project.name}
                className="flex h-full flex-col justify-between rounded-2xl border border-white/10 bg-gradient-to-br from-white/8 via-white/5 to-white/5 p-5 hover:border-white/20"
              >
                <div className="space-y-2">
                  <p className="text-lg font-semibold text-white">{project.name}</p>
                  <p className="text-sm text-white/90">{project.description}</p>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.link ? (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-white"
                    >
                      <WebsiteIcon className="h-4 w-4 text-white" />
                      {project.link.replace("https://", "").replace("http://", "")}
                      <ArrowIcon />
                    </a>
                  ) : null}
                  {project.googlePlay ? (
                    <a
                      href={project.googlePlay}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold text-white"
                    >
                      <GooglePlayIcon className="h-4 w-4 text-white" />
                      Google Play
                      <ArrowIcon />
                    </a>
                  ) : null}
                  {project.appStore ? (
                    <a
                      href={project.appStore}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold text-white"
                    >
                      <AppStoreIcon className="h-4 w-4 text-white" />
                      App Store
                      <ArrowIcon />
                    </a>
                  ) : null}
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="overflow-hidden border-white/12 bg-white/5">
          <SectionHeading title="Recent Certifications" actionLabel="View all" href="#" />
          <div className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-3 sm:gap-4">
            {data.certifications.map((cert) => (
              <a
                key={cert.name}
                href={cert.link ?? "#"}
                target="_blank"
                rel="noreferrer"
                className="group flex items-center justify-between gap-4 rounded-xl border border-white/10 bg-white/5 px-5 py-4 text-sm text-white/90 transition duration-150 hover:-translate-y-[1px] hover:border-white/25 hover:bg-white/10"
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/10 text-[11px] font-semibold text-white">
                    {getIssuerIcon(cert.issuer) ?? (cert.issuer?.[0] ?? "C")}
                  </span>
                  <div className="space-y-1">
                    <div className="text-sm font-semibold text-white sm:text-base">
                      {cert.name}
                    </div>
                    <div className="text-xs text-white/90">{cert.issuer}</div>
                  </div>
                </div>
                <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-semibold text-white/90 transition group-hover:border-white/25 group-hover:text-white">
                  View <ArrowIcon />
                </span>
              </a>
            ))}
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
                className="flex items-center justify-between rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white hover:border-white/20"
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
                className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white hover:border-white/20"
              >
                <span className="flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10">
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

const GooglePlayIcon = ({ className }: { className?: string }) => (
  <svg
    aria-hidden
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    className={className}
    fill="currentColor"
  >
    <path d="M3.525 2.726A1.35 1.35 0 0 0 3 3.857v16.286a1.35 1.35 0 0 0 .525 1.13l.08.05 9.155-9.155L3.605 2.676l-.08.05Zm10.174 8.293L5.16 2.48l10.782 6.226-2.243 2.313ZM3.926 21.52l9.773-7.554 2.302 2.376L3.926 21.52Zm12.722-6.47-2.45-2.53 2.45-2.52 3.074 1.775a1.05 1.05 0 0 1 0 1.87l-3.074 1.405Z" />
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
    <path d="M16.84 12.367c-.026-2.337 1.91-3.459 1.992-3.513-1.09-1.59-2.78-1.807-3.378-1.83-1.435-.15-2.805.848-3.531.848-.723 0-1.854-.83-3.05-.807-1.57.024-3.03.94-3.84 2.39-1.64 2.842-.417 7.03 1.17 9.33.773 1.114 1.687 2.36 2.88 2.314 1.16-.047 1.596-.748 2.996-.748 1.4 0 1.79.748 3.02.724 1.245-.02 2.03-1.137 2.8-2.255.888-1.3 1.25-2.56 1.27-2.62-.027-.013-2.435-.936-2.45-3.233Zm-2.29-6.18c.63-.764 1.055-1.83.94-2.907-.91.037-2.01.604-2.664 1.366-.58.673-1.1 1.75-.97 2.785 1.02.077 2.06-.52 2.69-1.244Z" />
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
  oauth: { icon: SiAuth0 },
  jwt: { icon: SiJsonwebtokens },
  rest: { icon: TbApi },
  aws: { icon: SiAmazonwebservices },
  docker: { icon: SiDocker },
  "github actions": { icon: SiGithubactions },
  tensorflow: { icon: SiTensorflow },
  pytorch: { icon: SiPytorch },
  langchain: { icon: SiLangchain },
  ollama: { icon: SiOllama },
  openai: { icon: SiOpenai },
  gemini: { icon: SiGoogle },
  wordpress: { icon: SiWordpress },
  n8n: { icon: TbTopologyStar3 },
  make: { icon: SiMake },
  zapier: { icon: SiZapier },
  webflow: { icon: SiWebflow },
  git: { icon: SiGit },
  github: { icon: SiGithub },
  firebase: { icon: SiFirebase },
  jira: { icon: SiJira },
  gitlab: { icon: SiGitlab },
  "vs code": { icon: TbBrandVscode },
  cursor: { icon: PiCursorFill },
  pycharm: { icon: SiPycharm },
  discord: { icon: SiDiscord },
  teams: { icon: TbBrandTeams }
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
    className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/10 text-[10px] font-semibold"
    style={{
      color,
      boxShadow: color ? `0 0 0 1px ${color}33` : undefined
    }}
  >
    {initials}
  </span>
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

const ContactIcon = ({ label }: { label: string }) => {
  const normalized = label.toLowerCase();
  const isEmail = normalized.includes("email");

  if (isEmail) {
    return <HiOutlineMail className="h-5 w-5 text-white" />;
  }

  return <DefaultLinkIcon className="h-5 w-5 text-white/90" />;
};
