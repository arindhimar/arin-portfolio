"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { createClient } from "@supabase/supabase-js"

// Supabase configuration
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY
const supabase = supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null

const PINNED_QUOTE = {
  content:
    "Unity is strength,but numbers alone don’t create power.A single determined mind can outmatch the many.",
  author: "Arin Dhimar",
  isPinned: true,
}

const StickyNote = () => {
  const [allQuotes, setAllQuotes] = useState([])
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(-1) // -1 for pinned quote
  const [rotation, setRotation] = useState(0)
  const [isOpen, setIsOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  const quotes = [
    "The only way to do great work is to love what you do. — Steve Jobs",
    "Innovation distinguishes between a leader and a follower. — Steve Jobs",
    "Life is what happens when you're busy making other plans. — John Lennon",
    "The future belongs to those who believe in the beauty of their dreams. — Eleanor Roosevelt",
    "It is during our darkest moments that we must focus to see the light. — Aristotle",
    "The way to get started is to quit talking and begin doing. — Walt Disney",
    "Don't let yesterday take up too much of today. — Will Rogers",
    "You have within you right now, everything you need to deal with whatever the world throws at you. — Brian Tracy",
  ]

  useEffect(() => {
    const fetchQuotes = async () => {
      if (supabase) {
        try {
          const { data, error } = await supabase.from("quotes").select("content, author")
          if (error) throw error
          setAllQuotes(data || [])
        } catch (error) {
          console.error("Error fetching quotes from Supabase:", error)
          setAllQuotes([])
        }
      }
    }

    fetchQuotes()
    setRotation(Math.random() * 4 - 2)

    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  const getCurrentQuote = () => {
    if (currentQuoteIndex === -1) {
      return PINNED_QUOTE
    }
    return allQuotes[currentQuoteIndex] || PINNED_QUOTE
  }

  const handleNoteClick = () => {
    setCurrentQuoteIndex(-1) // Start with pinned quote
    setIsOpen(true)
  }

  const handleNextQuote = () => {
    if (currentQuoteIndex === -1) {
      setCurrentQuoteIndex(0)
    } else if (currentQuoteIndex < allQuotes.length - 1) {
      setCurrentQuoteIndex(currentQuoteIndex + 1)
    } else {
      setCurrentQuoteIndex(-1) // Go back to pinned quote
    }
  }

  const currentQuote = getCurrentQuote()

  return (
    <>
      <motion.div
        className="fixed bottom-8 right-8 z-40 hidden md:block"
        initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        whileHover={{ scale: 1.05 }}
      >
        <div
          className="w-64 h-64 bg-yellow-100 dark:bg-amber-100 shadow-lg p-6 rounded-sm border-4 border-yellow-200 dark:border-amber-300 cursor-pointer relative overflow-hidden group transition-all hover:shadow-xl"
          style={{
            transform: `rotate(${rotation}deg)`,
            boxShadow: "0 8px 24px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.6)",
          }}
          onClick={handleNoteClick}
        >
          <div className="absolute inset-0 opacity-30 pointer-events-none">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white to-transparent"></div>
          </div>

          <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-20 h-6 bg-white/30 rounded-full shadow-md pointer-events-none"></div>

          <div className="relative h-full flex flex-col justify-center items-center">
            <p className="text-center text-gray-800 dark:text-amber-900 text-sm leading-relaxed font-medium">
              "{currentQuote.content}"
            </p>
          </div>

          <div className="absolute top-0 right-0 w-8 h-8 bg-yellow-50/50 dark:bg-amber-200/50 transform -translate-y-1 translate-x-1 rounded-full"></div>

          <div className="absolute bottom-2 right-2 text-xs text-gray-600 dark:text-amber-800 font-semibold opacity-0 group-hover:opacity-100 transition-opacity bg-white/40 dark:bg-amber-800/20 px-2 py-1 rounded">
            Click to read more
          </div>
        </div>
      </motion.div>

      <motion.div className="fixed bottom-8 right-8 z-40 md:hidden flex flex-col items-center gap-2">
        {/* Animated pulse ring background */}
        <motion.div
          className="absolute w-20 h-20 bg-yellow-300 dark:bg-amber-300 rounded-full"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.6, 0, 0.6],
          }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />

        {/* Floating label hint */}
        <motion.div
          className="mb-2 bg-yellow-200 dark:bg-amber-200 text-gray-800 dark:text-amber-900 px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap shadow-md"
          animate={{ y: [0, -8, 0] }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        >
          💭 Tap for quotes
        </motion.div>

        {/* Mobile button */}
        <motion.button
          className="relative w-16 h-16 bg-yellow-100 dark:bg-amber-100 shadow-lg rounded-full border-4 border-yellow-200 dark:border-amber-300 flex items-center justify-center cursor-pointer"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleNoteClick}
        >
          <span className="text-2xl">💭</span>
        </motion.button>
      </motion.div>

      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setIsOpen(false)}
        >
          <motion.div
            className="w-full max-w-sm bg-yellow-100 dark:bg-amber-100 shadow-2xl p-8 rounded-lg relative"
            initial={{ scale: 0.8, rotate: -10 }}
            animate={{ scale: 1, rotate: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-gray-600 dark:text-amber-900 hover:text-gray-800 dark:hover:text-amber-800 text-xl"
            >
              ✕
            </button>

            <div className="flex flex-col justify-center items-center min-h-40">
              <p className="text-center text-gray-800 dark:text-amber-900 text-base leading-relaxed font-medium">
                "{currentQuote.content}"
              </p>
              <p className="text-center text-gray-700 dark:text-amber-800 text-sm mt-4 font-medium">
                — {currentQuote.author}
              </p>
              {currentQuote.isPinned && (
                <p className="text-xs text-gray-500 dark:text-amber-700 mt-3 font-semibold uppercase tracking-wide">
                  📌 Pinned
                </p>
              )}
            </div>

            <button
              onClick={handleNextQuote}
              className="mt-6 w-full py-3 bg-yellow-200 dark:bg-amber-200 hover:bg-yellow-300 dark:hover:bg-amber-300 text-gray-800 dark:text-amber-900 rounded-md font-semibold transition-colors"
            >
              {currentQuoteIndex === -1 && allQuotes.length > 0
                ? "See Quotes →"
                : currentQuoteIndex < allQuotes.length - 1
                  ? "Next Quote →"
                  : "Back to Pinned Quote"}
            </button>
          </motion.div>
        </motion.div>
      )}
    </>
  )
}

export default StickyNote
