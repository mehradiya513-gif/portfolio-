"use client";

import React, { useEffect, useRef } from "react";
import { ArrowDown, GraduationCap, Briefcase } from "lucide-react";
import gsap from "gsap";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Fade in and float animations
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, ease: "power4.out", delay: 0.2 }
      );
      
      gsap.fromTo(
        textRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1, ease: "power4.out", delay: 0.4 }
      );
      
      gsap.fromTo(
        buttonRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1, ease: "power4.out", delay: 0.6 }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-start pt-24 overflow-hidden"
    >
      {/* Background Decorative Glows */}
      <div className="absolute top-[20%] left-[10%] w-[350px] h-[350px] bg-brand-violet/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[10%] w-[400px] h-[400px] bg-brand-cyan/5 rounded-full blur-[120px] pointer-events-none" />
      
      {/* Subtle Grid overlay */}
      <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 text-left relative z-10 w-full">
        {/* Dynamic Tag */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card text-xs font-semibold text-slate-600 mb-8 border border-black/5 bg-white/70 shadow-sm font-sans w-fit">
          <span className="w-1.5 h-1.5 rounded-full bg-brand-violet/80 animate-pulse"></span>
          <span>Web Developer &amp; Social Media Strategist</span>
        </div>

        {/* Editorial Heading */}
        <h1
          ref={titleRef}
          className="text-5xl sm:text-7xl md:text-8xl font-serif text-slate-800 leading-[1.05] tracking-tight mb-8 font-normal"
        >
          <span className="block italic font-light text-brand-violet mb-2">Hi, I&apos;m Diya.</span>
          <span>Designing webs,</span>
          <br className="hidden sm:inline" />
          <span className="italic font-light"> crafting content stories.</span>
        </h1>

        {/* Subtitle */}
        <p
          ref={textRef}
          className="text-base sm:text-xl text-slate-500 max-w-3xl mb-10 leading-relaxed font-light font-sans"
        >
          Welcome to my digital living room. I am a student pursuing my <strong className="text-slate-800 font-semibold font-serif italic text-lg sm:text-xl">Bachelor of Computer Applications</strong>, specializing in building responsive <strong className="text-brand-cyan font-semibold font-serif italic text-lg sm:text-xl">Web Applications</strong>, creative <strong className="text-brand-violet font-semibold font-serif italic text-lg sm:text-xl">Content Creation</strong>, and result-oriented <strong className="text-brand-magenta font-semibold font-serif italic text-lg sm:text-xl">Social Media Management</strong>.
        </p>

        {/* Call to Actions */}
        <div
          ref={buttonRef}
          className="flex flex-col sm:flex-row items-center justify-start w-full gap-4 font-sans"
        >
          <a
            href="#formal"
            className="w-full sm:w-auto px-6 py-3 rounded-full text-xs uppercase tracking-wider font-semibold flex items-center justify-center gap-2 border border-brand-violet/20 bg-brand-violet/10 text-slate-700 hover:bg-brand-violet/20 hover:border-brand-violet/40 transition-all duration-300 shadow-sm group"
          >
            <GraduationCap className="w-4 h-4 text-brand-violet" />
            <span>Web Portfolio</span>
          </a>
          <a
            href="#professional"
            className="w-full sm:w-auto px-6 py-3 rounded-full text-xs uppercase tracking-wider font-semibold flex items-center justify-center gap-2 border border-brand-cyan/25 bg-white/70 text-slate-700 hover:bg-brand-cyan/15 hover:border-brand-cyan/40 transition-all duration-300 shadow-sm group"
          >
            <Briefcase className="w-4 h-4 text-brand-cyan" />
            <span>Social &amp; Content Strategy</span>
          </a>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 opacity-50 animate-bounce font-sans">
          <span className="text-[10px] uppercase tracking-widest text-slate-400 font-semibold">Explore my notebooks</span>
          <ArrowDown className="w-3.5 h-3.5 text-brand-violet/85" />
        </div>
      </div>
    </section>
  );
}
