"use client";

import { Suspense, useState, useEffect, useMemo, useCallback } from "react";
import { EvidenceSheet } from "@/components/ui/EvidenceSheet";
import Link from "next/link";
import { Search, SlidersHorizontal, ArrowUpDown, Clock, ExternalLink, ChevronDown, ChevronLeft, ChevronRight, Sun, Moon, LayoutGrid, LayoutList } from "lucide-react";
import { useTheme } from "next-themes";
import { useSearchParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { EvidenceGapMap } from "@/components/ui/EvidenceGapMap";

export type EvidenceItem = {
  id: number;
  title: string;
  type: string;
  sdg: string;
  abstract: string;
  authors: string;
  year: string;
  country: string;
  priorityArea: string;
  subArea: string;
  doi?: string;
  citation?: string;
  uniqueId: string;
  isFeatured?: boolean;
  outcomeCategory?: string;
  outcome?: string;
}

export type TaxonomyNode = {
  name: string;
  subAreas: string[];
};

export const TAXONOMY_TREE: Record<string, TaxonomyNode[]> = {
  "SDG 3: Good Health": [
    {
      name: "Addressing Barriers for Accessible Healthcare",
      subAreas: ["Health Financing", "Health Infrastructure", "Geographical Accessibility"]
    },
    {
      name: "Communicable Diseases",
      subAreas: ["Awareness of Communicable Diseases", "Management of Communicable Diseases", "Disease Surveillance"]
    },
    {
      name: "Global Health Security",
      subAreas: ["Emergency Preparedness", "Immunization Coverage"]
    }
  ],
  "SDG 4: Quality Education": [
    {
      name: "Digital Infrastructure",
      subAreas: ["EdTech Availability", "Broadband Access", "Teacher Training in IT"]
    },
    {
      name: "Curriculum Reform",
      subAreas: ["STEM Education", "Vocational Training"]
    }
  ],
  "SDG 13: Climate Action": [
    {
      name: "Food Security",
      subAreas: ["Crop Subsidies", "Soil Moisture Retention", "Drought Resistance"]
    },
    {
      name: "Renewable Energy Transition",
      subAreas: ["Solar Micro-grids", "Policy Frameworks"]
    }
  ]
};

export const OUTCOME_TAXONOMY: Record<string, string[]> = {
  "Health & Well-being": ["Maternal Mortality", "Morbidity Rates", "Healthcare Access", "Life Expectancy"],
  "Environmental Impact": ["Biodiversity Loss", "Soil Quality", "Water Purity", "Carbon Sequestration"],
  "Social & Gender": ["Literacy levels", "Gender Equality", "Poverty Reduction", "Community Agency"],
  "Economic Growth": ["GDP Growth", "Household Income", "Market Stability", "Labor Productivity"]
};

const BASE_MOCK: EvidenceItem[] = [
  {
    id: 1,
    uniqueId: "DRRES-2018-774",
    title: "\"Give Me Some Time\": Facilitators of and Barriers to Uptake of Home-Based HIV Testing During Household Contact Investigation for Tuberculosis in Kampala, Uganda",
    type: "Primary Study",
    sdg: "SDG 3: Good Health",
    abstract: "Background: Integrating home-based HIV counseling and testing (HCT) with tuberculosis (TB) evaluation could improve the uptake of HIV testing among household contacts of patients with active TB. We sought to identify the facilitators of and barriers to HCT during household contact investigation for TB in Kampala, Uganda.",
    authors: "Armstrong-Hough M, Ggita J, Ayakaka I, Dowdy D, Cattamanchi A, Haberer JE, Katamba A, Davis JL",
    year: "2018",
    country: "Uganda",
    priorityArea: "Health Systems",
    subArea: "Disease Surveillance",
    doi: "10.1097/QAI.0000000000001617",
    citation: "Armstrong-Hough M, Ggita J, Ayakaka I, Dowdy D, Cattamanchi A, Haberer JE, Katamba A, and Davis JL (2018) \"Give Me Some Time\": Facilitators of and Barriers to Uptake of Home-Based HIV Testing During Household Contact Investigation for Tuberculosis in Kampala, Uganda. JAIDS-JOURNAL OF ACQUIRED IMMUNE DEFICIENCY SYNDROMES 77(4), 400-404"
  },
  {
    id: 2,
    uniqueId: "DRRES-2024-015",
    title: "Climate-Resilient Agriculture Policies for Sub-Saharan Drylands",
    type: "Systematic Review",
    sdg: "SDG 13: Climate Action",
    abstract: "A comprehensive review of 144 pilot programs testing drought-resistant crop subsidies and soil moisture retention techniques across Sub-Saharan Africa. Findings suggest immediate financial decoupling of water taxes to aid local farmers. The implementation of scalable irrigation infrastructure coupled with modern predictive meteorological models proved critical in mitigating seasonal crop failures. We propose a multi-faceted approach involving local governance, private sector investment, and NGO oversight to create a sustainable agricultural ecosystem capable of withstanding severe climate shocks projected over the next decade.",
    authors: "Institute for Climate Impact",
    year: "2024",
    country: "Sub-Saharan Africa",
    priorityArea: "Food Security",
    subArea: "Crop Subsidies"
  },
  {
    id: 3,
    uniqueId: "DRRES-2024-082",
    title: "AI in Primary Education: Infrastructure Requirements for Rural Deployment",
    type: "Policy Brief",
    sdg: "SDG 4: Quality Education",
    abstract: "Analysis of localized LLM deployment in off-grid educational facilities, highlighting the necessary hardware infrastructure and policy shifts required at the district level for scalable integration. By establishing isolated mesh networks utilizing solar-powered micro-servers, remote schools significantly bypassed traditional internet connectivity hurdles. Pedagogical outcomes demonstrated a marked improvement in digital literacy among primary educators, though limitations regarding hardware durability and technical maintenance persisted.",
    authors: "African Tech Policy Network",
    year: "2024",
    country: "Kenya",
    priorityArea: "Digital Infrastructure",
    subArea: "Broadband Access"
  }
];

// Extrapolate to 60 records dynamically to fill the grid out
const MOCK_EVIDENCE: EvidenceItem[] = Array.from({ length: 60 }).map((_, i) => {
  const base = BASE_MOCK[i % BASE_MOCK.length];
  const years = ["2025", "2024", "2023", "2022"];
  
  // Assign a valid taxonomy branch based on the base SDG
  const availableTaxonomy = TAXONOMY_TREE[base.sdg] || TAXONOMY_TREE["SDG 3: Good Health"];
  const selectedPriorityArea = availableTaxonomy[i % availableTaxonomy.length];
  const selectedSubArea = selectedPriorityArea.subAreas[i % selectedPriorityArea.subAreas.length];

  return {
    ...base,
    id: i + 1,
    uniqueId: `DRRES-${years[i % years.length]}-${(i + 1).toString().padStart(3, '0')}`,
    title: i < 3 ? base.title : `${base.title} ${i > 10 ? `(Meta-Analysis Vol ${i})` : `(Phase ${i})`}`,
    year: i < 3 ? base.year : years[i % years.length],
    priorityArea: selectedPriorityArea.name,
    subArea: selectedSubArea,
    outcomeCategory: Object.keys(OUTCOME_TAXONOMY)[i % Object.keys(OUTCOME_TAXONOMY).length],
    outcome: OUTCOME_TAXONOMY[Object.keys(OUTCOME_TAXONOMY)[i % Object.keys(OUTCOME_TAXONOMY).length]][i % 4],
    isFeatured: i === 1 // Mock one item as featured initially
  };
});


function SearchContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [selectedEvidence, setSelectedEvidence] = useState<EvidenceItem | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("relevance");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [paramsInitialized, setParamsInitialized] = useState(false);
  const [viewMode, setViewMode] = useState<"list" | "map">("list");
  
  useEffect(() => { setMounted(true); }, []);

  // Advanced Filter State
  const [activeFilters, setActiveFilters] = useState<{ [key: string]: string[] }>({
    type: [],
    sdg: [],
    country: [],
    subArea: []
  });

  const [expandedAreas, setExpandedAreas] = useState<string[]>(Object.keys(TAXONOMY_TREE));

  // ── Read URL params on mount ──
  useEffect(() => {
    const q = searchParams.get("q") || "";
    const sdg = searchParams.getAll("sdg");
    const type = searchParams.getAll("type");
    const subArea = searchParams.getAll("subArea");
    const sort = searchParams.get("sort") || "relevance";

    setSearchQuery(q);
    setSortBy(sort);
    if (sdg.length || type.length || subArea.length) {
      setActiveFilters(prev => ({
        ...prev,
        sdg: sdg.length ? sdg : prev.sdg,
        type: type.length ? type : prev.type,
        subArea: subArea.length ? subArea : prev.subArea,
      }));
    }
    setParamsInitialized(true);
  // only run once on mount
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── Write filter state back to URL ──
  const syncToUrl = useCallback((filters: { [key: string]: string[] }, query: string, sort: string) => {
    const params = new URLSearchParams();
    if (query) params.set("q", query);
    if (sort !== "relevance") params.set("sort", sort);
    for (const val of filters.sdg) params.append("sdg", val);
    for (const val of filters.type) params.append("type", val);
    for (const val of filters.subArea) params.append("subArea", val);
    const qs = params.toString();
    router.replace(`/search${qs ? `?${qs}` : ""}`, { scroll: false });
  }, [router]);

  // Sync to URL whenever filters, query, or sort change (after initial load)
  useEffect(() => {
    if (!paramsInitialized) return;
    syncToUrl(activeFilters, searchQuery, sortBy);
  }, [activeFilters, searchQuery, sortBy, paramsInitialized, syncToUrl]);

  const toggleAccordion = (area: string) => {
    setExpandedAreas(prev => 
      prev.includes(area) ? prev.filter(a => a !== area) : [...prev, area]
    );
  };

  const toggleFilter = (category: string, value: string) => {
    setActiveFilters(prev => {
      const current = prev[category];
      return {
        ...prev,
        [category]: current.includes(value) 
          ? current.filter(v => v !== value) 
          : [...current, value]
      };
    });
    setCurrentPage(1);
  };

  // Filter 
  const filteredEvidence = useMemo(() => {
    return MOCK_EVIDENCE.filter(item => {
      const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            item.abstract.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesType = activeFilters.type.length === 0 || activeFilters.type.includes(item.type);
      const matchesSdg = activeFilters.sdg.length === 0 || activeFilters.sdg.includes(item.sdg);
      // Simplify country match. Exact match or "Sub-Saharan Africa" encompasses countries
      const matchesCountry = activeFilters.country.length === 0 || activeFilters.country.includes(item.country) || (activeFilters.country.includes("Sub-Saharan Africa") && ["Uganda", "Kenya", "Sub-Saharan Africa"].includes(item.country));
      
      const matchesSubArea = activeFilters.subArea.length === 0 || activeFilters.subArea.includes(item.subArea);

      return matchesSearch && matchesType && matchesSdg && matchesCountry && matchesSubArea;
    });
  }, [searchQuery, activeFilters]);

  // Sort
  const sortedEvidence = useMemo(() => {
    return [...filteredEvidence].sort((a, b) => {
      if (sortBy === "year-desc") {
        return parseInt(b.year) - parseInt(a.year);
      }
      if (sortBy === "title-asc") {
        return a.title.localeCompare(b.title);
      }
      return 0; // relevance (default to mock order)
    });
  }, [filteredEvidence, sortBy]);

  // Paginate
  const totalPages = Math.max(1, Math.ceil(sortedEvidence.length / itemsPerPage));
  const paginatedEvidence = sortedEvidence.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Reset page on search
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, sortBy]);

  return (
    <div className="flex items-start w-full h-screen bg-background overflow-hidden relative z-10 shell-grid">
      
      {/* Faceted Filter Sidebar - Static Full Height */}
      <aside className="w-[280px] lg:w-[320px] bg-[#141210] text-[#ede9e0] hidden md:flex flex-col flex-shrink-0 h-full border-r border-[#ede9e0]/8">
        
        {/* Sidebar Brand Header */}
        <div className="px-6 pt-5 pb-4 border-b border-[#ede9e0]/8 shrink-0 flex items-center justify-between">
          <div>
            <Link href="/" className="flex items-center gap-2 group">
              <ChevronLeft className="w-4 h-4 text-[#ede9e0]/40 group-hover:text-primary group-hover:-translate-x-0.5 transition-all" />
              <span className="font-serif font-bold text-[18px] text-[#ede9e0]">Dr-RES</span>
              <span className="font-mono text-[9px] text-primary tracking-[2px] uppercase font-bold">ACRES</span>
            </Link>
            <p className="text-[11px] text-[#ede9e0]/35 mt-1.5 pl-6 font-mono tracking-[0.5px]">Evidence Library</p>
          </div>
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="p-2 rounded-lg bg-[#ede9e0]/10 border border-[#ede9e0]/10 text-[#ede9e0]/60 hover:text-[#ede9e0] hover:bg-[#ede9e0]/15 transition-all cursor-pointer"
            aria-label="Toggle theme"
          >
            {mounted && theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
        </div>

        {/* Invisible Scrollbar Container */}
        <div className="flex-1 overflow-y-auto pt-5 p-6 space-y-7 pb-8 [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-[#ede9e0]/10 [&::-webkit-scrollbar-thumb]:rounded">
          
          {/* Sidebar Search */}
          <div className="relative">
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search evidence..." 
              className="w-full bg-[#ede9e0]/5 border border-[#ede9e0]/10 rounded-md py-2.5 px-3.5 pr-10 text-[13px] font-sans text-[#ede9e0] outline-none focus:border-primary transition-colors placeholder:text-[#ede9e0]/30"
            />
            <Search className="absolute right-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#ede9e0]/30" />
          </div>

          {/* Document Type Filter */}
          <div className="space-y-3">
            <h3 className="font-mono text-[10px] tracking-[2px] text-primary uppercase pl-5 mb-2 block">Document Type</h3>
            <div className="space-y-1">
              {['Primary Study', 'Systematic Review', 'Policy Brief', 'Rapid Response'].map(type => {
                const isChecked = activeFilters.type.includes(type);
                return (
                  <label key={type} className={`flex items-center gap-2.5 px-5 py-2 cursor-pointer transition-colors text-[13px] ${isChecked ? 'text-[#ede9e0]' : 'text-[#ede9e0]/65 hover:bg-[#ede9e0]/5 hover:text-[#ede9e0]'}`}>
                    <input type="checkbox" className="hidden" checked={isChecked} onChange={() => toggleFilter('type', type)} />
                    <div className={`w-4 h-4 rounded-[3px] border-[1.5px] shrink-0 flex items-center justify-center transition-all ${isChecked ? 'bg-primary border-primary' : 'border-[#ede9e0]/20'}`}>
                      {isChecked && <span className="text-[10px] text-[#141210] font-bold leading-none">✓</span>}
                    </div>
                    <span className="font-medium">{type}</span>
                    <span className="ml-auto font-mono text-[10px] bg-[#ede9e0]/10 px-1.5 py-0.5 rounded-[10px] text-[#ede9e0]/60">1</span>
                  </label>
                )
              })}
            </div>
          </div>
          
          <hr className="border-t border-[#ede9e0]/5 mx-5 my-2" />

          {/* Taxonomy Filters (Priority Areas & Sub-areas Grouped by SDG) */}
          {Object.entries(TAXONOMY_TREE).map(([sdg, priorityAreas]) => (
            <div key={sdg} className="space-y-2 mb-4">
              <h3 className="font-mono text-[10px] tracking-[2px] text-primary uppercase pl-5 mb-1.5 block">
                {sdg.split(':')[1]?.trim() || sdg}
              </h3>
              
              <div className="space-y-0.5">
                {priorityAreas.map(pa => {
                  const isExpanded = expandedAreas.includes(pa.name);
                  return (
                    <div key={pa.name} className="flex flex-col">
                      <button 
                        onClick={() => toggleAccordion(pa.name)}
                        className="flex items-center justify-between px-5 py-2 hover:bg-[#ede9e0]/5 transition-colors text-left w-full"
                      >
                        <div className="flex items-center gap-2.5">
                          <ChevronDown className={`w-3.5 h-3.5 text-[#ede9e0]/50 transition-transform duration-200 ${!isExpanded ? '-rotate-90' : ''}`} />
                          <span className={`text-[13px] font-medium transition-colors ${isExpanded ? 'text-[#ede9e0]' : 'text-[#ede9e0]/80'}`}>
                            {pa.name}
                          </span>
                        </div>
                        <span className="font-mono text-[10px] bg-[#ede9e0]/5 px-1.5 py-0.5 rounded-[10px] text-[#ede9e0]/50 tracking-[0.5px]">
                          {pa.subAreas.length}
                        </span>
                      </button>
                      
                      {/* Sub-areas Dropdown */}
                      {isExpanded && (
                        <div className="flex flex-col pl-[42px] pr-5 py-1.5 space-y-0.5 bg-[#100e0c] border-y border-[#ede9e0]/5 my-1">
                          {pa.subAreas.map(sub => {
                            const isChecked = activeFilters.subArea.includes(sub);
                            // Calculate dynamic count based on total mock dataset (not filtered dataset, to show total available per tag)
                            const count = MOCK_EVIDENCE.filter(e => e.subArea === sub).length;
                            
                            return (
                              <label key={sub} className={`flex items-start gap-2.5 py-1.5 cursor-pointer transition-colors text-[12px] group ${isChecked ? 'text-[#ede9e0]' : 'text-[#ede9e0]/60 hover:text-[#ede9e0]'}`}>
                                <input type="checkbox" className="hidden" checked={isChecked} onChange={() => toggleFilter('subArea', sub)} />
                                <div className={`w-[14px] h-[14px] mt-[1.5px] rounded-[3px] border-[1.5px] shrink-0 flex items-center justify-center transition-all ${isChecked ? 'bg-primary border-primary' : 'border-[#ede9e0]/20 group-hover:border-[#ede9e0]/40'}`}>
                                  {isChecked && <span className="text-[9px] text-[#141210] font-bold leading-none">✓</span>}
                                </div>
                                <span className="font-medium leading-[1.3] text-[12px]">{sub}</span>
                                <span className="ml-auto font-mono text-[9px] text-[#ede9e0]/40 mt-0.5 shrink-0 group-hover:text-[#ede9e0]/60 transition-colors">({count})</span>
                              </label>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
          
          <hr className="border-t border-[#ede9e0]/5 mx-5 my-2" />
          
          {/* Country Filter */}
          <div className="space-y-3">
            <h3 className="font-mono text-[10px] tracking-[2px] text-primary uppercase pl-5 mb-2 block">Region / Country</h3>
            <div className="space-y-1">
              {['Sub-Saharan Africa', 'Kenya', 'Uganda'].map(type => {
                const isChecked = activeFilters.country.includes(type);
                return (
                  <label key={type} className={`flex items-center gap-2.5 px-5 py-2 cursor-pointer transition-colors text-[13px] ${isChecked ? 'text-[#ede9e0]' : 'text-[#ede9e0]/65 hover:bg-[#ede9e0]/5 hover:text-[#ede9e0]'}`}>
                    <input type="checkbox" className="hidden" checked={isChecked} onChange={() => toggleFilter('country', type)} />
                    <div className={`w-4 h-4 rounded-[3px] border-[1.5px] shrink-0 flex items-center justify-center transition-all ${isChecked ? 'bg-primary border-primary' : 'border-[#ede9e0]/20'}`}>
                      {isChecked && <span className="text-[10px] text-[#141210] font-bold leading-none">✓</span>}
                    </div>
                    <span className="font-medium">{type}</span>
                    <span className="ml-auto font-mono text-[10px] bg-[#ede9e0]/10 px-1.5 py-0.5 rounded-[10px] text-[#ede9e0]/60">1</span>
                  </label>
                )
              })}
            </div>
          </div>

        </div>

        <div className="p-5 border-t border-[#ede9e0]/10 bg-[#141210] shrink-0 z-10 w-full relative">
          <button className="w-full bg-primary text-[#141210] font-sans text-[13px] font-semibold tracking-[0.5px] rounded-md py-3.5 hover:bg-[#e8a855] hover:-translate-y-px transition-all">
            Apply Filters — {filteredEvidence.length} items
          </button>
        </div>
      </aside>

      {/* Main Content Area - Scrollable */}
      <div className="flex-1 min-w-0 bg-background h-full overflow-y-auto">
        <div className={`mx-auto w-full min-h-full flex flex-col ${viewMode === 'map' ? 'max-w-none' : 'max-w-[1050px] px-10 lg:px-14 py-8 lg:py-10 pb-24'}`}>
          
          {/* Main Top Header */}
          <div className={`shrink-0 ${viewMode === 'map' ? 'px-8 py-6 bg-card border-b border-border/40' : 'mb-6'}`}>
            
            {/* Top Bar: Results count + Sort + Active pills */}
            <div className="flex flex-col gap-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between w-full gap-4">
                
                {/* Left: Title + Count */}
                <div className="flex items-baseline gap-3">
                  <h1 className="font-serif text-[26px] lg:text-[28px] font-bold text-foreground leading-none">Evidence</h1>
                  <span className="font-mono text-[12px] text-muted-foreground tracking-[1px] bg-muted/30 px-2.5 py-1 rounded-[4px] border border-border">{sortedEvidence.length} records</span>
                </div>

                {/* Right: Sort + View Toggle */}
                <div className="flex items-center gap-4 shrink-0">
                  {/* View Switcher */}
                  <div className="flex items-center bg-muted/30 p-1 rounded-lg border border-border">
                    <button 
                      onClick={() => setViewMode("list")}
                      className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-[12px] font-medium transition-all ${viewMode === 'list' ? 'bg-foreground text-background shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}
                    >
                      <LayoutList className="w-3.5 h-3.5" />
                      List
                    </button>
                    <button 
                      onClick={() => setViewMode("map")}
                      className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-[12px] font-medium transition-all ${viewMode === 'map' ? 'bg-foreground text-background shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}
                    >
                      <LayoutGrid className="w-3.5 h-3.5" />
                      Gap Map
                    </button>
                  </div>

                  <div className="h-4 w-px bg-border mx-1 hidden sm:block"></div>

                  <div className="flex items-center gap-3">
                    <span className="text-[12px] text-muted-foreground hidden sm:block">Sort by</span>
                    <select 
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="border-[1.5px] border-border rounded-lg px-4 py-2.5 font-sans text-[13px] bg-card cursor-pointer outline-none text-foreground shadow-sm hover:border-foreground/30 transition-colors"
                    >
                      <option value="relevance">Relevance</option>
                      <option value="year-desc">Most Recent</option>
                      <option value="title-asc">A → Z</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Active Filters Pills */}
              {(activeFilters.type.length > 0 || activeFilters.sdg.length > 0 || activeFilters.country.length > 0 || activeFilters.subArea.length > 0) && (
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[11px] text-muted-foreground mr-0.5 font-mono tracking-[1px] uppercase">Filters:</span>
                  {Object.entries(activeFilters).flatMap(([category, values]) => 
                    values.map(val => (
                      <div 
                        key={`${category}-${val}`} 
                        onClick={() => toggleFilter(category, val)}
                        className="flex items-center gap-1.5 bg-foreground text-background px-3 py-1 rounded-full text-[11px] cursor-pointer hover:bg-rose hover:text-white transition-colors shadow-sm font-medium"
                      >
                        {val} <span className="opacity-60 text-[13px] leading-none ml-0.5">×</span>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
          </div>
            
          {/* Results Container */}
          <div className="flex flex-col gap-4 content-start flex-1 mb-10 min-h-0">
            <AnimatePresence mode="wait">
              {viewMode === 'list' ? (
                <motion.div 
                  key="list-view"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="flex flex-col gap-4"
                >
                  {paginatedEvidence.length > 0 ? (
                    paginatedEvidence.map((item, idx) => (
                      <div 
                        key={item.id} 
                        onClick={() => setSelectedEvidence(item)}
                        className="bg-card border-[1.5px] border-border rounded-xl p-6 lg:p-7 relative overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-[3px] hover:shadow-[0_16px_48px_rgba(0,0,0,0.10)] hover:border-primary/30 group"
                      >
                        <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-border transition-all duration-300 group-hover:bg-primary"></div>
                        
                        <div className="flex flex-wrap gap-1.5 mb-3">
                          <span className="font-mono text-[10px] tracking-[1.5px] uppercase px-2.5 py-1 rounded-[4px] font-medium bg-foreground text-background">
                            {item.type}
                          </span>
                          <span className={`font-mono text-[10px] tracking-[1.5px] uppercase px-2.5 py-1 rounded-[4px] font-bold border ${item.sdg.includes('SDG 3') ? 'bg-forest/10 text-forest border-forest/20' : item.sdg.includes('SDG 13') ? 'bg-sky/10 text-sky border-sky/20' : 'bg-amber/10 text-amber border-amber/20'}`}>
                            {item.sdg.split(':')[0]}
                          </span>
                          <span className="font-mono text-[10px] tracking-[1.5px] uppercase px-2.5 py-1 rounded-[4px] font-medium bg-muted/50 text-foreground border border-border">
                            {item.priorityArea}
                          </span>
                          <span className="font-mono text-[10px] tracking-[1.5px] uppercase px-2.5 py-1 rounded-[4px] font-medium bg-primary/5 text-primary border border-primary/20">
                            {item.outcome}
                          </span>
                        </div>
                        
                        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-3">
                          <h3 className="font-serif text-[18px] md:text-[20px] leading-[1.45] text-foreground font-bold group-hover:text-primary transition-colors">
                            {item.title}
                          </h3>
                          <div className="shrink-0 flex items-center gap-2">
                            <span className="font-mono text-[10px] text-muted-foreground/60 tracking-wider">ID: {item.uniqueId}</span>
                          </div>
                        </div>
                        
                        <p className="text-[13px] leading-[1.75] text-muted-foreground mb-4 line-clamp-2">
                          {item.abstract}
                        </p>
                        
                        <div className="flex items-center justify-between gap-3 pt-3 border-t border-border/60">
                          <div className="font-mono text-[10px] tracking-[0.5px] text-muted-foreground leading-relaxed flex-1 line-clamp-1">
                            {item.authors}
                          </div>
                          
                          <div className="flex items-center gap-3 shrink-0">
                            <div className="flex items-center gap-1 text-[11px] text-muted-foreground font-mono">
                              <Clock className="w-3 h-3 opacity-40" />
                              {item.year}
                            </div>
                            <span className="bg-foreground text-background font-mono text-[9px] tracking-[1.5px] uppercase px-2 py-0.5 rounded-[3px]">
                              {item.country}
                            </span>
                            <button className="opacity-0 group-hover:opacity-100 bg-primary text-foreground border-none rounded-md px-3 py-1.5 font-sans text-[11px] font-semibold transition-all flex items-center gap-1.5 hover:bg-[#e8a855]">
                              <ExternalLink className="w-3 h-3" />
                              View
                            </button>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-20 bg-muted/20 border border-dashed border-border/60 rounded-2xl w-full">
                      <Search className="w-10 h-10 text-muted-foreground/30 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-foreground mb-1">No evidence found</h3>
                      <p className="text-muted-foreground text-sm">Try adjusting your search criteria or filters.</p>
                    </div>
                  )}
                </motion.div>
              ) : (
                <motion.div 
                  key="map-view"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                  className="h-[calc(100vh-140px)] w-full"
                >
                  <EvidenceGapMap 
                    evidence={filteredEvidence} 
                    onSelectEvidence={setSelectedEvidence} 
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && viewMode === 'list' && (
            <div className="flex flex-col sm:flex-row items-center justify-between pt-6 mt-2 border-t border-border/40 gap-4 shrink-0">
              <span className="text-[12px] text-muted-foreground font-mono tracking-[0.5px]">
                Showing <span className="font-semibold text-foreground">{(currentPage - 1) * itemsPerPage + 1}</span>–<span className="font-semibold text-foreground">{Math.min(currentPage * itemsPerPage, sortedEvidence.length)}</span> of <span className="font-semibold text-foreground">{sortedEvidence.length}</span>
              </span>
              <div className="flex items-center gap-1.5">
                <button 
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="p-2 rounded-md border border-border/60 bg-card hover:bg-muted text-foreground disabled:opacity-25 disabled:cursor-not-allowed transition-all"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-9 h-9 rounded-md text-[13px] font-semibold transition-all ${
                      page === currentPage 
                        ? 'bg-foreground text-background shadow-sm' 
                        : 'bg-card border border-border/60 text-foreground hover:bg-muted'
                    }`}
                  >
                    {page}
                  </button>
                ))}
                <button 
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="p-2 rounded-md border border-border/60 bg-card hover:bg-muted text-foreground disabled:opacity-25 disabled:cursor-not-allowed transition-all"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}

        </div>
      </div>

      <EvidenceSheet 
        open={selectedEvidence !== null} 
        onOpenChange={(open) => !open && setSelectedEvidence(null)}
        evidence={selectedEvidence || undefined}
      />
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center w-full h-screen bg-background">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          <p className="font-mono text-sm text-muted-foreground animate-pulse uppercase tracking-widest">Initialising Library...</p>
        </div>
      </div>
    }>
      <SearchContent />
    </Suspense>
  );
}
