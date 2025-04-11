"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Code, Clock, Github, Award, ExternalLink, Calendar, Activity } from "lucide-react"

const CurrentWork = () => {
  const [githubData, setGithubData] = useState(null)
  const [gfgData, setGfgData] = useState(null)
  const [wakaTimeData, setWakaTimeData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("github")
  const [error, setError] = useState(null)

  // Fetch GitHub data
  const fetchGitHubData = async () => {
    try {
      const username = "arindhimar" // Replace with your GitHub username
      const [userRes, reposRes] = await Promise.all([
        fetch(`https://api.github.com/users/${arindhimar}`),
        fetch(`https://api.github.com/users/${arindhimar}/repos?sort=updated&per_page=3`)
      ])
      
      if (!userRes.ok || !reposRes.ok) throw new Error("GitHub API error")
      
      const userData = await userRes.json()
      const reposData = await reposRes.json()

      // For contributions, you might need to use GitHub's GraphQL API
      // This is a simplified example - consider using a library like 'github-contributions-api'
      const contributions = await fetch(`https://github-contributions-api.deno.dev/${arindhimar}`)
        .then(res => res.json())
        .then(data => data.totalContributions || 0)
        .catch(() => 0)

      return {
        contributions,
        streak: await fetchGitHubStreak(username),
        repos: userData.public_repos,
        stars: reposData.reduce((sum, repo) => sum + repo.stargazers_count, 0),
        recentRepos: reposData.map(repo => ({
          name: repo.name,
          language: repo.language || "Unknown",
          stars: repo.stargazers_count,
          forks: repo.forks_count
        })),
        heatmap: generateHeatmapData()
      }
    } catch (error) {
      console.error("GitHub fetch error:", error)
      return null
    }
  }

  // Helper to generate streak data (mock - implement your own logic)
  const fetchGitHubStreak = async (username) => {
    // In a real app, you'd need to calculate this from contribution data
    return Math.floor(Math.random() * 30) + 1 // Random streak for demo
  }

  // Generate mock heatmap data
  const generateHeatmapData = () => {
    const days = []
    for (let i = 6; i >= 0; i--) {
      const date = new Date()
      date.setDate(date.getDate() - i)
      days.push({
        date: date.toISOString().split('T')[0],
        count: Math.floor(Math.random() * 10) // Replace with real data
      })
    }
    return days
  }

  // Fetch GFG data (mock - GFG doesn't have a public API)
  const fetchGFGData = async () => {
    try {
      // In a real app, you'd need to:
      // 1. Use a scraping solution (with permission)
      // 2. Manually update this data
      // 3. Find a third-party service
      return {
        rank: Math.floor(Math.random() * 5000) + 1,
        score: Math.floor(Math.random() * 3000) + 1000,
        problemsSolved: Math.floor(Math.random() * 300) + 50,
        streak: Math.floor(Math.random() * 30) + 1,
        badges: ["Problem Solver", "30 Days Streak", "Contest Participant"],
        recentProblems: [
          { name: "Minimum Spanning Tree", difficulty: "Medium", date: new Date().toISOString().split('T')[0] },
          { name: "Detect Cycle in Graph", difficulty: "Medium", date: new Date(Date.now() - 86400000 * 2).toISOString().split('T')[0] },
          { name: "Longest Common Subsequence", difficulty: "Hard", date: new Date(Date.now() - 86400000 * 5).toISOString().split('T')[0] }
        ]
      }
    } catch (error) {
      console.error("GFG fetch error:", error)
      return null
    }
  }

  // Fetch WakaTime data
  const fetchWakaTimeData = async () => {
    try {
      const username = "arindhimar" // Replace with your WakaTime username
      const apiKey = process.env.NEXT_PUBLIC_WAKATIME_API_KEY // Set in your environment
      
      if (!apiKey) throw new Error("WakaTime API key missing")
      
      const statsRes = await fetch(`https://wakatime.com/api/v1/users/${username}/stats/last_7_days`, {
        headers: { Authorization: `Basic ${btoa(apiKey)}` }
      })
      
      if (!statsRes.ok) throw new Error("WakaTime API error")
      
      const statsData = await statsRes.json()
      
      return {
        totalHours: Math.round(statsData.data.total_seconds / 3600) || 0,
        dailyAverage: (statsData.data.daily_average / 3600).toFixed(1) || "0.0",
        languages: statsData.data.languages?.slice(0, 5).map(lang => ({
          name: lang.name,
          percent: lang.percent
        })) || [],
        editors: statsData.data.editors?.slice(0, 3).map(editor => ({
          name: editor.name,
          percent: editor.percent
        })) || [],
        weeklyActivity: generateWeeklyActivity(statsData)
      }
    } catch (error) {
      console.error("WakaTime fetch error:", error)
      return null
    }
  }

  // Generate weekly activity data
  const generateWeeklyActivity = (statsData) => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    return days.map(day => ({
      day,
      hours: parseFloat((Math.random() * 8).toFixed(1)) // Replace with actual data
    }))
  }

  // Main data fetching effect
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      setError(null)
      
      try {
        const [github, gfg, wakatime] = await Promise.all([
          fetchGitHubData(),
          fetchGFGData(),
          fetchWakaTimeData()
        ])
        
        setGithubData(github)
        setGfgData(gfg)
        setWakaTimeData(wakatime)
      } catch (err) {
        console.error("Failed to fetch data:", err)
        setError("Failed to load data. Please try again later.")
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  // Render contribution cells
  const renderContributionCell = (count) => {
    let bgColor = "bg-[#0A1428]"

    if (count > 0 && count <= 2) bgColor = "bg-sky-900/50"
    else if (count > 2 && count <= 4) bgColor = "bg-sky-700/60"
    else if (count > 4 && count <= 6) bgColor = "bg-sky-600/70"
    else if (count > 6) bgColor = "bg-sky-500"

    return (
      <div className={`w-4 h-4 ${bgColor} rounded-sm hover:scale-150 transition-all duration-300 group relative`}>
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-[#0A1428] text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none">
          {count} contributions
        </div>
      </div>
    )
  }

  // Render language bars
  const renderLanguageBar = (languages) => {
    return (
      <div className="h-5 w-full rounded-full overflow-hidden flex">
        {languages.map((lang, index) => (
          <div
            key={index}
            className={`h-full relative group`}
            style={{
              width: `${lang.percent}%`,
              background: getLanguageColor(lang.name),
            }}
          >
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-[#0A1428] text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none">
              {lang.name}: {lang.percent}%
            </div>
          </div>
        ))}
      </div>
    )
  }

  // Get language colors
  const getLanguageColor = (language) => {
    const colors = {
      JavaScript: "linear-gradient(to right, #f7df1e, #e6cc1c)",
      Python: "linear-gradient(to right, #3776ab, #306998)",
      "HTML/CSS": "linear-gradient(to right, #e34c26, #c3381c)",
      "C#": "linear-gradient(to right, #9b4f96, #7d3f7a)",
      Other: "linear-gradient(to right, #6e7681, #565d65)",
    }
    return colors[language] || colors["Other"]
  }

  const tabs = [
    { id: "github", label: "GitHub", icon: <Github className="h-5 w-5" /> },
    { id: "gfg", label: "GeeksForGeeks", icon: <Award className="h-5 w-5" /> },
    { id: "wakatime", label: "WakaTime", icon: <Clock className="h-5 w-5" /> },
  ]

  return (
    <section id="current-work" className="py-20 min-h-screen flex items-center bg-[#050A1C]">
      <div className="container mx-auto px-4">
        {error && (
          <div className="bg-red-900/30 text-red-400 p-4 rounded-lg mb-6">
            {error}
          </div>
        )}

        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Current Work</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-sky-400 to-blue-500 mx-auto mb-6"></div>
          <p className="text-gray-400 max-w-3xl mx-auto">
            Track my ongoing development activities, coding stats, and problem-solving progress across different
            platforms.
          </p>
        </motion.div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="relative">
              <svg className="w-16 h-16" viewBox="0 0 100 100">
                <motion.circle
                  cx="50"
                  cy="50"
                  r="40"
                  stroke="#0EA5E9"
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
              </svg>
              <p className="text-sky-400 mt-4">Loading data...</p>
            </div>
          </div>
        ) : (
          <div className="max-w-6xl mx-auto">
            {/* Tabs */}
            <div className="flex justify-center mb-10">
              <div className="inline-flex p-1 bg-[#0A1428] rounded-lg">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 flex items-center space-x-2 ${
                      activeTab === tab.id
                        ? "bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow-[0_0_15px_rgba(14,165,233,0.3)]"
                        : "text-gray-400 hover:text-sky-400"
                    }`}
                  >
                    <span>{tab.icon}</span>
                    <span>{tab.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Content */}
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              {/* GitHub Tab */}
              {activeTab === "github" && githubData && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Stats Card */}
                  <motion.div
                    className="bg-[#0A1428] p-6 rounded-lg shadow-[0_0_15px_rgba(14,165,233,0.15)]"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h3 className="text-xl font-semibold mb-6 text-white flex items-center">
                      <Github className="h-5 w-5 mr-2 text-sky-400" />
                      GitHub Stats
                    </h3>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-[#050A1C] p-4 rounded-lg">
                        <p className="text-gray-400 text-sm">Contributions</p>
                        <p className="text-2xl font-bold text-sky-400">{githubData.contributions}</p>
                      </div>
                      <div className="bg-[#050A1C] p-4 rounded-lg">
                        <p className="text-gray-400 text-sm">Current Streak</p>
                        <p className="text-2xl font-bold text-sky-400">{githubData.streak} days</p>
                      </div>
                      <div className="bg-[#050A1C] p-4 rounded-lg">
                        <p className="text-gray-400 text-sm">Repositories</p>
                        <p className="text-2xl font-bold text-sky-400">{githubData.repos}</p>
                      </div>
                      <div className="bg-[#050A1C] p-4 rounded-lg">
                        <p className="text-gray-400 text-sm">Stars Received</p>
                        <p className="text-2xl font-bold text-sky-400">{githubData.stars}</p>
                      </div>
                    </div>

                    <div className="mt-6">
                      <a
                        href={`https://github.com/arindhimar`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center w-full py-2 bg-[#050A1C] text-sky-400 rounded-lg hover:bg-[#0F1C36] transition-colors duration-300"
                      >
                        <ExternalLink className="h-4 w-4 mr-2" />
                        View GitHub Profile
                      </a>
                    </div>
                  </motion.div>

                  {/* Contribution Heatmap */}
                  <motion.div
                    className="bg-[#0A1428] p-6 rounded-lg shadow-[0_0_15px_rgba(14,165,233,0.15)] lg:col-span-2"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                  >
                    <h3 className="text-xl font-semibold mb-6 text-white flex items-center">
                      <Calendar className="h-5 w-5 mr-2 text-sky-400" />
                      Contribution Activity
                    </h3>

                    <div className="mb-6">
                      <p className="text-gray-400 mb-3">Last 7 Days</p>
                      <div className="flex justify-between gap-2">
                        {githubData.heatmap.map((day, index) => (
                          <div key={index} className="flex flex-col items-center">
                            <p className="text-xs text-gray-500 mb-2">{day.date.split("-")[2]}</p>
                            {renderContributionCell(day.count)}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-lg font-medium mb-4 text-white">Recent Repositories</h4>
                      <div className="space-y-4">
                        {githubData.recentRepos.map((repo, index) => (
                          <motion.div
                            key={index}
                            className="bg-[#050A1C] p-4 rounded-lg flex justify-between items-center hover:bg-[#0F1C36] transition-colors duration-300 cursor-pointer"
                            whileHover={{ scale: 1.02 }}
                          >
                            <div>
                              <h5 className="text-white font-medium">{repo.name}</h5>
                              <p className="text-gray-400 text-sm">{repo.language}</p>
                            </div>
                            <div className="flex items-center space-x-4">
                              <div className="flex items-center">
                                <svg className="w-4 h-4 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                                </svg>
                                <span className="text-gray-400 text-sm">{repo.stars}</span>
                              </div>
                              <div className="flex items-center">
                                <svg className="w-4 h-4 text-gray-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                  <path
                                    fillRule="evenodd"
                                    d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z"
                                    clipRule="evenodd"
                                  ></path>
                                </svg>
                                <span className="text-gray-400 text-sm">{repo.forks}</span>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </div>
              )}

              {/* GeeksForGeeks Tab */}
              {activeTab === "gfg" && gfgData && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Stats Card */}
                  <motion.div
                    className="bg-[#0A1428] p-6 rounded-lg shadow-[0_0_15px_rgba(14,165,233,0.15)]"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h3 className="text-xl font-semibold mb-6 text-white flex items-center">
                      <Award className="h-5 w-5 mr-2 text-green-400" />
                      GFG Stats
                    </h3>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-[#050A1C] p-4 rounded-lg">
                        <p className="text-gray-400 text-sm">Rank</p>
                        <p className="text-2xl font-bold text-green-400">#{gfgData.rank}</p>
                      </div>
                      <div className="bg-[#050A1C] p-4 rounded-lg">
                        <p className="text-gray-400 text-sm">Score</p>
                        <p className="text-2xl font-bold text-green-400">{gfgData.score}</p>
                      </div>
                      <div className="bg-[#050A1C] p-4 rounded-lg">
                        <p className="text-gray-400 text-sm">Problems Solved</p>
                        <p className="text-2xl font-bold text-green-400">{gfgData.problemsSolved}</p>
                      </div>
                      <div className="bg-[#050A1C] p-4 rounded-lg">
                        <p className="text-gray-400 text-sm">Current Streak</p>
                        <p className="text-2xl font-bold text-green-400">{gfgData.streak} days</p>
                      </div>
                    </div>

                    <div className="mt-6">
                      <a
                        href="https://auth.geeksforgeeks.org/user/arindhimar"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center w-full py-2 bg-[#050A1C] text-green-400 rounded-lg hover:bg-[#0F1C36] transition-colors duration-300"
                      >
                        <ExternalLink className="h-4 w-4 mr-2" />
                        View GFG Profile
                      </a>
                    </div>
                  </motion.div>

                  {/* Badges and Recent Problems */}
                  <motion.div
                    className="bg-[#0A1428] p-6 rounded-lg shadow-[0_0_15px_rgba(14,165,233,0.15)] lg:col-span-2"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                  >
                    <h3 className="text-xl font-semibold mb-6 text-white flex items-center">
                      <Award className="h-5 w-5 mr-2 text-green-400" />
                      Achievements & Recent Activity
                    </h3>

                    <div className="mb-6">
                      <h4 className="text-lg font-medium mb-4 text-white">Badges Earned</h4>
                      <div className="flex flex-wrap gap-3">
                        {gfgData.badges.map((badge, index) => (
                          <motion.div
                            key={index}
                            className="bg-[#050A1C] px-4 py-2 rounded-full text-green-400 border border-green-900/30 flex items-center"
                            whileHover={{ scale: 1.05 }}
                          >
                            <Award className="h-4 w-4 mr-2" />
                            {badge}
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-lg font-medium mb-4 text-white">Recently Solved Problems</h4>
                      <div className="space-y-4">
                        {gfgData.recentProblems.map((problem, index) => (
                          <motion.div
                            key={index}
                            className="bg-[#050A1C] p-4 rounded-lg hover:bg-[#0F1C36] transition-colors duration-300 cursor-pointer"
                            whileHover={{ scale: 1.02 }}
                          >
                            <div className="flex justify-between items-center">
                              <h5 className="text-white font-medium">{problem.name}</h5>
                              <span
                                className={`px-2 py-1 rounded text-xs font-medium ${
                                  problem.difficulty === "Easy"
                                    ? "bg-green-900/30 text-green-400"
                                    : problem.difficulty === "Medium"
                                      ? "bg-yellow-900/30 text-yellow-400"
                                      : "bg-red-900/30 text-red-400"
                                }`}
                              >
                                {problem.difficulty}
                              </span>
                            </div>
                            <p className="text-gray-400 text-sm mt-2">Solved on {problem.date}</p>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </div>
              )}

              {/* WakaTime Tab */}
              {activeTab === "wakatime" && wakaTimeData && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Stats Card */}
                  <motion.div
                    className="bg-[#0A1428] p-6 rounded-lg shadow-[0_0_15px_rgba(14,165,233,0.15)]"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h3 className="text-xl font-semibold mb-6 text-white flex items-center">
                      <Clock className="h-5 w-5 mr-2 text-purple-400" />
                      Coding Stats
                    </h3>

                    <div className="grid grid-cols-1 gap-4">
                      <div className="bg-[#050A1C] p-4 rounded-lg">
                        <p className="text-gray-400 text-sm">Total Coding Time</p>
                        <p className="text-2xl font-bold text-purple-400">{wakaTimeData.totalHours} hrs</p>
                      </div>
                      <div className="bg-[#050A1C] p-4 rounded-lg">
                        <p className="text-gray-400 text-sm">Daily Average</p>
                        <p className="text-2xl font-bold text-purple-400">{wakaTimeData.dailyAverage} hrs</p>
                      </div>
                    </div>

                    <div className="mt-6">
                      <h4 className="text-lg font-medium mb-4 text-white">Editors</h4>
                      <div className="space-y-3">
                        {wakaTimeData.editors.map((editor, index) => (
                          <div key={index} className="flex justify-between items-center">
                            <span className="text-gray-400">{editor.name}</span>
                            <span className="text-purple-400 font-medium">{editor.percent}%</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mt-6">
                      <a
                        href="https://wakatime.com/@arindhimar"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center w-full py-2 bg-[#050A1C] text-purple-400 rounded-lg hover:bg-[#0F1C36] transition-colors duration-300"
                      >
                        <ExternalLink className="h-4 w-4 mr-2" />
                        View WakaTime Profile
                      </a>
                    </div>
                  </motion.div>

                  {/* Languages and Weekly Activity */}
                  <motion.div
                    className="bg-[#0A1428] p-6 rounded-lg shadow-[0_0_15px_rgba(14,165,233,0.15)] lg:col-span-2"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                  >
                    <h3 className="text-xl font-semibold mb-6 text-white flex items-center">
                      <Code className="h-5 w-5 mr-2 text-purple-400" />
                      Languages & Activity
                    </h3>

                    <div className="mb-8">
                      <h4 className="text-lg font-medium mb-4 text-white">Languages</h4>
                      <div className="mb-2">{renderLanguageBar(wakaTimeData.languages)}</div>
                      <div className="flex flex-wrap gap-4 mt-4">
                        {wakaTimeData.languages.map((lang, index) => (
                          <div key={index} className="flex items-center">
                            <div
                              className="w-3 h-3 rounded-full mr-2"
                              style={{ background: getLanguageColor(lang.name) }}
                            ></div>
                            <span className="text-gray-400 text-sm">
                              {lang.name} ({lang.percent}%)
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-lg font-medium mb-4 text-white flex items-center">
                        <Activity className="h-4 w-4 mr-2 text-purple-400" />
                        Weekly Activity
                      </h4>
                      <div className="bg-[#050A1C] p-4 rounded-lg">
                        <div className="flex items-end justify-between h-40">
                          {wakaTimeData.weeklyActivity.map((day, index) => (
                            <div key={index} className="flex flex-col items-center">
                              <div
                                className="w-8 bg-gradient-to-t from-purple-600 to-blue-500 rounded-t-md hover:from-purple-500 hover:to-blue-400 transition-colors duration-300 relative group"
                                style={{ height: `${(day.hours / 8) * 100}%` }}
                              >
                                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-[#0A1428] text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none">
                                  {day.hours} hrs
                                </div>
                              </div>
                              <span className="text-xs text-gray-500 mt-2">{day.day.substring(0, 3)}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </div>
    </section>
  )
}

export default CurrentWork