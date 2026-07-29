
import React, { useState, useCallback } from 'react';
import LandingPage from './components/LandingPage';
import QuizPage from './components/QuizPage';
import ResultsPage from './components/ResultsPage';
import { UserData, QuizResult } from './types';
import { QUESTIONS, ARCHETYPES } from './constants';
import { saveResultToNotion } from './services/notionService';

type AppState = 'landing' | 'quiz' | 'collect-info' | 'results';

const App: React.FC = () => {
  const [state, setState] = useState<AppState>('landing');
  const [userData, setUserData] = useState<UserData>({ name: '', email: '' });
  const [quizResult, setQuizResult] = useState<QuizResult | null>(null);
  const [tempAnswers, setTempAnswers] = useState<Record<number, 'A' | 'B'> | null>(null);

  const handleStart = () => {
    setState('quiz');
  };

  const handleQuizComplete = useCallback((answers: Record<number, 'A' | 'B'>) => {
    setTempAnswers(answers);
    setState('collect-info');
  }, []);

  const handleInfoSubmit = async (data: UserData) => {
    setUserData(data);
    
    if (!tempAnswers) return;

    // Generate 4-letter code
    const code = QUESTIONS.map(q => {
      const choice = tempAnswers[q.id];
      return q.options[choice].code;
    }).join('');

    const archetype = ARCHETYPES[code];
    const result: QuizResult = {
      answers: tempAnswers,
      code,
      archetype
    };

    setQuizResult(result);
    setState('results');

    // Integration: Log to Notion. Every completion is logged — name and
    // email are sent as-is (blank if the user skipped them), the rest of
    // the row is always populated.
    await saveResultToNotion({
      name: data.name,
      email: data.email,
      q1: QUESTIONS[0].options[tempAnswers[1]].text,
      q2: QUESTIONS[1].options[tempAnswers[2]].text,
      q3: QUESTIONS[2].options[tempAnswers[3]].text,
      q4: QUESTIONS[3].options[tempAnswers[4]].text,
      code,
      archetype: archetype.name
    });
  };

  const handleRestart = () => {
    setQuizResult(null);
    setTempAnswers(null);
    setUserData({ name: '', email: '' });
    setState('landing');
  };

  return (
    <div className="min-h-screen text-cq-cream bg-cq-bg font-body overflow-x-hidden selection:bg-cq-cream/20">
      {state === 'landing' && <LandingPage onStart={handleStart} />}
      {state === 'quiz' && <QuizPage onComplete={handleQuizComplete} />}
      {state === 'collect-info' && (
        <div className="min-h-screen bg-cq-bg text-cq-cream flex flex-col items-center justify-center px-6 relative overflow-hidden">
          <div className="grain" />
          <div className="max-w-md w-full space-y-12 z-10">
            <header className="space-y-4 text-center">
              <h2 className="font-heading text-3xl md:text-4xl">Almost there...</h2>
              <p className="text-sm font-body text-cq-olive tracking-[0.1em]">Tell us who you are</p>
            </header>

            <div className="space-y-8">
              <div className="space-y-1">
                <label className="text-sm tracking-[0.1em] text-cq-olive font-body">First name</label>
                <input
                  type="text"
                  className="w-full bg-transparent border-b border-cq-border py-2 font-body text-xl outline-none focus:border-cq-olive transition-colors placeholder:text-cq-cream/10"
                  value={userData.name}
                  onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                  placeholder="Your name"
                />
              </div>
              <div className="space-y-1">
                <label className="text-sm tracking-[0.1em] text-cq-olive font-body">Email address</label>
                <input
                  type="email"
                  className="w-full bg-transparent border-b border-cq-border py-2 font-body text-xl outline-none focus:border-cq-olive transition-colors placeholder:text-cq-cream/10"
                  value={userData.email}
                  onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                  placeholder="email@example.com"
                />
              </div>
            </div>

            <div className="flex justify-center pt-4">
              <button
                onClick={() => handleInfoSubmit(userData)}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-cq-olive/40 px-9 py-3.5 font-body text-sm tracking-wide text-cq-cream transition-colors hover:border-cq-olive hover:text-cq-olive active:scale-95"
              >
                Reveal my archetype
              </button>
            </div>
          </div>
        </div>
      )}
      {state === 'results' && quizResult && (
        <ResultsPage result={quizResult} userData={userData} onRestart={handleRestart} />
      )}
    </div>
  );
};

export default App;
