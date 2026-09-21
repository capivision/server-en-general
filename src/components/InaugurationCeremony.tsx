import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, Heart, ArrowRight, Volume2, CheckCircle2 } from 'lucide-react';

interface InaugurationCeremonyProps {
  isOpen: boolean;
  onComplete: () => void;
}

export const InaugurationCeremony: React.FC<InaugurationCeremonyProps> = ({
  isOpen,
  onComplete
}) => {
  const [isCutting, setIsCutting] = useState(false);
  const [isCut, setIsCut] = useState(false);
  const [showFarewellCard, setShowFarewellCard] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);

  // Initialize Web Audio synthesizer for ceremonial sounds
  const playScissorAndFanfareSound = () => {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      audioContextRef.current = ctx;

      const now = ctx.currentTime;

      // 1. Scissor snip sound (filtered noise burst)
      const bufferSize = ctx.sampleRate * 0.12;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.25));
      }

      const noiseSource = ctx.createBufferSource();
      noiseSource.buffer = buffer;

      const bandpass = ctx.createBiquadFilter();
      bandpass.type = 'bandpass';
      bandpass.frequency.setValueAtTime(3200, now);
      bandpass.Q.setValueAtTime(4.0, now);

      const noiseGain = ctx.createGain();
      noiseGain.gain.setValueAtTime(0.6, now);
      noiseGain.gain.exponentialRampToValueAtTime(0.01, now + 0.12);

      noiseSource.connect(bandpass);
      bandpass.connect(noiseGain);
      noiseGain.connect(ctx.destination);
      noiseSource.start(now);

      // Second snip 0.15s later
      setTimeout(() => {
        if (ctx.state === 'closed') return;
        const s2 = ctx.createBufferSource();
        s2.buffer = buffer;
        const b2 = ctx.createBiquadFilter();
        b2.type = 'bandpass';
        b2.frequency.setValueAtTime(3800, ctx.currentTime);
        b2.Q.setValueAtTime(5.0, ctx.currentTime);
        const g2 = ctx.createGain();
        g2.gain.setValueAtTime(0.7, ctx.currentTime);
        g2.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.12);
        s2.connect(b2);
        b2.connect(g2);
        g2.connect(ctx.destination);
        s2.start(ctx.currentTime);
      }, 140);

      // 2. Ceremonial triumphant Fanfare chords
      const notes = [
        { freq: 261.63, time: 0.35, dur: 0.3 }, // C4
        { freq: 329.63, time: 0.50, dur: 0.3 }, // E4
        { freq: 392.00, time: 0.65, dur: 0.3 }, // G4
        { freq: 523.25, time: 0.80, dur: 0.8 }, // C5
        { freq: 659.25, time: 0.95, dur: 1.2 }, // E5
        { freq: 783.99, time: 1.05, dur: 1.6 }, // G5 (triumphant climax)
      ];

      notes.forEach(({ freq, time, dur }) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + time);

        gain.gain.setValueAtTime(0.001, now + time);
        gain.gain.exponentialRampToValueAtTime(0.25, now + time + 0.05);
        gain.gain.exponentialRampToValueAtTime(0.001, now + time + dur);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now + time);
        osc.stop(now + time + dur + 0.1);
      });
    } catch (e) {
      console.log('Audio playback skipped:', e);
    }
  };

  const triggerConfetti = () => {
    // Left burst
    confetti({
      particleCount: 80,
      angle: 60,
      spread: 70,
      origin: { x: 0.1, y: 0.6 },
      colors: ['#f59e0b', '#ef4444', '#10b981', '#38bdf8', '#fbbf24', '#ec4899']
    });

    // Right burst
    confetti({
      particleCount: 80,
      angle: 120,
      spread: 70,
      origin: { x: 0.9, y: 0.6 },
      colors: ['#f59e0b', '#ef4444', '#10b981', '#38bdf8', '#fbbf24', '#ec4899']
    });

    // Center grand shower
    setTimeout(() => {
      confetti({
        particleCount: 120,
        spread: 100,
        origin: { x: 0.5, y: 0.45 },
        colors: ['#ffd700', '#f59e0b', '#ffffff', '#fbbf24', '#e11d48']
      });
    }, 300);
  };

  const handleCutRibbon = () => {
    if (isCutting || isCut) return;
    setIsCutting(true);

    playScissorAndFanfareSound();

    // Trigger physical cut
    setTimeout(() => {
      setIsCut(true);
      setIsCutting(false);
      triggerConfetti();

      // Show speech/farewell card after cutting animation
      setTimeout(() => {
        setShowFarewellCard(true);
      }, 1000);
    }, 600);
  };

  const handleEnterNewPage = () => {
    try {
      localStorage.setItem('los_daddys_ribbon_inaugurated_v1', 'true');
    } catch (e) {
      console.warn('Could not save inauguration state to localStorage:', e);
    }
    onComplete();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/95 backdrop-blur-2xl overflow-y-auto px-4 py-8 animate-in fade-in duration-300">
      
      {/* Background theatrical spotlight effect */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[450px] bg-gradient-to-b from-amber-500/15 via-red-500/10 to-transparent blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 inset-x-0 h-64 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent pointer-events-none" />

      <div className="relative w-full max-w-4xl mx-auto text-center z-10">

        {!showFarewellCard ? (
          <div className="space-y-8 animate-in zoom-in-95 duration-500">
            
            {/* Top Inauguration Banner */}
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-amber-500/20 to-red-500/20 border border-amber-400/40 text-amber-300 text-xs font-mono font-bold tracking-widest uppercase shadow-[0_0_20px_rgba(245,158,11,0.2)]">
                <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-spin" />
                <span>CEREMONIA OFICIAL DE INAUGURACIÓN</span>
                <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-spin" />
              </div>

              <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
                El Fin de una Era.{' '}
                <span className="bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-400 bg-clip-text text-transparent">
                  El Nacimiento de Nuestra Nueva Página.
                </span>
              </h2>

              <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
                Toma las tijeras ceremoniales y corta la cinta para despedir los minijuegos y el casino virtual, abriendo oficialmente las puertas a la auténtica comunidad de <span className="text-amber-300 font-bold">Los Daddys</span>.
              </p>
            </div>

            {/* THE CEREMONIAL RIBBON & SCISSORS STAGE */}
            <div className="relative py-16 sm:py-24 my-4 flex items-center justify-center select-none overflow-hidden">
              
              {/* Left Pillar */}
              <div className="absolute left-0 sm:left-4 top-1/2 -translate-y-1/2 w-8 sm:w-12 h-44 rounded-xl bg-gradient-to-b from-amber-600 via-amber-700 to-amber-950 border-2 border-amber-400 shadow-2xl flex flex-col items-center justify-between py-3 z-20">
                <div className="w-4 h-4 rounded-full bg-amber-200 shadow-md border border-amber-500" />
                <div className="w-1.5 h-20 bg-amber-900 rounded-full" />
                <div className="w-4 h-4 rounded-full bg-amber-200 shadow-md border border-amber-500" />
              </div>

              {/* Right Pillar */}
              <div className="absolute right-0 sm:right-4 top-1/2 -translate-y-1/2 w-8 sm:w-12 h-44 rounded-xl bg-gradient-to-b from-amber-600 via-amber-700 to-amber-950 border-2 border-amber-400 shadow-2xl flex flex-col items-center justify-between py-3 z-20">
                <div className="w-4 h-4 rounded-full bg-amber-200 shadow-md border border-amber-500" />
                <div className="w-1.5 h-20 bg-amber-900 rounded-full" />
                <div className="w-4 h-4 rounded-full bg-amber-200 shadow-md border border-amber-500" />
              </div>

              {/* RIBBON (LA LÍNEA) - Left Half */}
              <div
                className={`absolute left-4 sm:left-8 right-1/2 h-14 sm:h-16 bg-gradient-to-b from-red-600 via-red-700 to-red-900 border-y-4 border-amber-400 shadow-[0_10px_25px_rgba(220,38,38,0.5)] flex items-center justify-end px-6 transition-all duration-700 ease-out origin-left ${
                  isCut
                    ? 'rotate-[-28deg] translate-y-32 translate-x-[-50px] opacity-0'
                    : 'rotate-0 translate-y-0 opacity-100'
                }`}
                style={{
                  backgroundImage: 'radial-gradient(ellipse at center, rgba(255,255,255,0.15) 0%, transparent 80%)'
                }}
              >
                <div className="border-b-2 border-dashed border-amber-300/60 w-full mb-1" />
                <span className="hidden sm:inline text-[11px] font-mono font-black text-amber-200 uppercase tracking-widest mr-4">
                  ★ LOS DADDYS ★
                </span>
              </div>

              {/* RIBBON (LA LÍNEA) - Right Half */}
              <div
                className={`absolute left-1/2 right-4 sm:right-8 h-14 sm:h-16 bg-gradient-to-b from-red-600 via-red-700 to-red-900 border-y-4 border-amber-400 shadow-[0_10px_25px_rgba(220,38,38,0.5)] flex items-center justify-start px-6 transition-all duration-700 ease-out origin-right ${
                  isCut
                    ? 'rotate-[28deg] translate-y-32 translate-x-[50px] opacity-0'
                    : 'rotate-0 translate-y-0 opacity-100'
                }`}
                style={{
                  backgroundImage: 'radial-gradient(ellipse at center, rgba(255,255,255,0.15) 0%, transparent 80%)'
                }}
              >
                <span className="hidden sm:inline text-[11px] font-mono font-black text-amber-200 uppercase tracking-widest ml-4">
                  ★ LA NUEVA ERA ★
                </span>
                <div className="border-b-2 border-dashed border-amber-300/60 w-full mb-1" />
              </div>

              {/* CENTER GOLDEN MEDALLION */}
              <div
                className={`relative z-30 transition-all duration-500 ${
                  isCut ? 'scale-0 opacity-0' : 'scale-100 opacity-100'
                }`}
              >
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-yellow-300 via-amber-400 to-yellow-600 border-4 border-yellow-200 shadow-[0_0_35px_rgba(245,158,11,0.8)] flex flex-col items-center justify-center text-slate-950 p-2 font-display">
                  <span className="text-xl">👑</span>
                  <span className="text-[10px] sm:text-xs font-black uppercase tracking-tighter text-center leading-none mt-1">
                    NUEVA ERA
                  </span>
                  <span className="text-[8px] font-mono font-bold text-amber-950">2026</span>
                </div>
              </div>

              {/* CEREMONIAL GOLDEN SCISSORS */}
              <div
                className={`absolute z-40 transition-all duration-300 pointer-events-none ${
                  isCutting
                    ? 'scale-110 translate-y-2'
                    : isCut
                    ? 'scale-75 -translate-y-12 opacity-0'
                    : 'animate-bounce -translate-y-6 sm:-translate-y-8'
                }`}
              >
                <div className="relative flex flex-col items-center">
                  <svg
                    className={`w-20 h-20 sm:w-24 sm:h-24 filter drop-shadow-[0_0_15px_rgba(245,158,11,0.9)] transition-transform duration-200 ${
                      isCutting ? 'scale-y-75' : ''
                    }`}
                    viewBox="0 0 100 100"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    {/* Golden Shears Art */}
                    <circle cx="28" cy="78" r="14" stroke="#FDE047" strokeWidth="6" fill="#78350F" />
                    <circle cx="72" cy="78" r="14" stroke="#FDE047" strokeWidth="6" fill="#78350F" />
                    <line x1="38" y1="68" x2="68" y2="24" stroke="#F59E0B" strokeWidth="8" strokeLinecap="round" />
                    <line x1="62" y1="68" x2="32" y2="24" stroke="#FBBF24" strokeWidth="8" strokeLinecap="round" />
                    <circle cx="50" cy="46" r="5" fill="#FEF08A" stroke="#B45309" strokeWidth="2" />
                    <polygon points="32,24 22,8 38,18" fill="#FDE047" />
                    <polygon points="68,24 78,8 62,18" fill="#FDE047" />
                  </svg>
                  <span className="mt-1 px-3 py-0.5 rounded-full bg-slate-900/90 border border-amber-400/60 text-amber-300 text-[10px] font-mono font-bold tracking-wider uppercase">
                    {isCutting ? '¡CORTANDO!' : 'TIJERAS DE ORO'}
                  </span>
                </div>
              </div>

            </div>

            {/* ACTION BUTTON */}
            <div className="pt-2">
              <button
                onClick={handleCutRibbon}
                disabled={isCutting || isCut}
                className="group relative inline-flex items-center justify-center gap-3 px-10 py-5 rounded-2xl text-lg sm:text-xl font-black text-slate-950 bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500 hover:brightness-110 shadow-[0_0_40px_rgba(245,158,11,0.6)] hover:shadow-[0_0_60px_rgba(245,158,11,0.8)] transition-all transform hover:scale-105 active:scale-95 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed border-2 border-yellow-200"
              >
                <span className="text-2xl group-hover:rotate-45 transition-transform">✂️</span>
                <span>CORTAR LA CINTA E INAUGURAR</span>
                <Sparkles className="w-5 h-5 text-amber-900 fill-amber-900" />
              </button>
              <p className="text-xs text-slate-400 font-mono mt-3">
                * Esta ceremonia oficial se celebra una sola vez para abrir el nuevo capítulo del servidor.
              </p>
            </div>

          </div>
        ) : (
          /* FAREWELL TO CASINO & WELCOME TO NEW ERA CARD */
          <div className="bg-slate-900/95 border-2 border-amber-400/50 rounded-3xl p-6 sm:p-10 shadow-[0_0_60px_rgba(245,158,11,0.3)] text-left max-w-3xl mx-auto space-y-6 animate-in zoom-in-95 duration-500">
            
            {/* Header Badge */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-5">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/40 text-amber-300 flex items-center justify-center text-2xl shadow-inner">
                  🏛️
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-black text-white font-display">
                    ¡Cinta Cortada! La Nueva Era Comienza
                  </h3>
                  <p className="text-xs text-amber-300/90 font-mono">
                    Inauguración Oficial • Los Daddys & Server en General
                  </p>
                </div>
              </div>
              <span className="px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-xs font-bold flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Inaugurado
              </span>
            </div>

            {/* Heartfelt Farewell Speech */}
            <div className="space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed">
              
              <div className="p-4 rounded-2xl bg-red-950/30 border border-red-500/20 text-red-200/90 space-y-2">
                <h4 className="font-bold text-white text-base flex items-center gap-2">
                  <span>🎰</span>
                  <span>Un adiós con el corazón a las monedas y al casino virtual</span>
                </h4>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Durante mucho tiempo nos divertimos con las fichas virtuales, los botes del casino, las ruletas del destino y las carreras por acumular monedas. Vivimos risas, bancarrotas inesperadas, apuestas épicas y momentos memorables entre amigos. 
                </p>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Sin embargo, esa época ha cumplido su ciclo. Hoy decimos adiós a los minijuegos de apuestas para enfocarnos en lo que verdaderamente nos hace una familia: <strong className="text-amber-300">las personas y la amistad</strong>.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-950/30 border border-emerald-500/20 text-emerald-200/90 space-y-2">
                <h4 className="font-bold text-white text-base flex items-center gap-2">
                  <span>✨</span>
                  <span>Bienvenidos a la Auténtica Comunidad de Los Daddys</span>
                </h4>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  A partir de este instante, la página y el servidor renacen como un espacio limpio, transparente y acogedor. Nuestras noches de discord ahora giran en torno a:
                </p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-200 pt-1">
                  <li className="flex items-center gap-2">
                    <span className="text-emerald-400 font-bold">🎙️</span> Charlas libres en canales de voz
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-emerald-400 font-bold">🎮</span> Partidas de gaming juntos
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-emerald-400 font-bold">📺</span> Directos oficiales y momentos en vivo
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-emerald-400 font-bold">🤝</span> Respeto, risas y hermandad
                  </li>
                </ul>
              </div>

              <p className="text-center font-display italic text-amber-200/90 text-sm pt-2">
                "Las mejores historias en Discord no se miden en monedas, sino en las horas que pasamos riéndonos juntos."
              </p>
            </div>

            {/* Enter Button */}
            <div className="pt-2 text-center">
              <button
                onClick={handleEnterNewPage}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl font-bold text-base text-slate-950 bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 hover:brightness-110 shadow-[0_0_30px_rgba(16,185,129,0.4)] transition-all transform hover:-translate-y-0.5 active:scale-95 cursor-pointer"
              >
                <span>🏛️ Entrar a la Nueva Página</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
