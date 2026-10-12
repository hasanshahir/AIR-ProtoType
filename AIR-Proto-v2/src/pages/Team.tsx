import { useState, useMemo, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Mail, Phone, ExternalLink, GraduationCap, Users, Sparkles } from 'lucide-react'
import teamData from '../data/team.json'
import previousInternsData from '../data/previous_interns.json'
import { TeamMemberEntity } from '../entities/TeamMemberEntity'
import Badge from '../components/ui/Badge'
import SectionReveal from '../components/ui/SectionReveal'
import StudentApplicationModal from '../components/StudentApplicationModal'
import AppleWatchCluster from '../components/AppleWatchCluster'

const Linkedin = ({ className = 'w-3.5 h-3.5' }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
  </svg>
)

type TabType = 'all' | 'faculty' | 'interns' | 'previous' | 'postgrad' | 'undergrad'

export default function Team() {
  const [searchParams] = useSearchParams()
  const [activeTab, setActiveTab] = useState<TabType>('all')
  const [applyModalOpen, setApplyModalOpen] = useState(false)
  const [highlightedMemberId, setHighlightedMemberId] = useState<string | null>(null)

  // Listen to deep-link search params from Performer of the Month or external links
  useEffect(() => {
    const tabParam = searchParams.get('tab') as TabType
    const memberParam = searchParams.get('member')
    if (tabParam && ['all', 'faculty', 'interns', 'previous', 'postgrad', 'undergrad'].includes(tabParam)) {
      setActiveTab(tabParam)
    }
    if (memberParam) {
      setHighlightedMemberId(memberParam)
      setTimeout(() => {
        const el = document.getElementById(`member-${memberParam}`)
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'center' })
        }
      }, 300)
    }
  }, [searchParams])

  // Instantiate OOP Entities from raw data
  const allMembers = useMemo(() => {
    const list = TeamMemberEntity.fromArray(teamData)
    return TeamMemberEntity.sortByRecent(list)
  }, [])

  const facultyMembers = useMemo(() => {
    return allMembers.filter(m => m.isFacultyLead() || m.category === 'Faculty')
  }, [allMembers])

  const internMembers = useMemo(() => {
    return allMembers.filter(m => m.category === 'Research Interns')
  }, [allMembers])

  // Sorted previous interns (newest first)
  const sortedPreviousInterns = useMemo(() => {
    return [...previousInternsData]
  }, [])

  // Auto-clear highlight after 3.5 seconds
  useEffect(() => {
    if (highlightedMemberId) {
      const timer = setTimeout(() => setHighlightedMemberId(null), 3500)
      return () => clearTimeout(timer)
    }
  }, [highlightedMemberId])

  const tabs: { id: TabType; label: string; count?: number }[] = [
    { id: 'all', label: 'Overview', count: allMembers.length },
    { id: 'faculty', label: 'Faculty', count: facultyMembers.length },
    { id: 'interns', label: 'Research Interns', count: internMembers.length },
    { id: 'previous', label: 'Previous Interns', count: sortedPreviousInterns.length },
    { id: 'postgrad', label: 'Postgraduate' },
    { id: 'undergrad', label: 'Undergraduate' },
  ]

  // Handler when clicking a member in Overview: jumps directly to their category and highlights them
  const handleOverviewClick = (member: TeamMemberEntity) => {
    const targetTab = member.getCategoryTab()
    setActiveTab(targetTab)
    setHighlightedMemberId(member.id)
    setTimeout(() => {
      const el = document.getElementById(`member-${member.id}`)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }
    }, 150)
  }

  return (
    <div className="min-h-screen pt-16 sm:pt-24 pb-28 px-6 max-w-[1200px] mx-auto relative font-sans text-[var(--text-primary)]">
      {/* Header */}
      <div className="mb-12 text-left max-w-3xl">
        <SectionReveal delay={0}>
          <div className="mb-4">
            <Badge variant="purple" icon={<Users className="w-3.5 h-3.5 text-white" />}>
              RESEARCH FACULTY & SCHOLARS
            </Badge>
          </div>
        </SectionReveal>

        <SectionReveal delay={0.08}>
          <h1 className="font-head font-normal text-[var(--text-primary)] mb-3 tracking-tight">
            Our Research Team
          </h1>
        </SectionReveal>

        <SectionReveal delay={0.16}>
          <p className="text-[16px] sm:text-[18px] text-[var(--text-muted)] leading-relaxed font-normal">
            Faculty leads, research interns, and undergraduate scholars driving foundational AI and autonomous systems at AIR Lab.
          </p>
        </SectionReveal>
      </div>

      {/* ── Sub-tabs Segmented Control ── */}
      <div className="mb-8 overflow-x-auto pb-2 flex justify-start">
        <div className="inline-flex items-center gap-1.5 p-1 bg-[var(--bg-surface)] border border-[var(--border-hairline)] rounded-[2px] shadow-xs">
          {tabs.map(tab => {
            const isActive = activeTab === tab.id
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id)
                  setHighlightedMemberId(null)
                }}
                className={`relative px-3.5 py-1.5 rounded-[2px] text-[13px] font-medium transition-all duration-150 cursor-pointer select-none whitespace-nowrap flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-[var(--accent-orange)] text-white shadow-xs'
                    : 'text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-page)]'
                }`}
              >
                <span>{tab.label}</span>
                {tab.count !== undefined && (
                  <span
                    className={`text-[10px] font-mono px-1.5 py-0.2 rounded-[2px] ${
                      isActive ? 'bg-white/20 text-white' : 'bg-[var(--bg-page)] text-[var(--text-muted)] border border-[var(--border-hairline)]'
                    }`}
                  >
                    {tab.count}
                  </span>
                )}
              </button>
            )
          })}
        </div>
      </div>

      {/* Tab Content Display */}
      <AnimatePresence mode="wait">
        {/* ── TAB 1: ALL MEMBERS (APPLE WATCH SPHERICAL FISHEYE CLUSTER) ── */}
        {activeTab === 'all' && (
          <motion.div
            key="all"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="space-y-6"
          >

            {/* Apple Watch Spherical Cluster */}
            <AppleWatchCluster
              members={allMembers}
              onSelectMember={handleOverviewClick}
            />
          </motion.div>
        )}

        {/* ── TAB 2: FACULTY ── */}
        {activeTab === 'faculty' && (
          <motion.div
            key="faculty"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="max-w-4xl mx-auto space-y-6"
          >
            {facultyMembers.map(f => {
              const isHighlighted = highlightedMemberId === f.id
              return (
                <div
                  id={`member-${f.id}`}
                  key={f.id}
                  className={`craftly-card p-8 sm:p-10 flex flex-col md:flex-row gap-8 items-start relative overflow-hidden group transition-all duration-200 bg-[var(--bg-surface)] border border-[var(--border-hairline)] hover:border-[var(--accent-purple)] hover:shadow-xl ${
                    isHighlighted ? 'ring-2 ring-[var(--accent-orange)] shadow-xl' : ''
                  }`}
                >
                  {/* Subtle Corner Glow */}
                  <div
                    className="absolute -top-12 -right-12 w-80 h-80 rounded-full pointer-events-none opacity-20 blur-[80px] bg-[var(--accent-purple)]/20"
                    aria-hidden="true"
                  />

                  {/* Faculty Photo */}
                  <div
                    onClick={() => {
                      if (f.hasLinkedIn()) window.open(f.getLinkedInUrl()!, '_blank')
                      else if (f.cvUrl) window.open(f.cvUrl, '_blank')
                      else if (f.hasEmail()) window.location.href = f.getEmailFallback()!
                    }}
                    title="Click to view profile / CV"
                    className="w-36 h-36 sm:w-44 sm:h-44 rounded-[4px] overflow-hidden border border-[var(--border-hairline)] shrink-0 shadow-sm bg-[var(--bg-page)] cursor-pointer group-hover:scale-102 transition-transform"
                  >
                    <img
                      src={f.image}
                      alt={f.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1 space-y-4 relative z-10 text-left">
                    <div>
                      <div className="inline-flex items-center gap-2 mb-2">
                        <span className="px-2.5 py-1 rounded-[2px] text-xs font-semibold bg-[var(--accent-purple)] text-white flex items-center gap-1.5 shadow-xs">
                          <GraduationCap className="w-3.5 h-3.5" />
                          {f.role}
                        </span>
                        <span className="px-2.5 py-1 rounded-[2px] text-xs font-medium bg-[var(--bg-page)] text-[var(--text-muted)] border border-[var(--border-hairline)]">
                          {f.department}
                        </span>
                      </div>
                      <h2 className="text-2xl sm:text-3xl font-normal font-head text-[var(--text-primary)]">
                        {f.name}
                      </h2>
                      <p className="text-sm font-medium text-[var(--text-muted)] mt-1">
                        {f.designation}
                      </p>
                      {f.researchFocus && (
                        <p className="text-xs font-mono text-[var(--accent-orange)] font-semibold mt-1">
                          Research Focus: {f.researchFocus}
                        </p>
                      )}
                    </div>

                    {f.qualifications && (
                      <div className="space-y-1.5 pt-3 border-t border-[var(--border-hairline)] text-sm">
                        <p className="text-xs font-mono uppercase tracking-wider text-[var(--text-subtle)] font-semibold mb-2">
                          Academic Qualifications
                        </p>
                        {f.qualifications.map((q: string, idx: number) => (
                          <div key={idx} className="flex items-center gap-2 text-xs sm:text-sm text-[var(--text-muted)]">
                            <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-orange)] shrink-0" />
                            <span>{q}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="pt-4 border-t border-[var(--border-hairline)] flex flex-wrap items-center gap-3 text-xs font-mono">
                      {f.hasLinkedIn() && (
                        <a
                          href={f.getLinkedInUrl()!}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="h-9 px-4 rounded-[2px] bg-[var(--accent-orange)] hover:bg-[var(--accent-orange-hover)] text-white text-xs font-medium inline-flex items-center gap-2 shadow-xs transition-colors"
                        >
                          <Linkedin className="w-3.5 h-3.5" />
                          <span>LinkedIn Profile ↳</span>
                        </a>
                      )}

                      {f.hasEmail() && (
                        <a
                          href={f.getEmailFallback()!}
                          className="h-9 px-4 rounded-[2px] bg-[var(--bg-page)] hover:bg-[var(--border-hairline)] text-[var(--text-muted)] text-xs font-medium inline-flex items-center gap-2 border border-[var(--border-hairline)] transition-colors"
                          title="Email fallback"
                        >
                          <Mail className="w-3.5 h-3.5 text-[var(--accent-purple)]" />
                          <span>{f.email}</span>
                        </a>
                      )}

                      {f.phone && (
                        <div className="flex items-center gap-1.5 text-[var(--text-muted)] px-2.5 py-1 bg-[var(--bg-page)] rounded-[2px] border border-[var(--border-hairline)]">
                          <Phone className="w-3.5 h-3.5 text-[var(--text-subtle)]" />
                          <span>{f.phone}</span>
                        </div>
                      )}

                      {f.cvUrl && (
                        <a
                          href={f.cvUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="h-9 px-4 rounded-[2px] bg-[var(--text-primary)] text-white text-xs font-medium inline-flex items-center gap-1.5 shadow-xs hover:bg-black transition-colors"
                        >
                          <span>Official CV</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </motion.div>
        )}

        {/* ── TAB 3: CURRENT RESEARCH INTERNS ── */}
        {activeTab === 'interns' && (
          <motion.div
            key="interns"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8 text-left"
          >
            {internMembers.map(intern => {
              const isHighlighted = highlightedMemberId === intern.id
              const primaryUrl = intern.getPrimaryActionUrl()

              return (
                <div
                  id={`member-${intern.id}`}
                  key={intern.id}
                  className={`craftly-card p-6 sm:p-8 flex flex-col justify-between group hover:border-[var(--accent-purple)] hover:shadow-xl transition-all duration-200 relative overflow-hidden bg-[var(--bg-surface)] border border-[var(--border-hairline)] cursor-pointer ${
                    isHighlighted ? 'ring-2 ring-[var(--accent-orange)] shadow-xl' : ''
                  }`}
                >
                  <div>
                    {/* Top Row: Large Portrait & Member Info */}
                    <div className="flex items-start gap-5 mb-5">
                      <a
                        href={primaryUrl}
                        target={intern.hasLinkedIn() ? '_blank' : undefined}
                        rel={intern.hasLinkedIn() ? 'noopener noreferrer' : undefined}
                        title={`Click photo to view ${intern.name}'s profile on LinkedIn`}
                        className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-[4px] overflow-hidden shrink-0 bg-[var(--bg-page)] border border-[var(--border-hairline)] group-hover:border-[var(--accent-purple)] shadow-xs cursor-pointer transition-all duration-300"
                      >
                        <img
                          src={intern.image}
                          alt={intern.name}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/15 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <ExternalLink className="w-5 h-5 text-white drop-shadow-md" />
                        </div>
                      </a>

                      {/* Header details */}
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2 mb-1.5">
                          <span className="px-2.5 py-0.5 rounded-[2px] text-[11px] font-mono font-semibold bg-[var(--accent-purple-light)] text-[var(--accent-purple)] border border-[var(--accent-purple)]/20">
                            {intern.role}
                          </span>
                          <span className="px-2.5 py-0.5 rounded-[2px] text-[11px] font-mono text-[var(--text-subtle)] bg-[var(--bg-page)] border border-[var(--border-hairline)]">
                            {intern.term}
                          </span>
                        </div>

                        {/* Name */}
                        <a
                          href={primaryUrl}
                          target={intern.hasLinkedIn() ? '_blank' : undefined}
                          rel={intern.hasLinkedIn() ? 'noopener noreferrer' : undefined}
                          className="text-[20px] sm:text-[22px] font-medium font-head text-[var(--text-primary)] hover:text-[var(--accent-orange)] transition-colors block truncate"
                        >
                          {intern.name}
                        </a>

                        <div className="text-xs text-[var(--text-muted)] font-mono mt-0.5">
                          {intern.department}
                        </div>

                        {/* Research Focus Badge */}
                        {intern.researchFocus && (
                          <div className="mt-2.5">
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-[2px] text-xs font-medium bg-[var(--bg-page)] text-[var(--accent-purple)] border border-[var(--accent-purple)]/20">
                              <Sparkles className="w-3 h-3 text-[var(--accent-purple)]" />
                              {intern.researchFocus}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Bottom Row */}
                  <div className="pt-4 border-t border-[var(--border-hairline)] mt-2 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
                    {/* LinkedIn Button */}
                    {intern.hasLinkedIn() ? (
                      <a
                        href={intern.getLinkedInUrl()!}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="h-8 px-3.5 rounded-[2px] bg-[var(--accent-orange)] hover:bg-[var(--accent-orange-hover)] text-white font-medium flex items-center gap-1.5 shadow-xs transition-all cursor-pointer"
                      >
                        <Linkedin className="w-3.5 h-3.5" />
                        <span>LinkedIn Profile ↳</span>
                      </a>
                    ) : (
                      <span className="text-[var(--text-subtle)] text-xs italic">No LinkedIn profile</span>
                    )}

                    {/* Email Fallback Button */}
                    {intern.hasEmail() && (
                      <a
                        href={intern.getEmailFallback()!}
                        title={`Send email fallback to ${intern.email}`}
                        className="h-8 px-3 rounded-[2px] border border-[var(--border-hairline)] bg-[var(--bg-surface)] hover:bg-[var(--bg-page)] text-[var(--text-muted)] font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <Mail className="w-3.5 h-3.5 text-[var(--accent-purple)]" />
                        <span className="truncate max-w-[170px] sm:max-w-none">{intern.email}</span>
                      </a>
                    )}
                  </div>
                </div>
              )
            })}
          </motion.div>
        )}

        {/* ── TAB 4: PREVIOUS INTERNS ── */}
        {activeTab === 'previous' && (
          <motion.div
            key="previous"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="space-y-6 text-left"
          >
            <div className="craftly-card overflow-hidden bg-[var(--bg-surface)] border border-[var(--border-hairline)]">
              <div className="p-6 border-b border-[var(--border-hairline)] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-xl font-medium font-head text-[var(--text-primary)]">
                    Previous Research Interns & Alumni
                  </h3>
                  <p className="text-xs sm:text-sm text-[var(--text-muted)] mt-0.5 font-normal">
                    Scholars who completed applied AI and machine learning research tenures at AIR Lab.
                  </p>
                </div>
                <span className="px-3 py-1 rounded-[2px] text-xs font-mono font-medium bg-[var(--accent-purple-light)] text-[var(--accent-purple)] border border-[var(--accent-purple)]/20 shrink-0">
                  {sortedPreviousInterns.length} Alumni Recorded
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs sm:text-sm font-sans">
                  <thead>
                    <tr className="border-b border-[var(--border-hairline)] font-mono text-[11px] uppercase tracking-wider text-[var(--text-subtle)] bg-[var(--bg-page)]">
                      <th className="py-3.5 px-6 font-medium">Name</th>
                      <th className="py-3.5 px-6 font-medium">Affiliation & Department</th>
                      <th className="py-3.5 px-6 font-medium">Email Fallback</th>
                      <th className="py-3.5 px-6 text-right font-medium">LinkedIn Profile</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[var(--border-hairline)]">
                    {sortedPreviousInterns.map(p => (
                      <tr key={p.id} className="hover:bg-[var(--bg-page)] transition-colors">
                        <td className="py-3.5 px-6 font-medium text-[var(--text-primary)]">
                          {p.name}
                        </td>
                        <td className="py-3.5 px-6 text-[var(--text-muted)] font-mono text-xs">
                          {p.tenure} • {p.department}
                        </td>
                        <td className="py-3.5 px-6 font-mono text-xs text-[var(--text-muted)]">
                          <a href={`mailto:${p.email}`} className="text-[var(--accent-purple)] hover:underline flex items-center gap-1">
                            <Mail className="w-3 h-3 text-[var(--text-subtle)]" />
                            {p.email}
                          </a>
                        </td>
                        <td className="py-3.5 px-6 text-right">
                          <a
                            href={p.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-[2px] bg-[var(--bg-page)] text-[var(--accent-purple)] hover:bg-[var(--accent-purple)] hover:text-white transition-all text-xs font-mono border border-[var(--border-hairline)]"
                          >
                            <Linkedin className="w-3 h-3" />
                            <span>LinkedIn ↳</span>
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

        {/* ── TAB 5 & TAB 6: POSTGRADUATE / UNDERGRADUATE ── */}
        {(activeTab === 'postgrad' || activeTab === 'undergrad') && (
          <motion.div
            key="pending"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="craftly-card p-12 text-center max-w-xl mx-auto bg-[var(--bg-surface)] border border-[var(--border-hairline)]"
          >
            <div className="w-12 h-12 rounded-[2px] bg-[var(--accent-purple-light)] border border-[var(--accent-purple)]/20 text-[var(--accent-purple)] mx-auto flex items-center justify-center mb-6 shadow-xs">
              <GraduationCap className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-normal font-head text-[var(--text-primary)] mb-2">
              {activeTab === 'postgrad' ? 'Postgraduate MS & PhD Scholars' : 'Undergraduate Research Scholars'}
            </h3>
            <p className="text-[14px] text-[var(--text-muted)] max-w-md mx-auto mb-8 font-normal leading-relaxed">
              Nominations and batch appointments for {activeTab === 'postgrad' ? 'MS & PhD thesis scholars' : 'undergraduate capstone fellowships'} are currently in progress. Apply now to secure research placement for the upcoming session.
            </p>
            <button
              onClick={() => setApplyModalOpen(true)}
              className="h-10 px-6 rounded-[2px] bg-[var(--accent-orange)] hover:bg-[var(--accent-orange-hover)] text-white text-xs font-medium cursor-pointer shadow-xs transition-all inline-flex items-center gap-1.5"
            >
              <span>Apply for Research Placement</span>
              <span className="text-[12px]">↳</span>
            </button>
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
