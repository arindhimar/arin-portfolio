"use client"

import { motion } from "framer-motion"
import { useTheme } from "@/components/ThemeProvider"

const Loader = () => {
  const { theme } = useTheme()

  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center bg-gradient-to-b from-[#050A1C] via-[#0F1A36] to-[#050A1C] dark:from-[#f1f5f9] dark:via-[#e2e8f0] dark:to-[#f1f5f9] z-50"
      initial={{ opacity: 1 }}
      exit={{
        opacity: 0,
        transition: { duration: 0.8, ease: "easeInOut" },
      }}
    >
      <div className="relative">
        <svg className="w-24 h-24" viewBox="0 0 100 100">
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={theme === "dark" ? "#8B5CF6" : "#7C3AED"} />
              <stop offset="100%" stopColor={theme === "dark" ? "#D946EF" : "#C026D3"} />
            </linearGradient>
            <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={theme === "dark" ? "#8B5CF6" : "#6366F1"} />
              <stop offset="100%" stopColor={theme === "dark" ? "#A855F7" : "#8B5CF6"} />
            </linearGradient>
          </defs>

          <motion.circle
            cx="50"
            cy="50"
            r="40"
            stroke="url(#gradient)"
            strokeWidth="4"
            fill="none"
            initial={{ pathLength: 0, rotate: 0 }}
            animate={{
              pathLength: [0, 1, 0],
              rotate: 360,
              transition: {
                pathLength: {
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                },
                rotate: {
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                },
              },
            }}
          />

          <motion.circle
            cx="50"
            cy="50"
            r="30"
            stroke="url(#gradient2)"
            strokeWidth="3"
            fill="none"
            initial={{ pathLength: 0, rotate: 0 }}
            animate={{
              pathLength: [0, 1, 0],
              rotate: -360,
              transition: {
                pathLength: {
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                  delay: 0.5,
                },
                rotate: {
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                },
              },
            }}
          />
        </svg>

        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{
            opacity: 1,
            scale: 1,
            transition: { delay: 0.5, duration: 0.5 },
          }}
        >
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-fuchsia-400 dark:from-violet-600 dark:to-fuchsia-600">
            AD
          </span>
        </motion.div>
      </div>

      <motion.p
        className="absolute bottom-20 text-sm text-violet-400 dark:text-violet-600 tracking-widest"
        initial={{ opacity: 0, y: 10 }}
        animate={{
          opacity: [0, 1, 0],
          y: [10, 0, 10],
          transition: {
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "loop",
          },
        }}
      >
        LOADING PORTFOLIO
      </motion.p>
    </motion.div>
  )
}

export default Loader
