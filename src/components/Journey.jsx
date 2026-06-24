import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './Journey.css'

const journey = [
  {
    id: 'arch',
    role: 'RPA Solution Architect',
    period: '2022 – Present',
    desc: 'Architecting enterprise‑grade RPA, AI and Agentic solutions, defining automation strategy and mentoring teams.',
  },
  {
    id: 'senior',
    role: 'Senior RPA Developer',
    period: '2019 – 2022',
    desc: 'Designed large‑scale SAP, Salesforce and OCR‑based automations, delivering end‑to‑end RPA solutions.',
  },
  {
    id: 'analyst',
    role: 'RPA Technology Analyst',
    period: '2017 – 2019',
    desc: 'Built attended and unattended bots, optimized workflows, and collaborated with business stakeholders.',
  },
  {
    id: 'dev',
    role: 'RPA Developer',
    period: '2014 – 2017',
    desc: 'Started my software career building automation scripts and strong programming foundations.',
  },
]

// reverse so the path reads chronologically left -> right (oldest to newest)
const ordered = [...journey].reverse()

export default function Journey({ isActive }) {
  const [activeId, setActiveId] = useState(null)
  const [pinnedId, setPinnedId] = useState(null)

  const shownId = pinnedId ?? activeId

  const handleSelect = (id) => {
    setPinnedId((prev) => (prev === id ? null : id))
  }

  return (
    <section className="journey">
      <div className="section-inner journey__wrap">
        <span className="eyebrow">Career Journey</span>
        <h2 className="journey__title">Twelve years on the automation trace.</h2>

        <div className="journey__track">
          <svg className="journey__line" viewBox="0 0 1000 60" preserveAspectRatio="none" aria-hidden="true">
            <line x1="40" y1="30" x2="960" y2="30" stroke="#1E2235" strokeWidth="2" />
            <motion.line
              x1="40" y1="30" x2="960" y2="30"
              stroke="url(#journeyGradient)"
              strokeWidth="2"
              initial={{ pathLength: 0 }}
              animate={isActive ? { pathLength: 1 } : { pathLength: 0 }}
              transition={{ duration: 1.4, ease: 'easeInOut' }}
            />
            <defs>
              <linearGradient id="journeyGradient" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#7C5CFF" />
                <stop offset="100%" stopColor="#22D3EE" />
              </linearGradient>
            </defs>
          </svg>

          <div className="journey__nodes">
            {ordered.map((item, i) => (
              <button
                key={item.id}
                className={`journey__node ${shownId === item.id ? 'is-active' : ''}`}
                style={{ '--delay': `${i * 0.12}s` }}
                onMouseEnter={() => setActiveId(item.id)}
                onMouseLeave={() => setActiveId(null)}
                onFocus={() => setActiveId(item.id)}
                onBlur={() => setActiveId(null)}
                onClick={() => handleSelect(item.id)}
                aria-expanded={shownId === item.id}
              >
                <span className="journey__node-dot" />
                <span className="journey__node-period">{item.period.split('–')[0].trim()}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="journey__card-zone">
          <AnimatePresence mode="wait">
            {shownId ? (
              <motion.div
                key={shownId}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className="journey__card"
              >
                {(() => {
                  const item = journey.find((j) => j.id === shownId)
                  return (
                    <>
                      <div className="journey__card-head">
                        <h3>{item.role}</h3>
                        <span className="journey__card-period">{item.period}</span>
                      </div>
                      <p>{item.desc}</p>
                    </>
                  )
                })()}
              </motion.div>
            ) : (
              <motion.p
                key="hint"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="journey__hint"
              >
                Hover or tap a point on the trace to see the role.
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
