import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { BookOpen, Copy, Check, Award, FileText } from 'lucide-react'
import pubData from '../data/publications.json'
import Badge from '../components/ui/Badge'
import SectionReveal from '../components/ui/SectionReveal'

type FilterType = 'All' | 'Journal' | 'Conference'

export default function Publications() {
  const [activeType, setActiveType] = useState<FilterType>('All')
  const [activeVenue, setActiveVenue] = useState('All')
  const [copiedId, setCopiedId] = useState<number | null>(null)

  // Enforce sorted order: recent papers at top (descending by year, then id)
  const sortedPublications = useMemo(() => {
    return [...pubData].sort((a, b) => {
      if (b.year !== a.year) return b.year - a.year
      return b.id - a.id
    })
  }, [])

  const types: { id: FilterType; label: string; count: number }[] = [
    { id: 'All', label: 'All Publications', count: sortedPublications.length },
    { id: 'Journal', label: 'Journals', count: sortedPublications.filter(p => p.type === 'Journal').length },
    { id: 'Conference', label: 'Conferences', count: sortedPublications.filter(p => p.type === 'Conference').length },
  ]

  const venues = ['All', 'IEEE', 'Nature', 'ACL', 'CVPR', 'NeurIPS', 'Elsevier']

  const filtered = useMemo(() => {
    return sortedPublications.filter(p => {
      const matchType = activeType === 'All' || p.type === activeType
      const matchVenue = activeVenue === 'All' || p.venue.toLowerCase().includes(activeVenue.toLowerCase())
      return matchType && matchVenue
    })
  }, [sortedPublications, activeType, activeVenue])

  const copyBibtex = (p: typeof pubData[0]) => {
    const bib = `@${p.type === 'Journal' ? 'article' : 'inproceedings'}{air_${p.id},\n  title={${p.title}},\n  author={${p.authors}},\n  ${p.type === 'Journal' ? 'journal' : 'booktitle'}={${p.venue}},\n  year={${p.year}}\n}`
    navigator.clipboard.writeText(bib)
    setCopiedId(p.id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  return (
    <div className="min-h-screen pt-16 sm:pt-24 pb-28 px-6 max-w-[1200px] mx-auto relative font-sans text-[var(--text-primary)]">
      {/* Header */}
      <div className="mb-12 text-left max-w-3xl">
        <SectionReveal delay={0}>
          <div className="mb-4">
            <Badge variant="purple" icon={<BookOpen className="w-3.5 h-3.5 text-white" />}>
              PEER-REVIEWED SCIENTIFIC OUTPUT
            </Badge>
          </div>
        </SectionReveal>

        <SectionReveal delay={0.08}>
          <h1 className="font-head font-normal text-[var(--text-primary)] mb-3 tracking-tight">
            Research Papers & Publications
          </h1>
        </SectionReveal>

        <SectionReveal delay={0.16}>
          <p className="text-[16px] sm:text-[18px] text-[var(--text-muted)] leading-relaxed font-normal">
            Groundbreaking peer-reviewed journals, international conference proceedings, and foundational preprints from AIR Lab researchers.
          </p>
        </SectionReveal>
      </div>

      {/* Primary Category Filter */}
      <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[var(--border-hairline)] pb-6">
        <div className="inline-flex items-center gap-1.5 p-1 bg-[var(--bg-surface)] border border-[var(--border-hairline)] rounded-[2px] shadow-xs">
          {types.map(t => {
            const isActive = activeType === t.id
            return (
              <button
                key={t.id}
                onClick={() => {
                  setActiveType(t.id)
                  setActiveVenue('All')
                }}
                className={`relative px-3.5 py-1.5 rounded-[2px] text-[13px] font-medium transition-all duration-150 cursor-pointer select-none flex items-center gap-2 ${
                  isActive
                    ? 'bg-[var(--accent-orange)] text-white shadow-xs'
                    : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
                }`}
              >
                <span>{t.label}</span>
                <span
                  className={`text-[10px] font-mono px-1.5 py-0.2 rounded-[2px] ${
                    isActive ? 'bg-white/20 text-white' : 'bg-[var(--bg-page)] text-[var(--text-muted)] border border-[var(--border-hairline)]'
                  }`}
                >
                  {t.count}
                </span>
              </button>
            )
          })}
        </div>

        {/* Venue Filter Pills */}
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-xs font-mono text-[var(--text-subtle)] mr-1">Filter Venue:</span>
          {venues.map(v => (
            <button
              key={v}
              onClick={() => setActiveVenue(v)}
              className={`px-3 py-1 rounded-[2px] text-xs font-mono transition-all cursor-pointer ${
                activeVenue === v
                  ? 'bg-[var(--accent-purple)] text-white shadow-xs'
                  : 'bg-[var(--bg-surface)] text-[var(--text-muted)] border border-[var(--border-hairline)] hover:text-[var(--text-primary)]'
              }`}
            >
              {v}
            </button>
          ))}
        </div>
      </div>

      {/* Publications List */}
      <div className="space-y-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={`${activeType}-${activeVenue}`}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2 }}
            className="space-y-6"
          >
            {filtered.map((pub, i) => {
              const isJournal = pub.type === 'Journal'
              return (
                <div
                  key={pub.id}
                  className="craftly-card p-6 sm:p-8 flex flex-col md:flex-row md:items-start justify-between gap-6 group hover:border-[var(--accent-purple)] hover:shadow-xl hover:-translate-y-1 transition-all duration-200 cursor-pointer text-left bg-[var(--bg-surface)] border border-[var(--border-hairline)] rounded-[4px]"
                  style={{ transitionDelay: `${i * 30}ms` }}
                >
                  <div className="space-y-3 flex-1">
                    {/* Header Badges */}
                    <div className="flex flex-wrap items-center gap-2">
                      {isJournal ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-[2px] text-xs font-mono font-semibold bg-[var(--accent-orange-light)] text-[var(--accent-orange)] border border-[var(--accent-orange)]/20">
                          <Award className="w-3.5 h-3.5 text-[var(--accent-orange)]" />
                          Journal Paper
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-[2px] text-xs font-mono font-semibold bg-[var(--accent-purple-light)] text-[var(--accent-purple)] border border-[var(--accent-purple)]/20">
                          <FileText className="w-3.5 h-3.5 text-[var(--accent-purple)]" />
                          Conference Proceeding
                        </span>
                      )}

                      {'impactFactor' in pub && pub.impactFactor && (
                        <span className="px-2.5 py-0.5 rounded-[2px] text-xs font-mono font-medium bg-[var(--bg-page)] text-[var(--text-muted)] border border-[var(--border-hairline)]">
                          {pub.impactFactor}
                        </span>
                      )}

                      <span className="px-2.5 py-0.5 rounded-[2px] text-xs font-mono font-semibold bg-[var(--bg-page)] text-[var(--text-primary)] border border-[var(--border-hairline)]">
                        {pub.year}
                      </span>

                      <span className="text-xs font-mono text-[var(--text-subtle)]">#PUB-{pub.id}</span>
                    </div>

                    {/* Paper Title */}
                    <h3 className="text-[19px] sm:text-[21px] font-medium font-head text-[var(--text-primary)] group-hover:text-[var(--accent-orange)] transition-colors leading-snug">
                      {pub.title}
                    </h3>

                    {/* Venue */}
                    <div className="text-sm font-medium text-[var(--text-muted)] flex items-center gap-1.5">
                      <span className="text-[var(--accent-purple)] font-semibold font-mono text-xs">VENUE:</span>
                      <span>{pub.venue}</span>
                    </div>

                    {/* Authors */}
                    <p className="text-xs sm:text-[13px] font-mono text-[var(--text-muted)]">
                      Authors: <span className="text-[var(--text-primary)] font-semibold">{pub.authors}</span>
                    </p>

                    {/* Abstract snippet */}
                    {'abstract' in pub && pub.abstract && (
                      <p className="text-xs sm:text-[13.5px] text-[var(--text-muted)] italic leading-relaxed pt-1">
                        "{pub.abstract}"
                      </p>
                    )}

                    {/* Tags */}
                    {'tags' in pub && Array.isArray(pub.tags) && (
                      <div className="flex flex-wrap gap-1.5 pt-2">
                        {pub.tags.map((tag: string, idx: number) => (
                          <span
                            key={idx}
                            className="px-2 py-0.5 rounded-[2px] text-[11px] font-mono bg-[var(--bg-page)] text-[var(--text-muted)] border border-[var(--border-hairline)]"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex sm:flex-col items-center sm:items-end gap-2.5 shrink-0 pt-4 md:pt-0 border-t md:border-t-0 border-[var(--border-hairline)]">
                    <a
                      href={pub.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="h-9 px-4 rounded-[2px] bg-[var(--accent-orange)] hover:bg-[var(--accent-orange-hover)] text-white text-xs font-medium shadow-xs transition-all inline-flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
                    >
                      <span>Read Paper</span>
                      <span className="text-[11px]">↳</span>
                    </a>

                    <button
                      onClick={() => copyBibtex(pub)}
                      className="h-9 px-4 rounded-[2px] border border-[var(--border-hairline)] bg-[var(--bg-surface)] hover:bg-[var(--bg-page)] text-xs font-mono flex items-center gap-1.5 transition-colors cursor-pointer text-[var(--text-muted)] hover:text-[var(--text-primary)] whitespace-nowrap"
                      title="Copy BibTeX Citation"
                    >
                      {copiedId === pub.id ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-[var(--accent-orange)]" />
                          <span className="text-[var(--accent-orange)] font-semibold">BibTeX Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-[var(--text-subtle)]" />
                          <span>BibTeX Cite</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )
            })}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
