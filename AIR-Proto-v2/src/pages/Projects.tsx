import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FolderGit2, Search, ArrowUpRight } from 'lucide-react'
import TiltCard from '../components/TiltCard'
import projectsData from '../data/projects.json'
import { useScrollCraft } from '../hooks/useScrollCraft'

type Category = 'All' | 'Funded' | 'R&D' | 'Undergraduate' | 'Postgraduate'

export default function Projects() {
  const [active, setActive] = useState<Category>('All')
  const [query, setQuery] = useState('')
  const sc = useScrollCraft()

  useEffect(() => {
    const t = setTimeout(() => {
      sc.reveal('[data-sc="project-card"]', {
        direction: 'up',
        distance: '28px',
        duration: 550,
        ease: 'cubicOut',
        threshold: 0.05,
        once: false,
      })
    }, 60)
    return () => clearTimeout(t)
  }, [active, query, sc])

  useEffect(() => {
    sc.reveal('[data-sc="proj-heading"]', {
      direction: 'up',
      distance: '24px',
      duration: 600,
      ease: 'cubicOut',
    })
  }, [sc])

  const filtered = projectsData.filter(p => {
    const matchesCat = active === 'All' || p.category === active
    const matchesSearch = query === '' || 
      p.title.toLowerCase().includes(query.toLowerCase()) ||
      p.description.toLowerCase().includes(query.toLowerCase()) ||
      p.supervisor.toLowerCase().includes(query.toLowerCase())
    return matchesCat && matchesSearch
  })

  const categories: Category[] = ['All', 'Funded', 'R&D', 'Undergraduate', 'Postgraduate']

  return (
    <div className="min-h-screen pt-28 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
      {/* Subtle tech grid background */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none -z-10" />

      {/* Header */}
      <div className="mb-12" data-sc="proj-heading">
        <span className="font-mono text-xs uppercase tracking-widest text-[var(--primary)] font-bold bg-[var(--primary)]/10 px-3.5 py-1.5 rounded-full border border-[var(--primary)]/20 inline-flex items-center gap-1.5 mb-4">
          <FolderGit2 className="w-3.5 h-3.5" /> [APPLIED RESEARCH & SYSTEMS]
        </span>
        <h1 className="text-4xl sm:text-6xl font-black tracking-tight font-head">
          Research & Development Projects
        </h1>
        <p className="mt-3 text-lg text-[var(--fg-sub)] max-w-2xl font-sans">
          From state-funded national grant initiatives to innovative undergraduate capstones and open-source models.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-12 border-b border-[var(--border)] pb-6" data-sc="proj-heading">
        <div className="flex flex-wrap gap-2">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`px-4 py-2 rounded-xl font-mono text-xs font-bold transition-all cursor-pointer ${
                active === cat
                  ? 'btn-craftly-primary shadow-md'
                  : 'btn-craftly-secondary'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--fg-sub)]" />
          <input
            type="text"
            placeholder="Search projects, keywords, leads..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-[var(--border)] bg-[var(--bg-card)] text-xs font-mono text-[var(--fg)] placeholder:text-[var(--fg-sub)] focus:outline-none focus:border-[var(--primary)] transition-colors"
          />
        </div>
      </div>

      {/* Grid of Projects with 3D Tilt & Dormant Image Color Pop */}
      <AnimatePresence mode="wait">
        <motion.div
          key={active + query}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.25 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filtered.map((proj, i) => (
            <TiltCard key={proj.id} tiltMaxAngleX={8} tiltMaxAngleY={8} scale={1.02}>
              <div
                data-sc="project-card"
                className="h-full rounded-2xl bg-[var(--bg-card)]/90 backdrop-blur-xl border border-[var(--border)] overflow-hidden flex flex-col justify-between hover:border-[var(--primary)] hover:shadow-2xl hover:shadow-[var(--primary)]/15 transition-all duration-300 group"
                style={{ transitionDelay: `${i * 50}ms` }}
              >
                <div>
                  {/* DORMANT IMAGE CONTAINER: Black & White dormant, pops with vivid color on hover! */}
                  <div className="relative h-48 w-full overflow-hidden bg-black/40">
                    <img
                      src={proj.image}
                      alt={proj.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                      <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold bg-white/90 text-black border border-white/20 backdrop-blur-md">
                        {proj.category}
                      </span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-black/75 text-emerald-400 border border-emerald-500/30">
                        {proj.status}
                      </span>
                    </div>

                    <div className="absolute bottom-3 left-3">
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-black/80 text-white border border-white/20">
                        {proj.metric}
                      </span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6">
                    <h3 className="text-lg font-bold font-head mb-2 group-hover:text-[var(--primary)] transition-colors line-clamp-2">
                      {proj.title}
                    </h3>
                    <p className="text-xs text-[var(--fg-sub)] leading-relaxed mb-4 line-clamp-3">
                      {proj.description}
                    </p>
                    <div className="text-[11px] font-mono text-[var(--fg-sub)] space-y-1 pt-2 border-t border-[var(--border)]/50">
                      <div>Lead: <strong className="text-[var(--fg)]">{proj.supervisor}</strong></div>
                      <div>Grant: <strong className="text-[var(--primary)]">{proj.funding}</strong></div>
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-0 border-t border-[var(--border)]/40 mt-auto">
                  <div className="pt-3 flex items-center justify-between text-xs font-mono">
                    <span className="text-[var(--fg-sub)]">ID: #{proj.id}</span>
                    <span className="text-[var(--primary)] font-bold group-hover:underline inline-flex items-center gap-1">
                      Details <ArrowUpRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </div>
            </TiltCard>
          ))}
        </motion.div>
      </AnimatePresence>

      {filtered.length === 0 && (
        <div className="text-center py-20 border border-dashed border-[var(--border)] rounded-2xl">
          <p className="text-sm font-mono text-[var(--fg-sub)]">No projects match the selected criteria.</p>
        </div>
      )}
    </div>
  )
}
