import React, { useState } from 'react';
import { ServerConfig } from '../types';
import { ECONOMY_COMMANDS } from '../config/defaultConfig';
import { 
  MessageSquare, 
  Gift, 
  Dices, 
  Zap, 
  Terminal, 
  Copy, 
  Check, 
  Sparkles,
  Clock,
  ArrowUpRight
} from 'lucide-react';

interface EarningWaysProps {
  config: ServerConfig;
}

export const EarningWays: React.FC<EarningWaysProps> = ({ config }) => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('todos');

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const earningCards = [
    {
      title: 'Mensajes y Actividad',
      description: 'Obtén ingresos pasivos de monedas simplemente chateando en los canales de texto o participando en llamadas de voz.',
      icon: MessageSquare,
      badge: 'Automático',
      badgeColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
      gradient: 'from-emerald-500/20 to-teal-500/10',
      iconBg: 'bg-emerald-500/20 text-emerald-400',
    },
    {
      title: 'Ingreso Diario & Trabajo',
      description: 'Reclama tu ingreso diario y trabaja o comete crímenes con comandos periódicos para hacer crecer tu fortuna.',
      icon: Gift,
      badge: 'Recompensa Fija',
      badgeColor: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30',
      gradient: 'from-cyan-500/20 to-blue-500/10',
      iconBg: 'bg-cyan-500/20 text-cyan-400',
    },
    {
      title: 'Minijuegos & Casino',
      description: 'Pon a prueba tu suerte en la ruleta, blackjack, tragaperras y peleas. ¡Estrategia de alto riesgo y alta recompensa!',
      icon: Dices,
      badge: 'Multiplicadores',
      badgeColor: 'bg-purple-500/10 text-purple-400 border-purple-500/30',
      gradient: 'from-purple-500/20 to-pink-500/10',
      iconBg: 'bg-purple-500/20 text-purple-400',
    },
    {
      title: 'Eventos Especiales',
      description: 'Participa en sorteos, trivias, gotas de botín (drops) y multiplicadores x2 de fin de semana en canales específicos.',
      icon: Zap,
      badge: 'Bono Temporal',
      badgeColor: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
      gradient: 'from-amber-500/20 to-orange-500/10',
      iconBg: 'bg-amber-500/20 text-amber-400',
    },
  ];

  const filteredCommands = activeCategory === 'todos' 
    ? ECONOMY_COMMANDS 
    : ECONOMY_COMMANDS.filter(cmd => cmd.category === activeCategory);

  return (
    <section id="ganar-monedas" className="py-16 md:py-24 bg-[#0b0f17] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span>Formas de Ganar</span>
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-black text-white tracking-tight">
            Economía & Cómo Ganar {config.currencyName}
          </h2>
          <p className="mt-4 text-slate-300 text-base sm:text-lg">
            Descubre todas las formas de acumular riquezas en el servidor de Discord usando los comandos de UnbelievaBoat.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {earningCards.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.title}
                className="glass-card glass-card-hover rounded-3xl p-6 border border-slate-800 flex flex-col justify-between relative overflow-hidden group"
              >
                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${card.gradient} blur-2xl pointer-events-none rounded-full`} />
                
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className={`w-12 h-12 rounded-2xl ${card.iconBg} flex items-center justify-center font-bold shadow-md`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold border ${card.badgeColor}`}>
                      {card.badge}
                    </span>
                  </div>

                  <h3 className="font-display font-bold text-xl text-white mb-2 group-hover:text-emerald-400 transition-colors">
                    {card.title}
                  </h3>

                  <p className="text-slate-400 text-sm leading-relaxed">
                    {card.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs font-semibold text-slate-400">
                  <span>Recompensa en {config.currencyEmoji}</span>
                  <ArrowUpRight className="w-4 h-4 text-emerald-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Discord Commands Cheat Sheet */}
        <div className="glass-card rounded-3xl p-6 sm:p-8 border border-slate-800/80">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <Terminal className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-display text-2xl font-bold text-white">
                  Comandos de Economía en Discord
                </h3>
                <p className="text-slate-400 text-sm">
                  Haz clic en cualquier comando para copiarlo e introducirlo en el canal del bot
                </p>
              </div>
            </div>

            {/* Filter Tabs */}
            <div className="flex flex-wrap gap-1.5 bg-slate-900 p-1.5 rounded-xl border border-slate-800 text-xs">
              {['todos', 'básico', 'ganancia', 'casino', 'gestión'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg font-bold capitalize transition-all ${
                    activeCategory === cat
                      ? 'bg-emerald-500 text-slate-950'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Commands Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredCommands.map((cmd, idx) => (
              <div
                key={cmd.command}
                className="bg-slate-950/90 rounded-2xl p-4 border border-slate-800/80 hover:border-emerald-500/40 transition-all group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono-code font-bold text-emerald-400 text-base bg-emerald-950/60 border border-emerald-500/30 px-2.5 py-1 rounded-lg">
                      {cmd.command}
                    </span>
                    
                    <button
                      onClick={() => handleCopy(cmd.example, idx)}
                      className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-all"
                      title="Copiar comando de ejemplo"
                    >
                      {copiedIndex === idx ? (
                        <Check className="w-4 h-4 text-emerald-400" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                  </div>

                  <p className="text-slate-300 text-xs mt-2 leading-relaxed">
                    {cmd.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800/60 flex items-center justify-between text-[11px] text-slate-400 font-mono-code">
                  <span>Ejemplo: {cmd.example}</span>
                  {cmd.cooldown && (
                    <span className="inline-flex items-center gap-1 text-cyan-400 font-semibold">
                      <Clock className="w-3 h-3" />
                      {cmd.cooldown}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
