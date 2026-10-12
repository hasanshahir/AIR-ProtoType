import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Search,
  Cpu,
  Layers,
  Activity,
  X,
  Award,
  Copy,
  Check,
  Zap,
} from 'lucide-react'
import projectsData from '../data/projects.json'
import { CornerBracket } from '../components/ui/CornerBracket'

type Category = 'All' | 'Funded' | 'R&D' | 'Undergraduate' | 'Postgraduate'

interface ProjectItem {
  id: number
  title: string
  category: string
  description: string
  supervisor: string
  funding: string
  status: string
  image: string
  metric: string
}

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState<Category>('All')
  const [query, setQuery] = useState('')
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null)
  const [copiedId, setCopiedId] = useState<number | null>(null)
  const [modalTab, setModalTab] = useState<'specs' | 'architecture' | 'benchmarks'>('specs')

  const categories: Category[] = ['All', 'Funded', 'R&D', 'Undergraduate', 'Postgraduate']

  // Sort recent projects at top
  const sortedProjects = useMemo(() => {
    return [...projectsData].sort((a, b) => b.id - a.id)
  }, [])

  const filtered = useMemo(() => {
    return sortedProjects.filter(p => {
      const matchesCat = activeCategory === 'All' || p.category === activeCategory
      const matchesSearch =
        query === '' ||
        p.title.toLowerCase().includes(query.toLowerCase()) ||
        p.description.toLowerCase().includes(query.toLowerCase()) ||
        p.supervisor.toLowerCase().includes(query.toLowerCase()) ||
        p.funding.toLowerCase().includes(query.toLowerCase())
      return matchesCat && matchesSearch
    })
  }, [sortedProjects, activeCategory, query])

  const handleCopyCitation = (project: ProjectItem) => {
    const citation = `AIR-Lab Research: ${project.title}. Led by ${project.supervisor}. Grant: ${project.funding} (2026).`
    navigator.clipboard.writeText(citation)
    setCopiedId(project.id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  return (
    <div className="min-h-screen pt-14 sm:pt-20 pb-28 px-4 sm:px-6 max-w-[1180px] mx-auto relative font-sans text-[var(--text-primary)]">
      {/* ── Section Header ── */}
      <div className="mb-10 text-left max-w-3xl">
        <div className="mb-3">
          <CornerBracket tag="Active 2026" tagColor="bg-[var(--accent-orange)] text-white">R&D Initiatives</CornerBracket>
        </div>

        <h1 className="text-3xl sm:text-5xl font-normal text-[var(--text-primary)] tracking-tight leading-[1.1] mb-4 font-head">
          Applied AI Systems & Grants
        </h1>

        <p className="text-[15px] sm:text-[17px] text-[var(--text-muted)] leading-relaxed font-normal">
          From national grant initiatives funded by HEC & Ignite to open-source foundation models and autonomous systems.
        </p>
      </div>

      {/* ── Telemetry Summary Bar ── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8 p-3 rounded-[4px] bg-[var(--bg-surface)] border border-[var(--border-hairline)] text-left">
        <div className="p-3 border-r border-[var(--border-hairline)] last:border-r-0 transition-transform duration-200 hover:-translate-y-1 hover:scale-[1.02]">
          <div className="text-[11px] font-mono text-[var(--text-subtle)] uppercase tracking-wider mb-1 flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-[var(--accent-purple)]" /> Total Projects
          </div>
          <div className="text-xl sm:text-2xl font-semibold text-[var(--text-primary)] font-mono">{projectsData.length}</div>
        </div>

        <div className="p-3 border-r border-[var(--border-hairline)] last:border-r-0 transition-transform duration-200 hover:-translate-y-1 hover:scale-[1.02]">
          <div className="text-[11px] font-mono text-[var(--text-subtle)] uppercase tracking-wider mb-1 flex items-center gap-1.5">
            <Award className="w-3.5 h-3.5 text-[var(--accent-orange)]" /> Funded Grants
          </div>
          <div className="text-xl sm:text-2xl font-semibold text-[var(--text-primary)] font-mono">
            {projectsData.filter(p => p.category === 'Funded').length} Active
          </div>
        </div>

        <div className="p-3 border-r border-[var(--border-hairline)] last:border-r-0 transition-transform duration-200 hover:-translate-y-1 hover:scale-[1.02]">
          <div className="text-[11px] font-mono text-[var(--text-subtle)] uppercase tracking-wider mb-1 flex items-center gap-1.5">
            <Cpu className="w-3.5 h-3.5 text-[var(--accent-purple)]" /> Core Models
          </div>
          <div className="text-xl sm:text-2xl font-semibold text-[var(--text-primary)] font-mono">BERT / YOLO / Diff</div>
        </div>

        <div className="p-3 transition-transform duration-200 hover:-translate-y-1 hover:scale-[1.02]">
          <div className="text-[11px] font-mono text-[var(--text-subtle)] uppercase tracking-wider mb-1 flex items-center gap-1.5">
            <Activity className="w-3.5 h-3.5 text-[var(--accent-orange)]" /> System Status
          </div>
          <div className="text-xl sm:text-2xl font-semibold text-[var(--accent-orange)] font-mono flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[var(--accent-orange)] animate-pulse" /> 100% SOTA
          </div>
        </div>
      </div>

      {/* ── Filter Tabs & Search Controls ── */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mb-8 pb-5 border-b border-[var(--border-hairline)]">
        {/* Rectangular Category Filter Tabs */}
        <div className="flex flex-wrap items-center gap-1.5 bg-[var(--bg-surface)] p-1 border border-[var(--border-hairline)] rounded-[2px]">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 rounded-[2px] text-xs font-mono font-medium transition-all cursor-pointer select-none ${
                activeCategory === cat
                  ? 'bg-[var(--accent-orange)] text-white shadow-xs'
                  : 'text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-page)]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Rectangular Search Input */}
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-subtle)]" />
          <input
            type="text"
            placeholder="Search systems, leads, grants..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            className="w-full pl-9 pr-3 h-9 rounded-[2px] border border-[var(--border-hairline)] bg-[var(--bg-surface)] text-xs font-mono text-[var(--text-primary)] placeholder:text-[var(--text-subtle)] focus:outline-none focus:border-[var(--accent-orange)] transition-all"
          />
        </div>
      </div>

      {/* ── Project Cards Grid ── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeCategory + query}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filtered.map(proj => (
            <div
              key={proj.id}
              onClick={() => setSelectedProject(proj)}
              className="group bg-[var(--bg-surface)] border border-[var(--border-hairline)] rounded-[4px] p-5 flex flex-col justify-between hover:border-[var(--accent-purple)] hover:shadow-xl hover:-translate-y-1.5 transition-all duration-200 cursor-pointer text-left relative"
            >
              <div>
                {/* Image Banner */}
                <div className="relative h-44 w-full rounded-[2px] overflow-hidden bg-[var(--bg-page)] mb-4 border border-[var(--border-hairline)]">
                  <img
                    src={proj.image}
                    alt={proj.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                  {/* Badges on Banner */}
                  <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between pointer-events-none">
                    <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-[2px] bg-white/95 text-[11px] font-mono font-medium text-[var(--text-primary)] shadow-xs">
                      <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-orange)]" />
                      {proj.category}
                    </span>

                    <span className="px-2 py-0.5 rounded-[2px] text-[10px] font-mono bg-[var(--text-primary)]/90 text-white">
                      {proj.status}
                    </span>
                  </div>

                  <div className="absolute bottom-2.5 left-2.5 pointer-events-none">
                    <span className="px-2 py-0.5 rounded-[2px] text-[11px] font-mono font-semibold text-white bg-[var(--accent-orange)] backdrop-blur-xs flex items-center gap-1">
                      <Zap className="w-3 h-3 text-white" /> {proj.metric}
                    </span>
                  </div>
                </div>

                {/* Title & Description */}
                <h3 className="text-[17px] font-semibold text-[var(--text-primary)] mb-2 leading-snug group-hover:text-[var(--accent-orange)] transition-colors font-head">
                  {proj.title}
                </h3>
                <p className="text-[13px] text-[var(--text-muted)] leading-relaxed mb-4 line-clamp-3">
                  {proj.description}
                </p>

                {/* Metadata table */}
                <div className="p-2.5 rounded-[2px] bg-[var(--bg-page)] border border-[var(--border-hairline)] space-y-1 text-[11px] font-mono text-[var(--text-muted)] mb-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[var(--text-subtle)]">Supervisor:</span>
                    <span className="text-[var(--text-primary)] font-semibold">{proj.supervisor}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[var(--text-subtle)]">Grant / Source:</span>
                    <span className="text-[var(--text-primary)] font-semibold truncate max-w-[160px]">{proj.funding}</span>
                  </div>
                </div>
              </div>

              {/* Bottom Action Footer */}
              <div className="pt-3 border-t border-[var(--border-hairline)] flex items-center justify-between text-xs font-mono">
                <span className="text-[var(--text-subtle)]">SYS_ID: #{proj.id.toString().padStart(3, '0')}</span>
                <span className="text-[var(--accent-orange)] font-medium inline-flex items-center gap-1 group-hover:underline">
                  Inspect Architecture <span className="text-[11px]">↳</span>
                </span>
              </div>
            </div>
          ))}
        </motion.div>
      </AnimatePresence>

      {/* Empty State */}
      {filtered.length === 0 && (
        <div className="text-center py-16 border border-dashed border-[var(--border-hairline)] rounded-[4px] bg-[var(--bg-surface)]">
          <p className="text-sm font-mono text-[var(--text-muted)]">No projects match the query "{query}".</p>
        </div>
      )}

      {/* ── Architecture & Specs Modal ── */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.98, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: 10 }}
              transition={{ duration: 0.2 }}
              className="w-full max-w-3xl bg-[var(--bg-surface)] border border-[var(--border-hairline)] rounded-[4px] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
            >
              {/* Window Header Bar */}
              <div className="px-4 py-2.5 bg-[var(--bg-page)] border-b border-[var(--border-hairline)] flex items-center justify-between select-none">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-[var(--accent-orange)]" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[var(--accent-purple)]" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[var(--border-hairline-dark)]" />
                  </div>
                  <div className="ml-3 px-3 py-0.5 rounded-[2px] bg-[var(--bg-surface)] border border-[var(--border-hairline)] text-[11px] font-mono text-[var(--text-muted)]">
                    research.airlab.edu/projects/{selectedProject.id}
                  </div>
                </div>

                <button
                  onClick={() => setSelectedProject(null)}
                  className="p-1 text-[var(--text-subtle)] hover:text-[var(--text-primary)] rounded-[2px] transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 overflow-y-auto flex-1 text-left ft-dotted-grid bg-[var(--bg-surface)]">
                {/* Top Badge & Title */}
                <div className="flex items-center justify-between gap-3 mb-2">
                  <span className="px-2 py-0.5 rounded-[2px] bg-[var(--accent-orange)] text-white text-[11px] font-mono">
                    {selectedProject.category} • {selectedProject.status}
                  </span>
                  <span className="text-xs font-mono text-[var(--text-subtle)]">ID #{selectedProject.id}</span>
                </div>

                <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-3 leading-tight font-head">
                  {selectedProject.title}
                </h2>

                <p className="text-[14px] text-[var(--text-muted)] leading-relaxed mb-6 bg-[var(--bg-page)] p-3.5 border border-[var(--border-hairline)] rounded-[2px]">
                  {selectedProject.description}
                </p>

                {/* Tabbed Navigation Inside Modal */}
                <div className="flex items-center gap-2 mb-4 border-b border-[var(--border-hairline)] pb-2">
                  <button
                    onClick={() => setModalTab('specs')}
                    className={`px-3 py-1 text-xs font-mono rounded-[2px] border transition-colors cursor-pointer ${
                      modalTab === 'specs'
                        ? 'bg-[var(--accent-orange)] text-white border-[var(--accent-orange)]'
                        : 'bg-[var(--bg-surface)] text-[var(--text-muted)] border-[var(--border-hairline)] hover:bg-[var(--bg-page)]'
                    }`}
                  >
                    System Specs
                  </button>
                  <button
                    onClick={() => setModalTab('architecture')}
                    className={`px-3 py-1 text-xs font-mono rounded-[2px] border transition-colors cursor-pointer ${
                      modalTab === 'architecture'
                        ? 'bg-[var(--accent-orange)] text-white border-[var(--accent-orange)]'
                        : 'bg-[var(--bg-surface)] text-[var(--text-muted)] border-[var(--border-hairline)] hover:bg-[var(--bg-page)]'
                    }`}
                  >
                    Neural Architecture
                  </button>
                  <button
                    onClick={() => setModalTab('benchmarks')}
                    className={`px-3 py-1 text-xs font-mono rounded-[2px] border transition-colors cursor-pointer ${
                      modalTab === 'benchmarks'
                        ? 'bg-[var(--accent-orange)] text-white border-[var(--accent-orange)]'
                        : 'bg-[var(--bg-surface)] text-[var(--text-muted)] border-[var(--border-hairline)] hover:bg-[var(--bg-page)]'
                    }`}
                  >
                    Benchmarks & SOTA
                  </button>
                </div>

                {/* Tab Contents */}
                {modalTab === 'specs' && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
                    <div className="p-3 bg-[var(--bg-surface)] border border-[var(--border-hairline)] rounded-[2px]">
                      <span className="text-[var(--text-subtle)] block mb-1">LEAD INVESTIGATOR</span>
                      <span className="font-semibold text-[var(--text-primary)] text-sm">{selectedProject.supervisor}</span>
                    </div>
                    <div className="p-3 bg-[var(--bg-surface)] border border-[var(--border-hairline)] rounded-[2px]">
                      <span className="text-[var(--text-subtle)] block mb-1">FUNDING AGENCY</span>
                      <span className="font-semibold text-[var(--text-primary)] text-sm">{selectedProject.funding}</span>
                    </div>
                    <div className="p-3 bg-[var(--bg-surface)] border border-[var(--border-hairline)] rounded-[2px]">
                      <span className="text-[var(--text-subtle)] block mb-1">BENCHMARK GAIN</span>
                      <span className="font-semibold text-[var(--accent-orange)] text-sm">{selectedProject.metric}</span>
                    </div>
                    <div className="p-3 bg-[var(--bg-surface)] border border-[var(--border-hairline)] rounded-[2px]">
                      <span className="text-[var(--text-subtle)] block mb-1">INSPECTION STATUS</span>
                      <span className="font-semibold text-[var(--text-primary)] text-sm">Validated in Lab Testing</span>
                    </div>
                  </div>
                )}

                {modalTab === 'architecture' && (
                  <div className="p-4 bg-[var(--bg-surface)] border border-[var(--border-hairline)] rounded-[2px] text-xs font-mono space-y-3">
                    <div className="flex items-center justify-between pb-2 border-b border-[var(--border-hairline)]">
                      <span className="text-[var(--text-subtle)]">Backbone Framework:</span>
                      <span className="text-[var(--text-primary)] font-semibold">PyTorch 2.4 / ONNX Edge Runtime</span>
                    </div>
                    <div className="flex items-center justify-between pb-2 border-b border-[var(--border-hairline)]">
                      <span className="text-[var(--text-subtle)]">Precision Quantization:</span>
                      <span className="text-[var(--text-primary)] font-semibold">FP16 / INT8 TensorRT accelerated</span>
                    </div>
                    <div className="flex items-center justify-between pb-2 border-b border-[var(--border-hairline)]">
                      <span className="text-[var(--text-subtle)]">Parameter Count:</span>
                      <span className="text-[var(--text-primary)] font-semibold">110M - 350M Parameters</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[var(--text-subtle)]">Telemetry Monitoring:</span>
                      <span className="text-[var(--accent-orange)] font-semibold">Live Weights Tracked in Weights & Biases</span>
                    </div>
                  </div>
                )}

                {modalTab === 'benchmarks' && (
                  <div className="p-4 bg-[var(--bg-surface)] border border-[var(--border-hairline)] rounded-[2px] text-xs font-mono space-y-3">
                    <div className="flex items-center justify-between pb-2 border-b border-[var(--border-hairline)]">
                      <span className="text-[var(--text-subtle)]">Top Recorded Metric:</span>
                      <span className="text-[var(--accent-orange)] font-bold text-sm">{selectedProject.metric}</span>
                    </div>
                    <div className="flex items-center justify-between pb-2 border-b border-[var(--border-hairline)]">
                      <span className="text-[var(--text-subtle)]">Inference Device:</span>
                      <span className="text-[var(--text-primary)] font-semibold">NVIDIA RTX 4090 / Jetson Orin Nano</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[var(--text-subtle)]">Dataset Origin:</span>
                      <span className="text-[var(--text-primary)] font-semibold">Curated Local Academic & Clinical Datasets</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Modal Footer Controls */}
              <div className="px-6 py-3.5 bg-[var(--bg-surface)] border-t border-[var(--border-hairline)] flex items-center justify-between">
                <button
                  onClick={() => handleCopyCitation(selectedProject)}
                  className="px-3 py-1.5 rounded-[2px] border border-[var(--border-hairline)] bg-[var(--bg-surface)] hover:bg-[var(--bg-page)] text-xs font-mono text-[var(--text-muted)] flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  {copiedId === selectedProject.id ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-[var(--accent-orange)]" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-[var(--text-subtle)]" />
                      <span>Copy Citation</span>
                    </>
                  )}
                </button>

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
