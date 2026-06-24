import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import projects from '../data/projects.json'
import './Projects.css'

export default function Projects({ isActive }) {
  const [selected, setSelected] = useState(null)

  return (
    <section className="projects">
      <div className="section-inner projects__wrap">
        <span className="eyebrow">Selected Projects</span>
        <h2 className="projects__title">
          {projects.length}+ automations, one growing list.
        </h2>
        <p className="projects__sub">
          A snapshot of the automation and AI systems I've architected.
          New projects get added here as they ship.
        </p>

        <div className="projects__grid">
          {projects.map((p, i) => (
            <motion.button
              key={p.name}
              className="projects__card"
              initial={{ opacity: 0, y: 18 }}
              animate={isActive ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.45, delay: i * 0.06 }}
              onClick={() => setSelected(p)}
            >
              <div className="projects__img-wrap">
                <img src={p.imageUrl} alt="" aria-hidden="true" className="projects__img" />
              </div>
              <div className="projects__card-foot">
                <span className="projects__card-name">{p.name}</span>
                <span className="projects__card-arrow" aria-hidden="true">→</span>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selected && (
          <motion.div
            className="projects__modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
          >
            <motion.div
              className="projects__modal"
              role="dialog"
              aria-modal="true"
              aria-labelledby="project-modal-title"
              initial={{ opacity: 0, y: 24, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 14, scale: 0.97 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button className="projects__modal-close" onClick={() => setSelected(null)} aria-label="Close project details">
                ✕
              </button>
              <img src={selected.imageUrl} alt="" aria-hidden="true" className="projects__modal-img" />
              <h3 id="project-modal-title" className="projects__modal-title">{selected.name}</h3>
              <p className="projects__modal-desc">{selected.description}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
