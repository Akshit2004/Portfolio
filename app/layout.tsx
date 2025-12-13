import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SmoothScroll from "./components/SmoothScroll";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://akshitmahajan.com"),
  title: "Akshit Mahajan | Portfolio",
  description: "Portfolio of Akshit Mahajan, a Full Stack Developer building digital experiences with precision and passion.",
  keywords: ["Akshit Mahajan", "Portfolio", "Full Stack Developer", "Web Developer", "Next.js", "React", "TypeScript", "Frontend Developer", "Software Engineer"],
  authors: [{ name: "Akshit Mahajan" }],
  openGraph: {
    title: "Akshit Mahajan | Portfolio",
    description: "Building Digital Experiences. Explore my portfolio of full stack projects and creative works.",
    url: "https://akshitmahajan.com",
    siteName: "Akshit Mahajan Portfolio",
    images: [
      {
        url: "/pic with nmae.png",
        width: 1200,
        height: 630,
        alt: "Akshit Mahajan Portfolio",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Akshit Mahajan | Portfolio",
    description: "Building Digital Experiences. Explore my portfolio of full stack projects and creative works.",
    images: ["/pic with nmae.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
