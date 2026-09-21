import React, { useState, useEffect, useRef } from 'react';
import { Trophy, AlertTriangle, Gauge, Flag, Activity, Play } from 'lucide-react';

interface ReactionGameProps {
  onFinish: (score: number, details: any) => void;
}

export const ReactionGame: React.FC<ReactionGameProps> = ({ onFinish }) => {
  // F1 Start System States: 'idle' | 'lights' | 'waiting_out' | 'ready' | 'false_start' | 'finished'
  const [gameState, setGameState] = useState<'idle' | 'lights' | 'waiting_out' | 'ready' | 'false_start' | 'finished'>('idle');
  const [redLightCount, setRedLightCount] = useState<number>(0);
  const [startTime, setStartTime] = useState<number>(0);
  const [reactionMs, setReactionMs] = useState<number | null>(null);
  const [attempts, setAttempts] = useState<number[]>([]);
  
  const lightIntervalRef = useRef<any>(null);
  const lightsOutTimeoutRef = useRef<any>(null);

  const startF1Sequence = () => {
    setGameState('lights');
    setRedLightCount(0);
    setReactionMs(null);

    let count = 0;
    lightIntervalRef.current = setInterval(() => {
      count++;
      setRedLightCount(count);
      if (count === 5) {
        clearInterval(lightIntervalRef.current);
        setGameState('waiting_out');

        // Random delay 1.2s to 3.5s before LIGHTS OUT
        const randomOutDelay = Math.floor(Math.random() * 2300) + 1200;
        lightsOutTimeoutRef.current = setTimeout(() => {
          setRedLightCount(0); // All 5 lights go OUT!
          setGameState('ready');
          setStartTime(performance.now());
        }, randomOutDelay);
      }
    }, 700);
  };

  const handleDriverAction = () => {
    if (gameState === 'idle') {
      startF1Sequence();
    } else if (gameState === 'lights' || gameState === 'waiting_out') {
      // False start!
      clearInterval(lightIntervalRef.current);
      clearTimeout(lightsOutTimeoutRef.current);
      setGameState('false_start');
    } else if (gameState === 'ready') {
      const endTime = performance.now();
      const timeTaken = Math.round(endTime - startTime);
      setReactionMs(timeTaken);

      const newAttempts = [...attempts, timeTaken];
      setAttempts(newAttempts);

      if (newAttempts.length >= 3) {
        setGameState('finished');
        const avg = Math.round(newAttempts.reduce((a, b) => a + b, 0) / newAttempts.length);
        const best = Math.min(...newAttempts);
        const score = Math.max(100, Math.round(150000 / avg));
        onFinish(score, { attempts: newAttempts, avgMs: avg, bestMs: best });
      } else {
        setGameState('idle');
      }
    } else if (gameState === 'false_start') {
      setGameState('idle');
    }
  };

  useEffect(() => {
    return () => {
      if (lightIntervalRef.current) clearInterval(lightIntervalRef.current);
      if (lightsOutTimeoutRef.current) clearTimeout(lightsOutTimeoutRef.current);
    };
  }, []);

  return (
    <div className="bg-slate-950 border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-3xl mx-auto shadow-2xl relative overflow-hidden">
      {/* Carbon Fiber Background Effect */}
      <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:8px_8px] opacity-20 pointer-events-none" />

      {/* Top Telemetry Header */}
      <div className="flex flex-wrap items-center justify-between pb-4 border-b border-slate-800/80 mb-6 gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-red-600/20 border border-red-500/40 text-red-400 flex items-center justify-center font-black">
            🏎️
          </div>
          <div>
            <h4 className="text-lg font-black text-white font-mono tracking-wider uppercase">
              FORMULA DADDYS TELEMETRY HUD
            </h4>
            <p className="text-[11px] text-slate-400 font-mono">Pistas de Reacción Oficiales • 5 Red Lights System</p>
          </div>
        </div>

        {/* Lap / Attempt Indicators */}
        <div className="flex gap-2">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className={`px-3 py-1 rounded-lg text-xs font-mono font-bold border transition-all ${
                attempts[i]
                  ? 'bg-emerald-950/80 border-emerald-500/60 text-emerald-400'
                  : i === attempts.length
                  ? 'bg-red-950/80 border-red-500/80 text-red-400 animate-pulse'
                  : 'bg-slate-900 border-slate-800 text-slate-600'
              }`}
            >
              Vuel #{i + 1}: {attempts[i] ? `${attempts[i]}ms` : '---'}
            </div>
          ))}
        </div>
      </div>

      {/* Main F1 Steering Wheel / Light Bar Cockpit */}
      <div className="bg-slate-900 border-2 border-slate-800 rounded-2xl p-6 mb-6 shadow-inner relative">
        {/* F1 5 Start Lights Container */}
        <div className="mb-6 bg-slate-950 border border-slate-800 rounded-xl p-4 flex justify-center items-center gap-3 sm:gap-6 shadow-2xl">
          {[1, 2, 3, 4, 5].map((lightIndex) => {
            const isRedOn = gameState === 'lights' || gameState === 'waiting_out' ? lightIndex <= redLightCount : false;
            return (
              <div key={lightIndex} className="flex flex-col items-center gap-2">
                <div
                  className={`w-8 h-8 sm:w-12 sm:h-12 rounded-full border-2 transition-all duration-100 flex items-center justify-center ${
                    isRedOn
                      ? 'bg-red-600 border-red-400 shadow-[0_0_25px_rgba(239,68,68,1)] animate-pulse'
                      : 'bg-slate-950 border-slate-800 shadow-inner'
                  }`}
                >
                  <div
                    className={`w-3 h-3 rounded-full ${
                      isRedOn ? 'bg-white' : 'bg-slate-800'
                    }`}
                  />
                </div>
                <span className="text-[9px] font-mono font-bold text-slate-600">L{lightIndex}</span>
              </div>
            );
          })}
        </div>

        {/* Interactive Steering Wheel Pedals Area */}
        <div
          onClick={handleDriverAction}
          className={`w-full h-56 rounded-2xl cursor-pointer flex flex-col items-center justify-center p-6 border-2 transition-all duration-100 select-none ${
            gameState === 'idle'
              ? 'bg-slate-950 border-red-600/40 hover:border-red-500 hover:shadow-[0_0_30px_rgba(220,38,38,0.25)]'
              : gameState === 'lights' || gameState === 'waiting_out'
              ? 'bg-red-950/70 border-red-600 shadow-[0_0_40px_rgba(220,38,38,0.4)]'
              : gameState === 'ready'
              ? 'bg-emerald-500 border-emerald-300 shadow-[0_0_60px_rgba(16,185,129,0.8)]'
              : gameState === 'false_start'
              ? 'bg-amber-950/90 border-amber-500'
              : 'bg-slate-950 border-emerald-500/40'
          }`}
        >
          {gameState === 'idle' && (
            <div className="space-y-3 text-center">
              <div className="w-12 h-12 rounded-2xl bg-red-600/20 text-red-500 border border-red-500/40 flex items-center justify-center mx-auto">
                <Play className="w-6 h-6 fill-current" />
              </div>
              <h5 className="text-2xl font-black text-white font-mono uppercase tracking-wider">
                {attempts.length === 0 ? 'PRESIONA PARA ARRANCAR DADDYS F1' : 'INICIAR SIGUIENTE INTENTO'}
              </h5>
              <p className="text-slate-400 text-xs font-mono">
                Mantén atención total: Espera a que se apaguen las 5 luces rojas (LIGHTS OUT).
              </p>
            </div>
          )}

          {(gameState === 'lights' || gameState === 'waiting_out') && (
            <div className="space-y-2 text-center animate-pulse">
              <span className="text-4xl font-black text-red-500 font-mono tracking-widest block">
                {redLightCount < 5 ? `SEMAFORO ACUMULANDO: ${redLightCount}/5` : '¡ATENTO AL APAGÓN!'}
              </span>
              <p className="text-red-300 text-xs font-mono">NO APRETES TODAVÍA (Salida en falso = penalización)</p>
            </div>
          )}

          {gameState === 'ready' && (
            <div className="space-y-1 text-center">
              <span className="text-5xl font-black text-slate-950 font-mono tracking-widest block animate-ping">
                LIGHTS OUT!
              </span>
              <span className="text-2xl font-black text-slate-950 font-mono uppercase">
                ¡PRESIONA EL PEDAL AHORA!
              </span>
            </div>
          )}

          {gameState === 'false_start' && (
            <div className="space-y-3 text-center">
              <AlertTriangle className="w-12 h-12 text-amber-400 mx-auto" />
              <h5 className="text-2xl font-black text-amber-300 font-mono uppercase">
                ⚠️ SALIDA EN FALSO (FALSE START)
              </h5>
              <p className="text-amber-200/80 text-xs font-mono">
                Te adelantaste al semáforo antes del apagón. Haz clic para reintentar.
              </p>
            </div>
          )}

          {gameState === 'finished' && (
            <div className="space-y-3 text-center">
              <Trophy className="w-12 h-12 text-yellow-400 mx-auto" />
              <h5 className="text-2xl font-bold text-white font-mono">¡TIEMPO DE TELEMETRÍA REGISTRADO!</h5>
              <div className="flex justify-center gap-4 text-xs font-mono">
                <span className="bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800 text-emerald-400">
                  Promedio: {Math.round(attempts.reduce((a, b) => a + b, 0) / attempts.length)} ms
                </span>
                <span className="bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800 text-yellow-400">
                  Mejor Vuelta: {Math.min(...attempts)} ms
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Telemetry Live Data Panel */}
      <div className="grid grid-cols-3 gap-3 text-center font-mono text-xs">
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-3">
          <span className="text-slate-500 block mb-1">ÚLTIMO REFLEJO</span>
          <span className="text-base font-bold text-cyan-400">
            {reactionMs ? `${reactionMs} ms` : '---'}
          </span>
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-3">
          <span className="text-slate-500 block mb-1">MEJOR REFLEJO</span>
          <span className="text-base font-bold text-emerald-400">
            {attempts.length > 0 ? `${Math.min(...attempts)} ms` : '---'}
          </span>
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-3">
          <span className="text-slate-500 block mb-1">ESTADO BOXES</span>
          <span className="text-base font-bold text-amber-400 uppercase">
            {gameState === 'idle' ? 'LISTO' : gameState === 'ready' ? '¡GO!' : 'EN ESPERA'}
          </span>
        </div>
      </div>
    </div>
  );
};
