import React, { useState, useEffect } from 'react';
import { ServerConfig, EventItem, HallOfFameEntry, EventLeaderboardUser } from '../../types';
import { 
  subscribeToEvents, 
  subscribeToHallOfFame, 
  subscribeToEventLeaderboard, 
  submitParticipation 
} from '../../services/eventService';
import { TriviaGame } from './TriviaGame';
import { ReactionGame } from './ReactionGame';
import { MemoryGame } from './MemoryGame';
import { ObjectHuntGame } from './ObjectHuntGame';
import { RouletteGame } from './RouletteGame';
import { SkillGame } from './SkillGame';
import { CustomGame } from './CustomGame';
import { HallOfFame } from './HallOfFame';
import { EventAdminPanel } from './EventAdminPanel';
import { 
  Sparkles, 
  Trophy, 
  Calendar, 
  Gamepad2, 
  Flame, 
  ShieldCheck, 
  ArrowLeft, 
  Clock, 
  Zap, 
  Gift, 
  Coins, 
  CheckCircle2, 
  Play 
} from 'lucide-react';

interface EventsViewProps {
  config: ServerConfig;
  onBackToHome: () => void;
}

export const EventsView: React.FC<EventsViewProps> = ({ config, onBackToHome }) => {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [hallOfFame, setHallOfFame] = useState<HallOfFameEntry[]>([]);
  const [leaderboard, setLeaderboard] = useState<EventLeaderboardUser[]>([]);

  // Active View Tabs inside Events page
  const [currentTab, setCurrentTab] = useState<'live_events' | 'hall_of_fame'>('live_events');

  // Active Game State
  const [activePlayingEvent, setActivePlayingEvent] = useState<EventItem | null>(null);
  const [userNameInput, setUserNameInput] = useState('');
  const [userAvatar, setUserAvatar] = useState('');
  const [gameStarted, setGameStarted] = useState(false);
  const [submittedScore, setSubmittedScore] = useState<number | null>(null);

  // Admin Modal
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  // Friday Countdown Timer
  const [timeUntilFriday, setTimeUntilFriday] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    // Subscribe to Firestore collections
    const unsubEvents = subscribeToEvents((data) => setEvents(data));
    const unsubHof = subscribeToHallOfFame((data) => setHallOfFame(data));
    const unsubLead = subscribeToEventLeaderboard((data) => setLeaderboard(data));

    return () => {
      unsubEvents();
      unsubHof();
      unsubLead();
    };
  }, []);

  // Calculate Friday Live Countdown
  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();
      const dayOfWeek = now.getDay(); // 0 is Sun, 5 is Fri
      let daysUntilFriday = (5 - dayOfWeek + 7) % 7;
      if (daysUntilFriday === 0 && now.getHours() >= 22) {
        daysUntilFriday = 7;
      }

      const nextFriday = new Date(now);
      nextFriday.setDate(now.getDate() + daysUntilFriday);
      nextFriday.setHours(20, 0, 0, 0);

      const diff = nextFriday.getTime() - now.getTime();
      if (diff > 0) {
        setTimeUntilFriday({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((diff / 1000 / 60) % 60),
          seconds: Math.floor((diff / 1000) % 60)
        });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleStartGameClick = (evt: EventItem) => {
    setActivePlayingEvent(evt);
    setGameStarted(false);
    setSubmittedScore(null);
  };

  const handleConfirmStart = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userNameInput.trim()) {
      alert('Por favor ingresa tu nombre de usuario de Discord para registrar tus puntos.');
      return;
    }
    setGameStarted(true);
  };

  const handleGameFinish = async (score: number, details: any) => {
    if (!activePlayingEvent) return;
    setSubmittedScore(score);

    // Save participation to Firestore
    await submitParticipation(
      activePlayingEvent.id,
      userNameInput.trim(),
      score,
      details?.avgMs || details?.seconds * 1000 || 0,
      details
    );
  };

  return (
    <div className="min-h-screen bg-[#0b0f17] text-slate-100 flex flex-col font-sans selection:bg-emerald-500 selection:text-slate-950 pb-20">
      
      {/* Top Header Bar for Events View */}
      <div className="sticky top-0 z-40 bg-[#0b0f17]/90 backdrop-blur-xl border-b border-slate-800/80 px-4 sm:px-8 py-4 flex items-center justify-between">
        <button
          onClick={onBackToHome}
          className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800 text-xs sm:text-sm font-bold flex items-center gap-2 transition-all"
        >
          <ArrowLeft className="w-4 h-4 text-emerald-400" />
          <span>Volver al Inicio</span>
        </button>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsAdminOpen(true)}
            className="px-3.5 py-2 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-all"
          >
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span className="hidden sm:inline">Panel Admin</span>
          </button>

          <a
            href={config.discordInviteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-400 to-cyan-400 text-slate-950 text-xs font-bold shadow-md hover:brightness-110 flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5 fill-slate-950" />
            <span>Unirse a Discord</span>
          </a>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 w-full">
        
        {/* Main Hero Header Banner */}
        <div className="relative rounded-3xl bg-gradient-to-br from-purple-950/60 via-slate-900 to-cyan-950/60 border border-purple-500/30 p-8 sm:p-12 mb-12 shadow-[0_0_50px_rgba(168,85,247,0.15)] overflow-hidden">
          {/* Decorative Background Accents */}
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Main Welcome Description */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/20 border border-purple-500/40 text-purple-300 text-xs font-extrabold uppercase tracking-widest">
                <Sparkles className="w-4 h-4 text-purple-400" />
                <span>Plataforma Oficial de Competiciones</span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-black text-white font-display tracking-tight leading-tight">
                🎉 ¡Bienvenido a <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400">
                  Los Daddys Live!
                </span>
              </h1>

              <p className="text-slate-300 text-base sm:text-lg leading-relaxed font-medium">
                Todos los viernes podrás participar en eventos exclusivos con premios, minijuegos, desafíos, sorteos y muchas sorpresas.
              </p>

              {/* Feature Bullet Points */}
              <div className="grid grid-cols-2 sm:grid-cols-2 gap-3 pt-2">
                <div className="flex items-center gap-2.5 bg-slate-950/60 p-3 rounded-2xl border border-slate-800/80">
                  <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-sm shrink-0">
                    💰
                  </div>
                  <span className="text-xs sm:text-sm font-bold text-slate-200">Gana recompensas</span>
                </div>

                <div className="flex items-center gap-2.5 bg-slate-950/60 p-3 rounded-2xl border border-slate-800/80">
                  <div className="w-8 h-8 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold text-sm shrink-0">
                    🎮
                  </div>
                  <span className="text-xs sm:text-sm font-bold text-slate-200">Participa en minijuegos</span>
                </div>

                <div className="flex items-center gap-2.5 bg-slate-950/60 p-3 rounded-2xl border border-slate-800/80">
                  <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-sm shrink-0">
                    🏆
                  </div>
                  <span className="text-xs sm:text-sm font-bold text-slate-200">Compite contra otros</span>
                </div>

                <div className="flex items-center gap-2.5 bg-slate-950/60 p-3 rounded-2xl border border-slate-800/80">
                  <div className="w-8 h-8 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center font-bold text-sm shrink-0">
                    🎁
                  </div>
                  <span className="text-xs sm:text-sm font-bold text-slate-200">Consigue premios especiales</span>
                </div>
              </div>

              {/* Footer Banner Badges */}
              <div className="flex flex-wrap items-center gap-4 text-xs font-bold pt-2">
                <span className="px-3.5 py-1.5 rounded-xl bg-slate-950 text-emerald-400 border border-emerald-500/30 flex items-center gap-1.5">
                  📅 Todos los viernes
                </span>
                <span className="px-3.5 py-1.5 rounded-xl bg-slate-950 text-purple-400 border border-purple-500/30 flex items-center gap-1.5">
                  🔥 Los Daddys Live
                </span>
                <span className="px-3.5 py-1.5 rounded-xl bg-slate-950 text-cyan-400 border border-cyan-500/30 flex items-center gap-1.5">
                  💸 Diversión & grandes premios
                </span>
              </div>
            </div>

            {/* Live Friday Countdown Widget */}
            <div className="lg:col-span-5 bg-slate-950/80 border border-purple-500/40 rounded-3xl p-6 sm:p-8 text-center shadow-2xl backdrop-blur-md">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/20 text-red-400 text-[11px] font-bold uppercase tracking-wider mb-4 border border-red-500/30 animate-pulse">
                <Flame className="w-3.5 h-3.5" />
                <span>Próximo Gran Directo Live</span>
              </div>

              <h3 className="text-xl font-black text-white mb-6 font-display">
                Cuenta Regresiva al Viernes
              </h3>

              {/* Counter Grid */}
              <div className="grid grid-cols-4 gap-2 sm:gap-3 mb-6">
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-3">
                  <span className="text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400 font-mono">
                    {timeUntilFriday.days}
                  </span>
                  <span className="text-[10px] text-slate-400 font-bold uppercase block mt-1">Días</span>
                </div>

                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-3">
                  <span className="text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 font-mono">
                    {timeUntilFriday.hours}
                  </span>
                  <span className="text-[10px] text-slate-400 font-bold uppercase block mt-1">Horas</span>
                </div>

                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-3">
                  <span className="text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 font-mono">
                    {timeUntilFriday.minutes}
                  </span>
                  <span className="text-[10px] text-slate-400 font-bold uppercase block mt-1">Mins</span>
                </div>

                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-3">
                  <span className="text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400 font-mono">
                    {timeUntilFriday.seconds}
                  </span>
                  <span className="text-[10px] text-slate-400 font-bold uppercase block mt-1">Segs</span>
                </div>
              </div>

              <a
                href={config.discordInviteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 font-bold text-sm text-white shadow-[0_0_20px_rgba(168,85,247,0.4)] transition-all flex items-center justify-center gap-2"
              >
                <Calendar className="w-4 h-4" />
                <span>Activar Recordatorio en Discord</span>
              </a>
            </div>

          </div>
        </div>

        {/* Section Navigation Tabs */}
        <div className="flex justify-center gap-4 mb-10 border-b border-slate-800 pb-4">
          <button
            onClick={() => setCurrentTab('live_events')}
            className={`px-6 py-3 rounded-2xl font-bold text-sm transition-all flex items-center gap-2 ${
              currentTab === 'live_events'
                ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 shadow-[0_0_20px_rgba(16,185,129,0.3)]'
                : 'bg-slate-900 text-slate-400 hover:text-white'
            }`}
          >
            <Gamepad2 className="w-5 h-5" />
            <span>Eventos Jugables Activos ({events.filter((e) => e.status === 'active').length})</span>
          </button>

          <button
            onClick={() => setCurrentTab('hall_of_fame')}
            className={`px-6 py-3 rounded-2xl font-bold text-sm transition-all flex items-center gap-2 ${
              currentTab === 'hall_of_fame'
                ? 'bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 shadow-[0_0_20px_rgba(245,158,11,0.3)]'
                : 'bg-slate-900 text-slate-400 hover:text-white'
            }`}
          >
            <Trophy className="w-5 h-5" />
            <span>🏆 Salón de la Fama</span>
          </button>
        </div>

        {/* TAB 1: Live Interactive Events Grid */}
        {currentTab === 'live_events' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {events.map((evt) => {
                const isActive = evt.status === 'active';

                return (
                  <div
                    key={evt.id}
                    className="bg-slate-900/80 border border-slate-800/80 hover:border-emerald-500/50 rounded-3xl p-6 transition-all duration-300 flex flex-col justify-between group hover:shadow-[0_0_30px_rgba(16,185,129,0.15)] backdrop-blur-xl relative overflow-hidden"
                  >
                    {/* Top Status & Prize Badge */}
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 ${
                            isActive
                              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 animate-pulse'
                              : 'bg-slate-800 text-slate-400'
                          }`}
                        >
                          <span className="w-2 h-2 rounded-full bg-emerald-400" />
                          {isActive ? 'JUGABLE AHORA' : 'FINALIZADO'}
                        </span>

                        <span className="px-3 py-1 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/30 text-xs font-bold">
                          {evt.prizePool}
                        </span>
                      </div>

                      <h3 className="text-xl font-bold text-white group-hover:text-emerald-400 transition-colors mb-2 font-display">
                        {evt.title}
                      </h3>

                      <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mb-6 line-clamp-3">
                        {evt.description}
                      </p>
                    </div>

                    {/* Game Rules preview & Play Action */}
                    <div className="space-y-4 pt-4 border-t border-slate-800/80">
                      <div className="text-xs text-slate-400 bg-slate-950/60 p-3 rounded-xl border border-slate-800">
                        <span className="font-bold text-slate-300 block mb-0.5">Reglas del juego:</span>
                        <span>{evt.rules}</span>
                      </div>

                      <button
                        onClick={() => handleStartGameClick(evt)}
                        disabled={!isActive}
                        className={`w-full py-3.5 rounded-2xl font-black text-sm flex items-center justify-center gap-2 transition-all shadow-lg ${
                          isActive
                            ? 'bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 text-slate-950 hover:brightness-110 shadow-[0_0_20px_rgba(16,185,129,0.3)] active:scale-95'
                            : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                        }`}
                      >
                        <Play className="w-4 h-4 fill-current" />
                        <span>{isActive ? '¡JUGAR Y COMPETIR AHORA!' : 'EVENTO FINALIZADO'}</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 2: Salón de la Fama */}
        {currentTab === 'hall_of_fame' && (
          <HallOfFame entries={hallOfFame} leaderboard={leaderboard} />
        )}

      </div>

      {/* Interactive Game Modal Arena */}
      {activePlayingEvent && (
        <div className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-xl flex items-center justify-center p-4 overflow-y-auto">
          <div className="max-w-3xl w-full my-8 bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl relative">
            
            {/* Close Button */}
            <button
              onClick={() => {
                setActivePlayingEvent(null);
                setGameStarted(false);
                setSubmittedScore(null);
              }}
              className="absolute top-6 right-6 p-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white"
            >
              ✕
            </button>

            {!gameStarted ? (
              <div className="max-w-md mx-auto text-center space-y-6 py-4">
                <div className="w-16 h-16 rounded-3xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 mx-auto flex items-center justify-center">
                  <Gamepad2 className="w-8 h-8" />
                </div>

                <div>
                  <h3 className="text-2xl font-black text-white font-display mb-1">{activePlayingEvent.title}</h3>
                  <p className="text-xs text-amber-400 font-bold mb-4">{activePlayingEvent.prizePool}</p>
                  <p className="text-xs text-slate-300 bg-slate-950 p-3 rounded-xl border border-slate-800">
                    Ingresa tu nombre de Discord para guardar permanentemente tus puntos en la base de datos de Los Daddys Live.
                  </p>
                </div>

                <form onSubmit={handleConfirmStart} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-400 mb-1 text-left">Tu Usuario de Discord</label>
                    <input
                      type="text"
                      value={userNameInput}
                      onChange={(e) => setUserNameInput(e.target.value)}
                      placeholder="Ej: KratosGamer#1234"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-emerald-500 font-semibold"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-emerald-400 to-cyan-400 text-slate-950 font-black text-sm hover:brightness-110 transition-all shadow-xl"
                  >
                    COMENZAR PARTIDA AHORA
                  </button>
                </form>
              </div>
            ) : (
              <div>
                {submittedScore !== null ? (
                  <div className="text-center py-8 space-y-4 animate-in zoom-in-95">
                    <Trophy className="w-16 h-16 text-yellow-400 mx-auto" />
                    <h3 className="text-3xl font-extrabold text-white font-display">¡Puntos Guardados con Éxito!</h3>
                    <p className="text-slate-300 text-sm max-w-md mx-auto">
                      Hola <span className="text-emerald-400 font-bold">{userNameInput}</span>, tus puntos han sido guardados permanentemente en la base de datos Firestore.
                    </p>

                    <div className="bg-slate-950 border border-slate-800 p-4 rounded-2xl max-w-xs mx-auto">
                      <span className="text-xs text-slate-400 uppercase font-bold block mb-1">Puntuación Registrada</span>
                      <span className="text-3xl font-black text-emerald-400 font-mono">
                        {submittedScore.toLocaleString()} pts
                      </span>
                    </div>

                    <button
                      onClick={() => {
                        setActivePlayingEvent(null);
                        setGameStarted(false);
                        setSubmittedScore(null);
                        setCurrentTab('hall_of_fame');
                      }}
                      className="px-8 py-3 rounded-xl bg-emerald-500 text-slate-950 font-bold text-sm hover:bg-emerald-400 shadow-xl"
                    >
                      Ver Salón de la Fama
                    </button>
                  </div>
                ) : (
                  <div>
                    {activePlayingEvent.gameType === 'trivia' && (
                      <TriviaGame
                        questions={activePlayingEvent.gameData?.triviaQuestions || []}
                        onFinish={handleGameFinish}
                      />
                    )}

                    {activePlayingEvent.gameType === 'reaction' && (
                      <ReactionGame onFinish={handleGameFinish} />
                    )}

                    {activePlayingEvent.gameType === 'memory' && (
                      <MemoryGame
                        pairCount={activePlayingEvent.gameData?.memoryPairCount || 6}
                        onFinish={handleGameFinish}
                      />
                    )}

                    {activePlayingEvent.gameType === 'object_hunt' && (
                      <ObjectHuntGame
                        objects={activePlayingEvent.gameData?.objectList}
                        onFinish={handleGameFinish}
                      />
                    )}

                    {activePlayingEvent.gameType === 'roulette' && (
                      <RouletteGame
                        slices={activePlayingEvent.gameData?.rouletteSlices}
                        onFinish={handleGameFinish}
                      />
                    )}

                    {activePlayingEvent.gameType === 'skill' && (
                      <SkillGame
                        targetCount={activePlayingEvent.gameData?.skillTargetCount || 10}
                        onFinish={handleGameFinish}
                      />
                    )}

                    {activePlayingEvent.gameType === 'custom' && (
                      <CustomGame
                        customInstructions={activePlayingEvent.gameData?.customInstructions}
                        customCode={activePlayingEvent.gameData?.customCode}
                        onFinish={handleGameFinish}
                      />
                    )}
                  </div>
                )}
              </div>
            )}

          </div>
        </div>
      )}

      {/* Admin Panel Modal */}
      {isAdminOpen && (
        <EventAdminPanel events={events} onClose={() => setIsAdminOpen(false)} />
      )}

    </div>
  );
};
