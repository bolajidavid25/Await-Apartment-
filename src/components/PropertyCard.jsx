import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight, BedDouble, Bath, Maximize2, MapPin } from 'lucide-react'

const PropertyCard = ({ property, onClick }) => {
  const [imageError, setImageError] = useState(false)

  // Normalize image from properties.js (cover) or API (image)
  const imageUrl = property?.cover || property?.image || null
  const hasImage = Boolean(imageUrl && !imageError)

  // Normalize price string/number
  const formattedPrice = property?.price
    ? typeof property.price === 'number'
      ? `$${property.price.toLocaleString()}`
      : property.price.startsWith('$')
      ? property.price
      : `$${property.price}`
    : 'Price upon request'

  // Normalize title and address
  const title = property?.title || property?.address?.full || 'Await Apartment Property'

  // Normalize location
  const location =
    property?.city ||
    [property?.address?.city, property?.address?.state].filter(Boolean).join(', ') ||
    'Prime Location'

  // Normalize specs
  const bedrooms = property?.beds ?? property?.bedrooms ?? '—'
  const bathrooms = property?.baths ?? property?.bathrooms ?? '—'
  const squareFeet = property?.size ?? (property?.squareFeet ? `${property.squareFeet.toLocaleString()} sqft` : '—')

  return (
    <motion.button
      type="button"
      onClick={onClick}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-20px' }}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      aria-label={`View details for ${title}`}
      className="group relative flex w-full flex-col overflow-hidden rounded-[28px] border border-white/10 bg-slate-900/90 text-left shadow-[0_20px_60px_rgba(0,0,0,0.22)] backdrop-blur-sm transition-colors duration-500 hover:border-[color:var(--brand)]/40 hover:shadow-[0_32px_90px_rgba(0,0,0,0.45)] focus:outline-none"
    >
      {/* Brand accent ambient glow on hover */}
      <div className="pointer-events-none absolute -inset-px rounded-[28px] bg-gradient-to-br from-[color:var(--brand)]/10 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      {/* ─────────────────────────────
          PROPERTY IMAGE
      ───────────────────────────── */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-800">
        {hasImage ? (
          <img
            src={imageUrl}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            onError={() => setImageError(true)}
            loading="lazy"
          />
        ) : (
          <div className="relative flex h-full w-full items-center justify-center overflow-hidden bg-slate-800">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(14,165,164,0.15),transparent_55%)]" />
            <div className="relative text-center px-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-[color:var(--brand)]/80">
                Await Apartment
              </p>
              <p className="mt-2 text-xs text-slate-400">
                Property image unavailable
              </p>
            </div>
          </div>
        )}

        {/* Cinematic gradient fade at bottom of image */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-slate-950/85 via-slate-950/30 to-transparent" />

        {/* Status Badge */}
        {property?.status && (
          <div className="absolute left-4 top-4 rounded-full border border-white/15 bg-slate-950/85 px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-white shadow-lg backdrop-blur-md">
            {property.status}
          </div>
        )}

        {/* Property Type Badge */}
        {(property?.propertyType || property?.amenities?.[0]) && (
          <div className="absolute bottom-4 left-4 rounded-full border border-white/10 bg-slate-950/80 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-300 shadow-md backdrop-blur-md">
            {property.propertyType || property.amenities[0]}
          </div>
        )}

        {/* View Arrow Icon */}
        <div className="absolute bottom-4 right-4 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-slate-950/85 text-white shadow-lg backdrop-blur-md transition-all duration-300 group-hover:bg-[color:var(--brand)] group-hover:border-[color:var(--brand)] group-hover:scale-110">
          <ArrowUpRight size={17} strokeWidth={2} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </div>
      </div>

      {/* ─────────────────────────────
          CARD CONTENT
      ───────────────────────────── */}
      <div className="relative flex flex-1 flex-col justify-between p-5 sm:p-6">
        <div>
          {/* Price */}
          <div className="flex items-baseline justify-between gap-2">
            <p className="font-serif text-2xl font-bold tracking-tight text-white sm:text-[26px]">
              {formattedPrice}
            </p>
          </div>

          {/* Full Title / Address */}
          <p className="mt-2 line-clamp-1 text-sm font-semibold text-slate-100">
            {title}
          </p>

          {/* City / State */}
          <div className="mt-1 flex items-center gap-1.5 text-xs text-slate-400">
            <MapPin size={13} className="shrink-0 text-[color:var(--brand)]" />
            <span className="line-clamp-1">{location}</span>
          </div>

          {/* Specs: Beds, Baths, Sqft */}
          <div className="mt-4 flex flex-wrap items-center gap-2.5 text-xs text-slate-300">
            <div className="flex items-center gap-1.5 rounded-lg bg-white/5 px-2.5 py-1.5">
              <BedDouble size={14} className="text-slate-400" />
              <span className="font-semibold text-white">{bedrooms}</span>
              <span className="text-slate-400">Beds</span>
            </div>

            <div className="flex items-center gap-1.5 rounded-lg bg-white/5 px-2.5 py-1.5">
              <Bath size={14} className="text-slate-400" />
              <span className="font-semibold text-white">{bathrooms}</span>
              <span className="text-slate-400">Baths</span>
            </div>

            <div className="flex items-center gap-1.5 rounded-lg bg-white/5 px-2.5 py-1.5">
              <Maximize2 size={13} className="text-slate-400" />
              <span className="font-semibold text-white">{squareFeet}</span>
            </div>
          </div>
        </div>

        <div>
          {/* Divider */}
          <div className="my-4 h-px bg-white/[0.08]" />

          {/* CTA Footer */}
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-[0.24em] text-[color:var(--brand)] transition-colors duration-300 group-hover:brightness-125">
              View Details
            </span>
            <span className="text-sm font-medium text-slate-400 transition-all duration-300 group-hover:translate-x-1 group-hover:text-[color:var(--brand)]">
              →
            </span>
          </div>
        </div>
      </div>
    </motion.button>
  )
}

export default PropertyCard