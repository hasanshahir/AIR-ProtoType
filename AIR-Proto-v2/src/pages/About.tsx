import { Brain, Handshake, Target, Globe, ShieldCheck } from 'lucide-react'
import Tilt from 'react-parallax-tilt'

export default function About() {
  const pillars = [
    {
      title: 'Theoretical Exploration & Applied AI',
      desc: 'Advancing foundational methodologies across deep neural networks, large language models, computer vision, and autonomous systems with mathematical rigor.',
      icon: Brain,
      tag: 'Foundational'
    },
    {
      title: 'Bridging Academia & Industry',
      desc: 'Active enterprise co-development, sponsored research projects, technology transfer, and commercial-grade deployment testbeds.',
      icon: Handshake,
      tag: 'Knowledge Transfer'
    },
    {
      title: 'Robust, Ethical & Explainable Systems',
      desc: 'Engineering systems with strict safety guarantees, mathematical alignment, fair representation, and transparent explainability.',
      icon: ShieldCheck,
      tag: 'AI Governance'
    },
    {
      title: 'Capacity Building & National Ecosystem',
      desc: 'Hosting technical workshops, specialized bootcamps, and open research access to nurture top engineering talent in Pakistan.',
      icon: Globe,
      tag: 'Community'
    }
  ]

  return (
    <div className="min-h-screen pt-28 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
      {/* Background Matrix Grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none -z-10" />

      {/* Header */}
      <div className="mb-14 text-left">
        <span className="font-mono text-xs uppercase tracking-widest text-rose-500 font-bold bg-rose-500/10 px-3.5 py-1.5 rounded-full border border-rose-500/20 inline-flex items-center gap-1.5 mb-4">
          <Brain className="w-3.5 h-3.5" /> [DEPARTMENT OF COMPUTER SCIENCE & IT • NED UNIVERSITY]
        </span>
        <h1 className="text-4xl sm:text-6xl font-medium tracking-tight font-head text-[var(--fg)] mb-4">
          About AIR Lab
        </h1>
        <p className="text-base sm:text-lg text-[var(--fg-sub)] max-w-3xl font-sans leading-relaxed">
          Pioneering artificial intelligence research, academia-industry innovation, and capacity building at NED University of Engineering & Technology.
        </p>
      </div>

      {/* Official Vision & Mission Narrative Cards */}
      <div className="space-y-8 mb-20">
        
        {/* Paragraph 1: Foundational Vision */}
        <Tilt tiltMaxAngleX={4} tiltMaxAngleY={4} scale={1.01} transitionSpeed={2500} className="rounded-3xl">
          <div className="rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-[var(--bg-card)] p-8 sm:p-12 shadow-xl relative overflow-hidden group hover:border-rose-500/40 transition-all duration-300">
            <div className="absolute top-0 right-0 w-72 h-72 bg-rose-500/5 rounded-full blur-3xl group-hover:bg-rose-500/15 transition-colors duration-500 pointer-events-none" />
            
            <div className="max-w-4xl relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold bg-rose-500/10 text-rose-500 mb-4">
                <Target className="w-3.5 h-3.5" />
                <span>VISION & FOUNDATION</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-medium font-head text-[var(--fg)] mb-4">
                Advancing Cutting-Edge AI & Translating Innovation
              </h2>
              <p className="text-sm sm:text-base text-[var(--fg-sub)] leading-relaxed font-sans font-normal">
                The Artificial Intelligence Research Lab (AIR Lab) at the Department of Computer Science & Information Technology, NED University of Engineering & Technology, is established with the vision of advancing cutting-edge research in Artificial Intelligence and translating innovation into real-world impact. AIR Lab serves as a hub for theoretical exploration, applied research, and interdisciplinary collaboration in modern AI. Our research focuses on developing intelligent systems that are robust, ethical, explainable, and scalable, addressing challenges across academia, industry, and society. By combining strong foundations in computer science with contemporary AI methodologies, we aim to push the boundaries of what intelligent systems can achieve.
              </p>
            </div>
          </div>
        </Tilt>

        {/* Paragraph 2: Academia-Industry Synergy */}
        <Tilt tiltMaxAngleX={4} tiltMaxAngleY={4} scale={1.01} transitionSpeed={2500} className="rounded-3xl">
          <div className="rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-[var(--bg-card)] p-8 sm:p-12 shadow-xl relative overflow-hidden group hover:border-amber-500/40 transition-all duration-300">
            <div className="absolute top-0 right-0 w-72 h-72 bg-amber-500/5 rounded-full blur-3xl group-hover:bg-amber-500/15 transition-colors duration-500 pointer-events-none" />
            
            <div className="max-w-4xl relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold bg-amber-500/10 text-amber-500 mb-4">
                <Handshake className="w-3.5 h-3.5" />
                <span>ACADEMIA & INDUSTRY BRIDGING</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-medium font-head text-[var(--fg)] mb-4">
                Practical Solutions, Knowledge Transfer & Capacity Building
              </h2>
              <p className="text-sm sm:text-base text-[var(--fg-sub)] leading-relaxed font-sans font-normal">
                A core objective of AIR Lab is to bridge the gap between academia and industry. We actively collaborate with industry partners to solve real-world problems, enabling knowledge transfer, applied innovation, and workforce development. Through joint projects, sponsored research, and student involvement, the lab contributes practical AI solutions while preparing skilled graduates for the evolving technological landscape. Beyond research, AIR Lab is committed to community engagement and capacity building. The lab promotes AI awareness through workshops, seminars, training programs, and open research initiatives, fostering an ecosystem of learning and innovation within and beyond the university.
              </p>
            </div>
          </div>
        </Tilt>

        {/* Paragraph 3: Future Aspirations & Pakistan AI Frontier */}
        <Tilt tiltMaxAngleX={4} tiltMaxAngleY={4} scale={1.01} transitionSpeed={2500} className="rounded-3xl">
          <div className="rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-[var(--bg-card)] p-8 sm:p-12 shadow-xl relative overflow-hidden group hover:border-emerald-500/40 transition-all duration-300">
            <div className="absolute top-0 right-0 w-72 h-72 bg-emerald-500/5 rounded-full blur-3xl group-hover:bg-emerald-500/15 transition-colors duration-500 pointer-events-none" />
            
            <div className="max-w-4xl relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold bg-emerald-500/10 text-emerald-500 mb-4">
                <Globe className="w-3.5 h-3.5" />
                <span>GLOBAL IMPACT & NATIONAL LEADERSHIP</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-medium font-head text-[var(--fg)] mb-4">
                Shaping the Future of AI in Pakistan
              </h2>
              <p className="text-sm sm:text-base text-[var(--fg-sub)] leading-relaxed font-sans font-normal">
                By nurturing talent, encouraging collaboration, and pursuing impactful research, the Artificial Intelligence Research Lab aspires to play a meaningful role in shaping the future of AI in Pakistan and contributing to the global AI research community.
              </p>
            </div>
          </div>
        </Tilt>

      </div>

      {/* 4 Core Pillars Grid */}
      <div className="mb-20">
        <h3 className="text-2xl sm:text-3xl font-medium font-head text-[var(--fg)] mb-8 text-left">
          Core Pillars of Excellence
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pillar, i) => {
            const Icon = pillar.icon
            return (
              <div
                key={i}
                className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-[var(--bg-card)] p-6 flex flex-col justify-between hover:border-zinc-400 dark:hover:border-zinc-700 hover:shadow-lg transition-all group"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-900 dark:text-white group-hover:bg-rose-500/10 group-hover:text-rose-500 transition-colors mb-4">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-mono text-zinc-500 dark:text-zinc-400 uppercase tracking-wider block mb-1">
                    {pillar.tag}
                  </span>
                  <h4 className="text-base font-medium font-head text-[var(--fg)] mb-2 group-hover:text-rose-500 transition-colors">
                    {pillar.title}
                  </h4>
                  <p className="text-xs text-[var(--fg-sub)] leading-relaxed font-sans">
                    {pillar.desc}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>

    </div>
  )
}
