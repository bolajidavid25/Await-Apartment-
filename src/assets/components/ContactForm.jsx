import { useState } from 'react'
import { motion } from 'framer-motion'
import confetti from 'canvas-confetti'

const floatingShapes = [
  { size: 180, x: '10%', y: '20%', color: 'rgba(16, 185, 129, 0.16)' },
  { size: 140, x: '80%', y: '10%', color: 'rgba(15, 23, 42, 0.24)' },
  { size: 220, x: '60%', y: '70%', color: 'rgba(52, 211, 153, 0.12)' },
]

const ContactForm = () => {
  const [formState, setFormState] = useState({ name: '', email: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormState((current) => ({ ...current, [name]: value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    confetti({
      particleCount: 220,
      spread: 180,
      origin: { y: 0.55 },
      colors: ['#10B981', '#14B8A6', '#0F172A', '#FFFFFF'],
    })
    setSubmitted(true)
  }

  return (
    <section id="contact" className="relative overflow-hidden bg-slate-950 py-24 text-slate-100 sm:py-28">
      <div className="pointer-events-none absolute inset-0">
        {floatingShapes.map((shape, index) => (
          <motion.div
            key={shape.x + index}
            animate={{ y: [0, -24, 0], x: [0, 14, 0] }}
            transition={{ repeat: Infinity, duration: 12 + index * 2, ease: 'easeInOut', delay: index * 1.5 }}
            className="absolute rounded-full"
            style={{ width: shape.size, height: shape.size, left: shape.x, top: shape.y, background: shape.color }}
          />
        ))}
      </div>

      <div className="relative mx-auto max-w-6xl px-6 lg:px-8">
        <div className="mb-12 max-w-3xl space-y-4 text-center">
          <p className="text-sm uppercase tracking-[0.35em] text-emerald-300/90">Start your acquisition</p>
          <h2 className="text-4xl font-semibold text-white sm:text-5xl">Secure your private consultation with our elite property team.</h2>
          <p className="text-base leading-8 text-slate-400 sm:text-lg">
            Complete the form below and our advisors will reach out to align your portfolio goals with the most exclusive listings available.
          </p>
        </div>

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.85, ease: 'easeOut' }}
          className="relative rounded-[2rem] border border-white/10 bg-slate-900/85 p-8 shadow-2xl shadow-slate-950/40 backdrop-blur-xl sm:p-12"
        >
          <div className="grid gap-6 sm:grid-cols-2">
            <label className="space-y-3">
              <span className="text-sm uppercase tracking-[0.25em] text-slate-400">Name</span>
              <input
                required
                name="name"
                value={formState.name}
                onChange={handleChange}
                className="w-full rounded-3xl border border-white/10 bg-slate-950/90 px-5 py-4 text-white outline-none transition focus:border-emerald-300/70"
                placeholder="Your full name"
              />
            </label>
            <label className="space-y-3">
              <span className="text-sm uppercase tracking-[0.25em] text-slate-400">Email</span>
              <input
                required
                type="email"
                name="email"
                value={formState.email}
                onChange={handleChange}
                className="w-full rounded-3xl border border-white/10 bg-slate-950/90 px-5 py-4 text-white outline-none transition focus:border-emerald-300/70"
                placeholder="you@example.com"
              />
            </label>
          </div>

          <label className="mt-6 block space-y-3">
            <span className="text-sm uppercase tracking-[0.25em] text-slate-400">Message</span>
            <textarea
              required
              name="message"
              value={formState.message}
              onChange={handleChange}
              rows="5"
              className="w-full rounded-[1.75rem] border border-white/10 bg-slate-950/90 px-5 py-4 text-white outline-none transition focus:border-emerald-300/70"
              placeholder="Tell us about the property or portfolio interest you want to discuss"
            />
          </label>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-slate-400">Submit and receive a tailored property match with an expert advisor.</p>
            </div>
            <button className="inline-flex items-center justify-center rounded-full bg-emerald-500 px-8 py-4 text-sm font-semibold uppercase tracking-[0.2em] text-slate-950 transition hover:bg-emerald-400">
              Submit Inquiry
            </button>
          </div>
        </motion.form>

        {submitted && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/95 px-6 py-8 backdrop-blur-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="max-w-2xl rounded-[2rem] bg-slate-900 p-10 text-center shadow-2xl shadow-black/50"
            >
              <p className="text-sm uppercase tracking-[0.35em] text-emerald-300/90">Submission Complete</p>
              <h3 className="mt-6 text-4xl font-semibold text-white">Congratulations!</h3>
              <p className="mt-4 text-base leading-8 text-slate-300">
                You have officially taken the first major step toward securing your future.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-8 inline-flex rounded-full bg-emerald-500 px-8 py-4 text-sm font-semibold uppercase tracking-[0.2em] text-slate-950 transition hover:bg-emerald-400"
              >
                Continue browsing
              </button>
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  )
}

export default ContactForm
