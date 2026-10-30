# VYROX ATHLETICS — Premium Gym Website & AI Fitness Agent

> **BUILT DIFFERENT. TRAIN WITH PURPOSE.**

A production-ready, full-stack athletic facility website engineered for **VYROX ATHLETICS**, featuring high-performance design (Obsidian & Crimson Red), comprehensive gym promotion sections, direct WhatsApp membership concierge integration, and an intelligent dual-mode AI assistant (Floating Chat Advisor & Guided AI Fitness Agent).

---

## 🏋️‍♂️ Project Overview

- **Brand:** VYROX ATHLETICS
- **Tagline:** BUILT DIFFERENT. TRAIN WITH PURPOSE.
- **Frontend Stack:** React 18, Vite, Tailwind CSS, Lucide Icons
- **Backend Stack:** Node.js, Express.js, Helmet, CORS, Express-Rate-Limit
- **AI Integrations:** Official OpenAI SDK & Google Generative AI SDK, backed by a centralized gym knowledge base and structured plan generation.
- **Primary Goal:** Convert prospective visitors into dedicated gym members and provide science-backed, personalized AI fitness guidance.

---

## ✨ Features & Sections

### 1. High-Impact Hero & Branding
- Bold athletic typography (*Oswald* and *Inter*) with obsidian backgrounds and crimson red accents (`#dc2626`).
- Unsplash high-resolution athletic photography.
- Primary CTA: *"Join the Movement"* & Secondary CTA: *"Explore Programs"*.
- Real configured gym metrics (15,000+ sq ft arena, 80+ elite lifting stations, 24/7 biometric access).

### 2. About the Facility & Philosophy
- Story, mission, and the **4 Pillars of Physical Mastery**:
  1. *Progressive Overload*
  2. *Metabolic Fire*
  3. *Intelligent Recovery*
  4. *Athletic Culture*
- Highlights of Olympic lifting platforms (Eleiko), Hammer Strength sector, 40-yard sprint turf, and contrast recovery suite (cold plunge & infrared saunas).

### 3. Workout Programs (6 Disciplines)
- Dedicated cards for:
  1. **Strength & Powerlifting**
  2. **Weight Loss & Conditioning**
  3. **Hypertrophy & Muscle Building**
  4. **1-on-1 Elite Coaching**
  5. **Functional & Athletic Movement**
  6. **Beginner Fundamentals**
- Each card includes difficulty badge, intensity, detailed descriptions, core benefits checklist, and an instant WhatsApp enquiry button.

### 4. Coaching Staff & Trainers
- Profile cards with photos, certifications (CSCS, USAW, NASM, FMS), years of experience, specialties, and bio.
- Clearly marked sample data label per project specifications.

### 5. Transparent Membership Plans
- **Monthly Athlete (₹2,999/mo)** — Flexible, no lock-in contract.
- **Quarterly Pro (₹7,999/quarter)** — Most popular, includes recovery suite & 1-on-1 coaching session (Save ₹998).
- **Black Card VIP (₹24,999/year)** — All-inclusive VIP, reserved locker, unlimited guest passes, and quarterly scans (Save ₹10,989).
- Each plan features a direct **"Enquire via WhatsApp"** button with an automatic prefilled message. No fake payments.

### 6. Interactive Facility Photo Gallery
- Category filters: *All*, *Weight Room*, *Turf & Cardio*, *Recovery Suite*, *Community*.
- Responsive grid with hover effects and expand trigger.
- Accessible full-screen **Lightbox Modal** with Next/Previous arrows, keyboard arrow navigation, and `ESC` key support.

### 7. Member Spotlights & Testimonials
- Reusable athlete cards clearly labeled as demonstration profiles to prevent false testimonials.

### 8. Contact, Location & Social Profiles
- Configurable address (742 Iron Forge Blvd), direct phone, email, and 24/7 operating hours.
- **Official Social Channels Integration:** Direct profile cards and icon buttons for **Instagram** (`@vyroxathletics`), **Facebook** (`VYROX Athletics Official`), and **YouTube** (`VYROX Performance TV`). Configurable directly from `gymConfig.js` and displayed prominently across the Footer and Contact sections.
- Embedded interactive Google Map and external directions link.
- Fully validated contact form with:
  - Client-side & server-side regex validation.
  - **Honeypot anti-spam protection** (`_honey` field traps automated bots).
  - Rate limiting (max 10 submissions per 15 minutes per IP).
  - Clear success alert displaying a unique reference ID (e.g. `Ref: #VYR-XXXXXX`).

### 9. Dual AI Fitness Architecture

#### A. Floating AI Chat Widget (Bottom-Right)
- Accessible on every page with open, minimize, and close controls.
- Grounded strictly in gym configuration facts (hours, pricing, equipment, address) without hallucination.
- Quick prompts carousel:
  - *"Which membership is right for me?"*
  - *"I want to lose weight."*
  - *"Help me build muscle."*
  - *"What are your gym timings?"*
  - *"How do I contact the gym?"*
- Typing indicator, error recovery with **"Retry"** action, and session persistence in `sessionStorage`.

#### B. Dedicated AI Fitness Agent
- Guided 4-step goal-based workflow:
  - **Step 1:** Goal selection (Muscle, Fat Loss, Strength, General Fitness, Beginner).
  - **Step 2:** Schedule configuration (Experience level, 2–6 workout days/week, 30–90 min sessions, gym/home equipment, and injury limitations).
  - **Step 3:** Animated generation status.
  - **Step 4:** Interactive Workout Plan:
    - Day-by-day workout cards with warmup, working compound exercises, and cooldowns.
    - **Interactive checkboxes** for each exercise to mark completion.
    - **Live weekly progress bar** showing completion percentage in real time.
    - Progress saved locally in browser `localStorage`.
    - Nutrition directives, recovery protocols, and tracking tips.
    - Prominent medical & safety disclaimer.
    - Single-click CTA to discuss the plan with a VYROX personal trainer on WhatsApp.

---

## 🗂️ Project Structure

```
VYROX ATHLETICS/
├── client/                      # React + Vite Frontend
│   ├── public/
│   │   └── logo.svg             # Athletic brand vector icon
│   ├── src/
│   │   ├── components/
│   │   │   ├── About.jsx        # Mission & 4 training pillars
│   │   │   ├── ChatMessage.jsx  # Chat bubble with markdown styling
│   │   │   ├── ChatWidget.jsx   # Floating chat advisor
│   │   │   ├── ContactSection.jsx # Contact form & location map
│   │   │   ├── FitnessAgent.jsx # Multi-step AI agent wizard
│   │   │   ├── Footer.jsx       # Comprehensive brand footer
│   │   │   ├── GalleryModal.jsx # Accessible lightbox modal
│   │   │   ├── Hero.jsx         # Hero section & metric counters
│   │   │   ├── MembershipCard.jsx # Pricing cards & WhatsApp CTAs
│   │   │   ├── Navbar.jsx       # Sticky header & mobile drawer
│   │   │   ├── ProgramCard.jsx  # Workout track cards
│   │   │   ├── Testimonials.jsx # Demo member feedback cards
│   │   │   ├── TrainerCard.jsx  # Coach profile cards
│   │   │   └── WorkoutPlan.jsx  # Interactive plan & checkboxes
│   │   ├── data/
│   │   │   ├── gallery.js       # Gallery images & categories
│   │   │   ├── gymConfig.js     # Centralized brand & gym settings
│   │   │   ├── memberships.js   # Pricing tiers & features
│   │   │   ├── programs.js      # 6 training disciplines
│   │   │   ├── testimonials.js  # Sample athlete quotes
│   │   │   └── trainers.js      # Coach credentials & bios
│   │   ├── pages/
│   │   │   └── Home.jsx         # Full landing page assembly
│   │   ├── services/
│   │   │   ├── aiService.js     # Client API communication
│   │   │   └── apiService.js    # Contact & health service
│   │   ├── App.jsx              # Main application coordinator
│   │   ├── index.css            # Tailwind & dark crimson styles
│   │   └── main.jsx             # React DOM root
│   ├── index.html
│   ├── package.json
│   ├── postcss.config.js
│   ├── tailwind.config.js
│   └── vite.config.js
├── server/                      # Node.js + Express Backend
│   ├── src/
│   │   ├── config/
│   │   │   └── gymConfig.js     # Server-side gym facts & grounding
│   │   ├── controllers/
│   │   │   ├── aiController.js  # Chat & plan request validation
│   │   │   └── contactController.js # Contact form & spam filter
│   │   ├── middleware/
│   │   │   └── rateLimiter.js   # IP-based rate limiting
│   │   ├── routes/
│   │   │   ├── aiRoutes.js      # /api/ai endpoints
│   │   │   └── contactRoutes.js # /api/contact endpoints
│   │   ├── services/
│   │   │   └── aiService.js     # Dual OpenAI/Gemini handler
│   │   ├── app.js               # Express application config
│   │   └── server.js            # Server entrypoint
│   ├── .env.example             # Safe placeholder template
│   ├── .gitignore               # Excludes secrets & node_modules
│   ├── package.json
│   └── test_server.js           # Automated integration test suite
├── .gitignore
├── package.json                 # Root convenience scripts
└── README.md
```

---

## 🚀 Quick Start Guide

### Prerequisites
- Node.js (v18.0.0 or higher recommended, tested on Node v24.15)
- npm (v9.0.0 or higher)

### 1. Installation
Install dependencies for both client and server:

```bash
# Using root convenience script:
npm run install:all

# Or manually:
cd server && npm install
cd ../client && npm install
```

### 2. Environment Variables Configuration
In `server/.env` (a `.env.example` file is provided):

```ini
PORT=5000
CLIENT_ORIGIN=http://localhost:5173

# Optional: Set your OpenAI API key
OPENAI_API_KEY=your_openai_api_key_here
OPENAI_MODEL=gpt-4o-mini

# Optional: Set your Google Gemini API key
GEMINI_API_KEY=your_gemini_api_key_here
GEMINI_MODEL=gemini-1.5-flash
```

> **Note on AI Keys:** The backend includes an intelligent fallback knowledge-base responder grounded in real gym facts. If an API key is not supplied or encounters rate limits, the chat advisor and fitness agent seamlessly return structured, science-backed protocols without crashing or exposing errors.

### 3. Running in Development

In two separate terminals:

**Terminal 1 (Backend Server):**
```bash
npm run dev:server
# Server will start on http://localhost:5000
```

**Terminal 2 (Frontend Client):**
```bash
npm run dev:client
# Vite dev server will start on http://localhost:5173
```

Visit `http://localhost:5173` in your browser.

---

## 🧪 Testing & Verification

Run the automated backend integration test suite:

```bash
cd server
npm test
```

This verifies:
1. `GET /api/health` — Confirms uptime and brand status.
2. `GET /api/ai/status` — Checks active AI providers.
3. `POST /api/ai/chat` — Tests conversation validation, prompt grounding, and fallback response.
4. `POST /api/ai/fitness-plan` — Tests structured plan generation and schedule validation.
5. `POST /api/contact/submit` — Tests form validation and unique reference ID generation.
6. **Honeypot Spam Protection** — Confirms that automated spam submissions are safely trapped and discarded.

### Client Production Build
To test the production client bundle:

```bash
npm run build:client
# Compiles into client/dist/ with 0 errors
```

---

## 🔒 Security Best Practices Implemented

- **No Secrets in Bundles:** API keys are loaded exclusively on the Node.js server via `dotenv`. No keys are exposed in Vite `VITE_` variables.
- **Strict Input Validation:** Message length limits (max 1,000 chars), history capping (max 10 messages), and data sanitization.
- **Honeypot Spam Defense:** Invisible honeypot inputs trap bots without imposing friction on real users.
- **Rate Limiting:** Protects AI and contact endpoints against automated abuse.
- **CORS & Helmet:** Restricts allowed origins and enforces standard HTTP security headers.
- **Clean Error Handling:** Server stack traces and internal exceptions are suppressed from production clients.

---

## 📄 License
All rights reserved © VYROX ATHLETICS.

