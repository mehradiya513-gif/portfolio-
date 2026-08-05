import React from 'react';
import Link from 'next/link';
import Navbar from "@/components/Navbar";

export const metadata = {
  title: 'Insights & SEO Articles - Diya Mehra',
  description: 'Collection of SEO insights and pillar content pages.',
};

export default function InsightsPage() {
  const pages = Array.from({ length: 25 }, (_, i) => i + 1);

  return (
    <main className="min-h-screen bg-[#fbfaf5]">
      <Navbar />
      <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-serif italic text-slate-800 mb-4">
            SEO <span className="font-sans not-italic font-bold text-brand-violet">Insights</span>
          </h1>
          <p className="text-slate-500 max-w-2xl mx-auto text-lg">
            A complete directory of all our generated pillar pages focused on in-depth industry insights.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {pages.map((pageNum) => (
            <Link 
              key={pageNum}
              href={`/diya-mehra-${pageNum}`}
              className="group block p-6 bg-white rounded-2xl border border-black/5 shadow-sm hover:shadow-xl hover:border-brand-violet/20 transition-all duration-300 transform hover:-translate-y-1 text-center"
            >
              <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-brand-violet/10 to-brand-cyan/10 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <span className="text-brand-violet font-bold font-serif">{pageNum}</span>
              </div>
              <h2 className="text-sm font-semibold text-slate-700 group-hover:text-brand-violet transition-colors">
                Diya Mehra Insight {pageNum}
              </h2>
              <p className="text-xs text-slate-400 mt-2">
                4,500+ Words
              </p>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
