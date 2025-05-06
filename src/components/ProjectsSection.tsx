import React, { useState } from 'react';
import { Github, ExternalLink, ArrowRight } from 'lucide-react';

interface Project {
  title: string;
  description: string;
  image: string;
  tags: string[];
  category: string;
  github?: string;
  liveLink?: string;
  featured?: boolean;
  details?: {
    challenge: string;
    solution: string;
    outcome: string;
  };
}

const ProjectsSection = () => {
  const [activeFilter, setActiveFilter] = useState<string>('All');
  const [expandedProject, setExpandedProject] = useState<string | null>(null);

  const projects: Project[] = [
    {
      title: 'Personal Portfolio',
      description: 'A responsive portfolio website built with React and Tailwind CSS to showcase my projects and skills.',
      image: 'https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cG9ydGZvbGlvfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60',
      tags: ['React', 'TypeScript', 'Tailwind CSS'],
      category: 'Frontend',
      github: 'https://github.com/username/portfolio',
      liveLink: '#',
      featured: true,
      details: {
        challenge: 'Creating a portfolio that stands out while maintaining excellent performance and accessibility.',
        solution: 'Implemented a clean, minimalist design with Tailwind CSS and React, focusing on performance optimization and responsive design.',
        outcome: 'A fast, accessible portfolio that effectively showcases my skills and projects with a 95+ Lighthouse score.'
      }
    },
    {
      title: 'E-commerce Dashboard',
      description: 'An administrative dashboard for managing products, orders, and customers for an online store.',
      image: 'https://images.unsplash.com/photo-1553729459-efe14ef6055d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGRhc2hib2FyZHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60',
      tags: ['React', 'Node.js', 'MongoDB'],
      category: 'Full Stack',
      github: 'https://github.com/username/ecommerce-dashboard',
      featured: true,
      details: {
        challenge: 'Building a comprehensive dashboard with real-time data visualization and user management.',
        solution: 'Created a full-stack application with React for the frontend and Node.js/Express for the backend, with MongoDB for data storage.',
        outcome: 'A powerful dashboard that provides store owners with insights and control over their e-commerce operations.'
      }
    },
    {
      title: 'Task Management App',
      description: 'A full-stack application for managing personal and team tasks with real-time updates.',
      image: 'https://images.unsplash.com/photo-1540350394557-8d14678e7f91?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dGFzayUyMG1hbmFnZW1lbnR8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60',
      tags: ['React', 'Express', 'Socket.io'],
      category: 'Full Stack',
      github: 'https://github.com/username/task-manager',
      liveLink: '#',
      details: {
        challenge: 'Creating a collaborative task management system with real-time updates.',
        solution: 'Implemented Socket.io for real-time communication, with React for the frontend and Express for the backend.',
        outcome: 'A responsive task management application that enables teams to collaborate effectively.'
      }
    },
    {
      title: 'Weather App',
      description: 'A weather application that provides current and forecasted weather data for any location.',
      image: 'https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8d2VhdGhlcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60',
      tags: ['JavaScript', 'API Integration', 'CSS'],
      category: 'Frontend',
      github: 'https://github.com/username/weather-app',
      liveLink: '#'
    }
  ];

  const categories = ['All', ...Array.from(new Set(projects.map(project => project.category)))];

  const filteredProjects = activeFilter === 'All'
    ? projects
    : projects.filter(project => project.category === activeFilter);

  const toggleProjectDetails = (title: string) => {
    if (expandedProject === title) {
      setExpandedProject(null);
    } else {
      setExpandedProject(title);
    }
  };

  return (
    <section id="projects" className="py-16 bg-muted/50">
      <div className="container px-4 md:px-6">
        <h2 className="text-3xl font-bold text-center mb-4">Projects</h2>
        <p className="text-center text-muted-foreground mb-8 max-w-2xl mx-auto">
          Here are some of my recent projects. Each one presented unique challenges and opportunities for growth.
        </p>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setActiveFilter(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeFilter === category
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 stagger-animation">
          {filteredProjects.map((project) => (
              <div
                key={project.title}
                className="flex flex-col h-full bg-background rounded-lg border border-border overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 animate-slide-up"
              >
                <div className="h-48 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform hover:scale-105"
                  />
                </div>
                <div className="flex-1 p-6 flex flex-col">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold">{project.title}</h3>
                    <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
                      {project.category}
                    </span>
                  </div>
                  <p className="text-muted-foreground mb-4 flex-1">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag, idx) => (
                      <span key={idx} className="px-2 py-1 bg-secondary text-secondary-foreground text-xs rounded-md">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-3 mt-auto">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-sm hover:text-primary transition-colors"
                      >
                        <Github size={16} />
                        <span>Code</span>
                      </a>
                    )}
                    {project.liveLink && (
                      <a
                        href={project.liveLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-sm hover:text-primary transition-colors"
                      >
                        <ExternalLink size={16} />
                        <span>Live Demo</span>
                      </a>
                    )}
                    {project.details && (
                      <button
                        onClick={() => toggleProjectDetails(project.title)}
                        className="flex items-center gap-1 text-sm hover:text-primary transition-colors ml-auto"
                      >
                        <span>Details</span>
                        <ArrowRight size={16} className={`transition-transform ${expandedProject === project.title ? 'rotate-90' : ''}`} />
                      </button>
                    )}
                  </div>

                  {/* Expanded Details */}
                  {expandedProject === project.title && project.details && (
                    <div className="mt-4 pt-4 border-t border-border animate-accordion-down">
                      <div className="space-y-3">
                        <div>
                          <h4 className="text-sm font-semibold">Challenge:</h4>
                          <p className="text-sm text-muted-foreground">{project.details.challenge}</p>
                        </div>
                        <div>
                          <h4 className="text-sm font-semibold">Solution:</h4>
                          <p className="text-sm text-muted-foreground">{project.details.solution}</p>
                        </div>
                        <div>
                          <h4 className="text-sm font-semibold">Outcome:</h4>
                          <p className="text-sm text-muted-foreground">{project.details.outcome}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;