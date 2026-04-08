"use client";

import Link from "next/link";
import Image from "next/image";
import { Search } from "lucide-react";
import { motion } from "framer-motion";
import { useState, useRef } from "react";

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isDetached, setIsDetached] = useState(false);

  return (
    <div ref={containerRef} className="flex flex-col w-full h-[calc(100vh-65px)] min-h-[600px] bg-background/30 overflow-hidden relative">
      
      {/* Minimalistic Background - No heavy elements */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/5 to-transparent"></div>
        <div className="absolute top-1/4 left-[-10%] w-1/3 h-1/2 bg-gradient-to-r from-blue-500/5 to-transparent blur-3xl"></div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_0%,#000_20%,transparent_100%)]"></div>
      </div>

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-12 flex flex-col justify-center h-full">
        
        <div className="w-full max-w-[1300px] mx-auto flex flex-col lg:flex-row-reverse gap-10 xl:gap-20 items-center justify-between">
          
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
            
            {/* Minimal Search Bar - No heavy glows */}
            <div className="relative w-full max-w-xl group z-20">
              <div className="relative flex items-center w-full rounded-[1.25rem] bg-background/80 backdrop-blur-md border border-border group-focus-within:border-primary/60 transition-all duration-300 overflow-hidden shadow-sm">
                <div className="pl-5 flex items-center pointer-events-none shrink-0">
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
          
          {/* Right Column (Left visually): Stats Panel with Pop-out Avatar */}
          <div 
            className="w-full max-w-[20rem] lg:w-[22rem] flex flex-col z-30 shrink-0 relative mt-8 lg:mt-0"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            
            {/* Draggable Free-physics Avatar */}
            <motion.div 
              drag
              dragConstraints={containerRef}
              dragElastic={0.2}
              onDragStart={() => setIsDetached(true)}
              initial={false}
              animate={
                isDetached 
                  ? { 
                      scale: 1.4, 
                      rotate: 6, 
                      opacity: 1, 
                      filter: "grayscale(0%)", 
                      zIndex: 40,
                      borderColor: "rgba(100, 150, 255, 0.4)",
                      boxShadow: "0px 20px 40px rgba(0,0,0,0.2)"
                    }
                  : {
                      x: isHovered ? 40 : 0,
                      y: isHovered ? -60 : 0,
                      scale: isHovered ? 1.3 : 1,
                      rotate: isHovered ? 6 : 0,
                      opacity: isHovered ? 1 : 0.4,
                      filter: isHovered ? "grayscale(0%)" : "grayscale(100%)",
                      zIndex: isHovered ? 40 : 10,
                      borderColor: isHovered ? "rgba(100, 150, 255, 0.4)" : "rgba(128, 128, 128, 0.2)"
                    }
              }
              whileDrag={{ scale: 1.5, rotate: 12, cursor: "grabbing", zIndex: 50, filter: "grayscale(0%)", opacity: 1 }}
              transition={{ type: "spring", stiffness: 250, damping: 20 }}
              className="absolute top-4 right-4 w-40 h-40 lg:w-48 lg:h-48 rounded-[2rem] border-[4px] overflow-hidden shadow-sm cursor-grab origin-bottom-left bg-card"
            >
              <Image 
                src="/hero.png" 
                alt="Living Context Avatar" 
                fill 
                className="object-cover pointer-events-none select-none" 
              />
            </motion.div>

            {/* Solid Stats Card Component */}
            <div className="w-full bg-card/95 backdrop-blur-2xl border border-border/80 rounded-[2rem] p-8 lg:p-10 flex flex-col gap-8 text-center lg:text-left relative z-20 hover:border-border transition-colors duration-500 shadow-sm cursor-default">
              
              <div>
                <p className={`text-5xl xl:text-6xl font-serif font-bold text-foreground tracking-tight transition-transform duration-700 origin-left ${isHovered && !isDetached ? "scale-[1.03]" : ""}`}>4,091</p>
                <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground mt-2">Evidence Products</p>
              </div>
              
              <div className="w-full h-px bg-border/40"></div>
              
              <div className="flex gap-6 lg:gap-8 justify-center lg:justify-start">
                <div className="flex flex-col">
                  <p className="text-3xl lg:text-4xl font-serif font-bold text-primary">71</p>
                  <p className="text-[9px] font-semibold uppercase tracking-wider text-muted-foreground mt-1.5 max-w-[90px] leading-tight text-balance">Rapid Response Briefs</p>
                </div>
                
                <div className="w-px bg-border/40"></div>
                
                <div className="flex flex-col">
                  <p className="text-3xl lg:text-4xl font-serif font-bold text-foreground">4,020</p>
                  <p className="text-[9px] font-semibold uppercase tracking-wider text-muted-foreground mt-1.5 max-w-[90px] leading-tight text-balance">Indexed Primary Studies</p>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
