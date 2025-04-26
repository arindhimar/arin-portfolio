"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Quote, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "@/components/ThemeProvider"
import { createClient } from "@supabase/supabase-js"

// Use environment variables for Supabase credentials
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY
const supabase = supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null

const QuoteSection = () => {
  const { theme } = useTheme()
  const [quote, setQuote] = useState({
    content: "",
    author: "",
    isLoading: true,
    error: null,
  })

  const fetchQuote = async () => {
    setQuote((prev) => ({ ...prev, isLoading: true, error: null }))

    // Try to fetch from Supabase if configured
    if (supabase) {
      try {
        // First, get the count of quotes
        const { count, error: countError } = await supabase.from("quotes").select("*", { count: "exact", head: true })
        console.log("askdhkashdhasd")
        if (countError) throw countError

        if (count && count > 0) {
          // Generate a random index
          const randomIndex = Math.floor(Math.random() * count)

          // Fetch a quote at that random index
          const { data, error } = await supabase
            .from("quotes")
            .select("content, author")
            .range(randomIndex, randomIndex)
            .single()

          if (error) throw error

          setQuote({
            content: data.content,
            author: data.author,
            isLoading: false,
            error: null,
          })
          return // Exit if successful
        }
      } catch (error) {
        console.error("Error fetching from Supabase:", error)
        // Continue to fallback if Supabase fails
      }
    }

    // Fallback to quotable.io if Supabase isn't configured or fails
    try {
      const response = await fetch("https://api.quotable.io/random")
      if (!response.ok) throw new Error("Failed to fetch quote")

      const data = await response.json()
      setQuote({
        content: data.content,
        author: data.author,
        isLoading: false,
        error: null,
      })
    } catch (fallbackError) {
      console.error("Fallback error:", fallbackError)
      setQuote({
        content: "",
        author: "",
        isLoading: false,
        error: "Failed to load quote. Please try again.",
      })
    }
  }

  useEffect(() => {
    fetchQuote()
  }, [])

  return (
    <section className="py-16 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-[#050A1C] via-[#0A1428] to-[#050A1C] dark:from-slate-100 dark:via-slate-200 dark:to-slate-100"></div>
        <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-violet-600/5 rounded-full filter blur-[80px]"></div>
        <div className="absolute bottom-1/2 right-1/4 w-64 h-64 bg-fuchsia-600/5 rounded-full filter blur-[80px]"></div>
      </div>

      <div className="container mx-auto px-4">
        <motion.div
          className="max-w-4xl mx-auto bg-[#0A1428]/60 dark:bg-white/60 backdrop-blur-md p-8 md:p-12 rounded-2xl border border-violet-500/20 shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {quote.isLoading ? (
            <div className="flex flex-col items-center justify-center py-8">
              <div className="w-12 h-12 rounded-full border-4 border-t-violet-500 border-violet-500/30 animate-spin mb-4"></div>
              <p className="text-gray-400 dark:text-slate-600">Loading inspiration...</p>
            </div>
          ) : quote.error ? (
            <div className="text-center py-8">
              <p className="text-red-400 dark:text-red-600 mb-4">{quote.error}</p>
              <Button variant="outline2" onClick={fetchQuote}>
                Try Again
              </Button>
            </div>
          ) : (
            <div className="text-center">
              <div className="mb-6 flex justify-center">
                <div className="p-3 bg-violet-500/10 rounded-full">
                  <Quote className="h-8 w-8 text-violet-400 dark:text-violet-600" />
                </div>
              </div>

              <blockquote className="mb-6">
                <p className="text-xl md:text-2xl text-white dark:text-slate-800 font-medium italic leading-relaxed">
                  "{quote.content}"
                </p>
              </blockquote>

              <div className="flex flex-col items-center">
                <p className="text-gray-300 dark:text-slate-600 font-medium">— {quote.author}</p>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={fetchQuote}
                  className="mt-6 text-violet-400 dark:text-violet-600 hover:text-violet-300 dark:hover:text-violet-700"
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  New Quote
                </Button>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  )
}

export default QuoteSection
