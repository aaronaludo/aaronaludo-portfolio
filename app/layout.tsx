import type { Metadata } from "next";
import ChatAgent from "./components/ChatAgent";
import "./globals.css";

export const metadata: Metadata = {
  title: "Aaron Aludo | AI & Full Stack Engineer",
  description:
    "AI & Full Stack Engineer building practical web and AI projects from Taytay Rizal, Philippines.",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon.png", sizes: "512x512", type: "image/png" }
    ],
    shortcut: ["/favicon.ico"],
    apple: [{ url: "/icon.png", sizes: "512x512", type: "image/png" }]
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
