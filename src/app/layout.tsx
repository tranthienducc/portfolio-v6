import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Wrapper from "@/components/Wrapper";
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

const interDisplay = localFont({
  src: "./fonts/InterDisplay/InterDisplay-Bold.ttf",
  variable: "--font-inter-display",
  weight: "700",
});
const instrumentSerif = localFont({
  src: [
    {
      path: "./fonts/InstrumentSerif/InstrumentSerif-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/InstrumentSerif/InstrumentSerif-Italic.ttf",
      weight: "400",
      style: "italic",
    },
  ],
  variable: "--font-instrument-serif",
  display: "swap",
});
export const metadata: Metadata = {
  title: "Thien Duc • Portfolio",
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
        className={`${inter.className} ${interDisplay.variable} ${instrumentSerif.variable} antialiased font-Inter`}
      >
        <Wrapper>{children}</Wrapper>
      </body>
    </html>
  );
}
