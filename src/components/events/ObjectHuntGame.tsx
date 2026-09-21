import React, { useState, useEffect } from 'react';
import { ObjectItem } from '../../types';
import { Search, Trophy, Clock, CheckCircle2, RefreshCw } from 'lucide-react';

interface ObjectHuntGameProps {
  objects?: ObjectItem[];
  onFinish: (score: number, details: any) => void;
}

const DEFAULT_OBJECTS: ObjectItem[] = [
  { id: 'obj1', name: 'Moneda Daddys #1', icon: '🪙', x: 18, y: 35 },
  { id: 'obj2', name: 'Gema VIP #2', icon: '💎', x: 82, y: 22 },
  { id: 'obj3', name: 'Cofre Secreto #3', icon: '🎁', x: 48, y: 72 },
  { id: 'obj4', name: 'Trofeo de Oro #4', icon: '🏆', x: 74, y: 62 },
  { id: 'obj5', name: 'Corona de Leyenda #5', icon: '👑', x: 28, y: 80 }
];

interface Obstacle {
  id: string;
  icon: string;
  x: number;
  y: number;
  cleared: boolean;
}

export const ObjectHuntGame: React.FC<ObjectHuntGameProps> = ({
  objects = DEFAULT_OBJECTS,
  onFinish
}) => {
  const [foundIds, setFoundIds] = useState<string[]>([]);
  const [seconds, setSeconds] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [obstacles, setObstacles] = useState<Obstacle[]>([]);

  // Generate 22 obstacles covering the map
  useEffect(() => {
    const obstacleIcons = ['📦', '🛢️', '🪨', '🌿', '🪵', '☁️', '🧱', '🏺', '🚪', '🗿'];
    const generated: Obstacle[] = [];
    
    // Create grid/random points for obstacles
    let count = 0;
    for (let row = 0; row < 5; row++) {
      for (let col = 0; col < 5; col++) {
        // Leave minor space but cover map dense
        const x = 12 + col * 19 + Math.floor(Math.random() * 6 - 3);
        const y = 15 + row * 16 + Math.floor(Math.random() * 6 - 3);
        const icon = obstacleIcons[count % obstacleIcons.length];
        generated.push({
          id: `obs_${count}`,
          icon,
          x: Math.min(92, Math.max(8, x)),
          y: Math.min(88, Math.max(10, y)),
          cleared: false
        });
        count++;
      }
    }
    setObstacles(generated);
  }, []);

  useEffect(() => {
    if (isFinished) return;
    const timer = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(timer);
  }, [isFinished]);

  const handleObstacleClick = (obsId: string) => {
    setObstacles((prev) =>
      prev.map((o) => (o.id === obsId ? { ...o, cleared: true } : o))
    );
  };

  const handleObjectClick = (obj: ObjectItem) => {
    if (foundIds.includes(obj.id) || isFinished) return;

    const newFound = [...foundIds, obj.id];
    setFoundIds(newFound);

    if (newFound.length === objects.length) {
      setIsFinished(true);
      const score = Math.max(500, 15000 - seconds * 200);
      onFinish(score, { seconds, objectsFound: objects.length });
    }
  };

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 max-w-3xl mx-auto shadow-2xl">
      <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
        <div>
          <h4 className="text-xl font-bold text-white font-display flex items-center gap-2">
            <Search className="w-5 h-5 text-cyan-400" /> Búsqueda de Objetos Ocultos de Los Daddys
          </h4>
          <p className="text-xs text-slate-400">¡Haz clic en los obstáculos para moverlos y despejar los objetos escondidos debajo!</p>
        </div>

        <div className="flex items-center gap-3 text-xs sm:text-sm font-mono font-bold text-slate-300">
          <span className="bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800 flex items-center gap-1">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" /> {foundIds.length}/{objects.length}
          </span>
          <span className="bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800 flex items-center gap-1">
            <Clock className="w-4 h-4 text-cyan-400" /> {seconds}s
          </span>
        </div>
      </div>

      {isFinished ? (
        <div className="text-center py-8 animate-in zoom-in-95">
          <Trophy className="w-14 h-14 text-yellow-400 mx-auto mb-3" />
          <h4 className="text-2xl font-bold text-white font-display mb-1">¡Objetos Encontrados!</h4>
          <p className="text-slate-300 text-sm mb-4">
            Completaste el desafío de alta dificultad en <span className="text-emerald-400 font-bold">{seconds} segundos</span>.
          </p>
          <span className="px-4 py-2 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-xl text-xs font-bold">
            +{(Math.max(500, 15000 - seconds * 200)).toLocaleString()} Puntos Sumados
          </span>
        </div>
      ) : (
        <div>
          {/* Target List */}
          <div className="flex flex-wrap gap-2 mb-4 justify-center">
            {objects.map((o) => {
              const isFound = foundIds.includes(o.id);
              return (
                <span
                  key={o.id}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all flex items-center gap-1.5 ${
                    isFound
                      ? 'bg-emerald-950/60 border-emerald-500/60 text-emerald-300 line-through'
                      : 'bg-slate-950 border-slate-800 text-slate-300'
                  }`}
                >
                  <span>{o.icon}</span>
                  <span>{o.name}</span>
                </span>
              );
            })}
          </div>

          {/* Map canvas */}
          <div className="relative w-full h-96 bg-gradient-to-br from-slate-950 via-[#0f172a] to-slate-900 rounded-2xl border-2 border-slate-800 overflow-hidden shadow-inner group">
            <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px] opacity-40" />

            {/* Hidden Target Items */}
            {objects.map((obj) => {
              const isFound = foundIds.includes(obj.id);
              return (
                <button
                  key={obj.id}
                  onClick={() => handleObjectClick(obj)}
                  style={{ top: `${obj.y}%`, left: `${obj.x}%` }}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 p-2 text-3xl transition-all rounded-full select-none z-10 ${
                    isFound
                      ? 'opacity-20 scale-75 cursor-default'
                      : 'hover:scale-125 cursor-pointer filter drop-shadow-[0_0_12px_rgba(234,179,8,0.8)] animate-bounce'
                  }`}
                >
                  {obj.icon}
                </button>
              );
            })}

            {/* Obstacles layered on top */}
            {obstacles.map((obs) => {
              if (obs.cleared) return null;
              return (
                <button
                  key={obs.id}
                  onClick={() => handleObstacleClick(obs.id)}
                  style={{ top: `${obs.y}%`, left: `${obs.x}%` }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 p-2 text-3xl z-20 cursor-pointer hover:scale-110 active:scale-95 transition-transform filter drop-shadow-md select-none bg-slate-900/40 rounded-xl backdrop-blur-xs border border-slate-700/50"
                  title="Haz clic para despejar obstáculo"
                >
                  {obs.icon}
                </button>
              );
            })}
          </div>
          <p className="text-[11px] text-center text-slate-500 mt-3 font-mono">
            💡 Consejo: Haz clic sobre las cajas, barriles y rocas para destruirlos y revelar las recompensas ocultas.
          </p>
        </div>
      )}
    </div>
  );
};
