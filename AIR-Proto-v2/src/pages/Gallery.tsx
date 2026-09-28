import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Camera, X, Maximize2 } from 'lucide-react'
import TiltCard from '../components/TiltCard'
import galleryData from '../data/gallery.json'
import { useScrollCraft } from '../hooks/useScrollCraft'

export default function Gallery() {
  const [activeCat, setActiveCat] = useState('All')
  const [selectedImage, setSelectedImage] = useState<typeof galleryData[0] | null>(null)
  const sc = useScrollCraft()

  useEffect(() => {
    const t = setTimeout(() => {
      sc.reveal('[data-sc="gallery-tile"]', {
        direction: 'up',
        distance: '32px',
        duration: 650,
        ease: 'quartOut',
        threshold: 0.05,
        once: false,
      })
    }, 60)
    return () => clearTimeout(t)
  }, [activeCat, sc])

  useEffect(() => {
    sc.reveal('[data-sc="gallery-heading"]', {
      direction: 'up',
      distance: '24px',
      duration: 600,
      ease: 'cubicOut',
    })
  }, [sc])

  const categories = ['All', 'Infrastructure', 'Robotics', 'Events', 'Hardware', 'Hackathons', 'Delegations']

  const filtered = galleryData.filter(g => {
    if (activeCat === 'All') return true
    return g.cat === activeCat
  })

  return (
    <div className="min-h-screen pt-28 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
      {/* Subtle tech grid background */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none -z-10" />

      {/* Header */}
      <div className="mb-12" data-sc="gallery-heading">
        <span className="font-mono text-xs uppercase tracking-widest text-[var(--primary)] font-bold bg-[var(--primary)]/10 px-3.5 py-1.5 rounded-full border border-[var(--primary)]/20 inline-flex items-center gap-1.5 mb-4">
          <Camera className="w-3.5 h-3.5" /> [MEDIA, SIGHTS & LAB LIFE]
        </span>
        <h1 className="text-4xl sm:text-6xl font-black tracking-tight font-head">
          Laboratory Gallery & Media
        </h1>
        <p className="mt-3 text-lg text-[var(--fg-sub)] max-w-2xl font-sans">
          Visual documentation of supercomputer commissioning, outdoor drone flight trials, hardware prototyping, and hackathons.
        </p>
      </div>

      {/* Category Filter Chips */}
      <div className="flex flex-wrap gap-2 mb-12 border-b border-[var(--border)] pb-6" data-sc="gallery-heading">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCat(cat)}
            className={`px-4 py-2 rounded-xl font-mono text-xs font-bold transition-all cursor-pointer ${
              activeCat === cat
                ? 'btn-craftly-primary shadow-md'
                : 'btn-craftly-secondary'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Masonry Grid with 3D Tilt & Dormant Image Color Pop */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeCat}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.25 }}
          className="grid grid-cols-1 md:grid-cols-3 auto-rows-[260px] gap-6"
        >
          {filtered.map((item, i) => (
            <div
              key={item.id}
              className={`${item.span} h-full`}
            >
              <TiltCard tiltMaxAngleX={6} tiltMaxAngleY={6} scale={1.02} className="h-full">
                <div
                  data-sc="gallery-tile"
                  onClick={() => setSelectedImage(item)}
                  className="h-full relative rounded-2xl overflow-hidden border border-[var(--border)] bg-black/60 cursor-pointer group shadow-lg"
                  style={{ transitionDelay: `${i * 60}ms` }}
                >
                  {/* DORMANT IMAGE: Black & White dormant, pops with vivid color on hover! */}
                  <img
                    src={item.url}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />

                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />

                  {/* Tile details */}
                  <div className="absolute inset-0 p-6 flex flex-col justify-between text-white z-10 pointer-events-none">
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-1 rounded text-[10px] font-mono font-bold bg-white/90 text-black border border-white/20 backdrop-blur-md">
                        {item.cat}
                      </span>
                      <span className="p-2 rounded-lg bg-black/60 text-white border border-white/20 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Maximize2 className="w-3.5 h-3.5" />
                      </span>
                    </div>

                    <div>
                      <span className="text-[11px] font-mono text-[var(--primary)] font-bold mb-1 block">
                        {item.date}
                      </span>
                      <h3 className="text-lg font-bold font-head leading-snug group-hover:text-[var(--primary)] transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-xs text-white/70 line-clamp-2 mt-1 font-sans">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </div>
              </TiltCard>
            </div>
          ))}
        </motion.div>
      </AnimatePresence>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="max-w-4xl w-full bg-[var(--bg-card)] rounded-2xl border border-[var(--border)] overflow-hidden shadow-2xl relative"
              onClick={e => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/70 text-white hover:bg-black transition-colors"
                aria-label="Close image preview"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="relative h-96 w-full bg-black">
                {/* Inside modal, show in full vivid color without dormant filter */}
                <img
                  src={selectedImage.url}
                  alt={selectedImage.title}
                  className="w-full h-full object-cover no-dormant"
                  style={{ filter: 'none' }}
                />
              </div>

              <div className="p-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold bg-white/90 text-black border border-white/20 backdrop-blur-md">
                    {selectedImage.cat}
                  </span>
                  <span className="text-xs font-mono text-[var(--fg-sub)]">{selectedImage.date}</span>
                </div>
                <h3 className="text-2xl font-bold font-head mb-2">{selectedImage.title}</h3>
                <p className="text-sm text-[var(--fg-sub)] font-sans leading-relaxed">{selectedImage.desc}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
