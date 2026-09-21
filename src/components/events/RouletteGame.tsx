import React, { useState, useEffect } from 'react';
import { Sparkles, Trophy, RotateCw, AlertCircle, Skull } from 'lucide-react';

interface Slice {
  label: string;
  value: number;
  color: string;
}

interface RouletteGameProps {
  slices?: Slice[];
  onFinish: (score: number, details: any) => void;
}

const DEFAULT_SLICES: Slice[] = [
  { label: '🪙 +500 Coins', value: 500, color: '#10b981' },
  { label: '💥 Trampa: -1,000', value: -1000, color: '#ef4444' },
  { label: '🪙 +2,500 Coins', value: 2500, color: '#3b82f6' },
  { label: '💀 MULTA: -2,500', value: -2500, color: '#7f1d1d' },
  { label: '🪙 +5,000 Coins', value: 5000, color: '#8b5cf6' },
  { label: '🤡 Broma: 0 Pts', value: 0, color: '#64748b' },
  { label: '👑 10,000 JACKPOT', value: 10000, color: '#f59e0b' },
  { label: '⚡ Perder -500 Pts', value: -500, color: '#dc2626' }
];

export const RouletteGame: React.FC<RouletteGameProps> = ({
  slices = DEFAULT_SLICES,
  onFinish
}) => {
  const [spinning, setSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [wonSlice, setWonSlice] = useState<Slice | null>(null);
  const [alreadySpunToday, setAlreadySpunToday] = useState(false);

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    const lastSpin = localStorage.getItem('daddys_roulette_last_spin');
    if (lastSpin === today) {
      setAlreadySpunToday(true);
    }
  }, []);

  const spinWheel = () => {
    if (spinning || wonSlice || alreadySpunToday) return;

    setSpinning(true);
    const sliceDeg = 360 / slices.length;
    const randomIndex = Math.floor(Math.random() * slices.length);
    
    // Add extra 5 full rotations (1800 deg) plus offset
    const targetSliceDegree = 360 - (randomIndex * sliceDeg + sliceDeg / 2);
    const totalRotation = rotation + 1800 + targetSliceDegree;

    setRotation(totalRotation);

    setTimeout(() => {
      setSpinning(false);
      const landed = slices[randomIndex];
      setWonSlice(landed);

      // Store today's spin
      const today = new Date().toISOString().split('T')[0];
      localStorage.setItem('daddys_roulette_last_spin', today);
      setAlreadySpunToday(true);

      onFinish(landed.value, { prize: landed.label });
    }, 4000);
  };

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 max-w-2xl mx-auto shadow-2xl text-center">
      <div className="mb-6">
        <h4 className="text-xl font-bold text-white font-display flex items-center justify-center gap-2">
          <Sparkles className="w-6 h-6 text-yellow-400" /> Ruleta Diaria de Los Daddys
        </h4>
        <p className="text-xs text-slate-400">
          Solo 1 tiro diario por usuario. ¡Cuidado con las casillas trampa!
        </p>
      </div>

      {alreadySpunToday && !wonSlice && (
        <div className="mb-6 p-4 bg-amber-950/60 border border-amber-500/40 rounded-xl text-amber-300 text-xs font-semibold flex items-center justify-center gap-2">
          <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
          <span>Ya utilizaste tu tiro diario a la ruleta. ¡Vuelve mañana para tu siguiente intento!</span>
        </div>
      )}

      {/* Wheel Display Container */}
      <div className="relative w-72 h-72 sm:w-80 sm:h-80 mx-auto mb-8">
        {/* Pointer Arrow */}
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20 w-0 h-0 border-l-[14px] border-l-transparent border-r-[14px] border-r-transparent border-t-[24px] border-t-yellow-400 drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)]" />

        {/* Wheel Graphic */}
        <div
          className="w-full h-full rounded-full border-4 border-yellow-400/80 shadow-[0_0_40px_rgba(245,158,11,0.2)] overflow-hidden relative transition-all duration-[4000ms] cubic-bezier(0.15,0.9,0.2,1)"
          style={{ transform: `rotate(${rotation}deg)` }}
        >
          {slices.map((slice, i) => {
            const angle = (360 / slices.length) * i;
            return (
              <div
                key={i}
                className="absolute top-0 right-0 w-1/2 h-1/2 origin-bottom-left flex items-center justify-center text-[10px] sm:text-xs font-bold text-white select-none pl-6 pr-2 pt-2"
                style={{
                  backgroundColor: slice.color,
                  transform: `rotate(${angle}deg)`,
                  clipPath: 'polygon(0 0, 100% 0, 0 100%)'
                }}
              >
                <span className="transform -rotate-45 block text-center drop-shadow-md whitespace-nowrap">
                  {slice.label}
                </span>
              </div>
            );
          })}
        </div>

        {/* Center Hub */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-16 h-16 rounded-full bg-slate-950 border-4 border-yellow-400 shadow-xl flex items-center justify-center text-yellow-400 font-bold font-display text-xs">
          1/DÍA
        </div>
      </div>

      {wonSlice ? (
        <div className={`p-6 border rounded-2xl animate-in zoom-in-95 max-w-md mx-auto ${
          wonSlice.value >= 0
            ? 'bg-emerald-950/60 border-emerald-500/40'
            : 'bg-red-950/80 border-red-500/60'
        }`}>
          {wonSlice.value >= 0 ? (
            <Trophy className="w-10 h-10 text-yellow-400 mx-auto mb-2" />
          ) : (
            <Skull className="w-10 h-10 text-red-400 mx-auto mb-2" />
          )}
          <h5 className="text-xl font-extrabold text-white mb-1">
            {wonSlice.value >= 0 ? '¡Resultado del Tiro!' : '¡Mala Suerte!'}
          </h5>
          <p className={`text-2xl font-black font-display mb-2 ${wonSlice.value >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
            {wonSlice.label}
          </p>
          <span className="text-xs text-slate-300 block">
            Puntuación aplicada: {wonSlice.value >= 0 ? `+${wonSlice.value}` : wonSlice.value} pts
          </span>
        </div>
      ) : (
        <button
          onClick={spinWheel}
          disabled={spinning || alreadySpunToday}
          className={`px-8 py-3.5 rounded-2xl font-black text-base transition-all flex items-center justify-center gap-3 mx-auto shadow-xl ${
            spinning || alreadySpunToday
              ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
              : 'bg-gradient-to-r from-yellow-400 via-amber-400 to-orange-500 text-slate-950 hover:brightness-110 shadow-[0_0_25px_rgba(245,158,11,0.4)] active:scale-95'
          }`}
        >
          <RotateCw className={`w-5 h-5 ${spinning ? 'animate-spin' : ''}`} />
          <span>
            {spinning
              ? 'Girando Ruleta...'
              : alreadySpunToday
              ? 'TIRO DIARIO USADO'
              : 'GIRAR RULETA AHORA'}
          </span>
        </button>
      )}
    </div>
  );
};
