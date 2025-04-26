"use client"

import { useState, useEffect } from "react"
import Navbar from "./components/Navbar"
import Hero from "./components/Hero"
import Skills from "./components/Skills"
import Projects from "./components/Projects"
import Achievements from "./components/Achievements"
import Footer from "./components/Footer"
import Loader from "./components/Loader"
import CustomCursor from "./components/CustomCursor"
import { AnimatePresence } from "framer-motion"
import { ThemeProvider } from "./components/ThemeProvider"
import ParticlesBackground from "./components/ParticlesBackground"
import GithubActivity from "./components/GithubActivity"
import SocialSidebar from "./components/SocialSidebar"
import QuoteSection from "./components/QuoteSection"

function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [activeSection, setActiveSection] = useState("home")

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  // Handle navigation
  const handleSectionChange = (section) => {
    setActiveSection(section)
  }

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gradient-to-b from-[#050A1C] via-[#0F1A36] to-[#050A1C] dark:from-[#f1f5f9] dark:via-[#e2e8f0] dark:to-[#f1f5f9] text-white dark:text-gray-900">
        <CustomCursor />
        <ParticlesBackground />
        <AnimatePresence mode="wait">
          {isLoading ? (
            <Loader key="loader" />
          ) : (
            <>
              <Navbar activeSection={activeSection} onSectionChange={handleSectionChange} />
              <SocialSidebar />
              <main>
                <Hero />
                <QuoteSection />
                <Skills />
                <Projects />
                <GithubActivity />
                <Achievements />
              </main>
              <Footer onSectionChange={handleSectionChange} />
            </>
          )}
        </AnimatePresence>
      </div>
    </ThemeProvider>
  )
}

export default App
