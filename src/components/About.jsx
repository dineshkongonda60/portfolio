import { motion } from 'framer-motion'
import './About.css'

const strengths = [
  { label: 'Automation Architecture', code: '01' },
  { label: 'Intelligent Automation & AI', code: '02' },
  { label: 'Governance Frameworks', code: '03' },
  { label: 'CoE Development', code: '04' },
]

export default function About({ isActive }) {
  return (
    <section className="about" id="about">
      <div className="section-inner about__grid">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isActive ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="about__copy"
        >
          <span className="eyebrow">About Me</span>
          <h2 className="about__title">
            Building automation ecosystems, not just bots.
          </h2>

          <p className="about__para">
            I'm an RPA Solution Architect with 12+ years of experience designing
            and delivering intelligent automation across Finance, Supply Chain,
            CRM, Healthcare and Banking.
          </p>
          <p className="about__para">
            With deep expertise in Automation Anywhere A360, SAP automation,
            OCR/IDP, API orchestrations, and modern AI/LLM-driven workflows,
            I help organizations build scalable automation ecosystems.
          </p>
          <p className="about__para">
            My core strengths include automation architecture, CoE
            development, governance frameworks, and intelligent automation
            using the latest AI capabilities.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isActive ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="about__strengths"
        >
          {strengths.map((s) => (
            <div className="about__strength-card" key={s.code}>
              <span className="about__strength-code">{s.code}</span>
              <span className="about__strength-label">{s.label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
