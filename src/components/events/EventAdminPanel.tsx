import React, { useState } from 'react';
import { EventItem, EventGameType, EventStatus, TriviaQuestion } from '../../types';
import { 
  saveEvent, 
  deleteEvent, 
  finalizeEvent, 
  resetEventLeaderboard, 
  getParticipationsForEvent 
} from '../../services/eventService';
import { 
  ShieldCheck, 
  Plus, 
  Edit3, 
  Trash2, 
  CheckCircle, 
  RotateCcw, 
  Users, 
  Award, 
  BarChart2, 
  X, 
  Save 
} from 'lucide-react';

interface EventAdminPanelProps {
  events: EventItem[];
  onClose: () => void;
}

export const EventAdminPanel: React.FC<EventAdminPanelProps> = ({ events, onClose }) => {
  const [pin, setPin] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState<'manage_events' | 'create_event' | 'participations' | 'stats'>('manage_events');

  // Form State for New or Editing Event
  const [editingId, setEditingId] = useState<string | null>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [gameType, setGameType] = useState<EventGameType>('trivia');
  const [prizePool, setPrizePool] = useState('🪙 50,000 Coins');
  const [status, setStatus] = useState<EventStatus>('active');
  const [rules, setRules] = useState('Demuestra tu agilidad y gana el bote de recompensas.');
  
  // Trivia Builder
  const [questions, setQuestions] = useState<TriviaQuestion[]>([
    { question: '¿Cuál es el canal oficial de Los Daddys Live?', options: ['#general', '#los-daddys-live', '#casino', '#anuncios'], correctIndex: 1 }
  ]);

  // Selected event for viewing participations
  const [selectedEventId, setSelectedEventId] = useState<string>(events[0]?.id || '');
  const [participationsList, setParticipationsList] = useState<any[]>([]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin === 'LosDaddys2908') {
      setIsAuthenticated(true);
    } else {
      alert('PIN de admin incorrecto.');
    }
  };

  const loadParticipations = async (id: string) => {
    setSelectedEventId(id);
    const list = await getParticipationsForEvent(id);
    setParticipationsList(list);
  };

  const handleEditClick = (evt: EventItem) => {
    setEditingId(evt.id);
    setTitle(evt.title);
    setDescription(evt.description);
    setGameType(evt.gameType);
    setPrizePool(evt.prizePool);
    setStatus(evt.status);
    setRules(evt.rules);
    if (evt.gameData?.triviaQuestions) {
      setQuestions(evt.gameData.triviaQuestions);
    }
    setActiveTab('create_event');
  };

  const handleResetForm = () => {
    setEditingId(null);
    setTitle('');
    setDescription('');
    setGameType('trivia');
    setPrizePool('🪙 50,000 Coins');
    setStatus('active');
    setRules('Demuestra tu agilidad y gana el bote de recompensas.');
    setQuestions([
      { question: '¿Cuál es el canal oficial de Los Daddys Live?', options: ['#general', '#los-daddys-live', '#casino', '#anuncios'], correctIndex: 1 }
    ]);
  };

  const handleSaveEventSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) {
      alert('Por favor ingresa un título para el evento.');
      return;
    }

    const eventId = editingId || `evt_${gameType}_${Date.now()}`;
    const newEvent: EventItem = {
      id: eventId,
      title,
      description: description || 'Evento oficial de Los Daddys Live con increíbles premios.',
      gameType,
      status,
      prizePool: prizePool || '🪙 50,000 Coins',
      startDate: new Date().toISOString(),
      endDate: new Date(Date.now() + 86400000 * 3).toISOString(),
      rules: rules || 'Respeta las normas del servidor y participa limpiamente.',
      createdAt: new Date().toISOString(),
      gameData: {
        triviaQuestions: gameType === 'trivia' ? questions : undefined,
      }
    };

    await saveEvent(newEvent);
    alert(editingId ? '¡Evento actualizado con éxito!' : '¡Nuevo evento publicado exitosamente!');
    handleResetForm();
    setActiveTab('manage_events');
  };

  const handleFinalize = async (id: string) => {
    if (window.confirm('¿Seguro que deseas finalizar este evento? Se determinarán los ganadores y se enviarán al Salón de la Fama.')) {
      await finalizeEvent(id);
      alert('¡Evento finalizado e incorporado al Salón de la Fama!');
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('¿Seguro que deseas eliminar este evento permanentemente?')) {
      await deleteEvent(id);
    }
  };

  const handleResetRankings = async () => {
    if (window.confirm('⚠️ ATENCIÓN: ¿Deseas reiniciar la clasificación global de eventos? Esto pondrá a cero todos los puntos.')) {
      await resetEventLeaderboard();
      alert('Clasificaciones reiniciadas.');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4">
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 max-w-md w-full shadow-2xl relative text-center">
          <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
          <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto mb-4">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">Acceso a Panel Admin de Eventos</h3>
          <p className="text-xs text-slate-400 mb-6">Ingresa el PIN de administrador para gestionar la plataforma</p>

          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              placeholder="Pin de admin"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-center text-white tracking-widest focus:outline-none focus:border-emerald-500 text-sm font-mono"
            />
            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-emerald-500 font-bold text-slate-950 text-sm hover:bg-emerald-400 transition-all"
            >
              INGRESAR AL PANEL
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-md overflow-y-auto p-4 sm:p-8">
      <div className="max-w-6xl mx-auto bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl my-8">
        {/* Header */}
        <div className="flex items-center justify-between pb-6 border-b border-slate-800 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white font-display">Panel de Administración de Eventos</h3>
              <p className="text-xs text-slate-400">Los Daddys Live - Gestión Completa de Actividades</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 mb-8 border-b border-slate-800 pb-4">
          <button
            onClick={() => setActiveTab('manage_events')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
              activeTab === 'manage_events'
                ? 'bg-emerald-500 text-slate-950 shadow-md'
                : 'bg-slate-950 text-slate-400 hover:text-white'
            }`}
          >
            <Award className="w-4 h-4" /> Gestor de Eventos ({events.length})
          </button>

          <button
            onClick={() => {
              handleResetForm();
              setActiveTab('create_event');
            }}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
              activeTab === 'create_event'
                ? 'bg-emerald-500 text-slate-950 shadow-md'
                : 'bg-slate-950 text-slate-400 hover:text-white'
            }`}
          >
            <Plus className="w-4 h-4" /> {editingId ? 'Editar Evento' : 'Crear Nuevo Evento'}
          </button>

          <button
            onClick={() => {
              setActiveTab('participations');
              if (selectedEventId) loadParticipations(selectedEventId);
            }}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
              activeTab === 'participations'
                ? 'bg-emerald-500 text-slate-950 shadow-md'
                : 'bg-slate-950 text-slate-400 hover:text-white'
            }`}
          >
            <Users className="w-4 h-4" /> Participantes y Puntuaciones
          </button>

          <button
            onClick={() => setActiveTab('stats')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
              activeTab === 'stats'
                ? 'bg-emerald-500 text-slate-950 shadow-md'
                : 'bg-slate-950 text-slate-400 hover:text-white'
            }`}
          >
            <BarChart2 className="w-4 h-4" /> Estadísticas y Reinicio
          </button>
        </div>

        {/* Tab 1: Manage Events */}
        {activeTab === 'manage_events' && (
          <div className="space-y-4">
            {events.map((evt) => (
              <div
                key={evt.id}
                className="bg-slate-950 border border-slate-800 rounded-2xl p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
              >
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                        evt.status === 'active'
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                          : evt.status === 'upcoming'
                          ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                          : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {evt.status}
                    </span>
                    <span className="text-xs text-amber-400 font-bold">{evt.prizePool}</span>
                  </div>
                  <h4 className="font-bold text-white text-base">{evt.title}</h4>
                  <p className="text-xs text-slate-400 mt-1 line-clamp-1">{evt.description}</p>
                </div>

                <div className="flex items-center gap-2 shrink-0 w-full md:w-auto justify-end">
                  {evt.status === 'active' && (
                    <button
                      onClick={() => handleFinalize(evt.id)}
                      className="px-3 py-1.5 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-bold hover:bg-amber-500 hover:text-slate-950 transition-all flex items-center gap-1"
                    >
                      <CheckCircle className="w-3.5 h-3.5" /> Finalizar y Premiar
                    </button>
                  )}

                  <button
                    onClick={() => handleEditClick(evt)}
                    className="p-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => handleDelete(evt.id)}
                    className="p-2 rounded-xl bg-red-950/60 border border-red-800/60 text-red-400 hover:bg-red-900/80"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 2: Create / Edit Event */}
        {activeTab === 'create_event' && (
          <form onSubmit={handleSaveEventSubmit} className="space-y-6 max-w-2xl mx-auto bg-slate-950 p-6 rounded-2xl border border-slate-800">
            <h4 className="text-lg font-bold text-white flex items-center gap-2">
              <Plus className="w-5 h-5 text-emerald-400" />
              <span>{editingId ? 'Editar Evento' : 'Crear Nuevo Evento Interactivo'}</span>
            </h4>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Título del Evento</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Ej: 🎉 Gran Trivia de Viernes Live"
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Tipo de Juego</label>
                <select
                  value={gameType}
                  onChange={(e) => setGameType(e.target.value as EventGameType)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
                >
                  <option value="trivia">Trivia (Preguntas)</option>
                  <option value="reaction">Reacción Rápida (Reflejos)</option>
                  <option value="memory">Memoria (Parejas)</option>
                  <option value="object_hunt">Búsqueda de Objetos</option>
                  <option value="roulette">Ruleta de la Suerte</option>
                  <option value="skill">Prueba de Puntería</option>
                  <option value="custom">Código Especial / Personalizado</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Estado</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value as EventStatus)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
                >
                  <option value="active">Activo (Jugable)</option>
                  <option value="upcoming">Próximamente</option>
                  <option value="ended">Finalizado</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Bote de Premios</label>
              <input
                type="text"
                value={prizePool}
                onChange={(e) => setPrizePool(e.target.value)}
                placeholder="Ej: 🪙 50,000 + Rol VIP Diamante"
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Descripción</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={2}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-emerald-500 text-slate-950 font-bold text-sm hover:bg-emerald-400 transition-all flex items-center justify-center gap-2"
            >
              <Save className="w-4 h-4" />
              <span>{editingId ? 'GUARDAR CAMBIOS' : 'PUBLICAR EVENTO AHORA'}</span>
            </button>
          </form>
        )}

        {/* Tab 3: Participations */}
        {activeTab === 'participations' && (
          <div>
            <div className="mb-4">
              <label className="block text-xs font-bold text-slate-400 mb-1">Seleccionar Evento para Inspeccionar</label>
              <select
                value={selectedEventId}
                onChange={(e) => loadParticipations(e.target.value)}
                className="w-full max-w-md bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-sm text-white"
              >
                {events.map((e) => (
                  <option key={e.id} value={e.id}>{e.title}</option>
                ))}
              </select>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-950">
              <table className="w-full text-left text-sm text-slate-300">
                <thead className="bg-slate-900 text-xs text-slate-400 uppercase font-mono">
                  <tr>
                    <th className="py-3 px-4">Jugador</th>
                    <th className="py-3 px-4">Puntuación</th>
                    <th className="py-3 px-4">Tiempo / Datos</th>
                    <th className="py-3 px-4">Fecha</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {participationsList.map((p) => (
                    <tr key={p.id}>
                      <td className="py-3 px-4 font-bold text-white">{p.userName}</td>
                      <td className="py-3 px-4 font-mono font-bold text-emerald-400">{p.score} pts</td>
                      <td className="py-3 px-4 text-xs text-slate-400">{p.completionTimeMs ? `${p.completionTimeMs} ms` : 'OK'}</td>
                      <td className="py-3 px-4 text-xs text-slate-500">{new Date(p.timestamp).toLocaleDateString()}</td>
                    </tr>
                  ))}
                  {participationsList.length === 0 && (
                    <tr>
                      <td colSpan={4} className="py-6 text-center text-slate-500 text-xs">
                        Aún no hay participaciones registradas para este evento.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 4: Stats & Reset */}
        {activeTab === 'stats' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 text-center">
                <span className="text-xs text-slate-400 uppercase font-bold block mb-1">Total Eventos</span>
                <span className="text-3xl font-extrabold text-white font-mono">{events.length}</span>
              </div>
              <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 text-center">
                <span className="text-xs text-slate-400 uppercase font-bold block mb-1">Eventos Activos</span>
                <span className="text-3xl font-extrabold text-emerald-400 font-mono">
                  {events.filter((e) => e.status === 'active').length}
                </span>
              </div>
              <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 text-center">
                <span className="text-xs text-slate-400 uppercase font-bold block mb-1">Bote Total en Juego</span>
                <span className="text-2xl font-extrabold text-amber-400 font-mono">🪙 250,000+</span>
              </div>
            </div>

            <div className="bg-slate-950 p-6 rounded-2xl border border-red-900/40 text-center max-w-lg mx-auto">
              <RotateCcw className="w-10 h-10 text-red-400 mx-auto mb-2" />
              <h4 className="font-bold text-white mb-1">Reiniciar Clasificaciones Globales</h4>
              <p className="text-xs text-slate-400 mb-4">
                Borra todas las puntuaciones acumuladas en el ranking general para dar inicio a una nueva temporada de Los Daddys Live.
              </p>
              <button
                onClick={handleResetRankings}
                className="px-6 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 font-bold text-white text-xs shadow-lg transition-all"
              >
                REINICIAR CLASIFICACIONES
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
