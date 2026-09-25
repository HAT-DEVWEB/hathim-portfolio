import React, { useEffect, useState } from 'react';

export const CustomCursor: React.FC = () => {
  const [pos, setPos] = useState<{ x: number; y: number }>({ x: -100, y: -100 });
  const [isPointer, setIsPointer] = useState<boolean>(false);
  const [visible, setVisible] = useState<boolean>(false);
  const [isTouchDevice, setIsTouchDevice] = useState<boolean>(false);

  useEffect(() => {
    // Detect touch device
    if (window.matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window) {
      setIsTouchDevice(true);
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      if (!visible) setVisible(true);

      // Check if hovering interactive target
      const target = e.target as HTMLElement | null;
      if (target) {
        const isClickable = target.closest('a, button, input, [role="button"], canvas, .cursor-pointer');
        setIsPointer(!!isClickable);
      }
    };

    const handleMouseLeave = () => {
      setVisible(false);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [visible]);

  if (isTouchDevice || !visible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden">
      {/* Outer subtle ring */}
      <div
        className={`fixed top-0 left-0 rounded-full border border-[#C5A059]/60 transition-transform duration-150 ease-out -translate-x-1/2 -translate-y-1/2 ${
          isPointer ? 'w-9 h-9 bg-[#C5A059]/10 border-[#C5A059]' : 'w-6 h-6'
        }`}
        style={{
          transform: `translate3d(${pos.x}px, ${pos.y}px, 0) translate(-50%, -50%)`,
        }}
      />
      {/* Center sharp dot */}
      <div
        className="fixed top-0 left-0 w-1.5 h-1.5 rounded-full bg-[#141312] -translate-x-1/2 -translate-y-1/2"
        style={{
          transform: `translate3d(${pos.x}px, ${pos.y}px, 0) translate(-50%, -50%)`,
        }}
      />
    </div>
  );
};
