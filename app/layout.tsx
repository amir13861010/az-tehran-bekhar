import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import ConditionalHeader from "@/components/ConditionalHeader";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const myFont = localFont({
  src: "./fonts/irsans.ttf",
  variable: "--font-vazir",
  display: "swap",
});

export const metadata: Metadata = {
  title: "از تهران بخر",
  description: "خرید و ارسال از بازار تهران",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="fa"
      dir="rtl"
      className={`${myFont.variable} ${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">
        <ConditionalHeader />
        {children}
          <Toaster position="top-center" richColors />
      </body>
    </html>
  );
}