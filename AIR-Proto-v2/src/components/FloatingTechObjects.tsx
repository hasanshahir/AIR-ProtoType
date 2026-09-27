import { motion, useScroll, useTransform } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Cpu, Terminal } from 'lucide-react'

export default function FloatingTechObjects() {
  const { scrollY } = useScroll()
  const [windowHeight, setWindowHeight] = useState(1000)

  useEffect(() => {
    setWindowHeight(window.innerHeight)
    const handleResize = () => setWindowHeight(window.innerHeight)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Parallax calculations based on scroll position
  const y1 = useTransform(scrollY, [0, windowHeight * 2], [0, -220])
  const y2 = useTransform(scrollY, [0, windowHeight * 2], [0, 320])
  const y3 = useTransform(scrollY, [0, windowHeight * 2], [0, -180])
  const y4 = useTransform(scrollY, [0, windowHeight * 2], [0, 260])

  const r1 = useTransform(scrollY, [0, windowHeight * 2], [0, 90])
  const r2 = useTransform(scrollY, [0, windowHeight * 2], [0, -180])

  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      {/* Floating Tech Plus Cross */}
      <motion.div
        style={{ y: y1, rotate: r1 }}
        className="absolute top-1/4 left-[8%] text-[var(--primary)] opacity-30 w-7 h-7 flex items-center justify-center"
      >
        <div className="w-px h-full bg-current absolute" />
        <div className="w-full h-px bg-current absolute" />
      </motion.div>

      {/* Floating Tech Bracket (Ali's style) */}
      <motion.div
        style={{ y: y2 }}
        className="absolute top-[48%] right-[12%] text-[var(--primary)] opacity-25 font-mono text-3xl font-bold tracking-widest hidden md:block"
      >
        {`{ ... }`}
      </motion.div>

      {/* Floating Dot Matrix 3x3 Block */}
      <motion.div
        style={{ y: y4 }}
        className="absolute top-[28%] right-[8%] grid grid-cols-3 gap-1.5 opacity-25 hidden sm:grid"
      >
        {[...Array(9)].map((_, i) => (
          <div key={i} className="w-1.5 h-1.5 rounded-full bg-[var(--primary)]" />
        ))}
      </motion.div>

      {/* Floating Engineering Micro-Chips */}
      <motion.div
        style={{ y: y3, rotate: r2 }}
        className="hidden xl:flex absolute top-[68%] left-[6%] items-center gap-2 px-3 py-1 rounded-full border border-[var(--primary)]/30 bg-[var(--bg-card)]/70 backdrop-blur-md text-[var(--primary)] text-[11px] font-mono shadow-sm"
      >
        <Cpu className="w-3.5 h-3.5" />
        <span>Edge TensorRT 60FPS</span>
      </motion.div>

      <motion.div
        style={{ y: y1 }}
        className="hidden xl:flex absolute top-[74%] right-[6%] items-center gap-2 px-3 py-1 rounded-full border border-[var(--border)] bg-[var(--bg-card)]/70 backdrop-blur-md text-[var(--fg-sub)] text-[11px] font-mono shadow-sm"
      >
        <Terminal className="w-3.5 h-3.5 text-[var(--primary)]" />
        <span>UrduLLM 12.4B</span>
      </motion.div>
    </div>
  )
}
