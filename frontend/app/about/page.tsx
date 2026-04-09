import Image from "next/image";
import { BookOpen, Globe2, ShieldCheck, Users, MapPin, Mail, Phone } from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="flex flex-col w-full h-[calc(100vh-64px)] bg-background overflow-hidden relative">
      
      {/* Minimalistic Background */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[80%] h-full bg-gradient-to-l from-primary/5 to-transparent"></div>
        <div className="absolute top-1/4 left-[-10%] w-1/3 h-1/2 bg-gradient-to-r from-blue-500/5 to-transparent blur-3xl"></div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_0%,#000_20%,transparent_100%)]"></div>
      </div>

      <div className="relative z-10 flex flex-col h-full">
        
        {/* Top Section: Hero */}
        <div className="flex-1 flex items-center px-6 lg:px-12">
          <div className="max-w-[1300px] mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-10 xl:gap-16 items-center">
            
            {/* Left: Text */}
            <div className="flex flex-col items-start">
              <div className="relative mb-4 pl-4 border-l-2 border-primary/40">
                <span className="font-mono text-[10px] tracking-[2px] uppercase font-bold text-primary block">
                  The Platform
                </span>
              </div>
              
              <h1 className="font-serif text-3xl sm:text-4xl lg:text-[3.2rem] font-bold tracking-tight text-foreground mb-3 leading-[1.1]">
                Digital Evidence Hub <br />
                <span className="text-primary italic font-medium">Dr-RES.</span>
              </h1>
              
              <p className="text-sm md:text-[14px] text-muted-foreground leading-relaxed max-w-lg mb-5">
                The Digital Rapid Evidence Synthesis (Dr-RES) Hub is Africa's premier platform for evidence-informed decision making. It provides policymakers with immediate access to grounded, locally-relevant research synthesized for urgent policy needs. 
                <br /><br />
                Hosted by <strong>ACRES</strong>, the hub bridges the gap between global knowledge and national policy action through rigorous synthesis and digital innovation.
              </p>

              <div className="flex flex-wrap items-center gap-3">
                <Link 
                  href="/search"
                  className="px-5 py-2.5 bg-foreground text-background rounded-xl font-medium hover:bg-foreground/90 transition-all text-sm"
                >
                  Enter Library
                </Link>
                <Link 
                  href="/dashboard/submit"
                  className="px-5 py-2.5 border-[1.5px] border-border text-foreground rounded-xl font-medium hover:border-foreground/30 transition-all text-sm"
                >
                  Contribute Evidence
                </Link>
              </div>
            </div>
            
            {/* Right: Image + Contact overlay */}
            <div className="hidden lg:block w-full relative rounded-2xl overflow-hidden aspect-[4/3] shadow-xl border-[5px] border-card">
              <Image 
                src="/about_hero_bg.png" 
                alt="ACRES researchers collaborating" 
                fill 
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              
              {/* Contact Card */}
              <div className="absolute bottom-4 right-4 flex flex-col gap-1.5 p-3.5 bg-background/95 backdrop-blur-md rounded-xl text-foreground text-[11px] shadow-lg border border-border/20">
                <p className="font-bold text-[9px] uppercase tracking-wider text-primary mb-0.5">Contact</p>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="w-3 h-3 text-primary shrink-0" />
                  <span>Plot 24, Wampewo Close, Kampala</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Mail className="w-3 h-3 text-primary shrink-0" />
                  <span className="font-mono">info@acres.or.ug</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Phone className="w-3 h-3 text-primary shrink-0" />
                  <span className="font-mono">+256 703 700 265</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom: Approach Pillars + Stats */}
        <div className="shrink-0 border-t border-border bg-card/50 backdrop-blur-sm px-6 lg:px-12 py-4">
          <div className="max-w-[1300px] mx-auto flex flex-col lg:flex-row items-center gap-6 lg:gap-0">
            
            {/* 4 Pillars */}
            <div className="flex-1 grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
              {[
                { icon: BookOpen, title: "Evidence Synthesis", desc: "Identifying improved pathways for EIDM delivery." },
                { icon: Globe2, title: "Policy Engagement", desc: "Assessing policy landscapes for key opportunities." },
                { icon: Users, title: "Capacity Building", desc: "Building researcher and decision-maker capacity." },
                { icon: ShieldCheck, title: "Research & Innovation", desc: "Exploring strategies for global EIDM effectiveness." },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3 group">
                  <div className="w-9 h-9 bg-primary/10 rounded-lg flex items-center justify-center shrink-0 group-hover:bg-primary/15 transition-colors">
                    <item.icon className="w-4 h-4 text-primary" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-semibold text-[12px] text-foreground leading-tight mb-0.5">{item.title}</h3>
                    <p className="text-[10px] text-muted-foreground leading-snug">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Divider */}
            <div className="hidden lg:block w-px h-14 bg-border mx-6 shrink-0"></div>

            {/* Stats */}
            <div className="flex items-center gap-6 lg:gap-8 shrink-0">
              <div className="text-center">
                <p className="font-serif font-bold text-[28px] text-primary leading-none">16</p>
                <p className="font-mono text-[8px] tracking-[1.5px] uppercase text-muted-foreground mt-1">Years</p>
              </div>
              <div className="w-px h-10 bg-border"></div>
              <div className="text-center">
                <p className="font-serif font-bold text-[28px] text-foreground leading-none">4,000+</p>
                <p className="font-mono text-[8px] tracking-[1.5px] uppercase text-muted-foreground mt-1">Syntheses</p>
              </div>
              <div className="w-px h-10 bg-border"></div>
              <div className="text-center">
                <p className="font-serif font-bold text-[28px] text-forest leading-none">48h</p>
                <p className="font-mono text-[8px] tracking-[1.5px] uppercase text-muted-foreground mt-1">Turnaround</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
