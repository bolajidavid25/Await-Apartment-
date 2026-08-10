import { useEffect, useState } from 'react'

const Properties = () => {
  const [properties, setProperties] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setLoading(true)

        const response = await fetch(
          'https://await-apartment.vercel.app/api/properties'
        )

        if (!response.ok) {
          throw new Error(`API request failed: ${response.status}`)
        }

        const data = await response.json()

        console.log('NORMALIZED PROPERTY DATA:', data)

        setProperties(data.properties || [])
      } catch (error) {
        console.error('PROPERTY ERROR:', error)
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }

    fetchProperties()
  }, [])

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-950 px-6 pt-32">
        <div className="mx-auto max-w-7xl">
          <p className="text-slate-400">
            Loading properties...
          </p>
        </div>
      </main>
    )
  }

  if (error) {
    return (
      <main className="min-h-screen bg-slate-950 px-6 pt-32">
        <div className="mx-auto max-w-7xl">
          <p className="text-red-400">
            Failed to load properties.
          </p>

          <p className="mt-2 text-sm text-slate-500">
            {error}
          </p>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-slate-950 px-6 pb-20 pt-32">
      <div className="mx-auto max-w-7xl">

        <div className="mb-10">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-teal-400">
            Await Apartment
          </p>

          <h1 className="text-4xl font-bold tracking-tight text-white md:text-5xl">
            Find Your Next Property
          </h1>

          <p className="mt-4 max-w-2xl text-slate-400">
            Explore verified residential properties currently
            available on the market.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {properties.map((property) => (
            <div
              key={property.id}
              className="overflow-hidden rounded-3xl border border-slate-800 bg-slate-900"
            >
              <div className="flex aspect-[4/3] items-center justify-center bg-slate-800">
                <span className="text-sm text-slate-500">
                  Property image unavailable
                </span>
              </div>

              <div className="p-6">
                <p className="text-2xl font-bold text-white">
                  {property.price
                    ? `$${property.price.toLocaleString()}`
                    : 'Price unavailable'}
                </p>

                <p className="mt-3 text-slate-300">
                  {property.address.full}
                </p>

                <p className="mt-1 text-sm text-slate-500">
                  {property.address.city},{' '}
                  {property.address.state}{' '}
                  {property.address.zip}
                </p>

                <div className="mt-5 flex gap-4 text-sm text-slate-400">
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
              </div>
            </div>
          ))}
        </div>

      </div>
    </main>
  )
}

export default Properties