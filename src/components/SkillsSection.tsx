import React, { useState } from 'react';

interface Skill {
  name: string;
  icon: React.ReactNode;
  category: string;
  color?: string;
}

const SkillsSection = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const skills: Skill[] = [
    // Frontend
    { name: 'React', icon: <i className="devicon-react-original colored text-3xl"></i>, category: 'Frontend', color: '#61DAFB' },
    { name: 'JavaScript', icon: <i className="devicon-javascript-plain colored text-3xl"></i>, category: 'Frontend', color: '#F7DF1E' },
    { name: 'TypeScript', icon: <i className="devicon-typescript-plain colored text-3xl"></i>, category: 'Frontend', color: '#3178C6' },
    { name: 'HTML5', icon: <i className="devicon-html5-plain colored text-3xl"></i>, category: 'Frontend', color: '#E34F26' },
    { name: 'CSS3', icon: <i className="devicon-css3-plain colored text-3xl"></i>, category: 'Frontend', color: '#1572B6' },
    { name: 'Tailwind', icon: <i className="devicon-tailwindcss-plain colored text-3xl"></i>, category: 'Frontend', color: '#06B6D4' },
    { name: 'Next.js', icon: <i className="devicon-nextjs-plain text-3xl"></i>, category: 'Frontend' },
    { name: 'Redux', icon: <i className="devicon-redux-original colored text-3xl"></i>, category: 'Frontend', color: '#764ABC' },

    // Backend
    { name: 'Node.js', icon: <i className="devicon-nodejs-plain colored text-3xl"></i>, category: 'Backend', color: '#339933' },
    { name: 'Express', icon: <i className="devicon-express-original text-3xl"></i>, category: 'Backend' },
    { name: 'MongoDB', icon: <i className="devicon-mongodb-plain colored text-3xl"></i>, category: 'Backend', color: '#47A248' },
    { name: 'MySQL', icon: <i className="devicon-mysql-plain colored text-3xl"></i>, category: 'Backend', color: '#4479A1' },
    { name: 'PostgreSQL', icon: <i className="devicon-postgresql-plain colored text-3xl"></i>, category: 'Backend', color: '#336791' },
    { name: 'GraphQL', icon: <i className="devicon-graphql-plain colored text-3xl"></i>, category: 'Backend', color: '#E10098' },

    // Tools
    { name: 'Git', icon: <i className="devicon-git-plain colored text-3xl"></i>, category: 'Tools', color: '#F05032' },
    { name: 'Docker', icon: <i className="devicon-docker-plain colored text-3xl"></i>, category: 'Tools', color: '#2496ED' },
    { name: 'Jest', icon: <i className="devicon-jest-plain colored text-3xl"></i>, category: 'Tools', color: '#C21325' },
    { name: 'Webpack', icon: <i className="devicon-webpack-plain colored text-3xl"></i>, category: 'Tools', color: '#8DD6F9' },
    { name: 'Figma', icon: <i className="devicon-figma-plain colored text-3xl"></i>, category: 'Tools', color: '#F24E1E' },
    { name: 'VS Code', icon: <i className="devicon-vscode-plain colored text-3xl"></i>, category: 'Tools', color: '#007ACC' },
    { name: 'GitHub', icon: <i className="devicon-github-original text-3xl"></i>, category: 'Tools' },
  ];

  const categories = ['All', ...Array.from(new Set(skills.map(skill => skill.category)))];

  const filteredSkills = activeCategory === 'All'
    ? skills
    : skills.filter(skill => skill.category === activeCategory);

  return (
    <section id="skills" className="py-20 bg-muted/50">
      <div className="container px-4 md:px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-6 animate-slide-up">Skills</h2>
        <p className="text-center text-muted-foreground mb-10 max-w-2xl mx-auto text-base md:text-lg animate-slide-up" style={{ animationDelay: '100ms' }}>
          I've worked with a variety of technologies across the full stack development field.
          Here are some of the tools and technologies I've used.
        </p>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12 animate-slide-up" style={{ animationDelay: '200ms' }}>
          {categories.map((category, index) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 shadow-sm ${
                activeCategory === category
                  ? 'bg-primary text-primary-foreground scale-105'
                  : 'bg-background border border-border text-foreground hover:bg-accent hover:border-primary/20'
              }`}
              style={{ animationDelay: `${300 + index * 50}ms` }}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Skills Grid with Enhanced Hover Effects */}
        <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-8 lg:grid-cols-10 gap-3 animate-slide-up" style={{ animationDelay: '300ms' }}>
          {filteredSkills.map((skill, index) => (
            <div
              key={skill.name}
              className="group relative flex items-center justify-center bg-background/80 rounded-md border border-border p-3 aspect-square shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 animate-fade-in overflow-hidden"
              style={{ animationDelay: `${400 + index * 50}ms` }}
            >
              {/* Icon */}
              <div className="text-2xl flex items-center justify-center w-full h-full transition-all duration-300 group-hover:scale-75 group-hover:opacity-10">
                {skill.icon}
              </div>

              {/* Hover Text */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-105">
                <span className="font-medium text-xs text-center px-1 py-1 bg-background/80 backdrop-blur-sm rounded-md w-full mx-2">{skill.name}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Currently Learning Section */}
        <div className="mt-16 animate-slide-up" style={{ animationDelay: '600ms' }}>
          <h3 className="text-2xl font-semibold text-center mb-6">Currently Learning</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl mx-auto">
            {[
              { name: 'AWS', icon: <i className="devicon-amazonwebservices-plain colored text-3xl"></i> },
              { name: 'React Native', icon: <i className="devicon-react-original colored text-3xl"></i> },
              { name: 'Three.js', icon: <i className="devicon-threejs-original-wordmark text-3xl">3JS</i> },
              { name: 'Python', icon: <i className="devicon-python-plain colored text-3xl"></i> }
            ].map((tech, index) => (
              <div
                key={tech.name}
                className="group relative flex flex-col items-center justify-center bg-background/80 rounded-md border border-primary/20 p-3 aspect-square shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:bg-primary/5 animate-fade-in"
                style={{ animationDelay: `${700 + index * 100}ms` }}
              >
                {tech.icon}
                <span className="font-medium text-xs mt-2">{tech.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;