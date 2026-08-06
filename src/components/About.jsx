import { motion } from 'framer-motion'
import heroImage from '../assets/house 8.jpg'

const About = () => {
  return (
    <section id="about" className="relative mb-24 overflow-hidden bg-slate-950 py-24 sm:mb-28 sm:py-28 lg:mb-32">
      <div className="absolute inset-x-0 top-0 h-72 bg-gradient-to-b from-[color:var(--brand)]/10 to-transparent" aria-hidden="true" />
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-stretch lg:gap-20">
          <motion.div
            initial={{ opacity: 0, x: -36 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9 }}
            className="relative h-full"
          >
            <div className="pointer-events-none absolute -left-10 -top-10 h-[420px] w-[420px] rounded-full bg-[color:var(--brand)]/10 blur-3xl" />
            <div className="relative h-full overflow-hidden rounded-[32px] border border-white/10 bg-slate-950/80 shadow-2xl shadow-slate-950/40">
              <img src={heroImage} alt="Await Apartment showcase" className="h-full w-full rounded-[32px] object-cover" />
              <div className="absolute inset-0 rounded-[32px] bg-gradient-to-tr from-slate-950/10 via-transparent to-slate-950/70" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 36 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9, delay: 0.1 }}
            className="flex h-full flex-col justify-center"
          >
            <div className="max-w-2xl space-y-4 rounded-[32px] border border-white/10 bg-slate-900/70 p-8 shadow-2xl shadow-slate-950/25 sm:p-10 lg:p-12">
              <span className="inline-flex rounded-full border border-[color:var(--brand)]/20 bg-[color:var(--brand)]/10 px-4 py-2 text-sm uppercase tracking-[0.35em] text-[color:var(--brand)]">
                Await Apartment Signature
              </span>
              <h2 className="text-4xl font-semibold leading-tight text-white sm:text-5xl">
                Legendary residences designed for generational luxury.
              </h2>
              <p className="text-lg leading-8 text-slate-300 sm:text-xl">
                Await Apartment crafts an elevated collection of refined estates, combining impressive design, investment strength, and elevated lifestyle. Every property is selected to deliver timeless elegance and long-term portfolio performance.
              </p>
            </div>

            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              <div className="rounded-[32px] border border-white/10 bg-slate-900/80 p-8 shadow-2xl shadow-slate-950/25">
                <p className="text-sm uppercase tracking-[0.35em] text-[color:var(--brand)]/90">Timeless architecture</p>
                <p className="mt-4 text-lg text-slate-100">Distinctive properties anchored by premium materials, artful proportions, and serene, light-filled interiors.</p>
              </div>
              <div className="rounded-[32px] border border-white/10 bg-slate-900/80 p-8 shadow-2xl shadow-slate-950/25">
                <p className="text-sm uppercase tracking-[0.35em] text-[color:var(--brand)]/90">Legacy value</p>
                <p className="mt-4 text-lg text-slate-100">Bespoke advisory and market insight ensure every acquisition strengthens your wealth and elevates your family legacy.</p>
              </div>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {[
                { label: 'Curated portfolio', value: '95+ elite homes' },
                { label: 'Client satisfaction', value: '99% retention' },
                { label: 'Average ROI', value: '34%' },
                { label: 'Global reach', value: '8 luxury markets' },
              ].map((metric) => (
                <div key={metric.label} className="rounded-[32px] border border-white/10 bg-slate-900/80 p-6 shadow-lg shadow-slate-950/20">
                  <p className="text-3xl font-semibold text-white">{metric.value}</p>
                  <p className="mt-3 text-sm uppercase tracking-[0.28em] text-slate-400">{metric.label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default About
