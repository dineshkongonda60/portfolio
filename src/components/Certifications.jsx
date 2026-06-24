import { motion } from 'framer-motion'
import './Certifications.css'

const certs = [
  { name: 'Automation Anywhere Advanced Certified', issuer: 'Automation Anywhere', level: 'Advanced' },
  { name: 'Automation Anywhere Master Certified', issuer: 'Automation Anywhere', level: 'Master' },
  { name: 'UiPath Foundation Developer', issuer: 'UiPath', level: 'Foundation' },
  { name: 'Xceptor Foundation Developer', issuer: 'Xceptor', level: 'Foundation' },
  { name: 'Kore.AI Basic Certified', issuer: 'Kore.AI', level: 'Basic' },
  { name: 'Kore.AI Advanced Certified', issuer: 'Kore.AI', level: 'Advanced' },
]

export default function Certifications({ isActive }) {
  return (
    <section className="certs">
      <div className="section-inner certs__wrap">
        <span className="eyebrow">Certifications & Badges</span>
        <h2 className="certs__title">Credentialed across the automation stack.</h2>

        <div className="certs__grid">
          {certs.map((c, i) => (
            <motion.div
              key={c.name}
              className="certs__card"
              initial={{ opacity: 0, y: 18 }}
              animate={isActive ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.06 }}
            >
              <div className="certs__badge" aria-hidden="true">
                <svg width="34" height="34" viewBox="0 0 34 34" fill="none">
                  <circle cx="17" cy="17" r="15" stroke="currentColor" strokeWidth="1.6" />
                  <path d="M17 9l2.4 4.9 5.4.8-3.9 3.8.9 5.4L17 21.4l-4.8 2.5.9-5.4-3.9-3.8 5.4-.8L17 9z" fill="currentColor" />
                </svg>
              </div>
              <div className="certs__body">
                <span className="certs__level">{c.level}</span>
                <h3 className="certs__name">{c.name}</h3>
                <span className="certs__issuer">{c.issuer}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
