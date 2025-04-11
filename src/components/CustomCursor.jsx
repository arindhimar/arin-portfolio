"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { useTheme } from "@/components/ThemeProvider"

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState(false)
  const [isClicking, setIsClicking] = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  const { theme } = useTheme()

  useEffect(() => {
    const updatePosition = (e) => {
      setPosition({ x: e.clientX, y: e.clientY })
      if (!isVisible) setIsVisible(true)
    }

    const handleMouseLeave = () => {
      setIsVisible(false)
    }

    const handleMouseEnter = () => {
      setIsVisible(true)
    }

    const handleMouseDown = () => {
      setIsClicking(true)
    }

    const handleMouseUp = () => {
      setIsClicking(false)
    }

    const handleHoverStart = (e) => {
      if (
        e.target.tagName === "A" ||
        e.target.tagName === "BUTTON" ||
        e.target.closest("a") ||
        e.target.closest("button") ||
        e.target.role === "button" ||
        e.target.closest('[role="button"]')
      ) {
        setIsHovering(true)
      } else {
        setIsHovering(false)
      }
    }

    window.addEventListener("mousemove", updatePosition)
    window.addEventListener("mousemove", handleHoverStart)
    document.body.addEventListener("mouseleave", handleMouseLeave)
    document.body.addEventListener("mouseenter", handleMouseEnter)
    document.body.addEventListener("mousedown", handleMouseDown)
    document.body.addEventListener("mouseup", handleMouseUp)

    // Hide default cursor
    document.body.style.cursor = "none"

    return () => {
      window.removeEventListener("mousemove", updatePosition)
      window.removeEventListener("mousemove", handleHoverStart)
      document.body.removeEventListener("mouseleave", handleMouseLeave)
      document.body.removeEventListener("mouseenter", handleMouseEnter)
      document.body.removeEventListener("mousedown", handleMouseDown)
      document.body.removeEventListener("mouseup", handleMouseUp)

      // Restore default cursor
      document.body.style.cursor = "auto"
    }
  }, [isVisible, isHovering])

  if (!isVisible) return null

  return (
    <>
      {/* Main cursor dot */}
      <motion.div
        className="fixed top-0 left-0 rounded-full z-[9999] pointer-events-none"
        style={{
          x: position.x - 5,
          y: position.y - 5,
          width: isClicking ? "12px" : "10px",
          height: isClicking ? "12px" : "10px",
          backgroundColor: theme === "dark" ? "rgba(46, 25, 207, 0.9)" : "rgba(139, 92, 246, 0.9)",
        }}
        animate={{
          scale: isClicking ? 0.8 : 1,
        }}
        transition={{ type: "spring", stiffness: 500, damping: 28 }}
      />

      {/* Cursor ring */}
      <motion.div
        className="fixed top-0 left-0 rounded-full z-[9998] pointer-events-none"
        style={{
          x: position.x - 24,
          y: position.y - 24,
          borderWidth: "2px",
          borderStyle: "solid",
          borderColor: theme === "dark" ? "rgba(236, 75, 75, 0.5)" : "rgba(139, 92, 246, 0.5)",
        }}
        animate={{
          width: isHovering ? "60px" : "40px",
          height: isHovering ? "60px" : "40px",
          x: isHovering ? position.x - 30 : position.x - 20,
          y: isHovering ? position.y - 30 : position.y - 20,
          opacity: isHovering ? 0.8 : 0.4,
          borderColor: isHovering 
            ? theme === "dark" ? "rgba(236, 75, 75, 0.5)" : "rgba(139, 92, 246, 0.5)"
            : theme === "dark" ? "rgba(236, 75, 75, 0.5)" : "rgba(139, 92, 246, 0.5)",
        }}
        transition={{ type: "spring", stiffness: 150, damping: 15 }}
      />
    </>
  )
}

export default CustomCursor
