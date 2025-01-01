import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Wrapper from "@/components/Wrapper";

const approachTrial = localFont({
  src: [
    { path: "./fonts/ApproachTrial/ApproachTRIAL-Lt.otf", weight: "300" },
    { path: "./fonts/ApproachTrial/ApproachTRIAL-Md.otf", weight: "500" },
    { path: "./fonts/ApproachTrial/ApproachTRIAL-Rg.otf", weight: "400" },
    { path: "./fonts/ApproachTrial/ApproachTRIAL-SmBd.otf", weight: "600" },
  ],
  variable: "--font-approach-trial",
});

const biggerDisplay = localFont({
  src: "./fonts/BiggerDisplay/BiggerDisplay.otf",
  variable: "--font-bigger-display",
  weight: "800",
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
        className={`${approachTrial.variable} ${biggerDisplay.variable} antialiased`}
      >
        <Wrapper>{children}</Wrapper>
      </body>
    </html>
  );
}
