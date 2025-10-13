import type { Metadata } from "next";
import { Noto_Sans_TC, Noto_Serif_TC } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const notoSerif = Noto_Serif_TC({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const notoSans = Noto_Sans_TC({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Iceverse - Your Ultimate Getaway", // Updated Title
  description: "Experience the extraordinary at Iceverse.", // Updated Description
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-TW">
      <body
        className={`${notoSerif.variable} ${notoSans.variable} font-sans antialiased`}
      >
        <Header />
        <main className="pt-16">{/* Add padding top to avoid content being hidden by fixed header */}
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
