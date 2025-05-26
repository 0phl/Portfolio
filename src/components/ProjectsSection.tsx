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

  // TODO: Add your real projects here
  // Example project structure:
  // {
  //   title: 'Project Name',
  //   description: 'Brief description of the project',
  //   image: '/images/projects/project-image.jpg', // Add project images to public/images/projects/
  //   tags: ['React', 'TypeScript', 'Tailwind CSS'], // Technologies used
  //   category: 'Frontend', // Frontend, Backend, Full Stack, Mobile, etc.
  //   github: 'https://github.com/yourusername/project-repo', // Optional
  //   liveLink: 'https://your-project-demo.com', // Optional
  //   featured: true, // Optional - highlights important projects
  //   details: { // Optional - for expandable project details
  //     challenge: 'What problem did this project solve?',
  //     solution: 'How did you approach solving it?',
  //     outcome: 'What was the result or impact?'
  //   }
  // }

  const projects: Project[] = [
    // Add your projects here
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
          {projects.length > 0
            ? "Here are some of my recent projects. Each one presented unique challenges and opportunities for growth."
            : "This section will showcase my projects and development work."
          }
        </p>

        {/* Category Filter - Only show if there are projects */}
        {projects.length > 0 && (
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
        )}

        {/* Projects Grid */}
        {projects.length > 0 ? (
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
        ) : (
          /* Empty State */
          <div className="text-center py-16 animate-slide-up">
            <div className="max-w-md mx-auto">
              <div className="w-24 h-24 mx-auto mb-6 bg-muted rounded-full flex items-center justify-center">
                <Github size={32} className="text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-3">No Projects Yet</h3>
              <p className="text-muted-foreground mb-6">
                Di ko pa nalalagay mga projects ko dito.
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProjectsSection;