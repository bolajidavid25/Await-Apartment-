import { useEffect, useRef, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/effect-fade'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import properties from '../data/properties'

const heroShapes = [
  {
    id: 'circle-large',
    left: '6%',
    top: '12%',
    size: 132,
    opacity: 0.24,
    duration: 18,
    delay: 0,
    path: <circle cx="50" cy="50" r="36" fill="rgba(14,165,164,0.18)" stroke="rgba(14,165,164,0.35)" strokeWidth="4" />,
  },
  {
    id: 'rounded-square',
    left: '18%',
    top: '30%',
    size: 92,
    opacity: 0.18,
    duration: 16,
    delay: 0.5,
    path: <rect x="18" y="18" width="64" height="64" rx="18" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.18)" strokeWidth="3" />,
  },
  {
    id: 'diamond',
    left: '72%',
    top: '16%',
    size: 96,
    opacity: 0.2,
    duration: 14,
    delay: 1,
    path: <polygon points="50,10 90,50 50,90 10,50" fill="rgba(14,165,164,0.14)" stroke="rgba(14,165,164,0.4)" strokeWidth="3" />,
  },
  {
    id: 'ring',
    left: '82%',
    top: '55%',
    size: 110,
    opacity: 0.16,
    duration: 20,
    delay: 0.3,
    path: <circle cx="50" cy="50" r="36" fill="none" stroke="rgba(255,255,255,0.22)" strokeWidth="6" />,
  },
  {
    id: 'plus',
    left: '38%',
    top: '10%',
    size: 56,
    opacity: 0.22,
    duration: 12,
    delay: 0.6,
    path: (
      <g fill="rgba(255,255,255,0.85)">
        <rect x="24" y="10" width="12" height="80" rx="6" />
        <rect x="10" y="24" width="80" height="12" rx="6" />
      </g>
    ),
  },
  {
    id: 'hexagon',
    left: '52%',
    top: '68%',
    size: 86,
    opacity: 0.16,
    duration: 19,
    delay: 0.8,
    path: <polygon points="50,10 78,30 78,70 50,90 22,70 22,30" fill="rgba(14,165,164,0.12)" stroke="rgba(255,255,255,0.22)" strokeWidth="3" />,
  },
]

const HeroBackground = () => (
  <div className="pointer-events-none absolute inset-0 overflow-hidden">
    {heroShapes.map((shape) => (
      <motion.svg
        key={shape.id}
        viewBox="0 0 100 100"
        className="absolute"
        style={{ left: shape.left, top: shape.top, width: shape.size, height: shape.size, opacity: shape.opacity }}
        animate={{
          x: ['0%', '18%', '0%'],
          y: ['0%', '-12%', '0%'],
          rotate: [0, 12, -8, 0],
          scale: [1, 1.04, 0.98, 1],
        }}
        transition={{
          duration: shape.duration,
          delay: shape.delay,
          repeat: Infinity,
          repeatType: 'reverse',
          ease: 'easeInOut',
        }}
      >
        {shape.path}
      </motion.svg>
    ))}
  </div>
)

const GeminiBorder = () => (
  <div className="absolute inset-0 rounded-[32px] pointer-events-none">
    <div className="gemini-border" aria-hidden="true" />
  </div>
)

const HeroSlider = () => {
  const [navigation, setNavigation] = useState({ prevEl: null, nextEl: null })
  const prevButton = useRef(null)
  const nextButton = useRef(null)
  const slides = properties.slice(0, 5)

  useEffect(() => {
    setNavigation({ prevEl: prevButton.current, nextEl: nextButton.current })
  }, [])

  return (
    <section id="home" className="relative isolate min-h-[100vh] overflow-hidden pt-0">
      <Swiper
        modules={[Navigation, Pagination, Autoplay, EffectFade]}
        spaceBetween={24}
        slidesPerView={1}
        loop
        effect="fade"
        autoplay={{ delay: 6500, disableOnInteraction: false }}
        navigation={navigation}
        pagination={{ clickable: true }}
        onBeforeInit={(swiper) => {
          swiper.params.navigation.prevEl = prevButton.current
          swiper.params.navigation.nextEl = nextButton.current
        }}
      >
        {slides.map((property) => (
          <SwiperSlide key={property.id}>
            <div className="relative h-[100vh] w-full overflow-hidden">
              <img src={property.cover} alt={property.title} className="absolute inset-0 h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/35 to-transparent" />

              <div className="absolute left-4 top-[22%] z-20 w-[min(540px,calc(100%-2rem))] sm:left-8 sm:top-[24%] sm:w-[min(560px,calc(100%-3rem))] lg:left-16 lg:top-[22%] lg:w-[min(520px,calc(100%-4rem))]">
                <motion.div
                  whileHover={{ y: -6, scale: 1.01 }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                  className="relative overflow-hidden rounded-[32px] border border-white/10 bg-slate-950/70 p-6 shadow-2xl shadow-slate-950/40 backdrop-blur-sm sm:p-7 lg:p-8"
                >
                  <HeroBackground />
                  <GeminiBorder />
                  <div className="relative space-y-5">
                    <div className="flex flex-wrap items-center gap-3 text-sm uppercase tracking-[0.25em] text-slate-300">
                      <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2">Await Apartment Signature</span>
                      <span className="rounded-full border border-[color:var(--brand)]/20 bg-[color:var(--brand)]/10 px-4 py-2 text-[color:var(--brand)]">Limited release</span>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <p className="text-sm uppercase tracking-[0.35em] text-[color:var(--brand)]">Premium listing</p>
                        <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">{property.title}</h1>
                        <p className="mt-2 text-lg text-slate-300">{property.city}</p>
                      </div>

                      <div className="flex flex-wrap items-center gap-4 text-sm text-slate-300">
                        <span className="rounded-3xl bg-white/5 px-4 py-3">{property.beds} Beds</span>
                        <span className="rounded-3xl bg-white/5 px-4 py-3">{property.baths} Baths</span>
                        <span className="rounded-3xl bg-white/5 px-4 py-3">{property.size}</span>
                      </div>

                      <p className="max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
                        {property.overview}
                      </p>

                      <div className="flex flex-wrap gap-4">
                        <a href="#projects" className="rounded-full bg-[color:var(--brand)] px-6 py-3 text-sm font-semibold uppercase tracking-[0.22em] text-[color:var(--brand-contrast)] transition hover:bg-[color:var(--brand)]/90">
                          Explore Properties
                        </a>
                        <a href="#contact" className="rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm uppercase tracking-[0.22em] text-slate-100 transition hover:border-[color:var(--brand)] hover:text-[color:var(--brand)]">
                          Book Inspection
                        </a>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>

              <div className="absolute bottom-10 left-6 flex items-center gap-3 sm:left-10 lg:left-16">
                <button ref={prevButton} className="rounded-full border border-white/10 bg-slate-900/70 p-3 text-slate-100 shadow-xl transition hover:bg-slate-800">
                  <ChevronLeft size={24} />
                </button>
                <button ref={nextButton} className="rounded-full border border-white/10 bg-slate-900/70 p-3 text-slate-100 shadow-xl transition hover:bg-slate-800">
                  <ChevronRight size={24} />
                </button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  )
}

export default HeroSlider

