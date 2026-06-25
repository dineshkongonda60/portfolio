import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import projects from '../data/projects.json'
import './Projects.css'

export default function Projects({ isActive }) {
  const [selected, setSelected] = useState(null)
  const sliderRef = useRef(null)

  /* ✅ Scroll arrows */
  const scroll = (dir) => {
    const cardWidth = 280
    sliderRef.current?.scrollBy({
      left: dir === 'left' ? -cardWidth : cardWidth,
      behavior: 'smooth'
    })
  }

  /* ✅ CENTER ACTIVE CARD (Netflix-style) */
  const centerCard = (el) => {
    if (!sliderRef.current || !el) return

    const container = sliderRef.current
    const card = el

    const cardCenter = card.offsetLeft + card.offsetWidth / 2
    const containerCenter = container.clientWidth / 2

    container.scrollTo({
      left: cardCenter - containerCenter,
      behavior: 'smooth'
    })
  }

  return (
    <section className="projects">
      <div className="section-inner projects__wrap">
        <span className="eyebrow">Selected Projects</span>

        <h2 className="projects__title">
          {projects.length}+ automations, one growing list.
        </h2>

        <p className="projects__sub">
          A snapshot of the automation and AI systems I've architected.
        </p>

        <div className="projects__slider">
          {/* ✅ Arrows */}
          <button
            className="projects__arrow projects__arrow--left"
            onClick={() => scroll('left')}
          >
            ‹
          </button>

          <div className="projects__grid" ref={sliderRef}>
            {projects.map((p, i) => (
              <motion.button
                key={p.name}
                className="projects__card"
                initial={{ opacity: 0, y: 18 }}
                animate={isActive ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.45, delay: i * 0.06 }}
                onClick={(e) => {
                  setSelected(p)
                  centerCard(e.currentTarget) /* ✅ center clicked */
                }}
              >
                <div className="projects__img-wrap">
                  <img
                    src={p.imageUrl}
                    alt=""
                    className="projects__img"
                  />
                </div>

                <div className="projects__card-foot">
                  <span className="projects__card-name">
                    {p.name}
                  </span>
                  <span className="projects__card-arrow">→</span>
                </div>
              </motion.button>
            ))}
          </div>

          <button
            className="projects__arrow projects__arrow--right"
            onClick={() => scroll('right')}
          >
            ›
          </button>
        </div>
      </div>

      {/* ✅ Modal */}
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
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, y: 24, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 14, scale: 0.97 }}
              transition={{ duration: 0.25 }}
            >
              <button
                className="projects__modal-close"
                onClick={() => setSelected(null)}
              >
                ✕
              </button>

              <img
                src={selected.imageUrl}
                alt=""
                className="projects__modal-img"
              />

              <h3 className="projects__modal-title">
                {selected.name}
              </h3>

              <p className="projects__modal-desc">
                {selected.description}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
