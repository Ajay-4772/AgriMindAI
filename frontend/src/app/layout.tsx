import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/NavBar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AgriMindAI | Smart Agriculture",
  description: "AI-powered recommendations for farmers including crop, yield, disease detection, and more.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen flex flex-col bg-gray-50`}>
        <NavBar />
        <main className="flex-grow pt-16">
          {children}
        </main>
        <footer className="bg-agri-dark text-white py-8 text-center mt-auto">
          <p>&copy; {new Date().getFullYear()} AgriMindAI. All rights reserved.</p>
        </footer>
      </body>
    </html>
  );
}
