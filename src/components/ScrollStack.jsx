import { useEffect, useRef, useState, Children, cloneElement } from 'react'
import './ScrollStack.css'

/**
 * ScrollStack
 * Each child section pins to the viewport as it reaches the top,
 * then scales down slightly and dims as the next section stacks on top of it —
 * inspired by the React Bits "Scroll Stack" pattern.
 */
export default function ScrollStack({ children }) {
  const containerRef = useRef(null)
  const sectionRefs = useRef([])
  const [activeIndex, setActiveIndex] = useState(0)
  const childArray = Children.toArray(children)

  useEffect(() => {
    const onScroll = () => {
      const sections = sectionRefs.current
      let newActive = 0
      sections.forEach((el, i) => {
        if (!el) return
        const rect = el.getBoundingClientRect()
        const progress = 1 - rect.top / window.innerHeight
        const scale = Math.max(0.88, 1 - Math.max(0, progress - 1) * 0.12)
        const opacity = Math.max(0.25, 1 - Math.max(0, progress - 1) * 0.9)
        el.style.setProperty('--stack-scale', scale)
        el.style.setProperty('--stack-opacity', opacity)
        if (rect.top < window.innerHeight * 0.5) newActive = i
      })
      setActiveIndex(newActive)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  const scrollTo = (i) => {
    sectionRefs.current[i]?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="scroll-stack" ref={containerRef}>
      {childArray.map((child, i) => (
        <div
          className="scroll-stack__section"
          key={child.key ?? i}
          ref={(el) => (sectionRefs.current[i] = el)}
          style={{ zIndex: i + 1 }}
        >
          <div className="scroll-stack__sticky">
            <div className="scroll-stack__inner">
              {cloneElement(child, { isActive: activeIndex === i })}
            </div>
          </div>
        </div>
      ))}

      <nav className="scroll-stack__dots" aria-label="Section navigation">
        {childArray.map((child, i) => (
          <button
            key={i}
            className={`scroll-stack__dot ${activeIndex === i ? 'is-active' : ''}`}
            onClick={() => scrollTo(i)}
            aria-label={`Go to ${child.props.navLabel || `section ${i + 1}`}`}
            aria-current={activeIndex === i}
          >
            <span className="scroll-stack__dot-label">{child.props.navLabel}</span>
          </button>
        ))}
      </nav>
    </div>
  )
}
