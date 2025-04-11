"use client"

import { ArrowUp, Heart } from "lucide-react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { useTheme } from "@/components/ThemeProvider"

const Footer = ({ onSectionChange }) => {
  const { theme } = useTheme()

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
    onSectionChange("home")
  }

  return (
    <footer
      id="contact"
      className="bg-[#050A1C]/80 dark:bg-slate-100/80 backdrop-blur-sm text-white dark:text-slate-800 py-8 relative overflow-hidden border-t border-violet-500/20"
    >
      {/* Background elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-violet-600/10 rounded-full filter blur-[80px]"></div>
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-fuchsia-600/10 rounded-full filter blur-[80px]"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="flex flex-col md:flex-row justify-between items-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-gray-400 dark:text-slate-600 flex items-center mb-4 md:mb-0">
            Made with <Heart className="h-4 w-4 mx-1 text-red-500 animate-pulse" /> by Arin Dhimar
          </p>

          <div className="flex items-center">
            <p className="text-gray-500 dark:text-slate-500 text-sm mr-4">
              &copy; {new Date().getFullYear()} All Rights Reserved
            </p>

            <Button
              variant="outline2"
              size="icon"
              onClick={scrollToTop}
              aria-label="Scroll to top"
              className="rounded-full"
            >
              <ArrowUp className="h-5 w-5" />
            </Button>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}

export default Footer
