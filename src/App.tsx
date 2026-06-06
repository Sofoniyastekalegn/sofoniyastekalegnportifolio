/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef, ChangeEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Volume2, 
  VolumeX, 
  Play, 
  Pause, 
  CheckCircle2, 
  ChevronRight, 
  ChevronLeft,
  Grid, 
  Hash, 
  Cpu, 
  Terminal, 
  RotateCcw,
  Sparkles,
  Layers,
  Activity,
  Video,
  Image,
  Upload,
  Link2,
  Github,
  Linkedin,
  Mail,
  FileText,
  Download,
  Send,
  MessageSquare,
  X,
  ExternalLink
} from "lucide-react";
import { PORTFOLIO_SLIDES, PortfolioSlide } from "./data";
import InteractiveBackground from "./components/InteractiveBackground";
import ScrollablePortfolio from "./components/ScrollablePortfolio";

// Extract clean YouTube Video ID from any watch link, short, embed URL or complete iframe snippet
function getYouTubeId(url: string): string | null {
  if (!url) return null;
  
  let targetUrl = url.trim();
  // If user pasted/dragged an iframe element, extract the src attribute
  if (targetUrl.includes("<iframe")) {
    const srcMatch = targetUrl.match(/src="([^"]+)"/);
    if (srcMatch && srcMatch[1]) {
      targetUrl = srcMatch[1];
    }
  }

  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = targetUrl.match(regExp);
  if (match && match[2] && match[2].length === 11) {
    return match[2];
  }
  
  // Fallback if they write just the ID
  if (targetUrl.length === 11 && /^[a-zA-Z0-9_-]{11}$/.test(targetUrl)) {
    return targetUrl;
  }
  return null;
}

// Get high-fidelity background default stream based on active portfolio sections
function getSlideDefaultVideo(index: number): string {
  if (index === 1) {
    // Second section / second page plays the requested cyber video
    return "https://www.youtube.com/watch?v=-s5KrjH7aQ0";
  }
  return "https://www.youtube.com/watch?v=GYdNzgA2GIY";
}

export default function App() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true); // Default web standard to muted to prevent blocked audio
  const [showIndexGrid, setShowIndexGrid] = useState(false);
  const [showMetrics, setShowMetrics] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [hasInteracted, setHasInteracted] = useState(false);

  // Switch between Website Core Portfolio and the 26-Slide Tactical HUD simulation
  const [viewMode, setViewMode] = useState<'portfolio' | 'hud'>('portfolio');
  const [activeSkillTab, setActiveSkillTab] = useState<'frontend' | 'backend' | 'cms'>('frontend');

  // New responsive features: CV Archive & Interactive live contact mailer states
  const [showCvDossier, setShowCvDossier] = useState(false);
  const [liveChatOpen, setLiveChatOpen] = useState(false);
  const [chatName, setChatName] = useState("");
  const [chatSubject, setChatSubject] = useState("");
  const [chatMessage, setChatMessage] = useState("");
  const [chatSubmitted, setChatSubmitted] = useState(false);

  // Download plain-text resume action builder
  const handleDownloadTextResume = () => {
    playSound("click");
    const doc = `========================================================================
SOFONIYAS TEKALEGN - PROFESSIONAL CURRICULUM VITAE / RESUME
========================================================================
Role: Full-Stack Developer · AI Engineer · Voice AI & LLM Specialist
Location: Addis Ababa, Ethiopia
Phone: +251 978 695 556
Email: sofoniyastekalegn@gmail.com
Agency: aiwaveagency.com
LinkedIn: https://www.linkedin.com/in/sofoniyas-tekalegn-962868287
GitHub: https://github.com/Sofoniyastekalegn/
Portfolio: sofoniyastekalign.vercel.app

------------------------------------------------------------------------
PROFESSIONAL PROFILE
------------------------------------------------------------------------
Full-Stack Developer and AI Engineer with hands-on experience across the entire 
product lifecycle — from SSR web apps and ERP systems to AI voice agents, 
LLM-powered chatbots, and automated workflows. Proficient in Next.js, React, 
Vue/Nuxt, NestJS, Node.js, Java Spring Boot, and Python. Experienced with 
Pinecone, Voyage, LangChain, Vapi, Retell AI, n8n, and Zapier for intelligent 
automation and CRM/lead-qualification pipelines. Passionate about clean 
architecture and impactful user experiences.

------------------------------------------------------------------------
TECHNICAL SKILLS
------------------------------------------------------------------------
* AI & Voice: Vapi, Retell AI, LangChain, OpenAI, Pinecone, Voyage, n8n, Zapier, Python, LLMs
* Frontend: Next.js (SSR/ISR), React, Vue.js, Nuxt.js, Vuex, TypeScript, JavaScript, HTML5/CSS3
* Backend: Node.js, NestJS, Express, Java Spring Boot, Django, Python, GraphQL, Hasura
* Databases: PostgreSQL, MySQL, Supabase, Pinecone (vector DB)
* Mobile/CMS: React Native, Flutter, Strapi, WordPress, Figma
* Specialities: AI Chatbots, Voice Agents, CRM Dev, Lead Qualification, ERP, Data Viz (Tableau)

------------------------------------------------------------------------
PROFESSIONAL EXPERIENCE
------------------------------------------------------------------------
1. Backend Engineer | Wozena AI Platform (wozena.com)
   Apr 2026 – Present (Remote)
   - Developing scalable backend services for an AI-powered platform using Python, Node.js, and NestJS.
   - Building and maintaining RESTful APIs and microservices architecture to support AI-driven features.
   - Collaborating on LLM integration, data pipelines, and performance optimization across the stack.

2. Software Infrastructure & Front-End Developer | Youth Print Organization (theyouthprint.org)
   Jul 2024 – Present (Addis Ababa)
   - Built and maintained dynamic SSR web apps using Next.js and Strapi CMS for climate-change platform theyouthprint.org.
   - Improved digital content management, SEO performance, and user engagement metrics.

3. Full-Stack Developer (Contract) | Metbel Trading
   May 2025 (Addis Ababa)
   - Designed ERP inventory & stock systems using Python and React.
   - Enhanced supply-chain tracking and operational efficiency.

4. Web Developer Intern | Kodastropi Marketing Solutions
   Aug – Oct 2025 (Addis Ababa)
   - Built responsive UI components and animations with Vue.js and Nuxt.js.
   - Collaborated on client-facing marketing sites with smooth UX.

------------------------------------------------------------------------
KEY PROJECTS
------------------------------------------------------------------------
* AI Voice Agent Platform (2025)
  Built an AI receptionist using Vapi & Retell AI — automates call analytics, booking, and lead qualification for service businesses.
  Link: https://aiwave.aiwaveagency.com/

* AIWave Agency Website (2025)
  Full AI agency platform with n8n & Zapier workflow automation pipelines and CRM integrations.
  Link: https://www.aiwave.aiwaveagency.com/

* Netsanet – AI Support for Women (2025)
  Python chatbot + LLM embeddings (Pinecone, Voyage) empowering Ethiopian women with legal and resource access.

* Climate Change Platform – The Youth Print (2024)
  Next.js SSR/ISR + Strapi CMS; content-heavy platform optimised for SEO and performance.
  Link: https://theyouthprint.org/

* Gibson School Systems (2024)
  School management & website — Next.js SSR + WordPress headless CMS.
  Link: https://gibsonschoolsystems.com/

* StockBot – Ethio AI Stock Chatbot (2023)
  Open-source chatbot delivering real-time Ethiopian stock updates and trading insights.
  Link: https://stockbot-ethio-bysofi.vercel.app/

* Oxygen Gas Delivery (Edget Gas) (2024)
  Real-time delivery platform built with Next.js SSR.
  Link: https://edgetgas.com

------------------------------------------------------------------------
EDUCATION & CERTIFICATIONS
------------------------------------------------------------------------
* B.Sc. Computer Science
  American College of Technology (ACT), Addis Ababa [2024 – 2028 (expected)]
* Front-End Web Developer — Udacity [Feb – Dec 2025]
* Financial Markets — Yale University / Coursera [Mar – Jul 2023]
* Foundations of Data Science: K-Means Clustering — University of London / Coursera [Feb – Apr 2021]
* Advanced Training — Harvard CS50 · FreeCodeCamp · CodeWithMosh · Scrimba

------------------------------------------------------------------------
LANGUAGES
------------------------------------------------------------------------
* Amharic: Native
* English: Fluent
* French: Basic
`;

    const blob = new Blob([doc], { type: "text/plain;charset=utf-8" });
    const element = document.createElement("a");
    element.href = URL.createObjectURL(blob);
    element.download = "sofoniyas_tekalegn_cv.txt";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  // Video background engine
  const [backgroundType, setBackgroundType] = useState<'canvas' | 'video'>('video');
  const [videoUrl, setVideoUrl] = useState<string>('https://www.youtube.com/watch?v=GYdNzgA2GIY');
  const [videoOpacity, setVideoOpacity] = useState<number>(0.45);
  const [isDragOver, setIsDragOver] = useState(false);
  const [customFileName, setCustomFileName] = useState<string | null>(null);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const currentSlide = PORTFOLIO_SLIDES[currentIndex];
  const autoPlayTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Automatically play/load video on source swap
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
      videoRef.current.play().catch(() => {});
    }
  }, [videoUrl]);

  // Automatically update the default video URL based on page/section if they haven't uploaded a custom local file
  useEffect(() => {
    if (!customFileName) {
      setVideoUrl(getSlideDefaultVideo(currentIndex));
    }
  }, [currentIndex, customFileName]);

  // Handle local video drop/drag upload
  useEffect(() => {
    const handleDragOver = (e: DragEvent) => {
      e.preventDefault();
      setIsDragOver(true);
    };
    const handleDragLeave = () => {
      setIsDragOver(false);
    };
    const handleDrop = (e: DragEvent) => {
      e.preventDefault();
      setIsDragOver(false);
      const file = e.dataTransfer?.files?.[0];
      if (file && file.type.startsWith("video/")) {
        const localUrl = URL.createObjectURL(file);
        setVideoUrl(localUrl);
        setCustomFileName(file.name);
        setBackgroundType('video');
        playSound("click");
      }
    };

    window.addEventListener("dragover", handleDragOver);
    window.addEventListener("dragleave", handleDragLeave);
    window.addEventListener("drop", handleDrop);

    return () => {
      window.removeEventListener("dragover", handleDragOver);
      window.removeEventListener("dragleave", handleDragLeave);
      window.removeEventListener("drop", handleDrop);
    };
  }, []);

  const handleVideoUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const localUrl = URL.createObjectURL(file);
      setVideoUrl(localUrl);
      setCustomFileName(file.name);
      setBackgroundType('video');
      playSound("click");
    }
  };

  // Sound generator using Web Audio API
  const playSound = (type: "hover" | "click" | "transition" | "matrix" | "grid") => {
    if (isMuted) return;
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      if (type === "hover") {
        osc.type = "sine";
        osc.frequency.setValueAtTime(1400, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(1900, ctx.currentTime + 0.08);
        gain.gain.setValueAtTime(0.008, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.08);
        osc.start();
        osc.stop(ctx.currentTime + 0.08);
      } else if (type === "click") {
        osc.type = "sine";
        osc.frequency.setValueAtTime(880, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(1320, ctx.currentTime + 0.12);
        gain.gain.setValueAtTime(0.02, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.12);
        osc.start();
        osc.stop(ctx.currentTime + 0.12);
      } else if (type === "transition") {
        osc.type = "sine";
        osc.frequency.setValueAtTime(320, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(840, ctx.currentTime + 0.25);
        gain.gain.setValueAtTime(0.03, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.25);
        osc.start();
        osc.stop(ctx.currentTime + 0.25);
      } else if (type === "matrix") {
        osc.type = "triangle";
        osc.frequency.setValueAtTime(440, ctx.currentTime);
        osc.frequency.setValueAtTime(554, ctx.currentTime + 0.04);
        osc.frequency.setValueAtTime(659, ctx.currentTime + 0.08);
        gain.gain.setValueAtTime(0.012, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.16);
        osc.start();
        osc.stop(ctx.currentTime + 0.16);
      } else if (type === "grid") {
        osc.type = "sine";
        osc.frequency.setValueAtTime(180, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(380, ctx.currentTime + 0.2);
        gain.gain.setValueAtTime(0.02, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.2);
        osc.start();
        osc.stop(ctx.currentTime + 0.2);
      }
    } catch (e) {
      // Audio fallback
    }
  };

  // Keyboard and Mouse coordinate listeners
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      setHasInteracted(true);
      if (e.key === "ArrowRight" || e.key === " ") {
        handleNext();
      } else if (e.key === "ArrowLeft") {
        handlePrev();
      } else if (e.key === "m" || e.key === "M") {
        setIsMuted(prev => !prev);
      } else if (e.key === "g" || e.key === "G") {
        setShowIndexGrid(prev => !prev);
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [currentIndex]);

  // Autoplay loop timer
  useEffect(() => {
    if (isPlaying) {
      autoPlayTimerRef.current = setInterval(() => {
        handleNext();
      }, 5000);
    } else {
      if (autoPlayTimerRef.current) {
        clearInterval(autoPlayTimerRef.current);
      }
    }

    return () => {
      if (autoPlayTimerRef.current) {
        clearInterval(autoPlayTimerRef.current);
      }
    };
  }, [isPlaying, currentIndex]);

  const handleNext = () => {
    playSound("transition");
    setCurrentIndex((prev) => (prev + 1) % PORTFOLIO_SLIDES.length);
  };

  const handlePrev = () => {
    playSound("transition");
    setCurrentIndex((prev) => (prev - 1 + PORTFOLIO_SLIDES.length) % PORTFOLIO_SLIDES.length);
  };

  const handleJump = (idx: number) => {
    playSound("click");
    setCurrentIndex(idx);
    setShowIndexGrid(false);
  };

  // Safe sound engagement
  const handleToggleMute = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    setHasInteracted(true);
    // Force play feedback when unmuting
    if (nextMuted === false) {
      setTimeout(() => {
        playSound("click");
      }, 50);
    }
  };

  // Metric Validation Checker (Verify the 100% exact character counts)
  const stats = {
    title1Len: currentSlide.title1.length,       // Target: 10
    title2Len: currentSlide.title2.length,       // Target: 6
    title3Len: currentSlide.title3.length,       // Target: 9
    descriptionLen: currentSlide.description.length, // Target: 132
    spec1ValLen: currentSlide.spec1Value.length,  // Target: 18
    spec2ValLen: currentSlide.spec2Value.length,  // Target: 18
    spec3ValLen: currentSlide.spec3Value.length,  // Target: 17
    spec4ValLen: currentSlide.spec4Value.length,  // Target: 24
  };

  return (
    <div 
      id="full-portfolio" 
      className={`absolute inset-0 w-full h-full bg-black text-[#eedfc7] font-sans overflow-hidden transition-all duration-1000 ${
        viewMode === 'portfolio' ? 'select-text' : 'select-none'
      }`}
    >
      
      {/* 60fps Dynamic Canvas Backdrop or Immersive Video Background */}
      {backgroundType === 'canvas' ? (
        <InteractiveBackground graphicType={currentSlide.graphicType} mousePos={mousePos} />
      ) : (
        <div className="absolute inset-0 w-full h-full overflow-hidden bg-black z-0">
          {/* Transparent pointer-events catch layer to prevent any mouse interaction/clicks from reaching the YouTube iframe */}
          <div className="absolute inset-0 bg-transparent z-10 pointer-events-auto" />
          
          {getYouTubeId(videoUrl) ? (
            <div 
              className="absolute inset-0 w-full h-full overflow-hidden transition-opacity duration-1000"
              style={{ opacity: videoOpacity }}
            >
              <iframe
                src={`https://www.youtube.com/embed/${getYouTubeId(videoUrl)}?autoplay=1&mute=1&loop=1&playlist=${getYouTubeId(videoUrl)}&controls=0&showinfo=0&rel=0&iv_load_policy=3&playsinline=1&enablejsapi=1&modestbranding=1&disablekb=1&fs=0`}
                title="YouTube background video"
                className="absolute top-1/2 left-1/2 w-[400%] h-[400%] md:w-[100vw] md:h-[56.25vw] min-h-[100vh] min-w-[177.77vh] -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                referrerPolicy="strict-origin-when-cross-origin"
              />
            </div>
          ) : (
            <video
              ref={videoRef}
              src={videoUrl}
              autoPlay
              loop
              muted
              playsInline
              style={{ opacity: videoOpacity }}
              className="w-full h-full object-cover transition-opacity duration-1000"
            />
          )}

          {/* Immersive background spatial grids and deep ambient vignette overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/85 pointer-events-none z-10" />
          <div className="absolute inset-0 bg-radial-vignette opacity-70 pointer-events-none z-10" />
        </div>
      )}

      {/* Drag Drop High Fidelity Video Overlay */}
      {isDragOver && (
        <div className="absolute inset-0 bg-black/85 z-[100] flex flex-col items-center justify-center border-4 border-dashed border-brand-cream m-2 sm:m-6 md:m-10 backdrop-blur-sm shadow-[inset_0_0_80px_rgba(238,223,199,0.3)]">
          <div className="p-8 border border-brand-cream/20 bg-black max-w-sm text-center space-y-4">
            <Upload className="w-12 h-12 text-brand-cream animate-bounce mx-auto" />
            <h3 className="font-display font-bold text-base tracking-[0.2em] text-brand-cream uppercase">
              TRANSMITTING STREAM FEED
            </h3>
            <p className="font-mono text-[10px] text-brand-cream-dim/80 leading-relaxed">
              Release video file to replace backdrop with a looping muted stream on HUD Stage.
            </p>
          </div>
        </div>
      )}

      {/* Futuristic scanning television overlay */}
      <div id="hud-vignette" className="absolute inset-0 pointer-events-none hud-scanlines z-10 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0)_60%,rgba(0,0,0,0.85)_100%)]" />

      {/* HUD System Overlay Guidelines for aesthetic cybergrid structure */}
      <div id="hud-gimbal" className="absolute inset-0 pointer-events-none border border-brand-cream/10 m-2 sm:m-6 md:m-10 z-10">
        {/* Gimbal cross lines */}
        <div className="absolute top-0 bottom-0 left-1/2 w-[1px] bg-brand-cream/5" />
        <div className="absolute left-0 right-0 top-1/2 h-[1px] bg-brand-cream/5" />
        
        {/* Compass markings (optimized to hide or adjust cleanly on mobile) */}
        <div className="absolute top-3 left-1/2 -translate-x-1/2 font-mono text-[9px] tracking-widest text-[#eedfc7]/40 uppercase hidden sm:block">System Active</div>
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 font-mono text-[9px] tracking-widest text-[#eedfc7]/40 uppercase hidden sm:block">GRID v1.0.4 - SECURE</div>
        <div className="absolute left-3 top-1/2 -translate-y-1/2 font-mono text-[9px] tracking-widest text-[#eedfc7]/40 [writing-mode:vertical-lr] uppercase hidden md:block">NODE COMMUNICATOR</div>
        <div className="absolute right-3 top-1/2 -translate-y-1/2 font-mono text-[9px] tracking-widest text-[#eedfc7]/40 [writing-mode:vertical-lr] uppercase hidden md:block">SPATIAL SYNC</div>

        {/* Small corner bracket layout ticks */}
        <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-brand-cream/25" />
        <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-brand-cream/25" />
        <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-brand-cream/25" />
        <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-brand-cream/25" />
      </div>

      {viewMode === 'portfolio' ? (
        <ScrollablePortfolio 
          playSound={playSound}
          setViewMode={setViewMode}
          setShowCvDossier={setShowCvDossier}
          setLiveChatOpen={setLiveChatOpen}
          activeSkillTab={activeSkillTab}
          setActiveSkillTab={setActiveSkillTab}
        />
      ) : (
        /* Main Container optimized for layout overflows and scrolling on short heights */
        <div id="ui-stage" className="relative w-full h-full p-4 sm:p-10 md:p-16 lg:p-24 flex flex-col justify-between z-20 overflow-y-auto lg:overflow-hidden select-none">
        
        {/* Header Ribbon Row / Top Controls */}
        <header id="top-bar" className="flex justify-between items-start w-full relative z-30">
          
          {/* Logo / Developer Identity Info */}
          <div className="flex flex-col gap-1.5 cursor-pointer" onClick={() => handleJump(0)}>
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 bg-brand-cream animate-pulse rounded-none" />
              <div className="font-display font-black text-sm tracking-[0.25em] text-[#eedfc7] uppercase">
                SOFONIYAS // CORE
              </div>
            </div>
            <div className="font-mono text-[10px] tracking-widest text-brand-cream-dim/60">
              CRAFTED IN ATHENS WITH REACT &amp; TAILWIND
            </div>
          </div>

          {/* Center Title Ticks for high-fidelity technical look */}
          <div className="hidden lg:flex items-center gap-4 text-[10px] font-mono text-brand-cream-dim/50 tracking-widest">
            <span>AZIMUTH: {(mousePos.x % 360).toString().padStart(3, "0")}°</span>
            <span className="opacity-30">//</span>
            <span>ELEVATION: {(mousePos.y % 180).toString().padStart(3, "0")}°</span>
            <span className="opacity-30">//</span>
            <span>GRAPHIC_TYPE: {currentSlide.graphicType.toUpperCase()}</span>
          </div>

          {/* Standard Navigation Menu and Top Right Selector exactly mirroring image */}
          <div className="flex items-center gap-4 sm:gap-8">
            
            {/* HUD dual mode switch button */}
            <div className="bg-black/90 border border-brand-cream/30 p-0.5 flex divide-x divide-brand-cream/20 font-mono text-[9px] sm:text-[10px] tracking-widest leading-none">
              <button 
                onClick={() => { playSound("click"); setViewMode('portfolio'); }}
                className="px-2 py-1 text-brand-cream-dim hover:text-white transition-all cursor-pointer font-bold"
              >
                WEBSITE CORE
              </button>
              <button 
                onClick={() => { playSound("click"); setViewMode('hud'); }}
                className="px-2 py-1 bg-brand-cream text-black font-extrabold transition-all cursor-pointer"
              >
                HUD Deck
              </button>
            </div>

            {/* Slide Index text & Next Button exactly as screenshot: "1/26 NEXT PRODUCT" */}
            <div className="flex items-center gap-6 select-none font-mono text-xs md:text-sm tracking-[0.2em] font-medium text-brand-cream">
              <span className="text-brand-cream-dim/55">
                {(currentIndex + 1).toString().padStart(2, "0")}/26
              </span>
              <button 
                id="next-trigger"
                onClick={handleNext}
                onMouseEnter={() => playSound("hover")}
                className="hover:text-white transition-all group flex items-center gap-2 uppercase cursor-pointer"
                title="Shift to next section"
              >
                NEXT PRODUCT
                <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1.5" />
              </button>
            </div>
          </div>
        </header>

        {/* Middle Board / Content Workspace layout */}
        <main id="workspace-grid" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center my-auto relative z-20">
          
          {/* Left Block: Dynamic Big Futuristic Typography Titles */}
          <div id="identity-block" className="lg:col-span-6 flex flex-col justify-center items-start">
            
            {/* Title with staggered sliding and exit animations */}
            <h1 className="font-display font-extrabold text-[1.5rem] xs:text-[1.8rem] sm:text-[3rem] md:text-[3.9rem] lg:text-[4.7rem] xl:text-[5.3rem] leading-[1.0] text-left uppercase tracking-tight select-none">
              <AnimatePresence mode="popLayout">
                <motion.div
                  key={currentSlide.id + "-title"}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="space-y-0.5 filter drop-shadow-[0_0_20px_rgba(238,223,199,0.12)] font-black"
                >
                  {/* Row 1 / Exact length 10 */}
                  <div className="text-brand-cream/90 flex items-center">
                    {currentSlide.title1}
                  </div>
                  {/* Row 2 / Exact length 6 */}
                  <div className="text-brand-cream-dim">
                    {currentSlide.title2}
                  </div>
                  {/* Row 3 / Exact length 9 */}
                  <div className="text-brand-cream">
                    {currentSlide.title3}
                  </div>
                </motion.div>
              </AnimatePresence>
            </h1>

            {/* Subtitle description with perfect character spacing */}
            <div id="description-shell" className="mt-6 md:mt-8 relative overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.p
                  key={currentSlide.id + "-desc"}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.35, delay: 0.1 }}
                  className="font-sans text-brand-cream-dim/85 text-xs md:text-[14px] lg:text-[15px] leading-relaxed max-w-sm sm:max-w-md md:max-w-lg select-text text-justify"
                >
                  {currentSlide.description}
                </motion.p>
              </AnimatePresence>
            </div>
            
            {/* Slide Navigation Arrow keys overlay indicators */}
            <div className="flex flex-wrap items-center gap-3 mt-6 sm:mt-8">
              <div className="flex gap-2">
                <button 
                  onClick={handlePrev}
                  onMouseEnter={() => playSound("hover")}
                  className="w-12 h-11 md:w-10 md:h-10 border border-brand-cream-dark/60 hover:bg-[#eedfc7] hover:text-black hover:border-[#eedfc7] flex items-center justify-center transition-all cursor-pointer group"
                  title="Previous slide"
                >
                  <ChevronLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                </button>
                
                <button 
                  onClick={handleNext}
                  onMouseEnter={() => playSound("hover")}
                  className="w-12 h-11 md:w-12 md:h-10 border border-brand-cream-dark/60 hover:bg-[#eedfc7] hover:text-black hover:border-[#eedfc7] flex items-center justify-center transition-all cursor-pointer group gap-1"
                  title="Next slide"
                >
                  <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
              </div>

              <button
                onClick={() => setIsPlaying(!isPlaying)}
                onMouseEnter={() => playSound("hover")}
                className={`px-4 h-11 md:h-10 border border-brand-cream-dark/60 flex items-center justify-center gap-1.5 transition-all text-xs font-mono tracking-wider cursor-pointer ${
                  isPlaying ? "bg-brand-cream/15 text-white" : "hover:bg-brand-cream/10"
                }`}
                title={isPlaying ? "Pause automatic cycle" : "Start automatic cycle"}
              >
                {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                {isPlaying ? "PAUSE" : "CYCLE"}
              </button>
            </div>

            {/* Backdrop Tech Control Console (Cyberpunk HUD styled panel) */}
            <div className="mt-6 border border-brand-cream/10 bg-black/65 p-3.5 w-full max-w-sm sm:max-w-md backdrop-blur-md relative z-30">
              <div className="flex items-center justify-between mb-2.5 border-b border-brand-cream-dark/30 pb-1.5">
                <div className="flex items-center gap-1.5">
                  <Video className="w-3.5 h-3.5 text-brand-cream animate-pulse" />
                  <span className="font-mono text-[9px] tracking-[0.2em] font-bold text-brand-cream">
                    BG GRAPHIC ENGINE
                  </span>
                </div>
                <div className="flex gap-1.5">
                  <button
                    onClick={() => { playSound("click"); setBackgroundType('video'); }}
                    className={`font-mono text-[8px] px-1.5 py-0.5 border cursor-pointer transition-colors ${
                      backgroundType === 'video' 
                        ? "border-brand-cream bg-brand-cream text-black font-semibold" 
                        : "border-brand-cream/20 text-brand-cream/60 hover:border-brand-cream/40"
                    }`}
                  >
                    VIDEO STEAM
                  </button>
                  <button
                    onClick={() => { playSound("click"); setBackgroundType('canvas'); }}
                    className={`font-mono text-[8px] px-1.5 py-0.5 border cursor-pointer transition-colors ${
                      backgroundType === 'canvas' 
                        ? "border-brand-cream bg-brand-cream text-black font-semibold" 
                        : "border-brand-cream/20 text-brand-cream/60 hover:border-brand-cream/40"
                    }`}
                  >
                    MATH VECTOR
                  </button>
                </div>
              </div>

              {backgroundType === 'video' ? (
                <div className="space-y-2.5 font-mono text-[9px]">
                  {/* Opacity slider with elegant layout */}
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-[#eedfc7]/65 uppercase tracking-wide">Backlight:</span>
                    <div className="flex items-center gap-1.5 flex-grow max-w-[170px]">
                      <input
                        type="range"
                        min="0.1"
                        max="1.0"
                        step="0.05"
                        value={videoOpacity}
                        onChange={(e) => setVideoOpacity(parseFloat(e.target.value))}
                        className="w-full accent-brand-cream bg-brand-cream-dark/50 h-1 cursor-pointer"
                      />
                      <span className="text-[9px] w-8 text-right font-mono text-brand-cream font-bold">
                        {Math.round(videoOpacity * 100)}%
                      </span>
                    </div>
                  </div>

                  {/* Preset feeds selection */}
                  <div className="flex flex-col gap-1">
                    <span className="text-[#eedfc7]/50 uppercase tracking-wide">Preset Feeds:</span>
                    <div className="grid grid-cols-4 gap-1.5">
                      {[
                        { name: "CH_01", desc: "Sci-Fi Space Terminal (YT)", url: "https://www.youtube.com/watch?v=GYdNzgA2GIY" },
                        { name: "CH_02", desc: "Cyber Code Terminal (YT)", url: "https://www.youtube.com/watch?v=-s5KrjH7aQ0" },
                        { name: "CH_03", desc: "Cyber Astronaut", url: "https://assets.mixkit.co/videos/preview/mixkit-animation-of-a-futuristic-retro-cyberpunk-astronaut-42407-large.mp4" },
                        { name: "CH_04", desc: "Nebula Core", url: "https://assets.mixkit.co/videos/preview/mixkit-deep-space-nebula-with-stars-18017-large.mp4" }
                      ].map((ch) => (
                        <button
                          key={ch.name}
                          onClick={() => { playSound("click"); setVideoUrl(ch.url); }}
                          className={`py-1 px-1 border text-center transition-all cursor-pointer ${
                            videoUrl === ch.url 
                              ? "border-brand-cream-dim text-white bg-brand-cream/15 font-semibold" 
                              : "border-brand-cream/10 text-brand-cream-dim/50 hover:border-brand-cream/30 hover:text-brand-cream"
                          }`}
                          title={ch.desc}
                        >
                          {ch.name}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* File Upload Selector and Text Link Link */}
                  <div className="flex flex-col gap-2 pt-1">
                    <div className="flex gap-2">
                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleVideoUpload}
                        accept="video/mp4,video/webm"
                        className="hidden"
                      />
                      <button
                        onClick={() => fileInputRef.current?.click()}
                        className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 border border-brand-cream hover:bg-brand-cream hover:text-black transition-all text-[9px] font-mono tracking-wider font-bold cursor-pointer text-brand-cream bg-black/40 shadow-[0_0_12px_rgba(238,223,199,0.15)] hover:shadow-[0_0_20px_rgba(238,223,199,0.3)]"
                      >
                        <Upload className="w-3.5 h-3.5 animate-pulse" />
                        SET UPLOADED VIDEO
                      </button>
                      
                      <div className="flex-1 relative flex items-center">
                        <input
                          type="text"
                          placeholder="PASTE LINK / YT EMBED"
                          className="w-full bg-black border border-brand-cream/20 px-2 py-2 text-[8px] text-[#eedfc7] placeholder:text-brand-cream-dim/30 focus:border-brand-cream/50 outline-none h-full"
                          onChange={(e) => {
                            const val = e.target.value.trim();
                            if (val.length > 5) {
                              setVideoUrl(val);
                            }
                          }}
                        />
                        <Link2 className="absolute right-2.5 w-3 h-3 text-brand-cream-dim/40 pointer-events-none" />
                      </div>
                    </div>

                    {customFileName && (
                      <div className="bg-brand-cream/5 border border-brand-cream/25 px-2 py-1.5 flex items-center justify-between text-[8px] font-mono select-text text-brand-cream animate-fade-in">
                        <span className="truncate max-w-[200px]">★ CUSTOM STREAM: {customFileName}</span>
                        <button 
                          onClick={() => {
                            setCustomFileName(null);
                            setVideoUrl(getSlideDefaultVideo(currentIndex));
                          }}
                          className="text-[#eedfc7]/40 hover:text-brand-cream underline cursor-pointer"
                        >
                          RESTORE DEFAULT
                        </button>
                      </div>
                    )}
                  </div>

                  <div className="text-[7.5px] text-brand-cream-dim/35 leading-none pt-1 flex justify-between">
                    <span>* Drag &amp; drop any looped video onto page to mount instantly</span>
                  </div>
                </div>
              ) : (
                <div className="text-[8.5px] text-brand-cream-dim/50 uppercase font-mono tracking-widest text-center py-5 bg-black/25 border border-brand-cream/5">
                  ACTIVE WEBGL SHADER: <span className="text-brand-cream font-bold">{currentSlide.graphicType}</span>
                </div>
              )}
            </div>
          </div>

          {/* Col Spacer for beautiful aesthetic gaps */}
          <div className="hidden lg:col-span-2 xl:col-span-3 lg:block" />

          {/* Right Block: Dynamic Technical Specifications Grid EXACTLY as screenshot */}
          <div id="tech-specs-block" className="lg:col-span-4 flex flex-col justify-end mt-6 lg:mt-0">
            <div className="w-full max-w-md ml-auto bg-black/40 backdrop-blur-md p-6 border border-brand-cream/5 rounded-none shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
              <div className="flex justify-between items-center mb-6">
                <span className="font-mono text-[10px] md:text-xs tracking-[0.25em] font-bold text-brand-cream-dim/60 uppercase">
                  TECHNICAL SPECS
                </span>
                <span className="font-mono text-[8.5px] px-2 py-0.5 border border-brand-cream-dim/35 text-brand-cream-dim/65 uppercase tracking-widest leading-none">
                  SECTION {currentSlide.id.toString().padStart(2, "0")}
                </span>
              </div>

              {/* Dynamic specs rows exactly formatted as Optics, Logic, Motion, Build */}
              <div className="flex flex-col font-sans select-none">
                
                {/* Spec row 1 (Optics - exactly 18 characters value) */}
                <div className="border-b border-brand-cream-dark/30 py-3.5 flex justify-between items-baseline gap-4 group hover:bg-brand-cream/3 transition-colors px-1">
                  <span className="text-[#eedfc7]/70 font-sans text-xs md:text-sm tracking-widest">
                    {currentSlide.spec1Label}
                  </span>
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={currentSlide.id + "-spec1"}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0 }}
                      className="font-mono text-xs md:text-sm text-[#eedfc7] text-right tracking-tight text-glow-beige"
                    >
                      {currentSlide.spec1Value}
                    </motion.span>
                  </AnimatePresence>
                </div>

                {/* Spec row 2 (Logic - exactly 18 characters value) */}
                <div className="border-b border-brand-cream-dark/30 py-3.5 flex justify-between items-baseline gap-4 group hover:bg-brand-cream/3 transition-colors px-1">
                  <span className="text-[#eedfc7]/70 font-sans text-xs md:text-sm tracking-widest">
                    {currentSlide.spec2Label}
                  </span>
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={currentSlide.id + "-spec2"}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0 }}
                      className="font-mono text-xs md:text-sm text-[#eedfc7] text-right tracking-tight text-glow-beige"
                    >
                      {currentSlide.spec2Value}
                    </motion.span>
                  </AnimatePresence>
                </div>

                {/* Spec row 3 (Motion - exactly 17 characters value) */}
                <div className="border-b border-brand-cream-dark/30 py-3.5 flex justify-between items-baseline gap-4 group hover:bg-brand-cream/3 transition-colors px-1">
                  <span className="text-[#eedfc7]/70 font-sans text-xs md:text-sm tracking-widest">
                    {currentSlide.spec3Label}
                  </span>
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={currentSlide.id + "-spec3"}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0 }}
                      className="font-mono text-xs md:text-sm text-[#eedfc7] text-right tracking-tight text-glow-beige"
                    >
                      {currentSlide.spec3Value}
                    </motion.span>
                  </AnimatePresence>
                </div>

                {/* Spec row 4 (Build - exactly 24 characters value) */}
                <div className="border-b border-brand-cream-dark/30 py-3.5 flex justify-between items-baseline gap-4 group hover:bg-brand-cream/3 transition-colors px-1">
                  <span className="text-[#eedfc7]/70 font-sans text-xs md:text-sm tracking-widest">
                    {currentSlide.spec4Label}
                  </span>
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={currentSlide.id + "-spec4"}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0 }}
                      className="font-mono text-xs md:text-sm text-[#eedfc7] text-right tracking-tight text-glow-beige"
                    >
                      {currentSlide.spec4Value}
                    </motion.span>
                  </AnimatePresence>
                </div>
              </div>

              {/* Graphic metadata status widgets at bottom of spec card */}
              <div className="mt-5 flex justify-between items-center text-[10px] font-mono text-brand-cream-dim/50">
                <span className="flex items-center gap-1">
                  <Cpu className="w-3 h-3 text-brand-cream animate-spin-slow" />
                  STABLE KERNEL
                </span>
                <span className="text-right">SECURE_LINK // CONNECTED</span>
              </div>
            </div>
          </div>
        </main>

        {/* Footer Ribbon & Auxiliary HUD controls */}
        <footer id="bottom-ribbon" className="flex flex-col sm:flex-row justify-between items-center gap-4 relative z-30 pt-6 border-t border-brand-cream/10">
          
          {/* Quick HUD Navigation & External Social Terminals */}
          <div className="flex flex-wrap items-center gap-2 select-none text-[11px] font-mono tracking-widest text-[#eedfc7]">
            <button
              onClick={() => setShowIndexGrid(!showIndexGrid)}
              onMouseEnter={() => playSound("hover")}
              className={`flex items-center gap-1.5 px-3 py-1.5 border hover:bg-brand-cream hover:text-black transition-all cursor-pointer ${
                showIndexGrid ? "bg-brand-cream text-black border-brand-cream" : "border-brand-cream/20"
              }`}
            >
              <Grid className="w-3.5 h-3.5" />
              MATRIX PICKER (G)
            </button>

            <button
              onClick={() => setShowMetrics(!showMetrics)}
              onMouseEnter={() => playSound("hover")}
              className={`flex items-center gap-1.5 px-3 py-1.5 border hover:bg-brand-cream hover:text-black transition-all cursor-pointer ${
                showMetrics ? "bg-brand-cream text-black border-brand-cream" : "border-brand-cream/20"
              }`}
              title="Verify developer character specifications"
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              STRICT LENGTH CHECKER
            </button>

            <button
              onClick={() => { playSound("click"); setShowCvDossier(true); }}
              onMouseEnter={() => playSound("hover")}
              className={`flex items-center gap-1.5 px-3 py-1.5 border hover:bg-brand-cream hover:text-black transition-all cursor-pointer ${
                showCvDossier ? "bg-brand-cream text-black border-brand-cream" : "border-brand-cream/20"
              }`}
              title="Open full interactive CV dossier archive"
            >
              <FileText className="w-3.5 h-3.5" />
              CV ARCHIVE (SECURE)
            </button>

            <span className="text-brand-cream-dim/20 mx-1 hidden sm:inline">|</span>

            <a
              href="https://github.com/Sofoniyastekalegn/"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => { playSound("click"); }}
              onMouseEnter={() => playSound("hover")}
              className="flex items-center gap-1.5 px-2.5 py-1.5 border border-brand-cream/20 hover:border-brand-cream hover:bg-brand-cream/5 transition-all cursor-pointer text-[#eedfc7]"
              title="Navigate to Github profile"
            >
              <Github className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">GITHUB</span>
            </a>

            <a
              href="https://www.linkedin.com/in/sofoniyas-tekalegn-962868287"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => { playSound("click"); }}
              onMouseEnter={() => playSound("hover")}
              className="flex items-center gap-1.5 px-2.5 py-1.5 border border-brand-cream/20 hover:border-brand-cream hover:bg-brand-cream/5 transition-all cursor-pointer text-[#eedfc7]"
              title="Launch LinkedIn contact deck"
            >
              <Linkedin className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">LINKEDIN</span>
            </a>
          </div>

          {/* System sound & interactive triggers */}
          <div className="flex items-center gap-6">
            
            {/* Audio Toggle button */}
            <button
              onClick={handleToggleMute}
              onMouseEnter={() => playSound("hover")}
              className="flex items-center gap-2 group cursor-pointer"
              title={isMuted ? "Unmute HUD interface sound effects (Key: M)" : "Mute HUD interface sound effects (Key: M)"}
            >
              {isMuted ? (
                <VolumeX className="w-4 h-4 text-brand-cream-dim/50 group-hover:text-brand-cream transition-colors" />
              ) : (
                <Volume2 className="w-4 h-4 text-brand-cream group-hover:text-white transition-colors" />
              )}
              <span className="font-mono text-[10px] tracking-widest text-[#eedfc7]/70 group-hover:text-[#eedfc7] transition-all">
                {isMuted ? "SYSTEM AUDIO : OFF" : "SYSTEM AUDIO : ON"}
              </span>
            </button>

            {/* Quick reset */}
            <button
              onClick={() => handleJump(0)}
              onMouseEnter={() => playSound("hover")}
              className="font-mono text-[10px] tracking-widest text-[#eedfc7]/50 hover:text-brand-cream flex items-center gap-1 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              SYS_RESET
            </button>
          </div>
        </footer>

        {/* Floating Matrix Drawer Picker Overlay */}
        <AnimatePresence>
          {showIndexGrid && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/95 z-50 flex items-center justify-center p-12 overflow-y-auto"
            >
              <div className="w-full max-w-3xl border border-brand-cream/20 bg-black p-8 relative">
                <button
                  onClick={() => setShowIndexGrid(false)}
                  className="absolute top-6 right-6 font-mono text-xs tracking-widest text-brand-cream-dim hover:text-brand-cream cursor-pointer"
                >
                  CLOSE [X]
                </button>

                <h3 className="font-display font-bold text-lg tracking-[0.2em] mb-6 border-b border-brand-cream-dark/40 pb-4 text-brand-cream">
                  CHOOSE REWRITTEN SLIDE (26 CONFIGURATIONS)
                </h3>

                <p className="font-sans font-light text-brand-cream-dim/75 text-sm leading-relaxed mb-8">
                  Select index node of Sofoniyas's professional development series. Each slide strictly contains identical character parameters to ensure absolute visual uniformity of structure.
                </p>

                <div className="grid grid-cols-5 md:grid-cols-6 lg:grid-cols-8 gap-3">
                  {PORTFOLIO_SLIDES.map((slide, idx) => {
                    const isActive = idx === currentIndex;
                    return (
                      <button
                        key={slide.id}
                        onClick={() => handleJump(idx)}
                        onMouseEnter={() => playSound("matrix")}
                        className={`aspect-square border flex flex-col items-center justify-center transition-all group cursor-pointer ${
                          isActive 
                            ? "border-brand-cream bg-brand-cream text-black font-bold" 
                            : "border-brand-cream-dark/30 hover:border-brand-cream/60 hover:bg-brand-cream/5"
                        }`}
                      >
                        <span className="font-mono text-sm tracking-widest">
                          {slide.id.toString().padStart(2, "0")}
                        </span>
                        <span className="font-sans text-[8px] tracking-tighter opacity-50 block mt-1 uppercase text-clip overflow-hidden max-w-full truncate px-1">
                          {slide.title2}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Floating Metrics Evaluator Drawer */}
        <AnimatePresence>
          {showMetrics && (
            <motion.div
              initial={{ opacity: 0, y: 150 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 150 }}
              className="absolute bottom-24 left-1/2 -translate-x-1/2 w-full max-w-xl border border-brand-cream bg-black/95 z-40 p-6 shadow-[0_30px_70px_rgba(0,0,0,0.9)]"
            >
              <div className="flex justify-between items-start mb-4 border-b border-brand-cream-dark/30 pb-3">
                <div>
                  <h4 className="font-display font-bold text-xs tracking-widest uppercase text-brand-cream">
                    CHARACTER COUNT SPECIFICATION EVALUATOR
                  </h4>
                  <p className="font-mono text-[9px] text-brand-cream-dim/60 mt-1">
                    Verifies 100% adherence to screenshot element character lengths
                  </p>
                </div>
                <button
                  onClick={() => setShowMetrics(false)}
                  className="font-mono text-[9.5px] hover:text-brand-cream text-brand-cream-dim/65 uppercase leading-none cursor-pointer"
                >
                  DISMISS [X]
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4 font-mono text-[11px] leading-relaxed">
                <div className="border border-brand-cream-dark/30 p-2.5 bg-black/50">
                  <div className="font-bold border-b border-brand-cream-dark/35 pb-1 mb-1.5 text-brand-cream text-[10px] tracking-widest">
                    TITLE LINE METRICS
                  </div>
                  <div className="flex justify-between">
                    <span>Line 1 (Target: 10) :</span>
                    <span className={stats.title1Len === 10 ? "text-green-400" : "text-amber-400"}>
                      {stats.title1Len} chars {stats.title1Len === 10 ? "✓" : "×"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Line 2 (Target: 6) :</span>
                    <span className={stats.title2Len === 6 ? "text-green-400" : "text-amber-400"}>
                      {stats.title2Len} chars {stats.title2Len === 6 ? "✓" : "×"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Line 3 (Target: 9) :</span>
                    <span className={stats.title3Len === 9 ? "text-green-400" : "text-amber-400"}>
                      {stats.title3Len} chars {stats.title3Len === 9 ? "✓" : "×"}
                    </span>
                  </div>
                </div>

                <div className="border border-brand-cream-dark/30 p-2.5 bg-black/50">
                  <div className="font-bold border-b border-brand-cream-dark/35 pb-1 mb-1.5 text-brand-cream text-[10px] tracking-widest">
                    TECH VALUE METRICS
                  </div>
                  <div className="flex justify-between">
                    <span>Optics (Target 18):</span>
                    <span className={stats.spec1ValLen === 18 ? "text-green-400" : "text-amber-400"}>
                      {stats.spec1ValLen} chars {stats.spec1ValLen === 18 ? "✓" : "×"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Logic (Target 18):</span>
                    <span className={stats.spec2ValLen === 18 ? "text-green-400" : "text-amber-400"}>
                      {stats.spec2ValLen} chars {stats.spec2ValLen === 18 ? "✓" : "×"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Motion (Target 17):</span>
                    <span className={stats.spec3ValLen === 17 ? "text-green-400" : "text-amber-400"}>
                      {stats.spec3ValLen} chars {stats.spec3ValLen === 17 ? "✓" : "×"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Build (Target 24):</span>
                    <span className={stats.spec4ValLen === 24 ? "text-green-400" : "text-amber-400"}>
                      {stats.spec4ValLen} chars {stats.spec4ValLen === 24 ? "✓" : "×"}
                    </span>
                  </div>
                </div>

                <div className="col-span-2 border border-brand-cream-dark/30 p-2.5 bg-[#eedfc7]/5">
                  <div className="flex justify-between font-bold text-brand-cream text-[10px] tracking-widest border-b border-brand-cream-dark/35 pb-1 mb-1.5">
                    <span>DESCRIPTION CHARACTER METADATA</span>
                    <span>TARGET: 132</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span>Current slide index {currentSlide.id}:</span>
                    <span className={stats.descriptionLen === 132 ? "text-green-400 font-bold" : "text-amber-400 font-bold"}>
                      {stats.descriptionLen} characters {stats.descriptionLen === 132 ? "READY" : "ERROR"}
                    </span>
                  </div>
                  <div className="mt-2 text-[9px] text-[#eedfc7]/40 leading-relaxed italic border-t border-brand-cream-dark/20 pt-1.5">
                    "Crafting high-end digital systems and flawless user interfaces for web platforms that don't just exist—they lead. Build your vision." = 132 chars.
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* CV Dossier HUD Modal */}
        <AnimatePresence>
          {showCvDossier && (
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="absolute inset-0 bg-black/95 z-50 flex items-center justify-center p-4 sm:p-10 lg:p-16 overflow-y-auto print:hidden select-text"
            >
              <div className="w-full max-w-5xl border border-brand-cream bg-black/90 p-6 sm:p-8 relative shadow-[0_0_50px_rgba(238,223,199,0.15)] backdrop-blur-md">
                
                {/* Close Button top-right */}
                <button
                  onClick={() => { playSound("click"); setShowCvDossier(false); }}
                  className="absolute top-6 right-6 font-mono text-xs tracking-widest text-brand-cream bg-black/50 border border-brand-cream/10 hover:border-brand-cream px-3 py-1.5 transition-all cursor-pointer"
                >
                  CLOSE DOSSIER [X]
                </button>

                {/* Dashboard Header Bar */}
                <div className="border-b border-brand-cream-dark pb-4 mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div>
                    <span className="font-mono text-[10px] tracking-[0.2em] text-[#eedfc7]/40 uppercase block mb-1">SECURE PORTAL DATASTREAM</span>
                    <h3 className="font-display font-black text-xl tracking-[0.15em] text-brand-cream">
                      SOFONIYAS TEKALEGN // CORE CV
                    </h3>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => { playSound("click"); window.print(); }}
                      className="flex items-center gap-2 font-mono text-[10px] tracking-widest bg-brand-cream text-black px-4 py-2 border border-brand-cream hover:bg-black hover:text-brand-cream transition-all cursor-pointer font-bold"
                    >
                      <Download className="w-3.5 h-3.5" />
                      EXPORT PRINT-READY PDF
                    </button>
                    <button
                      onClick={handleDownloadTextResume}
                      className="flex items-center gap-2 font-mono text-[10px] tracking-widest border border-brand-cream/30 hover:border-brand-cream text-[#eedfc7] px-4 py-2 transition-all cursor-pointer"
                    >
                      <FileText className="w-3.5 h-3.5 text-brand-cream" />
                      DOWNLOAD PLAIN TEXT (.TXT)
                    </button>
                  </div>
                </div>

                {/* Desktop layout dual-column */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 text-xs select-text font-sans">
                  
                  {/* Left Metadata Column */}
                  <div className="lg:border-r border-brand-cream-dark/40 lg:pr-8 space-y-6">
                    <div>
                      <h4 className="font-mono text-[10px] tracking-wider text-brand-cream uppercase mb-2">// PERSONNEL PROFILE</h4>
                      <p className="text-brand-cream-dim/90 leading-relaxed text-justify">
                        Full-Stack Developer and AI Engineer with hands-on experience across the entire product lifecycle — from SSR web apps and ERP systems to AI voice agents, LLM-powered chatbots, and automated workflows. Proficient in Next.js, React, Vue/Nuxt, NestJS, Node.js, Java Spring Boot, and Python.
                      </p>
                    </div>

                    <div>
                      <h4 className="font-mono text-[10px] tracking-wider text-brand-cream uppercase mb-2">// TECHNICAL SPECS DATASET</h4>
                      <div className="space-y-3.5 text-[11px]">
                        <div>
                          <span className="text-brand-cream/80 font-mono text-[9px] uppercase tracking-wider block mb-1">AI &amp; Voice AI:</span>
                          <p className="text-brand-cream-dim leading-normal font-mono">Vapi · Retell AI · LangChain · OpenAI · Pinecone · Voyage · n8n · Zapier · Python · LLMs</p>
                        </div>
                        <div>
                          <span className="text-brand-cream/80 font-mono text-[9px] uppercase tracking-wider block mb-1">Frontend Layer:</span>
                          <p className="text-brand-cream-dim leading-normal font-mono">Next.js (SSR/ISR) · React · Vue.js · Nuxt.js · Vuex · TypeScript · JavaScript · HTML5/CSS3</p>
                        </div>
                        <div>
                          <span className="text-brand-cream/80 font-mono text-[9px] uppercase tracking-wider block mb-1">Backend Core:</span>
                          <p className="text-brand-cream-dim leading-normal font-mono">Node.js · NestJS · Express · Java Spring Boot · Django · Python · GraphQL · Hasura</p>
                        </div>
                        <div>
                          <span className="text-brand-cream/80 font-mono text-[9px] uppercase tracking-wider block mb-1 font-bold">Databases:</span>
                          <p className="text-brand-cream-dim leading-normal font-mono">PostgreSQL · MySQL · Supabase · Pinecone (vector DB)</p>
                        </div>
                        <div>
                          <span className="text-brand-cream/80 font-mono text-[9px] uppercase tracking-wider block mb-1">Mobile / CMS / Des:</span>
                          <p className="text-brand-cream-dim leading-normal font-mono">React Native · Flutter · Strapi · WordPress · Figma</p>
                        </div>
                        <div>
                          <span className="text-brand-cream/80 font-mono text-[9px] uppercase tracking-wider block mb-1 font-bold">Specialities:</span>
                          <p className="text-brand-cream-dim leading-normal font-mono">AI Chatbots · Voice Agents · CRM Dev · Lead Qualification · ERP · Data Viz (Tableau)</p>
                        </div>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-brand-cream-dark/30">
                      <h4 className="font-mono text-[10px] tracking-wider text-brand-cream uppercase mb-2">// LANGUAGES</h4>
                      <div className="grid grid-cols-3 gap-2 text-center text-[10px] font-mono">
                        <div className="border border-brand-cream/15 p-1.5"><span className="text-brand-cream-dim block font-sans">AMHARIC</span><strong className="text-brand-cream">NATIVE</strong></div>
                        <div className="border border-brand-cream/15 p-1.5"><span className="text-brand-cream-dim block font-sans">ENGLISH</span><strong className="text-brand-cream">FLUENT</strong></div>
                        <div className="border border-brand-cream/15 p-1.5"><span className="text-brand-cream-dim block font-sans">FRENCH</span><strong className="text-brand-cream">BASIC</strong></div>
                      </div>
                    </div>
                  </div>

                  {/* Right Experience Column */}
                  <div className="lg:col-span-2 space-y-6">
                    <div>
                      <h4 className="font-mono text-[10px] tracking-wider text-brand-cream uppercase mb-4">// PROFESSIONAL HISTORY RECORDS</h4>
                      
                      <div className="space-y-4">
                        {/* Wozena */}
                        <div className="border-l border-brand-cream/30 pl-4 py-0.5 space-y-1 relative">
                          <div className="absolute w-1.5 h-1.5 bg-brand-cream left-[-3.5px] top-1.5" />
                          <div className="flex justify-between items-start text-[11px] font-mono">
                            <strong className="text-[#eedfc7]">BACKEND ENGINEER</strong>
                            <span className="text-brand-cream-dim/60 font-medium font-sans">Apr 2026 – PRESENT // REMOTE</span>
                          </div>
                          <span className="text-[10px] font-mono text-brand-cream-dim block">Wozena AI Platform — wozena.com</span>
                          <ul className="list-disc pl-4 text-brand-cream-dim text-[11px] leading-relaxed space-y-1 mt-1 font-medium select-text">
                            <li>Developing scalable backend services for an AI-powered platform using Python, Node.js, and NestJS.</li>
                            <li>Building and maintaining RESTful APIs and microservices architecture to support AI-driven features.</li>
                            <li>Collaborating on LLM integration, data pipelines, and performance optimization across the stack.</li>
                          </ul>
                        </div>

                        {/* Youth Print */}
                        <div className="border-l border-brand-cream/30 pl-4 py-0.5 space-y-1 relative">
                          <div className="absolute w-1.5 h-1.5 bg-brand-cream left-[-3.5px] top-1.5" />
                          <div className="flex justify-between items-start text-[11px] font-mono">
                            <strong className="text-[#eedfc7]">SOFTWARE INFRASTRUCTURE &amp; FRONT-END DEV</strong>
                            <span className="text-brand-cream-dim/60 font-medium font-sans">Jul 2024 – PRESENT // ETHIOPIA</span>
                          </div>
                          <span className="text-[10px] font-mono text-brand-cream-dim block">Youth Print Organization — theyouthprint.org</span>
                          <ul className="list-disc pl-4 text-brand-cream-dim text-[11px] leading-relaxed space-y-1 mt-1 font-medium select-text">
                            <li>Built and maintained dynamic SSR web apps using Next.js and Strapi CMS for climate-change platform theyouthprint.org.</li>
                            <li>Improved digital content management, SEO performance, and user engagement metrics.</li>
                          </ul>
                        </div>

                        {/* Metbel */}
                        <div className="border-l border-brand-cream/30 pl-4 py-0.5 space-y-1 relative">
                          <div className="absolute w-1.5 h-1.5 bg-brand-cream left-[-3.5px] top-1.5" />
                          <div className="flex justify-between items-start text-[11px] font-mono">
                            <strong className="text-[#eedfc7]">FULL-STACK DEVELOPER (CONTRACT)</strong>
                            <span className="text-brand-cream-dim/60 font-medium font-sans">May 2025 // ADDIS ABABA</span>
                          </div>
                          <span className="text-[10px] font-mono text-brand-cream-dim block">Metbel Trading</span>
                          <ul className="list-disc pl-4 text-brand-cream-dim text-[11px] leading-relaxed space-y-1 mt-1 font-medium select-text">
                            <li>Designed ERP inventory &amp; stock systems using Python and React.</li>
                            <li>Enhanced supply-chain tracking and operational efficiency.</li>
                          </ul>
                        </div>

                        {/* Kodastropi */}
                        <div className="border-l border-brand-cream/30 pl-4 py-0.5 space-y-1 relative">
                          <div className="absolute w-1.5 h-1.5 bg-brand-cream left-[-3.5px] top-1.5" />
                          <div className="flex justify-between items-start text-[11px] font-mono">
                            <strong className="text-[#eedfc7]">WEB DEVELOPER INTERN</strong>
                            <span className="text-brand-cream-dim/60 font-medium font-sans">Aug – Oct 2025 // ADDIS ABABA</span>
                          </div>
                          <span className="text-[10px] font-mono text-brand-cream-dim block">Kodastropi Marketing Solutions</span>
                          <ul className="list-disc pl-4 text-brand-cream-dim text-[11px] leading-relaxed space-y-1 mt-1 font-medium select-text">
                            <li>Built responsive UI components and animations with Vue.js and Nuxt.js.</li>
                            <li>Collaborated on client-facing marketing sites with smooth UX.</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-brand-cream-dark/30 pt-4">
                      <h4 className="font-mono text-[10px] tracking-wider text-brand-cream uppercase mb-3">// EDUCATION &amp; TRAINING NODES</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-[10px] font-mono">
                        <div className="border border-brand-cream-dark/45 p-2 bg-black/60">
                          <strong className="text-[#eedfc7] block">B.Sc. Computer Science</strong>
                          <span className="text-brand-cream-dim text-[9.5px]">American College of Technology [2024 - 2028 expected]</span>
                        </div>
                        <div className="border border-brand-cream-dark/45 p-2 bg-black/60">
                          <strong className="text-[#eedfc7] block">Front-End Developer</strong>
                          <span className="text-brand-cream-dim text-[9.5px]">Udacity NanoDegree Credential [2025]</span>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>

              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Hidden / Print-Isolated Classic Document version for neat print/PDF rendering */}
        <div id="printable-cv-stage" className="hidden print:block text-black bg-white p-10 font-sans leading-relaxed select-text text-left">
          <div className="border-b-2 border-black pb-4 mb-6">
            <h1 className="text-3xl font-extrabold tracking-tight">Sofoniyas Tekalegn</h1>
            <p className="text-lg font-semibold text-gray-700 mt-1">Full-Stack Developer · AI Engineer · Voice AI &amp; LLM Specialist</p>
            <div className="text-xs text-gray-600 mt-2 flex flex-wrap gap-x-4 gap-y-1 font-mono">
              <span>Addis Ababa, Ethiopia</span>
              <span>+251 978 695 556</span>
              <span>sofoniyastekalegn@gmail.com</span>
              <span>aiwaveagency.com</span>
              <span>github.com/Sofoniyastekalegn</span>
              <span>linkedin.com/in/sofoniyas-tekalegn-962868287</span>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h2 className="text-sm font-bold uppercase tracking-wider text-gray-900 border-b border-gray-400 pb-1 mb-2">PROFESSIONAL PROFILE</h2>
              <p className="text-xs text-gray-800 text-justify leading-relaxed">
                Full-Stack Developer and AI Engineer with hands-on experience across the entire product lifecycle — from SSR web apps and ERP systems to AI voice agents, LLM-powered chatbots, and automated workflows. Proficient in Next.js, React, Vue/Nuxt, NestJS, Node.js, Java Spring Boot, and Python. Experienced with Pinecone, Voyage, LangChain, Vapi, Retell AI, n8n, and Zapier for intelligent automation and CRM/lead-qualification pipelines. Passionate about clean architecture and impactful user experiences.
              </p>
            </div>

            <div>
              <h2 className="text-sm font-bold uppercase tracking-wider text-gray-900 border-b border-gray-400 pb-1 mb-2">TECHNICAL SKILLS</h2>
              <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-xs">
                <div><strong>AI &amp; Voice:</strong> Vapi · Retell AI · LangChain · OpenAI · Pinecone · Voyage · n8n · Zapier · Python · LLMs</div>
                <div><strong>Frontend:</strong> Next.js (SSR/ISR) · React · Vue.js · Nuxt.js · Vuex · TypeScript · JavaScript · HTML5/CSS3</div>
                <div><strong>Backend:</strong> Node.js · NestJS · Express · Java Spring Boot · Django · Python · GraphQL · Hasura</div>
                <div><strong>Databases:</strong> PostgreSQL · MySQL · Supabase · Pinecone (vector DB)</div>
                <div><strong>Mobile/CMS:</strong> React Native · Flutter · Strapi · WordPress · Figma</div>
                <div><strong>Specialities:</strong> AI Chatbots · Voice Agents · CRM Dev · Lead Qualification · ERP · Data Viz (Tableau)</div>
              </div>
            </div>

            <div>
              <h2 className="text-sm font-bold uppercase tracking-wider text-gray-900 border-b border-gray-400 pb-1 mb-2">PROFESSIONAL EXPERIENCE</h2>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-baseline text-xs font-bold">
                    <span>Backend Engineer — Wozena AI Platform</span>
                    <span className="font-mono text-gray-600 font-normal">Apr 2026 – Present</span>
                  </div>
                  <ul className="list-disc pl-4 mt-1 text-[11px] text-gray-800 space-y-0.5">
                    <li>Developing scalable backend services for an AI-powered platform using Python, Node.js, and NestJS.</li>
                    <li>Building and maintaining RESTful APIs and microservices architecture to support AI-driven features.</li>
                    <li>Collaborating on LLM integration, data pipelines, and performance optimization across the stack.</li>
                  </ul>
                </div>
                <div>
                  <div className="flex justify-between items-baseline text-xs font-bold">
                    <span>Software Infrastructure &amp; Front-End Developer — Youth Print Organization</span>
                    <span className="font-mono text-gray-600 font-normal">Jul 2024 – Present</span>
                  </div>
                  <ul className="list-disc pl-4 mt-1 text-[11px] text-gray-800 space-y-0.5">
                    <li>Built and maintained dynamic SSR web apps using Next.js and Strapi CMS for climate-change platform theyouthprint.org.</li>
                    <li>Improved digital content management, SEO performance, and user engagement metrics.</li>
                  </ul>
                </div>
                <div>
                  <div className="flex justify-between items-baseline text-xs font-bold">
                    <span>Full-Stack Developer (Contract) — Metbel Trading</span>
                    <span className="font-mono text-gray-600 font-normal">May 2025</span>
                  </div>
                  <ul className="list-disc pl-4 mt-1 text-[11px] text-gray-800 space-y-0.5">
                    <li>Designed ERP inventory &amp; stock systems using Python and React.</li>
                    <li>Enhanced supply-chain tracking and operational efficiency.</li>
                  </ul>
                </div>
                <div>
                  <div className="flex justify-between items-baseline text-xs font-bold">
                    <span>Web Developer Intern — Kodastropi Marketing Solutions</span>
                    <span className="font-mono text-gray-600 font-normal">Aug – Oct 2025</span>
                  </div>
                  <ul className="list-disc pl-4 mt-1 text-[11px] text-gray-800 space-y-0.5">
                    <li>Built responsive UI components and animations with Vue.js and Nuxt.js.</li>
                    <li>Collaborated on client-facing marketing sites with smooth UX.</li>
                  </ul>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-sm font-bold uppercase tracking-wider text-gray-900 border-b border-gray-400 pb-1 mb-2">KEY PROJECTS</h2>
              <div className="grid grid-cols-2 gap-4 text-[11px]">
                <div>
                  <strong>AI Voice Agent Platform (2025)</strong>
                  <p className="text-gray-700 mt-0.5">Built an AI receptionist using Vapi &amp; Retell AI — automates call analytics. https://aiwave.aiwaveagency.com/</p>
                </div>
                <div>
                  <strong>AIWave Agency Website (2025)</strong>
                  <p className="text-gray-700 mt-0.5">Full AI agency platform with n8n &amp; Zapier workflow automation pipelines. https://www.aiwave.aiwaveagency.com/</p>
                </div>
                <div>
                  <strong>Netsanet – AI Support for Women (2025)</strong>
                  <p className="text-gray-700 mt-0.5">Python chatbot + LLM embeddings (Pinecone, Voyage) empowering legal and resource access.</p>
                </div>
                <div>
                  <strong>Climate Change Platform – The Youth Print (2024)</strong>
                  <p className="text-gray-700 mt-0.5">Next.js SSR/ISR + Strapi CMS; content-heavy platform optimised for performance. https://theyouthprint.org/</p>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-sm font-bold uppercase tracking-wider text-gray-900 border-b border-gray-400 pb-1 mb-2">EDUCATION &amp; CERTIFICATIONS</h2>
              <div className="space-y-1 text-xs text-gray-800">
                <div>● B.Sc. Computer Science — American College of Technology (ACT), Addis Ababa [2024 – 2028 (expected)]</div>
                <div>● Front-End Web Developer — Udacity [Feb – Dec 2025]</div>
                <div>● Financial Markets — Yale University / Coursera [Mar – Jul 2023]</div>
                <div>● Foundations of Data Science: K-Means Clustering — University of London / Coursera [Feb – Apr 2021]</div>
                <div>● Advanced Training — Harvard CS50 · FreeCodeCamp · CodeWithMosh · Scrimba</div>
              </div>
            </div>
          </div>
        </div>

        {/* Floating Cyber Email Live Chat Widget */}
        <div id="floating-chat-container" className="fixed bottom-4 sm:bottom-6 md:bottom-10 right-4 sm:right-6 md:right-10 z-[100] print:hidden">
          <AnimatePresence>
            {!liveChatOpen ? (
              <motion.button
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                onClick={() => { playSound("click"); setLiveChatOpen(true); }}
                className="w-14 h-14 bg-black border border-brand-cream text-brand-cream shadow-[0_0_20px_rgba(238,223,199,0.25)] hover:shadow-[0_0_35px_rgba(238,223,199,0.5)] flex items-center justify-center cursor-pointer transition-all relative group rounded-none"
                title="Connect Live via Secure Email"
              >
                {/* Tiny Green active system loop indicator */}
                <div className="absolute top-1.5 right-1.5 w-2 h-2 bg-green-500 rounded-full animate-pulse border border-black" />
                <MessageSquare className="w-6 h-6 animate-pulse group-hover:scale-110 transition-transform" />
                
                {/* Visual tooltip */}
                <span className="absolute right-16 top-1/2 -translate-y-1/2 px-2.5 py-1 bg-black text-[#eedfc7] font-mono text-[8.5px] tracking-widest uppercase border border-brand-cream/30 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-xl">
                  SYS EMAIL COMMS
                </span>
                <span className="sr-only">Open email live chat unit</span>
              </motion.button>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 30, scale: 0.95 }}
                className="w-[300px] sm:w-[350px] bg-black border border-brand-cream p-4 shadow-[0_20px_60px_rgba(0,0,0,0.95)] backdrop-blur-md relative"
              >
                {/* Micro Header */}
                <div className="flex justify-between items-center border-b border-brand-cream-dark pb-2 mb-3">
                  <div className="flex items-center gap-1.5">
                    <Terminal className="w-3.5 h-3.5 text-brand-cream animate-pulse" />
                    <span className="font-mono text-[9px] tracking-widest text-[#eedfc7]/90 uppercase font-bold">
                      COMMS COMPOSE UNIT // SECURE
                    </span>
                  </div>
                  <button
                    onClick={() => { playSound("click"); setLiveChatOpen(false); setChatSubmitted(false); }}
                    className="text-brand-cream-dim hover:text-white font-mono text-[9px] cursor-pointer"
                  >
                    DISMISS [X]
                  </button>
                </div>

                {!chatSubmitted ? (
                  <form 
                    onSubmit={(e) => {
                      e.preventDefault();
                      setChatSubmitted(true);
                      playSound("click");
                      window.open(
                        `mailto:sofoniyastekalegn@gmail.com?subject=${encodeURIComponent(
                          chatSubject || "Interactive Inquiry"
                        )}&body=${encodeURIComponent(
                          `Sender: ${chatName}\n\nMessage:\n${chatMessage}\n\n---\nSent via Sofoniyas Secure Terminal Portfolio Engine`
                        )}`
                      );
                    }}
                    className="space-y-3 font-mono text-[9px]"
                  >
                    <div>
                      <span className="text-brand-cream-dim block mb-1 uppercase tracking-wider">YOUR IDENTIFIER OR SENDER NAME:</span>
                      <input
                        type="text"
                        required
                        value={chatName}
                        onChange={(e) => setChatName(e.target.value)}
                        placeholder="e.g. VISITOR_0029"
                        className="w-full bg-black border border-brand-cream/20 hover:border-brand-cream/40 focus:border-brand-cream outline-none px-2 py-1.5 text-[#eedfc7]"
                      />
                    </div>

                    <div>
                      <span className="text-brand-cream-dim block mb-1 uppercase tracking-wider">COMMS SUBJECT ELEMENT:</span>
                      <input
                        type="text"
                        required
                        value={chatSubject}
                        onChange={(e) => setChatSubject(e.target.value)}
                        placeholder="e.g. COLLABORATION INQUIRY"
                        className="w-full bg-black border border-brand-cream/20 hover:border-brand-cream/40 focus:border-brand-cream outline-none px-2 py-1.5 text-[#eedfc7]"
                      />
                    </div>

                    <div>
                      <span className="text-brand-cream-dim block mb-1 uppercase tracking-wider">MESSAGE TRANSMISSION STREAM:</span>
                      <textarea
                        required
                        rows={3}
                        value={chatMessage}
                        onChange={(e) => setChatMessage(e.target.value)}
                        placeholder="Enter message stream for Sofoniyas..."
                        className="w-full bg-black border border-brand-cream/20 hover:border-brand-cream/40 focus:border-brand-cream outline-none px-2 py-1.5 text-[#eedfc7] resize-none"
                      />
                    </div>

                    <div className="pt-1 text-[8px] text-brand-cream-dim/50 leading-normal">
                      <span>* Committing will automatically format and fire native OS email dispatch routing.</span>
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-brand-cream hover:bg-black text-black hover:text-brand-cream border border-brand-cream text-center font-bold py-2 tracking-widest uppercase transition-all flex items-center justify-center gap-1.5 cursor-pointer text-[9px]"
                    >
                      <Send className="w-3 h-3" />
                      TRANSMIT ENCRYPTED FEED
                    </button>
                  </form>
                ) : (
                  <div className="py-6 text-center space-y-3 font-mono animate-fade-in text-[9.5px]">
                    <div className="w-8 h-8 rounded-full border border-green-500 flex items-center justify-center mx-auto">
                      <CheckCircle2 className="w-4 h-4 text-green-500 animate-pulse" />
                    </div>
                    <div className="space-y-1">
                      <span className="text-green-400 block font-bold uppercase tracking-wider">DATA FEED DISPATCHED</span>
                      <p className="text-[#eedfc7]/70 text-[8.5px] leading-relaxed px-2">
                        System successfully spawned mail routing for <strong className="text-brand-cream">sofoniyastekalegn@gmail.com</strong>.
                      </p>
                    </div>
                    <div className="pt-2 flex gap-2">
                      <button
                        onClick={() => { playSound("click"); setChatSubmitted(false); }}
                        className="flex-1 border border-brand-cream/20 text-brand-cream-dim/80 hover:border-brand-cream hover:text-brand-cream py-1 text-[8.5px] cursor-pointer"
                      >
                        RESET NODE
                      </button>
                      <button
                        onClick={() => { playSound("click"); setLiveChatOpen(false); setChatSubmitted(false); }}
                        className="flex-1 bg-[#eedfc7]/10 text-brand-cream py-1 text-[8.5px] hover:bg-[#eedfc7]/20 border border-brand-cream/20 cursor-pointer"
                      >
                        EXIT UNITS
                      </button>
                    </div>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
      )}
    </div>
  );
}

