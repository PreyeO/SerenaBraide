// assets/fonts/fonts.ts (or src/fonts.ts)
import localFont from "next/font/local";

export const generalSans = localFont({
  src: [
    {
      path: "./GeneralSans-Light.woff2",
      weight: "300",
      style: "light",
    },
    {
      path: "./GeneralSans-Regular.woff2",
      weight: "400",
      style: "Regular",
    },
    {
      path: "./GeneralSans-Medium.woff2",
      weight: "500",
      style: "medium",
    },
    {
      path: "./GeneralSans-SemiBold.woff2",
      weight: "600",
      style: "semi-bold",
    },
    {
      path: "./GeneralSans-Bold.woff2",
      weight: "700",
      style: "bold",
    },
  ],
  variable: "--font-generalSans",
  display: "swap",
});

export const ppEditorial = localFont({
  src: [
    {
      path: "./PPEditorialNew-UltralightItalic.otf",
      weight: "200",
      style: "Regular",
    },

    {
      path: "./PPEditorialNew-Italic.otf",
      weight: "400",
      style: "Regular",
    },
  ],
  variable: "--font-ppEditorial",
  display: "swap",
});
