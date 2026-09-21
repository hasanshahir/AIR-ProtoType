import { useEffect } from 'react'
import { BookOpen, Rss, ExternalLink, Calendar, User } from 'lucide-react'
import publicationsData from '../data/publications.json'
import blogsData from '../data/blogs.json'
import { useScrollCraft } from '../hooks/useScrollCraft'

const TAG_COLORS: Record<string, string> = {
  Engineering: 'bg-[#1A6BFF]/10 text-[#1A6BFF] border-[#1A6BFF]/30',
  Research: 'bg-[#FF4D4F]/10 text-[#FF4D4F] border-[#FF4D4F]/30',
  Tutorial: 'bg-[#FFAB00]/10 text-[#FFAB00] border-[#FFAB00]/30',
}

export default function Publications() {
  const sc = useScrollCraft()

  useEffect(() => {
    // Page header
    sc.reveal('[data-sc="pub-heading"]', {
      direction: 'up', distance: '24px', duration: 600, ease: 'cubicOut',
    })
    // Publication rows slide in from left
    sc.reveal('[data-sc="pub-row"]', {
      direction: 'left',
      distance: '32px',
      duration: 550,
      ease: 'cubicOut',
      threshold: 0.08,
    })
    // Blog cards slide in from right
    sc.reveal('[data-sc="blog-card"]', {
      direction: 'right',
      distance: '32px',
      duration: 550,
      ease: 'cubicOut',
      threshold: 0.08,
    })
  }, [sc])

  return (
    <div className="min-h-screen pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="mb-14" data-sc="pub-heading">
        <span className="font-mono text-xs uppercase tracking-widest text-[#1A6BFF] font-bold bg-[#1A6BFF]/10 px-3.5 py-1.5 rounded-full border border-[#1A6BFF]/20 inline-block mb-4">
          [DISSEMINATION & KNOWLEDGE]
        </span>
        <h1 className="text-4xl sm:text-5xl font-black tracking-tight" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
          Publications & Lab Articles
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Publications */}
        <div className="lg:col-span-7 space-y-6">
          <div className="flex items-center gap-3 pb-4 border-b border-[var(--border)]" data-sc="pub-heading">
            <div className="p-2.5 rounded-xl bg-[#1A6BFF]/10 text-[#1A6BFF]"><BookOpen className="w-6 h-6" /></div>
            <div>
              <h2 className="text-2xl font-bold" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>Research Papers</h2>
              <p className="text-xs font-mono text-[var(--fg-sub)]">Peer-reviewed conference & journal publications</p>
            </div>
          </div>
          <div className="divide-y divide-[var(--border)]">
            {publicationsData.map((pub, i) => (
              <div
                key={pub.id}
                data-sc="pub-row"
                className="py-6 first:pt-2 group"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div className="flex items-center gap-3 font-mono text-xs mb-2">
                  <span className="px-2.5 py-0.5 rounded bg-[var(--fg-sub)]/10 font-bold text-[var(--fg-sub)]">{pub.year}</span>
                  <span className="px-2.5 py-0.5 rounded-full font-bold bg-[#FF4D4F]/10 text-[#FF4D4F] border border-[#FF4D4F]/20">{pub.venue}</span>
                </div>
                <a href={pub.link || '#'} target={pub.link !== '#' ? '_blank' : undefined} rel="noreferrer" className="block group-hover:text-[#1A6BFF] transition-colors">
                  <h3 className="text-lg font-bold leading-snug flex items-start justify-between gap-4" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                    <span>{pub.title}</span>
                    <ExternalLink className="w-4 h-4 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity mt-1 text-[#1A6BFF]" />
                  </h3>
                </a>
                <p className="mt-2 text-sm text-[var(--fg-sub)]">{pub.authors}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Blog */}
        <div className="lg:col-span-5 space-y-6">
          <div className="flex items-center gap-3 pb-4 border-b border-[var(--border)]" data-sc="pub-heading">
            <div className="p-2.5 rounded-xl bg-[#FF4D4F]/10 text-[#FF4D4F]"><Rss className="w-6 h-6" /></div>
            <div>
              <h2 className="text-2xl font-bold" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>Lab Blog</h2>
              <p className="text-xs font-mono text-[var(--fg-sub)]">Technical breakdowns & tutorials</p>
            </div>
          </div>
          <div className="space-y-6">
            {blogsData.map((blog, i) => (
              <div
                key={blog.id}
                data-sc="blog-card"
                className="p-6 rounded-2xl bg-[var(--bg)] border border-[var(--border)] hover:border-[#FF4D4F]/40 hover:-translate-y-1 transition-all duration-300 shadow-sm"
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className={`px-2.5 py-0.5 rounded-md text-xs font-mono font-bold border ${TAG_COLORS[blog.tag] ?? 'bg-purple-500/10 text-purple-400 border-purple-500/30'}`}>
                    {blog.tag}
                  </span>
                  <div className="flex items-center gap-1.5 font-mono text-xs text-[var(--fg-sub)]">
                    <Calendar className="w-3.5 h-3.5" /> {blog.date}
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-2 hover:text-[#1A6BFF] transition-colors cursor-pointer" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>{blog.title}</h3>
                <p className="text-sm text-[var(--fg-sub)] leading-relaxed line-clamp-3 mb-4">{blog.excerpt}</p>
                <div className="pt-3 border-t border-[var(--border)] flex items-center justify-between text-xs font-mono text-[var(--fg-sub)]">
                  <div className="flex items-center gap-1.5"><User className="w-3.5 h-3.5 text-[#1A6BFF]" /> {blog.author}</div>
                  <span className="text-[#1A6BFF] font-bold hover:underline cursor-pointer">Read Article →</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
