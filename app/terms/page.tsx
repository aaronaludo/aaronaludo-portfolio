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
  title: "Terms and Conditions | Aaron Aludo",
  description:
    "Understand the terms for using Aaron Aludo websites and mobile apps, including camera permissions and device access.",
};

export default function TermsPage() {
  return (
    <div className="relative min-h-screen overflow-hidden text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_25%_20%,rgba(156,140,255,0.14),transparent_30%),radial-gradient(circle_at_80%_10%,rgba(255,120,160,0.18),transparent_26%),radial-gradient(circle_at_60%_70%,rgba(95,204,255,0.12),transparent_30%)]" />

      <main className="relative z-10 mx-auto flex max-w-4xl flex-col gap-6 px-3 pb-14 pt-10 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-between gap-3 text-sm font-semibold text-white/70">
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
              href="/contact"
              className="rounded-full border border-white/10 px-3 py-1 transition hover:border-white/30 hover:text-white"
            >
              Contact
            </Link>
          </div>
        </div>

        <Card className="bg-gradient-to-r from-white/8 via-white/5 to-white/5">
          <div className="space-y-3">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-white/60">
              Terms
            </p>
            <h1 className="text-3xl font-semibold">Terms and Conditions</h1>
            <p className="text-sm text-white/60">Effective Date: 25.12.2024</p>
            <p className="text-sm text-white/70">
              I, Aaron Aludo (&quot;I,&quot; &quot;my,&quot; or &quot;we&quot; when referring to my team). By
              using my website and mobile apps, you agree to comply with these Terms and my Privacy Policy. Please read
              them carefully before accessing or using my services, including features that request device permissions
              such as camera access.
            </p>
          </div>

          <div className="mt-6 space-y-6 text-sm leading-relaxed text-white/80">
            <Section
              title="Acceptance of Terms"
              body="By accessing our website or mobile apps, you agree to these Terms and our Privacy Policy. These apply to all users, including visitors to the website and users of the mobile apps."
            />

            <Section title="Use of Our Services">
              <SubList
                heading="Eligibility"
                bullets={[
                  "You must be at least 13 years old to use our services. By accessing the website or mobile apps, you confirm you meet this age requirement.",
                ]}
              />
              <SubList
                heading="Account Creation"
                bullets={[
                  "Some features may require an account. Provide accurate information during registration and keep details up to date.",
                ]}
              />
              <SubList
                heading="Prohibited Activities"
                bullets={[
                  "Unauthorized access to our services or systems.",
                  "Transmitting malicious code or engaging in activities that disrupt services.",
                  "Violating applicable laws or regulations.",
                ]}
              />
            </Section>

            <Section
              title="User-Generated Content"
              body="If you submit content (such as comments or feedback), you retain ownership of your intellectual property rights. By submitting content, you grant us a worldwide, royalty-free, non-exclusive license to use, reproduce, and display the content as needed to provide our services. You are responsible for ensuring your content does not violate the rights of others or applicable laws."
            />

            <Section title="Privacy and Data Collection">
              <p className="text-sm text-white/75">
                We collect and process personal information in accordance with our Privacy Policy. Key points include:
              </p>
              <ul className="ml-4 list-disc space-y-1 text-sm text-white/70">
                <li>Email Addresses: Collected during app onboarding.</li>
                <li>Cookies and Analytics: Cookies on the website; Google Analytics on the website and mobile apps.</li>
                <li>Advertisements: Mobile apps use Google AdMob; data may be shared with third-party providers.</li>
                <li>
                  Camera Access: Requested only when you use features that capture photos or videos (android.permission.CAMERA / iOS
                  camera). Access is limited to your action and can be revoked in device settings.
                </li>
              </ul>
              <p className="text-sm text-white/75">
                For details, review our{" "}
                <Link
                  href="/privacy"
                  className="text-white underline decoration-white/40 underline-offset-4 transition hover:decoration-white"
                >
                  Privacy Policy
                </Link>
                .
              </p>
            </Section>

            <Section
              title="Device Permissions and Camera Use"
              body="Camera access is optional and tied to your actions. If you decline permission, non-camera features remain available."
              bullets={[
                "Purpose: Enable you to capture and attach photos or videos within the app when you choose to do so.",
                "Scope: The camera is activated only while you engage with capture features; we do not access it in the background.",
                "Control: You can disable camera access at any time in your device settings.",
                "Data Handling: Media stays on your device unless you upload or share it; we do not use captured media for advertising or analytics.",
              ]}
            />

            <Section title="Account Management">
              <ul className="ml-4 list-disc space-y-1 text-sm text-white/70">
                <li>Editing Your Information: Update your account information through the mobile apps.</li>
                <li>
                  Deleting Your Account: Request deletion via the mobile apps or by submitting a request through the
                  contact form on our website.
                </li>
                <li>
                  Responsibility for Your Account: You are responsible for maintaining the confidentiality of your
                  account credentials and activities. We are not liable for unauthorized access resulting from your
                  credential handling.
                </li>
              </ul>
              <p className="text-sm text-white/75">
                Some apps may not require account creation and do not collect personal data. For those apps, account
                deletion or subscription cancellation requests are not applicable because no account or data is stored.
              </p>
            </Section>

            <Section title="Refund Policy">
              <SubList
                heading="Google Play Store Apps"
                bullets={[
                  "Subscriptions and in-app purchases handled through Google Play.",
                  "Refund eligibility is limited to accidental charges or recent billing periods when the subscription was not used intentionally.",
                  "Past subscriptions or previously used services are not eligible if full functionality has been provided.",
                  "All refund requests are processed individually according to Google Play policies.",
                ]}
              />
              <SubList
                heading="Apple App Store Apps"
                bullets={[
                  "Subscriptions and in-app purchases handled through Apple and subject to Apple's refund procedures.",
                ]}
              />
            </Section>

            <Section
              title="Intellectual Property Rights"
              body="All content, design elements, and trademarks on our website and in our mobile apps are the intellectual property of Aaron Aludo unless otherwise noted. You may not copy, distribute, or use any content without prior written consent."
            />

            <Section
              title="Consent to Share Consumption Data with Apple"
              body="By using our apps and making in-app purchases, you consent to our sharing of data regarding your usage and consumption of purchased content with Apple, as part of efforts to resolve refund requests. This may include details about how you accessed and interacted with purchased content. Data sharing is done in compliance with Apple's policies and only as necessary to process your requests."
            />

            <Section
              title="Limitation of Liability"
              bullets={[
                "Your use or inability to use the website or mobile apps.",
                "Unauthorized access to or alteration of your data.",
                "Actions or content provided by third-party services, including Google AdMob and Google Analytics.",
              ]}
              body={`To the fullest extent permitted by law, Aaron Aludo will not be liable for direct, indirect, incidental, consequential, or punitive damages arising from these situations. Services are provided on an "as is" and "as available" basis without warranties of any kind.`}
            />

            <Section
              title="Modifications to Terms"
              body="We may modify these Terms at any time. Changes will be posted with an updated Effective Date. Continued use of the services after changes constitutes acceptance of the revised Terms."
            />

            <Section
              title="Governing Law"
              body="These Terms and any disputes arising from use of our services will be governed by and construed in accordance with the laws of your jurisdiction."
            />

            <Section title="Contact Us">
              <p className="text-sm text-white/75">
                If you have any questions or concerns about these Terms, contact us:
              </p>
              <div className="mt-2 space-y-1 text-sm text-white/75">
                <p>Email: info@aaronaludo.com</p>
                <p>
                  Contact Form:{" "}
                  <Link
                    href="/contact"
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
  children,
}: {
  title: string;
  body?: string;
  bullets?: string[];
  children?: React.ReactNode;
}) => (
  <section className="space-y-2">
    <h2 className="text-base font-semibold text-white">{title}</h2>
    {body ? <p className="text-sm text-white/75">{body}</p> : null}
    {bullets ? (
      <ul className="ml-4 list-disc space-y-1 text-sm text-white/70">
        {bullets.map((point) => (
          <li key={point}>{point}</li>
        ))}
      </ul>
    ) : null}
    {children}
  </section>
);

const SubList = ({ heading, bullets }: { heading: string; bullets: string[] }) => (
  <div className="space-y-1">
    <p className="text-sm font-semibold text-white">{heading}</p>
    <ul className="ml-4 list-disc space-y-1 text-sm text-white/70">
      {bullets.map((point) => (
        <li key={point}>{point}</li>
      ))}
    </ul>
  </div>
);
