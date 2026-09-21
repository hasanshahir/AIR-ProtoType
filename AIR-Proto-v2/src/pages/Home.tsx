import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import Marquee from 'react-fast-marquee'
import { ArrowRight, Sparkles, ChevronRight, Layers, Cpu, Eye, Compass } from 'lucide-react'
import ParticleCanvas from '../components/ParticleCanvas'
import GlitchText from '../components/GlitchText'
import { useScrollCraft } from '../hooks/useScrollCraft'

const MarqueeModule = (Marquee as any).default || Marquee

const stats = [
  { label: 'Publications', value: 45, suffix: '+' },
  { label: 'Lab Members', value: 120, suffix: '+' },
  { label: 'Active Grants', value: 15, suffix: '' },
  { label: 'Industry Partners', value: 7, suffix: '' },
]

const pillars = [
  {
    num: '01', title: 'Large Language Models', icon: Layers,
    desc: 'Building regional & domain-specific LLMs with optimized fine-tuning, Urdu NLP benchmarks, and retrieval-augmented generation pipelines.',
  },
  {
    num: '02', title: 'Computer Vision', icon: Eye,
    desc: 'Real-time perception models for urban traffic management, medical imaging diagnostics, and sub-pixel precision edge detection.',
  },
  {
    num: '03', title: 'Edge & Embedded AI', icon: Cpu,
    desc: 'Deploying neural networks on ultra-low-power microcontrollers, Jetson clusters, and custom FPGA-based accelerators.',
  },
  {
    num: '04', title: 'Autonomous Systems', icon: Compass,
    desc: 'End-to-end autonomous navigation, ROS2 sensor fusion stacks, and multi-agent drone swarm robotics for precision agriculture.',
  },
]

const featuredProjects = [
  {
    id: 1, title: 'UrduLLM — Domain-Specialized Language Model', category: 'R&D',
    chipColor: 'bg-[#1A6BFF]', metric: '12.4B Tokens',
    desc: 'High-performance Urdu-English bilingual foundation model built for legal and medical NLP benchmarks.',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 2, title: 'EdgeVision Traffic AI', category: 'Funded',
    chipColor: 'bg-[#FF4D4F]', metric: '60 FPS @ 5W',
    desc: 'Low-latency vision system deployed at Karachi intersections for real-time traffic flow optimization.',
    image: 'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?q=80&w=600&auto=format&fit=crop',
  },
  {
    id: 3, title: 'AgriSwarm Drone Collective', category: 'Undergraduate',
    chipColor: 'bg-[#FFAB00]', metric: '98.2% Accuracy',
    desc: 'Autonomous UAV swarm for multispectral crop yield prediction across arid agricultural zones.',
    image: 'https://images.unsplash.com/photo-1527977966376-1c8408f9f108?q=80&w=600&auto=format&fit=crop',
  },
]

const partners = ['Google DeepMind', 'HEC Pakistan', 'Meta AI', 'Ignite NCBC', 'OpenAI', 'Stanford HAI', 'Hugging Face']

export default function Home() {
  const sc = useScrollCraft()

  useEffect(() => {
    // Section headings
    sc.reveal('[data-sc-reveal="heading"]', {
      direction: 'up',
      distance: '32px',
      duration: 700,
      ease: 'cubicOut',
    })

    // Research pillar rows — stagger left from left edge
    sc.reveal('[data-sc-reveal="pillar"]', {
      direction: 'left',
      distance: '40px',
      duration: 650,
      ease: 'cubicOut',
      threshold: 0.1,
    })

    // Project cards — come up from below
    sc.reveal('[data-sc-reveal="project-card"]', {
      direction: 'up',
      distance: '28px',
      duration: 600,
      ease: 'quartOut',
      threshold: 0.08,
    })

    // Stats section label
    sc.reveal('[data-sc-reveal="stat-label"]', {
      direction: 'up',
      distance: '16px',
      duration: 500,
      ease: 'cubicOut',
      threshold: 0.5,
    })

    // CTA section
    sc.reveal('[data-sc-reveal="cta"]', {
      direction: 'up',
      distance: '40px',
      duration: 750,
      ease: 'backOut',
    })

    // Native scroll-craft counter for stats
    sc.counter('[data-count]', {
      duration: 2000,
      ease: 'quartOut',
      formatter: (v) => Math.round(v).toString(),
    })

    // Partners marquee label
    sc.reveal('[data-sc-reveal="marquee-label"]', {
      direction: 'up',
      distance: '20px',
      duration: 500,
    })
  }, [sc])

  return (
    <div className="relative overflow-x-hidden">

      {/* ── HERO ──────────────────────────────────────────── */}
      <section className="relative min-h-[92vh] flex items-center pt-8 pb-20 px-6 overflow-hidden">
        <ParticleCanvas />

        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          {/* Text — Framer Motion handles hero since it's above-fold */}
          <motion.div
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.75 }}
            className="lg:col-span-8 space-y-7"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#1A6BFF]/30 bg-[#1A6BFF]/10 text-[#1A6BFF] font-mono text-xs tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              AIR LAB · NED UNIVERSITY · EST. 2021
            </div>

            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-[-0.04em] leading-[0.93]" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
              We build <br />
              <span className="bg-gradient-to-r from-[#1A6BFF] via-[#7C3AED] to-[#FF4D4F] bg-clip-text text-transparent">
                <GlitchText text="AI systems" />
              </span>{' '}
              that matter.
            </h1>

            <p className="max-w-2xl text-lg sm:text-xl text-[var(--fg-sub)] leading-relaxed">
              Artificial Intelligence Research Lab at NED University — advancing foundational models, computer vision & robotics for real-world impact.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link to="/projects" className="bg-[#1A6BFF] hover:bg-[#1A6BFF]/90 text-white font-semibold px-8 py-4 rounded-full flex items-center gap-2 transition-all shadow-xl shadow-[#1A6BFF]/30 hover:gap-3">
                Explore Research <ArrowRight className="w-4 h-4" />
              </Link>
              <Link to="/about" className="border border-[var(--border)] hover:bg-[var(--bg-muted)] text-[var(--fg)] font-semibold px-8 py-4 rounded-full transition-colors">
                Our Story
              </Link>
            </div>
          </motion.div>

          {/* Abstract terminal card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.88 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.9, delay: 0.25 }}
            className="lg:col-span-4 hidden lg:flex justify-center"
          >
            <div className="w-72 h-72 rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-2xl p-6 flex flex-col justify-between shadow-2xl hover:border-[#1A6BFF]/50 transition-all duration-500">
              <div className="flex justify-between items-center">
                <span className="font-mono text-[10px] text-[#1A6BFF] tracking-wider">AIR_MODEL_V2.0</span>
                <span className="w-2 h-2 rounded-full bg-[#FF4D4F] animate-ping" />
              </div>
              <div className="text-center font-mono font-black text-9xl text-transparent bg-clip-text bg-gradient-to-b from-[#1A6BFF] to-[#FF4D4F] tracking-tighter leading-none">
                A
              </div>
              <div className="font-mono text-[9px] text-[var(--fg-sub)] flex justify-between">
                <span>LATENCY: 12ms</span>
                <span>ACC: 99.4%</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── STATS BAR (scroll-craft counter) ─────────────── */}
      <section className="bg-[#080808] text-white py-14 border-y border-white/8">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-10 divide-x divide-white/10">
          {stats.map((s, i) => (
            <div key={i} className="flex flex-col items-center text-center space-y-2 px-4">
              {/* scroll-craft counter reads data-count and animates the text */}
              <div className="font-mono text-4xl sm:text-5xl font-black tracking-tight">
                <span data-count={s.value} data-sc-reveal="stat-label">0</span>
                <span className="text-[#1A6BFF]">{s.suffix}</span>
              </div>
              <p className="text-[10px] uppercase font-mono tracking-widest text-zinc-500" data-sc-reveal="stat-label">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── RESEARCH PILLARS ──────────────────────────────── */}
      <section className="py-28 px-6 max-w-7xl mx-auto">
        <div className="space-y-3 mb-16">
          <span className="font-mono text-xs font-bold tracking-widest text-[#1A6BFF] uppercase" data-sc-reveal="heading">[ WHAT WE DO ]</span>
          <h2
            className="text-4xl sm:text-5xl font-black tracking-tight"
            style={{ fontFamily: 'Space Grotesk, sans-serif' }}
            data-sc-reveal="heading"
          >
            Research Areas
          </h2>
        </div>

        <div className="divide-y divide-[var(--border)] border-y border-[var(--border)]">
          {pillars.map((p, i) => {
            const Icon = p.icon
            return (
              <div
                key={i}
                data-sc-reveal="pillar"
                className="py-10 group cursor-default px-4 -mx-4 hover:bg-[#1A6BFF]/5 rounded-xl transition-all duration-300 border-l-4 border-transparent hover:border-[#1A6BFF] flex flex-col md:flex-row md:items-center justify-between gap-6"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div className="flex items-center gap-6 md:w-1/2">
                  <span className="font-mono text-2xl font-black text-[#FF4D4F]">{p.num}</span>
                  <Icon className="w-6 h-6 text-[#1A6BFF] group-hover:scale-110 transition-transform" />
                  <h3 className="text-xl sm:text-2xl font-bold" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>{p.title}</h3>
                </div>
                <div className="md:w-1/2 flex items-center justify-between gap-4">
                  <p className="text-sm text-[var(--fg-sub)] leading-relaxed max-w-lg">{p.desc}</p>
                  <ChevronRight className="w-5 h-5 text-[var(--fg-sub)] group-hover:text-[#1A6BFF] group-hover:translate-x-1 transition-all shrink-0" />
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* ── FEATURED PROJECTS ─────────────────────────────── */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="bg-[var(--bg-muted)] rounded-3xl border border-[var(--border)] p-8 md:p-12">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
            <div className="space-y-2">
              <span className="font-mono text-xs font-bold tracking-widest text-[#FF4D4F] uppercase" data-sc-reveal="heading">[ RECENT WORK ]</span>
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight" style={{ fontFamily: 'Space Grotesk, sans-serif' }} data-sc-reveal="heading">Featured Projects</h2>
            </div>
            <Link to="/projects" className="text-sm font-bold text-[#1A6BFF] hover:underline flex items-center gap-1 shrink-0">
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Large card */}
            <div
              data-sc-reveal="project-card"
              className="lg:col-span-7 group relative rounded-2xl overflow-hidden min-h-[400px] flex flex-col justify-end border border-[var(--border)] hover:border-[#1A6BFF] transition-all duration-300 shadow-lg"
            >
              <img src={featuredProjects[0].image} alt={featuredProjects[0].title}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-60 dark:opacity-40" />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg)] via-[var(--bg)]/60 to-transparent" />
              <div className="relative p-8 space-y-3">
                <div className="flex items-center gap-3">
                  <span className={`px-3 py-1 rounded-full text-white text-xs font-mono font-bold ${featuredProjects[0].chipColor}`}>{featuredProjects[0].category}</span>
                  <span className="font-mono text-xs text-[var(--fg-sub)]">{featuredProjects[0].metric}</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-black" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>{featuredProjects[0].title}</h3>
                <p className="text-sm text-[var(--fg-sub)] max-w-lg leading-relaxed">{featuredProjects[0].desc}</p>
              </div>
            </div>

            {/* Two stacked */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              {featuredProjects.slice(1).map((proj, i) => (
                <div
                  key={proj.id}
                  data-sc-reveal="project-card"
                  className="group relative rounded-2xl overflow-hidden border border-[var(--border)] hover:border-[#1A6BFF] bg-[var(--bg)] p-6 shadow-md transition-all duration-300 flex-1"
                  style={{ transitionDelay: `${i * 120}ms` }}
                >
                  <img src={proj.image} alt={proj.title}
                    className="absolute inset-0 w-full h-full object-cover opacity-20 dark:opacity-10 group-hover:opacity-30 transition-opacity duration-500" />
                  <div className="relative space-y-3">
                    <div className="flex items-center gap-3">
                      <span className={`px-2.5 py-0.5 rounded-full text-white text-[11px] font-mono font-bold ${proj.chipColor}`}>{proj.category}</span>
                      <span className="font-mono text-[11px] text-[var(--fg-sub)]">{proj.metric}</span>
                    </div>
                    <h4 className="text-lg font-black group-hover:text-[#1A6BFF] transition-colors" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>{proj.title}</h4>
                    <p className="text-xs text-[var(--fg-sub)] leading-relaxed">{proj.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── PARTNERS MARQUEE ──────────────────────────────── */}
      <section className="py-14 border-y border-[var(--border)]">
        <p className="text-center font-mono text-[10px] uppercase tracking-widest text-[var(--fg-sub)] mb-8" data-sc-reveal="marquee-label">
          Collaborating with Leading AI Institutions
        </p>
        <MarqueeModule gradient={false} speed={40}>
          {partners.map((name, i) => (
            <div key={i} className="mx-12 font-black text-lg tracking-tight text-[var(--fg-sub)] hover:text-[#1A6BFF] transition-colors cursor-pointer" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
              {name}
            </div>
          ))}
        </MarqueeModule>
      </section>

      {/* ── CTA ───────────────────────────────────────────── */}
      <section className="py-28 px-6 bg-[#080808] text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#1A6BFF_1px,transparent_1px)] [background-size:18px_18px] opacity-[0.07]" />
        <div className="max-w-4xl mx-auto text-center space-y-8 relative z-10">
          <h2
            data-sc-reveal="cta"
            className="text-4xl sm:text-6xl font-black tracking-tight"
            style={{ fontFamily: 'Space Grotesk, sans-serif' }}
          >
            Ready to push the{' '}
            <span className="bg-gradient-to-r from-[#FF4D4F] via-[#FFAB00] to-[#1A6BFF] bg-clip-text text-transparent">frontier?</span>
          </h2>
          <p className="text-zinc-400 text-lg max-w-2xl mx-auto" data-sc-reveal="cta" style={{ transitionDelay: '120ms' }}>
            We are always looking for motivated undergraduate researchers, PhD candidates, and industry partners to collaborate on high-impact AI projects.
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-2" data-sc-reveal="cta" style={{ transitionDelay: '220ms' }}>
            <Link to="/team" className="bg-[#1A6BFF] hover:bg-[#1A6BFF]/90 text-white font-bold px-8 py-4 rounded-full transition-all shadow-xl shadow-[#1A6BFF]/30">
              View Open Positions →
            </Link>
            <a href="mailto:airlab@neduet.edu.pk" className="border border-white/20 hover:bg-white/10 text-white font-bold px-8 py-4 rounded-full transition-colors">
              Contact Us
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
