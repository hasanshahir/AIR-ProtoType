import { useTheme } from './ThemeProvider'

interface AirLabLogoProps {
  className?: string
  height?: number | string
}

export default function AirLabLogo({
  className = '',
  height = 36,
}: AirLabLogoProps) {
  const { isDark } = useTheme()

  return (
    <div className={`inline-flex items-center gap-2.5 ${className}`}>
      {/* Official Transparent Monogram & Wordmark */}
      <img
        src={isDark ? './air-lab-logo-white.png' : './air-lab-logo-dark.png'}
        alt="AI Research Lab — NED University"
        style={{ height: typeof height === 'number' ? `${height}px` : height, width: 'auto' }}
        className="object-contain transition-opacity duration-300 no-dormant"
      />
    </div>
  )
}
