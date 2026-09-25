import React from 'react';
import { Mail, Phone, ArrowUpRight } from 'lucide-react';
import { sound } from '../utils/audio';

export const ContactSection: React.FC = () => {
  return (
    <section id="contact" className="py-28 px-6 sm:px-8 max-w-7xl mx-auto border-t border-[#E3DDD4] relative">
      {/* Chapter Tag */}
      <div className="flex items-center gap-2 mb-12">
        <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059]" />
        <span className="text-[11px] font-mono tracking-widest uppercase text-[#A6823E] font-semibold">
          08 / NARRATIVE CLOSURE & DIRECT CONTACT
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        {/* Left Column: Bold Invitation */}
        <div className="lg:col-span-7 space-y-6">
          <div className="text-xs font-mono tracking-widest text-[#78736B] uppercase">
            Have something worth building?
          </div>
          <h2 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-[#141312] leading-[1.08]">
            LET’S BUILD IT
            <br />
            <span className="italic font-serif font-normal text-[#C5A059]">WITH PRECISION.</span>
          </h2>
          <p className="text-base text-[#5C5852] max-w-lg leading-relaxed">
            Open for high-impact robotics collaborations, technical leadership roles, engineering internships, and startup architecture discussions.
          </p>

          {/* Action Links */}
          <div className="flex flex-wrap items-center gap-4 pt-4">
            <a
              href="mailto:hathim2100@gmail.com"
              onClick={() => sound.playTactileClick(0.06)}
              className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-[#141312] text-white hover:bg-[#C5A059] transition-all text-xs font-mono tracking-wider uppercase shadow-md group"
            >
              <Mail className="w-4 h-4 text-[#C5A059] group-hover:text-white transition-colors" />
              <span>Initiate Transmission (Email)</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>

            <a
              href="https://linkedin.com/in/hathim-mohammed-rafeeque-aa7814327/"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => sound.playTactileClick(0.04)}
              className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-white border border-[#E3DDD4] hover:border-[#C5A059] text-[#141312] transition-all text-xs font-mono tracking-wider uppercase shadow-sm"
            >
              <svg className="w-4 h-4 text-[#C5A059] fill-current" viewBox="0 0 24 24">
                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
              </svg>
              <span>LinkedIn</span>
            </a>

            <a
              href="tel:+918330051455"
              onClick={() => sound.playTactileClick(0.04)}
              className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-white border border-[#E3DDD4] hover:border-[#C5A059] text-[#141312] transition-all text-xs font-mono tracking-wider uppercase shadow-sm"
            >
              <Phone className="w-4 h-4 text-[#C5A059]" />
              <span>+91 8330051455</span>
            </a>
          </div>
        </div>

        {/* Right Column: Return of the Authentic Gold Signature Mark */}
        <div className="lg:col-span-5 flex flex-col items-center lg:items-end justify-center">
          <div className="p-8 sm:p-10 rounded-3xl bg-[#FAF8F5] border border-[#E3DDD4] max-w-sm w-full flex flex-col items-center text-center shadow-[0_8px_30px_rgba(20,19,18,0.03)] relative overflow-hidden group">
            {/* Authentic Gold Signature Motif */}
            <div className="w-56 aspect-[1024/682] relative my-2">
              <img
                src="/assets/gold_signature.png"
                alt="Hathim Mohammed Rafeeque Signature"
                className="w-full h-full object-contain filter drop-shadow-[0_4px_12px_rgba(197,160,89,0.25)] transition-transform duration-500 group-hover:scale-105"
              />
            </div>

            <div className="mt-4 pt-4 border-t border-[#E3DDD4] w-full">
              <span className="text-xs font-bold text-[#141312] block tracking-tight">
                HATHIM MOHAMMED RAFEEQUE
              </span>
              <span className="text-[10px] font-mono text-[#78736B] uppercase tracking-wider block mt-0.5">
                Authentic Digital Signature
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Minimalist Editorial Footer */}
      <footer className="mt-24 pt-8 border-t border-[#E3DDD4] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#78736B]">
        <div>
          HATHIM MOHAMMED RAFEEQUE • © 2026
        </div>
        <div className="text-[11px] text-[#A6823E] tracking-widest uppercase">
          "Built with precision."
        </div>
        <div className="text-[11px]">
          MITS CSE • Ernakulam, Kerala
        </div>
      </footer>
    </section>
  );
};
