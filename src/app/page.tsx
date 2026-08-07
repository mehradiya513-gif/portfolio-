"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import PersonalSection from "@/components/PersonalSection";
import FormalSection from "@/components/FormalSection";
import ProfessionalSection from "@/components/ProfessionalSection";
import BlogSection from "@/components/BlogSection";
import ContactSection from "@/components/ContactSection";

// Dynamically import ThreeCanvas to ensure it runs only on the client
const ThreeCanvas = dynamic(() => import("@/components/ThreeCanvas"), {
  ssr: false,
});

export default function Home() {
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true);
    }, 0);

    const handleMouseMove = (e: MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <main className="relative min-h-screen text-slate-800 bg-[#fbfaf5] overflow-x-hidden selection:bg-brand-violet/30 selection:text-slate-900">
      {/* Dynamic Cursor Glow (Desktop Only) */}
      {mounted && (
        <div
          className="custom-cursor hidden md:block"
          style={{
            transform: `translate3d(${cursorPos.x - 150}px, ${cursorPos.y - 150}px, 0)`,
          }}
        />
      )}

      {/* 3D Particle Canvas Background */}
      <ThreeCanvas />

      {/* Header / Navbar */}
      <Navbar />

      {/* Hero Landing */}
      <Hero />

      {/* Personal Bio Section */}
      <PersonalSection />

      {/* Formal Academic & Coding Projects Portfolio */}
      <FormalSection />

      {/* Professional AI Digital Marketing Analytics Portfolio */}
      <ProfessionalSection />

      {/* Blog Pages (25 Posts) */}
      <BlogSection />

      {/* Contact Section */}
      <ContactSection />

      {/* Footer */}
      <footer className="py-12 border-t border-black/5 bg-[#fbfaf5]/80 backdrop-blur-sm relative z-10 text-center text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-6 space-y-4">
          <div className="flex justify-center gap-6 text-sm text-slate-500">
            <a href="#home" className="hover:text-slate-800 transition-colors">Home</a>
            <a href="#personal" className="hover:text-slate-800 transition-colors">Personal</a>
            <a href="#formal" className="hover:text-slate-800 transition-colors">Formal Portfolio</a>
            <a href="#professional" className="hover:text-slate-800 transition-colors">Professional Portfolio</a>
            <a href="#blog" className="hover:text-slate-800 transition-colors">Blog</a>
            <a href="#contact" className="hover:text-slate-800 transition-colors">Contact</a>
          </div>
          <p>© {new Date().getFullYear()} Diya. All rights reserved.</p>
          <p className="font-light">
            Designed &amp; engineered using Next.js, Tailwind CSS v4, Three.js, and GSAP. Runs on Node.js.
          </p>
        </div>
      </footer>
    </main>
  );
}
