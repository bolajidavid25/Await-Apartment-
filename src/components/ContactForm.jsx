import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { CheckCircle2 } from 'lucide-react'
import confetti from 'canvas-confetti'

const floatingShapes = [
  { size: 120, left: '10%', top: '20%', delay: 0 },
  { size: 100, left: '70%', top: '8%', delay: 1 },
  { size: 160, left: '82%', top: '55%', delay: 2 },
  { size: 90, left: '22%', top: '65%', delay: 1.5 },
  { size: 140, left: '50%', top: '28%', delay: 0.5 },
]

const ContactForm = () => {
  const [formState, setFormState] = useState({ name: '', email: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [isSending, setIsSending] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormState((current) => ({ ...current, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setIsSending(true)
    setErrorMessage('')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formState),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => null)
        throw new Error(errorData?.error || 'Unable to send message. Please try again.')
      }

      confetti({ particleCount: 260, spread: 170, origin: { y: 0.55 }, colors: ['#14B8A6', '#0F172A', '#F8FAFC', '#38BDF8'] })
      setSubmitted(true)
      setFormState({ name: '', email: '', message: '' })
    } catch (error) {
      setErrorMessage(error.message || 'Something went wrong. Please try again.')
    } finally {
      setIsSending(false)
    }
  }

  return (
    <section id="contact" className="relative overflow-hidden bg-slate-950 py-24 sm:py-28">
      <div className="pointer-events-none absolute inset-0">
        {floatingShapes.map((shape, index) => (
          <motion.div
            key={index}
            animate={{ y: ['0%', '-12%', '0%'], rotate: [0, 16, 0], x: ['0%', '4%', '0%'] }}
            transition={{ delay: shape.delay, duration: 14, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute rounded-full bg-[color:var(--brand)]/10"
            style={{ width: shape.size, height: shape.size, left: shape.left, top: shape.top }}
          />
        ))}
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[0.95fr_0.85fr] lg:items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <p className="text-sm uppercase tracking-[0.35em] text-[color:var(--brand)]/80">Contact</p>
            <h2 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">Secure a private consultation with the Await Apartment team.</h2>
            <p className="max-w-xl text-base leading-8 text-slate-400 sm:text-lg">
              Share your priorities and receive an exclusive property preview tailored to your lifestyle, investment goals, and legacy vision.
            </p>
            <div className="grid gap-4 rounded-[32px] border border-white/10 bg-slate-900/70 p-6 shadow-2xl shadow-slate-950/30">
              <p className="text-sm uppercase tracking-[0.35em] text-slate-400">What we offer</p>
              <ul className="grid gap-3 text-slate-300 sm:grid-cols-2">
                {['Private asset advisory', 'Curated property selection', 'Discrete transaction support', 'Future-ready portfolio guidance'].map((item) => (
                  <li key={item} className="rounded-3xl bg-slate-950/80 px-4 py-3">{item}</li>
                ))}
              </ul>
            </div>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            onSubmit={handleSubmit}
            className="relative rounded-[32px] border border-white/10 bg-slate-900/85 p-8 shadow-2xl shadow-slate-950/30"
          >
            <div className="space-y-5">
              <label className="block text-sm uppercase tracking-[0.28em] text-slate-400">
                Name
                <input
                  required
                  name="name"
                  value={formState.name}
                  onChange={handleChange}
                  className="mt-3 w-full rounded-3xl border border-white/10 bg-slate-950/90 px-5 py-4 text-white outline-none transition focus:border-[color:var(--brand)] focus:ring-2 focus:ring-[color:var(--brand)]/20"
                  placeholder="Your full name"
                />
              </label>

              <label className="block text-sm uppercase tracking-[0.28em] text-slate-400">
                Email
                <input
                  required
                  type="email"
                  name="email"
                  value={formState.email}
                  onChange={handleChange}
                  className="mt-3 w-full rounded-3xl border border-white/10 bg-slate-950/90 px-5 py-4 text-white outline-none transition focus:border-[color:var(--brand)] focus:ring-2 focus:ring-[color:var(--brand)]/20"
                  placeholder="you@example.com"
                />
              </label>

              <label className="block text-sm uppercase tracking-[0.28em] text-slate-400">
                Message
                <textarea
                  required
                  name="message"
                  rows="5"
                  value={formState.message}
                  onChange={handleChange}
                  className="mt-3 w-full rounded-[28px] border border-white/10 bg-slate-950/90 px-5 py-4 text-white outline-none transition focus:border-[color:var(--brand)] focus:ring-2 focus:ring-[color:var(--brand)]/20"
                  placeholder="Describe your ideal residence or investment criteria"
                />
              </label>

              {errorMessage && <p className="text-sm font-medium text-rose-400">{errorMessage}</p>}
              <button
                type="submit"
                disabled={isSending}
                className="inline-flex w-full items-center justify-center rounded-full bg-[color:var(--brand)] px-6 py-4 text-sm font-semibold uppercase tracking-[0.22em] text-[color:var(--brand-contrast)] transition hover:bg-[color:var(--brand)]/90 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSending ? 'Sending...' : 'Submit'}
              </button>
            </div>
          </motion.form>
        </div>
      </div>

      <AnimatePresence>
        {submitted && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/90 px-6 py-8 backdrop-blur-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="w-full max-w-2xl rounded-[32px] bg-slate-900 p-10 text-center shadow-2xl shadow-black/50"
              initial={{ y: 20, opacity: 0, scale: 0.96 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 20, opacity: 0, scale: 0.96 }}
            >
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[color:var(--brand)]/10 text-[color:var(--brand)]">
                <CheckCircle2 size={36} />
              </div>
              <h3 className="mt-6 text-3xl font-semibold text-white">Congratulations!</h3>
              <p className="mt-4 text-base leading-8 text-slate-300">
                You have officially taken the first major step toward securing your future.
              </p>
              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className="mt-8 inline-flex rounded-full bg-[color:var(--brand)] px-8 py-4 text-sm font-semibold uppercase tracking-[0.22em] text-[color:var(--brand-contrast)] transition hover:bg-[color:var(--brand)]/90"
              >
                Continue Browsing
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

export default ContactForm

