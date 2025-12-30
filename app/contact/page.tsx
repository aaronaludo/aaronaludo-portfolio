import type { Metadata } from "next";
import Link from "next/link";
import FAQAccordion from "./faq-accordion";

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
  title: "Contact | Aaron Aludo",
  description: "Get in touch for support, questions, or general inquiries.",
};

export default function ContactPage() {
  return (
    <div className="relative min-h-screen overflow-hidden text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_25%_20%,rgba(255,255,255,0.1),transparent_30%),radial-gradient(circle_at_80%_10%,rgba(255,255,255,0.08),transparent_26%),radial-gradient(circle_at_60%_70%,rgba(255,255,255,0.06),transparent_30%)]" />

      <main className="relative z-10 mx-auto flex max-w-4xl flex-col gap-6 px-3 pb-14 pt-10 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-between gap-3 text-sm font-semibold text-white/90">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-1 transition hover:border-white/30 hover:text-white"
          >
            All Projects
          </Link>
          <div className="flex items-center gap-2">
            <Link
              href="/privacy"
              className="rounded-full border border-white/10 px-3 py-1 transition hover:border-white/30 hover:text-white"
            >
              Privacy
            </Link>
            <Link
              href="/terms"
              className="rounded-full border border-white/10 px-3 py-1 transition hover:border-white/30 hover:text-white"
            >
              Terms
            </Link>
          </div>
        </div>

        <Card className="bg-gradient-to-r from-white/8 via-white/5 to-white/5">
          <div className="space-y-3">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-white/90">
              Contact
            </p>
            <h1 className="text-3xl font-semibold">Contact Us</h1>
            <p className="text-sm text-white/90">
              If you have questions about a specific app, subscriptions, or technical support, use the Contact Us form
              below. Including the app you are referring to helps us respond faster.
            </p>
          </div>

          <div className="mt-5 space-y-5">
            <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/90">
              If you have questions about a specific app, subscription management, account cancellation, or technical
              support, please use the "Contact Us" feature within the mobile app settings so we can identify your app and
              assist you faster.
            </div>

            <div className="space-y-2">
              <p className="text-sm font-semibold text-white">Frequently Asked Questions</p>
              <FAQAccordion />
            </div>

            <form className="space-y-4">
              <div className="space-y-1">
                <label className="block text-sm font-semibold text-white/90" htmlFor="name">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Your name"
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition hover:border-white/20 focus:border-white/30"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-sm font-semibold text-white/90" htmlFor="email">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition hover:border-white/20 focus:border-white/30"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-sm font-semibold text-white/90" htmlFor="message">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  placeholder="Tell us how we can help..."
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition hover:border-white/20 focus:border-white/30"
                />
              </div>

              <button
                type="button"
                className="inline-flex w-full items-center justify-center rounded-full bg-white px-5 py-3 text-sm font-semibold text-black transition hover:bg-white/90"
              >
                Send Message
              </button>
            </form>
          </div>
        </Card>
      </main>
    </div>
  );
}

const ChevronUpIcon = () => (
  <svg
    aria-hidden
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    className="h-5 w-5 fill-none stroke-current text-white/90"
  >
    <path
      d="m6 14 6-6 6 6"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
