# Sofoniyas Tekalegn | Master Portfolio // CORE

An immersive, futuristic cyber-HUD styled professional portfolio showcasing full-stack software development, generative AI integration, and creative coding. 

Live Demo: [sofoniyastekalign.vercel.app](https://sofoniyastekalign.vercel.app/)

---

## 🚀 Key Features

* **Interactive Dual View Modes**:
  * **Website Core**: A clean, modern, single-page responsive grid showcasing profile statistics, project dossier, chronological milestones, and a reactive skills matrix.
  * **Cyber HUD (26-Deck)**: A highly interactive sci-fi tactical HUD simulator traversing 26 slides detailing architecture, databases, cryptography, creative canvas systems, and platform optimization.
* **Generative Art & Graphics Engines**:
  * **Math Vector Canvas**: Features 10 dynamic, interactive mathematical particle simulations (Network, Matrix, Sphere, Quantum, Circuit, Vector, Grid, Spiral, Scan, Geometry) rendered on a high-performance 60fps canvas.
  * **Video Stream Backdrop**: Immersive background supporting YouTube streaming feeds or locally uploaded mp4/webm files with adjustable ambient backlight/opacity.
* **Audio Synthesis Interface**: Built-in sound generator utilizing the browser's native **Web Audio API** to produce retro-futuristic sound effects on hover, click, transition, and index shifts.
* **Reactive Comms & Live Dossier**: Secure email communication unit interface and text-format resume auto-exporter.

---

## 🛠️ Tech Stack & Architecture

* **Frontend Framework**: [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
* **Build System**: [Vite 6](https://vite.dev/) (fast HMR, optimized bundler)
* **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
* **Animations**: [Motion](https://motion.dev/) (Framer Motion) for hardware-accelerated transitions
* **Icons**: [Lucide React](https://lucide.dev/)
* **Dev Environments**: TypeScript compiler validation (`tsc --noEmit`), dev servers, and clean modular dependency separation.

---

## 💻 Local Setup & Development

### Prerequisites

Ensure you have **Node.js** (v20+ recommended) and **npm** installed.

### 1. Clone & Navigate

```bash
git clone https://github.com/Sofoniyastekalegn/sofoniyastekalegnportifolio.git
cd sofoniyastekalegnportifolio
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Start Development Server

```bash
npm run dev
```

The app will start running locally at:
* Local: [http://localhost:3000/](http://localhost:3000/)

---

## 📦 Build & Deployment

### Production Build

Compile and bundle the production assets (outputs to `dist/`):

```bash
npm run build
```

### Preview Locally

Preview the compiled production bundle locally:

```bash
npm run preview
```

### Type Checking / Linting

Verify TypeScript compiler assertions:

```bash
npm run lint
```
