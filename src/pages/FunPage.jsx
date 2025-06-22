"use client"

import { useState, useEffect } from "react"
import React from "react" // Add this import
import { motion } from "framer-motion"
import { Play, Trophy, Car, Calendar, Quote, RefreshCw, Clock, Star, Heart, Wrench } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useTheme } from "@/components/ThemeProvider"
import { createClient } from "@supabase/supabase-js"

// Use environment variables for Supabase credentials
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY
const supabase = supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null

const FunPage = ({ activeSection, onSectionChange }) => {
  const { theme } = useTheme()
  const [animeData, setAnimeData] = useState(null)
  const [animeLoading, setAnimeLoading] = useState(true)
  const [animeError, setAnimeError] = useState(null)
  const [activeAnimeTab, setActiveAnimeTab] = useState("completed")

  // Quotes state - fetch all quotes
  const [quotes, setQuotes] = useState([])
  const [quotesLoading, setQuotesLoading] = useState(true)
  const [quotesError, setQuotesError] = useState(null)

  // Fallback quotes data
  const fallbackQuotes = [
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
  ]

  // Fetch ALL quotes function with better error handling
  const fetchAllQuotes = async () => {
    setQuotesLoading(true)
    setQuotesError(null)

    // Try to fetch from Supabase if configured
    if (supabase) {
      try {
        console.log("Attempting to fetch quotes from Supabase...")

        const { data, error } = await supabase.from("quotes").select("*").order("id", { ascending: true })

        if (error) {
          console.error("Supabase error:", error)
          throw error
        }

        console.log("Supabase response:", data)

        if (data && data.length > 0) {
          console.log(`Successfully fetched ${data.length} quotes from Supabase`)
          setQuotes(data)
          setQuotesLoading(false)
          return // Exit if successful
        } else {
          console.log("No quotes found in Supabase, using fallback")
        }
      } catch (error) {
        console.error("Error fetching from Supabase:", error.message)
        setQuotesError(`Supabase error: ${error.message}. Using fallback quotes.`)
        // Continue to fallback
      }
    } else {
      console.log("Supabase not configured, using fallback quotes")
      setQuotesError("Supabase not configured. Using fallback quotes.")
    }

    // Use fallback quotes
    try {
      console.log("Using fallback quotes...")
      // Simulate loading delay
      await new Promise((resolve) => setTimeout(resolve, 500))
      setQuotes(fallbackQuotes)
      console.log(`Loaded ${fallbackQuotes.length} fallback quotes`)
    } catch (fallbackError) {
      console.error("Fallback error:", fallbackError)
      setQuotesError("Failed to load quotes. Please try again.")
    } finally {
      setQuotesLoading(false)
    }
  }

  // Fetch anime data from AniList API
  useEffect(() => {
    const fetchAnimeData = async () => {
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

      const variables = {
        userName: "arindhimar",
      }

      try {
        const response = await fetch("https://graphql.anilist.co", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            query,
            variables,
          }),
        })

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        const data = await response.json()

        if (data.errors) {
          throw new Error(data.errors[0].message)
        }

        // Process the data
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
    }

    fetchAnimeData()
    fetchAllQuotes() // Fetch all quotes
  }, [])

  const renderAnimeGrid = (animeList, showProgress = false) => {
    if (!animeList || animeList.length === 0) {
      return (
        <div className="text-center py-12">
          <p className="text-gray-400 dark:text-slate-600">No anime found in this category.</p>
        </div>
      )
    }

    return (
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
        {animeList.map((entry) => (
          <Card
            key={entry.id}
            className="bg-[#0A1428]/80 dark:bg-white/80 border-violet-500/20 overflow-hidden group hover:scale-105 transition-transform duration-300"
          >
            <div className="aspect-[3/4] relative">
              <img
                src={entry.media.coverImage?.large || "/placeholder.svg"}
                alt={entry.media.title.romaji}
                className="w-full h-full object-cover"
                crossOrigin="anonymous"
              />
              {showProgress && (
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2">
                  <div className="text-white text-sm">
                    Progress: {entry.progress}/{entry.media.episodes || "?"}
                  </div>
                </div>
              )}
            </div>
            <CardContent className="p-2">
              <h4 className="font-medium text-white dark:text-slate-800 text-xs line-clamp-2 mb-1">
                {entry.media.title.english || entry.media.title.romaji}
              </h4>
              <div className="flex flex-wrap gap-1 mb-1">
                {entry.media.genres?.slice(0, 1).map((genre) => (
                  <Badge key={genre} variant="outline" className="text-xs px-1 py-0">
                    {genre}
                  </Badge>
                ))}
              </div>
              <div className="flex justify-between items-center text-xs text-gray-400 dark:text-slate-600">
                <span>{entry.media.episodes || "?"} eps</span>
                <span>{entry.media.seasonYear}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  const getCategoryColor = (category) => {
    const colors = {
      Motivation: "bg-blue-500/20 text-blue-400 border-blue-500/30",
      Innovation: "bg-purple-500/20 text-purple-400 border-purple-500/30",
      Life: "bg-green-500/20 text-green-400 border-green-500/30",
      Dreams: "bg-pink-500/20 text-pink-400 border-pink-500/30",
      Inspiration: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
      Success: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
      Work: "bg-indigo-500/20 text-indigo-400 border-indigo-500/30",
      Opportunity: "bg-orange-500/20 text-orange-400 border-orange-500/30",
      Belief: "bg-cyan-500/20 text-cyan-400 border-cyan-500/30",
      Programming: "bg-violet-500/20 text-violet-400 border-violet-500/30",
      Learning: "bg-teal-500/20 text-teal-400 border-teal-500/30",
      General: "bg-gray-500/20 text-gray-400 border-gray-500/30",
    }
    return colors[category] || colors["General"]
  }

  // Hot Wheels Section Component (Under Construction) - Memoized to prevent re-renders
  const HotWheelsSection = React.memo(() => (
    <div className="min-h-screen py-20 relative">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-orange-950/20 via-amber-950/10 to-transparent"></div>

      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white dark:text-slate-800 mb-4 flex items-center justify-center">
            <Car className="h-8 w-8 mr-3 text-orange-400 dark:text-orange-600" />
            Hot Wheels Collection
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-orange-400 to-amber-500 mx-auto mb-6" />
          <p className="text-gray-300 dark:text-slate-600 max-w-2xl mx-auto">
            My miniature car collection featuring rare finds and detailed specifications
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-[#0A1428]/60 dark:bg-white/60 rounded-2xl p-12 backdrop-blur-sm border border-orange-500/20 text-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Wrench className="h-20 w-20 text-orange-400 dark:text-orange-600 mx-auto mb-8" />
              <h3 className="text-3xl font-bold text-white dark:text-slate-800 mb-6">Under Construction!</h3>
              <p className="text-gray-300 dark:text-slate-600 text-lg max-w-2xl mx-auto mb-8">
                I'm currently working on digitizing my Hot Wheels collection. This section will showcase my miniature
                car collection with detailed information about each model, rarity levels, and acquisition stories.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-[#050A1C]/50 dark:bg-slate-100/50 p-4 rounded-lg">
                  <Trophy className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
                  <p className="text-white dark:text-slate-800 font-semibold">Treasure Hunts</p>
                  <p className="text-gray-400 dark:text-slate-600 text-sm">Rare collectibles</p>
                </div>
                <div className="bg-[#050A1C]/50 dark:bg-slate-100/50 p-4 rounded-lg">
                  <Star className="h-8 w-8 text-purple-500 mx-auto mb-2" />
                  <p className="text-white dark:text-slate-800 font-semibold">Premium Series</p>
                  <p className="text-gray-400 dark:text-slate-600 text-sm">High-detail models</p>
                </div>
                <div className="bg-[#050A1C]/50 dark:bg-slate-100/50 p-4 rounded-lg">
                  <Calendar className="h-8 w-8 text-green-500 mx-auto mb-2" />
                  <p className="text-white dark:text-slate-800 font-semibold">Collection Timeline</p>
                  <p className="text-gray-400 dark:text-slate-600 text-sm">Acquisition history</p>
                </div>
              </div>
              <Badge variant="subtle" className="bg-orange-500/20 text-orange-400 dark:text-orange-600">
                Coming Soon
              </Badge>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  ))

  // Anime Section Component
  const AnimeSection = () => (
    <div className="min-h-screen py-20 relative">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-blue-950/20 via-indigo-950/10 to-transparent"></div>

      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white dark:text-slate-800 mb-4 flex items-center justify-center">
            <Play className="h-8 w-8 mr-3 text-blue-400 dark:text-blue-600" />
            Anime Collection
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-400 to-indigo-500 mx-auto mb-6" />
          <p className="text-gray-300 dark:text-slate-600 max-w-2xl mx-auto">
            My anime journey tracked through AniList with detailed statistics and collection management
          </p>
        </div>

        {animeLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : animeError ? (
          <div className="text-center">
            <div className="bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 p-4 rounded-lg mb-4">
              <p>Error loading AniList data: {animeError}</p>
            </div>
          </div>
        ) : null}

        {animeData && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12 max-w-5xl mx-auto">
              <Card className="bg-[#0A1428]/80 dark:bg-white/80 border-blue-500/20">
                <CardContent className="pt-6 text-center">
                  <div className="flex items-center justify-center mb-2">
                    <Trophy className="h-6 w-6 text-yellow-500 mr-2" />
                    <span className="text-3xl font-bold text-white dark:text-slate-800">{animeData.stats.count}</span>
                  </div>
                  <p className="text-gray-400 dark:text-slate-600">Completed</p>
                </CardContent>
              </Card>

              <Card className="bg-[#0A1428]/80 dark:bg-white/80 border-blue-500/20">
                <CardContent className="pt-6 text-center">
                  <div className="flex items-center justify-center mb-2">
                    <Play className="h-6 w-6 text-blue-500 mr-2" />
                    <span className="text-3xl font-bold text-white dark:text-slate-800">
                      {animeData.stats.episodesWatched}
                    </span>
                  </div>
                  <p className="text-gray-400 dark:text-slate-600">Episodes</p>
                </CardContent>
              </Card>

              <Card className="bg-[#0A1428]/80 dark:bg-white/80 border-blue-500/20">
                <CardContent className="pt-6 text-center">
                  <div className="flex items-center justify-center mb-2">
                    <Clock className="h-6 w-6 text-green-500 mr-2" />
                    <span className="text-3xl font-bold text-white dark:text-slate-800">
                      {Math.round(animeData.stats.minutesWatched / 60 / 24)}
                    </span>
                  </div>
                  <p className="text-gray-400 dark:text-slate-600">Days Watched</p>
                </CardContent>
              </Card>

              <Card className="bg-[#0A1428]/80 dark:bg-white/80 border-blue-500/20">
                <CardContent className="pt-6 text-center">
                  <div className="flex items-center justify-center mb-2">
                    <Star className="h-6 w-6 text-purple-500 mr-2" />
                    <span className="text-3xl font-bold text-white dark:text-slate-800">
                      {animeData.stats.meanScore}
                    </span>
                  </div>
                  <p className="text-gray-400 dark:text-slate-600">Mean Score</p>
                </CardContent>
              </Card>
            </div>

            <div className="bg-[#0A1428]/60 dark:bg-white/60 rounded-2xl p-8 backdrop-blur-sm border border-blue-500/20">
              <div className="flex flex-wrap gap-3 mb-8">
                <Button
                  variant={activeAnimeTab === "completed" ? "glow" : "outline2"}
                  onClick={() => setActiveAnimeTab("completed")}
                  className="flex items-center gap-2"
                >
                  <Trophy className="h-4 w-4" />
                  Completed ({animeData.completed.length})
                </Button>
                <Button
                  variant={activeAnimeTab === "watching" ? "glow" : "outline2"}
                  onClick={() => setActiveAnimeTab("watching")}
                  className="flex items-center gap-2"
                >
                  <Play className="h-4 w-4" />
                  Watching ({animeData.watching.length})
                </Button>
                <Button
                  variant={activeAnimeTab === "planToWatch" ? "glow" : "outline2"}
                  onClick={() => setActiveAnimeTab("planToWatch")}
                  className="flex items-center gap-2"
                >
                  <Calendar className="h-4 w-4" />
                  Plan to Watch ({animeData.planToWatch.length})
                </Button>
              </div>

              <motion.div
                key={activeAnimeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                {activeAnimeTab === "completed" && renderAnimeGrid(animeData.completed)}
                {activeAnimeTab === "watching" && renderAnimeGrid(animeData.watching, true)}
                {activeAnimeTab === "planToWatch" && renderAnimeGrid(animeData.planToWatch)}
              </motion.div>
            </div>
          </>
        )}
      </div>
    </div>
  )

  // Quotes Section Component (No Search)
  const QuotesSection = () => (
    <div className="min-h-screen py-20 relative">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-violet-950/20 via-purple-950/10 to-transparent"></div>

      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white dark:text-slate-800 mb-4 flex items-center justify-center">
            <Quote className="h-8 w-8 mr-3 text-violet-400 dark:text-violet-600" />
            Inspiring Quotes
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-violet-400 to-purple-500 mx-auto mb-6" />
          <p className="text-gray-300 dark:text-slate-600 max-w-2xl mx-auto">
            A curated collection of quotes that inspire, motivate, and guide my journey
          </p>
        </div>

        {quotesLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-violet-500"></div>
          </div>
        ) : quotesError ? (
          <div className="text-center mb-8">
            <div className="bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300 p-4 rounded-lg mb-4 max-w-2xl mx-auto">
              <p className="text-sm">{quotesError}</p>
            </div>
            <Button variant="outline2" onClick={fetchAllQuotes}>
              <RefreshCw className="h-4 w-4 mr-2" />
              Try Again
            </Button>
          </div>
        ) : null}

        {quotes.length > 0 && (
          <>
            <div className="text-center mb-8">
              <Badge variant="subtle" className="bg-violet-500/20 text-violet-400 dark:text-violet-600">
                {quotes.length} Quotes Loaded
              </Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {quotes.map((quote, index) => (
                <motion.div
                  key={quote.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 * (index % 6) }}
                >
                  <Card className="bg-[#0A1428]/60 dark:bg-white/60 border-violet-500/20 h-full hover:scale-105 transition-transform duration-300 relative backdrop-blur-sm">
                    <CardContent className="p-6">
                      {quote.favorite && (
                        <div className="absolute top-3 right-3">
                          <Heart className="h-4 w-4 text-red-500 fill-red-500" />
                        </div>
                      )}

                      <Quote className="h-8 w-8 text-violet-400 dark:text-violet-600 mb-4 opacity-50" />

                      <blockquote className="text-white dark:text-slate-800 mb-4 italic text-lg leading-relaxed">
                        "{quote.content}"
                      </blockquote>

                      <div className="flex justify-between items-center">
                        <cite className="text-gray-300 dark:text-slate-600 not-italic font-medium">
                          — {quote.author}
                        </cite>
                        {quote.category && (
                          <Badge className={getCategoryColor(quote.category)} variant="outline">
                            {quote.category}
                          </Badge>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            <div className="text-center mt-12">
              <Button variant="outline2" onClick={fetchAllQuotes} className="mx-auto">
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh Quotes
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  )

  // Render the active section
  const renderActiveSection = () => {
    console.log("Rendering section:", activeSection) // Debug log

    switch (activeSection) {
      case "hotwheels":
        return <HotWheelsSection />
      case "anime":
        return <AnimeSection />
      case "quotes":
        return <QuotesSection />
      default:
        console.log("Default case triggered, rendering Hot Wheels")
        return <HotWheelsSection />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#050A1C] via-[#0F1A36] to-[#050A1C] dark:from-[#f1f5f9] dark:via-[#e2e8f0] dark:to-[#f1f5f9] text-white dark:text-gray-900">
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
