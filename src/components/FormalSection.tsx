"use client";

import React, { useEffect, useRef, useState } from "react";
import { Database, Code2, LayoutGrid, Terminal, ExternalLink, Globe, BrainCircuit, Cpu } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function FormalSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<"projects" | "skills">("projects");

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading animation
      gsap.fromTo(
        ".formal-heading",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: ".formal-heading",
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );

      // Smooth trigger for tab elements
      if (contentRef.current) {
        gsap.fromTo(
          contentRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            scrollTrigger: {
              trigger: contentRef.current,
              start: "top 75%",
              toggleActions: "play none none none",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [activeTab]);

  const courses = [
    { title: "Database Systems", details: "Relational tables, schema layouts, writing SQL queries", icon: Database },
    { title: "Web Development", details: "Modern HTML/CSS, React scripting, client-server logic", icon: Code2 },
    { title: "Operating Systems & Networks", details: "Process planning, protocol layers, basic security", icon: Cpu },
  ];

  const skills = [
    { name: "Frontend Web Dev (HTML5/CSS3/JS)", level: "95%" },
    { name: "React & Next.js Frameworks", level: "85%" },
    { name: "Tailwind CSS & Modern Layouts", level: "90%" },
    { name: "Social Media Analytics & Strategy", level: "85%" },
    { name: "Content Creation & Copywriting", level: "90%" },
    { name: "Visual Design (Figma, Canva)", level: "80%" },
    { name: "Search Engine Optimization (SEO)", level: "75%" },
    { name: "Git & Version Control Workflow", level: "80%" },
  ];

  const projects = [
    {
      title: "Interactive Portfolio Hub",
      category: "Web Development",
      description:
        "Designed and engineered this beautiful personal portfolio website utilizing Next.js, React 19, and Tailwind CSS. Integrated smooth layout micro-animations and physics-based particle backgrounds.",
      tech: ["Next.js", "React", "Tailwind CSS", "GSAP Animations"],
      icon: Globe,
      link: "#",
    },
    {
      title: "Social Campaigns Analytics Dashboard",
      category: "Social Media Strategy",
      description:
        "Developed a mock analytics dashboard in React to compile engagement stats, view counts, and conversion rate optimizations for multiple brand social channels. Created clean SVG charts representing trend growths.",
      tech: ["React", "SVG Charts", "State Management", "Figma Design"],
      icon: BrainCircuit,
      link: "#",
    },
    {
      title: "Brand Content Production Hub",
      category: "Content Creation",
      description:
        "Curated a digital creator dashboard organizing content schedules, scripting prompts, design assets, and video frameworks. Used to streamline and track short-form media and copywriting campaigns.",
      tech: ["Content Strategy", "Copywriting", "Creator Workflows"],
      icon: Terminal,
      link: "#",
    },
  ];

  return (
    <section
      id="formal"
      ref={sectionRef}
      className="py-24 relative overflow-hidden bg-gradient-to-b from-[#fbfaf5] to-[#f5f3e9]"
    >
      {/* Decorative Glow Grid */}
      <div className="absolute top-[10%] left-[-10%] w-[350px] h-[350px] bg-brand-violet/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-10%] w-[350px] h-[350px] bg-brand-cyan/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Section Heading */}
        <div className="text-left mb-16 formal-heading font-sans">
          <h2 className="text-4xl sm:text-6xl font-serif text-slate-800 mb-4 font-normal">
            Formal <span className="italic font-light text-brand-cyan">Portfolio</span>
          </h2>
          <p className="text-slate-500 max-w-xl text-sm sm:text-base font-light">
            Highlighting academic coursework study notes, programming skills, and student projects from my BCA degree.
          </p>
        </div>

        {/* Academics Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 font-sans">
          {courses.map((course, idx) => {
            const Icon = course.icon;
            return (
              <div
                key={idx}
                className="glass-card p-6 rounded-2xl border border-black/5 flex gap-4 items-start bg-white/40 shadow-[0_4px_24px_-10px_rgba(0,0,0,0.03)] hover:shadow-md transition-shadow duration-300"
              >
                <div className="p-2.5 rounded-xl bg-brand-cyan/10 border border-brand-cyan/20 text-brand-cyan">
                  <Icon className="w-4.5 h-4.5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-800 mb-1">
                    {course.title}
                  </h4>
                  <p className="text-xs text-slate-500 font-light leading-relaxed">
                    {course.details}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Tab Toggle Navigation */}
        <div className="flex justify-start mb-12 font-sans">
          <div className="inline-flex rounded-full bg-black/5 p-1 border border-black/5">
            <button
              onClick={() => setActiveTab("projects")}
              className={`px-6 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all ${
                activeTab === "projects"
                  ? "bg-brand-cyan text-slate-800 shadow-sm border border-brand-cyan/15"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              Academic Notebooks
            </button>
            <button
              onClick={() => setActiveTab("skills")}
              className={`px-6 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all ${
                activeTab === "skills"
                  ? "bg-brand-cyan text-slate-800 shadow-sm border border-brand-cyan/15"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              Technical Skills
            </button>
          </div>
        </div>

        {/* Tab Content Panels */}
        <div ref={contentRef} className="min-h-[400px]">
          {activeTab === "projects" ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 font-sans">
              {projects.map((proj, idx) => {
                const Icon = proj.icon;
                return (
                  <div
                    key={idx}
                    className="glass-card glass-card-hover p-8 rounded-2xl flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex justify-between items-start mb-6">
                        <div className="p-3 rounded-xl bg-black/5 border border-black/5 text-brand-cyan">
                          <Icon className="w-5 h-5" />
                        </div>
                        <span className="text-[10px] uppercase tracking-widest text-slate-700 font-semibold px-3 py-1 rounded-full bg-brand-cyan/15 border border-brand-cyan/25">
                          {proj.category}
                        </span>
                      </div>
                      <h3 className="text-xl font-serif font-normal text-slate-800 mb-3">
                        {proj.title}
                      </h3>
                      <p className="text-slate-500 text-xs sm:text-sm leading-relaxed mb-6 font-light">
                        {proj.description}
                      </p>
                    </div>
                    <div>
                      <div className="flex flex-wrap gap-1.5 mb-6">
                        {proj.tech.map((t, i) => (
                          <span
                            key={i}
                            className="text-[10px] text-slate-600 bg-black/5 px-2.5 py-1 rounded-md border border-black/5"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                      <a
                        href={proj.link}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700 hover:text-brand-cyan transition-colors group"
                      >
                        <span>Inspect notebook</span>
                        <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="glass-card rounded-3xl p-8 sm:p-12 max-w-4xl mx-auto border border-black/5 font-sans">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                {skills.map((skill, idx) => (
                  <div key={idx} className="space-y-2">
                    <div className="flex justify-between items-center text-sm font-semibold">
                      <span className="text-slate-800 font-medium">{skill.name}</span>
                      <span className="text-brand-cyan">{skill.level}</span>
                    </div>
                    <div className="h-1.5 w-full bg-black/5 rounded-full overflow-hidden border border-black/5">
                      <div
                        className="h-full bg-gradient-to-r from-brand-cyan to-brand-violet rounded-full transition-all duration-1000"
                        style={{ width: skill.level }}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-6 p-6 rounded-2xl bg-black/5 border border-black/5 text-center sm:text-left">
                <div className="flex gap-4 items-center">
                  <BrainCircuit className="w-10 h-10 text-brand-cyan/95 hidden sm:block" />
                  <div>
                    <h4 className="text-sm font-bold text-slate-800 mb-1">
                      My Learning Process
                    </h4>
                    <p className="text-xs text-slate-500 font-light max-w-md">
                      I believe computer applications teach us the grammar of machines. Once I understand the syntax, learning a new language or backend routing is just about mapping logic.
                    </p>
                  </div>
                </div>
                <div className="text-xs font-bold text-brand-cyan uppercase tracking-widest px-4 py-2 rounded-full bg-brand-cyan/15 border border-brand-cyan/25">
                  BCA Finalist
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
