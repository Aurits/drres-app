"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, FilePlus, Settings, ChevronLeft, TrendingUp, PanelLeftClose, PanelLeftOpen } from "lucide-react";

const NAV_ITEMS = [
  { label: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { label: "Submit Evidence", href: "/dashboard/submit", icon: FilePlus },
  { label: "Settings", href: "/dashboard/settings", icon: Settings },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex w-full h-[calc(100vh-65px)] overflow-hidden relative z-10">
      
      {/* Sidebar */}
      <aside className={`${collapsed ? "w-[68px]" : "w-[260px] lg:w-[280px]"} bg-card hidden md:flex flex-col flex-shrink-0 h-full border-r border-border transition-all duration-300 ease-in-out`}>
        
        {/* Back to Home */}
        <div className="px-4 pt-4 pb-3 border-b border-border shrink-0 flex items-center justify-between">
          {!collapsed && (
            <Link href="/" className="flex items-center gap-2 group text-muted-foreground hover:text-foreground transition-colors">
              <ChevronLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
              <span className="text-[12px] font-medium">Back to Library</span>
            </Link>
          )}
          <button 
            onClick={() => setCollapsed(!collapsed)}
            className={`p-2 rounded-lg hover:bg-muted/50 text-muted-foreground hover:text-foreground transition-all cursor-pointer shrink-0 ${collapsed ? "mx-auto" : ""}`}
            title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {collapsed ? <PanelLeftOpen className="w-4 h-4" /> : <PanelLeftClose className="w-4 h-4" />}
          </button>
        </div>

        {/* User Profile Card */}
        <div className={`${collapsed ? "px-3 py-4" : "px-5 py-5"} border-b border-border shrink-0`}>
          <div className={`flex items-center ${collapsed ? "justify-center" : "gap-3"}`}>
            <div className="w-10 h-10 rounded-full bg-primary/15 border border-primary/20 flex items-center justify-center shrink-0">
              <span className="font-serif font-bold text-[14px] text-primary">AO</span>
            </div>
            {!collapsed && (
              <div className="min-w-0">
                <p className="font-medium text-[13px] text-foreground truncate">Dr. Amara Osei</p>
                <p className="font-mono text-[10px] text-muted-foreground tracking-[0.5px] truncate">Makerere University</p>
              </div>
            )}
          </div>
        </div>

        {/* Navigation */}
        <nav className={`flex-1 overflow-y-auto ${collapsed ? "px-2" : "px-3"} py-4 space-y-0.5`}>
          {!collapsed && (
            <p className="font-mono text-[9px] tracking-[2px] text-muted-foreground uppercase px-3 mb-3">Workspace</p>
          )}
          {NAV_ITEMS.map(item => {
            const isActive = pathname === item.href || (item.href !== "/dashboard" && pathname?.startsWith(item.href));
            const isExactActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                title={collapsed ? item.label : undefined}
                className={`flex items-center ${collapsed ? "justify-center" : "gap-3"} ${collapsed ? "px-0 py-3" : "px-3 py-2.5"} rounded-lg text-[13px] font-medium transition-all relative group ${
                  isExactActive
                    ? "bg-primary/10 text-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                }`}
              >
                {isExactActive && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 bg-primary rounded-r-full" />
                )}
                <Icon className={`w-4 h-4 shrink-0 ${isExactActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground"}`} />
                {!collapsed && item.label}
              </Link>
            );
          })}
        </nav>

        {/* Bottom Stats */}
        <div className={`${collapsed ? "p-2" : "p-5"} border-t border-border shrink-0`}>
          {collapsed ? (
            <div className="flex flex-col items-center gap-3 py-2">
              <div className="text-center">
                <p className="font-serif font-bold text-[18px] text-foreground leading-none">15</p>
                <p className="font-mono text-[7px] text-muted-foreground tracking-[0.5px] mt-0.5">Total</p>
              </div>
              <div className="w-6 h-px bg-border" />
              <div className="text-center">
                <p className="font-serif font-bold text-[18px] text-forest leading-none">11</p>
                <p className="font-mono text-[7px] text-muted-foreground tracking-[0.5px] mt-0.5">Live</p>
              </div>
            </div>
          ) : (
            <div className="bg-muted/30 rounded-xl p-4 border border-border">
              <div className="flex items-center gap-2 mb-3">
                <TrendingUp className="w-3.5 h-3.5 text-primary" />
                <span className="font-mono text-[9px] tracking-[2px] text-muted-foreground uppercase">Your Impact</span>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-serif font-bold text-[22px] text-foreground leading-none">15</p>
                  <p className="font-mono text-[9px] text-muted-foreground tracking-[0.5px] mt-1">Submissions</p>
                </div>
                <div className="w-px h-8 bg-border" />
                <div>
                  <p className="font-serif font-bold text-[22px] text-forest leading-none">11</p>
                  <p className="font-mono text-[9px] text-muted-foreground tracking-[0.5px] mt-1">Published</p>
                </div>
                <div className="w-px h-8 bg-border" />
                <div>
                  <p className="font-serif font-bold text-[22px] text-primary leading-none">2</p>
                  <p className="font-mono text-[9px] text-muted-foreground tracking-[0.5px] mt-1">Pending</p>
                </div>
              </div>
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
