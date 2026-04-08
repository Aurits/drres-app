"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  BarChart3, Database, Settings, ChevronLeft, Shield, 
  Activity, Sun, Moon
} from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const NAV_ITEMS = [
  { label: "Analytics", href: "/admin", icon: BarChart3 },
  { label: "Evidence DB", href: "/admin/database", icon: Database },
  { label: "System Settings", href: "/admin/settings", icon: Settings },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  return (
    <div className="flex w-full h-[calc(100vh-65px)] overflow-hidden relative z-10">
      
      {/* Dark Command-Center Sidebar */}
      <aside className="w-[260px] lg:w-[280px] bg-[#141210] text-[#ede9e0] hidden md:flex flex-col flex-shrink-0 h-full border-r border-[#ede9e0]/8">
        
        {/* Top: Back + Brand */}
        <div className="px-5 pt-4 pb-3 border-b border-[#ede9e0]/8 shrink-0">
          <Link href="/" className="flex items-center gap-2 group text-[#ede9e0]/40 hover:text-[#ede9e0]/70 transition-colors">
            <ChevronLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
            <span className="text-[12px] font-medium">Back to Library</span>
          </Link>
        </div>

        {/* Admin Identity */}
        <div className="px-5 py-5 border-b border-[#ede9e0]/8 shrink-0 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#ede9e0]/5 border border-[#ede9e0]/10 flex items-center justify-center shrink-0">
              <Shield className="w-5 h-5 text-primary" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-serif font-bold text-[15px] text-[#ede9e0]">Dr-RES</span>
                <span className="font-mono text-[9px] text-primary tracking-[2px] uppercase font-bold">Admin</span>
              </div>
              <p className="font-mono text-[10px] text-[#ede9e0]/30 tracking-[0.5px]">Platform Console</p>
            </div>
          </div>
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="p-2 rounded-lg bg-[#ede9e0]/5 border border-[#ede9e0]/10 text-[#ede9e0]/50 hover:text-[#ede9e0] hover:bg-[#ede9e0]/10 transition-all cursor-pointer"
            aria-label="Toggle theme"
          >
            {mounted && theme === 'dark' ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-0.5">
          <p className="font-mono text-[9px] tracking-[2px] text-[#ede9e0]/25 uppercase px-3 mb-3">Management</p>
          {NAV_ITEMS.map(item => {
            const isActive = pathname === item.href || (item.href !== "/admin" && pathname?.startsWith(item.href));
            const isExact = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-[13px] font-medium transition-all relative group ${
                  isExact
                    ? "bg-[#ede9e0]/8 text-[#ede9e0]"
                    : "text-[#ede9e0]/50 hover:text-[#ede9e0] hover:bg-[#ede9e0]/5"
                }`}
              >
                {isExact && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 bg-primary rounded-r-full" />
                )}
                <Icon className={`w-4 h-4 shrink-0 ${isExact ? "text-primary" : "text-[#ede9e0]/40 group-hover:text-[#ede9e0]/70"}`} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* System Status */}
        <div className="p-5 border-t border-[#ede9e0]/8 shrink-0">
          <div className="bg-[#ede9e0]/3 rounded-xl p-4 border border-[#ede9e0]/5">
            <div className="flex items-center gap-2 mb-3">
              <Activity className="w-3.5 h-3.5 text-[#ede9e0]/30" />
              <span className="font-mono text-[9px] tracking-[2px] text-[#ede9e0]/25 uppercase">System Status</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-mono text-[11px] text-[#ede9e0]/50">All Systems Online</span>
            </div>
            <p className="font-mono text-[9px] text-[#ede9e0]/20 mt-1.5 pl-4">Last checked · 2 min ago</p>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 min-w-0 bg-background h-full overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
