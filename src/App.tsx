import React, { useState, useEffect } from 'react';
import { SignatureIntro } from './components/SignatureIntro';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { GoBuViewer } from './components/GoBuViewer';
import { ProjectsSection } from './components/ProjectsSection';
import { JourneySection } from './components/JourneySection';
import { LeadershipSection } from './components/LeadershipSection';
import { ProofSection } from './components/ProofSection';
import { SkillsSection } from './components/SkillsSection';
import { ContactSection } from './components/ContactSection';
import { LightboxModal } from './components/LightboxModal';
import { CustomCursor } from './components/CustomCursor';

export const App: React.FC = () => {
  const [introFinished, setIntroFinished] = useState<boolean>(false);
  const [lightboxData, setLightboxData] = useState<{ images: string[]; title?: string } | null>(null);
  const [isReducedMotion, setIsReducedMotion] = useState<boolean>(false);

  useEffect(() => {
    // Check reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setIsReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  const handleOpenLightbox = (images: string[], title?: string) => {
    setLightboxData({ images, title });
  };

  const handleCloseLightbox = () => {
    setLightboxData(null);
  };

  const handleReplayIntro = () => {
    setIntroFinished(false);
  };

  return (
    <div className="relative min-h-screen bg-[#F3F1EC] text-[#141312] selection:bg-[#C5A059]/20 selection:text-[#141312]">
      {introFinished && <CustomCursor />}

      {/* Opening Handwriting Signature Sequence */}
      {!introFinished && (
        <SignatureIntro
          onComplete={() => setIntroFinished(true)}
          isReducedMotion={isReducedMotion}
        />
      )}

      {/* Main Portfolio Surface */}
      <div
        className={`transition-opacity duration-1000 ${
          introFinished ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <Navbar onReplayIntro={handleReplayIntro} />

        <main className="space-y-4">
          <Hero />
          <AboutSection />

          {/* Dedicated 3D GO-BU Stage Section */}
          <section id="gobu" className="py-24 px-6 sm:px-8 max-w-7xl mx-auto border-t border-[#E3DDD4]">
            <div className="flex items-center gap-2 mb-10">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059]" />
              <span className="text-[11px] font-mono tracking-widest uppercase text-[#A6823E] font-semibold">
                03 / CYBER-PHYSICAL SYSTEMS & CURRENT PROTOTYPE
              </span>
            </div>
            <GoBuViewer />
          </section>

          <ProjectsSection />
          <JourneySection />
          <LeadershipSection onOpenLightbox={handleOpenLightbox} />
          <ProofSection onOpenLightbox={handleOpenLightbox} />
          <SkillsSection />
          <ContactSection />
        </main>
      </div>

      {/* Lightbox Modal for Certificates and Proof Images */}
      {lightboxData && (
        <LightboxModal
          images={lightboxData.images}
          title={lightboxData.title}
          onClose={handleCloseLightbox}
        />
      )}
    </div>
  );
};

export default App;
