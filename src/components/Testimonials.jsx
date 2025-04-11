"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Quote, ChevronLeft, ChevronRight, Star } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { useTheme } from "@/components/ThemeProvider"

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react"
import { Pagination, Navigation, Autoplay } from "swiper/modules"

// Import Swiper styles
import "swiper/css"
import "swiper/css/pagination"
import "swiper/css/navigation"

const Testimonials = () => {
  const { theme } = useTheme()
  const [activeIndex, setActiveIndex] = useState(0)

  const testimonials = [
    {
      name: "Alex Johnson",
      role: "Product Manager at TechCorp",
      image: "/placeholder.svg?height=80&width=80",
      content:
        "Working with Arin was a game-changer for our project. His technical expertise and problem-solving skills helped us deliver a complex application on time and with exceptional quality.",
      rating: 5,
    },
    {
      name: "Sarah Williams",
      role: "Startup Founder",
      image: "/placeholder.svg?height=80&width=80",
      content:
        "Arin brought my vision to life with his full-stack development skills. He's not just a developer but a partner who understands business needs and translates them into technical solutions.",
      rating: 5,
    },
    {
      name: "Michael Chen",
      role: "UI/UX Designer",
      image: "/placeholder.svg?height=80&width=80",
      content:
        "As a designer, I appreciate developers who can implement designs with precision. Arin's attention to detail and commitment to pixel-perfect implementation made our collaboration seamless.",
      rating: 5,
    },
    {
      name: "Emily Rodriguez",
      role: "Project Lead at DesignHub",
      image: "/placeholder.svg?height=80&width=80",
      content:
        "Arin's ability to quickly adapt to new technologies and solve complex problems made him an invaluable asset to our team. His work on our dashboard application exceeded our expectations.",
      rating: 4,
    },
  ]

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-[#050A1C]/50 via-violet-950/20 to-[#050A1C]/50 dark:from-slate-100/50 dark:via-violet-100/20 dark:to-slate-100/50"></div>
        <div className="absolute top-1/3 -right-20 w-80 h-80 bg-violet-600/10 rounded-full filter blur-[100px]"></div>
        <div className="absolute bottom-1/3 -left-20 w-80 h-80 bg-fuchsia-600/10 rounded-full filter blur-[100px]"></div>
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
            Client Feedback
          </Badge>
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white dark:text-slate-800">Testimonials</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-violet-500 to-fuchsia-500 mx-auto mb-6"></div>
          <p className="text-gray-300 dark:text-slate-600 max-w-3xl mx-auto">
            What clients and collaborators have to say about working with me on various projects.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-5xl mx-auto"
        >
          <Swiper
            spaceBetween={30}
            centeredSlides={true}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            pagination={{
              clickable: true,
            }}
            navigation={{
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            }}
            modules={[Pagination, Navigation, Autoplay]}
            onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
            className="testimonials-swiper"
          >
            {testimonials.map((testimonial, index) => (
              <SwiperSlide key={index}>
                <div className="bg-[#0A1428]/80 dark:bg-white/80 backdrop-blur-sm p-8 md:p-10 rounded-2xl border border-violet-500/20">
                  <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                    <div className="flex-shrink-0">
                      <div className="relative">
                        <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-violet-500/30">
                          <img
                            src={testimonial.image || "/placeholder.svg"}
                            alt={testimonial.name}
                            className="w-full h-full object-cover"
                            crossOrigin="anonymous"
                          />
                        </div>
                        <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-full p-1">
                          <Quote className="h-4 w-4 text-white" />
                        </div>
                      </div>
                    </div>

                    <div className="flex-1 text-center md:text-left">
                      <div className="flex justify-center md:justify-start mb-2">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${i < testimonial.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-400"}`}
                          />
                        ))}
                      </div>

                      <p className="text-gray-300 dark:text-slate-700 mb-4 text-lg italic">"{testimonial.content}"</p>

                      <div>
                        <h4 className="text-white dark:text-slate-800 font-semibold">{testimonial.name}</h4>
                        <p className="text-gray-400 dark:text-slate-600 text-sm">{testimonial.role}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}

            <div className="swiper-button-prev !text-violet-400 !hidden md:!flex">
              <ChevronLeft className="h-6 w-6" />
            </div>
            <div className="swiper-button-next !text-violet-400 !hidden md:!flex">
              <ChevronRight className="h-6 w-6" />
            </div>
          </Swiper>

          <div className="flex justify-center mt-8 gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  activeIndex === index
                    ? "bg-gradient-to-r from-violet-500 to-fuchsia-500 scale-125"
                    : "bg-gray-600 dark:bg-gray-400 hover:bg-gray-500"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Testimonials
