import Navbar from './components/Navbar'
import HeroSlider from './components/HeroSlider'
import About from './components/About'
import HowItWorks from './components/HowItWorks'
import Projects from './components/Projects'
import Testimonials from './components/Testimonials'
import TrustedBySection from './components/TrustedBySection'
import ContactForm from './components/ContactForm'
import Footer from './components/Footer'
import useBrandColor from './utils/useBrandColor'
import logo from './assets/logo.png'

const App = () => {
  useBrandColor(logo)

  return (
    <div className="overflow-x-hidden bg-slate-950 text-slate-100">
      <Navbar />
      <main className="pt-[104px]">
        <HeroSlider />
        <About />
        <HowItWorks />
        <Projects />
        <Testimonials />
        <TrustedBySection />
        <ContactForm />
      </main>
      <Footer />
    </div>
  )
}

export default App

