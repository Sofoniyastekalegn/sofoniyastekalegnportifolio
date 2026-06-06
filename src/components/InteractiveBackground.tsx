import { useEffect, useRef } from "react";

interface InteractiveBackgroundProps {
  graphicType: 'network' | 'matrix' | 'quantum' | 'sphere' | 'circuit' | 'vector' | 'grid' | 'spiral' | 'scan' | 'geometry';
  mousePos: { x: number; y: number };
}

export default function InteractiveBackground({ graphicType, mousePos }: InteractiveBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Dynamic resize handler
    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    // State definitions for different graphics
    let particles: Array<{ x: number; y: number; vx: number; vy: number; r: number; alpha: number; angle?: number; speed?: number; size?: number }> = [];
    let lines: Array<{ x1: number; y1: number; x2: number; y2: number; life: number; maxLife: number }> = [];
    let angle = 0;

    // Initialize particles according to the graphic type
    const initGraphics = () => {
      particles = [];
      lines = [];
      
      if (graphicType === "network") {
        const count = Math.min(100, Math.floor((width * height) / 15000));
        for (let i = 0; i < count; i++) {
          particles.push({
            x: Math.random() * width,
            y: Math.random() * height,
            vx: (Math.random() - 0.5) * 0.4,
            vy: (Math.random() - 0.5) * 0.4,
            r: Math.random() * 2 + 1,
            alpha: Math.random() * 0.5 + 0.3,
          });
        }
      } else if (graphicType === "matrix") {
        const columns = Math.floor(width / 24);
        for (let i = 0; i < columns; i++) {
          particles.push({
            x: i * 24,
            y: Math.random() * height,
            vx: 0,
            vy: Math.random() * 2 + 1,
            r: Math.random() * 6 + 10, // code size
            alpha: Math.random() * 0.6 + 0.2,
          });
        }
      } else if (graphicType === "sphere") {
        const count = 120;
        for (let i = 0; i < count; i++) {
          // Store spherical coordinates (u, v)
          const u = Math.random();
          const v = Math.random();
          const theta = u * 2.0 * Math.PI;
          const phi = Math.acos(2.0 * v - 1.0);
          
          // Math radius
          const r = 220;
          particles.push({
            x: r * Math.sin(phi) * Math.cos(theta),
            y: r * Math.sin(phi) * Math.sin(theta),
            vx: r * Math.cos(phi), // Store Z coordinate in vx
            vy: 0,
            r: Math.random() * 1.5 + 1,
            alpha: Math.random() * 0.6 + 0.3,
            angle: Math.random() * Math.PI, // custom parameter
          });
        }
      } else if (graphicType === "quantum") {
        const orbitCount = 5;
        for (let i = 0; i < orbitCount; i++) {
          particles.push({
            x: width / 2,
            y: height / 2,
            vx: 0,
            vy: 0,
            r: 120 + i * 45, // orbit major radius
            alpha: Math.random() * 2 * Math.PI, // current angle
            speed: (Math.random() * 0.015 + 0.005) * (Math.random() > 0.5 ? 1 : -1),
            size: Math.random() * 3 + 1.5, // particle radius
          });
        }
      } else if (graphicType === "circuit") {
        // Generate circuit anchors
        const count = 30;
        for (let i = 0; i < count; i++) {
          particles.push({
            x: Math.floor(Math.random() * (width / 40)) * 40,
            y: Math.floor(Math.random() * (height / 40)) * 40,
            vx: Math.random() > 0.5 ? 40 : -40,
            vy: Math.random() > 0.5 ? 40 : -40,
            r: Math.random() * 2 + 1,
            alpha: Math.random() * 0.7 + 0.2,
          });
        }
      } else if (graphicType === "spiral") {
        const count = 180;
        for (let i = 0; i < count; i++) {
          const theta = (i / count) * Math.PI * 12;
          const dist = (i / count) * 350 + 10;
          particles.push({
            x: dist * Math.cos(theta),
            y: dist * Math.sin(theta),
            vx: theta, // original theta
            vy: dist,  // original dist
            r: Math.random() * 1.5 + 1,
            alpha: Math.random() * 0.7 + 0.2,
          });
        }
      } else {
        // General fallback / geometry
        const count = 50;
        for (let i = 0; i < count; i++) {
          particles.push({
            x: Math.random() * width,
            y: Math.random() * height,
            vx: (Math.random() - 0.5) * 1,
            vy: (Math.random() - 0.5) * 1,
            r: Math.random() * 3 + 1,
            alpha: Math.random() * 0.4 + 0.1,
          });
        }
      }
    };

    initGraphics();

    // Loop
    const draw = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 1)"; // Pure black background
      ctx.fillRect(0, 0, width, height);

      // Simple grid pattern in background
      ctx.strokeStyle = "rgba(238, 223, 199, 0.02)";
      ctx.lineWidth = 1;
      const gridSize = 80;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      angle += 0.002;

      // Draw depending on graphicType
      if (graphicType === "network") {
        // Update particles
        particles.forEach((p) => {
          p.x += p.vx;
          p.y += p.vy;

          if (p.x < 0 || p.x > width) p.vx *= -1;
          if (p.y < 0 || p.y > height) p.vy *= -1;

          // Affect by mouse
          const dx = mousePos.x - p.x;
          const dy = mousePos.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 180) {
            const force = (180 - dist) / 180;
            p.x -= (dx / dist) * force * 1.5;
            p.y -= (dy / dist) * force * 1.5;
          }

          ctx.fillStyle = `rgba(238, 223, 199, ${p.alpha})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          ctx.fill();
        });

        // Draw connections
        ctx.lineWidth = 0.6;
        for (let i = 0; i < particles.length; i++) {
          for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < 120) {
              const alpha = (120 - dist) / 120 * 0.15;
              ctx.strokeStyle = `rgba(238, 223, 199, ${alpha})`;
              ctx.beginPath();
              ctx.moveTo(particles[i].x, particles[i].y);
              ctx.lineTo(particles[j].x, particles[j].y);
              ctx.stroke();
            }
          }
        }
      } else if (graphicType === "matrix") {
        ctx.font = "11px var(--font-mono)";
        ctx.fillStyle = "rgba(238, 223, 199, 0.45)";
        
        particles.forEach((p) => {
          p.y += p.vy;
          if (p.y > height) {
            p.y = 0;
            p.x = Math.floor(Math.random() * (width / 24)) * 24;
          }

          const chr = Math.random() > 0.5 ? "1" : "0";
          
          // Draw character trail
          ctx.fillStyle = `rgba(238, 223, 199, ${p.alpha * 0.8})`;
          ctx.fillText(chr, p.x, p.y);

          // Draw head trail
          if (Math.random() > 0.95) {
            ctx.fillStyle = "rgba(238, 223, 199, 0.9)";
            ctx.fillText(Math.random() > 0.5 ? "X" : "//", p.x, p.y + 12);
          }
        });
      } else if (graphicType === "sphere") {
        const centerX = width / 2;
        const centerY = height / 2;

        // Sort particles by simulated Z projection which is in vx
        const rotY = angle * 2;
        const rotX = angle * 1.5;

        const projected: Array<{ rx: number; ry: number; rz: number; p: typeof particles[0] }> = [];

        particles.forEach((p) => {
          // Original 3D coordinates stored as x, y, z (where z is simulated as vx initially)
          const x3d = p.x;
          const y3d = p.y;
          const z3d = p.vx;

          // Rotate Y axis
          let x1 = x3d * Math.cos(rotY) - z3d * Math.sin(rotY);
          let z1 = x3d * Math.sin(rotY) + z3d * Math.cos(rotY);

          // Rotate X axis
          let y2 = y3d * Math.cos(rotX) - z1 * Math.sin(rotX);
          let z2 = y3d * Math.sin(rotX) + z1 * Math.cos(rotX);

          // Perspective scaling
          const fov = 400;
          const scale = fov / (fov + z2);
          
          const rx = centerX + x1 * scale;
          const ry = centerY + y2 * scale;

          projected.push({ rx, ry, rz: z2, p });
        });

        // Draw node points
        projected.forEach(({ rx, ry, rz, p }) => {
          const depthAlpha = (300 - rz) / 450;
          if (depthAlpha > 0) {
            ctx.fillStyle = `rgba(238, 223, 199, ${p.alpha * depthAlpha * 0.9})`;
            ctx.beginPath();
            ctx.arc(rx, ry, p.r * (depthAlpha * 1.2), 0, Math.PI * 2);
            ctx.fill();
          }
        });

        // Sparing connection lines to make it look hyper high-tech wireframe
        ctx.lineWidth = 0.5;
        for (let i = 0; i < projected.length; i += 3) {
          const next = projected[(i + 4) % projected.length];
          const dist = Math.hypot(projected[i].rx - next.rx, projected[i].ry - next.ry);
          if (dist < 150) {
            const midAlpha = Math.min(projected[i].p.alpha, next.p.alpha) * 0.12;
            ctx.strokeStyle = `rgba(238, 223, 199, ${midAlpha})`;
            ctx.beginPath();
            ctx.moveTo(projected[i].rx, projected[i].ry);
            ctx.lineTo(next.rx, next.ry);
            ctx.stroke();
          }
        }
      } else if (graphicType === "quantum") {
        const cx = width / 2;
        const cy = height / 2;

        // Draw quantum field orbitals
        particles.forEach((p, idx) => {
          p.alpha = (p.alpha || 0) + (p.speed || 0.015);
          
          // Draw Orbit outline
          ctx.strokeStyle = `rgba(238, 223, 199, 0.045)`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.ellipse(cx, cy, p.r, p.r * 0.45, idx * 0.4, 0, Math.PI * 2);
          ctx.stroke();

          // Calculate point on ellipse orbit
          const px = cx + p.r * Math.cos(p.alpha) * Math.cos(idx * 0.4) - p.r * 0.45 * Math.sin(p.alpha) * Math.sin(idx * 0.4);
          const py = cy + p.r * Math.cos(p.alpha) * Math.sin(idx * 0.4) + p.r * 0.45 * Math.sin(p.alpha) * Math.cos(idx * 0.4);

          // Draw orbital quantum particle
          ctx.fillStyle = "rgba(238, 223, 199, 0.95)";
          ctx.beginPath();
          ctx.arc(px, py, p.size || 2, 0, Math.PI * 2);
          ctx.fill();

          // Draw particle trail glowing effect
          ctx.strokeStyle = `rgba(238, 223, 199, 0.4)`;
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.moveTo(px, py);
          ctx.lineTo(px - Math.cos(p.alpha) * 12, py - Math.sin(p.alpha) * 8);
          ctx.stroke();
        });

        // Draw active nucleus
        ctx.fillStyle = "rgba(238, 223, 199, 0.15)";
        ctx.beginPath();
        ctx.arc(cx, cy, 30 + Math.sin(angle * 10) * 3, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = "rgba(238, 223, 199, 0.9)";
        ctx.beginPath();
        ctx.arc(cx, cy, 3, 0, Math.PI * 2);
        ctx.fill();
      } else if (graphicType === "circuit") {
        // Render geometric schematic line routes
        ctx.strokeStyle = "rgba(238, 223, 199, 0.07)";
        ctx.lineWidth = 1;

        particles.forEach((p) => {
          // Draw random orthogonal traces
          ctx.beginPath();
          ctx.strokeStyle = `rgba(238, 223, 199, ${p.alpha * 0.25})`;
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p.x + p.vx, p.y);
          ctx.lineTo(p.x + p.vx, p.y + p.vy);
          ctx.stroke();

          // Node terminals
          ctx.fillStyle = `rgba(238, 223, 199, ${p.alpha * 0.7})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r * 1.5 + 1, 0, Math.PI * 2);
          ctx.fill();

          // Let them drift very slowly
          if (Math.random() > 0.99) {
            p.x = Math.floor(Math.random() * (width / 40)) * 40;
            p.y = Math.floor(Math.random() * (height / 40)) * 40;
          }
        });
      } else if (graphicType === "spiral") {
        const cx = width / 2;
        const cy = height / 2;
        const rot = angle * 1.2;

        particles.forEach((p) => {
          p.alpha = (p.alpha || 0) + 0.001;
          const currentTheta = p.vx + rot;
          const dist = p.vy * (1.1 + Math.sin(angle) * 0.08); // pulsing distance

          const x = cx + dist * Math.cos(currentTheta);
          const y = cy + dist * Math.sin(currentTheta);

          ctx.fillStyle = `rgba(238, 223, 199, ${p.alpha * 0.8})`;
          ctx.beginPath();
          ctx.arc(x, y, p.r, 0, Math.PI * 2);
          ctx.fill();

          // Draw tiny connecting threads to galaxy center
          if (Math.random() > 0.995) {
            ctx.strokeStyle = "rgba(238, 223, 199, 0.05)";
            ctx.beginPath();
            ctx.moveTo(cx, cy);
            ctx.lineTo(x, y);
            ctx.stroke();
          }
        });
      } else if (graphicType === "grid") {
        // Perspective grid representation flowing in infinite space
        const horizonY = height * 0.40;
        const yOffset = (angle * 95) % 60; // scroll speed
        
        ctx.strokeStyle = "rgba(238, 223, 199, 0.06)";
        ctx.lineWidth = 1;

        // Draw horizontal lines with logarithmic narrowing to horizon
        for (let i = 0; i < 20; i++) {
          const ratio = i / 20;
          const py = horizonY + (height - horizonY) * Math.pow(ratio, 2.5);
          ctx.beginPath();
          ctx.moveTo(0, py);
          ctx.lineTo(width, py);
          ctx.stroke();
        }

        // Draw dynamic scrolling lines
        const pyDynamic = horizonY + yOffset;
        if (pyDynamic > horizonY && pyDynamic < height) {
          ctx.strokeStyle = "rgba(238, 223, 199, 0.1)";
          ctx.beginPath();
          ctx.moveTo(0, pyDynamic);
          ctx.lineTo(width, pyDynamic);
          ctx.stroke();
        }

        // Draw perspective lines going to common vanishing point
        const vanishingX = width / 2;
        const linesCount = 24;
        ctx.strokeStyle = "rgba(238, 223, 199, 0.04)";
        for (let i = 0; i <= linesCount; i++) {
          const ratio = i / linesCount;
          const bottomX = width * ratio;
          ctx.beginPath();
          ctx.moveTo(vanishingX, horizonY);
          ctx.lineTo(bottomX, height);
          ctx.stroke();
        }
      } else if (graphicType === "scan") {
        // Sweeping radars and telemetry scopes targeting the mouse
        const cx = width / 2;
        const cy = height / 2;

        // Pulse radar sweep line
        const sweepAngle = angle * 4;
        ctx.strokeStyle = "rgba(238, 223, 199, 0.03)";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(cx + Math.cos(sweepAngle) * width, cy + Math.sin(sweepAngle) * width);
        ctx.stroke();

        // Pulsing rings at center
        ctx.strokeStyle = "rgba(238, 223, 199, 0.035)";
        ctx.lineWidth = 1;
        for (let i = 1; i <= 4; i++) {
          const radius = (i * 110 + angle * 80) % 450;
          ctx.beginPath();
          ctx.arc(cx, cy, radius, 0, Math.PI * 2);
          ctx.stroke();
        }

        // Draw target on mouse poser
        ctx.strokeStyle = "rgba(238, 223, 199, 0.15)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(mousePos.x, mousePos.y, 25, 0, Math.PI * 2);
        ctx.stroke();

        // Draw crosshair at mouse
        ctx.beginPath();
        ctx.moveTo(mousePos.x - 35, mousePos.y);
        ctx.lineTo(mousePos.x + 35, mousePos.y);
        ctx.moveTo(mousePos.x, mousePos.y - 35);
        ctx.lineTo(mousePos.x, mousePos.y + 35);
        ctx.stroke();

        // Draw coordinate lines to axes
        ctx.setLineDash([5, 5]);
        ctx.strokeStyle = "rgba(238, 223, 199, 0.05)";
        ctx.beginPath();
        ctx.moveTo(mousePos.x, 0);
        ctx.lineTo(mousePos.x, height);
        ctx.moveTo(0, mousePos.y);
        ctx.lineTo(width, mousePos.y);
        ctx.stroke();
        ctx.setLineDash([]); // clear dash
      } else {
        // Fallback or floating geometry morph overlays
        particles.forEach((p) => {
          p.x += p.vx;
          p.y += p.vy;

          if (p.x < 0 || p.x > width) p.vx *= -1;
          if (p.y < 0 || p.y > height) p.vy *= -1;

          ctx.fillStyle = `rgba(238, 223, 199, ${p.alpha * 0.4})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          ctx.fill();
        });
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, [graphicType, mousePos]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full block bg-black z-0"
      style={{ mixBlendMode: "screen", imageRendering: "pixelated" }}
    />
  );
}
