import { useEffect } from 'react'
import { Camera, Sparkles } from 'lucide-react'
import { useScrollCraft } from '../hooks/useScrollCraft'

const GALLERY = [
  { id: 1, title: 'AI & Autonomous Robotics Lab Work', cat: 'Research', url: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&q=80', span: 'md:col-span-2 md:row-span-2' },
  { id: 2, title: 'Interdisciplinary Team Collaboration', cat: 'Teamwork', url: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=600&q=80', span: 'md:col-span-1 md:row-span-1' },
  { id: 3, title: 'National Conference Presentation', cat: 'Events', url: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=600&q=80', span: 'md:col-span-2 md:row-span-2' },
  { id: 4, title: 'Computer Vision Concept', cat: 'Innovation', url: 'https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=600&q=80', span: 'md:col-span-1 md:row-span-1' },
  { id: 5, title: 'Deep Learning Development', cat: 'Coding', url: 'https://images.unsplash.com/photo-1559028012-481c04fa702d?w=600&q=80', span: 'md:col-span-1 md:row-span-1' },
  { id: 6, title: 'Embedded Hardware Workstation', cat: 'Hardware', url: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=600&q=80', span: 'md:col-span-1 md:row-span-1' },
  { id: 7, title: 'High-Performance Compute Cluster', cat: 'Infrastructure', url: 'https://images.unsplash.com/photo-1488229297570-58520851e868?w=600&q=80', span: 'md:col-span-2 md:row-span-2' },
  { id: 8, title: 'Autonomous Drone Testing', cat: 'Robotics', url: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=600&q=80', span: 'md:col-span-1 md:row-span-1' },
]

export default function Gallery() {
  const sc = useScrollCraft()

  useEffect(() => {
    // Page heading
    sc.reveal('[data-sc="gallery-heading"]', {
      direction: 'up', distance: '24px', duration: 600, ease: 'cubicOut',
    })
    // Each gallery tile zooms up — staggered via CSS transitionDelay
    sc.reveal('[data-sc="gallery-tile"]', {
      direction: 'up',
      distance: '40px',
      duration: 700,
      ease: 'quartOut',
      threshold: 0.06,
    })
  }, [sc])

  return (
    <div className="min-h-screen pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="mb-14" data-sc="gallery-heading">
        <span className="font-mono text-xs uppercase tracking-widest text-[#1A6BFF] font-bold bg-[#1A6BFF]/10 px-3.5 py-1.5 rounded-full border border-[#1A6BFF]/20 inline-flex items-center gap-1.5 mb-4">
          <Camera className="w-3.5 h-3.5" /> [LIFE AT AIR LAB]
        </span>
        <h1 className="text-4xl sm:text-5xl font-black tracking-tight" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>Lab Moments & Media</h1>
        <p className="mt-3 text-lg text-[var(--fg-sub)] max-w-2xl">A glimpse into our research environment, workshops, hardware prototyping, and scientific events.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 auto-rows-[220px] gap-5">
        {GALLERY.map((item, i) => (
          <div
            key={item.id}
            data-sc="gallery-tile"
            className={`group relative rounded-2xl overflow-hidden shadow-md border border-[var(--border)] cursor-pointer ${item.span}`}
            style={{ transitionDelay: `${i * 60}ms` }}
          >
            <img
              src={item.url}
              alt={item.title}
              className="w-full h-full object-cover group-hover:scale-105 group-hover:rotate-1 transition-all duration-500"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-80 group-hover:opacity-95 transition-opacity duration-300" />
            <div className="absolute inset-0 p-6 flex flex-col justify-end text-white">
              <span className="font-mono text-xs uppercase tracking-wider text-[#FFAB00] font-bold mb-1 flex items-center gap-1">
                <Sparkles className="w-3 h-3" /> {item.cat}
              </span>
              <h3 className="text-lg font-black leading-snug group-hover:text-[#1A6BFF] transition-colors" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                {item.title}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
