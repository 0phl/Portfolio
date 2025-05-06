import React from 'react';
interface ExperienceItem {
  title: string;
  company: string;
  period: string;
  description: string[];
}
const ExperienceSection = () => {
  const experiences: ExperienceItem[] = [{
    title: 'Web Developer Intern',
    company: 'Tech Solutions Inc.',
    period: 'Jun 2023 - Present',
    description: ['Developed and maintained responsive web applications using React and TypeScript', 'Collaborated with senior developers to implement new features and fix bugs', 'Participated in code reviews and agile development processes']
  }, {
    title: 'Junior Frontend Developer',
    company: 'Digital Creations',
    period: 'Jan 2023 - May 2023',
    description: ['Built interactive UI components using modern JavaScript frameworks', 'Implemented responsive designs from Figma mockups', 'Optimized website performance and accessibility']
  }];
  return <section id="experience" className="py-16 bg-background">
      <div className="container px-4 md:px-6">
        <h2 className="text-3xl font-bold text-center mb-12">Experience</h2>
        <div className="max-w-3xl mx-auto space-y-8">
          {experiences.map((exp, index) => <div key={index} className="relative pl-8 border-l-2 border-border pb-8 last:pb-0">
              <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-primary"></div>
              <div>
                <h3 className="text-xl font-bold">{exp.title}</h3>
                <p className="text-lg text-muted-foreground">{exp.company}</p>
                <p className="text-sm text-muted-foreground mb-3">
                  {exp.period}
                </p>
                <ul className="space-y-2">
                  {exp.description.map((item, idx) => <li key={idx} className="text-sm">
                      • {item}
                    </li>)}
                </ul>
              </div>
            </div>)}
        </div>
      </div>
    </section>;
};
export default ExperienceSection;