import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import logo from '../assets/logo.png'

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Properties', href: '#projects' },
  { label: 'Contact', href: '#contact' },
]

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.55, ease: 'easeOut' }}
      className="fixed inset-x-0 top-0 z-[9999] px-4 pt-4"
    >
      <div className="mx-auto max-w-[1200px]">
        <div className="flex items-center justify-between gap-4 rounded-full border border-white/10 bg-[#070B1F]/95 px-6 py-3 shadow-[0_28px_80px_rgba(0,0,0,0.24)] backdrop-blur-xl">
          <div className="flex items-center gap-4">
            <img src={logo} alt="Await Apartment logo" className="h-12 w-12 rounded-3xl object-cover shadow-lg shadow-slate-950/20" />
            <div className="hidden md:block">
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-white">Await Apartment</p>
              <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Luxury Living</p>
            </div>
          </div>

          <nav className="hidden lg:flex">
            <ul className="flex items-center gap-8 text-sm uppercase tracking-[0.28em] text-slate-100">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="transition-colors duration-300 hover:text-[color:var(--brand)] focus:text-[color:var(--brand)] focus:outline-none">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="#contact"
              className="hidden rounded-full bg-[color:var(--brand)] px-6 py-3 text-sm font-semibold uppercase tracking-[0.24em] text-[color:var(--brand-contrast)] transition duration-300 hover:bg-[color:var(--brand)]/90 md:inline-flex"
            >
              Book Inspection
            </a>
            <button
              type="button"
              onClick={() => setMenuOpen((current) => !current)}
              aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-slate-900/90 text-slate-100 transition hover:bg-slate-800 lg:hidden"
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="mt-4 overflow-hidden rounded-[32px] border border-white/10 bg-slate-950/95 p-5 shadow-2xl backdrop-blur-xl lg:hidden"
            >
              <ul className="flex flex-col gap-4 text-sm uppercase tracking-[0.28em] text-slate-100">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                      className="block rounded-2xl px-4 py-3 transition hover:bg-slate-900 hover:text-[color:var(--brand)]"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
                <li>
                  <a
                    href="#contact"
                    className="block rounded-3xl bg-[color:var(--brand)] px-5 py-3 text-center text-sm font-semibold uppercase tracking-[0.24em] text-[color:var(--brand-contrast)] transition hover:bg-[color:var(--brand)]/90"
                  >
                    Book Inspection
                  </a>
                </li>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  )
}

export default Navbar

