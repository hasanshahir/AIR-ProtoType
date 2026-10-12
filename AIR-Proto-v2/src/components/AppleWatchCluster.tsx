import React, { useState, useRef, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Grid,
  List,
  ChevronLeft,
  ExternalLink,
  Mail,
  Battery,
  Wifi,
  Sparkles,
  Layers,
} from 'lucide-react'
import { TeamMemberEntity } from '../entities/TeamMemberEntity'

interface AppleWatchClusterProps {
  members: TeamMemberEntity[]
  onSelectMember: (member: TeamMemberEntity) => void
}

type BandTheme = 'purple' | 'black' | 'starlight' | 'gold'
type ViewMode = 'grid' | 'list'

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

  // Watch state
  const [bandTheme, setBandTheme] = useState<BandTheme>('purple')
  const [viewMode, setViewMode] = useState<ViewMode>('grid')
  const [zoomScale, setZoomScale] = useState<number>(1.0)
  const [crownRotation, setCrownRotation] = useState<number>(0)
  const [selectedWatchMember, setSelectedWatchMember] = useState<TeamMemberEntity | null>(null)

  // Live digital clock for watchOS status bar
  const [currentTime, setCurrentTime] = useState<string>('09:41')
  useEffect(() => {
    const updateClock = () => {
      const now = new Date()
      setCurrentTime(
        now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })
      )
    }
    updateClock()
    const timer = setInterval(updateClock, 10000)
    return () => clearInterval(timer)
  }, [])

  // Drag pan offset state for honeycomb cluster
  const [pan, setPan] = useState<{ x: number; y: number }>({ x: 0, y: 0 })
  const isDraggingRef = useRef(false)
  const dragStartRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 })
  const panStartRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 })

  // Cursor focal point for fisheye lens magnification
  const [focalPoint, setFocalPoint] = useState<{ x: number; y: number }>({ x: 0, y: 0 })
  const [activeHoverId, setActiveHoverId] = useState<string | null>(null)

  // Concentric hexagonal layout for iconic watchOS honeycomb launcher
  const nodePositions = useMemo(() => {
    const spacingX = 135
    const spacingY = 118
    const positions: { member: TeamMemberEntity; x: number; y: number; isRecent: boolean }[] = []

    let ring = 0
    let placed = 0
    const total = members.length

    // Center node (Principal Investigator / Lab Director)
    if (placed < total) {
      positions.push({ member: members[placed], x: 0, y: 0, isRecent: true })
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
          member: members[placed],
          x,
          y,
          isRecent: placed < 7,
        })
        placed++
      }
    }

    return positions
  }, [members])

  // Pan dragging handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (selectedWatchMember) return
    isDraggingRef.current = true
    dragStartRef.current = { x: e.clientX, y: e.clientY }
    panStartRef.current = { ...pan }
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const cursorRelX = (e.clientX - (rect.left + rect.width / 2)) / zoomScale
    const cursorRelY = (e.clientY - (rect.top + rect.height / 2)) / zoomScale

    setFocalPoint({ x: cursorRelX, y: cursorRelY })

    if (isDraggingRef.current) {
      const dx = e.clientX - dragStartRef.current.x
      const dy = e.clientY - dragStartRef.current.y
      // Clamp pan within bounds
      const maxPan = 280 * zoomScale
      const newX = Math.max(-maxPan, Math.min(maxPan, panStartRef.current.x + dx))
      const newY = Math.max(-maxPan, Math.min(maxPan, panStartRef.current.y + dy))
      setPan({ x: newX, y: newY })
      setCrownRotation(prev => prev + dy * 0.4)
    }
  }

  const handleMouseUp = () => {
    isDraggingRef.current = false
  }

  // Digital Crown zoom controls
  const handleZoom = (delta: number) => {
    setZoomScale(prev => {
      const next = Math.max(0.75, Math.min(1.5, Math.round((prev + delta) * 100) / 100))
      return next
    })
    setCrownRotation(prev => prev + (delta > 0 ? 45 : -45))
  }

  const handleRecenter = () => {
    setPan({ x: 0, y: 0 })
    setZoomScale(1.0)
    setFocalPoint({ x: 0, y: 0 })
    setCrownRotation(0)
    setSelectedWatchMember(null)
  }

  // Band styles
  const bandStyles: Record<
    BandTheme,
    {
      label: string
      strapBg: string
      caseBorder: string
      caseGlow: string
      accentColor: string
      subColor: string
    }
  > = {
    purple: {
      label: 'AIR Purple Loop',
      strapBg: 'linear-gradient(180deg, #532BB8 0%, #6B3FE6 50%, #4B24B0 100%)',
      caseBorder: '#452A80',
      caseGlow: 'rgba(107, 63, 230, 0.25)',
      accentColor: '#6B3FE6',
      subColor: '#FAF7FF',
    },
    black: {
      label: 'Space Titanium',
      strapBg: 'linear-gradient(180deg, #1C1C20 0%, #2A2A30 50%, #151518 100%)',
      caseBorder: '#383840',
      caseGlow: 'rgba(0, 0, 0, 0.45)',
      accentColor: '#F04E1F',
      subColor: '#F2F2F5',
    },
    starlight: {
      label: 'Chalk White Sport',
      strapBg: 'linear-gradient(180deg, #E6E1D9 0%, #F4EFEB 50%, #DDD8CF 100%)',
      caseBorder: '#C9C4BC',
      caseGlow: 'rgba(215, 205, 195, 0.35)',
      accentColor: '#E06C47',
      subColor: '#FFFFFF',
    },
    gold: {
      label: 'Milanese Mesh',
      strapBg: 'repeating-linear-gradient(45deg, #B5935A 0, #B5935A 2px, #9E7D46 2px, #9E7D46 4px)',
      caseBorder: '#C5A059',
      caseGlow: 'rgba(197, 160, 89, 0.35)',
      accentColor: '#D4AF37',
      subColor: '#FFFDF7',
    },
  }

  const currentTheme = bandStyles[bandTheme]

  return (
    <div className="w-full py-4 select-none flex flex-col items-center">
      {/* ── Top Apple Watch Controller Bar ── */}
      <div className="w-full max-w-2xl mb-8 flex flex-wrap items-center justify-between gap-4 p-3 sm:p-4 rounded-[4px] bg-[var(--bg-surface)] border border-[var(--border-hairline)] shadow-xs">
        {/* View Mode Toggle (Grid vs List) */}
        <div className="flex items-center gap-1.5 p-1 bg-[var(--bg-page)] rounded-[2px] border border-[var(--border-hairline)]">
          <button
            onClick={() => {
              setViewMode('grid')
              setSelectedWatchMember(null)
            }}
            className={`px-3 py-1.5 rounded-[2px] text-xs font-mono font-medium flex items-center gap-1.5 transition-all cursor-pointer ${
              viewMode === 'grid'
                ? 'bg-[var(--accent-orange)] text-white shadow-xs'
                : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
            }`}
          >
            <Grid className="w-3.5 h-3.5" />
            <span>Honeycomb Grid</span>
          </button>

          <button
            onClick={() => {
              setViewMode('list')
              setSelectedWatchMember(null)
            }}
            className={`px-3 py-1.5 rounded-[2px] text-xs font-mono font-medium flex items-center gap-1.5 transition-all cursor-pointer ${
              viewMode === 'list'
                ? 'bg-[var(--text-primary)] text-white shadow-xs'
                : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
            }`}
          >
            <List className="w-3.5 h-3.5" />
            <span>watchOS List</span>
          </button>
        </div>

        {/* Band Theme Switcher */}
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-mono text-[var(--text-subtle)] hidden sm:inline">
            Watch Finish:
          </span>
          <div className="flex items-center gap-1.5">
            {(['purple', 'black', 'starlight', 'gold'] as BandTheme[]).map(key => (
              <button
                key={key}
                onClick={() => setBandTheme(key)}
                title={bandStyles[key].label}
                className={`w-6 h-6 rounded-full border-2 transition-all cursor-pointer ${
                  bandTheme === key
                    ? 'scale-115 border-[var(--text-primary)] shadow-xs ring-2 ring-[var(--accent-orange)]/40'
                    : 'border-transparent opacity-75 hover:opacity-100'
                }`}
                style={{
                  background:
                    key === 'purple'
                      ? '#6B3FE6'
                      : key === 'black'
                      ? '#1A1A1E'
                      : key === 'starlight'
                      ? '#EAE5DC'
                      : '#C8A251',
                }}
              />
            ))}
          </div>
        </div>

        {/* Digital Crown Zoom & Recenter Controls */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => handleZoom(-0.15)}
            disabled={zoomScale <= 0.75}
            className="w-7 h-7 rounded-[2px] bg-[var(--bg-page)] border border-[var(--border-hairline)] hover:border-[var(--text-primary)] flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--text-primary)] disabled:opacity-40 transition-colors cursor-pointer"
            title="Crown Zoom Out"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>

          <span className="text-[11px] font-mono text-[var(--text-muted)] w-10 text-center font-bold">
            {Math.round(zoomScale * 100)}%
          </span>

          <button
            onClick={() => handleZoom(0.15)}
            disabled={zoomScale >= 1.5}
            className="w-7 h-7 rounded-[2px] bg-[var(--bg-page)] border border-[var(--border-hairline)] hover:border-[var(--text-primary)] flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--text-primary)] disabled:opacity-40 transition-colors cursor-pointer"
            title="Crown Zoom In"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={handleRecenter}
            className="h-7 px-2.5 rounded-[2px] bg-[var(--bg-page)] border border-[var(--border-hairline)] hover:border-[var(--accent-orange)] text-[11px] font-mono font-medium text-[var(--text-muted)] hover:text-[var(--accent-orange)] flex items-center gap-1 transition-colors cursor-pointer ml-1"
            title="Press Crown to Recenter"
          >
            <RotateCcw className="w-3 h-3" />
            <span className="hidden sm:inline">Center</span>
          </button>
        </div>
      </div>

      {/* ── Apple Watch Device Rig & Chassis ── */}
      <div className="relative flex flex-col items-center">
        {/* Ambient Watch Glow */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[460px] h-[580px] rounded-[70px] blur-[90px] pointer-events-none transition-all duration-700"
          style={{ background: currentTheme.caseGlow }}
        />

        {/* ── Upper Watch Band ── */}
        <div
          className="w-[190px] sm:w-[220px] h-[65px] rounded-t-[28px] relative overflow-hidden shadow-inner border-t border-x border-white/20 transition-all duration-500"
          style={{ background: currentTheme.strapBg }}
        >
          {/* Band Texture Ribs */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/30" />
          <div className="absolute bottom-0 inset-x-0 h-3 bg-black/40 blur-xs" />
        </div>

        {/* ── Apple Watch Casing Frame (Ultra Chassis) ── */}
        <div
          className="relative w-[340px] sm:w-[390px] h-[480px] sm:h-[530px] rounded-[52px] sm:rounded-[60px] p-[14px] sm:p-[16px] shadow-2xl transition-all duration-500 z-10"
          style={{
            background:
              bandTheme === 'black'
                ? 'linear-gradient(145deg, #2A2A30 0%, #151518 45%, #25252B 100%)'
                : bandTheme === 'starlight'
                ? 'linear-gradient(145deg, #ECE7E0 0%, #DAD4CB 45%, #ECE7DF 100%)'
                : bandTheme === 'gold'
                ? 'linear-gradient(145deg, #E6C87E 0%, #B8974D 45%, #DFBE72 100%)'
                : 'linear-gradient(145deg, #3A2375 0%, #201348 45%, #351F6B 100%)',
            boxShadow: `0 24px 60px -12px rgba(0,0,0,0.5), inset 0 2px 3px rgba(255,255,255,0.35), inset 0 -2px 3px rgba(0,0,0,0.6)`,
            border: `2px solid ${currentTheme.caseBorder}`,
          }}
        >
          {/* Metallic Inner Chamfer */}
          <div className="w-full h-full rounded-[42px] sm:rounded-[48px] bg-black p-[5px] sm:p-[6px] relative shadow-inner overflow-hidden border border-white/10">
            {/* ── Sapphire OLED Curved Glass Screen ── */}
            <div
              ref={containerRef}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={() => {
                isDraggingRef.current = false
                setActiveHoverId(null)
              }}
              className="w-full h-full rounded-[38px] sm:rounded-[44px] bg-[#070709] relative overflow-hidden flex flex-col cursor-grab active:cursor-grabbing select-none"
            >
              {/* Subtle glass reflection highlight across top corner */}
              <div
                className="absolute inset-0 pointer-events-none z-30 opacity-40"
                style={{
                  background:
                    'linear-gradient(135deg, rgba(255,255,255,0.24) 0%, rgba(255,255,255,0.06) 28%, transparent 55%)',
                }}
              />

              {/* ── watchOS Status Bar ── */}
              <div className="h-10 sm:h-11 px-5 pt-2 flex items-center justify-between text-white font-mono text-[11px] sm:text-xs z-20 shrink-0 pointer-events-none">
                {/* Live Digital Clock */}
                <span className="font-bold tracking-tight text-white drop-shadow-xs">
                  {currentTime}
                </span>

                {/* Center AIR Notification Pill */}
                <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-[10px]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-orange)] animate-pulse" />
                  <span className="font-head font-bold tracking-wider text-[var(--accent-orange)]">
                    AIR
                  </span>
                </div>

                {/* Battery & Signal */}
                <div className="flex items-center gap-1.5 text-white/80">
                  <Wifi className="w-3 h-3 text-white/90" />
                  <div className="flex items-center gap-0.5 text-emerald-400 font-bold text-[10px]">
                    <Battery className="w-3.5 h-3.5 fill-emerald-400" />
                    <span>100%</span>
                  </div>
                </div>
              </div>

              {/* ── SCREEN BODY CONTENT ── */}
              <div className="flex-1 relative overflow-hidden">
                <AnimatePresence mode="wait">
                  {/* DETAIL VIEW: Member Profile App on Apple Watch */}
                  {selectedWatchMember ? (
                    <motion.div
                      key="member-detail"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.2 }}
                      className="absolute inset-0 p-4 pt-1 flex flex-col justify-between text-white overflow-y-auto bg-black/95 z-20"
                    >
                      {/* Top Bar inside Member App */}
                      <div className="flex items-center justify-between border-b border-white/10 pb-2 mb-2">
                        <button
                          onClick={() => setSelectedWatchMember(null)}
                          className="flex items-center gap-1 text-[11px] font-mono text-[var(--accent-orange)] hover:text-white transition-colors cursor-pointer"
                        >
                          <ChevronLeft className="w-4 h-4" />
                          <span>Back</span>
                        </button>
                        <span className="text-[10px] font-mono uppercase tracking-wider text-white/60">
                          {selectedWatchMember.role}
                        </span>
                      </div>

                      {/* Member Hero in Watch App */}
                      <div className="flex flex-col items-center text-center my-auto px-2">
                        <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full p-1 bg-gradient-to-tr from-[var(--accent-orange)] to-[var(--accent-purple)] mb-3 shadow-lg">
                          <img
                            src={selectedWatchMember.image}
                            alt={selectedWatchMember.name}
                            className="w-full h-full object-cover rounded-full"
                          />
                        </div>

                        <h3 className="font-head font-bold text-base sm:text-lg text-white leading-tight mb-1">
                          {selectedWatchMember.name}
                        </h3>

                        <p className="text-[11px] text-[var(--accent-orange)] font-mono font-medium mb-1">
                          {selectedWatchMember.department}
                        </p>

                        {selectedWatchMember.researchFocus && (
                          <div className="text-[10px] text-white/90 bg-[var(--accent-purple)]/40 border border-[var(--accent-purple)]/60 px-2.5 py-1 rounded-full my-2 font-mono">
                            {selectedWatchMember.researchFocus}
                          </div>
                        )}
                      </div>

                      {/* Quick watchOS Action Buttons */}
                      <div className="space-y-1.5 pt-2 border-t border-white/10 shrink-0">
                        <button
                          onClick={() => onSelectMember(selectedWatchMember)}
                          className="w-full h-8.5 rounded-[12px] bg-[var(--accent-orange)] hover:bg-[var(--accent-orange-hover)] text-white text-[11px] font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-xs"
                        >
                          <span>Open in Lab Directory</span>
                          <ExternalLink className="w-3 h-3" />
                        </button>

                        <div className="grid grid-cols-2 gap-1.5">
                          {selectedWatchMember.hasLinkedIn() && (
                            <a
                              href={selectedWatchMember.getLinkedInUrl()!}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="h-7.5 rounded-[10px] bg-white/15 hover:bg-white/25 text-white text-[10px] font-mono flex items-center justify-center gap-1 transition-colors"
                            >
                              <LinkedinIcon className="w-3 h-3" />
                              <span>LinkedIn</span>
                            </a>
                          )}
                          {selectedWatchMember.hasEmail() && (
                            <a
                              href={`mailto:${selectedWatchMember.email}`}
                              className="h-7.5 rounded-[10px] bg-white/15 hover:bg-white/25 text-white text-[10px] font-mono flex items-center justify-center gap-1 transition-colors"
                            >
                              <Mail className="w-3 h-3 text-[var(--accent-orange)]" />
                              <span>Email</span>
                            </a>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ) : viewMode === 'grid' ? (
                    /* ── VIEW 1: WATCHOS HONEYCOMB GRID LAUNCHER ── */
                    <motion.div
                      key="grid-launcher"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="w-full h-full relative"
                    >
                      {/* Radial space background glow inside watch face */}
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(107,63,230,0.18)_0%,transparent_70%)] pointer-events-none" />

                      {/* Instructions pill overlay */}
                      <div className="absolute bottom-2 inset-x-0 mx-auto w-fit z-20 pointer-events-none">
                        <div className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-[10px] font-mono text-white/80 shadow-xs flex items-center gap-1.5">
                          <Sparkles className="w-2.5 h-2.5 text-[var(--accent-orange)]" />
                          <span>Drag screen &bull; Tap avatar</span>
                        </div>
                      </div>

                      {/* Interactive Honeycomb Plane */}
                      <div
                        className="w-full h-full relative flex items-center justify-center"
                        style={{
                          transform: `translate3d(${pan.x}px, ${pan.y}px, 0px) scale(${zoomScale})`,
                          transformOrigin: 'center center',
                          transition: isDraggingRef.current ? 'none' : 'transform 200ms ease-out',
                        }}
                      >
                        {nodePositions.map(({ member, x, y, isRecent }) => {
                          // Fisheye proximity lens calculation
                          const distToFocus = Math.hypot(x - focalPoint.x, y - focalPoint.y)
                          const focusRadius = 260
                          const normDist = Math.min(distToFocus / focusRadius, 1.0)
                          let nodeScale = Math.max(0.68, 1.25 - Math.pow(normDist, 1.4) * 0.55)

                          const isHovered = activeHoverId === member.id
                          if (isHovered) {
                            nodeScale = Math.max(nodeScale, 1.35)
                          }

                          const opacity = Math.max(0.65, 1 - Math.pow(normDist, 2.0) * 0.45)
                          const zIndex = isHovered ? 40 : Math.round(30 - distToFocus / 10)

                          return (
                            <div
                              key={member.id}
                              style={{
                                position: 'absolute',
                                left: `calc(50% + ${x}px)`,
                                top: `calc(50% + ${y}px)`,
                                transform: `translate(-50%, -50%) scale(${nodeScale})`,
                                opacity,
                                zIndex,
                              }}
                              onMouseEnter={() => setActiveHoverId(member.id)}
                              onMouseLeave={() => setActiveHoverId(null)}
                              onClick={e => {
                                e.stopPropagation()
                                setSelectedWatchMember(member)
                              }}
                              className="group select-none cursor-pointer"
                            >
                              {/* Circular Bubble Icon */}
                              <div
                                className={`rounded-full p-[2px] transition-all duration-200 shadow-md ${
                                  isRecent
                                    ? 'bg-gradient-to-tr from-[var(--accent-orange)] via-[var(--accent-purple)] to-[var(--accent-orange)]'
                                    : 'bg-white/20 hover:bg-white/50 border border-white/30'
                                }`}
                                style={{
                                  width: '68px',
                                  height: '68px',
                                }}
                              >
                                <div className="w-full h-full rounded-full overflow-hidden bg-black/80 relative">
                                  <img
                                    src={member.image}
                                    alt={member.name}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-200"
                                    loading="lazy"
                                  />
                                </div>
                              </div>

                              {/* Mini Name Pill on Hover */}
                              {isHovered && (
                                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 px-2 py-0.5 rounded-full bg-black/90 border border-white/20 whitespace-nowrap text-[9px] font-mono text-white shadow-lg pointer-events-none z-50">
                                  {member.name}
                                </div>
                              )}
                            </div>
                          )
                        })}
                      </div>
                    </motion.div>
                  ) : (
                    /* ── VIEW 2: WATCHOS LIST VIEW ── */
                    <motion.div
                      key="list-launcher"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="w-full h-full overflow-y-auto px-3.5 py-2 space-y-2 text-left"
                    >
                      <div className="text-[10px] font-mono uppercase text-white/50 px-1 pt-1 pb-1">
                        All Researchers ({members.length})
                      </div>
                      {members.map(member => (
                        <div
                          key={member.id}
                          onClick={() => setSelectedWatchMember(member)}
                          className="p-2 rounded-[14px] bg-white/10 hover:bg-white/20 border border-white/10 transition-all cursor-pointer flex items-center gap-2.5 active:scale-98"
                        >
                          <div className="w-9 h-9 rounded-full overflow-hidden bg-black shrink-0 border border-white/20">
                            <img
                              src={member.image}
                              alt={member.name}
                              className="w-full h-full object-cover"
                            />
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="text-xs font-semibold text-white truncate">
                              {member.name}
                            </div>
                            <div className="text-[10px] text-[var(--accent-orange)] font-mono truncate">
                              {member.role}
                            </div>
                          </div>

                          <span className="text-white/40 text-xs font-mono">›</span>
                        </div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* ── Hardware Controls on the Watch Chassis ── */}
          {/* 1. Digital Crown (Rotatable Knob on the right) */}
          <div
            onClick={handleRecenter}
            title="Digital Crown (Click to Recenter, drag to rotate)"
            className="absolute -right-[13px] sm:-right-[15px] top-[72px] sm:top-[80px] w-[13px] sm:w-[15px] h-[52px] sm:h-[58px] rounded-r-[5px] cursor-pointer shadow-lg transition-transform hover:scale-105 active:scale-95 z-20 flex flex-col justify-around py-1 overflow-hidden"
            style={{
              background:
                bandTheme === 'black'
                  ? 'linear-gradient(90deg, #1C1C20 0%, #3A3A42 50%, #151518 100%)'
                  : bandTheme === 'gold'
                  ? 'linear-gradient(90deg, #B8974D 0%, #F5D78E 50%, #A2823C 100%)'
                  : bandTheme === 'starlight'
                  ? 'linear-gradient(90deg, #C2BCB3 0%, #FAF6EE 50%, #ADA79E 100%)'
                  : 'linear-gradient(90deg, #4A2B99 0%, #7E4EE8 50%, #371E73 100%)',
              border: `1px solid ${currentTheme.caseBorder}`,
            }}
          >
            {/* Digital Crown Knurled Ridges */}
            {[...Array(9)].map((_, i) => (
              <div
                key={i}
                className="w-full h-[1.5px] bg-black/40"
                style={{
                  transform: `translateY(${Math.sin((crownRotation + i * 20) * (Math.PI / 180)) * 2}px)`,
                }}
              />
            ))}
          </div>

          {/* 2. Side Button (Flush Titanium Button below Crown) */}
          <button
            onClick={() => {
              setViewMode(prev => (prev === 'grid' ? 'list' : 'grid'))
              setSelectedWatchMember(null)
            }}
            title="Side Button (Click to Toggle Grid/List)"
            className="absolute -right-[7px] sm:-right-[8px] top-[152px] sm:top-[168px] w-[7px] sm:w-[8px] h-[70px] sm:h-[78px] rounded-r-[3px] cursor-pointer transition-all hover:brightness-125 active:scale-95 z-20"
            style={{
              background:
                bandTheme === 'black'
                  ? '#28282E'
                  : bandTheme === 'gold'
                  ? '#C5A059'
                  : bandTheme === 'starlight'
                  ? '#D5CFC6'
                  : '#442788',
              border: `1px solid ${currentTheme.caseBorder}`,
            }}
          />

          {/* 3. Microphone Hole & Speaker Slits on Left */}
          <div className="absolute -left-[5px] top-[110px] w-[5px] h-[18px] rounded-l-[2px] bg-black/70" />
          <div className="absolute -left-[5px] top-[138px] w-[5px] h-[32px] rounded-l-[2px] bg-black/70 flex flex-col justify-around py-1">
            <div className="w-[3px] h-[1.5px] bg-black ml-auto" />
            <div className="w-[3px] h-[1.5px] bg-black ml-auto" />
            <div className="w-[3px] h-[1.5px] bg-black ml-auto" />
          </div>
        </div>

        {/* ── Lower Watch Band ── */}
        <div
          className="w-[190px] sm:w-[220px] h-[75px] rounded-b-[28px] relative overflow-hidden shadow-2xl border-b border-x border-white/20 transition-all duration-500"
          style={{ background: currentTheme.strapBg }}
        >
          {/* Band Tuck Pin */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-black/30 border border-white/20 flex items-center justify-center">
            <div className="w-2.5 h-2.5 rounded-full bg-white/40" />
          </div>
          <div className="absolute top-0 inset-x-0 h-3 bg-black/40 blur-xs" />
        </div>
      </div>

      {/* ── Bottom Feature Badges & Quick Guide ── */}
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3 text-xs font-mono text-[var(--text-muted)]">
        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-[2px] bg-[var(--bg-surface)] border border-[var(--border-hairline)] shadow-2xs">
          <Layers className="w-3.5 h-3.5 text-[var(--accent-orange)]" />
          <span>{members.length} Total Scholars</span>
        </span>

        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-[2px] bg-[var(--bg-surface)] border border-[var(--border-hairline)] shadow-2xs">
          <span className="w-2 h-2 rounded-full bg-[var(--accent-purple)]" />
          <span>watchOS Honeycomb Physics</span>
        </span>

        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-[2px] bg-[var(--bg-surface)] border border-[var(--border-hairline)] shadow-2xs">
          <RotateCcw className="w-3 h-3 text-[var(--text-primary)]" />
          <span>Rotatable Digital Crown</span>
        </span>
      </div>
    </div>
  )
}

export default AppleWatchCluster
