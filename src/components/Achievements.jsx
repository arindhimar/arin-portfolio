"use client"

import { Trophy, Award, Star, Target } from 'lucide-react'
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useTheme } from "@/components/ThemeProvider"

const Achievements = () => {
  const { theme } = useTheme()

  const achievements = [
    {
      title: "E-Yantra Finalist",
      description: "Finalist in E-Yantra, a National Robotics Competition organized by IIT Bombay.",
      icon: <Trophy className="h-8 w-8 text-amber-500" />,
      color: "bg-amber-500/10",
      borderColor: "border-amber-500/30",
    },
    {
      title: "AI Hackathon",
      description: "Participated in a 30-hour AI Hackathon and built a fraud detection system.",
      icon: <Award className="h-8 w-8 text-blue-500" />,
      color: "bg-blue-500/10",
      borderColor: "border-blue-500/30",
    },
    {
      title: "Top Performer",
      description: "Recognized as a top performer in several local development contests.",
      icon: <Star className="h-8 w-8 text-violet-500" />,
      color: "bg-violet-500/10",
      borderColor: "border-violet-500/30",
    },
    {
      title: "React Certification",
      description: "Certified React developer via Udemy, demonstrating proficiency in modern React development.",
      icon: <Target className="h-8 w-8 text-green-500" />,
      color: "bg-green-500/10",
      borderColor: "border-green-500/30",
    },
  ]

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  return (
    <section id="achievements" className="py-20 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-[#050A1C]/50 via-violet-950/20 to-[#050A1C]/50 dark:from-slate-100/50 dark:via-violet-100/20 dark:to-slate-100/50"></div>
        <div className="absolute top-1/3 -right-20 w-80 h-80 bg-violet-600/5 rounded-full filter blur-[100px]"></div>
        <div className="absolute bottom-1/3 -left-20 w-80 h-80 bg-indigo-500/5 rounded-full filter blur-[100px]"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
        >
          <Badge variant="subtle" className="mb-4">
            Recognition
          </Badge>
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white dark:text-slate-800">Achievements</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-violet-500 to-indigo-500 mx-auto mb-6"></div>
          <p className="text-gray-300 dark:text-slate-600 max-w-3xl mx-auto">
            Recognition and accomplishments from competitions, hackathons, and professional development.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
        >
          {achievements.map((achievement, index) => (
            <motion.div key={index} variants={item} whileHover={{ scale: 1.02 }}>
              <Card
                className={`border-violet-500/20 bg-[#0A1428]/80 dark:bg-white/80 backdrop-blur-sm hover:shadow-lg transition-all duration-300 ${achievement.color}`}
              >
                <CardContent className="pt-6">
                  <div className="flex items-start">
                    <div className="mr-4 p-3 rounded-full bg-[#0A1428]/50 dark:bg-white/50 backdrop-blur-sm">
                      {achievement.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2 text-white dark:text-slate-800">{achievement.title}</h3>
                      <p className="text-gray-300 dark:text-slate-600">{achievement.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="mt-16 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card className="border-violet-500/20 bg-[#0A1428]/80 dark:bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-2xl text-center text-white dark:text-slate-800">Learning Goals</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="w-4 h-4 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 mr-3"></div>
                  <p className="text-gray-300 dark:text-slate-600">
                    Advanced Frontend (animations, accessibility, performance)
                  </p>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 rounded-full bg-gradient-to-r from-green-400 to-teal-500 mr-3"></div>
                  <p className="text-gray-300 dark:text-slate-600">Cloud services integration (AWS/GCP/Azure)</p>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 rounded-full bg-gradient-to-r from-violet-400 to-indigo-500 mr-3"></div>
                  <p className="text-gray-300 dark:text-slate-600">
                    Custom compilers/tokenizers (working on SQL syntax checker)
                  </p>
                </div>
              </div>

              <div className="mt-8 pt-8 border-t border-border/50">
                <h3 className="text-xl font-bold mb-4 text-white dark:text-slate-800">Open to Collaborate On:</h3>
                <ul className="space-y-2">
                  <motion.li
                    className="flex items-center"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: 0.5 }}
                  >
                    <span className="mr-2 text-violet-500 dark:text-violet-600">•</span>
                    <span className="text-gray-300 dark:text-slate-600">
                      Open-source anime/streaming-based platforms
                    </span>
                  </motion.li>
                  <motion.li
                    className="flex items-center"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: 0.6 }}
                  >
                    <span className="mr-2 text-violet-500 dark:text-violet-600">•</span>
                    <span className="text-gray-300 dark:text-slate-600">Innovative web or mobile app ideas</span>
                  </motion.li>
                  <motion.li
                    className="flex items-center"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: 0.7 }}
                  >
                    <span className="mr-2 text-violet-500 dark:text-violet-600">•</span>
                    <span className="text-gray-300 dark:text-slate-600">
                      Projects focused on developer productivity or education tech
                    </span>
                  </motion.li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}

export default Achievements
