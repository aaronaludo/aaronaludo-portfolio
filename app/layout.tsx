import type { Metadata } from "next";
import ChatAgent from "./components/ChatAgent";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://aaronaludo.com"),
  title: {
    default: "Aaron Aludo | AI & Full Stack Engineer",
    template: "%s | Aaron Aludo"
  },
  description:
    "AI & Full Stack Engineer building practical web and AI projects from Taytay Rizal, Philippines.",
  keywords: [
    "Aaron Aludo",
    "AI Engineer",
    "Full Stack Engineer",
    "DevOps Engineer",
    "Next.js Developer",
    "React Developer",
    "Laravel Developer",
    "Philippines Software Engineer"
  ],
  authors: [{ name: "Aaron Aludo", url: "https://aaronaludo.com" }],
  creator: "Aaron Aludo",
  publisher: "Aaron Aludo",
  alternates: {
    canonical: "/"
  },
  openGraph: {
    type: "website",
    url: "/",
    siteName: "Aaron Aludo",
    title: "Aaron Aludo | AI & Full Stack Engineer",
    description:
      "AI & Full Stack Engineer building practical web and AI projects from Taytay Rizal, Philippines.",
    images: [
      {
        url: "/aaron-picture.png",
        width: 895,
        height: 954,
        alt: "Aaron Aludo"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Aaron Aludo | AI & Full Stack Engineer",
    description:
      "AI & Full Stack Engineer building practical web and AI projects from Taytay Rizal, Philippines.",
    images: ["/aaron-picture.png"]
  },
  robots: {
    index: true,
    follow: true
  },
  icons: {
    icon: [
      { url: "/aaron-picture.png", type: "image/png" },
      { url: "/icon.png", sizes: "512x512", type: "image/png" }
    ],
    shortcut: ["/aaron-picture.png"],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }]
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
        <ChatAgent />
      </body>
    </html>
  );
}
