import { useState } from 'react'
import { motion } from 'framer-motion'
import './Contact.css'

const LINKS = [
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/in/dinesh-kongonda/',
    icon: <span>in</span>
  },
  {
    name: 'Email',
    href: 'mailto:dineshkongonda60@gmail.com',
    icon: <span>@</span>
  },
  {
    name: 'YouTube',
    href: 'https://www.youtube.com/@DataTechnologyUniverse',
    icon: <span>▶</span>
  }
]

export default function Contact({ isActive }) {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState('idle')

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setStatus('sent')
  }

  return (
    <section className="contact">
      <div className="contact__grid">

        {/* ✅ LEFT SIDE (INFO) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isActive ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }}
          className="contact__info-col"
        >
          <span className="eyebrow">Get in Touch</span>

          <h2 className="contact__title">
            Let's build something that runs itself.
          </h2>

          <p className="contact__info-text">
            I build automation, AI workflows, agentic systems, and intelligent
            RPA solutions. Feel free to reach out for collaboration,
            opportunities or just to say hi!
          </p>

          <div className="contact__links">
            {LINKS.map((l) => (
              <a key={l.name} href={l.href} target="_blank" className="contact__link">
                <span className="contact__link-icon">{l.icon}</span>
                {l.name}
              </a>
            ))}
          </div>
        </motion.div>

        {/* ✅ RIGHT SIDE (FORM) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isActive ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, delay: 0.1 }}
          className="contact__form-col"
        >
          {status === 'sent' ? (
            <div className="contact__success">
              <p>Message received — I'll reply soon.</p>
              <button
                className="contact__again"
                onClick={() => {
                  setStatus('idle')
                  setForm({ name: '', email: '', message: '' })
                }}
              >
                Send another message
              </button>
            </div>
          ) : (
            <form className="contact__form" onSubmit={handleSubmit}>
              <div className="contact__field">
                <label>Name</label>
                <input name="name" value={form.name} onChange={handleChange} required />
              </div>

              <div className="contact__field">
                <label>Email</label>
                <input name="email" type="email" value={form.email} onChange={handleChange} required />
              </div>

              <div className="contact__field">
                <label>Message</label>
                <textarea name="message" rows={4} value={form.message} onChange={handleChange} required />
              </div>

              <button className="contact__submit">
                Send message
              </button>
            </form>
          )}
        </motion.div>

      </div>
    </section>
  )
}
