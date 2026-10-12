import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ExternalLink, Mail } from 'lucide-react'
import { TeamMemberEntity } from '../entities/TeamMemberEntity'

interface AppleWatchClusterProps {
  members: TeamMemberEntity[]
  onSelectMember: (member: TeamMemberEntity) => void
}

const LinkedinIcon = ({ className = 'w-3 h-3' }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
  </svg>
)

export const AppleWatchCluster: React.FC<AppleWatchClusterProps> = ({
  members,
  onSelectMember,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null)
  
  // Dynamic focal point that tracks mouse cursor (or returns to 0,0)
  const [focalPoint, setFocalPoint] = useState<{ x: number; y: number }>({ x: 0, y: 0 })
  const targetFocalRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 })
  const currentFocalRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 })

  // Subtle canvas parallax pan
  const [pan, setPan] = useState<{ x: number; y: number }>({ x: 0, y: 0 })
  const targetPanRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 })
  const currentPanRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 })

  const [activeHoverId, setActiveHoverId] = useState<string | null>(null)

  const displayedMembers = members

  // Concentric hexagonal layout with generous breathing space between nodes
  const nodePositions = React.useMemo(() => {
    // Generous spacing so nodes NEVER bump into or overlap each other even at max magnification
    const spacingX = 184
    const spacingY = 158
    const positions: { member: TeamMemberEntity; x: number; y: number; isRecent: boolean }[] = []

    let ring = 0
    let placed = 0
    const total = displayedMembers.length

    // Center node
    if (placed < total) {
      positions.push({ member: displayedMembers[placed], x: 0, y: 0, isRecent: true })
      placed++
    }

    while (placed < total) {
      ring++
      const countInRing = 6 * ring
      for (let i = 0; i < countInRing && placed < total; i++) {
        const angle = (i / countInRing) * Math.PI * 2
        const r = ring * spacingY
        const x = Math.cos(angle) * r * (spacingX / spacingY)
        const y = Math.sin(angle) * r
        positions.push({
          member: displayedMembers[placed],
          x,
          y,
          isRecent: placed < 6,
        })
        placed++
      }
    }

    return positions
  }, [displayedMembers])

  // Track cursor position to dynamically shift the focal magnification center
  const handleContainerMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    
    // Cursor position relative to center of container (-width/2 to +width/2)
    const cursorRelX = e.clientX - (rect.left + rect.width / 2)
    const cursorRelY = e.clientY - (rect.top + rect.height / 2)

    // Dynamic focal point follows cursor
    targetFocalRef.current = {
      x: cursorRelX,
      y: cursorRelY,
    }

    // Gentle canvas parallax pan in opposite direction
    targetPanRef.current = {
      x: -cursorRelX * 0.28,
      y: -cursorRelY * 0.28,
    }
  }

  const handleContainerMouseLeave = () => {
    // Smoothly return focal point and pan back to the exact center
    targetFocalRef.current = { x: 0, y: 0 }
    targetPanRef.current = { x: 0, y: 0 }
  }

  // Animation frame loop with lerp easing for buttery-smooth dynamic lens magnification
  useEffect(() => {
    let animId: number
    const animate = () => {
      // Lerp focal point
      const dfx = targetFocalRef.current.x - currentFocalRef.current.x
      const dfy = targetFocalRef.current.y - currentFocalRef.current.y
      currentFocalRef.current.x += dfx * 0.1
      currentFocalRef.current.y += dfy * 0.1

      setFocalPoint({
        x: Math.round(currentFocalRef.current.x * 10) / 10,
        y: Math.round(currentFocalRef.current.y * 10) / 10,
      })

      // Lerp parallax pan
      const dpx = targetPanRef.current.x - currentPanRef.current.x
      const dpy = targetPanRef.current.y - currentPanRef.current.y
      currentPanRef.current.x += dpx * 0.08
      currentPanRef.current.y += dpy * 0.08

      setPan({
        x: Math.round(currentPanRef.current.x * 10) / 10,
        y: Math.round(currentPanRef.current.y * 10) / 10,
      })

      animId = requestAnimationFrame(animate)
    }

    animId = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animId)
  }, [])

  return (
    <div className="w-full relative select-none">

      {/* ── Hover-Driven Dynamic Fisheye Canvas Container ── */}
      <div
        ref={containerRef}
        onMouseMove={handleContainerMouseMove}
        onMouseLeave={handleContainerMouseLeave}
        className="w-full h-[520px] sm:h-[600px] rounded-[4px] bg-[var(--bg-surface)] border border-[var(--border-hairline)] shadow-sm relative overflow-hidden ft-dotted-grid cursor-crosshair"
      >
        {/* Colorful Ambient Glows inside the canvas (Orange & Purple) */}
        <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-[var(--accent-orange)]/12 blur-[90px] pointer-events-none z-10" />
        <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-[var(--accent-purple)]/12 blur-[90px] pointer-events-none z-10" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-[var(--accent-purple)]/8 blur-[110px] pointer-events-none z-10" />

        {/* Soft edge vignette */}
        <div
          className="absolute inset-0 pointer-events-none z-20"
          style={{
            background:
              'radial-gradient(circle at 50% 50%, transparent 60%, rgba(227,224,230,0.7) 90%, rgba(227,224,230,0.95) 100%)',
          }}
        />

        {/* Floating instruction pill */}
        <div className="absolute top-3 left-3 z-30 pointer-events-none flex items-center gap-1.5 px-2.5 py-1 rounded-[2px] bg-[var(--bg-surface)]/95 border border-[var(--border-hairline)] text-[11px] font-mono text-[var(--text-muted)] shadow-xs">
          <span className="w-2 h-2 rounded-full bg-[var(--accent-orange)] animate-pulse" />
          <span>Move cursor anywhere to magnify that area • Icons scale dynamically</span>
        </div>

        {/* Transformed Canvas Plane */}
        <div
          className="w-full h-full relative flex items-center justify-center"
          style={{
            transform: `translate3d(${pan.x}px, ${pan.y}px, 0px)`,
            willChange: 'transform',
          }}
        >
          {nodePositions.map(({ member, x, y, isRecent }) => {
            // Distance from this node to the dynamic focal point (where user's cursor is!)
            const distToFocus = Math.hypot(x - focalPoint.x, y - focalPoint.y)

            // Dynamic fisheye lens scale
            const focusRadius = 380
            const normDist = Math.min(distToFocus / focusRadius, 1.0)
            let baseScale = Math.max(0.58, 1.34 - Math.pow(normDist, 1.3) * 0.76)

            const isHovered = activeHoverId === member.id
            if (isHovered) {
              baseScale = Math.max(baseScale, 1.42)
            }

            // Opacity: high contrast near focal center, gently faded further away
            const opacity = Math.max(0.5, 1 - Math.pow(normDist, 2.0) * 0.5)

            // Dynamic z-index: closest to focus stacks on top
            const zIndex = isHovered ? 60 : Math.round(50 - distToFocus / 10)

            return (
              <div
                key={member.id}
                style={{
                  position: 'absolute',
                  left: `calc(50% + ${x}px)`,
                  top: `calc(50% + ${y}px)`,
                  transform: `translate(-50%, -50%) scale(${baseScale})`,
                  opacity,
                  zIndex,
                  transition: isHovered ? 'transform 120ms ease' : 'none',
                }}
                onMouseEnter={() => setActiveHoverId(member.id)}
                onMouseLeave={() => setActiveHoverId(null)}
                className="group select-none"
              >
                {/* Node Tile */}
                <div
                  onClick={() => onSelectMember(member)}
                  className={`relative rounded-full p-[2.5px] transition-all duration-200 cursor-pointer shadow-md ${
                    isRecent
                      ? 'bg-gradient-to-tr from-[var(--accent-orange)] via-[var(--accent-purple)] to-[var(--accent-orange)] shadow-md'
                      : 'bg-[var(--bg-surface)] border-2 border-[var(--border-hairline)] hover:border-[var(--accent-orange)]'
                  }`}
                  style={{
                    width: '92px',
                    height: '92px',
                  }}
                >
                  {/* Photo Circle */}
                  <div className="w-full h-full rounded-full overflow-hidden bg-[var(--bg-page)] relative">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-200"
                      loading="lazy"
                    />

                    {/* Proximity / Hover Tooltip Card */}
                    <AnimatePresence>
                      {isHovered && (
                        <motion.div
                          initial={{ opacity: 0, y: 8, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 8, scale: 0.95 }}
                          transition={{ duration: 0.12 }}
                          className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-56 p-3 rounded-[3px] bg-[var(--bg-surface)] border border-[var(--border-hairline)] shadow-2xl z-50 text-center pointer-events-auto"
                          onClick={e => e.stopPropagation()}
                        >
                          <div className="text-[10px] font-mono font-bold text-[var(--accent-orange)] uppercase tracking-wider mb-0.5">
                            {member.role}
                          </div>
                          <div className="text-sm font-semibold text-[var(--text-primary)] leading-tight">
                            {member.name}
                          </div>
                          <div className="text-[11px] text-[var(--text-muted)] font-mono mt-0.5">
                            {member.department}
                          </div>

                          {member.researchFocus && (
                            <div className="mt-2 text-[10px] font-medium text-[var(--accent-purple)] bg-[var(--accent-purple-light)] py-0.5 px-2 rounded-[2px]">
                              {member.researchFocus}
                            </div>
                          )}

                          {/* Quick Actions */}
                          <div className="flex items-center justify-center gap-1.5 mt-2.5 pt-2 border-t border-[var(--border-hairline)]">
                            {member.hasLinkedIn() && (
                              <a
                                href={member.getLinkedInUrl()!}
                                target="_blank"
                                rel="noopener noreferrer"
                                title="LinkedIn Profile"
                                className="h-6 px-2.5 rounded-[2px] bg-[var(--accent-orange)] hover:bg-[var(--accent-orange-hover)] text-white text-[10px] font-medium flex items-center gap-1 transition-colors"
                              >
                                <LinkedinIcon className="w-2.5 h-2.5" />
                                <span>LinkedIn</span>
                              </a>
                            )}
                            {member.hasEmail() && (
                              <a
                                href={member.getEmailFallback()!}
                                title="Email fallback"
                                className="w-6 h-6 rounded-[2px] bg-[var(--bg-page)] hover:bg-[var(--border-hairline)] text-[var(--text-muted)] flex items-center justify-center transition-colors"
                              >
                                <Mail className="w-2.5 h-2.5 text-[var(--accent-purple)]" />
                              </a>
                            )}
                            <button
                              onClick={() => onSelectMember(member)}
                              title="Jump to category card"
                              className="h-6 px-2 rounded-[2px] bg-[var(--text-primary)] text-white text-[10px] font-medium flex items-center gap-1 cursor-pointer"
                            >
                              <span>Card</span>
                              <ExternalLink className="w-2.5 h-2.5" />
                            </button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                {/* Full Name beneath member node */}
                {!isHovered && (
                  <div className="text-center mt-1.5 pointer-events-none w-32 -ml-5">
                    <div className="text-[11px] sm:text-[12px] font-semibold text-[var(--text-primary)] leading-tight line-clamp-2 px-1 text-center bg-[var(--bg-surface)]/85 backdrop-blur-xs rounded-[2px] py-0.5 shadow-xs border border-[var(--border-hairline)]">
                      {member.name}
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default AppleWatchCluster
