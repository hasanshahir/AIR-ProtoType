import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import Marquee from 'react-fast-marquee'
import CountUpModule from 'react-countup'
import Tilt from 'react-parallax-tilt'
import { ArrowRight, Brain, Sparkles, ArrowUpRight, Cpu, Eye, Compass, Award } from 'lucide-react'
import TechParticles from '../components/TechParticles'
import FloatingTechObjects from '../components/FloatingTechObjects'
import NeuralTerminal from '../components/NeuralTerminal'
import TiltCard from '../components/TiltCard'
import { useScrollCraft } from '../hooks/useScrollCraft'
import performersData from '../data/performers.json'

const CountUp = (CountUpModule as any).default || CountUpModule
const MarqueeModule = (Marquee as any).default || Marquee

const stats = [
  { label: 'Publications', value: 48, suffix: '+' },
  { label: 'Lab Members', value: 120, suffix: '+' },
  { label: 'Active Grants', value: 45, prefix: 'PKR ', suffix: 'M' },
  { label: 'H100 Supercluster', value: 16, suffix: ' SXM5' },
]

const logos = [
  'Google DeepMind', 'OpenAI', 'Meta AI', 'Hugging Face', 'Stanford HAI', 'MIT CSAIL', 'NVIDIA Research', 'HEC Pakistan'
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

export default function Home() {
  const sc = useScrollCraft()

  useEffect(() => {
    sc.reveal('[data-sc-reveal="heading"]', {
      direction: 'up',
      distance: '28px',
      duration: 650,
      ease: 'cubicOut',
    })

    sc.reveal('[data-sc-reveal="card"]', {
      direction: 'up',
      distance: '32px',
      duration: 600,
      ease: 'quartOut',
      threshold: 0.08,
    })
  }, [sc])

  return (
    <div className="relative w-full flex flex-col items-center overflow-hidden">
      {/* ── BACKGROUND HERO PARTICLES LAYER ── */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <TechParticles id="hero-particles" />
        <FloatingTechObjects />
      </div>

      {/* ── HERO SECTION (Ali's Airy, Mintlify Aesthetic) ── */}
      <section className="w-full max-w-7xl mx-auto flex flex-col items-center text-center px-4 sm:px-6 lg:px-8 pt-28 pb-20 z-10 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center"
        >
          {/* Pill Badge (Ali's exact style) */}
          <div className="inline-flex items-center rounded-full border border-[var(--border)] bg-[var(--bg-card)]/80 backdrop-blur-md px-4 py-1.5 text-xs sm:text-sm font-medium mb-6 shadow-sm">
            <span className="flex h-2 w-2 rounded-full bg-[var(--primary)] mr-2 animate-ping" />
            <span>Pioneering Intelligence // NED University</span>
          </div>

          {/* Main Hero Headline */}
          <h1 className="text-5xl sm:text-7xl md:text-8xl font-black tracking-[-0.03em] max-w-5xl leading-[1.08] mb-6 font-head text-[var(--fg)]">
            Artificial Intelligence <br className="hidden md:block" />
            <span className="text-[var(--primary)]">Research Laboratory</span>
          </h1>

          {/* Subtitle */}
          <p className="mt-2 text-base sm:text-lg md:text-xl text-[var(--fg-sub)] max-w-2xl mx-auto mb-10 leading-relaxed font-sans">
            Building next-generation models and intelligent systems at NED University. We bridge the gap between theoretical research and real-world computational impact.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
            <Link
              to="/about"
              className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[var(--primary)] text-black font-mono text-sm font-bold flex items-center justify-center gap-2 hover:shadow-lg hover:scale-105 active:scale-95 transition-all"
            >
              Discover Our Mission <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
            <Link
              to="/projects"
              className="w-full sm:w-auto px-8 py-3.5 rounded-full border border-[var(--border)] bg-[var(--bg-card)]/80 backdrop-blur-md text-[var(--fg)] font-mono text-sm font-semibold flex items-center justify-center gap-2 hover:border-[var(--primary)] hover:text-[var(--primary)] hover:scale-105 active:scale-95 transition-all"
            >
              View Projects
            </Link>
          </div>
        </motion.div>

        {/* ── STATS STRIP (Ali's 4-metric strip directly below buttons) ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mt-16 flex flex-wrap justify-center items-center gap-8 md:gap-16 text-center border-y py-6 w-full max-w-4xl border-[var(--border)] bg-[var(--bg-card)]/60 backdrop-blur-md rounded-xl px-4"
        >
          {stats.map((s, idx) => (
            <div key={idx} className="flex items-center gap-8 md:gap-16">
              <div>
                <div className="text-3xl md:text-4xl font-bold font-mono text-[var(--primary)]">
                  {s.prefix}
                  <CountUp end={s.value} duration={2.5} />
                  {s.suffix}
                </div>
                <div className="text-xs text-[var(--fg-sub)] font-medium uppercase tracking-wider mt-1 font-mono">
                  {s.label}
                </div>
              </div>
              {idx < stats.length - 1 && (
                <div className="hidden sm:block w-px h-10 bg-[var(--border)]" />
              )}
            </div>
          ))}
        </motion.div>

        {/* ── INTERACTIVE MAC-STYLE CODE / LIVE NEURAL TELEMETRY WINDOW ── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.7 }}
          className="mt-20 w-full max-w-5xl"
        >
          <NeuralTerminal />
        </motion.div>
      </section>

      {/* ── MARQUEE SECTION (Ali's exact style) ── */}
      <section className="w-full border-y border-[var(--border)] bg-[var(--bg-muted)]/40 py-10 z-10 overflow-hidden">
        <div className="text-center text-xs font-mono font-medium text-[var(--fg-sub)] mb-6 uppercase tracking-widest">
          Industry & Academic Collaborations
        </div>
        <MarqueeModule gradient={true} gradientColor="var(--bg)" gradientWidth={120} speed={35} className="py-2">
          {logos.map((logo, idx) => (
            <div
              key={idx}
              className="mx-10 text-lg md:text-xl font-bold text-[var(--fg-sub)] hover:text-[var(--primary)] transition-colors cursor-default font-mono"
            >
              {logo}
            </div>
          ))}
        </MarqueeModule>
      </section>

      {/* ── BENTO GRID RESEARCH AREAS (Ali's 3D Tilt Bento Grid) ── */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28 z-10">
        <div className="text-center mb-16" data-sc-reveal="heading">
          <span className="font-mono text-xs uppercase tracking-widest text-[var(--primary)] font-bold bg-[var(--primary)]/10 px-3 py-1 rounded-full border border-[var(--primary)]/20 inline-block mb-3">
            Core Scientific Domains
          </span>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight font-head">
            Pioneering Research Areas
          </h2>
          <p className="mt-3 text-base text-[var(--fg-sub)] max-w-xl mx-auto">
            Exploring algorithmic innovation, real-world deployment, and open-source models.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[260px]">
          {/* Block 1: Large Featured (Foundational Models) */}
          <Tilt tiltMaxAngleX={6} tiltMaxAngleY={6} scale={1.02} transitionSpeed={2500} className="md:col-span-2 md:row-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5 }}
              className="h-full w-full rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-8 flex flex-col justify-end relative overflow-hidden group hover:border-[var(--primary)] hover:shadow-2xl transition-all duration-300"
            >
              <div className="absolute top-8 right-8 text-[var(--primary)] opacity-60 group-hover:opacity-100 transition-opacity">
                <Brain className="w-14 h-14 group-hover:scale-110 transition-transform duration-300" />
              </div>
              <div className="absolute top-0 right-0 w-80 h-80 bg-[var(--primary)]/5 rounded-full blur-3xl group-hover:bg-[var(--primary)]/15 transition-colors duration-500" />
              <span className="font-mono text-xs text-[var(--primary)] font-bold mb-1">VERTICAL 01 // 12.4B PARAM</span>
              <h3 className="text-2xl md:text-3xl font-bold font-head mb-2 group-hover:text-[var(--primary)] transition-colors">
                Foundational Language Models
              </h3>
              <p className="text-[var(--fg-sub)] text-sm md:text-base max-w-lg leading-relaxed">
                Pretraining and fine-tuning domain-specific LLMs with optimized FlashAttention-3 kernels, low-resource Urdu NLP benchmarks, and clinical RAG pipelines.
              </p>
              <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-[var(--border)]">
                {['Transformer', 'UrduBERT', 'Quantization', 'FlashAttention'].map((tag, i) => (
                  <span key={i} className="px-2.5 py-1 rounded text-xs font-mono bg-[var(--bg-muted)] text-[var(--fg-sub)] border border-[var(--border)]">
                    #{tag}
                  </span>
                ))}
              </div>
            </motion.div>
          </Tilt>

          {/* Block 2: Computer Vision */}
          <Tilt tiltMaxAngleX={8} tiltMaxAngleY={8} scale={1.03} transitionSpeed={2500}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="h-full w-full rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-8 flex flex-col justify-end relative overflow-hidden group hover:border-[var(--primary)] hover:shadow-xl transition-all duration-300"
            >
              <div className="absolute top-6 right-6 text-[var(--primary)] opacity-60 group-hover:opacity-100 transition-opacity">
                <Eye className="w-8 h-8 group-hover:scale-110 transition-transform duration-300" />
              </div>
              <span className="font-mono text-[10px] text-[var(--primary)] font-bold mb-1">94.2% AUC</span>
              <h3 className="text-xl font-bold font-head mb-1">Computer Vision</h3>
              <p className="text-[var(--fg-sub)] text-xs leading-relaxed">Medical diagnostics and real-time sub-pixel segmentation.</p>
            </motion.div>
          </Tilt>

          {/* Block 3: Edge & Neuromorphic */}
          <Tilt tiltMaxAngleX={8} tiltMaxAngleY={8} scale={1.03} transitionSpeed={2500}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="h-full w-full rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-8 flex flex-col justify-end relative overflow-hidden group hover:border-[var(--primary)] hover:shadow-xl transition-all duration-300"
            >
              <div className="absolute top-6 right-6 text-[var(--primary)] opacity-60 group-hover:opacity-100 transition-opacity">
                <Cpu className="w-8 h-8 group-hover:scale-110 transition-transform duration-300" />
              </div>
              <span className="font-mono text-[10px] text-[var(--primary)] font-bold mb-1">60 FPS @ 5W</span>
              <h3 className="text-xl font-bold font-head mb-1">Edge & FPGA AI</h3>
              <p className="text-[var(--fg-sub)] text-xs leading-relaxed">Sub-watt on-device inference with Jetson Orin & custom accelerators.</p>
            </motion.div>
          </Tilt>

          {/* Block 4: Autonomous Drones */}
          <Tilt tiltMaxAngleX={6} tiltMaxAngleY={6} scale={1.02} transitionSpeed={2500} className="md:col-span-3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="h-full w-full rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-8 flex flex-col justify-end relative overflow-hidden group hover:border-[var(--primary)] hover:shadow-xl transition-all duration-300"
            >
              <div className="absolute top-6 right-8 text-[var(--primary)] opacity-60 group-hover:opacity-100 transition-opacity">
                <Compass className="w-10 h-10 group-hover:scale-110 transition-transform duration-300" />
              </div>
              <span className="font-mono text-xs text-[var(--primary)] font-bold mb-1">AUTONOMOUS MULTI-AGENT SWARMS</span>
              <h3 className="text-2xl font-bold font-head mb-2">Aerial Robotics & LiDAR Perception</h3>
              <p className="text-[var(--fg-sub)] text-sm max-w-xl leading-relaxed">
                Distributed ROS2 navigation, multi-agent cooperative swarms, and multispectral perception algorithms for precision monitoring.
              </p>
            </motion.div>
          </Tilt>
        </div>
      </section>

      {/* ── FLAGSHIP PROJECTS SHOWCASE (Dormant B&W Images -> Color Pop on Hover) ── */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14" data-sc-reveal="heading">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-[var(--primary)] font-bold bg-[var(--primary)]/10 px-3.5 py-1.5 rounded-full border border-[var(--primary)]/20 inline-flex items-center gap-1.5 mb-4">
              <Sparkles className="w-3.5 h-3.5" /> [FLAGSHIP R&D INITIATIVES]
            </span>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight font-head">
              Featured Breakthroughs
            </h2>
            <p className="mt-3 text-base text-[var(--fg-sub)] max-w-2xl font-sans">
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
                className="h-full rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] overflow-hidden flex flex-col justify-between hover:border-[var(--primary)] hover:shadow-2xl transition-all duration-400 group"
              >
                <div>
                  {/* Dormant Image Container: B&W dormant, color pop on hover! */}
                  <div className="relative h-56 w-full overflow-hidden bg-black/10">
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

                <div className="p-6 pt-0 border-t border-[var(--border)] mt-auto">
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

      {/* ── HIGH PERFORMERS SPOTLIGHT (3D Tilt + B&W to Color Pop) ── */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 z-10">
        <div className="rounded-3xl border border-[var(--border)] bg-[var(--bg-card)] p-8 sm:p-12 relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none" />

          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 relative z-10">
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-amber-500 font-bold bg-amber-500/10 px-3.5 py-1.5 rounded-full border border-amber-500/20 inline-flex items-center gap-1.5 mb-4">
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
                <div className="h-full rounded-2xl border border-[var(--border)] bg-[var(--bg)] p-6 flex flex-col justify-between hover:border-amber-400 hover:shadow-xl transition-all duration-300 group">
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
                          <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-400/15 text-amber-500 border border-amber-400/30">
                            Rank #{index + 1}
                          </span>
                          <span className="text-[10px] font-mono text-[var(--fg-sub)]">{perf.month}</span>
                        </div>
                        <h4 className="text-lg font-bold font-head group-hover:text-amber-500 transition-colors mt-1">
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
                    <span className="text-amber-500 font-bold">Featured Researcher</span>
                  </div>
                </div>
              </TiltCard>
            ))}
          </div>
        </div>
      </section>

      {/* ── CALL TO ACTION SECTION ── */}
      <section className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-24 text-center z-10">
        <div className="rounded-3xl border border-[var(--border)] bg-gradient-to-br from-[var(--bg-card)] via-[var(--bg-card)] to-[var(--primary)]/10 p-10 sm:p-16 relative overflow-hidden shadow-xl">
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
              className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[var(--primary)] text-black font-mono text-sm font-bold hover:shadow-xl hover:scale-105 transition-all"
            >
              Apply for Research Internships
            </Link>
            <Link
              to="/collaborations"
              className="w-full sm:w-auto px-8 py-3.5 rounded-full border border-[var(--border)] bg-[var(--bg)] text-[var(--fg)] font-mono text-sm font-bold hover:border-[var(--primary)] transition-colors"
            >
              Partner with the Lab
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
