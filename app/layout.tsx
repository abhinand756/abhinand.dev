/* eslint-disable @next/next/no-page-custom-font */
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import CustomCursor from "./components/CustomCursor";
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from "@vercel/analytics/next"

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Abhinand's Portfolio | Software Developer",
  description: "Abhinand's Portfolio",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=LXGW+WenKai+TC&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={poppins.className}>
        <CustomCursor />
        <Analytics />
        <SpeedInsights />
        {children}
      </body>
    </html>
  );
}
