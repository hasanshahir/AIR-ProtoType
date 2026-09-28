import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { BookOpen, Copy, Check, ExternalLink } from 'lucide-react'
import TiltCard from '../components/TiltCard'
import pubData from '../data/publications.json'
import { useScrollCraft } from '../hooks/useScrollCraft'

export default function Publications() {
  const [activeVenue, setActiveVenue] = useState('All')
  const [copiedId, setCopiedId] = useState<number | null>(null)
  const sc = useScrollCraft()

  useEffect(() => {
    const t = setTimeout(() => {
      sc.reveal('[data-sc="pub-card"]', {
        direction: 'up',
        distance: '24px',
        duration: 500,
        ease: 'cubicOut',
        threshold: 0.05,
        once: false,
      })
    }, 60)
    return () => clearTimeout(t)
  }, [activeVenue, sc])

  useEffect(() => {
    sc.reveal('[data-sc="pub-heading"]', {
      direction: 'up',
      distance: '24px',
      duration: 600,
      ease: 'cubicOut',
    })
  }, [sc])

  const venues = ['All', 'NeurIPS', 'CVPR', 'ACL', 'ICLR Workshop']

  const filtered = pubData.filter(p => {
    if (activeVenue === 'All') return true
    return p.venue.includes(activeVenue)
  })

  const copyBibtex = (p: typeof pubData[0]) => {
    const bib = `@inproceedings{air_${p.id},\n  title={${p.title}},\n  author={${p.authors}},\n  booktitle={${p.venue}},\n  year={${p.year}}\n}`
    navigator.clipboard.writeText(bib)
    setCopiedId(p.id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  return (
    <div className="min-h-screen pt-28 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
      {/* Subtle tech grid background */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none -z-10" />

      {/* Header */}
      <div className="mb-12" data-sc="pub-heading">
        <span className="font-mono text-xs uppercase tracking-widest text-[var(--primary)] font-bold bg-[var(--primary)]/10 px-3.5 py-1.5 rounded-full border border-[var(--primary)]/20 inline-flex items-center gap-1.5 mb-4">
          <BookOpen className="w-3.5 h-3.5" /> [PEER-REVIEWED SCIENTIFIC OUTPUT]
        </span>
        <h1 className="text-4xl sm:text-6xl font-black tracking-tight font-head">
          Publications & Preprints
        </h1>
        <p className="mt-3 text-lg text-[var(--fg-sub)] max-w-2xl font-sans">
          Groundbreaking conference papers, journal articles, and open benchmark releases from AIR Lab scholars.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2 mb-12 border-b border-[var(--border)] pb-6" data-sc="pub-heading">
        {venues.map(v => (
          <button
            key={v}
            onClick={() => setActiveVenue(v)}
            className={`px-4 py-2 rounded-xl font-mono text-xs font-bold transition-all cursor-pointer ${
              activeVenue === v
                ? 'btn-craftly-primary shadow-md'
                : 'btn-craftly-secondary'
            }`}
          >
            {v}
          </button>
        ))}
      </div>

      {/* Publications List with 3D Tilt Cards */}
      <div className="space-y-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeVenue}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2 }}
            className="space-y-6"
          >
            {filtered.map((pub, i) => (
              <TiltCard key={pub.id} tiltMaxAngleX={4} tiltMaxAngleY={4} scale={1.01}>
                <div
                  data-sc="pub-card"
                  className="rounded-2xl border border-[var(--border)] bg-[var(--bg-card)]/90 backdrop-blur-xl p-6 sm:p-8 hover:border-[var(--primary)] hover:shadow-xl hover:shadow-[var(--primary)]/10 transition-all duration-300 group flex flex-col md:flex-row md:items-center justify-between gap-6"
                  style={{ transitionDelay: `${i * 40}ms` }}
                >
                  <div className="space-y-2 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded text-[11px] font-mono font-bold bg-[var(--primary)]/15 text-[var(--primary)] border border-[var(--primary)]/30">
                        {pub.venue}
                      </span>
                      <span className="px-2 py-0.5 rounded text-[11px] font-mono text-[var(--fg-sub)] bg-[var(--bg-muted)] border border-[var(--border)]">
                        Year {pub.year}
                      </span>
                      <span className="text-xs font-mono text-[var(--fg-sub)]">ID: #PUB-{pub.id}</span>
                    </div>

                    <h3 className="text-xl font-bold font-head group-hover:text-[var(--primary)] transition-colors leading-snug">
                      {pub.title}
                    </h3>

                    <p className="text-xs font-mono text-[var(--fg-sub)]">
                      Authors: <span className="text-[var(--fg)]">{pub.authors}</span>
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-3 shrink-0 pt-4 md:pt-0 border-t md:border-t-0 border-[var(--border)]">
                    <button
                      onClick={() => copyBibtex(pub)}
                      className="px-3 py-2 rounded-xl border border-[var(--border)] bg-[var(--bg)] hover:border-[var(--primary)] text-xs font-mono flex items-center gap-1.5 transition-colors cursor-pointer"
                      title="Copy BibTeX Citation"
                    >
                      {copiedId === pub.id ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="text-emerald-400">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-[var(--primary)]" />
                          <span>BibTeX</span>
                        </>
                      )}
                    </button>

                    <a
                      href={pub.link}
                      className="px-4 py-2 rounded-xl btn-craftly-primary text-xs font-mono font-bold shadow-sm transition-all inline-flex items-center gap-1.5"
                    >
                      <span>Paper PDF</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </TiltCard>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
