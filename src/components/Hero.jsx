"use client"

import { useState, useEffect, useRef } from "react"
import { ArrowDown, ExternalLink, FileText } from "lucide-react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useTheme } from "@/components/ThemeProvider"

const Hero = () => {
  const { theme } = useTheme()
  const [typedText, setTypedText] = useState("")
  const fullText = "Full-Stack Developer"
  const [currentIndex, setCurrentIndex] = useState(0)
  const [showCursor, setShowCursor] = useState(true)
  const canvasRef = useRef(null)

  useEffect(() => {
    if (currentIndex < fullText.length) {
      const timeout = setTimeout(() => {
        setTypedText((prevText) => prevText + fullText[currentIndex])
        setCurrentIndex((prevIndex) => prevIndex + 1)
      }, 100)

      return () => clearTimeout(timeout)
    } else {
      // Blink cursor after typing is complete
      const blinkInterval = setInterval(() => {
        setShowCursor((prev) => !prev)
      }, 500)

      return () => clearInterval(blinkInterval)
    }
  }, [currentIndex, fullText])

  // Canvas animation
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    const particles = []
    const particleCount = 100

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Create particles
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2 + 1,
        color:
          theme === "dark"
            ? `rgba(${Math.floor(Math.random() * 100 + 155)}, ${Math.floor(Math.random() * 100 + 155)}, ${Math.floor(Math.random() * 255)}, ${Math.random() * 0.5 + 0.1})`
            : `rgba(${Math.floor(Math.random() * 100 + 55)}, ${Math.floor(Math.random() * 100 + 55)}, ${Math.floor(Math.random() * 155 + 100)}, ${Math.random() * 0.5 + 0.1})`,
        speedX: Math.random() * 2 - 1,
        speedY: Math.random() * 2 - 1,
        connections: [],
      })
    }

    const connectParticles = () => {
      for (let i = 0; i < particles.length; i++) {
        particles[i].connections = []
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 150) {
            particles[i].connections.push({
              particle: particles[j],
              distance,
            })
          }
        }
      }
    }

    const animate = () => {
      requestAnimationFrame(animate)
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Update and draw particles
      particles.forEach((particle) => {
        particle.x += particle.speedX
        particle.y += particle.speedY

        // Bounce off edges
        if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1
        if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1

        // Draw particle
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2)
        ctx.fillStyle = particle.color
        ctx.fill()

        // Draw connections
        particle.connections.forEach((connection) => {
          const opacity = 1 - connection.distance / 150
          ctx.beginPath()
          ctx.moveTo(particle.x, particle.y)
          ctx.lineTo(connection.particle.x, connection.particle.y)
          ctx.strokeStyle =
            theme === "dark" ? `rgba(139, 92, 246, ${opacity * 0.2})` : `rgba(109, 40, 217, ${opacity * 0.2})`
          ctx.lineWidth = 1
          ctx.stroke()
        })
      })

      connectParticles()
    }

    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [theme])

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Canvas background */}
      <canvas ref={canvasRef} className="absolute inset-0 -z-10"></canvas>

      {/* Background gradient */}
      <div className="absolute inset-0 -z-20 bg-gradient-to-b from-[#050A1C] via-violet-950/20 to-[#050A1C] dark:from-slate-100 dark:via-violet-100/20 dark:to-slate-100"></div>

      <div className="container mx-auto px-4 z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          <motion.div
            className="md:w-1/2 text-center md:text-left"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mb-4"
            >
              <Badge variant="subtle" className="mb-4">
                Available for Freelance
              </Badge>
              <motion.h1
                className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <span className="block text-white dark:text-slate-800 mb-2">Hi, I'm</span>
                <span className="bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
                  Arin Dhimar
                </span>
              </motion.h1>
            </motion.div>

            <motion.h2
              className="text-2xl md:text-3xl font-medium text-gray-300 dark:text-slate-700 mb-6 h-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              {typedText}
              <span className={`${showCursor ? "opacity-100" : "opacity-0"} transition-opacity`}>|</span>
            </motion.h2>

            <motion.p
              className="text-gray-400 dark:text-slate-600 mb-8 max-w-lg mx-auto md:mx-0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              I build intuitive, user-centric web applications with clean design and high performance. Currently
              pursuing my master's degree, I bring both academic insight and real-world experience to my work.
            </motion.p>

            <motion.div
              className="flex flex-wrap gap-4 justify-center md:justify-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <Button
                variant="glow"
                size="lg"
                onClick={() => document.getElementById("projects").scrollIntoView({ behavior: "smooth" })}
                className="group"
              >
                View Projects
                <ExternalLink className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>

              <Button
                variant="outline2"
                size="lg"
                onClick={() => document.getElementById("github-activity").scrollIntoView({ behavior: "smooth" })}
              >
                See My Activity
              </Button>

              <a
                href="https://drive.google.com/file/d/1miSW2m7sjjUmjaaNaWWdxuuPRiPSb6yF/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="outline2" size="lg" className="flex items-center">
                  <FileText className="mr-2 h-4 w-4" />
                  Resume
                </Button>
              </a>
            </motion.div>
          </motion.div>

          <motion.div
            className="md:w-1/2 flex justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <div className="relative">
              {/* Decorative elements */}
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-violet-500/20 rounded-full filter blur-3xl animate-pulse"></div>
              <div
                className="absolute -bottom-10 -right-10 w-40 h-40 bg-fuchsia-500/20 rounded-full filter blur-3xl animate-pulse"
                style={{ animationDelay: "1s" }}
              ></div>

              {/* Profile image with glow effect */}
              <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-violet-500/20 shadow-[0_0_30px_rgba(139,92,246,0.3)]">
                <div className="absolute inset-0 bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20"></div>
                <img
                  src="https://i.ibb.co/cSPZgxmZ/401721.jpg"
                  alt="Arin Dhimar"
                  className="w-full h-full object-cover"
                  crossOrigin="anonymous"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 dark:from-white/80 to-transparent"></div>
              </div>

              {/* Floating badges */}
              <motion.div
                className="absolute -top-1 -right-1 bg-[#0A1428]/80 dark:bg-white/80 backdrop-blur-sm border border-violet-500/20 px-3 py-1.5 rounded-full shadow-lg"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.5 }}
              >
                <span className="text-sm font-medium text-violet-400 dark:text-violet-600">Flask</span>
              </motion.div>

              <motion.div
                className="absolute -bottom-5 -left-5 bg-[#0A1428]/80 dark:bg-white/80 backdrop-blur-sm border border-fuchsia-500/20 px-3 py-1.5 rounded-full shadow-lg"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1, duration: 0.5 }}
              >
                <span className="text-sm font-medium text-fuchsia-400 dark:text-fuchsia-600">Full-Stack Dev</span>
              </motion.div>
            </div>
          </motion.div>
        </div>

        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0, y: -20 }}
          animate={{
            opacity: 1,
            y: 0,
            transition: { delay: 1.5, duration: 0.5 },
          }}
        >
          <motion.a
            href="#skills"
            aria-label="Scroll down"
            animate={{
              y: [0, 10, 0],
              transition: {
                duration: 1.5,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "loop",
              },
            }}
            className="flex items-center flex-col"
          >
            <span className="text-sm text-violet-400 dark:text-violet-600 mb-2">Scroll Down</span>
            <ArrowDown className="h-6 w-6 text-violet-400 dark:text-violet-600" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}

export default Hero
