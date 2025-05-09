"use client"
import { motion } from "framer-motion"
import { ExternalLink } from "lucide-react"

interface EducationItem {
  degree: string
  institution: string
  period: string
  description?: string
  logo?: string
  link?: string
  category: string
}

const EducationSection = () => {
  const education: EducationItem[] = [
    {
      degree: "Bachelor of Science in Information Technology",
      institution: "St. Dominic College of Asia",
      period: "August 2022 - Present",
      description:
        "Pursuing a comprehensive program focused on modern information technology concepts, software development, and systems design.",
      logo: "/images/logo/sdcalogo.png",
      link: "https://stdominiccollege.edu.ph/",
      category: "Higher Education",
    },
    {
      degree: "ICT (Information and Communication Technology)",
      institution: "Informatics Philippines",
      period: "2020 - 2022",
      description:
        "Completed senior high school with a focus on Information and Communication Technology, building a foundation in information technology and digital skills.",
      logo: "/images/logo/informaticslogo.png",
      link: "https://informatics.edu.ph/",
      category: "Senior High School",
    },
  ]

  return (
    <section id="education" className="py-16 bg-background">
      <div className="container px-4 md:px-6 mx-auto">
        <motion.h2
          className="text-3xl font-bold text-center mb-16 text-foreground"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          Education
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {education.map((edu, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="flex flex-col items-center text-center group"
            >
              {/* Time period at top for better hierarchy */}
              <div className="flex items-center justify-center text-sm text-muted-foreground mb-3">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary/70 mr-2" />
                {edu.period}
              </div>

              {/* Logo Container */}
              <motion.div
                className="w-[120px] h-[120px] mb-5 relative"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
              >
                <div className="absolute inset-0 border border-primary/20 rounded-md" />
                <div className="absolute inset-0 bg-card rounded-md" />

                {/* Logo */}
                {edu.logo && (
                  <div className="relative w-full h-full flex items-center justify-center p-3 z-10">
                    <img
                      src={edu.logo || "/placeholder.svg"}
                      alt={`${edu.institution} logo`}
                      className="w-full h-full object-contain"
                    />
                  </div>
                )}

                {/* Corner accents - always visible on mobile, toggle on hover for desktop */}
                <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-primary/50 rounded-tl-sm md:opacity-0 md:group-hover:opacity-100 md:transition-opacity" />
                <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-primary/50 rounded-tr-sm md:opacity-0 md:group-hover:opacity-100 md:transition-opacity" />
                <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-primary/50 rounded-bl-sm md:opacity-0 md:group-hover:opacity-100 md:transition-opacity" />
                <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-primary/50 rounded-br-sm md:opacity-0 md:group-hover:opacity-100 md:transition-opacity" />
              </motion.div>

              {/* Category badge - positioned right after logo */}
              <div className="bg-primary/10 text-primary text-xs px-3 py-1 rounded-full mb-3">
                {edu.category}
              </div>

              {/* Degree with external link */}
              <div className="flex items-center justify-center gap-1.5 mb-2">
                <h3 className="text-lg font-bold text-foreground">{edu.degree}</h3>
                {edu.link && (
                  <motion.a
                    href={edu.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary opacity-70 hover:opacity-100 transition-opacity"
                    aria-label={`Visit ${edu.institution} website`}
                    whileHover={{ scale: 1.2 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <ExternalLink size={14} />
                  </motion.a>
                )}
              </div>

              {/* Institution */}
              <div className="text-base text-foreground/80 mb-3">{edu.institution}</div>

              {/* Description - Always visible on mobile, hidden by default on desktop */}
              {edu.description && (
                <div className="text-sm text-muted-foreground md:max-h-0 md:group-hover:max-h-20 md:overflow-hidden md:transition-all md:duration-300 md:opacity-0 md:group-hover:opacity-100">
                  {edu.description}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default EducationSection
