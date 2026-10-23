import { useState, useEffect, useRef } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import {
  CheckCircle2,
  AlertCircle,
  Loader2,
  X,
  ArrowRight,
  Mail,
  Phone,
  ShieldCheck,
} from 'lucide-react'
import confetti from 'canvas-confetti'

// ============================================================
// 1. ANIMATED GEOMETRIC SVG BACKGROUND SHAPES
// Explicitly includes: Triangle, Hexagon, Heptagon, Decagon, Rhombus, Trapezium
// Varied in direction, rotation, opacity, scale, and animation timing.
// Respects prefers-reduced-motion via useReducedMotion hook.
// ============================================================

const GEOMETRIC_SHAPES = [
  {
    name: 'Triangle',
    type: 'triangle',
    size: 110,
    top: '8%',
    left: '5%',
    points: '50,10 92,86 8,86',
    animate: {
      x: [0, 22, -14, 0],
      y: [0, -32, 12, 0],
      rotate: [0, 110, 220, 360],
      scale: [1, 1.1, 0.95, 1],
      opacity: [0.18, 0.38, 0.18],
    },
    duration: 18,
    delay: 0,
  },
  {
    name: 'Hexagon',
    type: 'hexagon',
    size: 135,
    top: '64%',
    left: '6%',
    points: '50,6 88,28 88,72 50,94 12,72 12,28',
    animate: {
      x: [0, -26, 18, 0],
      y: [0, 28, -22, 0],
      rotate: [0, -90, -180, -360],
      scale: [0.94, 1.08, 0.94],
      opacity: [0.16, 0.34, 0.16],
    },
    duration: 22,
    delay: 1,
  },
  {
    name: 'Heptagon',
    type: 'heptagon',
    size: 140,
    top: '12%',
    right: '6%',
    points: '50,8 83,24 91,59 68,88 32,88 9,59 17,24',
    animate: {
      x: [0, 28, -20, 0],
      y: [0, -26, 24, 0],
      rotate: [0, 130, 260, 360],
      scale: [1, 1.06, 0.93, 1],
      opacity: [0.2, 0.42, 0.2],
    },
    duration: 20,
    delay: 1.5,
  },
  {
    name: 'Decagon',
    type: 'decagon',
    size: 155,
    top: '68%',
    right: '8%',
    points: '50,8 75,16 90,37 90,63 75,84 50,92 25,84 10,63 10,37 25,16',
    animate: {
      x: [0, -32, 16, 0],
      y: [0, -36, 18, 0],
      rotate: [0, -120, -240, -360],
      scale: [0.92, 1.08, 0.92],
      opacity: [0.16, 0.35, 0.16],
    },
    duration: 25,
    delay: 2,
  },
  {
    name: 'Rhombus',
    type: 'rhombus',
    size: 96,
    top: '42%',
    left: '46%',
    points: '50,8 90,50 50,92 10,50',
    animate: {
      x: [0, 18, -18, 0],
      y: [0, 22, -22, 0],
      rotate: [0, 90, 180, 360],
      scale: [0.96, 1.14, 0.96],
      opacity: [0.18, 0.36, 0.18],
    },
    duration: 16,
    delay: 0.5,
  },
  {
    name: 'Trapezium',
    type: 'trapezium',
    size: 125,
    top: '80%',
    left: '38%',
    points: '28,20 72,20 90,82 10,82',
    animate: {
      x: [0, -22, 22, 0],
      y: [0, -18, 18, 0],
      rotate: [0, -60, -180, -360],
      scale: [1, 0.92, 1.07, 1],
      opacity: [0.14, 0.32, 0.14],
    },
    duration: 23,
    delay: 2.2,
  },
  {
    name: 'Triangle-Secondary',
    type: 'triangle',
    size: 85,
    top: '86%',
    right: '34%',
    points: '50,90 92,14 8,14',
    animate: {
      x: [0, 16, -12, 0],
      y: [0, 20, -18, 0],
      rotate: [180, 270, 360, 540],
      scale: [0.95, 1.08, 0.95],
      opacity: [0.15, 0.3, 0.15],
    },
    duration: 19,
    delay: 1.2,
  },
]

// ============================================================
// 2. FORM VALIDATION LOGIC
// ============================================================

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const validateField = (name, value) => {
  const trimmed = (value || '').trim()
  switch (name) {
    case 'name':
      if (!trimmed) return 'Full name is required.'
      if (trimmed.length < 2) return 'Full name must be at least 2 characters.'
      return ''
    case 'email':
      if (!trimmed) return 'Email address is required.'
      if (!EMAIL_REGEX.test(trimmed)) return 'Please enter a valid email address (e.g. name@domain.com).'
      return ''
    case 'message':
      if (!trimmed) return 'Message is required.'
      if (trimmed.length < 10) return 'Message must be at least 10 characters so we can understand your goals.'
      return ''
    default:
      return ''
  }
}

const validateAll = (values) => {
  return {
    name: validateField('name', values.name),
    email: validateField('email', values.email),
    message: validateField('message', values.message),
  }
}

// ============================================================
// 3. MAIN COMPONENT
// ============================================================

const ContactForm = () => {
  const shouldReduceMotion = useReducedMotion()

  const [values, setValues] = useState({ name: '', email: '', message: '' })
  const [touched, setTouched] = useState({ name: false, email: false, message: false })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [serverError, setServerError] = useState('')
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false)

  const nameInputRef = useRef(null)
  const emailInputRef = useRef(null)
  const messageInputRef = useRef(null)
  const modalCloseBtnRef = useRef(null)

  // Handle Field Changes
  const handleChange = (e) => {
    const { name, value } = e.target
    setValues((prev) => ({ ...prev, [name]: value }))

    // Realtime re-validation once user touched the field
    if (touched[name]) {
      const fieldError = validateField(name, value)
      setErrors((prev) => ({ ...prev, [name]: fieldError }))
    }
  }

  // Handle Field Blur
  const handleBlur = (e) => {
    const { name, value } = e.target
    setTouched((prev) => ({ ...prev, [name]: true }))
    const fieldError = validateField(name, value)
    setErrors((prev) => ({ ...prev, [name]: fieldError }))
  }

  // Handle Submit
  const handleSubmit = async (e) => {
    e.preventDefault()

    // Mark all touched and validate
    setTouched({ name: true, email: true, message: true })
    const validationErrors = validateAll(values)
    setErrors(validationErrors)

    const hasErrors = Object.values(validationErrors).some(Boolean)
    if (hasErrors) {
      // Focus first erroneous field
      if (validationErrors.name) nameInputRef.current?.focus()
      else if (validationErrors.email) emailInputRef.current?.focus()
      else if (validationErrors.message) messageInputRef.current?.focus()
      return
    }

    setIsSubmitting(true)
    setServerError('')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: values.name.trim(),
          email: values.email.trim(),
          message: values.message.trim(),
        }),
      })

      let data = null
      const contentType = response.headers.get('content-type') || ''
      if (contentType.includes('application/json')) {
        data = await response.json().catch(() => null)
      } else {
        const text = await response.text().catch(() => '')
        data = { error: text || 'Unexpected server response' }
      }

      // Check strictly for confirmed backend success
      if (!response.ok || !data || data.ok !== true) {
        const failureMessage =
          data?.error ||
          data?.message ||
          (response.status === 500
            ? 'Email service is not configured on the server (RESEND_API_KEY required). Please contact support.'
            : response.status === 404
            ? 'Contact endpoint (/api/contact) not found. Please ensure the API server is running.'
            : 'Unable to deliver message at this time. Please try again.')
        setServerError(failureMessage)
        return
      }

      // CONFIRMED SUCCESS:
      // 1. Trigger confetti animation
      try {
        confetti({
          particleCount: 180,
          spread: 120,
          origin: { y: 0.55 },
          colors: ['#0ea5a4', '#14b8a6', '#38bdf8', '#f59e0b', '#ffffff'],
        })
      } catch (confettiErr) {
        console.warn('Confetti effect failed to run:', confettiErr)
      }

      // 2. Open Success Modal
      setIsSuccessModalOpen(true)

      // 3. Reset form state
      setValues({ name: '', email: '', message: '' })
      setTouched({ name: false, email: false, message: false })
      setErrors({})
    } catch (err) {
      setServerError(
        err.message && !err.message.includes('Failed to fetch')
          ? err.message
          : 'Network error: Unable to connect to the Await Apartment contact API. Please check your connection and try again.'
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  // Keyboard accessibility: Close modal on Escape
  useEffect(() => {
    if (!isSuccessModalOpen) return
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsSuccessModalOpen(false)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isSuccessModalOpen])

  // Prevent background scroll when success modal is open & autofocus
  useEffect(() => {
    if (isSuccessModalOpen) {
      const prevOverflow = document.body.style.overflow
      document.body.style.overflow = 'hidden'
      modalCloseBtnRef.current?.focus()
      return () => {
        document.body.style.overflow = prevOverflow
      }
    }
  }, [isSuccessModalOpen])

  return (
    <section
      id="contact"
      aria-label="Contact and Private Advisory"
      className="relative overflow-hidden bg-slate-950 py-24 sm:py-32"
    >
      {/* ============================================================ */}
      {/* ANIMATED GEOMETRIC SVG BACKGROUND (Layered behind, non-blocking) */}
      {/* ============================================================ */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
        {GEOMETRIC_SHAPES.map((shape, idx) => (
          <motion.div
            key={`${shape.name}-${idx}`}
            className="pointer-events-none absolute text-[color:var(--brand)]"
            style={{
              width: shape.size,
              height: shape.size,
              top: shape.top,
              left: shape.left,
              right: shape.right,
            }}
            animate={shouldReduceMotion ? undefined : shape.animate}
            transition={
              shouldReduceMotion
                ? undefined
                : {
                    duration: shape.duration,
                    delay: shape.delay,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }
            }
          >
            <svg
              viewBox="0 0 100 100"
              className="h-full w-full"
              fill="currentColor"
              fillOpacity="0.04"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeOpacity="0.28"
            >
              <polygon points={shape.points} />
            </svg>
          </motion.div>
        ))}

        {/* Ambient brand radial gradients */}
        <div className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-[color:var(--brand)]/10 blur-3xl" />
        <div className="absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-[color:var(--brand)]/10 blur-3xl" />
      </div>

      {/* ============================================================ */}
      {/* FOREGROUND CONTENT */}
      {/* ============================================================ */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.05fr] lg:items-start xl:gap-16">
          {/* Left Column: Brand & Advisory Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <span className="inline-flex items-center gap-2 rounded-full border border-[color:var(--brand)]/30 bg-[color:var(--brand)]/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.28em] text-[color:var(--brand)]">
                <ShieldCheck size={14} /> Private Client Advisory
              </span>
              <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl md:text-5xl">
                Let&apos;s Find Your Next Home.
              </h2>
              <p className="max-w-xl text-base leading-relaxed text-slate-300 sm:text-lg">
                Connect directly with our dedicated real estate partners. Share your property criteria, timeline, and investment targets for bespoke, confidential acquisition advisory.
              </p>
            </div>

            {/* Direct Contact Cards */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-5 backdrop-blur-md">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[color:var(--brand)]/15 text-[color:var(--brand)]">
                  <Phone size={18} />
                </div>
                <h3 className="mt-3 text-xs font-semibold uppercase tracking-wider text-slate-400">Direct Inquiries</h3>
                <a
                  href="tel:+18004582924"
                  className="mt-1 block text-sm font-medium text-white transition hover:text-[color:var(--brand)]"
                >
                  +1 (800) 458-2924
                </a>
                <p className="mt-1 text-xs text-slate-400">Mon - Sat: 9:00 AM - 7:00 PM EST</p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-5 backdrop-blur-md">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[color:var(--brand)]/15 text-[color:var(--brand)]">
                  <Mail size={18} />
                </div>
                <h3 className="mt-3 text-xs font-semibold uppercase tracking-wider text-slate-400">Concierge Desk</h3>
                <a
                  href="mailto:concierge@awaitapartment.com"
                  className="mt-1 block truncate text-sm font-medium text-white transition hover:text-[color:var(--brand)]"
                >
                  concierge@awaitapartment.com
                </a>
                <p className="mt-1 text-xs text-slate-400">Response within 24 business hours</p>
              </div>
            </div>

            {/* Advisory Pillars */}
            <div className="rounded-3xl border border-white/10 bg-slate-900/40 p-6 backdrop-blur-md">
              <h3 className="text-xs font-bold uppercase tracking-[0.25em] text-[color:var(--brand)]">
                Our Advisory Commitments
              </h3>
              <ul className="mt-4 grid gap-3 text-sm text-slate-300 sm:grid-cols-2">
                <li className="flex items-center gap-2.5 rounded-xl bg-slate-950/60 px-3.5 py-2.5">
                  <div className="h-2 w-2 rounded-full bg-[color:var(--brand)]" />
                  <span>Confidential representation</span>
                </li>
                <li className="flex items-center gap-2.5 rounded-xl bg-slate-950/60 px-3.5 py-2.5">
                  <div className="h-2 w-2 rounded-full bg-[color:var(--brand)]" />
                  <span>Off-market portfolio access</span>
                </li>
                <li className="flex items-center gap-2.5 rounded-xl bg-slate-950/60 px-3.5 py-2.5">
                  <div className="h-2 w-2 rounded-full bg-[color:var(--brand)]" />
                  <span>Licensed Florida MLS records</span>
                </li>
                <li className="flex items-center gap-2.5 rounded-xl bg-slate-950/60 px-3.5 py-2.5">
                  <div className="h-2 w-2 rounded-full bg-[color:var(--brand)]" />
                  <span>Full closing &amp; escrow oversight</span>
                </li>
              </ul>
            </div>
          </motion.div>

          {/* Right Column: Accessible Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="relative"
          >
            <div className="relative rounded-[32px] border border-white/15 bg-slate-900/80 p-8 shadow-2xl shadow-slate-950/60 backdrop-blur-xl sm:p-10">
              <div className="mb-8">
                <h3 className="text-2xl font-bold tracking-tight text-white">Send an Inquiry</h3>
                <p className="mt-1.5 text-sm text-slate-400">
                  Fields marked with an asterisk (<span className="text-rose-400">*</span>) are required.
                </p>
              </div>

              {/* Server Failure Alert (Shown only on confirmed server/network error) */}
              <AnimatePresence>
                {serverError && (
                  <motion.div
                    role="alert"
                    aria-live="assertive"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="mb-6 rounded-2xl border border-rose-500/30 bg-rose-500/10 p-4 text-sm text-rose-300"
                  >
                    <div className="flex items-start gap-3">
                      <AlertCircle className="mt-0.5 shrink-0 text-rose-400" size={18} />
                      <div className="flex-1">
                        <p className="font-semibold text-rose-200">Inquiry Could Not Be Sent</p>
                        <p className="mt-1 text-xs leading-relaxed text-rose-300/90">{serverError}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setServerError('')}
                        aria-label="Dismiss alert"
                        className="rounded-lg p-1 text-rose-400 transition hover:bg-rose-500/20 hover:text-white"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <form onSubmit={handleSubmit} noValidate className="space-y-6">
                {/* Field: Full Name */}
                <div>
                  <label
                    htmlFor="contact-name"
                    className="block text-xs font-semibold uppercase tracking-[0.2em] text-slate-300"
                  >
                    Full Name <span className="text-rose-400" aria-hidden="true">*</span>
                  </label>
                  <div className="relative mt-2">
                    <input
                      ref={nameInputRef}
                      id="contact-name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      required
                      aria-required="true"
                      aria-invalid={touched.name && Boolean(errors.name)}
                      aria-describedby={touched.name && errors.name ? 'contact-name-error' : undefined}
                      disabled={isSubmitting}
                      value={values.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="e.g. Eleanor Vance"
                      className={`w-full rounded-2xl border bg-slate-950/90 px-5 py-4 text-sm text-white placeholder-slate-500 outline-none transition disabled:opacity-60 ${
                        touched.name && errors.name
                          ? 'border-rose-500 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20'
                          : 'border-white/15 focus:border-[color:var(--brand)] focus:ring-2 focus:ring-[color:var(--brand)]/25'
                      }`}
                    />
                  </div>
                  {touched.name && errors.name && (
                    <p
                      id="contact-name-error"
                      role="alert"
                      className="mt-2 flex items-center gap-1.5 text-xs font-medium text-rose-400"
                    >
                      <AlertCircle size={14} className="shrink-0" />
                      <span>{errors.name}</span>
                    </p>
                  )}
                </div>

                {/* Field: Email */}
                <div>
                  <label
                    htmlFor="contact-email"
                    className="block text-xs font-semibold uppercase tracking-[0.2em] text-slate-300"
                  >
                    Email Address <span className="text-rose-400" aria-hidden="true">*</span>
                  </label>
                  <div className="relative mt-2">
                    <input
                      ref={emailInputRef}
                      id="contact-email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      aria-required="true"
                      aria-invalid={touched.email && Boolean(errors.email)}
                      aria-describedby={touched.email && errors.email ? 'contact-email-error' : undefined}
                      disabled={isSubmitting}
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="e.g. client@example.com"
                      className={`w-full rounded-2xl border bg-slate-950/90 px-5 py-4 text-sm text-white placeholder-slate-500 outline-none transition disabled:opacity-60 ${
                        touched.email && errors.email
                          ? 'border-rose-500 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20'
                          : 'border-white/15 focus:border-[color:var(--brand)] focus:ring-2 focus:ring-[color:var(--brand)]/25'
                      }`}
                    />
                  </div>
                  {touched.email && errors.email && (
                    <p
                      id="contact-email-error"
                      role="alert"
                      className="mt-2 flex items-center gap-1.5 text-xs font-medium text-rose-400"
                    >
                      <AlertCircle size={14} className="shrink-0" />
                      <span>{errors.email}</span>
                    </p>
                  )}
                </div>

                {/* Field: Message */}
                <div>
                  <label
                    htmlFor="contact-message"
                    className="block text-xs font-semibold uppercase tracking-[0.2em] text-slate-300"
                  >
                    Inquiry Details <span className="text-rose-400" aria-hidden="true">*</span>
                  </label>
                  <div className="relative mt-2">
                    <textarea
                      ref={messageInputRef}
                      id="contact-message"
                      name="message"
                      rows={5}
                      required
                      aria-required="true"
                      aria-invalid={touched.message && Boolean(errors.message)}
                      aria-describedby={touched.message && errors.message ? 'contact-message-error' : undefined}
                      disabled={isSubmitting}
                      value={values.message}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="Specify your preferred locations, bedroom requirements, price range, or scheduling requirements..."
                      className={`w-full resize-y rounded-2xl border bg-slate-950/90 px-5 py-4 text-sm text-white placeholder-slate-500 outline-none transition disabled:opacity-60 ${
                        touched.message && errors.message
                          ? 'border-rose-500 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20'
                          : 'border-white/15 focus:border-[color:var(--brand)] focus:ring-2 focus:ring-[color:var(--brand)]/25'
                      }`}
                    />
                  </div>
                  {touched.message && errors.message && (
                    <p
                      id="contact-message-error"
                      role="alert"
                      className="mt-2 flex items-center gap-1.5 text-xs font-medium text-rose-400"
                    >
                      <AlertCircle size={14} className="shrink-0" />
                      <span>{errors.message}</span>
                    </p>
                  )}
                </div>

                {/* Submit Action (With duplicate click protection & loader) */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="group relative inline-flex w-full items-center justify-center gap-2.5 rounded-full bg-[color:var(--brand)] px-8 py-4 text-xs font-bold uppercase tracking-[0.22em] text-[color:var(--brand-contrast,#041b1b)] shadow-lg shadow-[color:var(--brand)]/25 transition duration-200 hover:bg-[color:var(--brand)]/90 hover:shadow-xl hover:shadow-[color:var(--brand)]/35 focus:outline-none focus:ring-2 focus:ring-[color:var(--brand)] focus:ring-offset-2 focus:ring-offset-slate-950 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      <span>Transmitting Inquiry...</span>
                    </>
                  ) : (
                    <>
                      <span>Request Private Consultation</span>
                      <ArrowRight size={15} className="transition-transform duration-200 group-hover:translate-x-1" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* 4. SUCCESS MODAL (Exact requested text & accessible dialog) */}
      {/* ============================================================ */}
      <AnimatePresence>
        {isSuccessModalOpen && (
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="success-modal-heading"
            aria-describedby="success-modal-description"
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSuccessModalOpen(false)}
              className="fixed inset-0 bg-slate-950/85 backdrop-blur-md"
            />

            {/* Modal Dialog Body */}
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 16 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="relative z-10 w-full max-w-lg overflow-hidden rounded-[32px] border border-white/15 bg-slate-900 p-8 text-center shadow-2xl shadow-black/70 sm:p-10"
            >
              {/* Close Button */}
              <button
                ref={modalCloseBtnRef}
                type="button"
                onClick={() => setIsSuccessModalOpen(false)}
                aria-label="Close dialog"
                className="absolute top-5 right-5 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-slate-950/60 text-slate-400 transition hover:bg-white/10 hover:text-white focus:outline-none focus:ring-2 focus:ring-[color:var(--brand)]"
              >
                <X size={18} />
              </button>

              {/* Icon */}
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[color:var(--brand)]/15 text-[color:var(--brand)] shadow-inner">
                <CheckCircle2 size={42} />
              </div>

              <h3 id="success-modal-heading" className="mt-6 text-2xl font-bold tracking-tight text-white sm:text-3xl">
                Consultation Request Received
              </h3>

              {/* EXACT REQUIRED PROMPT TEXT */}
              <p
                id="success-modal-description"
                className="mt-4 text-base font-medium leading-relaxed text-slate-200"
              >
                Congratulations! You have officially taken the first major step toward securing your future.
              </p>

              <p className="mt-3 text-xs leading-relaxed text-slate-400">
                A member of our advisory desk will review your details and reach out via your preferred contact channel shortly.
              </p>

              <div className="mt-8">
                <button
                  type="button"
                  onClick={() => setIsSuccessModalOpen(false)}
                  className="inline-flex w-full items-center justify-center rounded-full bg-[color:var(--brand)] px-8 py-3.5 text-xs font-bold uppercase tracking-[0.2em] text-[color:var(--brand-contrast,#041b1b)] shadow-lg shadow-[color:var(--brand)]/20 transition hover:bg-[color:var(--brand)]/90 focus:outline-none focus:ring-2 focus:ring-[color:var(--brand)]"
                >
                  Continue Browsing
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  )
}

export default ContactForm
