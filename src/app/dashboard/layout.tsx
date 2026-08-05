import { CalendarHeart } from "lucide-react";
import Link from "next/link";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#F9F7F1]">
      <header className="bg-white border-b border-olive/10 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <CalendarHeart className="w-6 h-6 text-olive" />
              <span className="font-serif text-xl text-olive font-semibold">Dashboard Novios</span>
            </div>
            <nav className="flex gap-4">
              <Link href="/" className="text-sm font-sans text-foreground/60 hover:text-olive transition-colors">
                Ver invitación principal
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
}
