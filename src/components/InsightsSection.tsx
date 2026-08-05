"use client";

import React, { useState, useMemo } from "react";
import { ChevronDown, FileText } from "lucide-react";

// Procedural text generator mimicking the previous script
const WORDS_PER_PAGE = 4500;
const KEYWORD = 'diya mehra';
const baseText = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`;

const generateContent = () => {
  let paragraphs: string[] = [];
  let currentWords = 0;
  
  while (currentWords < WORDS_PER_PAGE) {
    let p = '';
    for (let j = 0; j < 4; j++) {
      if (j % 2 === 0) {
          p += KEYWORD + '. ';
          currentWords += 2;
      }
      p += baseText + ' ';
      currentWords += 69;
    }
    paragraphs.push(p.trim());
  }
  return paragraphs;
};

export default function InsightsSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  // Memoize the content generation so it only runs once per component mount, not on every render.
  const paragraphs = useMemo(() => generateContent(), []);
  
  const pages = Array.from({ length: 25 }, (_, i) => i + 1);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="insights" className="py-24 bg-white relative z-10 border-t border-black/5">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif italic text-slate-800 mb-4">
            SEO <span className="font-sans not-italic font-bold text-brand-violet">Insights</span>
          </h2>
          <p className="text-slate-500 max-w-2xl mx-auto">
            A comprehensive collection of 25 pillar insights exploring the depths of digital strategy, each containing 4,500+ words.
          </p>
        </div>

        <div className="space-y-4">
          {pages.map((pageNum, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div 
                key={pageNum} 
                className={`border rounded-2xl overflow-hidden transition-colors duration-300 ${isOpen ? 'border-brand-violet/30 shadow-md' : 'border-slate-200 hover:border-brand-violet/20'}`}
              >
                <button
                  onClick={() => toggleAccordion(idx)}
                  className="w-full flex items-center justify-between p-6 bg-white hover:bg-slate-50/50 transition-colors text-left"
                >
                  <div className="flex items-center gap-4">
                    <div className={`p-2 rounded-xl flex items-center justify-center transition-colors ${isOpen ? 'bg-brand-violet/10 text-brand-violet' : 'bg-slate-100 text-slate-500'}`}>
                      <FileText className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-slate-800">
                        Diya Mehra Insight {pageNum}
                      </h3>
                      <p className="text-sm text-slate-500">4,760 words • Estimated 20 min read</p>
                    </div>
                  </div>
                  <ChevronDown 
                    className={`w-6 h-6 text-slate-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} 
                  />
                </button>

                {isOpen && (
                  <div className="p-6 pt-0 bg-white border-t border-slate-100">
                    <div className="prose prose-slate max-w-none text-slate-600 space-y-4 pt-6 text-justify">
                      {paragraphs.map((p, i) => (
                        <p key={i}>{p}</p>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
