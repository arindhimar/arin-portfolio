"use client"

import { motion } from "framer-motion"

const Loader = () => {
  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center bg-black z-50"
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
              <stop offset="0%" stopColor="#8B5CF6" />
              <stop offset="100%" stopColor="#D946EF" />
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
            stroke="#8B5CF6"
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
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-fuchsia-400">
            AD
          </span>
        </motion.div>
      </div>

      <motion.p
        className="absolute bottom-20 text-sm text-violet-400 tracking-widest"
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
