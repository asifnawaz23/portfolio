/**
 * Single source of truth for every fact shown on the site.
 * Everything here comes from the previous portfolio, the GitHub profile README,
 * project READMEs, or information supplied directly by Asif.
 * Do not add metrics, dates or claims that cannot be traced to one of those.
 */

export const profile = {
  name: 'Muhammad Asif Nawaz',
  shortName: 'Asif Nawaz',
  roles: ['AI/ML Engineer', 'Full-Stack Developer', 'Creative Technologist'],
  education: {
    degree: 'BS Software Engineering',
    school: 'Sir Syed University of Engineering and Technology',
    abbr: 'SSUET',
    city: 'Karachi, Pakistan',
    period: '2023 — Present',
  },
  status: 'Open to internships & entry-level roles · Karachi / Remote',
  email: 'masifnawaz815@gmail.com',
  github: 'https://github.com/asifnawaz23',
  githubHandle: 'asifnawaz23',
  linkedin: 'https://www.linkedin.com/in/muhammad-asif-nawaz-',
  linkedinHandle: 'muhammad-asif-nawaz-',
  photo: '/assets/my-photo.jpg',
}

export const principles = [
  {
    k: '01',
    title: 'AI should show its evidence.',
    body: 'Scores trace back to signals, uncertainty is stated openly, and the system says "Unknown" instead of guessing.',
  },
  {
    k: '02',
    title: 'Security is part of version one.',
    body: 'Ownership checks, server-only secrets and input validation go in from the start — not as a patch later.',
  },
  {
    k: '03',
    title: 'The interface is engineering work.',
    body: 'Accessibility, keyboard support and real-time feedback get the same care as the API behind them.',
  },
]

export const interests = [
  'Artificial Intelligence',
  'Machine Learning',
  'Generative AI',
  'Agentic AI',
  'Natural Language Processing',
  'Full-Stack Development',
  'Intelligent Automation',
  'AI-powered Products',
]

/* ───────────────────────── Technical arsenal ───────────────────────── */

export type TechCategory = 'Programming' | 'Frontend' | 'Backend' | 'AI / ML' | 'Databases' | 'Tools'

export interface Tech {
  name: string
  cat: TechCategory
  note: string
  usedIn?: string[]
}

export const techCategories: { id: TechCategory; code: string; blurb: string }[] = [
  { id: 'AI / ML', code: 'AI', blurb: 'Models, NLP pipelines and privacy engineering' },
  { id: 'Programming', code: 'PL', blurb: 'Languages I think and ship in' },
  { id: 'Frontend', code: 'FE', blurb: 'Interfaces that feel fast and accessible' },
  { id: 'Backend', code: 'BE', blurb: 'APIs, services and real-time plumbing' },
  { id: 'Databases', code: 'DB', blurb: 'Relational data layers' },
  { id: 'Tools', code: 'TL', blurb: 'The everyday workbench' },
]

export const techs: Tech[] = [
  // Programming
  { name: 'Python', cat: 'Programming', note: 'FastAPI services, Transformers pipelines, Presidio PII redaction and a climate engine.', usedIn: ['SafeX internship', 'AgroShift AI'] },
  { name: 'TypeScript', cat: 'Programming', note: 'Strictly typed, end to end — client, server and shared models.', usedIn: ['ScamShield AI', 'FleetPulse', 'PhoenixGrid'] },
  { name: 'JavaScript', cat: 'Programming', note: 'Where it started: CLI tools, a calculator and a vanilla JS chat UI.', usedIn: ['FinAssist AI', 'Early builds'] },
  { name: 'Java', cat: 'Programming', note: 'Object-oriented design and software construction coursework at SSUET.' },
  { name: 'SQL', cat: 'Programming', note: 'Schemas, seeds and queries behind incident, fleet and inventory data.', usedIn: ['PhoenixGrid', 'FleetPulse'] },
  // Frontend
  { name: 'React.js', cat: 'Frontend', note: 'Dashboards, live maps, analytics and accessible component systems.', usedIn: ['ScamShield AI', 'FleetPulse', 'DentalSense AI'] },
  { name: 'Vite', cat: 'Frontend', note: 'Fast builds for every React project — including this site.', usedIn: ['PhoenixGrid', 'DentalSense AI'] },
  { name: 'Tailwind CSS', cat: 'Frontend', note: 'Utility-first styling for product UIs.', usedIn: ['ScamShield AI', 'PhoenixGrid'] },
  { name: 'HTML5', cat: 'Frontend', note: 'Semantic, accessible markup built to WAI-ARIA patterns.', usedIn: ['FlyRank internship'] },
  { name: 'CSS3', cat: 'Frontend', note: 'Layout, motion and responsive systems from first principles.' },
  // Backend
  { name: 'Node.js', cat: 'Backend', note: 'Event-driven servers for APIs, telemetry and auth.', usedIn: ['ScamShield AI', 'FleetPulse'] },
  { name: 'Express.js', cat: 'Backend', note: 'REST APIs with validation on every mutation endpoint.', usedIn: ['PhoenixGrid', 'FleetPulse', 'ScamShield AI'] },
  { name: 'REST APIs', cat: 'Backend', note: 'Resource design, JWT role guards, Socket.IO broadcasts and FastAPI endpoints.', usedIn: ['FleetPulse', 'DentalSense AI'] },
  // AI / ML
  { name: 'PyTorch', cat: 'AI / ML', note: 'Runtime for local transformer inference on CPU.', usedIn: ['DentalSense AI', 'Vulnerability triage'] },
  { name: 'Hugging Face Transformers', cat: 'AI / ML', note: 'Zero-shot classification (DeBERTa-v3 NLI) and DistilBERT sentiment.', usedIn: ['FinAssist AI', 'Vulnerability triage', 'DentalSense AI'] },
  { name: 'NLP', cat: 'AI / ML', note: 'Intent detection, sentiment, theme tagging and Roman Urdu signal detection.', usedIn: ['SafeX internship', 'ScamShield AI'] },
  { name: 'Generative AI', cat: 'AI / ML', note: 'LLM explanations bound to evidence — the model explains, it never decides.', usedIn: ['ScamShield AI', 'AgroShift AI'] },
  { name: 'AI API Integration', cat: 'AI / ML', note: 'Server-side LLM calls with key fallback, streaming and vision OCR.', usedIn: ['ScamShield AI', 'STREAMAI'] },
  { name: 'Microsoft Presidio', cat: 'AI / ML', note: 'Custom recognisers lifted exact-span recall from 0.50 to 0.91.', usedIn: ['PII redaction pipeline'] },
  // Databases
  { name: 'Microsoft SQL Server', cat: 'Databases', note: 'Incident data, schema and seed scripts.', usedIn: ['PhoenixGrid'] },
  { name: 'MySQL', cat: 'Databases', note: 'Relational modelling and query work.' },
  { name: 'SQLite', cat: 'Databases', note: 'Embedded persistence for real-time fleet data.', usedIn: ['FleetPulse'] },
  // Tools
  { name: 'Git', cat: 'Tools', note: 'Branch-first workflow on every project.' },
  { name: 'GitHub', cat: 'Tools', note: 'Public portfolio of work, team repos and CI.' },
  { name: 'VS Code', cat: 'Tools', note: 'Primary editor.' },
  { name: 'Eclipse', cat: 'Tools', note: 'Java development environment.' },
  { name: 'Figma', cat: 'Tools', note: 'Interface exploration before code.' },
]

/* ───────────────────────── Projects ───────────────────────── */

export type ProjectTag = 'AI / ML' | 'Full-Stack' | 'Real-Time' | 'Data & Climate'

export interface Project {
  id: string
  index: string
  name: string
  kicker: string
  accent: string
  tags: ProjectTag[]
  summary: string
  problem: string
  contribution: string
  features: string[]
  stack: string[]
  proof?: string
  github?: string
  live?: string
  visual: 'scamshield' | 'phoenix' | 'agroshift' | 'fleet'
  badge?: string
}

export const projects: Project[] = [
  {
    id: 'scamshield',
    index: '01',
    name: 'ScamShield AI',
    kicker: 'Evidence-first scam & phishing intelligence',
    accent: '#a497ff',
    tags: ['AI / ML', 'Full-Stack'],
    badge: 'Build with Kiro 2026 · Top 10',
    summary:
      'Turns a suspicious message, link or screenshot into a structured, explainable threat report — calibrated for Pakistan’s banks, wallets, telecoms and government services, in English and Roman Urdu.',
    problem:
      'Spam filters say “likely spam” and stop there. Users can’t see why, and the filters guess even when there is little evidence.',
    contribution:
      'Solo build for the Build with Kiro 2026 hackathon — signal engine, URL analysis, evidence-bound AI layer, auth, dashboard and deployment.',
    features: [
      'Deterministic risk score (0–98) traceable to 16 signal classes',
      'Typosquat, homoglyph, @-host spoof and punycode URL checks',
      'Screenshot OCR via AI vision, then scored like text',
      'AI explains the evidence — returns “Unknown” when evidence is thin',
      'Email, OTP and Google OAuth auth with per-account dashboard',
    ],
    stack: ['React', 'TypeScript', 'Node.js', 'Express', 'Turso', 'Three.js', 'Vision OCR'],
    proof: '89 automated tests',
    github: 'https://github.com/asifnawaz23/ScamShield-AI',
    live: 'https://myscamshield-ai.netlify.app/',
    visual: 'scamshield',
  },
  {
    id: 'agroshift',
    index: '02',
    name: 'AgroShift AI',
    kicker: 'NASA climate data, translated for farmers',
    accent: '#9fd8b0',
    tags: ['AI / ML', 'Data & Climate', 'Full-Stack'],
    badge: 'NASA Space Apps 2026 · Team Lead',
    summary:
      'Farmers pick a field on a map and compare three crop rotations — existing, water-saving and soil-improving — using 20 years of NASA POWER data, satellite soil moisture and FAO-56 crop science.',
    problem:
      'Summers are hotter, rain less reliable and groundwater lower, yet farmers in Punjab, Sindh and Iowa can’t use NASA’s decades of climate data directly.',
    contribution:
      'Led the team and owned the repository. Built the climate engine, the What-If simulator and the early-warning alert system on the backend.',
    features: [
      'Rule-based engine on published science — every number has a source',
      'What-If simulator: −2…+5 °C and −50…+30% rain, re-scored in under a second',
      'Heat, drought, frost, waterlogging and soil-drying alerts with reasons',
      'AI explanations and chat in English, Urdu, Sindhi and Punjabi',
    ],
    stack: ['Python', 'Django', 'React', 'Vite', 'Tailwind', 'Leaflet', 'NASA POWER', 'Gemini'],
    proof: '115 engine tests + 46 API tests',
    github: 'https://github.com/asifnawaz23/nasa_agroshift_AI',
    live: 'https://fieldshift-virid.vercel.app',
    visual: 'agroshift',
  },
  {
    id: 'fleetpulse',
    index: '03',
    name: 'FleetPulse',
    kicker: 'Real-time fleet operations',
    accent: '#9cc9ff',
    tags: ['Real-Time', 'Full-Stack'],
    summary:
      'Live vehicle tracking, trips, fuel, maintenance and alerts, with separate admin and driver portals — every dashboard updates the moment a vehicle moves.',
    problem:
      'A dispatcher needs to see vehicle positions and problems as they happen, not after a page refresh.',
    contribution:
      'Designed and built it end to end: telemetry simulator, typed Express API, WebSocket layer, auth and the React dashboard.',
    features: [
      'GPS simulator streams updates every 4 s across 5 Karachi routes',
      'Socket.IO broadcasts to every connected MapLibre dashboard',
      'Speeding, low-fuel, harsh-braking and geofence alerts',
      'JWT role-based auth (Admin / Driver) and trip replay with scrubbing',
    ],
    stack: ['React 19', 'TypeScript', 'Node.js', 'Express', 'Socket.IO', 'MapLibre GL', 'SQLite'],
    github: 'https://github.com/asifnawaz23/-Decodelabs/tree/main/week%203%20proj',
    visual: 'fleet',
  },
  {
    id: 'phoenixgrid',
    index: '04',
    name: 'PhoenixGrid',
    kicker: 'Emergency response & intelligent tracking',
    accent: '#ff9b7a',
    tags: ['Full-Stack', 'Real-Time'],
    summary:
      'A full-stack emergency-response platform that keeps citizens, rescue operators and command centres in sync around a live incident map.',
    problem:
      'During a crisis, incident reports scatter across channels and responders lose the shared picture of where help is needed.',
    contribution:
      'My first production-style system, built from scratch — React/TypeScript frontend, Express API and the MS SQL Server schema.',
    features: [
      'Leaflet incident mapping with real-time spatial tracking',
      'Type-safe React 18 + Vite interface',
      'Express REST API connected to Microsoft SQL Server',
      'Responsive, accessible Tailwind UI',
    ],
    stack: ['React', 'TypeScript', 'Vite', 'Leaflet', 'Express', 'MS SQL Server'],
    github: 'https://github.com/asifnawaz23/PhoenixGrid',
    visual: 'phoenix',
  },
]

/**
 * Projects named for the portfolio whose case studies aren't public yet.
 * TODO(asif): add summary / stack / links to promote any of these into `projects`.
 */
export const labProjects = [
  { name: 'TeckStock', note: 'Case study in preparation' },
  { name: 'FeelBeats', note: 'Case study in preparation' },
  { name: 'Nexus AI', note: 'Case study in preparation' },
]

export const moreWork = [
  {
    name: 'DentalSense AI',
    note: 'Clinic feedback → sentiment, themes and trends. Local DistilBERT inference behind FastAPI, React dashboard.',
    stack: 'Python · FastAPI · Transformers · React',
    href: 'https://github.com/asifnawaz23/safex-ai-ml-internship/tree/main/WEEK%203/DentalSense-AI',
  },
  {
    name: 'STREAMAI',
    note: 'Token-streaming chat across Gemini and OpenRouter with server-side key fallback and a 3D hologram UI.',
    stack: 'Next.js 15 · AI SDK · R3F',
    href: 'https://github.com/asifnawaz23/Stream-ai-ChatBot',
    live: 'https://stream-ai-chat.vercel.app',
  },
  {
    name: 'Prime App',
    note: 'Next.js platform with a WebGL hero, JWT-protected admin CMS and Prisma/PostgreSQL.',
    stack: 'Next.js · Prisma · PostgreSQL',
    href: 'https://github.com/asifnawaz23/PrimeApp',
    live: 'https://prime-app-xi.vercel.app',
  },
  {
    name: 'Nexora Inventory',
    note: 'Inventory system where every UI action hits a validated Express REST API, plus a 3D dashboard scene.',
    stack: 'React · Vite · Express · R3F',
    href: 'https://github.com/asifnawaz23/-Decodelabs/tree/main/Week%202%20proj',
  },
]

/* ───────────────────────── Experience ───────────────────────── */

export const experience = [
  {
    org: 'SafeX Solutions',
    role: 'AI/ML Intern',
    period: '2026',
    status: 'Completed',
    summary: 'A Day 1 exercise and four weekly projects — from a first scikit-learn model to a measured PII-redaction pipeline.',
    items: [
      { t: 'FinAssist AI', d: 'Hugging Face zero-shot chatbot routing fintech queries into 9 intents with safe, pre-defined responses.' },
      { t: 'Vulnerability triage', d: 'DeBERTa-v3 NLI classification plus a deterministic validation layer; severity, explanation and remediation as JSON.' },
      { t: 'DentalSense AI', d: 'DistilBERT sentiment analysis behind FastAPI with rule-based themes and a React dashboard.' },
      { t: 'PII pipeline', d: 'Microsoft Presidio with six custom recognisers — recall 0.50 → 0.91, precision 0.62 → 0.84.' },
    ],
    stack: ['PyTorch', 'Transformers', 'FastAPI', 'Presidio', 'spaCy', 'pytest'],
    href: 'https://github.com/asifnawaz23/safex-ai-ml-internship',
  },
  {
    org: 'FlyRank.ai',
    role: 'Front-End AI Engineering Intern',
    period: '2026',
    status: undefined as string | undefined,
    summary: 'Building AI-integrated web applications with a focus on accessible, responsive interfaces.',
    items: [
      { t: 'AI-integrated web apps', d: 'Frontend development for AI-powered product features.' },
      { t: 'Accessible components', d: 'Modal, Tabs and Disclosure from scratch to WAI-ARIA APG — focus trapping, keyboard navigation, Escape handling.' },
      { t: 'Gap analysis', d: 'Compared hand-built components with Radix UI / shadcn: portals, scroll lock, focus scopes.' },
      { t: 'Implementation & QA', d: 'Responsive interfaces, implementation and quality assurance.' },
    ],
    stack: ['TypeScript', 'React', 'WAI-ARIA', 'Responsive UI'],
    href: 'https://github.com/asifnawaz23/Flyrank-AI-Internship',
  },
  {
    org: 'SSUET, Karachi',
    role: 'BS Software Engineering',
    period: '2023 — Present',
    status: 'In progress',
    summary: 'Core focus on DBMS, software design & architecture and operating systems — applied immediately in real builds.',
    items: [],
    stack: ['DBMS', 'Software Architecture', 'Operating Systems'],
    href: undefined as string | undefined,
  },
]

/* ───────────────────────── Leadership & achievements ───────────────────────── */

export const achievements = [
  {
    kind: 'Hackathon',
    title: 'Build with Kiro 2026',
    detail: 'ScamShield AI selected in the Top 10.',
    highlight: 'Top 10',
    size: 'xl' as const,
  },
  {
    kind: 'Global challenge',
    title: 'NASA Space Apps Challenge 2026',
    detail: 'Team Lead — AgroShift AI, Challenge #06 “Field Shift”.',
    highlight: 'Team Lead',
    size: 'lg' as const,
  },
  {
    kind: 'Leadership',
    title: 'IEEE Education Society',
    detail: 'Vice Chair, SSUET Chapter.',
    highlight: 'Vice Chair',
    size: 'md' as const,
  },
  {
    kind: 'Exhibition',
    title: 'SED Exhibition',
    detail: 'Selected three consecutive years.',
    highlight: '3×',
    size: 'md' as const,
  },
  {
    kind: 'Leadership',
    title: 'Class Representative',
    detail: 'Sir Syed University of Engineering & Technology.',
    highlight: 'CR',
    size: 'md' as const,
  },
]

/* ───────────────────────── Beyond the screen ───────────────────────── */

export const beyond = [
  { word: 'AI Innovation', line: 'Systems that reason in the open and admit what they don’t know.' },
  { word: 'Emerging Tech', line: 'Agents, real-time data and spatial interfaces — learned by shipping them.' },
  { word: 'Creative Engineering', line: 'Where WebGL, motion and solid architecture meet.' },
  { word: 'Problem Solving', line: 'Start from the person with the problem, not the stack.' },
  { word: 'Meaningful Products', line: 'Scam protection, disaster response, climate-smart farming.' },
]

export const navItems = [
  { id: 'about', label: 'About' },
  { id: 'arsenal', label: 'Arsenal' },
  { id: 'work', label: 'Work' },
  { id: 'journey', label: 'Journey' },
  { id: 'honors', label: 'Honors' },
  { id: 'contact', label: 'Contact' },
]
