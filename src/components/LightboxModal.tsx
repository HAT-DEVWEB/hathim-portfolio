import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { sound } from '../utils/audio';

interface LightboxModalProps {
  images: string[];
  title?: string;
  onClose: () => void;
}

export const LightboxModal: React.FC<LightboxModalProps> = ({ images, title, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        sound.playTactileClick(0.04);
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [onClose]);

  if (!images || images.length === 0) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 bg-[#141312]/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 animate-in fade-in duration-200"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative max-w-4xl w-full max-h-[90vh] bg-[#FAF8F5] rounded-3xl border border-[#E3DDD4] p-6 shadow-2xl flex flex-col overflow-hidden"
      >
        {/* Top Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#E3DDD4] mb-4">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#C5A059]" />
            <h3 className="text-sm font-bold tracking-tight text-[#141312] font-mono uppercase">
              {title || 'Verified Record & Certificate Artifact'}
            </h3>
          </div>
          <button
            onClick={() => {
              sound.playTactileClick(0.04);
              onClose();
            }}
            className="p-1.5 rounded-full hover:bg-[#E3DDD4]/60 text-[#78736B] hover:text-[#141312] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Image Display */}
        <div className="flex-1 overflow-auto flex flex-wrap gap-4 items-center justify-center p-2">
          {images.map((src, i) => (
            <img
              key={i}
              src={src}
              alt={`Certificate Artifact ${i + 1}`}
              className="max-h-[68vh] max-w-full object-contain rounded-xl border border-[#E3DDD4] shadow-sm"
            />
          ))}
        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-[#E3DDD4] flex items-center justify-between text-xs font-mono text-[#78736B]">
          <span>Verified Institutional Evidence</span>
          <span>Press [Esc] to Close</span>
        </div>
      </div>
    </div>
  );
};
