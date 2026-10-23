import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X, ArrowRight, Compass } from 'lucide-react'
import { useLocation, Link } from 'react-router-dom'
import logo from '../assets/logo.png'

const navLinks = [
  { label: 'Home', href: '/#home', id: 'home' },
  { label: 'About', href: '/#about', id: 'about' },
  { label: 'Featured', href: '/#projects', id: 'projects' },
  { label: 'Properties', href: '/properties', id: 'properties' },
  { label: 'Contact', href: '/#contact', id: 'contact' },
]

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  // Track scroll position for transparent -> solid brand transition
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Reset mobile menu on route change
  const [prevPathname, setPrevPathname] = useState(location.pathname)
  if (prevPathname !== location.pathname) {
    setPrevPathname(location.pathname)
    setMenuOpen(false)
  }

  const handleNavClick = (e, href) => {
    setMenuOpen(false)
    if (href.startsWith('/#')) {
      const targetId = href.replace('/#', '')
      if (location.pathname === '/') {
        e.preventDefault()
        const el = document.getElementById(targetId)
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' })
        }
      }
    }
  }

  const isPropertiesPage = location.pathname === '/properties'

  return (
    <motion.header
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-out ${
        isScrolled || menuOpen
          ? 'bg-[#050e18]/95 py-3 shadow-[0_16px_40px_rgba(0,0,0,0.55)] backdrop-blur-2xl border-b border-[color:var(--brand)]/20'
          : 'bg-gradient-to-b from-slate-950/70 via-slate-950/20 to-transparent py-5 sm:py-6'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo & Title */}
        <Link
          to="/"
          className="group flex items-center gap-3.5 focus:outline-none"
          onClick={() => {
            if (location.pathname === '/') {
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }
          }}
        >
          <div className="relative flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center overflow-hidden rounded-2xl border border-white/15 bg-white/5 p-1.5 shadow-md shadow-slate-950/40 backdrop-blur-md transition-transform duration-300 group-hover:scale-105">
            <img
              src={logo}
              alt="Await Apartment Luxury Living"
              className="h-full w-full object-contain"
            />
            <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/10 group-hover:ring-[color:var(--brand)]/50 transition-colors" />
          </div>

          <div className="flex flex-col">
            <span className="font-serif text-sm sm:text-base font-semibold tracking-[0.24em] text-white uppercase transition-colors group-hover:text-slate-100">
              Await Apartment
            </span>
            <span className="text-[10px] font-semibold tracking-[0.32em] text-[color:var(--brand)] uppercase">
              Luxury Living
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center">
          <ul className="flex items-center gap-1 xl:gap-2 rounded-full border border-white/[0.08] bg-slate-950/40 px-3 py-1.5 backdrop-blur-xl shadow-inner shadow-black/20">
            {navLinks.map((link) => {
              const isActive =
                (link.id === 'properties' && isPropertiesPage) ||
                (link.id === 'home' && !isPropertiesPage && !location.hash)

              return (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className={`relative rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] transition-all duration-300 ${
                      isActive
                        ? 'text-white bg-white/10 shadow-sm'
                        : 'text-slate-300 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {link.label}
                    {isActive && (
                      <span className="absolute bottom-1 left-1/2 h-0.5 w-3 -translate-x-1/2 rounded-full bg-[color:var(--brand)]" />
                    )}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        {/* Desktop Actions */}
        <div className="hidden items-center gap-3 md:flex">
          <Link
            to="/properties"
            className="group flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-4 py-2.5 text-xs font-semibold uppercase tracking-[0.2em] text-slate-200 backdrop-blur-md transition-all duration-300 hover:border-white/30 hover:bg-white/10 hover:text-white"
          >
            <Compass size={14} className="text-[color:var(--brand)]" />
            <span>Catalog</span>
          </Link>

          <a
            href={isPropertiesPage ? '/#contact' : '#contact'}
            onClick={(e) => handleNavClick(e, '/#contact')}
            className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-[color:var(--brand)] px-5 py-2.5 text-xs font-bold uppercase tracking-[0.22em] text-[color:var(--brand-contrast)] shadow-lg shadow-[color:var(--brand)]/20 transition-all duration-300 hover:brightness-110 hover:shadow-[color:var(--brand)]/40 hover:scale-[1.02] active:scale-[0.98]"
          >
            <span>Book Inspection</span>
            <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-0.5" />
          </a>
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="flex items-center gap-2 lg:hidden">
          <button
            type="button"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}
            aria-expanded={menuOpen}
            className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/15 bg-slate-900/80 text-white shadow-lg backdrop-blur-xl transition hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-[color:var(--brand)]/50"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay / Drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0, y: -10 }}
            animate={{ opacity: 1, height: 'auto', y: 0 }}
            exit={{ opacity: 0, height: 0, y: -10 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-b border-white/10 bg-[#060c18]/98 px-6 pb-6 pt-3 shadow-2xl backdrop-blur-2xl lg:hidden"
          >
            <div className="mx-auto max-w-md space-y-4">
              <ul className="flex flex-col divide-y divide-white/[0.06] text-xs uppercase tracking-[0.24em] font-medium text-slate-200">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      to={link.href}
                      onClick={(e) => handleNavClick(e, link.href)}
                      className="flex items-center justify-between py-3.5 text-slate-200 transition-colors hover:text-[color:var(--brand)]"
                    >
                      <span>{link.label}</span>
                      <ArrowRight size={14} className="text-slate-500" />
                    </Link>
                  </li>
                ))}
              </ul>

              <div className="pt-2">
                <a
                  href={isPropertiesPage ? '/#contact' : '#contact'}
                  onClick={(e) => handleNavClick(e, '/#contact')}
                  className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[color:var(--brand)] px-5 py-3.5 text-center text-xs font-bold uppercase tracking-[0.22em] text-[color:var(--brand-contrast)] shadow-lg shadow-[color:var(--brand)]/20 transition hover:brightness-110 active:scale-[0.99]"
                >
                  <span>Book Inspection</span>
                  <ArrowRight size={15} />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}

export default Navbar
