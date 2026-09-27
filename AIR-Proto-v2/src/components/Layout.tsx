import { useState } from 'react'
import { Link, NavLink, Outlet } from 'react-router-dom'
import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion'
import { Sun, Moon, Menu, X, ArrowRight, ArrowUpRight, Terminal, MapPin, Mail, Award, BookOpen, Users, FolderGit2, Camera, Handshake, UserCheck } from 'lucide-react'
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

      {/* Clean Top Announcement Banner (Ali's Mintlify style) */}
      <div className="w-full bg-[var(--primary)] text-black text-xs md:text-sm font-semibold py-2 px-4 text-center flex items-center justify-center gap-2 z-50">
        <span className="px-2 py-0.5 rounded-full text-[10px] bg-black/15 text-black font-bold uppercase tracking-wider">
          NEW
        </span>
        <span>Applications for Summer 2026 Research Internships are now open.</span>
        <Link
          to="/interns"
          className="underline inline-flex items-center gap-1 font-bold ml-1 hover:opacity-80"
        >
          Apply Now <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Sticky Modern Navbar */}
      <header className="sticky top-0 z-40 backdrop-blur-md bg-[var(--bg)]/90 border-b border-[var(--border)] transition-all duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Logo & Lab Identifier */}
          <Link to="/" className="text-xl font-bold tracking-tight flex items-center gap-2.5 font-head group">
            <div className="w-7 h-7 rounded-md bg-[var(--primary)] text-black flex items-center justify-center font-bold text-xs shadow-sm group-hover:scale-105 transition-transform">
              A
            </div>
            <span className="font-extrabold text-base tracking-tight">AIR Lab</span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[var(--primary)]/15 text-[var(--primary)] font-bold border border-[var(--primary)]/20">
              v2.0
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-1 font-mono text-xs">
            {navLinks.map(link => (
              <NavLink
                  key={link.path}
                  to={link.path}
                  className={({ isActive }) =>
                    `relative px-3 py-1.5 rounded-md transition-all duration-150 font-medium ${
                      isActive
                        ? 'text-[var(--primary)] font-bold bg-[var(--primary)]/10'
                        : 'text-[var(--fg-sub)] hover:text-[var(--fg)] hover:bg-[var(--bg-muted)]'
                    }`
                  }
                >
                  {link.name}
                </NavLink>
            ))}
          </nav>

          {/* Action Tools */}
          <div className="flex items-center gap-3">
            {/* Dark / Light Toggle */}
            <button
              onClick={toggleDark}
              className="p-2 rounded-full border border-[var(--border)] bg-[var(--bg-card)] text-[var(--fg-sub)] hover:text-[var(--fg)] hover:border-[var(--primary)] transition-all cursor-pointer shadow-sm"
              title={isDark ? 'Switch to Mint Light' : 'Switch to Mint Dark'}
              aria-label="Toggle dark mode"
            >
              {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-[var(--primary)]" />}
            </button>

            {/* Join the Lab CTA Button (Ali's style) */}
            <Link
              to="/interns"
              className="hidden sm:inline-flex items-center gap-1.5 px-5 py-2 rounded-full bg-[var(--primary)] text-black font-mono text-xs font-bold hover:shadow-md hover:scale-105 active:scale-95 transition-all"
            >
              Join the Lab <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(prev => !prev)}
              className="xl:hidden p-2 rounded-lg border border-[var(--border)] bg-[var(--bg-card)] text-[var(--fg)] hover:border-[var(--primary)] transition-colors cursor-pointer"
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
