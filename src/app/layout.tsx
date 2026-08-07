import type { Metadata } from "next";
import { Inter, Playfair_Display, Great_Vibes } from "next/font/google";
import "./globals.css";

const interFont = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfairFont = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const scriptFont = Great_Vibes({
  weight: "400",
  variable: "--font-script",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ricardo & Natalia - Invitación de Boda",
  description: "Acompáñanos a celebrar nuestra boda",
  openGraph: {
    title: "Ricardo & Natalia - ¡Nos Casamos!",
    description: "Nos encantaría que nos acompañes en este día tan especial. Descubre tu invitación aquí.",
    images: ["/FOTOS/DSC04810.jpg.jpeg"], // Utiliza una de las fotos de la carpeta FOTOS
    type: "website",
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
      <body className="min-h-full flex flex-col bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
