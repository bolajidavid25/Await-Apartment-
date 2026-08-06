import { motion } from 'framer-motion'
import brandImage from '../hero.png'

const metrics = [
  { label: 'Transactions Closed', value: '1,200+' },
  { label: 'Average ROI', value: '32%' },
  { label: 'Luxury Offices', value: '12 Cities' },
  { label: 'Client Satisfaction', value: '98%' },
]

const About = () => {
  return (
    <section id="about" className="bg-slate-950/95 py-24 text-slate-100 sm:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.15fr_0.9fr] lg:items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9 }}
            className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-slate-900/70 shadow-2xl shadow-slate-950/30"
          >
            <img src={brandImage} alt="Agency brand" className="h-full min-h-[420px] w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-tr from-slate-950/0 via-slate-950/40 to-slate-950/90" />
            <div className="absolute bottom-6 left-6 rounded-3xl bg-emerald-500/15 px-5 py-4 text-slate-200 ring-1 ring-emerald-300/20 backdrop-blur-sm">
              <p className="text-sm uppercase tracking-[0.3em] text-emerald-200/90">Established 2004</p>
              <p className="mt-2 text-2xl font-semibold">A legacy of premium property experiences.</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9, delay: 0.1 }}
            className="space-y-8"
          >
            <div className="max-w-xl space-y-4">
              <span className="inline-flex rounded-full bg-emerald-500/10 px-4 py-2 text-sm uppercase tracking-[0.35em] text-emerald-200">
                Crafted for discerning buyers
              </span>
              <h2 className="text-4xl font-semibold leading-tight text-white sm:text-5xl">
                We build lasting wealth through exceptional real estate relationships.
              </h2>
              <p className="text-lg leading-8 text-slate-300">
                Our agency pairs refined architectural curation with strategic market insight so every acquisition feels inspired, secure, and future-proof.
              </p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              {metrics.map((item) => (
                <div key={item.label} className="rounded-3xl border border-white/10 bg-slate-900/80 p-6 shadow-lg shadow-slate-950/20">
                  <p className="text-3xl font-semibold text-white">{item.value}</p>
                  <p className="mt-3 text-sm uppercase tracking-[0.28em] text-slate-400">{item.label}</p>
                </div>
              ))}
            </div>

            <div className="rounded-[2rem] border border-emerald-300/15 bg-emerald-500/10 p-8 text-slate-100 shadow-2xl shadow-emerald-500/10 backdrop-blur-xl">
              <p className="text-sm uppercase tracking-[0.32em] text-emerald-200/90">Our mission</p>
              <p className="mt-4 text-lg leading-8 text-slate-200">
                We guide high-net-worth clients into handpicked residences with an emphasis on privacy, impeccable design, and long-term appreciation.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default About
