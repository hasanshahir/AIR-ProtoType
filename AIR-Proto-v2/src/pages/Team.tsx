import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Mail, FileText, Phone, ExternalLink, Sparkles, GraduationCap } from 'lucide-react'
import teamData from '../data/team.json'
import previousInternsData from '../data/previous_interns.json'
import StudentApplicationModal from '../components/StudentApplicationModal'

const Linkedin = ({ className = 'w-3 h-3' }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
  </svg>
)

const HEXAGON_CLIP = 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)'

type TabType = 'all' | 'faculty' | 'interns' | 'previous' | 'postgrad' | 'undergrad'

export default function Team() {
  const [activeTab, setActiveTab] = useState<TabType>('all')
  const [applyModalOpen, setApplyModalOpen] = useState(false)

  // Faculty coordinator
  const faculty = teamData.filter(m => m.category === 'Faculty')
  // Research interns
  const currentInterns = teamData.filter(m => m.category === 'Research Interns')

  // Row mapping for 4 - 3 - 4 Honeycomb layout matching screenshot
  // Row 1 (4 members): Shaheer, Dr. Marvi (Lead), Kashaf, Haseeb
  const row1 = [
    teamData.find(m => m.id === 'ri1') || teamData[1],
    teamData.find(m => m.id === 'f1') || teamData[0], // Dr. Murk Marvi (Lead)
    teamData.find(m => m.id === 'ri2') || teamData[2],
    teamData.find(m => m.id === 'ri3') || teamData[3],
  ]

  // Row 2 (3 members): Safee, Shamsi, Hashmi
  const row2 = [
    teamData.find(m => m.id === 'ri4') || teamData[4],
    teamData.find(m => m.id === 'ri5') || teamData[5],
    teamData.find(m => m.id === 'ri6') || teamData[6],
  ]

  // Row 3 (4 members): Muhammed Ahmed, Roshaan, Hammad, Areeba
  const row3 = [
    teamData.find(m => m.id === 'ri7') || teamData[7],
    teamData.find(m => m.id === 'ri8') || teamData[8],
    teamData.find(m => m.id === 'ri9') || teamData[9],
    teamData.find(m => m.id === 'ri10') || teamData[10],
  ]

  const tabs = [
    { id: 'all' as TabType, label: `All Members (${teamData.length})` },
    { id: 'faculty' as TabType, label: `Faculty Members (${faculty.length})` },
    { id: 'interns' as TabType, label: `Research Interns (${currentInterns.length})` },
    { id: 'previous' as TabType, label: `Previous Interns (${previousInternsData.length})` },
    { id: 'postgrad' as TabType, label: 'Postgraduate Students' },
    { id: 'undergrad' as TabType, label: 'Undergraduate Students' },
  ]

  // Hexagon Component with Dormant B&W image + Color Pop on Hover
  const HexagonCard = ({ member }: { member: any }) => {
    if (!member) return null
    const isLead = member.isLead || member.id === 'f1'

    return (
      <div
        tabIndex={0}
        role="group"
        aria-label={`${member.name} - ${member.role}`}
        className="group relative block w-[110px] h-[126px] sm:w-[142px] sm:h-[162px] md:w-[165px] md:h-[190px] focus:outline-none transition-transform duration-300 hover:z-40 hover:scale-105 cursor-pointer"
      >
        <div
          className={`w-full h-full p-[2.5px] transition-all duration-300 ${
            isLead
              ? 'bg-gradient-to-b from-rose-500 via-rose-500/70 to-rose-500/30 group-hover:from-rose-500 group-hover:via-rose-500 group-hover:to-rose-500/80 drop-shadow-md'
              : 'bg-gradient-to-b from-zinc-400/40 via-zinc-200 dark:via-zinc-800 to-zinc-400/10 group-hover:from-rose-500 group-hover:via-rose-500/70 group-hover:to-rose-500/40 drop-shadow-xs'
          }`}
          style={{ clipPath: HEXAGON_CLIP }}
        >
          <div
            className="w-full h-full bg-[var(--bg-card)] relative overflow-hidden flex items-center justify-center"
            style={{ clipPath: HEXAGON_CLIP }}
          >
            <img
              src={member.image}
              alt={member.name}
              className="w-full h-full object-cover transition-all duration-500 filter grayscale contrast-[1.05] group-hover:grayscale-0 group-hover:scale-110"
              loading="lazy"
            />

            {/* Hover details overlay */}
            <div className="absolute inset-x-0 bottom-0 pt-10 pb-3 px-2 bg-gradient-to-t from-black via-black/90 to-transparent flex flex-col justify-end items-center text-center opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-auto">
              <span className="text-[9px] sm:text-[10px] font-mono font-bold text-rose-500 uppercase tracking-wider line-clamp-1">
                {isLead ? 'Faculty Lead' : 'Intern'}
              </span>
              <span className="text-[11px] sm:text-xs font-bold text-white leading-tight line-clamp-1 px-1">
                {member.name}
              </span>
              
              <div className="flex items-center gap-1.5 mt-1">
                {member.email && (
                  <a
                    href={`mailto:${member.email}`}
                    onClick={e => e.stopPropagation()}
                    title={`Email ${member.name}`}
                    className="w-5 h-5 rounded-full bg-white/10 hover:bg-rose-500 text-white flex items-center justify-center transition-colors"
                  >
                    <Mail className="w-2.5 h-2.5" />
                  </a>
                )}
                {member.linkedin && (
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={e => e.stopPropagation()}
                    title="LinkedIn Profile"
                    className="w-5 h-5 rounded-full bg-white/10 hover:bg-blue-600 text-white flex items-center justify-center transition-colors"
                  >
                    <Linkedin className="w-2.5 h-2.5" />
                  </a>
                )}
                {member.cvUrl && (
                  <a
                    href={member.cvUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={e => e.stopPropagation()}
                    title="View Official CV"
                    className="w-5 h-5 rounded-full bg-white/10 hover:bg-emerald-600 text-white flex items-center justify-center transition-colors"
                  >
                    <FileText className="w-2.5 h-2.5" />
                  </a>
                )}
              </div>
            </div>

            {/* Lead Tag Badge */}
            {isLead && (
              <div className="absolute top-2 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full bg-rose-500 text-[9px] font-mono font-bold text-white tracking-wider uppercase shadow-xs">
                LEAD
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-28 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
      {/* Background Subtle Matrix Grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none -z-10" />

      {/* Page Title & Heading (Matching Screenshot Exactly) */}
      <div className="mb-10 text-left">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight font-head text-[var(--fg)] mb-3">
          Our Team
        </h1>
        <p className="text-base sm:text-lg text-[var(--fg-sub)] max-w-3xl font-sans">
          Faculty, research interns, and scholars contributing to research and innovation at AIR Lab.
        </p>
      </div>

      {/* Sub-Tab Navigation Strip (Matching Screenshot Exactly) */}
      <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-10 border-b border-zinc-200 dark:border-zinc-800 text-sm no-scrollbar">
        {tabs.map(tab => {
          const isActive = activeTab === tab.id
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 text-xs sm:text-sm font-medium whitespace-nowrap transition-all duration-200 relative cursor-pointer ${
                isActive
                  ? 'text-rose-500 font-bold'
                  : 'text-[var(--fg-sub)] hover:text-[var(--fg)]'
              }`}
            >
              <span>{tab.label}</span>
              {isActive && (
                <motion.div
                  layoutId="teamActiveTabUnderline"
                  className="absolute bottom-0 left-0 right-0 h-[2px] bg-rose-500"
                />
              )}
            </button>
          )
        })}
      </div>

      {/* Tab Content Display */}
      <AnimatePresence mode="wait">
        {/* ── TAB 1: ALL MEMBERS (INTERACTIVE HONEYCOMB MATRIX) ── */}
        {activeTab === 'all' && (
          <motion.div
            key="all"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="space-y-12"
          >
            {/* Honeycomb Header Badge & Subtitle (Matching Screenshot Exactly) */}
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/10 text-rose-500 text-xs font-mono font-medium">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Interactive Honeycomb Matrix</span>
              </div>
              <p className="text-xs sm:text-sm text-[var(--fg-sub)] font-mono">
                Hover over any hexagon to view details and quick contact links • Explore sub-tabs for complete profiles
              </p>
            </div>

            {/* Interlocking 3-Row Honeycomb (4 - 3 - 4 layout) */}
            <div className="relative py-6 flex flex-col items-center justify-center overflow-x-auto">
              <div className="min-w-[340px] sm:min-w-[500px] md:min-w-[690px] flex flex-col items-center select-none py-2">
                {/* Row 1: 4 Hexagons */}
                <div className="flex justify-center items-center gap-2 sm:gap-3 md:gap-4 z-30">
                  {row1.map(m => (
                    <HexagonCard key={m.id} member={m} />
                  ))}
                </div>

                {/* Row 2: 3 Hexagons (Shifted up with negative margin to interlock) */}
                <div className="flex justify-center items-center gap-2 sm:gap-3 md:gap-4 -mt-7 sm:-mt-10 md:-mt-12 z-20">
                  {row2.map(m => (
                    <HexagonCard key={m.id} member={m} />
                  ))}
                </div>

                {/* Row 3: 4 Hexagons (Shifted up with negative margin to interlock) */}
                <div className="flex justify-center items-center gap-2 sm:gap-3 md:gap-4 -mt-7 sm:-mt-10 md:-mt-12 z-10">
                  {row3.map(m => (
                    <HexagonCard key={m.id} member={m} />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* ── TAB 2: FACULTY MEMBERS ── */}
        {activeTab === 'faculty' && (
          <motion.div
            key="faculty"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="max-w-4xl mx-auto space-y-6"
          >
            {faculty.map(f => (
              <div
                key={f.id}
                className="rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-[var(--bg-card)] p-8 sm:p-10 shadow-xl flex flex-col md:flex-row gap-8 items-start relative overflow-hidden"
              >
                {/* Corner Glow */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />

                <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-2xl overflow-hidden border-2 border-rose-500/30 shrink-0 shadow-lg bg-zinc-900">
                  <img
                    src={f.image}
                    alt={f.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1 space-y-4">
                  <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold bg-rose-500/10 text-rose-500 mb-2">
                      <GraduationCap className="w-3.5 h-3.5" />
                      <span>{f.role}</span>
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--fg)] font-head">
                      {f.name}
                    </h2>
                    <p className="text-sm font-medium text-rose-500 mt-1 font-mono">
                      {f.designation}
                    </p>
                  </div>

                  {f.qualifications && (
                    <div className="space-y-1.5 pt-3 border-t border-zinc-100 dark:border-zinc-800 text-sm">
                      <p className="text-xs font-mono uppercase tracking-wider text-[var(--fg-sub)] font-semibold mb-2">
                        Academic Qualifications
                      </p>
                      {f.qualifications.map((q: string, idx: number) => (
                        <div key={idx} className="flex items-center gap-2 text-xs sm:text-sm text-[var(--fg-sub)]">
                          <span className="w-1.5 h-1.5 rounded-full bg-rose-500 shrink-0" />
                          <span>{q}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800 flex flex-wrap items-center gap-4 text-xs font-mono">
                    {f.phone && (
                      <div className="flex items-center gap-1.5 text-[var(--fg-sub)]">
                        <Phone className="w-3.5 h-3.5 text-rose-500" />
                        <span>{f.phone}</span>
                      </div>
                    )}
                    {f.email && (
                      <a
                        href={`mailto:${f.email}`}
                        className="flex items-center gap-1.5 text-[var(--fg-sub)] hover:text-rose-500 transition-colors"
                      >
                        <Mail className="w-3.5 h-3.5 text-rose-500" />
                        <span>{f.email}</span>
                      </a>
                    )}
                    {f.cvUrl && (
                      <a
                        href={f.cvUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="btn-craftly-primary px-4 py-1.5 rounded-full text-xs font-bold inline-flex items-center gap-1.5 shadow-sm"
                      >
                        <span>Download Official CV</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        )}

        {/* ── TAB 3: CURRENT RESEARCH INTERNS ── */}
        {activeTab === 'interns' && (
          <motion.div
            key="interns"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {currentInterns.map(intern => (
              <div
                key={intern.id}
                className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-[var(--bg-card)] p-6 shadow-sm hover:border-rose-500/50 hover:shadow-lg transition-all group flex flex-col justify-between"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 bg-zinc-900 border border-zinc-200 dark:border-zinc-700">
                    <img
                      src={intern.image}
                      alt={intern.name}
                      className="w-full h-full object-cover filter grayscale contrast-[1.05] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-300"
                    />
                  </div>
                  <div>
                    <h3 className="text-base font-bold font-head text-[var(--fg)] group-hover:text-rose-500 transition-colors">
                      {intern.name}
                    </h3>
                    <span className="text-[11px] font-mono text-rose-500 font-semibold uppercase">
                      {intern.role}
                    </span>
                    <div className="text-[11px] font-mono text-[var(--fg-sub)] mt-1 truncate max-w-[200px]">
                      {intern.email}
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between text-xs font-mono">
                  <a
                    href={`mailto:${intern.email}`}
                    className="text-[var(--fg-sub)] hover:text-rose-500 flex items-center gap-1.5 transition-colors"
                  >
                    <Mail className="w-3.5 h-3.5" /> Email
                  </a>
                  {intern.linkedin && (
                    <a
                      href={intern.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[var(--fg-sub)] hover:text-blue-500 flex items-center gap-1.5 transition-colors"
                    >
                      <Linkedin className="w-3.5 h-3.5" /> LinkedIn
                    </a>
                  )}
                </div>
              </div>
            ))}
          </motion.div>
        )}

        {/* ── TAB 4: PREVIOUS RESEARCH INTERNS (ALUMNI DIRECTORY) ── */}
        {activeTab === 'previous' && (
          <motion.div
            key="previous"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-[var(--bg-card)] overflow-hidden shadow-sm">
              <div className="p-6 border-b border-zinc-200 dark:border-zinc-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-xl font-bold font-head text-[var(--fg)]">
                    Previous Research Interns & Alumni
                  </h3>
                  <p className="text-xs sm:text-sm text-[var(--fg-sub)] mt-0.5">
                    Scholars who completed applied AI and machine learning research tenures at AIR Lab.
                  </p>
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-zinc-100 dark:bg-zinc-800 text-[var(--fg)] border border-zinc-200 dark:border-zinc-700 shrink-0">
                  {previousInternsData.length} Alumni Recorded
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs sm:text-sm font-sans">
                  <thead>
                    <tr className="border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50 font-mono text-[11px] uppercase tracking-wider text-[var(--fg-sub)]">
                      <th className="py-3.5 px-6">Name</th>
                      <th className="py-3.5 px-6">Affiliation</th>
                      <th className="py-3.5 px-6">NED Student Email</th>
                      <th className="py-3.5 px-6 text-right">LinkedIn Profile</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
                    {previousInternsData.map(p => (
                      <tr key={p.id} className="hover:bg-zinc-50/80 dark:hover:bg-zinc-800/40 transition-colors">
                        <td className="py-3.5 px-6 font-semibold text-[var(--fg)]">
                          {p.name}
                        </td>
                        <td className="py-3.5 px-6 text-[var(--fg-sub)] font-mono text-xs">
                          {p.tenure} • {p.department}
                        </td>
                        <td className="py-3.5 px-6 font-mono text-xs text-[var(--fg-sub)]">
                          <a href={`mailto:${p.email}`} className="hover:text-rose-500 hover:underline">
                            {p.email}
                          </a>
                        </td>
                        <td className="py-3.5 px-6 text-right">
                          <a
                            href={p.linkedin}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 hover:bg-blue-500 hover:text-white transition-all text-xs font-mono"
                          >
                            <Linkedin className="w-3.5 h-3.5" />
                            <span>LinkedIn Profile</span>
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}

        {/* ── TAB 5: POSTGRADUATE & TAB 6: UNDERGRADUATE (PENDING STATES WITH APPLICATION CTA) ── */}
        {(activeTab === 'postgrad' || activeTab === 'undergrad') && (
          <motion.div
            key="pending"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="text-center py-16 px-6 rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-[var(--bg-card)] max-w-2xl mx-auto shadow-sm"
          >
            <div className="w-16 h-16 rounded-full bg-rose-500/10 text-rose-500 mx-auto flex items-center justify-center mb-6">
              <GraduationCap className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold font-head text-[var(--fg)] mb-2">
              {activeTab === 'postgrad' ? 'Postgraduate MS & PhD Scholars' : 'Undergraduate Research Scholars'}
            </h3>
            <p className="text-sm text-[var(--fg-sub)] max-w-md mx-auto mb-8 font-sans">
              Nominations and batch appointments for {activeTab === 'postgrad' ? 'MS & PhD thesis scholars' : 'undergraduate capstone fellowships'} are currently in progress. Apply now to secure research placement for the upcoming session.
            </p>
            <div className="flex items-center justify-center gap-3">
              <button
                onClick={() => setApplyModalOpen(true)}
                className="btn-craftly-primary px-8 py-3 rounded-full text-xs font-bold shadow-md cursor-pointer inline-flex items-center gap-2"
              >
                <span>Apply for Research Placement</span>
                <span>→</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Student Application Modal */}
      <StudentApplicationModal
        isOpen={applyModalOpen}
        onClose={() => setApplyModalOpen(false)}
      />
    </div>
  )
}
