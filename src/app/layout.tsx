import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Wrapper from "@/components/Wrapper";
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

const antikorMono = localFont({
  src: [
    {
      path: "./fonts/AntikorMono/Antikor-Mono-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
  ],
  variable: "--font-antikor-mono",
  display: "swap",
});
const neuroX = localFont({
  src: [
    {
      path: "./fonts/NeuroX/Neuro-X-Bold-Rounded.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-neuro-x",
  display: "swap",
});
export const metadata: Metadata = {
  title: "Thien Duc • Portfolio 2025",
  description: "Portfolio Version 6",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} ${antikorMono.variable} ${neuroX.variable} antialiased font-Inter`}
      >
        <Wrapper>{children}</Wrapper>
      </body>
    </html>
  );
}
