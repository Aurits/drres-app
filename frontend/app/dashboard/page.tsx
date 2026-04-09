"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  FileText, CheckCircle2, Clock, Sparkles, Plus, Upload, ExternalLink,
  ArrowUpRight, MoreHorizontal, ChevronLeft, ChevronRight, Eye
} from "lucide-react";

// Mock submissions data
const MOCK_SUBMISSIONS = [
  { id: "DRRES-2025-001", title: "Facilitators of and Barriers to Uptake of Home-Based HIV Testing", type: "Primary Study", sdg: "SDG 3: Good Health", status: "Published", date: "2025-03-28", views: 342 },
  { id: "DRRES-2025-002", title: "Climate-Resilient Agriculture Policies for Sub-Saharan Drylands", type: "Systematic Review", sdg: "SDG 13: Climate Action", status: "Published", date: "2025-03-15", views: 218 },
  { id: "DRRES-2025-003", title: "AI in Primary Education: Infrastructure Requirements for Rural Deployment", type: "Policy Brief", sdg: "SDG 4: Quality Education", status: "Published", date: "2025-02-22", views: 156 },
  { id: "DRRES-2025-004", title: "Maternal Health Outcomes in Urban vs. Rural Settings Across East Africa", type: "Primary Study", sdg: "SDG 3: Good Health", status: "Published", date: "2025-02-10", views: 289 },
  { id: "DRRES-2025-005", title: "Water Sanitation Infrastructure and Cholera Prevention in Kampala Districts", type: "Rapid Response", sdg: "SDG 3: Good Health", status: "Published", date: "2025-01-18", views: 412 },
  { id: "DRRES-2025-006", title: "Renewable Solar Micro-Grid Deployment: Policy Frameworks for County-Level Implementation", type: "Policy Brief", sdg: "SDG 13: Climate Action", status: "Published", date: "2024-12-30", views: 97 },
  { id: "DRRES-2025-007", title: "Digital Literacy Training Outcomes Among Primary School Teachers in Western Kenya", type: "Primary Study", sdg: "SDG 4: Quality Education", status: "Published", date: "2024-12-15", views: 134 },
  { id: "DRRES-2025-008", title: "Community Health Worker Retention Strategies: A Multi-Country Analysis", type: "Systematic Review", sdg: "SDG 3: Good Health", status: "Published", date: "2024-11-28", views: 267 },
  { id: "DRRES-2025-009", title: "Impact of Drought-Resistant Crop Subsidies on Smallholder Farmer Incomes", type: "Primary Study", sdg: "SDG 13: Climate Action", status: "Published", date: "2024-11-10", views: 188 },
  { id: "DRRES-2025-010", title: "Vaccine Cold Chain Logistics in Sub-Saharan Africa: A Rapid Review", type: "Rapid Response", sdg: "SDG 3: Good Health", status: "Published", date: "2024-10-22", views: 356 },
  { id: "DRRES-2025-011", title: "Gender-Responsive Budgeting in Education Sectors Across 12 African Nations", type: "Systematic Review", sdg: "SDG 4: Quality Education", status: "Published", date: "2024-09-05", views: 142 },
  { id: "DRRES-2025-012", title: "Antimicrobial Resistance Surveillance Networks: A Gap Analysis for Eastern Africa", type: "Primary Study", sdg: "SDG 3: Good Health", status: "Pending", date: "2025-04-02", views: 0 },
  { id: "DRRES-2025-013", title: "Soil Carbon Sequestration Potential Under Agroforestry Systems in the Sahel", type: "Policy Brief", sdg: "SDG 13: Climate Action", status: "Pending", date: "2025-04-05", views: 0 },
  { id: "DRRES-2025-014", title: "Mobile Health Interventions for Chronic Disease Management: Uganda Pilot Results", type: "Primary Study", sdg: "SDG 3: Good Health", status: "Draft", date: "2025-04-07", views: 0 },
  { id: "DRRES-2025-015", title: "Evidence Gaps in Climate Adaptation Finance for Least Developed Countries", type: "Systematic Review", sdg: "SDG 13: Climate Action", status: "Rejected", date: "2025-03-20", views: 0 },
];

const STATUS_CONFIG: Record<string, { color: string; bg: string; border: string; icon: React.ReactNode }> = {
  Published: { color: "text-forest", bg: "bg-forest/10", border: "border-forest/20", icon: <CheckCircle2 className="w-3 h-3" /> },
  Pending: { color: "text-primary", bg: "bg-primary/10", border: "border-primary/20", icon: <Clock className="w-3 h-3" /> },
  Draft: { color: "text-sky", bg: "bg-sky/10", border: "border-sky/20", icon: <FileText className="w-3 h-3" /> },
  Rejected: { color: "text-rose", bg: "bg-rose/10", border: "border-rose/20", icon: <ExternalLink className="w-3 h-3" /> },
};

const ACTIVITY_FEED = [
  { action: "Your submission was approved", detail: "\"Vaccine Cold Chain Logistics...\" is now published in the Evidence Library.", time: "2 hours ago", type: "success" },
  { action: "Draft auto-saved", detail: "\"Mobile Health Interventions...\" — last saved with 4 metadata fields complete.", time: "5 hours ago", type: "info" },
  { action: "Submission rejected", detail: "\"Evidence Gaps in Climate Adaptation Finance...\" — Reviewer noted: incomplete methodology section.", time: "2 days ago", type: "error" },
  { action: "AI summary generated", detail: "A user generated an AI summary for your study on maternal health outcomes.", time: "3 days ago", type: "ai" },
  { action: "New submission received", detail: "\"Soil Carbon Sequestration Potential...\" is now pending moderation review.", time: "5 days ago", type: "info" },
];

export default function DashboardPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState("All");
  const itemsPerPage = 5;

  const filteredSubmissions = statusFilter === "All" 
    ? MOCK_SUBMISSIONS 
    : MOCK_SUBMISSIONS.filter(s => s.status === statusFilter);

  const totalPages = Math.max(1, Math.ceil(filteredSubmissions.length / itemsPerPage));
  const paginatedSubmissions = filteredSubmissions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const stats = {
    total: MOCK_SUBMISSIONS.length,
    published: MOCK_SUBMISSIONS.filter(s => s.status === "Published").length,
    pending: MOCK_SUBMISSIONS.filter(s => s.status === "Pending").length,
    aiQueries: 847,
  };

  return (
    <div className="max-w-[1400px] mx-auto w-full px-6 lg:px-10 py-8 lg:py-10">
      
      {/* Page Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-1">
          <span className="font-mono text-[10px] tracking-[2px] text-muted-foreground uppercase">Contributor Workspace</span>
        </div>
        <h1 className="font-serif text-[28px] lg:text-[32px] font-bold text-foreground leading-tight">
          Welcome back, Amara
        </h1>
        <p className="text-[14px] text-muted-foreground mt-1.5">
          Here&apos;s an overview of your evidence contributions and activity.
        </p>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Total Submissions", value: stats.total, icon: FileText, accent: "text-foreground", trend: "+3 this month" },
          { label: "Published", value: stats.published, icon: CheckCircle2, accent: "text-forest", trend: "73% approval rate" },
          { label: "Pending Review", value: stats.pending, icon: Clock, accent: "text-primary", trend: "~48h avg. review" },
          { label: "AI Interactions", value: stats.aiQueries, icon: Sparkles, accent: "text-sky", trend: "+12% this week" },
        ].map((stat) => (
          <div key={stat.label} className="bg-card border-[1.5px] border-border rounded-xl p-5 relative overflow-hidden group hover:border-primary/20 transition-all">
            <div className="flex items-start justify-between mb-3">
              <div className="p-2 rounded-lg bg-muted/40 border border-border">
                <stat.icon className={`w-4 h-4 ${stat.accent}`} />
              </div>
              <ArrowUpRight className="w-3.5 h-3.5 text-muted-foreground/40 group-hover:text-primary transition-colors" />
            </div>
            <p className={`font-serif font-bold text-[28px] lg:text-[32px] leading-none ${stat.accent}`}>{stat.value}</p>
            <p className="font-mono text-[9px] tracking-[1.5px] text-muted-foreground uppercase mt-2">{stat.label}</p>
            <p className="font-mono text-[10px] text-muted-foreground/60 mt-1.5">{stat.trend}</p>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="flex flex-wrap items-center gap-3 mb-8">
        <Link 
          href="/dashboard/submit" 
          className="flex items-center gap-2 bg-primary text-primary-foreground px-5 py-3 rounded-lg font-sans text-[13px] font-semibold tracking-[0.3px] hover:bg-[#e8a855] hover:-translate-y-px transition-all shadow-sm"
        >
          <Plus className="w-4 h-4" />
          Submit New Evidence
        </Link>
        <button className="flex items-center gap-2 bg-transparent text-foreground border-[1.5px] border-border px-5 py-3 rounded-lg font-sans text-[13px] font-medium hover:border-foreground/30 hover:bg-muted/20 transition-all">
          <Upload className="w-4 h-4" />
          Import from RIS
        </button>
        <Link 
          href="/search" 
          className="flex items-center gap-2 text-muted-foreground text-[13px] font-medium hover:text-foreground transition-colors ml-auto"
        >
          <ExternalLink className="w-3.5 h-3.5" />
          View Library
        </Link>
      </div>

      {/* Submissions Table */}
      <div className="bg-card border-[1.5px] border-border rounded-xl overflow-hidden mb-8">
        {/* Table Header with Filter Tabs */}
        <div className="px-6 py-4 border-b border-border flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <h2 className="font-serif text-[18px] font-bold text-foreground">Your Submissions</h2>
          <div className="flex items-center gap-1 bg-muted/30 rounded-lg p-1 border border-border">
            {["All", "Published", "Pending", "Draft", "Rejected"].map(status => (
              <button
                key={status}
                onClick={() => { setStatusFilter(status); setCurrentPage(1); }}
                className={`px-3 py-1.5 rounded-md text-[11px] font-medium transition-all cursor-pointer ${
                  statusFilter === status
                    ? "bg-card text-foreground shadow-sm border border-border"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted/20">
                <th className="text-left px-6 py-3 font-mono text-[9px] tracking-[2px] text-muted-foreground uppercase">ID</th>
                <th className="text-left px-4 py-3 font-mono text-[9px] tracking-[2px] text-muted-foreground uppercase">Title</th>
                <th className="text-left px-4 py-3 font-mono text-[9px] tracking-[2px] text-muted-foreground uppercase hidden lg:table-cell">Type</th>
                <th className="text-left px-4 py-3 font-mono text-[9px] tracking-[2px] text-muted-foreground uppercase hidden lg:table-cell">SDG</th>
                <th className="text-left px-4 py-3 font-mono text-[9px] tracking-[2px] text-muted-foreground uppercase">Status</th>
                <th className="text-left px-4 py-3 font-mono text-[9px] tracking-[2px] text-muted-foreground uppercase hidden md:table-cell">Date</th>
                <th className="text-right px-6 py-3 font-mono text-[9px] tracking-[2px] text-muted-foreground uppercase">Views</th>
              </tr>
            </thead>
            <tbody>
              {paginatedSubmissions.map((sub) => {
                const statusStyle = STATUS_CONFIG[sub.status];
                return (
                  <tr 
                    key={sub.id} 
                    className="border-b border-border/60 hover:bg-muted/10 transition-colors cursor-pointer group relative"
                  >
                    <td className="px-6 py-4">
                      <span className="font-mono text-[11px] text-muted-foreground">{sub.id}</span>
                    </td>
                    <td className="px-4 py-4 max-w-[320px]">
                      <p className="text-[13px] font-medium text-foreground group-hover:text-primary transition-colors truncate leading-relaxed">
                        {sub.title}
                      </p>
                    </td>
                    <td className="px-4 py-4 hidden lg:table-cell">
                      <span className="font-mono text-[10px] tracking-[1px] text-muted-foreground uppercase">{sub.type}</span>
                    </td>
                    <td className="px-4 py-4 hidden lg:table-cell">
                      <span className={`font-mono text-[10px] tracking-[1px] uppercase px-2 py-0.5 rounded-[4px] border font-bold ${
                        sub.sdg.includes("SDG 3") ? "bg-forest/10 text-forest border-forest/20" 
                        : sub.sdg.includes("SDG 13") ? "bg-sky/10 text-sky border-sky/20" 
                        : "bg-amber/10 text-amber border-amber/20"
                      }`}>
                        {sub.sdg.split(':')[0]}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <span className={`inline-flex items-center gap-1.5 font-mono text-[10px] tracking-[1px] uppercase px-2.5 py-1 rounded-full font-medium border ${statusStyle.color} ${statusStyle.bg} ${statusStyle.border}`}>
                        {statusStyle.icon}
                        {sub.status}
                      </span>
                    </td>
                    <td className="px-4 py-4 hidden md:table-cell">
                      <span className="font-mono text-[11px] text-muted-foreground">{sub.date}</span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className="font-mono text-[11px] text-muted-foreground flex items-center justify-end gap-1">
                        {sub.views > 0 && <Eye className="w-3 h-3 opacity-40" />}
                        {sub.views > 0 ? sub.views.toLocaleString() : "—"}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Table Pagination */}
        <div className="px-6 py-3.5 border-t border-border flex items-center justify-between bg-muted/10">
          <span className="font-mono text-[11px] text-muted-foreground">
            Showing {(currentPage -1) * itemsPerPage + 1}–{Math.min(currentPage * itemsPerPage, filteredSubmissions.length)} of {filteredSubmissions.length}
          </span>
          <div className="flex items-center gap-1.5">
            <button 
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-1.5 rounded-md border border-border hover:bg-muted/40 disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`min-w-[28px] h-[28px] rounded-md text-[11px] font-mono font-medium transition-all cursor-pointer ${
                  currentPage === i + 1
                    ? "bg-foreground text-background"
                    : "hover:bg-muted/40 text-muted-foreground border border-border"
                }`}
              >
                {i + 1}
              </button>
            ))}
            <button 
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="p-1.5 rounded-md border border-border hover:bg-muted/40 disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-card border-[1.5px] border-border rounded-xl overflow-hidden">
        <div className="px-6 py-4 border-b border-border">
          <h2 className="font-serif text-[18px] font-bold text-foreground">Recent Activity</h2>
        </div>
        <div className="divide-y divide-border/60">
          {ACTIVITY_FEED.map((item, idx) => (
            <div key={idx} className="px-6 py-4 flex items-start gap-4 hover:bg-muted/5 transition-colors">
              <div className={`w-2 h-2 rounded-full mt-2 shrink-0 ${
                item.type === "success" ? "bg-forest" 
                : item.type === "error" ? "bg-rose" 
                : item.type === "ai" ? "bg-sky" 
                : "bg-primary"
              }`} />
              <div className="flex-1 min-w-0">
                <p className="text-[13px] font-medium text-foreground">{item.action}</p>
                <p className="text-[12px] text-muted-foreground mt-0.5 line-clamp-1">{item.detail}</p>
              </div>
              <span className="font-mono text-[10px] text-muted-foreground/60 shrink-0 mt-0.5">{item.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
