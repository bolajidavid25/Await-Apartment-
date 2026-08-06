import { useEffect, useMemo, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import properties from '../data/properties'
import PropertyModal from './PropertyModal'

const Projects = () => {
  const [expanded, setExpanded] = useState(false)
  const [selectedProperty, setSelectedProperty] = useState(null)
  const [activeSlide, setActiveSlide] = useState(0)
  const [navigation, setNavigation] = useState({ prevEl: null, nextEl: null })
  const prevRef = useRef(null)
  const nextRef = useRef(null)
  const visibleProperties = useMemo(() => (expanded ? properties : properties.slice(0, 4)), [expanded])

  useEffect(() => {
    setNavigation({ prevEl: prevRef.current, nextEl: nextRef.current })
  }, [])

  return (
    <section id="projects" className="bg-slate-950 py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-12 flex flex-col gap-6 text-center sm:text-left">
          <div className="space-y-3">
            <p className="text-sm uppercase tracking-[0.35em] text-[color:var(--brand)]/80">Properties</p>
            <h2 className="text-4xl font-semibold text-white sm:text-5xl">A collection of thoughtfully curated luxury homes.</h2>
          </div>
          <p className="mx-auto max-w-2xl text-base leading-8 text-slate-400 sm:mx-0 sm:text-lg">
            Explore premium residences with unified design, refined craftsmanship, and strategic opportunity in the most coveted locations.
          </p>
        </div>

        <div className="relative">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={32}
            slidesPerView="auto"
            centeredSlides
            loop
            autoplay={{ delay: 5600, disableOnInteraction: true, pauseOnMouseEnter: true }}
            pagination={{ clickable: true }}
            navigation={navigation}
            onBeforeInit={(swiper) => {
              swiper.params.navigation.prevEl = prevRef.current
              swiper.params.navigation.nextEl = nextRef.current
            }}
            onSlideChange={(swiper) => setActiveSlide(swiper.realIndex)}
            className="mx-auto overflow-visible pb-16"
          >
            {visibleProperties.map((property, index) => (
              <SwiperSlide key={property.id} className="w-[95vw] sm:w-[90vw] lg:w-[85vw] xl:w-[78vw]">
                <motion.button
                  type="button"
                  onClick={() => setSelectedProperty(property)}
                  whileHover={{ y: -8 }}
                  animate={{ scale: activeSlide === index ? 1 : 0.98, opacity: activeSlide === index ? 1 : 0.92 }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                  className="group relative flex min-h-[600px] overflow-hidden rounded-[32px] border border-white/10 bg-slate-900/90 shadow-2xl shadow-slate-950/30 transition duration-300 focus:outline-none lg:min-h-[680px]"
                >
                  <div className="grid w-full gap-6 lg:grid-cols-[0.7fr_0.3fr]">
                    <motion.div
                      whileHover={{ scale: 1.04 }}
                      transition={{ duration: 0.45, ease: 'easeOut' }}
                      className="relative overflow-hidden rounded-[32px] bg-slate-950"
                    >
                      <img src={property.cover} alt={property.title} className="h-[420px] w-full object-cover sm:h-[520px] lg:h-full" />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                      <span className="absolute left-6 top-6 rounded-full border border-white/10 bg-[color:var(--brand)]/90 px-5 py-3 text-xs font-semibold uppercase tracking-[0.25em] text-[color:var(--brand-contrast)] shadow-lg shadow-slate-950/20">
                        {property.status}
                      </span>
                    </motion.div>

                    <div className="flex flex-col justify-between rounded-[32px] p-8 lg:p-10">
                      <div className="space-y-5">
                        <p className="text-sm uppercase tracking-[0.32em] text-[color:var(--brand)]/80">Luxury residence</p>
                        <div className="space-y-4">
                          <h3 className="text-4xl font-semibold tracking-tight text-white">{property.title}</h3>
                          <p className="text-lg text-slate-300">{property.city}</p>
                        </div>
                        <p className="text-sm leading-7 text-slate-400">{property.overview}</p>
                      </div>

                      <div className="grid gap-3 text-sm text-slate-300">
                        <div className="rounded-[28px] border border-white/10 bg-slate-950/80 p-5">
                          <p className="text-2xl font-semibold text-white">{property.price}</p>
                          <p className="mt-2 uppercase tracking-[0.28em] text-slate-400">Market value</p>
                        </div>
                        <div className="flex flex-wrap gap-3 text-sm">
                          <span className="rounded-3xl bg-white/5 px-4 py-3">{property.beds} Beds</span>
                          <span className="rounded-3xl bg-white/5 px-4 py-3">{property.baths} Baths</span>
                          <span className="rounded-3xl bg-white/5 px-4 py-3">{property.size}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.button>
              </SwiperSlide>
            ))}
          </Swiper>

          <div className="pointer-events-none absolute inset-x-0 top-1/2 z-10 flex items-center justify-between px-6 xl:px-0">
            <button
              ref={prevRef}
              className="pointer-events-auto inline-flex h-14 w-14 items-center justify-center rounded-full border border-white/10 bg-slate-950/90 text-white shadow-2xl shadow-black/30 transition hover:bg-slate-900"
              aria-label="Previous property"
            >
              ‹
            </button>
            <button
              ref={nextRef}
              className="pointer-events-auto inline-flex h-14 w-14 items-center justify-center rounded-full border border-white/10 bg-slate-950/90 text-white shadow-2xl shadow-black/30 transition hover:bg-slate-900"
              aria-label="Next property"
            >
              ›
            </button>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row sm:justify-between">
          <p className="text-sm text-slate-400">{expanded ? `Showing all ${properties.length} properties` : `Showing 4 of ${properties.length} properties`}</p>
          <button
            type="button"
            onClick={() => setExpanded((open) => !open)}
            className="rounded-full border border-white/10 bg-slate-900/80 px-6 py-3 text-sm font-semibold uppercase tracking-[0.22em] text-white transition hover:border-[color:var(--brand)] hover:text-[color:var(--brand)]"
          >
            {expanded ? 'Show Less' : 'View More Properties'}
          </button>
        </div>
      </div>

      <PropertyModal property={selectedProperty} onClose={() => setSelectedProperty(null)} />
    </section>
  )
}

export default Projects

