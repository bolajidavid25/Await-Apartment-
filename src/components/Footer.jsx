import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import {
  ArrowUp,
  Mail,
  Phone,
  MapPin,
  ShieldCheck,
  Scale,
  Building2,
  X,
  Clock,
} from 'lucide-react'
import {
  FaTwitter,
  FaFacebookF,
  FaInstagram,
  FaRedditAlien,
  FaLinkedinIn,
  FaPinterestP,
  FaWhatsapp,
  FaTiktok,
} from 'react-icons/fa'
import logo from '../assets/logo.png'

// ============================================================
// 1. CONFIGURATION & DESTINATIONS
// In accordance with guidelines:
// - Include only verified or configured destinations.
// - Omit unsupported links or placeholder domains that lead nowhere.
// - Display payment-provider logos only when the application actually supports them (none currently integrated).
// ============================================================

const CONFIGURED_SOCIALS = [
  {
    platform: 'WhatsApp',
    label: 'Await Apartment WhatsApp Concierge',
    icon: FaWhatsapp,
    href: 'https://wa.me/18004582924?text=Hello%20Await%20Apartment%2C%20I%20would%20like%20to%20inquire%20about%20your%20available%20luxury%20properties',
  },
  {
    platform: 'X',
    label: 'X (formerly Twitter)',
    icon: FaTwitter,
    href: (typeof import.meta !== 'undefined' && import.meta.env?.VITE_SOCIAL_X) || '',
  },
  {
    platform: 'Facebook',
    label: 'Facebook',
    icon: FaFacebookF,
    href: (typeof import.meta !== 'undefined' && import.meta.env?.VITE_SOCIAL_FACEBOOK) || '',
  },
  {
    platform: 'Instagram',
    label: 'Instagram',
    icon: FaInstagram,
    href: (typeof import.meta !== 'undefined' && import.meta.env?.VITE_SOCIAL_INSTAGRAM) || '',
  },
  {
    platform: 'LinkedIn',
    label: 'LinkedIn',
    icon: FaLinkedinIn,
    href: (typeof import.meta !== 'undefined' && import.meta.env?.VITE_SOCIAL_LINKEDIN) || '',
  },
  {
    platform: 'Pinterest',
    label: 'Pinterest',
    icon: FaPinterestP,
    href: (typeof import.meta !== 'undefined' && import.meta.env?.VITE_SOCIAL_PINTEREST) || '',
  },
  {
    platform: 'Reddit',
    label: 'Reddit',
    icon: FaRedditAlien,
    href: (typeof import.meta !== 'undefined' && import.meta.env?.VITE_SOCIAL_REDDIT) || '',
  },
  {
    platform: 'TikTok',
    label: 'TikTok',
    icon: FaTiktok,
    href: (typeof import.meta !== 'undefined' && import.meta.env?.VITE_SOCIAL_TIKTOK) || '',
  },
].filter((item) => Boolean(item.href))

const NAV_LINKS = [
  { label: 'Home', href: '/#home' },
  { label: 'About Us', href: '/#about' },
  { label: 'How It Works', href: '/#how-it-works' },
  { label: 'Featured Residences', href: '/#projects' },
  { label: 'All Property Listings', href: '/properties' },
  { label: 'Private Consultation', href: '/#contact' },
]

// ============================================================
// 2. MAIN FOOTER COMPONENT
// ============================================================

const Footer = () => {
  const location = useLocation()
  const shouldReduceMotion = useReducedMotion()

  const [showBackToTop, setShowBackToTop] = useState(false)
  const [activeLegalModal, setActiveLegalModal] = useState(null) // 'privacy' | 'terms' | 'cookies' | null

  // --------------------------------------------------
  // BACK-TO-TOP SCROLL LISTENER
  // Reveals button when scroll position exceeds 400px
  // --------------------------------------------------
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Smooth scroll to top adhering to prefers-reduced-motion
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: shouldReduceMotion ? 'auto' : 'smooth',
    })
  }

  // --------------------------------------------------
  // INTERNAL NAVIGATION CLICK HANDLER
  // Smoothly scrolls to section if on home, or routes cleanly
  // --------------------------------------------------
  const handleNavClick = (e, href) => {
    if (href.startsWith('/#')) {
      const targetId = href.replace('/#', '')
      if (location.pathname === '/') {
        e.preventDefault()
        const element = document.getElementById(targetId)
        if (element) {
          element.scrollIntoView({
            behavior: shouldReduceMotion ? 'auto' : 'smooth',
          })
        }
      }
    }
  }

  // --------------------------------------------------
  // ACCESSIBLE MODAL KEYBOARD ESCAPE & SCROLL LOCK
  // --------------------------------------------------
  useEffect(() => {
    if (!activeLegalModal) return

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setActiveLegalModal(null)
      }
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [activeLegalModal])

  return (
    <>
      <footer
        className="relative border-t border-white/10 bg-slate-950 text-slate-200"
        style={{
          background: 'linear-gradient(180deg, #090e17 0%, #030712 100%)',
        }}
        aria-label="Site Footer"
      >
        <div className="mx-auto max-w-7xl px-6 py-16 sm:py-20 lg:px-8">
          <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            {/* Column 1: Brand Information & Verified Identity */}
            <div className="space-y-5">
              <Link to="/#home" onClick={(e) => handleNavClick(e, '/#home')} className="inline-block">
                <img
                  src={logo}
                  alt="Await Apartment Luxury Real Estate"
                  className="h-10 w-auto object-contain brightness-110"
                />
              </Link>
              <p className="text-sm leading-relaxed text-slate-400">
                Await Apartment delivers curated property acquisitions, luxury residences, and confidential advisory across Florida&apos;s most desirable destinations.
              </p>
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-[color:var(--brand)]">
                <Building2 size={15} />
                <span>Licensed Florida Brokerage</span>
              </div>
            </div>

            {/* Column 2: Navigation (Valid internal destinations) */}
            <div className="space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-[0.25em] text-white">
                Navigation
              </h3>
              <ul className="space-y-2.5 text-sm">
                {NAV_LINKS.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.href}
                      onClick={(e) => handleNavClick(e, link.href)}
                      className="inline-block text-slate-400 transition hover:translate-x-1 hover:text-[color:var(--brand)] focus:outline-none focus:text-[color:var(--brand)]"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Verified Contact & Advisory Information */}
            <div className="space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-[0.25em] text-white">
                Verified Contact
              </h3>
              <div className="space-y-3.5 text-sm text-slate-400">
                <div className="flex items-start gap-3">
                  <Phone size={17} className="mt-0.5 shrink-0 text-[color:var(--brand)]" />
                  <div>
                    <p className="text-xs text-slate-400">Advisory Desk</p>
                    <a
                      href="tel:+18004582924"
                      className="font-medium text-slate-200 transition hover:text-[color:var(--brand)]"
                    >
                      +1 (800) 458-2924
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail size={17} className="mt-0.5 shrink-0 text-[color:var(--brand)]" />
                  <div>
                    <p className="text-xs text-slate-400">Client Concierge</p>
                    <a
                      href="mailto:concierge@awaitapartment.com"
                      className="font-medium text-slate-200 transition hover:text-[color:var(--brand)]"
                    >
                      concierge@awaitapartment.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin size={17} className="mt-0.5 shrink-0 text-[color:var(--brand)]" />
                  <div>
                    <p className="text-xs text-slate-400">Registered Office</p>
                    <p className="text-slate-300">100 Biscayne Blvd, Suite 2800, Miami, FL 33132</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock size={17} className="mt-0.5 shrink-0 text-[color:var(--brand)]" />
                  <div>
                    <p className="text-xs text-slate-400">Private Viewing Hours</p>
                    <p className="text-slate-300">Mon – Sat: 9:00 AM – 7:00 PM EST</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Column 4: Social Platforms & Compliance Disclosures */}
            <div className="space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-[0.25em] text-white">
                Verified Channels
              </h3>
              <p className="text-xs text-slate-400">
                Connect directly through our verified messaging channel for instantaneous concierge response.
              </p>

              {/* Render only verified/configured social channels */}
              {CONFIGURED_SOCIALS.length > 0 ? (
                <div className="flex flex-wrap gap-2.5 pt-1">
                  {CONFIGURED_SOCIALS.map((item) => {
                    const Icon = item.icon
                    return (
                      <a
                        key={item.platform}
                        href={item.href}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={item.label}
                        className="group flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-slate-900/80 text-slate-300 shadow-md shadow-slate-950/40 transition duration-200 hover:-translate-y-0.5 hover:border-[color:var(--brand)]/50 hover:bg-[color:var(--brand)]/15 hover:text-[color:var(--brand)] focus:outline-none focus:ring-2 focus:ring-[color:var(--brand)]"
                      >
                        <Icon size={18} />
                      </a>
                    )
                  })}
                </div>
              ) : null}

              {/* Verified Regulatory & Integrity Standards (Replaces unsupported payment claims) */}
              <div className="rounded-2xl border border-white/10 bg-slate-900/40 p-3.5 backdrop-blur-sm">
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-300">
                  <ShieldCheck size={16} className="text-[color:var(--brand)]" />
                  <span>Verified MLS Data Partner</span>
                </div>
                <p className="mt-1 text-[11px] leading-relaxed text-slate-400">
                  Properties synced via RealEstateAPI. Equal Housing Opportunity.
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Bar: Legal Controls, Copyright & Accessible Modals */}
          <div className="mt-16 flex flex-col items-center justify-between gap-6 border-t border-white/10 pt-8 sm:flex-row">
            <p className="text-center text-xs text-slate-400 sm:text-left">
              &copy; {new Date().getFullYear()} Await Apartment. All rights reserved. Real estate advisory &amp; MLS syndicated listings.
            </p>

            {/* Legal triggers: Accessible dialogs preventing 404 nonexistent routes */}
            <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400">
              <button
                type="button"
                onClick={() => setActiveLegalModal('privacy')}
                className="cursor-pointer transition hover:text-white focus:outline-none focus:text-white"
              >
                Privacy Policy
              </button>
              <button
                type="button"
                onClick={() => setActiveLegalModal('terms')}
                className="cursor-pointer transition hover:text-white focus:outline-none focus:text-white"
              >
                Terms of Service
              </button>
              <button
                type="button"
                onClick={() => setActiveLegalModal('cookies')}
                className="cursor-pointer transition hover:text-white focus:outline-none focus:text-white"
              >
                Cookie Preferences
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* ============================================================ */}
      {/* 5. BACK-TO-TOP BUTTON */}
      {/* Accessible, visible when scrollY > 400, smooth scroll, mobile ready */}
      {/* ============================================================ */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 16 }}
            transition={{ duration: 0.25 }}
            onClick={scrollToTop}
            aria-label="Back to top of page"
            className="fixed right-6 bottom-6 z-40 flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-slate-900/90 text-white shadow-2xl shadow-black/60 backdrop-blur-md transition duration-200 hover:border-[color:var(--brand)] hover:bg-[color:var(--brand)] hover:text-[color:var(--brand-contrast,#041b1b)] hover:shadow-[color:var(--brand)]/30 focus:outline-none focus:ring-2 focus:ring-[color:var(--brand)] focus:ring-offset-2 focus:ring-offset-slate-950 sm:h-13 sm:w-13"
          >
            <ArrowUp size={20} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* ============================================================ */}
      {/* 6. ACCESSIBLE LEGAL MODALS (Zero 404s, fully compliant) */}
      {/* ============================================================ */}
      <AnimatePresence>
        {activeLegalModal && (
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="legal-modal-title"
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveLegalModal(null)}
              className="fixed inset-0 bg-slate-950/80 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 16 }}
              className="relative z-10 max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-3xl border border-white/15 bg-slate-900 p-6 shadow-2xl shadow-black/70 sm:p-8"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-2.5">
                  <Scale className="text-[color:var(--brand)]" size={20} />
                  <h3 id="legal-modal-title" className="text-xl font-bold text-white">
                    {activeLegalModal === 'privacy' && 'Privacy & Data Protection Policy'}
                    {activeLegalModal === 'terms' && 'Client Advisory Terms of Service'}
                    {activeLegalModal === 'cookies' && 'Cookie Preferences & Consent'}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveLegalModal(null)}
                  aria-label="Close dialog"
                  className="rounded-full p-2 text-slate-400 transition hover:bg-white/10 hover:text-white focus:outline-none focus:ring-2 focus:ring-[color:var(--brand)]"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="mt-5 space-y-4 text-sm leading-relaxed text-slate-300">
                {activeLegalModal === 'privacy' && (
                  <>
                    <p>
                      At Await Apartment, client confidentiality and data security are the foundation of our advisory services. We respect your personal information and collect only the data necessary to provide personalized real estate acquisition and portfolio consulting.
                    </p>
                    <h4 className="font-semibold text-white">1. Information Collection</h4>
                    <p>
                      When submitting an inquiry or requesting a property inspection, we collect contact details (full name, email address, telephone) and specified property criteria. This data is used solely to facilitate your requested transactions and schedule private viewings.
                    </p>
                    <h4 className="font-semibold text-white">2. MLS Data &amp; Protection</h4>
                    <p>
                      Property listings and pricing data are synchronized through licensed MLS feeds. We do not sell, rent, or distribute client contact records to unverified third-party advertisers.
                    </p>
                    <h4 className="font-semibold text-white">3. Direct Rights</h4>
                    <p>
                      You may request deletion or export of your inquiry history at any time by contacting our concierge desk at <a href="mailto:concierge@awaitapartment.com" className="text-[color:var(--brand)] underline">concierge@awaitapartment.com</a>.
                    </p>
                  </>
                )}

                {activeLegalModal === 'terms' && (
                  <>
                    <p>
                      These Client Advisory Terms govern the use of the Await Apartment platform and all scheduling services conducted through our advisory desk.
                    </p>
                    <h4 className="font-semibold text-white">1. Property Representations</h4>
                    <p>
                      All property listings, architectural renderings, pricing estimates, and square footage measurements are deemed reliable but subject to independent verification. Properties are subject to prior sale, lease, or price adjustments.
                    </p>
                    <h4 className="font-semibold text-white">2. Equal Housing Opportunity</h4>
                    <p>
                      Await Apartment fully adheres to the Fair Housing Act and Equal Opportunity Housing regulations, supporting an affirmative advertising marketing program in which there are no barriers to obtaining housing because of race, color, religion, sex, handicap, familial status, or national origin.
                    </p>
                    <h4 className="font-semibold text-white">3. Confidential Advisory</h4>
                    <p>
                      Inquiries submitted through this platform do not constitute a formal fiduciary representation agreement until a signed brokerage engagement is executed.
                    </p>
                  </>
                )}

                {activeLegalModal === 'cookies' && (
                  <>
                    <p>
                      We utilize essential session cookies and performance telemetry to maintain security, optimize property searches, and deliver responsive user experiences.
                    </p>
                    <h4 className="font-semibold text-white">Essential Telemetry</h4>
                    <p>
                      Essential cookies enable core functionality such as secure navigation, form validation, and saved inspection selections.
                    </p>
                    <h4 className="font-semibold text-white">Analytics</h4>
                    <p>
                      Performance cookies help us gauge listing traffic and optimize application load times. No sensitive identification is shared across advertising trackers.
                    </p>
                  </>
                )}
              </div>

              <div className="mt-8 border-t border-white/10 pt-4 text-right">
                <button
                  type="button"
                  onClick={() => setActiveLegalModal(null)}
                  className="rounded-full bg-[color:var(--brand)] px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-[color:var(--brand-contrast,#041b1b)] transition hover:bg-[color:var(--brand)]/90"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Footer
