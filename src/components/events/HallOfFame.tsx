import React, { useState } from 'react';
import { HallOfFameEntry, EventLeaderboardUser } from '../../types';
import { Trophy, Crown, Medal, Flame, Calendar, Award, Star, Search } from 'lucide-react';

interface HallOfFameProps {
  entries: HallOfFameEntry[];
  leaderboard: EventLeaderboardUser[];
}

export const HallOfFame: React.FC<HallOfFameProps> = ({ entries, leaderboard }) => {
  const [activeTab, setActiveTab] = useState<'leaderboard' | 'events_log' | 'records'>('leaderboard');
  const [searchFilter, setSearchFilter] = useState('');

  const filteredLeaderboard = leaderboard.filter((u) =>
    u.userName.toLowerCase().includes(searchFilter.toLowerCase())
  );

  const filteredEntries = entries.filter(
    (e) =>
      e.userName.toLowerCase().includes(searchFilter.toLowerCase()) ||
      e.eventTitle.toLowerCase().includes(searchFilter.toLowerCase())
  );

  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl backdrop-blur-xl">
      {/* Title & Badge */}
      <div className="text-center max-w-2xl mx-auto mb-8">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-amber-500/20 via-yellow-500/20 to-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-bold uppercase tracking-widest mb-3">
          <Crown className="w-4 h-4 text-amber-400" />
          <span>Glorioso Cuadro de Honor</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-black text-white font-display tracking-tight flex items-center justify-center gap-3">
          <span>🏆</span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500">
            Salón de la Fama
          </span>
        </h2>
        <p className="text-slate-400 text-sm mt-2">
          Homenaje permanente a los máximos competidores, campeones legendarios y poseedores de récords de Los Daddys Live.
        </p>
      </div>

      {/* Navigation Sub-Tabs & Search */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 border-b border-slate-800/80 pb-6 mb-8">
        <div className="flex flex-wrap gap-2 w-full md:w-auto">
          <button
            onClick={() => setActiveTab('leaderboard')}
            className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center gap-2 ${
              activeTab === 'leaderboard'
                ? 'bg-amber-500 text-slate-950 shadow-[0_0_20px_rgba(245,158,11,0.3)]'
                : 'bg-slate-950 text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Trophy className="w-4 h-4" />
            <span>Ranking Histórico</span>
          </button>

          <button
            onClick={() => setActiveTab('events_log')}
            className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center gap-2 ${
              activeTab === 'events_log'
                ? 'bg-amber-500 text-slate-950 shadow-[0_0_20px_rgba(245,158,11,0.3)]'
                : 'bg-slate-950 text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Medal className="w-4 h-4" />
            <span>Ganadores por Evento ({entries.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('records')}
            className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center gap-2 ${
              activeTab === 'records'
                ? 'bg-amber-500 text-slate-950 shadow-[0_0_20px_rgba(245,158,11,0.3)]'
                : 'bg-slate-950 text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Flame className="w-4 h-4" />
            <span>Récords Especiales</span>
          </button>
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-64">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Buscar jugador o evento..."
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
          />
        </div>
      </div>

      {/* Tab 1: Ranking Histórico (Global Leaderboard) */}
      {activeTab === 'leaderboard' && (
        <div>
          {/* Top 3 Podium Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {filteredLeaderboard.slice(0, 3).map((usr, index) => {
              const isFirst = index === 0;
              const isSecond = index === 1;

              return (
                <div
                  key={usr.id}
                  className={`relative rounded-2xl p-6 border transition-all flex flex-col items-center text-center ${
                    isFirst
                      ? 'bg-gradient-to-b from-amber-950/40 via-slate-900 to-slate-950 border-amber-500/60 shadow-[0_0_30px_rgba(245,158,11,0.2)] md:-translate-y-2'
                      : isSecond
                      ? 'bg-gradient-to-b from-slate-800/40 via-slate-900 to-slate-950 border-slate-400/50'
                      : 'bg-gradient-to-b from-amber-900/20 via-slate-900 to-slate-950 border-amber-700/40'
                  }`}
                >
                  <div
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-xl mb-3 shadow-lg ${
                      isFirst
                        ? 'bg-amber-400 text-slate-950'
                        : isSecond
                        ? 'bg-slate-300 text-slate-950'
                        : 'bg-amber-700 text-white'
                    }`}
                  >
                    {isFirst ? '👑 1' : isSecond ? '🥈 2' : '🥉 3'}
                  </div>

                  <h3 className="font-bold text-lg text-white font-display mb-1">{usr.userName}</h3>

                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-2.5 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold">
                      🏆 {usr.totalWins} Victorias
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 text-xs font-medium">
                      🎮 {usr.eventsPlayed} Eventos
                    </span>
                  </div>

                  <div className="w-full bg-slate-950/80 rounded-xl p-3 border border-slate-800/80 mt-auto">
                    <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider block">Puntos Acumulados</span>
                    <span className="text-xl font-black text-emerald-400 font-mono">
                      {usr.totalPoints.toLocaleString()} pts
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Full Table */}
          <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-950/60">
            <table className="w-full text-left text-sm text-slate-300">
              <thead className="bg-slate-900/90 text-xs text-slate-400 uppercase border-b border-slate-800 font-mono">
                <tr>
                  <th className="py-3.5 px-4">Posición</th>
                  <th className="py-3.5 px-4">Jugador</th>
                  <th className="py-3.5 px-4">Victorias</th>
                  <th className="py-3.5 px-4">Eventos Jugados</th>
                  <th className="py-3.5 px-4 text-right">Puntos Acumulados</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {filteredLeaderboard.map((usr, idx) => (
                  <tr key={usr.id} className="hover:bg-slate-900/60 transition-colors">
                    <td className="py-3.5 px-4 font-bold font-mono text-slate-400">
                      #{idx + 1}
                    </td>
                    <td className="py-3.5 px-4 font-bold text-white flex items-center gap-2">
                      <span className="w-7 h-7 rounded-full bg-slate-800 flex items-center justify-center text-xs text-amber-400 font-bold">
                        {usr.userName.charAt(0).toUpperCase()}
                      </span>
                      <span>{usr.userName}</span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="inline-flex items-center gap-1 font-semibold text-amber-400">
                        🏆 {usr.totalWins}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-slate-400">{usr.eventsPlayed}</td>
                    <td className="py-3.5 px-4 text-right font-mono font-bold text-emerald-400">
                      {usr.totalPoints.toLocaleString()} pts
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 2: Registro de Ganadores por Evento */}
      {activeTab === 'events_log' && (
        <div className="space-y-4">
          {filteredEntries.map((entry) => (
            <div
              key={entry.id}
              className="bg-slate-950/80 border border-slate-800/80 rounded-2xl p-5 hover:border-amber-500/40 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
            >
              <div className="flex items-start gap-4">
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl font-black shrink-0 ${
                    entry.rank === 1
                      ? 'bg-amber-400/20 text-amber-400 border border-amber-500/40'
                      : entry.rank === 2
                      ? 'bg-slate-400/20 text-slate-300 border border-slate-400/40'
                      : 'bg-amber-800/20 text-amber-600 border border-amber-700/40'
                  }`}
                >
                  {entry.rank === 1 ? '🥇' : entry.rank === 2 ? '🥈' : '🥉'}
                </div>

                <div>
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <span className="font-bold text-white text-base">{entry.userName}</span>
                    {entry.badge && (
                      <span className="px-2.5 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold">
                        {entry.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-400">{entry.eventTitle}</p>
                  <div className="flex items-center gap-3 text-xs text-slate-500 mt-2">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" /> {entry.victoryDate}
                    </span>
                    <span className="flex items-center gap-1 text-emerald-400 font-bold">
                      <Award className="w-3.5 h-3.5" /> Premio: {entry.reward}
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-slate-900 px-4 py-2 rounded-xl border border-slate-800 text-right self-end sm:self-center">
                <span className="text-[10px] text-slate-400 block font-bold uppercase">Puntuación</span>
                <span className="font-mono text-sm font-bold text-amber-400">
                  {entry.score.toLocaleString()} pts
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab 3: Récords Especiales */}
      {activeTab === 'records' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-slate-950 border border-amber-500/30 rounded-2xl p-5 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 text-amber-500/20 text-5xl font-black">⚡</div>
            <span className="px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-400 text-xs font-bold border border-amber-500/30 mb-3 inline-block">
              Reflejos Absolutos
            </span>
            <h4 className="text-base font-bold text-white mb-1">Mejor Tiempo de Reacción</h4>
            <p className="text-2xl font-black text-cyan-400 font-mono mb-2">184 ms</p>
            <span className="text-xs text-slate-400 font-semibold block">Jugador: SpeedyGonzales_DS</span>
          </div>

          <div className="bg-slate-950 border border-emerald-500/30 rounded-2xl p-5 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 text-emerald-500/20 text-5xl font-black">🧠</div>
            <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-bold border border-emerald-500/30 mb-3 inline-block">
              Mente Brillante
            </span>
            <h4 className="text-base font-bold text-white mb-1">Trivia Puntaje Máximo Perfect</h4>
            <p className="text-2xl font-black text-emerald-400 font-mono mb-2">9,850 pts</p>
            <span className="text-xs text-slate-400 font-semibold block">Jugador: KratosGamer_99</span>
          </div>

          <div className="bg-slate-950 border border-purple-500/30 rounded-2xl p-5 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 text-purple-500/20 text-5xl font-black">🔥</div>
            <span className="px-2.5 py-1 rounded-full bg-purple-500/10 text-purple-400 text-xs font-bold border border-purple-500/30 mb-3 inline-block">
              Racha Invicto
            </span>
            <h4 className="text-base font-bold text-white mb-1">Mayor Racha de Victorias</h4>
            <p className="text-2xl font-black text-purple-400 font-mono mb-2">4 Eventos Seguidos</p>
            <span className="text-xs text-slate-400 font-semibold block">Jugador: KratosGamer_99</span>
          </div>
        </div>
      )}
    </div>
  );
};
