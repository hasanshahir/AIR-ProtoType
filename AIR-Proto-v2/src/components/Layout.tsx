import { useState } from 'react'
import { Link, NavLink, Outlet } from 'react-router-dom'
import { motion, useScroll, useSpring } from 'framer-motion'
import { Sun, Moon, Menu, X, ArrowUpRight, Globe } from 'lucide-react'
import { useTheme } from './ThemeProvider'

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  )
}

function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  )
}

function TwitterIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
      <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
    </svg>
  )
}

export default function Layout() {
  const { theme, toggleTheme } = useTheme()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 })

  const navLinks = [
    { name: 'About', path: '/about' },
    { name: 'Team', path: '/team' },
    { name: 'Projects', path: '/projects' },
    { name: 'Publications', path: '/publications' },
    { name: 'Gallery', path: '/gallery' },
  ]

  return (
    <div className="min-h-screen flex flex-col bg-[var(--bg)] text-[var(--fg)] transition-colors duration-300">
      {/* Scroll Progress — gradient fire bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#1A6BFF] via-[#7C3AED] to-[#FF4D4F] z-[60] origin-left"
        style={{ scaleX }}
      />

      {/* Announcement Banner */}
      <div className="bg-[#080808] text-white text-xs font-mono py-2 px-4 text-center flex justify-center items-center gap-2 border-b border-white/10">
        <span className="text-[#FF4D4F] animate-pulse">⚡</span>
        <span>Applications for Summer 2026 Research Internships now open</span>
        <Link to="/team" className="underline hover:text-[#1A6BFF] transition-colors ml-1 inline-flex items-center gap-0.5">
          Apply Now <ArrowUpRight className="w-3 h-3" />
        </Link>
      </div>

      {/* Sticky Glassmorphism Navbar */}
      <header className="sticky top-0 z-40 backdrop-blur-xl bg-[var(--bg)]/85 border-b border-[var(--border)] transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-[#1A6BFF] text-white font-mono font-black text-sm flex items-center justify-center rounded-lg shadow-lg shadow-[#1A6BFF]/30 group-hover:scale-105 transition-transform">
              AIR
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-black text-sm tracking-tight">AIR LAB</span>
              <span className="font-mono text-[9px] text-[var(--fg-sub)] tracking-widest uppercase">NED University</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium">
            {navLinks.map(link => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `transition-colors hover:text-[#1A6BFF] ${isActive ? 'text-[#1A6BFF] font-semibold' : 'text-[var(--fg-sub)]'}`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="p-2 rounded-full border border-[var(--border)] hover:bg-[var(--bg-muted)] transition-colors"
            >
              {theme === 'dark'
                ? <Sun className="w-4 h-4 text-[#FFAB00]" />
                : <Moon className="w-4 h-4 text-[#1A6BFF]" />
              }
            </button>
            <Link
              to="/team"
              className="bg-[#1A6BFF] hover:bg-[#1A6BFF]/90 text-white px-4 py-2 rounded-full font-semibold text-xs uppercase tracking-wide transition-all shadow-md shadow-[#1A6BFF]/20 hover:shadow-lg hover:shadow-[#1A6BFF]/30"
            >
              Apply Now
            </Link>
          </div>

          {/* Mobile Controls */}
          <div className="flex md:hidden items-center gap-2">
            <button onClick={toggleTheme} className="p-2 rounded-full border border-[var(--border)]">
              {theme === 'dark' ? <Sun className="w-4 h-4 text-[#FFAB00]" /> : <Moon className="w-4 h-4 text-[#1A6BFF]" />}
            </button>
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2 text-[var(--fg)]">
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden border-t border-[var(--border)] bg-[var(--bg)] px-6 py-5 flex flex-col gap-4"
          >
            {navLinks.map(link => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-medium hover:text-[#1A6BFF] transition-colors"
              >
                {link.name}
              </Link>
            ))}
            <Link
              to="/team"
              onClick={() => setMobileMenuOpen(false)}
              className="mt-2 text-center bg-[#1A6BFF] text-white py-3 rounded-xl font-semibold text-sm"
            >
              Apply Now
            </Link>
          </motion.div>
        )}
      </header>

      {/* Page Content */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="border-t border-[var(--border)] bg-[var(--bg-muted)] pt-16 pb-8 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 pb-12 border-b border-[var(--border)]">
            {/* Brand */}
            <div className="md:col-span-1 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-[#1A6BFF] text-white font-mono font-black text-xs flex items-center justify-center rounded-lg">AIR</div>
                <span className="font-black text-sm tracking-tight">AIR LAB</span>
              </div>
              <p className="text-xs text-[var(--fg-sub)] leading-relaxed">
                Artificial Intelligence Research Lab at NED University of Engineering & Technology. Pioneering AI since 2021.
              </p>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 font-mono text-[11px] text-emerald-500">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                All systems operational
              </div>
            </div>

            {/* Navigation */}
            <div>
              <h4 className="font-mono text-[10px] uppercase tracking-widest text-[var(--fg-sub)] mb-4">Navigation</h4>
              <ul className="space-y-2 text-sm text-[var(--fg-sub)]">
                <li><Link to="/about" className="hover:text-[#1A6BFF] transition-colors">About Us</Link></li>
                <li><Link to="/team" className="hover:text-[#1A6BFF] transition-colors">Research Team</Link></li>
                <li><Link to="/projects" className="hover:text-[#1A6BFF] transition-colors">Active Projects</Link></li>
                <li><Link to="/publications" className="hover:text-[#1A6BFF] transition-colors">Publications</Link></li>
                <li><Link to="/gallery" className="hover:text-[#1A6BFF] transition-colors">Gallery</Link></li>
              </ul>
            </div>

            {/* Research */}
            <div>
              <h4 className="font-mono text-[10px] uppercase tracking-widest text-[var(--fg-sub)] mb-4">Research Areas</h4>
              <ul className="space-y-2 text-sm text-[var(--fg-sub)]">
                <li className="hover:text-[#FF4D4F] transition-colors cursor-pointer">Large Language Models</li>
                <li className="hover:text-[#FF4D4F] transition-colors cursor-pointer">Computer Vision</li>
                <li className="hover:text-[#FF4D4F] transition-colors cursor-pointer">Edge & Embedded AI</li>
                <li className="hover:text-[#FF4D4F] transition-colors cursor-pointer">Autonomous Systems</li>
                <li className="hover:text-[#FF4D4F] transition-colors cursor-pointer">Medical AI</li>
              </ul>
            </div>

            {/* Connect */}
            <div>
              <h4 className="font-mono text-[10px] uppercase tracking-widest text-[var(--fg-sub)] mb-4">Connect</h4>
              <p className="text-xs text-[var(--fg-sub)] mb-5 leading-relaxed">
                Department of Computer & Information Systems Engineering, NED University, Karachi.
              </p>
              <div className="flex items-center gap-2 text-[var(--fg-sub)]">
                {[
                  { icon: Globe, href: 'https://neduet.edu.pk' },
                  { icon: TwitterIcon, href: '#' },
                  { icon: GithubIcon, href: '#' },
                  { icon: LinkedinIcon, href: '#' },
                ].map(({ icon: Icon, href }, i) => (
                  <a
                    key={i}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 rounded-lg border border-[var(--border)] hover:text-[#1A6BFF] hover:border-[#1A6BFF]/40 transition-colors"
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-mono text-[var(--fg-sub)]">
            <p>© {new Date().getFullYear()} AIR Lab · NED University of Engineering & Technology · Karachi, Pakistan.</p>
            <p>Built with Electric Blue & Stanford Simplicity</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
