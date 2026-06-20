import type { Metadata } from "next";
import StoreProvider from "@/src/lib/redux/StoreProvider";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Monthly Collection Manager",
    template: "%s | Monthly Collection Manager",
  },
  description:
    "Admin panel for managing monthly collections, user cards, payments, due tracking, and ward-based records.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <StoreProvider>{children}</StoreProvider>
      </body>
    </html>
  );
}
