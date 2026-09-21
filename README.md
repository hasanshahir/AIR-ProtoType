# AIR ProtoType — AI Research Lab at NED University

Official interactive web prototype and digital presence for the **Artificial Intelligence Research Lab (AIR Lab)** at NED University of Engineering & Technology, Karachi.

[![Live Demo](https://img.shields.io/badge/Live_Demo-GitHub_Pages-blue?style=for-the-badge&logo=github)](https://hasanshahir.github.io/AIR-ProtoType/)
[![Built with React](https://img.shields.io/badge/React_19-Vite_8-61DAFB?style=for-the-badge&logo=react)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS_v4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![ScrollCraft](https://img.shields.io/badge/ScrollCraft-Motion_System-7C3AED?style=for-the-badge)](https://github.com/hasanshahir/AIR-ProtoType)

---

## 🌐 Global Live Access

The latest version (**AIR-Proto-v2**) is automatically built and deployed via GitHub Actions:
- **Global Web Link:** [https://hasanshahir.github.io/AIR-ProtoType/](https://hasanshahir.github.io/AIR-ProtoType/)

---

## 📂 Repository Structure

```text
AIR-ProtoType/
├── AIR-Proto-v2/                 # Next-Gen prototype featuring ScrollCraft & Stanford-clean design
│   ├── src/
│   │   ├── components/           # ParticleCanvas, GlitchText, ThemeProvider, Layout
│   │   ├── hooks/                # useScrollCraft (thin React wrapper around ScrollCraft)
│   │   ├── pages/                # Home, About, Team, Projects, Publications, Gallery
│   │   ├── data/                 # JSON data stores (team, projects, publications, blogs)
│   │   ├── index.css             # Design tokens, custom utilities, scroll-craft reveal rules
│   │   └── App.tsx               # HashRouter routing for zero 404s on static hosting
│   ├── package.json
│   └── vite.config.ts
│
├── AIR-proto-master/             # Baseline initial prototype
│   ├── src/
│   ├── prompt.md                 # Lab requirements & design guidelines
│   └── package.json
│
├── scroll-craft-main/            # ScrollCraft agent skill and animation reference kit
├── implementation_plan.html      # Comprehensive architecture & implementation document
└── .github/workflows/deploy.yml  # Automated GitHub Actions workflow deploying to GitHub Pages
```

---

## ✨ Features in AIR-Proto-v2

- **Dynamic Hero Section**: Neural network particle canvas interacting with cursor coordinates, coupled with glitch-text headings.
- **ScrollCraft Integration**: Scroll-linked timeline progress bars, numeric stat counters animating into view, and staggered card entrances.
- **Academic & Editorial Aesthetic**: Inspired by Stanford AI and modern research publications with high-contrast electric blue accents.
- **Theme System**: Persisted light and dark modes with fluid CSS design tokens.
- **Modular Data Architecture**: All team members, research papers, projects, and gallery items are stored in `/src/data/*.json` for simple updating and eventual MERN API migration.

---

## 🚀 Quick Start (Run Locally)

### 1. Clone the repository
```bash
git clone https://github.com/hasanshahir/AIR-ProtoType.git
cd AIR-ProtoType/AIR-Proto-v2
```

### 2. Install dependencies
```bash
npm install
```

### 3. Start local development server
```bash
npm run dev
```

The application will be accessible at `http://localhost:5173/`.

### 4. Build for production
```bash
npm run build
```

---

## 📜 Authors & Acknowledgments

- **AIR Lab**, Department of Computer & Information Systems Engineering, NED University of Engineering & Technology, Karachi.
- Developed by **Hasan Shahir** & Team.
