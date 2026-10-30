import React, { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';

export default function GalleryModal({ image, images, onClose, onNavigate }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onNavigate(1);
      if (e.key === 'ArrowLeft') onNavigate(-1);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, onNavigate]);

  if (!image) return null;

  const currentIndex = images.findIndex((img) => img.id === image.id);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={image.title}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 sm:p-6 animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="relative max-w-5xl w-full max-h-[90vh] flex flex-col items-center"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Control Bar */}
        <div className="w-full flex items-center justify-between text-white pb-3 px-2">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-vyrox-crimson">
              {image.category}
            </span>
            <h3 className="text-sm sm:text-base font-bold text-white truncate max-w-md">
              {image.title}
            </h3>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs text-gray-400 font-semibold">
              {currentIndex + 1} / {images.length}
            </span>
            <button
              onClick={onClose}
              className="p-2 rounded-lg bg-vyrox-850 hover:bg-vyrox-red text-white transition-colors focus:outline-none focus:ring-2 focus:ring-vyrox-red"
              aria-label="Close image viewer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Large Image Frame */}
        <div className="relative w-full rounded-2xl overflow-hidden border border-vyrox-800 shadow-2xl bg-black flex items-center justify-center">
          <img
            src={image.src}
            alt={image.alt}
            className="max-h-[75vh] w-auto object-contain mx-auto"
          />

          {/* Navigation Arrows */}
          <button
            onClick={() => onNavigate(-1)}
            className="absolute left-3 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/60 hover:bg-vyrox-red text-white border border-white/20 transition-all focus:outline-none focus:ring-2 focus:ring-vyrox-red"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={() => onNavigate(1)}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/60 hover:bg-vyrox-red text-white border border-white/20 transition-all focus:outline-none focus:ring-2 focus:ring-vyrox-red"
            aria-label="Next image"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* Caption */}
        <p className="text-xs text-gray-400 text-center mt-3 max-w-xl">
          {image.alt}
        </p>
      </div>
    </div>
  );
}

