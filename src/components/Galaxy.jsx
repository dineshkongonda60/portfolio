import { useEffect, useRef } from 'react'

/**
 * Galaxy
 * Lightweight canvas starfield + drifting nebula particles, inspired by the
 * React Bits "Galaxy" background. Pure canvas2D — no extra GPU deps required,
 * keeps the bundle light and works reliably across devices.
 */
export default function Galaxy({ density = 1 }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let raf
    let width, height, dpr
    let stars = []
    let nebulae = []

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = canvas.clientWidth
      height = canvas.clientHeight
      canvas.width = width * dpr
      canvas.height = height * dpr
      ctx.scale(dpr, dpr)
      buildStars()
    }

    function buildStars() {
      const count = Math.floor(((width * height) / 9000) * density)
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 1.3 + 0.2,
        baseAlpha: Math.random() * 0.6 + 0.25,
        twinkleSpeed: Math.random() * 0.015 + 0.004,
        phase: Math.random() * Math.PI * 2,
        hue: Math.random() > 0.82 ? 'violet' : 'white',
      }))

      nebulae = [
        { x: width * 0.25, y: height * 0.3, r: Math.max(width, height) * 0.45, color: '124, 92, 255', drift: 0.0003 },
        { x: width * 0.75, y: height * 0.6, r: Math.max(width, height) * 0.4, color: '34, 211, 238', drift: -0.00022 },
      ]
    }

    let t = 0
    function draw() {
      ctx.clearRect(0, 0, width, height)

      // base
      ctx.fillStyle = '#05060A'
      ctx.fillRect(0, 0, width, height)

      // nebula glow blobs
      nebulae.forEach((n) => {
        const nx = n.x + Math.sin(t * n.drift * 10) * 40
        const ny = n.y + Math.cos(t * n.drift * 10) * 30
        const grad = ctx.createRadialGradient(nx, ny, 0, nx, ny, n.r)
        grad.addColorStop(0, `rgba(${n.color}, 0.16)`)
        grad.addColorStop(1, `rgba(${n.color}, 0)`)
        ctx.fillStyle = grad
        ctx.fillRect(0, 0, width, height)
      })

      // stars
      stars.forEach((s) => {
        const alpha = reduceMotion
          ? s.baseAlpha
          : s.baseAlpha + Math.sin(t * s.twinkleSpeed * 60 + s.phase) * 0.25
        ctx.beginPath()
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2)
        ctx.fillStyle =
          s.hue === 'violet'
            ? `rgba(180, 160, 255, ${Math.max(0, alpha)})`
            : `rgba(255, 255, 255, ${Math.max(0, alpha)})`
        ctx.fill()
      })

      t += 1
      if (!reduceMotion) raf = requestAnimationFrame(draw)
    }

    resize()
    draw()
    window.addEventListener('resize', resize)
    return () => {
      window.removeEventListener('resize', resize)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [density])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        display: 'block',
      }}
    />
  )
}
