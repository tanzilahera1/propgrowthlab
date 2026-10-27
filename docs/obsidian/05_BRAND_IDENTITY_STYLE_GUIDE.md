# 🎨 05. Brand Identity, Logo Hex Codes & Style Guide
> **Parent Dashboard:** [[00_EXECUTIVE_MASTER_DASHBOARD]]  
> **Related:** [[01_FOUR_PILLARS_OFFER_ARCHITECTURE]] | [[04_TECH_STACK_AUTOMATION_AND_SLA]]

---

## 💎 Brand Persona & Aesthetic Vibe
- **Brand Archetype:** The High-Tech Luxury Growth Architect.
- **Visual Feeling:** Warm stone linen elegance, architectural precision, Swiss typography, glowing ambient gold accents.
- **Core Design Rule:** Never look like a cheap generic SaaS or a clunky corporate real estate portal. Look like a private Swiss wealth management platform meets modern Silicon Valley PropTech.

---

## 🎨 Master Color Palette & Exact Hex Codes

### 1. The Signature Amber & Gold Gradients (Primary Brand Theme)

#### A. Light Theme (Navbar, Hero Headings & Light Canvas):
- **Tailwind Definition:** `from-amber-600 via-amber-500 to-amber-700`
- **Color Stops & Hex Codes:**
  - **Start (Left):** `#d97706` — Deep Warm Amber
  - **Middle (Center):** `#f59e0b` — Vibrant Golden Amber
  - **End (Right):** `#b45309` — Rich Bronze Amber
- **CSS Code:**
  ```css
  background: linear-gradient(90deg, #d97706 0%, #f59e0b 50%, #b45309 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  ```

#### B. Dark Theme (Footer, Dark CTA Sections & Dark Backgrounds):
- **Tailwind Definition:** `from-amber-400 via-amber-300 to-amber-500`
- **Color Stops & Hex Codes:**
  - **Start (Left):** `#fbbf24` — Luminous Gold Amber
  - **Middle (Center):** `#fcd34d` — Bright Warm Sunbeam Gold
  - **End (Right):** `#f59e0b` — Core Amber Glow
- **CSS Code:**
  ```css
  background: linear-gradient(90deg, #fbbf24 0%, #fcd34d 50%, #f59e0b 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  ```

#### C. Vector Logo Icon Gradient (Adobe Illustrator Specification):
- **Building Pillars & Rising Arrow:**
  - **Base / Start (0%):** `#E85D04` (বা `#D97706`) — Deep Saturated Warm Amber
  - **Tip / Head (100%):** `#FFB703` (বা `#FFAA00`) — Radiant Golden Sunburst
  - **Angle:** `45°` (or dragged along the arrow curve with Gradient Tool `G` from bottom-tail to top-tip).
  - **Outer Frame:** Deep Midnight Obsidian (`#102A43` / `#14120f`).

---

### 2. Neutral Background Canvas (The Warm Stone Linen System)
To avoid harsh stark white while maintaining an ultra-premium editorial feel:
- **Base Canvas:** `#fbfbfa` (Warm Stone Linen)
- **Subtle Hero Mid-tone:** `#f7f5f0` (Natural Sand Silk)
- **Card Background:** `#ffffff` (Pure Crisp White on Stone Canvas)
- **Subtle Borders:** `#e7e5e4` / `border-stone-200/90`
- **Dark Sections & Footer:** `#181206` via `#120e07` to `#0c0a08` (`stone-950`)
- **Ambient Glow:** `bg-amber-500/10` to `bg-amber-500/15` with `blur-3xl` / `blur-[130px]`.

---

## 🔤 Typography & Hierarchy
- **Primary Body & Display Font:** `Geist Sans`, `-apple-system`, `BlinkMacSystemFont`, `Segoe UI`, `Inter`, `sans-serif`.
- **Badges & Metrics:** `font-mono`, `text-[10.5px]`, `tracking-wide`, `uppercase`, `rounded-[4px]`.
- **Headings:**
  - H1 Hero: `text-3xl sm:text-5xl lg:text-6xl`, `font-black`, `tracking-tight`, `leading-[1.14]`.
  - H2 Section: `text-2xl sm:text-4xl`, `font-black`, `tracking-tight`.
  - H3 Card Title: `text-lg sm:text-xl`, `font-bold`.

---

## 📱 Interactive Floating Elements & CTAs
- **Floating WhatsApp CTA (`FloatingWhatsAppCTA.tsx`):**
  - Position: Fixed bottom right (`bottom-6 right-6 z-50`).
  - Active Green Pulse Badge with real WhatsApp icon.
  - WhatsApp Link: `https://wa.me/8801540505122` with pre-filled inquiries.
  - Circular SVG progress ring for Smooth Scroll-to-Top trigger.

---

## 🚫 Design Rules & "Never Do" List
1. **Never use generic primary blue/green:** Always use the warm stone + radiant amber gold theme.
2. **Never leave harsh white strips above the dark footer:** All pre-footer CTA sections must seamlessly transition into the footer's dark gradient.
3. **Never use vague commission numbers:** Co-broker split is strictly **Fixed 70 / 30** (Agent 70%, Platform 30%).
4. **Always specify explicit image sizes:** Never hardcode disparate icon file names; use `/logo.png` everywhere with size attributes.
