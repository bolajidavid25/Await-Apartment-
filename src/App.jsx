import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Navbar from './components/Navbar'
import HeroSlider from './components/HeroSlider'
import About from './components/About'
import HowItWorks from './components/HowItWorks'
import Projects from './components/Projects'
import Testimonials from './components/Testimonials'
import TrustedBySection from './components/TrustedBySection'
import ContactForm from './components/ContactForm'
import Footer from './components/Footer'
import Properties from './pages/properties'

import useBrandColor from './utils/useBrandColor'
import logo from './assets/logo.png'


const Home = () => {
  return (
    <main className="pt-[104px]">
      <HeroSlider />
      <About />
      <HowItWorks />
      <Projects />
      <Testimonials />
      <TrustedBySection />
      <ContactForm />
    </main>
  )
}


const App = () => {
  useBrandColor(logo)

  return (
    <BrowserRouter>
      <div className="overflow-x-hidden bg-slate-950 text-slate-100">
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/properties" element={<Properties />} />
        </Routes>

        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App
