import { useState } from 'react'
import { ArrowUpRight } from 'lucide-react'

const PropertyCard = ({ property, onClick }) => {
  const [imageError, setImageError] = useState(false)

  const imageUrl = property?.image || null
  const hasImage = Boolean(imageUrl && !imageError)

  const formattedPrice = property?.price
    ? `$${property.price.toLocaleString()}`
    : 'Price unavailable'

  const location = [
    property?.address?.city,
    property?.address?.state,
  ]
    .filter(Boolean)
    .join(', ')

  return (
    <button
      type="button"
      onClick={onClick}
      className="group relative w-full overflow-hidden rounded-[28px] border border-white/10 bg-slate-900 text-left shadow-[0_20px_60px_rgba(0,0,0,0.18)] transition-all duration-500 hover:-translate-y-1 hover:border-teal-400/30 hover:shadow-[0_28px_80px_rgba(0,0,0,0.32)]"
    >
      {/* Brand glow */}
      <div className="pointer-events-none absolute -inset-px rounded-[28px] bg-gradient-to-br from-teal-400/0 via-teal-400/0 to-teal-400/10 opacity-0 transition duration-500 group-hover:opacity-100" />

      {/* ─────────────────────────────
          IMAGE
      ───────────────────────────── */}
      <div className="relative aspect-[4/3] overflow-hidden bg-slate-800">

        {hasImage ? (
          <img
            src={imageUrl}
            alt={property?.address?.full || 'Await Apartment property'}
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="relative flex h-full w-full items-center justify-center overflow-hidden bg-slate-800">

            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(20,184,166,0.13),transparent_50%)]" />

            <div className="relative text-center">
              <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-teal-400/70">
                Await Apartment
              </p>

              <p className="mt-2 text-xs text-slate-500">
                Property image unavailable
              </p>
            </div>
          </div>
        )}

        {/* Image gradient */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-slate-950/70 to-transparent opacity-80" />

        {/* Status */}
        {property?.status && (
          <div className="absolute left-4 top-4 rounded-full border border-white/10 bg-slate-950/80 px-3.5 py-2 text-[10px] font-bold uppercase tracking-[0.18em] text-white shadow-lg backdrop-blur-md">
            {property.status}
          </div>
        )}

        {/* Property type */}
        {property?.propertyType && (
          <div className="absolute bottom-4 left-4 rounded-full border border-white/10 bg-slate-950/80 px-3.5 py-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-200 shadow-lg backdrop-blur-md">
            {property.propertyType}
          </div>
        )}

        {/* View arrow */}
        <div className="absolute bottom-4 right-4 flex h-10 w-10 translate-y-2 items-center justify-center rounded-full border border-white/10 bg-slate-950/80 text-white opacity-0 shadow-lg backdrop-blur-md transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
          <ArrowUpRight size={17} strokeWidth={1.8} />
        </div>
      </div>

      {/* ─────────────────────────────
          CONTENT
      ───────────────────────────── */}
      <div className="relative p-5 sm:p-6">

        {/* Price */}
        <div className="flex items-start justify-between gap-4">
          <p className="text-[25px] font-semibold tracking-tight text-white">
            {formattedPrice}
          </p>
        </div>

        {/* Address */}
        <p className="mt-3 line-clamp-1 text-[15px] font-medium text-slate-200">
          {property?.address?.full || 'Address unavailable'}
        </p>

        {/* Location */}
        <p className="mt-1 text-sm text-slate-500">
          {location || 'Location unavailable'}
          {property?.address?.zip
            ? ` ${property.address.zip}`
            : ''}
        </p>

        {/* Stats */}
        <div className="mt-5 flex flex-wrap items-center gap-y-2 text-sm text-slate-400">

          <span>
            <span className="font-semibold text-slate-200">
              {property?.bedrooms ?? '—'}
            </span>{' '}
            Beds
          </span>

          <span className="text-slate-700">•</span>

          <span>
            <span className="font-semibold text-slate-200">
              {property?.bathrooms ?? '—'}
            </span>{' '}
            Baths
          </span>

          <span className="text-slate-700">•</span>

          <span>
            <span className="font-semibold text-slate-200">
              {property?.squareFeet
                ? property.squareFeet.toLocaleString()
                : '—'}
            </span>{' '}
            sqft
          </span>
        </div>

        {/* Divider */}
        <div className="my-5 h-px bg-white/[0.07]" />

        {/* CTA */}
        <div className="flex items-center justify-between">

          <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-teal-400 transition-colors duration-300 group-hover:text-teal-300">
            View Property
          </span>

          <span className="text-sm text-slate-500 transition-all duration-300 group-hover:translate-x-1 group-hover:text-teal-400">
            →
          </span>
        </div>
      </div>
    </button>
  )
}

export default PropertyCard