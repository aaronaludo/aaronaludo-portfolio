import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import blogData from "../../data/blog.json";

type BlogPost = {
  slug: string;
  title: string;
  date: string;
  readTime: string;
  excerpt: string;
  coverImage: string;
  tags: string[];
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
  title: "Blog",
  description: "Notes on AI engineering, full-stack projects, and things I learn while building.",
  alternates: {
    canonical: "/blog"
  }
};

const posts: BlogPost[] = ((blogData as { posts?: BlogPost[] }).posts ?? []).slice().sort(
  (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
);

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric"
  });

export default function BlogPage() {
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
              <h1 className="text-2xl font-semibold sm:text-3xl">Blog</h1>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group flex flex-col overflow-hidden rounded-md border border-white/10 bg-white/5 transition duration-200 hover:-translate-y-0.5 hover:border-white/25"
              >
                <div className="relative aspect-video w-full overflow-hidden border-b border-white/10 bg-neutral-900">
                  <Image
                    src={post.coverImage}
                    alt={post.title}
                    fill
                    sizes="(min-width: 1024px) 380px, (min-width: 640px) 45vw, 100vw"
                    className="object-cover transition duration-300 group-hover:scale-[1.03]"
                  />
                </div>
                <div className="flex flex-1 flex-col gap-3 p-5">
                  <div className="flex flex-wrap gap-1.5">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-md border border-white/10 bg-white/10 px-2 py-0.5 text-[11px] font-semibold text-white/80"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <p className="text-lg font-semibold text-white">{post.title}</p>
                  <p className="flex-1 text-sm text-white/80">{post.excerpt}</p>
                  <div className="flex items-center justify-between pt-1 text-xs font-semibold text-white/60">
                    <span>{formatDate(post.date)}</span>
                    <span className="flex items-center gap-1">
                      {post.readTime}
                      <ArrowIcon />
                    </span>
                  </div>
                </div>
              </Link>
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

const ArrowIcon = () => (
  <svg
    aria-hidden
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    className="h-3.5 w-3.5 fill-none stroke-current transition group-hover:translate-x-0.5"
  >
    <path
      d="M5 12h13m-6-6 6 6-6 6"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
