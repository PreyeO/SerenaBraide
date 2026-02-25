import type { Metadata, Viewport } from "next";
import "./globals.css";
import { generalSans, ppEditorial } from "./assets/fonts/font";
import ReactQueryProvider from "./provider";

export const viewport: Viewport = {
  themeColor: "#FAF5EF",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  title: {
    default: "Serena Braide | Fragrance, Beauty & Lasting Impressions",
    template: "%s | Serena Braide",
  },
  description:
    "Explore Serena Braide's collection of signature fragrances and premium beauty essentials. Defined by quality, memory, and unique identity.",
  keywords: [
    "Serena Braide",
    "Fragrance",
    "Beauty",
    "Perfume",
    "Lip Care",
    "Luxury Beauty",
    "Signature Scent",
  ],
  authors: [{ name: "Serena Braide" }],
  creator: "Serena Braide",
  publisher: "Serena Braide",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://serenabraide.com"), // Replace with actual URL when live
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Serena Braide | Fragrance, Beauty & Lasting Impressions",
    description:
      "Fragrance and beauty designed for the individual. Wear identity. Own the memory of the room.",
    url: "https://serenabraide.com",
    siteName: "Serena Braide",
    images: [
      {
        url: "/og-image.png", // Ensure this exists or I should mention it
        width: 1200,
        height: 630,
        alt: "Serena Braide - Fragrance and Beauty",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Serena Braide | Fragrance, Beauty & Lasting Impressions",
    description:
      "Fragrance and beauty designed for the individual. Define your presence with Serena Braide.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: "/icon.png",
    shortcut: "/icon.png",
    apple: "/icon.png",
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
    <html lang="en" className="scroll-smooth">
      <body
        className={`font-GeneralSans antialiased ${generalSans.variable} ${ppEditorial.variable} bg-white text-[#3B3B3B]`}
      >
        <ReactQueryProvider>
          <main className="min-h-screen flex flex-col">{children}</main>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
