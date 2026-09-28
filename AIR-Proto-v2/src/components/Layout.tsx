import { useState } from 'react'
import { Link, NavLink, Outlet } from 'react-router-dom'
import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion'
import { Sun, Moon, Menu, X, ArrowUpRight, Terminal, MapPin, Mail, Award, BookOpen, Users, FolderGit2, Camera, Handshake, UserCheck } from 'lucide-react'
import { useTheme } from './ThemeProvider'
import ThemeSwitcher from './ThemeSwitcher'

export default function Layout() {
  const { isDark, toggleDark } = useTheme()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 })

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
    <div className="min-h-screen flex flex-col bg-[var(--bg)] text-[var(--fg)] transition-colors duration-300 relative selection:bg-[var(--primary)] selection:text-black font-sans">
      {/* Background Subtle Matrix Grid */}
      <div className="fixed inset-0 bg-grid-pattern opacity-35 pointer-events-none -z-10" />

      {/* Floating Theme Switcher */}
      <ThemeSwitcher />

      {/* Fluid Scroll Progress Line */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2.5px] bg-[var(--primary)] z-[60] origin-left shadow-sm"
        style={{ scaleX }}
      />

      {/* Top Banner (Clean SaaS Announcement) */}
      <div className="w-full bg-[var(--bg-muted)] border-b border-[var(--border)] text-xs font-medium py-2.5 px-4 text-center flex items-center justify-center gap-2 z-50 text-[var(--fg-sub)]">
        <span className="px-2 py-0.5 rounded-full text-[10px] bg-black/5 dark:bg-white/10 font-bold uppercase tracking-wider text-[var(--fg)]">
          FELLOWSHIP
        </span>
        <span>Summer & Fall 2026 Research Fellowship applications are now open.</span>
        <Link
          to="/interns"
          className="inline-flex items-center gap-1 font-bold text-[var(--fg)] hover:underline ml-1"
        >
          Apply Now <ArrowUpRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Sticky Modern Navbar */}
      <header className="sticky top-0 z-40 backdrop-blur-xl bg-[var(--bg)]/85 border-b border-[var(--border)] transition-all duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
          {/* Logo & Lab Identifier */}
          <Link to="/" className="flex items-center gap-3 group">
            <div 
              className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-black text-sm shadow-md group-hover:scale-105 transition-all"
              style={{ background: 'var(--accent-gradient, #F43F5E)' }}
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-base tracking-tight text-[var(--fg)] font-head flex items-center gap-1">
                AIR<span className="text-transparent bg-clip-text" style={{ backgroundImage: 'var(--accent-gradient)' }}>Lab</span>
              </span>
              <span className="text-[10px] text-[var(--fg-sub)] tracking-wider uppercase font-mono -mt-0.5">
                NED University
              </span>
            </div>
          </Link>

          {/* Center Pill Capsule Navigation Bar */}
          <nav className="hidden lg:flex items-center bg-[var(--bg-card)]/80 border border-[var(--border)] rounded-full p-1 shadow-xs backdrop-blur-md">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-150 ${
                  isActive
                    ? 'bg-[var(--bg-muted)] text-[var(--fg)] shadow-xs font-semibold'
                    : 'text-[var(--fg-sub)] hover:text-[var(--fg)] hover:bg-[var(--bg-muted)]/50'
                }`
              }
            >
              Home
            </NavLink>
            {navLinks.map(link => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-150 ${
                    isActive
                      ? 'bg-[var(--bg-muted)] text-[var(--fg)] shadow-xs font-semibold'
                      : 'text-[var(--fg-sub)] hover:text-[var(--fg)] hover:bg-[var(--bg-muted)]/50'
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </nav>

          {/* Action Tools */}
          <div className="flex items-center gap-2.5">
            {/* Dark / Light Toggle */}
            <button
              onClick={toggleDark}
              className="p-2 rounded-full border border-[var(--border)] bg-[var(--bg-card)] text-[var(--fg-sub)] hover:text-[var(--fg)] hover:border-[var(--fg)]/30 transition-all cursor-pointer shadow-xs"
              title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              aria-label="Toggle theme mode"
            >
              {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-zinc-700" />}
            </button>

            {/* Primary Pill Button (Inspiration style) */}
            <Link
              to="/interns"
              className="hidden sm:inline-flex items-center justify-center px-5 py-2 rounded-full bg-[var(--primary)] text-[var(--primary-fg)] font-semibold text-xs hover:opacity-90 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-sm"
            >
              Get in touch
            </Link>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(prev => !prev)}
              className="lg:hidden p-2 rounded-lg border border-[var(--border)] bg-[var(--bg-card)] text-[var(--fg)] hover:border-[var(--fg)]/40 transition-colors cursor-pointer"
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
              transition={{ duration: 0.2 }}
              className="xl:hidden border-b border-[var(--border)] bg-[var(--bg-card)] px-6 py-6 overflow-hidden"
            >
              <div className="grid grid-cols-2 gap-2">
                {navLinks.map(link => {
                  const Icon = link.icon
                  return (
                    <Link
                      key={link.path}
                      to={link.path}
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center gap-2 p-3 rounded-lg border border-[var(--border)] bg-[var(--bg)] hover:border-[var(--primary)] text-xs font-mono transition-colors"
                    >
                      <Icon className="w-4 h-4 text-[var(--primary)]" />
                      <span>{link.name}</span>
                    </Link>
                  )
                })}
              </div>

              <div className="mt-4 pt-4 border-t border-[var(--border)] flex items-center justify-between">
                <span className="text-xs font-mono text-[var(--fg-sub)]">AI Research Laboratory</span>
                <Link
                  to="/interns"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-2 rounded-full bg-[var(--primary)] text-black font-mono text-xs font-bold"
                >
                  Join the Lab
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Main Content */}
      <main className="flex-1 relative z-10">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="border-t border-[var(--border)] bg-[var(--bg-card)] pt-16 pb-12 mt-20 relative z-20 font-sans">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[var(--border)]">
            {/* Lab Identity */}
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-md bg-[var(--primary)] text-black flex items-center justify-center font-bold text-xs shadow-sm font-head">
                  A
                </div>
                <span className="font-extrabold text-base tracking-tight font-head">AIR LAB</span>
              </div>
              <p className="text-xs text-[var(--fg-sub)] leading-relaxed max-w-sm">
                The Artificial Intelligence Research Laboratory at NED University of Engineering & Technology. Advancing foundational models, real-time computer vision, and autonomous robotics.
              </p>
              <div className="pt-2 text-xs font-mono text-[var(--fg-sub)] space-y-1">
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-[var(--primary)]" />
                  <span>NED University Main Campus, Karachi 75270</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-[var(--primary)]" />
                  <span>contact@airlab.neduet.edu.pk</span>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h5 className="font-mono text-xs font-bold uppercase tracking-wider mb-4 text-[var(--fg)]">Research</h5>
              <ul className="space-y-2 text-xs font-mono text-[var(--fg-sub)]">
                <li><Link to="/projects" className="hover:text-[var(--primary)] transition-colors">Projects Catalog</Link></li>
                <li><Link to="/publications" className="hover:text-[var(--primary)] transition-colors">Publications</Link></li>
                <li><Link to="/collaborations" className="hover:text-[var(--primary)] transition-colors">Alliances</Link></li>
                <li><Link to="/gallery" className="hover:text-[var(--primary)] transition-colors">Lab Gallery</Link></li>
              </ul>
            </div>

            <div>
              <h5 className="font-mono text-xs font-bold uppercase tracking-wider mb-4 text-[var(--fg)]">People</h5>
              <ul className="space-y-2 text-xs font-mono text-[var(--fg-sub)]">
                <li><Link to="/team" className="hover:text-[var(--primary)] transition-colors">Faculty & Scholars</Link></li>
                <li><Link to="/performers" className="hover:text-[var(--primary)] transition-colors">Hall of Fame</Link></li>
                <li><Link to="/interns" className="hover:text-[var(--primary)] transition-colors">Interns & Alumni</Link></li>
                <li><Link to="/about" className="hover:text-[var(--primary)] transition-colors">Lab Heritage</Link></li>
              </ul>
            </div>

            <div>
              <h5 className="font-mono text-xs font-bold uppercase tracking-wider mb-4 text-[var(--fg)]">Prototypes</h5>
              <ul className="space-y-2 text-xs font-mono text-[var(--fg-sub)]">
                <li><Link to="/" className="text-[var(--primary)] font-bold">Prototype v2 (Active)</Link></li>
                <li><a href="./proto-master/" className="hover:text-[var(--primary)] transition-colors">Ali's Prototype</a></li>
              </ul>
            </div>
          </div>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-[var(--fg-sub)] gap-4">
            <div>
              &copy; {new Date().getFullYear()} Artificial Intelligence Research Lab &bull; NED University
            </div>
            <div className="flex items-center gap-4">
              <span>National Sovereignty</span>
              <span>&bull;</span>
              <span>Computational Excellence</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
