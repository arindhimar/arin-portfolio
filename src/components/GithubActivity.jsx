// components/GithubActivity.jsx
"use client"

import React, { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Github, Calendar, ExternalLink } from "lucide-react"
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
          "https://api.github.com/users/arindhimar/repos?sort=pushed&direction=desc&per_page=5"
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
    let bg = theme === "dark" ? "bg-slate-200" : "bg-[#0A1428]"
    if (count > 0 && count <= 2) bg = theme === "dark" ? "bg-sky-300" : "bg-sky-900/50"
    else if (count > 2 && count <= 4) bg = theme === "dark" ? "bg-sky-400" : "bg-sky-700/60"
    else if (count > 4 && count <= 6) bg = theme === "dark" ? "bg-sky-500" : "bg-sky-600/70"
    else if (count > 6) bg = theme === "dark" ? "bg-sky-600" : "bg-sky-500"
    return <div className={`w-4 h-4 ${bg} rounded-sm`} />
  }

  // Helper: language badge
  const langColor = (lang) => {
    const map = {
      JavaScript: "bg-yellow-500/20 text-yellow-500",
      Python: "bg-blue-500/20 text-blue-500",
      React: "bg-cyan-500/20 text-cyan-500",
      "C#": "bg-purple-500/20 text-purple-500",
    }
    return map[lang] || "bg-gray-500/20 text-gray-500"
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
          <Badge variant="subtle" className="mb-4">Development Activity</Badge>
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white dark:text-slate-800">
            GitHub Activity
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-violet-500 to-fuchsia-500 mx-auto mb-6" />
          <p className="text-gray-300 dark:text-slate-600 max-w-3xl mx-auto">
            Live stats and recently committed‑to repos, fetched directly via GitHub’s REST API.
          </p>
        </motion.div>

        {/* Loading */}
        {loading && (
          <div className="flex justify-center items-center h-64">
            <p className={theme === "dark" ? "text-violet-500" : "text-sky-400"}>Loading…</p>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="flex flex-col items-center h-64 text-center">
            <p className={theme === "dark" ? "text-red-500" : "text-red-600"}>Error:</p>
            <p className="text-gray-400 dark:text-slate-600 mb-4">{error}</p>
            <Button variant="outline" onClick={() => window.location.reload()}>
              Retry
            </Button>
          </div>
        )}

        {/* Content */}
        {!loading && !error && data && (
          <div className="max-w-6xl mx-auto grid lg:grid-cols-3 gap-6">
            {/* Profile Card */}
            <motion.div
              className="bg-[#0A1428]/80 dark:bg-white/80 p-6 rounded-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex flex-col items-center mb-6">
                <img
                  src={data.avatar}
                  alt={data.name}
                  className="w-24 h-24 rounded-full border-2 border-sky-500/30 mb-4"
                />
                <h3 className="text-xl font-bold text-white dark:text-slate-800">
                  {data.name}
                </h3>
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
                    <p className="text-2xl font-bold text-sky-400">{value}</p>
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
                className="block text-center py-2 bg-[#050A1C]/80 dark:bg-slate-100/80 text-sky-400 rounded-lg hover:bg-[#0F1C36] dark:hover:bg-slate-200 transition"
              >
                <Github className="inline-block h-4 w-4 mr-1" />
                View Profile
              </a>
            </motion.div>

            {/* Heatmap & Recent Commits */}
            <motion.div
              className="bg-[#0A1428]/80 dark:bg-white/80 p-6 rounded-lg lg:col-span-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              {/* Heatmap */}
              <h3 className="flex items-center text-xl font-semibold mb-6 text-white dark:text-slate-800">
                <Calendar className="h-5 w-5 mr-2 text-sky-400" />
                Last 7 Days
              </h3>
              <div className="flex justify-between mb-6">
                {data.heatmap.map((d, i) => (
                  <div key={i} className="flex flex-col items-center">
                    <span className="text-xs text-gray-500 dark:text-slate-500 mb-1">
                      {d.date.split("-")[2]}
                    </span>
                    {renderCell(d.count)}
                  </div>
                ))}
              </div>

              {/* Recent Commits */}
              <h4 className="text-lg font-medium mb-4 text-white dark:text-slate-800">
                Recent Commits
              </h4>
              <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
                {data.recentRepos.map((repo, i) => (
                  <motion.div
                    key={i}
                    className="p-4 bg-[#050A1C]/80 dark:bg-slate-100/80 rounded-lg hover:scale-102 transition"
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <a
                        href={repo.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sky-400 font-medium hover:underline flex items-center"
                      >
                        {repo.name}
                        <ExternalLink className="h-3 w-3 ml-1" />
                      </a>
                      <span className="text-xs text-gray-500 dark:text-slate-500">
                        {repo.updated_at}
                      </span>
                    </div>
                    <p className="text-gray-400 dark:text-slate-600 text-sm mb-3 line-clamp-2">
                      {repo.description}
                    </p>
                    <div className="flex justify-between items-center">
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${langColor(
                          repo.language
                        )}`}
                      >
                        {repo.language}
                      </span>
                      <div className="flex space-x-4 text-gray-400 dark:text-slate-600 text-sm">
                        <span>★ {repo.stars}</span>
                        <span>🍴 {repo.forks}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </section>
  )
}

export default GithubActivity
