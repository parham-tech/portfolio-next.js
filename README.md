# Parham Shirinkam — Frontend Developer Portfolio

An interactive frontend developer portfolio built with **Next.js, React, TypeScript, Tailwind CSS, Framer Motion, and GSAP**.

This portfolio showcases modern frontend development techniques through immersive animations, interactive experiences, browser-based games, API integrations, accessibility improvements, SEO optimization, and performance-focused implementation.

## 🌐 Live Demo

https://portfolio-next-js-parham.vercel.app/

## 📌 Repository

https://github.com/parham-tech/portfolio-next.js

---

## ✨ Features

### 🎬 Interactive Story Mode

A custom scrollytelling experience designed with animated scenes, visual effects, and scroll-driven interactions.

Features:

* Scroll-based storytelling
* GSAP-powered animations
* MotionPath animations
* Video-based visual effects
* Custom transitions
* Responsive behavior

---

### 🎨 Dynamic Theme System

A customizable theme system with multiple visual styles.

Includes:

* Day theme
* Green theme
* Purple theme
* Red theme
* Dark theme

Theme-aware components dynamically update their appearance based on the active theme.

---

### 🎮 Interactive Projects

The portfolio includes custom interactive projects:

#### Snake Game

A responsive browser-based Snake game featuring:

* Keyboard controls
* Mobile-friendly interactions
* Responsive game board
* Sound effects
* Dynamic sizing

#### Neon Reflex

A cyberpunk-inspired reflex game featuring:

* Round-based gameplay
* Increasing difficulty
* Animated interactions
* Custom game logic

---

### 🌦 Weather Integration

A weather widget powered by the OpenWeather API.

Features:

* Search weather by city
* Browser geolocation support
* API route integration
* Dynamic weather display

---

### 🎨 Project Showcase

Interactive project presentation with:

* 3D project carousel
* Drag and swipe interactions
* Project preview modals
* Browser-style live previews

---

## 🛠 Tech Stack

### Core

* **Next.js 14.2.3** (App Router)
* **React 18.2.0**
* **TypeScript 5.4.5**
* **Tailwind CSS 3.4.1**

### Animation

* **Framer Motion 10.16.4**
* **GSAP 3.13.0**
* GSAP MotionPath
* Custom CSS animations

### Data & APIs

* Axios
* OpenWeather API
* CoinGecko API (used in Crypto Dashboard project)

### Forms & Validation

* React Hook Form
* Zod

### Testing

* Jest
* React Testing Library

---

## 📂 Project Architecture

The project follows a feature-based architecture:

```text
src/
├── app/                  # Next.js App Router pages and layouts
│
├── features/             # Feature-based modules
│   ├── hero/
│   ├── projects/
│   ├── skills/
│   ├── story/
│   └── ...
│
├── components/           # Reusable UI components
│
├── context/              # Global state management
│   ├── ThemeContext
│   ├── StoryModeContext
│   └── ScrollProgressContext
│
├── data/                 # Static project and skills data
│
└── shared/               # Shared utilities and types
```

---

## 🎞 Animation System

Animation is a major part of the portfolio experience.

### Framer Motion

Used for:

* Component entrances
* Page transitions
* Hover interactions
* UI animations
* Reveal effects

### GSAP

Used for:

* ScrollTrigger animations
* Complex timelines
* Parallax effects
* MotionPath animations
* Story Mode interactions

### Custom Animations

Includes:

* Floating cloud animations
* Particle effects
* Marquee animations
* Custom transition effects

---

## ♿ Accessibility

Accessibility was considered throughout the development process.

Implemented features:

* Semantic HTML structure
* Keyboard navigation support
* Skip-to-content navigation
* Accessible buttons and controls
* ARIA labels
* Modal dialog accessibility
* Focus trapping
* Focus restoration after modal closing
* Reduced motion support using `prefers-reduced-motion`

---

## 🔍 SEO Optimization

The portfolio includes:

* Next.js Metadata API
* Open Graph metadata
* Twitter card configuration
* JSON-LD structured data
* Person schema
* Sitemap generation
* Robots configuration
* Semantic HTML structure

---

## ⚡ Performance Optimization

Performance improvements include:

* Next.js Image optimization
* Lazy loading heavy components
* Dynamic imports with `next/dynamic`
* Optimized video loading strategies
* Responsive media handling
* Efficient animation implementation
* Canvas optimization for Chroma Key video processing

---

## 🧩 Technical Highlights

### ChromaKeyVideo Component

A custom browser-based green-screen removal system using:

* HTML Canvas
* Video frame processing
* `requestVideoFrameCallback`

### Advanced Parallax System

A custom parallax implementation used inside Story Mode for immersive scrolling effects.

### Theme-Aware Components

Reusable components that dynamically adapt their styling based on the global theme state.

---

## 🚀 Getting Started

### Requirements

* Node.js
* npm or pnpm

### Installation

```bash
git clone https://github.com/parham-tech/portfolio-next.js.git

cd portfolio-next.js

npm install
```

### Development

```bash
npm run dev
```

Open:

```
http://localhost:3000
```

### Production Build

```bash
npm run build

npm run start
```

---

## 🎯 Project Goals

This portfolio was created to demonstrate practical frontend development skills including:

* Modern React development
* Next.js App Router
* TypeScript
* Component architecture
* Animation systems
* API integration
* Accessibility
* SEO
* Performance optimization
* Responsive design

---

## 📄 License

This project is licensed under the MIT License.
