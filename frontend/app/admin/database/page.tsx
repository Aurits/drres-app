"use client";

import { useState, useMemo } from "react";
import { 
  Search, Upload, Download, ChevronLeft, ChevronRight, X,
  CheckCircle2, Clock, FileText, XCircle, Eye, MoreHorizontal,
  Check, RotateCcw, Send, AlertCircle
} from "lucide-react";

type EvidenceRecord = {
  id: string;
  title: string;
  submitter: string;
  submitterEmail: string;
  type: string;
  sdg: string;
  status: "Needs Review" | "Published" | "Draft" | "Rejected";
  date: string;
  abstract: string;
  authors: string;
  year: string;
  country: string;
  priorityArea: string;
  doi: string;
};

const MOCK_RECORDS: EvidenceRecord[] = [
  { id: "DRS-2025-001", title: "Facilitators of and Barriers to Uptake of Home-Based HIV Testing", submitter: "Dr. Amara Osei", submitterEmail: "a.osei@mak.ac.ug", type: "Primary Study", sdg: "SDG 3", status: "Published", date: "2025-03-28", abstract: "Background: Integrating home-based HIV counseling and testing (HCT) with tuberculosis (TB) evaluation could improve the uptake of HIV testing among household contacts of patients with active TB.", authors: "Osei A., Kimani J., Nakamura T.", year: "2025", country: "Uganda", priorityArea: "Communicable Diseases", doi: "10.1097/QAI.0000000000001617" },
  { id: "DRS-2025-002", title: "Climate-Resilient Agriculture Policies for Sub-Saharan Drylands", submitter: "Dr. Amara Osei", submitterEmail: "a.osei@mak.ac.ug", type: "Systematic Review", sdg: "SDG 13", status: "Published", date: "2025-03-15", abstract: "A comprehensive review of 144 pilot programs testing drought-resistant crop subsidies and soil moisture retention techniques across Sub-Saharan Africa.", authors: "Institute for Climate Impact", year: "2024", country: "Sub-Saharan Africa", priorityArea: "Food Security", doi: "10.1016/j.gfs.2024.100815" },
  { id: "DRS-2025-003", title: "AI in Primary Education: Infrastructure Requirements for Rural Deployment", submitter: "J. Kimani", submitterEmail: "j.kimani@uon.ac.ke", type: "Policy Brief", sdg: "SDG 4", status: "Published", date: "2025-02-22", abstract: "An analysis of the digital infrastructure gaps in rural East African schools and policy recommendations for bridging the EdTech divide.", authors: "African Tech Policy Network", year: "2024", country: "Kenya", priorityArea: "Digital Infrastructure", doi: "10.1080/02680513.2024.2312788" },
  { id: "DRS-2025-004", title: "Maternal Health Outcomes in Urban vs. Rural Settings Across East Africa", submitter: "Dr. Amara Osei", submitterEmail: "a.osei@mak.ac.ug", type: "Primary Study", sdg: "SDG 3", status: "Published", date: "2025-02-10", abstract: "A multi-site study comparing maternal health outcomes across urban and rural settings in Uganda, Kenya, and Tanzania.", authors: "Osei A., Banda M., Wanjiku R.", year: "2025", country: "East Africa", priorityArea: "Accessible Healthcare", doi: "10.1016/j.healthpol.2025.03.001" },
  { id: "DRS-2025-005", title: "Water Sanitation Infrastructure and Cholera Prevention in Kampala Districts", submitter: "M. Banda", submitterEmail: "m.banda@makerere.ac.ug", type: "Rapid Response", sdg: "SDG 3", status: "Published", date: "2025-01-18", abstract: "A rapid evidence synthesis examining the relationship between water sanitation infrastructure investments and cholera incidence.", authors: "Banda M., Odhiambo P.", year: "2025", country: "Uganda", priorityArea: "Global Health Security", doi: "10.1186/s12889-025-18234-w" },
  { id: "DRS-2025-006", title: "Renewable Solar Micro-Grid Deployment: Policy Frameworks for County-Level Implementation", submitter: "T. Nakamura", submitterEmail: "t.nakamura@jica.go.jp", type: "Policy Brief", sdg: "SDG 13", status: "Published", date: "2024-12-30", abstract: "Evaluating county-level policy frameworks for the deployment of solar micro-grids in off-grid communities across Kenya.", authors: "Nakamura T., Wambui S.", year: "2024", country: "Kenya", priorityArea: "Renewable Energy", doi: "10.1016/j.enpol.2024.114489" },
  { id: "DRS-2025-007", title: "Digital Literacy Training Outcomes Among Primary School Teachers in Western Kenya", submitter: "S. Wambui", submitterEmail: "s.wambui@ku.ac.ke", type: "Primary Study", sdg: "SDG 4", status: "Published", date: "2024-12-15", abstract: "Measuring the effectiveness of a 6-month digital literacy training program for primary school teachers.", authors: "Wambui S., Achieng L.", year: "2024", country: "Kenya", priorityArea: "Digital Infrastructure", doi: "" },
  { id: "DRS-2025-008", title: "Community Health Worker Retention Strategies: A Multi-Country Analysis", submitter: "Dr. Amara Osei", submitterEmail: "a.osei@mak.ac.ug", type: "Systematic Review", sdg: "SDG 3", status: "Published", date: "2024-11-28", abstract: "Systematic analysis of retention strategies for community health workers across 8 Sub-Saharan African countries.", authors: "Osei A., Mwangi K., Diallo F.", year: "2024", country: "Sub-Saharan Africa", priorityArea: "Accessible Healthcare", doi: "10.1186/s12960-024-00923-w" },
  { id: "DRS-2025-009", title: "Impact of Drought-Resistant Crop Subsidies on Smallholder Farmer Incomes", submitter: "P. Odhiambo", submitterEmail: "p.odhiambo@cgiar.org", type: "Primary Study", sdg: "SDG 13", status: "Needs Review", date: "2025-04-05", abstract: "A randomized controlled trial examining the income effects of drought-resistant crop subsidies on smallholder farmers in the Sahel region.", authors: "Odhiambo P., Traoré A., Schmidt H.", year: "2025", country: "Sahel Region", priorityArea: "Food Security", doi: "10.1016/j.worlddev.2025.106389" },
  { id: "DRS-2025-010", title: "Antimicrobial Resistance Surveillance Networks: A Gap Analysis for Eastern Africa", submitter: "Dr. Amara Osei", submitterEmail: "a.osei@mak.ac.ug", type: "Primary Study", sdg: "SDG 3", status: "Needs Review", date: "2025-04-02", abstract: "A comprehensive gap analysis of antimicrobial resistance surveillance networks across Eastern African nations, identifying critical infrastructure and capacity needs.", authors: "Osei A., Ngure K., Ssempijja V.", year: "2025", country: "Eastern Africa", priorityArea: "Communicable Diseases", doi: "10.1016/j.ijantimicag.2025.107123" },
  { id: "DRS-2025-011", title: "Soil Carbon Sequestration Potential Under Agroforestry Systems in the Sahel", submitter: "T. Nakamura", submitterEmail: "t.nakamura@jica.go.jp", type: "Policy Brief", sdg: "SDG 13", status: "Needs Review", date: "2025-04-06", abstract: "Policy brief evaluating the carbon sequestration potential of different agroforestry systems in Sahelian landscapes.", authors: "Nakamura T., Traoré A., Diallo F.", year: "2025", country: "Sahel Region", priorityArea: "Food Security", doi: "" },
  { id: "DRS-2025-012", title: "Mobile Health Interventions for Chronic Disease Management: Uganda Pilot Results", submitter: "M. Banda", submitterEmail: "m.banda@makerere.ac.ug", type: "Primary Study", sdg: "SDG 3", status: "Draft", date: "2025-04-07", abstract: "Pilot study results from a mobile health intervention program for chronic disease management in urban Kampala.", authors: "Banda M., Osei A.", year: "2025", country: "Uganda", priorityArea: "Accessible Healthcare", doi: "" },
  { id: "DRS-2025-013", title: "Evidence Gaps in Climate Adaptation Finance for Least Developed Countries", submitter: "P. Odhiambo", submitterEmail: "p.odhiambo@cgiar.org", type: "Systematic Review", sdg: "SDG 13", status: "Rejected", date: "2025-03-20", abstract: "A systematic review identifying evidence gaps in climate adaptation finance mechanisms targeting least developed countries.", authors: "Odhiambo P., Schmidt H.", year: "2025", country: "Global", priorityArea: "Renewable Energy", doi: "" },
];

const STATUS_CONFIG: Record<string, { color: string; bg: string; border: string; icon: React.ReactNode }> = {
  "Needs Review": { color: "text-primary", bg: "bg-primary/10", border: "border-primary/20", icon: <Clock className="w-3 h-3" /> },
  "Published": { color: "text-forest", bg: "bg-forest/10", border: "border-forest/20", icon: <CheckCircle2 className="w-3 h-3" /> },
  "Draft": { color: "text-sky", bg: "bg-sky/10", border: "border-sky/20", icon: <FileText className="w-3 h-3" /> },
  "Rejected": { color: "text-rose", bg: "bg-rose/10", border: "border-rose/20", icon: <XCircle className="w-3 h-3" /> },
};

export default function AdminDatabasePage() {
  const [statusFilter, setStatusFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [reviewingRecord, setReviewingRecord] = useState<EvidenceRecord | null>(null);
  const [reviewNotes, setReviewNotes] = useState("");
  const [rejectReason, setRejectReason] = useState("");
  const [showRejectField, setShowRejectField] = useState(false);
  const itemsPerPage = 8;

  const needsReviewCount = MOCK_RECORDS.filter(r => r.status === "Needs Review").length;

  const filtered = useMemo(() => {
    return MOCK_RECORDS.filter(r => {
      const matchesStatus = statusFilter === "All" || r.status === statusFilter;
      const matchesSearch = searchQuery === "" || 
        r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.submitter.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesStatus && matchesSearch;
    });
  }, [statusFilter, searchQuery]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / itemsPerPage));
  const paginated = filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const openReview = (record: EvidenceRecord) => {
    setReviewingRecord(record);
    setReviewNotes("");
    setRejectReason("");
    setShowRejectField(false);
  };

  return (
    <div className="max-w-[1100px] mx-auto w-full px-6 lg:px-10 py-8 lg:py-10">
      
      {/* Header */}
      <div className="mb-6">
        <span className="font-mono text-[10px] tracking-[2px] text-muted-foreground uppercase block mb-1">Platform Console</span>
        <h1 className="font-serif text-[28px] lg:text-[32px] font-bold text-foreground leading-tight">Evidence Database</h1>
      </div>

      {/* Top Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        {/* Status Tabs */}
        <div className="flex items-center gap-1 bg-muted/30 rounded-lg p-1 border border-border">
          {["All", "Needs Review", "Published", "Draft", "Rejected"].map(status => (
            <button
              key={status}
              onClick={() => { setStatusFilter(status); setCurrentPage(1); }}
              className={`px-3 py-1.5 rounded-md text-[11px] font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
                statusFilter === status
                  ? "bg-card text-foreground shadow-sm border border-border"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {status}
              {status === "Needs Review" && needsReviewCount > 0 && (
                <span className="w-4 h-4 rounded-full bg-primary text-primary-foreground text-[9px] font-bold flex items-center justify-center">
                  {needsReviewCount}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Right: Search + Actions */}
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground/40" />
            <input 
              type="text" 
              value={searchQuery}
              onChange={e => { setSearchQuery(e.target.value); setCurrentPage(1); }}
              placeholder="Search records..." 
              className="bg-card border-[1.5px] border-border rounded-lg pl-9 pr-4 py-2.5 text-[13px] w-[220px] outline-none focus:border-primary transition-colors text-foreground placeholder:text-muted-foreground/40"
            />
          </div>
          <button className="flex items-center gap-2 bg-transparent text-foreground border-[1.5px] border-border px-4 py-2.5 rounded-lg text-[12px] font-medium hover:border-foreground/30 transition-all cursor-pointer">
            <Upload className="w-3.5 h-3.5" />
            Bulk Import
          </button>
          <button className="flex items-center gap-2 bg-transparent text-foreground border-[1.5px] border-border px-4 py-2.5 rounded-lg text-[12px] font-medium hover:border-foreground/30 transition-all cursor-pointer">
            <Download className="w-3.5 h-3.5" />
            Export
          </button>
        </div>
      </div>

      {/* Data Grid */}
      <div className="bg-card border-[1.5px] border-border rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted/20">
                <th className="text-left px-5 py-3 font-mono text-[9px] tracking-[2px] text-muted-foreground uppercase">ID</th>
                <th className="text-left px-4 py-3 font-mono text-[9px] tracking-[2px] text-muted-foreground uppercase">Title</th>
                <th className="text-left px-4 py-3 font-mono text-[9px] tracking-[2px] text-muted-foreground uppercase hidden lg:table-cell">Submitter</th>
                <th className="text-left px-4 py-3 font-mono text-[9px] tracking-[2px] text-muted-foreground uppercase hidden xl:table-cell">Type</th>
                <th className="text-left px-4 py-3 font-mono text-[9px] tracking-[2px] text-muted-foreground uppercase hidden xl:table-cell">SDG</th>
                <th className="text-left px-4 py-3 font-mono text-[9px] tracking-[2px] text-muted-foreground uppercase">Status</th>
                <th className="text-left px-4 py-3 font-mono text-[9px] tracking-[2px] text-muted-foreground uppercase hidden md:table-cell">Date</th>
                <th className="text-right px-5 py-3 font-mono text-[9px] tracking-[2px] text-muted-foreground uppercase">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginated.map(record => {
                const statusStyle = STATUS_CONFIG[record.status];
                return (
                  <tr key={record.id} className="border-b border-border/60 hover:bg-muted/10 transition-colors group relative">
                    <td className="px-5 py-4">
                      <span className="font-mono text-[11px] text-muted-foreground">{record.id}</span>
                    </td>
                    <td className="px-4 py-4 max-w-[280px]">
                      <p className="text-[13px] font-medium text-foreground group-hover:text-primary transition-colors truncate">
                        {record.title}
                      </p>
                    </td>
                    <td className="px-4 py-4 hidden lg:table-cell">
                      <span className="text-[12px] text-muted-foreground">{record.submitter}</span>
                    </td>
                    <td className="px-4 py-4 hidden xl:table-cell">
                      <span className="font-mono text-[10px] tracking-[1px] text-muted-foreground uppercase">{record.type}</span>
                    </td>
                    <td className="px-4 py-4 hidden xl:table-cell">
                      <span className={`font-mono text-[10px] tracking-[1px] uppercase px-2 py-0.5 rounded-[4px] border font-medium ${
                        record.sdg.includes("3") ? "bg-forest/10 text-forest border-forest/20" 
                        : record.sdg.includes("13") ? "bg-sky/10 text-sky border-sky/20"
                        : "bg-primary/10 text-primary border-primary/20"
                      }`}>
                        {record.sdg}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <span className={`inline-flex items-center gap-1.5 font-mono text-[10px] tracking-[1px] uppercase px-2.5 py-1 rounded-full font-medium border ${statusStyle.color} ${statusStyle.bg} ${statusStyle.border}`}>
                        {record.status === "Needs Review" && <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />}
                        {record.status !== "Needs Review" && statusStyle.icon}
                        {record.status}
                      </span>
                    </td>
                    <td className="px-4 py-4 hidden md:table-cell">
                      <span className="font-mono text-[11px] text-muted-foreground">{record.date}</span>
                    </td>
                    <td className="px-5 py-4 text-right">
                      <div className="flex items-center gap-2 justify-end">
                        {record.status === "Needs Review" && (
                          <button 
                            onClick={() => openReview(record)}
                            className="flex items-center gap-1.5 bg-primary text-primary-foreground px-3 py-1.5 rounded-md text-[11px] font-semibold hover:bg-[#e8a855] transition-all cursor-pointer"
                          >
                            <Eye className="w-3 h-3" />
                            Review
                          </button>
                        )}
                        <button className="p-1.5 rounded-md hover:bg-muted/40 transition-colors text-muted-foreground cursor-pointer">
                          <MoreHorizontal className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-5 py-3.5 border-t border-border flex items-center justify-between bg-muted/10">
          <span className="font-mono text-[11px] text-muted-foreground">
            {filtered.length} records · Page {currentPage} of {totalPages}
          </span>
          <div className="flex items-center gap-1.5">
            <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1} className="p-1.5 rounded-md border border-border hover:bg-muted/40 disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer">
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            {Array.from({ length: totalPages }, (_, i) => (
              <button key={i} onClick={() => setCurrentPage(i + 1)} className={`min-w-[28px] h-[28px] rounded-md text-[11px] font-mono font-medium transition-all cursor-pointer ${currentPage === i + 1 ? "bg-foreground text-background" : "hover:bg-muted/40 text-muted-foreground border border-border"}`}>{i + 1}</button>
            ))}
            <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} className="p-1.5 rounded-md border border-border hover:bg-muted/40 disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer">
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════ */}
      {/* SPLIT-SCREEN MODERATION MODAL                  */}
      {/* ═══════════════════════════════════════════════ */}
      {reviewingRecord && (
        <div className="fixed inset-0 z-[100] flex">
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setReviewingRecord(null)} />
          
          {/* Modal */}
          <div className="relative z-10 flex w-full max-w-[1400px] mx-auto my-6 rounded-2xl overflow-hidden shadow-2xl border border-border bg-background">
            
            {/* Close button */}
            <button onClick={() => setReviewingRecord(null)} className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-background/80 backdrop-blur-md border border-border flex items-center justify-center text-foreground hover:bg-muted transition-all cursor-pointer">
              <X className="w-4 h-4" />
            </button>

            {/* LEFT: Document Preview */}
            <div className="w-1/2 bg-muted/10 border-r border-border overflow-y-auto p-8 lg:p-10">
              <div className="mb-6">
                <span className="font-mono text-[9px] tracking-[2px] text-muted-foreground uppercase block mb-3">Document Preview</span>
                <span className="font-mono text-[11px] text-muted-foreground/50">{reviewingRecord.id}</span>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 mb-4">
                <span className="font-mono text-[10px] tracking-[1.5px] uppercase px-2.5 py-1 rounded-[4px] font-medium bg-foreground text-background">
                  {reviewingRecord.type}
                </span>
                <span className={`font-mono text-[10px] tracking-[1.5px] uppercase px-2.5 py-1 rounded-[4px] font-medium border ${
                  reviewingRecord.sdg.includes("3") ? "bg-forest/10 text-forest border-forest/20" 
                  : reviewingRecord.sdg.includes("13") ? "bg-sky/10 text-sky border-sky/20" 
                  : "bg-primary/10 text-primary border-primary/20"
                }`}>
                  {reviewingRecord.sdg}
                </span>
                <span className="font-mono text-[10px] tracking-[1.5px] uppercase px-2.5 py-1 rounded-[4px] font-medium bg-muted/50 text-foreground border border-border">
                  {reviewingRecord.priorityArea}
                </span>
              </div>

              {/* Title */}
              <h2 className="font-serif text-[22px] leading-[1.4] font-bold text-foreground mb-4">
                {reviewingRecord.title}
              </h2>

              {/* Meta Strip */}
              <div className="flex flex-wrap gap-x-6 gap-y-3 py-4 mb-6 border-y border-border">
                <div>
                  <span className="font-mono text-[9px] tracking-[1.5px] text-muted-foreground uppercase block mb-1">Authors</span>
                  <span className="text-[12px] text-foreground">{reviewingRecord.authors}</span>
                </div>
                <div>
                  <span className="font-mono text-[9px] tracking-[1.5px] text-muted-foreground uppercase block mb-1">Year</span>
                  <span className="font-serif font-bold text-[16px] text-foreground">{reviewingRecord.year}</span>
                </div>
                <div>
                  <span className="font-mono text-[9px] tracking-[1.5px] text-muted-foreground uppercase block mb-1">Country</span>
                  <span className="text-[12px] text-foreground">{reviewingRecord.country}</span>
                </div>
                {reviewingRecord.doi && (
                  <div>
                    <span className="font-mono text-[9px] tracking-[1.5px] text-muted-foreground uppercase block mb-1">DOI</span>
                    <span className="font-mono text-[11px] text-primary">{reviewingRecord.doi}</span>
                  </div>
                )}
              </div>

              {/* Abstract */}
              <div>
                <h3 className="font-serif text-[16px] font-bold mb-3 pb-2 border-b-2 border-foreground flex items-center gap-2.5 text-foreground">
                  <span className="font-mono text-[10px] text-muted-foreground border border-sand rounded-[3px] px-1.5 py-0.5">01</span>
                  Abstract
                </h3>
                <p className="text-[14px] leading-[1.85] text-muted-foreground">
                  {reviewingRecord.abstract}
                </p>
              </div>

              {/* Submitter Info */}
              <div className="mt-8 p-4 bg-muted/20 rounded-xl border border-border">
                <span className="font-mono text-[9px] tracking-[2px] text-muted-foreground uppercase block mb-2">Submitted By</span>
                <p className="text-[13px] font-medium text-foreground">{reviewingRecord.submitter}</p>
                <p className="font-mono text-[11px] text-muted-foreground">{reviewingRecord.submitterEmail}</p>
                <p className="font-mono text-[10px] text-muted-foreground/50 mt-1">Submitted on {reviewingRecord.date}</p>
              </div>
            </div>

            {/* RIGHT: Moderation Panel */}
            <div className="w-1/2 overflow-y-auto p-8 lg:p-10 flex flex-col">
              <div className="mb-6">
                <span className="font-mono text-[9px] tracking-[2px] text-muted-foreground uppercase block mb-1">Moderation</span>
                <h2 className="font-serif text-[22px] font-bold text-foreground">Review Submission</h2>
              </div>

              {/* Checklist */}
              <div className="bg-muted/10 border border-border rounded-xl p-5 mb-6">
                <span className="font-mono text-[9px] tracking-[2px] text-muted-foreground uppercase block mb-3">Pre-flight Checks</span>
                <div className="space-y-2.5">
                  {[
                    { label: "Title is descriptive and accurate", done: true },
                    { label: "Authors properly listed", done: true },
                    { label: "SDG classification is correct", done: true },
                    { label: "Abstract is substantive (>100 words)", done: reviewingRecord.abstract.split(' ').length > 15 },
                    { label: "DOI provided", done: !!reviewingRecord.doi },
                    { label: "No duplicate record in database", done: true },
                  ].map(check => (
                    <div key={check.label} className="flex items-center gap-2.5">
                      <div className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 ${check.done ? "bg-forest text-white" : "bg-muted/40 border border-border"}`}>
                        {check.done && <Check className="w-2.5 h-2.5" />}
                      </div>
                      <span className={`text-[12px] ${check.done ? "text-foreground" : "text-muted-foreground"}`}>{check.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Reviewer Notes */}
              <div className="mb-6">
                <label className="block font-mono text-[10px] tracking-[2px] text-muted-foreground uppercase mb-2">Reviewer Notes</label>
                <textarea 
                  value={reviewNotes}
                  onChange={e => setReviewNotes(e.target.value)}
                  rows={4}
                  className="w-full bg-background border-[1.5px] border-border rounded-lg px-4 py-3 text-[14px] text-foreground outline-none focus:border-primary transition-colors resize-y leading-relaxed placeholder:text-muted-foreground/40"
                  placeholder="Add internal notes about this submission..."
                />
              </div>

              {/* Reject Reason (conditional) */}
              {showRejectField && (
                <div className="mb-6 p-4 bg-rose/5 rounded-xl border border-rose/20">
                  <label className="block font-mono text-[10px] tracking-[2px] text-rose uppercase mb-2">Rejection Reason *</label>
                  <textarea 
                    value={rejectReason}
                    onChange={e => setRejectReason(e.target.value)}
                    rows={3}
                    className="w-full bg-background border-[1.5px] border-rose/20 rounded-lg px-4 py-3 text-[14px] text-foreground outline-none focus:border-rose transition-colors resize-y leading-relaxed placeholder:text-muted-foreground/40"
                    placeholder="Provide a clear reason for the contributor..."
                  />
                </div>
              )}

              {/* Action Buttons */}
              <div className="mt-auto pt-6 border-t border-border space-y-3">
                {!showRejectField ? (
                  <>
                    <button className="w-full flex items-center justify-center gap-2 bg-forest text-white px-5 py-3 rounded-lg text-[13px] font-semibold hover:bg-forest/90 transition-all cursor-pointer">
                      <CheckCircle2 className="w-4 h-4" />
                      Approve & Publish
                    </button>
                    <button className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground px-5 py-3 rounded-lg text-[13px] font-semibold hover:bg-[#e8a855] transition-all cursor-pointer">
                      <RotateCcw className="w-4 h-4" />
                      Request Revision
                    </button>
                    <button 
                      onClick={() => setShowRejectField(true)}
                      className="w-full flex items-center justify-center gap-2 bg-transparent text-rose border-[1.5px] border-rose/30 px-5 py-3 rounded-lg text-[13px] font-medium hover:bg-rose hover:text-white hover:border-rose transition-all cursor-pointer"
                    >
                      <XCircle className="w-4 h-4" />
                      Reject
                    </button>
                  </>
                ) : (
                  <>
                    <button 
                      disabled={rejectReason.length < 10}
                      className="w-full flex items-center justify-center gap-2 bg-rose text-white px-5 py-3 rounded-lg text-[13px] font-semibold hover:bg-rose/90 transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      <Send className="w-4 h-4" />
                      Confirm Rejection
                    </button>
                    <button 
                      onClick={() => setShowRejectField(false)}
                      className="w-full flex items-center justify-center gap-2 bg-transparent text-muted-foreground border-[1.5px] border-border px-5 py-3 rounded-lg text-[13px] font-medium hover:text-foreground hover:border-foreground/30 transition-all cursor-pointer"
                    >
                      Cancel
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
