"use client";

import React, { useState } from "react";
import { ChevronDown, FileText } from "lucide-react";

const blogPosts = [
  {
    title: "1. My Journey into Web Development",
    content: "My fascination with technology began early during my time at SPS School. I spent hours in computer labs exploring the basics of the internet. When I finally wrote my first line of HTML, I realized that coding was just like solving a puzzle, but with immediate, visual results. Now, as a 19-year-old BCA student, web development has become more than a hobby; it is a core part of my identity and professional path."
  },
  {
    title: "2. Balancing BCA Studies and Real Projects",
    content: "Being in the final year of my Bachelor of Computer Applications program means my schedule is packed with database projects, algorithms, and exams. However, I always make time for real-world projects. Applying classroom theories to actual Next.js and Tailwind CSS codebases not only solidifies my learning but also keeps me motivated. It's challenging but incredibly rewarding."
  },
  {
    title: "3. Why I Chose Content Strategy",
    content: "While I love the logic of coding, I quickly realized that building a great website is only half the battle. If you don't know how to tell a story or connect with an audience, even the most beautifully coded application will go unnoticed. That's why I dove into content strategy and social media—bridging the gap between a great product and the people who need it."
  },
  {
    title: "4. Memories from SPS School",
    content: "SPS School was where the foundation was laid. Beyond the rigorous math classes that sharpened my analytical thinking, it was the environment of curiosity that shaped me. I learned how to formulate arguments, design basic structures, and most importantly, I learned how to learn—a skill that has been invaluable in the ever-changing tech landscape."
  },
  {
    title: "5. The Power of Clean UI/UX",
    content: "To me, a user interface should feel like a well-organized room. When things are cluttered, users get overwhelmed. I prioritize clean, modern, and cozy UI layouts. Using tools like Figma, I map out user journeys that feel intuitive before writing any code. Good design is transparent; users shouldn't even notice it because it just works."
  },
  {
    title: "6. Combining AI and Digital Marketing",
    content: "Artificial Intelligence is transforming how we approach marketing. By utilizing AI in digital marketing analytics, I can understand audience behavior on a granular level. From predicting engagement trends to optimizing content delivery times, AI allows me to create data-driven strategies that yield measurable results."
  },
  {
    title: "7. A Day in the Life of a 19-Year-Old Developer",
    content: "A typical day involves juggling college lectures, debugging React components, and planning social media calendars. I usually start with a cup of green tea, check my analytics dashboards, and then dive into some Next.js coding. The evenings are reserved for creative copy writing and reading up on the latest tech trends."
  },
  {
    title: "8. Mastering React and Next.js",
    content: "React fundamentally changed how I think about frontend architecture. Breaking UI down into reusable components just makes sense. Next.js took this a step further by offering server-side rendering, routing, and incredible performance optimizations out of the box. It has become my go-to framework for building robust web applications."
  },
  {
    title: "9. Social Media Analytics: What Numbers Tell Us",
    content: "Numbers tell a story. When I look at engagement rates, reach, and click-throughs, I don't just see data; I see human behavior. Understanding which posts resonate with an audience allows me to refine my content strategy continuously. It's a continuous feedback loop of creation, measurement, and optimization."
  },
  {
    title: "10. The Art of Writing Creative Copy",
    content: "Copywriting is about empathy. You have to understand the reader's pain points and desires. Whether I'm writing a technical blog, a catchy tweet, or a landing page headline, my goal is always to be clear, engaging, and authentic. Good copy breathes life into a static webpage."
  },
  {
    title: "11. Content Calendar Planning Basics",
    content: "Consistency is key in social media. I rely heavily on content calendars to map out campaigns, track deadlines, and ensure a cohesive brand narrative. By planning weeks in advance, I can balance my coding projects without sacrificing my online presence."
  },
  {
    title: "12. Why Figma is My Go-To Design Tool",
    content: "Figma is where my ideas take visual form. Its collaborative nature and intuitive interface make it perfect for wireframing and prototyping. Before I touch any CSS, I spend time in Figma refining color palettes, typography, and spacing to ensure the final product looks polished."
  },
  {
    title: "13. Frontend Logic vs Creative Media",
    content: "Many people see coding and creativity as separate domains, but I believe they are deeply intertwined. Frontend logic provides the structure—the bones—while creative media provides the soul. My unique advantage is being able to speak both languages fluently, creating digital experiences that are both functionally sound and aesthetically pleasing."
  },
  {
    title: "14. My Favorite Database Projects",
    content: "During my BCA studies, I've built several database management systems. Normalizing tables and writing complex SQL queries taught me how to handle data efficiently. A good frontend is useless without a reliable backend, and understanding databases has made me a much more well-rounded developer."
  },
  {
    title: "15. Algorithms That Changed How I Think",
    content: "Studying algorithms isn't just about passing exams; it's about learning to solve problems efficiently. Concepts like binary search or dynamic programming have trained my brain to break down massive problems into smaller, manageable steps. This analytical mindset bleeds into every aspect of my work."
  },
  {
    title: "16. The Importance of SEO in Web Design",
    content: "A beautiful website is invisible if search engines can't crawl it. I integrate SEO best practices right from the design phase. From semantic HTML and proper heading structures to optimized meta descriptions, I ensure that the sites I build are discoverable and rank well organically."
  },
  {
    title: "17. Building a Personal Brand",
    content: "In today's digital age, your personal brand is your resume. I've actively worked on showcasing my journey, my projects, and my learnings online. It's not about bragging; it's about documenting the process and connecting with like-minded individuals in the industry."
  },
  {
    title: "18. Navigating the Tech Industry as a Student",
    content: "Being a student in the tech industry can be daunting with the sheer amount of new frameworks and tools released daily. My strategy is to focus on the fundamentals. Frameworks come and go, but a strong grasp of JavaScript, UI principles, and data structures will always be relevant."
  },
  {
    title: "19. How Green Tea Fuels My Coding Sessions",
    content: "Coffee makes me jittery, but green tea provides that perfect, sustained focus. There's something calming about sipping a warm cup while hunting down a stubborn bug in my code. It has become a staple of my daily routine and a quiet companion during late-night coding sessions."
  },
  {
    title: "20. Exploring the Limits of Tailwind CSS",
    content: "Tailwind CSS has drastically sped up my development workflow. Instead of jumping between CSS files and React components, I can style everything using utility classes. It encourages consistency and makes building responsive layouts a breeze. I love pushing its limits to create complex, bespoke designs."
  },
  {
    title: "21. Structuring Clean Code for Large Apps",
    content: "As projects grow, code can quickly become a tangled mess. I place a high priority on code architecture—separating concerns, modularizing components, and writing clean, readable code. It takes a bit more time upfront, but it saves countless hours of debugging down the line."
  },
  {
    title: "22. Digital Marketing Strategies for 2024",
    content: "The digital marketing landscape is shifting towards authenticity and short-form video content. As a strategist, I'm focusing on creating genuine connections rather than just chasing metrics. It's about building communities and providing real value to the audience."
  },
  {
    title: "23. Finding Inspiration for UI Layouts",
    content: "Inspiration is everywhere. I often browse Awwwards, Dribbble, and even everyday physical objects to get ideas for UI layouts. I look at how colors interact in nature or how magazines structure their typography, and I try to translate those organic concepts into digital interfaces."
  },
  {
    title: "24. Overcoming Developer Burnout",
    content: "Burnout is real, especially when juggling a degree and personal projects. I combat it by stepping away from the screen, taking walks, and engaging in non-technical hobbies. Remembering that rest is a crucial part of the creative process helps me maintain a healthy balance."
  },
  {
    title: "25. My Vision for the Future in Tech",
    content: "Looking ahead, I want to continue blending technology with creative media. Whether it's leading a digital strategy team or architecting innovative web platforms, my goal is to create products that not only function flawlessly but also resonate deeply with users on an emotional level."
  }
];

export default function BlogSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="blog" className="py-24 bg-white relative z-10 border-t border-black/5">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif italic text-slate-800 mb-4">
            My <span className="font-sans not-italic font-bold text-brand-violet">Blog</span>
          </h2>
          <p className="text-slate-500 max-w-2xl mx-auto">
            A collection of 25 short blog posts sharing my journey, thoughts on web development, digital marketing, and student life.
          </p>
        </div>

        <div className="space-y-4">
          {blogPosts.map((post, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div 
                key={idx} 
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
                        {post.title}
                      </h3>
                      <p className="text-sm text-slate-500">By Diya Mehra • 2 min read</p>
                    </div>
                  </div>
                  <ChevronDown 
                    className={`w-6 h-6 text-slate-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} 
                  />
                </button>

                {isOpen && (
                  <div className="p-6 pt-0 bg-white border-t border-slate-100">
                    <div className="prose prose-slate max-w-none text-slate-600 space-y-4 pt-6 text-justify leading-relaxed">
                      <p>{post.content}</p>
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
