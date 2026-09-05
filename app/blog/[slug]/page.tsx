import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import blogData from "../../../data/blog.json";

type ContentBlock = { type: "paragraph" | "heading"; text: string };

type BlogPost = {
  slug: string;
  title: string;
  date: string;
  readTime: string;
  excerpt: string;
  coverImage: string;
  tags: string[];
  content: ContentBlock[];
};

const posts: BlogPost[] = (blogData as { posts?: BlogPost[] }).posts ?? [];

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

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric"
  });

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = posts.find((item) => item.slug === slug);

  if (!post) {
    return { title: "Post not found" };
  }

  return {
    title: post.title,
    description: post.excerpt,
    alternates: {
      canonical: `/blog/${post.slug}`
    },
    openGraph: {
      type: "article",
      url: `/blog/${post.slug}`,
      title: post.title,
      description: post.excerpt,
      images: [{ url: post.coverImage }]
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [post.coverImage]
    }
  };
}

export default async function BlogPostPage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = posts.find((item) => item.slug === slug);

  if (!post) {
    notFound();
  }

  const otherPosts = posts.filter((item) => item.slug !== post.slug).slice(0, 2);

  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      <main className="mx-auto flex max-w-3xl flex-col gap-6 px-3 pb-14 pt-10 sm:px-6 lg:px-8">
        <Card className="bg-neutral-950">
          <Link
            href="/blog"
            className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-white/90 transition hover:text-white"
          >
            <ArrowLeftIcon />
            Back to Blog
          </Link>

          <div className="mb-5 flex flex-wrap gap-1.5">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-md border border-white/10 bg-white/10 px-2 py-0.5 text-[11px] font-semibold text-white/80"
              >
                {tag}
              </span>
            ))}
          </div>

          <h1 className="text-2xl font-semibold sm:text-3xl">{post.title}</h1>
          <div className="mt-2 flex items-center gap-3 text-xs font-semibold text-white/60">
            <span>{formatDate(post.date)}</span>
            <span aria-hidden>&middot;</span>
            <span>{post.readTime}</span>
          </div>

          <div className="relative mt-6 aspect-[16/8] w-full overflow-hidden rounded-md border border-white/10 bg-neutral-900">
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              sizes="(min-width: 768px) 720px, 100vw"
              className="object-cover"
              priority
            />
          </div>

          <article className="mt-8 space-y-4 text-sm leading-relaxed text-white/90">
            {post.content.map((block, index) =>
              block.type === "heading" ? (
                <h2
                  key={index}
                  className="pt-2 text-lg font-semibold text-white"
                >
                  {block.text}
                </h2>
              ) : (
                <p key={index}>{block.text}</p>
              )
            )}
          </article>
        </Card>

        {otherPosts.length > 0 ? (
          <Card>
            <p className="mb-4 text-lg font-semibold text-white">More posts</p>
            <div className="grid gap-4 sm:grid-cols-2">
              {otherPosts.map((item) => (
                <Link
                  key={item.slug}
                  href={`/blog/${item.slug}`}
                  className="group flex flex-col overflow-hidden rounded-md border border-white/10 bg-white/5 transition duration-200 hover:-translate-y-0.5 hover:border-white/25"
                >
                  <div className="relative aspect-video w-full overflow-hidden border-b border-white/10 bg-neutral-900">
                    <Image
                      src={item.coverImage}
                      alt={item.title}
                      fill
                      sizes="(min-width: 640px) 45vw, 100vw"
                      className="object-cover transition duration-300 group-hover:scale-[1.03]"
                    />
                  </div>
                  <div className="flex flex-1 flex-col gap-2 p-4">
                    <p className="text-sm font-semibold text-white">{item.title}</p>
                    <span className="mt-auto flex items-center gap-1 text-xs font-semibold text-white/60">
                      {formatDate(item.date)}
                      <ArrowIcon />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </Card>
        ) : null}
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
