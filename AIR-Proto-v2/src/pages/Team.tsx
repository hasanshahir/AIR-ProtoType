import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Tilt from 'react-parallax-tilt'
import { Mail, GraduationCap, ExternalLink } from 'lucide-react'
import teamData from '../data/team.json'
import { useScrollCraft } from '../hooks/useScrollCraft'

type Category = 'Faculty' | 'Postgraduate' | 'Undergraduate'

export default function Team() {
  const [active, setActive] = useState<Category>('Faculty')
  const sc = useScrollCraft()

  // Re-run reveals when tab changes so newly mounted cards animate in
  useEffect(() => {
    // Small delay to let AnimatePresence render new cards
    const t = setTimeout(() => {
      sc.reveal('[data-sc="team-card"]', {
        direction: 'up',
        distance: '28px',
        duration: 550,
        ease: 'cubicOut',
        threshold: 0.05,
        once: false, // re-trigger when switching tabs
      })
    }, 60)
    return () => clearTimeout(t)
  }, [active, sc])

  // Reveal headings + tabs once
  useEffect(() => {
    sc.reveal('[data-sc="team-heading"]', {
      direction: 'up', distance: '24px', duration: 600, ease: 'cubicOut',
    })
  }, [sc])

  const filtered = teamData.filter(m => {
    if (active === 'Faculty') return m.role.includes('Faculty')
    if (active === 'Postgraduate') return m.role.includes('Postgraduate')
    return m.role.includes('Undergraduate')
  })

  const tabs: { id: Category; label: string }[] = [
    { id: 'Faculty', label: 'Faculty Members' },
    { id: 'Postgraduate', label: 'Postgraduate Students' },
    { id: 'Undergraduate', label: 'Undergraduate Students' },
  ]

  return (
    <div className="min-h-screen pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="mb-12" data-sc="team-heading">
        <span className="font-mono text-xs uppercase tracking-widest text-[#1A6BFF] font-bold bg-[#1A6BFF]/10 px-3.5 py-1.5 rounded-full border border-[#1A6BFF]/20 inline-block mb-4">
          [THE PEOPLE BEHIND AIR LAB]
        </span>
        <h1 className="text-4xl sm:text-5xl font-black tracking-tight" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>Core Team & Researchers</h1>
        <p className="mt-3 text-lg text-[var(--fg-sub)] max-w-2xl">Meet our world-class faculty, postgraduate researchers, and passionate undergraduate scholars.</p>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-3 mb-12 border-b border-[var(--border)] pb-4" data-sc="team-heading">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActive(tab.id)}
            className={`px-5 py-2.5 rounded-xl font-mono text-sm font-bold transition-all duration-200 cursor-pointer ${
              active === tab.id
                ? 'bg-[#1A6BFF] text-white shadow-lg shadow-[#1A6BFF]/30'
                : 'bg-[var(--bg)] text-[var(--fg-sub)] border border-[var(--border)] hover:border-[#1A6BFF]/40 hover:text-[var(--fg)]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filtered.map((member, i) => (
            <Tilt key={member.id} tiltMaxAngleX={8} tiltMaxAngleY={8} scale={1.02} transitionSpeed={400} className="h-full">
              <div
                data-sc="team-card"
                className="h-full rounded-2xl bg-[var(--bg)] border border-[var(--border)] p-6 hover:border-[#1A6BFF] hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
                style={{ transitionDelay: `${i * 70}ms` }}
              >
                <div>
                  <div className="relative aspect-square rounded-xl overflow-hidden mb-5 bg-[var(--bg-muted)]">
                    <img src={member.image} alt={member.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <h3 className="text-xl font-bold group-hover:text-[#1A6BFF] transition-colors" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>{member.name}</h3>
                  <p className="font-mono text-xs text-[#1A6BFF] font-bold mt-1 uppercase tracking-wider">{member.role}</p>
                  <div className="mt-3">
                    <span className="inline-block px-3 py-1 rounded-md text-xs font-mono bg-[var(--fg-sub)]/8 text-[var(--fg-sub)] border border-[var(--border)]">{member.area}</span>
                  </div>
                </div>
                <div className="mt-6 pt-4 border-t border-[var(--border)] flex items-center justify-between font-mono text-xs">
                  <a href={`mailto:${member.email}`} className="flex items-center gap-1.5 text-[var(--fg-sub)] hover:text-[#1A6BFF] transition-colors">
                    <Mail className="w-3.5 h-3.5" /> Contact
                  </a>
                  <a href={member.scholar} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 text-[var(--fg-sub)] hover:text-[#FF4D4F] transition-colors">
                    <GraduationCap className="w-3.5 h-3.5" /> Scholar <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </Tilt>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
