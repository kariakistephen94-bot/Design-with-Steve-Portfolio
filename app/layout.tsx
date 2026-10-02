import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Design with Steve — Web Designer & Developer",
  description:
    "I build modern, high-converting websites for businesses that want to look as good online as they are in real life. Web design, development, and custom web applications.",
  keywords: [
    "web designer",
    "web developer",
    "website design",
    "freelance web designer",
    "Next.js developer",
    "Design with Steve",
    "Stephen Kariaki",
    "portfolio",
  ],
  authors: [{ name: "Stephen Kariaki", url: "https://www.linkedin.com/in/kariakistephen58/" }],
  creator: "Stephen Kariaki",
  openGraph: {
    type: "website",
    title: "Design with Steve — Web Designer & Developer",
    description:
      "Modern, high-converting websites built for businesses that want to look as good online as they are in real life.",
    siteName: "Design with Steve",
  },
  twitter: {
    card: "summary_large_image",
    title: "Design with Steve — Web Designer & Developer",
    description:
      "Modern, high-converting websites built for businesses that want to look as good online as they are in real life.",
    creator: "@stephenkariaki",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
