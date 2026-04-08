"use client";

import { useEffect, useState, UIEvent } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { AnimatePresence, motion } from "framer-motion";
import { X, Sparkles, ExternalLink, Download, Copy, Play } from "lucide-react";

interface EvidenceSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  evidence?: {
    title: string;
    type: string;
    sdg: string;
    abstract: string;
    authors: string;
    year: string;
    country?: string;
    priorityArea?: string;
    subArea?: string;
    doi?: string;
    citation?: string;
  };
}

export function EvidenceSheet({ open, onOpenChange, evidence }: EvidenceSheetProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [summary, setSummary] = useState<string | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    if (!open) {
      setSummary(null);
      setIsGenerating(false);
      setScrollProgress(0);
    }
  }, [open]);

  const handleScroll = (e: UIEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    // Calculate percentage, guard against divide by zero or negative
    const diff = target.scrollHeight - target.clientHeight;
    const scrollPercent = diff > 0 ? (target.scrollTop / diff) : 0;
    setScrollProgress(scrollPercent * 100);
  };

  const handleGenerateSummary = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setSummary("This qualitative study explored why household contacts of TB patients in Kampala, Uganda accepted or declined home-based HIV testing. Using semi-structured interviews with participants and a behavioural model, researchers found that psychological readiness and social household dynamics were the dominant drivers of testing decisions. Offering opt-out language, a second testing opportunity, or self-test kits with follow-up counselling could meaningfully improve uptake rates in similar high-burden settings.");
      setIsGenerating(false);
    }, 2200);
  };

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <AnimatePresence>
        {open && (
          <Dialog.Portal forceMount>
            <Dialog.Overlay asChild>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm"
              />
            </Dialog.Overlay>
            
            {/* Full-Width Sliding Sheet */}
            <Dialog.Content asChild>
              <motion.div
                initial={{ x: "100%", opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: "100%", opacity: 0 }}
                transition={{ type: "spring", damping: 28, stiffness: 220 }}
                className="fixed inset-y-0 right-0 z-[110] w-full bg-background shadow-[-20px_0_60px_rgba(0,0,0,0.3)] outline-none flex flex-col overflow-hidden border-l border-border"
              >
                
                {/* Scroll Progress Bar at very top */}
                <div className="absolute top-0 left-0 right-0 h-[3px] bg-primary/15 z-[120]">
                  <div 
                    className="h-full bg-primary transition-all rounded-r-[2px] ease-linear"
                    style={{ width: `${scrollProgress}%`, transitionDuration: '100ms' }}
                  />
                </div>

                {/* Floating Close Button */}
                <Dialog.Close asChild>
                  <button className="absolute top-4 right-4 md:top-6 md:right-8 z-[130] flex items-center justify-center w-10 h-10 rounded-full bg-background/50 backdrop-blur-md border border-border text-foreground hover:bg-muted transition-all focus:outline-none shadow-sm cursor-pointer">
                    <X className="w-5 h-5 opacity-70" />
                  </button>
                </Dialog.Close>

                {/* Scrollable Container mapping to HTML .page wrapper */}
                <div 
                  className="flex-1 overflow-y-auto relative w-full"
                  onScroll={handleScroll}
                >
                  <div className="max-w-[1200px] w-full mx-auto px-4 sm:px-6 md:px-12 lg:px-8 grid grid-cols-1 lg:grid-cols-[1fr_300px] xl:grid-cols-[1fr_340px] gap-8 lg:gap-0 h-full relative">
                    
                    {/* MAIN ARTICLE AREA */}
                    <article className="pt-12 md:pt-16 pb-12 lg:py-16 lg:pr-14 border-border lg:border-r">
                      
                      <div className="inline-flex items-center gap-2 bg-foreground text-background font-mono text-[10px] tracking-[2px] uppercase px-3 py-1.5 rounded-[4px] mb-5">
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                        {evidence?.type || 'Primary Study'}
                      </div>

                      <div className="flex flex-wrap gap-2 mb-6">
                        <span className="flex items-center gap-1.5 font-mono text-[10px] font-semibold tracking-[1.5px] uppercase px-2.5 py-1.5 border rounded-[4px] bg-forest/10 border-forest/20 text-forest hover:opacity-80 transition-opacity cursor-pointer">
                          <span className="w-1.5 h-1.5 rounded-full bg-forest shrink-0" />
                          {evidence?.sdg || 'SDG Target'}
                        </span>
                        <span className="flex items-center gap-1.5 font-mono text-[10px] font-semibold tracking-[1.5px] uppercase px-2.5 py-1.5 border rounded-[4px] bg-sky/10 border-sky/20 text-sky hover:opacity-80 transition-opacity cursor-pointer">
                          <span className="w-1.5 h-1.5 rounded-full bg-sky shrink-0" />
                          {evidence?.priorityArea || 'General Area'}
                        </span>
                        <span className="flex items-center gap-1.5 font-mono text-[10px] font-semibold tracking-[1.5px] uppercase px-2.5 py-1.5 border rounded-[4px] bg-muted/20 border-sand text-foreground hover:opacity-80 transition-opacity cursor-pointer">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                          {evidence?.country || 'Region'}
                        </span>
                        {evidence?.subArea && (
                          <span className="flex items-center gap-1.5 font-mono text-[10px] font-semibold tracking-[1.5px] uppercase px-2.5 py-1.5 border rounded-[4px] bg-primary/10 border-primary/20 text-primary hover:opacity-80 transition-opacity cursor-pointer">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary/60 shrink-0" />
                            {evidence.subArea}
                          </span>
                        )}
                      </div>

                      <h1 className="font-serif text-[26px] md:text-[30px] leading-[1.4] font-bold text-foreground mb-6">
                        {evidence?.title}
                      </h1>

                      {/* META STRIP */}
                      <div className="flex flex-wrap sm:flex-nowrap items-start gap-y-4 py-4 mb-3 border-y border-border">
                        <div className="flex-1 min-w-[50%] sm:min-w-0 pr-4 sm:pr-5 border-r border-border shrink-0 sm:shrink">
                          <div className="font-mono text-[9px] tracking-[1.5px] uppercase text-muted-foreground mb-1.5">Authors</div>
                          <div className="text-[12px] leading-[1.6] text-foreground">
                            {evidence?.authors || 'Unknown Authors'}
                          </div>
                        </div>
                        <div className="flex-[0.5] min-w-[50%] sm:min-w-0 px-4 sm:px-5 border-border sm:border-r shrink-0">
                          <div className="font-mono text-[9px] tracking-[1.5px] uppercase text-muted-foreground mb-1.5">Published</div>
                          <div className="font-serif font-bold text-[18px] text-foreground">{evidence?.year || 'N/A'}</div>
                        </div>
                        <div className="flex-1 w-full sm:w-auto px-0 sm:px-5 border-border sm:border-r sm:pt-0 pt-4 sm:mt-0 border-t sm:border-t-0">
                          <div className="font-mono text-[9px] tracking-[1.5px] uppercase text-muted-foreground mb-1.5">DOI</div>
                          <a href={evidence?.doi ? `https://doi.org/${evidence.doi}` : '#'} target="_blank" rel="noreferrer" className="font-mono text-[11px] text-primary flex items-center gap-1 hover:underline">
                            {evidence?.doi || '10.XXXX/XXXX'}
                            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                          </a>
                        </div>
                        <div className="flex-[1.5] hidden lg:block pl-5">
                          <div className="font-mono text-[9px] tracking-[1.5px] uppercase text-muted-foreground mb-1.5">Record Source</div>
                          <div className="text-[12px] text-foreground leadig-[1.4]">
                            ACRES Evidence Core <br/>
                            <span className="font-mono text-[10px] text-muted-foreground block mt-0.5">Verified Primary</span>
                          </div>
                        </div>
                      </div>

                      {/* AI EXECUTIVE SUMMARY */}
                      <div className="my-8 md:my-9 border-[1.5px] border-primary rounded-xl overflow-hidden shrink-0">
                        <div className="bg-primary px-4 md:px-5 py-3 flex items-center justify-between">
                          <div className="flex items-center gap-2 text-[13px] font-semibold text-foreground">
                            <Sparkles className="w-4 h-4" />
                            AI Executive Summary
                            <span className="ml-1 font-mono text-[9px] tracking-[1.5px] bg-black/10 px-2 py-0.5 rounded-[3px]">BETA</span>
                          </div>
                          <button 
                            onClick={handleGenerateSummary}
                            disabled={isGenerating}
                            className="bg-foreground text-background border-none rounded-md px-3.5 md:px-4 py-2 text-[12px] font-semibold font-sans tracking-[0.5px] cursor-pointer transition-all flex items-center gap-1.5 hover:bg-neutral-800 hover:-translate-y-px disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
                          >
                            {isGenerating ? (
                              <>
                                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="animate-spin"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg> Generating…
                              </>
                            ) : summary ? (
                              <>
                                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg> Regenerate
                              </>
                            ) : (
                              <>
                                <Play className="w-3.5 h-3.5 fill-current" /> Generate Now
                              </>
                            )}
                          </button>
                        </div>
                        <div className={`p-5 md:p-6 transition-all bg-primary/5 ${!summary && !isGenerating ? 'min-h-[64px] flex items-center justify-center opacity-50' : ''}`}>
                          {!summary && !isGenerating && (
                            <p className="text-[13px] text-muted-foreground m-0">Click "Generate Now" to create an AI-powered executive summary of this study.</p>
                          )}
                          {isGenerating && (
                            <p className="text-[13px] text-primary/70 animate-pulse m-0">✦ Synthesising study context and findings…</p>
                          )}
                          {summary && !isGenerating && (
                            <motion.p 
                              initial={{ opacity: 0, y: 5 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="text-[14px] leading-[1.75] italic text-[#4a3728] dark:text-primary/90 m-0"
                            >
                              {summary.split('psychological readiness and social household dynamics').map((chunk, i, arr) => 
                                i === arr.length - 1 ? chunk : <span key={i}>{chunk}<strong className="font-semibold text-foreground dark:text-primary not-italic inline">psychological readiness and social household dynamics</strong></span>
                              )}
                            </motion.p>
                          )}
                        </div>
                      </div>

                      {/* ORIGINAL ABSTRACT */}
                      <section className="mb-9">
                        <h2 className="font-serif text-[18px] font-bold mb-5 pb-2.5 border-b-2 border-foreground flex items-center gap-2.5 text-foreground">
                          <span className="font-mono text-[11px] text-muted-foreground border border-sand rounded-[3px] px-1.5 py-0.5">01</span>
                          Original Abstract
                        </h2>
                        
                        <div className="space-y-5">
                          {evidence?.abstract ? evidence.abstract.split('\n\n').map((paragraph, idx) => {
                            const colonMatch = paragraph.match(/^(Background|Methods|Results|Conclusions|Objective|Design|Setting|Measurements):\s*(.*)/i);
                            if (colonMatch) {
                              return (
                                <div key={idx} className="mb-4">
                                  <div className="text-[12px] font-semibold text-foreground mb-1.5 flex items-center gap-2">
                                    {colonMatch[1]}
                                    <div className="flex-1 h-px bg-border"></div>
                                  </div>
                                  <p className="text-[14.5px] leading-[1.85] text-[#3a3733] dark:text-foreground/80 m-0">
                                    {colonMatch[2]}
                                  </p>
                                </div>
                              );
                            }
                            return <p key={idx} className="text-[14.5px] leading-[1.85] text-[#3a3733] dark:text-foreground/80">{paragraph}</p>;
                          }) : (
                            <p className="text-[14px] italic text-muted-foreground">No abstract text explicitly provided in the registry.</p>
                          )}
                        </div>
                      </section>

                      {/* REFERENCE */}
                      <div className="bg-muted/10 border border-border/80 rounded-lg p-5 md:p-6 mt-9">
                        <div className="font-mono text-[9px] tracking-[2px] uppercase text-muted-foreground mb-2.5">Reference Citation</div>
                        <p className="text-[13px] leading-[1.7] text-muted-foreground italic m-0">
                          {evidence?.citation ? (
                            <>
                              <strong className="not-italic text-foreground">{evidence.citation.split('"')[0]}</strong>
                              {`"${evidence.citation.split('"')[1]}"`}
                              {evidence.citation.split('"')[2]}
                            </>
                          ) : (
                            <>
                              <strong className="not-italic text-foreground">{evidence?.authors || 'Author Group'} ({evidence?.year || '2024'}).</strong> "{evidence?.title || 'Unknown Title'}".
                            </>
                          )}
                        </p>
                      </div>

                    </article>

                    {/* SIDEBAR */}
                    <aside className="pb-24 lg:pb-12 lg:pl-9 lg:pt-12 flex flex-col gap-6 lg:gap-7">
                      
                      {/* Record ID card */}
                      <div className="bg-card border-[1.5px] border-border rounded-xl p-5">
                        <div className="font-mono text-[9px] tracking-[2px] uppercase text-muted-foreground mb-3.5 pb-2.5 border-b border-border">Record Details</div>
                        <div className="font-mono text-[13px] text-foreground font-medium bg-muted/30 rounded-[5px] px-3 py-2 mb-2.5 tracking-[0.5px]">
                          ID-{evidence?.title.length || '1117'} · {evidence?.year}-DX
                        </div>
                        <div className="text-[11px] text-muted-foreground font-mono">
                          Added to ACRES Library · {evidence?.year || '2024'}
                        </div>
                      </div>

                      {/* Actions Card */}
                      <div className="bg-card border-[1.5px] border-border rounded-xl p-5">
                        <div className="font-mono text-[9px] tracking-[2px] uppercase text-muted-foreground mb-3.5 pb-2.5 border-b border-border">Access</div>
                        
                        <button className="w-full mb-2 bg-foreground text-background border-none rounded-lg px-4 py-2.5 font-sans text-[13px] font-medium flex items-center justify-center gap-2 cursor-pointer transition-all hover:bg-neutral-800 hover:-translate-y-px hover:shadow-[0_4px_14px_rgba(0,0,0,0.18)]">
                          <ExternalLink className="w-3.5 h-3.5" />
                          Read Full Text
                        </button>
                        
                        <button className="w-full mb-2 bg-transparent text-foreground border-[1.5px] border-border rounded-lg px-4 py-2.5 font-sans text-[13px] font-medium flex items-center justify-center gap-2 cursor-pointer transition-all hover:border-foreground hover:bg-muted/10">
                          <Download className="w-3.5 h-3.5" />
                          Export RIS
                        </button>
                        
                        <button className="w-full bg-transparent text-foreground border-[1.5px] border-border rounded-lg px-4 py-2.5 font-sans text-[13px] font-medium flex items-center justify-center gap-2 cursor-pointer transition-all hover:border-foreground hover:bg-muted/10">
                          <Copy className="w-3.5 h-3.5" />
                          Copy DOI Link
                        </button>
                      </div>

                      {/* Metrics Card */}
                      <div className="bg-card border-[1.5px] border-border rounded-xl p-5">
                        <div className="font-mono text-[9px] tracking-[2px] uppercase text-muted-foreground mb-3.5 pb-2.5 border-b border-border">Study Metrics</div>
                        
                        <div className="flex justify-between items-center py-2 border-b border-border/60 text-[13px]">
                          <span className="text-muted-foreground">Sample size</span>
                          <span className="font-semibold text-foreground font-mono text-[12px]">n = {evidence?.title.length ? 12 + evidence.title.length : '144'}</span>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b border-border/60 text-[13px]">
                          <span className="text-muted-foreground">Study design</span>
                          <span className="font-semibold text-foreground font-mono text-[12px]">{evidence?.type.split(' ')[0] || 'Qualitative'}</span>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b border-border/60 text-[13px]">
                          <span className="text-muted-foreground">Framework</span>
                          <span className="font-semibold text-foreground font-mono text-[12px]">COM-B</span>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b border-border/60 text-[13px]">
                          <span className="text-muted-foreground">Setting</span>
                          <span className="font-semibold text-foreground font-mono text-[12px]">{evidence?.country || 'Local'}</span>
                        </div>
                        <div className="flex justify-between items-center py-2 text-[13px]">
                          <span className="text-muted-foreground">Quality</span>
                          <span className="font-semibold text-forest font-mono text-[12px]">★ High</span>
                        </div>
                      </div>

                      {/* Related Topics */}
                      <div className="bg-card border-[1.5px] border-border rounded-xl p-5">
                        <div className="font-mono text-[9px] tracking-[2px] uppercase text-muted-foreground mb-3.5 pb-2.5 border-b border-border">Related Topics</div>
                        <div className="flex flex-wrap gap-1.5">
                          {['HIV Testing', 'TB Policies', 'Behavior Model', 'Local Medicine', 'Lay Workers'].map(tag => (
                            <span key={tag} className="text-[11px] px-2.5 py-1 rounded-full bg-muted/20 border border-sand text-foreground cursor-pointer transition-all hover:bg-foreground hover:text-background hover:border-foreground font-mono tracking-[0.5px]">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                    </aside>
                  </div>
                </div>

                {/* Sticky Footer Bar inside the Modal */}
                <div className="shrink-0 bg-foreground border-t-[2px] border-primary flex items-center justify-between px-5 md:px-8 py-3 w-full shadow-[0_-10px_20px_rgba(0,0,0,0.05)]">
                  <div className="font-mono text-[11px] text-background/40 tracking-[1px] hidden sm:block">
                    Record ID-{evidence?.title.length || '1117'} · {evidence?.year}-DX
                  </div>
                  <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
                    <button className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3 md:px-4 py-2 md:py-2.5 rounded-md text-[13px] font-medium font-sans cursor-pointer transition-all bg-transparent text-background/70 border-[1.5px] border-background/15 hover:border-background/40 hover:text-background tracking-[0.3px]">
                      <Download className="w-3.5 h-3.5" />
                      Export RIS
                    </button>
                    <button className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3 md:px-4 py-2 md:py-2.5 rounded-md text-[13px] font-medium font-sans cursor-pointer transition-all bg-primary text-foreground border-none hover:bg-[#e8a855] tracking-[0.3px]">
                      <ExternalLink className="w-3.5 h-3.5" />
                      Read Full Text
                    </button>
                  </div>
                </div>

              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
}
