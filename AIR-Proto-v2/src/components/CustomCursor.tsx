import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useEffect, useState } from 'react'

export default function CustomCursor() {
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)

  const springConfig = { damping: 25, stiffness: 350, mass: 0.4 }
  const cursorXSpring = useSpring(cursorX, springConfig)
  const cursorYSpring = useSpring(cursorY, springConfig)

  const [hoverType, setHoverType] = useState<'none' | 'pointer' | 'text'>('none')
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (window.matchMedia('(pointer: coarse)').matches) return

    const onMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
      if (!isVisible) setIsVisible(true)
    }

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null
      if (!target) return

      // Interactive link/button check
      if (
        target.tagName.toLowerCase() === 'a' ||
        target.tagName.toLowerCase() === 'button' ||
        target.closest('a') ||
        target.closest('button') ||
        target.getAttribute('role') === 'button' ||
        window.getComputedStyle(target).cursor === 'pointer'
      ) {
        setHoverType('pointer')
        return
      }

      // Text element check
      if (
        ['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'span', 'li', 'blockquote'].includes(target.tagName.toLowerCase()) &&
        target.innerText && target.innerText.trim().length > 0
      ) {
        setHoverType('text')
        return
      }

      setHoverType('none')
    }

    const onMouseLeave = () => {
      setIsVisible(false)
    }

    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseover', onMouseOver)
    document.addEventListener('mouseleave', onMouseLeave)

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseover', onMouseOver)
      document.removeEventListener('mouseleave', onMouseLeave)
    }
  }, [cursorX, cursorY, isVisible])

  if (!isVisible) return null

  return (
    <>
      {/* Precision Core Dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 rounded-full pointer-events-none z-[9999] mix-blend-difference bg-white -ml-1 -mt-1"
        style={{
          x: cursorX,
          y: cursorY,
        }}
        animate={{
          scale: hoverType === 'text' ? 0.5 : hoverType === 'pointer' ? 1.8 : 1,
          opacity: 1,
        }}
        transition={{ duration: 0.1 }}
      />

      {/* Spring Ring Aura */}
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[9998] mix-blend-difference border border-white -ml-4 -mt-4 flex items-center justify-center"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
        }}
        animate={{
          width: hoverType === 'pointer' ? 44 : hoverType === 'text' ? 24 : 32,
          height: hoverType === 'pointer' ? 44 : hoverType === 'text' ? 36 : 32,
          borderRadius: hoverType === 'text' ? 4 : 9999,
          backgroundColor: hoverType === 'pointer' ? 'rgba(255, 255, 255, 0.25)' : 'rgba(255, 255, 255, 0.03)',
          borderColor: hoverType === 'pointer' ? 'rgba(255, 255, 255, 0.9)' : 'rgba(255, 255, 255, 0.5)',
        }}
        transition={{ duration: 0.15, ease: 'easeOut' }}
      />
    </>
  )
}
