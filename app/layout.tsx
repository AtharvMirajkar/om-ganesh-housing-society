import type { Metadata } from "next";
import { Playfair_Display, DM_Sans } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Om Ganesh Co-operative Housing Society Ltd. | Kolhapur",
  description:
    "Welcome to Om Ganesh Co-operative Housing Society Ltd., a premier residential community located in Tarabai Park, Kolhapur. Experience modern living with excellent amenities and a vibrant community.",
  keywords: [
    "Om Ganesh Housing Society",
    "Kolhapur",
    "Tarabai Park",
    "Housing Society",
    "Residential",
    "Co-operative Housing",
  ],
  authors: [{ name: "Om Ganesh Co-operative Housing Society Ltd." }],
  openGraph: {
    title: "Om Ganesh Co-operative Housing Society Ltd.",
    description:
      "Premier residential community in Tarabai Park, Kolhapur. Modern living with excellent amenities.",
    type: "website",
    locale: "en_IN",
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
        className={`${playfair.variable} ${dmSans.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
