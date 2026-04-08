"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  BarChart3, Database, Settings, ChevronLeft, Shield, 
  Activity, Sun, Moon, PanelLeftClose, PanelLeftOpen
} from "lucide-react";
import { useTheme } from "next-themes";

const NAV_ITEMS = [
  { label: "Analytics", href: "/admin", icon: BarChart3 },
  { label: "Evidence DB", href: "/admin/database", icon: Database },
  { label: "System Settings", href: "/admin/settings", icon: Settings },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  return (
    <div className="flex w-full h-[calc(100vh-65px)] overflow-hidden relative z-10">
      
      {/* Dark Command-Center Sidebar */}
      <aside className={`${collapsed ? "w-[68px]" : "w-[260px] lg:w-[280px]"} bg-[#141210] text-[#ede9e0] hidden md:flex flex-col flex-shrink-0 h-full border-r border-[#ede9e0]/8 transition-all duration-300 ease-in-out`}>
        
        {/* Top: Back + Collapse */}
        <div className="px-3 pt-4 pb-3 border-b border-[#ede9e0]/8 shrink-0 flex items-center justify-between">
          {!collapsed && (
            <Link href="/" className="flex items-center gap-2 group text-[#ede9e0]/40 hover:text-[#ede9e0]/70 transition-colors">
              <ChevronLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
              <span className="text-[12px] font-medium">Back to Library</span>
            </Link>
          )}
          <button 
            onClick={() => setCollapsed(!collapsed)}
            className={`p-2 rounded-lg hover:bg-[#ede9e0]/5 text-[#ede9e0]/40 hover:text-[#ede9e0] transition-all cursor-pointer shrink-0 ${collapsed ? "mx-auto" : ""}`}
            title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {collapsed ? <PanelLeftOpen className="w-4 h-4" /> : <PanelLeftClose className="w-4 h-4" />}
          </button>
        </div>

        {/* Admin Identity */}
        <div className={`${collapsed ? "px-3 py-4" : "px-5 py-5"} border-b border-[#ede9e0]/8 shrink-0`}>
          <div className={`flex items-center ${collapsed ? "justify-center" : "justify-between"}`}>
            <div className={`flex items-center ${collapsed ? "" : "gap-3"}`}>
              <div className="w-10 h-10 rounded-lg bg-[#ede9e0]/5 border border-[#ede9e0]/10 flex items-center justify-center shrink-0">
                <Shield className="w-5 h-5 text-primary" />
              </div>
              {!collapsed && (
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-serif font-bold text-[15px] text-[#ede9e0]">Dr-RES</span>
                    <span className="font-mono text-[9px] text-primary tracking-[2px] uppercase font-bold">Admin</span>
                  </div>
                  <p className="font-mono text-[10px] text-[#ede9e0]/30 tracking-[0.5px]">Platform Console</p>
                </div>
              )}
            </div>
            {!collapsed && (
              <button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="p-2 rounded-lg bg-[#ede9e0]/5 border border-[#ede9e0]/10 text-[#ede9e0]/50 hover:text-[#ede9e0] hover:bg-[#ede9e0]/10 transition-all cursor-pointer"
                aria-label="Toggle theme"
              >
                {mounted && theme === 'dark' ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
              </button>
            )}
          </div>
        </div>

        {/* Navigation */}
        <nav className={`flex-1 overflow-y-auto ${collapsed ? "px-2" : "px-3"} py-4 space-y-0.5`}>
          {!collapsed && (
            <p className="font-mono text-[9px] tracking-[2px] text-[#ede9e0]/25 uppercase px-3 mb-3">Management</p>
          )}
          {NAV_ITEMS.map(item => {
            const isActive = pathname === item.href || (item.href !== "/admin" && pathname?.startsWith(item.href));
            const isExact = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                title={collapsed ? item.label : undefined}
                className={`flex items-center ${collapsed ? "justify-center" : "gap-3"} ${collapsed ? "px-0 py-3" : "px-3 py-2.5"} rounded-lg text-[13px] font-medium transition-all relative group ${
                  isExact
                    ? "bg-[#ede9e0]/8 text-[#ede9e0]"
                    : "text-[#ede9e0]/50 hover:text-[#ede9e0] hover:bg-[#ede9e0]/5"
                }`}
              >
                {isExact && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 bg-primary rounded-r-full" />
                )}
                <Icon className={`w-4 h-4 shrink-0 ${isExact ? "text-primary" : "text-[#ede9e0]/40 group-hover:text-[#ede9e0]/70"}`} />
                {!collapsed && item.label}
              </Link>
            );
          })}
        </nav>

        {/* System Status */}
        <div className={`${collapsed ? "p-2" : "p-5"} border-t border-[#ede9e0]/8 shrink-0`}>
          {collapsed ? (
            <div className="flex flex-col items-center py-2" title="All Systems Online">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-mono text-[7px] text-[#ede9e0]/30 mt-1.5">OK</span>
            </div>
          ) : (
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
          )}
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 min-w-0 bg-background h-full overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
