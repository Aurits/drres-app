"use client";

import Link from "next/link";
import Image from "next/image";
import { Search, ArrowRight, Star, Clock, Download, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { useState, useRef } from "react";

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isDetached, setIsDetached] = useState(false);

  // Mock featured evidence
  const featuredEvidence = [
    {
      id: "DRRES-2025-001",
      title: "Impact of Climate-Resilient Subsidies on Smallholder Farmers in Uganda",
      abstract: "A comprehensive analysis of fiscal support mechanisms designed to mitigate drought impact among subsistence farmers in the cattle corridor...",
      type: "Policy Brief",
      sdg: "SDG 13",
      date: "March 2025"
    },
    {
      id: "DRRES-2025-004",
      title: "Tele-medicine Infrastructure Gaps in Rural Eastern Africa: A Synthesis",
      abstract: "Identifying the critical digital infrastructure barriers preventing the adoption of hybrid healthcare delivery models across off-grid communities...",
      type: "Rapid Response",
      sdg: "SDG 3",
      date: "Feb 2025"
    }
  ];

  return (
    <div ref={containerRef} className="flex flex-col w-full min-h-[calc(100vh-65px)] bg-background/30 overflow-y-auto relative scroll-smooth">
      
      {/* Minimalistic Background */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none sticky top-0 h-screen">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/5 to-transparent"></div>
        <div className="absolute top-1/4 left-[-10%] w-1/3 h-1/2 bg-gradient-to-r from-blue-500/5 to-transparent blur-3xl"></div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_0%,#000_20%,transparent_100%)]"></div>
      </div>

      {/* Hero Section */}
      <section className="relative z-10 w-full min-h-[calc(100vh-65px)] flex flex-col justify-center px-4 sm:px-6 lg:px-12 py-20 lg:py-0">
        <div className="container mx-auto w-full max-w-[1300px] flex flex-col lg:flex-row-reverse gap-10 xl:gap-20 items-center justify-between">
          
          {/* Main Column (Right): Typography & Search */}
          <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left z-20 w-full max-w-2xl lg:max-w-none">
            <div className="relative mb-6 pl-4 border-l-2 border-primary/40">
              <span className="font-serif italic text-base md:text-lg text-muted-foreground tracking-wide block">
                "Digital Evidence Hub"
              </span>
            </div>
            
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-[4.5rem] font-bold tracking-tight text-foreground mb-5 leading-[1.05]">
              Informing policy with <br className="hidden lg:block"/>
              <span className="text-primary/90 italic font-medium">rapid evidence.</span>
            </h1>
            
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-xl mb-8">
              Providing policymakers across Africa with immediate access to grounded, locally-relevant research synthesized for urgent decision-making.
            </p>
            
            <div className="relative w-full max-w-xl group z-20">
              <div className="relative flex items-center w-full rounded-[1.25rem] bg-background/80 backdrop-blur-md border border-border group-focus-within:border-primary/60 transition-all duration-300 overflow-hidden shadow-sm">
                <div className="pl-5 flex items-center shrink-0">
                  <Search className="h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                </div>
                <input
                  type="search"
                  className="block w-full h-[4rem] pl-4 pr-4 bg-transparent text-foreground text-lg outline-none focus:outline-none focus:ring-0 placeholder:text-muted-foreground/50 transition-all"
                  placeholder="Search literature or topics..."
                />
                <div className="pr-2 flex items-center shrink-0">
                  <Link 
                    href="/search"
                    className="px-6 py-2.5 bg-primary text-primary-foreground rounded-xl font-medium hover:bg-primary/90 transition-all text-base flex items-center gap-2"
                  >
                    Search
                  </Link>
                </div>
              </div>
            </div>
          </div>
          
          {/* Stats Panel */}
          <div 
            className="w-full max-w-[20rem] lg:w-[22rem] flex flex-col z-30 shrink-0 relative mt-8 lg:mt-0"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <motion.div 
              drag
              dragConstraints={containerRef}
              dragElastic={0.2}
              onDragStart={() => setIsDetached(true)}
              initial={false}
              animate={
                isDetached 
                  ? { scale: 1.4, rotate: 6, opacity: 1, zIndex: 40, boxShadow: "0px 20px 40px rgba(0,0,0,0.2)" }
                  : {
                      x: isHovered ? 40 : 0,
                      y: isHovered ? -60 : 0,
                      scale: isHovered ? 1.3 : 1,
                      rotate: isHovered ? 6 : 0,
                      opacity: isHovered ? 1 : 0.4,
                      zIndex: isHovered ? 40 : 10,
                    }
              }
              whileDrag={{ scale: 1.5, rotate: 12, cursor: "grabbing", zIndex: 50, opacity: 1 }}
              transition={{ type: "spring", stiffness: 250, damping: 20 }}
              className="absolute top-4 right-4 w-40 h-40 lg:w-48 lg:h-48 rounded-[2rem] border-[4px] border-card overflow-hidden shadow-sm cursor-grab origin-bottom-left bg-card"
            >
              <Image 
                src="/hero.png" 
                alt="Representative visual" 
                fill 
                className="object-cover pointer-events-none select-none" 
              />
            </motion.div>

            <div className="w-full bg-card/95 backdrop-blur-2xl border border-border/80 rounded-[2rem] p-8 lg:p-10 flex flex-col gap-8 relative z-20 shadow-sm">
              <div>
                <p className="text-5xl xl:text-6xl font-serif font-bold text-foreground tracking-tight">4,091</p>
                <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground mt-2">Evidence Products</p>
              </div>
              <div className="w-full h-px bg-border/40"></div>
              <div className="flex gap-6 lg:gap-8">
                <div className="flex flex-col">
                  <p className="text-3xl lg:text-4xl font-serif font-bold text-primary">71</p>
                  <p className="text-[9px] font-semibold uppercase tracking-wider text-muted-foreground mt-1.5 max-w-[90px] leading-tight">Rapid Briefs</p>
                </div>
                <div className="w-px bg-border/40"></div>
                <div className="flex flex-col">
                  <p className="text-3xl lg:text-4xl font-serif font-bold text-foreground">4,020</p>
                  <p className="text-[9px] font-semibold uppercase tracking-wider text-muted-foreground mt-1.5 max-w-[90px] leading-tight">Primary Studies</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Evidence Section */}
      <section className="relative z-20 w-full py-24 px-6 lg:px-12 bg-card/40 border-y border-border backdrop-blur-md">
        <div className="max-w-[1300px] mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div className="max-w-xl">
              <div className="flex items-center gap-2 mb-3">
                <Star className="w-4 h-4 text-primary fill-primary" />
                <span className="font-mono text-[10px] tracking-[2px] uppercase font-bold text-primary">High-Impact Evidence</span>
              </div>
              <h2 className="font-serif text-3xl lg:text-4xl font-bold text-foreground leading-tight">
                Policy Highlights & <br />Trending Synthesis.
              </h2>
            </div>
            <Link 
              href="/search" 
              className="group flex items-center gap-2 text-primary font-medium hover:text-primary/80 transition-all bg-primary/10 px-6 py-3 rounded-xl border border-primary/20"
            >
              Explore Full Library
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {featuredEvidence.map((item, idx) => (
              <div key={item.id} className="group relative bg-background border border-border rounded-2xl p-8 hover:border-primary/40 transition-all shadow-sm hover:shadow-xl hover:-translate-y-1 duration-300 overflow-hidden">
                <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                  <span className="font-serif italic text-6xl lg:text-8xl">{item.id.split('-').pop()}</span>
                </div>
                
                <div className="flex items-center gap-3 mb-6">
                  <span className="font-mono text-[9px] px-2 py-0.5 bg-primary/10 text-primary border border-primary/20 rounded uppercase font-bold tracking-wider">
                    {item.type}
                  </span>
                  <span className="font-mono text-[9px] px-2 py-0.5 bg-foreground/5 text-muted-foreground border border-border rounded uppercase font-bold tracking-wider">
                    {item.sdg}
                  </span>
                </div>

                <h3 className="font-serif text-xl lg:text-2xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors leading-snug">
                  {item.title}
                </h3>
                
                <p className="text-muted-foreground text-[14px] leading-relaxed mb-8 line-clamp-3">
                  {item.abstract}
                </p>

                <div className="flex items-center justify-between pt-6 border-t border-border/60">
                  <div className="flex items-center gap-4 text-[11px] text-muted-foreground font-mono">
                    <span className="flex items-center gap-1.5 uppercase font-bold tracking-widest">
                      ID: {item.id}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3 h-3" />
                      {item.date}
                    </span>
                  </div>
                  <button className="flex items-center gap-2 text-foreground font-semibold text-sm hover:text-primary transition-colors">
                    Read synthesis
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer Info */}
      <footer className="relative z-10 py-12 px-6 lg:px-12 text-center border-t border-border">
         <p className="text-[11px] font-mono uppercase tracking-[2px] text-muted-foreground/40">
           Digital Rapid Evidence Synthesis Hub — Hosted by ACRES © 2026
         </p>
      </footer>
    </div>
  );
}
