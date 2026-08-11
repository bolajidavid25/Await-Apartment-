import { useEffect, useMemo, useState } from 'react'
import PropertyCard from '../components/PropertyCard'
import PropertyModal from '../components/PropertyModal'

const API_URL = '/api/properties'

const Properties = () => {
  // ============================================================
  // PROPERTY DATA
  // ============================================================

  const [properties, setProperties] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // ============================================================
  // PROPERTY MODAL
  // ============================================================

  const [selectedProperty, setSelectedProperty] = useState(null)

  // ============================================================
  // PHASE 5 — SEARCH & FILTER STATE
  // ============================================================

  const [searchQuery, setSearchQuery] = useState('')
  const [showFilters, setShowFilters] = useState(false)

  const [propertyType, setPropertyType] = useState('all')
  const [status, setStatus] = useState('all')

  const [minPrice, setMinPrice] = useState('')
  const [maxPrice, setMaxPrice] = useState('')

  const [minBedrooms, setMinBedrooms] = useState('all')

  const [sortBy, setSortBy] = useState('featured')

  // ============================================================
  // FETCH PROPERTIES
  // ============================================================

  useEffect(() => {
    let cancelled = false

const fetchProperties = async () => {
  try {
    const response = await fetch(API_URL)

    console.log('API STATUS:', response.status)
    console.log(
      'API CONTENT TYPE:',
      response.headers.get('content-type')
    )

    const text = await response.text()

    console.log('API RESPONSE:', text)

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`)
    }

    const data = JSON.parse(text)

    if (!data || !Array.isArray(data.properties)) {
      throw new Error('Invalid property data received from API')
    }

    if (!cancelled) {
      setProperties(data.properties)
      setError(null)
    }
  } catch (err) {
    console.error('PROPERTY ERROR:', err)

    if (!cancelled) {
      setError(err.message || 'Failed to fetch properties')
    }
  } finally {
    if (!cancelled) {
      setLoading(false)
    }
  }
}

    fetchProperties()

    return () => {
      cancelled = true
    }
  }, [])

  // ============================================================
  // AVAILABLE PROPERTY TYPES
  // ============================================================

  const propertyTypes = useMemo(() => {
    const types = properties
      .map((property) => property.propertyType)
      .filter(Boolean)

    return [...new Set(types)].sort()
  }, [properties])

  // ============================================================
  // FILTER + SEARCH + SORT
  // ============================================================

  const filteredProperties = useMemo(() => {
    const query = searchQuery
      .trim()
      .toLowerCase()

    const minimumPrice =
      minPrice === ''
        ? null
        : Number(minPrice)

    const maximumPrice =
      maxPrice === ''
        ? null
        : Number(maxPrice)

    let results = properties.filter((property) => {
      // --------------------------------------------------------
      // SEARCH
      // --------------------------------------------------------

      const searchableText = [
        property?.address?.full,
        property?.address?.street,
        property?.address?.city,
        property?.address?.state,
        property?.address?.zip,
        property?.propertyType,
      ]
        .filter(Boolean)
        .join(' ')
        .toLowerCase()

      const matchesSearch =
        !query ||
        searchableText.includes(query)

      // --------------------------------------------------------
      // PROPERTY TYPE
      // --------------------------------------------------------

      const matchesPropertyType =
        propertyType === 'all' ||
        property?.propertyType === propertyType

      // --------------------------------------------------------
      // STATUS
      // --------------------------------------------------------

      const matchesStatus =
        status === 'all' ||
        String(property?.status || '')
          .toLowerCase() ===
          status.toLowerCase()

      // --------------------------------------------------------
      // PRICE
      // --------------------------------------------------------

      const price = Number(property?.price)

      const matchesMinimumPrice =
        minimumPrice === null ||
        (!Number.isNaN(price) &&
          price >= minimumPrice)

      const matchesMaximumPrice =
        maximumPrice === null ||
        (!Number.isNaN(price) &&
          price <= maximumPrice)

      // --------------------------------------------------------
      // BEDROOMS
      // --------------------------------------------------------

      const bedrooms =
        Number(property?.bedrooms)

      const matchesBedrooms =
        minBedrooms === 'all' ||
        (!Number.isNaN(bedrooms) &&
          bedrooms >= Number(minBedrooms))

      return (
        matchesSearch &&
        matchesPropertyType &&
        matchesStatus &&
        matchesMinimumPrice &&
        matchesMaximumPrice &&
        matchesBedrooms
      )
    })

    // ==========================================================
    // SORT
    // ==========================================================

    results = [...results].sort(
      (a, b) => {
        switch (sortBy) {
          case 'price-low':
            return (
              Number(a.price || 0) -
              Number(b.price || 0)
            )

          case 'price-high':
            return (
              Number(b.price || 0) -
              Number(a.price || 0)
            )

          case 'beds-high':
            return (
              Number(b.bedrooms || 0) -
              Number(a.bedrooms || 0)
            )

          case 'size-high':
            return (
              Number(b.squareFeet || 0) -
              Number(a.squareFeet || 0)
            )

          case 'newest':
            return (
              Number(b.yearBuilt || 0) -
              Number(a.yearBuilt || 0)
            )

          case 'featured':
          default:
            return 0
        }
      }
    )

    return results
  }, [
    properties,
    searchQuery,
    propertyType,
    status,
    minPrice,
    maxPrice,
    minBedrooms,
    sortBy,
  ])

  // ============================================================
  // RESET FILTERS
  // ============================================================

  const resetFilters = () => {
    setSearchQuery('')
    setPropertyType('all')
    setStatus('all')
    setMinPrice('')
    setMaxPrice('')
    setMinBedrooms('all')
    setSortBy('featured')
  }

  // ============================================================
  // ACTIVE FILTER CHECK
  // ============================================================

  const hasActiveFilters =
    searchQuery.trim() !== '' ||
    propertyType !== 'all' ||
    status !== 'all' ||
    minPrice !== '' ||
    maxPrice !== '' ||
    minBedrooms !== 'all'

  // ============================================================
  // LOADING
  // ============================================================

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-950 px-6 py-24 text-white">
        <div className="mx-auto flex min-h-[50vh] max-w-7xl items-center justify-center">
          <div className="text-center">

            <div className="mx-auto h-10 w-10 animate-spin rounded-full border-2 border-slate-700 border-t-teal-400" />

            <p className="mt-5 text-sm font-semibold uppercase tracking-[0.25em] text-slate-500">
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

  // ============================================================
  // ERROR
  // ============================================================

  if (error) {
    return (
      <main className="min-h-screen bg-slate-950 px-6 py-24 text-white">
        <div className="mx-auto flex min-h-[50vh] max-w-7xl items-center justify-center">
          <div className="max-w-md text-center">

            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-red-400">
              Unable to load properties
            </p>

            <h1 className="mt-4 text-3xl font-semibold">
              Something went wrong.
            </h1>

            <p className="mt-3 text-sm leading-6 text-slate-500">
              {error}
            </p>

            <button
              type="button"
              onClick={() =>
                window.location.reload()
              }
              className="mt-6 rounded-full bg-teal-400 px-6 py-3 text-sm font-semibold uppercase tracking-[0.15em] text-slate-950 transition hover:bg-teal-300"
            >
              Try Again
            </button>

          </div>
        </div>
      </main>
    )
  }

  // ============================================================
  // PAGE
  // ============================================================

  return (
    <>
      <main className="min-h-screen bg-slate-950 text-white">

        <div className="mx-auto max-w-7xl px-5 pb-24 pt-28 sm:px-8 lg:px-10">

          {/* ====================================================
              PAGE HEADER
          ==================================================== */}

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
                Explore residential properties currently
                available on the market, presented with the
                clarity and confidence expected from Await
                Apartment.
              </p>

              {/* =================================================
                  SEARCH
              ================================================= */}

              <div className="mt-10 flex flex-col gap-3 sm:flex-row">

                <div className="flex min-h-14 flex-1 items-center rounded-full border border-white/10 bg-slate-950/70 px-5 shadow-inner">

                  <span className="mr-3 text-slate-500">
                    ⌕
                  </span>

                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(event) =>
                      setSearchQuery(
                        event.target.value
                      )
                    }
                    placeholder="Search by city, address or property type"
                    className="w-full bg-transparent text-sm text-white outline-none placeholder:text-slate-600"
                  />

                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() =>
                        setSearchQuery('')
                      }
                      className="ml-3 text-xs text-slate-500 transition hover:text-white"
                      aria-label="Clear search"
                    >
                      ✕
                    </button>
                  )}

                </div>

                <button
                  type="button"
                  onClick={() =>
                    setShowFilters(
                      (current) => !current
                    )
                  }
                  className={`min-h-14 rounded-full border px-7 text-sm font-semibold uppercase tracking-[0.16em] transition ${
                    showFilters
                      ? 'border-teal-400/40 bg-teal-400 text-slate-950'
                      : 'border-white/10 bg-slate-800 text-white hover:border-teal-400/40'
                  }`}
                >
                  Filters
                </button>

              </div>

              {/* =================================================
                  FILTER PANEL
              ================================================= */}

              {showFilters && (
                <div className="mt-5 rounded-[28px] border border-white/10 bg-slate-950/70 p-5 backdrop-blur-xl sm:p-6">

                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

                    {/* Property type */}

                    <div>
                      <label className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                        Property Type
                      </label>

                      <select
                        value={propertyType}
                        onChange={(event) =>
                          setPropertyType(
                            event.target.value
                          )
                        }
                        className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-sm text-white outline-none focus:border-teal-400/50"
                      >
                        <option value="all">
                          All property types
                        </option>

                        {propertyTypes.map(
                          (type) => (
                            <option
                              key={type}
                              value={type}
                            >
                              {type}
                            </option>
                          )
                        )}
                      </select>
                    </div>

                    {/* Status */}

                    <div>
                      <label className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                        Status
                      </label>

                      <select
                        value={status}
                        onChange={(event) =>
                          setStatus(
                            event.target.value
                          )
                        }
                        className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-sm text-white outline-none focus:border-teal-400/50"
                      >
                        <option value="all">
                          All statuses
                        </option>

                        <option value="Active">
                          Active
                        </option>

                        <option value="Pending">
                          Pending
                        </option>

                        <option value="Sold">
                          Sold
                        </option>
                      </select>
                    </div>

                    {/* Bedrooms */}

                    <div>
                      <label className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                        Bedrooms
                      </label>

                      <select
                        value={minBedrooms}
                        onChange={(event) =>
                          setMinBedrooms(
                            event.target.value
                          )
                        }
                        className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-sm text-white outline-none focus:border-teal-400/50"
                      >
                        <option value="all">
                          Any number
                        </option>

                        <option value="1">
                          1+ bedroom
                        </option>

                        <option value="2">
                          2+ bedrooms
                        </option>

                        <option value="3">
                          3+ bedrooms
                        </option>

                        <option value="4">
                          4+ bedrooms
                        </option>

                        <option value="5">
                          5+ bedrooms
                        </option>
                      </select>
                    </div>

                    {/* Sort */}

                    <div>
                      <label className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                        Sort By
                      </label>

                      <select
                        value={sortBy}
                        onChange={(event) =>
                          setSortBy(
                            event.target.value
                          )
                        }
                        className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-sm text-white outline-none focus:border-teal-400/50"
                      >
                        <option value="featured">
                          Featured
                        </option>

                        <option value="price-low">
                          Price: Low to High
                        </option>

                        <option value="price-high">
                          Price: High to Low
                        </option>

                        <option value="beds-high">
                          Most Bedrooms
                        </option>

                        <option value="size-high">
                          Largest by Size
                        </option>

                        <option value="newest">
                          Newest Property
                        </option>
                      </select>
                    </div>

                  </div>

                  {/* Price range */}

                  <div className="mt-4 grid gap-4 sm:grid-cols-2">

                    <div>
                      <label className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                        Minimum Price
                      </label>

                      <input
                        type="number"
                        min="0"
                        value={minPrice}
                        onChange={(event) =>
                          setMinPrice(
                            event.target.value
                          )
                        }
                        placeholder="$0"
                        className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-600 focus:border-teal-400/50"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                        Maximum Price
                      </label>

                      <input
                        type="number"
                        min="0"
                        value={maxPrice}
                        onChange={(event) =>
                          setMaxPrice(
                            event.target.value
                          )
                        }
                        placeholder="$10,000,000"
                        className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-600 focus:border-teal-400/50"
                      />
                    </div>

                  </div>

                  {/* Reset */}

                  <div className="mt-5 flex justify-end">

                    <button
                      type="button"
                      onClick={resetFilters}
                      className="rounded-full border border-white/10 px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.15em] text-slate-400 transition hover:border-teal-400/30 hover:text-white"
                    >
                      Reset Filters
                    </button>

                  </div>

                </div>
              )}

            </div>
          </section>

          {/* ====================================================
              RESULTS HEADER
          ==================================================== */}

          <section className="mt-12 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">

            <div>

              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-teal-400">
                Property Collection
              </p>

              <h2 className="mt-2 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                Available properties
              </h2>

              <p className="mt-2 text-sm text-slate-500">
                Showing{' '}
                {filteredProperties.length}{' '}
                of {properties.length}{' '}
                {properties.length === 1
                  ? 'property'
                  : 'properties'}
              </p>

            </div>

            {/* Current sort */}

            <div className="flex items-center gap-3">

              <span className="text-xs uppercase tracking-[0.18em] text-slate-600">
                Sort
              </span>

              <select
                value={sortBy}
                onChange={(event) =>
                  setSortBy(
                    event.target.value
                  )
                }
                className="rounded-full border border-white/10 bg-slate-900 px-5 py-3 text-sm text-slate-300 outline-none transition hover:border-teal-400/30 focus:border-teal-400/50"
              >
                <option value="featured">
                  Featured
                </option>

                <option value="price-low">
                  Price: Low to High
                </option>

                <option value="price-high">
                  Price: High to Low
                </option>

                <option value="beds-high">
                  Most Bedrooms
                </option>

                <option value="size-high">
                  Largest by Size
                </option>

                <option value="newest">
                  Newest Property
                </option>
              </select>

            </div>

          </section>

          {/* ====================================================
              ACTIVE FILTER INDICATOR
          ==================================================== */}

          {hasActiveFilters && (
            <div className="mt-6 flex flex-wrap items-center gap-2">

              <span className="text-xs uppercase tracking-[0.18em] text-slate-600">
                Active:
              </span>

              {searchQuery && (
                <span className="rounded-full border border-teal-400/20 bg-teal-400/10 px-3 py-1.5 text-xs text-teal-300">
                  Search: "{searchQuery}"
                </span>
              )}

              {propertyType !== 'all' && (
                <span className="rounded-full border border-white/10 bg-slate-900 px-3 py-1.5 text-xs text-slate-300">
                  {propertyType}
                </span>
              )}

              {status !== 'all' && (
                <span className="rounded-full border border-white/10 bg-slate-900 px-3 py-1.5 text-xs text-slate-300">
                  {status}
                </span>
              )}

              {minPrice && (
                <span className="rounded-full border border-white/10 bg-slate-900 px-3 py-1.5 text-xs text-slate-300">
                  Min ${Number(minPrice).toLocaleString()}
                </span>
              )}

              {maxPrice && (
                <span className="rounded-full border border-white/10 bg-slate-900 px-3 py-1.5 text-xs text-slate-300">
                  Max ${Number(maxPrice).toLocaleString()}
                </span>
              )}

              {minBedrooms !== 'all' && (
                <span className="rounded-full border border-white/10 bg-slate-900 px-3 py-1.5 text-xs text-slate-300">
                  {minBedrooms}+ bedrooms
                </span>
              )}

              <button
                type="button"
                onClick={resetFilters}
                className="ml-1 text-xs font-semibold text-teal-400 transition hover:text-teal-300"
              >
                Clear all
              </button>

            </div>
          )}

          {/* ====================================================
              PROPERTY GRID
          ==================================================== */}

          <section className="mt-8">

            {filteredProperties.length === 0 ? (

              <div className="rounded-[32px] border border-white/10 bg-slate-900/60 px-6 py-20 text-center">

                <p className="text-sm uppercase tracking-[0.25em] text-slate-500">
                  No matching properties
                </p>

                <h3 className="mt-3 text-2xl font-semibold text-white">
                  We couldn't find a property matching those criteria.
                </h3>

                <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-slate-500">
                  Try adjusting your search or removing
                  some filters to see more properties.
                </p>

                <button
                  type="button"
                  onClick={resetFilters}
                  className="mt-6 rounded-full bg-teal-400 px-6 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-slate-950 transition hover:bg-teal-300"
                >
                  Clear Filters
                </button>

              </div>

            ) : (

              <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">

                {filteredProperties.map(
                  (property) => (
                    <PropertyCard
                      key={property.id}
                      property={property}
                      onClick={() =>
                        setSelectedProperty(
                          property
                        )
                      }
                    />
                  )
                )}

              </div>

            )}

          </section>

        </div>

      </main>

      {/* ======================================================
          PROPERTY MODAL
      ======================================================= */}

      <PropertyModal
              key={selectedProperty?.id || 'property-modal'}
              property={selectedProperty}
              onClose={() => setSelectedProperty(null)}
            />
                
    </>
  )
}

export default Properties