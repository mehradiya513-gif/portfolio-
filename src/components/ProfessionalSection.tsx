"use client";

import React, { useEffect, useRef, useState } from "react";
import { TrendingUp, Sparkles, Search, BarChart3 } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ProfessionalSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const metricsRef = useRef<HTMLDivElement>(null);
  const chartPathRef = useRef<SVGPathElement>(null);
  const [selectedCampaign, setSelectedCampaign] = useState("seo");

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header Animation
      gsap.fromTo(
        ".prof-heading",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: ".prof-heading",
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );

      // Cards Animation
      gsap.fromTo(
        ".marketing-service",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          scrollTrigger: {
            trigger: ".marketing-grid",
            start: "top 75%",
            toggleActions: "play none none none",
          },
        }
      );

      // Dashboards Grid Entrance
      gsap.fromTo(
        ".dashboard-view",
        { opacity: 0, scale: 0.95 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.9,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".dashboard-view",
            start: "top 70%",
            toggleActions: "play none none none",
          },
        }
      );

      // SVG Line Chart Drawing Animation
      if (chartPathRef.current) {
        const length = chartPathRef.current.getTotalLength();
        gsap.set(chartPathRef.current, { strokeDasharray: length, strokeDashoffset: length });
        gsap.to(chartPathRef.current, {
          strokeDashoffset: 0,
          duration: 2.2,
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: ".chart-svg",
            start: "top 80%",
          },
        });
      }

      // Count up animation for stats
      if (metricsRef.current) {
        const counts = metricsRef.current.querySelectorAll(".metric-val");
        counts.forEach((item) => {
          const target = parseFloat(item.getAttribute("data-target") || "0");
          const isPercent = item.getAttribute("data-percent") === "true";
          const isX = item.getAttribute("data-x") === "true";
          
          const valObj = { value: 0 };
          gsap.to(valObj, {
            value: target,
            duration: 1.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: item,
              start: "top 85%",
            },
            onUpdate: () => {
              let formattedVal = "";
              if (isPercent) {
                formattedVal = `+${Math.floor(valObj.value)}%`;
              } else if (isX) {
                formattedVal = `${valObj.value.toFixed(1)}x`;
              } else {
                formattedVal = `${Math.floor(valObj.value)}`;
              }
              item.textContent = formattedVal;
            },
          });
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [selectedCampaign]);

  const marketingServices = [
    {
      title: "Semantic Intent SEO",
      description: "Applying natural language parsing models to structure content databases, align keyword entities, and write query-optimized technical pages.",
      icon: Search,
      color: "text-brand-cyan border-brand-cyan/25 bg-brand-cyan/5",
    },
    {
      title: "Generative Content Systems",
      description: "Developing structured prompting loops and system instructions to output on-brand newsletters, copy fragments, and social assets at scale.",
      icon: Sparkles,
      color: "text-brand-magenta border-brand-magenta/25 bg-brand-magenta/5",
    },
    {
      title: "cohort Funnel Tracking",
      description: "Configuring scripts and analytics pixels to parse user actions, monitor checkout drops, and study how visual design affects customer retention.",
      icon: TrendingUp,
      color: "text-brand-violet border-brand-violet/25 bg-brand-violet/5",
    },
  ];

  const dashboardData: Record<string, { title: string; desc: string; metrics: Array<{ label: string; val: string; target: number; p?: boolean; x?: boolean }>; chartPoints: string }> = {
    seo: {
      title: "Semantic Content Optimization",
      desc: "Performance curves tracking search metrics after migrating to schema-structured landing page designs.",
      metrics: [
        { label: "Search Clicks", val: "+145%", target: 145, p: true },
        { label: "Search Impressions", val: "+220%", target: 220, p: true },
        { label: "SERP Position Gain", val: "8.4", target: 8.4 },
      ],
      chartPoints: "M 0 100 Q 50 80 100 90 T 200 40 T 300 60 T 400 10 T 500 20 T 600 5",
    },
    copywriting: {
      title: "LLM Copywriting Speed",
      desc: "Speed multipliers and conversion lifts observed after training custom local GPT system prompts.",
      metrics: [
        { label: "Pipeline Velocity", val: "4.5x", target: 4.5, x: true },
        { label: "Copy CTR Increase", val: "+32%", target: 32, p: true },
        { label: "Page Signup Rate", val: "4.2%", target: 4.2, x: true },
      ],
      chartPoints: "M 0 100 Q 50 95 100 70 T 200 80 T 300 30 T 400 45 T 500 15 T 600 12",
    },
    funnel: {
      title: "Ad Spend & Checkout Conversion",
      desc: "Spend curves and shopping drop reductions after restructuring our responsive funnel grids.",
      metrics: [
        { label: "Ad Return Lift", val: "5.4x", target: 5.4, x: true },
        { label: "Abandonment Drop", val: "-28%", target: 28, p: true },
        { label: "Customer LTV Gain", val: "+15%", target: 15, p: true },
      ],
      chartPoints: "M 0 95 Q 50 90 100 85 T 200 75 T 300 50 T 400 35 T 500 25 T 600 18",
    },
  };

  const currentDash = dashboardData[selectedCampaign];

  return (
    <section
      id="professional"
      ref={sectionRef}
      className="py-24 relative overflow-hidden bg-transparent"
    >
      {/* Decorative Glow Grid */}
      <div className="absolute top-[20%] right-[-10%] w-[350px] h-[350px] bg-brand-cyan/5 rounded-full blur-[110px] pointer-events-none" />
      <div className="absolute bottom-[20%] left-[-10%] w-[350px] h-[350px] bg-brand-magenta/5 rounded-full blur-[110px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Section Heading */}
        <div className="text-center mb-16 prof-heading font-sans">
          <h2 className="text-4xl sm:text-6xl font-serif text-slate-800 mb-4 font-normal">
            Professional <span className="italic font-light text-brand-violet">Experiments</span>
          </h2>
          <p className="text-slate-500 max-w-xl mx-auto text-sm sm:text-base font-light">
            Blending computer applications with AI Powered Digital Marketing funnels to build user-friendly web assets.
          </p>
        </div>

        {/* Marketing Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20 marketing-grid font-sans">
          {marketingServices.map((service, idx) => {
            const Icon = service.icon;
            return (
              <div
                key={idx}
                className="marketing-service glass-card glass-card-hover p-8 rounded-2xl border border-black/5"
              >
                <div className={`p-3 rounded-xl border w-fit mb-6 ${service.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-serif font-normal text-slate-800 mb-3">
                  {service.title}
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed font-light">
                  {service.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Interactive Case Dashboard Mock */}
        <div className="dashboard-view glass-card rounded-3xl border border-black/5 p-6 sm:p-10 relative overflow-hidden glow-cyan font-sans">
          {/* Header Row */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-black/5 pb-8 mb-8">
            <div>
              <div className="flex items-center gap-2 text-brand-cyan text-xs font-bold uppercase tracking-widest mb-2">
                <BarChart3 className="w-4 h-4 animate-pulse" />
                <span>My Growth Sandbox</span>
              </div>
              <h3 className="text-2xl font-serif font-normal text-slate-800">
                Marketing Analytics Metrics
              </h3>
            </div>
            
            {/* Control Panel Tabs */}
            <div className="flex flex-wrap gap-2.5 bg-black/5 p-1.5 rounded-full border border-black/5 w-fit">
              <button
                onClick={() => setSelectedCampaign("seo")}
                className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all ${
                  selectedCampaign === "seo"
                    ? "bg-white text-brand-cyan border border-brand-cyan/20 shadow-sm"
                    : "text-slate-500 hover:text-slate-800"
                }`}
              >
                SEO Experiments
              </button>
              <button
                onClick={() => setSelectedCampaign("copywriting")}
                className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all ${
                  selectedCampaign === "copywriting"
                    ? "bg-white text-brand-magenta border border-brand-magenta/20 shadow-sm"
                    : "text-slate-500 hover:text-slate-800"
                }`}
              >
                AI Prompts
              </button>
              <button
                onClick={() => setSelectedCampaign("funnel")}
                className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all ${
                  selectedCampaign === "funnel"
                    ? "bg-white text-brand-violet border border-brand-violet/20 shadow-sm"
                    : "text-slate-500 hover:text-slate-800"
                }`}
              >
                Conversion ROI
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Text & Metrics Info */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <h4 className="text-xl font-serif font-normal text-slate-800 mb-2">
                  {currentDash.title}
                </h4>
                <p className="text-slate-500 text-xs sm:text-sm leading-relaxed font-light">
                  {currentDash.desc}
                </p>
              </div>

              {/* Dynamic Counters Grid */}
              <div ref={metricsRef} className="grid grid-cols-3 gap-4 bg-black/5 p-6 rounded-2xl border border-black/5">
                {currentDash.metrics.map((metric, i) => (
                  <div key={i} className="text-center sm:text-left">
                    <span className="block text-[10px] text-slate-500 uppercase tracking-wider mb-2 font-medium">
                      {metric.label}
                    </span>
                    <span
                      data-target={metric.target}
                      data-percent={metric.p}
                      data-x={metric.x}
                      className="metric-val text-xl sm:text-2xl font-black text-slate-800"
                    >
                      {metric.val}
                    </span>
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-2 text-xs text-slate-400 font-light">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-cyan animate-pulse"></span>
                <span>Values logged from site funnels and custom script tracking.</span>
              </div>
            </div>

            {/* Dashboard Visualization Graph */}
            <div className="lg:col-span-7 bg-white/40 rounded-2xl border border-black/5 p-6 relative overflow-hidden h-[280px] sm:h-[320px] shadow-inner">
              <div className="absolute top-4 left-4 flex items-center justify-between w-[calc(100%-2rem)]">
                <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider font-sans">Growth curve trend</span>
                <span className="text-[10px] text-brand-cyan bg-brand-cyan/15 px-2 py-0.5 rounded border border-brand-cyan/25 font-semibold font-sans">Live</span>
              </div>

              {/* Grid Lines */}
              <div className="absolute inset-x-6 bottom-8 top-12 flex flex-col justify-between pointer-events-none opacity-20">
                <div className="border-b border-dashed border-slate-400 w-full h-[1px]"></div>
                <div className="border-b border-dashed border-slate-400 w-full h-[1px]"></div>
                <div className="border-b border-dashed border-slate-400 w-full h-[1px]"></div>
                <div className="border-b border-dashed border-slate-400 w-full h-[1px]"></div>
              </div>

              {/* SVG Graphic Chart */}
              <div className="absolute inset-x-6 bottom-8 top-12 flex items-end">
                <svg className="w-full h-full chart-svg" viewBox="0 0 600 120" preserveAspectRatio="none">
                  {/* Glowing Background gradient */}
                  <defs>
                    <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#7ea1c4" stopOpacity="0.25" />
                      <stop offset="100%" stopColor="#7ea1c4" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  
                  {/* Under path fill area */}
                  <path
                    d={`${currentDash.chartPoints} L 600 120 L 0 120 Z`}
                    fill="url(#chartGradient)"
                    className="transition-all duration-700"
                  />
                  
                  {/* Glowing main stroke line */}
                  <path
                    ref={chartPathRef}
                    d={currentDash.chartPoints}
                    fill="none"
                    stroke="#7ea1c4"
                    strokeWidth="3"
                    strokeLinecap="round"
                    className="transition-all duration-700"
                  />
                </svg>
              </div>

              <div className="absolute bottom-3 inset-x-6 flex justify-between text-[10px] text-slate-400 font-semibold tracking-wider uppercase">
                <span>Month 1</span>
                <span>Month 2</span>
                <span>Month 3</span>
                <span>Month 4</span>
                <span>Month 5</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
