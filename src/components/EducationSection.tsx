import React from 'react';
interface EducationItem {
  degree: string;
  institution: string;
  period: string;
  description?: string;
}
const EducationSection = () => {
  const education: EducationItem[] = [{
    degree: 'Bachelor of Science in Computer Science',
    institution: 'University of Technology',
    period: '2019 - 2023',
    description: 'Focused on web development, algorithms, and database management.'
  }, {
    degree: 'Full-Stack Web Development Bootcamp',
    institution: 'Code Academy',
    period: 'Jan 2023 - Apr 2023',
    description: 'Intensive 12-week program covering modern web technologies.'
  }, {
    degree: 'UI/UX Design Certification',
    institution: 'Design Institute Online',
    period: 'May 2023 - Jun 2023'
  }];
  return <section id="education" className="py-16 bg-background">
      <div className="container px-4 md:px-6">
        <h2 className="text-3xl font-bold text-center mb-12">Education</h2>
        <div className="max-w-3xl mx-auto space-y-8">
          {education.map((edu, index) => <div key={index} className="relative pl-8 border-l-2 border-border pb-8 last:pb-0">
              <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-primary"></div>
              <div>
                <h3 className="text-xl font-bold">{edu.degree}</h3>
                <p className="text-lg text-muted-foreground">
                  {edu.institution}
                </p>
                <p className="text-sm text-muted-foreground mb-2">
                  {edu.period}
                </p>
                {edu.description && <p className="text-sm">{edu.description}</p>}
              </div>
            </div>)}
        </div>
      </div>
    </section>;
};
export default EducationSection;