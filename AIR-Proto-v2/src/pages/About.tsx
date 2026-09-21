import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { Brain, Eye, Cpu, Target, Compass, Sparkles, Award, ShieldCheck, Zap } from 'lucide-react'
import { useScrollCraft } from '../hooks/useScrollCraft'

/**
 * About page — uses scroll-craft:
 *  - reveal: headings, text blocks, pillar cards, values section
 *  - progress: horizontal fill bars for each research track (scroll-linked)
 */

const researchTracks = [
  { label: 'Large Language Models', fill: 88 },
  { label: 'Computer Vision', fill: 94 },
  { label: 'Edge & Embedded AI', fill: 72 },
  { label: 'Autonomous Robotics', fill: 65 },
]

export default function About() {
  const sc = useScrollCraft()

  useEffect(() => {
    // Headings
    sc.reveal('[data-sc="about-heading"]', {
      direction: 'up', distance: '28px', duration: 650, ease: 'cubicOut',
    })
    // Text paragraphs — from right
    sc.reveal('[data-sc="about-text"]', {
      direction: 'right', distance: '36px', duration: 600, ease: 'cubicOut', threshold: 0.1,
    })
    // Fact box slides from right
    sc.reveal('[data-sc="fact-box"]', {
      direction: 'left', distance: '40px', duration: 700, ease: 'quartOut', threshold: 0.1,
    })
    // Pillar cards — stagger up
    sc.reveal('[data-sc="pillar-card"]', {
      direction: 'up', distance: '32px', duration: 600, ease: 'cubicOut', threshold: 0.12,
    })
    // Values section
    sc.reveal('[data-sc="values"]', {
      direction: 'up', distance: '24px', duration: 600, ease: 'cubicOut',
    })
    // Progress track labels
    sc.reveal('[data-sc="track-label"]', {
      direction: 'left', distance: '20px', duration: 500, ease: 'cubicOut',
    })
    // scroll-craft progress for the horizontal fill bars
    sc.progress('.sc-progress-step', { start: 0.85, end: 0.15 })
  }, [sc])

  return (
    <div className="min-h-screen pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-16">
        <span className="font-mono text-xs uppercase tracking-widest text-[#1A6BFF] font-bold bg-[#1A6BFF]/10 px-3.5 py-1.5 rounded-full border border-[#1A6BFF]/20 inline-block mb-4" data-sc="about-heading">
          [ABOUT AIR LAB]
        </span>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight" style={{ fontFamily: 'Space Grotesk, sans-serif' }} data-sc="about-heading">
          Our Mission & <span className="text-[#1A6BFF]">Vision</span>
        </h1>
      </div>

      {/* Mission + Fact Box */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-20 items-start">
        <div className="lg:col-span-2 space-y-6 text-lg leading-relaxed text-[var(--fg-sub)]">
          <p className="text-xl sm:text-2xl font-semibold text-[var(--fg)] leading-snug" data-sc="about-text">
            The Artificial Intelligence Research Lab (AIR Lab) at NED University is a state-of-the-art environment dedicated to advancing machine intelligence, spatial AI, and autonomous systems.
          </p>
          <p data-sc="about-text" style={{ transitionDelay: '80ms' }}>
            Founded with the conviction that high-tier AI research should drive tangible societal progress, AIR Lab bridges theoretical ML breakthroughs and real-world industrial application.
          </p>
          <p data-sc="about-text" style={{ transitionDelay: '160ms' }}>
            Our multidisciplinary agenda spans deep learning architectures, edge-computing vision algorithms, smart mobility networks, and medical image computing.
          </p>
        </div>

        <div data-sc="fact-box" className="p-8 rounded-2xl bg-[var(--bg)] border border-[var(--border)] shadow-xl relative overflow-hidden hover:border-[#1A6BFF]/40 transition-all duration-300">
          <div className="absolute -right-6 -top-6 w-28 h-28 bg-[#1A6BFF]/10 rounded-full blur-2xl" />
          <h3 className="text-xl font-bold mb-6 flex items-center gap-2" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
            <Sparkles className="w-5 h-5 text-[#1A6BFF]" /> Key Facts
          </h3>
          <div className="space-y-4 font-mono text-sm">
            {[
              ['Founded', '2021'],
              ['Institution', 'NED University'],
              ['Research Tracks', '3 Core Tracks'],
              ['Active Members', '120+ Researchers'],
              ['Publications', '45+ Scopus/IEEE'],
            ].map(([k, v], i) => (
              <div key={i} className={`flex justify-between items-center ${i < 4 ? 'border-b border-[var(--border)] pb-3' : ''}`}>
                <span className="text-[var(--fg-sub)]">{k}</span>
                <span className={`font-bold ${i === 2 ? 'text-[#1A6BFF]' : i === 3 ? 'text-[#FF4D4F]' : i === 4 ? 'text-[#FFAB00]' : 'text-[var(--fg)]'}`}>{v}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── SCROLL-CRAFT PROGRESS: Research Track Proficiency Bars ── */}
      <div className="mb-20 p-8 rounded-2xl bg-[var(--bg-muted)] border border-[var(--border)]">
        <span className="font-mono text-xs uppercase tracking-widest text-[#FF4D4F] font-bold mb-2 block" data-sc="track-label">
          [ RESEARCH FOCUS DISTRIBUTION ]
        </span>
        <h2 className="text-2xl font-black mb-8" style={{ fontFamily: 'Space Grotesk, sans-serif' }} data-sc="track-label">
          Lab Research Intensity
        </h2>
        <div className="space-y-6">
          {researchTracks.map((track, i) => (
            <div key={i} className="space-y-2" data-sc="track-label" style={{ transitionDelay: `${i * 60}ms` }}>
              <div className="flex justify-between font-mono text-sm">
                <span className="font-semibold text-[var(--fg)]">{track.label}</span>
                <span className="text-[#1A6BFF] font-bold">{track.fill}%</span>
              </div>
              {/* scroll-craft progress fills this .sc-fill element via clip-path */}
              <div className="sc-progress-step h-3 rounded-full bg-[var(--border)] overflow-hidden">
                <div className="sc-fill h-full rounded-full" style={{ clipPath: `inset(0 ${100 - track.fill}% 0 0)` }} />
              </div>
            </div>
          ))}
        </div>
        <p className="mt-4 text-xs font-mono text-[var(--fg-sub)]">* Bars animate as you scroll through them</p>
      </div>

      {/* Research Pillars */}
      <div className="mb-20">
        <h2 className="text-3xl font-bold mb-10" style={{ fontFamily: 'Space Grotesk, sans-serif' }} data-sc="about-heading">Core Research Pillars</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: Brain, color: '#1A6BFF', label: 'Neural AI & Algorithms', title: 'Deep Learning & Cognition', desc: 'Developing novel neural architectures, physics-informed AI, and generative modeling techniques for complex decision-making systems.', Icon2: Zap },
            { icon: Eye, color: '#FF4D4F', label: 'Spatial AI & Sensing', title: 'Computer Vision & Perception', desc: 'Building real-time visual recognition engines, autonomous vehicle perception, and high-precision medical imaging diagnostics.', Icon2: ShieldCheck },
            { icon: Cpu, color: '#FFAB00', label: 'Edge Hardware & Control', title: 'Robotics & Embedded Systems', desc: 'Deploying edge AI onto custom microcontroller platforms, autonomous drone swarms, and robotic manipulation systems.', Icon2: Award },
          ].map(({ icon: Icon, color, label, title, desc, Icon2 }, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -6 }}
              data-sc="pillar-card"
              className="p-8 rounded-2xl bg-[var(--bg)] border border-[var(--border)] shadow-md transition-all duration-300 flex flex-col justify-between"
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div>
                <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-6" style={{ background: color + '18', color }}>
                  <Icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold mb-3" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>{title}</h3>
                <p className="text-[var(--fg-sub)] text-sm leading-relaxed">{desc}</p>
              </div>
              <div className="mt-6 pt-4 border-t border-[var(--border)] flex items-center gap-2 font-mono text-xs" style={{ color }}>
                <Icon2 className="w-3.5 h-3.5" /> {label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Vision & Values */}
      <div data-sc="values" className="grid grid-cols-1 md:grid-cols-2 gap-8 p-10 rounded-2xl border border-[var(--border)] bg-[var(--bg)]">
        {[
          { icon: Target, color: '#1A6BFF', title: 'Strategic Vision', text: 'To position NED University as an internationally recognized hub for AI innovation, creating open-source tools, benchmark datasets, and field-deployed robotic platforms.' },
          { icon: Compass, color: '#FF4D4F', title: 'Core Values', text: 'We foster rigorous scientific discipline, radical open-source transparency, peer mentorship, and interdisciplinary problem solving. Every student is encouraged to take bold engineering risks.' },
        ].map(({ icon: Icon, color, title, text }, i) => (
          <div key={i} className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg" style={{ background: color + '18', color }}><Icon className="w-6 h-6" /></div>
              <h3 className="text-2xl font-bold" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>{title}</h3>
            </div>
            <p className="text-[var(--fg-sub)] leading-relaxed">{text}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
