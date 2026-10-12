import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Search,
  Layers,
  Activity,
  X,
  Award,
  Zap,
  Calendar,
  Image as ImageIcon,
  CheckCircle2,
  Clock,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { getProjects } from '../lib/data'
import type { ProjectItem } from '../types/data'
import { CornerBracket } from '../components/ui/CornerBracket'

type StatusTab = 'All' | 'Ongoing' | 'Finished'

export default function Projects() {
  const [statusTab, setStatusTab] = useState<StatusTab>('All')
  const [activeCategory, setActiveCategory] = useState<string>('All')
  const [query, setQuery] = useState('')
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null)
  const [activeGalleryIndex, setActiveGalleryIndex] = useState<number>(0)

  const projectsData = useMemo(() => getProjects(), [])
  const categories = ['All', 'Funded', 'R&D', 'Undergraduate', 'Postgraduate']

  const filtered = useMemo(() => {
    return projectsData.filter(p => {
      const matchesStatus = statusTab === 'All' || p.status === statusTab
      const matchesCat = activeCategory === 'All' || p.category === activeCategory
      const matchesSearch =
        query === '' ||
        p.title.toLowerCase().includes(query.toLowerCase()) ||
        p.description.toLowerCase().includes(query.toLowerCase()) ||
        p.funding.toLowerCase().includes(query.toLowerCase())
      return matchesStatus && matchesCat && matchesSearch
    })
  }, [projectsData, statusTab, activeCategory, query])

  const ongoingCount = useMemo(() => projectsData.filter(p => p.status === 'Ongoing').length, [projectsData])
  const finishedCount = useMemo(() => projectsData.filter(p => p.status === 'Finished').length, [projectsData])

  return (
    <div className="min-h-screen pt-14 sm:pt-20 pb-28 px-4 sm:px-6 max-w-[1180px] mx-auto relative font-sans text-[var(--text-primary)]">
      {/* ── Section Header ── */}
      <div className="mb-10 text-left max-w-3xl">
        <div className="mb-3">
          <CornerBracket tag="Active Portfolio" tagColor="bg-[var(--accent-orange)] text-white">
            Research Benchmarks
          </CornerBracket>
        </div>

        <h1 className="text-3xl sm:text-5xl font-normal text-[var(--text-primary)] tracking-tight leading-[1.1] mb-4 font-head">
          Applied AI Systems & Projects
        </h1>

        <p className="text-[15px] sm:text-[17px] text-[var(--text-muted)] leading-relaxed font-normal">
          Portfolio of ongoing and finished foundation architectures, edge robotics pipelines, and clinical diagnostic benchmarks developed at AIR Lab.
        </p>
      </div>

      {/* ── Telemetry Summary Bar ── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8 p-3 rounded-[4px] bg-[var(--bg-surface)] border border-[var(--border-hairline)] text-left">
        <div className="p-3 border-r border-[var(--border-hairline)] last:border-r-0">
          <div className="text-[11px] font-mono text-[var(--text-subtle)] uppercase tracking-wider mb-1 flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-[var(--accent-purple)]" /> Total Projects
          </div>
          <div className="text-xl sm:text-2xl font-semibold text-[var(--text-primary)] font-mono">{projectsData.length}</div>
        </div>

        <div className="p-3 border-r border-[var(--border-hairline)] last:border-r-0">
          <div className="text-[11px] font-mono text-[var(--text-subtle)] uppercase tracking-wider mb-1 flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-emerald-500" /> Ongoing Systems
          </div>
          <div className="text-xl sm:text-2xl font-semibold text-emerald-600 font-mono">
            {ongoingCount} Active
          </div>
        </div>

        <div className="p-3 border-r border-[var(--border-hairline)] last:border-r-0">
          <div className="text-[11px] font-mono text-[var(--text-subtle)] uppercase tracking-wider mb-1 flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-[var(--accent-orange)]" /> Finished
          </div>
          <div className="text-xl sm:text-2xl font-semibold text-[var(--text-primary)] font-mono">
            {finishedCount} Concluded
          </div>
        </div>

        <div className="p-3">
          <div className="text-[11px] font-mono text-[var(--text-subtle)] uppercase tracking-wider mb-1 flex items-center gap-1.5">
            <Activity className="w-3.5 h-3.5 text-[var(--accent-orange)]" /> Benchmarks
          </div>
          <div className="text-xl sm:text-2xl font-semibold text-[var(--accent-orange)] font-mono flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[var(--accent-orange)] animate-pulse" /> 100% SOTA
          </div>
        </div>
      </div>

      {/* ── Status Split (Ongoing vs Finished) + Filter Tabs ── */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-8 pb-5 border-b border-[var(--border-hairline)]">
        {/* Ongoing / Finished Toggle */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="inline-flex items-center gap-1 p-1 bg-[var(--bg-surface)] border border-[var(--border-hairline)] rounded-[2px]">
            {(['All', 'Ongoing', 'Finished'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setStatusTab(tab)}
                className={`px-3.5 py-1.5 rounded-[2px] text-xs font-mono font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
                  statusTab === tab
                    ? 'bg-[var(--accent-orange)] text-white shadow-xs'
                    : 'text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-page)]'
                }`}
              >
                <span>{tab}</span>
                <span className="text-[10px] opacity-80">
                  ({tab === 'All' ? projectsData.length : tab === 'Ongoing' ? ongoingCount : finishedCount})
                </span>
              </button>
            ))}
          </div>

          {/* Sub Categories */}
          <div className="flex flex-wrap items-center gap-1">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-2.5 py-1 rounded-[2px] text-xs font-mono transition-all cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-[var(--accent-purple)] text-white shadow-xs'
                    : 'bg-[var(--bg-surface)] text-[var(--text-muted)] border border-[var(--border-hairline)] hover:text-[var(--text-primary)]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-subtle)]" />
          <input
            type="text"
            placeholder="Search projects, grants..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            className="w-full pl-9 pr-3 h-9 rounded-[2px] border border-[var(--border-hairline)] bg-[var(--bg-surface)] text-xs font-mono text-[var(--text-primary)] placeholder:text-[var(--text-subtle)] focus:outline-none focus:border-[var(--accent-orange)] transition-all"
          />
        </div>
      </div>

      {/* ── Project Cards Grid ── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={statusTab + activeCategory + query}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left"
        >
          {filtered.map(proj => {
            const isOngoing = proj.status === 'Ongoing'
            return (
              <div
                key={proj.id}
                onClick={() => {
                  setSelectedProject(proj)
                  setActiveGalleryIndex(0)
                }}
                className="group bg-[var(--bg-surface)] border border-[var(--border-hairline)] rounded-[4px] p-5 flex flex-col justify-between hover:border-[var(--accent-purple)] hover:shadow-xl hover:-translate-y-1.5 transition-all duration-200 cursor-pointer relative"
              >
                <div>
                  {/* Image Cover Banner */}
                  <div className="relative h-44 w-full rounded-[2px] overflow-hidden bg-[var(--bg-page)] mb-4 border border-[var(--border-hairline)]">
                    <img
                      src={proj.coverImage || proj.images?.[0]}
                      alt={proj.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                    {/* Status badge (Ongoing / Finished) */}
                    <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between pointer-events-none">
                      <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-[2px] bg-white/95 text-[11px] font-mono font-medium text-[var(--text-primary)] shadow-xs">
                        <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-orange)]" />
                        {proj.category}
                      </span>

                      <span
                        className={`px-2 py-0.5 rounded-[2px] text-[10px] font-mono font-semibold flex items-center gap-1 ${
                          isOngoing
                            ? 'bg-emerald-500 text-white'
                            : 'bg-black/75 text-white'
                        }`}
                      >
                        {isOngoing ? <Clock className="w-2.5 h-2.5" /> : <CheckCircle2 className="w-2.5 h-2.5" />}
                        {proj.status}
                      </span>
                    </div>

                    {/* Metric pill */}
                    <div className="absolute bottom-2.5 left-2.5 pointer-events-none">
                      <span className="px-2 py-0.5 rounded-[2px] text-[11px] font-mono font-semibold text-white bg-[var(--accent-orange)] backdrop-blur-xs flex items-center gap-1">
                        <Zap className="w-3 h-3 text-white" /> {proj.metric}
                      </span>
                    </div>

                    {proj.images && proj.images.length > 1 && (
                      <div className="absolute bottom-2.5 right-2.5 pointer-events-none">
                        <span className="px-1.5 py-0.5 rounded-[2px] text-[10px] font-mono text-white bg-black/60 flex items-center gap-1">
                          <ImageIcon className="w-2.5 h-2.5" /> {proj.images.length}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-[17px] font-semibold text-[var(--text-primary)] mb-2 leading-snug group-hover:text-[var(--accent-orange)] transition-colors font-head">
                    {proj.title}
                  </h3>
                  <p className="text-[13px] text-[var(--text-muted)] leading-relaxed mb-4 line-clamp-3">
                    {proj.description}
                  </p>

                  {/* Metadata table (Dates & Grant source) */}
                  <div className="p-2.5 rounded-[2px] bg-[var(--bg-page)] border border-[var(--border-hairline)] space-y-1.5 text-[11px] font-mono text-[var(--text-muted)] mb-4">
                    <div className="flex items-center justify-between">
                      <span className="text-[var(--text-subtle)] flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-[var(--accent-purple)]" /> Timeline:
                      </span>
                      <span className="text-[var(--text-primary)] font-semibold">
                        {proj.startDate} — {proj.endDate || 'Present'}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[var(--text-subtle)] flex items-center gap-1">
                        <Award className="w-3 h-3 text-[var(--accent-orange)]" /> Grant Source:
                      </span>
                      <Link
                        to="/grants"
                        onClick={e => e.stopPropagation()}
                        className="text-[var(--accent-orange)] hover:underline font-semibold truncate max-w-[170px]"
                      >
                        {proj.funding} &rarr;
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Bottom Action Footer */}
                <div className="pt-3 border-t border-[var(--border-hairline)] flex items-center justify-between text-xs font-mono">
                  <span className="text-[var(--text-subtle)]">SYS_ID: #{proj.id.toString().padStart(3, '0')}</span>
                  <span className="text-[var(--accent-orange)] font-medium inline-flex items-center gap-1 group-hover:underline">
                    View Gallery & Details <span className="text-[11px]">↳</span>
                  </span>
                </div>
              </div>
            )
          })}
        </motion.div>
      </AnimatePresence>

      {/* Empty State */}
      {filtered.length === 0 && (
        <div className="text-center py-16 border border-dashed border-[var(--border-hairline)] rounded-[4px] bg-[var(--bg-surface)]">
          <p className="text-sm font-mono text-[var(--text-muted)]">No projects match the query "{query}".</p>
        </div>
      )}

      {/* ── Project Gallery & Specs Modal ── */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.98, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: 10 }}
              transition={{ duration: 0.2 }}
              className="w-full max-w-3xl bg-[var(--bg-surface)] border border-[var(--border-hairline)] rounded-[4px] shadow-2xl overflow-hidden flex flex-col max-h-[90vh] text-left"
            >
              <div className="px-4 py-2.5 bg-[var(--bg-page)] border-b border-[var(--border-hairline)] flex items-center justify-between select-none">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded-[2px] bg-[var(--accent-orange)] text-white text-[10px] font-mono font-semibold">
                    {selectedProject.status}
                  </span>
                  <span className="text-xs font-mono text-[var(--text-muted)]">
                    research.airlab.edu/projects/{selectedProject.id}
                  </span>
                </div>

                <button
                  onClick={() => setSelectedProject(null)}
                  className="p-1 text-[var(--text-subtle)] hover:text-[var(--text-primary)] rounded-[2px] transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="p-6 overflow-y-auto flex-1">
                {/* Image Gallery Viewer */}
                {selectedProject.images && selectedProject.images.length > 0 && (
                  <div className="mb-6">
                    <div className="h-64 sm:h-80 w-full rounded-[2px] overflow-hidden bg-[var(--bg-page)] border border-[var(--border-hairline)] mb-2">
                      <img
                        src={selectedProject.images[activeGalleryIndex] || selectedProject.coverImage}
                        alt={`${selectedProject.title} preview ${activeGalleryIndex + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    {selectedProject.images.length > 1 && (
                      <div className="flex items-center gap-2 overflow-x-auto pb-1">
                        {selectedProject.images.map((img, idx) => (
                          <button
                            key={idx}
                            onClick={() => setActiveGalleryIndex(idx)}
                            className={`w-16 h-12 rounded-[2px] overflow-hidden border shrink-0 transition-all cursor-pointer ${
                              activeGalleryIndex === idx
                                ? 'border-[var(--accent-orange)] ring-1 ring-[var(--accent-orange)]'
                                : 'border-[var(--border-hairline)] opacity-60 hover:opacity-100'
                            }`}
                          >
                            <img src={img} alt="thumb" className="w-full h-full object-cover" />
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-2 font-head">
                  {selectedProject.title}
                </h2>

                <p className="text-sm text-[var(--text-muted)] leading-relaxed mb-6 font-normal">
                  {selectedProject.description}
                </p>

                {/* Specs Table */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono mb-6">
                  <div className="p-3 bg-[var(--bg-page)] border border-[var(--border-hairline)] rounded-[2px]">
                    <span className="text-[var(--text-subtle)] block mb-1">PROJECT TIMELINE</span>
                    <span className="font-semibold text-[var(--text-primary)]">
                      {selectedProject.startDate} — {selectedProject.endDate || 'Ongoing'}
                    </span>
                  </div>
                  <div className="p-3 bg-[var(--bg-page)] border border-[var(--border-hairline)] rounded-[2px]">
                    <span className="text-[var(--text-subtle)] block mb-1">GRANT & FUNDING SOURCE</span>
                    <Link to="/grants" className="font-semibold text-[var(--accent-orange)] hover:underline">
                      {selectedProject.funding} &rarr;
                    </Link>
                  </div>
                  <div className="p-3 bg-[var(--bg-page)] border border-[var(--border-hairline)] rounded-[2px]">
                    <span className="text-[var(--text-subtle)] block mb-1">KEY RECORDED SOTA METRIC</span>
                    <span className="font-semibold text-[var(--accent-orange)]">{selectedProject.metric}</span>
                  </div>
                  <div className="p-3 bg-[var(--bg-page)] border border-[var(--border-hairline)] rounded-[2px]">
                    <span className="text-[var(--text-subtle)] block mb-1">SYSTEM CLASSIFICATION</span>
                    <span className="font-semibold text-[var(--text-primary)]">{selectedProject.category} Initiative</span>
                  </div>
                </div>
              </div>

              <div className="px-6 py-3.5 bg-[var(--bg-surface)] border-t border-[var(--border-hairline)] flex items-center justify-end">
                <button
                  onClick={() => setSelectedProject(null)}
                  className="px-4 py-1.5 rounded-[2px] bg-[var(--accent-orange)] hover:bg-[var(--accent-orange-hover)] text-white text-xs font-mono font-medium transition-colors cursor-pointer"
                >
                  Close Inspection
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
