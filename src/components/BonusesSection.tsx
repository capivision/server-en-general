import React, { useState } from 'react';
import { ServerConfig } from '../types';
import { 
  Gift, 
  Calendar, 
  CalendarDays, 
  Sparkles, 
  Copy, 
  Check, 
  Clock, 
  TrendingUp, 
  ShieldCheck, 
  Zap, 
  Star, 
  Award,
  HelpCircle,
  Calculator
} from 'lucide-react';

interface BonusesSectionProps {
  config: ServerConfig;
}

interface BonusTier {
  role: string;
  badge: string;
  multiplier: number;
  color: string;
  borderColor: string;
  bgGradient: string;
  description: string;
}

export const BONUS_TIERS: BonusTier[] = [
  {
    role: 'Server Booster',
    badge: '🚀 Boost 2x',
    multiplier: 2.0,
    color: 'text-fuchsia-400',
    borderColor: 'border-fuchsia-500/40',
    bgGradient: 'from-fuchsia-950/30 to-slate-900/80',
    description: 'Aplica a usuarios que mejoran el servidor de Discord con Nitro Boost.',
  },
  {
    role: 'Lvl Diamante',
    badge: '💎 +50% Bonus',
    multiplier: 1.5,
    color: 'text-cyan-400',
    borderColor: 'border-cyan-500/40',
    bgGradient: 'from-cyan-950/30 to-slate-900/80',
    description: 'Otorgado a los usuarios que alcanzan el rango Lvl Diamante en el servidor.',
  },
  {
    role: 'Racha Activa (30+ Días)',
    badge: '🔥 +25% Bonus',
    multiplier: 1.25,
    color: 'text-orange-400',
    borderColor: 'border-orange-500/40',
    bgGradient: 'from-orange-950/30 to-slate-900/80',
    description: 'Para miembros constantes que reclaman sus bonos sin perder la racha.',
  },
  {
    role: 'Miembro Estándar',
    badge: '⭐ 1x Base',
    multiplier: 1.0,
    color: 'text-emerald-400',
    borderColor: 'border-emerald-500/30',
    bgGradient: 'from-emerald-950/20 to-slate-900/80',
    description: 'Recompensa regular acumulable para todos los usuarios del servidor.',
  },
];

export const BonusesSection: React.FC<BonusesSectionProps> = ({ config }) => {
  // Bonus Calculator State
  const [selectedBonusType, setSelectedBonusType] = useState<'weekly' | 'monthly'>('weekly');
  const [isBooster, setIsBooster] = useState(false);
  const [isVIP, setIsVIP] = useState(false);
  const [streakDays, setStreakDays] = useState(0);

  const baseWeekly = 25000;
  const baseMonthly = 120000;

  const baseReward = selectedBonusType === 'weekly' ? baseWeekly : baseMonthly;

  // Calculate multiplier
  let totalMultiplier = 1.0;
  if (isBooster) totalMultiplier += 1.0; // +100%
  if (isVIP) totalMultiplier += 0.5; // +50%
  if (streakDays >= 30) totalMultiplier += 0.25; // +25%
  else if (streakDays >= 7) totalMultiplier += 0.1; // +10%

  const calculatedPayout = Math.floor(baseReward * totalMultiplier);

  return (
    <section id="bonos" className="py-16 md:py-24 bg-[#090d14] relative overflow-hidden border-t border-slate-800/80">
      {/* Background glow effects */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-cyan-500/10 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-emerald-500/10 blur-[130px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-3">
            <Gift className="w-4 h-4 text-emerald-400" />
            <span>Premios & Lealtad</span>
          </div>

          <h2 className="font-display text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            Bonos <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">Semanales</span> y <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400 bg-clip-text text-transparent">Mensuales</span>
          </h2>

          <p className="mt-4 text-slate-300 text-base sm:text-lg">
            Recompensas exclusivas otorgadas al finalizar cada ciclo únicamente a los primeros puestos de la tabla de clasificación (Leaderboard).
          </p>
        </div>

        {/* Featured Bonus Cards (Weekly vs Monthly) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          
          {/* Weekly Bonus Card */}
          <div className="group relative bg-slate-900/80 border border-slate-800 hover:border-emerald-500/50 rounded-3xl p-6 sm:p-8 backdrop-blur-md transition-all duration-300 shadow-xl flex flex-col justify-between">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 blur-[50px] rounded-full pointer-events-none" />
            
            <div>
              <div className="flex items-center justify-between gap-4 mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                    <CalendarDays className="w-7 h-7" />
                  </div>
                  <div>
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400">
                      Premio Semanal
                    </span>
                    <h3 className="font-display font-extrabold text-2xl text-white">
                      Bono Semanal
                    </h3>
                  </div>
                </div>

                <span className="px-3 py-1 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/30 text-xs font-bold flex items-center gap-1">
                  🏆 Solo Top de la Tabla
                </span>
              </div>

              <p className="text-slate-300 text-sm leading-relaxed mb-6">
                El bono semanal es una recompensa especial reservada exclusivamente para los primeros lugares de la tabla de clasificación al finalizar cada semana.
              </p>

              {/* Stats / Details List */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                <div className="bg-slate-950/60 border border-slate-800/80 rounded-2xl p-3.5">
                  <span className="text-[11px] text-slate-400 font-medium block">Bote para Primeros Puestos</span>
                  <span className="font-display font-bold text-lg text-emerald-400">
                    {config.currencyEmoji} 25,000
                  </span>
                </div>
                <div className="bg-slate-950/60 border border-slate-800/80 rounded-2xl p-3.5">
                  <span className="text-[11px] text-slate-400 font-medium block">Frecuencia de Entrega</span>
                  <span className="font-display font-bold text-lg text-slate-200 flex items-center gap-1">
                    <Clock className="w-4 h-4 text-emerald-400 inline" />
                    Cada 7 Días
                  </span>
                </div>
              </div>

              <ul className="space-y-2 text-xs text-slate-300 mb-8">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Otorgado únicamente a los usuarios situados en las primeras posiciones del ranking.</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Se multiplica según las ventajas de Nitro Booster (+100%) o Lvl Diamante (+50%).</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Mantiene la competitividad viva en la economía del servidor.</span>
                </li>
              </ul>
            </div>

            {/* Top Rank Badge Footer */}
            <div className="pt-4 border-t border-slate-800 flex items-center justify-between gap-3 text-xs">
              <span className="text-slate-400 font-medium">Dirigido a:</span>
              <span className="px-3.5 py-1.5 rounded-xl bg-slate-950 border border-emerald-500/30 text-emerald-300 font-mono font-bold">
                🥇 Primeros Puestos del Ranking
              </span>
            </div>
          </div>

          {/* Monthly Bonus Card */}
          <div className="group relative bg-slate-900/80 border border-slate-800 hover:border-cyan-500/50 rounded-3xl p-6 sm:p-8 backdrop-blur-md transition-all duration-300 shadow-xl flex flex-col justify-between">
            <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 blur-[50px] rounded-full pointer-events-none" />
            
            <div>
              <div className="flex items-center justify-between gap-4 mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-3.5 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
                    <Calendar className="w-7 h-7" />
                  </div>
                  <div>
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400">
                      Premio Mensual
                    </span>
                    <h3 className="font-display font-extrabold text-2xl text-white">
                      Bono Mensual
                    </h3>
                  </div>
                </div>

                <span className="px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 text-xs font-bold flex items-center gap-1">
                  👑 Solo Top de la Tabla
                </span>
              </div>

              <p className="text-slate-300 text-sm leading-relaxed mb-6">
                El pozo acumulado mensual premia a los líderes indiscutibles que dominan la tabla de economía de {config.serverName} a fin de mes.
              </p>

              {/* Stats / Details List */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                <div className="bg-slate-950/60 border border-slate-800/80 rounded-2xl p-3.5">
                  <span className="text-[11px] text-slate-400 font-medium block">Bote para Líderes</span>
                  <span className="font-display font-bold text-lg text-cyan-400">
                    {config.currencyEmoji} 120,000
                  </span>
                </div>
                <div className="bg-slate-950/60 border border-slate-800/80 rounded-2xl p-3.5">
                  <span className="text-[11px] text-slate-400 font-medium block">Frecuencia de Entrega</span>
                  <span className="font-display font-bold text-lg text-slate-200 flex items-center gap-1">
                    <Clock className="w-4 h-4 text-cyan-400 inline" />
                    Cada 30 Días
                  </span>
                </div>
              </div>

              <ul className="space-y-2 text-xs text-slate-300 mb-8">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>Gran premio económico entregado al finalizar el mes a los mejores de la tabla.</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>Premia el esfuerzo de quienes mantienen su posición en el ranking de miembros.</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>Compatible con bonificaciones adicionales según rangos de la comunidad.</span>
                </li>
              </ul>
            </div>

            {/* Top Rank Badge Footer */}
            <div className="pt-4 border-t border-slate-800 flex items-center justify-between gap-3 text-xs">
              <span className="text-slate-400 font-medium">Dirigido a:</span>
              <span className="px-3.5 py-1.5 rounded-xl bg-slate-950 border border-cyan-500/30 text-cyan-300 font-mono font-bold">
                👑 Líderes del Top de la Tabla
              </span>
            </div>
          </div>

        </div>

        {/* Interactive Bonus Calculator */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 mb-16 shadow-2xl relative">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8 pb-6 border-b border-slate-800">
            <div>
              <div className="inline-flex items-center gap-2 text-emerald-400 font-mono text-xs font-bold uppercase mb-1">
                <Calculator className="w-4 h-4" />
                Simulador Interactivo
              </div>
              <h3 className="font-display font-extrabold text-2xl text-white">
                Calculadora de Recompensas
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Calcula el premio estimado para los primeros puestos según tus multiplicadores activos.
              </p>
            </div>

            {/* Toggle Weekly / Monthly */}
            <div className="flex items-center bg-slate-950 p-1.5 rounded-2xl border border-slate-800 shrink-0">
              <button
                onClick={() => setSelectedBonusType('weekly')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  selectedBonusType === 'weekly'
                    ? 'bg-emerald-500 text-slate-950 shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Bono Semanal (Top Tabla)
              </button>
              <button
                onClick={() => setSelectedBonusType('monthly')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  selectedBonusType === 'monthly'
                    ? 'bg-cyan-500 text-slate-950 shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Bono Mensual (Top Tabla)
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            
            {/* Options Column */}
            <div className="lg:col-span-2 space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">
                Multiplicadores y Ventajas de tu Cuenta:
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Nitro Booster Toggle */}
                <button
                  onClick={() => setIsBooster(!isBooster)}
                  className={`p-4 rounded-2xl border text-left transition-all flex items-center justify-between ${
                    isBooster
                      ? 'bg-fuchsia-950/40 border-fuchsia-500/60 text-white shadow-[0_0_15px_rgba(217,70,239,0.15)]'
                      : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">🚀</span>
                    <div>
                      <span className="font-bold text-sm block text-white">Server Booster</span>
                      <span className="text-xs text-fuchsia-400 font-semibold">+100% Recompensa</span>
                    </div>
                  </div>
                  <div className={`w-5 h-5 rounded-md border flex items-center justify-center ${isBooster ? 'bg-fuchsia-500 border-fuchsia-400 text-slate-950' : 'border-slate-700'}`}>
                    {isBooster && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                  </div>
                </button>

                {/* Lvl Diamante Toggle */}
                <button
                  onClick={() => setIsVIP(!isVIP)}
                  className={`p-4 rounded-2xl border text-left transition-all flex items-center justify-between ${
                    isVIP
                      ? 'bg-cyan-950/40 border-cyan-500/60 text-white shadow-[0_0_15px_rgba(6,182,212,0.15)]'
                      : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">💎</span>
                    <div>
                      <span className="font-bold text-sm block text-white">Lvl Diamante</span>
                      <span className="text-xs text-cyan-400 font-semibold">+50% Recompensa</span>
                    </div>
                  </div>
                  <div className={`w-5 h-5 rounded-md border flex items-center justify-center ${isVIP ? 'bg-cyan-500 border-cyan-400 text-slate-950' : 'border-slate-700'}`}>
                    {isVIP && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                  </div>
                </button>
              </div>

              {/* Streak Range Selector */}
              <div className="bg-slate-950/60 border border-slate-800/80 rounded-2xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-slate-300 flex items-center gap-2">
                    <FlameIcon className="w-4 h-4 text-orange-400" />
                    Días de Racha Consecutiva:
                  </span>
                  <span className="font-mono text-sm font-bold text-orange-400">
                    {streakDays} Días {streakDays >= 30 ? '(+25% Extra)' : streakDays >= 7 ? '(+10% Extra)' : '(Sin bono)'}
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="60"
                  value={streakDays}
                  onChange={(e) => setStreakDays(Number(e.target.value))}
                  className="w-full accent-orange-500 cursor-pointer bg-slate-800 rounded-lg h-2"
                />
                <div className="flex justify-between text-[10px] text-slate-500 mt-1 font-mono">
                  <span>0 días</span>
                  <span>7 días (+10%)</span>
                  <span>30+ días (+25%)</span>
                  <span>60 días</span>
                </div>
              </div>
            </div>

            {/* Calculated Result Box */}
            <div className="bg-gradient-to-b from-slate-950 to-slate-900 border border-slate-800 rounded-3xl p-6 text-center flex flex-col justify-center items-center shadow-inner relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/10 blur-xl rounded-full pointer-events-none" />

              <span className="text-xs uppercase font-bold text-slate-400 tracking-wider mb-2">
                Pago Estimado ({selectedBonusType === 'weekly' ? 'Semanal' : 'Mensual'})
              </span>

              <div className="text-3xl sm:text-4xl font-black font-display text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 my-2">
                {config.currencyEmoji} {calculatedPayout.toLocaleString('es-ES')}
              </div>

              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono font-bold mt-2">
                <TrendingUp className="w-3.5 h-3.5" />
                Multiplicador Total: {totalMultiplier.toFixed(2)}x
              </div>

              <p className="text-[11px] text-slate-400 mt-4 leading-tight">
                *Los valores son estimados y dependen de los permisos y multiplicadores asignados por el bot en Discord.
              </p>
            </div>

          </div>
        </div>

        {/* Multiplier Roles Breakdown */}
        <div className="mb-12">
          <h3 className="font-display font-extrabold text-xl sm:text-2xl text-white text-center mb-8 flex items-center justify-center gap-2">
            <Award className="w-6 h-6 text-emerald-400" />
            <span>Niveles de Multiplicación Disponibles</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {BONUS_TIERS.map((tier) => (
              <div
                key={tier.role}
                className={`bg-gradient-to-b ${tier.bgGradient} border ${tier.borderColor} rounded-2xl p-5 backdrop-blur-sm relative transition-all hover:translate-y-[-2px]`}
              >
                <div className="flex items-center justify-between gap-2 mb-3">
                  <h4 className="font-display font-bold text-base text-white">
                    {tier.role}
                  </h4>
                  <span className={`text-[11px] font-bold font-mono px-2.5 py-0.5 rounded-full bg-slate-900 ${tier.color} border border-slate-800`}>
                    {tier.badge}
                  </span>
                </div>

                <p className="text-slate-300 text-xs leading-relaxed">
                  {tier.description}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

// Internal icon component for Flame
function FlameIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
    </svg>
  );
}
