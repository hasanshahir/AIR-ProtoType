import { useState } from 'react'
import { Link, NavLink, Outlet } from 'react-router-dom'
import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion'
import { Sun, Moon, Menu, X, Terminal, MapPin, Mail, Award, BookOpen, Users, FolderGit2, Camera, Handshake, UserCheck, ExternalLink } from 'lucide-react'
import { useTheme } from './ThemeProvider'
import ThemeSwitcher from './ThemeSwitcher'
import AirLabLogo from './AirLabLogo'

export default function Layout() {
  const { isDark, toggleDark } = useTheme()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 })

  // Primary Architecture Links from Ali's Prototype & NEDUET Portal
  const primaryLinks = [
    { name: 'About', path: '/about', icon: Terminal },
    { name: 'Team', path: '/team', icon: Users },
    { name: 'Projects', path: '/projects', icon: FolderGit2 },
    { name: 'Publications', path: '/publications', icon: BookOpen },
    { name: 'Gallery', path: '/gallery', icon: Camera },
  ]

  const secondaryLinks = [
    { name: 'Performers', path: '/performers', icon: Award },
    { name: 'Collaborations', path: '/collaborations', icon: Handshake },
    { name: 'Interns', path: '/interns', icon: UserCheck },
  ]

  const allLinks = [...primaryLinks, ...secondaryLinks]

  return (
    <div className="min-h-screen flex flex-col bg-[var(--bg)] text-[var(--fg)] transition-colors duration-300 relative selection:bg-rose-500 selection:text-white font-sans">
      {/* Background Subtle Matrix Grid */}
      <div className="fixed inset-0 bg-grid-pattern opacity-35 pointer-events-none -z-10" />

      {/* Floating Theme Switcher */}
      <ThemeSwitcher />

      {/* Fluid Scroll Progress Line */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2.5px] bg-rose-500 z-[60] origin-left shadow-sm"
        style={{ scaleX }}
      />

      {/* Top Banner (Clean SaaS Announcement with Official Portal Link) */}
      <div className="w-full bg-[var(--bg-muted)] border-b border-[var(--border)] text-xs font-medium py-2 px-4 text-center flex items-center justify-center gap-2 z-50 text-[var(--fg-sub)]">
        <span className="px-2 py-0.5 rounded-full text-[10px] bg-black/5 dark:bg-white/10 font-bold uppercase tracking-wider text-[var(--fg)]">
          NEDUET CSIT
        </span>
        <span>Artificial Intelligence Research Lab • Department of Computer Science & IT</span>
        <a
          href="https://cct.neduet.edu.pk/AIR"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1 font-bold text-[var(--fg)] hover:underline ml-1"
        >
          Official Portal <ExternalLink className="w-3 h-3" />
        </a>
      </div>

      {/* Sticky Modern Navbar */}
      <header className="sticky top-0 z-40 backdrop-blur-xl bg-[var(--bg)]/90 border-b border-[var(--border)] transition-all duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
          {/* Official AIR Lab Monogram & Branding */}
          <Link to="/" className="flex items-center gap-3 group py-1">
            <AirLabLogo height={42} />
          </Link>

          {/* Center Pill Capsule Navigation Bar (Ali's Architecture + Craftly Pill) */}
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
            {primaryLinks.map(link => (
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
            <div className="h-3.5 w-px bg-[var(--border)] mx-1" />
            {secondaryLinks.map(link => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `px-2.5 py-1.5 rounded-full text-xs font-medium transition-all duration-150 ${
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
              className="p-2 rounded-full border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-200 hover:border-zinc-400 dark:hover:border-zinc-600 transition-all cursor-pointer shadow-xs"
              title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              aria-label="Toggle theme mode"
            >
              {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-zinc-700" />}
            </button>

            {/* Primary Pill Button (High contrast in Light & Dark mode) */}
            <Link
              to="/interns"
              className="btn-craftly-primary hidden sm:inline-flex items-center justify-center px-5 py-2 rounded-full font-medium text-xs cursor-pointer"
            >
              Join the Lab
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
                {allLinks.map(link => {
                  const Icon = link.icon
                  return (
                    <Link
                      key={link.path}
                      to={link.path}
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center gap-2 p-3 rounded-lg border border-[var(--border)] bg-[var(--bg)] hover:border-[var(--primary)] text-xs font-mono transition-colors"
                    >
                      <Icon className="w-4 h-4 text-rose-500" />
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
                  className="btn-craftly-primary px-4 py-2 rounded-full font-mono text-xs font-bold"
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
              <Link to="/" className="inline-block py-1">
                <AirLabLogo height={46} />
              </Link>
              <p className="text-xs text-[var(--fg-sub)] leading-relaxed max-w-sm">
                The Artificial Intelligence Research Laboratory, Department of Computer Science & Information Technology (CSIT), NED University of Engineering & Technology. Advancing foundation models, edge perception, and robotics.
              </p>
              <div className="pt-2 text-xs font-mono text-[var(--fg-sub)] space-y-1">
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-rose-500" />
                  <span>NED University Main Campus, Karachi 75270</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-rose-500" />
                  <span>contact@airlab.neduet.edu.pk</span>
                </div>
                <div className="flex items-center gap-2 pt-1">
                  <ExternalLink className="w-3.5 h-3.5 text-rose-500" />
                  <a href="https://cct.neduet.edu.pk/AIR" target="_blank" rel="noreferrer" className="hover:underline text-[var(--fg)] font-medium">
                    cct.neduet.edu.pk/AIR
                  </a>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h5 className="font-mono text-xs font-bold uppercase tracking-wider mb-4 text-[var(--fg)]">Research</h5>
              <ul className="space-y-2 text-xs font-mono text-[var(--fg-sub)]">
                <li><Link to="/projects" className="hover:text-rose-500 transition-colors">Projects Catalog</Link></li>
                <li><Link to="/publications" className="hover:text-rose-500 transition-colors">Publications</Link></li>
                <li><Link to="/collaborations" className="hover:text-rose-500 transition-colors">Industry Alliances</Link></li>
                <li><Link to="/gallery" className="hover:text-rose-500 transition-colors">Lab Gallery</Link></li>
              </ul>
            </div>

            <div>
              <h5 className="font-mono text-xs font-bold uppercase tracking-wider mb-4 text-[var(--fg)]">People</h5>
              <ul className="space-y-2 text-xs font-mono text-[var(--fg-sub)]">
                <li><Link to="/team" className="hover:text-rose-500 transition-colors">Faculty & Scholars</Link></li>
                <li><Link to="/performers" className="hover:text-rose-500 transition-colors">Performers of the Month</Link></li>
                <li><Link to="/interns" className="hover:text-rose-500 transition-colors">Research Interns & Alumni</Link></li>
                <li><Link to="/about" className="hover:text-rose-500 transition-colors">About Us</Link></li>
              </ul>
            </div>

            <div>
              <h5 className="font-mono text-xs font-bold uppercase tracking-wider mb-4 text-[var(--fg)]">Prototypes</h5>
              <ul className="space-y-2 text-xs font-mono text-[var(--fg-sub)]">
                <li><Link to="/" className="text-rose-500 font-bold">Prototype v2 (Active)</Link></li>
                <li><a href="./proto-master/" className="hover:text-rose-500 transition-colors">Ali's Prototype</a></li>
                <li><a href="https://cct.neduet.edu.pk/AIR" target="_blank" rel="noreferrer" className="hover:text-rose-500 transition-colors">Official Portal ↗</a></li>
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
