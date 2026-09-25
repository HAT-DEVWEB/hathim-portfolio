import React from 'react';
import { Trophy, CheckCircle } from 'lucide-react';
import { sound } from '../utils/audio';

interface Achievement {
  title: string;
  subtitle: string;
  category: string;
  images: string[];
}

interface ProofProps {
  onOpenLightbox: (images: string[], title?: string) => void;
}

export const ProofSection: React.FC<ProofProps> = ({ onOpenLightbox }) => {
  const achievements: Achievement[] = [
    {
      title: 'Techxcel Startup Incubation',
      subtitle: '1st Prize & Seed Funding Recipient',
      category: 'Startup & Innovation',
      images: ['https://raw.githubusercontent.com/HAT-DEVWEB/profile/main/TECHXCEL.jpeg']
    },
    {
      title: 'Hack-Arti-Thon 2.0',
      subtitle: 'Best Startup Award • ₹15k Cash Prize',
      category: 'Hackathon Award',
      images: [
        'https://raw.githubusercontent.com/HAT-DEVWEB/profile/main/AL%20AMEEN%201st.jpeg',
        'https://raw.githubusercontent.com/HAT-DEVWEB/profile/main/AL%20AMEEN%20PIC.jpeg'
      ]
    },
    {
      title: 'IEEE Dev Summit',
      subtitle: 'Flagship Technical Coordinator',
      category: 'Leadership & Coordination',
      images: [
        'https://raw.githubusercontent.com/HAT-DEVWEB/profile/main/DEV%20SUMMIT%20ORG%20CER.jpeg',
        'https://raw.githubusercontent.com/HAT-DEVWEB/profile/main/DEV%20SUMMIT.jpeg'
      ]
    },
    {
      title: 'IEEE AI College Makeover',
      subtitle: '2nd Place Overall',
      category: 'Artificial Intelligence',
      images: ['https://raw.githubusercontent.com/HAT-DEVWEB/profile/main/IEEE%20AI%20COLLEGE%20MAKEOVER.jpeg']
    },
    {
      title: 'TEDxMITS',
      subtitle: 'Hospitality Subcom Official Delegation',
      category: 'Institutional Conference',
      images: [
        'https://raw.githubusercontent.com/HAT-DEVWEB/profile/main/TEDXMITS%20CERT.jpeg',
        'https://raw.githubusercontent.com/HAT-DEVWEB/profile/main/TEDXMITS.jpg'
      ]
    },
    {
      title: 'Art Portfolio & Visual Design',
      subtitle: 'Visual Aesthetics & Creative Direction (@haika.ae)',
      category: 'Creative Craft',
      images: [] // external link to instagram
    }
  ];

  const programs = [
    { name: 'IEEE Xtreme 24-Hour Competitive Hackathon', img: 'https://raw.githubusercontent.com/HAT-DEVWEB/profile/main/IEEE%20XTREME.png' },
    { name: 'AKRASC Conclave 3.0 Volunteer', img: 'https://raw.githubusercontent.com/HAT-DEVWEB/profile/main/AKRASC.jpg' },
    { name: 'IEEE YESSS NITC Technical Symposium', img: 'https://raw.githubusercontent.com/HAT-DEVWEB/profile/main/IEEE%20YESSS%20NITC.jpeg' },
    { name: 'UDGAM IIT Guwahati Finalist', img: 'https://raw.githubusercontent.com/HAT-DEVWEB/profile/main/IIT%20GUWAHATI.jpeg' },
    { name: 'KSUM Huddle Global Startup Conclave', img: 'https://raw.githubusercontent.com/HAT-DEVWEB/profile/main/Huddle%20global.jpg' },
    { name: 'Rajagiri OneTank Startup Pitch', img: 'https://raw.githubusercontent.com/HAT-DEVWEB/profile/main/Sharktankrajagiri.jpeg' }
  ];

  return (
    <section id="proof" className="py-24 px-6 sm:px-8 max-w-7xl mx-auto border-t border-[#E3DDD4]">
      {/* Chapter Tag */}
      <div className="flex items-center justify-between mb-12">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059]" />
          <span className="text-[11px] font-mono tracking-widest uppercase text-[#A6823E] font-semibold">
            07 / PROOF & VERIFIED COMPETENCE
          </span>
        </div>
        <span className="text-xs font-mono text-[#78736B]">Auditable Achievements</span>
      </div>

      <div className="space-y-16">
        {/* Achievements Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {achievements.map((ach, idx) => {
            const isArt = ach.images.length === 0;
            return (
              <div
                key={idx}
                onClick={() => {
                  sound.playTactileClick(0.04);
                  if (isArt) {
                    window.open('https://instagram.com/haika.ae', '_blank');
                  } else {
                    onOpenLightbox(ach.images, ach.title);
                  }
                }}
                className="group p-6 rounded-2xl bg-[#FAF8F5] border border-[#E3DDD4] hover:border-[#C5A059] transition-all cursor-pointer flex flex-col justify-between hover:shadow-[0_8px_24px_rgba(197,160,89,0.08)]"
              >
                <div>
                  <div className="flex items-center justify-between text-[10px] font-mono text-[#78736B] uppercase tracking-wider mb-2">
                    <span>{ach.category}</span>
                    <span className="text-[#C5A059] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">
                      ↗
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-[#141312] group-hover:text-[#A6823E] transition-colors mb-1">
                    {ach.title}
                  </h3>
                  <p className="text-xs text-[#5C5852] font-medium leading-relaxed">
                    {ach.subtitle}
                  </p>
                </div>

                <div className="mt-6 pt-3 border-t border-[#E3DDD4] flex items-center justify-between text-[11px] font-mono text-[#78736B]">
                  <span>{isArt ? 'Instagram Archive' : 'Tap to View Verified Certificate'}</span>
                  <Trophy className="w-3.5 h-3.5 text-[#C5A059]" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Programs & Conclaves List */}
        <div>
          <div className="text-xs font-mono tracking-widest uppercase text-[#78736B] mb-4">
            Programs, Hackathons & Conclave Participations
          </div>
          <div className="rounded-2xl border border-[#E3DDD4] bg-[#FAF8F5] divide-y divide-[#E3DDD4] overflow-hidden">
            {programs.map((prog, i) => (
              <div
                key={i}
                onClick={() => {
                  sound.playTactileClick(0.04);
                  onOpenLightbox([prog.img], prog.name);
                }}
                className="p-4 sm:p-5 flex items-center justify-between hover:bg-white transition-colors cursor-pointer group"
              >
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-4 h-4 text-[#C5A059]" />
                  <span className="text-sm font-semibold text-[#141312] group-hover:text-[#A6823E] transition-colors">
                    {prog.name}
                  </span>
                </div>
                <span className="text-xs font-mono text-[#78736B] group-hover:text-[#141312] flex items-center gap-1">
                  View Proof ↗
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
