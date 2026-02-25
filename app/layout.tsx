import type { Metadata } from "next";
import "./globals.css";

import { generalSans, ppEditorial } from "./assets/fonts/font";
import ReactQueryProvider from "./provider";

export const metadata: Metadata = {
  title: "Serena Braide | We're Here for Lasting Impressions",
  description:
    "Shop Serena Braide for fragrances and lip makeup. Quality beauty products built to last.",
  icons: { icon: "/icon.png" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={` font-GeneralSans ${generalSans.variable} ${ppEditorial.variable}  `}
      >
        <ReactQueryProvider>
          <main className="font-GeneralSans text-[#3B3B3B] ">
            {" "}
            {children}
          </main>{" "}
        </ReactQueryProvider>
      </body>
    </html>
  );
}
