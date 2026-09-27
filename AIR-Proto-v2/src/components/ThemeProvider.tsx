import React, { createContext, useContext, useEffect, useState } from 'react'

export type ThemePalette = 
  | 'default'         // Mint Tech (Ali's signature Mintlify aesthetic — emerald & teal on clean paper/obsidian)
  | 'theme-cobalt'    // Frontier Cobalt (Deep tech electric cobalt & sky cyan)
  | 'theme-titanium'  // Titanium Slate (Ultra-clean academic slate & monochrome)
  | 'theme-ned'       // NED Heritage (Academic gold & deep emerald)

export interface ThemeOption {
  id: ThemePalette
  name: string
  accent: string
  subAccent: string
  bgPreview: string
  description: string
}

export const THEME_OPTIONS: ThemeOption[] = [
  {
    id: 'default',
    name: 'Mint Light / Tech',
    accent: '#10B981',
    subAccent: '#06B6D4',
    bgPreview: '#FAFAFA',
    description: "Ali's signature Mintlify tech palette: crisp emerald accent on clean light paper & dark mode"
  },
  {
    id: 'theme-cobalt',
    name: 'Frontier Cobalt',
    accent: '#2563EB',
    subAccent: '#38BDF8',
    bgPreview: '#F8FAFC',
    description: 'Deep cobalt blue & electric sky inspired by frontier AI research labs'
  },
  {
    id: 'theme-titanium',
    name: 'Titanium Slate',
    accent: '#475569',
    subAccent: '#94A3B8',
    bgPreview: '#FFFFFF',
    description: 'Ultra-clean high-contrast monochrome engineering lab aesthetic'
  },
  {
    id: 'theme-ned',
    name: 'NED Heritage',
    accent: '#059669',
    subAccent: '#D97706',
    bgPreview: '#F5FAF7',
    description: 'Official NED University prestige emerald and academic gold'
  }
]

interface ThemeContextType {
  palette: ThemePalette
  setPalette: (palette: ThemePalette) => void
  isDark: boolean
  toggleDark: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Versioning localStorage to ensure fresh revamp defaults to Mint Light (Ali's aesthetic)
  const [palette, setPaletteState] = useState<ThemePalette>(() => {
    const version = localStorage.getItem('air_theme_revamp_v3')
    if (!version) {
      localStorage.setItem('air_theme_revamp_v3', '3.0')
      localStorage.removeItem('air_theme_palette')
      localStorage.removeItem('air_theme_mode')
      return 'default'
    }
    const saved = localStorage.getItem('air_theme_palette') as ThemePalette
    const valid = THEME_OPTIONS.some(o => o.id === saved)
    return valid ? saved : 'default'
  })

  // Default to FALSE (Mint Light) like Ali's site, but user can freely toggle dark mode
  const [isDark, setIsDark] = useState<boolean>(() => {
    const saved = localStorage.getItem('air_theme_mode')
    if (saved !== null) return saved === 'dark'
    return false // Mint Light default!
  })

  useEffect(() => {
    const root = document.documentElement

    // Remove all previous theme classes
    THEME_OPTIONS.forEach(opt => {
      if (opt.id !== 'default') {
        root.classList.remove(opt.id)
      }
    })

    if (palette !== 'default') {
      root.classList.add(palette)
    }

    if (isDark) {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }

    localStorage.setItem('air_theme_palette', palette)
    localStorage.setItem('air_theme_mode', isDark ? 'dark' : 'light')
  }, [palette, isDark])

  const setPalette = (newPalette: ThemePalette) => {
    setPaletteState(newPalette)
  }

  const toggleDark = () => {
    setIsDark(prev => !prev)
  }

  return (
    <ThemeContext.Provider value={{ palette, setPalette, isDark, toggleDark }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider')
  return ctx
}
