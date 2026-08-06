import { ArrowUp } from 'lucide-react'
import { FaCcVisa, FaCcMastercard, FaCcPaypal, FaFacebookF, FaInstagram, FaTwitter, FaRedditAlien, FaLinkedinIn, FaPinterestP, FaWhatsapp, FaTiktok } from 'react-icons/fa'
import { SiStripe } from 'react-icons/si'

const socialItems = [
  { label: 'X', icon: FaTwitter, href: 'https://x.com' },
  { label: 'Facebook', icon: FaFacebookF, href: 'https://facebook.com' },
  { label: 'Instagram', icon: FaInstagram, href: 'https://instagram.com' },
  { label: 'Reddit', icon: FaRedditAlien, href: 'https://reddit.com' },
  { label: 'LinkedIn', icon: FaLinkedinIn, href: 'https://linkedin.com' },
  { label: 'Pinterest', icon: FaPinterestP, href: 'https://pinterest.com' },
  { label: 'WhatsApp', icon: FaWhatsapp, href: 'https://whatsapp.com' },
  { label: 'TikTok', icon: FaTiktok, href: 'https://tiktok.com' },
]

const Footer = () => {
  return (
    <footer className="border-t border-white/10 bg-[#2D2D2D] text-slate-100" style={{ background: 'linear-gradient(180deg, #3A3A3A 0%, #2D2D2D 100%)' }}>
      <div className="mx-auto max-w-7xl px-6 py-16 sm:py-20 lg:px-8">
        <div className="grid gap-10 text-center sm:text-left md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4 md:col-span-2 lg:col-span-1 lg:text-left">
            <p className="text-sm uppercase tracking-[0.35em] text-[color:var(--brand)]/80">Await Apartment</p>
            <h3 className="text-2xl font-semibold text-white">Premium real estate for the discerning buyer.</h3>
            <p className="text-sm leading-7 text-slate-400">Curated residences. Strategic insight. White-glove service built on trust and performance.</p>
          </div>

          <div className="space-y-4">
            <h4 className="text-base font-semibold text-white">Quick Links</h4>
            <ul className="space-y-3 text-sm text-slate-400">
              <li><a href="#home" className="transition hover:text-[color:var(--brand)]">Home</a></li>
              <li><a href="#about" className="transition hover:text-[color:var(--brand)]">About</a></li>
              <li><a href="#projects" className="transition hover:text-[color:var(--brand)]">Properties</a></li>
              <li><a href="#contact" className="transition hover:text-[color:var(--brand)]">Contact</a></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-base font-semibold text-white">Payment Methods</h4>
            <div className="flex flex-wrap justify-center gap-3 text-slate-200 sm:justify-start">
              <span className="inline-flex items-center gap-2 rounded-3xl bg-slate-900/80 px-4 py-3 text-sm shadow-xl shadow-slate-950/20">
                <FaCcVisa size={20} /> Visa
              </span>
              <span className="inline-flex items-center gap-2 rounded-3xl bg-slate-900/80 px-4 py-3 text-sm shadow-xl shadow-slate-950/20">
                <FaCcMastercard size={20} /> Mastercard
              </span>
              <span className="inline-flex items-center gap-2 rounded-3xl bg-slate-900/80 px-4 py-3 text-sm shadow-xl shadow-slate-950/20">
                <FaCcPaypal size={20} /> PayPal
              </span>
              <span className="inline-flex items-center gap-2 rounded-3xl bg-slate-900/80 px-4 py-3 text-sm shadow-xl shadow-slate-950/20">
                <SiStripe size={20} /> Stripe
              </span>
            </div>
            <a href="#contact" className="inline-flex rounded-full border border-white/10 bg-slate-900/80 px-5 py-3 text-sm font-semibold text-[color:var(--brand)] transition hover:border-[color:var(--brand)] hover:bg-slate-900">
              Secure Portal Login
            </a>
          </div>

          <div className="space-y-4">
            <h4 className="text-base font-semibold text-white">Social</h4>
            <div className="flex justify-center sm:justify-start">
              <div className="grid max-w-[280px] grid-cols-3 justify-items-center gap-4 place-items-center sm:grid-cols-4">
                {socialItems.map((item) => {
                  const Icon = item.icon
                  return (
                    <a
                      key={item.label}
                      href={item.href}
                      target="_blank"
                      rel="noreferrer"
                      className="group flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-slate-900/80 text-slate-200 shadow-lg shadow-slate-950/20 transition duration-300 hover:-translate-y-1 hover:scale-105 hover:border-[color:var(--brand)]/30 hover:bg-[color:var(--brand)]/10 hover:text-[color:var(--brand)]"
                      aria-label={item.label}
                    >
                      <Icon size={18} />
                    </a>
                  )
                })}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row">
          <p className="text-center text-sm text-slate-300 sm:text-left">© {new Date().getFullYear()} Await Apartment. All rights reserved.</p>
          <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-slate-300">
            <a href="#" className="transition hover:text-slate-100">Privacy</a>
            <a href="#" className="transition hover:text-slate-100">Terms</a>
            <a href="#" className="transition hover:text-slate-100">Cookie Policy</a>
          </div>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="inline-flex items-center gap-2 rounded-full bg-slate-900/80 px-4 py-3 text-sm text-slate-100 transition hover:bg-slate-800"
          >
            <ArrowUp size={16} /> Back to top
          </button>
        </div>
      </div>
    </footer>
  )
}

export default Footer
