import { useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { X, Heart, Share2, MapPin, BedDouble, Bath, Ruler } from 'lucide-react'

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

  const photos = property.photos || []

  const exteriorImage =
    property.image || photos[0] || null

  const formatPrice = (price) => {
    if (!price) return 'Price unavailable'

    return `$${Number(price).toLocaleString()}`
  }

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[999] flex items-center justify-center overflow-y-auto bg-slate-950/95 px-3 py-3 backdrop-blur-xl sm:px-6 sm:py-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >

        <motion.div
          className="relative my-3 w-full max-w-6xl overflow-hidden rounded-[30px] bg-slate-950 shadow-2xl shadow-black/60 sm:my-6 sm:rounded-[36px]"
          initial={{
            y: 30,
            opacity: 0,
            scale: 0.98,
          }}
          animate={{
            y: 0,
            opacity: 1,
            scale: 1,
          }}
          exit={{
            y: 20,
            opacity: 0,
            scale: 0.98,
          }}
          transition={{
            duration: 0.25,
          }}
          onClick={(event) => event.stopPropagation()}
          role="dialog"
          aria-modal="true"
          aria-labelledby="property-modal-title"
        >

          {/* =====================================================
              HERO IMAGE
          ====================================================== */}

          <div className="relative h-[55vh] min-h-[420px] max-h-[650px] overflow-hidden">

            {exteriorImage ? (
              <img
                src={exteriorImage}
                alt={
                  property.address?.full ||
                  'Property exterior'
                }
                className="h-full w-full object-cover"
                onError={(event) => {
                  event.currentTarget.style.display = 'none'
                }}
              />
            ) : (
              <div className="flex h-full items-center justify-center bg-slate-900">
                <span className="text-sm text-slate-500">
                  Property image unavailable
                </span>
              </div>
            )}

            {/* Image gradient */}

            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />

            {/* Top controls */}

            <div className="absolute left-4 right-4 top-4 flex items-center justify-between sm:left-6 sm:right-6 sm:top-6">

              <div className="rounded-full border border-white/15 bg-black/30 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white backdrop-blur-md">
                {property.status || 'Property'}
              </div>

              <div className="flex items-center gap-2">

                <button
                  type="button"
                  aria-label="Save property"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-black/30 text-white backdrop-blur-md transition hover:bg-white/15"
                >
                  <Heart size={18} />
                </button>

                <button
                  type="button"
                  aria-label="Share property"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-black/30 text-white backdrop-blur-md transition hover:bg-white/15"
                >
                  <Share2 size={18} />
                </button>

                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close property"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-black/30 text-white backdrop-blur-md transition hover:bg-white/15"
                >
                  <X size={19} />
                </button>

              </div>
            </div>

            {/* Hero information */}

            <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-8 lg:p-10">

              <div className="max-w-3xl">

                <p className="mb-3 text-sm font-semibold uppercase tracking-[0.28em] text-[color:var(--brand)]">
                  {property.propertyType || 'Residential Property'}
                </p>

                <h2
                  id="property-modal-title"
                  className="text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl"
                >
                  {formatPrice(property.price)}
                </h2>

                <div className="mt-4 flex items-start gap-2 text-sm text-slate-200 sm:text-base">
                  <MapPin
                    size={19}
                    className="mt-0.5 shrink-0 text-[color:var(--brand)]"
                  />

                  <span>
                    {property.address?.full ||
                      'Address unavailable'}
                  </span>
                </div>

              </div>
            </div>
          </div>

          {/* =====================================================
              PROPERTY STATS
          ====================================================== */}

          <div className="grid grid-cols-3 border-b border-white/10 bg-slate-900/80">

            <div className="flex flex-col items-center justify-center gap-2 border-r border-white/10 px-3 py-5 text-center sm:flex-row sm:gap-3 sm:py-6">

              <BedDouble
                size={21}
                className="text-[color:var(--brand)]"
              />

              <div>
                <p className="text-lg font-semibold text-white">
                  {property.bedrooms ?? '—'}
                </p>

                <p className="text-[10px] uppercase tracking-[0.18em] text-slate-500 sm:text-xs">
                  Bedrooms
                </p>
              </div>

            </div>

            <div className="flex flex-col items-center justify-center gap-2 border-r border-white/10 px-3 py-5 text-center sm:flex-row sm:gap-3 sm:py-6">

              <Bath
                size={21}
                className="text-[color:var(--brand)]"
              />

              <div>
                <p className="text-lg font-semibold text-white">
                  {property.bathrooms ?? '—'}
                </p>

                <p className="text-[10px] uppercase tracking-[0.18em] text-slate-500 sm:text-xs">
                  Bathrooms
                </p>
              </div>

            </div>

            <div className="flex flex-col items-center justify-center gap-2 px-3 py-5 text-center sm:flex-row sm:gap-3 sm:py-6">

              <Ruler
                size={21}
                className="text-[color:var(--brand)]"
              />

              <div>
                <p className="text-lg font-semibold text-white">
                  {property.squareFeet
                    ? property.squareFeet.toLocaleString()
                    : '—'}
                </p>

                <p className="text-[10px] uppercase tracking-[0.18em] text-slate-500 sm:text-xs">
                  Sq Ft
                </p>
              </div>

            </div>

          </div>

          {/* =====================================================
              CONTENT
          ====================================================== */}

          <div className="grid gap-8 px-4 py-6 sm:px-6 sm:py-8 lg:grid-cols-[1fr_340px] lg:px-8">

            {/* Main content */}

            <div className="space-y-8">

              {/* Overview */}

              <section>

                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[color:var(--brand)]">
                  Property Overview
                </p>

                <h3 className="mt-3 text-2xl font-semibold text-white">
                  About this property
                </h3>

                <p className="mt-4 max-w-3xl leading-7 text-slate-400">
                  A{' '}
                  {property.propertyType?.toLowerCase() ||
                    'residential property'}{' '}
                  located in{' '}
                  {property.address?.city || 'Florida'},{' '}
                  {property.address?.state || 'FL'}.
                  This property offers{' '}
                  {property.bedrooms ?? '—'} bedrooms,
                  {' '}
                  {property.bathrooms ?? '—'} bathrooms and
                  approximately{' '}
                  {property.squareFeet
                    ? `${property.squareFeet.toLocaleString()} square feet`
                    : 'an undisclosed floor area'}.
                </p>

              </section>

              {/* Property details */}

              <section>

                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[color:var(--brand)]">
                  Property Details
                </p>

                <div className="mt-4 grid gap-3 sm:grid-cols-2">

                  <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-5">
                    <p className="text-xs uppercase tracking-[0.18em] text-slate-500">
                      Year Built
                    </p>

                    <p className="mt-2 text-lg font-semibold text-white">
                      {property.yearBuilt || '—'}
                    </p>
                  </div>

                  <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-5">
                    <p className="text-xs uppercase tracking-[0.18em] text-slate-500">
                      Days on Market
                    </p>

                    <p className="mt-2 text-lg font-semibold text-white">
                      {property.daysOnMarket ?? '—'}
                    </p>
                  </div>

                  <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-5">
                    <p className="text-xs uppercase tracking-[0.18em] text-slate-500">
                      Listing Type
                    </p>

                    <p className="mt-2 text-lg font-semibold text-white">
                      {property.listingType || '—'}
                    </p>
                  </div>

                  <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-5">
                    <p className="text-xs uppercase tracking-[0.18em] text-slate-500">
                      Status
                    </p>

                    <p className="mt-2 text-lg font-semibold text-white">
                      {property.status || '—'}
                    </p>
                  </div>

                </div>

              </section>

            </div>

            {/* CTA */}

            <aside className="lg:sticky lg:top-6 lg:self-start">

              <div className="rounded-[28px] border border-white/10 bg-slate-900/80 p-6">

                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[color:var(--brand)]">
                  Interested?
                </p>

                <h3 className="mt-3 text-2xl font-semibold text-white">
                  See this property in person.
                </h3>

                <p className="mt-3 text-sm leading-6 text-slate-400">
                  Schedule a private inspection with the
                  Await Apartment team.
                </p>

                <a
                  href="#contact"
                  onClick={onClose}
                  className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-[color:var(--brand)] px-5 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-[color:var(--brand-contrast)] transition hover:opacity-90"
                >
                  Book Inspection
                </a>

              </div>

            </aside>

          </div>

        </motion.div>

      </motion.div>
    </AnimatePresence>
  )
}

export default PropertyModal