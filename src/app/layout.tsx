import type { Metadata } from "next";
import { Quicksand } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Provider from "@/utils/Provider";
import { Toaster } from "@/components/ui/sonner";

const quickSand = Quicksand({
  variable: "--font-Quicksand",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${quickSand.className}  antialiased bg-deepBlue-25  min-h-[calc(100vh-1px)] flex flex-col`}
        >
          <main className="relative flex flex-1 flex-col ">
            <Provider>{children}</Provider>
          </main>
          <Toaster/>
        </body>
      </html>
    </ClerkProvider>
  );
}
