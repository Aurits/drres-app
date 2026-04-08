"use client";

import Link from "next/link";
import { Search, PenSquare, KeyRound, Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export function TopNav() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (pathname?.startsWith('/search')) {
    return null;
  }

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-foreground text-background">
      <div className="container mx-auto flex h-16 items-center flex-wrap px-4 sm:px-6 lg:px-8 justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className="font-serif font-bold text-xl tracking-tight text-background">
            Dr-RES<span className="text-primary">.</span>
          </Link>
          <nav className="hidden md:flex items-center gap-4 text-sm font-medium text-background/60">
            <Link href="/search" className="hover:text-background transition-colors">
              Library
            </Link>
            <Link href="/about" className="hover:text-background transition-colors">
              About ACRES
            </Link>
          </nav>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex relative group">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-background/50 group-focus-within:text-primary transition-colors" />
            </div>
            <input
              type="search"
              placeholder="Search evidence..."
              className="h-9 md:h-10 w-64 md:w-72 lg:w-80 rounded-full border border-background/20 bg-background/5 pl-10 pr-12 text-sm text-background outline-none focus:outline-none focus:ring-0 focus:border-primary/80 transition-all placeholder:text-background/40"
            />
            <div className="absolute inset-y-0 right-2.5 flex items-center pointer-events-none">
              <kbd className="hidden lg:inline-flex items-center gap-1 rounded bg-background/20 border border-background/20 px-1.5 font-mono text-[10px] font-medium text-background">
                <span className="text-xs">⌘</span>K
              </kbd>
            </div>
          </div>

          {mounted && (
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="flex items-center justify-center rounded-full bg-background/10 h-8 w-8 hover:bg-background/20 transition-colors text-background ml-2"
            >
              {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
          )}

          <Link 
            href="/dashboard"
            className="hidden sm:flex items-center gap-2 text-sm font-medium hover:text-background text-background/80 transition-colors"
          >
            <PenSquare className="h-4 w-4" />
            Contribute
          </Link>
          <Link 
            href="/admin" 
            title="Admin Login"
            className="flex items-center justify-center rounded-full bg-background/10 h-8 w-8 hover:bg-background/20 transition-colors"
          >
            <KeyRound className="h-4 w-4 text-background" />
            <span className="sr-only">Admin Login</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
