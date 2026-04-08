"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { 
  Upload, FileText, Check, ChevronRight, ChevronLeft, X, 
  Sparkles, Eye, AlertCircle, Save, Send
} from "lucide-react";

const STEPS = [
  { num: 1, label: "Upload & Extract", description: "Upload your PDF or import RIS" },
  { num: 2, label: "Metadata & Tags", description: "Add details and classify" },
  { num: 3, label: "Review & Submit", description: "Preview and send for review" },
];

const SDG_OPTIONS = ["SDG 3: Good Health", "SDG 4: Quality Education", "SDG 13: Climate Action"];
const TYPE_OPTIONS = ["Primary Study", "Systematic Review", "Policy Brief", "Rapid Response"];
const PRIORITY_AREAS: Record<string, string[]> = {
  "SDG 3: Good Health": ["Addressing Barriers for Accessible Healthcare", "Communicable Diseases", "Global Health Security"],
  "SDG 4: Quality Education": ["Digital Infrastructure", "Curriculum Reform"],
  "SDG 13: Climate Action": ["Food Security", "Renewable Energy Transition"],
};

export default function SubmitPage() {
  const [step, setStep] = useState(1);
  const [uploadedFile, setUploadedFile] = useState<{ name: string; size: string } | null>(null);
  const [isExtracting, setIsExtracting] = useState(false);
  const [extractionDone, setExtractionDone] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [lastSaved, setLastSaved] = useState<string | null>(null);

  // Metadata form state
  const [form, setForm] = useState({
    title: "",
    authors: "",
    year: new Date().getFullYear().toString(),
    abstract: "",
    doi: "",
    sdg: "",
    priorityArea: "",
    type: "",
    country: "",
  });

  const updateForm = (field: string, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
    // If SDG changes, reset priority area
    if (field === "sdg") setForm(prev => ({ ...prev, [field]: value, priorityArea: "" }));
  };

  const simulateUpload = useCallback(() => {
    setUploadedFile({ name: "maternal_health_outcomes_2025.pdf", size: "4.2 MB" });
    setIsExtracting(true);
    setTimeout(() => {
      setIsExtracting(false);
      setExtractionDone(true);
      setForm(prev => ({
        ...prev,
        title: "Maternal Health Outcomes in Urban vs. Rural Settings Across East Africa",
        authors: "Osei, A., Kimani, J., Nakamura, T., Banda, M.",
        year: "2025",
        doi: "10.1016/j.healthpol.2025.03.001",
      }));
    }, 2500);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    simulateUpload();
  }, [simulateUpload]);

  const handleSaveDraft = () => {
    setLastSaved("Just now");
    setTimeout(() => setLastSaved("1 min ago"), 60000);
  };

  const completionChecks = [
    { label: "PDF uploaded", done: !!uploadedFile },
    { label: "Title provided", done: form.title.length > 0 },
    { label: "Authors listed", done: form.authors.length > 0 },
    { label: "SDG classified", done: form.sdg.length > 0 },
    { label: "Document type set", done: form.type.length > 0 },
    { label: "Abstract provided", done: form.abstract.length > 20 },
  ];

  const completionPercent = Math.round((completionChecks.filter(c => c.done).length / completionChecks.length) * 100);

  return (
    <div className="max-w-[900px] mx-auto w-full px-6 lg:px-10 py-8 lg:py-10">

      {/* Page Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-1">
          <Link href="/dashboard" className="font-mono text-[10px] tracking-[2px] text-muted-foreground uppercase hover:text-foreground transition-colors">
            Dashboard
          </Link>
          <ChevronRight className="w-3 h-3 text-muted-foreground/40" />
          <span className="font-mono text-[10px] tracking-[2px] text-primary uppercase">New Submission</span>
        </div>
        <h1 className="font-serif text-[28px] font-bold text-foreground leading-tight">
          Submit Evidence
        </h1>
      </div>

      {/* Step Indicator */}
      <div className="flex items-center gap-0 mb-10 px-2">
        {STEPS.map((s, idx) => (
          <div key={s.num} className="flex items-center flex-1 last:flex-initial">
            <div className="flex items-center gap-3">
              <div className={`w-9 h-9 rounded-full flex items-center justify-center font-mono text-[12px] font-bold border-2 transition-all shrink-0 ${
                step > s.num 
                  ? "bg-forest border-forest text-white" 
                  : step === s.num 
                    ? "bg-primary border-primary text-primary-foreground" 
                    : "bg-transparent border-border text-muted-foreground"
              }`}>
                {step > s.num ? <Check className="w-4 h-4" /> : s.num}
              </div>
              <div className="hidden sm:block">
                <p className={`text-[13px] font-medium leading-none ${step >= s.num ? "text-foreground" : "text-muted-foreground"}`}>
                  {s.label}
                </p>
                <p className="text-[11px] text-muted-foreground/60 mt-0.5">{s.description}</p>
              </div>
            </div>
            {idx < STEPS.length - 1 && (
              <div className={`flex-1 h-[2px] mx-4 rounded-full transition-all ${step > s.num ? "bg-forest" : "bg-border"}`} />
            )}
          </div>
        ))}
      </div>

      {/* Step Content */}
      <div className="bg-card border-[1.5px] border-border rounded-xl overflow-hidden">
        
        {/* ── STEP 1: Upload & Extract ── */}
        {step === 1 && (
          <div className="p-6 lg:p-8">
            <h2 className="font-serif text-[20px] font-bold text-foreground mb-2">Upload Your Document</h2>
            <p className="text-[13px] text-muted-foreground mb-6">Upload a PDF and we&apos;ll automatically extract metadata to pre-fill the form.</p>
            
            {!uploadedFile ? (
              <div 
                className={`border-2 border-dashed rounded-xl p-12 text-center transition-all cursor-pointer group ${
                  dragOver 
                    ? "border-primary bg-primary/5" 
                    : "border-border hover:border-primary/40 hover:bg-muted/10"
                }`}
                onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                onDragLeave={() => setDragOver(false)}
                onDrop={handleDrop}
                onClick={simulateUpload}
              >
                <div className="w-16 h-16 mx-auto mb-5 rounded-2xl bg-muted/40 border border-border flex items-center justify-center group-hover:border-primary/30 group-hover:bg-primary/5 transition-all">
                  <Upload className="w-7 h-7 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
                <p className="text-[15px] font-medium text-foreground mb-1">
                  Drop your PDF here, or <span className="text-primary">browse</span>
                </p>
                <p className="text-[12px] text-muted-foreground">Maximum 50 MB · PDF format only</p>
              </div>
            ) : (
              <div className="space-y-4">
                {/* File Info */}
                <div className="flex items-center gap-4 p-4 bg-muted/20 rounded-xl border border-border">
                  <div className="w-12 h-12 rounded-xl bg-forest/10 border border-forest/20 flex items-center justify-center shrink-0">
                    <FileText className="w-5 h-5 text-forest" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[13px] font-medium text-foreground truncate">{uploadedFile.name}</p>
                    <p className="text-[11px] text-muted-foreground font-mono">{uploadedFile.size}</p>
                  </div>
                  <button 
                    onClick={() => { setUploadedFile(null); setExtractionDone(false); }}
                    className="p-2 rounded-lg hover:bg-muted/40 transition-colors text-muted-foreground hover:text-rose cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Extraction Progress */}
                {isExtracting && (
                  <div className="p-4 bg-primary/5 rounded-xl border border-primary/20">
                    <div className="flex items-center gap-2 mb-3">
                      <Sparkles className="w-4 h-4 text-primary animate-pulse" />
                      <span className="text-[13px] font-medium text-primary">Extracting metadata…</span>
                    </div>
                    <div className="w-full h-1.5 bg-primary/10 rounded-full overflow-hidden">
                      <div className="h-full bg-primary rounded-full animate-[extraction_2.5s_ease-in-out]" style={{
                        animation: "extraction 2.5s ease-in-out forwards"
                      }} />
                    </div>
                    <style>{`@keyframes extraction { 0% { width: 0%; } 100% { width: 100%; } }`}</style>
                  </div>
                )}

                {/* Extraction Complete */}
                {extractionDone && !isExtracting && (
                  <div className="p-4 bg-forest/5 rounded-xl border border-forest/20">
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-forest" />
                      <span className="text-[13px] font-medium text-forest">Metadata extracted successfully</span>
                    </div>
                    <p className="text-[12px] text-muted-foreground mt-1 ml-6">Title, authors, DOI, and year were auto-filled. You can edit them in the next step.</p>
                  </div>
                )}
              </div>
            )}

            {/* RIS Alternative */}
            <div className="mt-6 pt-6 border-t border-border">
              <p className="text-[12px] text-muted-foreground mb-2">Or import from a reference file:</p>
              <button className="flex items-center gap-2 text-[13px] font-medium text-primary hover:text-[#e8a855] transition-colors">
                <Upload className="w-3.5 h-3.5" />
                Import from RIS / BibTeX
              </button>
            </div>
          </div>
        )}

        {/* ── STEP 2: Metadata & Tags ── */}
        {step === 2 && (
          <div className="p-6 lg:p-8">
            <h2 className="font-serif text-[20px] font-bold text-foreground mb-2">Evidence Metadata</h2>
            <p className="text-[13px] text-muted-foreground mb-6">Review and complete the details for your submission.</p>
            
            <div className="space-y-5">
              {/* Title */}
              <div>
                <label className="block font-mono text-[10px] tracking-[2px] text-muted-foreground uppercase mb-2">Title *</label>
                <input 
                  type="text" 
                  value={form.title} 
                  onChange={e => updateForm("title", e.target.value)}
                  className="w-full bg-background border-[1.5px] border-border rounded-lg px-4 py-3 text-[14px] text-foreground outline-none focus:border-primary transition-colors placeholder:text-muted-foreground/40"
                  placeholder="Enter the full title of the evidence..."
                />
              </div>

              {/* Authors + Year */}
              <div className="grid grid-cols-1 md:grid-cols-[1fr_160px] gap-4">
                <div>
                  <label className="block font-mono text-[10px] tracking-[2px] text-muted-foreground uppercase mb-2">Authors *</label>
                  <input 
                    type="text" 
                    value={form.authors} 
                    onChange={e => updateForm("authors", e.target.value)}
                    className="w-full bg-background border-[1.5px] border-border rounded-lg px-4 py-3 text-[14px] text-foreground outline-none focus:border-primary transition-colors placeholder:text-muted-foreground/40"
                    placeholder="Last, F., Last, F."
                  />
                </div>
                <div>
                  <label className="block font-mono text-[10px] tracking-[2px] text-muted-foreground uppercase mb-2">Year *</label>
                  <input 
                    type="text" 
                    value={form.year} 
                    onChange={e => updateForm("year", e.target.value)}
                    className="w-full bg-background border-[1.5px] border-border rounded-lg px-4 py-3 text-[14px] text-foreground outline-none focus:border-primary transition-colors placeholder:text-muted-foreground/40"
                    placeholder="2025"
                  />
                </div>
              </div>

              {/* DOI + Country */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block font-mono text-[10px] tracking-[2px] text-muted-foreground uppercase mb-2">DOI</label>
                  <input 
                    type="text" 
                    value={form.doi} 
                    onChange={e => updateForm("doi", e.target.value)}
                    className="w-full bg-background border-[1.5px] border-border rounded-lg px-4 py-3 text-[14px] text-foreground outline-none focus:border-primary transition-colors placeholder:text-muted-foreground/40 font-mono text-[13px]"
                    placeholder="10.XXXX/XXXXX"
                  />
                </div>
                <div>
                  <label className="block font-mono text-[10px] tracking-[2px] text-muted-foreground uppercase mb-2">Country / Region</label>
                  <input 
                    type="text" 
                    value={form.country} 
                    onChange={e => updateForm("country", e.target.value)}
                    className="w-full bg-background border-[1.5px] border-border rounded-lg px-4 py-3 text-[14px] text-foreground outline-none focus:border-primary transition-colors placeholder:text-muted-foreground/40"
                    placeholder="Uganda, Kenya, Sub-Saharan Africa..."
                  />
                </div>
              </div>

              {/* SDG + Type */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block font-mono text-[10px] tracking-[2px] text-muted-foreground uppercase mb-2">SDG Category *</label>
                  <select 
                    value={form.sdg} 
                    onChange={e => updateForm("sdg", e.target.value)}
                    className="w-full bg-background border-[1.5px] border-border rounded-lg px-4 py-3 text-[14px] text-foreground outline-none focus:border-primary transition-colors cursor-pointer"
                  >
                    <option value="">Select SDG...</option>
                    {SDG_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block font-mono text-[10px] tracking-[2px] text-muted-foreground uppercase mb-2">Document Type *</label>
                  <select 
                    value={form.type} 
                    onChange={e => updateForm("type", e.target.value)}
                    className="w-full bg-background border-[1.5px] border-border rounded-lg px-4 py-3 text-[14px] text-foreground outline-none focus:border-primary transition-colors cursor-pointer"
                  >
                    <option value="">Select type...</option>
                    {TYPE_OPTIONS.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
              </div>

              {/* Priority Area (conditional) */}
              {form.sdg && PRIORITY_AREAS[form.sdg] && (
                <div>
                  <label className="block font-mono text-[10px] tracking-[2px] text-muted-foreground uppercase mb-2">Priority Area</label>
                  <select 
                    value={form.priorityArea} 
                    onChange={e => updateForm("priorityArea", e.target.value)}
                    className="w-full bg-background border-[1.5px] border-border rounded-lg px-4 py-3 text-[14px] text-foreground outline-none focus:border-primary transition-colors cursor-pointer"
                  >
                    <option value="">Select priority area...</option>
                    {PRIORITY_AREAS[form.sdg].map(pa => <option key={pa} value={pa}>{pa}</option>)}
                  </select>
                </div>
              )}

              {/* Abstract */}
              <div>
                <label className="block font-mono text-[10px] tracking-[2px] text-muted-foreground uppercase mb-2">Abstract *</label>
                <textarea 
                  value={form.abstract} 
                  onChange={e => updateForm("abstract", e.target.value)}
                  rows={6}
                  className="w-full bg-background border-[1.5px] border-border rounded-lg px-4 py-3 text-[14px] text-foreground outline-none focus:border-primary transition-colors placeholder:text-muted-foreground/40 resize-y leading-relaxed"
                  placeholder="Paste or type the evidence abstract..."
                />
              </div>
            </div>
          </div>
        )}

        {/* ── STEP 3: Review & Submit ── */}
        {step === 3 && (
          <div className="p-6 lg:p-8">
            <h2 className="font-serif text-[20px] font-bold text-foreground mb-2">Review Your Submission</h2>
            <p className="text-[13px] text-muted-foreground mb-6">Preview how your evidence will appear in the library.</p>

            <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-6">
              {/* Preview Card */}
              <div className="bg-background border-[1.5px] border-border rounded-xl p-6 relative overflow-hidden">
                <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-primary" />
                
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {form.type && (
                    <span className="font-mono text-[10px] tracking-[1.5px] uppercase px-2.5 py-1 rounded-[4px] font-medium bg-foreground text-background">
                      {form.type}
                    </span>
                  )}
                  {form.sdg && (
                    <span className={`font-mono text-[10px] tracking-[1.5px] uppercase px-2.5 py-1 rounded-[4px] font-medium border ${
                      form.sdg.includes("3") ? "bg-forest/10 text-forest border-forest/20" 
                      : form.sdg.includes("13") ? "bg-sky/10 text-sky border-sky/20" 
                      : "bg-primary/10 text-primary border-primary/20"
                    }`}>
                      {form.sdg}
                    </span>
                  )}
                  {form.priorityArea && (
                    <span className="font-mono text-[10px] tracking-[1.5px] uppercase px-2.5 py-1 rounded-[4px] font-medium bg-muted/50 text-foreground border border-border">
                      {form.priorityArea}
                    </span>
                  )}
                </div>

                <h3 className="font-serif text-[18px] leading-[1.45] text-foreground font-bold mb-2.5">
                  {form.title || "Untitled Evidence"}
                </h3>

                <p className="text-[13px] leading-[1.75] text-muted-foreground mb-4 line-clamp-3">
                  {form.abstract || "No abstract provided yet."}
                </p>

                <div className="flex items-center gap-3 pt-3 border-t border-border/60">
                  <span className="font-mono text-[10px] text-muted-foreground flex-1 truncate">
                    {form.authors || "No authors listed"}
                  </span>
                  <span className="font-mono text-[11px] text-muted-foreground">{form.year}</span>
                  {form.country && (
                    <span className="bg-foreground text-background font-mono text-[9px] tracking-[1.5px] uppercase px-2 py-0.5 rounded-[3px]">
                      {form.country}
                    </span>
                  )}
                </div>
              </div>

              {/* Completion Checklist */}
              <div className="space-y-4">
                <div className="bg-background border-[1.5px] border-border rounded-xl p-5">
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-[9px] tracking-[2px] text-muted-foreground uppercase">Completion</span>
                    <span className={`font-serif font-bold text-[20px] ${completionPercent === 100 ? "text-forest" : "text-primary"}`}>
                      {completionPercent}%
                    </span>
                  </div>
                  {/* Progress bar */}
                  <div className="w-full h-1.5 bg-muted/40 rounded-full mb-4 overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all duration-500 ${completionPercent === 100 ? "bg-forest" : "bg-primary"}`}
                      style={{ width: `${completionPercent}%` }}
                    />
                  </div>
                  <div className="space-y-2.5">
                    {completionChecks.map(check => (
                      <div key={check.label} className="flex items-center gap-2.5">
                        <div className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 ${
                          check.done ? "bg-forest text-white" : "bg-muted/40 border border-border"
                        }`}>
                          {check.done && <Check className="w-2.5 h-2.5" />}
                        </div>
                        <span className={`text-[12px] ${check.done ? "text-foreground" : "text-muted-foreground"}`}>
                          {check.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {completionPercent < 100 && (
                  <div className="flex items-start gap-2 p-3 bg-primary/5 rounded-lg border border-primary/15">
                    <AlertCircle className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    <p className="text-[11px] text-muted-foreground leading-relaxed">
                      Complete all required fields before submitting for review.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Footer Navigation */}
        <div className="px-6 lg:px-8 py-5 border-t border-border flex items-center justify-between bg-muted/5">
          <div>
            {step > 1 && (
              <button 
                onClick={() => setStep(s => s - 1)}
                className="flex items-center gap-2 text-[13px] font-medium text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
                Back
              </button>
            )}
          </div>

          <div className="flex items-center gap-3">
            {/* Auto-save indicator */}
            {lastSaved && (
              <span className="font-mono text-[10px] text-muted-foreground/50 hidden sm:block">
                <Save className="w-3 h-3 inline mr-1 opacity-50" />
                Draft saved · {lastSaved}
              </span>
            )}

            <button 
              onClick={handleSaveDraft}
              className="flex items-center gap-2 bg-transparent text-foreground border-[1.5px] border-border px-4 py-2.5 rounded-lg text-[13px] font-medium hover:border-foreground/30 transition-all cursor-pointer"
            >
              <Save className="w-3.5 h-3.5" />
              Save Draft
            </button>

            {step < 3 ? (
              <button 
                onClick={() => setStep(s => s + 1)}
                className="flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 rounded-lg text-[13px] font-semibold hover:bg-[#e8a855] transition-all cursor-pointer"
              >
                Continue
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button 
                className="flex items-center gap-2 bg-forest text-white px-5 py-2.5 rounded-lg text-[13px] font-semibold hover:bg-forest/90 transition-all cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                Submit for Review
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
