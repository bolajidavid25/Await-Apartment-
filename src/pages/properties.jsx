import { useEffect, useState } from 'react'
import PropertyCard from '../components/PropertyCard'

const Properties = () => {
  const [properties, setProperties] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setLoading(true)
        setError(null)

        const response = await fetch(
          'https://awaitapartment.vercel.app/api/properties'
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
      <main className="min-h-screen bg-slate-950 px-6 py-24">
        <div className="mx-auto flex min-h-[50vh] max-w-7xl items-center justify-center">
          <div className="text-center">
            <div className="mx-auto h-10 w-10 animate-spin rounded-full border-2 border-slate-700 border-t-teal-400" />

            <p className="mt-5 text-sm uppercase tracking-[0.25em] text-slate-500">
              Await Apartment
            </p>

            <p className="mt-2 text-slate-400">
              Loading properties...
            </p>
          </div>
        </div>
      </main>
    )
  }

  if (error) {
    return (
      <main className="min-h-screen bg-slate-950 px-6 py-24">
        <div className="mx-auto flex min-h-[50vh] max-w-7xl items-center justify-center">
          <div className="max-w-md text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-red-400">
              Unable to load properties
            </p>

            <h1 className="mt-4 text-3xl font-semibold text-white">
              Something went wrong.
            </h1>

            <p className="mt-3 text-sm leading-6 text-slate-500">
              {error}
            </p>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto max-w-7xl px-5 pb-24 pt-28 sm:px-8 lg:px-10">

        {/* ─────────────────────────────────────────
            PAGE HEADER
        ───────────────────────────────────────── */}
        <section className="relative overflow-hidden rounded-[36px] border border-white/10 bg-slate-900/60 px-6 py-12 sm:px-10 lg:px-14 lg:py-16">

          {/* Ambient glow */}
          <div className="pointer-events-none absolute -right-32 -top-32 h-80 w-80 rounded-full bg-teal-400/10 blur-3xl" />

          <div className="pointer-events-none absolute -bottom-40 left-1/3 h-80 w-80 rounded-full bg-blue-500/10 blur-3xl" />

          <div className="relative">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-teal-400">
              Await Apartment
            </p>

            <h1 className="mt-5 max-w-4xl text-4xl font-semibold leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-6xl">
              Discover a property
              <span className="block text-slate-400">
                worth coming home to.
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-7 text-slate-400 sm:text-lg">
              Explore residential properties currently available on
              the market, presented with the clarity and confidence
              expected from Await Apartment.
            </p>

            {/* Discovery bar */}
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">

              <div className="flex min-h-14 flex-1 items-center rounded-full border border-white/10 bg-slate-950/70 px-5 shadow-inner">
                <span className="mr-3 text-slate-500">
                  ⌕
                </span>

                <span className="text-sm text-slate-500">
                  Search by city, address or property type
                </span>
              </div>

              <button
                type="button"
                className="min-h-14 rounded-full border border-white/10 bg-slate-800 px-7 text-sm font-semibold uppercase tracking-[0.16em] text-white transition hover:border-teal-400/40 hover:bg-slate-800/80"
              >
                Filters
              </button>
            </div>
          </div>
        </section>

        {/* ─────────────────────────────────────────
            RESULTS HEADER
        ───────────────────────────────────────── */}
        <section className="mt-12 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-teal-400">
              Property Collection
            </p>

            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
              Available properties
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              {properties.length}{' '}
              {properties.length === 1 ? 'property' : 'properties'} currently
              available
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs uppercase tracking-[0.18em] text-slate-600">
              Sort
            </span>

            <button
              type="button"
              className="rounded-full border border-white/10 bg-slate-900 px-5 py-3 text-sm text-slate-300 transition hover:border-teal-400/30 hover:text-white"
            >
              Featured
            </button>
          </div>
        </section>

        {/* ─────────────────────────────────────────
            PROPERTY GRID
        ───────────────────────────────────────── */}
        <section className="mt-8">
          {properties.length === 0 ? (
            <div className="rounded-[32px] border border-white/10 bg-slate-900/60 px-6 py-20 text-center">
              <p className="text-sm uppercase tracking-[0.25em] text-slate-500">
                No properties
              </p>

              <h3 className="mt-3 text-2xl font-semibold text-white">
                No properties are currently available.
              </h3>

              <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-slate-500">
                Please check again shortly. New properties will appear
                here when they become available.
              </p>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {properties.map((property) => (
                <PropertyCard
                  key={property.id}
                  property={property}
                  onClick={() =>
                    console.log('SELECTED PROPERTY:', property)
                  }
                />
              ))}
            </div>
          )}
        </section>

      </div>
    </main>
  )
}

export default Properties