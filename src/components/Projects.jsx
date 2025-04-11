"use client"

import { useState, useRef, useEffect } from "react"
import { ExternalLink, Github, ChevronRight, ChevronLeft } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { useTheme } from "@/components/ThemeProvider"

const Projects = () => {
  const { theme } = useTheme()
  const [currentProject, setCurrentProject] = useState(0)
  const [direction, setDirection] = useState(0)
  const [autoplay, setAutoplay] = useState(true)
  const autoplayRef = useRef(null)
  const constraintsRef = useRef(null)

  const projects = [
    {
      id: 1,
      title: "ANIMEX",
      description:
        "A scalable anime streaming platform with HLS video streaming, background video processing via FFmpeg, admin dashboard, editable metadata, genre & episode management, and secure file uploads. Built with a full-stack MVC architecture.",
      image: "https://i.ibb.co/k0r9TFC/Logo-No-Backgroud.png",
      tags: ["React", "Tailwind CSS", "Flask", "MySQL", "FFmpeg", "HLS", "MVC","Rest-API"],
      demoLink: "#",
      codeLink: "https://github.com/arindhimar",
      features: [
        "HLS Streaming with FFmpeg",
        "Background video processing using Python threads",
        "Genre, Anime & Episode Management",
        "Real-time search and inline editing",
        "RESTful Flask APIs with MVC structure",
        "Secure file uploads & queue system"
      ],
      color: "from-violet-600 to-fuchsia-600",
    },    
    {
      id: 2,
      title: "Dev-Litics",
      description:
        "An AI-powered IDE extension and analytics platform that prevents resume fraud by tracking real coding activity, language usage, and project contributions with automated social sharing and HR dashboards.",
      image: "/projects/dev-litics.png", 
      tags: ["VS Code Extension", "JavaScript", "React", "Flask", "ShadCn", "Tailwind CSS", "MySQL","Rest-API"],
      demoLink: "#", 
      codeLink: "https://github.com/arindhimar",
      features: [
        "Tracks coding time, language, and project automatically",
        "In-memory tracking with 3–4 sec idle detection",
        "AI-based commit summarizer for auto social media posts",
        "Dashboard with verified analytics for HRs, students & teachers",
      ],
      color: "from-purple-600 to-indigo-600",
    },    
    {
      id: 3,
      title: "Web-Tether",
      description:
        "A decentralized uptime monitoring platform where validators manually ping websites to verify availability and earn coins, enabling a trust-based ecosystem for site monitoring.",
      image: "/projects/web-tether.png",
      tags: ["React", "Flask", "MySQL", "REST-API", "Clerk", "Tailwind","ShadCn"],
      demoLink: "#", 
      codeLink: "https://github.com/arindhimar/WebTether", 
      features: [
        "Validator system with manual pinging",
        "Incentive mechanism using coins for validators",
        "User reporting and validator flagging",
        "Robust role-based architecture (Users, Validators, Reports)",
        "Region-based ping tracking and latency recording",
        "Secure authentication with Clerk",
        "Reward logic based on ping contributions",
      ],
      color: "from-teal-600 to-cyan-600",
    },    
    {
      id: 4,
      title: "BookAura",
      description:
        "A comprehensive multilingual book platform for reading and listening with secure role-based access, intelligent moderation, and seamless UX.",
      image: "/images/projects/bookaura-cover.png", 
      tags: ["React", "Flask", "MySQL", "Text-to-Speech", "JWT","ShadCn","Rest-API"],
      demoLink: "#", 
      codeLink: "https://github.com/arindhimar/BookAura",
      features: [
        "Role-based access (Admin, Publisher, Author, Normal User)",
        "AI-powered book moderation (PyMuPDF + OpenCV)",
        "Text-to-Speech in English, Hindi, and Marathi",
        "Upload & manage PDF and audio versions",
        "Bookmarking, reading history, audio requests",
        "Categorized and searchable library",
        "Responsive pixel-perfect UI with theme toggle",
        "PDF reader and integrated recommendation engine",
        "Marathi/Hindi speech synthesis via Bhashini API (planned)"
      ],
      color: "from-indigo-600 to-purple-600"
    }    
  ]

  const nextProject = () => {
    setDirection(1)
    setCurrentProject((prev) => (prev === projects.length - 1 ? 0 : prev + 1))
  }

  const prevProject = () => {
    setDirection(-1)
    setCurrentProject((prev) => (prev === 0 ? projects.length - 1 : prev - 1))
  }

  // Handle autoplay
  useEffect(() => {
    if (autoplay) {
      autoplayRef.current = setInterval(() => {
        nextProject()
      }, 5000)
    }

    return () => {
      if (autoplayRef.current) {
        clearInterval(autoplayRef.current)
      }
    }
  }, [autoplay, currentProject])

  // Pause autoplay on hover
  const handleMouseEnter = () => setAutoplay(false)
  const handleMouseLeave = () => setAutoplay(true)

  const variants = {
    enter: (direction) => {
      return {
        x: direction > 0 ? 1000 : -1000,
        opacity: 0,
      }
    },
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction) => {
      return {
        zIndex: 0,
        x: direction < 0 ? 1000 : -1000,
        opacity: 0,
      }
    },
  }

  return (
    <section id="projects" className="py-20 relative overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-[#050A1C]/50 via-fuchsia-950/20 to-[#050A1C]/50 dark:from-slate-100/50 dark:via-fuchsia-100/20 dark:to-slate-100/50"></div>
        <div className="absolute top-1/4 -left-20 w-80 h-80 bg-violet-600/10 rounded-full filter blur-[100px]"></div>
        <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-fuchsia-600/10 rounded-full filter blur-[100px]"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
        >
          <Badge variant="subtle" className="mb-4">
            My Work
          </Badge>
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white dark:text-slate-800">Featured Projects</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-violet-500 to-fuchsia-500 mx-auto mb-6"></div>
          <p className="text-gray-300 dark:text-slate-600 max-w-3xl mx-auto">
            Here are some of my recent projects that showcase my skills and expertise in full-stack development, UI/UX
            design, and problem-solving.
          </p>
        </motion.div>

        <motion.div
          className="relative max-w-6xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          ref={constraintsRef}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <Card className="overflow-hidden border-violet-500/20 bg-[#0A1428]/50 dark:bg-white/50 backdrop-blur-sm">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={currentProject}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 },
                }}
                className="flex flex-col lg:flex-row"
              >
                <div className="lg:w-1/2 p-6 lg:p-10">
                  <div className="flex items-center mb-4">
                    <Badge variant="subtle">
                      Project {currentProject + 1}/{projects.length}
                    </Badge>
                  </div>

                  <h3 className="text-2xl md:text-3xl font-bold mb-4 bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
                    {projects[currentProject].title}
                  </h3>

                  <p className="text-gray-300 dark:text-slate-600 mb-6">{projects[currentProject].description}</p>

                  <div className="mb-6">
                    <h4 className="text-lg font-semibold mb-3 text-white dark:text-slate-800">Key Features:</h4>
                    <ul className="space-y-2">
                      {projects[currentProject].features.map((feature, index) => (
                        <motion.li
                          key={index}
                          className="flex items-start"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: 0.1 * index }}
                        >
                          <span className="mr-2 mt-1 text-violet-400 dark:text-violet-600">•</span>
                          <span className="text-gray-300 dark:text-slate-600">{feature}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {projects[currentProject].tags.map((tag, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: 0.2 + 0.05 * index }}
                      >
                        <Badge variant="outline" className="border-violet-500/20 text-gray-300 dark:text-slate-600">
                          {tag}
                        </Badge>
                      </motion.div>
                    ))}
                  </div>

                  <div className="flex space-x-4">
                    <Button variant="glow" size="sm" asChild>
                      <a href={projects[currentProject].demoLink} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Live Demo
                      </a>
                    </Button>

                    <Button variant="outline2" size="sm" asChild>
                      <a href={projects[currentProject].codeLink} target="_blank" rel="noopener noreferrer">
                        <Github className="h-4 w-4 mr-2" />
                        View Code
                      </a>
                    </Button>
                  </div>
                </div>

                <div className="lg:w-1/2 relative">
                  <div className="relative h-full min-h-[300px] group">
                    <img
                      src={projects[currentProject].image || "/placeholder.svg"}
                      alt={projects[currentProject].title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      crossOrigin="anonymous"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 dark:from-white/90 via-black/30 dark:via-white/30 to-transparent"></div>
                  </div>
                  <div className="absolute inset-0 flex items-end justify-between p-4">
                    <Button
                      variant="outline2"
                      size="icon"
                      onClick={prevProject}
                      aria-label="Previous project"
                      className="rounded-full backdrop-blur-sm"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </Button>
                    <Button
                      variant="outline2"
                      size="icon"
                      onClick={nextProject}
                      aria-label="Next project"
                      className="rounded-full backdrop-blur-sm"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </Card>

          <div className="mt-8 flex justify-center">
            <div className="flex space-x-2">
              {projects.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setDirection(index > currentProject ? 1 : -1)
                    setCurrentProject(index)
                  }}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    currentProject === index
                      ? "bg-gradient-to-r from-violet-500 to-fuchsia-500 scale-125"
                      : "bg-gray-700 dark:bg-gray-400 hover:bg-gray-600 dark:hover:bg-gray-500"
                  }`}
                  aria-label={`Go to project ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Projects
