import React from 'react'
import { getComputedLabStats } from '../lib/data'

interface LabStatsStripProps {
  className?: string
}

export const LabStatsStrip: React.FC<LabStatsStripProps> = ({ className = '' }) => {
  const stats = getComputedLabStats()

  return (
    <div className={`relative rounded-[4px] overflow-hidden bg-[var(--bg-surface)] backdrop-blur-xs border border-[var(--border-hairline)] shadow-sm ${className}`}>
      <div className="h-[2px] w-full bg-gradient-to-r from-[var(--accent-orange)] via-[var(--accent-purple)] to-[var(--accent-orange)]" />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 sm:p-6">
        {stats.statsStrip.map((stat, i) => (
          <div
            key={i}
            className="p-3 border-r border-[var(--border-hairline)] last:border-r-0 text-left rounded-[2px] transition-all duration-200 hover:-translate-y-1 hover:scale-[1.02] hover:bg-[var(--bg-page)]"
          >
            <div className="text-2xl sm:text-4xl font-bold font-mono text-[var(--accent-orange)] tracking-tight">
              {stat.value}
            </div>
            <div className="text-xs sm:text-sm font-semibold text-[var(--text-primary)] mt-1 font-head">
              {stat.label}
            </div>
            <div className="text-[11px] text-[var(--text-subtle)] font-mono mt-0.5 line-clamp-1">
              {stat.desc}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default LabStatsStrip
