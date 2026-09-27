import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { Brain, Target, Compass, Sparkles, Award, Server } from 'lucide-react'
import TiltCard from '../components/TiltCard'
import { useScrollCraft } from '../hooks/useScrollCraft'

const researchTracks = [
  { label: 'Large Language Models (Urdu & Bilingual)', fill: 92 },
  { label: 'High-Throughput Medical Computer Vision', fill: 95 },
  { label: 'Ultra-Low-Power Edge & Embedded FPGA', fill: 84 },
  { label: 'Autonomous Aerial Robotics & Multi-UAV', fill: 78 },
]

const infrastructure = [
  {
    title: 'H100 SXM5 Supercompute Cluster',
    spec: '8x NVIDIA H100 80GB SXM5 Nodes',
    desc: 'High-density GPU nodes interconnected via 3.2 Tbps NVIDIA Quantum-2 InfiniBand for foundation model training.',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80',
    tag: 'Compute'
  },
  {
    title: 'Robotics & Autonomous Flight Arena',
    spec: '1,500 sq ft Indoor Mocap + Outdoor Range',
    desc: 'OptiTrack sub-millimeter infrared tracking arena equipped with dynamic obstacle rigging and wind generators.',
    image: 'https://images.unsplash.com/photo-1508614589041-895b88991e3e?w=800&q=80',
    tag: 'Robotics'
  },
  {
    title: 'Neuromorphic & Embedded Hardware Lab',
    spec: '40+ Jetson Orin AGX & Xilinx Ultrascale+ FPGAs',
    desc: 'Dedicated logic analyzers, thermal imaging rigs, and oscilloscope benches for sub-watt on-device inference benchmarking.',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80',
    tag: 'Embedded'
  }
]

export default function About() {
  const sc = useScrollCraft()

  useEffect(() => {
    sc.reveal('[data-sc="about-heading"]', {
      direction: 'up', distance: '28px', duration: 650, ease: 'cubicOut',
    })
    sc.reveal('[data-sc="about-card"]', {
      direction: 'up', distance: '32px', duration: 600, ease: 'cubicOut', threshold: 0.1,
    })
  }, [sc])

  return (
    <div className="min-h-screen pt-28 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
      {/* Subtle tech grid background */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none -z-10" />

      {/* Header */}
      <div className="mb-16" data-sc="about-heading">
        <span className="font-mono text-xs uppercase tracking-widest text-[var(--primary)] font-bold bg-[var(--primary)]/10 px-3.5 py-1.5 rounded-full border border-[var(--primary)]/20 inline-flex items-center gap-1.5 mb-4">
          <Brain className="w-3.5 h-3.5" /> [ACADEMIC LINEAGE & PURPOSE]
        </span>
        <h1 className="text-4xl sm:text-6xl font-black tracking-tight font-head">
          Mission, Vision & Heritage
        </h1>
        <p className="mt-3 text-lg text-[var(--fg-sub)] max-w-2xl font-sans">
          Established at NED University of Engineering & Technology, AIR Lab drives national AI sovereignty and world-class scientific publication.
        </p>
      </div>

      {/* Mission & Vision Dual 3D Tilt Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
        <TiltCard tiltMaxAngleX={6} tiltMaxAngleY={6} scale={1.02}>
          <div
            data-sc="about-card"
            className="h-full rounded-2xl border border-[var(--border)] bg-[var(--bg-card)]/90 backdrop-blur-xl p-8 flex flex-col justify-between hover:border-[var(--primary)] hover:shadow-2xl hover:shadow-[var(--primary)]/10 transition-all duration-300 group"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-[var(--primary)]/15 border border-[var(--primary)]/30 flex items-center justify-center text-[var(--primary)] mb-6 group-hover:scale-110 transition-transform">
                <Target className="w-6 h-6" />
              </div>
              <span className="font-mono text-xs text-[var(--fg-sub)] uppercase tracking-wider">STRATEGIC PURPOSE</span>
              <h2 className="text-2xl font-bold font-head mb-4 group-hover:text-[var(--primary)] transition-colors mt-1">
                Our Mission
              </h2>
              <p className="text-sm text-[var(--fg-sub)] leading-relaxed font-sans mb-6">
                To establish Pakistan’s premier artificial intelligence research laboratory by conducting foundational AI discovery, engineering deployable robotic systems, mentoring the next generation of doctoral scholars, and deploying high-impact regional AI solutions for healthcare, agriculture, and urban infrastructure.
              </p>
            </div>
            <div className="pt-4 border-t border-[var(--border)] flex items-center gap-2 text-xs font-mono text-[var(--primary)]">
              <Sparkles className="w-4 h-4" /> Academic Rigor & Ethical Governance
            </div>
          </div>
        </TiltCard>

        <TiltCard tiltMaxAngleX={6} tiltMaxAngleY={6} scale={1.02}>
          <div
            data-sc="about-card"
            className="h-full rounded-2xl border border-[var(--border)] bg-[var(--bg-card)]/90 backdrop-blur-xl p-8 flex flex-col justify-between hover:border-[var(--secondary)] hover:shadow-2xl hover:shadow-[var(--secondary)]/10 transition-all duration-300 group"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-[var(--secondary)]/15 border border-[var(--secondary)]/30 flex items-center justify-center text-[var(--secondary)] mb-6 group-hover:scale-110 transition-transform">
                <Compass className="w-6 h-6" />
              </div>
              <span className="font-mono text-xs text-[var(--fg-sub)] uppercase tracking-wider">FUTURE OUTLOOK</span>
              <h2 className="text-2xl font-bold font-head mb-4 group-hover:text-[var(--secondary)] transition-colors mt-1">
                Our Vision
              </h2>
              <p className="text-sm text-[var(--fg-sub)] leading-relaxed font-sans mb-6">
                A world where open, efficient, and locally grounded artificial intelligence empowers emerging economies. We envision AIR Lab as a globally recognized research cluster that regularly publishes in top-tier conferences (NeurIPS, CVPR, ACL) and produces deep-tech spinouts that solve urgent real-world problems.
              </p>
            </div>
            <div className="pt-4 border-t border-[var(--border)] flex items-center gap-2 text-xs font-mono text-[var(--secondary)]">
              <Award className="w-4 h-4" /> Global Impact & Open Source Contributions
            </div>
          </div>
        </TiltCard>
      </div>

      {/* Computational Infrastructure Section with Dormant B&W Images */}
      <div className="mb-20" data-sc="about-heading">
        <div className="mb-10">
          <span className="font-mono text-xs uppercase tracking-widest text-[var(--primary)] font-bold bg-[var(--primary)]/10 px-3.5 py-1.5 rounded-full border border-[var(--primary)]/20 inline-flex items-center gap-1.5 mb-4">
            <Server className="w-3.5 h-3.5" /> [COMPUTE & LAB HARDWARE]
          </span>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight font-head">
            World-Class Infrastructure
          </h2>
          <p className="mt-2 text-base text-[var(--fg-sub)] max-w-2xl font-sans">
            Backed by funding from the National Center of Big Data & Cloud Computing (NCBC) and HEC NRPU grants.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {infrastructure.map((item, idx) => (
            <TiltCard key={idx} tiltMaxAngleX={8} tiltMaxAngleY={8} scale={1.02}>
              <div
                data-sc="about-card"
                className="h-full rounded-2xl border border-[var(--border)] bg-[var(--bg-card)]/90 backdrop-blur-xl overflow-hidden flex flex-col justify-between hover:border-[var(--primary)] hover:shadow-2xl transition-all duration-300 group"
              >
                <div>
                  {/* DORMANT IMAGE: Black & White dormant, pops with vivid color on hover! */}
                  <div className="relative h-48 w-full overflow-hidden bg-black/40">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded text-[10px] font-mono font-bold bg-[var(--primary)] text-black">
                      {item.tag}
                    </span>
                  </div>

                  <div className="p-6">
                    <span className="text-[11px] font-mono text-[var(--primary)] font-bold mb-1 block">
                      {item.spec}
                    </span>
                    <h3 className="text-xl font-bold font-head mb-2 group-hover:text-[var(--primary)] transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs text-[var(--fg-sub)] leading-relaxed font-sans">
                      {item.desc}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0 border-t border-[var(--border)]/40 mt-auto">
                  <div className="pt-3 text-[11px] font-mono text-emerald-400 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Available to All Lab Scholars
                  </div>
                </div>
              </div>
            </TiltCard>
          ))}
        </div>
      </div>

      {/* Research Maturity Progress Bars */}
      <div className="rounded-3xl border border-[var(--border)] bg-[var(--bg-card)]/80 backdrop-blur-xl p-8 sm:p-12">
        <h3 className="text-2xl font-bold font-head mb-6">
          Research Velocity & Domain Saturation
        </h3>

        <div className="space-y-6">
          {researchTracks.map((track, i) => (
            <div key={i} className="space-y-2">
              <div className="flex justify-between items-center text-xs font-mono">
                <span className="font-bold text-[var(--fg)]">{track.label}</span>
                <span className="text-[var(--primary)] font-bold">{track.fill}% Maturity</span>
              </div>
              <div className="w-full h-2 rounded-full bg-[var(--bg-muted)] overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${track.fill}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, ease: 'easeOut', delay: i * 0.1 }}
                  className="h-full rounded-full bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)]"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
