import useTypewriter from '../hooks/useTypewriter';
import { Download } from 'lucide-react';
import LazyImage from './ui/LazyImage';

interface HeroSectionProps {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

const HeroSection = ({ theme }: HeroSectionProps) => {
  // Multiple text options for the typewriter effect
  const phrases = [
    'A full-stack developer.',
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
          {/* Text content - improved mobile layout */}
          <div className="flex flex-col items-center md:items-start space-y-3 text-center md:text-left w-full md:w-3/5 animate-fade-in">
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold tracking-tighter animate-slide-up" style={{ animationDelay: '100ms' }}>
              Hi, I'm Ronan Dela Cruz
            </h1>
            <div className="h-10 sm:h-12 mb-2 animate-slide-up" style={{ animationDelay: '200ms' }}>
              <p className="text-lg sm:text-xl md:text-3xl font-semibold bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent">
                {displayText}
                <span className="inline-block w-1 h-5 sm:h-6 ml-1 bg-primary animate-caret-blink"></span>
              </p>
            </div>
            <p className="text-muted-foreground max-w-md text-sm sm:text-base md:text-lg animate-slide-up" style={{ animationDelay: '300ms' }}>
              I create responsive, user-friendly web applications with modern technologies.
              Let's build something amazing together.
            </p>
            {/* Improved button layout for mobile */}
            <div className="flex flex-wrap justify-center md:justify-start gap-2 sm:gap-3 mt-4 animate-slide-up" style={{ animationDelay: '400ms' }}>
              <a
                href="#projects"
                className="inline-flex h-9 sm:h-10 items-center justify-center rounded-md bg-primary px-4 sm:px-6 text-xs sm:text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 hover-lift"
              >
                View Projects
              </a>
              <a
                href="/documents/Ronan_Dela_Cruz_Resume.pdf"
                className="inline-flex h-9 sm:h-10 items-center justify-center rounded-md border border-input bg-background px-4 sm:px-6 text-xs sm:text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground gap-1 sm:gap-2 hover-lift"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Download size={14} className="sm:w-4 sm:h-4" />
                Resume
              </a>
              <a
                href="#contact"
                className="inline-flex h-9 sm:h-10 items-center justify-center rounded-md border border-input bg-background px-4 sm:px-6 text-xs sm:text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground hover-lift"
              >
                Contact Me
              </a>
            </div>
          </div>

          {/* Professional profile image */}
          <div className="relative w-72 h-72 md:w-96 md:h-96 mt-4 md:mt-0">
            {/* Clean minimalist container */}
            <div className="absolute inset-0 overflow-hidden rounded-xl shadow-lg shadow-gray-200/50 dark:shadow-gray-800/20 border border-gray-100/50 dark:border-gray-700/30 bg-white dark:bg-gray-800">
              <LazyImage
                src={theme === 'light' ? "/images/profile/morning.svg" : "/images/profile/night.svg"}
                alt="Ronan Dela Cruz"
                className="w-full h-full object-cover"
                containerClassName="w-full h-full"
                preload={true}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Animated scroll arrow - aligned with photo center on mobile */}
      <div className="absolute bottom-12 sm:bottom-12 md:bottom-20 z-40 animate-fade-in
                      left-[calc(49%-1rem)] -translate-x-1/2
                      md:left-1/2 md:-translate-x-1/2"
           style={{ animationDelay: '800ms' }}>
        <a
          href="#skills"
          className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12"
          aria-label="Scroll to skills section"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6 sm:w-8 sm:h-8 text-primary animate-bounce opacity-80 hover:opacity-100 transition-opacity"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 5v14M5 12l7 7 7-7"/>
          </svg>
        </a>
      </div>
    </section>
  );
};

export default HeroSection;
