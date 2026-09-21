import React, { useState } from 'react';
import { ServerConfig } from '../types';
import { SAMPLE_LEADERBOARD } from '../config/defaultConfig';
import { 
  Trophy, 
  RefreshCw, 
  ExternalLink, 
  Search, 
  ShieldAlert, 
  Coins, 
  Building2, 
  Sparkles,
  LayoutList,
  Frame
} from 'lucide-react';

interface LeaderboardSectionProps {
  config: ServerConfig;
}

export const LeaderboardSection: React.FC<LeaderboardSectionProps> = ({ config }) => {
  const [iframeKey, setIframeKey] = useState(0);
  const [viewMode, setViewMode] = useState<'iframe' | 'interactive'>('iframe');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'total' | 'cash' | 'bank'>('total');
  const [iframeLoaded, setIframeLoaded] = useState(false);

  const handleRefreshIframe = () => {
    setIframeLoaded(false);
    setIframeKey((prev) => prev + 1);
  };

  const filteredLeaderboard = SAMPLE_LEADERBOARD.filter(
    (user) =>
      user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (user.role && user.role.toLowerCase().includes(searchTerm.toLowerCase()))
  ).sort((a, b) => b[sortBy] - a[sortBy]);

  return (
    <section id="leaderboard" className="py-16 md:py-24 bg-[#0d1322] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-3">
              <Trophy className="w-4 h-4 text-amber-400" />
              <span>Ranking del Servidor</span>
            </div>
            <h2 className="font-display text-3xl sm:text-5xl font-black text-white tracking-tight">
              Top Ricos
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-400 font-medium flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Actualiza automáticamente según la actividad registrada por el bot
            </p>
          </div>

          {/* View Mode & Controls Toggle */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="bg-slate-900 p-1 rounded-xl border border-slate-800 flex items-center gap-1">
              <button
                onClick={() => setViewMode('iframe')}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-bold transition-all ${
                  viewMode === 'iframe'
                    ? 'bg-emerald-500 text-slate-950 shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Frame className="w-3.5 h-3.5" />
                <span>Iframe UnbelievaBoat</span>
              </button>
              
              <button
                onClick={() => setViewMode('interactive')}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-bold transition-all ${
                  viewMode === 'interactive'
                    ? 'bg-emerald-500 text-slate-950 shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <LayoutList className="w-3.5 h-3.5" />
                <span>Vista Lista Interactiva</span>
              </button>
            </div>

            <a
              href={config.leaderboardIframeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-800 text-slate-200 hover:text-white hover:bg-slate-700 border border-slate-700/80 transition-all"
              title="Abrir leaderboard completo en pestaña nueva"
            >
              <ExternalLink className="w-3.5 h-3.5 text-cyan-400" />
              <span className="hidden sm:inline">Pestaña nueva</span>
            </a>
          </div>
        </div>

        {/* Content Container */}
        {viewMode === 'iframe' ? (
          <div className="glass-card rounded-3xl p-2 sm:p-4 border border-slate-800/80 overflow-hidden relative min-h-[580px]">
            
            {/* Top Toolbar */}
            <div className="flex items-center justify-between px-4 py-3 bg-slate-900/90 rounded-2xl border border-slate-800 mb-3 text-xs text-slate-400">
              <div className="flex items-center gap-2 truncate">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                <span className="font-mono text-slate-300 truncate">
                  {config.leaderboardIframeUrl}
                </span>
              </div>
              <button
                onClick={handleRefreshIframe}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white transition-all font-semibold"
                title="Recargar iframe"
              >
                <RefreshCw className="w-3.5 h-3.5 text-emerald-400" />
                <span>Actualizar</span>
              </button>
            </div>

            {/* Iframe Loading Notice */}
            {!iframeLoaded && (
              <div className="absolute inset-x-6 top-24 bottom-6 rounded-2xl bg-slate-950/80 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center z-10">
                <div className="w-12 h-12 rounded-full border-4 border-emerald-500/20 border-t-emerald-400 animate-spin mb-4" />
                <p className="text-white font-bold text-lg">Cargando Leaderboard de UnbelievaBoat...</p>
                <p className="text-slate-400 text-xs max-w-md mt-1">
                  Si el embed tarda o no carga debido a restricciones de dominio, puedes presionar "Pestaña nueva" o cambiar a "Vista Lista Interactiva".
                </p>
              </div>
            )}

            {/* Iframe element */}
            <div className="relative w-full h-[620px] rounded-2xl overflow-hidden bg-slate-950 border border-slate-800/80">
              <iframe
                key={iframeKey}
                src={config.leaderboardIframeUrl}
                title="Top Ricos Leaderboard UnbelievaBoat"
                className="w-full h-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer"
                onLoad={() => setIframeLoaded(true)}
              />
            </div>

            <div className="mt-3 px-3 py-2 bg-slate-900/60 rounded-xl border border-slate-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-2">
              <div className="flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0" />
                <span>¿No ves tu nombre? Asegúrate de haber usado algún comando en el Discord en las últimas 24 hrs.</span>
              </div>
              <button
                onClick={() => setViewMode('interactive')}
                className="text-emerald-400 hover:underline font-semibold text-xs whitespace-nowrap"
              >
                Ver tabla simplificada →
              </button>
            </div>
          </div>
        ) : (
          /* Interactive Fallback Leaderboard */
          <div className="glass-card rounded-3xl p-4 sm:p-6 border border-slate-800/80 space-y-6">
            
            {/* Search and Sort controls */}
            <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 bg-slate-900/80 p-4 rounded-2xl border border-slate-800">
              <div className="relative flex-1">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Buscar usuario o rol en la tabla..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500/80 transition-all"
                />
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-400 font-medium">Ordenar por:</span>
                <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800">
                  <button
                    onClick={() => setSortBy('total')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      sortBy === 'total' ? 'bg-emerald-500 text-slate-950' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Total
                  </button>
                  <button
                    onClick={() => setSortBy('cash')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      sortBy === 'cash' ? 'bg-emerald-500 text-slate-950' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Efectivo
                  </button>
                  <button
                    onClick={() => setSortBy('bank')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      sortBy === 'bank' ? 'bg-emerald-500 text-slate-950' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Banco
                  </button>
                </div>
              </div>
            </div>

            {/* Leaderboard Table */}
            <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-950">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 bg-slate-900/90 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    <th className="py-4 px-4 text-center w-16">Puesto</th>
                    <th className="py-4 px-4">Usuario</th>
                    <th className="py-4 px-4 text-right">
                      <div className="inline-flex items-center gap-1">
                        <Coins className="w-3.5 h-3.5 text-amber-400" />
                        <span>Efectivo</span>
                      </div>
                    </th>
                    <th className="py-4 px-4 text-right">
                      <div className="inline-flex items-center gap-1">
                        <Building2 className="w-3.5 h-3.5 text-cyan-400" />
                        <span>Banco</span>
                      </div>
                    </th>
                    <th className="py-4 px-4 text-right">
                      <div className="inline-flex items-center gap-1">
                        <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Total Patrimonio</span>
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-sm">
                  {filteredLeaderboard.length > 0 ? (
                    filteredLeaderboard.map((user) => {
                      const isTop3 = user.rank <= 3;
                      return (
                        <tr
                          key={user.rank}
                          className="hover:bg-slate-900/60 transition-colors group"
                        >
                          <td className="py-4 px-4 text-center font-bold">
                            {user.rank === 1 && (
                              <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/40 font-black text-base shadow-[0_0_12px_rgba(245,158,11,0.3)]">
                                🥇
                              </span>
                            )}
                            {user.rank === 2 && (
                              <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-slate-300/20 text-slate-200 border border-slate-300/40 font-black text-base">
                                🥈
                              </span>
                            )}
                            {user.rank === 3 && (
                              <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-amber-700/20 text-amber-500 border border-amber-600/40 font-black text-base">
                                🥉
                              </span>
                            )}
                            {user.rank > 3 && (
                              <span className="text-slate-500 font-mono text-sm">
                                #{user.rank}
                              </span>
                            )}
                          </td>
                          <td className="py-4 px-4">
                            <div className="flex items-center gap-3">
                              <img
                                src={user.avatarUrl}
                                alt={user.username}
                                className="w-10 h-10 rounded-full object-cover border border-slate-700/80 group-hover:border-emerald-500/50 transition-colors"
                              />
                              <div>
                                <div className="font-bold text-white text-base flex items-center gap-2">
                                  <span>{user.username}</span>
                                  <span className="text-slate-500 font-normal text-xs">
                                    #{user.discriminator}
                                  </span>
                                </div>
                                {user.role && (
                                  <span className={`inline-block mt-0.5 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider rounded-md border ${user.roleColor || 'border-slate-700 text-slate-400 bg-slate-800'}`}>
                                    {user.role}
                                  </span>
                                )}
                              </div>
                            </div>
                          </td>
                          <td className="py-4 px-4 text-right font-mono text-slate-300 font-medium">
                            {config.currencyEmoji} {user.cash.toLocaleString('es-ES')}
                          </td>
                          <td className="py-4 px-4 text-right font-mono text-slate-300 font-medium">
                            {config.currencyEmoji} {user.bank.toLocaleString('es-ES')}
                          </td>
                          <td className="py-4 px-4 text-right">
                            <span className={`font-mono font-bold text-base ${isTop3 ? 'text-emerald-400 drop-shadow-[0_0_8px_rgba(16,185,129,0.3)]' : 'text-white'}`}>
                              {config.currencyEmoji} {user.total.toLocaleString('es-ES')}
                            </span>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan={5} className="py-8 text-center text-slate-500 text-sm">
                        No se encontraron usuarios con "{searchTerm}"
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="text-xs text-slate-400 text-center pt-2">
              Nota: Esta tabla de ejemplo ilustra la estructura. El iframe de UnbelievaBoat reflejará los datos exactos en directo.
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
