import type { Metadata } from "next";
import Link from "next/link";

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
  title: "Privacy Policy | Aaron Aludo",
  description:
    "Learn how Aaron Aludo collects, uses, and protects data across projects and apps, including camera permissions.",
};

export default function PrivacyPage() {
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
              href="/projects/terms"
              className="rounded-full border border-white/10 px-3 py-1 transition hover:border-white/30 hover:text-white"
            >
              Terms
            </Link>
            <Link
              href="/projects/contact"
              className="rounded-full border border-white/10 px-3 py-1 transition hover:border-white/30 hover:text-white"
            >
              Contact
            </Link>
          </div>
        </div>

        <Card className="bg-gradient-to-r from-white/8 via-white/5 to-white/5">
          <div className="space-y-3">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-white/90">
              Privacy
            </p>
            <h1 className="text-3xl font-semibold">Privacy Policy</h1>
            <p className="text-sm text-white/90">Effective Date: 25.12.2024</p>
            <p className="text-sm text-white/90">
              I, Aaron Aludo (&quot;I,&quot; &quot;my,&quot; or &quot;we&quot; when referring to my team), prioritize your
              privacy and am committed to safeguarding your personal information. This policy explains how I collect,
              use, and share your information when you interact with my mobile apps and website, including how camera
              permissions are used.
            </p>
          </div>

          <div className="mt-6 space-y-6 text-sm leading-relaxed text-white/90">
            <Section
              title="Information We Collect"
              items={[
                {
                  heading: "Email Addresses",
                  body:
                    "We collect email addresses directly from users of our mobile apps during onboarding. We do not collect emails from visitors to the website. Emails are used to provide services, communicate, and enhance your experience.",
                },
                {
                  heading: "Cookies and Analytics",
                  body:
                    "Our website uses cookies to improve browsing, remember preferences, and track basic traffic. Our mobile apps use Google Analytics to analyze behavior and gather insights to improve performance.",
                },
                {
                  heading: "Device Information",
                  body:
                    "Mobile apps may collect device identifiers and basic device info through third-party services (e.g., Google AdMob) to deliver targeted ads and ensure ads respect your interests.",
                },
                {
                  heading: "Camera Content (User-Initiated)",
                  body:
                    "When you choose to use camera features in our mobile apps, we access the device camera (android.permission.CAMERA / iOS camera) to capture photos or videos you submit. We do not access the camera in the background, and media remains on your device unless you explicitly choose to upload or share it.",
                },
              ]}
            />

            <Section
              title="Device Permissions and Camera Use"
              body="Camera access is only requested when you tap features that require it. You can decline permission or turn it off anytime in your device settings."
              bullets={[
                "Purpose: Capture photos or videos you choose to attach or submit within the app.",
                "Timing: Camera is activated only while you use capture features; we do not use it in the background.",
                "Control: You can revoke camera access in your device settings without losing access to non-camera features.",
                "Data Handling: Captured media stays on your device unless you actively upload or share it; we do not use it for analytics or advertising.",
              ]}
            />

            <Section
              title="How We Use Your Information"
              bullets={[
                "Provide, maintain, and improve our website and mobile apps.",
                "Analyze usage patterns to better understand user needs.",
                "Deliver relevant ads through third-party services like Google AdMob.",
                "Communicate with users about updates, support, and feedback.",
                "Enhance user experience with personalized features based on collected data.",
              ]}
            />

            <Section
              title="Sharing Your Information"
              bullets={[
                "We do not sell or rent your personal information.",
                "We share data with trusted providers to enable app functionality.",
                "Google AdMob: To deliver personalized advertisements within mobile apps.",
                "Google Analytics: To gather insights into user behavior and app performance.",
              ]}
              body="Third-party providers process data under their own privacy policies. We recommend reviewing those policies for details."
            />

            <Section
              title="Your Rights and Choices"
              bullets={[
                "Edit Your Information: Update your account details directly in the mobile apps.",
                "Delete Your Account: Submit a deletion request via the mobile apps or through our contact form.",
                "Opt-out of Ads: Adjust your device settings to reset or limit ad personalization.",
              ]}
            />

            <Section
              title="Data Security"
              body="We take reasonable measures to protect your information from unauthorized access, loss, or misuse. No method of transmission or storage is 100% secure, so we encourage strong passwords and careful credential management."
            />

            <Section
              title="Children's Privacy"
              body="Our services are intended for general audiences and are not directed to children under 13. We do not knowingly collect personal data from children under 13. If we learn that we have, we will remove it upon request."
            />

            <Section
              title="Changes to This Policy"
              body="We may update this policy to reflect changes in services, legal requirements, or industry standards. Updates will be posted on this page with the effective date. Please review periodically to stay informed."
            />

            <Section
              title="Contact Us"
              body="If you have questions or concerns about this policy, reach out any time."
            >
              <div className="mt-2 space-y-1 text-sm text-white/90">
                <p>Email: info@aaronaludo.com</p>
                <p>
                Contact Form:{" "}
                <Link
                  href="/projects/contact"
                  className="text-white underline decoration-white/40 underline-offset-4 transition hover:decoration-white"
                >
                  Available on our website
                </Link>
                </p>
              </div>
            </Section>
          </div>
        </Card>
      </main>
    </div>
  );
}

const Section = ({
  title,
  body,
  bullets,
  items,
  children,
}: {
  title: string;
  body?: string;
  bullets?: string[];
  items?: { heading: string; body: string }[];
  children?: React.ReactNode;
}) => (
  <section className="space-y-2">
    <h2 className="text-base font-semibold text-white">{title}</h2>
    {body ? <p className="text-sm text-white/90">{body}</p> : null}
    {items ? (
      <div className="space-y-3">
        {items.map((item) => (
          <div key={item.heading} className="space-y-1">
            <p className="text-sm font-semibold text-white">{item.heading}</p>
            <p className="text-sm text-white/90">{item.body}</p>
          </div>
        ))}
      </div>
    ) : null}
    {bullets ? (
      <ul className="ml-4 list-disc space-y-1 text-sm text-white/90">
        {bullets.map((point) => (
          <li key={point}>{point}</li>
        ))}
      </ul>
    ) : null}
    {children}
  </section>
);
