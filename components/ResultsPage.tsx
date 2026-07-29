
import React, { useState, useEffect } from 'react';
import { QuizResult } from '../types';
import { motion } from 'motion/react';
import { RefreshCw } from 'lucide-react';

interface ResultsPageProps {
  result: QuizResult;
  userData: { name: string; email: string };
  onRestart: () => void;
}

const ResultsPage: React.FC<ResultsPageProps> = ({ result, userData, onRestart }) => {
  const [minTimeElapsed, setMinTimeElapsed] = useState(false);
  const [imageReady, setImageReady] = useState(false);
  const [imageFailed, setImageFailed] = useState(false);

  // Pexels serves full-resolution originals (several MB) by default; request a
  // web-sized, compressed variant instead of downloading the raw photo.
  const optimizedImageUrl = `${result.archetype.imageUrl}?auto=compress&cs=tinysrgb&w=1600`;

  // Keep the "Developing the reading" screen up for a short minimum beat for
  // the reveal to feel intentional, but never shorter than the hero photo
  // actually needs to finish downloading — the loader only clears once both
  // are true, so the photo never pops in after the results are already shown.
  useEffect(() => {
    const timer = setTimeout(() => setMinTimeElapsed(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    let cancelled = false;
    const img = new Image();
    img.onload = () => { if (!cancelled) setImageReady(true); };
    img.onerror = () => { if (!cancelled) { setImageFailed(true); setImageReady(true); } };
    img.src = optimizedImageUrl;

    // Safety net: never block the reveal forever if the photo stalls without
    // ever firing load/error.
    const timeout = setTimeout(() => { if (!cancelled) setImageReady(true); }, 8000);

    return () => {
      cancelled = true;
      clearTimeout(timeout);
    };
  }, [optimizedImageUrl]);

  const loading = !minTimeElapsed || !imageReady;

  if (loading) {
    return (
      <div className="min-h-screen bg-cq-bg text-cq-cream flex flex-col items-center justify-center p-6 relative overflow-hidden">
        <div className="grain" />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="text-center space-y-8 z-10"
        >
          <div className="text-xs tracking-[0.3em] font-body text-cq-olive animate-pulse">
            Developing the reading
          </div>
          <div className="h-[1px] w-48 bg-cq-olive/20 mx-auto overflow-hidden">
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: '100%' }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="h-full bg-cq-olive w-full"
            />
          </div>
          <p className="font-heading-italic text-xl opacity-60">
            "The clearest images take a moment to develop."
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cq-bg text-cq-cream flex flex-col relative overflow-x-hidden">
      <div className="grain" />

      {/* Hero */}
      <section className="relative h-screen w-full overflow-hidden">
        {!imageFailed ? (
          <motion.img
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.5 }}
            src={optimizedImageUrl}
            alt={result.archetype.name}
            onError={() => setImageFailed(true)}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-cq-olive/30 via-cq-bg to-cq-bg" />
        )}
        {/* Editorial gradient scrim: legible type directly on the photo, no glass panel.
            Two stacked gradients guarantee contrast for the text block regardless
            of how bright or busy the underlying photo is. */}
        <div className="absolute inset-0 bg-gradient-to-t from-cq-bg via-cq-bg/50 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-[60%] bg-gradient-to-t from-cq-bg via-cq-bg/70 to-transparent" />
        <div className="absolute inset-0 bg-cq-bg/10" />

        <nav className="absolute top-0 left-0 right-0 p-6 sm:p-10 flex justify-between items-center z-20">
          <span className="font-body italic text-sm text-cq-cream/70">closequarters.club</span>
          <button
            onClick={onRestart}
            className="inline-flex items-center gap-2 rounded-full border border-cq-olive/40 px-5 py-2.5 font-body text-sm text-cq-cream transition-colors hover:border-cq-olive hover:text-cq-olive active:scale-95"
          >
            <RefreshCw size={13} />
            <span>Restart the reading</span>
          </button>
        </nav>

        <div className="absolute inset-x-0 bottom-0 px-6 sm:px-10 md:px-16 pb-16 sm:pb-20 md:pb-24">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="max-w-4xl"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="h-[1px] w-10 bg-cq-olive" />
              <span
                className="font-body text-base sm:text-lg tracking-[0.1em] text-cq-cream"
                style={{ textShadow: '0 2px 12px rgba(8,8,11,0.9)' }}
              >
                {userData.name ? `${userData.name}, your archetype is` : "Your archetype is"}
              </span>
            </div>
            <h1
              className="font-display leading-[1.05] text-cq-cream"
              style={{ fontSize: 'clamp(2.5rem, 8vw, 6rem)', textShadow: '0 4px 24px rgba(8,8,11,0.85)' }}
            >
              {result.archetype.name}
            </h1>
          </motion.div>
        </div>
      </section>

      <main className="flex-1 flex flex-col z-10">
        <section className="max-w-6xl mx-auto w-full py-20 sm:py-28 px-6 sm:px-10 md:px-16 grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-0">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="md:pr-16 space-y-6"
          >
            <div className="flex items-center gap-3">
              <div className="h-[1px] w-8 bg-cq-olive" />
              <span className="text-sm tracking-[0.15em] font-body text-cq-olive">The essence</span>
            </div>
            <p className="font-body font-normal not-italic text-xl md:text-2xl leading-relaxed text-cq-cream/90">
              "{result.archetype.essence}"
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="md:pl-16 md:border-l md:border-cq-olive/20 space-y-10"
          >
            <div className="space-y-2">
              <span className="text-sm tracking-[0.15em] font-body text-cq-olive">Destination</span>
              <h3 className="font-heading text-3xl md:text-4xl text-cq-cream">{result.archetype.destination}</h3>
            </div>
            <p className="text-base leading-relaxed text-cq-cream/70 border-l border-cq-olive/30 pl-6">
              {result.archetype.destinationDescription}
            </p>
            <div className="space-y-2">
              <span className="text-sm tracking-[0.15em] font-body text-cq-olive">You might bump into</span>
              <p className="font-heading text-xl text-cq-cream">{result.archetype.bumpInto}</p>
            </div>

            <div className="pt-4 flex flex-wrap gap-4">
              <a
                href="https://form.typeform.com/to/gBLlpryu?typeform-source=www.closequarters.club"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full border border-cq-olive/50 px-7 py-3.5 font-body text-sm tracking-wide text-cq-cream transition-colors hover:border-cq-olive hover:text-cq-olive active:scale-95"
              >
                Take me there
              </a>
            </div>
          </motion.div>
        </section>
      </main>

      <footer className="py-14 px-6 sm:px-10 md:px-16 bg-cq-bg text-cq-cream/60 z-20 border-t border-cq-border">
        <div className="max-w-6xl mx-auto space-y-10">
          <div className="max-w-2xl space-y-6">
            <p className="text-sm font-body leading-relaxed">
              A member-driven space for the curious and the thoughtful, Closequarters Club crafts travel that moves you — through art, culture, connection, and experiences that feel both deeply personal and entirely unexpected.
            </p>
          </div>

          <div className="flex items-center gap-6 text-sm tracking-[0.1em] font-body">
            <a href="https://www.closequarters.club/" target="_blank" rel="noopener noreferrer" className="hover:text-cq-olive transition-colors">Website</a>
            <span className="opacity-20">|</span>
            <a href="https://www.instagram.com/closequarters.club/" target="_blank" rel="noopener noreferrer" className="hover:text-cq-olive transition-colors">Instagram</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ResultsPage;
