"use client"

import { motion } from "framer-motion"
import { Github, Linkedin, Instagram, Mail, Gamepad2, Home } from "lucide-react"
import { useTheme } from "@/components/ThemeProvider"

const SocialSidebar = ({ onFunClick, onBackClick, isOnFunPage = false }) => {
  const { theme } = useTheme()

  const socialLinks = [
    {
      name: "GitHub",
      href: "https://github.com/arindhimar",
      icon: <Github className="h-5 w-5" />,
      color: "hover:text-violet-400 dark:hover:text-violet-600",
    },
    {
      name: "LinkedIn",
      href: "https://linkedin.com/in/arin-dhimar",
      icon: <Linkedin className="h-5 w-5" />,
      color: "hover:text-blue-400 dark:hover:text-blue-600",
    },
    {
      name: "Instagram",
      href: "https://instagram.com/arin_dhimar_/",
      icon: <Instagram className="h-5 w-5" />,
      color: "hover:text-pink-400 dark:hover:text-pink-600",
    },
    {
      name: "Email",
      href: "mailto:arindhimar.fc@gmail.com",
      icon: <Mail className="h-5 w-5" />,
      color: "hover:text-green-400 dark:hover:text-green-600",
    },
  ]

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
            className={`p-2 bg-[#0A1428]/50 dark:bg-white/50 backdrop-blur-sm border border-violet-500/20 rounded-full text-gray-400 dark:text-slate-600 transition-all duration-300 ${
              isOnFunPage
                ? "hover:text-blue-400 dark:hover:text-blue-600 hover:border-blue-500/50"
                : "hover:text-orange-400 dark:hover:text-orange-600 hover:border-orange-500/50"
            }`}
            whileHover={{ scale: 1.2, y: -5 }}
            whileTap={{ scale: 0.9 }}
            aria-label={isOnFunPage ? "Back to Portfolio" : "Fun Stuff"}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 1.2 }}
          >
            {isOnFunPage ? <Home className="h-5 w-5" /> : <Gamepad2 className="h-5 w-5" />}
          </motion.button>

          {/* Social Links */}
          {socialLinks.map((link, index) => (
            <motion.a
              key={link.name}
              href={link.href}
              target={link.name !== "Email" ? "_blank" : undefined}
              rel={link.name !== "Email" ? "noopener noreferrer" : undefined}
              className={`p-2 bg-[#0A1428]/50 dark:bg-white/50 backdrop-blur-sm border border-violet-500/20 rounded-full text-gray-400 dark:text-slate-600 ${link.color} hover:border-violet-500/50 transition-all duration-300`}
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
        className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-[#0A1428]/90 dark:bg-white/90 backdrop-blur-md border-t border-violet-500/20"
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1 }}
      >
        <div className="flex items-center justify-around px-4 py-3">
          {/* Dynamic Navigation Button */}
          <motion.button
            onClick={isOnFunPage ? onBackClick : onFunClick}
            className={`p-3 bg-[#050A1C]/50 dark:bg-slate-100/50 backdrop-blur-sm border border-violet-500/20 rounded-full text-gray-400 dark:text-slate-600 transition-all duration-300 ${
              isOnFunPage
                ? "hover:text-blue-400 dark:hover:text-blue-600 hover:border-blue-500/50"
                : "hover:text-orange-400 dark:hover:text-orange-600 hover:border-orange-500/50"
            }`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label={isOnFunPage ? "Back to Portfolio" : "Fun Stuff"}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 1.2 }}
          >
            {isOnFunPage ? <Home className="h-5 w-5" /> : <Gamepad2 className="h-5 w-5" />}
          </motion.button>

          {/* Social Links */}
          {socialLinks.map((link, index) => (
            <motion.a
              key={link.name}
              href={link.href}
              target={link.name !== "Email" ? "_blank" : undefined}
              rel={link.name !== "Email" ? "noopener noreferrer" : undefined}
              className={`p-3 bg-[#050A1C]/50 dark:bg-slate-100/50 backdrop-blur-sm border border-violet-500/20 rounded-full text-gray-400 dark:text-slate-600 ${link.color} hover:border-violet-500/50 transition-all duration-300`}
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
