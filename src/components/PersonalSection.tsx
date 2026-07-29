"use client";

import React, { useEffect, useRef } from "react";
import { BookOpen, Clock, Award, Milestone, Coffee } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export default function PersonalSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading slide-up
      gsap.fromTo(
        ".personal-heading",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: ".personal-heading",
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );

      // Staggered cards entrance
      if (cardContainerRef.current) {
        const cards = cardContainerRef.current.querySelectorAll(".timeline-card");
        gsap.fromTo(
          cards,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.2,
            scrollTrigger: {
              trigger: cardContainerRef.current,
              start: "top 75%",
              toggleActions: "play none none none",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const profileHighlights = [
    {
      title: "Schooling Foundation",
      subtitle: "SPS School",
      description:
        "Where I discovered my curiosity for technology. Built a solid math foundation, explored early computer labs, and learned how to form analytical arguments.",
      icon: BookOpen,
      color: "text-brand-violet border-brand-violet/20 bg-brand-violet/5",
      tag: "Schooling Days",
    },
    {
      title: "Academic Milestone",
      subtitle: "BCA Final Year (Age 19)",
      description:
        "Currently wrapping up my Bachelor of Computer Applications degree. Spending my days working on database projects, algorithms, and exploring clean UI designs.",
      icon: Clock,
      color: "text-brand-cyan border-brand-cyan/20 bg-brand-cyan/5",
      tag: "Present Focus",
    },
    {
      title: "Creative Extension",
      subtitle: "Digital Marketer & Strategist",
      description:
        "Synthesizing computer science logic with digital growth campaigns. Running SEO audits, optimizing landing pages, setting up tracking pixels, and analyzing funnel conversions.",
      icon: Award,
      color: "text-brand-magenta border-brand-magenta/20 bg-brand-magenta/5",
      tag: "Specialization",
    },
  ];

  const personalInterests = [
    "Exploring Generative Tech",
    "Writing Tech Logs",
    "Cozy UI/UX Layout Design",
    "Analyzing Digital Funnels",
    "Sipping Green Tea",
    "Reading Modern Essayists",
  ];

  return (
    <section
      id="personal"
      ref={sectionRef}
      className="py-24 relative overflow-hidden bg-transparent"
    >
      {/* Decorative Blur BG */}
      <div className="absolute top-[30%] right-[-5%] w-[300px] h-[300px] bg-brand-violet/5 rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute bottom-[10%] left-[-5%] w-[350px] h-[350px] bg-brand-cyan/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Section Heading */}
        <div className="text-center mb-16 personal-heading">
          <h2 className="text-4xl sm:text-6xl font-serif text-slate-800 mb-4 font-normal">
            My Story &amp; <span className="italic font-light text-brand-violet">Journey</span>
          </h2>
          <p className="text-slate-500 max-w-xl mx-auto text-sm sm:text-base font-light font-sans">
            A small look into my school notebooks, code files, and how I find joy connecting database logic with marketing copy.
          </p>
        </div>

        {/* Timeline Grid */}
        <div
          ref={cardContainerRef}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16 font-sans"
        >
          {profileHighlights.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="timeline-card glass-card glass-card-hover p-8 rounded-2xl flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-start mb-6">
                    <div className={`p-3 rounded-xl border ${item.color}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] uppercase tracking-widest text-slate-500 font-semibold px-3 py-1 rounded-full bg-black/5 border border-black/5">
                      {item.tag}
                    </span>
                  </div>
                  <h3 className="text-xl font-serif font-normal text-slate-800 mb-1">
                    {item.title}
                  </h3>
                  <h4 className="text-xs font-semibold text-brand-cyan tracking-wider uppercase mb-4">
                    {item.subtitle}
                  </h4>
                  <p className="text-slate-500 text-sm leading-relaxed font-light">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Cozy Personal Bio Panel */}
        <div className="glass-card rounded-3xl p-8 sm:p-12 border border-black/5 relative overflow-hidden shadow-sm">
          <div className="absolute top-0 right-0 w-40 h-40 bg-brand-violet/5 rounded-full blur-2xl pointer-events-none" />
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Conversation text */}
            <div className="lg:col-span-7 flex flex-col justify-between">
              <div>
                <h3 className="text-3xl font-serif text-slate-800 mb-4 flex items-center gap-3 font-normal">
                  <Milestone className="w-6 h-6 text-brand-violet/80" />
                  <span>A space where coding meets copywriting.</span>
                </h3>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-6 font-light font-sans">
                  At 19, I don&apos;t think code should exist in a vacuum. Throughout my school years at <strong className="text-slate-800 font-medium">SPS School</strong> and now in my final year of <strong className="text-slate-800 font-medium">BCA studies</strong>, I&apos;ve loved designing database systems and structuring clean scripts. But I also discovered that a system only matters if it reaches people. That&apos;s why I threw myself into AI Powered Digital Marketing—to learn how to talk to search crawlers, write compelling content with AI tools, and map what makes users click.
                </p>
              </div>
              
              <div className="flex flex-wrap gap-2 font-sans">
                {personalInterests.map((interest, i) => (
                  <span
                    key={i}
                    className="text-xs text-slate-500 px-3.5 py-1.5 rounded-full bg-black/5 border border-black/5 hover:border-brand-violet/25 hover:text-slate-800 transition-all cursor-default"
                  >
                    {interest}
                  </span>
                ))}
              </div>
            </div>

            {/* Conversational Q&A Fact Box */}
            <div className="lg:col-span-5 glass-card bg-black/5 rounded-2xl p-8 border border-black/5 flex flex-col justify-between font-sans">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-6 flex items-center gap-2">
                <Coffee className="w-4 h-4 text-brand-magenta" />
                <span>Conversational Q&amp;A</span>
              </h4>
              <div className="space-y-4 text-sm text-slate-600">
                <div>
                  <span className="block font-serif italic text-slate-800 text-base mb-1">Why computer applications?</span>
                  <span className="text-xs text-slate-500 font-light leading-relaxed">
                    Because building databases and coding front-ends teaches me structural logic. I love taking raw concepts and organizing them into clean, running systems.
                  </span>
                </div>
                
                <div className="border-t border-black/5 pt-3">
                  <span className="block font-serif italic text-slate-800 text-base mb-1">Why digital marketing?</span>
                  <span className="text-xs text-slate-500 font-light leading-relaxed">
                    Because code is written for machines, but software is launched for people. Understanding SEO, analytics, and prompt frameworks bridges that bridge.
                  </span>
                </div>

                <div className="border-t border-black/5 pt-3">
                  <span className="block font-serif italic text-slate-800 text-base mb-1">Age 19? Schooling?</span>
                  <span className="text-xs text-slate-500 font-light leading-relaxed">
                    Yes! Currently 19, completing final BCA exams, and proud alum of SPS School where I first learned to write lines of HTML.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
