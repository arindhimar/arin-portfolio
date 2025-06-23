"use client"

import { motion } from "framer-motion"
import { Github, Linkedin, Instagram, Mail, Gamepad2, Home, Sparkles } from "lucide-react"
import { useTheme } from "@/components/ThemeProvider"

const SocialSidebar = ({ onFunClick, onBackClick, isOnFunPage = false }) => {
  const { theme } = useTheme()

  const socialLinks = [
    {
      name: "GitHub",
      href: "https://github.com/arindhimar",
      icon: <Github className="h-5 w-5" />,
      color: "hover:text-gray-300 dark:hover:text-gray-700",
      bgGradient: "bg-[radial-gradient(circle,transparent_30%,rgba(107,114,128,0.1)_70%,rgba(107,114,128,0.3)_100%)]",
      hoverBgGradient:
        "hover:bg-[radial-gradient(circle,transparent_20%,rgba(107,114,128,0.15)_60%,rgba(107,114,128,0.4)_100%)]",
      shadowColor: "hover:shadow-[0_0_20px_rgba(107,114,128,0.4)]",
      borderColor: "border-gray-500/40 hover:border-gray-400/60",
    },
    {
      name: "LinkedIn",
      href: "https://linkedin.com/in/arin-dhimar",
      icon: <Linkedin className="h-5 w-5" />,
      color: "hover:text-blue-400 dark:hover:text-blue-500",
      bgGradient: "bg-[radial-gradient(circle,transparent_30%,rgba(59,130,246,0.1)_70%,rgba(59,130,246,0.3)_100%)]",
      hoverBgGradient:
        "hover:bg-[radial-gradient(circle,transparent_20%,rgba(59,130,246,0.15)_60%,rgba(59,130,246,0.4)_100%)]",
      shadowColor: "hover:shadow-[0_0_20px_rgba(59,130,246,0.4)]",
      borderColor: "border-blue-500/40 hover:border-blue-400/60",
    },
    {
      name: "Instagram",
      href: "https://instagram.com/arin_dhimar_/",
      icon: <Instagram className="h-5 w-5" />,
      color: "hover:text-pink-400 dark:hover:text-pink-500",
      bgGradient:
        "bg-[radial-gradient(circle,transparent_30%,rgba(236,72,153,0.08)_50%,rgba(147,51,234,0.12)_70%,rgba(236,72,153,0.3)_100%)]",
      hoverBgGradient:
        "hover:bg-[radial-gradient(circle,transparent_20%,rgba(236,72,153,0.12)_40%,rgba(147,51,234,0.18)_60%,rgba(236,72,153,0.4)_100%)]",
      shadowColor: "hover:shadow-[0_0_20px_rgba(236,72,153,0.4)]",
      borderColor: "border-pink-500/40 hover:border-pink-400/60",
    },
    {
      name: "Email",
      href: "mailto:arindhimar.fc@gmail.com",
      icon: <Mail className="h-5 w-5" />,
      color: "hover:text-green-400 dark:hover:text-green-500",
      bgGradient: "bg-[radial-gradient(circle,transparent_30%,rgba(34,197,94,0.1)_70%,rgba(34,197,94,0.3)_100%)]",
      hoverBgGradient:
        "hover:bg-[radial-gradient(circle,transparent_20%,rgba(34,197,94,0.15)_60%,rgba(34,197,94,0.4)_100%)]",
      shadowColor: "hover:shadow-[0_0_20px_rgba(34,197,94,0.4)]",
      borderColor: "border-green-500/40 hover:border-green-400/60",
    },
  ]

  // Animated Gamepad Icon Component
  const AnimatedGamepadIcon = () => (
    <motion.div
      className="relative"
      animate={{
        rotate: [0, -10, 10, -5, 5, 0],
        scale: [1, 1.1, 1, 1.05, 1],
      }}
      transition={{
        duration: 2,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
        repeatDelay: 1,
      }}
    >
      <Gamepad2 className="h-5 w-5 relative z-10" />

      {/* Sparkle effects around the gamepad */}
      <motion.div
        className="absolute -top-1 -right-1"
        animate={{
          scale: [0, 1, 0],
          rotate: [0, 180, 360],
          opacity: [0, 1, 0],
        }}
        transition={{
          duration: 1.5,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
          delay: 0.5,
        }}
      >
        <Sparkles className="h-2 w-2 text-orange-400 dark:text-orange-600" />
      </motion.div>

      <motion.div
        className="absolute -bottom-1 -left-1"
        animate={{
          scale: [0, 1, 0],
          rotate: [360, 180, 0],
          opacity: [0, 1, 0],
        }}
        transition={{
          duration: 1.5,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
          delay: 1,
        }}
      >
        <Sparkles className="h-2 w-2 text-orange-400 dark:text-orange-600" />
      </motion.div>

      <motion.div
        className="absolute -top-1 -left-1"
        animate={{
          scale: [0, 1, 0],
          rotate: [0, 360],
          opacity: [0, 1, 0],
        }}
        transition={{
          duration: 1.5,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
          delay: 1.5,
        }}
      >
        <Sparkles className="h-1.5 w-1.5 text-orange-400 dark:text-orange-600" />
      </motion.div>
    </motion.div>
  )

  // Animated Home Icon Component
  const AnimatedHomeIcon = () => (
    <motion.div
      className="relative"
      animate={{
        scale: [1, 1.2, 1, 1.1, 1],
        rotate: [0, -5, 5, -3, 3, 0],
      }}
      transition={{
        duration: 2.5,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
        repeatDelay: 1.5,
      }}
    >
      <Home className="h-5 w-5 relative z-10" />

      {/* Heart-like sparkles for home */}
      <motion.div
        className="absolute -top-1 -right-1"
        animate={{
          scale: [0, 1.2, 0],
          opacity: [0, 1, 0],
        }}
        transition={{
          duration: 2,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
          delay: 0.3,
        }}
      >
        <div className="w-1.5 h-1.5 bg-blue-400 dark:bg-blue-600 rounded-full"></div>
      </motion.div>

      <motion.div
        className="absolute -bottom-1 -left-1"
        animate={{
          scale: [0, 1, 0],
          opacity: [0, 1, 0],
        }}
        transition={{
          duration: 2,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
          delay: 0.8,
        }}
      >
        <div className="w-1 h-1 bg-blue-400 dark:bg-blue-600 rounded-full"></div>
      </motion.div>

      <motion.div
        className="absolute top-0 -left-1"
        animate={{
          scale: [0, 1.1, 0],
          opacity: [0, 1, 0],
        }}
        transition={{
          duration: 2,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
          delay: 1.3,
        }}
      >
        <Sparkles className="h-1.5 w-1.5 text-blue-400 dark:text-blue-600" />
      </motion.div>
    </motion.div>
  )

  return (
    <>
      {/* Desktop Sidebar - Right Side */}
      <motion.div
        className="fixed right-6 bottom-0 z-40 hidden md:flex flex-col items-center"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 1 }}
      >
        <div className="flex flex-col items-center space-y-6">
          {/* Dynamic Navigation Button */}
          <motion.button
            onClick={isOnFunPage ? onBackClick : onFunClick}
            className={`p-3 backdrop-blur-sm border rounded-full text-gray-400 dark:text-slate-600 transition-all duration-300 relative overflow-hidden ${
              isOnFunPage
                ? "bg-[radial-gradient(circle,transparent_30%,rgba(59,130,246,0.1)_70%,rgba(59,130,246,0.3)_100%)] hover:bg-[radial-gradient(circle,transparent_20%,rgba(59,130,246,0.15)_60%,rgba(59,130,246,0.4)_100%)] border-blue-500/40 hover:border-blue-400/60 hover:text-blue-400 dark:hover:text-blue-500 hover:shadow-[0_0_20px_rgba(59,130,246,0.4)]"
                : "bg-[radial-gradient(circle,transparent_30%,rgba(249,115,22,0.1)_70%,rgba(249,115,22,0.3)_100%)] hover:bg-[radial-gradient(circle,transparent_20%,rgba(249,115,22,0.15)_60%,rgba(249,115,22,0.4)_100%)] border-orange-500/40 hover:border-orange-400/60 hover:text-orange-400 dark:hover:text-orange-500 hover:shadow-[0_0_20px_rgba(249,115,22,0.4)]"
            }`}
            whileHover={{ scale: 1.2, y: -5 }}
            whileTap={{ scale: 0.9 }}
            aria-label={isOnFunPage ? "Back to Portfolio" : "Fun Stuff"}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 1.2 }}
          >
            {/* Button glow effect */}
            <motion.div
              className="absolute inset-0 rounded-full"
              animate={{
                boxShadow: isOnFunPage
                  ? [
                      "0 0 0px rgba(59, 130, 246, 0)",
                      "0 0 20px rgba(59, 130, 246, 0.3)",
                      "0 0 0px rgba(59, 130, 246, 0)",
                    ]
                  : [
                      "0 0 0px rgba(249, 115, 22, 0)",
                      "0 0 20px rgba(249, 115, 22, 0.3)",
                      "0 0 0px rgba(249, 115, 22, 0)",
                    ],
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            />
            {isOnFunPage ? <AnimatedHomeIcon /> : <AnimatedGamepadIcon />}
          </motion.button>

          {/* Social Links */}
          {socialLinks.map((link, index) => (
            <motion.a
              key={link.name}
              href={link.href}
              target={link.name !== "Email" ? "_blank" : undefined}
              rel={link.name !== "Email" ? "noopener noreferrer" : undefined}
              className={`p-3 backdrop-blur-sm border rounded-full text-gray-400 dark:text-slate-600 ${link.color} ${link.bgGradient} ${link.hoverBgGradient} ${link.shadowColor} ${link.borderColor} transition-all duration-300`}
              whileHover={{ scale: 1.2, y: -5 }}
              whileTap={{ scale: 0.9 }}
              aria-label={link.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 1.3 + index * 0.1 }}
            >
              {link.icon}
            </motion.a>
          ))}
        </div>
        <motion.div
          className="w-px h-24 bg-gradient-to-b from-violet-500/50 to-transparent mt-6"
          initial={{ height: 0 }}
          animate={{ height: 96 }}
          transition={{ duration: 0.5, delay: 1.8 }}
        />
      </motion.div>

      {/* Mobile Sidebar - Bottom Fixed */}
      <motion.div
        className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-[#0A1428]/95 dark:bg-white/95 backdrop-blur-md border-t border-violet-500/30 shadow-2xl"
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1 }}
      >
        <div className="flex items-center justify-around px-4 py-4">
          {/* Dynamic Navigation Button */}
          <motion.button
            onClick={isOnFunPage ? onBackClick : onFunClick}
            className={`p-4 backdrop-blur-sm border rounded-full text-gray-400 dark:text-slate-600 transition-all duration-300 relative overflow-hidden ${
              isOnFunPage
                ? "bg-[radial-gradient(circle,transparent_30%,rgba(59,130,246,0.1)_70%,rgba(59,130,246,0.3)_100%)] hover:bg-[radial-gradient(circle,transparent_20%,rgba(59,130,246,0.15)_60%,rgba(59,130,246,0.4)_100%)] border-blue-500/40 hover:border-blue-400/60 hover:text-blue-400 dark:hover:text-blue-500 hover:shadow-[0_0_20px_rgba(59,130,246,0.4)]"
                : "bg-[radial-gradient(circle,transparent_30%,rgba(249,115,22,0.1)_70%,rgba(249,115,22,0.3)_100%)] hover:bg-[radial-gradient(circle,transparent_20%,rgba(249,115,22,0.15)_60%,rgba(249,115,22,0.4)_100%)] border-orange-500/40 hover:border-orange-400/60 hover:text-orange-400 dark:hover:text-orange-500 hover:shadow-[0_0_20px_rgba(249,115,22,0.4)]"
            }`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label={isOnFunPage ? "Back to Portfolio" : "Fun Stuff"}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 1.2 }}
          >
            <motion.div
              className="absolute inset-0 rounded-full"
              animate={{
                boxShadow: isOnFunPage
                  ? [
                      "0 0 0px rgba(59, 130, 246, 0)",
                      "0 0 15px rgba(59, 130, 246, 0.3)",
                      "0 0 0px rgba(59, 130, 246, 0)",
                    ]
                  : [
                      "0 0 0px rgba(249, 115, 22, 0)",
                      "0 0 15px rgba(249, 115, 22, 0.3)",
                      "0 0 0px rgba(249, 115, 22, 0)",
                    ],
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            />
            {isOnFunPage ? <AnimatedHomeIcon /> : <AnimatedGamepadIcon />}
          </motion.button>

          {/* Social Links */}
          {socialLinks.map((link, index) => (
            <motion.a
              key={link.name}
              href={link.href}
              target={link.name !== "Email" ? "_blank" : undefined}
              rel={link.name !== "Email" ? "noopener noreferrer" : undefined}
              className={`p-4 backdrop-blur-sm border rounded-full text-gray-400 dark:text-slate-600 ${link.color} ${link.bgGradient} ${link.hoverBgGradient} ${link.shadowColor} ${link.borderColor} transition-all duration-300`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label={link.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 1.3 + index * 0.1 }}
            >
              {link.icon}
            </motion.a>
          ))}
        </div>
      </motion.div>
    </>
  )
}

export default SocialSidebar
