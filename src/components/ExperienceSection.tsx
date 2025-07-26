import React, { useState, useRef, useEffect } from 'react';

interface ExperienceItem {
  title: string;
  company: string;
  period: string;
  description: string[];
}

const ExperienceSection = () => {
  const [expandedItems, setExpandedItems] = useState<number[]>([]);
  const contentRefs = useRef<Array<HTMLDivElement | null>>([]);
  const ITEMS_TO_SHOW = 2; // Number of description items to show initially
  
  const toggleExpand = (index: number) => {
    setExpandedItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index) 
        : [...prev, index]
    );
  };
  
  const experiences: ExperienceItem[] = [
    {
      title: 'Student Developer – Capstone Project',
      company: 'St. Dominic College of Asia',
      period: 'Oct 2024 – Present',
      description: [
        'Co-developed PULSE — a barangay-level mobile application built with Flutter and Firebase, featuring a Material Design UI with custom animations. The app enables public updates, access to local services, and community engagement through features like community posting, a local marketplace, volunteer registration, and barangay report submission.',
        'Built the SuperAdmin web dashboard using Flutter Web with responsive layouts and data visualization tools to manage admin registrations, verify community credentials, and monitor real-time platform analytics',
        'Integrated Firebase Authentication, Firestore, and Realtime Database with custom Node.js notification server for secure login, real-time updates, and optimized data flow',
        'Implemented email notifications with PIN verification, custom push notification channels, and role-based access control for scalable, secure platform management across multiple community levels',
        'Collaborated in an Agile development environment, including sprint planning, feature testing with automated UI validation, and stakeholder presentation of interactive prototypes'
      ]
    },
    {
      title: 'Full-Stack Developer (Personal Projects)',
      company: 'Self-Initiated | Freelance-style builds',
      period: '2024 – Present',
      description: [
        'IskedyulKo — Appointment Booking System (React, Node.js, MySQL): Designed a shareable, no-login booking flow with business dashboards, JWT auth, and a responsive UI for small Filipino businesses.',
        'S&Z Hot Pot Haven — E-commerce platform (PHP, MySQL, Bootstrap): Built a product catalog, shopping cart, and admin dashboard with real-time order tracking and PDF invoicing.',
        'AroundU — Neighborhood & Local Business Guide (React, Firebase, Leaflet.js): Developed interactive map listings, business profiles, distance calculation, and real-time offers for local engagement.',
        'Car Rental System — Full-stack management system (PHP, MySQL): Created a booking system with no-registration booking, reference tracking, admin management, and PDF reports.',
        'Leveraged a modern tech stack including React, Node.js, TypeScript, PHP, and Mysql to build scalable and feature-rich applications.'
      ]
    }
  ];

  return (
    <section id="experience" className="py-20 bg-background">
      <div className="container px-4 md:px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-6 animate-slide-up">Experience</h2>
        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto text-base md:text-lg animate-slide-up" style={{ animationDelay: '100ms' }}>
          My development journey and project highlights
        </p>
        
        <div className="max-w-3xl mx-auto space-y-10">
          {experiences.map((exp, index) => {
            const isExpanded = expandedItems.includes(index);
            const showReadMore = exp.description.length > ITEMS_TO_SHOW;
            
            return (
              <div 
                key={index} 
                className="relative pl-8 md:pl-10 border-l-2 border-primary/30 pb-8 last:pb-0 animate-fade-in"
                style={{ animationDelay: `${200 + index * 150}ms` }}
              >
                <div className="absolute left-[-8px] top-0 w-4 h-4 rounded-full bg-primary shadow-glow"></div>
                <div className="bg-gradient-to-br from-background/90 to-background/70 backdrop-blur-sm rounded-lg p-5 border border-border border-l-[3px] border-l-primary/70 shadow-md sm:hover:shadow-xl transition-all duration-300 sm:hover:-translate-y-1 sm:hover:rotate-[0.5deg] relative before:absolute before:inset-0 before:bg-primary/5 before:opacity-0 sm:hover:before:opacity-100 before:transition-opacity before:rounded-lg before:z-[-1]">
                  <h3 className="text-xl md:text-2xl font-bold">{exp.title}</h3>
                  <p className="text-base md:text-lg text-primary/80 font-medium">{exp.company}</p>
                  <p className="text-sm text-muted-foreground mb-4">
                    {exp.period}
                  </p>
                  
                  {/* Visible items (always shown) */}
                  <ul className="space-y-3">
                    {exp.description.slice(0, ITEMS_TO_SHOW).map((item, idx) => (
                      <li key={idx} className="text-sm md:text-base flex">
                        <span className="text-primary mr-2">•</span>
                        <span className="flex-1">{item}</span>
                      </li>
                    ))}
                  </ul>
                  
                  {/* Hidden items (shown when expanded) */}
                  {showReadMore && (
                    <div 
                      className="overflow-hidden transition-all duration-500 ease-in-out" 
                      style={{ 
                        maxHeight: isExpanded ? '500px' : '0',
                        opacity: isExpanded ? 1 : 0,
                        marginTop: isExpanded ? '0.75rem' : '0'
                      }}
                    >
                      <ul className="space-y-3">
                        {exp.description.slice(ITEMS_TO_SHOW).map((item, idx) => (
                          <li key={idx + ITEMS_TO_SHOW} className="text-sm md:text-base flex">
                            <span className="text-primary mr-2">•</span>
                            <span className="flex-1">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {/* Read More/Less Button */}
                  {showReadMore && (
                    <>
                      <div className="w-full h-px bg-border/50 my-4"></div>
                      <div className="flex justify-start">
                        <button
                          onClick={() => toggleExpand(index)}
                          className="px-5 py-2 text-sm font-medium bg-primary/10 hover:bg-primary/20 text-primary rounded-full flex items-center justify-center group transition-all duration-300 border border-primary/20 shadow-sm hover:shadow-md hover:-translate-y-0.5"
                          aria-expanded={isExpanded}
                        >
                          <span className="font-semibold">{isExpanded ? "See Less" : "See More"}</span>
                          <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            width="16" 
                            height="16" 
                            viewBox="0 0 24 24" 
                            fill="none" 
                            stroke="currentColor" 
                            strokeWidth="2" 
                            strokeLinecap="round" 
                            strokeLinejoin="round"
                            className={`ml-2 transition-transform duration-300 group-hover:${isExpanded ? '-translate-y-0.5' : 'translate-y-0.5'} ${isExpanded ? 'rotate-180' : ''}`}
                          >
                            <path d="m6 9 6 6 6-6" />
                          </svg>
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;