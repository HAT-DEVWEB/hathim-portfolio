import React from 'react';
import { Code, Server, Cpu, Database } from 'lucide-react';

interface ProjectStory {
  id: string;
  title: string;
  tagline: string;
  category: string;
  role: string;
  tech: string[];
  problem: string;
  solution: string;
  outcome: string;
  icon: React.ReactNode;
}

const PROJECTS: ProjectStory[] = [
  {
    id: 'skillfi',
    title: 'SkillFi Learning Platform (V4)',
    tagline: 'Skill-First Career Validation Engine',
    category: 'Startup Product / Web Platform',
    role: 'Co-Founder & MD',
    tech: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Zustand'],
    problem: 'Traditional resumes rely on static bullet points and institutional pedigree rather than verified technical capability.',
    solution: 'Engineered an interactive product architecture replacing paper resumes with demonstrable skill assessments, dynamic learner portfolios, and direct competency evaluations.',
    outcome: 'Won 1st Prize & Seed Funding at Techxcel Startup and Best Startup (₹15k) at Hack-Arti-Thon 2.0.',
    icon: <Code className="w-5 h-5 text-[#C5A059]" />
  },
  {
    id: 'old-age-home',
    title: 'Old Age Home Management System',
    tagline: 'Enterprise Healthcare & Resident Lifecycle',
    category: 'Enterprise Software / Desktop',
    role: 'Lead Architect',
    tech: ['Java MVC', 'MySQL', 'Swing UI'],
    problem: 'Residential elder care facilities struggle with fragmented paper records for prescription tracking, emergency contacts, and daily care logging.',
    solution: 'Designed an enterprise Model-View-Controller architecture featuring deterministic role-based authentication, medical dosage reminders, resident lifecycle records, and relational audit logging.',
    outcome: 'Implemented full operational workflows with structured relational integrity and zero data conflict.',
    icon: <Server className="w-5 h-5 text-[#C5A059]" />
  },
  {
    id: 'iot-dustbin',
    title: 'IoT Smart Waste Management',
    tagline: 'Edge Sensing & Municipal Telemetry',
    category: 'Cyber-Physical Systems',
    role: 'Hardware & Firmware Developer',
    tech: ['ESP32', 'Arduino C++', 'Ultrasonic Edge Sensing'],
    problem: 'Fixed collection schedules cause bins to overflow while collecting underfilled units, wasting institutional resources.',
    solution: 'Engineered an IoT edge node with ultrasonic distance depth sensing, power-efficient sleep cycles, and Wi-Fi telemetry reporting realtime capacity thresholds to a monitoring dashboard.',
    outcome: 'Demonstrated hardware-software integration for real-time capacity thresholds.',
    icon: <Cpu className="w-5 h-5 text-[#C5A059]" />
  },
  {
    id: 'restaurant-pos',
    title: 'Restaurant Operations Management',
    tagline: 'POS & Transactional Inventory Database',
    category: 'Full-Stack Application',
    role: 'Software Engineer',
    tech: ['Python', 'MySQL', 'Tkinter'],
    problem: 'Small restaurant venues lack simple, offline-first inventory tracking, table turnaround times, and bill generation.',
    solution: 'Constructed an integrated transactional POS system linking front-of-house table orders directly with backend inventory deduction queries in MySQL.',
    outcome: 'Streamlined order processing and real-time stock balance updates.',
    icon: <Database className="w-5 h-5 text-[#C5A059]" />
  }
];

export const ProjectsSection: React.FC = () => {
  return (
    <section id="projects" className="py-24 px-6 sm:px-8 max-w-7xl mx-auto border-t border-[#E3DDD4]">
      {/* Chapter Tag */}
      <div className="flex items-center justify-between mb-12">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059]" />
          <span className="text-[11px] font-mono tracking-widest uppercase text-[#A6823E] font-semibold">
            04 / SELECTED WORK & CASE STUDIES
          </span>
        </div>
        <span className="text-xs font-mono text-[#78736B]">4 Documented Builds</span>
      </div>

      {/* Projects Narrative Stories */}
      <div className="space-y-12">
        {PROJECTS.map((proj, idx) => (
          <article
            key={proj.id}
            className="p-8 sm:p-10 rounded-3xl bg-[#FAF8F5] border border-[#E3DDD4] hover:border-[#C5A059]/60 transition-all duration-300 shadow-[0_6px_24px_rgba(20,19,18,0.02)]"
          >
            {/* Top Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[#E3DDD4]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white border border-[#E3DDD4] flex items-center justify-center shadow-sm">
                  {proj.icon}
                </div>
                <div>
                  <div className="text-[10px] font-mono text-[#78736B] uppercase tracking-wider">
                    {proj.category} • Case 0{idx + 1}
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-[#141312]">
                    {proj.title}
                  </h3>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-mono px-3 py-1 rounded-full bg-white border border-[#E3DDD4] text-[#A6823E] font-semibold">
                  Role: {proj.role}
                </span>
              </div>
            </div>

            {/* Narrative Story Breakdown: Problem, What I Built, Tech, Result */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pt-8">
              {/* Problem & Solution */}
              <div className="md:col-span-8 space-y-6">
                <div>
                  <h4 className="text-[11px] font-mono tracking-widest uppercase text-[#78736B] mb-2">
                    The Challenge / Problem
                  </h4>
                  <p className="text-sm text-[#4A4641] leading-relaxed">
                    {proj.problem}
                  </p>
                </div>

                <div>
                  <h4 className="text-[11px] font-mono tracking-widest uppercase text-[#A6823E] mb-2 font-semibold">
                    What I Engineered & Built
                  </h4>
                  <p className="text-sm sm:text-base text-[#141312] font-medium leading-relaxed">
                    {proj.solution}
                  </p>
                </div>

                <div>
                  <h4 className="text-[11px] font-mono tracking-widest uppercase text-[#78736B] mb-2">
                    Outcome & Validation
                  </h4>
                  <p className="text-xs sm:text-sm text-[#5C5852] leading-relaxed bg-white/70 p-3.5 rounded-xl border border-[#E3DDD4]">
                    {proj.outcome}
                  </p>
                </div>
              </div>

              {/* Tech Stack & Metadata (4 cols) */}
              <div className="md:col-span-4 flex flex-col justify-between border-t md:border-t-0 md:border-l border-[#E3DDD4] pt-6 md:pt-0 md:pl-8">
                <div>
                  <h4 className="text-[11px] font-mono tracking-widest uppercase text-[#78736B] mb-3">
                    Applied Architecture
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {proj.tech.map((t) => (
                      <span
                        key={t}
                        className="text-xs font-mono px-2.5 py-1 rounded-md bg-white border border-[#E3DDD4] text-[#141312]"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-6">
                  <div className="text-[10px] font-mono text-[#78736B] uppercase tracking-wider mb-1">
                    Design Paradigm
                  </div>
                  <span className="text-xs font-medium text-[#141312]">
                    High Cohesion, Modular Engineering
                  </span>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};
