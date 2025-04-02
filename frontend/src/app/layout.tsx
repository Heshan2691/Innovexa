import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { AppProvider } from "@/context/AppContext";
import Header from "@/organisms/Header";
import "./globals.css";

const poppins = Poppins({
  weight: ["200", "400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Health & Nutrition Tracker",
  description: "AI-powered app to track and optimize your nutrition.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={poppins.className}>
      <body className="flex flex-col min-h-screen">
        <AppProvider>
          <Header />
          <main className="flex-grow">{children}</main>
        </AppProvider>
      </body>
    </html>
  );
}
