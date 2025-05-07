import { useEffect, useState } from 'react';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import SkillsSection from './components/SkillsSection';
import ExperienceSection from './components/ExperienceSection';
import ProjectsSection from './components/ProjectsSection';
import EducationSection from './components/EducationSection';

import Footer from './components/Footer';
import Chatbot from './components/Chatbot';

export function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => localStorage.getItem('theme') as 'light' | 'dark' || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'));
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
    localStorage.setItem('theme', theme);
  }, [theme]);
  
  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };
  
  // Add scroll progress indicator
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const currentScroll = document.documentElement.scrollTop;
      const progress = (currentScroll / totalScroll) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Preload critical resources and handle initial loading state
  useEffect(() => {
    // Add a small delay to ensure all styles are properly loaded
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);
    
    // Preload critical images
    const profileImage = new Image();
    profileImage.src = '/images/profile/Myphoto.jpeg';
    
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-background z-50">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-foreground/80">Loading your experience...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen w-full bg-background">
      {/* Scroll Progress Bar */}
      <div
        className="fixed top-0 left-0 right-0 h-1 bg-primary z-50 transition-all duration-300 ease-out"
        style={{ width: `${scrollProgress}%` }}
      ></div>

      <Header theme={theme} toggleTheme={toggleTheme} />

      <main className="flex-1 w-full">
        <HeroSection />
        <SkillsSection />
        <ExperienceSection />
        <ProjectsSection />
        <EducationSection />
      </main>

      <Footer />
      <Chatbot />
    </div>
  );
}