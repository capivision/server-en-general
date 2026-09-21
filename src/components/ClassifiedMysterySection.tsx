import React, { useState, useEffect, useRef } from 'react';
import { 
  Radio, 
  Lock, 
  Unlock, 
  Volume2, 
  VolumeX, 
  AlertTriangle,
  ChevronRight,
  CheckCircle2,
  Zap,
  Activity,
  RotateCcw,
  Sparkles,
  Compass,
  Orbit,
  Globe,
  Layers,
  Terminal,
  Cpu,
  Share2,
  Atom,
  Eye,
  Rocket,
  ExternalLink,
  Edit2,
  Check,
  Shield,
  X
} from 'lucide-react';
import { OuterSpaceBackground } from './OuterSpaceBackground';
import {
  setTensionAudioEnabled,
  getTensionAudioEnabled,
  playCyberClick,
  playSliderTone,
  playErrorAlarm,
  playLogicSwitch,
  playStageSolvedTone,
  playGrandBreachSiren,
  playSafeDialTick,
  playSafeTumblerNear,
  playSafeTumblerEngage,
  playSafePinUnlocked,
  playCosmicGlitchPulse,
  playRealityPhaseShift,
  playTachyonPulse
} from '../utils/tensionAudio';

export const ClassifiedMysterySection: React.FC = () => {
  // Master Audio Toggle
  const [audioActive, setAudioActive] = useState(false);

  // Reality Glitch Intensity Tracker
  const [glitchFactor, setGlitchFactor] = useState(0.35);

  // =========================================================================
  // FASE 1: SINTONIZADOR DE ONDA MULTIVERSAL (MULTIVERSE RESONANCE SYNC)
  // =========================================================================
  // Alineación de 4 frecuencias cuánticas: [4] - [8] - [2] - [7]
  const [quantumNode1, setQuantumNode1] = useState(1);
  const [quantumNode2, setQuantumNode2] = useState(3);
  const [quantumNode3, setQuantumNode3] = useState(6);
  const [quantumNode4, setQuantumNode4] = useState(9);
  const [phase1Solved, setPhase1Solved] = useState(false);
  const [phase1Feedback, setPhase1Feedback] = useState<string | null>(null);

  // Sync calculation
  const targetCombo = [4, 8, 2, 7];
  const currentDiff = 
    Math.abs(quantumNode1 - targetCombo[0]) +
    Math.abs(quantumNode2 - targetCombo[1]) +
    Math.abs(quantumNode3 - targetCombo[2]) +
    Math.abs(quantumNode4 - targetCombo[3]);
  const resonanceSyncPct = Math.max(12, Math.round(100 - (currentDiff / 32) * 88));

  const cycleQuantumNode = (index: number) => {
    playCosmicGlitchPulse(0.9 + index * 0.2);
    if (index === 1) {
      setQuantumNode1(prev => (prev >= 9 ? 1 : prev + 1));
    } else if (index === 2) {
      setQuantumNode2(prev => (prev >= 9 ? 1 : prev + 1));
    } else if (index === 3) {
      setQuantumNode3(prev => (prev >= 9 ? 1 : prev + 1));
    } else if (index === 4) {
      setQuantumNode4(prev => (prev >= 9 ? 1 : prev + 1));
    }
  };

  const handleExecuteSync = () => {
    playCyberClick(1100);
    if (quantumNode1 === 4 && quantumNode2 === 8 && quantumNode3 === 2 && quantumNode4 === 7) {
      setPhase1Solved(true);
      setPhase1Feedback('¡SINCRONIZACIÓN ARMÓNICA ALCANZADA! El desfase de la Realidad-Alfa ha sido estabilizado.');
      playStageSolvedTone();
      playRealityPhaseShift(1.2);
      setGlitchFactor(0.2);
    } else {
      playErrorAlarm();
      playCosmicGlitchPulse(1.5);
      setPhase1Feedback(`DESFASE ACTIVO (Sincronía al ${resonanceSyncPct}%). Busca la resonancia: escucha el pulso cuántico al ciclar cada nodo.`);
    }
  };

  // =========================================================================
  // FASE 2: ESTABILIZADOR DE LA GRIETA ESPACIOTEMPORAL (SINGULARITY FLUX)
  // =========================================================================
  // Controlar la entropía del desgarro gravitatorio: mantenerla por debajo del 80% y canalizar 100% de taquiones
  const [tachyonEnergy, setTachyonEnergy] = useState(0); // 0 to 100%
  const [voidEntropy, setVoidEntropy] = useState(42); // 0 to 100%
  const [phase2Solved, setPhase2Solved] = useState(false);
  const [stabilizersActive, setStabilizersActive] = useState<[boolean, boolean, boolean, boolean]>([false, false, false, false]);

  // Natural cosmic entropy drift
  useEffect(() => {
    if (phase2Solved) return;
    const interval = setInterval(() => {
      setVoidEntropy(prev => {
        const activeCount = stabilizersActive.filter(Boolean).length;
        const drift = activeCount > 2 ? -2 : 3;
        return Math.max(10, Math.min(95, prev + drift));
      });
    }, 600);
    return () => clearInterval(interval);
  }, [phase2Solved, stabilizersActive]);

  const toggleStabilizer = (index: number) => {
    playLogicSwitch(true);
    playTachyonPulse();
    setStabilizersActive(prev => {
      const next = [...prev] as [boolean, boolean, boolean, boolean];
      next[index] = !next[index];
      return next;
    });
  };

  const handleInjectTachyonFlux = () => {
    if (phase2Solved) return;
    playTachyonPulse();
    playCosmicGlitchPulse(0.8);

    const activeCount = stabilizersActive.filter(Boolean).length;
    if (activeCount === 0) {
      playErrorAlarm();
      return;
    }

    const boost = activeCount * 8;
    setVoidEntropy(prev => Math.max(5, prev - 15));
    setTachyonEnergy(prev => {
      const next = Math.min(100, prev + boost);
      if (next >= 100) {
        setPhase2Solved(true);
        playStageSolvedTone();
        playRealityPhaseShift(1.5);
      }
      return next;
    });
  };

  // =========================================================================
  // FASE 3: DECODIFICADOR DE GLIFOS DEL VACÍO CÓSMICO (QUANTUM CIPHER)
  // =========================================================================
  // Dial estelar astronómico para sintonizar 3 coordenadas del vacío: [28, 64, 89]
  const COSMIC_TARGET_COORDS = [28, 64, 89];
  const [cosmicStep, setCosmicStep] = useState<1 | 2 | 3>(1);
  const [cosmicDial, setCosmicDial] = useState<number>(0);
  const [unlockedCosmicCoords, setUnlockedCosmicCoords] = useState<number[]>([]);
  const [phase3Solved, setPhase3Solved] = useState(false);
  const [phase3Feedback, setPhase3Feedback] = useState<string | null>(null);

  const activeTarget = COSMIC_TARGET_COORDS[cosmicStep - 1];
  const coordDiff = Math.min(
    Math.abs(cosmicDial - activeTarget),
    100 - Math.abs(cosmicDial - activeTarget)
  );
  const isResonanceLocked = coordDiff === 0;

  const rotateCosmicDial = (amount: number) => {
    if (phase3Solved) return;
    const next = (cosmicDial + amount + 100) % 100;
    setCosmicDial(next);

    const target = COSMIC_TARGET_COORDS[cosmicStep - 1];
    const diff = Math.min(Math.abs(next - target), 100 - Math.abs(next - target));

    if (diff === 0) {
      playSafeTumblerEngage();
      playCosmicGlitchPulse(1.8);
      setPhase3Feedback('¡RESONANCIA ENCONTRADA! Glifos estabilizados en la coordenada. Pulsa Fijar Paridad.');
    } else if (diff <= 2) {
      playSafeTumblerNear();
      playSafeDialTick(1.4);
      setPhase3Feedback('Fluctuación electromagnética interestelar detectada cerca...');
    } else {
      playSafeDialTick(0.8);
      if (phase3Feedback && !phase3Feedback.includes('errónea')) {
        setPhase3Feedback(null);
      }
    }
  };

  const setCosmicDialDirect = (val: number) => {
    if (phase3Solved) return;
    const clamped = Math.max(0, Math.min(99, Math.round(val)));
    setCosmicDial(clamped);

    const target = COSMIC_TARGET_COORDS[cosmicStep - 1];
    const diff = Math.min(Math.abs(clamped - target), 100 - Math.abs(clamped - target));

    if (diff === 0) {
      playSafeTumblerEngage();
      playCosmicGlitchPulse(1.8);
      setPhase3Feedback('¡RESONANCIA ENCONTRADA! Glifos estabilizados en la coordenada. Pulsa Fijar Paridad.');
    } else if (diff <= 2) {
      playSafeTumblerNear();
      playSafeDialTick(1.4);
      setPhase3Feedback('Fluctuación electromagnética interestelar detectada cerca...');
    } else {
      playSafeDialTick(0.8);
      if (phase3Feedback && !phase3Feedback.includes('errónea')) {
        setPhase3Feedback(null);
      }
    }
  };

  const confirmCosmicCoord = () => {
    if (phase3Solved) return;
    const target = COSMIC_TARGET_COORDS[cosmicStep - 1];
    const diff = Math.min(Math.abs(cosmicDial - target), 100 - Math.abs(cosmicDial - target));

    if (diff === 0) {
      playSafePinUnlocked();
      const updated = [...unlockedCosmicCoords, target];
      setUnlockedCosmicCoords(updated);

      if (cosmicStep === 1) {
        setCosmicStep(2);
        setPhase3Feedback('¡Glifo 1/3 decodificado! Sintoniza la segunda coordenada estelar.');
      } else if (cosmicStep === 2) {
        setCosmicStep(3);
        setPhase3Feedback('¡Glifo 2/3 decodificado! Solo falta la clave de alineación final.');
      } else if (cosmicStep === 3) {
        setPhase3Solved(true);
        setPhase3Feedback('¡TELEMETRÍA DESCIFRADA! Mensaje interestelar reconstruido con éxito.');
        playStageSolvedTone();
        playRealityPhaseShift(2.0);
      }
    } else {
      playErrorAlarm();
      setPhase3Feedback(`Coordenada #${cosmicDial} sin alineación. Gira despacio escuchando el chasquido cuántico.`);
    }
  };

  const resetCosmicCipher = () => {
    playCyberClick(300);
    setCosmicStep(1);
    setCosmicDial(0);
    setUnlockedCosmicCoords([]);
    setPhase3Solved(false);
    setPhase3Feedback(null);
  };

  // =========================================================================
  // FASE 4: HORIZONTE DE SUCESOS & SALTO HIPERESPACIAL
  // =========================================================================
  const allSolved = phase1Solved && phase2Solved && phase3Solved;
  const [selectedRole, setSelectedRole] = useState<'navigator' | 'hacker' | 'vanguard' | 'cartographer'>('navigator');
  const [discordTag, setDiscordTag] = useState('');
  const [passportIssued, setPassportIssued] = useState(false);
  const [passportId, setPassportId] = useState('');

  // External Website Redirection Portal State
  const [redirectUrl, setRedirectUrl] = useState('https://discord.gg/Tfbznzrb8g');
  const [isEditingRedirectUrl, setIsEditingRedirectUrl] = useState(false);
  const [tempRedirectUrl, setTempRedirectUrl] = useState('https://discord.gg/Tfbznzrb8g');

  // Admin Access State
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [adminPasswordInput, setAdminPasswordInput] = useState('');
  const [adminError, setAdminError] = useState<string | null>(null);
  const [adminSolved, setAdminSolved] = useState(false);

  const handleAdminSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = adminPasswordInput.trim().toLowerCase();
    if (
      trimmed === 'losdaddys' ||
      trimmed === '¨losdaddys¨' ||
      trimmed === '"losdaddys"' ||
      trimmed === '“losdaddys”'
    ) {
      // Fase 1: Resonancia Cuántica
      setQuantumNode1(4);
      setQuantumNode2(8);
      setQuantumNode3(2);
      setQuantumNode4(7);
      setPhase1Solved(true);
      setPhase1Feedback('¡SINCRONIZACIÓN ARMÓNICA ALCANZADA! Autorización de Administrador ejecutada.');

      // Fase 2: Flujo de Singularidad
      setStabilizersActive([true, true, true, true]);
      setVoidEntropy(0);
      setTachyonEnergy(100);
      setPhase2Solved(true);

      // Fase 3: Decodificador del Vacío
      setUnlockedCosmicCoords([28, 64, 89]);
      setCosmicStep(3);
      setCosmicDial(89);
      setPhase3Solved(true);
      setPhase3Feedback('¡TELEMETRÍA DESCIFRADA! Claves fijadas por comando de Administrador.');

      // Efectos globales y finalización
      setGlitchFactor(0.05);
      setAdminSolved(true);
      setAdminError(null);
      setIsAdminModalOpen(false);

      playStageSolvedTone();
      playGrandBreachSiren();
      playRealityPhaseShift(2.0);
    } else {
      setAdminError('Clave de acceso incorrecta. Permiso denegado.');
      playErrorAlarm();
      playCosmicGlitchPulse(1.5);
    }
  };

  const getSanitizedRedirectUrl = (url: string) => {
    const trimmed = url.trim();
    if (!trimmed) return 'https://discord.gg/Tfbznzrb8g';
    if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
      return trimmed;
    }
    return `https://${trimmed}`;
  };

  const handleWarpRedirect = () => {
    playRealityPhaseShift(2.2);
    playGrandBreachSiren();
    const finalUrl = getSanitizedRedirectUrl(redirectUrl);
    window.open(finalUrl, '_blank', 'noopener,noreferrer');
  };

  const handleToggleAudio = () => {
    const next = !audioActive;
    setAudioActive(next);
    setTensionAudioEnabled(next);
    if (next) {
      playRealityPhaseShift(1.0);
    }
  };

  useEffect(() => {
    if (allSolved) {
      playGrandBreachSiren();
    }
  }, [allSolved]);

  const handleIssuePassport = (e: React.FormEvent) => {
    e.preventDefault();
    if (!discordTag.trim()) return;
    const randomCode = 'DADDY-WARP-' + Math.random().toString(36).substring(2, 7).toUpperCase();
    setPassportId(randomCode);
    setPassportIssued(true);
    playRealityPhaseShift(1.8);
    playStageSolvedTone();
  };

  return (
    <section id="classified-mystery" className="py-24 sm:py-32 bg-[#020108] relative overflow-hidden text-slate-100 min-h-screen flex flex-col justify-center">
      
      {/* REAL OUTER SPACE BACKGROUND CANVAS */}
      <OuterSpaceBackground
        glitchIntensity={allSolved ? 0.05 : glitchFactor}
        warpSpeed={allSolved}
      />

      {/* Dimensional Tear Ambient Halos */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-full max-w-6xl h-[550px] bg-gradient-to-b from-fuchsia-950/25 via-cyan-950/15 to-transparent blur-[160px] pointer-events-none" />
      <div className="absolute -bottom-20 right-0 w-[500px] h-[500px] bg-indigo-950/30 blur-[150px] pointer-events-none" />
      <div className="absolute top-1/2 left-0 w-[450px] h-[450px] bg-purple-950/20 blur-[140px] pointer-events-none" />

      {/* Main Glass Content Container */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        
        {/* Top Bar with Admin Button on the Left */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => {
              setIsAdminModalOpen(true);
              setAdminPasswordInput('');
              setAdminError(null);
            }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/70 hover:bg-slate-900 border border-slate-800/90 hover:border-cyan-500/60 text-slate-400 hover:text-cyan-300 text-xs font-mono font-bold tracking-wider transition-all backdrop-blur-md cursor-pointer hover:shadow-[0_0_15px_rgba(6,182,212,0.25)] group"
            title="Acceso de Administrador"
          >
            <Shield className="w-3.5 h-3.5 text-slate-500 group-hover:text-cyan-400 transition-colors" />
            <span>ADMIN</span>
          </button>

          {adminSolved && (
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/50 text-emerald-300 text-xs font-mono font-bold animate-pulse">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Acceso Administrador Autorizado</span>
            </div>
          )}
        </div>

        {/* Header: Reality Phase Glitch */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          
          <div className="flex flex-wrap items-center justify-center gap-3 mb-5">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/80 backdrop-blur-md border border-fuchsia-500/70 text-fuchsia-300 text-xs font-mono font-bold tracking-widest uppercase shadow-[0_0_25px_rgba(217,70,239,0.35)] animate-pulse">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>ANOMALÍA GLITCH // DESFASE DE REALIDADES // VACÍO ESPACIAL</span>
            </div>

            {/* Cosmic Audio Toggle */}
            <button
              onClick={handleToggleAudio}
              title={audioActive ? 'Silenciar ambiente espacial y glitches' : 'Activar atmósfera del espacio exterior y resonancia cuántica'}
              className={`px-4 py-1.5 rounded-full border text-xs font-mono font-bold transition-all flex items-center gap-2 cursor-pointer backdrop-blur-md ${
                audioActive
                  ? 'bg-cyan-950/80 border-cyan-400 text-cyan-200 shadow-[0_0_20px_rgba(6,182,212,0.4)] animate-pulse'
                  : 'bg-black/70 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
              }`}
            >
              {audioActive ? <Volume2 className="w-3.5 h-3.5 text-cyan-400" /> : <VolumeX className="w-3.5 h-3.5" />}
              <span>{audioActive ? 'Ambiente Espacial Activo' : 'Activar Sonido Espacial & Glitch'}</span>
            </button>
          </div>

          <h2 className="font-display text-4xl sm:text-6xl font-black text-white tracking-tight leading-tight select-none">
            DESFASE DE{' '}
            <span className="bg-gradient-to-r from-cyan-400 via-fuchsia-400 to-indigo-300 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(6,182,212,0.5)]">
              REALIDADES
            </span>
          </h2>

          <p className="mt-4 text-slate-300 text-sm sm:text-base leading-relaxed font-mono">
            Una fractura espaciotemporal ha abierto una brecha hacia el <strong className="text-cyan-300">espacio exterior infinito</strong>. Las líneas temporales colisionan en tiempo real. Resuelve las 3 anomalías dimensionales para sincronizar la realidad y habilitar el salto hiperespacial.
          </p>

          {/* Glitch Telemetry Ribbon */}
          <div className="mt-5 inline-flex items-center gap-3 px-4 py-2 rounded-xl bg-black/60 border border-slate-800 text-xs font-mono text-slate-400 backdrop-blur-md">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>FRACTURA_ESTADO:</span>
            <span className="text-cyan-400 font-bold">HORIZONTE ABIERTO</span>
            <span className="text-slate-600">|</span>
            <span>VECTOR_VACÍO:</span>
            <span className="text-fuchsia-400 font-bold">[RA: 14h 29m // DEC: -62°40&apos;]</span>
          </div>
        </div>

        {/* =================================================================== */}
        {/* GRID OF THE 3 REALITY PHASE STAGES */}
        {/* =================================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 mb-12">
          
          {/* ========================================================= */}
          {/* FASE 1: SINTONIZADOR DE ONDA MULTIVERSAL */}
          {/* ========================================================= */}
          <div className={`p-6 sm:p-7 rounded-3xl border transition-all duration-300 relative overflow-hidden flex flex-col justify-between backdrop-blur-xl ${
            phase1Solved
              ? 'bg-black/50 border-emerald-500/50 shadow-[0_0_30px_rgba(16,185,129,0.15)]'
              : 'bg-black/60 border-slate-800/80 hover:border-cyan-500/50 shadow-2xl'
          }`}>
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-cyan-950/80 border border-cyan-500/50 flex items-center justify-center text-cyan-300 font-mono text-xs font-bold shadow-[0_0_10px_rgba(6,182,212,0.3)]">
                    01
                  </div>
                  <span className="font-mono text-xs font-bold tracking-widest text-cyan-400 uppercase">
                    ANOMALÍA ONDULATORIA
                  </span>
                </div>
                {phase1Solved ? (
                  <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[11px] font-mono font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> SINCRONIZADO
                  </span>
                ) : (
                  <span className="px-2.5 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 text-[11px] font-mono font-bold flex items-center gap-1">
                    <Activity className="w-3 h-3 animate-pulse" /> DESFASADO
                  </span>
                )}
              </div>

              <h3 className="font-display font-bold text-xl text-white mb-2">
                Resonancia Multiversal
              </h3>
              <p className="text-slate-300 text-xs leading-relaxed mb-4">
                Dos líneas temporales interfieren destructivamente. Ajusta las 4 coordenadas de polarización cuántica para acoplar las frecuencias de la Realidad-0 con el Vacío.
              </p>

              {/* Waveform Sync Visualizer */}
              <div className="bg-slate-950/90 p-3 rounded-2xl border border-slate-800/80 mb-4 overflow-hidden relative">
                <div className="flex justify-between items-center text-[10px] font-mono text-slate-400 mb-1">
                  <span>COHERENCIA DE REALIDAD:</span>
                  <span className={`font-bold ${phase1Solved ? 'text-emerald-400' : 'text-cyan-400'}`}>
                    {phase1Solved ? '100% ACOPLADO' : `${resonanceSyncPct}% SINCRONÍA`}
                  </span>
                </div>

                <div className="h-16 w-full relative flex items-center justify-center bg-black/60 rounded-xl overflow-hidden border border-slate-900">
                  {/* Wave 1: Base Reality (Cyan) */}
                  <svg className="w-full h-full absolute inset-0 opacity-80" viewBox="0 0 200 60" preserveAspectRatio="none">
                    <path
                      d={`M 0 30 Q 25 ${30 + (phase1Solved ? 0 : 15)}, 50 30 T 100 30 T 150 30 T 200 30`}
                      fill="none"
                      stroke="#06b6d4"
                      strokeWidth="2.5"
                    />
                  </svg>
                  {/* Wave 2: Glitch Shifted Void Reality (Magenta) */}
                  <svg className="w-full h-full absolute inset-0 opacity-80" viewBox="0 0 200 60" preserveAspectRatio="none">
                    <path
                      d={`M 0 30 Q 25 ${30 - (phase1Solved ? 0 : Math.max(2, 28 - resonanceSyncPct * 0.25))}, 50 30 T 100 30 T 150 30 T 200 30`}
                      fill="none"
                      stroke="#d946ef"
                      strokeWidth="2"
                      strokeDasharray={phase1Solved ? 'none' : '4 2'}
                    />
                  </svg>
                  {/* Center zero line */}
                  <div className="absolute inset-x-0 top-1/2 h-[1px] bg-slate-800/60" />
                </div>
              </div>

              {/* Quantum 4 Nodes Cycle */}
              <div className="grid grid-cols-4 gap-2 mb-4 font-mono">
                {[
                  { label: 'λ-Alfa', val: quantumNode1, idx: 1 },
                  { label: 'ψ-Beta', val: quantumNode2, idx: 2 },
                  { label: 'Ω-Gamma', val: quantumNode3, idx: 3 },
                  { label: 'Δ-Delta', val: quantumNode4, idx: 4 },
                ].map((node) => (
                  <button
                    key={node.idx}
                    onClick={() => !phase1Solved && cycleQuantumNode(node.idx)}
                    disabled={phase1Solved}
                    className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                      phase1Solved
                        ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300'
                        : 'bg-black/70 hover:bg-slate-900 border-slate-800 hover:border-cyan-400 text-slate-200 active:scale-95'
                    }`}
                  >
                    <div className="text-[9px] text-slate-400">{node.label}</div>
                    <div className="text-xl font-bold mt-1 text-cyan-300">{node.val}</div>
                  </button>
                ))}
              </div>

              {phase1Feedback && (
                <p className={`text-xs font-mono p-2.5 rounded-xl border flex items-center gap-2 mb-4 ${
                  phase1Solved 
                    ? 'text-emerald-300 bg-emerald-950/40 border-emerald-800/60'
                    : 'text-amber-300 bg-amber-950/40 border-amber-800/60'
                }`}>
                  <AlertTriangle className="w-4 h-4 shrink-0" />
                  <span>{phase1Feedback}</span>
                </p>
              )}
            </div>

            <div className="mt-4">
              {!phase1Solved ? (
                <button
                  onClick={handleExecuteSync}
                  className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-cyan-600 via-teal-500 to-indigo-600 text-slate-950 font-mono font-bold text-xs uppercase tracking-wider hover:brightness-110 shadow-[0_0_20px_rgba(6,182,212,0.4)] cursor-pointer flex items-center justify-center gap-2 transition-all active:scale-98"
                >
                  <Atom className="w-4 h-4" />
                  <span>Acoplar Frecuencias Cuánticas</span>
                </button>
              ) : (
                <div className="p-3.5 rounded-xl bg-emerald-950/50 border border-emerald-500/40 text-emerald-300 font-mono text-xs flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>¡FASE 1 COMPLETADA: Frecuencias Cuánticas En Fase!</span>
                </div>
              )}
            </div>
          </div>

          {/* ========================================================= */}
          {/* FASE 2: ESTABILIZADOR DE LA GRIETA ESPACIOTEMPORAL */}
          {/* ========================================================= */}
          <div className={`p-6 sm:p-7 rounded-3xl border transition-all duration-300 relative overflow-hidden flex flex-col justify-between backdrop-blur-xl ${
            phase2Solved
              ? 'bg-black/50 border-emerald-500/50 shadow-[0_0_30px_rgba(16,185,129,0.15)]'
              : 'bg-black/60 border-slate-800/80 hover:border-fuchsia-500/50 shadow-2xl'
          }`}>
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-fuchsia-950/80 border border-fuchsia-500/50 flex items-center justify-center text-fuchsia-300 font-mono text-xs font-bold shadow-[0_0_10px_rgba(217,70,239,0.3)]">
                    02
                  </div>
                  <span className="font-mono text-xs font-bold tracking-widest text-fuchsia-400 uppercase">
                    GRIETA GRAVITACIONAL
                  </span>
                </div>
                {phase2Solved ? (
                  <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[11px] font-mono font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> SELLADA
                  </span>
                ) : (
                  <span className="px-2.5 py-1 rounded-full bg-fuchsia-500/20 text-fuchsia-300 border border-fuchsia-500/40 text-[11px] font-mono font-bold flex items-center gap-1">
                    <Orbit className="w-3 h-3 animate-spin" /> ENTRÓPICA
                  </span>
                )}
              </div>

              <h3 className="font-display font-bold text-xl text-white mb-2">
                Flujo de Singularidad
              </h3>
              <p className="text-slate-300 text-xs leading-relaxed mb-4">
                El desgarro gravitacional hacia el cosmos succiona la materia local. Activa los 4 anclajes de taquiones e inyecta flujo hasta alcanzar el 100% de contención antes de que la entropía colapse la nave.
              </p>

              {/* Entropy & Tachyon Bars */}
              <div className="space-y-3 bg-black/60 p-4 rounded-2xl border border-slate-800 font-mono text-xs mb-4">
                {/* Tachyon Energy */}
                <div>
                  <div className="flex justify-between text-[11px] mb-1">
                    <span className="text-slate-400 flex items-center gap-1">
                      <Zap className="w-3 h-3 text-cyan-400" /> Contención Taquiónica:
                    </span>
                    <span className="text-cyan-400 font-bold">{tachyonEnergy}% / 100%</span>
                  </div>
                  <div className="w-full h-3 bg-slate-950 rounded-full overflow-hidden border border-slate-800 p-0.5">
                    <div 
                      className="h-full bg-gradient-to-r from-cyan-500 to-indigo-500 rounded-full transition-all duration-300 shadow-[0_0_12px_rgba(6,182,212,0.8)]"
                      style={{ width: `${tachyonEnergy}%` }}
                    />
                  </div>
                </div>

                {/* Void Entropy Hazard Bar */}
                <div>
                  <div className="flex justify-between text-[11px] mb-1">
                    <span className="text-slate-400 flex items-center gap-1">
                      <AlertTriangle className="w-3 h-3 text-fuchsia-400" /> Inestabilidad del Vacío:
                    </span>
                    <span className={`font-bold ${voidEntropy > 75 ? 'text-red-400 animate-pulse' : 'text-fuchsia-400'}`}>
                      {voidEntropy}% Entropía
                    </span>
                  </div>
                  <div className="w-full h-3 bg-slate-950 rounded-full overflow-hidden border border-slate-800 p-0.5">
                    <div 
                      className={`h-full rounded-full transition-all duration-300 ${
                        voidEntropy > 75
                          ? 'bg-gradient-to-r from-amber-500 to-red-500 shadow-[0_0_12px_rgba(239,68,68,0.8)]'
                          : 'bg-gradient-to-r from-purple-500 to-pink-500'
                      }`}
                      style={{ width: `${voidEntropy}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* 4 Tachyon Anchor Switches */}
              <div className="grid grid-cols-2 gap-2 mb-4 font-mono text-xs">
                {['Anclaje Alfa', 'Anclaje Beta', 'Anclaje Gamma', 'Anclaje Omega'].map((name, i) => (
                  <button
                    key={name}
                    onClick={() => !phase2Solved && toggleStabilizer(i)}
                    disabled={phase2Solved}
                    className={`p-2.5 rounded-xl border text-left flex items-center justify-between cursor-pointer transition-all ${
                      stabilizersActive[i]
                        ? 'bg-fuchsia-950/50 border-fuchsia-500/60 text-fuchsia-200 shadow-[0_0_12px_rgba(217,70,239,0.3)]'
                        : 'bg-black/60 border-slate-800 text-slate-500 hover:text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <span>{name}</span>
                    <span className={`w-2 h-2 rounded-full ${stabilizersActive[i] ? 'bg-fuchsia-400 shadow-[0_0_6px_rgba(217,70,239,1)]' : 'bg-slate-700'}`} />
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-4">
              {!phase2Solved ? (
                <button
                  onClick={handleInjectTachyonFlux}
                  className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-fuchsia-600 via-pink-600 to-purple-600 text-white font-mono font-bold text-xs uppercase tracking-wider hover:brightness-110 shadow-[0_0_20px_rgba(217,70,239,0.4)] cursor-pointer flex items-center justify-center gap-2 transition-all active:scale-98"
                >
                  <Zap className="w-4 h-4" />
                  <span>Inyectar Flujo de Taquiones (+Energía)</span>
                </button>
              ) : (
                <div className="p-3.5 rounded-xl bg-emerald-950/50 border border-emerald-500/40 text-emerald-300 font-mono text-xs flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>¡FASE 2 COMPLETADA: Singularidad Estabilizada!</span>
                </div>
              )}
            </div>
          </div>

          {/* ========================================================= */}
          {/* FASE 3: DECODIFICADOR DE GLIFOS DEL VACÍO CÓSMICO */}
          {/* ========================================================= */}
          <div className={`p-6 sm:p-7 rounded-3xl border transition-all duration-300 relative overflow-hidden flex flex-col justify-between backdrop-blur-xl ${
            phase3Solved
              ? 'bg-black/50 border-emerald-500/50 shadow-[0_0_30px_rgba(16,185,129,0.15)]'
              : 'bg-black/60 border-slate-800/80 hover:border-indigo-500/50 shadow-2xl'
          }`}>
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-indigo-950/80 border border-indigo-500/50 flex items-center justify-center text-indigo-300 font-mono text-xs font-bold shadow-[0_0_10px_rgba(99,102,241,0.3)]">
                    03
                  </div>
                  <span className="font-mono text-xs font-bold tracking-widest text-indigo-400 uppercase">
                    GLIFOS CÓSMICOS
                  </span>
                </div>
                <button
                  onClick={resetCosmicCipher}
                  title="Reiniciar decodificador astronómico"
                  className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              </div>

              <h3 className="font-display font-bold text-xl text-white mb-2">
                Decodificador del Vacío
              </h3>
              <p className="text-slate-300 text-xs leading-relaxed mb-4">
                Gira el dial astronómico para sintonizar los 3 glifos encriptados emitidos a través del agujero de gusano. Escucha la resonancia electromagnética para fijar la paridad.
              </p>

              {/* 3 Gliph Progress */}
              <div className="grid grid-cols-3 gap-2 mb-4 font-mono text-xs">
                {[1, 2, 3].map((step) => {
                  const isDone = unlockedCosmicCoords.length >= step;
                  const isCurrent = cosmicStep === step && !phase3Solved;
                  return (
                    <div
                      key={step}
                      className={`p-2 rounded-xl border text-center transition-all ${
                        isDone
                          ? 'bg-emerald-950/50 border-emerald-500/50 text-emerald-300 shadow-[0_0_10px_rgba(16,185,129,0.2)]'
                          : isCurrent
                            ? 'bg-indigo-950/40 border-indigo-500/60 text-indigo-300 shadow-[0_0_10px_rgba(99,102,241,0.2)]'
                            : 'bg-black/50 border-slate-800 text-slate-500'
                      }`}
                    >
                      <div className="text-[9px] uppercase tracking-wider">Glifo {step}/3</div>
                      <div className="font-bold mt-0.5">
                        {isDone ? `★ #${unlockedCosmicCoords[step - 1]}` : isCurrent ? 'BUSCANDO' : 'BLOQ.'}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Astronomical Dial Wheel */}
              <div className="bg-black/60 p-4 rounded-2xl border border-slate-800 font-mono text-center relative flex flex-col items-center">
                
                {/* Pointer Indicator */}
                <div className={`w-3.5 h-3.5 rotate-45 mb-1 transition-colors duration-200 ${
                  isResonanceLocked 
                    ? 'bg-emerald-400 shadow-[0_0_15px_rgba(52,211,153,1)]' 
                    : coordDiff <= 2 
                      ? 'bg-amber-400 shadow-[0_0_10px_rgba(251,191,36,0.8)]' 
                      : 'bg-indigo-500'
                }`} />

                {/* Rotating Wheel Disk */}
                <div className="relative w-44 h-44 my-1 select-none flex items-center justify-center">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-b from-slate-800 via-slate-950 to-black border-2 border-indigo-500/40 p-1 flex items-center justify-center shadow-inner">
                    <div 
                      className={`w-full h-full rounded-full bg-gradient-to-br from-slate-900 to-black border transition-all flex items-center justify-center relative ${
                        isResonanceLocked 
                          ? 'border-emerald-400 shadow-[0_0_20px_rgba(52,211,153,0.4)]' 
                          : 'border-slate-700'
                      }`}
                      style={{ 
                        transform: `rotate(${-(cosmicDial / 100) * 360}deg)`,
                        transition: 'transform 0.08s ease-out'
                      }}
                    >
                      {/* Radials */}
                      {[0, 20, 40, 60, 80].map((deg) => {
                        const angle = (deg / 100) * 360;
                        return (
                          <div
                            key={deg}
                            className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 flex flex-col justify-between py-1 pointer-events-none"
                            style={{ transform: `rotate(${angle}deg)` }}
                          >
                            <span className="text-[9px] font-bold text-slate-400 select-none" style={{ transform: `rotate(-${angle}deg)` }}>
                              {deg}
                            </span>
                            <div className="w-0.5 h-1.5 bg-indigo-500/50" />
                          </div>
                        );
                      })}

                      {/* Center Display */}
                      <div className="w-20 h-20 rounded-full bg-black/90 border border-slate-700 flex flex-col items-center justify-center z-10">
                        <span className="text-[8px] text-slate-400">COORD</span>
                        <span className={`text-2xl font-black ${isResonanceLocked ? 'text-emerald-400' : 'text-white'}`}>
                          {cosmicDial}
                        </span>
                        {isResonanceLocked && (
                          <span className="text-[7px] text-emerald-400 font-bold tracking-widest animate-pulse">
                            ¡ENGANCHE!
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Slider */}
                <div className="w-full mt-2">
                  <input
                    type="range"
                    min="0"
                    max="99"
                    step="1"
                    value={cosmicDial}
                    disabled={phase3Solved}
                    onChange={(e) => setCosmicDialDirect(Number(e.target.value))}
                    className="w-full accent-indigo-500 cursor-pointer"
                  />
                </div>

                {/* Step controls */}
                <div className="grid grid-cols-4 gap-1.5 w-full mt-2">
                  <button
                    onClick={() => rotateCosmicDial(-5)}
                    disabled={phase3Solved}
                    className="py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 font-mono text-xs cursor-pointer active:scale-95"
                  >
                    -5
                  </button>
                  <button
                    onClick={() => rotateCosmicDial(-1)}
                    disabled={phase3Solved}
                    className="py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-white font-mono text-xs cursor-pointer active:scale-95"
                  >
                    -1
                  </button>
                  <button
                    onClick={() => rotateCosmicDial(1)}
                    disabled={phase3Solved}
                    className="py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-white font-mono text-xs cursor-pointer active:scale-95"
                  >
                    +1
                  </button>
                  <button
                    onClick={() => rotateCosmicDial(5)}
                    disabled={phase3Solved}
                    className="py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 font-mono text-xs cursor-pointer active:scale-95"
                  >
                    +5
                  </button>
                </div>
              </div>

              {phase3Feedback && (
                <p className={`mt-3 text-xs font-mono p-2 rounded-xl border flex items-center gap-2 ${
                  phase3Feedback.includes('sin alineación')
                    ? 'text-red-400 bg-red-950/40 border-red-800/60'
                    : 'text-cyan-300 bg-cyan-950/40 border-cyan-800/60'
                }`}>
                  <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                  <span>{phase3Feedback}</span>
                </p>
              )}
            </div>

            <div className="mt-4">
              {!phase3Solved ? (
                <button
                  onClick={confirmCosmicCoord}
                  className={`w-full py-3.5 rounded-2xl font-mono font-bold text-xs uppercase tracking-wider shadow-lg cursor-pointer flex items-center justify-center gap-2 transition-all active:scale-98 ${
                    isResonanceLocked
                      ? 'bg-gradient-to-r from-emerald-500 to-cyan-500 text-slate-950 shadow-[0_0_25px_rgba(52,211,153,0.6)] animate-pulse'
                      : 'bg-gradient-to-r from-indigo-600 via-purple-600 to-fuchsia-600 text-white hover:brightness-110'
                  }`}
                >
                  <Orbit className="w-4 h-4" />
                  <span>Fijar Paridad #{cosmicStep} de la Telemetría</span>
                </button>
              ) : (
                <div className="p-3.5 rounded-xl bg-emerald-950/50 border border-emerald-500/40 text-emerald-300 font-mono text-xs flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>¡FASE 3 COMPLETADA: Glifos Decodificados ({unlockedCosmicCoords.join(' · ')})!</span>
                </div>
              )}
            </div>
          </div>

        </div>

        {/* =================================================================== */}
        {/* CLÍMAX: EL PORTAL DE SALTO HIPERESPACIAL AL ESPACIO PROFUNDO */}
        {/* =================================================================== */}
        <div className={`p-8 sm:p-10 rounded-3xl border transition-all duration-500 relative overflow-hidden backdrop-blur-2xl ${
          allSolved
            ? 'bg-gradient-to-b from-cyan-950/40 via-purple-950/30 to-black/80 border-cyan-400/80 shadow-[0_0_50px_rgba(6,182,212,0.3)]'
            : 'bg-black/60 border-slate-800 opacity-90'
        }`}>
          
          <div className="max-w-3xl mx-auto text-center">
            
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/80 border border-cyan-500/40 text-cyan-300 text-xs font-mono font-bold mb-4">
              <Rocket className="w-3.5 h-3.5 text-cyan-400 animate-bounce" />
              <span>HORIZONTE DE SUCESOS // PUERTA AL INFINITO</span>
            </div>

            <h3 className="font-display text-3xl sm:text-4xl font-extrabold text-white mb-3">
              {allSolved ? '¡HIPERSALTO ESTELAR DESBLOQUEADO!' : 'Sincroniza las 3 Anomalías para Abrir el Portal'}
            </h3>

            <p className="text-slate-300 text-sm leading-relaxed mb-6 font-mono">
              {allSolved
                ? 'El desfase de realidades ha convergido en una autopista cuántica hacia el espacio exterior profundo. Las estrellas están a hipervelocidad. Reclama tu Credencial de Viajero Interdimensional o entra directamente al portal para viajar a la web externa.'
                : 'Debes completar la Resonancia Multiversal (01), el Flujo de Singularidad (02) y los Glifos Cósmicos (03) para desbloquear las coordenadas de salto hiperespacial.'}
            </p>

            {/* PORTAL DE REDIRECCIÓN A OTRA PÁGINA WEB AL COMPLETAR TODAS LAS MISIONES */}
            {allSolved && (
              <div className="mb-8 p-6 sm:p-7 rounded-3xl bg-gradient-to-r from-cyan-950/70 via-black/90 to-purple-950/70 border-2 border-cyan-400/80 shadow-[0_0_40px_rgba(6,182,212,0.35)] backdrop-blur-xl text-left font-mono">
                <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-5">
                  <div className="flex-1">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-400/20 text-cyan-300 border border-cyan-400/40 text-[11px] font-bold uppercase tracking-wider mb-2">
                      <Globe className="w-3.5 h-3.5 text-cyan-300" />
                      <span>PORTAL DE TELETRANSPORTACIÓN WEB // ACTIVO</span>
                    </div>

                    <h4 className="text-xl sm:text-2xl font-black text-white font-display">
                      Viajar a la Página Web Externa
                    </h4>
                    <p className="text-slate-300 text-xs sm:text-sm mt-1 leading-relaxed">
                      ¡Has sincronizado las 3 anomalías! El portal interdimensional está listo para redirigirte a tu destino web.
                    </p>

                    {/* Destination URL Display & Quick Editor */}
                    <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
                      <span className="text-slate-400">URL Destino:</span>
                      <span className="px-3 py-1 rounded-xl bg-black/80 border border-cyan-500/50 text-cyan-300 font-bold max-w-full sm:max-w-md truncate">
                        {redirectUrl}
                      </span>
                      <button
                        type="button"
                        onClick={() => {
                          setIsEditingRedirectUrl(!isEditingRedirectUrl);
                          setTempRedirectUrl(redirectUrl);
                        }}
                        className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-700 text-cyan-400 hover:text-white hover:border-cyan-400 transition-all text-xs cursor-pointer flex items-center gap-1"
                      >
                        <Edit2 className="w-3 h-3" />
                        <span>{isEditingRedirectUrl ? 'Cerrar' : 'Personalizar URL'}</span>
                      </button>
                    </div>

                    {isEditingRedirectUrl && (
                      <form
                        onSubmit={(e) => {
                          e.preventDefault();
                          if (tempRedirectUrl.trim()) {
                            setRedirectUrl(tempRedirectUrl.trim());
                            setIsEditingRedirectUrl(false);
                            playLogicSwitch(true);
                          }
                        }}
                        className="mt-3 p-3 rounded-2xl bg-black/80 border border-slate-700 space-y-2"
                      >
                        <span className="text-[11px] text-slate-400 block font-bold">
                          Escribe cualquier enlace o página web a la que quieras ser redirigido:
                        </span>
                        <div className="flex flex-col sm:flex-row gap-2">
                          <input
                            type="text"
                            value={tempRedirectUrl}
                            onChange={(e) => setTempRedirectUrl(e.target.value)}
                            placeholder="https://ejemplo.com o enlace de Discord"
                            required
                            className="flex-1 px-3 py-2 text-xs rounded-xl bg-slate-950 border border-cyan-500/60 text-white focus:outline-none focus:ring-1 focus:ring-cyan-400"
                          />
                          <button
                            type="submit"
                            className="px-4 py-2 rounded-xl bg-cyan-400 text-slate-950 font-bold text-xs hover:brightness-110 cursor-pointer flex items-center justify-center gap-1"
                          >
                            <Check className="w-3.5 h-3.5" />
                            <span>Guardar Enlace</span>
                          </button>
                        </div>
                        {/* Quick Presets */}
                        <div className="flex flex-wrap gap-1.5 pt-1 text-[11px] text-slate-400">
                          <span>Presets rápidos:</span>
                          <button
                            type="button"
                            onClick={() => setTempRedirectUrl('https://discord.gg/Tfbznzrb8g')}
                            className="text-cyan-400 hover:underline cursor-pointer"
                          >
                            Discord Oficial
                          </button>
                          <span>•</span>
                          <button
                            type="button"
                            onClick={() => setTempRedirectUrl('https://google.com')}
                            className="text-cyan-400 hover:underline cursor-pointer"
                          >
                            Google
                          </button>
                          <span>•</span>
                          <button
                            type="button"
                            onClick={() => setTempRedirectUrl('https://youtube.com')}
                            className="text-cyan-400 hover:underline cursor-pointer"
                          >
                            YouTube
                          </button>
                        </div>
                      </form>
                    )}
                  </div>

                  {/* Primary Big Redirection Button */}
                  <div className="w-full lg:w-auto shrink-0 flex flex-col items-center">
                    <a
                      href={getSanitizedRedirectUrl(redirectUrl)}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={handleWarpRedirect}
                      className="w-full lg:w-auto px-8 py-5 rounded-2xl bg-gradient-to-r from-cyan-400 via-teal-300 to-indigo-400 text-slate-950 font-mono font-black text-sm uppercase tracking-wider hover:brightness-110 shadow-[0_0_35px_rgba(6,182,212,0.65)] hover:shadow-[0_0_55px_rgba(6,182,212,0.9)] hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-3 text-center group"
                    >
                      <Rocket className="w-5 h-5 text-slate-950 group-hover:rotate-12 transition-transform" />
                      <span>Redirigir a la Página Web</span>
                      <ExternalLink className="w-4 h-4 text-slate-950" />
                    </a>
                    <span className="text-[10px] text-cyan-300/80 font-mono mt-2 flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-cyan-400" />
                      Abre en una nueva pestaña segura
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Crew Registration */}
            {allSolved && !passportIssued && (
              <form onSubmit={handleIssuePassport} className="space-y-6 text-left">
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-2 font-bold">
                    REGISTRA TU DISCORD TAG O APODO:
                  </label>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <input
                      type="text"
                      value={discordTag}
                      onChange={(e) => setDiscordTag(e.target.value)}
                      placeholder="Ej: Usuario#1234 o @nick"
                      required
                      className="flex-1 px-4 py-3 rounded-2xl bg-black/70 border border-slate-700 text-white font-mono text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
                    />
                    <button
                      type="submit"
                      className="px-6 py-3 rounded-2xl bg-gradient-to-r from-cyan-500 via-teal-400 to-indigo-500 text-slate-950 font-mono font-bold text-xs uppercase tracking-wider hover:brightness-110 shadow-[0_0_20px_rgba(6,182,212,0.5)] cursor-pointer active:scale-95 transition-all"
                    >
                      Generar Credencial Cuántica
                    </button>
                  </div>
                </div>
              </form>
            )}

            {/* Issued Passport Card */}
            {passportIssued && (
              <div className="p-6 sm:p-8 rounded-3xl bg-black/80 border-2 border-cyan-400/80 shadow-[0_0_40px_rgba(6,182,212,0.35)] text-left font-mono">
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4 mb-4">
                  <div>
                    <span className="text-[10px] text-cyan-400 tracking-widest uppercase block">
                      CREDENCIAL DE VIAJERO INTERDIMENSIONAL // LOS DADDYS®
                    </span>
                    <span className="text-xl sm:text-2xl font-black text-white">
                      {discordTag}
                    </span>
                  </div>
                  <div className="px-3 py-1 rounded-xl bg-cyan-500/20 border border-cyan-400 text-cyan-300 text-xs font-bold">
                    {passportId}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-slate-300 mb-6">
                  <div>
                    <span className="text-slate-500 block text-[10px]">ESTATUS:</span>
                    <strong className="text-cyan-400">TRIPULANTE OFICIAL</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[10px]">ESTADO DIMENSIONAL:</span>
                    <strong className="text-emerald-400">100% ACOPLADO AL VACÍO</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[10px]">DESTINO DEL SALTO:</span>
                    <strong className="text-fuchsia-400">HIPERESPACIO ESTELAR</strong>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-cyan-950/40 border border-cyan-500/30 text-cyan-200 text-xs flex flex-col sm:flex-row items-center justify-between gap-4">
                  <span>
                    🚀 ¡Bienvenido a la tripulación estelar! Comparte tu ID cuántica <strong className="text-white">#{passportId}</strong> en el canal de Discord.
                  </span>
                  <div className="flex items-center gap-2 shrink-0">
                    <a
                      href={getSanitizedRedirectUrl(redirectUrl)}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={handleWarpRedirect}
                      className="px-4 py-2.5 rounded-xl bg-cyan-400 text-slate-950 font-bold hover:brightness-110 flex items-center gap-1.5 shadow-[0_0_15px_rgba(6,182,212,0.4)] cursor-pointer active:scale-95 transition-all"
                    >
                      <span>Ir a la Web Externa</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                    <a
                      href="#inicio"
                      className="px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-slate-300 hover:text-white transition-colors"
                    >
                      Volver al Inicio
                    </a>
                  </div>
                </div>
              </div>
            )}

          </div>

        </div>

      </div>

      {/* Admin Password Modal */}
      {isAdminModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
          <div 
            className="w-full max-w-md p-6 sm:p-7 rounded-3xl bg-slate-950/95 border-2 border-cyan-500/50 shadow-[0_0_50px_rgba(6,182,212,0.3)] text-left font-mono relative overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Ambient cyan glow */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />

            <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-800">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-cyan-950/80 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
                  <Shield className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-white font-display uppercase tracking-wider">
                    Terminal Admin
                  </h4>
                  <span className="text-[10px] text-slate-400 block">
                    Acceso Restringido // Modo Control
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsAdminModalOpen(false)}
                className="p-1.5 rounded-lg bg-slate-900 text-slate-400 hover:text-white border border-slate-800 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed mb-5">
              Introduce la clave de autorización para desbloquear y completar automáticamente todas las anomalías cósmicas.
            </p>

            <form onSubmit={handleAdminSubmit} className="space-y-4">
              <div>
                <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                  Clave de Acceso:
                </label>
                <input
                  type="password"
                  value={adminPasswordInput}
                  onChange={(e) => {
                    setAdminPasswordInput(e.target.value);
                    if (adminError) setAdminError(null);
                  }}
                  placeholder="Introduce la clave de acceso..."
                  autoFocus
                  required
                  className="w-full px-4 py-3 rounded-xl bg-black/80 border border-slate-700 text-white text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 placeholder:text-slate-600"
                />
              </div>

              {adminError && (
                <div className="p-3 rounded-xl bg-red-950/40 border border-red-800/60 text-red-300 text-xs flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 shrink-0 text-red-400" />
                  <span>{adminError}</span>
                </div>
              )}

              <div className="flex items-center gap-2 pt-2">
                <button
                  type="submit"
                  className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 text-slate-950 font-bold text-xs uppercase tracking-wider hover:brightness-110 shadow-[0_0_20px_rgba(6,182,212,0.4)] cursor-pointer active:scale-95 transition-all"
                >
                  Completar Todas las Misiones
                </button>
                <button
                  type="button"
                  onClick={() => setIsAdminModalOpen(false)}
                  className="py-3 px-4 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white text-xs cursor-pointer"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </section>
  );
};
