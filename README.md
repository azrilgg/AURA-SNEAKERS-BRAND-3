<div align="center">

# 🌟 AURA SNEAKERS 🌟
**Premium Football-Inspired Sneaker Collection Platform**

[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18-blue?style=for-the-badge&logo=react)](https://react.dev/)
[![CSS Modules](https://img.shields.io/badge/Styling-CSS_Modules-pink?style=for-the-badge&logo=css3)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![Lucide](https://img.shields.io/badge/Icons-Lucide_React-purple?style=for-the-badge&logo=lucide)](https://lucide.dev/)

An architectural masterpiece of e-commerce web design. **AURA SNEAKERS** transcends traditional landing pages by seamlessly blending immersive 3D-effect carousels, ultra-dynamic color theming, and glassmorphism UI into a "God-Tier" digital experience.

</div>

---

## 🎨 Design Philosophy: "Super God-Tier"

The mission behind AURA SNEAKERS is to deliver a visceral, premium shopping experience that matches the quality of high-end, limited-edition footwear. 

* **Fluid Dynamics:** Every interaction features custom `cubic-bezier` curves for hyper-smooth, liquid motion.
* **Intelligent Theming:** The entire environment—backgrounds, typography glow, drop shadows, and active states—reads the active sneaker's primary palette and instantly recolors the UI to match. 
* **Uncompromised Responsiveness:** From huge 4K horizontal displays to precise 380px mobile screens, the layout scales flawlessly without ever cutting off content, utilizing bottom-sheet modals on phones.
* **Deep Immersion:** The combination of monumental background text watermarks, depth-of-field drop shadows below shoes, and radial gradient pulsing creates a true 3D sensation.

## ✨ Core Features

### 🛒 The Ultimate Buying Experience
- **Frictionless Order Flow:** Select sizes visually and tap directly into dynamic WhatsApp or Instagram ordering nodes.
- **God-Tier Modals:** Animated, blurred glass overlays that command attention without breaking context. 
- **Flawless Mobile View:** The Order Modal acts as a native iOS bottom-sheet, scrolling perfectly regardless of phone size.

### 📏 Interactive Size Guide (ISO-Accurate)
- **Precision Engineering:** A fully interactive sneaker size finder based on ISO Mondopoint measurements.
- **Width Customization:** Adjust results for narrow, normal, or wide feet.
- **Confidence Metric:** Calculates a visual "Fit Confidence" percentage based on exact heel-to-toe inputs.
- **Real-Time Conversions:** Seamless toggling between Centimeters and Inches.
- **Alternative Match:** Intelligently suggests half-sizes if you land slightly above a perfect mark.

### ⚽ Football Heritage Carousel
- **Horizontal Masterpiece:** Swipe or wheel through legendary football clubs (FC Barcelona, Real Madrid, Liverpool, Arsenal, Chelsea, AC Milan).
- **Club DNA:** The typography directly inherits the team's colors. For example, the club name features solid team colors for the serif font and an outlined gradient fill for the sans-serif font.
- **Dynamic Data Rendering:** Displays core legacy info, top club icons, mottos, and custom badges per slide.

---

## 💻 Tech Stack & Architecture

- **Framework:** Next.js (App Router)
- **UI Library:** React.js
- **Styling:** Vanilla CSS Modules with deeply nested variables (`--club-primary`, `--glow-rgb`), leveraging `clamp()` for fluid typography.
- **Iconography:** Lucide-React (vector, infinitely scalable, precision weighted).
- **State Management:** React Hooks (`useState`, `useEffect`, `useCallback`) governing complex UI timing and scroll-locking.

### 📁 Key Project Structure
```text
📦 AURA SNEAKERS
 ┣ 📂 app
 ┃ ┣ 📂 components
 ┃ ┃ ┣ 📜 CarouselSlide.jsx       # The animated 3D visual engine
 ┃ ┃ ┣ 📜 SizeGuideModal.jsx      # Heavy logic ISO size calculator
 ┃ ┃ ┣ 📜 OrderModal.jsx          # Mobile bottom-sheet & tablet God-layout
 ┃ ┃ ┣ 📜 Hero.jsx                # Initial landing impact
 ┃ ┃ ...and corresponding .module.css layers
 ┃ ┣ 📂 data
 ┃ ┃ ┗ 📜 clubs.js                # Core JSON dataset driving the whole app
 ┃ ┣ 📜 layout.js
 ┃ ┣ 📜 page.js                   # Primary View Controller
 ┃ ┗ 📜 globals.css               # Base resets, variables, global scrollbars
```

---

## 🚀 Getting Started

Follow these steps to run the AURA SNEAKERS application locally:

### Prerequisites
Make sure you have Node.js (v18 or higher) and npm installed on your machine.

### Installation

1. **Clone the repository** (or navigate to the project directory):
   ```bash
   cd "AURA SNEAKERS"
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Experience the Magic:**
   Open [http://localhost:3000](http://localhost:3000) with your browser to experience the God-Tier UI.

---

## 📱 Responsive Breakpoints Guide

- **Desktop (1025px and above):** Expansive horizontal scroll, full background imagery, immense typography.
- **God-Tier Tablet (768px - 1024px):** Carefully reconfigured stacking order, portrait-friendly padding, 5-column grids, focused touch targets.
- **Mobile Native (381px - 767px):** Completely rebuilt interactions. Modals slide up from the bottom. Multi-column grids compress perfectly. Shoe assets are centered and optimized for swipe.
- **Mini Mobile (Max 380px):** Ultra-compressed but readable interfaces (e.g., 3-column size grids instead of 4). Zero content clipping.

> *"Design is not just what it looks like and feels like. Design is how it works."*

<div align="center">
  <br />
  <strong>Built with ❤️ and an obsession for detail limitlessly pushing Web limits.</strong>
</div>
