"use client"

import { Code, BookOpen, Award, Briefcase, Lightbulb } from "lucide-react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const About = () => {
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
    <section id="about" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
        >
          <Badge variant="subtle" className="mb-4">
            Who I Am
          </Badge>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">About Me</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-violet-500 to-indigo-500 mx-auto mb-6"></div>
          <p className="text-muted-foreground max-w-3xl mx-auto">
            I'm a full-stack developer with strong proficiency in both frontend and backend technologies. With a passion
            for clean design, performance, and problem-solving, I enjoy building intuitive, user-centric web
            applications.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Card className="h-full border-border/50 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-2xl">My Journey</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  I began my development journey during my undergraduate studies, where I discovered my passion for
                  creating digital solutions that solve real-world problems. What started as curiosity quickly evolved
                  into a career path as I delved deeper into web technologies.
                </p>
                <p className="text-muted-foreground">
                  Currently pursuing my master's degree, I balance academic learning with hands-on project work. This
                  combination has given me a unique perspective that blends theoretical knowledge with practical
                  implementation skills.
                </p>
                <p className="text-muted-foreground">
                  I've participated in multiple hackathons, including a 30-hour AI Hackathon, and was a finalist in
                  E-Yantra, a National Robotics Competition by IIT Bombay. These experiences have honed my ability to
                  work under pressure and collaborate effectively in team settings.
                </p>

                <div className="pt-4">
                  <h3 className="text-lg font-medium mb-3">What I Bring to the Table:</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <span className="mr-2 text-violet-500">•</span>
                      <span className="text-muted-foreground">
                        Strong problem-solving skills with a focus on user experience
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 text-violet-500">•</span>
                      <span className="text-muted-foreground">
                        Ability to quickly adapt to new technologies and frameworks
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 text-violet-500">•</span>
                      <span className="text-muted-foreground">
                        Experience working in both solo and team environments
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 text-violet-500">•</span>
                      <span className="text-muted-foreground">
                        Commitment to writing clean, maintainable, and well-documented code
                      </span>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="h-full border-border/50 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-2xl">Personal Info</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex justify-center mb-6">
                  <Avatar className="w-32 h-32 border-4 border-violet-500/20">
                    <AvatarImage src="/placeholder.svg?height=128&width=128" alt="Arin Dhimar" />
                    <AvatarFallback>AD</AvatarFallback>
                  </Avatar>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Name:</span>
                    <span className="font-medium">Arin Dhimar</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Location:</span>
                    <span className="font-medium">India</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Education:</span>
                    <span className="font-medium">Master's Student</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Experience:</span>
                    <span className="font-medium">3+ Years</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Languages:</span>
                    <span className="font-medium">English, Hindi</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-border/50">
                  <h3 className="text-lg font-medium mb-3">Interests:</h3>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline">Web Development</Badge>
                    <Badge variant="outline">UI/UX Design</Badge>
                    <Badge variant="outline">AI/ML</Badge>
                    <Badge variant="outline">Open Source</Badge>
                    <Badge variant="outline">Anime</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <motion.div variants={item} whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
            <Card className="h-full border-border/50 bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-all duration-300">
              <CardContent className="pt-6">
                <div className="flex items-center mb-4">
                  <div className="p-3 bg-violet-500/10 rounded-full mr-4">
                    <Code className="h-6 w-6 text-violet-500" />
                  </div>
                  <h3 className="text-xl font-semibold">Full-Stack Developer</h3>
                </div>
                <p className="text-muted-foreground">
                  I specialize in building complete web applications from frontend to backend, with a focus on React for
                  frontend and Python/Node.js for backend development.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={item} whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
            <Card className="h-full border-border/50 bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-all duration-300">
              <CardContent className="pt-6">
                <div className="flex items-center mb-4">
                  <div className="p-3 bg-indigo-500/10 rounded-full mr-4">
                    <BookOpen className="h-6 w-6 text-indigo-500" />
                  </div>
                  <h3 className="text-xl font-semibold">Master's Student</h3>
                </div>
                <p className="text-muted-foreground">
                  Currently pursuing my master's degree, I bring both academic insight and real-world experience to my
                  development work.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={item} whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
            <Card className="h-full border-border/50 bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-all duration-300">
              <CardContent className="pt-6">
                <div className="flex items-center mb-4">
                  <div className="p-3 bg-green-500/10 rounded-full mr-4">
                    <Award className="h-6 w-6 text-green-500" />
                  </div>
                  <h3 className="text-xl font-semibold">Competition Finalist</h3>
                </div>
                <p className="text-muted-foreground">
                  Finalist in E-Yantra (National Robotics Competition by IIT Bombay) and participated in multiple
                  hackathons, including a 30-hour AI Hackathon.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={item} whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
            <Card className="h-full border-border/50 bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-all duration-300">
              <CardContent className="pt-6">
                <div className="flex items-center mb-4">
                  <div className="p-3 bg-amber-500/10 rounded-full mr-4">
                    <Briefcase className="h-6 w-6 text-amber-500" />
                  </div>
                  <h3 className="text-xl font-semibold">Project Experience</h3>
                </div>
                <p className="text-muted-foreground">
                  Developed multiple full-stack applications including streaming platforms, productivity tools, and
                  developer utilities with a focus on user experience.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={item} whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
            <Card className="h-full border-border/50 bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-all duration-300">
              <CardContent className="pt-6">
                <div className="flex items-center mb-4">
                  <div className="p-3 bg-red-500/10 rounded-full mr-4">
                    <Lightbulb className="h-6 w-6 text-red-500" />
                  </div>
                  <h3 className="text-xl font-semibold">Learning Goals</h3>
                </div>
                <p className="text-muted-foreground">
                  Currently focusing on advanced frontend techniques, cloud services integration, and custom
                  compilers/tokenizers for SQL syntax checking.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={item} whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
            <Card className="h-full border-border/50 bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-all duration-300">
              <CardContent className="pt-6">
                <div className="flex items-center mb-4">
                  <div className="p-3 bg-blue-500/10 rounded-full mr-4">
                    <Code className="h-6 w-6 text-blue-500" />
                  </div>
                  <h3 className="text-xl font-semibold">Open to Collaborate</h3>
                </div>
                <p className="text-muted-foreground">
                  Interested in collaborating on open-source anime/streaming platforms, innovative web or mobile app
                  ideas, and projects focused on developer productivity.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default About
