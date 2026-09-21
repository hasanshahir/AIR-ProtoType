import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { TrendingUp, User, Building2, CheckCircle2 } from 'lucide-react'
import projectsData from '../data/projects.json'
import { useScrollCraft } from '../hooks/useScrollCraft'

const CATEGORY_COLORS: Record<string, string> = {
  Funded: 'bg-[#FF4D4F] text-white',
  'R&D': 'bg-[#1A6BFF] text-white',
  Undergraduate: 'bg-[#FFAB00] text-black',
  Postgraduate: 'bg-[#7C3AED] text-white',
}

export default function Projects() {
  const [filter, setFilter] = useState('All')
  const sc = useScrollCraft()

  useEffect(() => {
    sc.reveal('[data-sc="proj-heading"]', {
      direction: 'up', distance: '24px', duration: 600, ease: 'cubicOut',
    })
  }, [sc])

  useEffect(() => {
    const t = setTimeout(() => {
      sc.reveal('[data-sc="proj-card"]', {
        direction: 'up',
        distance: '36px',
        duration: 600,
        ease: 'quartOut',
        threshold: 0.06,
        once: false,
      })
    }, 60)
    return () => clearTimeout(t)
  }, [filter, sc])

  const filtered = projectsData.filter(p => filter === 'All' || p.category === filter)

  return (
    <div className="min-h-screen pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="mb-12" data-sc="proj-heading">
        <span className="font-mono text-xs uppercase tracking-widest text-[#1A6BFF] font-bold bg-[#1A6BFF]/10 px-3.5 py-1.5 rounded-full border border-[#1A6BFF]/20 inline-block mb-4">
          [RESEARCH & INNOVATION]
        </span>
        <h1 className="text-4xl sm:text-5xl font-black tracking-tight" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>Lab Projects & Prototypes</h1>
        <p className="mt-3 text-lg text-[var(--fg-sub)] max-w-2xl">Exploring frontier AI research, industry-sponsored grants, and student innovation initiatives.</p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2.5 mb-12" data-sc="proj-heading">
        {['All', 'Funded', 'R&D', 'Undergraduate', 'Postgraduate'].map(cat => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-4 py-2 rounded-full font-mono text-xs font-bold tracking-wide transition-all cursor-pointer ${
              filter === cat
                ? 'bg-[#1A6BFF] text-white shadow-md shadow-[#1A6BFF]/30 scale-105'
                : 'bg-[var(--bg)] text-[var(--fg-sub)] border border-[var(--border)] hover:border-[#1A6BFF]/40 hover:text-[var(--fg)]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={filter}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {filtered.map((project, i) => (
            <div
              key={project.id}
              data-sc="proj-card"
              className="rounded-2xl bg-[var(--bg)] border border-[var(--border)] overflow-hidden shadow-lg hover:border-[#1A6BFF]/50 transition-all duration-300 flex flex-col group hover:-translate-y-1"
              style={{ transitionDelay: `${i * 70}ms` }}
            >
              <div className="relative aspect-video overflow-hidden bg-[var(--bg-muted)]">
                <img src={project.image} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute top-4 left-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider ${CATEGORY_COLORS[project.category] ?? 'bg-zinc-700 text-white'}`}>
                    {project.category}
                  </span>
                </div>
                <div className="absolute top-4 right-4">
                  {project.status === 'Active' ? (
                    <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold bg-emerald-500/90 text-white backdrop-blur">
                      <span className="w-2 h-2 rounded-full bg-white animate-pulse" /> Active
                    </span>
                  ) : (
                    <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold bg-zinc-500/80 text-white backdrop-blur">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Completed
                    </span>
                  )}
                </div>
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-xl font-black text-white line-clamp-1 drop-shadow-md" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>{project.title}</h3>
                </div>
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <p className="text-[var(--fg-sub)] text-sm leading-relaxed line-clamp-2 mb-5">{project.description}</p>
                <div className="font-mono text-xs text-[var(--fg-sub)] bg-[var(--fg-sub)]/5 p-3.5 rounded-xl border border-[var(--border)] space-y-2">
                  <div className="flex items-center gap-2"><User className="w-3.5 h-3.5 text-[#1A6BFF]" /> Supervisor: <strong className="text-[var(--fg)]">{project.supervisor}</strong></div>
                  <div className="flex items-center gap-2"><Building2 className="w-3.5 h-3.5 text-[#FF4D4F]" /> Sponsor: <strong className="text-[var(--fg)]">{project.funding}</strong></div>
                </div>
                <div className="mt-4 pt-4 border-t border-[var(--border)] flex items-center justify-between">
                  <span className="text-[10px] font-mono text-[var(--fg-sub)]">Benchmark Metric</span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-mono font-bold bg-[#1A6BFF]/10 text-[#1A6BFF] border border-[#1A6BFF]/20">
                    <TrendingUp className="w-3.5 h-3.5" /> {project.metric}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
