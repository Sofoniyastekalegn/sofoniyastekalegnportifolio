import React from "react";
import { motion } from "motion/react";
import { 
  Github, 
  Linkedin, 
  ExternalLink, 
  Mail, 
  Layers, 
  Download, 
  Sparkles 
} from "lucide-react";

interface ScrollablePortfolioProps {
  playSound: (sound: string) => void;
  setViewMode: (mode: "portfolio" | "hud") => void;
  setShowCvDossier: (show: boolean) => void;
  setLiveChatOpen: (open: boolean) => void;
  activeSkillTab: "frontend" | "backend" | "cms";
  setActiveSkillTab: (tab: "frontend" | "backend" | "cms") => void;
}

export default function ScrollablePortfolio({
  playSound,
  setViewMode,
  setShowCvDossier,
  setLiveChatOpen,
  activeSkillTab,
  setActiveSkillTab
}: ScrollablePortfolioProps) {
  return (
    <div 
      id="scrollable-portfolio-stage" 
      className="absolute inset-0 w-full h-full overflow-y-auto scroll-smooth z-20 font-sans p-4 sm:p-10 md:p-16 lg:p-20 select-text"
    >
      
      {/* Header Sticky Navigation Panel */}
      <header className="flex justify-between items-center w-full max-w-7xl mx-auto py-5 border-b border-brand-cream/15 mb-10 relative z-30">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 bg-brand-cream animate-pulse rounded-none" />
          <span className="font-display font-black text-xs sm:text-sm tracking-[0.2em] text-[#eedfc7] uppercase">
            SOFONIYAS TEKALEGN // CORE
          </span>
        </div>

        {/* Dual Mode Pilot Switcher */}
        <div className="flex bg-black/85 border border-brand-cream/30 p-0.5 divide-x divide-brand-cream/20 shadow-lg backdrop-blur-md rounded-none">
          <button 
            onClick={() => { playSound("click"); setViewMode("portfolio"); }}
            className="px-3 py-1 font-mono text-[9px] sm:text-[10px] tracking-widest transition-all cursor-pointer bg-brand-cream text-black font-extrabold"
          >
            WEBSITE CORE
          </button>
          <button 
            onClick={() => { playSound("click"); setViewMode("hud"); }}
            className="px-3 py-1 font-mono text-[9px] sm:text-[10px] tracking-widest transition-all text-brand-cream-dim hover:text-white cursor-pointer"
          >
            CYBER HUD (26 DECK)
          </button>
        </div>

        {/* Contacts column */}
        <div className="hidden md:flex items-center gap-4">
          <a 
            href="https://github.com/Sofoniyastekalegn" 
            target="_blank" 
            rel="noopener noreferrer"
            onMouseEnter={() => playSound("matrix")}
            className="text-[#eedfc7]/70 hover:text-brand-cream transition-colors cursor-pointer"
            title="GitHub Profile"
          >
            <Github className="w-4 h-4" />
          </a>
          <a 
            href="https://www.linkedin.com/in/sofoniyas-tekalegn-962868287" 
            target="_blank" 
            rel="noopener noreferrer"
            onMouseEnter={() => playSound("matrix")}
            className="text-[#eedfc7]/70 hover:text-brand-cream transition-colors cursor-pointer"
            title="LinkedIn network"
          >
            <Linkedin className="w-4 h-4" />
          </a>
          <button
            onClick={() => { playSound("click"); setShowCvDossier(true); }}
            className="font-mono text-[9px] sm:text-[10px] tracking-widest border border-brand-cream hover:bg-brand-cream hover:text-black py-1 px-3.5 transition-all cursor-pointer uppercase font-bold"
          >
            DOSSIER CV
          </button>
        </div>
      </header>

      {/* Hero / Introduction Section */}
      <section id="hero-section" className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center py-6 sm:py-12 border-b border-brand-cream-dark/30">
        <div className="lg:col-span-7 space-y-6">
          <div className="inline-flex items-center gap-2 border border-brand-cream/20 bg-brand-cream/5 px-3 py-1 text-xs font-mono tracking-widest text-brand-cream">
            <Sparkles className="w-3.5 h-3.5 text-brand-cream animate-pulse" />
            🚀 FULL-STACK WEB DEVELOPER
          </div>
          
          <h1 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl tracking-tight leading-none text-brand-cream">
            Hello, I'm <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-cream via-amber-100 to-[#eedfc7] drop-shadow-sm">Sofoniyas Tekalegn</span>
          </h1>
          
          <p className="font-sans font-light text-brand-cream-dim/90 text-sm sm:text-base leading-relaxed max-w-2xl text-justify">
            Fullstack Developer and AI Engineer with hands-on experience across the entire stack — React, Next.js, TypeScript on the frontend, Python, Node.js, and Java on the backend. I work with MongoDB, PostgreSQL, Supabase, and Vector DBs to build fast, AI-ready systems — integrating LLMs and automation pipelines that replace manual processes with intelligent workflows. From Figma to deployment — clean code, thoughtful UX, real impact.
          </p>

          {/* Hero CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 pt-2">
            <button
              onClick={() => {
                playSound("matrix");
                const el = document.getElementById("projects-grid-anchor");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
              className="flex items-center justify-center gap-2 bg-brand-cream hover:bg-black text-black hover:text-brand-cream border border-brand-cream py-2.5 px-6 font-mono text-xs tracking-widest font-bold transition-all cursor-pointer shadow-md"
            >
              <Layers className="w-4 h-4" />
              VIEW PROJECTS
            </button>

            <button
              onClick={() => { playSound("click"); setShowCvDossier(true); }}
              className="flex items-center justify-center gap-2 border border-brand-cream/40 hover:border-brand-cream text-[#eedfc7] hover:bg-brand-cream/5 py-2.5 px-6 font-mono text-xs tracking-widest transition-all cursor-pointer"
            >
              <Download className="w-4 h-4 text-brand-cream" />
              DOWNLOAD CV / RESUME
            </button>

            {/* Micro social row */}
            <div className="flex items-center justify-center gap-4 border border-brand-cream-dark/50 bg-black/60 px-5 py-2.5 text-brand-cream-dim">
              <span className="font-mono text-[9px] tracking-widest uppercase font-semibold">LINKS:</span>
              <a 
                href="https://github.com/Sofoniyastekalegn" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-brand-cream transition-colors cursor-pointer"
              >
                <Github className="w-4 h-4 hover:scale-110 transition-transform" />
              </a>
              <a 
                href="https://www.linkedin.com/in/sofoniyas-tekalegn-962868287" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-brand-cream transition-colors cursor-pointer"
              >
                <Linkedin className="w-4 h-4 hover:scale-110 transition-transform" />
              </a>
            </div>
          </div>
        </div>

        {/* Generated Cyber Astronaut Image block */}
        <div className="lg:col-span-5 flex justify-center lg:justify-end">
          <div className="relative group max-w-xs sm:max-w-sm w-full">
            <div className="absolute -inset-1.5 bg-gradient-to-r from-brand-cream/20 to-amber-500/10 blur opacity-45 group-hover:opacity-80 transition duration-1000 group-hover:duration-200" />
            <div className="absolute inset-0 bg-brand-cream-dark/30 border border-brand-cream/30" />
            
            <img 
              src="/src/assets/images/cyber_astronaut_1780708518597.png" 
              alt="Sofoniyas Tekalegn Cyber Astronaut Portrait"
              referrerPolicy="no-referrer"
              className="w-full h-auto object-cover relative z-10 border border-brand-cream/20 drop-shadow-2xl filter grayscale-[15%] group-hover:grayscale-0 transition-all duration-750" 
            />

            <div className="absolute bottom-2.5 left-2.5 z-20 bg-black/85 backdrop-blur-md px-3 py-1 text-[9px] font-mono tracking-widest text-[#eedfc7]/80 border border-brand-cream/20 uppercase font-bold">
              SYS_AVATAR: SO_99
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section Grid */}
      <section className="w-full max-w-7xl mx-auto py-12 border-b border-brand-cream-dark/30">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { val: "5", suffix: "+", title: "YEARS EXPERIENCE", desc: "Across web & AI spaces" },
            { val: "25", suffix: "+", title: "PROJECTS COMPLETED", desc: "Enterprise & production modules" },
            { val: "8", suffix: "+", title: "TECH STACKS", desc: "Frontend, databases & integrations" },
            { val: "12", suffix: "+", title: "HAPPY CLIENTS", desc: "Operational impact achieved" }
          ].map((stat, i) => (
            <div key={i} className="border border-brand-cream-dark/40 bg-black/50 p-6 flex flex-col justify-center items-center text-center shadow-lg relative group overflow-hidden">
              <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-brand-cream/40 animate-pulse" />
              <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-brand-cream/40 animate-pulse" />
              
              <span className="font-display font-black text-4xl sm:text-5xl text-brand-cream tracking-tight block">
                {stat.val}<span className="text-amber-300 font-sans text-2xl font-light">{stat.suffix}</span>
              </span>
              <span className="font-mono text-[9px] sm:text-[10px] tracking-widest uppercase text-[#eedfc7] mt-3 block font-bold">
                {stat.title}
              </span>
              <p className="font-sans text-[11px] text-brand-cream-dim/70 mt-1 block">
                {stat.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* About Us & Journey Section with scroll-triggered zoom-in photo and slide down text */}
      <section className="w-full max-w-7xl mx-auto py-16 border-b border-brand-cream-dark/30 relative">
        <div id="about-us-anchor" />
        
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.1 }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"
        >
          {/* TEXT COL: Fades In from Above */}
          <motion.div 
            variants={{
              hidden: { opacity: 0, y: -45 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
            }}
            className="lg:col-span-7 space-y-6"
          >
            <div>
              <span className="font-mono text-[#eedfc7]/40 text-[10px] tracking-[0.2em] block uppercase">// CORE DEVELOPER BIOGRAPHY</span>
              <h2 className="font-display font-black text-2xl sm:text-3xl tracking-wider text-brand-cream mt-1 uppercase">
                My Web Development Journey
              </h2>
            </div>

            <p className="font-sans font-light text-brand-cream-dim/95 text-sm leading-relaxed text-justify">
              From humble beginnings to mastering modern frameworks and technologies, my journey has been shaped by both academic rigor and hands-on experience. I've traversed both the academic landscape and practical deployments to bridge complex system logic with human impact.
            </p>

            {/* Learning Platforms */}
            <div>
              <span className="font-mono text-[9.5px] uppercase tracking-wider text-brand-cream block mb-3 font-bold">// PLATFORMS &amp; EDUCATION CREDENTIALS:</span>
              <div className="flex flex-wrap gap-2">
                {[
                  "University of the People",
                  "American College of Technology (ACT)",
                  "Harvard's CS50",
                  "FreeCodeCamp",
                  "Coursera",
                  "University of London (K-Means Clustering)"
                ].map((platform, i) => (
                  <span 
                    key={i} 
                    className="font-mono text-[10px] border border-brand-cream/15 bg-[#eedfc7]/5 hover:bg-brand-cream/10 px-3 py-1 text-brand-cream transition-all uppercase pointer-events-none font-medium"
                  >
                    ■ {platform}
                  </span>
                ))}
              </div>
            </div>

            {/* Vision & Mission */}
            <div className="border-t border-brand-cream-dark/30 pt-6 space-y-4">
              <h3 className="font-display font-bold text-lg text-brand-cream uppercase tracking-wider">
                Vision &amp; Mission
              </h3>
              <p className="font-sans font-light text-brand-cream-dim/95 text-sm leading-relaxed text-justify">
                I build web platforms that solve real business problems. Whether it's enhancing e-commerce experiences, automating backend operational workflows, or improving access to educational content platforms, I strive to build software with structural integrity and clean product experiences.
              </p>
              <div className="border-l-2 border-brand-cream/40 pl-4 py-1 italic text-brand-cream-dim text-sm max-w-xl">
                "Currently, I'm focused on improving the Hisab ERP platform and gathering real-world feedback from business owners, professionals, and organizations committed to digital transformation and transparency."
              </div>
            </div>
          </motion.div>

          {/* PHOTO COL: Zooms in on Scroll */}
          <motion.div 
            variants={{
              hidden: { opacity: 0.8, scale: 0.92 },
              visible: { opacity: 1, scale: 1.05, transition: { duration: 0.9, ease: "easeOut" } }
            }}
            className="lg:col-span-5 flex justify-center relative"
          >
            <div className="relative border border-brand-cream/30 p-2.5 bg-black/60 shadow-2xl overflow-hidden max-w-sm w-full">
              <div className="absolute inset-0 bg-radial-vignette opacity-50 z-10 pointer-events-none" />
              
              <img 
                src="/src/assets/images/project_dashboard_1780708537353.png" 
                alt="Sofoniyas's Web Infrastructure Dashboard Preview"
                referrerPolicy="no-referrer"
                className="w-full h-auto object-cover relative select-none border border-brand-cream/10 grayscale-[35%] hover:grayscale-0 transition-all duration-500"
              />

              <div className="p-3 font-mono text-[8.5px] uppercase tracking-wider text-brand-cream-dim/80 text-center border-t border-brand-cream-dark/40 mt-2 font-bold">
                INTELLIGENT INTEGRATION // CORE DASHBOARD ARCHIVE
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Chronological Milestone Timeline */}
      <section className="w-full max-w-7xl mx-auto py-16 border-b border-brand-cream-dark/30">
        <div className="flex flex-col items-center text-center mb-12">
          <span className="font-mono text-[#eedfc7]/40 text-[10px] tracking-[0.25em] block uppercase">// TIMELINE CHRONICLES</span>
          <h2 className="font-display font-black text-2xl sm:text-3xl tracking-wider text-brand-cream mt-1 uppercase">
            Chronological Timeline
          </h2>
        </div>

        <div className="relative border-l border-brand-cream/25 pl-6 sm:pl-10 max-w-4xl mx-auto space-y-12">
          {[
            { year: "2019", title: "BEGINNING THE JOURNEY", desc: "Started learning web development through online platforms, mastering HTML5, CSS3, grid frameworks, and basic JavaScript." },
            { year: "2011", title: "FIRST PROFESSIONAL ROLE", desc: "Joined dynamic development teams to engineer e-commerce solutions, responsive architectures, and client systems." },
            { year: "2022", title: "EXPANDING SKILL SET", desc: "Acquired deep fluency in modern framework layouts including Next.js, React SPA patterns, Express/Node.js servers, and relational databases." },
            { year: "2024", title: "THE YOUTH PRINT ARCHITECTURE", desc: "Developed and launched youth engagement portals at theyouthprint.org with Next.js and headless Strapi CMS, improving digital asset loads and delivery." },
            { year: "2026 - PRESENT", title: "AIWAVEAGENCY AGENT DESIGNS", desc: "Scaling automated operations using voice AI agents, Retell AI, Vapi, LangChain models, and high efficiency n8n and Zapier integration pipelines." }
          ].map((node, idx) => (
            <div key={idx} className="relative group select-text">
              <div className="absolute w-3 h-3 bg-brand-cream border border-black rounded-none left-[-31px] sm:left-[-46px] top-1.5 group-hover:scale-125 transition-transform" />
              
              <div className="border border-brand-cream-dark/30 bg-black/40 p-5 hover:border-brand-cream/40 hover:bg-black/80 transition-all">
                <span className="inline-block font-mono text-xs text-black bg-brand-cream px-2 py-0.5 font-extrabold tracking-wider mb-2">
                  {node.year}
                </span>
                <h4 className="font-display font-black text-sm sm:text-base tracking-widest text-brand-cream uppercase mb-1">
                  {node.title}
                </h4>
                <p className="font-sans font-light text-[12.5px] leading-relaxed text-brand-cream-dim/90">
                  {node.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Interactive Skills Matrix Section */}
      <section className="w-full max-w-7xl mx-auto py-16 border-b border-brand-cream-dark/30">
        <div className="flex flex-col items-center text-center mb-10">
          <span className="font-mono text-[#eedfc7]/40 text-[10px] tracking-[0.25em] block uppercase">// SKILL MATRIX METRICS</span>
          <h2 className="font-display font-black text-2xl sm:text-3xl tracking-wider text-brand-cream mt-1 uppercase">
            Tech Stacks &amp; Mastered Skills
          </h2>
          <p className="font-sans font-light text-brand-cream-dim/75 text-sm max-w-2xl mt-2 leading-relaxed">
            Over 5 years of experience building modern, responsive, and scalable web applications across Frontend, Backend, and CMS operational domains:
          </p>
        </div>

        {/* Tab Selectors */}
        <div className="flex justify-center gap-2 mb-8">
          {[
            { id: "frontend" as const, label: "FRONTEND SKILLS" },
            { id: "backend" as const, label: "BACKEND SKILLS" },
            { id: "cms" as const, label: "CMS & AUTOMATION" }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => { playSound("click"); setActiveSkillTab(tab.id); }}
              className={`font-mono text-[9px] sm:text-[10px] tracking-widest px-4 py-2 border transition-all cursor-pointer uppercase ${
                activeSkillTab === tab.id 
                  ? "bg-brand-cream text-black font-extrabold border-brand-cream" 
                  : "border-brand-cream-dark/35 text-brand-cream-dim/80 hover:border-brand-cream/40"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Dynamic Glowing progress bar lists */}
        <div className="max-w-3xl mx-auto space-y-5">
          {activeSkillTab === "frontend" && [
            { name: "React.js Framework (Hooks & Context)", pct: 90 },
            { name: "Next.js Architecture (SSR/ISR/Actions)", pct: 85 },
            { name: "Vue.js & Nuxt.js Frontend Stack", pct: 75 },
            { name: "JavaScript / ES6+ & TypeScript", pct: 95 },
            { name: "Tailwind CSS Styling Engine", pct: 90 },
            { name: "HTML5 / CSS3 Layouts & Accessibility", pct: 95 }
          ].map((skill, i) => (
            <div key={i} className="space-y-1.5 select-text">
              <div className="flex justify-between font-mono text-[10.5px] text-brand-cream-dim">
                <span>{skill.name}</span>
                <span className="font-bold text-brand-cream">{skill.pct}%</span>
              </div>
              <div className="w-full bg-[#3b362e]/30 h-2 border border-brand-cream-dark/45 overflow-hidden">
                <div 
                  className="bg-brand-cream h-full transition-all duration-1000 ease-out shadow-[0_0_10px_#eedfc7]" 
                  style={{ width: `${skill.pct}%` }} 
                />
              </div>
            </div>
          ))}

          {activeSkillTab === "backend" && [
            { name: "Python Systems Logic & Automated Scripts", pct: 85 },
            { name: "Node.js & Express.js Backends", pct: 85 },
            { name: "NestJS Server Framework Core", pct: 80 },
            { name: "Auth.js Security Tokens & Middleware", pct: 75 },
            { name: "RESTful APIs & GraphQL Hasura Pipelines", pct: 90 },
            { name: "AI Voice Agents (Vapi / Retell AI / LangChain)", pct: 85 }
          ].map((skill, i) => (
            <div key={i} className="space-y-1.5 select-text">
              <div className="flex justify-between font-mono text-[10.5px] text-brand-cream-dim">
                <span>{skill.name}</span>
                <span className="font-bold text-brand-cream">{skill.pct}%</span>
              </div>
              <div className="w-full bg-[#3b362e]/30 h-2 border border-brand-cream-dark/45 overflow-hidden">
                <div 
                  className="bg-brand-cream h-full transition-all duration-1000 ease-out shadow-[0_0_10px_#eedfc7]" 
                  style={{ width: `${skill.pct}%` }} 
                />
              </div>
            </div>
          ))}

          {activeSkillTab === "cms" && [
            { name: "Wix Platform Visual Architectures", pct: 90 },
            { name: "Strapi Headless CMS Data Structuring", pct: 90 },
            { name: "WordPress System Configuration & Theme design", pct: 75 },
            { name: "Shopify Custom eCommerce Engines", pct: 70 },
            { name: "Framer Interactions & Visual designs", pct: 80 },
            { name: "n8n Workflow Automation & Zapier Webhooks", pct: 90 }
          ].map((skill, i) => (
            <div key={i} className="space-y-1.5 select-text">
              <div className="flex justify-between font-mono text-[10.5px] text-brand-cream-dim">
                <span>{skill.name}</span>
                <span className="font-bold text-brand-cream">{skill.pct}%</span>
              </div>
              <div className="w-full bg-[#3b362e]/30 h-2 border border-brand-cream-dark/45 overflow-hidden">
                <div 
                  className="bg-brand-cream h-full transition-all duration-1000 ease-out shadow-[0_0_10px_#eedfc7]" 
                  style={{ width: `${skill.pct}%` }} 
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Projects Grid */}
      <section className="w-full max-w-7xl mx-auto py-16">
        <div id="projects-grid-anchor" />
        
        <div className="flex flex-col items-center text-center mb-12">
          <span className="font-mono text-[#eedfc7]/40 text-[10px] tracking-[0.25em] block uppercase">// COMMERCIAL &amp; OPEN-SOURCE RELEASES</span>
          <h2 className="font-display font-black text-2xl sm:text-3xl tracking-wider text-brand-cream mt-1 uppercase">
            Featured Projects
          </h2>
          <p className="font-sans font-light text-brand-cream-dim/75 text-sm max-w-2xl mt-2 leading-relaxed">
            Click any project card to open the official live URL in a secure external browser tab!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              title: "AI Voice Agent / AI Wave Agency",
              href: "https://www.aiwaveagency.com/",
              desc: "Scale your Agency With AI Workforce. Deploy enterprise-grade AI Voice agents that handle bookings, qualify leads, and update your CRM - all while you sleep.",
              tags: ["AI Voice", "Automation", "CRM Systems", "Next.js"]
            },
            {
              title: "AI Receptionist Dashboard / AI Wave",
              href: "https://ai-wave-delta.vercel.app/dashboard",
              desc: "Your secure visual control dashboard. Streamline automated voice calls, monitor live analytics charts, and manage system pipelines easily.",
              tags: ["Next.js", "AI Dashboard", "D3 / Recharts Data", "Vapi"]
            },
            {
              title: "Oxygen Manufacturing Website / Edget Gas",
              href: "https://edgetgas.com/",
              desc: "Developed a clean, fast-loading industrial solutions index page, optimizing assets and speed ratios for heavy-machinery distribution.",
              tags: ["React", "Performance Optimization", "Tailwind CSS", "Enterprise"]
            },
            {
              title: "Import-Export Engine / Metbel Trading",
              href: "https://metbeltrading.com/",
              desc: "Designed and built blog showcase systems for coffee and bean logistics. Seamless galleries, high-contrast SEO meta indexing, and responsive design layouts.",
              tags: ["React.js", "Express.js Core", "PostgreSQL", "SEO Audit"]
            },
            {
              title: "Youth Engagement / Youth Print Platform",
              href: "https://theyouthprint.org/",
              desc: "Bespoke digital portal empowering ecological and content management systems using modern React.js architectures integrated on a Strapi engine.",
              tags: ["Next.js", "Strapi", "Headless CMS", "Social Impact"]
            },
            {
              title: "Asthopia Leather eCommerce Model",
              href: "https://github.com/Sofoniyastekalegn",
              desc: "High-contrast luxury bag showcase and e-commerce model designed for native Addis Ababa commerce distribution tracks.",
              tags: ["E-Commerce", "UX Wireframe", "Responsive Grid", "Stripe Proxy"]
            }
          ].map((proj, idx) => (
            <a 
              key={idx}
              href={proj.href}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => playSound("matrix")}
              className="border border-brand-cream-dark/30 bg-black/40 p-6 flex flex-col justify-between hover:border-brand-cream hover:bg-black/90 transition-all group overflow-hidden select-text relative cursor-pointer"
            >
              <div className="space-y-4">
                <div className="flex justify-between items-start border-b border-brand-cream-dark/20 pb-3">
                  <span className="font-mono text-xs text-[#eedfc7]/40 tracking-widest uppercase">NODE_PROJ_0{idx+1}</span>
                  <ExternalLink className="w-4 h-4 text-brand-cream-dim group-hover:text-brand-cream transition-colors" />
                </div>

                <h3 className="font-display font-black text-sm sm:text-base tracking-widest text-brand-cream uppercase group-hover:text-[#eedfc7] transition-colors leading-tight">
                  {proj.title}
                </h3>

                <p className="font-sans font-light text-xs text-brand-cream-dim/90 leading-relaxed min-h-[4.5rem]">
                  {proj.desc}
                </p>
              </div>

              <div className="pt-4 border-t border-brand-cream-dark/20 mt-4">
                <div className="flex flex-wrap gap-1.5">
                  {proj.tags.map((tg, i) => (
                    <span key={i} className="font-mono text-[8.5px] border border-brand-cream-dim/35 px-2 py-0.5 text-brand-cream-dim font-bold uppercase">
                      {tg}
                    </span>
                  ))}
                </div>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* Footer Element with Secure Comms live mailer launching */}
      <footer className="w-full max-w-7xl mx-auto pt-16 pb-12 border-t border-brand-cream-dark/30 flex flex-col sm:flex-row justify-between items-center gap-6 font-mono text-[10px] text-brand-cream-dim/50 tracking-widest">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-brand-cream animate-ping" />
          <span>SOFONIYAS TEKALEGN © 2026 // ALL SYSTEM PARAMETERS COMMITTED</span>
        </div>

        <div className="flex gap-4">
          <span className="text-brand-cream-dim/60">SYS: PORTFOLIO_STABLE</span>
          <span>//</span>
          <button 
            onClick={() => { playSound("click"); setLiveChatOpen(true); }}
            className="hover:text-brand-cream inline-flex items-center gap-1.5 cursor-pointer font-bold underline"
          >
            <Mail className="w-3.5 h-3.5" /> SECURE MAIL UNIT
          </button>
        </div>
      </footer>
    </div>
  );
}
