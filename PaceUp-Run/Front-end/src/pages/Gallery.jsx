import React, { useState } from 'react';
import { X, ZoomIn } from 'lucide-react';

const imageModules = import.meta.glob('/public/gallery/*.{jpg,jpeg,png,webp}', { eager: true, query: '?url', import: 'default' });

const images = Object.entries(imageModules).map(([path, url]) => {
  const filename = path.split('/').pop().replace(/\.[^.]+$/, '');
  const label = filename.replace(/[-_]/g, ' ');
  return { url, label };
});

export default function Gallery() {
  const [selected, setSelected] = useState(null);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10 animate-fade-in">
      {/* Header */}
      <div className="text-center space-y-4">
        <span className="font-display font-bold text-xs tracking-widest text-primary-royal dark:text-accent-gold uppercase bg-slate-200 dark:bg-slate-800 px-3 py-1 rounded-full">
          Moments
        </span>
        <h1 className="font-display font-black text-3xl sm:text-5xl text-primary-navy dark:text-white">
          Gallery
        </h1>
        <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto text-base">
          Trophies, finishers, and proud moments from the PaceUp Run community.
        </p>
      </div>

      {/* Grid */}
      {images.length === 0 ? (
        <div className="text-center py-20 text-slate-400">
          <p className="text-lg">No images yet. Add photos to the <code className="bg-slate-200 dark:bg-slate-800 px-2 py-0.5 rounded text-sm">public/gallery/</code> folder.</p>
        </div>
      ) : (
        <div className="columns-2 sm:columns-3 lg:columns-4 gap-3 space-y-3">
          {images.map((img, idx) => (
            <div
              key={idx}
              className="break-inside-avoid group cursor-pointer relative overflow-hidden rounded-xl"
              onClick={() => setSelected(img)}
            >
              <img
                src={img.url}
                alt={img.label}
                loading="lazy"
                className="w-full rounded-xl transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 rounded-xl flex items-center justify-center">
                <ZoomIn className="h-8 w-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 drop-shadow-lg" />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Lightbox */}
      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm p-4"
          onClick={() => setSelected(null)}
        >
          <button
            className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors"
            onClick={() => setSelected(null)}
          >
            <X className="h-8 w-8" />
          </button>
          <img
            src={selected.url}
            alt={selected.label}
            className="max-w-full max-h-[90vh] rounded-2xl shadow-2xl"
            onClick={e => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
}
