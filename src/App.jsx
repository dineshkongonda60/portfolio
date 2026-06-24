import ScrollStack from './components/ScrollStack.jsx'
import Hero from './components/Hero.jsx'
import About from './components/About.jsx'
import Journey from './components/Journey.jsx'
import Skills from './components/Skills.jsx'
import Projects from './components/Projects.jsx'
import Certifications from './components/Certifications.jsx'
import Contact from './components/Contact.jsx'

export default function App() {
  return (
    <ScrollStack>
      <Hero navLabel="Home" />
      <About navLabel="About" />
      <Journey navLabel="Journey" />
      <Skills navLabel="Skills" />
      <Projects navLabel="Projects" />
      <Certifications navLabel="Certs" />
      <Contact navLabel="Contact" />
    </ScrollStack>
  )
}
