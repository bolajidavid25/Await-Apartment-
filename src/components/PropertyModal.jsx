import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  X,
  Heart,
  Share2,
  MapPin,
  BedDouble,
  Bath,
  Ruler,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'

const PropertyModal = ({ property, onClose }) => {
  const [activeImage, setActiveImage] = useState(0)
  const [activeTab, setActiveTab] = useState('overview')

  useEffect(() => {
    if (!property) return

    const previousOverflow = document.body.style.overflow

    document.body.style.overflow = 'hidden'

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    window.addEventListener('keydown', handleEscape)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleEscape)
    }
  }, [property, onClose])


  if (!property) return null

  const photos = Array.isArray(property.photos)
    ? property.photos.filter(Boolean)
    : []

  const galleryImages = [
    property.image,
    ...photos,
  ].filter(
    (image, index, array) =>
      image && array.indexOf(image) === index
  )

  const formatPrice = (price) => {
    if (
      price === null ||
      price === undefined ||
      price === ''
    ) {
      return 'Price unavailable'
    }

    const numericPrice = Number(price)

    if (Number.isNaN(numericPrice)) {
      return 'Price unavailable'
    }

    return `$${numericPrice.toLocaleString()}`
  }

  const getImageLabel = (index) => {
    const image = galleryImages[index] || ''

    if (image.includes('living-room')) {
      return 'Living Room'
    }

    if (image.includes('kitchen')) {
      return 'Kitchen'
    }

    if (image.includes('bedroom')) {
      return 'Bedroom'
    }

    if (image.includes('exterior')) {
      return 'Exterior'
    }

    if (index === 0) {
      return 'Exterior'
    }

    return `Photo ${index + 1}`
  }

  const nextImage = () => {
    if (!galleryImages.length) return

    setActiveImage((current) =>
      current === galleryImages.length - 1
        ? 0
        : current + 1
    )
  }

  const previousImage = () => {
    if (!galleryImages.length) return

    setActiveImage((current) =>
      current === 0
        ? galleryImages.length - 1
        : current - 1
    )
  }

  const handleShare = async () => {
    const shareData = {
      title:
        property.address?.full ||
        'Await Apartment Property',

      text:
        'Check out this property on Await Apartment.',

      url: window.location.href,
    }

    try {
      if (navigator.share) {
        await navigator.share(shareData)
      } else if (navigator.clipboard) {
        await navigator.clipboard.writeText(
          window.location.href
        )
      }
    } catch (error) {
      if (error?.name !== 'AbortError') {
        console.error('Share failed:', error)
      }
    }
  }

  const currentImage =
    galleryImages[activeImage] || property.image || null

  return (
    <AnimatePresence>
      {property && (
        <motion.div
          className="fixed inset-0 z-[9999] overflow-y-auto bg-slate-950/95 px-3 py-4 backdrop-blur-xl sm:px-6 sm:py-6 lg:px-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="relative mx-auto w-full max-w-7xl overflow-hidden rounded-[30px] border border-white/10 bg-slate-950 shadow-[0_30px_100px_rgba(0,0,0,0.65)] sm:rounded-[36px]"
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
            transition={{ duration: 0.25 }}
            onClick={(event) => event.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="property-modal-title"
          >
            {/* =====================================================
                TOP CONTROL BAR
            ====================================================== */}

            <div className="flex items-center justify-between px-5 py-4 sm:px-7 sm:py-5">
              <div className="rounded-full border border-white/15 bg-slate-900/80 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.22em] text-white backdrop-blur-md">
                <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-teal-400" />
                {property.status || 'Active'}
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  aria-label="Save property"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-slate-900 text-white transition hover:border-teal-400/30 hover:bg-slate-800"
                >
                  <Heart size={18} />
                </button>

                <button
                  type="button"
                  onClick={handleShare}
                  aria-label="Share property"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-slate-900 text-white transition hover:border-teal-400/30 hover:bg-slate-800"
                >
                  <Share2 size={18} />
                </button>

                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close property"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-slate-900 text-white transition hover:border-teal-400/30 hover:bg-slate-800"
                >
                  <X size={19} />
                </button>
              </div>
            </div>

            {/* =====================================================
                IMAGE / GALLERY
            ====================================================== */}

            <div className="px-3 sm:px-5">
              <div className="relative h-[52vh] min-h-[380px] max-h-[620px] overflow-hidden rounded-[24px] border border-white/10 bg-slate-900 sm:rounded-[28px]">
                {currentImage ? (
                  <img
                    src={currentImage}
                    alt={
                      property.address?.full ||
                      'Await Apartment property'
                    }
                    className="h-full w-full object-cover object-center transition-all duration-500"
                    onError={(event) => {
                      event.currentTarget.style.display =
                        'none'
                    }}
                  />
                ) : (
                  <div className="flex h-full items-center justify-center bg-slate-900">
                    <div className="text-center">
                      <p className="text-xs font-semibold uppercase tracking-[0.28em] text-teal-400">
                        Await Apartment
                      </p>

                      <p className="mt-2 text-sm text-slate-500">
                        Property image unavailable
                      </p>
                    </div>
                  </div>
                )}

                {/* Image overlay */}

                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/10" />

                {/* Previous */}

                {galleryImages.length > 1 && (
                  <button
                    type="button"
                    onClick={previousImage}
                    aria-label="Previous property image"
                    className="absolute left-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/35 text-white backdrop-blur-md transition hover:bg-black/55"
                  >
                    <ChevronLeft size={21} />
                  </button>
                )}

                {/* Next */}

                {galleryImages.length > 1 && (
                  <button
                    type="button"
                    onClick={nextImage}
                    aria-label="Next property image"
                    className="absolute right-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/35 text-white backdrop-blur-md transition hover:bg-black/55"
                  >
                    <ChevronRight size={21} />
                  </button>
                )}

                {/* =================================================
                    THUMBNAILS
                ================================================== */}

                {galleryImages.length > 0 && (
                  <div className="absolute bottom-4 left-4 right-4 flex gap-3 overflow-x-auto pb-1 sm:left-5 sm:right-5">
                    {galleryImages.map((image, index) => (
                      <button
                        key={`${image}-${index}`}
                        type="button"
                        onClick={() =>
                          setActiveImage(index)
                        }
                        className={`group relative h-20 w-28 shrink-0 overflow-hidden rounded-xl border-2 transition-all sm:h-24 sm:w-36 ${
                          activeImage === index
                            ? 'border-teal-400'
                            : 'border-white/20 hover:border-white/50'
                        }`}
                      >
                        <img
                          src={image}
                          alt={getImageLabel(index)}
                          className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                        />

                        <div className="absolute inset-0 bg-black/25" />

                        <span className="absolute bottom-2 left-0 right-0 text-center text-[9px] font-bold uppercase tracking-[0.18em] text-white">
                          {getImageLabel(index)}
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* =====================================================
                MAIN PROPERTY AREA
            ====================================================== */}

            <div className="grid gap-8 px-5 py-7 sm:px-8 sm:py-9 lg:grid-cols-[1fr_340px] lg:px-10">
              {/* LEFT */}

              <div>
                {/* Property identity */}

                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.28em] text-teal-400">
                    {property.propertyType ||
                      'Residential Property'}
                  </p>

                  <h2
                    id="property-modal-title"
                    className="mt-3 text-4xl font-semibold tracking-tight text-white sm:text-5xl"
                  >
                    {formatPrice(property.price)}
                  </h2>

                  <div className="mt-4 flex items-start gap-2 text-sm text-slate-300 sm:text-base">
                    <MapPin
                      size={19}
                      className="mt-0.5 shrink-0 text-teal-400"
                    />

                    <span>
                      {property.address?.full ||
                        'Address unavailable'}
                    </span>
                  </div>
                </div>

                {/* Stats */}

                <div className="mt-7 flex flex-wrap items-center gap-6 border-y border-white/10 py-5 sm:gap-10">
                  <div className="flex items-center gap-3">
                    <BedDouble
                      size={22}
                      className="text-teal-400"
                    />

                    <div>
                      <p className="text-xl font-semibold text-white">
                        {property.bedrooms ?? '—'}
                      </p>

                      <p className="text-[10px] uppercase tracking-[0.18em] text-slate-500">
                        Bedrooms
                      </p>
                    </div>
                  </div>

                  <div className="h-10 w-px bg-white/10" />

                  <div className="flex items-center gap-3">
                    <Bath
                      size={22}
                      className="text-teal-400"
                    />

                    <div>
                      <p className="text-xl font-semibold text-white">
                        {property.bathrooms ?? '—'}
                      </p>

                      <p className="text-[10px] uppercase tracking-[0.18em] text-slate-500">
                        Bathrooms
                      </p>
                    </div>
                  </div>

                  <div className="h-10 w-px bg-white/10" />

                  <div className="flex items-center gap-3">
                    <Ruler
                      size={22}
                      className="text-teal-400"
                    />

                    <div>
                      <p className="text-xl font-semibold text-white">
                        {property.squareFeet
                          ? Number(
                              property.squareFeet
                            ).toLocaleString()
                          : '—'}
                      </p>

                      <p className="text-[10px] uppercase tracking-[0.18em] text-slate-500">
                        Sq Ft
                      </p>
                    </div>
                  </div>
                </div>

                {/* =================================================
                    TABS
                ================================================== */}

                <div className="mt-7 border-b border-white/10">
                  <div className="flex gap-8">
                    {[
                      ['overview', 'Overview'],
                      ['details', 'Details'],
                      ['location', 'Location'],
                    ].map(([value, label]) => (
                      <button
                        key={value}
                        type="button"
                        onClick={() =>
                          setActiveTab(value)
                        }
                        className={`relative pb-4 text-xs font-semibold uppercase tracking-[0.2em] transition ${
                          activeTab === value
                            ? 'text-teal-400'
                            : 'text-slate-500 hover:text-white'
                        }`}
                      >
                        {label}

                        {activeTab === value && (
                          <span className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full bg-teal-400" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* =================================================
                    TAB CONTENT
                ================================================== */}

                <div className="pt-7">
                  {activeTab === 'overview' && (
                    <section>
                      <h3 className="text-2xl font-semibold text-white">
                        About this property
                      </h3>

                      <p className="mt-4 max-w-3xl leading-7 text-slate-400">
                        A{' '}
                        {property.propertyType?.toLowerCase() ||
                          'residential property'}{' '}
                        located in{' '}
                        {property.address?.city ||
                          'Florida'}
                        ,{' '}
                        {property.address?.state || 'FL'}.
                        This property offers{' '}
                        {property.bedrooms ?? '—'} bedrooms,
                        {' '}
                        {property.bathrooms ?? '—'} bathrooms
                        and approximately{' '}
                        {property.squareFeet
                          ? `${Number(
                              property.squareFeet
                            ).toLocaleString()} square feet`
                          : 'an undisclosed floor area'}{' '}
                        of comfortable living space.
                      </p>
                    </section>
                  )}

                  {activeTab === 'details' && (
                    <section>
                      <h3 className="text-2xl font-semibold text-white">
                        Property details
                      </h3>

                      <div className="mt-5 grid gap-3 sm:grid-cols-2">
                        <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-5">
                          <p className="text-xs uppercase tracking-[0.18em] text-slate-500">
                            Year Built
                          </p>

                          <p className="mt-2 text-lg font-semibold text-white">
                            {property.yearBuilt || '—'}
                          </p>
                        </div>

                        <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-5">
                          <p className="text-xs uppercase tracking-[0.18em] text-slate-500">
                            Days on Market
                          </p>

                          <p className="mt-2 text-lg font-semibold text-white">
                            {property.daysOnMarket ?? '—'}
                          </p>
                        </div>

                        <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-5">
                          <p className="text-xs uppercase tracking-[0.18em] text-slate-500">
                            Listing Type
                          </p>

                          <p className="mt-2 text-lg font-semibold text-white">
                            {property.listingType || '—'}
                          </p>
                        </div>

                        <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-5">
                          <p className="text-xs uppercase tracking-[0.18em] text-slate-500">
                            Status
                          </p>

                          <p className="mt-2 text-lg font-semibold text-white">
                            {property.status || '—'}
                          </p>
                        </div>
                      </div>
                    </section>
                  )}

                  {activeTab === 'location' && (
                    <section>
                      <h3 className="text-2xl font-semibold text-white">
                        Property location
                      </h3>

                      <div className="mt-5 rounded-3xl border border-white/10 bg-slate-900/70 p-6">
                        <div className="flex items-start gap-3">
                          <MapPin
                            size={21}
                            className="mt-1 shrink-0 text-teal-400"
                          />

                          <div>
                            <p className="font-semibold text-white">
                              {property.address?.full ||
                                'Address unavailable'}
                            </p>

                            <p className="mt-2 text-sm text-slate-500">
                              {property.address?.city ||
                                '—'}
                              ,{' '}
                              {property.address?.state ||
                                '—'}{' '}
                              {property.address?.zip || ''}
                            </p>
                          </div>
                        </div>
                      </div>
                    </section>
                  )}
                </div>
              </div>

              {/* =================================================
                  INSPECTION CTA
              ================================================== */}

              <aside className="lg:sticky lg:top-6 lg:self-start">
                <div className="rounded-[28px] border border-white/10 bg-slate-900/80 p-6 sm:p-7">
                  <p className="text-xs font-semibold uppercase tracking-[0.25em] text-teal-400">
                    Interested?
                  </p>

                  <h3 className="mt-3 text-2xl font-semibold leading-tight text-white">
                    See this property in person.
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-slate-400">
                    Schedule a private inspection with the
                    Await Apartment team.
                  </p>

                  <a
                    href="#contact"
                    onClick={onClose}
                    className="mt-7 inline-flex w-full items-center justify-center rounded-full bg-teal-400 px-5 py-4 text-sm font-bold uppercase tracking-[0.18em] text-slate-950 transition hover:bg-teal-300"
                  >
                    Book Inspection
                  </a>
                </div>
              </aside>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default PropertyModal