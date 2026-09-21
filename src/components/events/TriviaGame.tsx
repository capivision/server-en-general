import React, { useState, useEffect } from 'react';
import { TriviaQuestion } from '../../types';
import { HelpCircle, Clock, Trophy, CheckCircle, XCircle, Sparkles } from 'lucide-react';

interface TriviaGameProps {
  questions: TriviaQuestion[];
  onFinish: (score: number, details: any) => void;
}

export const TriviaGame: React.FC<TriviaGameProps> = ({ questions, onFinish }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(15);
  const [gameFinished, setGameFinished] = useState(false);
  const [userAnswers, setUserAnswers] = useState<{ question: string; correct: boolean; points: number }[]>([]);

  const currentQ = questions[currentIndex] || questions[0];

  useEffect(() => {
    if (gameFinished || !currentQ) return;

    if (timeLeft <= 0) {
      handleAnswer(-1); // timeout
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, currentIndex, gameFinished, currentQ]);

  const handleAnswer = (optionIndex: number) => {
    if (selectedOption !== null || gameFinished) return;

    setSelectedOption(optionIndex);

    const isCorrect = optionIndex === currentQ.correctIndex;
    const timeBonus = Math.max(1, timeLeft) * 20; // bonus for quick answer
    const pointsGained = isCorrect ? 500 + timeBonus : 0;

    const newScore = score + pointsGained;
    setScore(newScore);

    const answerRecord = {
      question: currentQ.question,
      correct: isCorrect,
      points: pointsGained,
    };
    const updatedAnswers = [...userAnswers, answerRecord];
    setUserAnswers(updatedAnswers);

    setTimeout(() => {
      if (currentIndex + 1 < questions.length) {
        setCurrentIndex((prev) => prev + 1);
        setSelectedOption(null);
        setTimeLeft(15);
      } else {
        setGameFinished(true);
        onFinish(newScore, { answersCount: questions.length, correctCount: updatedAnswers.filter(a => a.correct).length });
      }
    }, 1200);
  };

  if (!questions || questions.length === 0) {
    return (
      <div className="text-center py-8 text-slate-400">
        No hay preguntas configuradas para esta Trivia.
      </div>
    );
  }

  if (gameFinished) {
    return (
      <div className="bg-slate-900/90 border border-emerald-500/40 rounded-2xl p-8 text-center animate-in zoom-in-95">
        <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 mx-auto flex items-center justify-center mb-4">
          <Trophy className="w-8 h-8" />
        </div>
        <h3 className="text-2xl font-bold text-white mb-2 font-display">¡Trivia Completada!</h3>
        <p className="text-slate-300 text-sm mb-6">
          Has acertado <span className="text-emerald-400 font-bold">{userAnswers.filter(a => a.correct).length}</span> de <span className="text-white font-bold">{questions.length}</span> preguntas.
        </p>

        <div className="bg-slate-950/80 rounded-xl p-4 border border-slate-800 max-w-sm mx-auto mb-6">
          <span className="text-xs text-slate-400 uppercase font-bold tracking-wider block mb-1">Puntuación Total</span>
          <span className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
            {score.toLocaleString()} pts
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 max-w-2xl mx-auto shadow-2xl">
      {/* Header Info */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-bold border border-emerald-500/30">
            Pregunta {currentIndex + 1} de {questions.length}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Clock className={`w-4 h-4 ${timeLeft <= 5 ? 'text-red-400 animate-bounce' : 'text-cyan-400'}`} />
          <span className={`font-mono text-sm font-bold ${timeLeft <= 5 ? 'text-red-400' : 'text-slate-200'}`}>
            00:{timeLeft < 10 ? `0${timeLeft}` : timeLeft}
          </span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden mb-6 border border-slate-800">
        <div 
          className="bg-gradient-to-r from-emerald-400 to-cyan-400 h-full transition-all duration-300"
          style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
        />
      </div>

      {/* Question Title */}
      <h4 className="text-lg sm:text-xl font-bold text-white mb-6 leading-relaxed flex items-start gap-3">
        <HelpCircle className="w-6 h-6 text-emerald-400 shrink-0 mt-0.5" />
        <span>{currentQ.question}</span>
      </h4>

      {/* Options Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
        {currentQ.options.map((opt, idx) => {
          let btnStyle = 'bg-slate-950/80 border-slate-800 hover:border-emerald-500/50 hover:bg-slate-800/80 text-slate-200';

          if (selectedOption !== null) {
            if (idx === currentQ.correctIndex) {
              btnStyle = 'bg-emerald-950/60 border-emerald-500 text-emerald-300 ring-2 ring-emerald-400/50';
            } else if (idx === selectedOption) {
              btnStyle = 'bg-red-950/60 border-red-500 text-red-300';
            } else {
              btnStyle = 'bg-slate-950/40 border-slate-900 opacity-50';
            }
          }

          return (
            <button
              key={idx}
              onClick={() => handleAnswer(idx)}
              disabled={selectedOption !== null}
              className={`p-4 rounded-xl border text-left font-medium text-sm transition-all flex items-center justify-between group ${btnStyle}`}
            >
              <div className="flex items-center gap-3">
                <span className="w-7 h-7 rounded-lg bg-slate-800 text-slate-300 font-mono text-xs font-bold flex items-center justify-center shrink-0 group-hover:bg-emerald-500 group-hover:text-slate-950 transition-colors">
                  {String.fromCharCode(65 + idx)}
                </span>
                <span>{opt}</span>
              </div>

              {selectedOption !== null && idx === currentQ.correctIndex && (
                <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
              )}
              {selectedOption === idx && idx !== currentQ.correctIndex && (
                <XCircle className="w-5 h-5 text-red-400 shrink-0" />
              )}
            </button>
          );
        })}
      </div>

      {/* Footer live score */}
      <div className="flex items-center justify-between pt-4 border-t border-slate-800 text-xs text-slate-400">
        <span>Responde veloz para sumar bonus de tiempo (+20 pts/s)</span>
        <span className="font-bold text-emerald-400 flex items-center gap-1">
          <Sparkles className="w-3.5 h-3.5" /> Puntos: {score}
        </span>
      </div>
    </div>
  );
};
