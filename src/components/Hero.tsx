import React from 'react';
import { ArrowDown, Compass, Sparkles } from 'lucide-react';
import { sound } from '../utils/audio';

export const Hero: React.FC = () => {
  return (
    <section className="relative min-h-[92vh] flex items-center pt-28 pb-16 px-6 sm:px-8 max-w-7xl mx-auto overflow-hidden">
      {/* Background Architectural Grid Lines */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute top-0 bottom-0 left-[8%] w-[1px] bg-[#E3DDD4]" />
        <div className="absolute top-0 bottom-0 right-[8%] w-[1px] bg-[#E3DDD4]" />
        <div className="absolute top-[32%] left-0 right-0 h-[1px] bg-[#E3DDD4]/60" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center w-full relative z-10">
        {/* Left Column: Identity & Positioning (7 cols) */}
        <div className="lg:col-span-7 flex flex-col justify-center space-y-6">
          {/* Chapter / Status Pill */}
          <div className="flex items-center gap-3">
            <span className="text-[11px] font-mono tracking-widest text-[#A6823E] uppercase font-semibold flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059]" />
              01 / IDENTITY & POSITION
            </span>
            <span className="text-[#D4CFC5]">•</span>
            <span className="text-[11px] font-mono tracking-wider text-[#78736B] uppercase">
              Kerala, India / Dubai
            </span>
          </div>

          {/* Primary Name Typography */}
          <div className="space-y-1">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-[-0.035em] text-[#141312] leading-[1.04]">
              HATHIM
              <br />
              <span className="text-[#2B2926] font-light">MOHAMMED</span>
              <br />
              <span className="italic font-serif font-normal text-[#C5A059]">RAFEEQUE</span>
            </h1>
          </div>

          {/* Supporting Credential */}
          <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm font-mono text-[#5C5852] border-l-2 border-[#C5A059] pl-3.5 py-0.5">
            <span className="font-semibold text-[#141312]">B.Tech Computer Science</span>
            <span>•</span>
            <span>Muthoot Institute of Technology & Science</span>
            <span className="text-[#A6823E] font-medium">(2024–2028)</span>
          </div>

          {/* Concise Positioning Statement */}
          <p className="text-lg sm:text-xl text-[#3A3733] font-normal leading-relaxed max-w-xl">
            Building <span className="font-semibold text-[#141312]">intelligent systems</span>, hardware-integrated products, and digital experiences.
            <span className="block text-[#5C5852] text-base mt-2">
              Turning complex technical ideas into reliable, physical and software realities that people actually use.
            </span>
          </p>

          {/* Call to Actions & Direct Navigation */}
          <div className="flex flex-wrap items-center gap-4 pt-3">
            <a
              href="#gobu"
              onClick={() => sound.playTactileClick(0.06)}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#141312] text-white hover:bg-[#C5A059] transition-all text-xs font-mono tracking-wider uppercase shadow-md group"
            >
              <span>Inspect GO-BU 3D</span>
              <Compass className="w-3.5 h-3.5 text-[#C5A059] group-hover:text-white transition-colors" />
            </a>

            <a
              href="#projects"
              onClick={() => sound.playTactileClick(0.05)}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white border border-[#E3DDD4] hover:border-[#C5A059] text-[#141312] transition-all text-xs font-mono tracking-wider uppercase shadow-sm"
            >
              <span>Selected Work</span>
              <ArrowDown className="w-3.5 h-3.5 text-[#78736B]" />
            </a>

            <div className="flex items-center gap-2 text-xs font-mono text-[#78736B] pl-2">
              <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>CTO @ IEDC MITS</span>
            </div>
          </div>
        </div>

        {/* Right Column: Editorial Cutout Portrait (5 cols) */}
        <div className="lg:col-span-5 flex justify-center lg:justify-end relative">
          {/* Subtle warm halo backdrop */}
          <div className="absolute w-[360px] h-[360px] rounded-full bg-[#EAE5DC]/80 blur-3xl -z-10 pointer-events-none" />

          {/* Portrait Container */}
          <div className="relative w-full max-w-[390px] aspect-[3/4] flex items-end justify-center">
            {/* Architectural Frame Lines */}
            <div className="absolute -inset-3 border border-[#E3DDD4]/70 rounded-2xl pointer-events-none" />
            <div className="absolute -top-2 -right-2 w-6 h-6 border-t-2 border-r-2 border-[#C5A059]" />
            <div className="absolute -bottom-2 -left-2 w-6 h-6 border-b-2 border-l-2 border-[#C5A059]" />

            {/* Cutout Portrait (Background removed, clean transparent PNG) */}
            <img
              src="/assets/hathim_portrait.png"
              alt="Hathim Mohammed Rafeeque"
              className="w-full h-full object-contain object-bottom drop-shadow-[0_20px_40px_rgba(20,19,18,0.12)] transition-transform duration-500 hover:scale-[1.02]"
              loading="eager"
            />

            {/* Subtle Editorial Caption Badge */}
            <div className="absolute bottom-4 right-4 bg-[#FAF8F5]/90 backdrop-blur-md px-3 py-1.5 rounded-lg border border-[#E3DDD4] shadow-sm">
              <span className="text-[10px] font-mono tracking-wider uppercase text-[#141312] block font-semibold">
                HMR / Builder
              </span>
              <span className="text-[9px] font-mono text-[#78736B]">
                Student & Technologist
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Scroll Prompt */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-1.5 opacity-60 hover:opacity-100 transition-opacity">
        <span className="text-[9px] font-mono tracking-widest text-[#78736B] uppercase">Scroll to Explore</span>
        <ArrowDown className="w-3.5 h-3.5 text-[#C5A059] animate-bounce" />
      </div>
    </section>
  );
};
