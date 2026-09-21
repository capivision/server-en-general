import React, { useState } from 'react';
import { ServerConfig } from '../types';
import { CASINO_LIMITS } from '../config/defaultConfig';
import { 
  Dices, 
  ShieldAlert, 
  AlertTriangle, 
  Scale, 
  Sparkles,
  Gamepad2,
  Clock,
  Ban,
  RotateCcw
} from 'lucide-react';

interface CasinoRulesProps {
  config: ServerConfig;
}

export const CasinoRules: React.FC<CasinoRulesProps> = ({ config }) => {
  // Mini Casino Simulator State
  const [simulatorMode, setSimulatorMode] = useState<'roulette' | 'slots' | 'coinflip'>('roulette');
  const [simBalance, setSimBalance] = useState<number>(10000);
  const [simBet, setSimBet] = useState<number>(500);
  const [simResult, setSimResult] = useState<string | null>(null);
  const [isSpinning, setIsSpinning] = useState<boolean>(false);
  const [selectedColor, setSelectedColor] = useState<'red' | 'black' | 'green'>('red');

  const rulesList = [
    {
      title: 'Cero Spam de Comandos',
      desc: 'Prohibido usar comandos repetitivos sin respetar los cooldowns o saturar canales no destinados al bot.',
      icon: Ban,
    },
    {
      title: 'Límites de Apuesta Respetados',
      desc: 'Cada juego tiene una apuesta mínima y máxima estricta. El sistema cancelará transacciones fuera de rango.',
      icon: Scale,
    },
    {
      title: 'Prohibido Uso de Multi-cuentas',
      desc: 'No se permite usar cuentas alts para transferir !collect-income o farmear monedas de bienvenida a tu cuenta principal.',
      icon: ShieldAlert,
    },
    {
      title: 'Sanción por Abuso de Errores',
      desc: 'Si descubres un bug en el bot o sistema de economía, debes reportarlo al staff. Explotarlo acarrea ban permanente.',
      icon: AlertTriangle,
    },
  ];

  // Mini simulator logic
  const handlePlaySimulator = () => {
    if (simBet > simBalance) {
      setSimResult('❌ No tienes suficientes monedas ficticias en el simulador.');
      return;
    }

    setIsSpinning(true);
    setSimResult(null);

    setTimeout(() => {
      setIsSpinning(false);

      if (simulatorMode === 'roulette') {
        const rand = Math.random();
        let outcomeColor: 'red' | 'black' | 'green' = 'red';
        if (rand < 0.05) outcomeColor = 'green';
        else if (rand < 0.525) outcomeColor = 'red';
        else outcomeColor = 'black';

        if (outcomeColor === selectedColor) {
          const multiplier = outcomeColor === 'green' ? 14 : 2;
          const winAmount = simBet * multiplier;
          setSimBalance((prev) => prev + winAmount - simBet);
          setSimResult(`🎉 ¡Ganaste! Salió ${outcomeColor.toUpperCase()} (+${config.currencyEmoji} ${winAmount.toLocaleString()})`);
        } else {
          setSimBalance((prev) => prev - simBet);
          setSimResult(`💔 Perdiste. Salió ${outcomeColor.toUpperCase()} (-${config.currencyEmoji} ${simBet.toLocaleString()})`);
        }
      } else if (simulatorMode === 'slots') {
        const symbols = ['🍒', '🍋', '🔔', '💎', '7️⃣'];
        const s1 = symbols[Math.floor(Math.random() * symbols.length)];
        const s2 = symbols[Math.floor(Math.random() * symbols.length)];
        const s3 = symbols[Math.floor(Math.random() * symbols.length)];

        if (s1 === s2 && s2 === s3) {
          const winAmount = simBet * 10;
          setSimBalance((prev) => prev + winAmount - simBet);
          setSimResult(`🎰 [ ${s1} | ${s2} | ${s3} ] ¡JACKPOT x10! (+${config.currencyEmoji} ${winAmount.toLocaleString()})`);
        } else if (s1 === s2 || s2 === s3 || s1 === s3) {
          const winAmount = simBet * 2;
          setSimBalance((prev) => prev + winAmount - simBet);
          setSimResult(`🎰 [ ${s1} | ${s2} | ${s3} ] Par igual (+${config.currencyEmoji} ${winAmount.toLocaleString()})`);
        } else {
          setSimBalance((prev) => prev - simBet);
          setSimResult(`🎰 [ ${s1} | ${s2} | ${s3} ] Sin combinación (-${config.currencyEmoji} ${simBet.toLocaleString()})`);
        }
      } else if (simulatorMode === 'coinflip') {
        const win = Math.random() > 0.5;
        if (win) {
          const winAmount = simBet * 2;
          setSimBalance((prev) => prev + winAmount - simBet);
          setSimResult(`🪙 ¡Cara! Duplicaste tu apuesta (+${config.currencyEmoji} ${winAmount.toLocaleString()})`);
        } else {
          setSimBalance((prev) => prev - simBet);
          setSimResult(`🪙 ¡Cruz! La moneda no estuvo a tu favor (-${config.currencyEmoji} ${simBet.toLocaleString()})`);
        }
      }
    }, 800);
  };

  return (
    <section id="casino-reglas" className="py-16 md:py-24 bg-[#0d1322] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-bold uppercase tracking-wider mb-3">
            <Dices className="w-4 h-4 text-purple-400" />
            <span>Fair Play & Casino</span>
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-black text-white tracking-tight">
            Casino y Reglas de Juego
          </h2>
          <p className="mt-4 text-slate-300 text-base sm:text-lg">
            Mantén un juego limpio y conoce los límites oficiales para evitar penalizaciones en tu cuenta de economía.
          </p>
        </div>

        {/* Rules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {rulesList.map((rule) => {
            const Icon = rule.icon;
            return (
              <div
                key={rule.title}
                className="glass-card rounded-2xl p-6 border border-slate-800 flex items-start gap-4 hover:border-purple-500/30 transition-all"
              >
                <div className="p-3 rounded-2xl bg-purple-500/10 text-purple-400 border border-purple-500/20 shrink-0">
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-lg text-white mb-1">
                    {rule.title}
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    {rule.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Table of Limits */}
        <div className="glass-card rounded-3xl p-6 sm:p-8 border border-slate-800/80 mb-16">
          <div className="flex items-center gap-3 mb-6">
            <Scale className="w-6 h-6 text-emerald-400" />
            <h3 className="font-display text-2xl font-bold text-white">
              Tabla de Límites, Cooldowns y Penalizaciones
            </h3>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-950">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-900/90 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  <th className="py-4 px-4">Juego / Comando</th>
                  <th className="py-4 px-4">Apuesta Mínima</th>
                  <th className="py-4 px-4">Apuesta Máxima</th>
                  <th className="py-4 px-4">
                    <div className="inline-flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Cooldown</span>
                    </div>
                  </th>
                  <th className="py-4 px-4">Penalización / Sanción</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-sm">
                {CASINO_LIMITS.map((row) => (
                  <tr key={row.game} className="hover:bg-slate-900/50 transition-colors">
                    <td className="py-4 px-4 font-bold text-white flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-purple-400"></span>
                      {row.game}
                    </td>
                    <td className="py-4 px-4 font-mono text-emerald-400 font-medium">
                      {row.minBet}
                    </td>
                    <td className="py-4 px-4 font-mono text-cyan-400 font-semibold">
                      {row.maxBet}
                    </td>
                    <td className="py-4 px-4 text-slate-300 font-mono text-xs">
                      {row.cooldown}
                    </td>
                    <td className="py-4 px-4 text-amber-400 text-xs font-medium">
                      {row.penalty}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Mini Interactive Web Casino Simulator */}
        <div className="glass-card rounded-3xl p-6 sm:p-8 border border-purple-500/30 relative overflow-hidden bg-gradient-to-br from-slate-900/90 via-[#111827] to-[#0d1322]">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-purple-500/20 text-purple-300 border border-purple-500/30">
                <Gamepad2 className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-display text-2xl font-bold text-white flex items-center gap-2">
                  Simulador de Casino Demo
                  <span className="px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 text-xs font-semibold">
                    Probador Web
                  </span>
                </h3>
                <p className="text-slate-400 text-xs">
                  Prueba la dinámica de las apuestas antes de jugar en el servidor de Discord
                </p>
              </div>
            </div>

            {/* Mode selection buttons */}
            <div className="flex items-center gap-1 bg-slate-950 p-1.5 rounded-xl border border-slate-800 text-xs">
              <button
                onClick={() => setSimulatorMode('roulette')}
                className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                  simulatorMode === 'roulette' ? 'bg-purple-500 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                Ruleta
              </button>
              <button
                onClick={() => setSimulatorMode('slots')}
                className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                  simulatorMode === 'slots' ? 'bg-purple-500 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                Tragaperras
              </button>
              <button
                onClick={() => setSimulatorMode('coinflip')}
                className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                  simulatorMode === 'coinflip' ? 'bg-purple-500 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                Moneda
              </button>
            </div>
          </div>

          <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            {/* Balance and Controls */}
            <div className="space-y-4">
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 flex items-center justify-between">
                <span className="text-xs text-slate-400">Saldo Demo:</span>
                <span className="font-mono text-emerald-400 font-bold text-lg">
                  {config.currencyEmoji} {simBalance.toLocaleString()}
                </span>
              </div>

              <div>
                <label className="block text-xs text-slate-400 mb-1">
                  Monto de apuesta ({config.currencyEmoji}):
                </label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    value={simBet}
                    onChange={(e) => setSimBet(Math.max(10, Number(e.target.value)))}
                    className="w-full bg-slate-900 border border-slate-800 px-3 py-2 rounded-xl font-mono text-sm text-white focus:outline-none focus:border-purple-500"
                  />
                  <button
                    onClick={() => setSimBet(simBalance)}
                    className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-200 rounded-xl"
                  >
                    ALL
                  </button>
                </div>
              </div>

              {simulatorMode === 'roulette' && (
                <div>
                  <label className="block text-xs text-slate-400 mb-1">Elige color:</label>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      onClick={() => setSelectedColor('red')}
                      className={`py-2 rounded-xl font-bold text-xs border ${
                        selectedColor === 'red'
                          ? 'bg-red-600 text-white border-red-400 shadow-sm'
                          : 'bg-red-950/40 text-red-300 border-red-900/40'
                      }`}
                    >
                      Rojo (x2)
                    </button>
                    <button
                      onClick={() => setSelectedColor('black')}
                      className={`py-2 rounded-xl font-bold text-xs border ${
                        selectedColor === 'black'
                          ? 'bg-slate-800 text-white border-slate-400 shadow-sm'
                          : 'bg-slate-900 text-slate-400 border-slate-800'
                      }`}
                    >
                      Negro (x2)
                    </button>
                    <button
                      onClick={() => setSelectedColor('green')}
                      className={`py-2 rounded-xl font-bold text-xs border ${
                        selectedColor === 'green'
                          ? 'bg-emerald-600 text-white border-emerald-400 shadow-sm'
                          : 'bg-emerald-950/40 text-emerald-300 border-emerald-900/40'
                      }`}
                    >
                      Verde (x14)
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Play Button & Display */}
            <div className="md:col-span-2 flex flex-col items-center justify-center p-6 bg-slate-900/80 rounded-2xl border border-slate-800 text-center">
              <button
                onClick={handlePlaySimulator}
                disabled={isSpinning}
                className="w-full sm:w-auto px-8 py-3.5 rounded-2xl font-bold text-sm bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg hover:brightness-110 active:scale-95 disabled:opacity-50 transition-all flex items-center justify-center gap-2 mb-4"
              >
                {isSpinning ? (
                  <>
                    <RotateCcw className="w-4 h-4 animate-spin" />
                    <span>Girando...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Probar Suerte ({simulatorMode.toUpperCase()})</span>
                  </>
                )}
              </button>

              {simResult && (
                <div className="p-4 rounded-xl bg-slate-950 border border-purple-500/30 text-white font-medium text-sm animate-in fade-in max-w-md">
                  {simResult}
                </div>
              )}

              {!simResult && !isSpinning && (
                <p className="text-slate-500 text-xs">
                  Aplica únicamente a este simulador web para entretenimiento demostrativo.
                </p>
              )}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
