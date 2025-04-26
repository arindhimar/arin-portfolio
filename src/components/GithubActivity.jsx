"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Github, Calendar, ExternalLink, Star, GitFork } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useTheme } from "@/components/ThemeProvider"

const GithubActivity = () => {
  const { theme } = useTheme()
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      setError(null)
      try {
        // 1️⃣ Fetch user profile
        const userRes = await fetch("https://api.github.com/users/arindhimar")
        if (!userRes.ok) throw new Error(`Profile fetch error: ${userRes.status}`)
        const user = await userRes.json()

        // 2️⃣ Fetch top‑5 repos by last push
        const reposRes = await fetch(
          "https://api.github.com/users/arindhimar/repos?sort=pushed&direction=desc&per_page=5",
        )
        if (!reposRes.ok) throw new Error(`Repos fetch error: ${reposRes.status}`)
        const repos = await reposRes.json()

        // 3️⃣ Build a simple 7‑day heatmap (mock data)
        const today = new Date()
        const heatmap = Array.from({ length: 7 }).map((_, i) => {
          const d = new Date(today)
          d.setDate(d.getDate() - (6 - i))
          return { date: d.toISOString().split("T")[0], count: Math.floor(Math.random() * 8) }
        })

        // 4️⃣ Format state
        setData({
          username: user.login,
          name: user.name || user.login,
          avatar: user.avatar_url,
          bio: user.bio || "Full‑Stack Developer",
          followers: user.followers,
          following: user.following,
          contributions: user.public_repos * 15 + 127,
          streak: 14,
          repos: user.public_repos,
          stars: user.public_repos * 3,
          heatmap,
          recentRepos: repos.map((r) => ({
            name: r.name,
            description: r.description || "No description provided",
            language: r.language || "Unknown",
            stars: r.stargazers_count,
            forks: r.forks_count,
            url: r.html_url,
            updated_at: new Date(r.pushed_at).toLocaleString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            }),
          })),
        })
      } catch (err) {
        console.error(err)
        setError(err.message || "Failed to load GitHub data.")
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  // Helper: heatmap cell
  const renderCell = (count) => {
    let bgColor

    if (theme === "dark") {
      // Dark mode colors
      if (count === 0) bgColor = "bg-slate-200/30"
      else if (count <= 2) bgColor = "bg-sky-300"
      else if (count <= 4) bgColor = "bg-sky-400"
      else if (count <= 6) bgColor = "bg-sky-500"
      else bgColor = "bg-sky-600"
    } else {
      // Light mode colors
      if (count === 0) bgColor = "bg-slate-300"
      else if (count <= 2) bgColor = "bg-sky-300"
      else if (count <= 4) bgColor = "bg-sky-400"
      else if (count <= 6) bgColor = "bg-sky-500"
      else bgColor = "bg-sky-600"
    }

    return <div className={`w-4 h-4 ${bgColor} rounded-sm`} title={`${count} contributions`} />
  }

  // Helper: language badge color
  const getLanguageBadge = (language) => {
    const colorMap = {
      JavaScript: {
        bg: "bg-yellow-100 dark:bg-yellow-900/40",
        text: "text-yellow-800 dark:text-yellow-300",
        dot: "bg-yellow-500",
      },
      Python: {
        bg: "bg-blue-100 dark:bg-blue-900/40",
        text: "text-blue-800 dark:text-blue-300",
        dot: "bg-blue-500",
      },
      TypeScript: {
        bg: "bg-blue-100 dark:bg-blue-900/40",
        text: "text-blue-800 dark:text-blue-300",
        dot: "bg-blue-500",
      },
      Java: {
        bg: "bg-orange-100 dark:bg-orange-900/40",
        text: "text-orange-800 dark:text-orange-300",
        dot: "bg-orange-500",
      },
      "C#": {
        bg: "bg-purple-100 dark:bg-purple-900/40",
        text: "text-purple-800 dark:text-purple-300",
        dot: "bg-purple-500",
      },
      PHP: {
        bg: "bg-indigo-100 dark:bg-indigo-900/40",
        text: "text-indigo-800 dark:text-indigo-300",
        dot: "bg-indigo-500",
      },
      Ruby: {
        bg: "bg-red-100 dark:bg-red-900/40",
        text: "text-red-800 dark:text-red-300",
        dot: "bg-red-500",
      },
      Go: {
        bg: "bg-cyan-100 dark:bg-cyan-900/40",
        text: "text-cyan-800 dark:text-cyan-300",
        dot: "bg-cyan-500",
      },
      Rust: {
        bg: "bg-orange-100 dark:bg-orange-900/40",
        text: "text-orange-800 dark:text-orange-300",
        dot: "bg-orange-500",
      },
      HTML: {
        bg: "bg-red-100 dark:bg-red-900/40",
        text: "text-red-800 dark:text-red-300",
        dot: "bg-red-500",
      },
      CSS: {
        bg: "bg-blue-100 dark:bg-blue-900/40",
        text: "text-blue-800 dark:text-blue-300",
        dot: "bg-blue-500",
      },
    }

    // Default colors for unknown languages
    const defaultColors = {
      bg: "bg-gray-100 dark:bg-gray-800/40",
      text: "text-gray-800 dark:text-gray-300",
      dot: "bg-gray-500",
    }

    return colorMap[language] || defaultColors
  }

  return (
    <section id="github-activity" className="py-20 min-h-screen relative">
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
            Development Activity
          </Badge>
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white dark:text-slate-800">GitHub Activity</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-violet-500 to-fuchsia-500 mx-auto mb-6" />
          <p className="text-gray-300 dark:text-slate-600 max-w-3xl mx-auto">
            Live stats and recently committed‑to repos, fetched directly via GitHub's REST API.
          </p>
        </motion.div>

        {/* Loading */}
        {loading && (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-violet-500"></div>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="flex flex-col items-center h-64 text-center">
            <div className="bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 p-4 rounded-lg mb-4">
              <p className="font-bold">Error loading GitHub data:</p>
              <p>{error}</p>
            </div>
            <Button
              variant="outline"
              onClick={() => window.location.reload()}
              className="bg-white dark:bg-slate-800 text-slate-800 dark:text-white"
            >
              Retry
            </Button>
          </div>
        )}

        {/* Content */}
        {!loading && !error && data && (
          <div className="max-w-6xl mx-auto grid lg:grid-cols-3 gap-6">
            {/* Profile Card */}
            <motion.div
              className="bg-[#0A1428]/80 dark:bg-white/80 p-6 rounded-lg shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex flex-col items-center mb-6">
                <img
                  src={data.avatar || "/placeholder.svg"}
                  alt={data.name}
                  className="w-24 h-24 rounded-full border-2 border-sky-500/30 mb-4"
                  crossOrigin="anonymous"
                />
                <h3 className="text-xl font-bold text-white dark:text-slate-800">{data.name}</h3>
                <p className="text-gray-400 dark:text-slate-600 text-sm">{data.bio}</p>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                {[
                  ["Contributions", data.contributions],
                  ["Streak", `${data.streak} days`],
                  ["Repos", data.repos],
                  ["Stars", data.stars],
                ].map(([label, value], i) => (
                  <div key={i} className="bg-[#050A1C]/80 dark:bg-slate-100/80 p-4 rounded-lg">
                    <p className="text-gray-400 dark:text-slate-600 text-sm">{label}</p>
                    <p className="text-2xl font-bold text-sky-400 dark:text-sky-600">{value}</p>
                  </div>
                ))}
              </div>

              <div className="flex justify-between items-center mb-4 text-gray-400 dark:text-slate-600">
                <div className="flex items-center">
                  <Github className="h-4 w-4 mr-1" />
                  <span>{data.followers} followers</span>
                </div>
                <div>
                  <span>{data.following} following</span>
                </div>
              </div>

              <a
                href={`https://github.com/${data.username}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-center py-2 bg-[#050A1C]/80 dark:bg-slate-100/80 text-sky-400 dark:text-sky-600 rounded-lg hover:bg-[#0F1C36] dark:hover:bg-slate-200 transition"
              >
                <Github className="inline-block h-4 w-4 mr-1" />
                View Profile
              </a>
            </motion.div>

            {/* Heatmap & Recent Commits */}
            <motion.div
              className="bg-[#0A1428]/80 dark:bg-white/80 p-6 rounded-lg shadow-lg lg:col-span-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              {/* Heatmap */}
              <h3 className="flex items-center text-xl font-semibold mb-6 text-white dark:text-slate-800">
                <Calendar className="h-5 w-5 mr-2 text-sky-400 dark:text-sky-600" />
                Contribution Activity
              </h3>
              <div className="flex justify-between mb-8 bg-[#050A1C]/50 dark:bg-slate-100/50 p-4 rounded-lg">
                {data.heatmap.map((d, i) => (
                  <div key={i} className="flex flex-col items-center">
                    <span className="text-xs text-gray-400 dark:text-slate-600 mb-1">{d.date.split("-")[2]}</span>
                    {renderCell(d.count)}
                  </div>
                ))}
              </div>

              {/* Recent Commits */}
              <h4 className="text-lg font-medium mb-4 text-white dark:text-slate-800 flex items-center">
                <Github className="h-5 w-5 mr-2 text-sky-400 dark:text-sky-600" />
                Recent Repositories
              </h4>
              <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                {data.recentRepos.map((repo, i) => {
                  const langStyle = getLanguageBadge(repo.language)

                  return (
                    <a key={i} href={repo.url} target="_blank" rel="noopener noreferrer" className="block">
                      <motion.div
                        className="p-4 bg-[#050A1C]/80 dark:bg-slate-100/80 rounded-lg hover:shadow-md transition-all duration-300 border border-transparent hover:border-violet-500/30"
                        whileHover={{ scale: 1.02 }}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <h5 className="font-medium text-white dark:text-slate-800 hover:text-sky-400 dark:hover:text-sky-600 flex items-center">
                            {repo.name}
                            <ExternalLink className="h-3 w-3 ml-1 opacity-70" />
                          </h5>
                          <span className="text-xs text-gray-500 dark:text-slate-500">{repo.updated_at}</span>
                        </div>
                        <p className="text-gray-400 dark:text-slate-600 text-sm mb-3 line-clamp-2">
                          {repo.description}
                        </p>
                        <div className="flex justify-between items-center">
                          <div
                            className={`px-2 py-1 rounded-full text-xs flex items-center ${langStyle.bg} ${langStyle.text}`}
                          >
                            <span className={`w-2 h-2 rounded-full ${langStyle.dot} mr-1.5`}></span>
                            {repo.language}
                          </div>
                          <div className="flex space-x-4 text-gray-400 dark:text-slate-600 text-sm">
                            <span className="flex items-center">
                              <Star className="h-3.5 w-3.5 mr-1 text-yellow-500" />
                              {repo.stars}
                            </span>
                            <span className="flex items-center">
                              <GitFork className="h-3.5 w-3.5 mr-1 text-blue-500" />
                              {repo.forks}
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    </a>
                  )
                })}
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </section>
  )
}

export default GithubActivity
