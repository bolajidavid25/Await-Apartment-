import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import house1 from '../house 1.jpg'
import house2 from '../house 2.jpg'
import house3 from '../house 3.jpg'
import house4 from '../house 4.jpg'
import house5 from '../house 5.jpg'

const slides = [
  {
    id: 1,
    image: house1,
    price: '$1,250,000',
    title: 'Oceanfront Modern Estate',
    location: 'Malibu, California',
    features: ['4 Beds', '5 Baths', 'Smart Automation'],
    highlight: 'White-glove concierge service included',
  },
  {
    id: 2,
    image: house2,
    price: '$2,180,000',
    title: 'Signature City Penthouse',
    location: 'Downtown Miami',
    features: ['3 Beds', '4 Baths', 'Rooftop Pool'],
    highlight: '24/7 executive privacy guarantee',
  },
  {
    id: 3,
    image: house3,
    price: '$3,400,000',
    title: 'Private Mountain Retreat',
    location: 'Aspen, Colorado',
    features: ['5 Beds', '6 Baths', 'Spa Wing'],
    highlight: 'Bespoke design and secure community',
  },
  {
    id: 4,
    image: house4,
    price: '$1,980,000',
    title: 'Garden Court Villa',
    location: 'Beverly Hills',
    features: ['4 Beds', '5 Baths', 'Artisan Interiors'],
    highlight: 'Premier client investment advisory',
  },
  {
    id: 5,
    image: house5,
    price: '$2,750,000',
    title: 'Coastal Luxury Residence',
    location: 'Orange County',
    features: ['4 Beds', '5 Baths', 'Wine Cellar'],
    highlight: 'Guaranteed market premium performance',
  },
]

const HeroSlider = () => {
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % slides.length)
    }, 7000)
    return () => clearInterval(interval)
  }, [])

  const activeSlide = slides[activeIndex]

  return (
    <section id="home" className="relative min-h-screen overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={activeSlide.id}
          initial={{ opacity: 0, scale: 1.02 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.9 }}
          className="absolute inset-0"
        >
          <img
            src={activeSlide.image}
            alt={activeSlide.title}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/30 to-transparent" />
        </motion.div>
      </AnimatePresence>

      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-6 pb-24 pt-24 text-white sm:px-10 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
          className="max-w-3xl space-y-6"
        >
          <span className="inline-flex rounded-full border border-emerald-300/50 bg-slate-900/70 px-4 py-2 text-sm uppercase tracking-[0.35em] text-emerald-200">
            Elite Residential Collection
          </span>
          <h1 className="text-4xl font-semibold leading-tight sm:text-6xl">
            Discover homes where bold design meets timeless investment.
          </h1>
          <p className="max-w-xl text-lg text-slate-200 sm:text-xl">
            We curate iconic luxury estates across the most desirable markets, with tailored guidance and white-glove support for every client.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.9, ease: 'easeOut' }}
          className="mt-12 grid gap-6 rounded-[2rem] border border-white/10 bg-slate-950/80 p-8 shadow-2xl shadow-slate-950/40 backdrop-blur-xl lg:max-w-4xl"
        >
          <div className="flex flex-wrap items-center justify-between gap-6">
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-emerald-300/90">
                Featured Listing
              </p>
              <h2 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">
                {activeSlide.title}
              </h2>
              <p className="mt-2 text-slate-300">{activeSlide.location}</p>
            </div>
            <div className="rounded-3xl bg-emerald-500/15 px-5 py-4 text-right text-sm text-emerald-100 backdrop-blur-sm">
              <p className="text-2xl font-semibold">{activeSlide.price}</p>
              <p className="mt-1 uppercase tracking-[0.3em] text-emerald-200/90">Premium Value</p>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <ul className="space-y-3 text-slate-200">
              {activeSlide.features.map((feature) => (
                <li key={feature} className="flex items-center gap-3 text-sm sm:text-base">
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-400/10 text-emerald-300 ring-1 ring-emerald-300/20">
                    ✓
                  </span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            <div className="rounded-3xl bg-slate-900/80 p-5 text-slate-200 ring-1 ring-white/10 sm:p-7">
              <p className="text-sm uppercase tracking-[0.35em] text-emerald-300/80">Client Guarantee</p>
              <p className="mt-3 text-lg leading-8 text-slate-100">{activeSlide.highlight}</p>
              <p className="mt-4 text-sm text-slate-400">Every introduction includes market-grade analysis, portfolio planning, and a private onboarding concierge.</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
            <p className="text-sm text-slate-400">Slide {activeIndex + 1} of {slides.length}</p>
            <div className="flex items-center gap-3">
              {slides.map((slide, index) => (
                <button
                  key={slide.id}
                  onClick={() => setActiveIndex(index)}
                  aria-label={`Show slide ${index + 1}`}
                  className={`h-3 w-3 rounded-full transition ${activeIndex === index ? 'bg-emerald-300' : 'bg-white/30 hover:bg-white/60'}`}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default HeroSlider
