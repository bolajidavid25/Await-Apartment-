import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import living1 from '../living 1.jpg'
import living2 from '../living 2.jpg'
import living3 from '../living 3.jpg'
import kitchen1 from '../kitchen 1.jpg'
import kitchen2 from '../kitchen 2.jpg'
import kitchen3 from '../kitchen 3.jpg'
import bedroom1 from '../bedroom 1.jpg'
import bedroom2 from '../bedroom 2.jpg'
import bedroom3 from '../bedroom 3.jpg'

const properties = [
  {
    id: 1,
    name: 'Cedar Ridge Estate',
    location: 'Pacific Grove, CA',
    price: '$3,650,000',
    images: [living1, kitchen1, bedroom1],
    details: ['Open-plan living room', 'Chef’s kitchen', 'Calm master suite'],
  },
  {
    id: 2,
    name: 'Willow Creek Residence',
    location: 'Napa Valley, CA',
    price: '$2,950,000',
    images: [living2, kitchen2, bedroom2],
    details: ['Entertainer’s den', 'Gourmet cooking area', 'Private garden oasis'],
  },
  {
    id: 3,
    name: 'Sierra Summit Home',
    location: 'Lake Tahoe, CA',
    price: '$4,120,000',
    images: [living3, kitchen3, bedroom3],
    details: ['Vaulted ceilings', 'Designer finishes', 'Panoramic views'],
  },
]

const Projects = () => {
  const [activeProject, setActiveProject] = useState(null)

  return (
    <section id="projects" className="bg-slate-900 py-24 text-slate-100 sm:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-12 space-y-4 text-center">
          <p className="text-sm uppercase tracking-[0.35em] text-emerald-300/90">Signature Projects</p>
          <h2 className="text-4xl font-semibold text-white sm:text-5xl">Estate previews designed to inspire confidence.</h2>
          <p className="mx-auto max-w-2xl text-base text-slate-400 sm:text-lg">
            Each project card merges room imagery into a premium preview experience and unlocks a full gallery with a single click.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {properties.map((property) => (
            <motion.button
              key={property.id}
              onClick={() => setActiveProject(property)}
              whileHover={{ y: -4 }}
              className="group overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950/70 p-4 text-left shadow-2xl shadow-slate-950/20 transition duration-300 focus:outline-none"
            >
              <div className="grid gap-2 sm:grid-cols-[1fr_0.95fr]">
                <div className="grid gap-2">
                  <img src={property.images[0]} alt={`${property.name} living`} className="h-40 w-full rounded-[1.75rem] object-cover" />
                  <img src={property.images[1]} alt={`${property.name} kitchen`} className="h-32 w-full rounded-[1.75rem] object-cover" />
                </div>
                <img src={property.images[2]} alt={`${property.name} bedroom`} className="h-full min-h-[240px] w-full rounded-[1.75rem] object-cover" />
              </div>
              <div className="mt-5 space-y-3">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-xl font-semibold text-white">{property.name}</p>
                    <p className="text-sm text-slate-400">{property.location}</p>
                  </div>
                  <p className="rounded-full bg-emerald-500/15 px-4 py-2 text-sm text-emerald-100 ring-1 ring-emerald-300/20">{property.price}</p>
                </div>
                <ul className="space-y-2 text-sm text-slate-300">
                  {property.details.map((detail) => (
                    <li key={detail} className="flex items-center gap-3">
                      <span className="inline-flex h-8 w-8 items-center justify-center rounded-2xl bg-emerald-400/10 text-emerald-300">•</span>
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {activeProject && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/90 px-4 py-8 backdrop-blur-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ y: 32, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 24, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="mx-auto max-w-6xl rounded-[2rem] bg-slate-950 p-6 shadow-2xl shadow-black/60"
            >
              <div className="flex flex-wrap items-start justify-between gap-4 pb-4 sm:flex-nowrap">
                <div>
                  <p className="text-sm uppercase tracking-[0.35em] text-emerald-300/80">Project preview</p>
                  <h3 className="mt-3 text-3xl font-semibold text-white">{activeProject.name}</h3>
                  <p className="mt-2 text-slate-400">{activeProject.location} • {activeProject.price}</p>
                </div>
                <button
                  onClick={() => setActiveProject(null)}
                  className="rounded-full border border-white/10 bg-slate-900/90 px-5 py-3 text-sm uppercase tracking-[0.25em] text-slate-200 transition hover:bg-slate-800"
                >
                  Close
                </button>
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                {activeProject.images.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`${activeProject.name} room ${index + 1}`}
                    className="h-72 w-full rounded-[1.75rem] object-cover shadow-xl shadow-slate-950/30"
                  />
                ))}
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {activeProject.details.map((detail) => (
                  <div key={detail} className="rounded-3xl border border-white/10 bg-slate-900/80 p-5 text-slate-200">
                    <p className="text-sm uppercase tracking-[0.28em] text-emerald-300/80">Feature</p>
                    <p className="mt-3 text-lg">{detail}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

export default Projects
