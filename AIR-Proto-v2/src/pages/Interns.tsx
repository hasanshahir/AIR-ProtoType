import { useEffect } from 'react'
import { UserCheck, GraduationCap, Building2, Quote, ArrowRight, BookOpen } from 'lucide-react'
import TiltCard from '../components/TiltCard'
import internsData from '../data/interns.json'
import { useScrollCraft } from '../hooks/useScrollCraft'

export default function Interns() {
  const sc = useScrollCraft()

  useEffect(() => {
    sc.reveal('[data-sc="intern-heading"]', {
      direction: 'up',
      distance: '24px',
      duration: 600,
      ease: 'cubicOut',
    })

    sc.reveal('[data-sc="intern-card"]', {
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
      <div className="mb-14" data-sc="intern-heading">
        <span className="font-mono text-xs uppercase tracking-widest text-[var(--primary)] font-bold bg-[var(--primary)]/10 px-3.5 py-1.5 rounded-full border border-[var(--primary)]/20 inline-flex items-center gap-1.5 mb-4">
          <UserCheck className="w-3.5 h-3.5" /> [ALUMNI TRAJECTORY & FELLOWS]
        </span>
        <h1 className="text-4xl sm:text-6xl font-black tracking-tight font-head">
          Research Interns & Alumni
        </h1>
        <p className="mt-3 text-lg text-[var(--fg-sub)] max-w-2xl font-sans">
          Where our former research fellows are now — from PhD programs at MIT CSAIL to engineering at Google DeepMind and NVIDIA.
        </p>
      </div>

      {/* Grid of Alumni with 3D Tilt & Dormant Image Color Pop */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        {internsData.map((intern, index) => (
          <TiltCard key={intern.id} tiltMaxAngleX={8} tiltMaxAngleY={8} scale={1.02}>
            <div
              data-sc="intern-card"
              className="h-full rounded-2xl border border-[var(--border)] bg-[var(--bg-card)]/90 backdrop-blur-xl p-8 flex flex-col justify-between hover:border-[var(--primary)] hover:shadow-2xl hover:shadow-[var(--primary)]/15 transition-all duration-400 group"
              style={{ transitionDelay: `${index * 80}ms` }}
            >
              <div>
                {/* Profile Header */}
                <div className="flex items-center gap-5 mb-6">
                  {/* DORMANT PORTRAIT: Black & White dormant, pops with vivid color on hover! */}
                  <div className="relative w-20 h-20 rounded-2xl overflow-hidden shrink-0 border-2 border-[var(--border)] group-hover:border-[var(--primary)] transition-colors shadow-lg">
                    <img
                      src={intern.image}
                      alt={intern.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-600"
                      loading="lazy"
                    />
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold bg-[var(--primary)]/15 text-[var(--primary)] border border-[var(--primary)]/30">
                        {intern.term}
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold font-head group-hover:text-[var(--primary)] transition-colors mt-1">
                      {intern.name}
                    </h3>
                    <p className="text-xs text-[var(--fg-sub)] font-mono flex items-center gap-1.5 mt-0.5">
                      <GraduationCap className="w-3.5 h-3.5 text-[var(--primary)]" />
                      {intern.university}
                    </p>
                  </div>
                </div>

                {/* Where they are now pill */}
                <div className="p-3.5 rounded-xl bg-[var(--bg)]/90 border border-[var(--border)] mb-5 flex items-center justify-between">
                  <div className="text-xs font-mono">
                    <span className="text-[var(--fg-sub)] block text-[10px]">CURRENT TRAJECTORY:</span>
                    <strong className="text-emerald-400 font-bold">{intern.currentRole}</strong>
                  </div>
                  <Building2 className="w-4 h-4 text-[var(--primary)] shrink-0" />
                </div>

                {/* Project Focus & Paper */}
                <div className="space-y-2 mb-5 text-xs font-mono">
                  <div className="text-[var(--fg-sub)]">
                    Lab Project: <strong className="text-[var(--fg)]">{intern.project}</strong>
                  </div>
                  <div className="text-[var(--fg-sub)] flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-[var(--primary)] shrink-0" />
                    <span>Resulting Paper: <strong className="text-[var(--primary)]">{intern.paper}</strong></span>
                  </div>
                </div>

                {/* Quote */}
                <blockquote className="rounded-xl bg-[var(--bg-muted)]/50 p-4 border-l-2 border-[var(--primary)] text-xs text-[var(--fg)] italic font-sans leading-relaxed relative">
                  <Quote className="w-4 h-4 text-[var(--primary)]/40 absolute top-2 right-2" />
                  "{intern.quote}"
                </blockquote>
              </div>

              <div className="pt-4 border-t border-[var(--border)] mt-6 flex items-center justify-between text-xs font-mono text-[var(--fg-sub)]">
                <span>Alumni Network: <strong className="text-[var(--fg)]">Verified</strong></span>
                <span className="text-[var(--primary)] font-bold">AIR Lab Fellow</span>
              </div>
            </div>
          </TiltCard>
        ))}
      </div>

      {/* Recruitment Callout */}
      <TiltCard tiltMaxAngleX={6} tiltMaxAngleY={6} scale={1.01}>
        <div className="rounded-3xl border border-[var(--border)] bg-gradient-to-r from-[var(--bg-card)] via-[var(--bg-card)] to-[var(--primary)]/10 p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-8 text-left">
          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-[var(--primary)] font-bold mb-2 block">
              Join the Next Cohort
            </span>
            <h3 className="text-2xl sm:text-3xl font-black font-head mb-2">
              Summer 2026 Research Internships
            </h3>
            <p className="text-sm text-[var(--fg-sub)] max-w-xl font-sans leading-relaxed">
              Applications open for undergraduate scholars in Computer Science, Software Engineering, and Electrical Engineering. Gain compute access and paper authorship.
            </p>
          </div>

          <a
            href="mailto:internships@airlab.neduet.edu.pk?subject=Summer%202026%20Research%20Internship%20Application"
            className="px-8 py-3.5 rounded-xl bg-[var(--primary)] text-black font-mono text-xs font-bold hover:shadow-xl hover:shadow-[var(--primary)]/30 hover:scale-105 transition-all shrink-0 inline-flex items-center gap-2"
          >
            Apply for Summer '26 <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </TiltCard>
    </div>
  )
}
