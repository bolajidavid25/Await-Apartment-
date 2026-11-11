import { useEffect, useState, useMemo, useCallback, useRef } from 'react'
import InspectionModal from './InspectionalModal'
import { formatPrice } from '../utils/formatPrice'
import { AnimatePresence, motion } from 'framer-motion'
import {
  X,
  Heart,
  Share2,
  MapPin,
  BedDouble,
  Bath,
  Maximize2,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Check,
  Calendar,
  Layers,
  Image as ImageIcon,
} from 'lucide-react'

const PropertyModal = ({ property, onClose }) => {
  const [activeCategory, setActiveCategory] = useState(
    property?.rooms?.living?.length ? 'living' : (property?.cover || property?.image ? 'exterior' : 'all')
  )
  const [activeImageIndex, setActiveImageIndex] = useState(0)
  const [activeTab, setActiveTab] = useState('overview')
  const [isInspectionOpen, setIsInspectionOpen] = useState(false)
  const [brokenImages, setBrokenImages] = useState({})
  const [copied, setCopied] = useState(false)
  const [isSaved, setIsSaved] = useState(false)

  const closeButtonRef = useRef(null)
  const lastFocusedElementRef = useRef(null)

  // Reset category & image index during render when property changes
  const [prevPropertyId, setPrevPropertyId] = useState(property?.id)
  if (prevPropertyId !== property?.id) {
    setPrevPropertyId(property?.id)
    const initialCat = property?.rooms?.living?.length
      ? 'living'
      : (property?.cover || property?.image ? 'exterior' : 'all')
    setActiveCategory(initialCat)
    setActiveImageIndex(0)
    setBrokenImages({})
    setActiveTab('overview')
  }

  // Manage body scroll locking, focus management & Escape key for accessibility
  useEffect(() => {
    if (!property) return

    lastFocusedElementRef.current = document.activeElement
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    // Focus close button on open
    const focusTimer = setTimeout(() => {
      closeButtonRef.current?.focus()
    }, 60)

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose?.()
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      clearTimeout(focusTimer)
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleKeyDown)
      if (lastFocusedElementRef.current && typeof lastFocusedElementRef.current.focus === 'function') {
        lastFocusedElementRef.current.focus()
      }
    }
  }, [property, onClose])

  // ─────────────────────────────────────────────────────────────
  // NORMALIZE PROPERTY DATA (Works with properties.js and API data)
  // ─────────────────────────────────────────────────────────────
  const title = property?.title || property?.address?.full || 'Await Apartment Residence'
  const locationText =
    property?.city ||
    [property?.address?.city, property?.address?.state].filter(Boolean).join(', ') ||
    'Exclusive Location'
  const status = property?.status || 'Active'

  const formattedPrice = formatPrice(property?.price)

  const bedrooms = property?.beds ?? property?.bedrooms ?? '—'
  const bathrooms = property?.baths ?? property?.bathrooms ?? '—'
  const squareFeet = property?.size ?? (property?.squareFeet ? `${property.squareFeet.toLocaleString()} sqft` : '—')

  const overviewText =
    property?.overview ||
    (property?.address
      ? `A premier ${property.propertyType?.toLowerCase() || 'residence'} situated in ${property.address.city || 'an exceptional enclave'}. Featuring ${property.bedrooms ?? '—'} bedrooms and ${property.bathrooms ?? '—'} bathrooms of architectural living space.`
      : 'A luxury residence offering bespoke finishes, open-concept living spaces, and exceptional craftsmanship in a premier setting.')

  const amenities = Array.isArray(property?.amenities) && property.amenities.length > 0
    ? property.amenities
    : ['Infinity Pool', 'Private Elevator', 'Smart Home Integration', 'Media Suite', 'Chef Kitchen', 'Concierge Service']

  // ─────────────────────────────────────────────────────────────
  // ORGANIZE INTERIOR PHOTOGRAPHS INTO SPECIFIC ROOM CATEGORIES
  // (Living Room, Kitchen, Bedroom, plus Exterior & All Photos)
  // ─────────────────────────────────────────────────────────────
  const roomTabs = useMemo(() => {
    if (!property) return []

    const exteriorImages = (property.cover || property.image) ? [property.cover || property.image] : []
    const livingImages = Array.isArray(property.rooms?.living) ? property.rooms.living : []
    const kitchenImages = Array.isArray(property.rooms?.kitchen) ? property.rooms.kitchen : []
    const bedroomImages = Array.isArray(property.rooms?.bedroom) ? property.rooms.bedroom : []
    const apiExtraPhotos = Array.isArray(property.photos)
      ? property.photos.filter((p) => p && !exteriorImages.includes(p))
      : []

    // All combined photos
    const all = [
      ...exteriorImages.map((src, i) => ({
        src,
        category: 'Exterior',
        label: i === 0 ? 'Main Façade & Grounds' : `Exterior View ${i + 1}`,
      })),
      ...livingImages.map((src, i) => ({
        src,
        category: 'Living Room',
        label: `Living Space ${i + 1}`,
      })),
      ...kitchenImages.map((src, i) => ({
        src,
        category: 'Kitchen',
        label: `Chef's Kitchen ${i + 1}`,
      })),
      ...bedroomImages.map((src, i) => ({
        src,
        category: 'Bedroom',
        label: `Bedroom Suite ${i + 1}`,
      })),
      ...apiExtraPhotos.map((src, i) => ({
        src,
        category: 'Interior',
        label: `Interior Feature ${i + 1}`,
      })),
    ]

    return [
      {
        id: 'living',
        label: 'Living Room',
        count: livingImages.length,
        images: livingImages.map((src, i) => ({
          src,
          category: 'Living Room',
          label: `Living Space ${i + 1}`,
        })),
      },
      {
        id: 'kitchen',
        label: 'Kitchen',
        count: kitchenImages.length,
        images: kitchenImages.map((src, i) => ({
          src,
          category: 'Kitchen',
          label: `Chef's Kitchen ${i + 1}`,
        })),
      },
      {
        id: 'bedroom',
        label: 'Bedroom',
        count: bedroomImages.length,
        images: bedroomImages.map((src, i) => ({
          src,
          category: 'Bedroom',
          label: `Bedroom Suite ${i + 1}`,
        })),
      },
      {
        id: 'exterior',
        label: 'Exterior',
        count: exteriorImages.length,
        images: exteriorImages.map((src, i) => ({
          src,
          category: 'Exterior',
          label: i === 0 ? 'Main Façade & Grounds' : `Exterior View ${i + 1}`,
        })),
      },
      {
        id: 'all',
        label: 'All Spaces',
        count: all.length,
        images: all,
      },
    ]
  }, [property])

  // Get active images based on selected category tab
  const activeTabObj = useMemo(() => {
    return roomTabs.find((t) => t.id === activeCategory) || roomTabs[0]
  }, [roomTabs, activeCategory])

  const activeTabImages = activeTabObj?.images || []
  const currentImage = activeTabImages[activeImageIndex] || activeTabImages[0] || null

  const handleNextImage = useCallback(() => {
    if (!activeTabImages.length) return
    setActiveImageIndex((prev) => (prev === activeTabImages.length - 1 ? 0 : prev + 1))
  }, [activeTabImages.length])

  const handlePrevImage = useCallback(() => {
    if (!activeTabImages.length) return
    setActiveImageIndex((prev) => (prev === 0 ? activeTabImages.length - 1 : prev - 1))
  }, [activeTabImages.length])

  // Keyboard arrow navigation for gallery photos
  useEffect(() => {
    if (!property) return
    const handleKeyNav = (e) => {
      if (e.key === 'ArrowRight') handleNextImage()
      if (e.key === 'ArrowLeft') handlePrevImage()
    }
    window.addEventListener('keydown', handleKeyNav)
    return () => window.removeEventListener('keydown', handleKeyNav)
  }, [property, handleNextImage, handlePrevImage])

  const handleShare = async () => {
    const shareUrl = window.location.href
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text: `Check out ${title} on Await Apartment`,
          url: shareUrl,
        })
      } catch (err) {
        if (err.name !== 'AbortError') {
          console.error('Share error:', err)
        }
      }
    } else {
      await navigator.clipboard.writeText(shareUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  if (!property) return null

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[9999] flex items-center justify-center overflow-y-auto bg-slate-950/85 p-3 sm:p-5 lg:p-7 backdrop-blur-xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="relative max-h-[92vh] w-full max-w-6xl overflow-y-auto rounded-[32px] border border-white/15 bg-[#070e1b] shadow-[0_30px_100px_rgba(0,0,0,0.85)]"
          initial={{ y: 25, opacity: 0, scale: 0.98 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 20, opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          onClick={(e) => e.stopPropagation()}
          role="dialog"
          aria-modal="true"
          aria-labelledby="property-modal-title"
          aria-describedby="property-modal-overview"
        >
          {/* ─────────────────────────────────────────────────────────────
              HEADER BAR: Status, Quick Actions & Accessible Close Button
          ───────────────────────────────────────────────────────────── */}
          <div className="sticky top-0 z-30 flex items-center justify-between border-b border-white/10 bg-[#070e1b]/95 px-5 py-4 backdrop-blur-xl sm:px-8">
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-400">
                <Sparkles size={12} />
                {status}
              </span>
              <span className="hidden sm:inline-block text-xs uppercase tracking-[0.22em] text-slate-400">
                Await Apartment Signature
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setIsSaved((prev) => !prev)}
                aria-label="Save residence"
                className={`flex h-10 w-10 items-center justify-center rounded-full border border-white/10 transition ${
                  isSaved
                    ? 'bg-rose-500/20 border-rose-500/40 text-rose-400'
                    : 'bg-slate-900/80 text-white hover:bg-slate-800 hover:border-white/20'
                }`}
              >
                <Heart size={17} fill={isSaved ? 'currentColor' : 'none'} />
              </button>

              <button
                type="button"
                onClick={handleShare}
                aria-label="Share property link"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-slate-900/80 text-white transition hover:bg-slate-800 hover:border-white/20"
              >
                {copied ? <Check size={16} className="text-[color:var(--brand)]" /> : <Share2 size={17} />}
              </button>

              <button
                ref={closeButtonRef}
                type="button"
                onClick={onClose}
                aria-label="Close property details"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white transition hover:bg-rose-500/20 hover:border-rose-500/40 hover:text-rose-300 focus:outline-none focus:ring-2 focus:ring-[color:var(--brand)]"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          {/* ─────────────────────────────────────────────────────────────
              GALLERY: Room-by-Room Interior Split Navigation
          ───────────────────────────────────────────────────────────── */}
          <div className="p-4 sm:p-6 lg:p-8 space-y-4">
            {/* Room Categories Tab Bar */}
            <div className="flex items-center justify-between gap-3 overflow-x-auto pb-1 scrollbar-none">
              <div className="flex items-center gap-2">
                <span className="hidden md:flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.22em] text-slate-400 mr-2">
                  <Layers size={14} className="text-[color:var(--brand)]" />
                  Room Views:
                </span>
                {roomTabs.map((tab) => {
                  const isActive = activeCategory === tab.id
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => {
                        setActiveCategory(tab.id)
                        setActiveImageIndex(0)
                      }}
                      className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] transition-all duration-300 whitespace-nowrap ${
                        isActive
                          ? 'bg-[color:var(--brand)] text-[color:var(--brand-contrast)] shadow-lg shadow-[color:var(--brand)]/20'
                          : 'border border-white/10 bg-slate-900/60 text-slate-300 hover:border-white/20 hover:bg-white/5 hover:text-white'
                      }`}
                    >
                      <span>{tab.label}</span>
                      <span
                        className={`rounded-full px-1.5 py-0.5 text-[10px] ${
                          isActive
                            ? 'bg-black/20 text-white'
                            : 'bg-white/10 text-slate-400'
                        }`}
                      >
                        {tab.count}
                      </span>
                    </button>
                  )
                })}
              </div>

              {activeTabImages.length > 0 && (
                <div className="hidden sm:block text-xs font-mono text-slate-400 whitespace-nowrap">
                  {activeImageIndex + 1} / {activeTabImages.length}
                </div>
              )}
            </div>

            {/* Main Stage Image Viewer with Arrow Controls / Empty State */}
            <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden rounded-[24px] border border-white/10 bg-slate-900">
              {activeTabImages.length === 0 ? (
                /* Empty State when specific room images are unavailable */
                <div className="flex h-full w-full flex-col items-center justify-center bg-slate-900/90 p-8 text-center">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-[color:var(--brand)] mb-3">
                    <ImageIcon size={26} />
                  </div>
                  <p className="text-sm font-semibold uppercase tracking-[0.24em] text-white">
                    No {activeTabObj?.label} Photographs Available
                  </p>
                  <p className="mt-2 text-xs text-slate-400 max-w-sm leading-relaxed">
                    Photographs for this specific space are not currently available for this listing. Schedule a private tour to inspect this space in person.
                  </p>
                </div>
              ) : currentImage && !brokenImages[currentImage.src] ? (
                <img
                  key={currentImage.src}
                  src={currentImage.src}
                  alt={`${title} - ${currentImage.label}`}
                  className="h-full w-full object-cover object-center transition-all duration-500"
                  onError={() => {
                    setBrokenImages((prev) => ({ ...prev, [currentImage.src]: true }))
                  }}
                />
              ) : (
                /* Broken Image Fallback */
                <div className="flex h-full w-full flex-col items-center justify-center bg-slate-900/90 p-6 text-center">
                  <ImageIcon size={36} className="text-[color:var(--brand)]/70 mb-2" />
                  <p className="text-sm font-semibold uppercase tracking-[0.24em] text-white">
                    {currentImage?.label || 'Interior Architecture'}
                  </p>
                  <p className="mt-1 text-xs text-slate-400 max-w-sm">
                    Image temporarily unavailable. High-resolution architectural photography available upon private tour inspection.
                  </p>
                </div>
              )}

              {/* Gradient Vignette */}
              {activeTabImages.length > 0 && (
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/20" />
              )}

              {/* Room Tag on Photo */}
              {currentImage && activeTabImages.length > 0 && (
                <div className="absolute left-4 top-4 flex items-center gap-2">
                  <span className="rounded-full border border-white/20 bg-black/60 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-white backdrop-blur-md">
                    {currentImage.category} • {currentImage.label}
                  </span>
                </div>
              )}

              {/* Gallery Arrow Controls */}
              {activeTabImages.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={handlePrevImage}
                    aria-label="Previous photo"
                    className="absolute left-4 top-1/2 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-black/45 text-white backdrop-blur-md transition hover:bg-[color:var(--brand)] hover:border-[color:var(--brand)] hover:scale-105 active:scale-95 focus:outline-none"
                  >
                    <ChevronLeft size={22} />
                  </button>

                  <button
                    type="button"
                    onClick={handleNextImage}
                    aria-label="Next photo"
                    className="absolute right-4 top-1/2 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-black/45 text-white backdrop-blur-md transition hover:bg-[color:var(--brand)] hover:border-[color:var(--brand)] hover:scale-105 active:scale-95 focus:outline-none"
                  >
                    <ChevronRight size={22} />
                  </button>
                </>
              )}
            </div>

            {/* Clickable Room Thumbnails */}
            {activeTabImages.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2 pt-1 scrollbar-thin">
                {activeTabImages.map((img, idx) => {
                  const isSelected = idx === activeImageIndex
                  return (
                    <button
                      key={`${img.src}-${idx}`}
                      type="button"
                      onClick={() => setActiveImageIndex(idx)}
                      className={`group relative h-20 w-28 sm:h-24 sm:w-36 shrink-0 overflow-hidden rounded-xl border-2 transition-all duration-300 ${
                        isSelected
                          ? 'border-[color:var(--brand)] ring-2 ring-[color:var(--brand)]/30 scale-[1.02]'
                          : 'border-white/10 opacity-70 hover:opacity-100 hover:border-white/30'
                      }`}
                    >
                      <img
                        src={img.src}
                        alt={img.label}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                      <span className="absolute bottom-1.5 inset-x-1 text-center truncate text-[9px] font-bold uppercase tracking-[0.14em] text-white">
                        {img.label}
                      </span>
                    </button>
                  )
                })}
              </div>
            )}
          </div>

          {/* ─────────────────────────────────────────────────────────────
              RESIDENCE SPECIFICATIONS & TABS
          ───────────────────────────────────────────────────────────── */}
          <div className="grid grid-cols-1 gap-8 border-t border-white/10 px-5 py-7 sm:px-8 sm:py-9 lg:grid-cols-12">
            {/* Left 8 Cols: Identity, Specs, Tabs & Narrative */}
            <div className="space-y-6 lg:col-span-8">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[color:var(--brand)]">
                  Luxury Residence
                </p>
                <h2 id="property-modal-title" className="mt-2 font-serif text-3xl font-bold tracking-tight text-white sm:text-4xl">
                  {title}
                </h2>
                <div className="mt-2 flex items-center gap-2 text-sm text-slate-400">
                  <MapPin size={15} className="text-[color:var(--brand)] shrink-0" />
                  <span>{locationText}</span>
                </div>
              </div>

              {/* Specs Bar */}
              <div className="grid grid-cols-3 gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 text-center sm:gap-6">
                <div className="flex flex-col items-center justify-center">
                  <BedDouble size={20} className="text-[color:var(--brand)] mb-1" />
                  <span className="font-serif text-xl font-bold text-white">{bedrooms}</span>
                  <span className="text-[11px] uppercase tracking-wider text-slate-400">Bedrooms</span>
                </div>
                <div className="flex flex-col items-center justify-center border-x border-white/10">
                  <Bath size={20} className="text-[color:var(--brand)] mb-1" />
                  <span className="font-serif text-xl font-bold text-white">{bathrooms}</span>
                  <span className="text-[11px] uppercase tracking-wider text-slate-400">Bathrooms</span>
                </div>
                <div className="flex flex-col items-center justify-center">
                  <Maximize2 size={18} className="text-[color:var(--brand)] mb-1" />
                  <span className="font-serif text-xl font-bold text-white">{squareFeet}</span>
                  <span className="text-[11px] uppercase tracking-wider text-slate-400">Total Area</span>
                </div>
              </div>

              {/* Information Tabs */}
              <div className="border-b border-white/10">
                <div className="flex gap-6 sm:gap-8">
                  {[
                    ['overview', 'Overview'],
                    ['amenities', 'Amenities'],
                    ['details', 'Listing Details'],
                  ].map(([val, label]) => (
                    <button
                      key={val}
                      type="button"
                      onClick={() => setActiveTab(val)}
                      className={`relative pb-3 text-xs font-semibold uppercase tracking-[0.2em] transition ${
                        activeTab === val
                          ? 'text-[color:var(--brand)]'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      {label}
                      {activeTab === val && (
                        <span className="absolute bottom-0 inset-x-0 h-0.5 rounded-full bg-[color:var(--brand)]" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Tab Contents */}
              <div id="property-modal-overview" className="pt-2">
                {activeTab === 'overview' && (
                  <div className="space-y-4">
                    <p className="text-sm leading-relaxed text-slate-300 sm:text-base">
                      {overviewText}
                    </p>
                  </div>
                )}

                {activeTab === 'amenities' && (
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                    {amenities.map((amenity) => (
                      <div
                        key={amenity}
                        className="flex items-center gap-2 rounded-xl border border-white/10 bg-slate-900/60 p-3 text-xs font-medium text-slate-200"
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--brand)]" />
                        <span>{amenity}</span>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === 'details' && (
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-2">
                    <div className="rounded-xl border border-white/10 bg-slate-900/60 p-4">
                      <p className="text-[10px] uppercase tracking-[0.2em] text-slate-400">Market Status</p>
                      <p className="mt-1 font-semibold text-white">{status}</p>
                    </div>
                    <div className="rounded-xl border border-white/10 bg-slate-900/60 p-4">
                      <p className="text-[10px] uppercase tracking-[0.2em] text-slate-400">Listing Identifier</p>
                      <p className="mt-1 font-semibold text-white">{property.id || 'AW-LUX-2026'}</p>
                    </div>
                    <div className="rounded-xl border border-white/10 bg-slate-900/60 p-4">
                      <p className="text-[10px] uppercase tracking-[0.2em] text-slate-400">Living Spaces</p>
                      <p className="mt-1 font-semibold text-white">{roomTabs.length} Distinct Areas</p>
                    </div>
                    <div className="rounded-xl border border-white/10 bg-slate-900/60 p-4">
                      <p className="text-[10px] uppercase tracking-[0.2em] text-slate-400">Representation</p>
                      <p className="mt-1 font-semibold text-white">Await Apartment Concierge</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right 4 Cols: Price Card & Inspection CTA */}
            <div className="lg:col-span-4">
              <div className="sticky top-24 rounded-3xl border border-white/15 bg-slate-900/90 p-6 shadow-2xl backdrop-blur-xl sm:p-7 space-y-6">
                <div>
                  <span className="text-[10px] uppercase tracking-[0.24em] text-slate-400">Acquisition Price</span>
                  <p className="font-serif text-3xl font-bold tracking-tight text-white sm:text-4xl">
                    {formattedPrice}
                  </p>
                </div>

                <div className="space-y-3 border-y border-white/10 py-5">
                  <div className="flex items-center justify-between text-xs text-slate-300">
                    <span className="text-slate-400">Availability</span>
                    <span className="font-semibold text-white">{status}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-slate-300">
                    <span className="text-slate-400">Inspection</span>
                    <span className="font-semibold text-[color:var(--brand)]">Private Booking</span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-slate-300">
                    <span className="text-slate-400">Financing Support</span>
                    <span className="font-semibold text-white">Verified Advisors</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setIsInspectionOpen(true)}
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-[color:var(--brand)] px-6 py-4 text-xs font-bold uppercase tracking-[0.22em] text-[color:var(--brand-contrast)] shadow-xl shadow-[color:var(--brand)]/25 transition-all duration-300 hover:brightness-110 hover:scale-[1.02] active:scale-[0.98]"
                >
                  <Calendar size={15} />
                  <span>Book Inspection</span>
                </button>

                <p className="text-center text-[11px] text-slate-400">
                  Direct concierge coordination. No commitment required.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Embedded Inspection Modal */}
      <InspectionModal
        property={property}
        isOpen={isInspectionOpen}
        onClose={() => setIsInspectionOpen(false)}
      />
    </AnimatePresence>
  )
}

export default PropertyModal