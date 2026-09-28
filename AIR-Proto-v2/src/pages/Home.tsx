import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import Marquee from 'react-fast-marquee'
import CountUpModule from 'react-countup'
import Tilt from 'react-parallax-tilt'
import { 
  ArrowRight, 
  Brain, 
  Zap, 
  Code, 
  Database, 
  LineChart, 
  Cpu, 
  Award, 
  Check, 
  Plus, 
  Minus, 
  ChevronLeft, 
  ChevronRight, 
  Send,
  User,
  Compass
} from 'lucide-react'
import TechParticles from '../components/TechParticles'
import { useTheme } from '../components/ThemeProvider'
import { useScrollCraft } from '../hooks/useScrollCraft'
import performersData from '../data/performers.json'

const CountUp = (CountUpModule as any).default || CountUpModule
const MarqueeModule = (Marquee as any).default || Marquee

const stats = [
  { value: 48, suffix: '+', label: 'Publications' },
  { value: 120, suffix: '+', label: 'Lab Members' },
  { value: 45, prefix: 'PKR ', suffix: 'M', label: 'Active Grants' },
  { value: 16, suffix: 'x', label: 'H100 Supercluster' },
]

const partners = [
  'PLAID', 'Grasshopper', 'PAI 02', 'commune', 'DeepMind', 'Numeral', 'perplexity', 'Google DeepMind', 'OpenAI', 'Meta AI', 'Hugging Face', 'Stanford HAI', 'MIT CSAIL', 'NVIDIA Research', 'HEC Pakistan'
]

const flagshipProjects = [
  {
    id: 1,
    title: 'UrduLLM — Bilingual Foundation Model',
    category: 'Foundation Models',
    metric: '12.4B Tokens Evaluated',
    desc: 'High-performance bilingual Urdu-English neural foundation model benchmarked on legal statutes, biomedical literature, and low-resource vernacular syntax.',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop',
    tech: ['PyTorch', 'H100 Cluster', 'SentencePiece', 'Deepspeed']
  },
  {
    id: 2,
    title: 'EdgeVision Traffic AI — Low-Latency Transit Intelligence',
    category: 'Autonomous Perception',
    metric: '60 FPS @ 5W Power',
    desc: 'Real-time urban perception model deployed across Karachi intersections for dynamic signal timing and anomalous incident localization.',
    image: 'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?q=80&w=800&auto=format&fit=crop',
    tech: ['TensorRT', 'Jetson AGX', 'ONNX Runtime', 'C++ 20']
  },
  {
    id: 3,
    title: 'AgriSwarm — Multi-UAV Autonomous Crop Collective',
    category: 'Robotics & Swarms',
    metric: '98.2% Localization Accuracy',
    desc: 'Cooperative multi-drone fleet with multispectral imaging for autonomous crop stress identification and precision micro-fertilizer dispersal.',
    image: 'https://images.unsplash.com/photo-1527977966376-1c8408f9f108?q=80&w=800&auto=format&fit=crop',
    tech: ['PX4 Autopilot', 'ROS2 Humble', 'Thermal Vision', 'RTK-SLAM']
  },
]

const faqs = [
  {
    q: 'What is the right fellowship or collaboration track for me?',
    a: 'We offer specialized tracks for postgraduate researchers (12B+ foundation models), undergraduate scholars (edge robotics & CV), and industrial partners (custom model alignment, on-prem deployments, and sponsored labs).'
  },
  {
    q: 'How do compute allocations work on the 16x H100 cluster?',
    a: 'Selected fellows and verified projects receive dedicated SLURM partitions on our 16x NVIDIA H100 SXM5 supercluster interconnected via 800Gb/s Quantum-2 InfiniBand for multi-node distributed pretraining.'
  },
  {
    q: 'Can researchers access additional GPU hours at any time?',
    a: 'Yes. High-priority training jobs and paper submission deadlines receive priority burst quotas through our automated compute scheduler.'
  },
  {
    q: 'How can outside teams and enterprise partners onboard at AIR Lab?',
    a: 'Enterprise partners sponsor dedicated research cohorts with zero-data-retention guarantees, custom network security policies, and air-gapped model fine-tuning tailored to industrial applications.'
  },
  {
    q: 'Where can I view our open-source weights and documentation?',
    a: 'All peer-reviewed model checkpoints, tokenizers, and benchmark evaluation suites are published publicly on our Hugging Face and GitHub repositories under permissive open-weights licenses.'
  },
  {
    q: 'What happens when my project is accepted for IEEE/CVF publication?',
    a: 'AIR Lab fully funds conference travel grants, presentation registration fees, and open-access publication costs for authors presenting at flagship venues.'
  }
]

export default function Home() {
  const { activeTheme } = useTheme()
  const sc = useScrollCraft()
  const [activeFaq, setActiveFaq] = useState<number | null>(0)
  const [activeTab, setActiveTab] = useState<'loss' | 'training' | 'cluster'>('loss')
  const [activeSlide, setActiveSlide] = useState(0)

  useEffect(() => {
    sc.reveal('[data-sc-reveal="heading"]', {
      direction: 'up',
      distance: '24px',
      duration: 600,
      ease: 'cubicOut',
    })

    sc.reveal('[data-sc-reveal="card"]', {
      direction: 'up',
      distance: '28px',
      duration: 550,
      ease: 'quartOut',
      threshold: 0.08,
    })
  }, [sc])

  return (
    <div className="relative w-full flex flex-col items-center overflow-hidden bg-[var(--bg)] text-[var(--fg)] transition-colors duration-300 font-sans">
      
      {/* ── BACKGROUND JAVASCRIPT PARTICLES (Requested: "add particles only") ── */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-40 dark:opacity-50">
        <TechParticles id="ambient-particles" />
      </div>

      {/* ── HERO SECTION (Center-Aligned Exactly Matching Inspiration Mockup) ── */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-28 pb-20 z-10 relative flex flex-col items-center text-center">
        
        {/* ── VIBRANT SUNSET AURORA MESH BACKGROUND BLUR (Inspiration UI) ── */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-5xl h-[420px] pointer-events-none -z-10 overflow-visible">
          <div 
            className="absolute top-0 left-0 w-[420px] h-[320px] rounded-full blur-[110px] opacity-70 dark:opacity-40 animate-pulse"
            style={{ backgroundColor: 'var(--glow-1)', animationDuration: '8s' }}
          />
          <div 
            className="absolute top-6 right-0 w-[440px] h-[320px] rounded-full blur-[110px] opacity-70 dark:opacity-40 animate-pulse"
            style={{ backgroundColor: 'var(--glow-2)', animationDuration: '10s' }}
          />
          <div 
            className="absolute -top-10 left-1/4 w-[540px] h-[280px] rounded-full blur-[120px] opacity-65 dark:opacity-35"
            style={{ backgroundColor: 'var(--glow-3)' }}
          />
          <div 
            className="absolute top-24 left-1/3 w-[400px] h-[240px] rounded-full blur-[100px] opacity-50 dark:opacity-25"
            style={{ backgroundColor: 'var(--glow-4)' }}
          />
        </div>

        {/* Top Dark Badge: `▸ For Enterprise` */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="inline-flex items-center gap-2 rounded-md bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 px-3 py-1 text-[11px] font-semibold mb-6 shadow-sm"
        >
          <span className="text-[10px]">▸</span>
          <span>For Enterprise & Research</span>
        </motion.div>

        {/* Giant Bold Headline (Center-Aligned) */}
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-5xl sm:text-7xl lg:text-8xl font-extrabold text-[var(--fg)] tracking-[-0.04em] leading-[1.08] max-w-5xl mb-6 font-head"
        >
          Extend your team with a <br className="hidden sm:block" />
          full team of experts.
        </motion.h1>

        {/* Vibrant Gradient Subtitle (Center-Aligned — Mockup Style) */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-base sm:text-xl font-semibold max-w-3xl mb-8 leading-snug text-transparent bg-clip-text"
          style={{ backgroundImage: 'var(--accent-gradient)' }}
        >
          Specialized AI agents for every role. Ship faster, prototype instantly, close deals smarter. Multiply your workforce without adding headcount.
        </motion.p>

        {/* Dual CTA Buttons (Solid Black + White Bordered) */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3.5 mb-8 w-full sm:w-auto"
        >
          <Link
            to="/about"
            className="w-full sm:w-auto px-7 py-3 rounded-full bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 hover:opacity-90 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-md cursor-pointer"
          >
            <span>Get started free</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            to="/projects"
            className="w-full sm:w-auto px-7 py-3 rounded-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-[var(--fg)] font-semibold text-xs sm:text-sm flex items-center justify-center hover:bg-zinc-50 dark:hover:bg-zinc-800/80 transition-all shadow-xs cursor-pointer"
          >
            Book a demo
          </Link>
        </motion.div>

        {/* Trust Badges Checkmarks Row (Directly below buttons in Mockup) */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-[var(--fg-sub)] font-medium"
        >
          <div className="flex items-center gap-1.5">
            <Check className="w-3.5 h-3.5 text-zinc-900 dark:text-zinc-100 stroke-[2.5]" />
            <span>SOC 2- ready processes</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Check className="w-3.5 h-3.5 text-zinc-900 dark:text-zinc-100 stroke-[2.5]" />
            <span>SSO & SAML + Role-based access</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Check className="w-3.5 h-3.5 text-zinc-900 dark:text-zinc-100 stroke-[2.5]" />
            <span>Data residency & privacy controls</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Check className="w-3.5 h-3.5 text-zinc-900 dark:text-zinc-100 stroke-[2.5]" />
            <span>Dedicated support & SLAs</span>
          </div>
        </motion.div>

      </section>

      {/* ── LOGOS MARQUEE (Matching the Mockup's Horizontal Row) ── */}
      <section className="w-full border-y border-[var(--border)] bg-[var(--bg-muted)]/30 py-8 z-10 overflow-hidden">
        <MarqueeModule gradient={false} speed={36} pauseOnHover={true}>
          <div className="flex items-center gap-12 sm:gap-16 pr-12">
            {partners.map((partner, index) => (
              <span
                key={index}
                className="text-base sm:text-lg font-bold font-mono tracking-tight text-[var(--fg-sub)]/70 hover:text-[var(--fg)] transition-colors cursor-default whitespace-nowrap"
              >
                {partner}
              </span>
            ))}
          </div>
        </MarqueeModule>
      </section>

      {/* ── SECTION 2: "Enterprise AI that just works." (Exact Mockup Layout) ── */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 z-10 relative">
        <div className="mb-12">
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[var(--fg)] font-head mb-3">
            Enterprise AI that just works.
          </h2>
          <p className="text-base sm:text-lg text-[var(--fg-sub)] max-w-2xl font-sans">
            Security, governance, and scalability are built in from day one. Deploy with confidence across your organization.
          </p>
        </div>

        {/* ── THE SIGNATURE IRIDESCENT GRADIENT BORDER CARD (Inspiration Mockup) ── */}
        <div className="relative rounded-3xl p-1 mb-20 shadow-2xl overflow-hidden group">
          {/* Glowing Iridescent Gradient Frame */}
          <div 
            className="absolute inset-0 rounded-3xl opacity-85 group-hover:opacity-100 transition-opacity blur-sm"
            style={{ backgroundImage: 'var(--accent-gradient)' }}
          />

          {/* Clean White / Dark Interior */}
          <div className="relative rounded-[22px] bg-[var(--bg-card)] p-8 sm:p-14 z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-6 flex flex-col justify-between h-full">
              <div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-[var(--fg)] font-head mb-4">
                  Deploy the way that works <br /> best for your team.
                </h3>
                <p className="text-sm sm:text-base text-[var(--fg-sub)] leading-relaxed mb-10">
                  Choose managed SaaS, private cloud, VPC, or on-prem. Zero-data-retention controls, custom network policies, and air-gapped deployments for the most demanding requirements.
                </p>
              </div>

              {/* Slider Controls `<` `>` */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setActiveSlide(prev => (prev === 0 ? 2 : prev - 1))}
                  className="w-10 h-10 rounded-lg border border-[var(--border)] bg-[var(--bg-muted)] text-[var(--fg)] flex items-center justify-center hover:scale-105 active:scale-95 transition-all cursor-pointer shadow-xs"
                  aria-label="Previous slide"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setActiveSlide(prev => (prev === 2 ? 0 : prev + 1))}
                  className="w-10 h-10 rounded-lg border border-[var(--border)] bg-[var(--bg-muted)] text-[var(--fg)] flex items-center justify-center hover:scale-105 active:scale-95 transition-all cursor-pointer shadow-xs"
                  aria-label="Next slide"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
                <span className="text-xs font-mono text-[var(--fg-sub)] ml-2">
                  0{activeSlide + 1} / 03
                </span>
              </div>
            </div>

            {/* Right Inset Panel with Floating `Publish` Button */}
            <div className="lg:col-span-6">
              <div className="rounded-2xl border border-[var(--border)] bg-zinc-100/70 dark:bg-zinc-900/60 p-10 sm:p-14 flex items-center justify-center min-h-[320px] relative">
                <div className="absolute inset-0 bg-dot-pattern opacity-25 pointer-events-none" />
                
                {/* Floating Card: `[ 👤 ]  [ 🚀 Publish ]` (Mockup Exact Detail) */}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="relative z-10 flex items-center gap-3 p-3 rounded-2xl bg-white dark:bg-zinc-950 shadow-2xl border border-zinc-200/80 dark:border-zinc-800"
                >
                  <div className="w-11 h-11 rounded-xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-900 dark:text-white">
                    <User className="w-5 h-5" />
                  </div>
                  <div className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 font-bold text-xs shadow-md">
                    <Send className="w-3.5 h-3.5" />
                    <span>Publish</span>
                  </div>
                </motion.div>
              </div>
            </div>

          </div>
        </div>

        {/* ── 6 BENTO CARDS (From Ali's Architecture & Mockup's Top-Right Layout) ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
          
          {/* Card 1: Product / Foundational Models */}
          <Tilt tiltMaxAngleX={5} tiltMaxAngleY={5} glareEnable={true} glareMaxOpacity={0.05} className="rounded-2xl">
            <div className="h-full bg-[var(--bg-card)] border border-[var(--border)] rounded-2xl p-7 flex flex-col justify-between hover:border-[var(--fg)]/30 hover:shadow-lg transition-all group">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-10 h-10 rounded-xl bg-[var(--bg-muted)] border border-[var(--border)] flex items-center justify-center text-[var(--fg)]">
                    <Brain className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-mono font-medium text-[var(--fg-sub)] bg-[var(--bg-muted)] px-2 py-0.5 rounded border border-[var(--border)]">
                    Ready for team
                  </span>
                </div>
                <h3 className="text-xl font-bold text-[var(--fg)] font-head mb-2">
                  Product
                </h3>
                <p className="text-xs sm:text-sm text-[var(--fg-sub)] leading-relaxed font-sans">
                  Pick your AI agents for prototyping, user research insights, and feature specifications—turning ideas into working demos within minutes.
                </p>
              </div>
            </div>
          </Tilt>

          {/* Card 2: Sales / Edge AI */}
          <Tilt tiltMaxAngleX={5} tiltMaxAngleY={5} glareEnable={true} glareMaxOpacity={0.05} className="rounded-2xl">
            <div className="h-full bg-[var(--bg-card)] border border-[var(--border)] rounded-2xl p-7 flex flex-col justify-between hover:border-[var(--fg)]/30 hover:shadow-lg transition-all group">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-10 h-10 rounded-xl bg-[var(--bg-muted)] border border-[var(--border)] flex items-center justify-center text-[var(--fg)]">
                    <Zap className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-mono font-medium text-[var(--fg-sub)] bg-[var(--bg-muted)] px-2 py-0.5 rounded border border-[var(--border)]">
                    Shorter sales cycles
                  </span>
                </div>
                <h3 className="text-xl font-bold text-[var(--fg)] font-head mb-2">
                  Sales
                </h3>
                <p className="text-xs sm:text-sm text-[var(--fg-sub)] leading-relaxed font-sans">
                  Equip teams with AI agents for custom demos, proposal creation, and technical Q&A—helping close deals faster with instant technical support.
                </p>
              </div>
            </div>
          </Tilt>

          {/* Card 3: Support / Autonomous Robotics */}
          <Tilt tiltMaxAngleX={5} tiltMaxAngleY={5} glareEnable={true} glareMaxOpacity={0.05} className="rounded-2xl">
            <div className="h-full bg-[var(--bg-card)] border border-[var(--border)] rounded-2xl p-7 flex flex-col justify-between hover:border-[var(--fg)]/30 hover:shadow-lg transition-all group">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-10 h-10 rounded-xl bg-[var(--bg-muted)] border border-[var(--border)] flex items-center justify-center text-[var(--fg)]">
                    <Cpu className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-mono font-medium text-[var(--fg-sub)] bg-[var(--bg-muted)] px-2 py-0.5 rounded border border-[var(--border)]">
                    24/7 coverage
                  </span>
                </div>
                <h3 className="text-xl font-bold text-[var(--fg)] font-head mb-2">
                  Support
                </h3>
                <p className="text-xs sm:text-sm text-[var(--fg-sub)] leading-relaxed font-sans">
                  Support teams use AI agents for troubleshooting, knowledge base updates, and escalation management—resolving issues efficiently at scale.
                </p>
              </div>
            </div>
          </Tilt>

          {/* Card 4: Engineering / Open Source */}
          <Tilt tiltMaxAngleX={5} tiltMaxAngleY={5} glareEnable={true} glareMaxOpacity={0.05} className="rounded-2xl">
            <div className="h-full bg-[var(--bg-card)] border border-[var(--border)] rounded-2xl p-7 flex flex-col justify-between hover:border-[var(--fg)]/30 hover:shadow-lg transition-all group">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-10 h-10 rounded-xl bg-[var(--bg-muted)] border border-[var(--border)] flex items-center justify-center text-[var(--fg)]">
                    <Code className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-mono font-medium text-[var(--fg-sub)] bg-[var(--bg-muted)] px-2 py-0.5 rounded border border-[var(--border)]">
                    10x productivity
                  </span>
                </div>
                <h3 className="text-xl font-bold text-[var(--fg)] font-head mb-2">
                  Engineering
                </h3>
                <p className="text-xs sm:text-sm text-[var(--fg-sub)] leading-relaxed font-sans">
                  Every developer gets AI agents for code review, testing, documentation, and deployment. Ship faster without sacrificing quality.
                </p>
              </div>
            </div>
          </Tilt>

          {/* Card 5: Design / Data Curation */}
          <Tilt tiltMaxAngleX={5} tiltMaxAngleY={5} glareEnable={true} glareMaxOpacity={0.05} className="rounded-2xl">
            <div className="h-full bg-[var(--bg-card)] border border-[var(--border)] rounded-2xl p-7 flex flex-col justify-between hover:border-[var(--fg)]/30 hover:shadow-lg transition-all group">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-10 h-10 rounded-xl bg-[var(--bg-muted)] border border-[var(--border)] flex items-center justify-center text-[var(--fg)]">
                    <Database className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-mono font-medium text-[var(--fg-sub)] bg-[var(--bg-muted)] px-2 py-0.5 rounded border border-[var(--border)]">
                    Zero-handset friction
                  </span>
                </div>
                <h3 className="text-xl font-bold text-[var(--fg)] font-head mb-2">
                  Design
                </h3>
                <p className="text-xs sm:text-sm text-[var(--fg-sub)] leading-relaxed font-sans">
                  Designers get AI agents for implementation, accessibility checks, and managing design systems. Turn every design into production ready code.
                </p>
              </div>
            </div>
          </Tilt>

          {/* Card 6: Operations / AI Safety */}
          <Tilt tiltMaxAngleX={5} tiltMaxAngleY={5} glareEnable={true} glareMaxOpacity={0.05} className="rounded-2xl">
            <div className="h-full bg-[var(--bg-card)] border border-[var(--border)] rounded-2xl p-7 flex flex-col justify-between hover:border-[var(--fg)]/30 hover:shadow-lg transition-all group">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-10 h-10 rounded-xl bg-[var(--bg-muted)] border border-[var(--border)] flex items-center justify-center text-[var(--fg)]">
                    <LineChart className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-mono font-medium text-[var(--fg-sub)] bg-[var(--bg-muted)] px-2 py-0.5 rounded border border-[var(--border)]">
                    Always on, never tired
                  </span>
                </div>
                <h3 className="text-xl font-bold text-[var(--fg)] font-head mb-2">
                  Operations
                </h3>
                <p className="text-xs sm:text-sm text-[var(--fg-sub)] leading-relaxed font-sans">
                  Give operations teams AI agents for continuous monitoring, rapid incident response, and automated workflows. Run precise, reduce manual effort, and scale operations without overloading your team.
                </p>
              </div>
            </div>
          </Tilt>

        </div>

      </section>

      {/* ── STATS STRIP (From Ali's Architecture) ── */}
      <section className="w-full max-w-5xl mx-auto px-4 mb-20 z-10 relative">
        <motion.div 
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 p-8 rounded-2xl border border-[var(--border)] bg-[var(--bg-card)]/80 backdrop-blur-md shadow-lg text-center"
        >
          {stats.map((s, idx) => (
            <div key={idx} className={idx !== 0 ? 'md:border-l md:border-[var(--border)]' : ''}>
              <div 
                className="text-3xl sm:text-4xl font-extrabold font-mono tracking-tight"
                style={{ color: activeTheme.accent }}
              >
                {s.prefix}<CountUp end={s.value} duration={2.2} />{s.suffix}
              </div>
              <div className="text-xs text-[var(--fg-sub)] font-semibold uppercase tracking-wider mt-1 font-mono">
                {s.label}
              </div>
            </div>
          ))}
        </motion.div>
      </section>

      {/* ── MAC WINDOW PREVIEW (From Ali's Architecture) ── */}
      <section className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-24 z-10 relative">
        <div className="w-full rounded-2xl border border-[var(--border)] bg-[var(--bg-card)]/90 backdrop-blur-xl shadow-2xl overflow-hidden">
          {/* Mac Window Controls */}
          <div className="bg-[var(--bg-muted)] border-b border-[var(--border)] px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-rose-500/80" />
              <div className="w-3 h-3 rounded-full bg-amber-500/80" />
              <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
              <span className="ml-3 text-xs font-mono text-[var(--fg-sub)]">
                air-lab/core-model.py
              </span>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold border border-emerald-500/20">
              16x H100 ONLINE
            </span>
          </div>

          {/* Tab Selector */}
          <div className="flex border-b border-[var(--border)] bg-[var(--bg-card)] text-xs font-mono">
            <button
              onClick={() => setActiveTab('loss')}
              className={`flex-1 py-2.5 px-3 text-center border-b-2 font-semibold transition-all cursor-pointer ${
                activeTab === 'loss'
                  ? 'border-[var(--fg)] text-[var(--fg)] bg-[var(--bg-muted)]/50'
                  : 'border-transparent text-[var(--fg-sub)] hover:text-[var(--fg)]'
              }`}
            >
              // loss_curve.tsx
            </button>
            <button
              onClick={() => setActiveTab('training')}
              className={`flex-1 py-2.5 px-3 text-center border-b-2 font-semibold transition-all cursor-pointer ${
                activeTab === 'training'
                  ? 'border-[var(--fg)] text-[var(--fg)] bg-[var(--bg-muted)]/50'
                  : 'border-transparent text-[var(--fg-sub)] hover:text-[var(--fg)]'
              }`}
            >
              // train_urdu.py
            </button>
            <button
              onClick={() => setActiveTab('cluster')}
              className={`flex-1 py-2.5 px-3 text-center border-b-2 font-semibold transition-all cursor-pointer ${
                activeTab === 'cluster'
                  ? 'border-[var(--fg)] text-[var(--fg)] bg-[var(--bg-muted)]/50'
                  : 'border-transparent text-[var(--fg-sub)] hover:text-[var(--fg)]'
              }`}
            >
              // h100_node.sh
            </button>
          </div>

          {/* Interactive Screen Content */}
          <div className="p-6 bg-[var(--bg)]/50 relative">
            <div className="absolute inset-0 bg-grid-pattern opacity-15 pointer-events-none" />

            {activeTab === 'loss' && (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="text-xs font-bold text-[var(--fg)] font-mono">
                      Pretraining UrduLLM-12B Foundation Model
                    </div>
                    <div className="text-[11px] text-[var(--fg-sub)]">
                      Step 84,200 / 120,000 • FP8 Mixed Precision
                    </div>
                  </div>
                  <div className="text-right font-mono">
                    <span className="text-xs text-emerald-600 dark:text-emerald-400 font-bold">
                      Loss: 0.0418
                    </span>
                    <div className="text-[10px] text-[var(--fg-sub)]">Δ -0.0012/k</div>
                  </div>
                </div>

                {/* SVG Loss Curve with Aurora Gradient Fill */}
                <div className="relative h-44 w-full overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--bg-card)] p-2">
                  <svg className="w-full h-full" viewBox="0 0 400 120" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="curveGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor={activeTheme.accent} stopOpacity="0.45" />
                        <stop offset="100%" stopColor={activeTheme.accent} stopOpacity="0.0" />
                      </linearGradient>
                    </defs>
                    <path
                      d="M 0,110 Q 50,85 100,55 T 200,35 T 300,22 T 400,16 L 400,120 L 0,120 Z"
                      fill="url(#curveGradient)"
                    />
                    <path
                      d="M 0,110 Q 50,85 100,55 T 200,35 T 300,22 T 400,16"
                      fill="none"
                      stroke={activeTheme.accent}
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    />
                    <circle cx="395" cy="16" r="4.5" fill={activeTheme.accent} className="animate-ping" />
                    <circle cx="395" cy="16" r="3.5" fill="#FFFFFF" stroke={activeTheme.accent} strokeWidth="2" />
                  </svg>
                </div>
              </div>
            )}

            {activeTab === 'training' && (
              <div className="font-mono text-xs text-[var(--fg)] space-y-1 py-2">
                <p className="text-[var(--fg-sub)]"># Distributed Deepspeed ZeRO-3 Initializer</p>
                <p><span className="text-pink-600 dark:text-pink-400">import</span> torch</p>
                <p><span className="text-pink-600 dark:text-pink-400">from</span> transformers <span className="text-pink-600 dark:text-pink-400">import</span> AutoModelForCausalLM</p>
                <p className="text-emerald-600 dark:text-emerald-400">model = AutoModelForCausalLM.from_pretrained(</p>
                <p className="pl-4 text-amber-600 dark:text-amber-300">"air-lab/UrduLLM-12B-Base",</p>
                <p className="pl-4">torch_dtype=torch.bfloat16,</p>
                <p className="pl-4">device_map="auto",</p>
                <p className="pl-4">attn_implementation="flash_attention_2"</p>
                <p className="text-emerald-600 dark:text-emerald-400">)</p>
              </div>
            )}

            {activeTab === 'cluster' && (
              <div className="font-mono text-xs text-[var(--fg)] space-y-1.5 py-2">
                <div className="flex justify-between items-center text-[var(--fg-sub)] text-[11px] pb-1 border-b border-[var(--border)]">
                  <span>SLURM JOB: #98421</span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold">16 NODES ALLOCATED</span>
                </div>
                <p className="text-emerald-600 dark:text-emerald-400 font-bold">$ srun --nodes=2 --gpus-per-node=8 nvidia-smi</p>
                <p className="text-[11px] text-[var(--fg-sub)]">• GPU 0..7: NVIDIA H100 80GB HBM3 [Temp: 48C]</p>
                <p className="text-[11px] text-[var(--fg-sub)]">• GPU 8..15: NVIDIA H100 80GB HBM3 [Temp: 51C]</p>
                <p className="text-[11px] text-amber-600 dark:text-amber-300">• InfiniBand Fabric: 800 Gb/s Quantum-2 Full Duplex</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── SECTION: FLAGSHIP PROJECTS (Worked Instances from Ali's Architecture) ── */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 z-10 relative">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--bg-muted)] text-[var(--fg)] text-xs font-mono font-bold border border-[var(--border)] mb-3">
              <Compass className="w-3.5 h-3.5" style={{ color: activeTheme.accent }} />
              FLAGSHIP RESEARCH DEPLOYMENTS
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-[var(--fg)] tracking-tight font-head">
              Real-World AI in Production
            </h2>
          </div>
          <Link
            to="/projects"
            className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-[var(--fg)] hover:underline mt-4 md:mt-0"
          >
            View All 24 Projects <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {flagshipProjects.map(project => (
            <Tilt
              key={project.id}
              tiltMaxAngleX={6}
              tiltMaxAngleY={6}
              glareEnable={true}
              glareMaxOpacity={0.08}
              className="rounded-2xl"
            >
              <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-2xl overflow-hidden h-full flex flex-col justify-between hover:border-[var(--fg)]/40 hover:shadow-xl transition-all group">
                <div>
                  {/* Dormant Black & White Image with Vivid Hover Color Pop */}
                  <div className="relative h-48 w-full overflow-hidden bg-zinc-950">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover dormant-image group-hover:scale-105 transition-all duration-500"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-black/80 text-white border border-white/20 backdrop-blur-md">
                        {project.category}
                      </span>
                    </div>
                    <div className="absolute bottom-3 right-3">
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-white/90 dark:bg-black/90 text-black dark:text-white border border-black/10 dark:border-white/20 backdrop-blur-md">
                        {project.metric}
                      </span>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-[var(--fg)] mb-2 font-head group-hover:text-rose-500 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-xs text-[var(--fg-sub)] leading-relaxed mb-6 font-sans">
                      {project.desc}
                    </p>
                  </div>
                </div>

                {/* Tech Pills Footer */}
                <div className="px-6 pb-6 pt-2 border-t border-[var(--border)] flex flex-wrap gap-1.5">
                  {project.tech.map((t, i) => (
                    <span
                      key={i}
                      className="text-[10px] font-mono px-2 py-0.5 rounded bg-[var(--bg-muted)] text-[var(--fg-sub)] border border-[var(--border)]"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </Tilt>
          ))}
        </div>
      </section>

      {/* ── SECTION: RESEARCH FELLOWS & HONOR ROLL (Proof & People) ── */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 z-10 relative">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--bg-muted)] text-[var(--fg)] text-xs font-mono font-bold border border-[var(--border)] mb-3">
              <Award className="w-3.5 h-3.5" style={{ color: activeTheme.accent }} />
              PEOPLE & TALENT
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-[var(--fg)] tracking-tight font-head">
              High-Velocity Researchers
            </h2>
          </div>
          <Link
            to="/performers"
            className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-[var(--fg)] hover:underline mt-4 md:mt-0"
          >
            View Full Honor Roll <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {performersData.slice(0, 3).map((perf, index) => (
            <div
              key={perf.id}
              className="bg-[var(--bg-card)] border border-[var(--border)] rounded-2xl p-6 hover:border-[var(--fg)]/30 hover:shadow-lg transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center gap-4 mb-4">
                  {/* Dormant Black & White Avatar popping to color on card hover */}
                  <img
                    src={perf.image}
                    alt={perf.name}
                    className="w-14 h-14 rounded-xl object-cover dormant-image border border-[var(--border)] group-hover:scale-105 transition-all"
                  />
                  <div>
                    <span 
                      className="text-[10px] font-mono px-2 py-0.5 rounded font-bold border"
                      style={{ color: activeTheme.accent, borderColor: activeTheme.accent + '33', backgroundColor: activeTheme.accent + '15' }}
                    >
                      RANK #{index + 1}
                    </span>
                    <h3 className="text-base font-bold text-[var(--fg)] font-head mt-1">
                      {perf.name}
                    </h3>
                    <div className="text-xs text-[var(--fg-sub)]">
                      {perf.role}
                    </div>
                  </div>
                </div>

                <div className="text-xs font-semibold text-[var(--fg)] mb-2">
                  {perf.title}
                </div>
                <p className="text-xs text-[var(--fg-sub)] leading-relaxed mb-4">
                  {perf.achievement}
                </p>
              </div>

              <div className="pt-3 border-t border-[var(--border)] flex items-center justify-between text-xs font-mono text-[var(--fg-sub)]">
                <span>Citations: <strong className="text-[var(--fg)]">{perf.metrics.citations}</strong></span>
                <span className="font-bold" style={{ color: activeTheme.accent }}>{perf.tags[0]}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── FREQUENTLY ASKED QUESTIONS (Matching Mockup Accordion) ── */}
      <section className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24 z-10 relative">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[var(--fg)] font-head mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-base text-[var(--fg-sub)]">
            Understand our credit-based pricing and fellowship compute allocation.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = activeFaq === idx
            return (
              <div
                key={idx}
                className="rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] overflow-hidden transition-all shadow-xs"
              >
                <button
                  onClick={() => setActiveFaq(isOpen ? null : idx)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 font-semibold text-sm sm:text-base text-[var(--fg)] hover:text-rose-500 transition-colors cursor-pointer"
                >
                  <span>{faq.q}</span>
                  <div className="w-8 h-8 rounded-full bg-[var(--bg-muted)] flex items-center justify-center shrink-0 text-[var(--fg)]">
                    {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: 'easeOut' }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-6 sm:px-6 sm:pb-6 text-xs sm:text-sm text-[var(--fg-sub)] leading-relaxed border-t border-[var(--border)]/60 pt-4 font-sans">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>
      </section>

      {/* ── FINAL CTA SECTION: "Let's talk deployment" (Matching Mockup Bottom Right) ── */}
      <section className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 z-10 relative">
        <div className="rounded-3xl border border-[var(--border)] bg-[var(--bg-card)] p-10 sm:p-16 shadow-2xl relative overflow-hidden flex flex-col items-center text-center">
          
          {/* Sweeping Sunset Aurora Mesh on the bottom right of the card (Exact Mockup Detail) */}
          <div 
            className="absolute -bottom-24 -right-24 w-[480px] h-[360px] rounded-full blur-[110px] opacity-75 dark:opacity-40 pointer-events-none"
            style={{ backgroundImage: 'var(--accent-gradient)' }}
          />

          <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center">
            {/* Small Pill: `▸ Enterprise` */}
            <div className="inline-flex items-center gap-2 rounded-md bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 px-3 py-1 text-[11px] font-semibold mb-6 shadow-sm">
              <span className="text-[10px]">▸</span>
              <span>Enterprise & Fellowship</span>
            </div>

            {/* Headline: "Let's talk deployment" */}
            <h2 className="text-4xl sm:text-6xl font-extrabold text-[var(--fg)] tracking-tight mb-6 font-head">
              Let's talk deployment
            </h2>

            <p className="text-sm sm:text-base text-[var(--fg-sub)] leading-relaxed mb-8 max-w-xl">
              Custom workflows, dedicated compute, and enterprise infrastructure. The foundation for modern artificial intelligence.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5">
              <Link
                to="/interns"
                className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 font-bold text-xs sm:text-sm hover:opacity-90 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-md"
              >
                Get started free →
              </Link>
              <Link
                to="/projects"
                className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-white dark:bg-zinc-900 border border-[var(--border)] text-[var(--fg)] font-semibold text-xs sm:text-sm hover:bg-[var(--bg-muted)] transition-all shadow-xs"
              >
                Book a demo
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}
