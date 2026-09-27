import { useEffect } from 'react'
import { Handshake, ExternalLink, ShieldCheck, CheckCircle2 } from 'lucide-react'
import TiltCard from '../components/TiltCard'
import collaborationsData from '../data/collaborations.json'
import { useScrollCraft } from '../hooks/useScrollCraft'

export default function Collaborations() {
  const sc = useScrollCraft()

  useEffect(() => {
    sc.reveal('[data-sc="collab-heading"]', {
      direction: 'up',
      distance: '24px',
      duration: 600,
      ease: 'cubicOut',
    })

    sc.reveal('[data-sc="collab-card"]', {
      direction: 'up',
      distance: '32px',
      duration: 650,
      ease: 'quartOut',
      threshold: 0.08,
    })
  }, [sc])

  return (
    <div className="min-h-screen pt-28 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
      {/* Subtle tech grid background */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none -z-10" />

      {/* Header */}
      <div className="mb-14" data-sc="collab-heading">
        <span className="font-mono text-xs uppercase tracking-widest text-[var(--primary)] font-bold bg-[var(--primary)]/10 px-3.5 py-1.5 rounded-full border border-[var(--primary)]/20 inline-flex items-center gap-1.5 mb-4">
          <Handshake className="w-3.5 h-3.5" /> [GLOBAL ACADEMIC & INDUSTRY ALLIANCES]
        </span>
        <h1 className="text-4xl sm:text-6xl font-black tracking-tight font-head">
          Strategic Collaborations
        </h1>
        <p className="mt-3 text-lg text-[var(--fg-sub)] max-w-2xl font-sans">
          Partnering with international tech powerhouses, leading universities, and national research centers to amplify our impact.
        </p>
      </div>

      {/* Grid of Collaborations with 3D Tilt & Dormant Image Color Pop */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        {collaborationsData.map((collab, index) => (
          <TiltCard key={collab.id} tiltMaxAngleX={8} tiltMaxAngleY={8} scale={1.02}>
            <div
              data-sc="collab-card"
              className="h-full rounded-2xl border border-[var(--border)] bg-[var(--bg-card)]/90 backdrop-blur-xl overflow-hidden flex flex-col justify-between hover:border-[var(--primary)] hover:shadow-2xl hover:shadow-[var(--primary)]/15 transition-all duration-400 group"
              style={{ transitionDelay: `${index * 80}ms` }}
            >
              <div>
                {/* DORMANT IMAGE: Black & White dormant, pops with vivid color on hover! */}
                <div className="relative h-52 w-full overflow-hidden bg-black/40">
                  <img
                    src={collab.image}
                    alt={collab.partner}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                    <span className="px-3 py-1 rounded-md text-xs font-mono font-bold bg-[var(--primary)] text-black">
                      {collab.type}
                    </span>
                    <span className="px-3 py-1 rounded-md text-xs font-mono font-bold bg-black/75 text-white border border-white/20">
                      {collab.grantAmount}
                    </span>
                  </div>

                  <div className="absolute bottom-4 left-4">
                    <h3 className="text-2xl font-bold font-head text-white group-hover:text-[var(--primary)] transition-colors">
                      {collab.partner}
                    </h3>
                    <p className="text-xs font-mono text-[var(--primary)]">{collab.period}</p>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="text-xs font-mono font-bold text-[var(--primary)] uppercase tracking-wider mb-2">
                    Focus: {collab.focus}
                  </div>
                  <p className="text-sm text-[var(--fg-sub)] leading-relaxed mb-6 font-sans">
                    {collab.description}
                  </p>

                  {/* Tangible Outcomes */}
                  <div className="rounded-xl bg-[var(--bg)]/80 border border-[var(--border)] p-4">
                    <div className="text-xs font-mono font-bold text-[var(--fg)] mb-2 flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                      Key Joint Deliverables:
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {collab.outcomes.map((outcome, oIdx) => (
                        <span
                          key={oIdx}
                          className="px-2.5 py-1 rounded-md text-[11px] font-mono bg-[var(--bg-muted)] text-[var(--fg)] border border-[var(--border)] flex items-center gap-1"
                        >
                          <CheckCircle2 className="w-3 h-3 text-[var(--primary)]" />
                          {outcome}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0 border-t border-[var(--border)]/40 mt-auto">
                <div className="pt-3 flex items-center justify-between text-xs font-mono text-[var(--fg-sub)]">
                  <span>Alliance Status: <strong className="text-emerald-400">Active</strong></span>
                  <span className="text-[var(--primary)] font-bold group-hover:underline inline-flex items-center gap-1">
                    Partnership Details <ExternalLink className="w-3 h-3" />
                  </span>
                </div>
              </div>
            </div>
          </TiltCard>
        ))}
      </div>
    </div>
  )
}
