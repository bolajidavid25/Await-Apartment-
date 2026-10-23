import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, ChevronUp, Sparkles, Compass } from 'lucide-react'
import { Link } from 'react-router-dom'
import properties from '../data/properties'
import PropertyCard from './PropertyCard'
import PropertyModal from './PropertyModal'

const INITIAL_COUNT = 4
const STEP_COUNT = 6

const Projects = () => {
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT)
  const [selectedProperty, setSelectedProperty] = useState(null)

  const visibleProperties = properties.slice(0, visibleCount)
  const hasMore = visibleCount < properties.length

  const handleLoadMore = () => {
    setVisibleCount((prev) => Math.min(prev + STEP_COUNT, properties.length))
  }

  const handleShowLess = () => {
    setVisibleCount(INITIAL_COUNT)
    const el = document.getElementById('projects')
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section id="projects" className="relative bg-slate-950 py-24 sm:py-32">
      {/* Subtle background ambient glow */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-slate-900/40 to-transparent" />
      <div className="pointer-events-none absolute right-1/4 top-1/3 h-96 w-96 rounded-full bg-[color:var(--brand)]/5 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[color:var(--brand)]/30 bg-[color:var(--brand)]/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.26em] text-[color:var(--brand)] backdrop-blur-md">
            <Sparkles size={13} />
            <span>Featured Showcase</span>
          </div>

          <h2 className="mt-4 font-serif text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Curated Luxury Residences
          </h2>

          <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-400 sm:text-lg">
            A thoughtfully assembled collection of architectural coastal estates, modern pavilions,
            and private sanctuaries tailored for discerning lifestyle and enduring value.
          </p>
        </div>

        {/* Clean Property Cards Grid */}
        <motion.div
          layout
          className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 sm:gap-8"
        >
          <AnimatePresence mode="popLayout">
            {visibleProperties.map((property) => (
              <motion.div
                key={property.id}
                layout
                initial={{ opacity: 0, y: 28, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              >
                <PropertyCard
                  property={property}
                  onClick={() => setSelectedProperty(property)}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* View More / Show Less Controls */}
        <div className="mt-14 flex flex-col items-center justify-center gap-4">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">
            Showing {visibleProperties.length} of {properties.length} curated estates
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            {hasMore ? (
              <motion.button
                type="button"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleLoadMore}
                className="group inline-flex items-center gap-2.5 rounded-full border border-white/20 bg-slate-900/90 px-8 py-3.5 text-xs font-bold uppercase tracking-[0.22em] text-white shadow-xl backdrop-blur-md transition-all duration-300 hover:border-[color:var(--brand)] hover:bg-[color:var(--brand)] hover:text-[color:var(--brand-contrast)]"
              >
                <span>View More Properties</span>
                <ChevronDown size={16} className="transition-transform duration-300 group-hover:translate-y-0.5" />
              </motion.button>
            ) : (
              <motion.button
                type="button"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleShowLess}
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-slate-900/90 px-7 py-3 text-xs font-semibold uppercase tracking-[0.22em] text-slate-300 shadow-xl backdrop-blur-md transition hover:border-white/40 hover:text-white"
              >
                <span>Show Less</span>
                <ChevronUp size={16} />
              </motion.button>
            )}

            <Link
              to="/properties"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 py-3.5 text-xs font-semibold uppercase tracking-[0.22em] text-slate-300 backdrop-blur-md transition-all duration-300 hover:border-white/30 hover:bg-white/10 hover:text-white"
            >
              <Compass size={14} className="text-[color:var(--brand)]" />
              <span>Full Catalog</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Responsive Property Details Modal with Room Split */}
      <PropertyModal
        property={selectedProperty}
        onClose={() => setSelectedProperty(null)}
      />
    </section>
  )
}

export default Projects
