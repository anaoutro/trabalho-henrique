import { useEffect, useRef } from 'react'

// Linhas de código REAIS — React, Java, Python
const CODE_LINES = [
  { text: 'import React from "react"', color: '#e8457e' },
  { text: 'const [state, setState] = useState()', color: '#2d7ff9' },
  { text: 'function handleSubmit(event) {', color: '#e8457e' },
  { text: '  event.preventDefault()', color: '#8b92a8' },
  { text: '  const data = new FormData()', color: '#2d7ff9' },
  { text: 'export default function App() {', color: '#e8457e' },
  { text: '  return <div className="app">', color: '#8b92a8' },
  { text: 'useEffect(() => {', color: '#2d7ff9' },
  { text: '  fetch("/api/users")', color: '#8b92a8' },
  { text: '    .then(res => res.json())', color: '#2d7ff9' },
  { text: 'public class Main {', color: '#e8457e' },
  { text: '  public static void main(String[] args) {', color: '#2d7ff9' },
  { text: '    System.out.println("Hello");', color: '#8b92a8' },
  { text: '    ArrayList<String> list = new ArrayList<>();', color: '#2d7ff9' },
  { text: '@RestController', color: '#e8457e' },
  { text: '@GetMapping("/api/data")', color: '#e8457e' },
  { text: 'ResponseEntity.ok(result)', color: '#2d7ff9' },
  { text: 'def train_model(data):', color: '#e8457e' },
  { text: '  model = Sequential()', color: '#2d7ff9' },
  { text: '  model.fit(X_train, y_train)', color: '#8b92a8' },
  { text: 'npm install react-router-dom', color: '#2d7ff9' },
  { text: 'git commit -m "feat: login"', color: '#e8457e' },
  { text: 'docker build -t app .', color: '#8b92a8' },
  { text: 'const router = createBrowserRouter()', color: '#2d7ff9' },
  { text: '<Route path="/home" element={<Home />} />', color: '#e8457e' },
  { text: 'async function authenticate(token) {', color: '#2d7ff9' },
  { text: '  const user = await verifyToken(token)', color: '#8b92a8' },
  { text: 'SELECT * FROM users WHERE id = ?', color: '#e8457e' },
  { text: 'INSERT INTO logs VALUES (?, ?)', color: '#2d7ff9' },
  { text: 'try { await db.connect() }', color: '#8b92a8' },
  { text: 'catch (err) { console.error(err) }', color: '#e8457e' },
  { text: 'interface User { name: string }', color: '#2d7ff9' },
  { text: 'render() { return this.state }', color: '#8b92a8' },
  { text: '@Autowired private UserService service;', color: '#e8457e' },
  { text: 'spring.datasource.url=jdbc:mysql', color: '#2d7ff9' },
  { text: 'import tensorflow as tf', color: '#8b92a8' },
  { text: 'loss = tf.keras.losses.MSE()', color: '#e8457e' },
  { text: 'optimizer = Adam(lr=0.001)', color: '#2d7ff9' },
  { text: 'plt.plot(history.history["loss"])', color: '#8b92a8' },
  { text: 'const ctx = canvas.getContext("2d")', color: '#2d7ff9' },
]

export default function CodeScene() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    let w, h
    let particles = []
    let mouse = { x: -999, y: -999, active: false }
    let animId

    function resize() {
      const container = canvas.parentElement
      w = canvas.width = container.clientWidth * 2
      h = canvas.height = container.clientHeight * 2
      canvas.style.width = container.clientWidth + 'px'
      canvas.style.height = container.clientHeight + 'px'
      ctx.scale(2, 2) // Retina
      initParticles()
    }

    function initParticles() {
      particles = []
      const realW = w / 2
      const realH = h / 2
      const count = Math.floor(realH / 18)

      for (let i = 0; i < count; i++) {
        const line = CODE_LINES[i % CODE_LINES.length]
        particles.push({
          text: line.text,
          color: line.color,
          x: Math.random() * realW * 0.9,
          y: (i / count) * realH,
          baseY: (i / count) * realH,
          baseX: Math.random() * realW * 0.9,
          vx: 0,
          vy: 0,
          speed: 0.15 + Math.random() * 0.3,
          opacity: 0.12 + Math.random() * 0.35,
          baseOpacity: 0.12 + Math.random() * 0.35,
          size: 11 + Math.random() * 3,
          depth: Math.random(), // 0 = far, 1 = near
        })
      }
    }

    function draw() {
      const realW = w / 2
      const realH = h / 2
      ctx.clearRect(0, 0, realW, realH)

      for (const p of particles) {
        // Movimento lento pra cima (como código sendo compilado)
        p.baseY -= p.speed * 0.3
        if (p.baseY < -30) {
          p.baseY = realH + 20
          p.baseX = Math.random() * realW * 0.9
          p.x = p.baseX
        }

        // Drift horizontal lento
        p.baseX += Math.sin(Date.now() * 0.0003 + p.baseY * 0.01) * 0.08

        // INTERAÇÃO COM MOUSE — repulsão/explosão
        if (mouse.active) {
          const dx = p.x - mouse.x
          const dy = p.y - mouse.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          const radius = 150

          if (dist < radius) {
            const force = (1 - dist / radius) * 8
            const angle = Math.atan2(dy, dx)
            p.vx += Math.cos(angle) * force
            p.vy += Math.sin(angle) * force

            // Brilhar quando perto do mouse
            p.opacity = Math.min(1, p.baseOpacity + (1 - dist / radius) * 0.6)
          } else {
            p.opacity += (p.baseOpacity - p.opacity) * 0.05
          }
        } else {
          p.opacity += (p.baseOpacity - p.opacity) * 0.03
        }

        // Voltar suavemente pra posição base
        p.vx *= 0.92
        p.vy *= 0.92
        p.x += p.vx
        p.y += p.vy

        // Atração de volta
        p.x += (p.baseX - p.x) * 0.02
        p.y += (p.baseY - p.y) * 0.02

        // Desenhar
        ctx.save()
        ctx.globalAlpha = p.opacity * (0.5 + p.depth * 0.5)
        ctx.font = `${Math.round(p.size * (0.7 + p.depth * 0.3))}px "SF Mono", "Fira Code", "Consolas", monospace`
        ctx.fillStyle = p.color
        ctx.fillText(p.text, p.x, p.y)
        ctx.restore()
      }

      animId = requestAnimationFrame(draw)
    }

    // Mouse events
    const handleMove = (e) => {
      const rect = canvas.getBoundingClientRect()
      mouse.x = e.clientX - rect.left
      mouse.y = e.clientY - rect.top
      mouse.active = true
    }

    const handleLeave = () => {
      mouse.active = false
    }

    // Click = explosão forte
    const handleClick = (e) => {
      const rect = canvas.getBoundingClientRect()
      const mx = e.clientX - rect.left
      const my = e.clientY - rect.top

      for (const p of particles) {
        const dx = p.x - mx
        const dy = p.y - my
        const dist = Math.sqrt(dx * dx + dy * dy)
        const radius = 250

        if (dist < radius) {
          const force = (1 - dist / radius) * 25
          const angle = Math.atan2(dy, dx)
          p.vx += Math.cos(angle) * force
          p.vy += Math.sin(angle) * force
        }
      }
    }

    canvas.addEventListener('mousemove', handleMove)
    canvas.addEventListener('mouseleave', handleLeave)
    canvas.addEventListener('click', handleClick)
    window.addEventListener('resize', resize)

    resize()
    draw()

    return () => {
      cancelAnimationFrame(animId)
      canvas.removeEventListener('mousemove', handleMove)
      canvas.removeEventListener('mouseleave', handleLeave)
      canvas.removeEventListener('click', handleClick)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        display: 'block',
        cursor: 'crosshair',
      }}
    />
  )
}
