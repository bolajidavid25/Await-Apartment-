import { motion, useReducedMotion } from 'framer-motion'
import {
  ShieldCheck,
  Building2,
  CalendarCheck,
  Headset,
  Sparkles,
  BadgeCheck,
} from 'lucide-react'

// Trusted partner logos
import adron from '../assets/trusted/adron trust_no_bg.png'
import berkshire from '../assets/trusted/berkshire trust_no_bg.png'
import bhLogo from '../assets/trusted/BH-Logo trust_no_bg.png'
import century from '../assets/trusted/century 12 trust_no_bg.png'
import codwell from '../assets/trusted/codwell trust_no_bg.png'
import keller from '../assets/trusted/keller trust_no_bg.png'
import landwey from '../assets/trusted/Landwey-Orange trust_no_bg.png'
import revolution from '../assets/trusted/revolution trust_no_bg.png'
import sujimoto from '../assets/trusted/Sujimoto-project trust_no_bg.png'
import zylus from '../assets/trusted/zylus trust_no_bg.png'

const indicators = [
  {
    icon: BadgeCheck,
    label: '500+ Verified Properties',
  },
  {
    icon: Building2,
    label: 'Trusted Property Advisors',
  },
  {
    icon: ShieldCheck,
    label: 'Secure Transactions',
  },
  {
    icon: CalendarCheck,
    label: 'Virtual & Physical Inspections',
  },
  {
    icon: Headset,
    label: 'Dedicated Customer Support',
  },
  {
    icon: Sparkles,
    label: 'Premium Residential Listings',
  },
]

const logos = [
  adron,
  berkshire,
  bhLogo,
  century,
  codwell,
  keller,
  landwey,
  revolution,
  sujimoto,
  zylus,
]

console.log('Trusted logos:', logos)

const TrustedBySection = () => {
  const prefersReducedMotion = useReducedMotion()

  return (
    <section className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{
            duration: prefersReducedMotion ? 0 : 0.8,
            ease: 'easeOut',
          }}
          className="mx-auto max-w-3xl text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight color- white text-slate-900 sm:text-4xl">
            Trusted by Leading Partners
          </h2>

          <p className="mt-4 text-base leading-7 text-slate-600 sm:text-lg">
            We proudly collaborate with trusted organizations, developers,
            and industry-leading partners committed to delivering exceptional
            living experiences.
          </p>
        </motion.div>

        {/* Trusted Logos + Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{
            duration: prefersReducedMotion ? 0 : 0.85,
            delay: 0.1,
          }}
          className="mt-14 overflow-hidden rounded-[40px] border border-slate-200 bg-slate-50 p-6 shadow-lg shadow-slate-200/20 sm:p-8"
        >

          {/* Logo Marquee */}
          <div className="marquee-wrapper overflow-hidden rounded-[28px] bg-white/70 px-4 py-6 shadow-inner shadow-slate-200/40 sm:px-6">
            <div className="marquee-track">

              {/* First set */}
              <div className="marquee-group">
                {logos.map((src, index) => (
                  <div
                    key={`first-${src}-${index}`}
                    className="marquee-item"
                  >
                    <div className="flex h-20 items-center justify-center rounded-[24px] border border-slate-200/80 bg-white px-6 py-4 shadow-sm shadow-slate-200/50">
                      <img
                        src={src}
                        alt="Trusted partner logo"
                        className="h-14 max-h-[70px] w-auto object-contain transition duration-300"
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Identical second set */}
              <div className="marquee-group" aria-hidden="true">
                {logos.map((src, index) => (
                  <div
                    key={`second-${src}-${index}`}
                    className="marquee-item"
                  >
                    <div className="flex h-20 items-center justify-center rounded-[24px] border border-slate-200/80 bg-white px-6 py-4 shadow-sm shadow-slate-200/50">
                      <img
                        src={src}
                        alt=""
                        className="h-14 max-h-[70px] w-auto object-contain transition duration-300"
                      />
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </div>

          {/* Trust Indicators */}
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {indicators.map((item) => {
              const Icon = item.icon

              return (
                <motion.div
                  key={item.label}
                  whileHover={{
                    y: -4,
                    scale: 1.01,
                  }}
                  transition={{
                    duration: prefersReducedMotion ? 0 : 0.3,
                    ease: 'easeOut',
                  }}
                  className="group flex items-start gap-4 rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm transition"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-3xl bg-[color:var(--brand)]/10 text-[color:var(--brand)] shadow-sm shadow-[rgba(14,165,164,0.12)]">
                    <Icon size={20} />
                  </div>

                  <p className="text-base font-semibold text-slate-900">
                    {item.label}
                  </p>
                </motion.div>
              )
            })}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default TrustedBySection