import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CartContainer } from "@/domains/cart/views/cartContainer";
import { Footer } from "@/components/footer/footer";
import { Header } from "@/components/header/header";

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
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex-col bg-blue-50`}
      >
        <Header />
        <div className="flex w-full pb-9 sm:pb-0">
          <main className="px-3 pb-14 w-full">{children}</main>
          <aside className="w-80 fixed z-20 right-0">
            <CartContainer />
          </aside>
        </div>
        <Footer />
        {modal}
      </body>
    </html>
  );
}
