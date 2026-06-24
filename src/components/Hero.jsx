import { motion } from 'framer-motion'
import Galaxy from './Galaxy.jsx'
import './Hero.css'

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero__bg">
        <Galaxy density={1} />
        <div className="hero__vignette" />
      </div>

      <div className="section-inner hero__content">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="hero__text"
        >
          <span className="eyebrow">RPA · AI · AGENTIC SYSTEMS</span>
          <h1 className="hero__title">
            I build the bridge from <br />RPA to Agentic AI.
          </h1>
          <p className="hero__sub">
            12+ years designing and deploying intelligent automation —
            from rule-based RPA bots to agentic AI systems —
            across Finance, Supply Chain, CRM, Healthcare and Banking.
          </p>
          <div className="hero__stats">
            <div className="hero__stat">
              <span className="hero__stat-num">12+</span>
              <span className="hero__stat-label">Years Experience</span>
            </div>
            <div className="hero__stat-divider" />
            <div className="hero__stat">
              <span className="hero__stat-num">50+</span>
              <span className="hero__stat-label">Automations Deployed</span>
            </div>
          </div>
          <a href="#about" className="hero__cta">
            Explore my work
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M3 7h8M7 3l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.15 }}
          className="hero__avatar-wrap"
        >
          <div className="hero__avatar-ring" />
          <img src="/avatar.png" alt="Portrait avatar" className="hero__avatar" />
        </motion.div>
      </div>

      <div className="hero__scroll-hint" aria-hidden="true">
        <span>Scroll</span>
        <div className="hero__scroll-line" />
      </div>
    </section>
  )
}
