import Image from "next/image";
import { ArrowRight, BookOpen, Globe2, ShieldCheck, Users } from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="flex flex-col w-full bg-background overflow-hidden relative">
      
      {/* Minimalistic Background Effects */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[80%] h-[600px] bg-gradient-to-l from-primary/5 to-transparent"></div>
        <div className="absolute top-1/4 left-[-10%] w-1/3 h-1/2 bg-gradient-to-r from-blue-500/5 to-transparent blur-3xl"></div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_0%,#000_20%,transparent_100%)]"></div>
      </div>

      {/* Hero Section */}
      <section className="relative z-10 w-full pt-16 pb-20 lg:pt-24 lg:pb-32 px-6 lg:px-12">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          <div className="flex-1 flex flex-col items-start xl:pr-10 order-2 lg:order-1">
            <div className="relative mb-6 pl-4 border-l-2 border-primary/40">
              <span className="font-mono text-[11px] tracking-[2px] uppercase font-bold text-primary block">
                Who We Are
              </span>
            </div>
            
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-[4.2rem] font-bold tracking-tight text-foreground mb-6 leading-[1.1]">
              Bridging the gap between <span className="text-primary italic font-medium">evidence</span> and policy.
            </h1>
            
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-xl mb-10">
              The Center for Rapid Evidence Synthesis (ACRES) at Makerere University is dedicated to providing timely, relevant, and high-quality evidence to inform urgent health and social policy decisions across Africa.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <Link 
                href="/search"
                className="px-6 py-3 bg-foreground text-background rounded-xl font-medium hover:bg-foreground/90 transition-all text-sm flex items-center justify-center min-w-[160px]"
              >
                Explore Evidence
              </Link>
              <Link 
                href="/dashboard/submit"
                className="px-6 py-3 bg-transparent border-[1.5px] border-border text-foreground rounded-xl font-medium hover:border-foreground/30 transition-all text-sm flex items-center justify-center gap-2 min-w-[160px]"
              >
                Contribute Research
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
          
          {/* Hero Image */}
          <div className="w-full relative rounded-3xl overflow-hidden aspect-[4/3] lg:aspect-[5/4] shadow-2xl order-1 lg:order-2 border-[6px] border-card">
             <Image 
                src="/about_hero_bg.png" 
                alt="ACRES researchers collaborating" 
                fill 
                className="object-cover hover:scale-105 transition-transform duration-[2s] ease-in-out"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6">
                 <p className="text-white/90 font-serif text-lg leading-snug drop-shadow-md">
                   Our team synthesizing crucial data for the Ministry of Health, Kampala, 2025.
                 </p>
              </div>
          </div>

        </div>
      </section>

      {/* Stats Ribbon */}
      <section className="relative z-10 w-full bg-foreground text-background py-16 px-6">
         <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-background/10">
            <div className="flex-1 py-6 md:py-0 md:px-8 text-center flex flex-col items-center">
              <h3 className="font-serif text-5xl font-bold text-primary mb-2">12+</h3>
              <p className="font-mono text-[11px] tracking-[1.5px] uppercase text-background/60">African Nations Served</p>
            </div>
            <div className="flex-1 py-6 md:py-0 md:px-8 text-center flex flex-col items-center">
              <h3 className="font-serif text-5xl font-bold mb-2">4,000+</h3>
              <p className="font-mono text-[11px] tracking-[1.5px] uppercase text-background/60">Indexed Syntheses</p>
            </div>
            <div className="flex-1 py-6 md:py-0 md:px-8 text-center flex flex-col items-center">
              <h3 className="font-serif text-5xl font-bold text-forest mb-2">48h</h3>
              <p className="font-mono text-[11px] tracking-[1.5px] uppercase text-background/60">Avg. Request Turnaround</p>
            </div>
         </div>
      </section>

      {/* Our Approach */}
      <section className="relative z-10 w-full py-24 px-6 lg:px-12 bg-muted/20 border-b border-border text-center">
        <div className="max-w-[800px] mx-auto mb-16">
          <span className="font-mono text-[10px] tracking-[2px] uppercase font-bold text-muted-foreground block mb-4">Methodology</span>
          <h2 className="font-serif text-3xl lg:text-4xl font-bold text-foreground mb-6 leading-tight">
            How we translate global knowledge into local action.
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            The Dr-RES platform is built on a foundation of rigorous methodology, local context, and cutting-edge technology ensuring policymakers get the right answers exactly when they need them.
          </p>
        </div>

        <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { icon: BookOpen, title: "Curated Repository", desc: "A living database of rigorously vetted primary studies, reviews, and rapid response briefs." },
            { icon: Globe2, title: "Contextual Relevance", desc: "Evidence mapped and filtered specifically for Sub-Saharan African policy contexts and the SDGs." },
            { icon: ShieldCheck, title: "Rigorous Moderation", desc: "All submissions undergo independent expert review before being published to the public library." },
            { icon: Users, title: "Collaborative Network", desc: "A growing ecosystem of researchers, analysts, and decision-makers working in tandem." },
          ].map((item, i) => (
             <div key={i} className="bg-card border border-border p-8 rounded-2xl text-left hover:border-primary/50 transition-colors shadow-sm">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                   <item.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-serif text-xl font-bold text-foreground mb-3">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
             </div>
          ))}
        </div>
      </section>

    </div>
  );
}
