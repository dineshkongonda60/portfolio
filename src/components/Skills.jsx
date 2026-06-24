import { motion } from 'framer-motion'
import './Skills.css'

const skills = [
  { name: 'Automation Anywhere', icon: '/skills/automation-anywhere.png', tag: 'RPA Platform' },
  { name: 'UiPath', icon: '/skills/uipath.png', tag: 'RPA Platform' },
  { name: 'Python', icon: '/skills/python.png', tag: 'Language' },
  { name: 'Agentic AI', icon: '/skills/agentic-ai.svg', tag: 'AI Systems' },
  { name: 'LLM Workflows', icon: '/skills/llm.png', tag: 'AI Systems' },
  { name: 'Kore.AI', icon: '/skills/koreai.png', tag: 'Conversational AI' },
]

export default function Skills({ isActive }) {
  return (
    <section className="skills">
      <div className="section-inner skills__wrap">
        <span className="eyebrow">Skills & Stack</span>
        <h2 className="skills__title">Tools I architect with.</h2>

        <div className="skills__grid">
          {skills.map((s, i) => (
            <motion.div
              key={s.name}
              className="skills__card"
              initial={{ opacity: 0, y: 18 }}
              animate={isActive ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.45, delay: i * 0.07 }}
            >
              <div className="skills__icon-wrap">
                <img src={s.icon} alt="" aria-hidden="true" className="skills__icon" />
              </div>
              <span className="skills__name">{s.name}</span>
              <span className="skills__tag">{s.tag}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
