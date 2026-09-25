import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { sound } from '../utils/audio';

interface Role {
  organization: string;
  role: string;
  period: string;
  highlight: boolean;
  summary: string;
  certUrl?: string;
  logoUrl?: string;
}

interface LeadershipProps {
  onOpenLightbox?: (images: string[]) => void;
}

export const LeadershipSection: React.FC<LeadershipProps> = ({ onOpenLightbox }) => {
  const currentRoles: Role[] = [
    {
      organization: 'IEDC MITS',
      role: 'Chief Technology Officer (CTO)',
      period: 'Feb 2026 — Current',
      highlight: true,
      summary: 'Steering the technical incubation pipeline, overseeing startup prototyping, hardware resources, and campus hackathon architectures.',
      certUrl: 'https://raw.githubusercontent.com/HAT-DEVWEB/profile/main/IEDC.jpg',
      logoUrl: 'https://raw.githubusercontent.com/HAT-DEVWEB/profile/main/IEDC%20LOGO.jpg',
    },
    {
      organization: 'YUVA MITS',
      role: 'Club Chair',
      period: 'Feb 2026 — Current',
      highlight: true,
      summary: 'Directing overarching club initiatives, cross-disciplinary youth leadership programs, institutional outreach, and state-level conclaves.',
      certUrl: 'https://raw.githubusercontent.com/HAT-DEVWEB/profile/main/YUVA%202026.jpg',
      logoUrl: 'https://raw.githubusercontent.com/HAT-DEVWEB/profile/main/YUVA%20LOGO.jpg',
    },
    {
      organization: 'SkillFi Startup',
      role: 'Co-Founder & Managing Director',
      period: 'Active Venture',
      highlight: true,
      summary: 'Leading core product vision, hiring platform software engineering, and strategic roadmap from seed funding to deployment.',
      logoUrl: 'https://raw.githubusercontent.com/HAT-DEVWEB/profile/main/skillfi%20logonew.jpeg',
    }
  ];

  const priorRoles: Role[] = [
    {
      organization: 'IEDC MITS',
      role: 'Chief Financial Officer (CFO)',
      period: 'Feb 2025 — Feb 2026',
      highlight: false,
      summary: 'Managed capital budgeting, institutional funding grants, and project accounts for technical student startups.',
      certUrl: 'https://raw.githubusercontent.com/HAT-DEVWEB/profile/main/IEDC%202025%20cert.jpg',
    },
    {
      organization: 'YUVA MITS',
      role: 'Learning Vertical Co-Chair',
      period: 'Feb 2025 — Feb 2026',
      highlight: false,
      summary: 'Curated technical workshop series and knowledge-transfer cohorts for junior engineering members.',
      certUrl: 'https://raw.githubusercontent.com/HAT-DEVWEB/profile/main/YUVA_CERT.png',
    },
    {
      organization: 'IEEE CS SB MITS',
      role: 'Technical Coordinator',
      period: 'March 2025 — March 2026',
      highlight: false,
      summary: 'Coordinated technical tracks, developer bootcamps, and IEEE CS flagship event infrastructures.',
      certUrl: 'https://raw.githubusercontent.com/HAT-DEVWEB/profile/main/IEEE+CS.jpg',
    },
    {
      organization: 'Rotaract Club of MITS',
      role: 'Community Service Chair',
      period: 'March 2025 — March 2026',
      highlight: false,
      summary: 'Led institutional civic welfare programs, humanitarian initiatives, and district engagement projects.',
      certUrl: 'https://raw.githubusercontent.com/HAT-DEVWEB/profile/main/ROTARACT%20LETTER.jpeg',
    },
    {
      organization: 'TEDxMITS',
      role: 'Hospitality Subcom',
      period: 'Jan 2025 — Jan 2026',
      highlight: false,
      summary: 'Facilitated speaker logistics, hospitality coordination, and VIP protocol for the flagship TEDx conference.',
      certUrl: 'https://raw.githubusercontent.com/HAT-DEVWEB/profile/main/TEDXMITS_CERT.jpeg',
    },
    {
      organization: 'Media Club MITS',
      role: 'Audio-Visual (AV) Subcom',
      period: '2024 — 2025',
      highlight: false,
      summary: 'Managed sound engineering, live broadcasts, and media event staging across college symposiums.',
      certUrl: 'https://raw.githubusercontent.com/HAT-DEVWEB/profile/main/MEDIA%20AV%20SUBCOM.jpeg',
    }
  ];

  return (
    <section id="leadership" className="py-24 px-6 sm:px-8 max-w-7xl mx-auto border-t border-[#E3DDD4]">
      {/* Chapter Tag */}
      <div className="flex items-center justify-between mb-12">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059]" />
          <span className="text-[11px] font-mono tracking-widest uppercase text-[#A6823E] font-semibold">
            06 / LEADERSHIP & STEWARDSHIP
          </span>
        </div>
        <span className="text-xs font-mono text-[#78736B]">Current vs Prior Roles</span>
      </div>

      <div className="space-y-12">
        {/* Current High-Impact Executive Roles */}
        <div>
          <div className="flex items-center gap-2 mb-6">
            <span className="text-xs font-mono tracking-widest uppercase text-[#141312] font-bold">
              Current Executive Mandates
            </span>
            <span className="text-[10px] font-mono text-[#C5A059] bg-[#C5A059]/10 px-2 py-0.5 rounded-full font-semibold">
              PRIMARY FOCUS
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {currentRoles.map((role, idx) => (
              <div
                key={idx}
                className="p-8 rounded-2xl bg-[#FAF8F5] border-2 border-[#C5A059]/50 shadow-[0_6px_20px_rgba(197,160,89,0.06)] flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#A6823E] font-bold">
                      {role.period}
                    </span>
                    {role.logoUrl && (
                      <img
                        src={role.logoUrl}
                        alt={role.organization}
                        className="w-8 h-8 rounded-full object-contain bg-white p-1 border border-[#E3DDD4]"
                      />
                    )}
                  </div>
                  <h3 className="text-xl font-extrabold text-[#141312] tracking-tight mb-1">
                    {role.role}
                  </h3>
                  <div className="text-xs font-mono text-[#5C5852] font-semibold mb-3">
                    {role.organization}
                  </div>
                  <p className="text-xs text-[#5C5852] leading-relaxed">
                    {role.summary}
                  </p>
                </div>

                {role.certUrl && onOpenLightbox && (
                  <button
                    onClick={() => {
                      sound.playTactileClick(0.04);
                      onOpenLightbox([role.certUrl!]);
                    }}
                    className="mt-6 pt-4 border-t border-[#E3DDD4] flex items-center justify-between text-xs font-mono text-[#A6823E] hover:text-[#141312] transition-colors"
                  >
                    <span>View Institutional Record</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Prior Roles - Subordinated Editorial Grid */}
        <div className="pt-6 border-t border-[#E3DDD4]">
          <div className="text-xs font-mono tracking-widest uppercase text-[#78736B] mb-6">
            Prior Stewardship & Service Roles
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {priorRoles.map((role, idx) => (
              <div
                key={idx}
                className="p-5 rounded-xl bg-white/60 border border-[#E3DDD4] hover:border-[#D4CFC5] transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-[10px] font-mono text-[#78736B] mb-1">
                    <span>{role.organization}</span>
                    <span>{role.period}</span>
                  </div>
                  <h4 className="text-sm font-bold text-[#141312]">
                    {role.role}
                  </h4>
                  <p className="text-[11px] text-[#78736B] mt-1.5 leading-relaxed">
                    {role.summary}
                  </p>
                </div>

                {role.certUrl && onOpenLightbox && (
                  <button
                    onClick={() => {
                      sound.playTactileClick(0.04);
                      onOpenLightbox([role.certUrl!]);
                    }}
                    className="mt-4 pt-2.5 border-t border-[#E3DDD4]/60 text-[10px] font-mono text-[#78736B] hover:text-[#C5A059] flex items-center justify-between"
                  >
                    <span>Verification</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
