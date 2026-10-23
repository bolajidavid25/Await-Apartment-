import { useEffect, useRef, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/effect-fade'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ChevronLeft,
  ChevronRight,
  BedDouble,
  Bath,
  Maximize2,
  MapPin,
  Sparkles,
  ArrowRight,
  Eye,
} from 'lucide-react'
import properties from '../data/properties'
import PropertyModal from './PropertyModal'

const heroShapes = [
  {
    id: 'shape-1',
    left: '8%',
    top: '15%',
    size: 110,
    opacity: 0.18,
    duration: 18,
    path: <circle cx="50" cy="50" r="36" fill="rgba(14,165,164,0.15)" stroke="rgba(14,165,164,0.3)" strokeWidth="3" />,
  },
  {
    id: 'shape-2',
    left: '82%',
    top: '20%',
    size: 90,
    opacity: 0.15,
    duration: 16,
    path: <polygon points="50,12 88,50 50,88 12,50" fill="rgba(56,189,248,0.12)" stroke="rgba(56,189,248,0.25)" strokeWidth="3" />,
  },
  {
    id: 'shape-3',
    left: '70%',
    top: '75%',
    size: 100,
    opacity: 0.14,
    duration: 20,
    path: <circle cx="50" cy="50" r="38" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="4" />,
  },
]

const HeroSlider = () => {
  const [navigation, setNavigation] = useState({ prevEl: null, nextEl: null })
  const [activeIndex, setActiveIndex] = useState(0)
  const [selectedProperty, setSelectedProperty] = useState(null)
  const prevButton = useRef(null)
  const nextButton = useRef(null)

  const slides = properties.slice(0, 5)

  useEffect(() => {
    setNavigation({ prevEl: prevButton.current, nextEl: nextButton.current })
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
    },
  }

  return (
    <section id="home" className="relative isolate min-h-[100dvh] w-full overflow-hidden bg-slate-950">
      {/* Background Floating Architectural Accents */}
      <div className="pointer-events-none absolute inset-0 z-10 overflow-hidden">
        {heroShapes.map((shape) => (
          <motion.svg
            key={shape.id}
            viewBox="0 0 100 100"
            className="absolute hidden md:block"
            style={{
              left: shape.left,
              top: shape.top,
              width: shape.size,
              height: shape.size,
              opacity: shape.opacity,
            }}
            animate={{
              y: ['0%', '-14%', '0%'],
              rotate: [0, 8, -6, 0],
            }}
            transition={{
              duration: shape.duration,
              repeat: Infinity,
              repeatType: 'reverse',
              ease: 'easeInOut',
            }}
          >
            {shape.path}
          </motion.svg>
        ))}
      </div>

      <Swiper
        modules={[Navigation, Pagination, Autoplay, EffectFade]}
        spaceBetween={0}
        slidesPerView={1}
        loop
        effect="fade"
        autoHeight={true}
        autoplay={{ delay: 7000, disableOnInteraction: false }}
        navigation={navigation}
        pagination={{
          clickable: true,
          renderBullet: (index, className) => {
            return `<span class="${className} !w-8 !h-1.5 !rounded-full transition-all duration-300"></span>`
          },
        }}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        onBeforeInit={(swiper) => {
          swiper.params.navigation.prevEl = prevButton.current
          swiper.params.navigation.nextEl = nextButton.current
        }}
        className="h-full min-h-[100dvh] w-full"
      >
        {slides.map((property, idx) => (
          <SwiperSlide key={property.id} className="relative min-h-[100dvh] w-full">
            {/* Background Property Imagery */}
            <div className="absolute inset-0 h-full w-full overflow-hidden">
              <motion.img
                src={property.cover}
                alt={property.title}
                className="h-full w-full object-cover object-center"
                initial={{ scale: 1.08 }}
                animate={{ scale: activeIndex === idx ? 1 : 1.04 }}
                transition={{ duration: 7, ease: 'easeOut' }}
              />

              {/* Multi-layered Cinematic Gradients for Contrast & Legibility */}
              <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/75 to-slate-950/30 lg:from-slate-950/90 lg:via-slate-950/60 lg:to-slate-950/20" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-slate-950/50" />
              <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-slate-950/80 to-transparent" />
            </div>

            {/* Responsive Hero Content Container */}
            <div className="relative z-20 mx-auto flex min-h-[100dvh] max-w-7xl flex-col justify-center px-4 pb-20 pt-28 sm:px-6 sm:pb-24 sm:pt-32 lg:px-8 lg:pb-16 lg:pt-32">
              <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-12">
                {/* ─────────────────────────────
                    LEFT COLUMN: BRAND HERO NARRATIVE
                ───────────────────────────── */}
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="space-y-6 lg:col-span-7 xl:col-span-7"
                >
                  {/* Eyebrow Badge */}
                  <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-3">
                    <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.26em] text-slate-200 backdrop-blur-md shadow-sm">
                      <span className="relative flex h-2 w-2">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[color:var(--brand)] opacity-75" />
                        <span className="relative inline-flex h-2 w-2 rounded-full bg-[color:var(--brand)]" />
                      </span>
                      <span>Await Apartment Signature</span>
                    </div>

                    <span className="rounded-full border border-[color:var(--brand)]/30 bg-[color:var(--brand)]/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--brand)] backdrop-blur-md">
                      Luxury Living
                    </span>
                  </motion.div>

                  {/* Compelling Main Headline */}
                  <motion.div variants={itemVariants} className="space-y-2">
                    <p className="text-xs font-semibold uppercase tracking-[0.34em] text-[color:var(--brand)]">
                      Curated Residential Portfolio
                    </p>
                    <h1 className="font-serif text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl xl:text-[64px] xl:leading-[1.12]">
                      Find a Place You&apos;ll Love to Call Home.
                    </h1>
                  </motion.div>

                  {/* Narrative Subtitle */}
                  <motion.p
                    variants={itemVariants}
                    className="max-w-2xl text-base font-normal leading-relaxed text-slate-300 sm:text-lg lg:text-slate-300"
                  >
                    Explore our premier portfolio of architectural coastal estates, modern pavilions,
                    and refined sanctuaries crafted for discerning lifestyle and lasting value.
                  </motion.p>

                  {/* Trust & Portfolio Metrics */}
                  <motion.div
                    variants={itemVariants}
                    className="grid grid-cols-3 gap-3 border-y border-white/10 py-4 sm:gap-6 sm:py-5"
                  >
                    <div>
                      <p className="font-serif text-2xl font-bold text-white sm:text-3xl">$1.2B+</p>
                      <p className="mt-1 text-[11px] uppercase tracking-[0.24em] text-slate-400">Portfolio</p>
                    </div>
                    <div>
                      <p className="font-serif text-2xl font-bold text-white sm:text-3xl">100%</p>
                      <p className="mt-1 text-[11px] uppercase tracking-[0.24em] text-slate-400">Curated Estates</p>
                    </div>
                    <div>
                      <p className="font-serif text-2xl font-bold text-white sm:text-3xl">4.9★</p>
                      <p className="mt-1 text-[11px] uppercase tracking-[0.24em] text-slate-400">Client Trust</p>
                    </div>
                  </motion.div>

                  {/* Clear Call-To-Action Buttons */}
                  <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-4 pt-2">
                    <a
                      href="#projects"
                      className="group inline-flex items-center gap-3 rounded-full bg-[color:var(--brand)] px-7 py-3.5 text-xs font-bold uppercase tracking-[0.22em] text-[color:var(--brand-contrast)] shadow-xl shadow-[color:var(--brand)]/25 transition-all duration-300 hover:brightness-110 hover:shadow-[color:var(--brand)]/40 hover:scale-[1.02] active:scale-[0.98]"
                    >
                      <span>Explore Properties</span>
                      <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1" />
                    </a>

                    <a
                      href="#contact"
                      className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3.5 text-xs font-semibold uppercase tracking-[0.22em] text-white backdrop-blur-md transition-all duration-300 hover:border-white/40 hover:bg-white/10 hover:scale-[1.02] active:scale-[0.98]"
                    >
                      <span>Get Started</span>
                    </a>
                  </motion.div>
                </motion.div>

                {/* ─────────────────────────────
                    RIGHT COLUMN: HERO INFORMATION CARD WITH
                    CONTINUOUS ROTATING MULTICOLOR GRADIENT BORDER
                ───────────────────────────── */}
                <motion.div
                  initial={{ opacity: 0, y: 30, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="lg:col-span-5 xl:col-span-5"
                >
                  {/* Rotating Multicolor Gradient Border Wrapper */}
                  <div className="hero-gradient-border-wrapper">
                    {/* Inner Glass Card */}
                    <div className="relative overflow-hidden rounded-[30px] bg-slate-950/85 p-6 shadow-2xl backdrop-blur-2xl sm:p-7">
                      {/* Subtle Interior Glow */}
                      <div className="pointer-events-none absolute -right-20 -top-20 h-44 w-44 rounded-full bg-[color:var(--brand)]/15 blur-3xl" />

                      <div className="relative space-y-5">
                        {/* Status Bar & Index Tag */}
                        <div className="flex items-center justify-between gap-2">
                          <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-emerald-400">
                            <Sparkles size={12} />
                            {property.status}
                          </span>

                          <span className="text-xs font-mono font-medium tracking-widest text-slate-400">
                            0{idx + 1} / 0{slides.length}
                          </span>
                        </div>

                        {/* Title & City */}
                        <div className="space-y-1.5">
                          <h2 className="font-serif text-2xl font-bold tracking-tight text-white sm:text-3xl">
                            {property.title}
                          </h2>
                          <div className="flex items-center gap-1.5 text-sm text-slate-400">
                            <MapPin size={14} className="text-[color:var(--brand)]" />
                            <span>{property.city}</span>
                          </div>
                        </div>

                        {/* Specs Grid */}
                        <div className="grid grid-cols-3 gap-2.5 rounded-2xl border border-white/10 bg-white/5 p-3 text-center sm:p-3.5">
                          <div className="flex flex-col items-center justify-center">
                            <BedDouble size={16} className="text-[color:var(--brand)] mb-1" />
                            <span className="font-serif text-base font-bold text-white">{property.beds}</span>
                            <span className="text-[10px] uppercase tracking-wider text-slate-400">Beds</span>
                          </div>
                          <div className="flex flex-col items-center justify-center border-x border-white/10">
                            <Bath size={16} className="text-[color:var(--brand)] mb-1" />
                            <span className="font-serif text-base font-bold text-white">{property.baths}</span>
                            <span className="text-[10px] uppercase tracking-wider text-slate-400">Baths</span>
                          </div>
                          <div className="flex flex-col items-center justify-center">
                            <Maximize2 size={15} className="text-[color:var(--brand)] mb-1" />
                            <span className="font-serif text-base font-bold text-white">{property.size}</span>
                            <span className="text-[10px] uppercase tracking-wider text-slate-400">Area</span>
                          </div>
                        </div>

                        {/* Property Overview */}
                        <p className="line-clamp-3 text-xs leading-relaxed text-slate-300 sm:text-sm">
                          {property.overview}
                        </p>

                        {/* Amenities Tags */}
                        {property.amenities && (
                          <div className="flex flex-wrap gap-1.5">
                            {property.amenities.slice(0, 3).map((amenity) => (
                              <span
                                key={amenity}
                                className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[10px] font-medium tracking-wide text-slate-300"
                              >
                                {amenity}
                              </span>
                            ))}
                          </div>
                        )}

                        {/* Price & Modal Trigger */}
                        <div className="flex items-center justify-between border-t border-white/10 pt-4">
                          <div>
                            <span className="text-[10px] uppercase tracking-[0.24em] text-slate-400">Market Value</span>
                            <p className="font-serif text-2xl font-bold tracking-tight text-white sm:text-[26px]">
                              {property.price}
                            </p>
                          </div>

                          <button
                            type="button"
                            onClick={() => setSelectedProperty(property)}
                            className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white transition-all duration-300 hover:border-[color:var(--brand)] hover:bg-[color:var(--brand)] hover:text-[color:var(--brand-contrast)] active:scale-95"
                          >
                            <Eye size={13} />
                            <span>Quick View</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Slide Navigation Controls */}
      <div className="absolute bottom-6 right-6 z-30 hidden items-center gap-3 sm:bottom-8 sm:right-8 sm:flex lg:bottom-10 lg:right-12">
        <button
          ref={prevButton}
          aria-label="Previous property slide"
          className="flex h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-slate-950/70 text-white shadow-xl backdrop-blur-md transition-all duration-300 hover:border-white/40 hover:bg-[color:var(--brand)] hover:scale-105 active:scale-95"
        >
          <ChevronLeft size={22} />
        </button>

        <button
          ref={nextButton}
          aria-label="Next property slide"
          className="flex h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-slate-950/70 text-white shadow-xl backdrop-blur-md transition-all duration-300 hover:border-white/40 hover:bg-[color:var(--brand)] hover:scale-105 active:scale-95"
        >
          <ChevronRight size={22} />
        </button>
      </div>

      {/* Property Details Modal when clicked from Hero */}
      <AnimatePresence>
        {selectedProperty && (
          <PropertyModal
            property={selectedProperty}
            onClose={() => setSelectedProperty(null)}
          />
        )}
      </AnimatePresence>
    </section>
  )
}

export default HeroSlider
