"use client"

import { useRef, useState } from "react"
import { motion } from "framer-motion"
import { Code, Server, Database, Globe, Palette, Cpu, BrainCircuit, Cloud, Layers, User, Send, Bug } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { useTheme } from "@/components/ThemeProvider"

import { Swiper, SwiperSlide } from "swiper/react"
import { EffectCards, Autoplay, Pagination } from "swiper/modules"
import "swiper/css"
import "swiper/css/effect-cards"
import "swiper/css/pagination"

const Skills = () => {
  const { theme } = useTheme()
  const [activeIndex, setActiveIndex] = useState(0)
  const swiperRef = useRef(null)

  const skills = [
    {
      name: "React",
      short: "UI Development",
      icon: <Code className="h-10 w-10" />,
      color: "bg-gradient-to-br from-cyan-400 to-blue-500",
      textColor: "text-white",
      description: "Building interactive UIs with React and its ecosystem including Redux, Context API, and Hooks.",
    },
    {
      name: "Flask",
      short: "Backend Framework",
      icon: <Server className="h-10 w-10" />,
      color: "bg-gradient-to-br from-yellow-400 to-orange-500",
      textColor: "text-white",
      description: "Lightweight Python web framework for building REST APIs, microservices, and backend logic.",
    },
    {
      name: "MySQL",
      short: "Relational DBMS",
      icon: <Database className="h-10 w-10" />,
      color: "bg-gradient-to-br from-sky-500 to-blue-600",
      textColor: "text-white",
      description: "Relational database design with structured schemas, SQL queries, indexing, and backend integration.",
    },
    {
      name: "Firebase",
      short: "Real-time Backend",
      icon: <Database className="h-10 w-10" />,
      color: "bg-gradient-to-br from-yellow-400 to-amber-500",
      textColor: "text-white",
      description: "Backend-as-a-Service offering real-time DB, Firestore, auth, hosting, and cloud functions.",
    },
    {
      name: "Clerk",
      short: "Auth & User Management",
      icon: <User className="h-10 w-10" />,
      color: "bg-gradient-to-br from-violet-500 to-purple-600",
      textColor: "text-white",
      description: "Authentication platform with pre-built UIs, social login, and integration with modern frameworks.",
    },
    {
      name: "AI Integration",
      short: "AI into Web Apps",
      icon: <BrainCircuit className="h-10 w-10" />,
      color: "bg-gradient-to-br from-violet-500 to-purple-600",
      textColor: "text-white",
      description: "Integrating AI models into apps using APIs, SDKs, and cloud AI platforms.",
    },
    {
      name: "Full-Stack Architecture",
      short: "Scalable Design",
      icon: <Layers className="h-10 w-10" />,
      color: "bg-gradient-to-br from-amber-400 to-orange-500",
      textColor: "text-white",
      description: "Designing modern scalable apps with microservices, APIs, and full-stack toolchains.",
    },
    {
      name: "Postman",
      short: "API Testing",
      icon: <Send className="h-10 w-10" />,
      color: "bg-gradient-to-br from-orange-400 to-amber-600",
      textColor: "text-white",
      description: "Platform for testing, monitoring, and debugging RESTful and GraphQL APIs with collaboration tools.",
    },
    {
      name: "Selenium",
      short: "Automation Testing",
      icon: <Bug className="h-10 w-10" />,
      color: "bg-gradient-to-br from-lime-500 to-emerald-600",
      textColor: "text-white",
      description: "Testing framework for automating browsers with scripting in Python, Java, and more.",
    },
  ]

  return (
    <section id="skills" className="py-20 min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-[#050A1C]/50 via-violet-950/20 to-[#050A1C]/50 dark:from-slate-100/50 dark:via-violet-100/20 dark:to-slate-100/50"></div>
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-violet-600/20 dark:bg-violet-600/10 rounded-full filter blur-[120px] animate-pulse"></div>
        <div
          className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-fuchsia-600/20 dark:bg-fuchsia-600/10 rounded-full filter blur-[120px] animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
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
            My Expertise
          </Badge>
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white dark:text-slate-800">Technical Skills</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-violet-500 to-fuchsia-500 mx-auto mb-6"></div>
          <p className="text-gray-300 dark:text-slate-600 max-w-3xl mx-auto">
            My technical toolkit spans the full development spectrum, enabling me to create seamless, high-performance
            applications from concept to deployment.
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* Skills Detail Panel */}
            <motion.div
              className="order-2 md:order-1"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="p-4 md:p-8 bg-[#0A1428]/80 dark:bg-white/80 backdrop-blur-lg rounded-2xl border border-violet-500/20">
                <h3 className="text-xl md:text-2xl font-bold mb-6 text-white dark:text-slate-800 flex items-center gap-2">
                  <span className="text-white dark:text-slate-800">{skills[activeIndex].icon}</span>
                  {skills[activeIndex].name}
                </h3>
                <div className={`p-4 rounded-xl ${skills[activeIndex].color} bg-opacity-10 mb-6`}>
                  <p className="text-white dark:text-slate-800 text-base font-medium">{skills[activeIndex].short}</p>
                </div>

                <div className="flex flex-wrap gap-3">
                  {skills.map((skill, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        swiperRef.current.swiper.slideTo(index)
                        setActiveIndex(index)
                      }}
                      className={`px-3 py-1.5 rounded-full transition-all duration-300 flex items-center space-x-2 ${
                        activeIndex === index
                          ? "bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white shadow-lg shadow-violet-500/20"
                          : "bg-[#050A1C]/50 dark:bg-slate-200/50 text-gray-400 dark:text-slate-600 hover:text-violet-400 dark:hover:text-violet-600"
                      }`}
                    >
                      <span className="text-sm">{skill.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Carousel Cards */}
            <motion.div
              className="order-1 md:order-2 flex justify-center"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="w-full max-w-[300px]">
                <Swiper
                  ref={swiperRef}
                  effect={"cards"}
                  grabCursor={true}
                  modules={[EffectCards, Autoplay, Pagination]}
                  className="skills-swiper"
                  autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true,
                  }}
                  pagination={{ clickable: true }}
                  onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
                >
                  {skills.map((skill, index) => (
                    <SwiperSlide key={index}>
                      <div
                        className={`w-full h-[350px] rounded-2xl flex flex-col items-center justify-center p-8 ${skill.color}`}
                      >
                        <div className="w-24 h-24 rounded-full bg-white/20 flex items-center justify-center mb-6">
                          <div className="text-white">{skill.icon}</div>
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-2">{skill.name}</h3>
                        <p className="text-white/80 text-center text-sm">{skill.description}</p>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Skills
