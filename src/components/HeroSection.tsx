import useTypewriter from '../hooks/useTypewriter';
import { Download } from 'lucide-react';
import LazyImage from './ui/LazyImage';

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

          {/* Profile image with LazyImage component */}
          <div className="w-40 h-40 sm:w-48 sm:h-48 md:w-72 md:h-72 rounded-full overflow-hidden border-4 border-primary/20 shadow-xl mt-4 md:mt-0 animate-fade-in" style={{ animationDelay: '500ms' }}>
            <LazyImage
              src="/images/profile/Myphoto.jpeg"
              alt="Ronan Dela Cruz"
              className="w-full h-full object-cover"
              containerClassName="w-full h-full"
              placeholderClassName="rounded-full"
              preload={true}
            />
          </div>
        </div>
      </div>

      {/* Animated scroll arrow - improved positioning for mobile */}
      <div className="absolute bottom-8 sm:bottom-12 md:bottom-20 left-1/2 transform -translate-x-1/2 z-40 animate-fade-in" style={{ animationDelay: '800ms' }}>
        <a
          href="#skills"
          className="block"
          aria-label="Scroll to skills section"
        >
          <div className="w-10 h-10 sm:w-12 sm:h-12 flex flex-col items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="36"
              height="36"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-primary animate-bounce opacity-80 hover:opacity-100 transition-opacity"
            >
              <path d="M12 5v14M5 12l7 7 7-7"/>
            </svg>
          </div>
        </a>
      </div>
    </section>
  );
};

export default HeroSection;