"use client"

import { useState, useEffect, useRef } from "react"
import { Github, X, ExternalLink, ChevronLeft, ChevronRight, Monitor, Smartphone, ChevronDown, ChevronUp } from "lucide-react"
import BrowserFrame from "./ui/BrowserFrame"
import PhoneFrame from "./ui/PhoneFrame"
import { projects, getCategories, getProjectsByCategory, type Project } from "../data/projects"

const ProjectsSection = () => {
  const [activeFilter, setActiveFilter] = useState<string>("All")
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0)
  const [showAllProjects, setShowAllProjects] = useState<boolean>(false)
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false)
  const [visibleProjects, setVisibleProjects] = useState<Set<string>>(new Set())
  const projectRefs = useRef<Map<string, HTMLDivElement>>(new Map())

  const categories = getCategories()
  const filteredProjects = getProjectsByCategory(activeFilter)
  const hasMoreProjects = filteredProjects.length > 3

  const handleFilterChange = (category: string) => {
    setActiveFilter(category)
    setShowAllProjects(false) // Reset to show only first 3 projects when filter changes
  }

  const handleToggleProjects = () => {
    setIsTransitioning(true)
    setShowAllProjects(!showAllProjects)

    // Reset transition state after animation completes
    setTimeout(() => {
      setIsTransitioning(false)
    }, 800) // Slightly longer than the longest animation duration
  }

  const openProjectModal = (project: Project) => {
    setSelectedProject(project)
    setCurrentImageIndex(0)
    document.body.style.overflow = "hidden"
  }

  const closeProjectModal = () => {
    setSelectedProject(null)
    setCurrentImageIndex(0)
    document.body.style.overflow = "unset"
  }

  const nextImage = () => {
    if (selectedProject) {
      setCurrentImageIndex((prev) => (prev + 1) % selectedProject.images.length)
    }
  }

  const prevImage = () => {
    if (selectedProject) {
      setCurrentImageIndex((prev) => (prev - 1 + selectedProject.images.length) % selectedProject.images.length)
    }
  }

  const isMobileApp = (category: string) => category.toLowerCase().includes("mobile")

  // Intersection Observer for mobile featured badge visibility
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const projectId = entry.target.getAttribute('data-project-id')
          if (projectId) {
            setVisibleProjects(prev => {
              const newSet = new Set(prev)
              if (entry.isIntersecting) {
                newSet.add(projectId)
                // Auto-hide after 7 seconds on mobile
                if (window.innerWidth < 640) {
                  setTimeout(() => {
                    setVisibleProjects(current => {
                      const updated = new Set(current)
                      updated.delete(projectId)
                      return updated
                    })
                  }, 7000)
                }
              } else {
                newSet.delete(projectId)
              }
              return newSet
            })
          }
        })
      },
      {
        threshold: 0.5, // Trigger when 50% of the project is visible
        rootMargin: '-50px 0px -50px 0px' // Add some margin for better UX
      }
    )

    // Observe all project elements
    projectRefs.current.forEach((element) => {
      if (element) observer.observe(element)
    })

    return () => observer.disconnect()
  }, [filteredProjects])

  // Function to set project ref
  const setProjectRef = (projectId: string, element: HTMLDivElement | null) => {
    if (element) {
      projectRefs.current.set(projectId, element)
    } else {
      projectRefs.current.delete(projectId)
    }
  }

  return (
    <>
      <section id="projects" className="py-8 md:py-16 bg-gradient-to-br from-muted/30 to-muted/60">
        <div className="container px-4 md:px-6">
          {/* Header */}
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              Featured Projects
            </h2>
            <p className="text-muted-foreground mb-6 md:mb-8 max-w-2xl mx-auto text-base md:text-lg px-4">
              {projects.length > 0
                ? "Discover my latest work and the technologies I've been exploring. Each project tells a story of problem-solving and innovation."
                : "This section will showcase my projects and development work."}
            </p>
          </div>

          {/* Category Filter */}
          {projects.length > 0 && (
            <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-8 md:mb-12">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => handleFilterChange(category)}
                  className={`px-3 py-1.5 text-xs sm:px-4 sm:py-2 md:text-sm rounded-full font-medium transition-all duration-300 transform hover:scale-105 ${
                    activeFilter === category
                      ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                      : "bg-background text-foreground hover:bg-secondary border border-border hover:border-primary/30"
                  }`}
                >
                  {category}
                  {category !== "All" && (
                    <span className="ml-1.5 px-2 py-0.5 bg-primary/10 text-primary text-[10px] sm:text-xs rounded-full">
                      {projects.filter((p) => p.category === category).length}
                    </span>
                  )}
                </button>
              ))}
            </div>
          )}

          {/* Projects Grid */}
          {projects.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
                {filteredProjects.map((project, index) => {
                  const isVisible = showAllProjects || index < 3
                  const isHiddenProject = index >= 3
                  const shouldAnimate = isHiddenProject && isTransitioning

                  return (
                    <div
                      key={project.title}
                      ref={(el) => setProjectRef(project.id, el)}
                      data-project-id={project.id}
                      onClick={() => openProjectModal(project)}
                      className={`relative group cursor-pointer bg-background rounded-xl border border-border overflow-hidden shadow-sm hover:shadow-lg transition-all duration-500 ease-out hover:-translate-y-1 ${
                        isVisible
                          ? 'opacity-100 scale-100 translate-y-0 pointer-events-auto'
                          : 'opacity-0 scale-95 translate-y-6 pointer-events-none'
                      } ${
                        shouldAnimate && showAllProjects
                          ? 'animate-in fade-in slide-in-from-bottom-6 duration-600'
                          : ''
                      } ${
                        shouldAnimate && !showAllProjects
                          ? 'animate-out fade-out slide-out-to-bottom-6 duration-400'
                          : ''
                      }`}
                      style={{
                        animationDelay: shouldAnimate && showAllProjects ? `${(index - 3) * 120}ms` :
                                       shouldAnimate && !showAllProjects ? `${(filteredProjects.length - 1 - index) * 80}ms` :
                                       `${index * 100}ms`,
                        height: isVisible ? 'auto' : '0',
                        marginBottom: isVisible ? '' : '0',
                        overflow: isVisible ? 'visible' : 'hidden',
                        transform: isVisible ? 'none' : 'translateY(20px) scale(0.95)',
                        transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
                      }}
                    >
                  {/* Featured Badge */}
                  {project.featured && (
                    <div className={`absolute top-3 left-3 z-10 px-2 py-1 bg-primary text-primary-foreground text-xs font-medium rounded-md transition-opacity duration-300 ${
                      // Desktop: hover effect
                      'sm:opacity-0 sm:group-hover:opacity-100 ' +
                      // Mobile: show when in view, hide otherwise
                      (visibleProjects.has(project.id) ? 'opacity-100' : 'opacity-0 sm:opacity-0')
                    }`}>
                      Featured
                    </div>
                  )}

                  {/* Project Preview with Frame */}
                  <div className="relative h-80 md:h-96 overflow-hidden bg-gradient-to-br from-muted/50 to-muted p-4 md:p-6 flex items-center justify-center">
                    {isMobileApp(project.category) ? (
                      <PhoneFrame className="h-full aspect-[1/2]" isGridPreview={true}>
                        <img
                          src={project.images[0] || "/placeholder.svg"}
                          alt={project.title}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      </PhoneFrame>
                    ) : (
                      <BrowserFrame className="h-full w-full max-w-[400px]" url={project.url}>
                        <img
                          src={project.images[0] || "/placeholder.svg"}
                          alt={project.title}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 block"
                        />
                      </BrowserFrame>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>

                  {/* Content */}
                  <div className="p-4 md:p-5">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-base md:text-lg font-semibold group-hover:text-primary transition-colors line-clamp-1">
                        {project.title}
                      </h3>
                      <div className="flex items-center gap-1 px-2 py-1 bg-primary/10 text-primary text-xs font-medium rounded-md whitespace-nowrap ml-2">
                        {isMobileApp(project.category) ? <Smartphone size={12} /> : <Monitor size={12} />}
                        <span className="hidden sm:inline">{project.category}</span>
                      </div>
                    </div>

                    <p className="text-muted-foreground text-sm mb-4 line-clamp-2 leading-relaxed">
                      {project.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1 mb-4">
                      {project.tags.slice(0, 3).map((tag, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-1 bg-secondary text-secondary-foreground text-xs rounded-md font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                      {project.tags.length > 3 && (
                        <span className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-md">
                          +{project.tags.length - 3}
                        </span>
                      )}
                    </div>

                    {/* Quick Actions */}
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      {project.github && <span>• GitHub</span>}
                      {project.liveLink && <span>• Live Demo</span>}
                      <span className="ml-auto">Click to view</span>
                    </div>
                  </div>
                </div>
                  )
                })}
              </div>

              {/* See More/See Less Button */}
              {hasMoreProjects && (
                <div className="flex justify-center mt-8 md:mt-12">
                  <button
                    onClick={handleToggleProjects}
                    disabled={isTransitioning}
                    className={`group flex items-center gap-1.5 md:gap-2 px-4 py-2 md:px-6 md:py-3 bg-primary text-primary-foreground rounded-full font-medium transition-all duration-300 hover:bg-primary/90 hover:scale-105 shadow-lg hover:shadow-xl text-sm md:text-base ${
                      isTransitioning ? 'opacity-75 cursor-not-allowed' : ''
                    }`}
                  >
                    <span>
                      {showAllProjects ? "See Less" : `See More (${filteredProjects.length - 3} more)`}
                    </span>
                    {showAllProjects ? (
                      <ChevronUp size={16} className="md:w-[18px] md:h-[18px] transition-transform duration-300 group-hover:-translate-y-0.5" />
                    ) : (
                      <ChevronDown size={16} className="md:w-[18px] md:h-[18px] transition-transform duration-300 group-hover:translate-y-0.5" />
                    )}
                  </button>
                </div>
              )}
            </>
          ) : (
            /* Enhanced Empty State */
            <div className="text-center py-12 md:py-20">
              <div className="max-w-md mx-auto px-4">
                <div className="relative mb-8">
                  <div className="w-24 md:w-32 h-24 md:h-32 mx-auto bg-gradient-to-br from-primary/20 to-primary/5 rounded-full flex items-center justify-center">
                    <Github size={32} className="text-primary md:w-12 md:h-12" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-6 md:w-8 h-6 md:h-8 bg-primary/10 rounded-full animate-pulse"></div>
                  <div className="absolute -bottom-2 -left-2 w-4 md:w-6 h-4 md:h-6 bg-primary/20 rounded-full animate-pulse delay-300"></div>
                </div>
                <h3 className="text-xl md:text-2xl font-bold mb-4">No Projects Yet</h3>
                <p className="text-muted-foreground mb-6 md:mb-8 leading-relaxed">
                  Di ko pa nalalagay mga projects ko dito. Check back soon for exciting updates!
                </p>
                <div className="flex justify-center gap-4">
                  <div className="w-12 md:w-16 h-2 bg-muted rounded-full animate-pulse"></div>
                  <div className="w-8 md:w-12 h-2 bg-muted rounded-full animate-pulse delay-150"></div>
                  <div className="w-16 md:w-20 h-2 bg-muted rounded-full animate-pulse delay-300"></div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Project Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2 md:p-4 bg-black/80 backdrop-blur-sm">
          <div className="relative w-full max-w-7xl h-full max-h-[98vh] sm:max-h-[95vh] md:max-h-[90vh] bg-background rounded-lg md:rounded-2xl overflow-hidden shadow-2xl">
            {/* Close Button */}
            <button
              onClick={closeProjectModal}
              className="absolute top-2 md:top-4 right-2 md:right-4 z-10 p-2 bg-background/80 backdrop-blur-sm rounded-full hover:bg-background transition-colors"
            >
              <X size={20} />
            </button>

            <div className="flex flex-col md:flex-row h-full">
              {/* Project Preview in Modal */}
              <div className="h-[50%] md:h-auto md:flex-1 relative bg-gradient-to-br from-muted/30 to-muted/60 flex items-center justify-center p-2 sm:p-4 md:p-6 lg:p-8 overflow-hidden">
                {selectedProject.images.length > 0 && (
                  <>
                    {isMobileApp(selectedProject.category) ? (
                      <div className="w-full h-full flex items-center justify-center max-w-sm mx-auto">
                        <PhoneFrame className="w-full h-full max-h-full" isModal={true}>
                          <img
                            src={selectedProject.images[currentImageIndex] || "/placeholder.svg"}
                            alt={`${selectedProject.title} - ${currentImageIndex + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </PhoneFrame>
                      </div>
                    ) : (
                      <BrowserFrame className="max-w-full max-h-full" url={selectedProject.url}>
                        <img
                          src={selectedProject.images[currentImageIndex] || "/placeholder.svg"}
                          alt={`${selectedProject.title} - ${currentImageIndex + 1}`}
                          className="w-full h-full object-cover block"
                        />
                      </BrowserFrame>
                    )}
                    {/* Image Navigation */}
                    {selectedProject.images.length > 1 && (
                      <>
                        <button
                          onClick={prevImage}
                          className="absolute left-2 md:left-4 top-1/2 transform -translate-y-1/2 p-2 md:p-3 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors z-10"
                        >
                          <ChevronLeft size={16} className="md:w-5 md:h-5" />
                        </button>
                        <button
                          onClick={nextImage}
                          className="absolute right-2 md:right-4 top-1/2 transform -translate-y-1/2 p-2 md:p-3 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors z-10"
                        >
                          <ChevronRight size={16} className="md:w-5 md:h-5" />
                        </button>
                        {/* Image Counter */}
                        <div className="absolute bottom-2 md:bottom-4 left-1/2 transform -translate-x-1/2 px-3 py-1 bg-black/50 text-white text-sm rounded-full z-10">
                          {currentImageIndex + 1} / {selectedProject.images.length}
                        </div>
                      </>
                    )}
                  </>
                )}
              </div>

              {/* Project Details */}
              <div className="w-full h-[50%] md:h-auto md:w-80 lg:w-96 bg-background border-t md:border-t-0 md:border-l border-border p-4 md:p-6 overflow-y-auto">
                <div className="space-y-4 md:space-y-6">
                  {/* Project Title */}
                  <div>
                    <h2 className="text-xl md:text-2xl font-bold mb-2">{selectedProject.title}</h2>
                    <div className="flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full w-fit">
                      {isMobileApp(selectedProject.category) ? <Smartphone size={14} /> : <Monitor size={14} />}
                      {selectedProject.category}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3">
                    {selectedProject.github && (
                      <a
                        href={selectedProject.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors text-sm font-medium"
                      >
                        <Github size={16} />
                        GitHub
                      </a>
                    )}
                    {selectedProject.liveLink && (
                      <a
                        href={selectedProject.liveLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-sm font-medium"
                      >
                        <ExternalLink size={16} />
                        {isMobileApp(selectedProject.category)
                          ? (selectedProject.isLiveDemo ? "View Live" : "Download")
                          : "View Live"}
                      </a>
                    )}
                  </div>

                  {/* Description */}
                  <div>
                    <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
                      {selectedProject.description}
                    </p>
                  </div>

                  {/* Technologies */}
                  <div>
                    <h3 className="text-base md:text-lg font-semibold mb-3">Technologies</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-secondary text-secondary-foreground text-sm rounded-md font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Project Timeline & Status */}
                  {(selectedProject.status || selectedProject.startDate || selectedProject.endDate) && (
                    <div>
                      <h3 className="text-base md:text-lg font-semibold mb-3">Project Details</h3>
                      <div className="space-y-2">
                        {selectedProject.status && (
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-muted-foreground">Status:</span>
                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                              selectedProject.status === 'completed'
                                ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                                : selectedProject.status === 'in-progress'
                                ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400'
                                : 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400'
                            }`}>
                              {selectedProject.status.charAt(0).toUpperCase() + selectedProject.status.slice(1).replace('-', ' ')}
                            </span>
                          </div>
                        )}
                        {selectedProject.startDate && (
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-muted-foreground">Started:</span>
                            <span className="text-sm">{selectedProject.startDate}</span>
                          </div>
                        )}
                        {selectedProject.endDate && (
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-muted-foreground">Completed:</span>
                            <span className="text-sm">{selectedProject.endDate}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default ProjectsSection
