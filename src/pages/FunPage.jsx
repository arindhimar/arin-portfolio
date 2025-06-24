"use client"

import { useState, useEffect, useCallback, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Play,
  Trophy,
  Car,
  Calendar,
  Quote,
  RefreshCw,
  Clock,
  Star,
  Heart,
  Shuffle,
  BookOpen,
  Eye,
  EyeOff,
  Sparkles,
  Film,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useTheme } from "@/components/ThemeProvider"
import { createClient } from "@supabase/supabase-js"

// Supabase configuration
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY
const supabase = supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null

// Enhanced fallback quotes with more categories and fun quotes
const FALLBACK_QUOTES = [
  {
    id: 1,
    content: "The only way to do great work is to love what you do.",
    author: "Steve Jobs",
    category: "Work",
    favorite: true,
  },
  {
    id: 2,
    content: "Innovation distinguishes between a leader and a follower.",
    author: "Steve Jobs",
    category: "Innovation",
    favorite: false,
  },
  {
    id: 3,
    content: "Life is what happens to you while you're busy making other plans.",
    author: "John Lennon",
    category: "Life",
    favorite: true,
  },
  {
    id: 4,
    content: "The future belongs to those who believe in the beauty of their dreams.",
    author: "Eleanor Roosevelt",
    category: "Dreams",
    favorite: false,
  },
  {
    id: 5,
    content: "It is during our darkest moments that we must focus to see the light.",
    author: "Aristotle",
    category: "Inspiration",
    favorite: true,
  },
  {
    id: 6,
    content: "Success is not final, failure is not fatal: it is the courage to continue that counts.",
    author: "Winston Churchill",
    category: "Success",
    favorite: false,
  },
  {
    id: 7,
    content: "The way to get started is to quit talking and begin doing.",
    author: "Walt Disney",
    category: "Motivation",
    favorite: true,
  },
  {
    id: 8,
    content: "Don't let yesterday take up too much of today.",
    author: "Will Rogers",
    category: "Life",
    favorite: false,
  },
  {
    id: 9,
    content: "You learn more from failure than from success. Don't let it stop you. Failure builds character.",
    author: "Unknown",
    category: "Learning",
    favorite: true,
  },
  {
    id: 10,
    content:
      "If you are working on something that you really care about, you don't have to be pushed. The vision pulls you.",
    author: "Steve Jobs",
    category: "Work",
    favorite: false,
  },
  {
    id: 11,
    content: "Code is like humor. When you have to explain it, it's bad.",
    author: "Cory House",
    category: "Programming",
    favorite: true,
  },
  {
    id: 12,
    content: "First, solve the problem. Then, write the code.",
    author: "John Johnson",
    category: "Programming",
    favorite: false,
  },
  {
    id: 13,
    content: "The best time to plant a tree was 20 years ago. The second best time is now.",
    author: "Chinese Proverb",
    category: "Motivation",
    favorite: true,
  },
  {
    id: 14,
    content: "Your limitation—it's only your imagination.",
    author: "Unknown",
    category: "Inspiration",
    favorite: false,
  },
  {
    id: 15,
    content: "Push yourself, because no one else is going to do it for you.",
    author: "Unknown",
    category: "Motivation",
    favorite: true,
  },
  // Fun anime-related quotes
  {
    id: 16,
    content: "People's lives don't end when they die. It ends when they lose faith.",
    author: "Itachi Uchiha",
    category: "Anime",
    favorite: true,
  },
  {
    id: 17,
    content: "If you don't take risks, you can't create a future.",
    author: "Monkey D. Luffy",
    category: "Anime",
    favorite: false,
  },
  {
    id: 18,
    content: "Hard work is absolutely necessary, but that alone will not be enough.",
    author: "Might Guy",
    category: "Anime",
    favorite: true,
  },
  {
    id: 19,
    content: "The world isn't perfect. But it's there for us, doing the best it can.",
    author: "Roy Mustang",
    category: "Anime",
    favorite: false,
  },
  {
    id: 20,
    content: "Sometimes you need a little wishful thinking just to keep on living.",
    author: "Misato Katsuragi",
    category: "Anime",
    favorite: true,
  },
]

const FunPage = ({ activeSection, onSectionChange }) => {
  const { theme } = useTheme()

  // Anime state
  const [animeData, setAnimeData] = useState(null)
  const [animeLoading, setAnimeLoading] = useState(false)
  const [animeError, setAnimeError] = useState(null)
  const [activeAnimeTab, setActiveAnimeTab] = useState("completed")
  const [animeViewMode, setAnimeViewMode] = useState("grid") // grid or list

  // Quotes state
  const [quotes, setQuotes] = useState([])
  const [quotesLoading, setQuotesLoading] = useState(false)
  const [quotesError, setQuotesError] = useState(null)
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false)
  const [randomQuote, setRandomQuote] = useState(null)

  // Fun interactive state
  const [particlesEnabled, setParticlesEnabled] = useState(true)

  // Data fetching flags to prevent multiple calls
  const [animeInitialized, setAnimeInitialized] = useState(false)
  const [quotesInitialized, setQuotesInitialized] = useState(false)

  // Fetch anime data function
  const fetchAnimeData = useCallback(async () => {
    if (animeLoading || animeData || animeInitialized) return

    setAnimeInitialized(true)
    setAnimeLoading(true)
    setAnimeError(null)

    const query = `
      query ($userName: String) {
        MediaListCollection(userName: $userName, type: ANIME) {
          lists {
            name
            status
            entries {
              id
              score
              progress
              status
              startedAt {
                year
                month
                day
              }
              completedAt {
                year
                month
                day
              }
              media {
                id
                title {
                  romaji
                  english
                }
                coverImage {
                  large
                  medium
                }
                episodes
                averageScore
                genres
                status
                season
                seasonYear
                format
                description
              }
            }
          }
          user {
            id
            name
            avatar {
              large
            }
            statistics {
              anime {
                count
                episodesWatched
                minutesWatched
                meanScore
              }
            }
          }
        }
      }
    `

    try {
      const response = await fetch("https://graphql.anilist.co", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query,
          variables: { userName: "arindhimar" },
        }),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()

      if (data.errors) {
        throw new Error(data.errors[0].message)
      }

      const processedData = {
        user: data.data.MediaListCollection?.user || null,
        stats: data.data.MediaListCollection?.user?.statistics?.anime || {
          count: 0,
          episodesWatched: 0,
          minutesWatched: 0,
          meanScore: 0,
        },
        completed: data.data.MediaListCollection?.lists?.find((list) => list.status === "COMPLETED")?.entries || [],
        watching: data.data.MediaListCollection?.lists?.find((list) => list.status === "CURRENT")?.entries || [],
        planToWatch: data.data.MediaListCollection?.lists?.find((list) => list.status === "PLANNING")?.entries || [],
      }

      setAnimeData(processedData)
    } catch (error) {
      console.error("Error fetching anime data:", error)
      setAnimeError(error.message)
    } finally {
      setAnimeLoading(false)
    }
  }, [animeLoading, animeData, animeInitialized])

  // Fetch quotes function
  const fetchQuotes = useCallback(async () => {
    if (quotesLoading || quotes.length > 0 || quotesInitialized) return

    setQuotesInitialized(true)
    setQuotesLoading(true)
    setQuotesError(null)

    if (supabase) {
      try {
        const { data, error } = await supabase.from("quotes").select("*").order("id", { ascending: true })

        if (error) throw error

        if (data && data.length > 0) {
          setQuotes(data)
          setQuotesLoading(false)
          return
        }
      } catch (error) {
        console.error("Supabase error:", error)
        setQuotesError(`Supabase error: ${error.message}. Using fallback quotes.`)
      }
    }

    // Use fallback quotes
    try {
      await new Promise((resolve) => setTimeout(resolve, 500))
      setQuotes(FALLBACK_QUOTES)
    } catch (error) {
      setQuotesError("Failed to load quotes. Please try again.")
    } finally {
      setQuotesLoading(false)
    }
  }, [quotesLoading, quotes.length, quotesInitialized])

  // Initialize data based on active section
  useEffect(() => {
    if (activeSection === "anime" && !animeInitialized) {
      fetchAnimeData()
    } else if (activeSection === "quotes" && !quotesInitialized) {
      fetchQuotes()
    }
  }, [activeSection, animeInitialized, quotesInitialized, fetchAnimeData, fetchQuotes])

  // Get random quote
  const getRandomQuote = useCallback(() => {
    if (quotes.length > 0) {
      const randomIndex = Math.floor(Math.random() * quotes.length)
      setRandomQuote(quotes[randomIndex])
    }
  }, [quotes])

  // Initialize random quote when quotes load
  useEffect(() => {
    if (quotes.length > 0 && !randomQuote) {
      getRandomQuote()
    }
  }, [quotes, randomQuote, getRandomQuote])

  // Filter functions
  const filteredQuotes = useMemo(() => {
    return quotes.filter((quote) => {
      const matchesCategory = selectedCategory === "All" || quote.category === selectedCategory
      const matchesFavorites = !showFavoritesOnly || quote.favorite

      return matchesCategory && matchesFavorites
    })
  }, [quotes, selectedCategory, showFavoritesOnly])

  const filteredAnime = useMemo(() => {
    if (!animeData) return []
    return animeData[activeAnimeTab] || []
  }, [animeData, activeAnimeTab])

  // Get unique categories
  const categories = useMemo(() => {
    const cats = [...new Set(quotes.map((q) => q.category))].sort()
    return ["All", ...cats]
  }, [quotes])

  // Memoized category color function
  const getCategoryColor = useMemo(
    () => (category) => {
      const colors = {
        Motivation:
          "bg-gradient-to-r from-blue-500/20 to-cyan-500/20 text-blue-300 border-blue-400/30 dark:text-blue-600 dark:border-blue-500/40",
        Innovation:
          "bg-gradient-to-r from-purple-500/20 to-violet-500/20 text-purple-300 border-purple-400/30 dark:text-purple-600 dark:border-purple-500/40",
        Life: "bg-gradient-to-r from-green-500/20 to-emerald-500/20 text-green-300 border-green-400/30 dark:text-green-600 dark:border-green-500/40",
        Dreams:
          "bg-gradient-to-r from-pink-500/20 to-rose-500/20 text-pink-300 border-pink-400/30 dark:text-pink-600 dark:border-pink-500/40",
        Inspiration:
          "bg-gradient-to-r from-yellow-500/20 to-amber-500/20 text-yellow-300 border-yellow-400/30 dark:text-yellow-600 dark:border-yellow-500/40",
        Success:
          "bg-gradient-to-r from-emerald-500/20 to-teal-500/20 text-emerald-300 border-emerald-400/30 dark:text-emerald-600 dark:border-emerald-500/40",
        Work: "bg-gradient-to-r from-indigo-500/20 to-blue-500/20 text-indigo-300 border-indigo-400/30 dark:text-indigo-600 dark:border-indigo-500/40",
        Programming:
          "bg-gradient-to-r from-violet-500/20 to-purple-500/20 text-violet-300 border-violet-400/30 dark:text-violet-600 dark:border-violet-500/40",
        Learning:
          "bg-gradient-to-r from-teal-500/20 to-cyan-500/20 text-teal-300 border-teal-400/30 dark:text-teal-600 dark:border-teal-500/40",
        Anime:
          "bg-gradient-to-r from-rose-500/20 to-pink-500/20 text-rose-300 border-rose-400/30 dark:text-rose-600 dark:border-rose-500/40",
        General:
          "bg-gradient-to-r from-gray-500/20 to-slate-500/20 text-gray-300 border-gray-400/30 dark:text-gray-600 dark:border-gray-500/40",
      }
      return colors[category] || colors["General"]
    },
    [],
  )

  const renderAnimeGrid = useCallback(
    (animeList, showProgress = false) => {
      if (!animeList || animeList.length === 0) {
        return (
          <div className="text-center py-16">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center"
            >
              <div className="relative mb-6">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-500/20 to-indigo-500/20 rounded-full flex items-center justify-center">
                  <BookOpen className="h-12 w-12 text-blue-400 dark:text-blue-600" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-violet-500 to-purple-500 rounded-full flex items-center justify-center">
                  <Sparkles className="h-4 w-4 text-white" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-white dark:text-slate-800 mb-2">No Anime Found</h3>
              <p className="text-gray-400 dark:text-slate-600">This section is waiting for some amazing content!</p>
            </motion.div>
          </div>
        )
      }

      if (animeViewMode === "list") {
        return (
          <div className="space-y-6">
            {animeList.map((entry, index) => (
              <motion.div
                key={entry.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                whileHover={{ scale: 1.02, x: 10 }}
              >
                <Card className="bg-gradient-to-r from-[#0A1428]/90 to-[#0F1A36]/90 dark:from-white/95 dark:to-slate-50/95 border-blue-500/30 dark:border-blue-500/40 overflow-hidden transition-all duration-300 shadow-xl hover:shadow-2xl backdrop-blur-sm">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-6">
                      <div className="relative">
                        <img
                          src={entry.media.coverImage?.medium || "/placeholder.svg"}
                          alt={entry.media.title.romaji}
                          className="w-20 h-28 object-cover rounded-lg shadow-lg"
                          crossOrigin="anonymous"
                        />
                        <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full flex items-center justify-center">
                          <Star className="h-3 w-3 text-white" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <h4 className="text-xl font-bold text-white dark:text-slate-900 mb-2">
                          {entry.media.title.english || entry.media.title.romaji}
                        </h4>
                        <div className="flex flex-wrap gap-2 mb-3">
                          {entry.media.genres?.slice(0, 3).map((genre) => (
                            <Badge
                              key={genre}
                              className="bg-gradient-to-r from-blue-500/20 to-indigo-500/20 text-blue-300 border-blue-400/30 dark:text-blue-600 dark:border-blue-500/40"
                              variant="outline"
                            >
                              {genre}
                            </Badge>
                          ))}
                        </div>
                        <div className="flex items-center justify-between text-gray-300 dark:text-slate-700">
                          <div className="flex items-center gap-4">
                            <span className="flex items-center gap-1">
                              <Film className="h-4 w-4" />
                              {entry.media.episodes || "?"} episodes
                            </span>
                            <span className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              {entry.media.seasonYear}
                            </span>
                          </div>
                          {entry.score && (
                            <div className="flex items-center gap-1 bg-gradient-to-r from-yellow-500/20 to-amber-500/20 px-3 py-1 rounded-full">
                              <Trophy className="h-4 w-4 text-yellow-400" />
                              <span className="text-yellow-300 font-semibold">{entry.score}/10</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )
      }

      return (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-6">
          {animeList.map((entry, index) => (
            <motion.div
              key={entry.id}
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              whileHover={{ scale: 1.08, y: -8 }}
              className="group"
            >
              <Card className="bg-gradient-to-br from-[#0A1428]/90 to-[#0F1A36]/90 dark:from-white/95 dark:to-slate-50/95 border-blue-500/30 dark:border-blue-500/40 overflow-hidden transition-all duration-300 shadow-xl hover:shadow-2xl backdrop-blur-sm h-full">
                <div className="aspect-[3/4] relative overflow-hidden">
                  <img
                    src={entry.media.coverImage?.large || "/placeholder.svg"}
                    alt={entry.media.title.romaji}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    crossOrigin="anonymous"
                  />
                  {showProgress && (
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-3">
                      <div className="text-white text-sm font-medium">
                        Progress: {entry.progress}/{entry.media.episodes || "?"}
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-1.5 mt-1">
                        <div
                          className="bg-gradient-to-r from-blue-500 to-indigo-500 h-1.5 rounded-full transition-all duration-300"
                          style={{
                            width: `${((entry.progress || 0) / (entry.media.episodes || 1)) * 100}%`,
                          }}
                        ></div>
                      </div>
                    </div>
                  )}
                  {entry.score && (
                    <div className="absolute top-2 right-2 bg-gradient-to-r from-yellow-500/90 to-amber-500/90 backdrop-blur-sm px-2 py-1 rounded-full">
                      <span className="text-white text-xs font-bold">{entry.score}</span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <CardContent className="p-3">
                  <h4 className="font-semibold text-white dark:text-slate-900 text-sm line-clamp-2 mb-2 group-hover:text-blue-300 dark:group-hover:text-blue-600 transition-colors">
                    {entry.media.title.english || entry.media.title.romaji}
                  </h4>
                  <div className="flex flex-wrap gap-1 mb-2">
                    {entry.media.genres?.slice(0, 1).map((genre) => (
                      <Badge
                        key={genre}
                        variant="outline"
                        className="text-xs px-2 py-0 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 text-blue-300 border-blue-400/30 dark:text-blue-600 dark:border-blue-500/40"
                      >
                        {genre}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex justify-between items-center text-xs text-gray-400 dark:text-slate-600">
                    <span className="flex items-center gap-1">
                      <Film className="h-3 w-3" />
                      {entry.media.episodes || "?"} eps
                    </span>
                    <span>{entry.media.seasonYear}</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )
    },
    [animeViewMode],
  )

  // Enhanced Hot Wheels Section Component (keeping as is)
  const HotWheelsSection = useMemo(
    () => (
      <div className="min-h-screen py-20 relative">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-orange-950/20 via-amber-950/10 to-transparent dark:from-orange-100/30 dark:via-amber-100/20 dark:to-transparent"></div>

        {/* Floating particles */}
        {particlesEnabled && (
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-orange-400/30 rounded-full"
                animate={{
                  x: [0, 100, 0],
                  y: [0, -100, 0],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: Math.random() * 10 + 10,
                  repeat: Number.POSITIVE_INFINITY,
                  delay: Math.random() * 5,
                }}
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
              />
            ))}
          </div>
        )}

        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <motion.h2
              className="text-3xl md:text-5xl font-bold text-white dark:text-slate-900 mb-4 flex items-center justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Car className="h-8 w-8 mr-3 text-orange-400 dark:text-orange-600" />
              Hot Wheels Collection
            </motion.h2>
            <div className="w-20 h-1 bg-gradient-to-r from-orange-400 to-amber-500 mx-auto mb-6" />
            <p className="text-gray-300 dark:text-slate-700 max-w-2xl mx-auto">
              My miniature car collection featuring rare finds and detailed specifications
            </p>
          </div>

          {/* Under Construction Message */}
          <motion.div
            className="flex flex-col items-center justify-center min-h-[400px]"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-[#0A1428]/60 dark:bg-white/95 rounded-2xl p-12 backdrop-blur-sm border border-orange-500/20 dark:border-orange-500/30 shadow-xl text-center max-w-2xl">
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                className="mb-6"
              >
                <Car className="h-24 w-24 text-orange-400 dark:text-orange-600 mx-auto" />
              </motion.div>

              <h3 className="text-3xl font-bold text-white dark:text-slate-900 mb-4">🚧 Under Construction 🚧</h3>

              <p className="text-gray-300 dark:text-slate-700 text-lg mb-6">
                I'm currently working on organizing and cataloging my Hot Wheels collection. This section will feature
                detailed information about each car, including rarity, condition, and the stories behind how I found
                them.
              </p>

              <div className="flex flex-wrap gap-4 justify-center text-sm text-gray-400 dark:text-slate-600">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></div>
                  <span>Cataloging Collection</span>
                </div>
                <div className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 bg-orange-400 rounded-full animate-pulse"
                    style={{ animationDelay: "0.5s" }}
                  ></div>
                  <span>Taking Photos</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-red-400 rounded-full animate-pulse" style={{ animationDelay: "1s" }}></div>
                  <span>Writing Stories</span>
                </div>
              </div>

              <motion.p
                className="text-violet-400 dark:text-violet-600 mt-6 font-medium"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              >
                Check back soon for the full collection!
              </motion.p>
            </div>
          </motion.div>
        </div>
      </div>
    ),
    [particlesEnabled],
  )

  // Enhanced Anime Section Component
  const AnimeSection = () => (
    <div className="min-h-screen py-20 relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-950/30 via-indigo-950/20 to-purple-950/30 dark:from-blue-100/40 dark:via-indigo-100/30 dark:to-purple-100/40"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full filter blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full filter blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
      </div>

      {/* Enhanced floating anime-themed particles */}
      {particlesEnabled && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-blue-400/40 text-3xl"
              animate={{
                x: [0, 60, 0],
                y: [0, -60, 0],
                rotate: [0, 360],
                opacity: [0, 1, 0],
                scale: [0.8, 1.2, 0.8],
              }}
              transition={{
                duration: Math.random() * 10 + 10,
                repeat: Number.POSITIVE_INFINITY,
                delay: Math.random() * 5,
              }}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
            >
              {["⭐", "🌟", "✨", "💫"][Math.floor(Math.random() * 4)]}
            </motion.div>
          ))}
        </div>
      )}

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <motion.div
            className="inline-flex items-center justify-center mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500/20 to-indigo-500/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-blue-500/30">
                <Play className="h-10 w-10 text-blue-400 dark:text-blue-600" />
              </div>
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-violet-500 to-purple-500 rounded-full flex items-center justify-center">
                <Sparkles className="h-4 w-4 text-white" />
              </div>
            </div>
          </motion.div>

          <motion.h2
            className="text-4xl md:text-6xl font-bold text-white dark:text-slate-900 mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
              Anime Journey
            </span>
          </motion.h2>
          <div className="w-24 h-1.5 bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-500 mx-auto mb-6 rounded-full" />
          <motion.p
            className="text-gray-300 dark:text-slate-700 max-w-2xl mx-auto text-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            My otaku adventure tracked through AniList with detailed statistics and personal collection
          </motion.p>
        </div>

        {animeLoading ? (
          <div className="flex flex-col items-center justify-center h-64">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full mb-4"
            />
            <p className="text-blue-400 dark:text-blue-600 font-medium">Loading anime data...</p>
          </div>
        ) : animeError ? (
          <div className="text-center">
            <div className="bg-gradient-to-r from-red-500/20 to-pink-500/20 border border-red-500/30 text-red-300 dark:text-red-600 p-6 rounded-xl mb-4 backdrop-blur-sm">
              <p className="font-medium">Error loading AniList data: {animeError}</p>
            </div>
          </div>
        ) : null}

        {animeData && (
          <>
            {/* Enhanced Stats with better visual hierarchy */}
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16 max-w-6xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              {[
                {
                  icon: Trophy,
                  value: animeData.stats.count,
                  label: "Completed",
                  color: "from-yellow-500 to-amber-500",
                  bgColor: "from-yellow-500/20 to-amber-500/20",
                  borderColor: "border-yellow-400/30",
                },
                {
                  icon: Film,
                  value: animeData.stats.episodesWatched,
                  label: "Episodes",
                  color: "from-blue-500 to-indigo-500",
                  bgColor: "from-blue-500/20 to-indigo-500/20",
                  borderColor: "border-blue-400/30",
                },
                {
                  icon: Clock,
                  value: Math.round(animeData.stats.minutesWatched / 60 / 24),
                  label: "Days Watched",
                  color: "from-green-500 to-emerald-500",
                  bgColor: "from-green-500/20 to-emerald-500/20",
                  borderColor: "border-green-400/30",
                },
                {
                  icon: Star,
                  value: animeData.stats.meanScore,
                  label: "Mean Score",
                  color: "from-purple-500 to-violet-500",
                  bgColor: "from-purple-500/20 to-violet-500/20",
                  borderColor: "border-purple-400/30",
                },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="group"
                >
                  <Card
                    className={`bg-gradient-to-br ${stat.bgColor} dark:from-white/95 dark:to-slate-50/95 ${stat.borderColor} dark:border-opacity-40 shadow-xl hover:shadow-2xl transition-all duration-300 backdrop-blur-sm h-full`}
                  >
                    <CardContent className="pt-8 pb-6 text-center relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="relative z-10">
                        <div
                          className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${stat.color} rounded-full mb-4 shadow-lg`}
                        >
                          <stat.icon className="h-8 w-8 text-white" />
                        </div>
                        <motion.div
                          className="text-4xl font-bold text-white dark:text-slate-900 mb-2"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.8 + index * 0.1 }}
                        >
                          {stat.value}
                        </motion.div>
                        <p className="text-gray-300 dark:text-slate-600 font-medium">{stat.label}</p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>

            {/* Enhanced Controls with better styling */}
            <motion.div
              className="bg-gradient-to-r from-[#0A1428]/80 to-[#0F1A36]/80 dark:from-white/95 dark:to-slate-50/95 rounded-3xl p-8 backdrop-blur-sm border border-blue-500/30 dark:border-blue-500/40 shadow-2xl mb-12"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <div className="flex flex-wrap gap-6 items-center justify-between">
                <div className="flex flex-wrap gap-4">
                  {[
                    {
                      id: "completed",
                      label: "Completed",
                      icon: Trophy,
                      count: animeData.completed.length,
                      color: "from-yellow-500 to-amber-500",
                    },
                    {
                      id: "watching",
                      label: "Currently Watching",
                      icon: Play,
                      count: animeData.watching.length,
                      color: "from-blue-500 to-indigo-500",
                    },
                    {
                      id: "planToWatch",
                      label: "Plan to Watch",
                      icon: Calendar,
                      count: animeData.planToWatch.length,
                      color: "from-purple-500 to-violet-500",
                    },
                  ].map((tab) => (
                    <Button
                      key={tab.id}
                      variant={activeAnimeTab === tab.id ? "glow" : "outline2"}
                      onClick={() => setActiveAnimeTab(tab.id)}
                      className={`flex items-center gap-3 px-6 py-3 text-base font-medium transition-all duration-300 ${
                        activeAnimeTab === tab.id
                          ? `bg-gradient-to-r ${tab.color} text-white shadow-lg`
                          : "hover:bg-blue-500/10 hover:border-blue-400/50"
                      }`}
                    >
                      <tab.icon className="h-5 w-5" />
                      <span className="hidden sm:inline">{tab.label}</span>
                      <span className="sm:hidden">{tab.label.split(" ")[0]}</span>
                      <Badge className="bg-white/20 text-white border-white/30">{tab.count}</Badge>
                    </Button>
                  ))}
                </div>

                <div className="flex items-center gap-3">
                  <Button
                    variant={animeViewMode === "grid" ? "glow" : "outline2"}
                    size="sm"
                    onClick={() => setAnimeViewMode("grid")}
                    className="px-4 py-2"
                  >
                    Grid View
                  </Button>
                  <Button
                    variant={animeViewMode === "list" ? "glow" : "outline2"}
                    size="sm"
                    onClick={() => setAnimeViewMode("list")}
                    className="px-4 py-2"
                  >
                    List View
                  </Button>
                </div>
              </div>
            </motion.div>

            {/* Enhanced Anime Display */}
            <motion.div
              key={activeAnimeTab}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              {renderAnimeGrid(filteredAnime, activeAnimeTab === "watching")}
            </motion.div>
          </>
        )}
      </div>
    </div>
  )

  // Enhanced Quotes Section Component
  const QuotesSection = () => (
    <div className="min-h-screen py-20 relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-950/30 via-purple-950/20 to-indigo-950/30 dark:from-violet-100/40 dark:via-purple-100/30 dark:to-indigo-100/40"></div>
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-violet-500/10 rounded-full filter blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-1/3 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full filter blur-3xl animate-pulse"
          style={{ animationDelay: "1.5s" }}
        ></div>
      </div>

      {/* Enhanced floating quote particles */}
      {particlesEnabled && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-violet-400/30 text-5xl font-serif"
              animate={{
                x: [0, 40, 0],
                y: [0, -40, 0],
                rotate: [0, 180, 360],
                opacity: [0, 0.6, 0],
                scale: [0.8, 1.2, 0.8],
              }}
              transition={{
                duration: Math.random() * 15 + 15,
                repeat: Number.POSITIVE_INFINITY,
                delay: Math.random() * 10,
              }}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
            >
              {['"', '"', "„", "‟"][Math.floor(Math.random() * 4)]}
            </motion.div>
          ))}
        </div>
      )}

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <motion.div
            className="inline-flex items-center justify-center mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative">
              <div className="w-20 h-20 bg-gradient-to-br from-violet-500/20 to-purple-500/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-violet-500/30">
                <Quote className="h-10 w-10 text-violet-400 dark:text-violet-600" />
              </div>
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-pink-500 to-rose-500 rounded-full flex items-center justify-center">
                <Heart className="h-4 w-4 text-white" />
              </div>
            </div>
          </motion.div>

          <motion.h2
            className="text-4xl md:text-6xl font-bold text-white dark:text-slate-900 mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <span className="bg-gradient-to-r from-violet-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
              Inspiring Quotes
            </span>
          </motion.h2>
          <div className="w-24 h-1.5 bg-gradient-to-r from-violet-400 via-purple-500 to-indigo-500 mx-auto mb-6 rounded-full" />
          <motion.p
            className="text-gray-300 dark:text-slate-700 max-w-2xl mx-auto text-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            A curated collection of wisdom that inspires, motivates, and guides my journey through life and code
          </motion.p>
        </div>

        {quotesLoading ? (
          <div className="flex flex-col items-center justify-center h-64">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              className="w-16 h-16 border-4 border-violet-500 border-t-transparent rounded-full mb-4"
            />
            <p className="text-violet-400 dark:text-violet-600 font-medium">Loading inspirational quotes...</p>
          </div>
        ) : quotesError ? (
          <div className="text-center mb-8">
            <div className="bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/30 text-amber-300 dark:text-amber-600 p-6 rounded-xl mb-4 backdrop-blur-sm max-w-2xl mx-auto">
              <p className="font-medium text-sm">{quotesError}</p>
            </div>
            <Button
              variant="outline2"
              onClick={fetchQuotes}
              className="bg-amber-500/10 border-amber-500/30 hover:bg-amber-500/20"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Try Again
            </Button>
          </div>
        ) : null}

        {quotes.length > 0 && (
          <>
            {/* Enhanced Quote of the Day */}
            {randomQuote && (
              <motion.div
                className="mb-16 max-w-5xl mx-auto"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 }}
              >
                <Card className="bg-gradient-to-br from-[#0A1428]/80 to-[#0F1A36]/80 dark:from-white/95 dark:to-slate-50/95 border-violet-500/30 dark:border-violet-500/40 shadow-2xl backdrop-blur-sm overflow-hidden">
                  <CardContent className="p-10 text-center relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 to-purple-500/5 dark:from-violet-500/10 dark:to-purple-500/10" />
                    <div className="relative z-10">
                      <div className="flex items-center justify-center mb-6">
                        <div className="flex items-center gap-3">
                          <Sparkles className="h-8 w-8 text-violet-400 dark:text-violet-600" />
                          <h3 className="text-2xl font-bold text-white dark:text-slate-900">Quote of the Day</h3>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={getRandomQuote}
                            className="ml-2 text-violet-400 dark:text-violet-600 hover:text-violet-300 dark:hover:text-violet-700 hover:bg-violet-500/10"
                          >
                            <Shuffle className="h-5 w-5" />
                          </Button>
                        </div>
                      </div>
                      <Quote className="h-12 w-12 text-violet-400/50 dark:text-violet-600/50 mx-auto mb-6" />
                      <blockquote className="text-3xl md:text-4xl font-medium text-white dark:text-slate-900 mb-6 italic leading-relaxed">
                        "{randomQuote.content}"
                      </blockquote>
                      <cite className="text-xl text-gray-300 dark:text-slate-700 font-medium">
                        — {randomQuote.author}
                      </cite>
                      <div className="mt-6">
                        <Badge
                          className={`${getCategoryColor(randomQuote.category)} px-4 py-2 text-base`}
                          variant="outline"
                        >
                          {randomQuote.category}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* Enhanced Controls */}
            <motion.div
              className="mb-12 bg-gradient-to-r from-[#0A1428]/80 to-[#0F1A36]/80 dark:from-white/95 dark:to-slate-50/95 rounded-3xl p-8 backdrop-blur-sm border border-violet-500/30 dark:border-violet-500/40 shadow-2xl"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <div className="flex flex-wrap gap-6 items-center justify-between mb-6">
                <div className="flex flex-wrap gap-4 items-center">
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="px-4 py-3 rounded-xl bg-[#050A1C]/50 dark:bg-slate-100/80 border border-violet-500/30 text-white dark:text-slate-900 font-medium focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all"
                  >
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category === "All" ? "All Categories" : category}
                      </option>
                    ))}
                  </select>

                  <Button
                    variant={showFavoritesOnly ? "glow" : "outline2"}
                    onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
                    className="flex items-center gap-3 px-6 py-3 text-base font-medium"
                  >
                    <Heart className={`h-5 w-5 ${showFavoritesOnly ? "fill-current text-red-400" : ""}`} />
                    Favorites Only
                  </Button>
                </div>

                <div className="flex items-center gap-3">
                  <Button
                    variant="outline2"
                    onClick={getRandomQuote}
                    className="flex items-center gap-3 px-6 py-3 bg-violet-500/10 border-violet-500/30 hover:bg-violet-500/20"
                  >
                    <Shuffle className="h-5 w-5" />
                    Random Quote
                  </Button>
                  <Button
                    variant="outline2"
                    onClick={() => setParticlesEnabled(!particlesEnabled)}
                    className="flex items-center gap-3 px-6 py-3"
                    title={particlesEnabled ? "Hide particle effects" : "Show particle effects"}
                  >
                    <Sparkles className="h-5 w-5" />
                    {particlesEnabled ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              <div className="text-center">
                <Badge
                  variant="subtle"
                  className="bg-gradient-to-r from-violet-500/30 to-purple-500/30 text-violet-300 border-violet-400/30 dark:text-violet-600 dark:border-violet-500/40 px-4 py-2 text-base"
                >
                  {filteredQuotes.length} of {quotes.length} Quotes
                </Badge>
              </div>
            </motion.div>

            {/* Enhanced Quotes Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <AnimatePresence>
                {filteredQuotes.map((quote, index) => (
                  <motion.div
                    key={quote.id}
                    initial={{ opacity: 0, y: 30, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -30, scale: 0.9 }}
                    transition={{ duration: 0.4, delay: 0.05 * (index % 12) }}
                    whileHover={{ scale: 1.03, y: -8 }}
                    className="group"
                  >
                    <Card className="bg-gradient-to-br from-[#0A1428]/80 to-[#0F1A36]/80 dark:from-white/95 dark:to-slate-50/95 border-violet-500/30 dark:border-violet-500/40 h-full transition-all duration-300 relative backdrop-blur-sm shadow-xl hover:shadow-2xl overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <CardContent className="p-8 relative z-10">
                        {quote.favorite && (
                          <motion.div
                            className="absolute top-4 right-4"
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                          >
                            <Heart className="h-5 w-5 text-red-500 fill-red-500" />
                          </motion.div>
                        )}

                        <Quote className="h-10 w-10 text-violet-400/60 dark:text-violet-600/60 mb-6 opacity-60 group-hover:opacity-100 transition-opacity" />

                        <blockquote className="text-white dark:text-slate-900 mb-6 italic text-lg leading-relaxed font-medium">
                          "{quote.content}"
                        </blockquote>

                        <div className="flex justify-between items-center">
                          <cite className="text-gray-300 dark:text-slate-700 not-italic font-semibold">
                            — {quote.author}
                          </cite>
                          {quote.category && (
                            <Badge className={`${getCategoryColor(quote.category)} px-3 py-1`} variant="outline">
                              {quote.category}
                            </Badge>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {filteredQuotes.length === 0 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-16">
                <div className="relative mb-6">
                  <div className="w-24 h-24 bg-gradient-to-br from-violet-500/20 to-purple-500/20 rounded-full flex items-center justify-center mx-auto">
                    <Quote className="h-12 w-12 text-violet-400 dark:text-violet-600" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-gray-500 to-slate-500 rounded-full flex items-center justify-center">
                    <EyeOff className="h-4 w-4 text-white" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-white dark:text-slate-800 mb-2">No Quotes Found</h3>
                <p className="text-gray-400 dark:text-slate-600 text-lg mb-6">No quotes match your current filters.</p>
                <Button
                  variant="outline2"
                  onClick={() => {
                    setSelectedCategory("All")
                    setShowFavoritesOnly(false)
                  }}
                  className="bg-violet-500/10 border-violet-500/30 hover:bg-violet-500/20"
                >
                  Clear Filters
                </Button>
              </motion.div>
            )}

            <div className="text-center mt-16">
              <Button
                variant="outline2"
                onClick={fetchQuotes}
                className="mx-auto bg-violet-500/10 border-violet-500/30 hover:bg-violet-500/20 px-8 py-3"
              >
                <RefreshCw className="h-5 w-5 mr-3" />
                Refresh Quotes
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  )

  // Render active section based on activeSection prop
  const renderActiveSection = () => {
    switch (activeSection) {
      case "hotwheels":
        return HotWheelsSection
      case "anime":
        return <AnimeSection />
      case "quotes":
        return <QuotesSection />
      default:
        return HotWheelsSection
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#050A1C] via-[#0F1A36] to-[#050A1C] dark:from-[#f1f5f9] dark:via-[#e2e8f0] dark:to-[#f1f5f9] text-white dark:text-gray-900">
      {/* Fun Settings Panel */}
      <motion.div
        className="fixed top-20 right-4 z-40 bg-gradient-to-br from-[#0A1428]/90 to-[#0F1A36]/90 dark:from-white/95 dark:to-slate-50/95 backdrop-blur-sm rounded-xl p-4 border border-violet-500/30 shadow-xl"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1 }}
      >
        <div className="flex flex-col gap-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setParticlesEnabled(!particlesEnabled)}
            className="flex items-center gap-3 text-violet-400 dark:text-violet-600 hover:bg-violet-500/10 px-3 py-2 rounded-lg"
            title={particlesEnabled ? "Hide particle effects" : "Show particle effects"}
          >
            <Sparkles className="h-5 w-5" />
            {particlesEnabled ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
          </Button>
        </div>
      </motion.div>

      <motion.div
        key={`fun-section-${activeSection}`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
      >
        {renderActiveSection()}
      </motion.div>
    </div>
  )
}

export default FunPage
