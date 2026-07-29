
import React, { useState } from 'react';
import { QUESTIONS } from '../constants';
import { motion, AnimatePresence } from 'motion/react';

interface QuizPageProps {
  onComplete: (answers: Record<number, 'A' | 'B'>) => void;
}

const QuizPage: React.FC<QuizPageProps> = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, 'A' | 'B'>>({});
  const [direction, setDirection] = useState(0);

  const currentQuestion = QUESTIONS[currentStep];

  const handleSelect = (option: 'A' | 'B') => {
    const updatedAnswers = { ...answers, [currentQuestion.id]: option };
    setAnswers(updatedAnswers);

    if (currentStep < QUESTIONS.length - 1) {
      setDirection(1);
      setCurrentStep(prev => prev + 1);
    } else {
      onComplete(updatedAnswers);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setDirection(-1);
      setCurrentStep(prev => prev - 1);
    }
  };

  return (
    <div className="min-h-screen bg-cq-bg text-cq-cream flex flex-col relative overflow-hidden">
      <div className="grain" />

      {/* Top Navigation / Progress */}
      <nav className="p-8 flex justify-between items-center z-20">
        <div className="w-24">
          {currentStep > 0 && (
            <button
              onClick={handleBack}
              className="text-sm tracking-[0.1em] font-body text-cq-cream/40 hover:text-cq-olive transition-colors"
            >
              ← Back
            </button>
          )}
        </div>
        <div className="flex gap-2">
          {QUESTIONS.map((_, idx) => (
            <div
              key={idx}
              className={`h-1 w-8 rounded-full transition-all duration-500 ${idx <= currentStep ? 'bg-cq-olive' : 'bg-cq-cream/10'}`}
            />
          ))}
        </div>
        <div className="w-24" /> {/* Spacer for centering */}
      </nav>

      <main className="flex-1 flex flex-col items-center justify-center px-6 md:px-24 py-12 z-10">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div 
            key={currentStep}
            custom={direction}
            initial={{ opacity: 0, x: direction * 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction * -50 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-2xl space-y-12"
          >
            {/* Content Section */}
            <div className="space-y-12 w-full">
              <div className="text-center space-y-6">
                <div className="space-y-4">
                  <span className="text-sm tracking-[0.15em] font-body text-cq-olive">Question {currentStep + 1}</span>
                  <div className="h-[1px] w-12 bg-cq-olive mx-auto" />
                </div>
                <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl leading-snug text-cq-cream px-2">
                  {currentQuestion.question}
                </h2>
              </div>

              <div className="grid grid-cols-1 gap-6">
                {(['A', 'B'] as const).map((key) => (
                  <button
                    key={key}
                    onClick={() => handleSelect(key)}
                    className="group relative w-full text-left p-8 bg-cq-cream/5 border border-cq-olive/20 hover:border-cq-olive transition-colors duration-500 rounded-xl"
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <span className="text-sm font-body tracking-[0.1em] text-cq-olive/70 group-hover:text-cq-olive transition-colors">
                        Option {key}
                      </span>
                      <div className="h-[1px] flex-1 bg-cq-olive/20 group-hover:bg-cq-olive transition-colors" />
                    </div>
                    <p className="text-base font-body font-normal leading-relaxed opacity-70 group-hover:opacity-100 transition-opacity">
                      {currentQuestion.options[key].text}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Bottom Branding */}
      <footer className="p-8 flex justify-center items-end z-20">
        {/* Footer text removed as per request */}
      </footer>
    </div>
  );
};

export default QuizPage;
