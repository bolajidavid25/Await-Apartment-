
import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { formatPrice } from '../utils/formatPrice'
import {
  X,
  CalendarDays,
  Clock3,
  User,
  Mail,
  Phone,
  MessageSquare,
  MapPin,
  CheckCircle2,
  AlertCircle,
  Loader2,
} from 'lucide-react'

const initialForm = {
  name: '',
  email: '',
  phone: '',
  date: '',
  time: '',
  message: '',
}

const InspectionModal = ({
  property,
  isOpen,
  onClose,
}) => {
  const [form, setForm] = useState(initialForm)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle')
  const [serverMessage, setServerMessage] = useState('')

  // --------------------------------------------------
  // PREVENT BACKGROUND SCROLL + ESCAPE
  // --------------------------------------------------

  useEffect(() => {
    if (!isOpen) return

    const previousOverflow =
      document.body.style.overflow

    document.body.style.overflow = 'hidden'

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    window.addEventListener('keydown', handleEscape)

    return () => {
      document.body.style.overflow =
        previousOverflow

      window.removeEventListener(
        'keydown',
        handleEscape
      )
    }
  }, [isOpen, onClose])

  // --------------------------------------------------
  // FORM INPUT
  // --------------------------------------------------

  const handleChange = (event) => {
    const { name, value } = event.target

    setForm((current) => ({
      ...current,
      [name]: value,
    }))

    if (errors[name]) {
      setErrors((current) => ({
        ...current,
        [name]: '',
      }))
    }

    if (status !== 'idle') {
      setStatus('idle')
      setServerMessage('')
    }
  }
  // --------------------------------------------------
  // VALIDATION
  // --------------------------------------------------

  const validateForm = () => {
    const newErrors = {}

    if (!form.name.trim()) {
      newErrors.name = 'Please enter your full name.'
    } else if (form.name.trim().length < 2) {
      newErrors.name = 'Please enter a valid name.'
    }

    if (!form.email.trim()) {
      newErrors.email = 'Please enter your email address.'
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        form.email.trim()
      )
    ) {
      newErrors.email =
        'Please enter a valid email address.'
    }

    if (!form.phone.trim()) {
      newErrors.phone =
        'Please enter your phone number.'
    } else if (
      form.phone.trim().length < 7
    ) {
      newErrors.phone =
        'Please enter a valid phone number.'
    }

    if (!form.date) {
      newErrors.date =
        'Please select an inspection date.'
    }

    if (!form.time) {
      newErrors.time =
        'Please select a preferred time.'
    }

    setErrors(newErrors)

    return Object.keys(newErrors).length === 0
  }

  // --------------------------------------------------
  // SUBMIT
  // --------------------------------------------------

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (!validateForm()) {
      return
    }

    setStatus('loading')
    setServerMessage('')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',

        headers: {
          'Content-Type': 'application/json',
        },

        body: JSON.stringify({
          type: 'inspection',

          name: form.name.trim(),
          email: form.email.trim(),
          phone: form.phone.trim(),

          date: form.date,
          time: form.time,

          message: form.message.trim(),

          property: {
            id: property?.id || null,

            price: property?.price || null,

            propertyType:
              property?.propertyType || null,

            address: property?.address || null,
          },
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(
          data?.error ||
            'Unable to submit inspection request.'
        )
      }

      setStatus('success')

      setServerMessage(
        data?.message ||
          'Your inspection request has been sent successfully.'
      )
    } catch (error) {
      console.error(
        'INSPECTION SUBMISSION ERROR:',
        error
      )

      setStatus('error')

      setServerMessage(
        error?.message ||
          'Something went wrong. Please try again.'
      )
    }
  }


  // --------------------------------------------------
  // MINIMUM DATE
  // --------------------------------------------------

  const getToday = () => {
    const today = new Date()

    const year = today.getFullYear()
    const month = String(
      today.getMonth() + 1
    ).padStart(2, '0')
    const day = String(
      today.getDate()
    ).padStart(2, '0')

    return `${year}-${month}-${day}`
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[10000] flex items-center justify-center overflow-y-auto bg-slate-950/90 px-3 py-4 backdrop-blur-xl sm:px-6 sm:py-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="relative my-auto w-full max-w-3xl overflow-hidden rounded-[30px] border border-white/10 bg-slate-950 shadow-[0_30px_100px_rgba(0,0,0,0.65)] sm:rounded-[36px]"
          initial={{
            opacity: 0,
            y: 30,
            scale: 0.98,
          }}
          animate={{
            opacity: 1,
            y: 0,
            scale: 1,
          }}
          exit={{
            opacity: 0,
            y: 20,
            scale: 0.98,
          }}
          transition={{ duration: 0.25 }}
          onClick={(event) =>
            event.stopPropagation()
          }
          role="dialog"
          aria-modal="true"
          aria-labelledby="inspection-modal-title"
        >
          {/* =====================================================
              HEADER
          ====================================================== */}

          <div className="flex items-start justify-between border-b border-white/10 px-5 py-5 sm:px-7 sm:py-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-teal-400">
                Await Apartment
              </p>

              <h2
                id="inspection-modal-title"
                className="mt-2 text-2xl font-semibold tracking-tight text-white sm:text-3xl"
              >
                Book an inspection
              </h2>

              <p className="mt-2 max-w-xl text-sm leading-6 text-slate-500">
                Choose a convenient date and time to
                view this property in person.
              </p>
            </div>

            <button
              type="button"
              onClick={onClose}
              aria-label="Close inspection form"
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/10 bg-slate-900 text-white transition hover:border-teal-400/30 hover:bg-slate-800"
            >
              <X size={19} />
            </button>
          </div>

          {/* =====================================================
              SUCCESS
          ====================================================== */}

          {status === 'success' ? (
            <div className="px-5 py-16 text-center sm:px-8 sm:py-20">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-teal-400/20 bg-teal-400/10">
                <CheckCircle2
                  size={32}
                  className="text-teal-400"
                />
              </div>

              <h3 className="mt-6 text-2xl font-semibold text-white">
                Inspection request received
              </h3>

              <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-slate-400">
                {serverMessage}
              </p>

              <button
                type="button"
                onClick={onClose}
                className="mt-8 rounded-full bg-teal-400 px-7 py-3.5 text-sm font-bold uppercase tracking-[0.16em] text-slate-950 transition hover:bg-teal-300"
              >
                Done
              </button>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              noValidate
            >
              <div className="grid gap-8 px-5 py-6 sm:px-7 sm:py-8 lg:grid-cols-[1fr_270px]">
                {/* =================================================
                    FORM
                ================================================== */}

                <div className="space-y-5">
                  {/* NAME */}

                  <div>
                    <label
                      htmlFor="inspection-name"
                      className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-slate-400"
                    >
                      Full name
                    </label>

                    <div className="relative">
                      <User
                        size={18}
                        className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-600"
                      />

                      <input
                        id="inspection-name"
                        name="name"
                        type="text"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        autoComplete="name"
                        className={`w-full rounded-2xl border bg-slate-900 py-3.5 pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-slate-600 ${
                          errors.name
                            ? 'border-red-400/50'
                            : 'border-white/10 focus:border-teal-400/50'
                        }`}
                      />
                    </div>

                    {errors.name && (
                      <p className="mt-2 text-xs text-red-400">
                        {errors.name}
                      </p>
                    )}
                  </div>

                  {/* EMAIL */}

                  <div>
                    <label
                      htmlFor="inspection-email"
                      className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-slate-400"
                    >
                      Email address
                    </label>

                    <div className="relative">
                      <Mail
                        size={18}
                        className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-600"
                      />

                      <input
                        id="inspection-email"
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="you@example.com"
                        autoComplete="email"
                        className={`w-full rounded-2xl border bg-slate-900 py-3.5 pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-slate-600 ${
                          errors.email
                            ? 'border-red-400/50'
                            : 'border-white/10 focus:border-teal-400/50'
                        }`}
                      />
                    </div>

                    {errors.email && (
                      <p className="mt-2 text-xs text-red-400">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  {/* PHONE */}

                  <div>
                    <label
                      htmlFor="inspection-phone"
                      className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-slate-400"
                    >
                      Phone number
                    </label>

                    <div className="relative">
                      <Phone
                        size={18}
                        className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-600"
                      />

                      <input
                        id="inspection-phone"
                        name="phone"
                        type="tel"
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="+1 (555) 123-4567"
                        autoComplete="tel"
                        className={`w-full rounded-2xl border bg-slate-900 py-3.5 pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-slate-600 ${
                          errors.phone
                            ? 'border-red-400/50'
                            : 'border-white/10 focus:border-teal-400/50'
                        }`}
                      />
                    </div>

                    {errors.phone && (
                      <p className="mt-2 text-xs text-red-400">
                        {errors.phone}
                      </p>
                    )}
                  </div>

                  {/* DATE + TIME */}

                  <div className="grid gap-5 sm:grid-cols-2">
                    {/* DATE */}

                    <div>
                      <label
                        htmlFor="inspection-date"
                        className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-slate-400"
                      >
                        Preferred date
                      </label>

                      <div className="relative">
                        <CalendarDays
                          size={18}
                          className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-600"
                        />

                        <input
                          id="inspection-date"
                          name="date"
                          type="date"
                          min={getToday()}
                          value={form.date}
                          onChange={handleChange}
                          className={`w-full rounded-2xl border bg-slate-900 py-3.5 pl-11 pr-4 text-sm text-white outline-none transition ${
                            errors.date
                              ? 'border-red-400/50'
                              : 'border-white/10 focus:border-teal-400/50'
                          }`}
                        />
                      </div>

                      {errors.date && (
                        <p className="mt-2 text-xs text-red-400">
                          {errors.date}
                        </p>
                      )}
                    </div>

                    {/* TIME */}

                    <div>
                      <label
                        htmlFor="inspection-time"
                        className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-slate-400"
                      >
                        Preferred time
                      </label>

                      <div className="relative">
                        <Clock3
                          size={18}
                          className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-600"
                        />

                        <input
                          id="inspection-time"
                          name="time"
                          type="time"
                          value={form.time}
                          onChange={handleChange}
                          className={`w-full rounded-2xl border bg-slate-900 py-3.5 pl-11 pr-4 text-sm text-white outline-none transition ${
                            errors.time
                              ? 'border-red-400/50'
                              : 'border-white/10 focus:border-teal-400/50'
                          }`}
                        />
                      </div>

                      {errors.time && (
                        <p className="mt-2 text-xs text-red-400">
                          {errors.time}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* MESSAGE */}

                  <div>
                    <label
                      htmlFor="inspection-message"
                      className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-slate-400"
                    >
                      Additional message
                      <span className="ml-2 normal-case tracking-normal text-slate-600">
                        (optional)
                      </span>
                    </label>

                    <div className="relative">
                      <MessageSquare
                        size={18}
                        className="pointer-events-none absolute left-4 top-4 text-slate-600"
                      />

                      <textarea
                        id="inspection-message"
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        rows={4}
                        maxLength={1000}
                        placeholder="Anything you'd like us to know?"
                        className="w-full resize-none rounded-2xl border border-white/10 bg-slate-900 py-3.5 pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-teal-400/50"
                      />
                    </div>
                  </div>

                  {/* SERVER ERROR */}

                  {status === 'error' && (
                    <div className="flex items-start gap-3 rounded-2xl border border-red-400/20 bg-red-400/5 p-4">
                      <AlertCircle
                        size={19}
                        className="mt-0.5 shrink-0 text-red-400"
                      />

                      <div>
                        <p className="text-sm font-semibold text-red-300">
                          Unable to submit request
                        </p>

                        <p className="mt-1 text-xs leading-5 text-red-400/80">
                          {serverMessage}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* SUBMIT */}

                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-teal-400 px-6 py-4 text-sm font-bold uppercase tracking-[0.18em] text-slate-950 transition hover:bg-teal-300 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {status === 'loading' ? (
                      <>
                        <Loader2
                          size={18}
                          className="animate-spin"
                        />
                        Sending request...
                      </>
                    ) : (
                      'Request inspection'
                    )}
                  </button>

                  <p className="text-center text-[11px] leading-5 text-slate-600">
                    By submitting this form, you are
                    requesting an inspection. The Await
                    Apartment team will contact you to
                    confirm availability.
                  </p>
                </div>

                {/* =================================================
                    SELECTED PROPERTY
                ================================================== */}

                <aside className="h-fit rounded-[26px] border border-white/10 bg-slate-900/70 p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-teal-400">
                    Selected property
                  </p>

                  {property?.image ? (
                    <div className="mt-4 aspect-[4/3] overflow-hidden rounded-2xl bg-slate-800">
                      <img
                        src={property.image}
                        alt={
                          property.address?.full ||
                          'Selected property'
                        }
                        className="h-full w-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="mt-4 flex aspect-[4/3] items-center justify-center rounded-2xl bg-slate-800">
                      <span className="text-xs text-slate-600">
                        Image unavailable
                      </span>
                    </div>
                  )}

                  <p className="mt-5 text-xl font-semibold text-white">
                    {formatPrice(property?.price)}
                  </p>

                  <p className="mt-2 flex items-start gap-2 text-sm leading-5 text-slate-400">
                    <MapPin
                      size={16}
                      className="mt-0.5 shrink-0 text-teal-400"
                    />

                    <span>
                      {property?.address?.full ||
                        'Address unavailable'}
                    </span>
                  </p>

                  <div className="mt-5 flex flex-wrap gap-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-500">
                    {property?.bedrooms !==
                      null &&
                      property?.bedrooms !==
                        undefined && (
                        <span className="rounded-full border border-white/10 bg-slate-950 px-3 py-2">
                          {property.bedrooms}{' '}
                          Beds
                        </span>
                      )}

                    {property?.bathrooms !==
                      null &&
                      property?.bathrooms !==
                        undefined && (
                        <span className="rounded-full border border-white/10 bg-slate-950 px-3 py-2">
                          {property.bathrooms}{' '}
                          Baths
                        </span>
                      )}

                    {property?.squareFeet && (
                      <span className="rounded-full border border-white/10 bg-slate-950 px-3 py-2">
                        {Number(
                          property.squareFeet
                        ).toLocaleString()}{' '}
                        Sq Ft
                      </span>
                    )}
                  </div>
                </aside>
              </div>
            </form>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export default InspectionModal