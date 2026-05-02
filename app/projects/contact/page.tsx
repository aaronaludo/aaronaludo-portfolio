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
    className={`rounded-md border border-white/10 bg-neutral-950 p-6 ${className ?? ""}`}
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
    <div className="min-h-screen bg-neutral-950 text-white">
      <main className="mx-auto flex max-w-4xl flex-col gap-6 px-3 pb-14 pt-10 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-between gap-3 text-sm font-semibold text-white/90">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 rounded-md border border-white/10 px-3 py-1 transition hover:border-white/30 hover:text-white"
          >
            All Projects
          </Link>
          <div className="flex items-center gap-2">
            <Link
              href="/projects/privacy"
              className="rounded-md border border-white/10 px-3 py-1 transition hover:border-white/30 hover:text-white"
            >
              Privacy
            </Link>
            <Link
              href="/projects/terms"
              className="rounded-md border border-white/10 px-3 py-1 transition hover:border-white/30 hover:text-white"
            >
              Terms
            </Link>
          </div>
        </div>

        <Card className="bg-neutral-950">
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
            <div className="rounded-md border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/90">
              If you have questions about a specific app, subscription management, account cancellation, or technical
              support, please use the &quot;Contact Us&quot; feature within the mobile app settings so we can identify your app and
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
                  className="w-full rounded-md border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition hover:border-white/20 focus:border-white/30"
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
                  className="w-full rounded-md border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition hover:border-white/20 focus:border-white/30"
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
                  className="w-full rounded-md border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition hover:border-white/20 focus:border-white/30"
                />
              </div>

              <button
                type="button"
                className="inline-flex w-full items-center justify-center rounded-md bg-white px-5 py-3 text-sm font-semibold text-black transition hover:bg-white/90"
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
