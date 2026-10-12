import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Brain,
  Bot,
  Database,
  Zap,
  Code,
  LineChart,
  Layers,
  Users,
} from 'lucide-react'
import Button from '../components/ui/Button'
import SectionReveal from '../components/ui/SectionReveal'
import StudentApplicationModal from '../components/StudentApplicationModal'
import QuickDrawer from '../components/QuickDrawer'

const labStats = [
  { value: '45+', label: 'Peer-Reviewed Publications', desc: 'IEEE, Springer, ACM & SOTA Conferences' },
  { value: '120+', label: 'Researchers & Scholars', desc: 'Faculty, Postgraduates & Research Interns' },
  { value: '15', label: 'Active Grants & Funds', desc: 'HEC NRPU, Ignite NCBC & Strategic Alliances' },
  { value: '100%', label: 'Open Source Benchmarks', desc: 'Reproducible Weights & Regional Corpora' },
]

const coreResearchAreas = [
  {
    icon: Brain,
    title: 'Foundational Models & NLP',
    desc: 'Pretraining multilingual LLMs tailored for low-resource regional dialects with advanced byte-level tokenizers and parameter-efficient fine-tuning.',
    tag: 'Urdu & Multilingual NLP',
  },
  {
    icon: Bot,
    title: 'Autonomous Robotics & Edge AI',
    desc: 'Real-time perception algorithms, spatial visual odometry, and edge TensorRT neural inference pipelines for robotic vehicles and aerial UAVs.',
    tag: 'Robotics & Embedded Vision',
  },
  {
    icon: Database,
    title: 'Clinical Diagnostics & Healthcare',
    desc: 'Deep multi-modal medical imaging classification, diagnostic explainability, and chest radiograph analysis deployed across partner clinics.',
    tag: 'Medical AI Systems',
  },
  {
    icon: Zap,
    title: 'Smart Energy & Infrastructure',
    desc: 'Forecasting power grid surge anomalies, localized microgrid load shedding schedules, and renewable power dispatch with transformer models.',
    tag: 'Grid Intelligence',
  },
  {
    icon: Code,
    title: 'Efficient Computing & TinyML',
    desc: 'Hardware-aware neural architecture search (NAS), INT8 quantization, and ultra-low-latency deployment on FPGAs and embedded SoCs.',
    tag: 'TinyML & Edge Acceleration',
  },
  {
    icon: LineChart,
    title: 'AI Safety & Alignment',
    desc: 'Ensuring robust, unbiased, and safe deployment of intelligent systems in critical healthcare, power grids, and national infrastructure.',
    tag: 'AI Safety',
  },
]

const institutionalPartners = [
  {
    name: 'Google DeepMind',
    icon: ({ className = 'w-5 h-5' }: { className?: string }) => (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14.5v-9l6 4.5-6 4.5z" />
      </svg>
    ),
  },
  {
    name: 'OpenAI',
    icon: ({ className = 'w-5 h-5' }: { className?: string }) => (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M22.28 9.37a5.98 5.98 0 0 0-.52-4.14 6.06 6.06 0 0 0-4.96-3.08 5.99 5.99 0 0 0-4.57 2.05A6 6 0 0 0 4.14 5.7a6.06 6.06 0 0 0-2.4 4.86c0 1.34.43 2.63 1.22 3.7a5.98 5.98 0 0 0 .52 4.14 6.06 6.06 0 0 0 4.96 3.08c1.39 0 2.7-.49 3.75-1.37a6 6 0 0 0 8.09-1.5 6.06 6.06 0 0 0 2.4-4.86c0-1.34-.43-2.63-1.22-3.7zM12 14.7a2.7 2.7 0 1 1 0-5.4 2.7 2.7 0 0 1 0 5.4z" />
      </svg>
    ),
  },
  {
    name: 'Meta AI',
    icon: ({ className = 'w-5 h-5' }: { className?: string }) => (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 7.02c-3.15 0-5.75 2.1-6.72 5.08.76 2.37 2.98 4.09 5.6 4.09 1.48 0 2.84-.55 3.89-1.46l.24-.22.24.22a5.83 5.83 0 0 0 3.89 1.46c2.62 0 4.84-1.72 5.6-4.09-.97-2.98-3.57-5.08-6.72-5.08-1.57 0-3.01.62-4.08 1.63A5.76 5.76 0 0 0 12 7.02zm0 2.06c.92 0 1.76.36 2.39.95L12 12.44 9.61 10.03c.63-.59 1.47-.95 2.39-.95z" />
      </svg>
    ),
  },
  {
    name: 'Hugging Face',
    icon: ({ className = 'w-5 h-5' }: { className?: string }) => (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm-3.5 7.5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm7 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm-7.6 6.8c.8 1.7 2.4 2.7 4.1 2.7s3.3-1 4.1-2.7a.8.8 0 1 0-1.4-.7c-.5 1.2-1.6 1.9-2.7 1.9s-2.2-.7-2.7-1.9a.8.8 0 0 0-1.4.7z" />
      </svg>
    ),
  },
  {
    name: 'Stanford HAI',
    icon: ({ className = 'w-5 h-5' }: { className?: string }) => (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 3L2 9l10 6 8-4.8V17h2V9L12 3zm0 8.7L5.5 9 12 5.3 18.5 9 12 11.7zM6 13.5v4.2c1.7 1.4 3.7 2.3 6 2.3s4.3-.9 6-2.3v-4.2l-6 3.6-6-3.6z" />
      </svg>
    ),
  },
  {
    name: 'MIT CSAIL',
    icon: ({ className = 'w-5 h-5' }: { className?: string }) => (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M3 4h3v16H3V4zm5 0h3v10H8V4zm5 0h3v16h-3V4zm5 0h3v8h-3V4z" />
      </svg>
    ),
  },
  {
    name: 'Ignite NCBC',
    icon: ({ className = 'w-5 h-5' }: { className?: string }) => (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2c-.4 1.8-1.5 3.3-2.6 4.7-1.3 1.7-2.7 3.5-2.7 6.3 0 4.2 3.4 7.6 7.6 7.6s7.6-3.4 7.6-7.6c0-4.3-3.2-7.5-5.2-10.2-.4-.6-.8-1.2-1.1-1.8-1.2 2-2.3 3.6-3.6 4.8 1.4-1.2 2.3-2.6 2.3-4.3 0-.6-.1-1.1-.3-1.6z" />
      </svg>
    ),
  },
  {
    name: 'HEC Pakistan',
    icon: ({ className = 'w-5 h-5' }: { className?: string }) => (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2L1 7l11 5 9-4.09V17h2V7L12 2zm-7 9.88V17c0 3.31 3.13 6 7 6s7-2.69 7-6v-5.12l-7 3.18-7-3.18z" />
      </svg>
    ),
  },
  {
    name: 'NED University CSIT',
    icon: ({ className = 'w-5 h-5' }: { className?: string }) => (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 3a9 9 0 0 0-9 9c0 4.97 4.03 9 9 9s9-4.03 9-9a9 9 0 0 0-9-9zm-1 4h2v3h3v2h-3v5h-2v-5H8v-2h3V7z" />
      </svg>
    ),
  },
]

export default function Home() {
  const [applyModalOpen, setApplyModalOpen] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [drawerTab, setDrawerTab] = useState<'projects' | 'members'>('projects')

  const openProjectsDrawer = () => {
    setDrawerTab('projects')
    setDrawerOpen(true)
  }

  const openMembersDrawer = () => {
    setDrawerTab('members')
    setDrawerOpen(true)
  }

  return (
    <div className="w-full relative font-sans text-[var(--text-primary)] overflow-hidden">
      {/* ── Ambient Background Color Glows (Subtle Orange to Purple Gradient) ── */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[720px] pointer-events-none overflow-hidden z-0 select-none" aria-hidden="true">
        {/* Subtle Orange Glow top right */}
        <div className="absolute top-12 right-[-6%] w-[540px] h-[540px] rounded-full bg-[var(--accent-orange)]/10 blur-[130px]" />
        
        {/* Subtle Electric Purple Glow top left */}
        <div className="absolute top-20 left-[-8%] w-[500px] h-[500px] rounded-full bg-[var(--accent-purple)]/10 blur-[130px]" />

        {/* Core Muted Aura */}
        <div className="absolute top-44 left-[20%] w-[440px] h-[440px] rounded-full bg-[var(--bg-backdrop)]/35 blur-[120px]" />
      </div>

      {/* ── 1. HERO SECTION (Neo-Grotesk 2-Column Split: Massive Wordmark + Editorial Pitch) ── */}
      <section className="pt-10 pb-12 sm:pt-16 sm:pb-16 px-4 sm:px-8 max-w-[1280px] mx-auto text-left relative z-10">
        {/* 2-Column Split: Massive Wordmark Left / Editorial Pitch & Actions Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start pb-12 border-b border-[var(--border-hairline)]">
          {/* Left Column (5 cols): Massive Display Wordmark & Description */}
          <SectionReveal delay={0.06} className="lg:col-span-5">
            <div>
              <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-[-0.04em] leading-[0.95] text-[var(--text-primary)] font-head">
                AIR Lab
              </h1>
              <p className="text-[13px] sm:text-[14px] text-[var(--text-muted)] max-w-sm leading-relaxed mt-5 font-normal">
                The Artificial Intelligence Research Lab at NED University is pioneering foundational regional AI models, computer vision, and edge computing for real-world impact across national academia and industry.
              </p>
            </div>
          </SectionReveal>

          {/* Right Column (7 cols): Editorial Pitch & Big Action Buttons */}
          <SectionReveal delay={0.12} className="lg:col-span-7">
            <div className="lg:pl-6 lg:border-l border-[var(--border-hairline)]">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[42px] font-normal tracking-[-0.025em] leading-[1.12] text-[var(--text-primary)] mb-8 font-head">
                Ignite intelligence, computational strength, and breakthrough innovation on every research frontier, turning lab discoveries into impactful real-world systems.
              </h2>
              
              {/* Big High-Visibility Project & Member Buttons (Opens Big Flyout Drawer from Right) */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-4">
                {/* Big Visible Orange Project Button */}
                <button
                  type="button"
                  onClick={openProjectsDrawer}
                  className="h-14 sm:h-16 px-8 sm:px-10 bg-[var(--accent-orange)] hover:bg-[var(--accent-orange-hover)] text-white text-base sm:text-lg font-bold rounded-[2px] shadow-lg shadow-[var(--accent-orange)]/25 hover:shadow-xl hover:scale-[1.02] active:scale-[0.99] transition-all duration-200 flex items-center justify-center gap-3 cursor-pointer group"
                >
                  <Layers className="w-5 h-5 shrink-0" />
                  <span>Explore Projects</span>
                  <span className="font-mono text-xl group-hover:translate-x-0.5 transition-transform">↳</span>
                </button>

                {/* Big Visible Members Button */}
                <button
                  type="button"
                  onClick={openMembersDrawer}
                  className="h-14 sm:h-16 px-8 sm:px-10 bg-[var(--bg-surface)] hover:bg-[var(--bg-page)] text-[var(--text-primary)] border-2 border-[var(--text-primary)] text-base sm:text-lg font-bold rounded-[2px] shadow-sm hover:shadow-md hover:scale-[1.02] active:scale-[0.99] transition-all duration-200 flex items-center justify-center gap-3 cursor-pointer group"
                >
                  <Users className="w-5 h-5 text-[var(--accent-purple)] shrink-0" />
                  <span>Lab Members</span>
                  <span className="font-mono text-xl group-hover:translate-x-0.5 transition-transform">↳</span>
                </button>
              </div>

              {/* Direct Link Options */}
              <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs font-mono text-[var(--text-muted)]">
                <span className="text-[var(--text-subtle)]">Direct navigation:</span>
                <Link to="/projects" className="text-[var(--accent-orange)] hover:underline font-semibold flex items-center gap-1">
                  Full Projects Page &rarr;
                </Link>
                <span>&bull;</span>
                <Link to="/team" className="text-[var(--text-primary)] hover:underline font-semibold flex items-center gap-1">
                  Full Team Directory &rarr;
                </Link>
              </div>
            </div>
          </SectionReveal>
        </div>

        {/* ── Real Lab Stats Strip with Top Hairline Gradient Highlight ── */}
        <SectionReveal delay={0.24}>
          <div className="relative rounded-[4px] overflow-hidden bg-[var(--bg-surface)] backdrop-blur-xs border border-[var(--border-hairline)] shadow-sm">
            <div className="h-[2px] w-full bg-gradient-to-r from-[var(--accent-orange)] via-[var(--accent-purple)] to-[var(--accent-orange)]" />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 sm:p-6">
            {labStats.map((stat, i) => (
              <div
                key={i}
                className="p-3 border-r border-[var(--border-hairline)] last:border-r-0 text-left rounded-[2px] transition-all duration-200 hover:-translate-y-1 hover:scale-[1.02] hover:bg-[var(--bg-page)]"
              >
                <div className="text-2xl sm:text-4xl font-bold font-mono text-[var(--accent-orange)] tracking-tight">
                  {stat.value}
                </div>
                <div className="text-xs sm:text-sm font-semibold text-[var(--text-primary)] mt-1 font-head">
                  {stat.label}
                </div>
                <div className="text-[11px] text-[var(--text-subtle)] font-mono mt-0.5 line-clamp-1">
                  {stat.desc}
                </div>
              </div>
            ))}
            </div>
          </div>
        </SectionReveal>
      </section>

      {/* ── 3. STRATEGIC & ACADEMIC ALLIANCES (Strip) ── */}
      <section className="py-12 border-y border-[var(--border-hairline)] bg-[var(--bg-surface)] mb-20 overflow-hidden text-left relative z-10">
        <div className="max-w-[1140px] mx-auto px-6">
          <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold tracking-wider text-[var(--text-subtle)] uppercase">
                Compute & Academic Partners
              </span>
              <Link to="/collaborations" className="text-xs font-mono text-[var(--accent-orange)] hover:underline inline-flex items-center gap-1 font-medium">
                <span>View All Collaborations</span>
                <span>&rarr;</span>
              </Link>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-9 gap-4 items-stretch">
              {institutionalPartners.map((partner, i) => {
                const IconComponent = partner.icon
                return (
                  <div
                    key={i}
                    className="p-3.5 rounded-[4px] bg-[var(--bg-page)] border border-[var(--border-hairline)] hover:border-[var(--accent-purple)] hover:shadow-md transition-all duration-200 flex flex-col items-center justify-center text-center gap-2 group cursor-default"
                  >
                    <div className="w-9 h-9 rounded-[2px] bg-[var(--bg-surface)] border border-[var(--border-hairline)] flex items-center justify-center text-[var(--text-muted)] group-hover:text-[var(--accent-orange)] group-hover:scale-110 transition-all shadow-2xs">
                      <IconComponent className="w-5 h-5 transition-transform" />
                    </div>
                    <span className="text-xs font-head font-medium text-[var(--text-muted)] group-hover:text-[var(--text-primary)] transition-colors leading-tight">
                      {partner.name}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. FULL-WIDTH ORANGE CTA / ABOUT AIR LAB SECTION ── */}
      <section className="py-12 px-6 max-w-[1140px] mx-auto text-left mb-20 relative z-10">
        <div className="bg-[var(--accent-orange)] text-white rounded-[4px] p-8 sm:p-12 relative overflow-hidden transition-all duration-200 shadow-xl border border-[var(--accent-orange)]">
          <div className="max-w-3xl relative z-10">
            <div className="flex items-center gap-2 text-white/90 font-mono font-semibold uppercase text-xs mb-3">
              <div className="w-6 h-[2px] bg-white" />
              ABOUT AIR LAB · NED UNIVERSITY
            </div>
            <h2 className="text-2xl sm:text-4xl font-head font-normal text-white tracking-tight mb-4">
              Empowering Regional AI Innovation at NED University
            </h2>
            <div className="space-y-4 text-sm sm:text-base text-white/90 leading-relaxed font-normal">
              <p>
                The Artificial Intelligence Research Lab (AIR Lab) at NED University is dedicated to pushing the boundaries of machine learning, natural language processing, and computer vision.
              </p>
              <p>
                Our mission is to develop foundational models optimized for the region's unique linguistic and infrastructural challenges, ensuring AI benefits all segments of society.
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-white/20 flex flex-wrap gap-4">
              <Button to="/team" variant="secondary" size="md" className="bg-white text-[var(--text-primary)] hover:bg-gray-100 border-white">
                Meet the Team
              </Button>
              <button
                onClick={() => setApplyModalOpen(true)}
                className="h-9 px-4 rounded-[2px] border border-white text-white hover:bg-white/10 text-[13px] font-medium tracking-tight transition-colors cursor-pointer inline-flex items-center gap-1.5"
              >
                <span>Apply for Vacancy</span>
                <span className="text-[12px] leading-none">↳</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. RESEARCH INITIATIVES (6 Sharp Cards) ── */}
      <section className="py-12 px-6 max-w-[1140px] mx-auto mb-20 text-left relative z-10">
        {/* Subtle background color auras */}
        <div className="absolute -top-16 -left-12 w-80 h-80 rounded-full bg-[var(--accent-orange)]/8 blur-[100px] pointer-events-none" aria-hidden="true" />
        <div className="absolute top-1/2 -right-12 w-80 h-80 rounded-full bg-[var(--accent-purple)]/8 blur-[100px] pointer-events-none" aria-hidden="true" />

        <div className="max-w-2xl mb-12 relative z-10">
          <span className="text-xs font-mono uppercase font-bold text-[var(--accent-purple)]">
            LAB INITIATIVES
          </span>
          <h2 className="text-3xl sm:text-4xl font-head font-normal text-[var(--text-primary)] tracking-tight mt-1">
            Core Research Areas
          </h2>
          <p className="text-sm sm:text-base text-[var(--text-muted)] mt-2">
            Exploring the frontiers of machine learning, natural language processing, edge computer vision, and autonomous robotics.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
          {coreResearchAreas.map((area, idx) => {
            const Icon = area.icon
            return (
              <div
                key={idx}
                className="p-6 bg-[var(--bg-surface)] border border-[var(--border-hairline)] rounded-[4px] flex flex-col justify-between hover:border-[var(--accent-purple)] hover:shadow-xl hover:-translate-y-2 hover:scale-[1.02] transition-all duration-200 group cursor-pointer"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-[2px] bg-[var(--accent-purple-light)] text-[var(--accent-purple)] flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-mono text-[var(--text-muted)] uppercase px-2 py-0.5 bg-[var(--bg-page)] rounded-[2px] border border-[var(--border-hairline)]">
                      {area.tag}
                    </span>
                  </div>

                  <h3 className="font-head font-medium text-lg text-[var(--text-primary)] group-hover:text-[var(--accent-orange)] transition-colors mb-2">
                    {area.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed font-normal">
                    {area.desc}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-[var(--border-hairline)] flex items-center justify-between text-xs font-mono font-medium text-[var(--accent-orange)]">
                  <Link to="/projects" className="inline-flex items-center gap-1 hover:underline">
                    <span>Explore domain</span>
                    <span className="text-[11px] leading-none">↳</span>
                  </Link>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* Fast Directory Dropdown Drawer from Right */}
      <QuickDrawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        initialTab={drawerTab}
      />

      {/* Student Fellowship Modal */}
      <StudentApplicationModal
        isOpen={applyModalOpen}
        onClose={() => setApplyModalOpen(false)}
      />
    </div>
  )
}
