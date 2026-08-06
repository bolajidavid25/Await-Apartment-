import { motion, useReducedMotion } from 'framer-motion'
import { Quote } from 'lucide-react'

const testimonials = [
  {
    quote:
      'Await Apartment made our search effortless. Their team matched us with a residence that felt custom-built for our family.',
    author: 'Gabrielle R., Founder',
    role: 'Private Client',
  },
  {
    quote:
      'The level of care, market insight, and follow-through was exceptional. Every detail of the process felt premium and secure.',
    author: 'Andre M., Executive',
    role: 'Luxury Investor',
  },
  {
    quote:
      'We moved into our dream home faster than expected thanks to the expert advisory and seamless viewing schedule.',
    author: 'Sofia L., Director',
    role: 'Global Relocator',
  },
]

const Testimonials = () => {
  const prefersReducedMotion = useReducedMotion()

  return (
    <section className="relative overflow-hidden bg-slate-950 py-24 sm:py-28">
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[color:var(--brand)]/10 to-transparent" aria-hidden="true" />
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.8, ease: 'easeOut' }}
          className="mx-auto max-w-3xl text-center"
        >
          <p className="text-sm uppercase tracking-[0.35em] text-[color:var(--brand)]/80">Testimonials</p>
          <h2 className="mt-5 text-4xl font-semibold tracking-tight text-white sm:text-5xl">Clients trust us to deliver an impeccable experience.</h2>
        </motion.div>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {testimonials.map((item, index) => (
            <motion.div
              key={item.author}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.7, delay: index * 0.1 }}
              className="rounded-[32px] border border-white/10 bg-slate-900/90 p-8 shadow-2xl shadow-slate-950/30"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-[color:var(--brand)]/10 text-[color:var(--brand)]">
                <Quote size={26} />
              </div>
              <p className="mt-8 text-lg leading-8 text-slate-300">“{item.quote}”</p>
              <div className="mt-8 border-t border-white/10 pt-6 text-sm text-slate-400">
                <p className="font-semibold text-white">{item.author}</p>
                <p>{item.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Testimonials
