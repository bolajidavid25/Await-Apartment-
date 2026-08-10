import { MapPin, BedDouble, Bath, Maximize } from 'lucide-react'

const PropertyCard = ({ property, onClick }) => {
  return (
    <article
      onClick={onClick}
      className="group cursor-pointer overflow-hidden rounded-3xl border border-white/10 bg-slate-900 transition duration-300 hover:-translate-y-1 hover:border-white/20 hover:shadow-2xl hover:shadow-black/30"
    >
      {/* Property Image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-slate-800">
        <img
          src={property.image}
          alt={property.address?.full || 'Property'}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          loading="lazy"
        />

        {/* Status */}
        {property.status && (
          <span className="absolute left-4 top-4 rounded-full bg-slate-950/80 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-white backdrop-blur-md">
            {property.status}
          </span>
        )}

        {/* Image indicator */}
        {property.photos?.length > 1 && (
          <span className="absolute bottom-4 right-4 rounded-full bg-slate-950/80 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-md">
            {property.photos.length} Photos
          </span>
        )}
      </div>

      {/* Property Information */}
      <div className="p-6">

        {/* Price */}
        <p className="text-2xl font-bold text-white">
          {property.price
            ? `$${property.price.toLocaleString()}`
            : 'Price unavailable'}
        </p>

        {/* Address */}
        <div className="mt-3 flex items-start gap-2">
          <MapPin
            size={17}
            className="mt-0.5 shrink-0 text-[color:var(--brand)]"
          />

          <div>
            <p className="font-medium text-slate-200">
              {property.address?.street}
            </p>

            <p className="mt-1 text-sm text-slate-500">
              {property.address?.city},{' '}
              {property.address?.state}{' '}
              {property.address?.zip}
            </p>
          </div>
        </div>

        {/* Property Stats */}
        <div className="mt-5 flex flex-wrap gap-4 border-t border-white/10 pt-5 text-sm text-slate-400">

          <div className="flex items-center gap-1.5">
            <BedDouble size={17} />
            <span>{property.bedrooms ?? '—'} Beds</span>
          </div>

          <div className="flex items-center gap-1.5">
            <Bath size={17} />
            <span>{property.bathrooms ?? '—'} Baths</span>
          </div>

          <div className="flex items-center gap-1.5">
            <Maximize size={17} />
            <span>
              {property.squareFeet
                ? `${property.squareFeet.toLocaleString()} sqft`
                : '—'}
            </span>
          </div>

        </div>

        {/* CTA */}
        <div className="mt-6">
          <span className="inline-flex items-center text-sm font-semibold uppercase tracking-[0.18em] text-[color:var(--brand)] transition group-hover:gap-3">
            View Property
            <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </span>
        </div>

      </div>
    </article>
  )
}

export default PropertyCard