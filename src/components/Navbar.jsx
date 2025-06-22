"use client"

import { useState, useEffect } from "react"
import { Menu, X, Moon, Sun, ArrowLeft } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { useTheme } from "@/components/ThemeProvider"

const Navbar = ({ activeSection, onSectionChange, isFunPage = false, onBack }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { theme, toggleTheme } = useTheme()

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }

      // Only handle scroll-based section detection for portfolio page
      if (!isFunPage) {
        const sections = ["home", "skills", "projects", "github-activity", "achievements"]
        let maxVisibleSection = null
        let maxVisibleHeight = 0

        for (const sectionId of sections) {
          const section = document.getElementById(sectionId)
          if (section) {
            const rect = section.getBoundingClientRect()
            const visibleHeight = Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0)

            if (visibleHeight > maxVisibleHeight && visibleHeight > 0) {
              maxVisibleHeight = visibleHeight
              maxVisibleSection = sectionId
            }
          }
        }

        if (maxVisibleSection && maxVisibleSection !== activeSection) {
          onSectionChange(maxVisibleSection)
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [onSectionChange, activeSection, isFunPage])

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && !event.target.closest(".mobile-menu") && !event.target.closest(".menu-button")) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
      document.body.style.overflow = "auto"
    }
  }, [isOpen])

  const toggleMenu = () => setIsOpen(!isOpen)

  // Navigation links based on page type
  const navLinks = isFunPage
    ? [
        { name: "Hot Wheels", id: "hotwheels" },
        { name: "Anime", id: "anime" },
        { name: "Quotes", id: "quotes" },
      ]
    : [
        { name: "Home", id: "home" },
        { name: "Skills", id: "skills" },
        { name: "Projects", id: "projects" },
        { name: "GitHub", id: "github-activity" },
        { name: "Achievements", id: "achievements" },
      ]

  const handleNavClick = (id) => {
    console.log("Nav clicked:", id) // Debug log

    if (isFunPage) {
      // For fun page, just change the active section (no scrolling)
      onSectionChange(id)
    } else {
      // Handle portfolio page navigation with scrolling
      const element = document.getElementById(id)
      if (element) {
        element.scrollIntoView({ behavior: "smooth" })
        onSectionChange(id)
      }
    }

    if (isOpen) setIsOpen(false)
  }

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#050A1C]/80 dark:bg-slate-100/80 backdrop-blur-md border-b border-violet-500/20"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            {isFunPage ? (
              <div className="flex items-center">
                {/* <Button
                  variant="ghost"
                  onClick={onBack}
                  className="mr-3 text-gray-400 dark:text-slate-600 hover:text-violet-400 dark:hover:text-violet-600"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back
                </Button>
                <span className="text-xl font-bold bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
                  Fun Stuff
                </span> */}
                              <button
                onClick={() => handleNavClick("home")}
                className="text-xl font-bold bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent hover:scale-105 transition-transform duration-300"
              >
                Arin Dhimar
              </button>
              </div>
            ) : (
              <button
                onClick={() => handleNavClick("home")}
                className="text-xl font-bold bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent hover:scale-105 transition-transform duration-300"
              >
                Arin Dhimar
              </button>
            )}
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              {navLinks.map((link) => (
                <Button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  variant={activeSection === link.id ? "ghost2" : "ghost"}
                  className={`relative ${
                    activeSection === link.id
                      ? "text-violet-400 dark:text-violet-600"
                      : "text-gray-300 dark:text-slate-700"
                  }`}
                >
                  {link.name}
                  {activeSection === link.id && (
                    <motion.span
                      layoutId="activeSection"
                      className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-violet-400 to-fuchsia-400"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    ></motion.span>
                  )}
                </Button>
              ))}
            </div>

            <div className="flex items-center space-x-2 ml-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                className="ml-2 text-gray-400 dark:text-slate-600 hover:text-violet-400 dark:hover:text-violet-600"
                aria-label="Toggle theme"
              >
                {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </Button>
            </div>
          </div>

          <div className="flex md:hidden items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="text-gray-400 dark:text-slate-600"
            >
              {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMenu}
              aria-expanded={isOpen ? "true" : "false"}
              aria-label="Toggle menu"
              className="text-gray-400 dark:text-slate-600 menu-button"
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "100vh" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden overflow-hidden fixed inset-0 top-16 mobile-menu"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-[#050A1C]/95 dark:bg-slate-100/95 backdrop-blur-lg h-full flex flex-col">
              <div className="flex-1">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.id}
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.1, duration: 0.3 }}
                    className="px-3 py-2"
                  >
                    <Button
                      onClick={() => handleNavClick(link.id)}
                      variant={activeSection === link.id ? "ghost2" : "ghost"}
                      className={`w-full justify-start ${
                        activeSection === link.id
                          ? "text-violet-400 dark:text-violet-600"
                          : "text-gray-300 dark:text-slate-700"
                      }`}
                    >
                      {link.name}
                    </Button>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}

export default Navbar
