import { useRef, type ReactNode } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  type MotionValue,
} from "motion/react";
import {
  Github,
  Linkedin,
  Layers,
  Download,
  Sparkles,
} from "lucide-react";
import cyberAstronaut from "../assets/images/cyber_astronaut_1780708518597.png";

interface HeroSectionProps {
  playSound: (sound: string) => void;
  setShowCvDossier: (show: boolean) => void;
}

const LEFT_FLOAT_WORDS = [
  "FULL-STACK",
  "REACT",
  "NEXT.JS",
  "AI ENGINEER",
  "TYPESCRIPT",
  "VOICE AI",
];

const RIGHT_FLOAT_WORDS = [
  "NODE.JS",
  "PYTHON",
  "LLM",
  "SUPABASE",
  "DEPLOY",
  "AUTOMATION",
];

const LINK_LEFT_WORDS = ["OPEN SOURCE", "GITHUB"];
const LINK_RIGHT_WORDS = ["NETWORK", "LINKEDIN"];

function FloatingWord({
  text,
  side,
  index,
  scrollYProgress,
  className = "",
}: {
  text: string;
  side: "left" | "right";
  index: number;
  scrollYProgress: MotionValue<number>;
  className?: string;
}) {
  const delay = index * 0.08;
  const y = useTransform(scrollYProgress, [0, 0.45, 1], [0, -18 - index * 6, -40 - index * 10]);
  const scale = useTransform(scrollYProgress, [0, 0.35, 0.75, 1], [0.72, 1, 1.18 + index * 0.03, 1.35 + index * 0.05]);
  const opacity = useTransform(scrollYProgress, [0, 0.15, 0.7, 1], [0.35, 0.85, 1, 0.55]);
  const x = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    side === "left" ? [0, 12, 28] : [0, -12, -28]
  );
  const smoothY = useSpring(y, { stiffness: 90, damping: 22 });
  const smoothScale = useSpring(scale, { stiffness: 100, damping: 20 });

  return (
    <motion.span
      style={{ y: smoothY, scale: smoothScale, opacity, x }}
      className={`hero-float-word ${side === "left" ? "hero-fade-in-left" : "hero-fade-in-right"} ${className}`}
      initial={{ opacity: 0, x: side === "left" ? -48 : 48 }}
      animate={{
        opacity: 1,
        x: 0,
        y: [0, -7 - index * 1.5, 0],
      }}
      transition={{
        opacity: { duration: 0.9, delay: 0.2 + delay, ease: [0.22, 1, 0.36, 1] },
        x: { duration: 0.9, delay: 0.2 + delay, ease: [0.22, 1, 0.36, 1] },
        y: { duration: 4.8 + index * 0.4, repeat: Infinity, ease: "easeInOut", delay: index * 0.25 },
      }}
    >
      {text}
    </motion.span>
  );
}

function TitleLine({
  children,
  scrollYProgress,
  delay = 0,
}: {
  children: ReactNode;
  scrollYProgress: MotionValue<number>;
  delay?: number;
}) {
  const scale = useTransform(scrollYProgress, [0, 0.4, 0.85], [1, 1.04, 1.14]);
  const y = useTransform(scrollYProgress, [0, 0.5, 1], [0, -8, -22]);
  const smoothScale = useSpring(scale, { stiffness: 120, damping: 18 });

  return (
    <motion.span
      style={{ scale: smoothScale, y }}
      initial={{ opacity: 0, y: 36, filter: "blur(10px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.85, delay, ease: [0.16, 1, 0.3, 1] }}
      className="inline-block origin-left"
    >
      {children}
    </motion.span>
  );
}

export default function HeroSection({ playSound, setShowCvDossier }: HeroSectionProps) {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const avatarScale = useTransform(scrollYProgress, [0, 0.35, 0.85], [1, 1.06, 1.18]);
  const avatarY = useTransform(scrollYProgress, [0, 1], [0, -48]);
  const avatarZ = useTransform(scrollYProgress, [0, 0.6, 1], [0, 40, 90]);
  const avatarRotateX = useTransform(scrollYProgress, [0, 1], [0, -4]);
  const smoothAvatarScale = useSpring(avatarScale, { stiffness: 80, damping: 18 });
  const smoothAvatarY = useSpring(avatarY, { stiffness: 90, damping: 22 });

  const bioScale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.02, 1.08]);
  const bioOpacity = useTransform(scrollYProgress, [0, 0.8, 1], [1, 0.92, 0.75]);

  return (
    <section
      ref={heroRef}
      id="hero-section"
      className="hero-perspective relative w-full max-w-7xl mx-auto min-h-[88vh] sm:min-h-[92vh] md:min-h-[86vh] grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-center py-6 sm:py-10 md:py-12 border-b border-brand-cream-dark/30 overflow-hidden"
    >
      {/* Ambient depth glow toward viewer */}
      <div className="hero-depth-glow pointer-events-none absolute inset-0" aria-hidden="true" />

      {/* Left floating space words */}
      <div className="pointer-events-none absolute left-0 top-[12%] sm:top-[16%] hidden sm:flex flex-col gap-3 md:gap-4 z-0 max-w-[28%] md:max-w-[22%]">
        {LEFT_FLOAT_WORDS.map((word, i) => (
          <FloatingWord
            key={word}
            text={word}
            side="left"
            index={i}
            scrollYProgress={scrollYProgress}
            className="text-[8px] md:text-[9px] lg:text-[10px]"
          />
        ))}
      </div>

      {/* Right floating space words */}
      <div className="pointer-events-none absolute right-0 top-[18%] sm:top-[20%] hidden sm:flex flex-col items-end gap-3 md:gap-4 z-0 max-w-[28%] md:max-w-[22%]">
        {RIGHT_FLOAT_WORDS.map((word, i) => (
          <FloatingWord
            key={word}
            text={word}
            side="right"
            index={i}
            scrollYProgress={scrollYProgress}
            className="text-[8px] md:text-[9px] lg:text-[10px]"
          />
        ))}
      </div>

      {/* Mobile / tablet orbit words around avatar zone */}
      <div className="pointer-events-none absolute inset-x-0 top-[4%] sm:top-[6%] flex sm:hidden justify-between px-1 z-0">
        <div className="flex flex-col gap-2">
          {LEFT_FLOAT_WORDS.slice(0, 3).map((word, i) => (
            <FloatingWord
              key={word}
              text={word}
              side="left"
              index={i}
              scrollYProgress={scrollYProgress}
              className="text-[7px]"
            />
          ))}
        </div>
        <div className="flex flex-col items-end gap-2">
          {RIGHT_FLOAT_WORDS.slice(0, 3).map((word, i) => (
            <FloatingWord
              key={word}
              text={word}
              side="right"
              index={i}
              scrollYProgress={scrollYProgress}
              className="text-[7px]"
            />
          ))}
        </div>
      </div>

      <div className="lg:col-span-7 space-y-4 sm:space-y-6 order-2 lg:order-1 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="inline-flex items-center gap-2 border border-brand-cream/20 bg-brand-cream/5 px-3 py-1 text-[10px] sm:text-xs font-mono tracking-widest text-brand-cream hero-badge-float"
        >
          <Sparkles className="w-3.5 h-3.5 text-brand-cream animate-pulse shrink-0" />
          🚀 FULL-STACK WEB DEVELOPER
        </motion.div>

        <h1 className="font-display font-black text-3xl sm:text-5xl lg:text-6xl tracking-tight leading-[1.05] text-brand-cream hero-title-3d">
          <TitleLine scrollYProgress={scrollYProgress} delay={0.15}>
            Hello, I&apos;m
          </TitleLine>
          <br />
          <TitleLine scrollYProgress={scrollYProgress} delay={0.28}>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-cream via-amber-100 to-[#eedfc7] drop-shadow-sm">
              Sofoniyas Tekalegn
            </span>
          </TitleLine>
        </h1>

        <motion.p
          style={{ scale: bioScale, opacity: bioOpacity }}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4 }}
          className="font-sans font-light text-brand-cream-dim/90 text-sm sm:text-base leading-relaxed max-w-2xl responsive-copy text-left sm:text-justify origin-left"
        >
          Fullstack Developer and AI Engineer with hands-on experience across the entire stack — React, Next.js, TypeScript on the frontend, Python, Node.js, and Java on the backend. I work with MongoDB, PostgreSQL, Supabase, and Vector DBs to build fast, AI-ready systems — integrating LLMs and automation pipelines that replace manual processes with intelligent workflows. From Figma to deployment — clean code, thoughtful UX, real impact.
        </motion.p>

        <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3 sm:gap-4 pt-1 sm:pt-2">
          <button
            onClick={() => {
              playSound("matrix");
              document.getElementById("projects-grid-anchor")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-brand-cream hover:bg-black text-black hover:text-brand-cream border border-brand-cream py-2.5 px-5 sm:px-6 font-mono text-[11px] sm:text-xs tracking-widest font-bold transition-all cursor-pointer shadow-md min-h-11"
          >
            <Layers className="w-4 h-4" />
            VIEW PROJECTS
          </button>

          <button
            onClick={() => {
              playSound("click");
              setShowCvDossier(true);
            }}
            className="w-full sm:w-auto flex items-center justify-center gap-2 border border-brand-cream/40 hover:border-brand-cream text-[#eedfc7] hover:bg-brand-cream/5 py-2.5 px-5 sm:px-6 font-mono text-[11px] sm:text-xs tracking-widest transition-all cursor-pointer min-h-11"
          >
            <Download className="w-4 h-4 text-brand-cream" />
            DOWNLOAD CV / RESUME
          </button>

          {/* Social row with floating left/right words beside icons */}
          <div className="w-full sm:w-auto relative flex items-center justify-center gap-2 sm:gap-3 border border-brand-cream-dark/50 bg-black/60 px-3 sm:px-5 py-2.5 text-brand-cream-dim min-h-11 overflow-visible">
            <span className="font-mono text-[8px] sm:text-[9px] tracking-widest uppercase font-semibold shrink-0">
              LINKS:
            </span>

            <div className="hidden md:flex flex-col gap-0.5 items-end mr-1 pointer-events-none">
              {LINK_LEFT_WORDS.map((word, i) => (
                <FloatingWord
                  key={word}
                  text={word}
                  side="left"
                  index={i}
                  scrollYProgress={scrollYProgress}
                  className="text-[7px] opacity-70"
                />
              ))}
            </div>

            <a
              href="https://github.com/Sofoniyastekalegn"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-brand-cream transition-colors cursor-pointer p-1 relative z-10"
            >
              <Github className="w-4 h-4 hover:scale-110 transition-transform" />
            </a>

            <a
              href="https://www.linkedin.com/in/sofoniyas-tekalegn-962868287"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-brand-cream transition-colors cursor-pointer p-1 relative z-10"
            >
              <Linkedin className="w-4 h-4 hover:scale-110 transition-transform" />
            </a>

            <div className="hidden md:flex flex-col gap-0.5 items-start ml-1 pointer-events-none">
              {LINK_RIGHT_WORDS.map((word, i) => (
                <FloatingWord
                  key={word}
                  text={word}
                  side="right"
                  index={i}
                  scrollYProgress={scrollYProgress}
                  className="text-[7px] opacity-70"
                />
              ))}
            </div>

            {/* Compact floating words beside LinkedIn on mobile/tablet */}
            <div className="flex md:hidden items-center gap-1.5 pointer-events-none overflow-visible">
              <span className="hero-float-word hero-fade-in-left text-[6px] sm:text-[7px] opacity-60">
                CONNECT
              </span>
              <span className="hero-float-word hero-fade-in-right text-[6px] sm:text-[7px] opacity-60 animation-delay-300">
                PROFILE
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Avatar with fade-in + scroll zoom toward viewer */}
      <div className="lg:col-span-5 flex justify-center lg:justify-end order-1 lg:order-2 relative z-10">
        <motion.div
          style={{
            scale: smoothAvatarScale,
            y: smoothAvatarY,
            rotateX: avatarRotateX,
            z: avatarZ,
          }}
          initial={{ opacity: 0, scale: 0.82, y: 40, filter: "blur(14px)" }}
          animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1.15, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="hero-avatar-stage relative group max-w-[220px] sm:max-w-xs md:max-w-sm w-full mx-auto lg:mx-0 animate-hero-avatar-fade-in"
        >
          <div className="absolute -inset-1.5 bg-gradient-to-r from-brand-cream/20 to-amber-500/10 blur opacity-45 group-hover:opacity-80 transition duration-1000 group-hover:duration-200 animate-hero-glow-pulse" />
          <div className="absolute inset-0 bg-brand-cream-dark/30 border border-brand-cream/30" />

          <img
            src={cyberAstronaut}
            alt="Sofoniyas Tekalegn Cyber Astronaut Portrait"
            referrerPolicy="no-referrer"
            className="w-full h-auto object-cover relative z-10 border border-brand-cream/20 drop-shadow-2xl filter grayscale-[15%] group-hover:grayscale-0 transition-all duration-700 hero-avatar-image"
          />

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="absolute bottom-2.5 left-2.5 z-20 bg-black/85 backdrop-blur-md px-3 py-1 text-[9px] font-mono tracking-widest text-[#eedfc7]/80 border border-brand-cream/20 uppercase font-bold"
          >
            SYS_AVATAR: SO_99
          </motion.div>

          {/* Face-forward scan ring */}
          <div className="pointer-events-none absolute inset-0 z-20 border border-brand-cream/10 hero-face-ring" aria-hidden="true" />
        </motion.div>
      </div>
    </section>
  );
}
