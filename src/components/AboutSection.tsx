import React from 'react';
import { Cpu, Terminal, Layers, Compass } from 'lucide-react';

export const AboutSection: React.FC = () => {
  const pillars = [
    {
      icon: <Terminal className="w-5 h-5 text-[#C5A059]" />,
      title: "Full-Stack & Systems",
      detail: "Architecting modular web platforms, typed state trees, and relational data backends with Next.js, TypeScript, and Java MVC."
    },
    {
      icon: <Cpu className="w-5 h-5 text-[#C5A059]" />,
      title: "Robotics & Embedded",
      detail: "Prototyping cyber-physical machines, brushless drivetrain kinematics, microcontroller firmware, and sensor arrays."
    },
    {
      icon: <Layers className="w-5 h-5 text-[#C5A059]" />,
      title: "Product Execution",
      detail: "Co-founding SkillFi and managing technical lifecycles from whiteboards to seed-funded hackathon winners."
    },
    {
      icon: <Compass className="w-5 h-5 text-[#C5A059]" />,
      title: "Institutional Leadership",
      detail: "Serving as CTO of IEDC MITS and Club Chair of YUVA MITS, steering student engineering ecosystems."
    }
  ];

  return (
    <section id="about" className="py-24 px-6 sm:px-8 max-w-7xl mx-auto border-t border-[#E3DDD4]">
      {/* Chapter Tag */}
      <div className="flex items-center gap-2 mb-8">
        <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059]" />
        <span className="text-[11px] font-mono tracking-widest uppercase text-[#A6823E] font-semibold">
          02 / ESSENCE & PHILOSOPHY
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Headline */}
        <div className="lg:col-span-6">
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#141312] leading-[1.12]">
            "I like turning technical ideas into things people can actually use."
          </h2>
          <p className="mt-6 text-base sm:text-lg text-[#5C5852] leading-relaxed">
            I am a Computer Science undergraduate at Muthoot Institute of Technology & Science (MITS) with a strong foundation in algorithmic thinking and an obsession with physical-digital convergence.
          </p>
          <p className="mt-4 text-sm text-[#78736B] leading-relaxed">
            Whether engineering an autonomous four-wheeled prototype in the robotics lab or orchestrating skill-first hiring platforms, my objective is always precision: clean architectures, genuine mechanical elegance, and zero fluff.
          </p>
        </div>

        {/* Right 4 Architectural Pillars */}
        <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {pillars.map((p, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-[#FAF8F5] border border-[#E3DDD4] hover:border-[#C5A059]/60 transition-all hover:shadow-[0_8px_20px_rgba(20,19,18,0.03)]"
            >
              <div className="w-10 h-10 rounded-xl bg-white border border-[#E3DDD4] flex items-center justify-center mb-4 shadow-sm">
                {p.icon}
              </div>
              <h3 className="text-sm font-bold text-[#141312] tracking-tight mb-2">
                {p.title}
              </h3>
              <p className="text-xs text-[#5C5852] leading-relaxed">
                {p.detail}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
