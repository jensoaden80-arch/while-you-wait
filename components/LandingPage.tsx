
import React, { useEffect } from 'react';
import { ARCHETYPES } from '../constants';

interface LandingPageProps {
  onStart: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onStart }) => {
  useEffect(() => {
    // Warm the browser cache for archetype photos in the background so the
    // Results page doesn't stall later. Fired in parallel, never blocks render.
    Object.values(ARCHETYPES).forEach(a => {
      const img = new Image();
      img.src = a.imageUrl;
    });
  }, []);

  return (
    <div className="min-h-screen bg-cq-bg text-cq-cream flex flex-col items-center justify-center px-6 md:px-12 py-12 relative overflow-hidden">
      <div className="grain" />

      <div className="max-w-4xl w-full z-10 text-center">
        <div className="space-y-16 sm:space-y-20">
          <header className="flex flex-col items-center px-2">
            <img
              src="/Logo.png"
              alt="Closequarters Club"
              draggable={false}
              style={{ filter: 'brightness(0) invert(1)' }}
              className="select-none w-auto h-6 sm:h-7 opacity-80 mb-10 sm:mb-14"
            />
            <h1
              className="font-heading whitespace-nowrap leading-[1.1] mb-4 sm:mb-6"
              style={{ fontSize: 'clamp(1.75rem, 7.5vw, 4.5rem)' }}
            >
              While You Wait
            </h1>
            <p className="font-body italic text-sm sm:text-base tracking-[0.05em] text-cq-olive">
              by Closequarters Club
            </p>
          </header>

          <div className="space-y-10 flex flex-col items-center">
            <h2 className="font-heading text-4xl">Instructions</h2>
            <div className="space-y-8 max-w-xl sm:max-w-2xl md:max-w-3xl mx-auto px-2">
              <div className="h-[1px] w-12 bg-cq-olive mx-auto" />
              <div className="space-y-6 text-cq-cream/60 font-body text-base leading-relaxed text-center">
                <div className="flex flex-col gap-2 items-center">
                  <span className="text-sm font-body not-italic text-cq-olive tracking-[0.1em]">Step 01</span>
                  <p>Here, you will find the means to answer the questions that follow.</p>
                </div>
                <div className="flex flex-col gap-2 items-center">
                  <span className="text-sm font-body not-italic text-cq-olive tracking-[0.1em]">Step 02</span>
                  <p className="sm:whitespace-nowrap">Take a moment before you make your choice, but not too long. Go with your gut.</p>
                </div>
                <div className="flex flex-col gap-2 items-center">
                  <span className="text-sm font-body not-italic text-cq-olive tracking-[0.1em]">Step 03</span>
                  <p>When you’re ready, press the button below and flip to the next page.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-8 flex justify-center">
            <button
              onClick={() => onStart()}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-cq-olive/40 px-9 py-3.5 font-body text-sm tracking-wide text-cq-cream transition-colors hover:border-cq-olive hover:text-cq-olive active:scale-95"
            >
              Begin the reading
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
