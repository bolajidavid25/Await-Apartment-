import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Search, CalendarCheck, MessageCircle, ShieldCheck } from 'lucide-react'

const steps = [
  {
    id: 'browse',
    icon: Search,
    title: 'Browse Properties',
    description:
      'Explore carefully curated apartments and homes tailored to your lifestyle, budget, and preferred location.',
    cta: { label: 'Explore Properties →', href: '#projects' },
  },
  {
    id: 'book',
    icon: CalendarCheck,
    title: 'Book an Inspection',
    description:
      'Schedule a physical or virtual inspection at a convenient time with one of our experienced property advisors.',
    cta: { label: 'Schedule Viewing →', href: '#contact' },
  },
  {
    id: 'advisor',
    icon: MessageCircle,
    title: 'Meet Your Advisor',
    description:
      'Receive expert guidance, property recommendations, financing insights, and personalized assistance throughout your journey.',
    cta: { label: 'Speak to an Advisor →', href: '#contact' },
  },
  {
    id: 'secure',
    icon: ShieldCheck,
    title: 'Secure Your Home',
    description:
      'Finalize your apartment with confidence through a secure and transparent process supported by our dedicated team.',
    cta: { label: 'Get Started →', href: '#contact' },
  },
]

const HowItWorks = () => {
  const prefersReducedMotion = useReducedMotion()
  const [flipped, setFlipped] = useState(null)

  const handleCardToggle = (id) => {
    setFlipped((current) => (current === id ? null : id))
  }

  return (
    <section id="how" className="relative mb-24 overflow-hidden bg-slate-950 py-24 sm:mb-28 sm:py-32 lg:mb-32">
      <div className="absolute inset-x-0 top-0 h-44 bg-gradient-to-b from-[color:var(--brand)]/10 to-transparent" aria-hidden="true" />
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.8, ease: 'easeOut' }}
          className="mx-auto max-w-3xl text-center"
        >
          <p className="text-sm uppercase tracking-[0.35em] text-[color:var(--brand)]/80">How It Works</p>
          <h2 className="mt-5 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            Finding your dream apartment has never been easier.
          </h2>
          <p className="mt-6 text-base leading-8 text-slate-300 sm:text-lg">
            Follow these four simple steps.
          </p>
        </motion.div>

        <div className="mt-16 grid gap-8 lg:grid-cols-4 xl:gap-10">
          {steps.map((step) => {
            const Icon = step.icon
            const isFlipped = flipped === step.id

            return (
              <motion.button
                key={step.id}
                type="button"
                onMouseEnter={() => setFlipped(step.id)}
                onMouseLeave={() => setFlipped(null)}
                onClick={() => handleCardToggle(step.id)}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                className="group relative h-[460px] overflow-hidden rounded-[32px] border border-slate-200/70 bg-[#f8f4ec]/95 p-1 shadow-[0_30px_85px_-40px_rgba(15,23,42,0.35)] backdrop-blur-xl transition-all duration-500 hover:border-[color:var(--brand)]/30 sm:h-[480px]"
                style={{ perspective: 1400 }}
              >
                <motion.div
                  animate={{ rotateY: isFlipped ? 180 : 0 }}
                  transition={{ duration: prefersReducedMotion ? 0 : 0.72, ease: 'easeInOut' }}
                  style={{ transformStyle: 'preserve-3d', height: '100%' }}
                  className="relative h-full"
                >
                  <div
                    className="absolute inset-0 flex flex-col justify-between rounded-[30px] border border-slate-200/80 bg-[#f8f4ec] px-6 py-7 text-left text-slate-900 shadow-inner shadow-slate-200/70 backdrop-blur-xl sm:px-8 sm:py-8"
                    style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
                  >
                    <div className="space-y-6">
                      <div className="inline-flex h-16 w-16 items-center justify-center rounded-3xl bg-[color:var(--brand)]/10 text-[color:var(--brand)] shadow-lg shadow-[rgba(14,165,164,0.12)]">
                        <Icon size={34} />
                      </div>
                      <div>
                        <p className="text-sm uppercase tracking-[0.35em] text-slate-500">Step {steps.indexOf(step) + 1}</p>
                        <h3 className="mt-3 text-2xl font-semibold text-slate-950">{step.title}</h3>
                      </div>
                    </div>
                    <div className="text-sm text-slate-600">Tap to reveal more.</div>
                  </div>

                  <div
                    className="absolute inset-0 flex flex-col justify-between rounded-[30px] border border-white/20 px-6 py-7 text-left text-white shadow-[0_30px_80px_-35px_rgba(14,165,164,0.55)] sm:px-8 sm:py-8"
                    style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden', transform: 'rotateY(180deg)', background: 'linear-gradient(135deg, #FF1F6D 0%, #FF753E 18%, #FFAA01 35%, #412FA6 60%, #2D6CBF 80%, #00BCAB 100%)' }}
                  >
                    <div className="flex flex-1 flex-col justify-center gap-5">
                      <div className="inline-flex h-16 w-16 items-center justify-center rounded-3xl bg-white/20 text-white shadow-lg shadow-slate-950/20 backdrop-blur-sm">
                        <Icon size={34} />
                      </div>
                      <div>
                        <p className="text-sm uppercase tracking-[0.35em] text-white/80">Step {steps.indexOf(step) + 1}</p>
                        <h3 className="mt-3 text-2xl font-semibold text-white">{step.title}</h3>
                      </div>
                      <p className="text-base leading-8 text-white/95">{step.description}</p>
                    </div>
                    <a
                      href={step.cta.href}
                      className="mt-4 inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold uppercase tracking-[0.22em] text-slate-950 shadow-lg shadow-slate-950/10 transition duration-300 hover:-translate-y-1 hover:bg-slate-100"
                    >
                      {step.cta.label}
                    </a>
                  </div>
                </motion.div>
              </motion.button>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default HowItWorks
