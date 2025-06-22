"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Play, Star, Trophy, Car, Zap, Clock, TrendingUp } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useTheme } from "@/components/ThemeProvider"

const FunSection = () => {
  const { theme } = useTheme()
  const [animeData, setAnimeData] = useState(null)
  const [animeLoading, setAnimeLoading] = useState(true)
  const [animeError, setAnimeError] = useState(null)

  // Hot Wheels collection data (you can expand this)
  const hotWheelsCollection = [
    {
      id: 1,
      name: "Lamborghini Huracán LP 610-4",
      series: "Exotics",
      year: "2023",
      color: "Metallic Green",
      rarity: "Super Treasure Hunt",
      image: "/placeholder.svg?height=200&width=300",
      acquired: "2023-08-15",
      value: "$25-30",
      description: "One of my favorite supercars in the collection with amazing detail work.",
    },
    {
      id: 2,
      name: "Nissan Skyline GT-R (R34)",
      series: "Fast & Furious",
      year: "2022",
      color: "Blue with White Stripes",
      rarity: "Premium",
      image: "/placeholder.svg?height=200&width=300",
      acquired: "2022-12-10",
      value: "$8-12",
      description: "Classic JDM legend from the Fast & Furious series.",
    },
    {
      id: 3,
      name: "McLaren P1",
      series: "Car Culture",
      year: "2023",
      color: "Orange",
      rarity: "Regular Treasure Hunt",
      image: "/placeholder.svg?height=200&width=300",
      acquired: "2023-03-22",
      value: "$15-20",
      description: "Stunning hypercar with incredible aerodynamic details.",
    },
    {
      id: 4,
      name: "Porsche 911 GT3 RS",
      series: "Speed Blur",
      year: "2023",
      color: "White with Green Accents",
      rarity: "Mainline",
      image: "/placeholder.svg?height=200&width=300",
      acquired: "2023-06-05",
      value: "$3-5",
      description: "Perfect track-focused sports car with amazing livery.",
    },
    {
      id: 5,
      name: "Ford Mustang Shelby GT500",
      series: "Muscle Mania",
      year: "2022",
      color: "Matte Black",
      rarity: "Super",
      image: "/placeholder.svg?height=200&width=300",
      acquired: "2022-09-18",
      value: "$6-10",
      description: "American muscle at its finest with aggressive styling.",
    },
    {
      id: 6,
      name: "Tesla Cybertruck",
      series: "HW Green Speed",
      year: "2023",
      color: "Silver",
      rarity: "Mainline",
      image: "/placeholder.svg?height=200&width=300",
      acquired: "2023-11-12",
      value: "$2-4",
      description: "Futuristic electric truck with unique angular design.",
    },
  ]

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

        // Fallback mock data for demo purposes
        setAnimeData({
          user: {
            name: "arindhimar",
            avatar: { large: "/placeholder.svg?height=100&width=100" },
          },
          stats: {
            count: 127,
            episodesWatched: 2847,
            minutesWatched: 71175,
            meanScore: 7.8,
          },
          completed: [],
        })
      } finally {
        setAnimeLoading(false)
      }
    }

    fetchAnimeData()
  }, [])

  const getRarityColor = (rarity) => {
    switch (rarity) {
      case "Super Treasure Hunt":
        return "bg-gradient-to-r from-yellow-400 to-orange-500 text-white"
      case "Regular Treasure Hunt":
        return "bg-gradient-to-r from-green-400 to-emerald-500 text-white"
      case "Premium":
        return "bg-gradient-to-r from-purple-400 to-violet-500 text-white"
      case "Super":
        return "bg-gradient-to-r from-blue-400 to-cyan-500 text-white"
      default:
        return "bg-gray-500/20 text-gray-600 dark:text-gray-400"
    }
  }

  const getScoreColor = (score) => {
    if (score >= 9) return "text-green-500"
    if (score >= 7) return "text-yellow-500"
    if (score >= 5) return "text-orange-500"
    return "text-red-500"
  }

  return (
    <section id="fun" className="py-20 min-h-screen relative">
      {/* Background */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[#050A1C]/50 via-violet-950/20 to-[#050A1C]/50 dark:from-slate-100/50 dark:via-violet-100/20 dark:to-slate-100/50" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Badge
            variant="subtle"
            className="mb-4 bg-violet-500/20 text-violet-400 dark:bg-violet-500/20 dark:text-violet-600"
          >
            Personal Interests
          </Badge>
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white dark:text-slate-800">Fun Stuff</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-violet-500 to-fuchsia-500 mx-auto mb-6" />
          <p className="text-gray-300 dark:text-slate-600 max-w-3xl mx-auto">
            Beyond coding, I'm passionate about anime and collecting Hot Wheels. Here's a glimpse into my otaku life and
            miniature car collection.
          </p>
        </motion.div>

        {/* Tabs */}
        <div className="max-w-6xl mx-auto">
          <Tabs defaultValue="anime" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8 bg-[#0A1428]/80 dark:bg-white/80">
              <TabsTrigger
                value="anime"
                className="flex items-center gap-2 data-[state=active]:bg-violet-500 data-[state=active]:text-white"
              >
                <Play className="h-4 w-4" />
                Anime Collection
              </TabsTrigger>
              <TabsTrigger
                value="hotwheels"
                className="flex items-center gap-2 data-[state=active]:bg-violet-500 data-[state=active]:text-white"
              >
                <Car className="h-4 w-4" />
                Hot Wheels Collection
              </TabsTrigger>
            </TabsList>

            {/* Anime Tab */}
            <TabsContent value="anime" className="space-y-6">
              {animeLoading ? (
                <div className="flex justify-center items-center h-64">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-violet-500"></div>
                </div>
              ) : animeError ? (
                <div className="text-center">
                  <div className="bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 p-4 rounded-lg mb-4">
                    <p>Using demo data (AniList API error: {animeError})</p>
                  </div>
                </div>
              ) : null}

              {animeData && (
                <>
                  {/* Anime Stats */}
                  <motion.div
                    className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Card className="bg-[#0A1428]/80 dark:bg-white/80 border-violet-500/20">
                      <CardContent className="pt-6 text-center">
                        <div className="flex items-center justify-center mb-2">
                          <Trophy className="h-5 w-5 text-yellow-500 mr-2" />
                          <span className="text-2xl font-bold text-white dark:text-slate-800">
                            {animeData.stats.count}
                          </span>
                        </div>
                        <p className="text-gray-400 dark:text-slate-600 text-sm">Completed</p>
                      </CardContent>
                    </Card>

                    <Card className="bg-[#0A1428]/80 dark:bg-white/80 border-violet-500/20">
                      <CardContent className="pt-6 text-center">
                        <div className="flex items-center justify-center mb-2">
                          <Play className="h-5 w-5 text-blue-500 mr-2" />
                          <span className="text-2xl font-bold text-white dark:text-slate-800">
                            {animeData.stats.episodesWatched}
                          </span>
                        </div>
                        <p className="text-gray-400 dark:text-slate-600 text-sm">Episodes</p>
                      </CardContent>
                    </Card>

                    <Card className="bg-[#0A1428]/80 dark:bg-white/80 border-violet-500/20">
                      <CardContent className="pt-6 text-center">
                        <div className="flex items-center justify-center mb-2">
                          <Clock className="h-5 w-5 text-green-500 mr-2" />
                          <span className="text-2xl font-bold text-white dark:text-slate-800">
                            {Math.round(animeData.stats.minutesWatched / 60 / 24)}
                          </span>
                        </div>
                        <p className="text-gray-400 dark:text-slate-600 text-sm">Days Watched</p>
                      </CardContent>
                    </Card>

                    <Card className="bg-[#0A1428]/80 dark:bg-white/80 border-violet-500/20">
                      <CardContent className="pt-6 text-center">
                        <div className="flex items-center justify-center mb-2">
                          <Star className="h-5 w-5 text-purple-500 mr-2" />
                          <span className="text-2xl font-bold text-white dark:text-slate-800">
                            {animeData.stats.meanScore}
                          </span>
                        </div>
                        <p className="text-gray-400 dark:text-slate-600 text-sm">Mean Score</p>
                      </CardContent>
                    </Card>
                  </motion.div>

                  {/* Completed Anime */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    <h3 className="text-2xl font-bold mb-6 text-white dark:text-slate-800 flex items-center">
                      <Trophy className="h-6 w-6 mr-2 text-yellow-500" />
                      Recently Completed
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                      {animeData.completed.slice(0, 8).map((entry) => (
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
                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                              <div className="text-center">
                                <div className={`text-2xl font-bold ${getScoreColor(entry.score)}`}>
                                  {entry.score}/10
                                </div>
                                <div className="text-white text-sm">My Rating</div>
                              </div>
                            </div>
                          </div>
                          <CardContent className="p-4">
                            <h4 className="font-semibold text-white dark:text-slate-800 mb-2 line-clamp-2">
                              {entry.media.title.english || entry.media.title.romaji}
                            </h4>
                            <div className="flex flex-wrap gap-1 mb-2">
                              {entry.media.genres?.slice(0, 2).map((genre) => (
                                <Badge key={genre} variant="outline" className="text-xs">
                                  {genre}
                                </Badge>
                              ))}
                            </div>
                            <div className="flex justify-between items-center text-sm text-gray-400 dark:text-slate-600">
                              <span>{entry.media.episodes} eps</span>
                              <span>{entry.media.seasonYear}</span>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </motion.div>

                  {/* Currently Watching */}
                  {animeData.watching.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.4 }}
                    >
                      <h3 className="text-2xl font-bold mb-6 text-white dark:text-slate-800 flex items-center">
                        <Play className="h-6 w-6 mr-2 text-blue-500" />
                        Currently Watching
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {animeData.watching.map((entry) => (
                          <Card
                            key={entry.id}
                            className="bg-[#0A1428]/80 dark:bg-white/80 border-violet-500/20 overflow-hidden"
                          >
                            <div className="aspect-[3/4] relative">
                              <img
                                src={entry.media.coverImage?.large || "/placeholder.svg"}
                                alt={entry.media.title.romaji}
                                className="w-full h-full object-cover"
                                crossOrigin="anonymous"
                              />
                              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2">
                                <div className="text-white text-sm">
                                  Progress: {entry.progress}/{entry.media.episodes || "?"}
                                </div>
                              </div>
                            </div>
                            <CardContent className="p-4">
                              <h4 className="font-semibold text-white dark:text-slate-800 mb-2 line-clamp-2">
                                {entry.media.title.english || entry.media.title.romaji}
                              </h4>
                              <div className="flex flex-wrap gap-1">
                                {entry.media.genres?.slice(0, 2).map((genre) => (
                                  <Badge key={genre} variant="outline" className="text-xs">
                                    {genre}
                                  </Badge>
                                ))}
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </>
              )}
            </TabsContent>

            {/* Hot Wheels Tab */}
            <TabsContent value="hotwheels" className="space-y-6">
              {/* Collection Stats */}
              <motion.div
                className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Card className="bg-[#0A1428]/80 dark:bg-white/80 border-violet-500/20">
                  <CardContent className="pt-6 text-center">
                    <div className="flex items-center justify-center mb-2">
                      <Car className="h-5 w-5 text-blue-500 mr-2" />
                      <span className="text-2xl font-bold text-white dark:text-slate-800">
                        {hotWheelsCollection.length}
                      </span>
                    </div>
                    <p className="text-gray-400 dark:text-slate-600 text-sm">Total Cars</p>
                  </CardContent>
                </Card>

                <Card className="bg-[#0A1428]/80 dark:bg-white/80 border-violet-500/20">
                  <CardContent className="pt-6 text-center">
                    <div className="flex items-center justify-center mb-2">
                      <Trophy className="h-5 w-5 text-yellow-500 mr-2" />
                      <span className="text-2xl font-bold text-white dark:text-slate-800">
                        {hotWheelsCollection.filter((car) => car.rarity.includes("Treasure Hunt")).length}
                      </span>
                    </div>
                    <p className="text-gray-400 dark:text-slate-600 text-sm">Treasure Hunts</p>
                  </CardContent>
                </Card>

                <Card className="bg-[#0A1428]/80 dark:bg-white/80 border-violet-500/20">
                  <CardContent className="pt-6 text-center">
                    <div className="flex items-center justify-center mb-2">
                      <Zap className="h-5 w-5 text-purple-500 mr-2" />
                      <span className="text-2xl font-bold text-white dark:text-slate-800">
                        {hotWheelsCollection.filter((car) => car.rarity === "Premium").length}
                      </span>
                    </div>
                    <p className="text-gray-400 dark:text-slate-600 text-sm">Premium</p>
                  </CardContent>
                </Card>

                <Card className="bg-[#0A1428]/80 dark:bg-white/80 border-violet-500/20">
                  <CardContent className="pt-6 text-center">
                    <div className="flex items-center justify-center mb-2">
                      <TrendingUp className="h-5 w-5 text-green-500 mr-2" />
                      <span className="text-2xl font-bold text-white dark:text-slate-800">2023</span>
                    </div>
                    <p className="text-gray-400 dark:text-slate-600 text-sm">Latest Year</p>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Hot Wheels Collection */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <h3 className="text-2xl font-bold mb-6 text-white dark:text-slate-800 flex items-center">
                  <Car className="h-6 w-6 mr-2 text-blue-500" />
                  My Collection
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {hotWheelsCollection.map((car) => (
                    <Card
                      key={car.id}
                      className="bg-[#0A1428]/80 dark:bg-white/80 border-violet-500/20 overflow-hidden group hover:scale-105 transition-transform duration-300"
                    >
                      <div className="aspect-[4/3] relative">
                        <img
                          src={car.image || "/placeholder.svg"}
                          alt={car.name}
                          className="w-full h-full object-cover bg-gradient-to-br from-gray-100 to-gray-200"
                          crossOrigin="anonymous"
                        />
                        <div className="absolute top-2 right-2">
                          <Badge className={getRarityColor(car.rarity)}>{car.rarity}</Badge>
                        </div>
                      </div>
                      <CardContent className="p-4">
                        <h4 className="font-semibold text-white dark:text-slate-800 mb-2">{car.name}</h4>
                        <p className="text-gray-400 dark:text-slate-600 text-sm mb-3">{car.description}</p>

                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-400 dark:text-slate-600">Series:</span>
                            <span className="text-white dark:text-slate-800">{car.series}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400 dark:text-slate-600">Year:</span>
                            <span className="text-white dark:text-slate-800">{car.year}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400 dark:text-slate-600">Color:</span>
                            <span className="text-white dark:text-slate-800">{car.color}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400 dark:text-slate-600">Value:</span>
                            <span className="text-green-400">{car.value}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400 dark:text-slate-600">Acquired:</span>
                            <span className="text-white dark:text-slate-800">
                              {new Date(car.acquired).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </motion.div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  )
}

export default FunSection
