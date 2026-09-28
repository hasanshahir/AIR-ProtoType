import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Mail, GraduationCap, ExternalLink, Users, Sparkles } from 'lucide-react'
import TiltCard from '../components/TiltCard'
import teamData from '../data/team.json'
import { useScrollCraft } from '../hooks/useScrollCraft'

type Category = 'Faculty' | 'Postgraduate' | 'Undergraduate'

export default function Team() {
  const [active, setActive] = useState<Category>('Faculty')
  const sc = useScrollCraft()

  useEffect(() => {
    const t = setTimeout(() => {
      sc.reveal('[data-sc="team-card"]', {
        direction: 'up',
        distance: '28px',
        duration: 550,
        ease: 'cubicOut',
        threshold: 0.05,
        once: false,
      })
    }, 60)
    return () => clearTimeout(t)
  }, [active, sc])

  useEffect(() => {
    sc.reveal('[data-sc="team-heading"]', {
      direction: 'up',
      distance: '24px',
      duration: 600,
      ease: 'cubicOut',
    })
  }, [sc])

  const filtered = teamData.filter(m => {
    if (active === 'Faculty') return m.role.includes('Faculty')
    if (active === 'Postgraduate') return m.role.includes('Postgraduate')
    return m.role.includes('Undergraduate')
  })

  const tabs: { id: Category; label: string; count: number }[] = [
    { id: 'Faculty', label: 'Faculty & Directors', count: teamData.filter(m => m.role.includes('Faculty')).length },
    { id: 'Postgraduate', label: 'Postgraduate Researchers', count: teamData.filter(m => m.role.includes('Postgraduate')).length },
    { id: 'Undergraduate', label: 'Undergraduate Scholars', count: teamData.filter(m => m.role.includes('Undergraduate')).length },
  ]

  return (
    <div className="min-h-screen pt-28 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
      {/* Subtle tech grid background */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none -z-10" />

      {/* Page Title */}
      <div className="mb-12" data-sc="team-heading">
        <span className="font-mono text-xs uppercase tracking-widest text-[var(--primary)] font-bold bg-[var(--primary)]/10 px-3.5 py-1.5 rounded-full border border-[var(--primary)]/20 inline-flex items-center gap-1.5 mb-4">
          <Users className="w-3.5 h-3.5" /> [THE SCIENTISTS & SCHOLARS]
        </span>
        <h1 className="text-4xl sm:text-6xl font-black tracking-tight font-head">
          Core Research Team
        </h1>
        <p className="mt-3 text-lg text-[var(--fg-sub)] max-w-2xl font-sans">
          World-class faculty investigators, PhD and MS research candidates, and high-impact undergraduate research interns.
        </p>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap gap-3 mb-12 border-b border-[var(--border)] pb-4" data-sc="team-heading">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActive(tab.id)}
            className={`px-5 py-2.5 rounded-xl font-mono text-xs font-bold transition-all duration-200 cursor-pointer flex items-center gap-2 ${
              active === tab.id
                ? 'btn-craftly-primary shadow-lg'
                : 'btn-craftly-secondary'
            }`}
          >
            <span>{tab.label}</span>
            <span className={`px-2 py-0.5 rounded-full text-[10px] ${active === tab.id ? 'bg-white/20 text-inherit' : 'bg-[var(--bg-muted)] text-[var(--fg-sub)]'}`}>
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* Grid of Team Cards with 3D Tilt & Image Color Pop */}
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.25 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filtered.map((member, i) => (
            <TiltCard key={member.id} tiltMaxAngleX={8} tiltMaxAngleY={8} scale={1.02}>
              <div
                data-sc="team-card"
                className="h-full rounded-2xl bg-[var(--bg-card)]/90 backdrop-blur-xl border border-[var(--border)] p-6 hover:border-[var(--primary)] hover:shadow-2xl hover:shadow-[var(--primary)]/15 transition-all duration-300 flex flex-col justify-between group"
                style={{ transitionDelay: `${i * 60}ms` }}
              >
                <div>
                  {/* DORMANT BLACK & WHITE PORTRAIT -> POPS TO FULL VIVID COLOR ON HOVER */}
                  <div className="relative aspect-square rounded-xl overflow-hidden mb-5 bg-black/40 border border-[var(--border)] group-hover:border-[var(--primary)]/50 transition-colors">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-20 transition-opacity duration-300" />
                    
                    <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="p-1.5 rounded-lg btn-craftly-primary flex items-center justify-center shadow-lg">
                        <Sparkles className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold font-head group-hover:text-[var(--primary)] transition-colors">
                    {member.name}
                  </h3>
                  <p className="font-mono text-xs text-[var(--primary)] font-bold mt-1 uppercase tracking-wider">
                    {member.role}
                  </p>

                  <div className="mt-3">
                    <span className="inline-block px-3 py-1 rounded-md text-xs font-mono bg-[var(--bg-muted)] text-[var(--fg-sub)] border border-[var(--border)]">
                      {member.area}
                    </span>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-[var(--border)] flex items-center justify-between font-mono text-xs">
                  <a
                    href={`mailto:${member.email}`}
                    className="flex items-center gap-1.5 text-[var(--fg-sub)] hover:text-[var(--primary)] transition-colors"
                  >
                    <Mail className="w-3.5 h-3.5" /> Contact
                  </a>
                  <a
                    href={member.scholar}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 text-[var(--fg-sub)] hover:text-[var(--primary)] transition-colors"
                  >
                    <GraduationCap className="w-3.5 h-3.5" /> Scholar <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </TiltCard>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
