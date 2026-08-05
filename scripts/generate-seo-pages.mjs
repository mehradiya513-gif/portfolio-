import fs from 'fs/promises';
import path from 'path';

const NUM_PAGES = 25;
const WORDS_PER_PAGE = 4500;
const KEYWORD = 'diya mehra';

const baseText = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`;

const generateContent = () => {
  let paragraphs = [];
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

async function main() {
  const rootDir = path.join(process.cwd(), 'src', 'app');
  
  for (let i = 1; i <= NUM_PAGES; i++) {
    const pageName = `diya-mehra-${i}`;
    const dirPath = path.join(rootDir, pageName);
    
    await fs.mkdir(dirPath, { recursive: true });
    
    const paragraphs = generateContent();
    
    // Calculate actual word count generated
    const actualWords = paragraphs.join(' ').split(/\s+/).length;
    
    // Simple Next.js App Router Page
    const componentCode = `
import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Diya Mehra - Insight ${i}',
  description: 'SEO optimized page focusing on Diya Mehra and key insights. Page ${i}',
};

export default function DiyaMehraPage${i}() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl bg-white shadow-xl rounded-2xl border border-gray-100 p-8 sm:p-12">
        <header className="mb-10 text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 mb-4 capitalize">
            diya mehra: Insight ${i}
          </h1>
          <p className="text-gray-500 font-medium tracking-wide uppercase text-sm">
            SEO Pillar Content — ~4500 Words
          </p>
        </header>

        <article className="space-y-6 text-lg text-gray-700 leading-relaxed font-serif text-justify">
          ${paragraphs.map((p, idx) => `<p key="${idx}">${p}</p>`).join('\n          ')}
        </article>
      </div>
    </div>
  );
}
`;

    await fs.writeFile(path.join(dirPath, 'page.tsx'), componentCode, 'utf-8');
    console.log(`Created page ${i} at src/app/${pageName} (Words: ${actualWords})`);
  }
}

main().catch(console.error);
