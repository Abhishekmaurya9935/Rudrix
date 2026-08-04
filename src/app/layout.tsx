import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Rudra Labs | Premium Software Engineering",
  description: "A premium IT company website built with Next.js, TypeScript, and Tailwind CSS.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
