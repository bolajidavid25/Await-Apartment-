import { useEffect, useState } from 'react'
import logo from '../logo.png'

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
]

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40)
    }
    handleScroll()
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className={`fixed inset-x-0 top-0 z-40 transition-all duration-500 ${scrolled ? 'bg-slate-950/95 shadow-[0_8px_28px_-16px_rgba(15,23,42,0.8)] backdrop-blur-xl' : 'bg-transparent'}`}>
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 sm:px-10 lg:px-16">
        <a href="#home" className="flex items-center gap-3 text-white">
          <img src={logo} alt="Brand logo" className="h-10 w-10 rounded-2xl object-cover" />
          <span className="text-lg font-semibold tracking-[0.12em]">Elite Realty</span>
        </a>
        <nav className="hidden items-center gap-8 text-sm uppercase tracking-[0.24em] text-slate-100 md:flex">
          {navLinks.map((link) => (
            <a key={link.label} href={link.href} className="transition hover:text-emerald-300">
              {link.label}
            </a>
          ))}
        </nav>
        <a href="#contact" className="rounded-full border border-emerald-300/30 bg-emerald-500/10 px-5 py-2 text-sm font-semibold uppercase tracking-[0.22em] text-emerald-200 transition hover:bg-emerald-500/20 hover:text-white">
          Inquire
        </a>
      </div>
    </header>
  )
}

export default Navbar
