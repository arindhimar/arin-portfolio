"use client"

import React from "react"
import { Github } from "lucide-react"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const projects = [
  {
    id: 1,
    title: "ANIMEX",
    description:
      "A scalable anime streaming platform with HLS video streaming, background video processing via FFmpeg, admin dashboard, editable metadata, genre & episode management, and secure file uploads. Built with a full-stack MVC architecture.",
    image: "https://i.ibb.co/tMh8s4zQ/ANIMEX.jpg",
    tags: ["React", "Tailwind CSS", "Flask", "MySQL", "FFmpeg", "HLS", "MVC", "Rest-API"],
    demoLink: "#",
    codeLink: "https://github.com/arindhimar",
    features: [
      "HLS Streaming with FFmpeg",
      "Background video processing using Python threads",
      "Genre, Anime & Episode Management",
      "Real-time search and inline editing",
      "RESTful Flask APIs with MVC structure",
      "Secure file uploads & queue system"
    ],
    color: "from-violet-600 to-fuchsia-600",
  },
  {
    id: 2,
    title: "Dev-Litics",
    description:
      "An AI-powered IDE extension and analytics platform that prevents resume fraud by tracking real coding activity, language usage, and project contributions with automated social sharing and HR dashboards.",
    image: "https://i.ibb.co/Nd1Lgt8F/devlitisc.png",
    tags: ["VS Code Extension", "JavaScript", "React", "Flask", "ShadCn", "Tailwind CSS", "MySQL", "Rest-API"],
    demoLink: "#",
    codeLink: "https://github.com/arindhimar",
    features: [
      "Tracks coding time, language, and project automatically",
      "In-memory tracking with 3–4 sec idle detection",
      "AI-based commit summarizer for auto social media posts",
      "Dashboard with verified analytics for HRs, students & teachers",
    ],
    color: "from-purple-600 to-indigo-600",
  },
  {
    id: 3,
    title: "Web-Tether",
    description:
      "A decentralized uptime monitoring platform where validators manually ping websites to verify availability and earn coins, enabling a trust-based ecosystem for site monitoring.",
    image: "https://i.ibb.co/svpgY6Tq/Web-Tether.jpg",
    tags: ["React", "Flask", "MySQL", "REST-API", "Clerk", "Tailwind", "ShadCn"],
    demoLink: "#",
    codeLink: "https://github.com/arindhimar/WebTether",
    features: [
      "Validator system with manual pinging",
      "Incentive mechanism using coins for validators",
      "User reporting and validator flagging",
      "Robust role-based architecture (Users, Validators, Reports)",
      "Region-based ping tracking and latency recording",
      "Secure authentication with Clerk",
      "Reward logic based on ping contributions",
    ],
    color: "from-teal-600 to-cyan-600",
  },
  {
    id: 4,
    title: "BookAura",
    description:
      "A comprehensive multilingual book platform for reading and listening with secure role-based access, intelligent moderation, and seamless UX.",
    image: "https://i.ibb.co/7chy6XW/BookAura.jpg",
    tags: ["React", "Flask", "MySQL", "Text-to-Speech", "JWT", "ShadCn", "Rest-API"],
    demoLink: "#",
    codeLink: "https://github.com/arindhimar/BookAura",
    features: [
      "Role-based access (Admin, Publisher, Author, Normal User)",
      "AI-powered book moderation (PyMuPDF + OpenCV)",
      "Text-to-Speech in English, Hindi, and Marathi",
      "Upload & manage PDF and audio versions",
      "Bookmarking, reading history, audio requests",
      "Categorized and searchable library",
      "Responsive pixel-perfect UI with theme toggle",
      "PDF reader and integrated recommendation engine",
      "Marathi/Hindi speech synthesis via Bhashini API (planned)"
    ],
    color: "from-indigo-600 to-purple-600"
  }
]


export default function ProjectsGrid() {
  return (
    <section id="projects" className="py-20 bg-[#050A1C]/50 dark:bg-slate-100/50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge variant="subtle" className="mb-2 bg-violet-500/20 text-violet-400 dark:bg-slate-800/50 dark:text-violet-500">
            My Work
          </Badge>
          <h2 className="text-4xl font-bold text-white dark:text-slate-800">
            Featured Projects
          </h2>
          <p className="text-gray-300 dark:text-slate-600 max-w-2xl mx-auto mt-4">
            A selection of my recent full‑stack projects, each built with modern tools and best practices.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((proj, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.03 }}
              className="relative"
            >
              <Card className="overflow-hidden bg-[#050A1C]/30 dark:bg-slate-100/20 backdrop-blur-sm border border-slate-800/50 dark:border-slate-100/20">
                {/* Image */}
                <div className="aspect-video w-full bg-black/10">
                  <div
                    className="w-full h-full bg-center bg-cover"
                    style={{ backgroundImage: `url(${proj.image})` }}
                  />
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-2xl font-semibold mb-2 text-white dark:text-slate-800">
                    {proj.title}
                  </h3>
                  <p className="text-gray-300 dark:text-slate-600 mb-4">
                    {proj.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {proj.tags.map((tag, i) => (
                      <Badge
                        key={i}
                        variant="outline"
                        className="text-gray-100 dark:text-slate-500 border-gray-400/50 dark:border-slate-500/50"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  {/* Code Button */}
                  <div className="flex">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full border-gray-400/50 text-gray-100 hover:bg-gray-400/20 dark:border-slate-500/50 dark:text-slate-600 dark:hover:bg-slate-100/20"
                      asChild
                    >
                      <a href={proj.codeLink} target="_blank" rel="noopener noreferrer">
                        <Github className="h-4 w-4 mr-1" />
                        View Code
                      </a>
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}