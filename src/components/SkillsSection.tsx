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
    // Languages
    { name: 'JavaScript', icon: <i className="devicon-javascript-plain colored text-3xl"></i>, category: 'Languages', color: '#F7DF1E' },
    { name: 'TypeScript', icon: <i className="devicon-typescript-plain colored text-3xl"></i>, category: 'Languages', color: '#3178C6' },
    { name: 'PHP', icon: <i className="devicon-php-plain colored text-3xl"></i>, category: 'Languages', color: '#777BB4' },
    { name: 'Java', icon: <i className="devicon-java-plain colored text-3xl"></i>, category: 'Languages', color: '#007396' },
    { name: 'C++', icon: <i className="devicon-cplusplus-plain colored text-3xl"></i>, category: 'Languages', color: '#00599C' },
    { name: 'Dart', icon: <i className="devicon-dart-plain colored text-3xl"></i>, category: 'Languages', color: '#0175C2' },

    // Frontend
    { name: 'HTML5', icon: <i className="devicon-html5-plain colored text-3xl"></i>, category: 'Frontend', color: '#E34F26' },
    { name: 'CSS3', icon: <i className="devicon-css3-plain colored text-3xl"></i>, category: 'Frontend', color: '#1572B6' },
    { name: 'React', icon: <i className="devicon-react-original colored text-3xl"></i>, category: 'Frontend', color: '#61DAFB' },
    { name: 'Next.js', icon: <i className="devicon-nextjs-plain dark:text-white text-black text-3xl"></i>, category: 'Frontend' },
    { name: 'Tailwind', icon: <i className="devicon-tailwindcss-plain colored text-3xl"></i>, category: 'Frontend', color: '#06B6D4' },
    { name: 'Bootstrap', icon: <i className="devicon-bootstrap-plain colored text-3xl"></i>, category: 'Frontend', color: '#7952B3' },
    { name: 'Shadcn', icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-6 h-6 sm:w-7 sm:h-7">
      <path d="M6 18L14.5 4M11 20L17.5 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>, category: 'Frontend', color: '#000000' },
    { name: 'Vite', icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vitejs/vitejs-original.svg" className="w-6 h-6 sm:w-7 sm:h-7" alt="Vite" />, category: 'Frontend', color: '#646CFF' },

    // Backend
    { name: 'Node.js', icon: <i className="devicon-nodejs-plain colored text-3xl"></i>, category: 'Backend', color: '#339933' },
    { name: 'PHP', icon: <i className="devicon-php-plain colored text-3xl"></i>, category: 'Backend', color: '#777BB4' },
    { name: 'Java', icon: <i className="devicon-java-plain colored text-3xl"></i>, category: 'Backend', color: '#007396' },
    { name: 'MySQL', icon: <i className="devicon-mysql-plain colored text-3xl"></i>, category: 'Backend', color: '#4479A1' },
    { name: 'Firebase', icon: <i className="devicon-firebase-plain colored text-3xl"></i>, category: 'Backend', color: '#FFCA28' },

    // Mobile
    { name: 'Flutter', icon: <i className="devicon-flutter-plain colored text-3xl"></i>, category: 'Mobile', color: '#02569B' },

    // Tools
    { name: 'Git', icon: <i className="devicon-git-plain colored text-3xl"></i>, category: 'Tools', color: '#F05032' },
    { name: 'GitHub', icon: <i className="devicon-github-original text-3xl"></i>, category: 'Tools' },
    { name: 'VS Code', icon: <i className="devicon-vscode-plain colored text-3xl"></i>, category: 'Tools', color: '#007ACC' },
    { name: 'Figma', icon: <i className="devicon-figma-plain colored text-3xl"></i>, category: 'Tools', color: '#F24E1E' },

    // Deployment
    { name: 'Netlify', icon: <i className="devicon-netlify-plain colored text-3xl"></i>, category: 'Deployment', color: '#00C7B7' },
    { name: 'Vercel', icon: <i className="devicon-vercel-original text-3xl"></i>, category: 'Deployment' },

    // AI
    { name: 'OpenAI', icon: <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 sm:w-7 sm:h-7 fill-current">
      <path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.667zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.5093-2.6067-1.4997Z"/>
    </svg>, category: 'AI', color: '#412991' },
    { name: 'Anthropic', icon: <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 sm:w-7 sm:h-7 fill-current">
      <path d="M17.3041 3.541h-3.6718l6.696 16.918H24Zm-10.6082 0L0 20.459h3.7442l1.3693-3.5527h7.0052l1.3693 3.5528h3.7442L10.5363 3.5409Zm-.3712 10.2232 2.2914-5.9456 2.2914 5.9456Z"/>
    </svg>, category: 'AI', color: '#0000FF' },
    { name: 'Gemini', icon: <img src="/images/logo/gemini.svg" className="w-6 h-6 sm:w-7 sm:h-7" alt="Gemini" />, category: 'AI', color: '#8E75B2' },
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
        <div className="flex overflow-x-auto pb-2 md:pb-0 mb-10 md:mb-12 md:flex-wrap justify-start md:justify-center gap-2 animate-slide-up snap-x md:snap-none scrollbar-hide" style={{ animationDelay: '200ms' }}>
          <div className="flex md:flex-wrap space-x-2 md:space-x-0 md:gap-3 px-4 md:px-0 md:w-auto w-max mx-auto md:mx-0">
            {categories.map((category, index) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`whitespace-nowrap px-3 md:px-5 py-1.5 md:py-2 rounded-full text-xs md:text-sm font-medium transition-all duration-300 shadow-sm snap-center ${
                  activeCategory === category
                    ? 'bg-primary text-primary-foreground scale-105 border border-primary'
                    : 'bg-background border border-border text-foreground hover:bg-accent hover:border-primary/20'
                }`}
                style={{ animationDelay: `${300 + index * 50}ms` }}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Skills Grid with Enhanced Hover Effects */}
        <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-8 lg:grid-cols-10 gap-4 animate-slide-up" style={{ animationDelay: '300ms' }}>
          {filteredSkills.map((skill, index) => (
            <div
              key={`${skill.name}-${skill.category}`}
              className="group relative flex flex-col items-center justify-center bg-background/80 rounded-md border border-border p-3 aspect-square shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 animate-fade-in overflow-hidden"
              style={{ animationDelay: `${400 + index * 50}ms` }}
            >
              {/* Icon - Adjusted for mobile first */}
              <div className="text-2xl sm:text-3xl flex items-center justify-center transition-all duration-300 sm:group-hover:scale-75 sm:group-hover:opacity-10">
                {skill.icon}
              </div>

              {/* Name - Visible on mobile, hover on sm+ */}
              <div className="mt-1 text-center sm:absolute sm:inset-0 sm:flex sm:items-center sm:justify-center sm:opacity-0 sm:group-hover:opacity-100 sm:transition-all sm:duration-300 sm:transform sm:group-hover:scale-105">
                <span className="font-medium text-sm sm:text-xs px-1 py-0.5 sm:py-1 bg-background/80 backdrop-blur-sm rounded-md sm:w-auto sm:mx-2 w-full">
                  {skill.name}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Currently Learning Section */}
        <div className="mt-16 animate-slide-up" style={{ animationDelay: '600ms' }}>
          <h3 className="text-2xl font-semibold text-center mb-6">Currently Learning</h3>
          <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-3 gap-4 max-w-md mx-auto">
            {[
              { name: 'Python', icon: <i className="devicon-python-plain colored text-3xl"></i> },
              { name: 'Laravel', icon: <i className="devicon-laravel-plain colored text-3xl"></i> },
              { name: 'N8N', icon: <img src="/images/logo/n8n-color.svg" alt="n8n logo" className="w-8 h-8 sm:w-10 sm:h-10" />}
            ].map((tech, index) => (
              <div
                key={`${tech.name}-${index}`}
                className="group relative flex flex-col items-center justify-center bg-background/80 rounded-md border border-border p-3 aspect-square shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 animate-fade-in overflow-hidden"
                style={{ animationDelay: `${700 + index * 100}ms` }}
              >
                {/* Icon - Adjusted for mobile first */}
                <div className="text-2xl sm:text-3xl flex items-center justify-center transition-all duration-300 sm:group-hover:scale-75 sm:group-hover:opacity-10">
                  {tech.icon}
                </div>

                {/* Name - Visible on mobile, hover on sm+ */}
                <div className="mt-1 text-center sm:absolute sm:inset-0 sm:flex sm:items-center sm:justify-center sm:opacity-0 sm:group-hover:opacity-100 sm:transition-all sm:duration-300 sm:transform sm:group-hover:scale-105">
                  <span className="font-medium text-sm sm:text-xs px-1 py-0.5 sm:py-1 bg-background/80 backdrop-blur-sm rounded-md sm:w-auto sm:mx-2 w-full">
                    {tech.name}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;