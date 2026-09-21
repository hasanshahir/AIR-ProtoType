# 🗺️ AIR Lab — Complete Website Sitemap & Information Architecture

> **Project:** Artificial Intelligence Research Lab (AIR Lab) Web Platform  
> **Institution:** Department of Computer & Information Systems Engineering, NED University of Engineering & Technology, Karachi  
> **Live Prototype URL:** [https://hasanshahir.github.io/AIR-ProtoType/](https://hasanshahir.github.io/AIR-ProtoType/)  
> **Repository:** [https://github.com/hasanshahir/AIR-ProtoType](https://github.com/hasanshahir/AIR-ProtoType)  
> **Version:** 2.0 (ScrollCraft + MERN Hybrid Architecture)

---

## 🌳 High-Level Visual Tree Hierarchy

```text
AIR Lab Digital Portal (https://hasanshahir.github.io/AIR-ProtoType/)
│
├── 🌐 GLOBAL SHELL & PERSISTENT SERVICES
│   ├── Top Alert Banner (Internship / Vacancy Live Broadcast)
│   ├── Sticky Glassmorphism Header (Brand Mark, NavLinks, Theme Switcher, Quick Apply)
│   ├── Scroll-linked Fire Progress Indicator (Framer Motion Spring Bar)
│   └── Universal Academic Footer (Accreditation, Research Pillar Links, Social Scholar IDs)
│
├── 🏠 1. HOME LANDING (/#/)
│   ├── Hero Section
│   │   ├── Interactive Neural Network Particle Canvas (Cursor-reactive 2D Canvas)
│   │   ├── Glitch Headline ("We build AI systems that matter")
│   │   └── Primary Action CTAs ("Explore Research", "Our Story")
│   ├── Dynamic Metrics Counter (ScrollCraft sc.counter)
│   │   ├── Publications (45+)
│   │   ├── Lab Members (120+)
│   │   ├── Active Research Grants (15)
│   │   └── Industry Partners (7)
│   ├── Core Research Areas (ScrollCraft sc.reveal staggered)
│   │   ├── Large Language Models (LLMs & Urdu NLP)
│   │   ├── Computer Vision & Perception
│   │   ├── Edge & Embedded Intelligence
│   │   └── Autonomous Robotics & Swarm Systems
│   ├── Featured Projects Showcase (Card previews with status tags & metrics)
│   ├── Strategic Partners & Collaborations Marquee Ticker
│   └── Final Recruitment Callout ("Shape the Future of AI at NED")
│
├── 📖 2. ABOUT AIR LAB (/#/about)
│   ├── Mission & Vision Statement
│   ├── Strategic Rationale & National AI Context
│   ├── Key Institutional Facts Metric Box (Founded 2021, NED CIS Department)
│   ├── Research Proficiency Tracks (ScrollCraft sc.progress clip-path animation)
│   │   ├── Large Language Models Track (88%)
│   │   ├── Computer Vision Track (94%)
│   │   ├── Edge & Embedded AI Track (72%)
│   │   └── Autonomous Robotics Track (65%)
│   └── Foundational Values (Reproducibility, Ethics, Open Science, National Sovereignty)
│
├── 👥 3. TEAM DIRECTORY (/#/team)
│   ├── Taxonomy Filter Tabs
│   │   ├── [Tab 1] Faculty Members (Lab Leads, Co-PIs, Supervisors)
│   │   ├── [Tab 2] Postgraduate Researchers (PhD & Masters Candidates)
│   │   └── [Tab 3] Undergraduate Students (FYDP Groups 1–6)
│   ├── Member Cards Matrix
│   │   ├── Member Name, Designation, Role & Profile Avatar
│   │   ├── Active Research Domain Tags
│   │   └── External Linkages (Google Scholar, GitHub, LinkedIn, Email)
│   └── Previous Research Interns & Alumni Archive
│       └── Historical internship batches, projects accomplished & placements
│
├── 🔬 4. RESEARCH PROJECTS (/#/projects)
│   ├── Taxonomy Category Filters
│   │   ├── All Projects
│   │   ├── Funded Research Projects (NCBC, HEC, National AI Centers)
│   │   ├── Core Lab R&D (UrduLLM Foundation, EdgeVision Traffic AI)
│   │   ├── Postgraduate Master's Theses
│   │   └── Undergraduate Capstones (6 NED Final Year Design Projects)
│   └── Project Detail Cards
│       ├── Title, Abstract & Category Badge
│       ├── Technical Performance Metric Chip (e.g., "12.4B Tokens", "60 FPS @ 5W")
│       ├── Research Pillar Tag & Stack List
│       └── Code / Paper / Demo External Links
│
├── 📚 5. PUBLICATIONS & BLOGS (/#/publications)
│   ├── View Switcher
│   │   ├── [View A] Peer-Reviewed Research Papers Index
│   │   └── [View B] Technical Insights & Lab Research Blogs
│   ├── Filter & Search Utilities
│   │   ├── Filter by Year (2026, 2025, 2024, 2023, Archive)
│   │   └── Filter by Domain (LLM, Vision, Edge AI, Autonomous)
│   ├── Publication List Items
│   │   ├── Paper Title, Full Author Roster, Conference / Journal Venue, Year
│   │   ├── Direct DOI / PDF Action Button
│   │   └── BibTeX Citation Copy Trigger
│   └── Research Blog Cards
│       └── Article Title, Read Time, Domain Badge, Excerpt & Author
│
├── 🖼️ 6. FEATURE & CAMPUS GALLERY (/#/gallery)
│   ├── Media Grid Categories (R&D Labs, Hardware & GPU Rigs, Seminars, Delegation Visits)
│   ├── Interactive Feature-Map Tile Grid
│   │   ├── Aspect-Ratio Styled Visuals with Zoom & Overlay
│   │   └── Event Caption, Location & Date Stamp
│   └── Lightbox Modal Preview
│
├── 🤝 7. INDUSTRY COLLABORATIONS & PARTNERS (/#/collaborations)
│   ├── Academic Partners (Stanford HAI, Allen AI, etc.)
│   ├── Funding Bodies (HEC Pakistan, Ignite National Technology Fund, NCBC)
│   ├── Industry Tech Linkages (Meta AI, Google DeepMind, OpenAI)
│   └── Partnership Contact / Sponsorship Inquiry Form
│
├── 🏆 8. BEST PERFORMERS OF THE MONTH (/#/performers)
│   ├── Monthly Hall of Fame Leaderboard
│   ├── Featured Researcher of the Month (Spotlight Bio & Contribution)
│   └── High-Impact Project Milestones
│
└── 🔒 9. ADMIN PORTAL & MERN CMS (/#/admin) [Phase 3–4 Roadmap]
    ├── Secure Authentication Gate (/admin/login — JWT + Role Validation)
    ├── Operational CMS Dashboard
    │   ├── Manage Research Papers (Add, Edit, Update DOI & Authors)
    │   ├── Manage Team Members & FYDP Group Allocations
    │   ├── Manage Projects & Funding Status
    │   └── Real-time Vacancy Toggle (Open / Closed Status Switcher)
    └── Applicant Submissions Inbox (Review Internship & FYDP CVs)
```

---

## 📑 Detailed Page Specifications

| Route Path | Page Name | Purpose & Primary Focus | Key UI Components | Backing Data Source |
| :--- | :--- | :--- | :--- | :--- |
| `/#/` | **Home** | Primary digital landing; communicates lab stature & research scope | `ParticleCanvas`, `GlitchText`, `ScrollCraft.counter`, `ScrollCraft.reveal`, `Marquee` | `team.json`, `projects.json`, `publications.json` |
| `/#/about` | **About** | Lab mandate, NED heritage, values & strategic proficiency | `ScrollCraft.progress` (proficiency bars), Key Fact metric box, Values grid | Static + `implementation_plan.html` |
| `/#/team` | **Team** | Human capital breakdown: Faculty, Postgraduates, Undergraduates | Category filter tabs, Scholar profile cards, external social links | `team.json`, `interns.json` |
| `/#/projects` | **Projects** | Showcase of funded initiatives, R&D models, and FYDPs | Status filter buttons, metric chips (`chipColor`), project cards | `projects.json` |
| `/#/publications` | **Publications** | Peer-reviewed IEEE/Scopus papers & technical blog posts | Dual-tab view, Year/Track filters, DOI launch links, BibTeX exporter | `publications.json`, `blogs.json` |
| `/#/gallery` | **Gallery** | Photographic record of lab hardware, workshops, and milestones | Feature-map grid, image modal lightbox, category chips | `gallery.json` |
| `/#/collaborations` | **Collaborations** | Academic and commercial partnerships | Grid of partner badges, MoU summaries, partnership CTA | `collaborations.json` |
| `/#/performers` | **Performers** | Monthly student & researcher recognition | Monthly leaderboard, star cards, achievement badges | `performers.json` |
| `/#/admin` | **Admin Portal** | Restricted backend portal for lab coordinators | JWT login modal, CRUD tables, 1-click vacancy toggle | MongoDB Collections (Phase 3–4) |

---

## 🎨 Global System Services & Design Tokens

### 1. Theme Engine System
- **Theme Modes:** Light Editorial Mode, Dark Neural Mode.
- **Design Tokens:**
  - `--bg` / `--bg-card` / `--bg-muted`
  - `--fg` / `--fg-sub`
  - `--blue` (`#1A6BFF`) · Primary electric blue
  - `--coral` (`#FF4D4F`) · Secondary hot coral accent
  - `--amber` (`#FFAB00`) · Warning / Pending / Grant tag
  - `--violet` (`#7C3AED`) · Specialty track tag
- **Persistence:** Saved in browser `localStorage` under `theme`, with zero page reload required.

### 2. Motion & Scroll Engine (ScrollCraft)
- **`sc.reveal(selector, options)`**: Staggered scroll-triggered fade and translation.
- **`sc.counter(selector, options)`**: Numerical interpolation from 0 to target metrics.
- **`sc.progress(selector, options)`**: Real-time `clip-path` expansion driven by scroll position.

---

## 🗄️ Data Architecture & Future MERN Schema Mapping

All frontend views are strictly decoupled from markup and powered by structured schemas ready for instant MERN API migration:

| JSON File Path | Future MongoDB Collection | Key Schema Fields |
| :--- | :--- | :--- |
| `src/data/team.json` | `members` | `name`, `role`, `category`, `domain`, `scholarUrl`, `githubUrl`, `avatar` |
| `src/data/projects.json` | `projects` | `title`, `category`, `metric`, `desc`, `image`, `fundingAgency`, `status` |
| `src/data/publications.json` | `publications`| `title`, `authors`, `venue`, `year`, `doi`, `pdfUrl`, `track` |
| `src/data/blogs.json` | `blogs` | `title`, `author`, `date`, `readTime`, `excerpt`, `content` |
| `src/data/interns.json` | `interns` | `batch`, `studentName`, `institution`, `assignedProject`, `placement` |
| `src/data/collaborations.json` | `partners` | `partnerName`, `type`, `logoUrl`, `agreementDetails` |
| `src/data/performers.json` | `leaderboard` | `month`, `year`, `recipientName`, `milestoneDescription`, `awardBadge` |
| `src/data/gallery.json` | `gallery` | `imageUrl`, `caption`, `category`, `dateRecorded` |
