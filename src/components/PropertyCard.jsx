const PropertyCard = ({ property, onClick }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group w-full overflow-hidden rounded-3xl border border-slate-800 bg-slate-900 text-left transition duration-300 hover:-translate-y-1 hover:border-slate-700 hover:shadow-2xl hover:shadow-black/30"
    >
            <div className="aspect-[4/3] overflow-hidden bg-slate-800">
              {property.image ? (
                <img
                  src={property.image}
                  alt={property.address?.full || 'Property'}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  onError={(event) => {
                    console.error('IMAGE FAILED:', property.image)
                    event.currentTarget.style.display = 'none'
                  }}
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center">
                  <span className="text-sm text-slate-500">
                    Property image unavailable
                  </span>
                </div>
              )}
            </div>

      {/* Property information */}
      <div className="p-6">
        <p className="text-2xl font-bold text-white">
          {property.price
            ? `$${property.price.toLocaleString()}`
            : 'Price unavailable'}
        </p>

        <p className="mt-3 text-slate-300">
          {property.address?.full || 'Address unavailable'}
        </p>

        <p className="mt-1 text-sm text-slate-500">
          {property.address?.city || '—'},{' '}
          {property.address?.state || '—'}{' '}
          {property.address?.zip || ''}
        </p>

        <div className="mt-5 flex flex-wrap gap-4 text-sm text-slate-400">
          <span>
            {property.bedrooms ?? '—'} Beds
          </span>

          <span>
            {property.bathrooms ?? '—'} Baths
          </span>

          <span>
            {property.squareFeet
              ? `${property.squareFeet.toLocaleString()} sqft`
              : '—'}
          </span>
        </div>

        <div className="mt-5 text-sm font-semibold uppercase tracking-[0.18em] text-teal-400">
          View Property
        </div>
      </div>
    </button>
  )
}

export default PropertyCard