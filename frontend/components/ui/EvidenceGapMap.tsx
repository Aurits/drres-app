"use client";

import React, { useMemo } from "react";
import { EvidenceItem, OUTCOME_TAXONOMY, TAXONOMY_TREE } from "@/app/search/page";
import { motion } from "framer-motion";
import { Info } from "lucide-react";

interface EvidenceGapMapProps {
  evidence: EvidenceItem[];
  onSelectEvidence: (item: EvidenceItem) => void;
}

export const EvidenceGapMap: React.FC<EvidenceGapMapProps> = ({ evidence, onSelectEvidence }) => {
  // Flatten columns (Outcomes)
  const columns = useMemo(() => {
    return Object.entries(OUTCOME_TAXONOMY).flatMap(([category, outcomes]) => 
      outcomes.map(outcome => ({ category, name: outcome }))
    );
  }, []);

  // Flatten rows (Interventions/SDGs)
  const rows = useMemo(() => {
    return Object.entries(TAXONOMY_TREE).flatMap(([sdg, priorityAreas]) => 
      priorityAreas.map(pa => ({ sdg, name: pa.name }))
    );
  }, []);

  // Map evidence to grid cells
  const cellData = useMemo(() => {
    const map: Record<string, Record<string, EvidenceItem[]>> = {};
    evidence.forEach(item => {
      const pArea = item.priorityArea;
      const out = item.outcome || "General";
      if (!map[pArea]) map[pArea] = {};
      if (!map[pArea][out]) map[pArea][out] = [];
      map[pArea][out].push(item);
    });
    return map;
  }, [evidence]);

  const STYLES = {
    colHeaderPrimary: "bg-muted text-foreground font-serif font-bold text-[13px] leading-tight px-4 py-3 border-b-[1.5px] border-border",
    colHeaderSecondary: "bg-card text-muted-foreground font-sans text-[11px] px-3 py-4 border-r border-border border-b flex items-end justify-center",
    rowHeaderPrimary: "bg-primary text-[#141210] font-sans font-bold text-[10px] uppercase tracking-[2px] p-2 border-b border-[#141210]/10 writing-vertical shadow-sm",
    rowHeaderSecondary: "bg-card text-foreground font-serif text-[13px] font-medium leading-snug p-3 border-b border-border shadow-sm relative",
    gridCell: "bg-background border-r border-b border-border/60 relative flex items-center justify-center p-2 hover:bg-muted/30 transition-colors",
    dotReview: "bg-primary ring-2 ring-primary/40 shadow-sm",
    dotPrimary: "bg-forest shadow-sm", 
    dotPolicy: "bg-sky shadow-sm", 
    dotRapid: "bg-amber shadow-sm", 
  };

  const getDotClass = (type: string) => {
    if (type.includes("Systematic Review")) return STYLES.dotReview;
    if (type.includes("Primary")) return STYLES.dotPrimary;
    if (type.includes("Policy")) return STYLES.dotPolicy;
    return STYLES.dotRapid;
  };

  return (
    <div className="w-full h-full flex flex-col bg-background border-none relative overflow-hidden font-sans">
      
      {/* The Matrix Container */}
      <div className="flex-1 overflow-auto relative custom-scrollbar">
        <div 
          className="grid" 
          style={{ 
            gridTemplateColumns: `50px 220px repeat(${columns.length}, minmax(100px, 1fr))`,
            minWidth: "max-content"
          }}
        >
          {/* TOP HEADER BLOCK */}
          {/* Top-Left Empty Space for Row Headers */}
          <div className="sticky top-0 left-0 z-40 bg-card border-b-[1.5px] border-border col-span-2 row-span-2 shadow-sm">
            <div className="absolute bottom-3 right-3 text-[11px] text-muted-foreground font-mono tracking-widest uppercase">Outcomes {"->"}</div>
            <div className="absolute bottom-8 left-4 w-[100px] text-[11px] text-muted-foreground font-mono tracking-widest uppercase -rotate-90 origin-bottom-left">Interventions</div>
          </div>

          {/* Outcome Categories (Primary Columns) */}
          {Object.entries(OUTCOME_TAXONOMY).map(([category, outcomes]) => (
            <div 
              key={category}
              className={`sticky top-0 z-30 ${STYLES.colHeaderPrimary} border-l border-border/50 text-center shadow-sm`}
              style={{ gridColumn: `span ${outcomes.length}` }}
            >
              {category}
            </div>
          ))}

          {/* Specific Outcomes (Secondary Columns) */}
          {columns.map((col, i) => (
            <div 
              key={`${col.name}-${i}`}
              className={`sticky top-[42px] z-30 ${STYLES.colHeaderSecondary}`}
              style={{ borderLeft: i > 0 && columns[i-1].category !== col.category ? '2px solid var(--border)' : '' }}
            >
              <span className="text-center hyphens-auto inline-block">{col.name}</span>
            </div>
          ))}

          {/* MATRIX DATA ROWS */}
          {rows.map((row, rowIndex) => {
            const isSdgStart = rowIndex === 0 || rows[rowIndex - 1].sdg !== row.sdg;
            const rowSpan = isSdgStart ? rows.filter(r => r.sdg === row.sdg).length : 0;
            
            return (
              <React.Fragment key={`${row.name}-${rowIndex}`}>
                
                {/* Primary Row Header (SDG) */}
                {isSdgStart && (
                  <div 
                    className={`sticky left-0 z-20 ${STYLES.rowHeaderPrimary} flex items-center justify-center`}
                    style={{ gridRow: `span ${rowSpan}` }}
                  >
                    <span className="-rotate-90 whitespace-nowrap">{row.sdg.split(':')[1]?.trim() || row.sdg}</span>
                  </div>
                )}

                {/* Secondary Row Header (Priority Area) */}
                <div className={`sticky ${isSdgStart ? 'left-[50px]' : 'left-[50px] z-20'} z-20 ${STYLES.rowHeaderSecondary}`}>
                  {row.name}
                </div>

                {/* Cells */}
                {columns.map((col, colIndex) => {
                  const studies = cellData[row.name]?.[col.name] || [];
                  const isCategoryBorder = colIndex > 0 && columns[colIndex-1].category !== col.category;
                  
                  return (
                    <div 
                      key={`${row.name}-${col.name}`}
                      className={`${STYLES.gridCell} ${isCategoryBorder ? 'border-l-[2px]' : ''}`}
                    >
                      {studies.length > 0 && (
                        <div className="flex flex-wrap gap-2 justify-center max-w-[70px] cursor-pointer" onClick={() => onSelectEvidence(studies[0])}>
                          {studies.map((study, si) => (
                            <motion.div 
                              key={study.id}
                              whileHover={{ scale: 1.5, zIndex: 10 }}
                              className={`w-3 h-3 rounded-full opacity-90 transition-transform ${getDotClass(study.type)}`}
                              title={`${study.title}\n(${study.type})`}
                            />
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* Bottom Footer Legend */}
      <div className="flex items-center gap-8 px-6 py-4 bg-card text-[11px] font-sans font-medium text-foreground border-t border-border shrink-0 z-10 shadow-[0_-10px_20px_rgba(0,0,0,0.05)]">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-primary ring-2 ring-primary/40 shadow-sm"></div>
          <span>Systematic Review</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-forest shadow-sm"></div>
          <span>Primary Study</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-sky shadow-sm"></div>
          <span>Policy Brief</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-amber shadow-sm"></div>
          <span>Rapid Response</span>
        </div>
        <span className="ml-auto text-muted-foreground font-mono tracking-widest uppercase text-[9px]">DrRES Analytics</span>
      </div>
    </div>
  );
};
