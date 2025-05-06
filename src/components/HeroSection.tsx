import useTypewriter from '../hooks/useTypewriter';
import { ArrowDown, Download } from 'lucide-react';

const HeroSection = () => {
  // Multiple text options for the typewriter effect
  const phrases = [
    'An aspiring full-stack developer.',
    'Building modern web experiences.',
    'Turning ideas into reality.',
    'Passionate about clean code.'
  ];

  const { displayText } = useTypewriter({
    text: phrases, // Pass the array of phrases
    delay: 80,
    loop: true, // Enable looping through phrases
    loopDelay: 2000
  });

  return (
    <section className="w-full h-[calc(100vh-4rem)] flex items-center bg-background relative overflow-hidden">
      {/* Background pattern/grid for visual interest */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>

      <div className="container px-4 md:px-6 relative z-10 mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-10">
          <div className="flex flex-col items-center md:items-start space-y-3 text-center md:text-left md:w-3/5 animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tighter animate-slide-up" style={{ animationDelay: '100ms' }}>
              Hi, I'm Ronan Dela Cruz
            </h1>
            <div className="h-12 mb-2 animate-slide-up" style={{ animationDelay: '200ms' }}>
              <p className="text-xl md:text-3xl font-semibold bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent">
                {displayText}
                <span className="inline-block w-1 h-6 ml-1 bg-primary animate-caret-blink"></span>
              </p>
            </div>
            <p className="text-muted-foreground max-w-md text-base md:text-lg animate-slide-up" style={{ animationDelay: '300ms' }}>
              I create responsive, user-friendly web applications with modern technologies.
              Let's build something amazing together.
            </p>
            <div className="flex flex-wrap sm:flex-row gap-3 mt-4 animate-slide-up" style={{ animationDelay: '400ms' }}>
              <a
                href="#projects"
                className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-6 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 hover-lift"
              >
                View Projects
              </a>
              <a
                href="/resume.pdf"
                className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-6 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground gap-2 hover-lift"
                download
              >
                <Download size={16} />
                Resume
              </a>
              <a
                href="#contact"
                className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-6 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground hover-lift"
              >
                Contact Me
              </a>
            </div>
          </div>

          {/* Profile image or avatar */}
          <div className="relative w-48 h-48 md:w-72 md:h-72 rounded-full overflow-hidden border-4 border-primary/20 shadow-xl mt-6 md:mt-0 animate-fade-in" style={{ animationDelay: '500ms' }}>
            <img
              src="/Myphoto.jpeg"
              alt="Ronan Dela Cruz"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Scroll indicator - more subtle and elegant */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-fade-in" style={{ animationDelay: '800ms' }}>
          <p className="text-xs text-muted-foreground mb-2">Scroll to explore</p>
          <a
            href="#skills"
            className="flex items-center justify-center w-10 h-10 rounded-full bg-background/30 backdrop-blur-sm border border-primary/20 shadow-md hover:shadow-lg transition-all duration-300 hover:bg-background/50"
            aria-label="Scroll to skills section"
          >
            <ArrowDown size={16} className="text-primary" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;