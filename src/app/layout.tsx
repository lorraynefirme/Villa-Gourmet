import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Villa Gourmet",
  description: "Restaurante Villa Gourmet",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex-col bg-blue-50`}
      >
        <div className="flex justify-between bg-pink-400 px-9 py-3 mb-3">
          <header>
            <p>Villa Gourmet</p>
          </header>
          <nav>
            <ul className="flex gap-3">
              <li>
                <Link className="cursor-default" href="#">
                  Pratos
                </Link>
              </li>
              <li>
                <Link className="cursor-default" href="#">
                  Sobre
                </Link>
              </li>
              <li>
                <Link className="cursor-default" href="#">
                  Contato
                </Link>
              </li>
            </ul>
          </nav>
        </div>
        <main className="px-3 pb-24 pt-3">{children}</main>
        <footer className="fixed bottom-0 left-0 z-20 w-full p-4 h-4 bg-white border-t border-gray-200 shadow-sm md:flex md:items-center md:justify-between md:p-6 dark:bg-gray-800 dark:border-gray-600">
          <a
            href="tel:+553199456465"
            aria-label="Ligar para o número (31) 99456-465"
          >
            Contato: (31) 99456-465
          </a>

          <ul className="flex gap-3">
            <li>
              <Link className="cursor-default" href="#">
                Instagram
              </Link>
            </li>
            <li>
              <Link className="cursor-default" href="#">
                Facebook
              </Link>
            </li>
          </ul>
        </footer>
      </body>
    </html>
  );
}
