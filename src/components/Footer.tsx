import React from "react";

export default function Footer() {
  return (
    <footer className="py-12 border-t border-black/5 bg-[#fbfaf5]/80 backdrop-blur-sm relative z-10 text-center text-xs text-slate-400">
      <div className="max-w-7xl mx-auto px-6 space-y-4">
        <div className="flex justify-center flex-wrap gap-6 text-sm text-slate-500">
          <a href="/#home" className="hover:text-slate-800 transition-colors">Home</a>
          <a href="/#personal" className="hover:text-slate-800 transition-colors">Personal</a>
          <a href="/#formal" className="hover:text-slate-800 transition-colors">Formal Portfolio</a>
          <a href="/#professional" className="hover:text-slate-800 transition-colors">Professional Portfolio</a>
          <a href="/#blog" className="hover:text-slate-800 transition-colors">Blog</a>
          <a href="/#contact" className="hover:text-slate-800 transition-colors">Contact</a>
        </div>
        <p>© {new Date().getFullYear()} Diya. All rights reserved.</p>
        <p className="font-light">
          Designed & engineered using Next.js, Tailwind CSS v4, Three.js, and GSAP. Runs on Node.js.
        </p>
      </div>
    </footer>
  );
}
