import React from 'react';
import { GraduationCap, Award } from 'lucide-react';

interface AcademicMilestone {
  period: string;
  institution: string;
  degree: string;
  metric: string;
  metricLabel: string;
  description: string;
  location: string;
  logoUrl?: string;
}

const MILESTONES: AcademicMilestone[] = [
  {
    period: '2024 — 2028',
    institution: 'Muthoot Institute of Technology & Science (MITS)',
    degree: 'B.Tech in Computer Science & Engineering',
    metric: '8.77',
    metricLabel: 'CGPA',
    description: 'Specializing in computer systems, algorithms, distributed computing, and autonomous robotics architectures. Active executive in campus engineering bodies.',
    location: 'Ernakulam, Kerala',
    logoUrl: 'https://raw.githubusercontent.com/HAT-DEVWEB/profile/main/mitslogo.jpeg',
  },
  {
    period: '2024',
    institution: 'Chavara Public School',
    degree: 'Senior Secondary (Grade 12, CBSE)',
    metric: '93%',
    metricLabel: 'CBSE Board Result',
    description: 'Focused on advanced Physics, Chemistry, and Mathematics with core emphasis on foundational analytical problem solving.',
    location: 'Pala, Kerala',
    logoUrl: 'https://raw.githubusercontent.com/HAT-DEVWEB/profile/main/chavaralogo.png',
  },
  {
    period: '2022',
    institution: 'Our Own High School',
    degree: 'Secondary Examination (Grade 10, CBSE)',
    metric: '87.2%',
    metricLabel: 'CBSE Board Result',
    description: 'Formative schooling with strong international and multicultural exposure across STEM subjects.',
    location: 'Al Warqa’a, Dubai, UAE',
    logoUrl: 'https://raw.githubusercontent.com/HAT-DEVWEB/profile/main/oowlogo.png',
  },
];

export const JourneySection: React.FC = () => {
  return (
    <section id="journey" className="py-24 px-6 sm:px-8 max-w-7xl mx-auto border-t border-[#E3DDD4]">
      {/* Chapter Header */}
      <div className="flex items-center justify-between mb-12">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059]" />
          <span className="text-[11px] font-mono tracking-widest uppercase text-[#A6823E] font-semibold">
            05 / ACADEMIC & TECHNICAL TRAJECTORY
          </span>
        </div>
        <span className="text-xs font-mono text-[#78736B]">Chronological Trajectory</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left Editorial Philosophy */}
        <div className="lg:col-span-4">
          <h2 className="text-3xl font-extrabold tracking-tight text-[#141312] leading-tight">
            Academic Foundation & Continuous Rigor
          </h2>
          <p className="mt-4 text-sm text-[#5C5852] leading-relaxed">
            A disciplined trajectory combining international schooling in Dubai with rigorous undergraduate computer science research and engineering leadership at MITS.
          </p>

          <div className="mt-8 p-5 rounded-2xl bg-[#FAF8F5] border border-[#E3DDD4] space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono text-[#A6823E] font-semibold uppercase">
              <Award className="w-4 h-4 text-[#C5A059]" />
              <span>Academic Distinction</span>
            </div>
            <p className="text-xs text-[#5C5852] leading-relaxed">
              Consistently maintaining academic excellence (8.77 CGPA) while managing active roles in startup incubation and campus technical societies.
            </p>
          </div>
        </div>

        {/* Right Editorial Timeline */}
        <div className="lg:col-span-8 space-y-6">
          {MILESTONES.map((item, idx) => (
            <div
              key={idx}
              className="p-7 sm:p-8 rounded-2xl bg-[#FAF8F5] border border-[#E3DDD4] hover:border-[#C5A059]/60 transition-all shadow-[0_4px_16px_rgba(20,19,18,0.02)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
            >
              <div className="flex items-start gap-4">
                {/* Logo or Icon */}
                <div className="w-12 h-12 rounded-xl bg-white border border-[#E3DDD4] p-1.5 flex items-center justify-center shrink-0 shadow-sm overflow-hidden">
                  {item.logoUrl ? (
                    <img
                      src={item.logoUrl}
                      alt={item.institution}
                      className="w-full h-full object-contain"
                      onError={(e) => {
                        // Fallback icon if remote fails
                        (e.target as HTMLElement).style.display = 'none';
                      }}
                    />
                  ) : (
                    <GraduationCap className="w-6 h-6 text-[#C5A059]" />
                  )}
                </div>

                {/* Details */}
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-[#A6823E] font-semibold">
                      {item.period}
                    </span>
                    <span className="text-[#D4CFC5]">•</span>
                    <span className="text-[11px] font-mono text-[#78736B]">{item.location}</span>
                  </div>
                  <h3 className="text-lg font-bold text-[#141312] tracking-tight">
                    {item.institution}
                  </h3>
                  <div className="text-xs font-medium text-[#4A4641] mt-0.5">
                    {item.degree}
                  </div>
                  <p className="text-xs text-[#78736B] mt-2 max-w-md leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>

              {/* Big Metric Badge */}
              <div className="shrink-0 text-left sm:text-right border-t sm:border-t-0 sm:border-l border-[#E3DDD4] pt-4 sm:pt-0 sm:pl-6 w-full sm:w-auto flex sm:flex-col justify-between sm:justify-center items-center sm:items-end">
                <span className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#141312]">
                  {item.metric}
                </span>
                <span className="text-[10px] font-mono text-[#A6823E] uppercase tracking-wider font-semibold">
                  {item.metricLabel}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
