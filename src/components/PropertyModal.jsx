import { useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'

const PropertyModal = ({ property, onClose }) => {
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape') onClose()
    }

    if (!property) {
      document.body.style.overflow = 'auto'
      return undefined
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleEscape)

    return () => {
      document.body.style.overflow = previousOverflow || 'auto'
      window.removeEventListener('keydown', handleEscape)
    }
  }, [property, onClose])

  if (!property) return null

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[999] flex items-center justify-center overflow-y-auto bg-slate-950/95 px-4 py-4 backdrop-blur-xl sm:px-6 sm:py-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="relative my-4 w-full max-w-6xl max-h-[90vh] overflow-y-auto rounded-[32px] bg-slate-950 shadow-2xl shadow-black/50"
          initial={{ y: 28, opacity: 0, scale: 0.98 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 20, opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.25 }}
          onClick={(event) => event.stopPropagation()}
          role="dialog"
          aria-modal="true"
          aria-labelledby="property-modal-title"
        >
          <div className="sticky top-4 z-20 mb-4 flex justify-end px-4 pt-4 sm:px-6">
            <button
              type="button"
              onClick={onClose}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-slate-900/90 text-slate-200 transition hover:bg-slate-800"
              aria-label="Close property details"
            >
              <X size={20} />
            </button>
          </div>

          <div className="grid gap-8 px-4 pb-6 sm:px-6 lg:grid-cols-[0.95fr_0.7fr] lg:px-8 lg:pb-8">
            <div className="space-y-6">
              <div className="rounded-[32px] border border-white/10 bg-slate-900/85 p-6">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <p className="text-sm uppercase tracking-[0.35em] text-[color:var(--brand)]/90">Property overview</p>
                    <h2 id="property-modal-title" className="mt-3 text-3xl font-semibold text-white">{property.title}</h2>
                    <p className="mt-2 text-sm text-slate-400">{property.city} · {property.status}</p>
                  </div>
                  <div className="rounded-full bg-[color:var(--brand)]/10 px-4 py-2 text-sm font-semibold text-[color:var(--brand)]">
                    {property.price}
                  </div>
                </div>
                <p className="mt-5 text-slate-300">{property.overview}</p>
                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-3xl bg-slate-950/80 p-5 text-slate-200">
                    <p className="text-xs uppercase tracking-[0.28em] text-slate-500">Floor size</p>
                    <p className="mt-3 text-xl font-semibold text-white">{property.size}</p>
                  </div>
                  <div className="rounded-3xl bg-slate-950/80 p-5 text-slate-200">
                    <p className="text-xs uppercase tracking-[0.28em] text-slate-500">Bedrooms / Bathrooms</p>
                    <p className="mt-3 text-xl font-semibold text-white">{property.beds} / {property.baths}</p>
                  </div>
                </div>
              </div>

              <div className="grid gap-4">
                {['Living Room', 'Kitchen', 'Bedroom'].map((section) => {
                  const roomKey = section.toLowerCase().split(' ')[0]
                  return (
                    <div key={section} className="rounded-[32px] border border-white/10 bg-slate-950/85 p-6">
                      <p className="text-sm uppercase tracking-[0.28em] text-[color:var(--brand)]/80">{section}</p>
                      <div className="mt-4 grid gap-4 sm:grid-cols-2">
                        {property.rooms[roomKey].map((src, idx) => (
                          <img key={idx} src={src} alt={`${property.title} ${section} ${idx + 1}`} className="h-44 w-full rounded-3xl object-cover" />
                        ))}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            <aside className="space-y-6 rounded-[32px] border border-white/10 bg-slate-900/85 p-6 shadow-2xl shadow-slate-950/30">
              <div className="space-y-4">
                <p className="text-sm uppercase tracking-[0.28em] text-[color:var(--brand)]/90">Amenities</p>
                <ul className="grid gap-3 text-sm text-slate-300 sm:grid-cols-2">
                  {property.amenities.map((amenity) => (
                    <li key={amenity} className="rounded-3xl border border-white/10 bg-slate-950/80 px-4 py-3">{amenity}</li>
                  ))}
                </ul>
              </div>
              <div className="rounded-[28px] bg-[color:var(--brand)]/10 p-5 text-slate-100">
                <p className="text-sm uppercase tracking-[0.28em] text-[color:var(--brand)]">Book inspection</p>
                <p className="mt-3 text-base leading-7 text-slate-200">Schedule a private walkthrough with our team and receive the full investment dossier.</p>
              </div>
              <a
                href="#contact"
                onClick={onClose}
                className="inline-flex w-full items-center justify-center rounded-full bg-[color:var(--brand)] px-5 py-4 text-sm font-semibold uppercase tracking-[0.22em] text-[color:var(--brand-contrast)] transition hover:bg-[color:var(--brand)]/90"
              >
                Book Inspection
              </a>
            </aside>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export default PropertyModal
