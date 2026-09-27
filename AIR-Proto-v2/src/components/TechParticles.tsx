import { useEffect, useRef, useId } from 'react'
import { tsParticles, type Container } from '@tsparticles/engine'
import { loadSlim } from '@tsparticles/slim'
import { useTheme, THEME_OPTIONS } from './ThemeProvider'

interface TechParticlesProps {
  id?: string
  className?: string
  particleCount?: number
  interactive?: boolean
}

// Global flag to ensure loadSlim runs once
let slimLoaded = false

export default function TechParticles({
  id: customId,
  className = '',
  particleCount,
  interactive = true,
}: TechParticlesProps) {
  const generatedId = useId().replace(/:/g, '')
  const containerId = customId || `tsparticles-${generatedId}`
  const { palette, isDark } = useTheme()
  const domRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<Container | null>(null)

  // Get active theme accent color
  const activeTheme = THEME_OPTIONS.find(t => t.id === palette) || THEME_OPTIONS[0]
  const primaryColor = activeTheme.accent
  const secondaryColor = activeTheme.subAccent

  useEffect(() => {
    let isMounted = true

    const initEngine = async () => {
      if (!slimLoaded) {
        await loadSlim(tsParticles)
        slimLoaded = true
      }

      if (!isMounted || !domRef.current) return

      // Destroy any prior instance before re-loading
      if (containerRef.current) {
        containerRef.current.destroy()
        containerRef.current = null
      }

      const count = particleCount || (window.innerWidth > 1200 ? 70 : window.innerWidth > 768 ? 45 : 25)

      const instance = await tsParticles.load({
        id: containerId,
        element: domRef.current,
        options: {
          fullScreen: { enable: false },
          fpsLimit: 120,
          background: { color: { value: 'transparent' } },
          particles: {
            number: {
              value: count,
              density: {
                enable: true,
                width: 1920,
                height: 1080,
              },
            },
            color: {
              value: [primaryColor, secondaryColor, isDark ? '#FFFFFF' : '#0F172A'],
            },
            shape: {
              type: 'circle',
            },
            opacity: {
              value: { min: isDark ? 0.25 : 0.35, max: isDark ? 0.75 : 0.85 },
              animation: {
                enable: true,
                speed: 0.8,
                sync: false,
              },
            },
            size: {
              value: { min: 1.2, max: 2.8 },
            },
            links: {
              enable: true,
              distance: 140,
              color: primaryColor,
              opacity: isDark ? 0.22 : 0.28,
              width: 1,
              triangles: {
                enable: false,
              },
            },
            move: {
              enable: true,
              speed: 0.7,
              direction: 'none',
              random: true,
              straight: false,
              outModes: {
                default: 'bounce',
              },
            },
          },
          interactivity: {
            detectsOn: 'canvas',
            events: {
              onHover: {
                enable: interactive,
                mode: 'grab',
              },
              onClick: {
                enable: interactive,
                mode: 'push',
              },
              resize: {
                enable: true,
              },
            },
            modes: {
              grab: {
                distance: 180,
                links: {
                  opacity: isDark ? 0.6 : 0.7,
                  color: primaryColor,
                },
              },
              push: {
                quantity: 3,
              },
            },
          },
          detectRetina: true,
        },
      })

      if (isMounted) {
        containerRef.current = instance ?? null
      } else {
        instance?.destroy()
      }
    }

    initEngine()

    return () => {
      isMounted = false
      if (containerRef.current) {
        containerRef.current.destroy()
        containerRef.current = null
      }
    }
  }, [containerId, palette, isDark, primaryColor, secondaryColor, particleCount, interactive])

  return (
    <div
      ref={domRef}
      id={containerId}
      className={`absolute inset-0 w-full h-full pointer-events-auto z-0 ${className}`}
      style={{ overflow: 'hidden' }}
    />
  )
}
