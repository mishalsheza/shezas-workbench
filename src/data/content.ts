/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  content.ts: every word and link on the site lives here.
 *  Components never hard-code copy; edit this file and the whole site updates.
 *  Search for "TODO: Sheza to fill in" to find everything that still needs you.
 *
 *  Sources: project facts come from each repo's README and dependency files,
 *  the verified numbers in Desktop/ai projects/resume_bullets.md, and your
 *  Nov 2026 resume. Claims that file flags as unsupported are left out.
 * ─────────────────────────────────────────────────────────────────────────────
 */

/* ═══════════════════════════════ Skills ═══════════════════════════════ */

/** Every skill on the site. Projects reference these names, so a typo fails the build. */
export const SKILL_NAMES = [
  // Languages
  'Python',
  'JavaScript',
  'TypeScript',
  'Java',
  'SQL',
  // Frontend
  'React',
  'React Native',
  // Backend
  'Node.js',
  'Express',
  'FastAPI',
  'Flask',
  'WebSockets',
  'Socket.IO',
  'Pydantic',
  // AI / ML
  'LLMs',
  'LangGraph',
  'RAG',
  'Groq',
  'Machine Learning',
  'Computer Vision',
  'MediaPipe',
  'OpenCV',
  'Twilio',
  'Deepgram',
  'Cartesia',
  // Data
  'MongoDB',
  'Supabase',
  'ChromaDB',
  // Hardware
  'Arduino',
  'Blockly',
  // Tools
  'Git',
  'pytest',
  'Docker',
  'GitHub Actions',
] as const

export type SkillName = (typeof SKILL_NAMES)[number]

export type SkillCategory = 'AI / ML' | 'Backend' | 'Frontend & Mobile' | 'Tools & DevOps'

export const SKILL_CATEGORIES: SkillCategory[] = ['AI / ML', 'Backend', 'Frontend & Mobile', 'Tools & DevOps']

export interface Skill {
  name: SkillName
  category: SkillCategory
  /** Featured skills sit on the desk's tool tray; the rest live under "all tools" and in resume mode. */
  featured?: boolean
}

/* ═══════════════════════════════ Types ═══════════════════════════════ */

/** The interactive objects in the studio scene. */
export type DeskObjectId =
  | 'compact'
  | 'house'
  | 'bell'
  | 'ticket'
  | 'ledger'
  | 'arduino'
  | 'pegboard'
  | 'pinboard'
  | 'mug'
  | 'laptop'

/** Each project's signature colour; chestnut for skills, about and contact. */
export type Accent = 'rose' | 'terracotta' | 'gold' | 'cornflower' | 'sage' | 'teal' | 'chestnut'

export type ProjectId = 'shadesense' | 'ai-property-advisor' | 'hotel-voice-agent' | 'queueease' | 'finance-tracker'

export type ExperienceId = 'robovision-internship'

export type ProjectCategory = 'ai' | 'fullstack'

/** Interactive demos that can sit inside a case study. Loaded lazily. */
export type DemoId = 'blockly' | 'bell'

/** The shared shape every case-study panel renders, for projects and the internship alike. */
export interface CaseStudy {
  title: string
  /** One line, shown under the title and in resume mode. */
  summary: string
  tech: SkillName[]
  problem: string
  /** 3–5 bullets. */
  built: string[]
  hardestPart: string
  result: string
  liveUrl?: string
  githubUrl?: string
  /** Path under /public, e.g. "/projects/queueease.webp". A placeholder shows if missing. */
  image?: string
  imageAlt: string
  demo?: DemoId
  accent: Accent
  /** For team work: who built it and what I personally did. */
  teamNote?: string
  deskObject: DeskObjectId
}

export interface Project extends CaseStudy {
  id: ProjectId
  category: ProjectCategory
  githubUrl: string
}

export type CommitType = 'feat' | 'fix' | 'chore' | 'docs' | 'refactor' | 'merge'

export interface ExperienceEntry {
  id: ExperienceId | `edu-${string}`
  /** A short fake commit hash, purely decorative. */
  hash: string
  type: CommitType
  message: string
  organisation: string
  role: string
  location?: string
  /** Human-readable, e.g. "Jul 2025". */
  date: string
  endDate?: string
  details: string[]
  /** When present, this entry opens in the case-study panel. */
  caseStudy?: CaseStudy
}

export interface EducationEntry {
  institution: string
  degree: string
  dates: string
  location: string
  notes?: string
}

export interface Profile {
  name: string
  firstName: string
  role: string
  tagline: string
  location: string
  seoTitle: string
  seoDescription: string
}

export interface Links {
  email: string
  github: string
  githubUser: string
  linkedin: string
  linkedinHandle: string
  resume: string
  /** The repo for this site, linked from the footer. */
  source: string
}

export interface About {
  paragraphs: string[]
  currentlyLearning: string
  obsessedWith: [string, string, string]
  stickyNote: string
}

export type DeskTarget =
  | { kind: 'project'; id: ProjectId }
  | { kind: 'experience'; id: ExperienceId }
  | { kind: 'section'; id: 'skills' | 'about' | 'contact' }

export interface DeskObjectMeta {
  id: DeskObjectId
  /** Accessible name for the object button. */
  label: string
  opens: DeskTarget
  /** Hover-label copy for section objects (projects use their own title and tech). */
  section?: { kicker: string; title: string; hint: string }
}

export interface TranscriptLine {
  speaker: 'guest' | 'agent' | 'system'
  text: string
}

export interface BellDemoCopy {
  button: string
  label: string
  note: string
  transcript: TranscriptLine[]
}

export type ArduinoBlockKind = 'ledOn' | 'ledOff' | 'wait'

export interface ArduinoDemoCopy {
  heading: string
  label: string
  note: string
  blocks: Record<ArduinoBlockKind, string>
  /** Text before and after the delay picker on the wait block, e.g. "wait" … "ms". */
  waitUnit: string
  waitOptions: number[]
  loop: string
  palette: string
  program: string
  code: string
  add: (block: string) => string
  moveUp: string
  moveDown: string
  remove: string
  run: string
  stop: string
  reset: string
  empty: string
  full: string
  ledOn: string
  ledOff: string
  running: string
  stopped: string
}

export interface TerminalCopy {
  prompt: string
  welcome: string[]
  help: [command: string, description: string][]
  notFound: string
  coffee: string[]
}

export interface PanelCopy {
  problem: string
  built: string
  hardest: string
  result: string
  live: string
  github: string
  close: string
  previous: string
  next: string
  browse: string
  previewMissing: string
}

export interface SiteCopy {
  panel: PanelCopy
  heroHint: string
  heroLinks: { projects: string; github: string; resume: string; contact: string }
  deskHeading: string
  deskKickers: { ai: string; fullstack: string; experience: string }
  lamp: string
  deskIntro: string
  projectIndexHeading: string
  categoryLabels: Record<ProjectCategory, string>
  skillsHeading: string
  skillsIntro: string
  skills: {
    allTools: string
    allToolsHide: string
    usedIn: string
    clearHint: string
    /** Shown to screen readers on skills no project uses yet. */
    unused: string
  }
  timeline: {
    openCaseStudy: string
    showDetails: string
  }
  experienceHeading: string
  educationHeading: string
  aboutHeading: string
  contactHeading: string
  contactIntro: string
  arduinoCaption: string
  resumeToggle: string
  resumeToggleOff: string
  resumePrint: string
  resumeExperienceHeading: string
  resumeSkillsHeading: string
  footerBuiltWith: string
  footerSource: string
}

/* ═══════════════════════════════ Profile & links ═══════════════════════════════ */

export const profile: Profile = {
  name: 'Sheza Mishal',
  firstName: 'Sheza',
  role: 'Software Developer',
  tagline: 'Software developer. I build things for the internet, and occasionally for circuit boards.',
  location: 'Bengaluru, India',
  seoTitle: 'Sheza Mishal · Software Developer',
  seoDescription:
    'Portfolio of Sheza Mishal, a CS student and software developer building AI applications and full-stack apps with Python, React and the MERN stack.',
}

export const links: Links = {
  email: 'sheza.mishal@gmail.com',
  github: 'https://github.com/mishalsheza',
  githubUser: 'mishalsheza',
  linkedin: 'https://www.linkedin.com/in/sheza-mishal-125761292',
  linkedinHandle: 'sheza-mishal',
  resume: '/resume.pdf', // Drop your PDF at public/resume.pdf. Until then, "Resume" opens resume mode.
  source: 'https://github.com/mishalsheza/shezas-workbench', // TODO: Sheza to fill in (once the repo exists)
}

/* ═══════════════════════════════ Skills (tool tray) ═══════════════════════════════ */

// Featured = used in 2+ pieces of work, or central to one. Highlighting works for every skill.
export const skills: Skill[] = [
  // AI / ML
  { name: 'LLMs', category: 'AI / ML', featured: true },
  { name: 'LangGraph', category: 'AI / ML', featured: true },
  { name: 'RAG', category: 'AI / ML', featured: true },
  { name: 'Computer Vision', category: 'AI / ML', featured: true },
  { name: 'Groq', category: 'AI / ML' },
  { name: 'Machine Learning', category: 'AI / ML' },
  { name: 'MediaPipe', category: 'AI / ML' },
  { name: 'OpenCV', category: 'AI / ML' },
  { name: 'ChromaDB', category: 'AI / ML' },
  { name: 'Twilio', category: 'AI / ML', featured: true },
  { name: 'Deepgram', category: 'AI / ML' },
  { name: 'Cartesia', category: 'AI / ML' },
  // Backend
  { name: 'Python', category: 'Backend', featured: true },
  { name: 'FastAPI', category: 'Backend', featured: true },
  { name: 'Node.js', category: 'Backend', featured: true },
  { name: 'Express', category: 'Backend', featured: true },
  { name: 'MongoDB', category: 'Backend', featured: true },
  { name: 'Java', category: 'Backend' },
  { name: 'SQL', category: 'Backend' },
  { name: 'Flask', category: 'Backend' },
  { name: 'WebSockets', category: 'Backend' },
  { name: 'Socket.IO', category: 'Backend' },
  { name: 'Pydantic', category: 'Backend' },
  { name: 'Supabase', category: 'Backend' },
  // Frontend & Mobile
  { name: 'TypeScript', category: 'Frontend & Mobile', featured: true },
  { name: 'JavaScript', category: 'Frontend & Mobile', featured: true },
  { name: 'React', category: 'Frontend & Mobile', featured: true },
  { name: 'React Native', category: 'Frontend & Mobile', featured: true },
  { name: 'Blockly', category: 'Frontend & Mobile' },
  // Tools & DevOps
  { name: 'pytest', category: 'Tools & DevOps', featured: true },
  { name: 'Arduino', category: 'Tools & DevOps', featured: true },
  { name: 'Git', category: 'Tools & DevOps' },
  { name: 'Docker', category: 'Tools & DevOps' },
  { name: 'GitHub Actions', category: 'Tools & DevOps' },
]

/* ═══════════════════════════════ Projects ═══════════════════════════════ */

export const projects: Project[] = [
  /* ─────────── AI projects ─────────── */
  {
    id: 'shadesense',
    category: 'ai',
    title: 'ShadeSense',
    summary: 'Measures skin colour from one face photo and ranks 1,303 foundation shades from 28 brands by how closely they match.',
    tech: ['Python', 'Flask', 'Computer Vision', 'MediaPipe', 'OpenCV', 'Machine Learning', 'Groq', 'LLMs', 'pytest', 'GitHub Actions'],
    problem:
      'Buying foundation online is guesswork: shade names mean nothing across brands, and most "AI" shade finders are black boxes that can’t tell you why they picked a shade or how sure they are.',
    built: [
      'A colour pipeline: MediaPipe finds 478 face landmarks, four skin regions are sampled, shadows and highlights are dropped, and k-means picks the dominant skin colour in CIELAB',
      'Foundation matching across 1,303 shades from 28 brands by CIEDE2000 distance; tests reproduce all 34 Sharma et al. reference pairs to 4 decimals',
      'Rule-based depth, undertone, clarity and contrast labels that score all 12 colour seasons, with close-call detection',
      'A Groq LLM that only writes the explanation from computed text, never sees the photo, and falls back to a template if unavailable',
      'Rate limiting, upload limits, 72 tests and GitHub Actions CI running ruff and pytest',
    ],
    hardestPart:
      'Being honest about accuracy. An early "97%" figure turned out to be scored against labels the pipeline had generated itself. I hand-labelled 60 photos and re-evaluated: depth agreed with people 80% of the time against a 44% baseline, but undertone only 25%, which is chance. Instead of tuning thresholds until the number looked good, I surfaced undertone as a low-confidence "best guess" in the API, the UI and the LLM prompt. I also found that gray-world white balance was making light faces "deep", because on a close-up the scene average is mostly skin, so I switched it off.',
    result:
      'A shade finder whose every decision is readable, tested code, with its limits stated plainly. I learned that measuring a model properly matters more than making it look accurate.',
    githubUrl: 'https://github.com/mishalsheza/ChromaMatch-AI',
    image: '/projects/shadesense.webp',
    imageAlt: 'ShadeSense results screen showing the measured skin colour and the top foundation shade matches',
    accent: 'rose',
    deskObject: 'compact',
  },
  {
    id: 'ai-property-advisor',
    category: 'ai',
    title: 'AI Property Investment Advisor',
    summary: 'A LangGraph workflow that gives BUY / HOLD / AVOID calls on Indian property, with verified numbers and human sign-off.',
    tech: ['Python', 'LangGraph', 'LLMs', 'RAG', 'ChromaDB', 'Groq', 'FastAPI', 'Pydantic', 'pytest'],
    problem:
      'Property is the biggest financial decision most people make, and an LLM that confidently invents a rental yield is worse than no advice at all. The challenge was getting a useful recommendation without trusting the model with the maths.',
    built: [
      'I built the verification step that checks every number the LLM cites against 19 computed metrics and sends mismatches back for re-analysis',
      'I built the RAG pipeline: 10 official RBI, NDMA, PRS and Income Tax documents (27.6k words, 253 chunks), a reproducible PDF-cleaning step, all-MiniLM-L6-v2 embeddings and ChromaDB vector search',
      'I built the financial engine: IRR, return on equity, leverage analysis and a hurdle-rate rule, run on real RBI House Price Index data',
      'Together we built the LangGraph workflow around it: 5 deterministic tools, a rule-based guardrail, one LLM recommendation step and human approval via interrupts and checkpoints, served over FastAPI',
    ],
    hardestPart:
      'Stopping the LLM from making up numbers. I designed a verification step that checks every value the model cites against 19 computed metrics; any mismatch sends the draft back for re-analysis. Combined with keeping every calculation deterministic, the model only ever makes the judgement call, and never does the arithmetic.',
    result:
      'LLM evals pass 4/4 with zero unverified claims, backed by 68 pytest tests and 13 offline eval rules. I learned to treat an LLM as one untrusted component in a system, not the system itself.',
    githubUrl: 'https://github.com/mishalsheza/property-investment-advisor',
    image: '/projects/ai-property-advisor.webp',
    imageAlt: 'AI Property Investment Advisor report showing a recommendation, financial metrics and cited sources',
    teamNote: 'Team project (3 people). My parts: the LLM verification step, the RAG pipeline and the financial engine.',
    accent: 'terracotta',
    deskObject: 'house',
  },
  {
    id: 'hotel-voice-agent',
    category: 'ai',
    title: 'Hotel Voice AI Agent',
    summary: 'A phone concierge that answers hotel guest calls, handles requests by voice and turns them into staff tickets.',
    tech: ['Python', 'FastAPI', 'WebSockets', 'Twilio', 'Deepgram', 'Groq', 'Cartesia', 'LLMs', 'Supabase', 'pytest'],
    problem:
      'Front desks spend their day on the same calls: more towels, the Wi-Fi password, a wake-up call. Those calls are simple, but each one pulls staff away from the guests standing in front of them.',
    built: [
      'A FastAPI server that takes live Twilio call audio over WebSockets and replies on the same call',
      'A 5-stage pipeline: energy-based voice activity detection, Deepgram speech-to-text, a Groq LLM, tool calls and Cartesia text-to-speech',
      'LLM function calling with 5 tools: create a ticket, correct the last ticket, answer an FAQ, set a wake-up call and end the call',
      'Supabase-backed tickets auto-assigned to a free staff member, with a fallback for every external service',
      'Twilio signature checks, stream-token authentication and 103 pytest tests that run without network access',
    ],
    hardestPart:
      'Trust. An agent that says "your towels are on the way" when the database write actually failed is worse than no agent. I made every tool return a real success or failure, and the agent only confirms an action after the save succeeds; otherwise it apologises and hands the guest to the front desk. Along the way I fixed a race where two simultaneous tickets could be auto-assigned to the same worker.',
    result:
      'Guests can call, ask for something in plain speech and get a real staff ticket. I learned how much of voice AI is timing: deciding when someone has finished speaking matters as much as what the model says.',
    githubUrl: 'https://github.com/mishalsheza/hotel-voice-agent',
    image: '/projects/hotel-voice-agent.webp',
    imageAlt: 'Hotel Voice AI Agent staff dashboard listing tickets created from guest calls',
    demo: 'bell',
    accent: 'gold',
    deskObject: 'bell',
  },

  /* ─────────── Full-stack projects ─────────── */
  {
    id: 'queueease',
    category: 'fullstack',
    title: 'QueueEase',
    summary: 'A virtual queue for clinics, banks and service desks: join from your phone, watch your place live, get called when it’s your turn.',
    tech: ['React Native', 'TypeScript', 'Node.js', 'Express', 'MongoDB', 'Socket.IO', 'Docker', 'GitHub Actions'],
    problem:
      'Physical queues waste hours and give people no idea how long they’ll wait. A virtual queue only works if it is trustworthy: two people must never get the same token, and nobody can lose their place to a double tap.',
    built: [
      'An Expo (React Native) app for joining queues, with a live token, position, estimated wait and an "It’s your turn!" alert',
      'An admin dashboard to create, pause and close queues, call next, serve and mark no-shows',
      'A Node/Express API on MongoDB with JWT auth, role and ownership checks on every route, and zod validation',
      'Authenticated Socket.IO with server-assigned per-queue rooms, so updates are live and private',
      'Docker and Render deployment, CI, and benchmark scripts for concurrency, indexes and load',
    ],
    hardestPart:
      'Concurrency. The first version stored each waiting list twice and saved it back on every action. A stress test of 1,625 concurrent requests produced around 890 duplicate tokens. I rebuilt it so tickets are the only source of truth, every change is a single atomic MongoDB update, and unique indexes make bad states impossible. On the same test: zero duplicate tokens, zero double joins, zero lost actions.',
    result:
      'On one laptop process it handles about 1,000 concurrent users with p95 join latency under 30 ms and 100% of live updates delivered. Index work cut documents examined for a report from 2,883 to 20. I learned to let the database enforce the rules instead of checking and hoping.',
    githubUrl: 'https://github.com/mishalsheza/QueueEase',
    image: '/projects/queueease.webp',
    imageAlt: 'QueueEase mobile app showing a queue token, position in line and estimated wait',
    accent: 'cornflower',
    deskObject: 'ticket',
  },
  {
    id: 'finance-tracker',
    category: 'fullstack',
    title: 'Finance Tracker',
    summary: 'A MERN app for logging income and expenses, with secure sign-in and an editable records table.',
    tech: ['React', 'TypeScript', 'Node.js', 'Express', 'MongoDB', 'Git'],
    // TODO: Sheza to fill in (problem, hardestPart and result are placeholders; the "built" bullets match the repo)
    problem:
      'Most budgeting apps are either spreadsheets in disguise or so feature-heavy that people stop opening them. I wanted something fast enough to log an expense in seconds.',
    built: [
      'A React + TypeScript dashboard with a form for adding records and a react-table list of transactions',
      'A REST API in Express and TypeScript with Mongoose models for financial records',
      'Authentication with Clerk, so each user only ever sees their own records',
      'Create, edit and delete records, with totals that update straight away',
    ],
    hardestPart:
      'Keeping the table and totals in sync after every add, edit and delete without refetching everything. I moved records into a single React context that owns all the API calls, so every view derives from one source of truth.',
    result:
      'A small, private tracker that does one job well. It was my first time designing a full MERN app end to end, from schema to auth to UI.',
    githubUrl: 'https://github.com/mishalsheza/finance_tracker',
    image: '/projects/finance-tracker.webp',
    imageAlt: 'Finance Tracker dashboard with a record form and a table of transactions',
    accent: 'sage',
    deskObject: 'ledger',
  },
]

/* ═══════════════════════════════ Experience ═══════════════════════════════ */

export const experience: ExperienceEntry[] = [
  {
    id: 'robovision-internship',
    hash: 'a3f9c21',
    type: 'feat',
    message: 'joined RoboVision as Software Development Intern',
    organisation: 'RoboVision',
    role: 'Software Development Intern, Custom Arduino Blockly IDE',
    location: 'Hybrid',
    date: 'Jul 2025',
    endDate: 'Dec 2025',
    details: [
      'Built a browser-based visual programming IDE in React and Blockly, so beginners can program Arduino boards with zero handwritten C++.',
      'Designed custom blocks in 4 categories (LED, servo, timing, control) and a Blockly-to-Arduino C++ code generator.',
      'Developed a full-screen IDE with a block workspace, live Arduino code preview and board selection.',
    ],
    caseStudy: {
      title: 'Arduino Blockly IDE',
      summary: 'My internship at RoboVision: a drag-and-drop IDE that turns visual blocks into real Arduino code.',
      tech: ['React', 'JavaScript', 'Blockly', 'Arduino', 'Git'],
      problem:
        'Getting started with Arduino means learning C++ syntax before you can blink a single LED. Beginners give up on semicolons long before they reach the fun part: making hardware do something.',
      built: [
        'A browser-based visual programming IDE built with React and Blockly',
        'Custom blocks across 4 categories: LED, servo, timing and control',
        'A custom Blockly-to-Arduino C++ generator that turns visual programs into code you can upload',
        'A full-screen IDE with a block workspace, a real-time code preview and board selection',
      ],
      // TODO: Sheza to fill in (hardestPart and result are placeholders; describe a real challenge from the internship)
      hardestPart:
        'Generating correct code from nested blocks. A "repeat" inside a "repeat" inside an "if" has to produce properly scoped, indented C++. Each custom block got its own generator function that emits its code and recursively asks its children for theirs, which made nesting work naturally and made a new block a small, self-contained change.',
      result:
        'Beginners could program a real board with zero handwritten C++. I learned how code generators think about trees, and how much UX goes into making something feel simple.',
      imageAlt: 'The Arduino Blockly IDE showing a block workspace next to the generated Arduino code',
      image: '/projects/arduino-blockly-ide.webp',
      demo: 'blockly',
      accent: 'teal',
      deskObject: 'arduino',
    },
  },
  {
    id: 'edu-scaler',
    hash: 'e52d9a0',
    type: 'chore',
    message: 'started CS at Scaler School of Technology',
    organisation: 'Scaler School of Technology',
    role: 'Undergraduate Program in Computer Science',
    location: 'Bengaluru, India',
    date: 'Sep 2023',
    details: ['A four-year, project-heavy undergraduate program in computer science.'], // TODO: Sheza to fill in (a line about what you focus on)
  },
  {
    id: 'edu-bits',
    hash: '1b7d3e8',
    type: 'chore',
    message: 'began B.Sc. (Hons.) Computer Science at BITS Pilani',
    organisation: 'BITS Pilani',
    role: 'B.Sc. (Hons.) in Computer Science',
    date: 'Aug 2023',
    details: ['Studied alongside the Scaler program.'], // TODO: Sheza to fill in (confirm wording)
  },
]

/* ═══════════════════════════════ Education ═══════════════════════════════ */

export const education: EducationEntry[] = [
  {
    institution: 'Scaler School of Technology',
    degree: 'Undergraduate Program in Computer Science (4-year)',
    dates: 'Sep 2023 – Aug 2027',
    location: 'Bengaluru, India',
  },
  {
    institution: 'BITS Pilani',
    degree: 'B.Sc. (Hons.) in Computer Science',
    dates: 'Aug 2023 – Jun 2027',
    location: 'India',
  },
]

/* ═══════════════════════════════ About ═══════════════════════════════ */

// TODO: Sheza to fill in (about copy is a placeholder in your voice; rewrite freely)
export const about: About = {
  paragraphs: [
    "I'm a computer science student in Bengaluru who likes building things end to end: the interface someone touches, the API behind it, and sometimes the circuit board under it all.",
    'Lately that means AI systems I can actually trust: LLMs that explain instead of guess, numbers that get checked and limits that get stated plainly. I care about software that feels calm to use.',
  ],
  currentlyLearning: 'Streaming voice pipelines, and how to evaluate LLM systems properly.', // TODO: Sheza to fill in
  obsessedWith: ['Colour science', 'Well-set serif typography', 'Very good filter coffee'], // TODO: Sheza to fill in
  stickyNote: 'ship it, then make it lovely',
}

/* ═══════════════════════════════ Desk objects ═══════════════════════════════ */

export const deskObjects: DeskObjectMeta[] = [
  { id: 'compact', label: 'Foundation compact and bottles on the shelf: ShadeSense', opens: { kind: 'project', id: 'shadesense' } },
  { id: 'house', label: 'House model on the shelf: AI Property Investment Advisor', opens: { kind: 'project', id: 'ai-property-advisor' } },
  { id: 'bell', label: 'Brass service bell: Hotel Voice AI Agent', opens: { kind: 'project', id: 'hotel-voice-agent' } },
  { id: 'ticket', label: 'Take-a-number ticket dispenser: QueueEase', opens: { kind: 'project', id: 'queueease' } },
  { id: 'ledger', label: 'Ledger, calculator and coins: Finance Tracker', opens: { kind: 'project', id: 'finance-tracker' } },
  { id: 'arduino', label: 'Arduino board and breadboard: internship at RoboVision', opens: { kind: 'experience', id: 'robovision-internship' } },
  {
    id: 'pegboard',
    label: 'Pegboard of tools: skills',
    opens: { kind: 'section', id: 'skills' },
    section: { kicker: 'Skills', title: 'The pegboard', hint: 'what I work with' },
  },
  {
    id: 'pinboard',
    label: 'Pinboard with notes and a photo: about me',
    opens: { kind: 'section', id: 'about' },
    section: { kicker: 'About', title: 'About me', hint: 'notes, a photo, the usual' },
  },
  {
    id: 'mug',
    label: 'Coffee mug: about me',
    opens: { kind: 'section', id: 'about' },
    section: { kicker: 'About', title: 'Coffee break', hint: 'a little about me' },
  },
  {
    id: 'laptop',
    label: 'Laptop: contact terminal',
    opens: { kind: 'section', id: 'contact' },
    section: { kicker: 'Contact', title: 'Say hello', hint: 'open the terminal' },
  },
]

/** Real foundation shades, fair to deep, for the ShadeSense compact and bottles. */
export const foundationShades: { name: string; hex: string }[] = [
  { name: 'Warm beige', hex: '#EBC7A4' },
  { name: 'Honey', hex: '#D6A06A' },
  { name: 'Caramel', hex: '#B37A4C' },
  { name: 'Cocoa', hex: '#7A4B30' },
  { name: 'Deep espresso', hex: '#3F2619' },
]

/** The little skill tags hanging on the pegboard. */
export const pegboardTags: SkillName[] = ['React', 'Python', 'Node.js', 'LLMs', 'FastAPI', 'MongoDB']

/* ═══════════════════════════════ Interactive demos ═══════════════════════════════ */

/** Scripted, not live: it mirrors the agent's real tools (ticket, FAQ, wake-up call). */
export const bellDemo: BellDemoCopy = {
  button: 'Ring the bell',
  label: 'Illustrative demo',
  note: 'A scripted transcript showing the kind of call the agent handles. No audio, no live model.',
  transcript: [
    { speaker: 'agent', text: 'Good evening, front desk. How can I help?' },
    { speaker: 'guest', text: 'Hi, could I get two extra towels sent up, please?' },
    { speaker: 'system', text: 'create_ticket(type: "housekeeping", item: "towels", qty: 2) ✓ saved' },
    { speaker: 'agent', text: 'Of course. Two towels are on their way; housekeeping has the request.' },
    { speaker: 'guest', text: "Great. And what's the Wi-Fi password?" },
    { speaker: 'system', text: 'answer_faq(topic: "wifi") ✓' },
    { speaker: 'agent', text: "It's on the card by your bed, network ‘Guest’, password ‘welcome-stay’." },
    { speaker: 'guest', text: 'Perfect. Could you wake me at seven?' },
    { speaker: 'system', text: 'set_wakeup_call(time: "07:00") ✓ saved' },
    { speaker: 'agent', text: 'Done: a wake-up call at 7 am. Anything else?' },
  ],
}

/** A tiny, offline cousin of the internship IDE: blocks in, Arduino C++ out, a drawn LED blinks. */
export const arduinoDemo: ArduinoDemoCopy = {
  heading: 'Try a tiny version',
  label: 'Illustrative demo',
  note: 'Runs in your browser: no board, no upload. The real IDE has servo, timing and control blocks too.',
  blocks: { ledOn: 'turn LED on', ledOff: 'turn LED off', wait: 'wait' },
  waitUnit: 'ms',
  waitOptions: [250, 500, 1000],
  loop: 'repeat forever',
  palette: 'Blocks',
  program: 'Your program',
  code: 'Generated Arduino code',
  add: (block) => `Add “${block}” block`,
  moveUp: 'Move up',
  moveDown: 'Move down',
  remove: 'Remove',
  run: 'Run',
  stop: 'Stop',
  reset: 'Reset',
  empty: 'Add a block to get started.',
  full: 'That’s plenty for a tiny board.',
  ledOn: 'LED on',
  ledOff: 'LED off',
  running: 'Running on the board',
  stopped: 'Stopped',
}

/* ═══════════════════════════════ Terminal ═══════════════════════════════ */

export const terminal: TerminalCopy = {
  prompt: 'sheza@workbench ~ %',
  welcome: ["Welcome to Sheza's workbench.", 'Type `help` to see what I can do.'],
  help: [
    ['help', 'list available commands'],
    ['about', 'a few lines about me'],
    ['projects', 'what I have built'],
    ['github', 'open my GitHub'],
    ['linkedin', 'open my LinkedIn'],
    ['resume', 'open my resume'],
    ['email', 'write to me'],
    ['clear', 'clear the screen'],
  ],
  notFound: 'command not found. Try `help`.',
  coffee: [
    '      ( (',
    '       ) )',
    '    .______.',
    '    |      |]',
    '    \\      /',
    "     `----'",
    'brewing… try again after the next commit.',
  ],
}

/* ═══════════════════════════════ Site copy ═══════════════════════════════ */

export const copy: SiteCopy = {
  panel: {
    problem: 'The problem',
    built: 'What I built',
    hardest: 'The hardest part',
    result: 'Result & what I learned',
    live: 'Live demo',
    github: 'GitHub',
    close: 'Close case study',
    previous: 'Previous',
    next: 'Next',
    browse: 'More case studies',
    previewMissing: 'Preview coming soon',
  },
  heroHint: 'scroll to open the workbench',
  heroLinks: { projects: 'Projects', github: 'GitHub', resume: 'Resume', contact: 'Contact' },
  deskHeading: 'The workbench',
  deskKickers: { ai: 'AI project', fullstack: 'Full-stack project', experience: 'Internship' },
  lamp: 'Desk lamp',
  deskIntro: 'Everything in this studio is something I have built or use. Pick anything up.',
  projectIndexHeading: 'Or just read the list',
  categoryLabels: { ai: 'AI projects', fullstack: 'Full-stack projects' },
  skillsHeading: 'The pegboard',
  skillsIntro: 'Pick a tool to see where I have used it.',
  skills: {
    allTools: 'All tools',
    allToolsHide: 'Fewer tools',
    usedIn: 'Used in',
    clearHint: 'Click the tool again or press Esc to clear.',
    unused: 'not in a featured project yet',
  },
  timeline: {
    openCaseStudy: 'Open case study',
    showDetails: 'Show details',
  },
  experienceHeading: 'Commit history',
  educationHeading: 'Education',
  aboutHeading: 'About me',
  contactHeading: 'Say hello',
  contactIntro: 'Type a command, or use the buttons below. No typing required.',
  arduinoCaption: 'A tiny version of the visual programming environment I built during my internship.',
  resumeToggle: 'Just the resume',
  resumeToggleOff: 'Back to the workbench',
  resumePrint: 'Print or save as PDF',
  resumeExperienceHeading: 'Experience',
  resumeSkillsHeading: 'Skills',
  footerBuiltWith: 'Built with React, TypeScript & Framer Motion',
  footerSource: 'Source on GitHub',
}

/* ═══════════════════════════════ Helpers ═══════════════════════════════ */

export const getProject = (id: string): Project | undefined => projects.find((p) => p.id === id)

export const getExperience = (id: string): ExperienceEntry | undefined => experience.find((e) => e.id === id)

export const projectsByCategory = (category: ProjectCategory): Project[] => projects.filter((p) => p.category === category)

/** Every case study on the desk (projects plus the internship), keyed by desk object. */
const deskTech = (): Map<DeskObjectId, SkillName[]> => {
  const map = new Map<DeskObjectId, SkillName[]>()
  for (const p of projects) map.set(p.deskObject, p.tech)
  for (const e of experience) if (e.caseStudy) map.set(e.caseStudy.deskObject, e.caseStudy.tech)
  return map
}

/** Desk objects that use a skill, for the tool-tray highlight. */
export const deskObjectsUsingSkill = (skill: SkillName): DeskObjectId[] =>
  [...deskTech()].filter(([, tech]) => tech.includes(skill)).map(([id]) => id)
