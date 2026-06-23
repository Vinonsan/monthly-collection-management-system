import type { Metadata } from "next";
import StoreProvider from "@/src/lib/redux/StoreProvider";
import { Bounce, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
        <StoreProvider>
          {children}
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            pauseOnHover
            draggable
            theme="light"
            transition={Bounce}
          />
        </StoreProvider>
      </body>
    </html>
  );
}
