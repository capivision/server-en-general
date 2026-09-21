import React, { useState, useEffect } from 'react';
import { Target, Trophy, Clock } from 'lucide-react';

interface SkillGameProps {
  targetCount?: number;
  onFinish: (score: number, details: any) => void;
}

export const SkillGame: React.FC<SkillGameProps> = ({ targetCount = 10, onFinish }) => {
  const [hits, setHits] = useState(0);
  const [targetPos, setTargetPos] = useState({ x: 50, y: 50 });
  const [seconds, setSeconds] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const spawnNewTarget = () => {
    const rx = Math.floor(Math.random() * 80) + 10;
    const ry = Math.floor(Math.random() * 80) + 10;
    setTargetPos({ x: rx, y: ry });
  };

  const handleStart = () => {
    setIsPlaying(true);
    setHits(0);
    setSeconds(0);
    setIsFinished(false);
    spawnNewTarget();
  };

  useEffect(() => {
    if (!isPlaying || isFinished) return;
    const timer = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(timer);
  }, [isPlaying, isFinished]);

  const handleTargetClick = () => {
    if (!isPlaying || isFinished) return;

    const newHits = hits + 1;
    setHits(newHits);

    if (newHits >= targetCount) {
      setIsFinished(true);
      setIsPlaying(false);
      const score = Math.max(300, 15000 - seconds * 300);
      onFinish(score, { seconds, targetCount });
    } else {
      spawnNewTarget();
    }
  };

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 max-w-2xl mx-auto shadow-2xl text-center">
      <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
        <div>
          <h4 className="text-xl font-bold text-white font-display flex items-center gap-2">
            <Target className="w-5 h-5 text-red-400" /> Práctica de Puntería y Habilidad
          </h4>
          <p className="text-xs text-slate-400">Toca {targetCount} objetivos en movimiento lo más rápido posible</p>
        </div>

        <div className="flex items-center gap-3 text-xs sm:text-sm font-mono font-bold text-slate-300">
          <span className="bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800">
            Aciertos: {hits}/{targetCount}
          </span>
          <span className="bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800 flex items-center gap-1">
            <Clock className="w-4 h-4 text-emerald-400" /> {seconds}s
          </span>
        </div>
      </div>

      {!isPlaying && !isFinished && (
        <div className="py-12">
          <Target className="w-16 h-16 text-red-400 mx-auto mb-4 animate-spin" />
          <h5 className="text-xl font-bold text-white mb-2">¿Listo para probar tu puntería?</h5>
          <p className="text-xs text-slate-400 max-w-sm mx-auto mb-6">
            Haz clic en el blanco rojo en cuanto aparezca en el tablero.
          </p>
          <button
            onClick={handleStart}
            className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-red-500 to-rose-600 font-bold text-white text-sm shadow-xl hover:brightness-110 active:scale-95 transition-all"
          >
            COMENZAR DESAFÍO
          </button>
        </div>
      )}

      {isPlaying && (
        <div className="relative w-full h-80 bg-slate-950 rounded-2xl border-2 border-slate-800 overflow-hidden select-none">
          <button
            onClick={handleTargetClick}
            style={{ top: `${targetPos.y}%`, left: `${targetPos.x}%` }}
            className="absolute -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-red-500 border-4 border-white shadow-[0_0_20px_rgba(239,68,68,0.8)] flex items-center justify-center cursor-pointer active:scale-90 transition-transform"
          >
            <span className="w-4 h-4 rounded-full bg-white" />
          </button>
        </div>
      )}

      {isFinished && (
        <div className="py-8 animate-in zoom-in-95">
          <Trophy className="w-14 h-14 text-yellow-400 mx-auto mb-3" />
          <h4 className="text-2xl font-bold text-white font-display mb-1">¡Desafío Superado!</h4>
          <p className="text-slate-300 text-sm mb-4">
            Completado en <span className="text-emerald-400 font-bold">{seconds} segundos</span>.
          </p>
          <button
            onClick={handleStart}
            className="px-6 py-2 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs hover:bg-emerald-400"
          >
            Intentar de Nuevo
          </button>
        </div>
      )}
    </div>
  );
};
