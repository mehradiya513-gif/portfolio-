"use client";

import React, { useState, useEffect, useRef } from "react";
import { Menu, X, User, GraduationCap, Briefcase, Mail, Home, FileText } from "lucide-react";
import gsap from "gsap";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<HTMLDivElement>(null);

  // Monitor scroll height to apply glass styling
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);

    // GSAP Entrance Animation
    const ctx = gsap.context(() => {
      gsap.fromTo(
        logoRef.current,
        { opacity: 0, x: -30 },
        { opacity: 1, x: 0, duration: 0.8, ease: "power4.out" }
      );
      if (itemsRef.current) {
        const links = itemsRef.current.querySelectorAll(".nav-link");
        gsap.fromTo(
          links,
          { opacity: 0, y: -20 },
          { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "power4.out", delay: 0.1 }
        );
      }
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      ctx.revert();
    };
  }, []);

  const navLinks = [
    { name: "Home", href: "/#home", icon: Home },
    { name: "Personal", href: "/#personal", icon: User },
    { name: "Formal Portfolio", href: "/#formal", icon: GraduationCap },
    { name: "Professional Portfolio", href: "/#professional", icon: Briefcase },
    { name: "Insights", href: "/insights", icon: FileText },
    { name: "Contact", href: "/#contact", icon: Mail },
  ];

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "py-3 bg-[#fbfaf5]/85 backdrop-blur-md border-b border-black/5"
          : "py-6 bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Editorial Logo */}
        <div ref={logoRef} className="flex items-center gap-2">
          <a
            href="/#home"
            className="text-3xl font-serif italic text-slate-800 hover:text-brand-violet transition-colors lowercase font-normal"
          >
            diya<span className="text-brand-cyan font-sans font-bold">.</span>
          </a>
        </div>

        {/* Desktop Navigation */}
        <div ref={itemsRef} className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const Icon = link.icon;
            return (
              <a
                key={link.name}
                href={link.href}
                className="nav-link flex items-center gap-2 text-xs uppercase tracking-wider text-slate-500 hover:text-slate-900 transition-colors relative py-1 group font-medium"
              >
                <Icon className="w-3.5 h-3.5 text-brand-violet/70 group-hover:text-brand-cyan transition-colors" />
                <span>{link.name}</span>
                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-gradient-to-r from-brand-violet to-brand-cyan group-hover:w-full transition-all duration-300"></span>
              </a>
            );
          })}
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 text-slate-500 hover:text-slate-800 transition-colors focus:outline-none"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Panel */}
      <div
        className={`fixed inset-y-0 right-0 w-full sm:w-80 z-40 bg-[#fbfaf5]/98 backdrop-blur-xl border-l border-black/5 p-8 flex flex-col justify-between transition-transform duration-300 md:hidden ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col gap-8 pt-16">
          <div className="flex justify-between items-center mb-4">
            <span className="text-3xl font-serif italic text-slate-800 lowercase">
              diya<span className="text-brand-cyan font-sans font-bold">.</span>
            </span>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 text-slate-500 hover:text-slate-800"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="flex flex-col gap-6">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-4 text-sm font-medium tracking-wide text-slate-600 hover:text-slate-900 transition-colors py-2 border-b border-black/5"
                >
                  <Icon className="w-4.5 h-4.5 text-brand-violet/85" />
                  <span>{link.name}</span>
                </a>
              );
            })}
          </div>
        </div>

        {/* Footer info in drawer */}
        <div className="text-xs text-slate-450 font-light">
          <p>© 2026 Diya. Pursuing BCA &amp; Digital Marketing.</p>
        </div>
      </div>
    </nav>
  );
}
