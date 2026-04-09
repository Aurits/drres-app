"use client";

import { 
  FileText, Users, Sparkles, Timer, TrendingUp, TrendingDown,
  Database, Cpu, HardDrive, Search, CheckCircle2, XCircle, AlertTriangle
} from "lucide-react";

// Mock chart data — daily searches for last 14 days
const DAILY_SEARCHES = [
  { day: "Mar 25", count: 124 }, { day: "Mar 26", count: 89 },
  { day: "Mar 27", count: 156 }, { day: "Mar 28", count: 201 },
  { day: "Mar 29", count: 178 }, { day: "Mar 30", count: 95 },
  { day: "Mar 31", count: 67 }, { day: "Apr 1", count: 145 },
  { day: "Apr 2", count: 210 }, { day: "Apr 3", count: 187 },
  { day: "Apr 4", count: 234 }, { day: "Apr 5", count: 198 },
  { day: "Apr 6", count: 256 }, { day: "Apr 7", count: 221 },
];

const AI_USAGE_BY_SDG = [
  { label: "SDG 3: Good Health", count: 1247, percent: 58 },
  { label: "SDG 13: Climate Action", count: 534, percent: 25 },
  { label: "SDG 4: Quality Education", count: 366, percent: 17 },
];

const SYSTEM_SERVICES = [
  { name: "Search Index", status: "Operational", latency: "42ms", icon: Search, statusColor: "bg-emerald-400" },
  { name: "AI Model (GPT-4o)", status: "Operational", latency: "1.2s", icon: Cpu, statusColor: "bg-emerald-400" },
  { name: "PostgreSQL Database", status: "Operational", latency: "8ms", icon: Database, statusColor: "bg-emerald-400" },
  { name: "File Storage (S3)", status: "Degraded", latency: "340ms", icon: HardDrive, statusColor: "bg-amber-400" },
];

const ADMIN_LOG = [
  { action: "Published evidence", detail: "DRS-2025-012 \"Antimicrobial Resistance Surveillance...\" approved by Admin.", time: "2h ago", type: "success" },
  { action: "Bulk import completed", detail: "24 records imported from ACRES_Q1_2025.xlsx — 22 valid, 2 errors.", time: "5h ago", type: "info" },
  { action: "Submission rejected", detail: "DRS-2025-015 \"Evidence Gaps in Climate...\" — Incomplete methodology.", time: "1d ago", type: "error" },
  { action: "User role changed", detail: "j.kimani@uon.ac.ke promoted from Viewer to Contributor.", time: "1d ago", type: "info" },
  { action: "System re-indexed", detail: "Full vector re-index completed. 4,091 records processed in 14m 32s.", time: "2d ago", type: "success" },
  { action: "Category updated", detail: "Added new Priority Area \"Climate Finance\" under SDG 13.", time: "3d ago", type: "info" },
];

export default function AdminAnalyticsPage() {
  const maxSearch = Math.max(...DAILY_SEARCHES.map(d => d.count));

  return (
    <div className="max-w-[1400px] mx-auto w-full px-6 lg:px-10 py-8 lg:py-10">
      
      {/* Header */}
      <div className="mb-8">
        <span className="font-mono text-[10px] tracking-[2px] text-muted-foreground uppercase block mb-1">Platform Console</span>
        <h1 className="font-serif text-[28px] lg:text-[32px] font-bold text-foreground leading-tight">Analytics</h1>
        <p className="text-[14px] text-muted-foreground mt-1.5">Platform health, usage metrics, and administrative activity.</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Total Records", value: "4,091", icon: FileText, accent: "text-foreground", trend: "+24 this week", trendUp: true },
          { label: "Active Users", value: "287", icon: Users, accent: "text-forest", trend: "+12% vs last month", trendUp: true },
          { label: "AI Queries (24h)", value: "1,847", icon: Sparkles, accent: "text-sky", trend: "+8% vs yesterday", trendUp: true },
          { label: "Avg. Latency", value: "42ms", icon: Timer, accent: "text-primary", trend: "-3ms improvement", trendUp: true },
        ].map(stat => (
          <div key={stat.label} className="bg-card border-[1.5px] border-border rounded-xl p-5 relative overflow-hidden group hover:border-primary/20 transition-all">
            <div className="flex items-start justify-between mb-3">
              <div className="p-2 rounded-lg bg-muted/40 border border-border">
                <stat.icon className={`w-4 h-4 ${stat.accent}`} />
              </div>
              {stat.trendUp ? (
                <TrendingUp className="w-3.5 h-3.5 text-forest/60" />
              ) : (
                <TrendingDown className="w-3.5 h-3.5 text-rose/60" />
              )}
            </div>
            <p className={`font-serif font-bold text-[28px] lg:text-[32px] leading-none ${stat.accent}`}>{stat.value}</p>
            <p className="font-mono text-[9px] tracking-[1.5px] text-muted-foreground uppercase mt-2">{stat.label}</p>
            <p className="font-mono text-[10px] text-muted-foreground/60 mt-1.5">{stat.trend}</p>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-6 mb-8">
        
        {/* Daily Searches Bar Chart */}
        <div className="bg-card border-[1.5px] border-border rounded-xl overflow-hidden">
          <div className="px-6 py-4 border-b border-border flex items-center justify-between">
            <h2 className="font-serif text-[18px] font-bold text-foreground">Daily Searches</h2>
            <span className="font-mono text-[10px] text-muted-foreground/50 tracking-[1px]">Last 14 days</span>
          </div>
          <div className="px-6 py-6">
            <div className="flex items-end gap-[6px] h-[160px]">
              {DAILY_SEARCHES.map((d, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-1.5 group">
                  <span className="font-mono text-[9px] text-muted-foreground/0 group-hover:text-muted-foreground transition-colors">
                    {d.count}
                  </span>
                  <div 
                    className="w-full rounded-t-[3px] bg-primary/20 group-hover:bg-primary/40 transition-all relative"
                    style={{ height: `${(d.count / maxSearch) * 130}px` }}
                  >
                    <div 
                      className="absolute bottom-0 left-0 right-0 rounded-t-[3px] bg-primary transition-all"
                      style={{ height: `${(d.count / maxSearch) * 60}%` }}
                    />
                  </div>
                  <span className="font-mono text-[8px] text-muted-foreground/40 rotate-[-45deg] origin-top-left whitespace-nowrap mt-1 hidden lg:block">
                    {d.day}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* AI Usage by SDG */}
        <div className="bg-card border-[1.5px] border-border rounded-xl overflow-hidden">
          <div className="px-6 py-4 border-b border-border">
            <h2 className="font-serif text-[18px] font-bold text-foreground">AI Usage by SDG</h2>
          </div>
          <div className="px-6 py-6 space-y-5">
            {AI_USAGE_BY_SDG.map(item => (
              <div key={item.label}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[12px] font-medium text-foreground">{item.label}</span>
                  <span className="font-mono text-[11px] text-muted-foreground">{item.count.toLocaleString()}</span>
                </div>
                <div className="w-full h-2 bg-muted/30 rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full transition-all ${
                      item.label.includes("3") ? "bg-forest" : item.label.includes("13") ? "bg-sky" : "bg-primary"
                    }`}
                    style={{ width: `${item.percent}%` }}
                  />
                </div>
              </div>
            ))}
            <div className="pt-3 border-t border-border/60">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] text-muted-foreground/50 uppercase tracking-[1px]">Total</span>
                <span className="font-mono text-[13px] font-bold text-foreground">2,147</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* System Status */}
      <div className="bg-card border-[1.5px] border-border rounded-xl overflow-hidden mb-8">
        <div className="px-6 py-4 border-b border-border">
          <h2 className="font-serif text-[18px] font-bold text-foreground">System Health</h2>
        </div>
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-muted/20">
              <th className="text-left px-6 py-3 font-mono text-[9px] tracking-[2px] text-muted-foreground uppercase">Service</th>
              <th className="text-left px-4 py-3 font-mono text-[9px] tracking-[2px] text-muted-foreground uppercase">Status</th>
              <th className="text-left px-4 py-3 font-mono text-[9px] tracking-[2px] text-muted-foreground uppercase">Latency</th>
              <th className="text-right px-6 py-3 font-mono text-[9px] tracking-[2px] text-muted-foreground uppercase">Last Checked</th>
            </tr>
          </thead>
          <tbody>
            {SYSTEM_SERVICES.map(svc => (
              <tr key={svc.name} className="border-b border-border/60 hover:bg-muted/5 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <svc.icon className="w-4 h-4 text-muted-foreground" />
                    <span className="text-[13px] font-medium text-foreground">{svc.name}</span>
                  </div>
                </td>
                <td className="px-4 py-4">
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${svc.statusColor}`} />
                    <span className={`font-mono text-[11px] ${svc.status === "Operational" ? "text-forest" : "text-primary"}`}>
                      {svc.status}
                    </span>
                  </div>
                </td>
                <td className="px-4 py-4">
                  <span className="font-mono text-[12px] text-foreground">{svc.latency}</span>
                </td>
                <td className="px-6 py-4 text-right">
                  <span className="font-mono text-[11px] text-muted-foreground/50">2 min ago</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Admin Actions Log */}
      <div className="bg-card border-[1.5px] border-border rounded-xl overflow-hidden">
        <div className="px-6 py-4 border-b border-border">
          <h2 className="font-serif text-[18px] font-bold text-foreground">Admin Activity Log</h2>
        </div>
        <div className="divide-y divide-border/60">
          {ADMIN_LOG.map((item, idx) => (
            <div key={idx} className="px-6 py-4 flex items-start gap-4 hover:bg-muted/5 transition-colors">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                item.type === "success" ? "bg-forest/10" : item.type === "error" ? "bg-rose/10" : "bg-sky/10"
              }`}>
                {item.type === "success" ? <CheckCircle2 className="w-3 h-3 text-forest" /> 
                  : item.type === "error" ? <XCircle className="w-3 h-3 text-rose" /> 
                  : <AlertTriangle className="w-3 h-3 text-sky" />}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[13px] font-medium text-foreground">{item.action}</p>
                <p className="text-[12px] text-muted-foreground mt-0.5 line-clamp-1">{item.detail}</p>
              </div>
              <span className="font-mono text-[10px] text-muted-foreground/50 shrink-0 mt-0.5">{item.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
