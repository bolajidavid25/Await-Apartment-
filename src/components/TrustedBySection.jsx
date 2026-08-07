import { motion, useReducedMotion } from 'framer-motion'
import { ShieldCheck, Building2, CalendarCheck, Headset, Sparkles, BadgeCheck } from 'lucide-react'

const indicators = [
  { icon: BadgeCheck, label: '500+ Verified Properties' },
  { icon: Building2, label: 'Trusted Property Advisors' },
  { icon: ShieldCheck, label: 'Secure Transactions' },
  { icon: CalendarCheck, label: 'Virtual & Physical Inspections' },
  { icon: Headset, label: 'Dedicated Customer Support' },
  { icon: Sparkles, label: 'Premium Residential Listings' },
]

const logos = [
  new URL('../assets/trusted/adron trust_no_bg.png', import.meta.url).href,
  new URL('../assets/trusted/berkshire trust_no_bg.png', import.meta.url).href,
  new URL('../assets/trusted/BH-Logo trust_no_bg.png', import.meta.url).href,
  new URL('../assets/trusted/century 12 trust_no_bg.png', import.meta.url).href,
  new URL('../assets/trusted/codwell trust_no_bg.png', import.meta.url).href,
  new URL('../assets/trusted/keller trust_no_bg.png', import.meta.url).href,
  new URL('../assets/trusted/Landwey-Orange trust_no_bg.png', import.meta.url).href,
  new URL('../assets/trusted/revolution trust_no_bg.png', import.meta.url).href,
  new URL('../assets/trusted/Sujimoto-project trust_no_bg.png', import.meta.url).href,
  new URL('../assets/trusted/zylus trust_no_bg.png', import.meta.url).href,
]

const TrustedBySection = () => {
  const prefersReducedMotion = useReducedMotion()

  return (
    <section className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.8, ease: 'easeOut' }}
          className="mx-auto max-w-3xl text-center"
        >
          <p className="text-sm uppercase tracking-[0.35em] text-slate-500/80">Trusted by Leading Partners</p>
          <h2 className="mt-5 text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
            We proudly collaborate with trusted organizations, developers, and industry-leading partners committed to delivering exceptional living experiences.
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.85, delay: 0.1 }}
          className="mt-14 overflow-hidden rounded-[40px] border border-slate-200 bg-slate-50 p-6 shadow-lg shadow-slate-200/20 sm:p-8"
        >
          <div className="marquee-wrapper rounded-[28px] bg-white/70 px-4 py-6 shadow-inner shadow-slate-200/40 sm:px-6">
            <div className="marquee-track">
              {[...logos, ...logos].map((src, index) => (
                <div key={`${src}-${index}`} className="marquee-item flex items-center justify-center px-4 py-2">
                  <div className="flex h-20 items-center justify-center rounded-[24px] border border-slate-200/80 bg-white px-6 py-4 shadow-sm shadow-slate-200/50">
                    <img src={src} alt="Trusted partner logo" className="h-14 max-h-[70px] w-auto object-contain transition duration-300" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {indicators.map((item, index) => {
              const Icon = item.icon
              return (
                <motion.div
                  key={item.label}
                  whileHover={{ y: -4, scale: 1.01 }}
                  transition={{ duration: prefersReducedMotion ? 0 : 0.3, ease: 'easeOut' }}
                  className="group flex items-start gap-4 rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm transition"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-[color:var(--brand)]/10 text-[color:var(--brand)] shadow-sm shadow-[rgba(14,165,164,0.12)]">
                    <Icon size={20} />
                  </div>
                  <p className="text-base font-semibold text-slate-900">{item.label}</p>
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
