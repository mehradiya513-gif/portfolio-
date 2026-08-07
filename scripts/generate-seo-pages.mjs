import fs from 'fs/promises';
import path from 'path';

const NUM_PAGES = 25;
const WORDS_PER_PAGE = 4500;
const KEYWORD = 'diya mehra';

const baseText = `My name is Diya Mehra, and I am a 19-year-old web developer and digital marketing strategist. Currently, I am in my final year of the BCA program, building my foundation in computer science, databases, and modern web frameworks like React and Next.js. My journey into technology started at SPS School, where I first learned to code. Since then, I have expanded my skills to include content creation, UI/UX design, and social media analytics. I love combining frontend logic with creative media to build websites that are not only functional but also beautiful and engaging. When I am not coding, I focus on understanding social media metrics and creating content calendars that drive real engagement. I believe that good code builds the foundation, but storytelling connects with the audience.`;

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
    const pageName = `blog-${i}`;
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
  title: 'Diya Mehra - Blog Page ${i}',
  description: 'A blog page detailing the journey and skills of Diya Mehra. Page ${i}',
};

export default function DiyaMehraBlogPage${i}() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl bg-white shadow-xl rounded-2xl border border-gray-100 p-8 sm:p-12">
        <header className="mb-10 text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 mb-4 capitalize">
            Blog Page ${i}: About Diya Mehra
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
