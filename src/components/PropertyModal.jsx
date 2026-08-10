import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { X } from 'lucide-react'

const PropertyModal = ({ property, onClose }) => {
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        onClose()
      }
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

  const exteriorImage = property.image || photos[0] || null
  const livingRoomImage = photos[1] || null
  const kitchenImage = photos[2] || null
  const bedroomImage = photos[3] || null

  const rooms = [
    {
      name: 'Exterior',
      image: exteriorImage,
    },
    {
      name: 'Living Room',
      image: livingRoomImage,
    },
    {
      name: 'Kitchen',
      image: kitchenImage,
    },
    {
      name: 'Bedroom',
      image: bedroomImage,
    },
  ]

  return (
    <motion.div
      className="fixed inset-0 z-[999] flex items-center justify-center overflow-y-auto bg-slate-950/95 px-4 py-4 backdrop-blur-xl sm:px-6 sm:py-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="relative my-4 max-h-[90vh] w-full max-w-6xl overflow-y-auto rounded-[32px] bg-slate-950 shadow-2xl shadow-black/50"
        initial={{ y: 28, opacity: 0, scale: 0.98 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 20, opacity: 0, scale: 0.98 }}
        transition={{ duration: 0.25 }}
        onClick={(event) => event.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="property-modal-title"
      >
        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close property details"
          className="absolute right-5 top-5 z-20 flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-slate-950/80 text-slate-300 backdrop-blur transition hover:bg-slate-800 hover:text-white"
        >
          <X size={20} />
        </button>

        {/* Property content */}
        <div className="grid gap-8 px-4 pb-6 pt-4 sm:px-6 lg:grid-cols-[0.95fr_0.7fr] lg:px-8 lg:pb-8 lg:pt-6">
          {/* Main content */}
          <div className="space-y-6">
            {/* Property overview */}
            <div className="rounded-[32px] border border-white/10 bg-slate-900/85 p-6">
              <div className="flex flex-wrap items-start justify-between gap-4 pr-10">
                <div>
                  <p className="text-sm uppercase tracking-[0.35em] text-[color:var(--brand)]/90">
                    Property overview
                  </p>

                  <h2
                    id="property-modal-title"
                    className="mt-3 text-3xl font-semibold text-white"
                  >
                    {property.address?.full || 'Property'}
                  </h2>

                  <p className="mt-2 text-sm text-slate-400">
                    {property.address?.city || '—'} ·{' '}
                    {property.status || '—'}
                  </p>
                </div>

                <div className="rounded-full bg-[color:var(--brand)]/10 px-4 py-2 text-sm font-semibold text-[color:var(--brand)]">
                  {property.price
                    ? `$${property.price.toLocaleString()}`
                    : 'Price unavailable'}
                </div>
              </div>

              {/* Description */}
              <p className="mt-5 leading-7 text-slate-300">
                A{' '}
                {property.propertyType?.toLowerCase() ||
                  'residential property'}{' '}
                located in {property.address?.city || '—'},{' '}
                {property.address?.state || '—'}. This property offers{' '}
                {property.bedrooms ?? '—'} bedrooms,{' '}
                {property.bathrooms ?? '—'} bathrooms and approximately{' '}
                {property.squareFeet
                  ? `${property.squareFeet.toLocaleString()} square feet`
                  : 'an undisclosed floor area'}
                .
              </p>

              {/* Property stats */}
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <div className="rounded-3xl bg-slate-950/80 p-5 text-slate-200">
                  <p className="text-xs uppercase tracking-[0.28em] text-slate-500">
                    Floor size
                  </p>

                  <p className="mt-3 text-xl font-semibold text-white">
                    {property.squareFeet
                      ? `${property.squareFeet.toLocaleString()} sqft`
                      : '—'}
                  </p>
                </div>

                <div className="rounded-3xl bg-slate-950/80 p-5 text-slate-200">
                  <p className="text-xs uppercase tracking-[0.28em] text-slate-500">
                    Bedrooms / Bathrooms
                  </p>

                  <p className="mt-3 text-xl font-semibold text-white">
                    {property.bedrooms ?? '—'} /{' '}
                    {property.bathrooms ?? '—'}
                  </p>
                </div>
              </div>
            </div>

            {/* Property images */}
            <div className="grid gap-4">
              {rooms.map((room) => (
                <div
                  key={room.name}
                  className="rounded-[32px] border border-white/10 bg-slate-950/85 p-6"
                >
                  <p className="text-sm uppercase tracking-[0.28em] text-[color:var(--brand)]/80">
                    {room.name}
                  </p>

                  <div className="mt-4 overflow-hidden rounded-3xl">
                    {room.image ? (
                      <img
                        src={room.image}
                        alt={`${property.address?.full || 'Property'} ${room.name}`}
                        className="h-72 w-full object-cover transition duration-500 hover:scale-[1.02]"
                      />
                    ) : (
                      <div className="flex h-72 items-center justify-center bg-slate-900">
                        <span className="text-sm text-slate-500">
                          Image unavailable
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <aside className="h-fit space-y-6 rounded-[32px] border border-white/10 bg-slate-900/85 p-6 shadow-2xl shadow-slate-950/30">
            {/* Property details */}
            <div className="space-y-4">
              <p className="text-sm uppercase tracking-[0.28em] text-[color:var(--brand)]/90">
                Property Details
              </p>

              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
                {/* Year Built */}
                <div className="rounded-3xl border border-white/10 bg-slate-950/80 px-4 py-3">
                  <span className="text-sm text-slate-500">
                    Year Built
                  </span>

                  <p className="mt-1 font-semibold text-white">
                    {property.yearBuilt || '—'}
                  </p>
                </div>

                {/* Property Type */}
                <div className="rounded-3xl border border-white/10 bg-slate-950/80 px-4 py-3">
                  <span className="text-sm text-slate-500">
                    Property Type
                  </span>

                  <p className="mt-1 font-semibold text-white">
                    {property.propertyType || '—'}
                  </p>
                </div>

                {/* Status */}
                <div className="rounded-3xl border border-white/10 bg-slate-950/80 px-4 py-3">
                  <span className="text-sm text-slate-500">
                    Status
                  </span>

                  <p className="mt-1 font-semibold text-white">
                    {property.status || '—'}
                  </p>
                </div>

                {/* Listing Type */}
                <div className="rounded-3xl border border-white/10 bg-slate-950/80 px-4 py-3">
                  <span className="text-sm text-slate-500">
                    Listing Type
                  </span>

                  <p className="mt-1 font-semibold text-white">
                    {property.listingType || '—'}
                  </p>
                </div>

                {/* Days on Market */}
                <div className="rounded-3xl border border-white/10 bg-slate-950/80 px-4 py-3">
                  <span className="text-sm text-slate-500">
                    Days on Market
                  </span>

                  <p className="mt-1 font-semibold text-white">
                    {property.daysOnMarket ?? '—'}
                  </p>
                </div>
              </div>
            </div>

            {/* Book inspection */}
            <div className="rounded-[28px] bg-[color:var(--brand)]/10 p-5 text-slate-100">
              <p className="text-sm uppercase tracking-[0.28em] text-[color:var(--brand)]">
                Book inspection
              </p>

              <p className="mt-3 text-base leading-7 text-slate-200">
                Schedule a private walkthrough with our team and
                receive the full property details.
              </p>
            </div>

            {/* Contact button */}
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
  )
}

export default PropertyModal