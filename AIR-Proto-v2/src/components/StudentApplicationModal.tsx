import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Sparkles, Send, CheckCircle2, GraduationCap, FileText, User, Mail, BookOpen } from 'lucide-react'

interface StudentApplicationModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function StudentApplicationModal({ isOpen, onClose }: StudentApplicationModalProps) {
  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    rollNo: '',
    department: 'Computer Science & IT',
    program: 'Undergraduate BS (3rd/4th Year)',
    track: 'Foundational LLMs & Urdu NLP',
    resumeUrl: '',
    statement: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  const handleReset = () => {
    setSubmitted(false)
    onClose()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop with Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-md transition-opacity"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="relative w-full max-w-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl shadow-2xl p-6 sm:p-8 z-10 overflow-hidden"
          >
            {/* Corner Decorative Subtle Glow */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />

            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            {submitted ? (
              <div className="text-center py-10 px-4">
                <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-500 mx-auto flex items-center justify-center mb-6">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold font-head text-[var(--fg)] mb-2">
                  Application Submitted!
                </h3>
                <p className="text-sm text-[var(--fg-sub)] max-w-md mx-auto mb-6">
                  Thank you for applying to the Artificial Intelligence Research Lab at NED University. Dr. Murk Marvi and the faculty review committee will review your application and contact you at <strong className="text-[var(--fg)]">{formData.email}</strong>.
                </p>
                <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 text-xs font-mono text-[var(--fg-sub)] text-left mb-6 max-w-md mx-auto space-y-1.5">
                  <div><strong>Applicant:</strong> {formData.name} ({formData.rollNo})</div>
                  <div><strong>Department:</strong> {formData.department}</div>
                  <div><strong>Research Track:</strong> {formData.track}</div>
                </div>
                <button
                  onClick={handleReset}
                  className="btn-craftly-primary px-8 py-3 rounded-full text-xs font-bold shadow-md cursor-pointer"
                >
                  Done
                </button>
              </div>
            ) : (
              <div>
                <div className="mb-6">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/10 text-rose-500 text-[11px] font-mono font-bold mb-2">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>FALL 2026 RESEARCH FELLOWSHIP ADMISSIONS</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold tracking-tight font-head text-[var(--fg)]">
                    Apply for Research Vacancy
                  </h2>
                  <p className="text-xs sm:text-sm text-[var(--fg-sub)] mt-1 font-sans">
                    Join NED University's premier AI Lab. Work directly with faculty on H100 GPU clusters, LLMs, computer vision, and robotics testbeds.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Full Name */}
                    <div>
                      <label className="block text-xs font-mono font-medium text-[var(--fg)] mb-1">
                        Full Name *
                      </label>
                      <div className="relative">
                        <User className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={e => setFormData({ ...formData, name: e.target.value })}
                          placeholder="e.g. Muhammad Ali"
                          className="w-full pl-9 pr-3 py-2 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-xs font-sans text-[var(--fg)] focus:outline-none focus:border-rose-500"
                        />
                      </div>
                    </div>

                    {/* Student Email */}
                    <div>
                      <label className="block text-xs font-mono font-medium text-[var(--fg)] mb-1">
                        NED Cloud Email *
                      </label>
                      <div className="relative">
                        <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={e => setFormData({ ...formData, email: e.target.value })}
                          placeholder="yourname@cloud.neduet.edu.pk"
                          className="w-full pl-9 pr-3 py-2 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-xs font-sans text-[var(--fg)] focus:outline-none focus:border-rose-500"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Roll Number */}
                    <div>
                      <label className="block text-xs font-mono font-medium text-[var(--fg)] mb-1">
                        Roll / Reg Number *
                      </label>
                      <div className="relative">
                        <GraduationCap className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
                        <input
                          type="text"
                          required
                          value={formData.rollNo}
                          onChange={e => setFormData({ ...formData, rollNo: e.target.value })}
                          placeholder="e.g. CS-2022045"
                          className="w-full pl-9 pr-3 py-2 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-xs font-sans text-[var(--fg)] focus:outline-none focus:border-rose-500"
                        />
                      </div>
                    </div>

                    {/* Program / Level */}
                    <div>
                      <label className="block text-xs font-mono font-medium text-[var(--fg)] mb-1">
                        Academic Program
                      </label>
                      <select
                        value={formData.program}
                        onChange={e => setFormData({ ...formData, program: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-xs font-sans text-[var(--fg)] focus:outline-none focus:border-rose-500"
                      >
                        <option value="Undergraduate BS (3rd/4th Year)">Undergraduate BS (3rd / 4th Year)</option>
                        <option value="Undergraduate BS (1st/2nd Year)">Undergraduate BS (1st / 2nd Year)</option>
                        <option value="Postgraduate MS Candidate">Postgraduate MS Candidate</option>
                        <option value="Doctoral PhD Scholar">Doctoral PhD Scholar</option>
                      </select>
                    </div>
                  </div>

                  {/* Research Track of Interest */}
                  <div>
                    <label className="block text-xs font-mono font-medium text-[var(--fg)] mb-1">
                      Primary Research Track of Interest *
                    </label>
                    <div className="relative">
                      <BookOpen className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
                      <select
                        value={formData.track}
                        onChange={e => setFormData({ ...formData, track: e.target.value })}
                        className="w-full pl-9 pr-3 py-2 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-xs font-sans text-[var(--fg)] focus:outline-none focus:border-rose-500"
                      >
                        <option value="Foundational LLMs & Urdu NLP">Foundational LLMs & Urdu NLP</option>
                        <option value="Edge AI & Low-Power Embedded Vision">Edge AI & Low-Power Embedded Vision</option>
                        <option value="Autonomous Robotics & Aerial SLAM">Autonomous Robotics & Aerial SLAM</option>
                        <option value="AI Safety, Interpretability & Alignment">AI Safety, Interpretability & Alignment</option>
                        <option value="Healthcare & Clinical Multimodal AI">Healthcare & Clinical Multimodal AI</option>
                      </select>
                    </div>
                  </div>

                  {/* Resume / Portfolio Link */}
                  <div>
                    <label className="block text-xs font-mono font-medium text-[var(--fg)] mb-1">
                      Resume / GitHub / Portfolio Link *
                    </label>
                    <div className="relative">
                      <FileText className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
                      <input
                        type="url"
                        required
                        value={formData.resumeUrl}
                        onChange={e => setFormData({ ...formData, resumeUrl: e.target.value })}
                        placeholder="https://github.com/... or Google Drive link"
                        className="w-full pl-9 pr-3 py-2 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-xs font-sans text-[var(--fg)] focus:outline-none focus:border-rose-500"
                      />
                    </div>
                  </div>

                  {/* Brief Statement */}
                  <div>
                    <label className="block text-xs font-mono font-medium text-[var(--fg)] mb-1">
                      Brief Statement of Interest / Past Projects
                    </label>
                    <textarea
                      rows={3}
                      value={formData.statement}
                      onChange={e => setFormData({ ...formData, statement: e.target.value })}
                      placeholder="Briefly highlight your technical background, PyTorch/TensorFlow experience, or relevant coursework..."
                      className="w-full p-3 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-xs font-sans text-[var(--fg)] focus:outline-none focus:border-rose-500"
                    />
                  </div>

                  <div className="pt-2 flex items-center justify-end gap-3">
                    <button
                      type="button"
                      onClick={onClose}
                      className="btn-craftly-secondary px-5 py-2.5 rounded-full text-xs font-medium cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="btn-craftly-primary px-7 py-2.5 rounded-full text-xs font-bold flex items-center gap-2 shadow-md cursor-pointer"
                    >
                      <span>Submit Application</span>
                      <Send className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </form>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
