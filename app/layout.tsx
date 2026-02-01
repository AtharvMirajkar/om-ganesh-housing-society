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

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://om-ganesh-housing-society.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Om Ganesh Co-operative Housing Society Ltd. | Kolhapur",
    template: "%s | Om Ganesh Housing Society",
  },
  description:
    "Welcome to Om Ganesh Co-operative Housing Society Ltd., a premier residential community located in Tarabai Park, Kolhapur. Experience modern living with excellent amenities and a vibrant community.",
  keywords: [
    "Om Ganesh Housing Society",
    "Kolhapur",
    "Tarabai Park",
    "Housing Society",
    "Residential",
    "Co-operative Housing",
    "Kolhapur apartments",
    "Tarabai Park residential",
  ],
  authors: [{ name: "Om Ganesh Co-operative Housing Society Ltd." }],
  creator: "Om Ganesh Co-operative Housing Society Ltd.",
  publisher: "Om Ganesh Co-operative Housing Society Ltd.",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  openGraph: {
    title: "Om Ganesh Co-operative Housing Society Ltd. | Kolhapur",
    description:
      "Premier residential community in Tarabai Park, Kolhapur. Modern living with excellent amenities.",
    url: SITE_URL,
    siteName: "Om Ganesh Housing Society",
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Om Ganesh Co-operative Housing Society Ltd. | Kolhapur",
    description:
      "Premier residential community in Tarabai Park, Kolhapur. Modern living with excellent amenities.",
  },
  alternates: {
    canonical: SITE_URL,
  },
  verification: {
    // Google Search Console verification code
    google: "7573cc491549a50a",
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
