import { useState } from 'react'
import { motion } from 'framer-motion'
import './Contact.css'

const LINKS = [
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/in/dinesh-kongonda/',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.38-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 110-4.12 2.06 2.06 0 010 4.12zM7.12 20.45H3.56V9h3.56v11.45z" />
      </svg>
    ),
  },
  {
    name: 'Email',
    href: 'mailto:dineshkongonda60@gmail.com',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="M3 7l9 6 9-6" />
      </svg>
    ),
  },
  {
    name: 'YouTube',
    href: 'https://www.youtube.com/@DataTechnologyUniverse',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M21.6 7.2s-.21-1.48-.86-2.13c-.82-.86-1.74-.86-2.16-.91C15.6 4 12 4 12 4h-.01s-3.59 0-6.58.16c-.42.05-1.34.05-2.16.91-.65.65-.86 2.13-.86 2.13S2.18 8.93 2.18 10.66v1.62c0 1.73.21 3.46.21 3.46s.21 1.48.86 2.13c.82.86 1.9.83 2.38.92 1.73.17 7.37.21 7.37.21s3.6-.01 6.59-.17c.42-.05 1.34-.05 2.16-.91.65-.65.86-2.13.86-2.13s.21-1.73.21-3.46v-1.62c0-1.73-.21-3.46-.21-3.46zM9.96 14.98V8.71l5.75 3.14-5.75 3.13z" />
      </svg>
    ),
  },
]

export default function Contact({ isActive }) {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState('idle') // idle | sent

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Wire this up to your form backend of choice (Formspree, Resend, EmailJS, etc.)
    // before going live — currently a front-end only confirmation.
    setStatus('sent')
  }

  return (
    <section className="contact">
      <div className="section-inner contact__grid">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isActive ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }}
          className="contact__form-col"
        >
          <span className="eyebrow">Get in Touch</span>
          <h2 className="contact__title">Let's build something that runs itself.</h2>

          {status === 'sent' ? (
            <div className="contact__success">
              <p>Message received — I'll reply soon.</p>
              <button className="contact__again" onClick={() => { setStatus('idle'); setForm({ name: '', email: '', message: '' }) }}>
                Send another message
              </button>
            </div>
          ) : (
            <form className="contact__form" onSubmit={handleSubmit}>
              <div className="contact__field">
                <label htmlFor="name">Name</label>
                <input id="name" name="name" type="text" required value={form.name} onChange={handleChange} placeholder="Your name" />
              </div>
              <div className="contact__field">
                <label htmlFor="email">Email</label>
                <input id="email" name="email" type="email" required value={form.email} onChange={handleChange} placeholder="you@company.com" />
              </div>
              <div className="contact__field">
                <label htmlFor="message">Message</label>
                <textarea id="message" name="message" rows={4} required value={form.message} onChange={handleChange} placeholder="Tell me about your project or idea" />
              </div>
              <button type="submit" className="contact__submit">Send message</button>
            </form>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isActive ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, delay: 0.12 }}
          className="contact__info-col"
        >
          <p className="contact__info-text">
            I build automation, AI workflows, agentic systems, and intelligent
            RPA solutions. Feel free to reach out for collaboration,
            opportunities or just to say hi!
          </p>

          <div className="contact__links">
            {LINKS.map((l) => (
              <a key={l.name} href={l.href} target="_blank" rel="noopener noreferrer" className="contact__link">
                <span className="contact__link-icon">{l.icon}</span>
                {l.name}
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
