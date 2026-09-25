import React from 'react';
import { Code, Globe, UserCheck } from 'lucide-react';

export const SkillsSection: React.FC = () => {
  const groups = [
    {
      category: 'Software & Core Programming',
      icon: <Code className="w-4 h-4 text-[#C5A059]" />,
      description: 'Languages used across embedded firmware, enterprise MVC backends, and algorithmic computing.',
      skills: ['Python', 'C++', 'Java', 'SQL']
    },
    {
      category: 'Spoken & Regional Languages',
      icon: <Globe className="w-4 h-4 text-[#C5A059]" />,
      description: 'Multicultural communication across UAE & Indian academic and professional environments.',
      skills: ['English (Upper Intermediate)', 'Hindi (Upper Intermediate)', 'Emarati Arabic (Intermediate)', 'Malayalam (Upper Intermediate)']
    },
    {
      category: 'Executive & Organization Competencies',
      icon: <UserCheck className="w-4 h-4 text-[#C5A059]" />,
      description: 'Institutional leadership demonstrated across campus clubs, finance management, and developer summits.',
      skills: [
        'Leadership',
        'Event Management',
        'Finance Management',
        'Event Planning',
        'Team Collaboration',
        'Technical Coordination',
        'Project Management',
        'Team Building'
      ]
    }
  ];

  return (
    <section id="skills" className="py-24 px-6 sm:px-8 max-w-7xl mx-auto border-t border-[#E3DDD4]">
      {/* Chapter Tag */}
      <div className="flex items-center justify-between mb-12">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059]" />
          <span className="text-[11px] font-mono tracking-widest uppercase text-[#A6823E] font-semibold">
            CAPABILITIES & DOMAINS
          </span>
        </div>
        <span className="text-xs font-mono text-[#78736B]">Grouped Disciplines</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {groups.map((group, idx) => (
          <div
            key={idx}
            className="p-8 rounded-2xl bg-[#FAF8F5] border border-[#E3DDD4] flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-2.5 mb-3">
                <div className="p-1.5 rounded-lg bg-white border border-[#E3DDD4]">
                  {group.icon}
                </div>
                <h3 className="text-sm font-bold tracking-tight text-[#141312]">
                  {group.category}
                </h3>
              </div>
              <p className="text-xs text-[#78736B] leading-relaxed mb-6">
                {group.description}
              </p>
            </div>

            <div className="flex flex-wrap gap-2 pt-4 border-t border-[#E3DDD4]">
              {group.skills.map((s) => (
                <span
                  key={s}
                  className="text-xs font-mono px-3 py-1.5 rounded-lg bg-white border border-[#E3DDD4] text-[#141312] font-medium"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
