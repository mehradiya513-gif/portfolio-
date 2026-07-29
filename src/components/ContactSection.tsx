"use client";

import React, { useState, useEffect, useRef } from "react";
import { Mail, MapPin, Send, MessageSquare, User, FileText, CheckCircle2, AlertTriangle, ArrowRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ContactSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Fade in animations
      gsap.fromTo(
        ".contact-heading",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: ".contact-heading",
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );

      gsap.fromTo(
        ".contact-card",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.2,
          scrollTrigger: {
            trigger: ".contact-grid",
            start: "top 75%",
            toggleActions: "play none none none",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setStatus("error");
      setErrorMessage("Please fill in all required fields.");
      return;
    }

    setStatus("submitting");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        setStatus("error");
        setErrorMessage(data.message || "Something went wrong. Please try again.");
      }
    } catch (err) {
      console.error("Submission error:", err);
      setStatus("error");
      setErrorMessage("Unable to connect to the server. Please try again.");
    }
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="py-24 relative overflow-hidden bg-gradient-to-b from-[#f5f3e9] to-[#fbfaf5]"
    >
      {/* Decorative Glow Grid */}
      <div className="absolute top-[20%] left-[-10%] w-[350px] h-[350px] bg-brand-violet/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[10%] right-[-10%] w-[350px] h-[350px] bg-brand-cyan/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Section Heading */}
        <div className="text-left mb-16 contact-heading font-sans">
          <h2 className="text-4xl sm:text-6xl font-serif text-slate-800 mb-4 font-normal">
            Send me a <span className="italic font-light text-brand-violet">note</span>
          </h2>
          <p className="text-slate-500 max-w-xl text-sm sm:text-base font-light">
            Have an interesting project, campaign suggestion, or just want to say hi? Drop me a letter!
          </p>
        </div>

        {/* Contact Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 contact-grid font-sans">
          {/* Contact Details Panel */}
          <div className="lg:col-span-4 space-y-6 contact-card">
            <div className="glass-card rounded-2xl p-8 border border-black/5 space-y-8 relative overflow-hidden bg-white/40">
              <div className="absolute top-0 right-0 w-24 h-24 bg-brand-violet/5 rounded-full blur-xl pointer-events-none" />
              
              <div>
                <h3 className="text-xl font-serif font-normal text-slate-800 mb-2">Connect</h3>
                <p className="text-slate-500 text-xs font-light leading-relaxed">
                  Feel free to reach out. I am usually writing code, reading digital growth essays, or drinking tea.
                </p>
              </div>

              {/* Info Items */}
              <div className="space-y-6">
                <div className="flex gap-4 items-start">
                  <div className="p-3 rounded-xl bg-black/5 border border-black/5 text-brand-violet">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-[10px] text-slate-400 uppercase tracking-widest font-bold mb-1">
                      Direct Mail
                    </span>
                    <a
                      href="mailto:diya@example.com"
                      className="text-sm font-semibold text-slate-700 hover:text-brand-violet transition-colors break-all"
                    >
                      diya@example.com
                    </a>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="p-3 rounded-xl bg-black/5 border border-black/5 text-brand-cyan">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-[10px] text-slate-400 uppercase tracking-widest font-bold mb-1">
                      Based In
                    </span>
                    <span className="text-sm font-semibold text-slate-700">
                      India
                    </span>
                  </div>
                </div>
              </div>

              {/* Professional Network Links */}
              <div className="border-t border-black/5 pt-8">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-4">
                  Digital Spaces
                </h4>
                <div className="flex flex-col gap-2">
                  <a
                    href="#"
                    className="flex justify-between items-center text-sm text-slate-500 hover:text-slate-800 transition-colors py-2 border-b border-black/5 group"
                  >
                    <span>LinkedIn</span>
                    <ArrowRight className="w-4 h-4 text-brand-cyan -translate-x-1 group-hover:translate-x-0 opacity-0 group-hover:opacity-100 transition-all" />
                  </a>
                  <a
                    href="#"
                    className="flex justify-between items-center text-sm text-slate-500 hover:text-slate-800 transition-colors py-2 group"
                  >
                    <span>GitHub</span>
                    <ArrowRight className="w-4 h-4 text-brand-violet -translate-x-1 group-hover:translate-x-0 opacity-0 group-hover:opacity-100 transition-all" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Form Panel */}
          <div className="lg:col-span-8 contact-card">
            <div className="glass-card rounded-3xl p-8 sm:p-10 border border-black/5 relative overflow-hidden bg-white/40">
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-cyan/5 rounded-full blur-xl pointer-events-none" />

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Name Input */}
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-slate-500 uppercase tracking-widest flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5" />
                      <span>Who are you? *</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      required
                      className="w-full px-4 py-3 rounded-2xl bg-white/70 border border-black/5 focus:border-brand-cyan/35 text-slate-800 placeholder-slate-400 focus:outline-none transition-all text-sm shadow-inner"
                    />
                  </div>

                  {/* Email Input */}
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-slate-500 uppercase tracking-widest flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5" />
                      <span>Where should I write back? *</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your.email@example.com"
                      required
                      className="w-full px-4 py-3 rounded-2xl bg-white/70 border border-black/5 focus:border-brand-cyan/35 text-slate-800 placeholder-slate-400 focus:outline-none transition-all text-sm shadow-inner"
                    />
                  </div>
                </div>

                {/* Subject Input */}
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-slate-500 uppercase tracking-widest flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5" />
                    <span>What is this about?</span>
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Project talk, saying hello..."
                    className="w-full px-4 py-3 rounded-2xl bg-white/70 border border-black/5 focus:border-brand-cyan/35 text-slate-800 placeholder-slate-400 focus:outline-none transition-all text-sm shadow-inner"
                  />
                </div>

                {/* Message Input */}
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-slate-500 uppercase tracking-widest flex items-center gap-1.5">
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Write your note *</span>
                  </label>
                  <textarea
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell me a bit about your ideas..."
                    required
                    className="w-full px-4 py-3 rounded-2xl bg-white/70 border border-black/5 focus:border-brand-cyan/35 text-slate-800 placeholder-slate-400 focus:outline-none transition-all text-sm resize-none shadow-inner"
                  />
                </div>

                {/* Submit Action */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-black/5">
                  <div className="text-xs text-slate-400 font-light flex items-center gap-1.5">
                    <span>* Required field</span>
                  </div>

                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="w-full sm:w-auto px-6 py-2.5 rounded-full text-xs uppercase tracking-wider font-semibold bg-brand-cyan text-slate-800 hover:bg-brand-cyan/90 transition-all flex items-center justify-center gap-2 border border-brand-cyan/25 shadow-sm disabled:opacity-50"
                  >
                    {status === "submitting" ? (
                      <span>Sending note...</span>
                    ) : (
                      <>
                        <span>Send letter</span>
                        <Send className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                </div>

                {/* Submission Status Alerts */}
                {status === "success" && (
                  <div className="flex items-center gap-3 p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 text-sm">
                    <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                    <span>Your letter was sent! I will write back soon.</span>
                  </div>
                )}

                {status === "error" && (
                  <div className="flex items-center gap-3 p-4 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-600 text-sm">
                    <AlertTriangle className="w-5 h-5 flex-shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
