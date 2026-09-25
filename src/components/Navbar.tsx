import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Menu, X, ArrowUpRight } from 'lucide-react';
import { sound } from '../utils/audio';

interface NavbarProps {
  onReplayIntro?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onReplayIntro }) => {
  const [soundActive, setSoundActive] = useState<boolean>(sound.isEnabled());
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [scrolled, setScrolled] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleSound = () => {
    const newState = sound.toggle();
    setSoundActive(newState);
  };

  const navLinks = [
    { label: 'Essence', href: '#about' },
    { label: 'GO-BU 3D', href: '#gobu' },
    { label: 'Work', href: '#projects' },
    { label: 'Journey', href: '#journey' },
    { label: 'Leadership', href: '#leadership' },
    { label: 'Proof', href: '#proof' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled
            ? 'py-3.5 bg-[#F3F1EC]/85 backdrop-blur-md border-b border-[#E3DDD4] shadow-[0_4px_20px_rgba(20,19,18,0.02)]'
            : 'py-6 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 flex items-center justify-between">
          {/* Identity Mark */}
          <a
            href="#"
            onClick={() => sound.playTactileClick(0.04)}
            className="flex items-center gap-3 group"
          >
            <div className="w-8 h-8 rounded-full border border-[#C5A059]/40 flex items-center justify-center bg-white/70 shadow-sm transition-transform group-hover:scale-105">
              <span className="font-serif font-bold text-xs tracking-tighter text-[#C5A059]">HMR</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-bold tracking-tight text-[#141312]">
                HATHIM M. RAFEEQUE
              </span>
              <span className="text-[10px] font-mono tracking-widest text-[#78736B] uppercase">
                Systems & Products
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-7">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => sound.playTactileClick(0.04)}
                className="text-xs font-mono tracking-wider uppercase text-[#78736B] hover:text-[#141312] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#C5A059] hover:after:w-full after:transition-all after:duration-250"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right Tools (Sound, Signature Replay, Contact CTA) */}
          <div className="flex items-center gap-3">
            {/* Audio Toggle */}
            <button
              onClick={toggleSound}
              className={`p-2 rounded-lg border transition-all flex items-center gap-1.5 text-xs font-mono ${
                soundActive
                  ? 'bg-white border-[#C5A059] text-[#A6823E] shadow-sm'
                  : 'bg-white/60 border-[#E3DDD4] text-[#78736B] hover:text-[#141312]'
              }`}
              title={soundActive ? 'Sound Enabled (Procedural Web Audio)' : 'Sound Muted'}
              aria-label="Toggle Sound"
            >
              {soundActive ? <Volume2 className="w-3.5 h-3.5 text-[#C5A059]" /> : <VolumeX className="w-3.5 h-3.5" />}
              <span className="hidden sm:inline text-[11px]">{soundActive ? 'Audio ON' : 'Muted'}</span>
            </button>

            {/* Signature Replay */}
            {onReplayIntro && (
              <button
                onClick={() => {
                  sound.playTactileClick(0.06);
                  onReplayIntro();
                }}
                className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#E3DDD4] bg-white/70 hover:border-[#C5A059] text-[11px] font-mono uppercase tracking-wider text-[#78736B] hover:text-[#141312] transition-all"
                title="Replay opening signature sequence"
              >
                Signature
              </button>
            )}

            {/* Direct Contact Button */}
            <a
              href="#contact"
              onClick={() => sound.playTactileClick(0.05)}
              className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#141312] text-white hover:bg-[#C5A059] text-xs font-mono tracking-wider transition-colors shadow-sm"
            >
              <span>Build</span>
              <ArrowUpRight className="w-3 h-3 text-[#C5A059] group-hover:text-white" />
            </a>

            {/* Mobile Menu Trigger */}
            <button
              onClick={() => {
                sound.playTactileClick(0.04);
                setMobileMenuOpen(!mobileMenuOpen);
              }}
              className="md:hidden p-2 rounded-lg border border-[#E3DDD4] bg-white/80 text-[#141312]"
              aria-label="Open Mobile Menu"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-30 bg-[#F3F1EC]/98 backdrop-blur-xl md:hidden pt-28 px-8 flex flex-col justify-between pb-12 animate-in fade-in duration-200">
          <div className="space-y-6">
            <div className="text-[10px] font-mono tracking-widest text-[#78736B] uppercase mb-4">
              Navigation Index
            </div>
            {navLinks.map((link, i) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => {
                  sound.playTactileClick(0.04);
                  setMobileMenuOpen(false);
                }}
                className="flex items-baseline justify-between py-2 border-b border-[#E3DDD4] text-xl font-bold tracking-tight text-[#141312] hover:text-[#C5A059] transition-colors"
              >
                <span>{link.label}</span>
                <span className="text-xs font-mono text-[#78736B]">0{i + 1}</span>
              </a>
            ))}
          </div>

          <div className="pt-6 border-t border-[#E3DDD4] flex items-center justify-between">
            <span className="text-xs font-mono text-[#78736B]">MITS • CSE 2024–28</span>
            <button
              onClick={toggleSound}
              className="flex items-center gap-2 text-xs font-mono text-[#141312]"
            >
              {soundActive ? <Volume2 className="w-4 h-4 text-[#C5A059]" /> : <VolumeX className="w-4 h-4" />}
              <span>{soundActive ? 'Sound Active' : 'Sound Muted'}</span>
            </button>
          </div>
        </div>
      )}
    </>
  );
};
