"use client";

import { SessionProvider } from "next-auth/react";
import type { Metadata } from "next";
import { Kanit } from "next/font/google";
import "./globals.css";
import Header from "@/components/Home/Header";

const kanit = Kanit({ weight: ["400", "700"], subsets: ["thai"] });

export const metadata: Metadata = {
  title: "Databetes",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={kanit.className}>
        <SessionProvider>
          <Header />
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
