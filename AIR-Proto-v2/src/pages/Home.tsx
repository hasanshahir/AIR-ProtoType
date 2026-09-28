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
  Sparkles, 
  ShieldCheck,
  Send
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
  'Google DeepMind', 'OpenAI', 'Meta AI', 'Hugging Face', 'Stanford HAI', 'MIT CSAIL', 'NVIDIA Research', 'HEC Pakistan'
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
    q: 'How can students or researchers apply for the AIR Lab fellowship?',
    a: 'We evaluate candidates biannually for Summer and Fall cohorts. Applicants undergo a technical assessment in linear algebra, deep learning architectures (PyTorch), and systems engineering. Selected fellows receive fully funded compute access, stipend, and direct publication mentorship.'
  },
  {
    q: 'What compute infrastructure is available to research fellows?',
    a: 'AIR Lab operates a dedicated 16x NVIDIA H100 SXM5 supercomputing cluster interconnected with 800Gb/s Quantum-2 InfiniBand fabric, yielding over 1.2 PFLOPS of FP8 tensor compute. Additionally, researchers utilize edge Jetson Orin testbeds and multi-rotor UAV swarms.'
  },
  {
    q: 'Are the trained models (such as UrduLLM) and datasets open-source?',
    a: 'Yes. In accordance with our academic charter, validated model checkpoints, tokenizer configurations, and ethically vetted benchmarks are hosted publicly on Hugging Face under permissive open-weights licenses for the global research community.'
  },
  {
    q: 'How do industry partners and enterprises collaborate with AIR Lab?',
    a: 'Enterprises sponsor dedicated applied research tracks (e.g. edge computer vision, automated clinical diagnosis, bilingual conversational AI) with co-authored patents, tailored model fine-tuning, and direct integration support.'
  },
  {
    q: 'Can undergraduate scholars publish first-author peer-reviewed papers?',
    a: 'Over 40% of our published papers at IEEE, CVPR, and NeurIPS workshops feature undergraduate scholars as lead or co-first authors under faculty supervision.'
  }
]

export default function Home() {
  const { activeTheme } = useTheme()
  const sc = useScrollCraft()
  const [activeFaq, setActiveFaq] = useState<number | null>(0)
  const [activeTab, setActiveTab] = useState<'training' | 'loss' | 'cluster'>('loss')
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
    <div className="relative w-full flex flex-col items-center overflow-hidden bg-[var(--bg)] text-[var(--fg)] transition-colors duration-300">
      
      {/* ── RICH AURORA MESH BACKGROUND BLURS (Inspiration Design) ── */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[640px] overflow-hidden pointer-events-none -z-0">
        <div 
          className="absolute -top-32 left-1/6 w-[620px] h-[360px] rounded-full blur-[130px] opacity-75 dark:opacity-40 animate-pulse"
          style={{ backgroundColor: 'var(--glow-1)', animationDuration: '9s' }}
        />
        <div 
          className="absolute -top-20 right-1/6 w-[540px] h-[340px] rounded-full blur-[130px] opacity-75 dark:opacity-40 animate-pulse"
          style={{ backgroundColor: 'var(--glow-2)', animationDuration: '11s' }}
        />
        <div 
          className="absolute top-10 left-1/3 w-[680px] h-[280px] rounded-full blur-[140px] opacity-65 dark:opacity-35"
          style={{ backgroundColor: 'var(--glow-3)' }}
        />
        <div 
          className="absolute top-44 left-1/4 w-[480px] h-[260px] rounded-full blur-[120px] opacity-50 dark:opacity-30"
          style={{ backgroundColor: 'var(--glow-4)' }}
        />
      </div>

      {/* ── BACKGROUND JAVASCRIPT PARTICLES CONSTELLATION ── */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-45 dark:opacity-55">
        <TechParticles id="ambient-particles" />
      </div>

      {/* ── HERO SECTION: LEFT-ALIGNED AS SPECIFIED BY USER ── */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-20 pb-20 z-10 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* ── LEFT COLUMN: TYPOGRAPHY & VALUE PROPOSITION (Strictly Left-Aligned) ── */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            
            {/* Pill Badge (Left-Aligned) */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-2 rounded-full border border-black/10 dark:border-white/10 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md px-3.5 py-1.5 text-xs font-semibold mb-6 shadow-xs text-[var(--fg)]"
            >
              <span className="flex h-2 w-2 rounded-full animate-ping" style={{ backgroundColor: activeTheme.accent }} />
              <span>For Enterprise & Research // NED University</span>
            </motion.div>

            {/* Main Headline (Strictly Left-Aligned) */}
            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-[-0.035em] text-[var(--fg)] leading-[1.08] mb-6 font-head text-left"
            >
              Extend your capability with a <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-950 via-zinc-800 to-zinc-600 dark:from-white dark:via-zinc-200 dark:to-zinc-400">
                full team of AI experts.
              </span>
            </motion.h1>

            {/* Gradient Subtitle / Kicker (Strictly Left-Aligned — Inspiration Style) */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-base sm:text-lg font-semibold text-transparent bg-clip-text mb-4 text-left leading-snug"
              style={{ backgroundImage: 'var(--accent-gradient)' }}
            >
              Specialized neural architectures for every domain. Ship faster, prototype instantly, discover deeper. Multiply your research workforce without adding headcount.
            </motion.p>

            {/* Narrative Description (Left-Aligned) */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="text-sm sm:text-base text-[var(--fg-sub)] max-w-xl mb-8 leading-relaxed text-left font-sans"
            >
              The Artificial Intelligence Research Laboratory (AIR Lab) at NED University bridges deep mathematical theory with real-world physical and digital deployment—pioneering bilingual foundation models, autonomous robotics swarms, and low-latency edge perception.
            </motion.p>

            {/* CTA Buttons (Strictly Left-Aligned) */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center gap-3.5 w-full sm:w-auto mb-8"
            >
              <Link
                to="/about"
                className="w-full sm:w-auto px-7 py-3 rounded-full bg-[var(--primary)] text-[var(--primary-fg)] font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 hover:opacity-90 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-md cursor-pointer"
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

            {/* Trust Badges Checkmarks Row (Inspiration style: ✓ SOC 2 ready...) */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-[var(--fg-sub)] font-medium pt-4 border-t border-black/5 dark:border-white/10"
            >
              <div className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 stroke-[3]" />
                <span>48+ IEEE & CVF Papers</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 stroke-[3]" />
                <span>16x NVIDIA H100 SXM5</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 stroke-[3]" />
                <span>PKR 45M Active Grants</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 stroke-[3]" />
                <span>120+ Active Fellows</span>
              </div>
            </motion.div>

          </div>

          {/* ── RIGHT COLUMN: INTERACTIVE MODEL & MAC WINDOW PREVIEW (From Ali's Architecture) ── */}
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="w-full rounded-2xl border border-[var(--border)] bg-[var(--bg-card)]/90 backdrop-blur-xl shadow-2xl overflow-hidden group"
            >
              {/* Mac Window Title Bar */}
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
                  GPU CLUSTER ONLINE
                </span>
              </div>

              {/* Code / Visualizer Tabs */}
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

              {/* Visualizer Display Area */}
              <div className="p-6 bg-[var(--bg)]/50 relative">
                <div className="absolute inset-0 bg-grid-pattern opacity-15 pointer-events-none" />

                {activeTab === 'loss' && (
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <div className="text-xs font-bold text-[var(--fg)] font-mono">
                          Pretraining UrduLLM-12B
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

                    {/* Dynamic SVG Loss Curve with Aurora Gradient Fill */}
                    <div className="relative h-40 w-full overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--bg-card)] p-2">
                      <svg className="w-full h-full" viewBox="0 0 400 120" preserveAspectRatio="none">
                        <defs>
                          <linearGradient id="curveGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor={activeTheme.accent} stopOpacity="0.45" />
                            <stop offset="100%" stopColor={activeTheme.accent} stopOpacity="0.0" />
                          </linearGradient>
                        </defs>
                        {/* Area Fill */}
                        <path
                          d="M 0,110 Q 50,85 100,55 T 200,35 T 300,22 T 400,16 L 400,120 L 0,120 Z"
                          fill="url(#curveGradient)"
                        />
                        {/* Stroke Line */}
                        <path
                          d="M 0,110 Q 50,85 100,55 T 200,35 T 300,22 T 400,16"
                          fill="none"
                          stroke={activeTheme.accent}
                          strokeWidth="2.5"
                          strokeLinecap="round"
                        />
                        {/* Live Pulsing Point */}
                        <circle cx="395" cy="16" r="4.5" fill={activeTheme.accent} className="animate-ping" />
                        <circle cx="395" cy="16" r="3.5" fill="#FFFFFF" stroke={activeTheme.accent} strokeWidth="2" />
                      </svg>
                    </div>

                    {/* Telemetry Grid */}
                    <div className="grid grid-cols-3 gap-2 mt-4 text-center font-mono text-[11px]">
                      <div className="p-2 rounded-lg bg-[var(--bg-card)] border border-[var(--border)]">
                        <div className="text-[var(--fg-sub)] text-[9px] uppercase">Tokens</div>
                        <div className="font-bold text-[var(--fg)] mt-0.5">12.4B</div>
                      </div>
                      <div className="p-2 rounded-lg bg-[var(--bg-card)] border border-[var(--border)]">
                        <div className="text-[var(--fg-sub)] text-[9px] uppercase">Throughput</div>
                        <div className="font-bold text-[var(--fg)] mt-0.5">4,820 t/s</div>
                      </div>
                      <div className="p-2 rounded-lg bg-[var(--bg-card)] border border-[var(--border)]">
                        <div className="text-[var(--fg-sub)] text-[9px] uppercase">H100 VRAM</div>
                        <div className="font-bold text-[var(--fg)] mt-0.5">76.4 / 80GB</div>
                      </div>
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
                    <p className="text-[var(--fg-sub)] mt-2"># Pretraining step loss: 0.0418 (bfloat16)</p>
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
                    <p className="text-[11px] text-emerald-600 dark:text-emerald-400">• Checkpoint sync latency: 1.4ms</p>
                  </div>
                )}
              </div>
            </motion.div>
          </div>

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

      {/* ── MARQUEE SECTION: INDUSTRY & ACADEMIC COLLABORATIONS ── */}
      <section className="w-full border-y border-[var(--border)] bg-[var(--bg-muted)]/30 py-10 z-10 overflow-hidden">
        <div className="text-center text-xs font-semibold text-[var(--fg-sub)] mb-6 uppercase tracking-widest font-mono">
          Industry & Academic Collaborations
        </div>
        <MarqueeModule gradient={false} speed={38} pauseOnHover={true}>
          <div className="flex items-center gap-12 sm:gap-16 pr-12">
            {partners.map((partner, index) => (
              <span
                key={index}
                className="text-base sm:text-lg font-bold font-mono tracking-tight text-[var(--fg-sub)] hover:text-[var(--fg)] transition-colors cursor-default whitespace-nowrap"
              >
                // {partner}
              </span>
            ))}
          </div>
        </MarqueeModule>
      </section>

      {/* ── FEATURE SECTION: "Enterprise AI that just works." (Matching Inspiration Image) ── */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 z-10 relative">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[var(--fg)] font-head mb-4">
            Enterprise AI that just works.
          </h2>
          <p className="text-base sm:text-lg text-[var(--fg-sub)] leading-relaxed font-sans">
            Security, governance, and scalability are built in from day one. Deploy with confidence across your organization.
          </p>
        </div>

        {/* Iridescent Border Featured Bento Card (Matching the Inspiration Image) */}
        <div className="relative rounded-3xl p-1 mb-16 shadow-2xl overflow-hidden group">
          {/* Iridescent Ambient Gradient Background */}
          <div 
            className="absolute inset-0 rounded-3xl opacity-80 group-hover:opacity-100 transition-opacity blur-md"
            style={{ backgroundImage: 'var(--accent-gradient)' }}
          />

          {/* White / Dark Card Interior */}
          <div className="relative rounded-[22px] bg-[var(--bg-card)] p-8 sm:p-12 z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-6 flex flex-col justify-between h-full">
              <div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-[var(--fg)] font-head mb-4">
                  Deploy the way that works best for your team.
                </h3>
                <p className="text-sm sm:text-base text-[var(--fg-sub)] leading-relaxed mb-8">
                  Choose managed cloud, private cluster, VPC, or on-prem. Zero-data-retention controls, custom network security policies, and air-gapped deployments for the most demanding mission-critical requirements.
                </p>
              </div>

              {/* Slider Controls `<` `>` */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setActiveSlide(prev => (prev === 0 ? 2 : prev - 1))}
                  className="w-10 h-10 rounded-full border border-[var(--border)] bg-[var(--bg-muted)] text-[var(--fg)] flex items-center justify-center hover:scale-105 active:scale-95 transition-all cursor-pointer shadow-xs"
                  aria-label="Previous slide"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setActiveSlide(prev => (prev === 2 ? 0 : prev + 1))}
                  className="w-10 h-10 rounded-full border border-[var(--border)] bg-[var(--bg-muted)] text-[var(--fg)] flex items-center justify-center hover:scale-105 active:scale-95 transition-all cursor-pointer shadow-xs"
                  aria-label="Next slide"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
                <span className="text-xs font-mono text-[var(--fg-sub)] ml-2">
                  0{activeSlide + 1} / 03
                </span>
              </div>
            </div>

            {/* Right Inset Preview Box with Floating `Publish` Pill (From Inspiration Image) */}
            <div className="lg:col-span-6">
              <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-muted)]/60 p-8 sm:p-12 flex flex-col items-center justify-center relative min-h-[300px]">
                <div className="absolute inset-0 bg-dot-pattern opacity-25 pointer-events-none" />
                
                {/* Floating Publish Toggle Pill (from Inspiration Screenshot) */}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="relative z-10 flex items-center gap-3 px-5 py-3 rounded-2xl bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 shadow-2xl border border-black/10 dark:border-white/20"
                >
                  <div className="p-2 rounded-xl bg-white/10 dark:bg-black/10">
                    <Send className="w-4 h-4" />
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="text-xs font-bold leading-tight">Publish Model</span>
                    <span className="text-[10px] text-zinc-400 dark:text-zinc-600">Deploy to 16x H100</span>
                  </div>
                </motion.div>

                {/* Subtext info */}
                <div className="relative z-10 mt-6 text-center text-xs text-[var(--fg-sub)] max-w-xs font-mono">
                  Autonomous weights synchronization • TensorRT-LLM containerized instance
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* ── 6 BENTO CARDS (From Ali's Architecture & Inspiration Image Grid) ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Card 1: Product / Foundation Models */}
          <Tilt tiltMaxAngleX={6} tiltMaxAngleY={6} glareEnable={true} glareMaxOpacity={0.06} className="rounded-2xl">
            <div className="h-full bg-[var(--bg-card)] border border-[var(--border)] rounded-2xl p-7 flex flex-col justify-between hover:border-[var(--fg)]/30 hover:shadow-lg transition-all group">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-10 h-10 rounded-xl bg-[var(--bg-muted)] border border-[var(--border)] flex items-center justify-center text-[var(--fg)]">
                    <Brain className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--fg-sub)] bg-[var(--bg-muted)] px-2 py-0.5 rounded border border-[var(--border)]">
                    Ready for deploy
                  </span>
                </div>
                <h3 className="text-xl font-bold text-[var(--fg)] font-head mb-2 group-hover:text-rose-500 transition-colors">
                  Foundational Models
                </h3>
                <p className="text-xs sm:text-sm text-[var(--fg-sub)] leading-relaxed font-sans">
                  Developing state-of-the-art LLMs optimized for regional languages, specialized biomedical domains, and instruction-tuned reasoning.
                </p>
              </div>
            </div>
          </Tilt>

          {/* Card 2: Edge AI */}
          <Tilt tiltMaxAngleX={6} tiltMaxAngleY={6} glareEnable={true} glareMaxOpacity={0.06} className="rounded-2xl">
            <div className="h-full bg-[var(--bg-card)] border border-[var(--border)] rounded-2xl p-7 flex flex-col justify-between hover:border-[var(--fg)]/30 hover:shadow-lg transition-all group">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-10 h-10 rounded-xl bg-[var(--bg-muted)] border border-[var(--border)] flex items-center justify-center text-[var(--fg)]">
                    <Zap className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--fg-sub)] bg-[var(--bg-muted)] px-2 py-0.5 rounded border border-[var(--border)]">
                    5W Ultra-low power
                  </span>
                </div>
                <h3 className="text-xl font-bold text-[var(--fg)] font-head mb-2 group-hover:text-orange-500 transition-colors">
                  Edge AI Perception
                </h3>
                <p className="text-xs sm:text-sm text-[var(--fg-sub)] leading-relaxed font-sans">
                  Deploying high-performance computer vision on constrained embedded hardware, achieving 60 FPS at sub-5W consumption for urban smart transit.
                </p>
              </div>
            </div>
          </Tilt>

          {/* Card 3: Support / Autonomous Robotics */}
          <Tilt tiltMaxAngleX={6} tiltMaxAngleY={6} glareEnable={true} glareMaxOpacity={0.06} className="rounded-2xl">
            <div className="h-full bg-[var(--bg-card)] border border-[var(--border)] rounded-2xl p-7 flex flex-col justify-between hover:border-[var(--fg)]/30 hover:shadow-lg transition-all group">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-10 h-10 rounded-xl bg-[var(--bg-muted)] border border-[var(--border)] flex items-center justify-center text-[var(--fg)]">
                    <Cpu className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--fg-sub)] bg-[var(--bg-muted)] px-2 py-0.5 rounded border border-[var(--border)]">
                    24/7 Autonomy
                  </span>
                </div>
                <h3 className="text-xl font-bold text-[var(--fg)] font-head mb-2 group-hover:text-amber-500 transition-colors">
                  Autonomous Robotics
                </h3>
                <p className="text-xs sm:text-sm text-[var(--fg-sub)] leading-relaxed font-sans">
                  Multi-UAV cooperative swarms and quadruped testbeds with real-time SLAM, LiDAR-inertial odometry, and physical environment interaction.
                </p>
              </div>
            </div>
          </Tilt>

          {/* Card 4: Engineering / Open Source */}
          <Tilt tiltMaxAngleX={6} tiltMaxAngleY={6} glareEnable={true} glareMaxOpacity={0.06} className="rounded-2xl">
            <div className="h-full bg-[var(--bg-card)] border border-[var(--border)] rounded-2xl p-7 flex flex-col justify-between hover:border-[var(--fg)]/30 hover:shadow-lg transition-all group">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-10 h-10 rounded-xl bg-[var(--bg-muted)] border border-[var(--border)] flex items-center justify-center text-[var(--fg)]">
                    <Code className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--fg-sub)] bg-[var(--bg-muted)] px-2 py-0.5 rounded border border-[var(--border)]">
                    Open Weights
                  </span>
                </div>
                <h3 className="text-xl font-bold text-[var(--fg)] font-head mb-2 group-hover:text-pink-500 transition-colors">
                  Open Source Tooling
                </h3>
                <p className="text-xs sm:text-sm text-[var(--fg-sub)] leading-relaxed font-sans">
                  Publishing open tokenizers, evaluation harness scripts, and pre-trained weights to democratize frontier AI accessibility worldwide.
                </p>
              </div>
            </div>
          </Tilt>

          {/* Card 5: Design / Data Curation */}
          <Tilt tiltMaxAngleX={6} tiltMaxAngleY={6} glareEnable={true} glareMaxOpacity={0.06} className="rounded-2xl">
            <div className="h-full bg-[var(--bg-card)] border border-[var(--border)] rounded-2xl p-7 flex flex-col justify-between hover:border-[var(--fg)]/30 hover:shadow-lg transition-all group">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-10 h-10 rounded-xl bg-[var(--bg-muted)] border border-[var(--border)] flex items-center justify-center text-[var(--fg)]">
                    <Database className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--fg-sub)] bg-[var(--bg-muted)] px-2 py-0.5 rounded border border-[var(--border)]">
                    Multi-modal corpus
                  </span>
                </div>
                <h3 className="text-xl font-bold text-[var(--fg)] font-head mb-2 group-hover:text-teal-500 transition-colors">
                  Data Curation & Alignment
                </h3>
                <p className="text-xs sm:text-sm text-[var(--fg-sub)] leading-relaxed font-sans">
                  Large-scale ethically verified bilingual datasets spanning jurisprudence, clinical case records, and high-fidelity speech phonetics.
                </p>
              </div>
            </div>
          </Tilt>

          {/* Card 6: Operations / AI Safety */}
          <Tilt tiltMaxAngleX={6} tiltMaxAngleY={6} glareEnable={true} glareMaxOpacity={0.06} className="rounded-2xl">
            <div className="h-full bg-[var(--bg-card)] border border-[var(--border)] rounded-2xl p-7 flex flex-col justify-between hover:border-[var(--fg)]/30 hover:shadow-lg transition-all group">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-10 h-10 rounded-xl bg-[var(--bg-muted)] border border-[var(--border)] flex items-center justify-center text-[var(--fg)]">
                    <LineChart className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--fg-sub)] bg-[var(--bg-muted)] px-2 py-0.5 rounded border border-[var(--border)]">
                    Zero-hallucination
                  </span>
                </div>
                <h3 className="text-xl font-bold text-[var(--fg)] font-head mb-2 group-hover:text-indigo-500 transition-colors">
                  AI Safety & Alignment
                </h3>
                <p className="text-xs sm:text-sm text-[var(--fg-sub)] leading-relaxed font-sans">
                  Ensuring verifiable, robust, and mathematically grounded outputs for safety-critical healthcare and autonomous robotics missions.
                </p>
              </div>
            </div>
          </Tilt>

        </div>
      </section>

      {/* ── SECTION: FLAGSHIP PROJECTS (Worked Instances with Dormant B&W to Color Pop) ── */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 z-10 relative">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--bg-muted)] text-[var(--fg)] text-xs font-mono font-bold border border-[var(--border)] mb-3">
              <Sparkles className="w-3.5 h-3.5" style={{ color: activeTheme.accent }} />
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

      {/* ── FREQUENTLY ASKED QUESTIONS (Matching Inspiration Image FAQ Section) ── */}
      <section className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24 z-10 relative">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[var(--fg)] font-head mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-base text-[var(--fg-sub)]">
            Understand our admissions criteria, compute access, and open-source models.
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

      {/* ── FINAL UNAMBIGUOUS CALL TO ACTION ── */}
      <section className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 z-10 relative text-center">
        <div className="rounded-3xl border border-[var(--border)] bg-[var(--bg-card)] p-10 sm:p-16 shadow-2xl relative overflow-hidden">
          {/* Subtle Aurora Ambient Blur inside the card */}
          <div 
            className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full blur-3xl opacity-40 pointer-events-none"
            style={{ backgroundColor: 'var(--glow-1)' }}
          />

          <div className="relative z-10 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--bg-muted)] text-[var(--fg)] text-xs font-mono font-bold border border-[var(--border)] mb-6">
              <ShieldCheck className="w-3.5 h-3.5" style={{ color: activeTheme.accent }} />
              JOIN THE RESEARCH FELLOWSHIP
            </div>

            <h2 className="text-3xl sm:text-5xl font-extrabold text-[var(--fg)] tracking-tight mb-6 font-head">
              Ready to advance the state of the art?
            </h2>

            <p className="text-sm sm:text-base text-[var(--fg-sub)] leading-relaxed mb-8">
              Whether you are an ambitious student aspiring for world-class AI fellowship or an industry partner seeking high-throughput edge deployment, we welcome collaboration.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/interns"
                className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[var(--primary)] text-[var(--primary-fg)] font-bold text-xs sm:text-sm hover:opacity-90 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-md"
              >
                Get started free ↗
              </Link>
              <Link
                to="/publications"
                className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-white dark:bg-zinc-900 border border-[var(--border)] text-[var(--fg)] font-semibold text-xs sm:text-sm hover:bg-[var(--bg-muted)] transition-all shadow-xs"
              >
                Explore All Publications
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}
