import React, { useEffect, useState, useRef } from 'react';
import { sound } from '../utils/audio';

interface SignatureIntroProps {
  onComplete: () => void;
  isReducedMotion?: boolean;
}

export const SignatureIntro: React.FC<SignatureIntroProps> = ({ onComplete, isReducedMotion = false }) => {
  const [stage, setStage] = useState<'prep' | 'writing' | 'flourish' | 'shimmer' | 'settled' | 'exit'>('prep');
  const [mainDash, setMainDash] = useState<number>(3400);
  const [flourishDash, setFlourishDash] = useState<number>(350);
  const [underline1Dash, setUnderline1Dash] = useState<number>(1000);
  const [underline2Dash, setUnderline2Dash] = useState<number>(1000);
  const [dotOpacity, setDotOpacity] = useState<number>(0);
  const [shimmerOffset, setShimmerOffset] = useState<number>(-100);

  const mainPathRef = useRef<SVGPathElement | null>(null);
  const flourishRef = useRef<SVGPathElement | null>(null);
  const underline1Ref = useRef<SVGPathElement | null>(null);
  const underline2Ref = useRef<SVGPathElement | null>(null);

  const totalLengths = useRef({
    main: 3400,
    flourish: 350,
    u1: 1000,
    u2: 1000,
  });

  // Calculate actual path lengths once mounted
  useEffect(() => {
    if (mainPathRef.current) totalLengths.current.main = mainPathRef.current.getTotalLength() || 3400;
    if (flourishRef.current) totalLengths.current.flourish = flourishRef.current.getTotalLength() || 350;
    if (underline1Ref.current) totalLengths.current.u1 = underline1Ref.current.getTotalLength() || 1000;
    if (underline2Ref.current) totalLengths.current.u2 = underline2Ref.current.getTotalLength() || 1000;

    setMainDash(totalLengths.current.main);
    setFlourishDash(totalLengths.current.flourish);
    setUnderline1Dash(totalLengths.current.u1);
    setUnderline2Dash(totalLengths.current.u2);
  }, []);

  // Keyboard shortcut: ESC to skip
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        handleSkip();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Animation Choreography
  useEffect(() => {
    if (isReducedMotion) {
      setMainDash(0);
      setFlourishDash(0);
      setUnderline1Dash(0);
      setUnderline2Dash(0);
      setDotOpacity(1);
      setStage('settled');
      const timer = setTimeout(() => {
        handleSkip();
      }, 1000);
      return () => clearTimeout(timer);
    }

    let isCancelled = false;
    const startTime = performance.now();
    let lastAudioTime = 0;

    // Timeline durations according to art director requirements:
    // Phase 1 (0–300ms): Background preparation
    // Phase 2 (300–1800ms): Main continuous signature body writes naturally (loop, stem, name)
    // Phase 3 (1800–2300ms): Final letters, flourish, dot, and sweeping underlines
    // Phase 4 (2300–2600ms): Metallic shimmer pass across finished signature
    // Phase 5 (2600–3200ms): Settle and stable pause
    // 3200ms+: Smooth exit into portfolio

    const frame = (now: number) => {
      if (isCancelled) return;
      const elapsed = now - startTime;

      // Phase 1: 0 - 300ms
      if (elapsed < 300) {
        setStage('prep');
      }
      // Phase 2: 300 - 1800ms (Main continuous body)
      else if (elapsed < 1800) {
        setStage('writing');
        const p = Math.min(1, Math.max(0, (elapsed - 300) / 1500));
        // Natural handwriting cubic bezier ease
        const ease = p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2;
        setMainDash(totalLengths.current.main * (1 - ease));

        if (now - lastAudioTime > 160) {
          sound.playPenScratch(80, 0.015);
          lastAudioTime = now;
        }
      }
      // Phase 3: 1800 - 2300ms (Flourish, dot, and underlines)
      else if (elapsed < 2300) {
        setStage('flourish');
        setMainDash(0); // Main body completed

        const pFlourish = Math.min(1, Math.max(0, (elapsed - 1800) / 320));
        setFlourishDash(totalLengths.current.flourish * (1 - pFlourish));

        const pDot = Math.min(1, Math.max(0, (elapsed - 1880) / 200));
        setDotOpacity(pDot);

        const pUnderlines = Math.min(1, Math.max(0, (elapsed - 1920) / 380));
        const easeUnderline = 1 - Math.pow(1 - pUnderlines, 3); // High-velocity flick
        setUnderline1Dash(totalLengths.current.u1 * (1 - easeUnderline));
        setUnderline2Dash(totalLengths.current.u2 * (1 - easeUnderline));

        if (now - lastAudioTime > 130) {
          sound.playPenScratch(70, 0.018);
          lastAudioTime = now;
        }
      }
      // Phase 4: 2300 - 2600ms (Subtle Metallic Shimmer Pass)
      else if (elapsed < 2600) {
        setStage('shimmer');
        setMainDash(0);
        setFlourishDash(0);
        setUnderline1Dash(0);
        setUnderline2Dash(0);
        setDotOpacity(1);

        const pShimmer = (elapsed - 2300) / 300;
        setShimmerOffset(-50 + pShimmer * 180);
      }
      // Phase 5: 2600 - 3200ms (Stable Settle)
      else if (elapsed < 3200) {
        if (stage !== 'settled') {
          setStage('settled');
          sound.playGoldSettle();
        }
        setMainDash(0);
        setFlourishDash(0);
        setUnderline1Dash(0);
        setUnderline2Dash(0);
        setDotOpacity(1);
      }
      // Finished: Transition into website
      else {
        setStage('exit');
        setTimeout(() => {
          if (!isCancelled) onComplete();
        }, 550);
        return;
      }

      requestAnimationFrame(frame);
    };

    const animId = requestAnimationFrame(frame);
    return () => {
      isCancelled = true;
      cancelAnimationFrame(animId);
    };
  }, [isReducedMotion, onComplete]);

  const handleSkip = () => {
    sound.playTactileClick(0.05);
    setMainDash(0);
    setFlourishDash(0);
    setUnderline1Dash(0);
    setUnderline2Dash(0);
    setDotOpacity(1);
    setStage('exit');
    setTimeout(() => {
      onComplete();
    }, 280);
  };

  // Continuous, unified vector path coordinates derived from authentic signature
  // Main body: One continuous pen gesture (loop -> stem -> descender -> cross -> "Hathim" cursive)
  const mainBodyPath = `
    M 70 560
    C 90 520, 135 445, 190 355
    C 235 285, 272 205, 282 168
    C 288 145, 298 152, 298 178
    C 298 235, 280 345, 270 435
    C 260 515, 248 585, 254 632
    C 258 646, 274 644, 280 616
    C 290 556, 284 490, 276 470
    C 240 472, 205 476, 198 485
    C 192 495, 198 514, 206 508
    C 220 498, 260 475, 286 462
    C 298 435, 308 375, 320 335
    C 324 365, 334 445, 344 458
    C 352 410, 368 355, 384 338
    C 392 375, 402 425, 414 432
    C 424 390, 438 340, 454 320
    C 462 350, 472 385, 486 375
    C 496 340, 510 340, 522 358
    C 532 365, 548 320, 562 308
    C 572 320, 580 335, 590 332
  `;

  // Upper cursive flourish
  const flourishPath = `
    M 566 218
    C 580 195, 594 190, 608 215
    C 618 200, 630 185, 642 188
    C 655 192, 668 208, 680 198
  `;

  // Defining long diagonal sweeping underlines (upper & lower parallel)
  const underline1Path = `
    M 405 422
    C 430 415, 500 380, 620 320
    C 740 260, 850 180, 962 85
  `;

  const underline2Path = `
    M 425 436
    C 445 442, 480 430, 550 395
    C 680 325, 820 240, 982 112
  `;

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#F5F2EB] select-none transition-all duration-700 ease-out overflow-hidden ${
        stage === 'exit' ? 'opacity-0 scale-[0.985] pointer-events-none' : 'opacity-100 scale-100'
      }`}
    >
      {/* Subtle 1px Architectural Guideline (12% opacity warm grey) */}
      <div className="absolute inset-x-0 top-[52%] h-[1px] bg-[#D6CFC4]/30 pointer-events-none" />

      {/* TOP LEFT: Refined Identity Metadata */}
      <div className="absolute top-8 sm:top-10 left-8 sm:left-10 flex items-center gap-2.5 z-20">
        <span className="w-1.5 h-1.5 rounded-full bg-[#B88922] animate-pulse" />
        <span className="text-[11px] font-mono tracking-widest text-[#6E6A63] uppercase font-medium">
          IDENTITY &nbsp;/&nbsp; HATHIM MOHAMMED RAFEEQUE
        </span>
      </div>

      {/* TOP RIGHT: Redesigned Minimal Outlined Capsule Skip Control */}
      {stage !== 'exit' && (
        <button
          onClick={handleSkip}
          className="absolute top-8 sm:top-10 right-8 sm:right-10 z-20 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#DCD5C9] hover:border-[#B88922] bg-[#FAF8F5]/80 hover:bg-white text-[11px] font-mono tracking-wider text-[#6E6A63] hover:text-[#141312] transition-all shadow-sm active:scale-95"
          aria-label="Skip introductory sequence"
        >
          <span>SKIP INTRO</span>
          <span className="text-[9px] font-mono bg-[#EFECE5] px-1.5 py-0.5 rounded text-[#78736B]">
            ESC
          </span>
        </button>
      )}

      {/* CENTER: The Signature — True Visual Center */}
      <div className="relative flex flex-col items-center justify-center w-full px-6">
        <div className="relative w-[86vw] sm:w-[76vw] md:w-[62vw] max-w-[880px] aspect-[960/595] flex items-center justify-center">
          <svg
            viewBox="40 65 960 595"
            className="w-full h-full overflow-visible"
            style={{
              filter: 'drop-shadow(0 14px 30px rgba(184, 137, 34, 0.16)) drop-shadow(0 4px 10px rgba(20, 19, 18, 0.05))',
            }}
          >
            <defs>
              {/* Premium Warm Champagne Gold Gradient (Base #B88922, Highlights #F2D27A) */}
              <linearGradient id="champagne-gold" x1="0%" y1="20%" x2="100%" y2="80%">
                <stop offset="0%" stopColor="#9E721D" />
                <stop offset="22%" stopColor="#B88922" />
                <stop offset="48%" stopColor="#DFC07A" />
                <stop offset="72%" stopColor="#F2D27A" />
                <stop offset="88%" stopColor="#D4AF37" />
                <stop offset="100%" stopColor="#B88922" />
              </linearGradient>

              {/* Phase 4 Specular Metallic Shimmer Pass */}
              <linearGradient id="shimmer-pass" x1={`${shimmerOffset}%`} y1="0%" x2={`${shimmerOffset + 40}%`} y2="50%">
                <stop offset="0%" stopColor="#B88922" />
                <stop offset="40%" stopColor="#DFC07A" />
                <stop offset="50%" stopColor="#FFF7E0" />
                <stop offset="60%" stopColor="#DFC07A" />
                <stop offset="100%" stopColor="#B88922" />
              </linearGradient>
            </defs>

            {/* 1. Main Continuous Signature Body (Loop -> Stem -> Cursive Name) */}
            <path
              ref={mainPathRef}
              d={mainBodyPath}
              fill="none"
              stroke={stage === 'shimmer' ? 'url(#shimmer-pass)' : 'url(#champagne-gold)'}
              strokeWidth="14"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray={totalLengths.current.main}
              strokeDashoffset={mainDash}
              style={{
                transition: stage === 'settled' || stage === 'exit' ? 'none' : undefined,
              }}
            />

            {/* 2. Upper Cursive Flourish */}
            <path
              ref={flourishRef}
              d={flourishPath}
              fill="none"
              stroke={stage === 'shimmer' ? 'url(#shimmer-pass)' : 'url(#champagne-gold)'}
              strokeWidth="13"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray={totalLengths.current.flourish}
              strokeDashoffset={flourishDash}
            />

            {/* 3. Floating Droplet Dot over 'i' */}
            <ellipse
              cx="646"
              cy="108"
              rx="10"
              ry="12"
              fill="url(#champagne-gold)"
              style={{
                opacity: dotOpacity,
                transform: `scale(${dotOpacity})`,
                transformOrigin: '646px 108px',
                transition: 'opacity 0.25s ease-out, transform 0.25s ease-out',
              }}
            />

            {/* 4. The Defining Long Diagonal Sweeping Underlines */}
            <path
              ref={underline1Ref}
              d={underline1Path}
              fill="none"
              stroke={stage === 'shimmer' ? 'url(#shimmer-pass)' : 'url(#champagne-gold)'}
              strokeWidth="13.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray={totalLengths.current.u1}
              strokeDashoffset={underline1Dash}
            />
            <path
              ref={underline2Ref}
              d={underline2Path}
              fill="none"
              stroke={stage === 'shimmer' ? 'url(#shimmer-pass)' : 'url(#champagne-gold)'}
              strokeWidth="13.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray={totalLengths.current.u2}
              strokeDashoffset={underline2Dash}
            />
          </svg>
        </div>

        {/* BELOW CENTER: Bottom Status Typography */}
        <div className="h-8 mt-6 flex items-center justify-center">
          <p
            className={`text-[11px] font-mono tracking-widest text-[#78736B] uppercase transition-all duration-500 ease-out transform ${
              stage === 'shimmer' || stage === 'settled' || stage === 'exit'
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-2'
            }`}
          >
            IDENTITY ESTABLISHED &nbsp;/&nbsp; ENTERING EXPERIENCE
          </p>
        </div>
      </div>
    </div>
  );
};
