import type { Metadata } from "next";
import { DM_Sans, DM_Mono, Playfair_Display } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { TopNav } from "@/components/layout/TopNav";
import { AskAIDrawer } from "@/components/ui/AskAIDrawer";
import { ThemeProvider } from "@/components/ThemeProvider";

const fontSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

const fontSerif = Playfair_Display({
  variable: "--font-playfair",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
});

const fontMono = DM_Mono({
  variable: "--font-dm-mono",
  weight: ["400", "500"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dr-RES | Rapid Evidence Synthesis",
  description: "Digital evidence base to inform urgent policy decisions across Africa.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(fontSans.variable, fontSerif.variable, fontMono.variable, "h-full antialiased overflow-hidden")}
    >
      <body className="h-full w-full flex flex-col bg-background text-foreground overflow-hidden">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <TopNav />
          <main className="flex-1 flex flex-col relative z-0 overflow-y-auto w-full">
            {children}
          </main>
          <AskAIDrawer />
        </ThemeProvider>
      </body>
    </html>
  );
}
