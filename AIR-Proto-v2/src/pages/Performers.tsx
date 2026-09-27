import { useEffect } from 'react'
import { Trophy, Medal, Sparkles, Flame } from 'lucide-react'
import TiltCard from '../components/TiltCard'
import performersData from '../data/performers.json'
import { useScrollCraft } from '../hooks/useScrollCraft'

export default function Performers() {
  const sc = useScrollCraft()

  useEffect(() => {
    sc.reveal('[data-sc="perf-heading"]', {
      direction: 'up',
      distance: '24px',
      duration: 600,
      ease: 'cubicOut',
    })

    sc.reveal('[data-sc="perf-card"]', {
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
      <div className="mb-14" data-sc="perf-heading">
        <span className="font-mono text-xs uppercase tracking-widest text-amber-400 font-bold bg-amber-400/10 px-3.5 py-1.5 rounded-full border border-amber-400/20 inline-flex items-center gap-1.5 mb-4">
          <Trophy className="w-3.5 h-3.5" /> [ACADEMIC EXCELLENCE & HALL OF FAME]
        </span>
        <h1 className="text-4xl sm:text-6xl font-black tracking-tight font-head">
          High Performers of the Month
        </h1>
        <p className="mt-3 text-lg text-[var(--fg-sub)] max-w-2xl font-sans">
          Honoring outstanding researchers, breakthrough paper leads, and engineering champions at AIR Lab.
        </p>
      </div>

      {/* Podium Cards Grid with 3D Tilt & Dormant Image Color Pop */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        {performersData.map((perf, index) => {
          const isGold = perf.rank === 1
          const isSilver = perf.rank === 2

          return (
            <TiltCard key={perf.id} tiltMaxAngleX={8} tiltMaxAngleY={8} scale={1.02}>
              <div
                data-sc="perf-card"
                className={`h-full rounded-2xl border bg-[var(--bg-card)]/90 backdrop-blur-xl p-8 flex flex-col justify-between hover:shadow-2xl transition-all duration-400 group relative overflow-hidden ${
                  isGold
                    ? 'border-amber-400/50 shadow-amber-400/10 hover:border-amber-400'
                    : isSilver
                    ? 'border-slate-300/40 hover:border-slate-300'
                    : 'border-[var(--border)] hover:border-[var(--primary)]'
                }`}
                style={{ transitionDelay: `${index * 80}ms` }}
              >
                <div>
                  {/* Top Rank Badge */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-mono font-bold flex items-center gap-1.5 ${
                        isGold
                          ? 'bg-amber-400 text-black'
                          : isSilver
                          ? 'bg-slate-200 text-black'
                          : 'bg-amber-700/30 text-amber-200 border border-amber-600/40'
                      }`}>
                        <Medal className="w-3.5 h-3.5" /> Rank #{perf.rank}
                      </span>
                      <span className="text-xs font-mono text-[var(--fg-sub)]">{perf.month}</span>
                    </div>

                    <span className="text-xs font-mono text-[var(--primary)] font-bold">
                      {perf.metrics.citations} Citations
                    </span>
                  </div>

                  {/* Profile Header with Dormant B&W Portrait */}
                  <div className="flex items-center gap-5 mb-6">
                    {/* DORMANT PORTRAIT: Black & White dormant, pops with vivid color on hover! */}
                    <div className="relative w-20 h-20 rounded-2xl overflow-hidden shrink-0 border-2 border-[var(--border)] group-hover:border-amber-400 transition-colors shadow-lg">
                      <img
                        src={perf.image}
                        alt={perf.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-600"
                        loading="lazy"
                      />
                    </div>

                    <div>
                      <h3 className="text-2xl font-bold font-head group-hover:text-amber-400 transition-colors">
                        {perf.name}
                      </h3>
                      <p className="font-mono text-xs text-[var(--primary)] font-bold uppercase tracking-wider mt-0.5">
                        {perf.role}
                      </p>
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {perf.tags.map((tag, tIdx) => (
                          <span
                            key={tIdx}
                            className="px-2 py-0.5 rounded text-[10px] font-mono bg-[var(--bg-muted)] border border-[var(--border)] text-[var(--fg-sub)]"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Achievement Highlight */}
                  <div className="rounded-xl bg-[var(--bg)]/80 border border-[var(--border)] p-4 mb-6">
                    <h4 className="text-sm font-bold text-[var(--fg)] mb-1 flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-amber-400" />
                      {perf.title}
                    </h4>
                    <p className="text-xs text-[var(--fg-sub)] leading-relaxed font-sans">
                      {perf.achievement}
                    </p>
                  </div>
                </div>

                {/* Metrics Footer */}
                <div className="pt-4 border-t border-[var(--border)] flex items-center justify-between text-xs font-mono text-[var(--fg-sub)]">
                  <span>Impact Factor: <strong className="text-[var(--fg)]">High Impact</strong></span>
                  <span className="text-emerald-400 font-bold flex items-center gap-1">
                    <Flame className="w-3.5 h-3.5" /> SOTA Verified
                  </span>
                </div>
              </div>
            </TiltCard>
          )
        })}
      </div>
    </div>
  )
}
