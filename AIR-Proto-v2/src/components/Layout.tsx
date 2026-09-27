import { useState } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion'
import { Sun, Moon, Menu, X, ArrowUpRight, Cpu, Sparkles, Terminal, MapPin, Mail, Award, BookOpen, Users, FolderGit2, Camera, Handshake, UserCheck } from 'lucide-react'
import { useTheme } from './ThemeProvider'
import ThemeSwitcher from './ThemeSwitcher'
import CustomCursor from './CustomCursor'

export default function Layout() {
  const { isDark, toggleDark } = useTheme()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 })
  const location = useLocation()

  const navLinks = [
    { name: 'About', path: '/about', icon: Terminal },
    { name: 'Team', path: '/team', icon: Users },
    { name: 'Projects', path: '/projects', icon: FolderGit2 },
    { name: 'Publications', path: '/publications', icon: BookOpen },
    { name: 'Performers', path: '/performers', icon: Award },
    { name: 'Collaborations', path: '/collaborations', icon: Handshake },
    { name: 'Interns', path: '/interns', icon: UserCheck },
    { name: 'Gallery', path: '/gallery', icon: Camera },
  ]

  return (
    <div className="min-h-screen flex flex-col bg-[var(--bg)] text-[var(--fg)] transition-colors duration-300 relative selection:bg-[var(--primary)] selection:text-black">
      {/* Precision Custom Cursor */}
      <CustomCursor />

      {/* Floating Theme Switcher HUD */}
      <ThemeSwitcher />

      {/* Fluid Scroll Progress Line */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[var(--primary)] via-[var(--secondary)] to-[var(--accent)] z-[60] origin-left shadow-lg shadow-[var(--primary)]/50"
        style={{ scaleX }}
      />

      {/* Futuristic Telemetry Announcement Strip */}
      <div className="bg-[var(--bg-card)]/90 backdrop-blur-md text-[var(--fg)] text-xs font-mono py-2 px-4 text-center flex justify-center items-center gap-3 border-b border-[var(--border)] z-50">
        <span className="flex items-center gap-1.5 text-[var(--primary)] font-bold">
          <span className="w-2 h-2 rounded-full bg-[var(--primary)] animate-ping" />
          [AIR-TELEMETRY]
        </span>
        <span className="hidden sm:inline text-[var(--fg-sub)]">
          NED University AI Research Lab — Summer 2026 Fellowships Open
        </span>
        <Link
          to="/interns"
          className="text-[var(--primary)] hover:underline inline-flex items-center gap-1 font-bold transition-all ml-1"
        >
          View Opportunities <ArrowUpRight className="w-3 h-3" />
        </Link>
      </div>

      {/* Sticky Cyber-Glass Header */}
      <header className="sticky top-0 z-40 backdrop-blur-2xl bg-[var(--bg)]/85 border-b border-[var(--border)] transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
          {/* Logo & Lab Identifier */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[var(--primary)] to-[var(--secondary)] text-black font-mono font-black text-sm flex items-center justify-center shadow-lg shadow-[var(--primary)]/25 group-hover:scale-105 group-hover:rotate-3 transition-transform">
                AIR
              </div>
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-[var(--bg)] animate-pulse" />
            </div>
            <div className="flex flex-col leading-tight">
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-base tracking-tight font-head">AIR LAB</span>
                <span className="px-1.5 py-0.5 rounded text-[9px] font-mono font-bold bg-[var(--primary)]/15 text-[var(--primary)] border border-[var(--primary)]/30">
                  v2.0
                </span>
              </div>
              <span className="font-mono text-[10px] text-[var(--fg-sub)] tracking-wider uppercase">
                NED University
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 font-mono text-xs">
            {navLinks.map(link => {
              const isActive = location.pathname === link.path
              return (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={({ isActive }) =>
                    `relative px-3 py-2 rounded-lg transition-all duration-200 flex items-center gap-1.5 font-medium ${
                      isActive
                        ? 'text-[var(--primary)] font-bold'
                        : 'text-[var(--fg-sub)] hover:text-[var(--fg)] hover:bg-[var(--fg)]/5'
                    }`
                  }
                >
                  {link.name}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute bottom-0 left-2 right-2 h-[2px] bg-[var(--primary)] shadow-sm shadow-[var(--primary)]"
                    />
                  )}
                </NavLink>
              )
            })}
          </nav>

          {/* Action Tools */}
          <div className="flex items-center gap-3">
            {/* Quick Dark Mode Toggle */}
            <button
              onClick={toggleDark}
              className="p-2 rounded-xl border border-[var(--border)] bg-[var(--bg-card)] text-[var(--fg-sub)] hover:text-[var(--fg)] hover:border-[var(--primary)] transition-all cursor-pointer shadow-sm"
              title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Tech'}
              aria-label="Toggle dark mode"
            >
              {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-[var(--primary)]" />}
            </button>

            {/* Portal Link / CTA */}
            <Link
              to="/projects"
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[var(--primary)] text-black font-mono text-xs font-bold hover:shadow-lg hover:shadow-[var(--primary)]/30 hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              Explore R&D <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(prev => !prev)}
              className="lg:hidden p-2 rounded-xl border border-[var(--border)] bg-[var(--bg-card)] text-[var(--fg)] hover:border-[var(--primary)] transition-colors cursor-pointer"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className="lg:hidden border-b border-[var(--border)] bg-[var(--bg-card)]/95 backdrop-blur-2xl px-6 py-6 overflow-hidden"
            >
              <div className="grid grid-cols-2 gap-2">
                {navLinks.map(link => {
                  const Icon = link.icon
                  return (
                    <Link
                      key={link.path}
                      to={link.path}
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center gap-2.5 p-3 rounded-xl border border-[var(--border)] bg-[var(--bg)]/50 hover:border-[var(--primary)] text-sm font-mono transition-colors"
                    >
                      <Icon className="w-4 h-4 text-[var(--primary)]" />
                      <span>{link.name}</span>
                    </Link>
                  )
                })}
              </div>

              <div className="mt-5 pt-4 border-t border-[var(--border)] flex items-center justify-between">
                <span className="text-xs font-mono text-[var(--fg-sub)]">AI Research Laboratory</span>
                <Link
                  to="/projects"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-2 rounded-lg bg-[var(--primary)] text-black font-mono text-xs font-bold"
                >
                  Explore Projects
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Main Page Content Outlet */}
      <main className="flex-1 relative z-10">
        <Outlet />
      </main>

      {/* Futuristic Academic Laboratory Footer */}
      <footer className="border-t border-[var(--border)] bg-[var(--bg-card)]/95 backdrop-blur-2xl pt-16 pb-12 mt-20 relative z-20 overflow-hidden font-sans">
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-25 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[var(--border)]">
            {/* Lab Identity Column */}
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[var(--primary)] to-[var(--secondary)] text-black font-mono font-black text-sm flex items-center justify-center shadow-lg shadow-[var(--primary)]/20">
                  AIR
                </div>
                <div>
                  <h3 className="font-extrabold text-lg tracking-tight font-head">AIR Research Lab</h3>
                  <p className="text-xs font-mono text-[var(--fg-sub)]">NED University of Engineering & Technology</p>
                </div>
              </div>

              <p className="text-sm text-[var(--fg-sub)] leading-relaxed max-w-sm">
                Pioneering artificial intelligence, foundational language models, autonomous aerial robotics, and low-latency edge acceleration in Karachi, Pakistan.
              </p>

              <div className="space-y-1.5 text-xs font-mono text-[var(--fg-sub)]">
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-[var(--primary)] shrink-0" />
                  <span>Main University Road, Karachi 75270, Pakistan</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-[var(--primary)] shrink-0" />
                  <span>contact@airlab.neduet.edu.pk</span>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--fg)] mb-4 flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5 text-[var(--primary)]" />
                Navigation
              </h4>
              <ul className="space-y-2 text-sm text-[var(--fg-sub)]">
                <li><Link to="/about" className="hover:text-[var(--primary)] transition-colors">About the Lab</Link></li>
                <li><Link to="/team" className="hover:text-[var(--primary)] transition-colors">Research Team</Link></li>
                <li><Link to="/projects" className="hover:text-[var(--primary)] transition-colors">R&D Projects</Link></li>
                <li><Link to="/publications" className="hover:text-[var(--primary)] transition-colors">Publications</Link></li>
                <li><Link to="/gallery" className="hover:text-[var(--primary)] transition-colors">Lab Gallery</Link></li>
              </ul>
            </div>

            {/* Highlights */}
            <div>
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--fg)] mb-4 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[var(--primary)]" />
                Highlights
              </h4>
              <ul className="space-y-2 text-sm text-[var(--fg-sub)]">
                <li><Link to="/performers" className="hover:text-[var(--primary)] transition-colors">High Performers</Link></li>
                <li><Link to="/collaborations" className="hover:text-[var(--primary)] transition-colors">Global Partners</Link></li>
                <li><Link to="/interns" className="hover:text-[var(--primary)] transition-colors">Internship Alumni</Link></li>
                <li><a href="https://neduet.edu.pk" target="_blank" rel="noreferrer" className="hover:text-[var(--primary)] transition-colors inline-flex items-center gap-1">NED University <ArrowUpRight className="w-3 h-3" /></a></li>
              </ul>
            </div>

            {/* Live Operational Status */}
            <div>
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--fg)] mb-4 flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5 text-emerald-400" />
                Telemetry
              </h4>
              <div className="rounded-xl border border-[var(--border)] bg-[var(--bg)]/80 p-3.5 space-y-2 text-xs font-mono">
                <div className="flex items-center justify-between">
                  <span className="text-[var(--fg-sub)]">Lab Status:</span>
                  <span className="text-emerald-400 font-bold flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    ONLINE
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[var(--fg-sub)]">H100 Uptime:</span>
                  <span className="text-[var(--fg)] font-bold">99.8%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[var(--fg-sub)]">Active Nodes:</span>
                  <span className="text-[var(--primary)] font-bold">16 SXM5</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Copyright & Accreditation */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[var(--fg-sub)]">
            <p>© {new Date().getFullYear()} Artificial Intelligence Research Lab (AIR Lab), NED UET. All rights reserved.</p>
            <div className="flex items-center gap-4">
              <span className="hover:text-[var(--fg)] cursor-pointer">Privacy Policy</span>
              <span>•</span>
              <span className="hover:text-[var(--fg)] cursor-pointer">Research Ethics</span>
              <span>•</span>
              <span className="text-[var(--primary)] font-bold">Built for Excellence</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
