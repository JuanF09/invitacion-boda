import type { Metadata } from "next";
import { Montserrat, Cormorant_Garamond, Great_Vibes } from "next/font/google";
import "./globals.css";

const interFont = Montserrat({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

const playfairFont = Cormorant_Garamond({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const scriptFont = Great_Vibes({
  weight: "400",
  variable: "--font-script",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://invitacion-boda-mauve.vercel.app"),
  title: "David & Thalia - Invitación de Boda",
  description: "Acompáñanos a celebrar el inicio de nuestra historia de amor - 15 de Noviembre 2026",
  openGraph: {
    title: "David & Thalia - ¡Nos Casamos!",
    description: "Nos encantaría que nos acompañaras a celebrar el inicio de esta nueva historia. Descubre tu invitación aquí.",
    url: "https://invitacion-boda-mauve.vercel.app",
    siteName: "Boda David & Thalia",
    images: [
      {
        url: "https://invitacion-boda-mauve.vercel.app/portada.jpg",
        secureUrl: "https://invitacion-boda-mauve.vercel.app/portada.jpg",
        width: 1200,
        height: 630,
        type: "image/jpeg",
        alt: "David & Thalia frente a la capilla colonial",
      },
    ],
    locale: "es_CO",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "David & Thalia - ¡Nos Casamos!",
    description: "Acompáñanos a celebrar nuestra boda este 15 de Noviembre de 2026.",
    images: ["https://invitacion-boda-mauve.vercel.app/portada.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${interFont.variable} ${playfairFont.variable} ${scriptFont.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground selection:bg-olive/20">
        {children}
      </body>
    </html>
  );
}
