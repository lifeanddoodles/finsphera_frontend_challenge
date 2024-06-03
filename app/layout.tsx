import Footer from "@/components/Footer";
import MainNav from "@/components/MainNav";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: "%s | Movie Database",
    default: "Movie Database",
  },
  description:
    "Demo project using Next.js and Tailwind CSS. Data from TheMovieDB API.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="text-neutral-800 dark:text-neutral-300 bg-neutral-100 dark:bg-neutral-950 body-font max-w-screen">
        <div className="relative grid grid-cols-1 sm:grid-cols-[3.5rem,_1fr] min-h-screen">
          <MainNav />
          <main className="flex min-h-screen flex-col sm:col-start-2 overflow-x-hidden">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
