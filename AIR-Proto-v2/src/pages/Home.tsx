import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import Marquee from 'react-fast-marquee'
import CountUpModule from 'react-countup'
import { ArrowRight, Sparkles, ArrowUpRight, Cpu, Eye, Compass, Layers, Award } from 'lucide-react'
import TechParticles from '../components/TechParticles'
import FloatingTechObjects from '../components/FloatingTechObjects'
import NeuralTerminal from '../components/NeuralTerminal'
import TiltCard from '../components/TiltCard'
import { useScrollCraft } from '../hooks/useScrollCraft'
import performersData from '../data/performers.json'

const CountUp = (CountUpModule as any).default || CountUpModule
const MarqueeModule = (Marquee as any).default || Marquee

const stats = [
  { label: 'Published Papers', value: 48, suffix: '+', sub: 'NeurIPS, CVPR, ACL, IEEE' },
  { label: 'Active Researchers', value: 120, suffix: '+', sub: 'Faculty, PhDs, Undergrads' },
  { label: 'Research Grants', value: 45, suffix: 'M', prefix: 'PKR ', sub: 'HEC, Ignite, Industry' },
  { label: 'GPU Accelerators', value: 16, suffix: ' SXM5', sub: 'NVIDIA H100 Supercluster' },
]

const pillars = [
  {
    num: '01',
    title: 'Foundational Language Models',
    icon: Layers,
    metric: '12.4B Param',
    desc: 'Pretraining and fine-tuning domain-specific LLMs with optimized FlashAttention-3 kernels, low-resource Urdu NLP benchmarks, and clinical RAG pipelines.',
    tags: ['Transformer', 'UrduBERT', 'Quantization', 'FlashAttention']
  },
  {
    num: '02',
    title: 'Computer Vision & Diagnostics',
    icon: Eye,
    metric: '94.2% AUC',
    desc: 'High-throughput visual perception systems for medical imaging diagnostics, chest pathology classification, and sub-pixel edge detection.',
    tags: ['Diffusion', 'Segmentation', 'Medical AI', 'YOLOv8']
  },
  {
    num: '03',
    title: 'Edge & Neuromorphic AI',
    icon: Cpu,
    metric: '60 FPS @ 5W',
    desc: 'Deploying sub-watt neural networks on ultra-low-power microcontrollers, Jetson Orin clusters, and custom FPGA tensor accelerator daughterboards.',
    tags: ['FPGA', 'Jetson Orin', 'TensorRT', 'Embedded C++']
  },
  {
    num: '04',
    title: 'Autonomous Drone Swarms',
    icon: Compass,
    metric: '98.2% Accuracy',
    desc: 'Distributed ROS2 navigation, multi-agent drone swarms, and multispectral aerial perception algorithms for precision crop monitoring.',
    tags: ['ROS2', 'UAV Swarms', 'LiDAR SLAM', 'Multispectral']
  },
]

const featuredProjects = [
  {
    id: 1,
    title: 'UrduLLM — Domain-Specialized Bilingual Foundation Model',
    category: 'R&D Flagship',
    chipColor: 'bg-[var(--primary)] text-black',
    metric: '12.4B Tokens Evaluated',
    desc: 'High-performance bilingual Urdu-English foundation model benchmarked on legal statutes, biomedical literature, and conversational vernacular.',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop',
    tech: ['PyTorch', 'H100 Cluster', 'SentencePiece', 'Deepspeed']
  },
  {
    id: 2,
    title: 'EdgeVision Traffic AI — Low-Latency Transit Intelligence',
    category: 'Funded Project',
    chipColor: 'bg-[var(--secondary)] text-white',
    metric: '60 FPS @ 5W Power',
    desc: 'Real-time urban perception model deployed at Karachi intersections for dynamic signal timing and anomalous incident localization.',
    image: 'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?q=80&w=800&auto=format&fit=crop',
    tech: ['TensorRT', 'Jetson AGX', 'ONNX', 'C++ Runtime']
  },
  {
    id: 3,
    title: 'AgriSwarm — Multi-UAV Autonomous Crop Collective',
    category: 'Undergraduate Excellence',
    chipColor: 'bg-amber-400 text-black',
    metric: '98.2% Localization',
    desc: 'Cooperative multi-drone fleet with multispectral imaging for autonomous crop stress identification and precision pesticide dispersal.',
    image: 'https://images.unsplash.com/photo-1527977966376-1c8408f9f108?q=80&w=800&auto=format&fit=crop',
    tech: ['PX4 Autopilot', 'ROS2 Humble', 'Thermal Vision', 'SLAM']
  },
]

const partners = [
  { name: 'Google DeepMind', desc: 'Academic Research Grantee' },
  { name: 'Stanford HAI', desc: 'Clinical AI Advisory' },
  { name: 'HEC Pakistan', desc: 'National Research Program' },
  { name: 'Ignite NCBC', desc: 'National Center of Big Data' },
  { name: 'Meta AI', desc: 'PyTorch Foundation Partner' },
  { name: 'OpenAI', desc: 'API Research Access' },
  { name: 'Hugging Face', desc: 'Open Source Model Hub' },
  { name: 'MIT CSAIL', desc: 'Alumni Doctoral Exchange' }
]

export default function Home() {
  const sc = useScrollCraft()

  useEffect(() => {
    sc.reveal('[data-sc-reveal="heading"]', {
      direction: 'up',
      distance: '32px',
      duration: 700,
      ease: 'cubicOut',
    })

    sc.reveal('[data-sc-reveal="card"]', {
      direction: 'up',
      distance: '36px',
      duration: 650,
      ease: 'quartOut',
      threshold: 0.08,
    })
  }, [sc])

  return (
    <div className="relative w-full flex flex-col items-center overflow-hidden">
      {/* ── HERO SECTION WITH JS PARTICLES LIBRARY & 3D TERMINAL ── */}
      <section className="relative w-full min-h-[92vh] flex flex-col items-center justify-center text-center px-4 sm:px-6 lg:px-8 pt-24 pb-20 overflow-hidden">
        {/* Subtle grid pattern background (Ali's aesthetic) */}
        <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none z-0" />

        {/* Official JavaScript Particles Engine Constellation Network */}
        <TechParticles id="hero-particles" />

        {/* Floating Holographic 3D Tech Objects */}
        <FloatingTechObjects />

        {/* Ambient Radial Lighting Mask */}
        <div className="absolute inset-0 bg-radial from-transparent via-[var(--bg)]/50 to-[var(--bg)] pointer-events-none z-0" />

        {/* Main Hero Header */}
        <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center">
          {/* Status Badge */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-[var(--primary)]/30 bg-[var(--primary)]/10 px-4 py-1.5 text-xs font-mono font-medium text-[var(--primary)] mb-8 shadow-sm backdrop-blur-md"
          >
            <span className="w-2 h-2 rounded-full bg-[var(--primary)] animate-ping" />
            <span>PIONEERING AI RESEARCH // NED UNIVERSITY</span>
          </motion.div>

          {/* Epic Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-[-0.04em] leading-[1.05] mb-6 font-head"
          >
            Artificial Intelligence <br />
            <span className="text-gradient-primary">Research Laboratory</span>
          </motion.h1>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg sm:text-xl text-[var(--fg-sub)] max-w-3xl mx-auto mb-10 leading-relaxed font-sans"
          >
            Building foundational language models, real-time edge perception, and autonomous multi-agent robotics at NED University. We bridge the gap between theoretical rigor and deployed computational breakthrough.
          </motion.p>

          {/* Action CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto mb-16"
          >
            <Link
              to="/projects"
              className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[var(--primary)] text-black font-mono text-sm font-bold flex items-center justify-center gap-2 hover:shadow-xl hover:shadow-[var(--primary)]/25 hover:scale-105 active:scale-95 transition-all"
            >
              Explore Breakthroughs <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/team"
              className="w-full sm:w-auto px-8 py-3.5 rounded-full border border-[var(--border)] bg-[var(--bg-card)]/80 backdrop-blur-md text-[var(--fg)] font-mono text-sm font-semibold flex items-center justify-center gap-2 hover:border-[var(--primary)] hover:text-[var(--primary)] hover:scale-105 active:scale-95 transition-all"
            >
              Meet Research Faculty
            </Link>
          </motion.div>
        </div>

        {/* 3D TILT INTERACTIVE LIVE NEURAL TERMINAL & LOSS CURVE SIMULATOR */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="w-full relative z-10 px-2 sm:px-4"
        >
          <NeuralTerminal />
        </motion.div>
      </section>

      {/* ── 3D TILT TELEMETRY METRICS STRIP ── */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((s, i) => (
            <TiltCard key={i} tiltMaxAngleX={10} tiltMaxAngleY={10} scale={1.03}>
              <div
                data-sc-reveal="card"
                className="h-full rounded-2xl border border-[var(--border)] bg-[var(--bg-card)]/70 backdrop-blur-xl p-6 flex flex-col justify-between hover:border-[var(--primary)] hover:shadow-xl hover:shadow-[var(--primary)]/10 transition-all duration-300 group"
              >
                <div>
                  <div className="text-xs font-mono text-[var(--fg-sub)] uppercase tracking-wider mb-2 flex items-center justify-between">
                    <span>Telemetry [{i + 1}]</span>
                    <Sparkles className="w-3.5 h-3.5 text-[var(--primary)] opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <div className="text-3xl sm:text-4xl font-extrabold font-mono text-[var(--fg)] group-hover:text-[var(--primary)] transition-colors">
                    {s.prefix}
                    <CountUp end={s.value} duration={2.5} separator="," />
                    {s.suffix}
                  </div>
                  <h3 className="text-sm font-bold font-head mt-2">{s.label}</h3>
                </div>
                <div className="mt-4 pt-3 border-t border-[var(--border)] text-xs text-[var(--fg-sub)] font-mono">
                  {s.sub}
                </div>
              </div>
            </TiltCard>
          ))}
        </div>
      </section>

      {/* ── CORE RESEARCH VERTICALS (PILLARS) WITH 3D TILT ── */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
        <div className="text-left mb-14" data-sc-reveal="heading">
          <span className="font-mono text-xs uppercase tracking-widest text-[var(--primary)] font-bold bg-[var(--primary)]/10 px-3.5 py-1.5 rounded-full border border-[var(--primary)]/20 inline-flex items-center gap-1.5 mb-4">
            <Cpu className="w-3.5 h-3.5" /> [STRATEGIC RESEARCH VERTICALS]
          </span>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight font-head">
            Core Scientific Domains
          </h2>
          <p className="mt-3 text-lg text-[var(--fg-sub)] max-w-2xl font-sans">
            Our multi-disciplinary research initiatives focus on high-impact algorithmic innovation and real-world embedded deployment.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {pillars.map((p, idx) => {
            const Icon = p.icon
            return (
              <TiltCard key={idx} tiltMaxAngleX={8} tiltMaxAngleY={8} scale={1.02}>
                <div
                  data-sc-reveal="card"
                  className="h-full rounded-2xl border border-[var(--border)] bg-[var(--bg-card)]/80 backdrop-blur-xl p-8 flex flex-col justify-between hover:border-[var(--primary)] hover:shadow-2xl hover:shadow-[var(--primary)]/10 transition-all duration-400 group relative overflow-hidden"
                >
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-12 h-12 rounded-xl bg-[var(--primary)]/15 border border-[var(--primary)]/30 flex items-center justify-center text-[var(--primary)] group-hover:scale-110 transition-transform">
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="font-mono text-sm font-bold text-[var(--primary)] px-3 py-1 rounded-full bg-[var(--primary)]/10 border border-[var(--primary)]/20">
                        {p.metric}
                      </span>
                    </div>

                    <div className="font-mono text-xs text-[var(--fg-sub)] mb-1">VERTICAL {p.num}</div>
                    <h3 className="text-2xl font-bold font-head mb-3 group-hover:text-[var(--primary)] transition-colors">
                      {p.title}
                    </h3>
                    <p className="text-sm text-[var(--fg-sub)] leading-relaxed mb-6">
                      {p.desc}
                    </p>
                  </div>

                  <div className="relative z-10 pt-4 border-t border-[var(--border)] flex flex-wrap gap-2">
                    {p.tags.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-2.5 py-1 rounded-md text-[11px] font-mono bg-[var(--bg-muted)] border border-[var(--border)] text-[var(--fg-sub)]"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </TiltCard>
            )
          })}
        </div>
      </section>

      {/* ── FLAGSHIP PROJECTS SHOWCASE (DORMANT B&W IMAGES -> COLOR POP ON HOVER) ── */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14" data-sc-reveal="heading">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-[var(--primary)] font-bold bg-[var(--primary)]/10 px-3.5 py-1.5 rounded-full border border-[var(--primary)]/20 inline-flex items-center gap-1.5 mb-4">
              <Sparkles className="w-3.5 h-3.5" /> [FLAGSHIP R&D INITIATIVES]
            </span>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight font-head">
              Featured Breakthroughs
            </h2>
            <p className="mt-3 text-lg text-[var(--fg-sub)] max-w-2xl font-sans">
              Deployed models and systems engineered in collaboration with national agencies and global academic partners.
            </p>
          </div>

          <Link
            to="/projects"
            className="mt-6 md:mt-0 font-mono text-xs font-bold text-[var(--primary)] hover:underline inline-flex items-center gap-1.5"
          >
            Explore All 12 Projects <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {featuredProjects.map(proj => (
            <TiltCard key={proj.id} tiltMaxAngleX={8} tiltMaxAngleY={8} scale={1.02}>
              <div
                data-sc-reveal="card"
                className="h-full rounded-2xl border border-[var(--border)] bg-[var(--bg-card)]/80 backdrop-blur-xl overflow-hidden flex flex-col justify-between hover:border-[var(--primary)] hover:shadow-2xl hover:shadow-[var(--primary)]/15 transition-all duration-400 group"
              >
                <div>
                  {/* DORMANT IMAGE CONTAINER: Black & White dormant, pops with vivid color on hover! */}
                  <div className="relative h-56 w-full overflow-hidden bg-black/40">
                    <img
                      src={proj.image}
                      alt={proj.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    
                    {/* Badge Chips */}
                    <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                      <span className={`px-2.5 py-1 rounded-md text-[10px] font-mono font-bold ${proj.chipColor}`}>
                        {proj.category}
                      </span>
                      <span className="px-2.5 py-1 rounded-md text-[10px] font-mono font-bold bg-black/75 text-white backdrop-blur-sm border border-white/20">
                        {proj.metric}
                      </span>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold font-head mb-3 group-hover:text-[var(--primary)] transition-colors">
                      {proj.title}
                    </h3>
                    <p className="text-sm text-[var(--fg-sub)] leading-relaxed mb-6">
                      {proj.desc}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0 border-t border-[var(--border)]/50 mt-auto">
                  <div className="flex flex-wrap gap-1.5 pt-4 mb-4">
                    {proj.tech.map((t, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded text-[10px] font-mono bg-[var(--bg-muted)] text-[var(--fg-sub)] border border-[var(--border)]"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <Link
                    to="/projects"
                    className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-[var(--primary)] group-hover:underline"
                  >
                    View Project Specification <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </TiltCard>
          ))}
        </div>
      </section>

      {/* ── HIGH PERFORMERS OF THE MONTH SPOTLIGHT (3D TILT + B&W TO COLOR POP) ── */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
        <div className="rounded-3xl border border-[var(--border)] bg-gradient-to-b from-[var(--bg-card)]/90 to-[var(--bg-muted)]/70 backdrop-blur-2xl p-8 sm:p-12 relative overflow-hidden">
          {/* Subtle grid background */}
          <div className="absolute inset-0 bg-grid-pattern opacity-25 pointer-events-none" />

          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 relative z-10">
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-amber-400 font-bold bg-amber-400/10 px-3.5 py-1.5 rounded-full border border-amber-400/20 inline-flex items-center gap-1.5 mb-4">
                <Award className="w-3.5 h-3.5" /> [HONOR ROLL & CITATION LEADERS]
              </span>
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight font-head">
                High Performers Spotlight
              </h2>
              <p className="mt-2 text-base text-[var(--fg-sub)] max-w-xl">
                Recognizing researchers whose breakthroughs, publications, and code contributions made outstanding impacts this semester.
              </p>
            </div>

            <Link
              to="/performers"
              className="mt-4 md:mt-0 font-mono text-xs font-bold text-[var(--primary)] hover:underline inline-flex items-center gap-1.5"
            >
              View Full Hall of Fame <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
            {performersData.slice(0, 3).map((perf, index) => (
              <TiltCard key={perf.id} tiltMaxAngleX={8} tiltMaxAngleY={8} scale={1.02}>
                <div className="h-full rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-6 flex flex-col justify-between hover:border-amber-400/60 hover:shadow-xl transition-all duration-300 group">
                  <div>
                    <div className="flex items-center gap-4 mb-4">
                      {/* Dormant B&W Portrait -> Pops on card hover! */}
                      <div className="relative w-16 h-16 rounded-xl overflow-hidden shrink-0 border border-[var(--border)] group-hover:border-amber-400 transition-colors">
                        <img
                          src={perf.image}
                          alt={perf.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-400/15 text-amber-400 border border-amber-400/30">
                            Rank #{index + 1}
                          </span>
                          <span className="text-[10px] font-mono text-[var(--fg-sub)]">{perf.month}</span>
                        </div>
                        <h4 className="text-lg font-bold font-head group-hover:text-amber-400 transition-colors mt-1">
                          {perf.name}
                        </h4>
                        <p className="text-xs text-[var(--fg-sub)] font-mono">{perf.role}</p>
                      </div>
                    </div>

                    <h5 className="text-sm font-bold text-[var(--fg)] mb-2">{perf.title}</h5>
                    <p className="text-xs text-[var(--fg-sub)] leading-relaxed mb-4">{perf.achievement}</p>
                  </div>

                  <div className="pt-3 border-t border-[var(--border)] flex items-center justify-between font-mono text-xs">
                    <span className="text-[var(--fg-sub)]">Citations: <strong className="text-[var(--fg)]">{perf.metrics.citations}</strong></span>
                    <span className="text-amber-400 font-bold">Featured Researcher</span>
                  </div>
                </div>
              </TiltCard>
            ))}
          </div>
        </div>
      </section>

      {/* ── GLOBAL PARTNERS MARQUEE ── */}
      <section className="w-full py-16 border-y border-[var(--border)] bg-[var(--bg-card)]/50 backdrop-blur-md relative z-10 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 mb-6 text-center">
          <span className="font-mono text-xs uppercase tracking-widest text-[var(--fg-sub)]">
            Global Academic & Industry Ecosystem
          </span>
        </div>

        <MarqueeModule speed={35} gradient={false} pauseOnHover={true}>
          <div className="flex items-center gap-10 py-2 px-4">
            {partners.map((partner, i) => (
              <div
                key={i}
                className="flex items-center gap-3 px-5 py-2.5 rounded-xl border border-[var(--border)] bg-[var(--bg)] hover:border-[var(--primary)] transition-all cursor-pointer group"
              >
                <span className="w-2 h-2 rounded-full bg-[var(--primary)] group-hover:scale-125 transition-transform" />
                <div>
                  <div className="text-sm font-bold font-mono text-[var(--fg)] group-hover:text-[var(--primary)] transition-colors">
                    {partner.name}
                  </div>
                  <div className="text-[10px] text-[var(--fg-sub)] font-mono">{partner.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </MarqueeModule>
      </section>

      {/* ── CALL TO ACTION / LAB COLLABORATION ── */}
      <section className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-24 text-center relative z-10">
        <TiltCard tiltMaxAngleX={6} tiltMaxAngleY={6} scale={1.01}>
          <div className="rounded-3xl border border-[var(--border)] bg-gradient-to-br from-[var(--bg-card)] via-[var(--bg-card)]/90 to-[var(--primary)]/10 backdrop-blur-2xl p-10 sm:p-16 relative overflow-hidden">
            <span className="font-mono text-xs uppercase tracking-widest text-[var(--primary)] font-bold mb-4 inline-block">
              [COLLABORATION & ADMISSIONS]
            </span>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight font-head mb-4">
              Shape the Future of AI with Us
            </h2>
            <p className="text-base sm:text-lg text-[var(--fg-sub)] max-w-2xl mx-auto mb-8 font-sans leading-relaxed">
              We are constantly seeking brilliant graduate students, ambitious undergraduate scholars, and visionary industry partners.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/interns"
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-[var(--primary)] text-black font-mono text-sm font-bold hover:shadow-xl hover:shadow-[var(--primary)]/30 transition-all"
              >
                Apply for Research Internships
              </Link>
              <Link
                to="/collaborations"
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl border border-[var(--border)] bg-[var(--bg)] text-[var(--fg)] font-mono text-sm font-bold hover:border-[var(--primary)] transition-colors"
              >
                Partner with the Lab
              </Link>
            </div>
          </div>
        </TiltCard>
      </section>
    </div>
  )
}
