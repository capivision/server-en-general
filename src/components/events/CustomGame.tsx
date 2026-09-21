import React, { useState } from 'react';
import { Sparkles, Trophy, Key, CheckCircle } from 'lucide-react';

interface CustomGameProps {
  customInstructions?: string;
  customCode?: string;
  onFinish: (score: number, details: any) => void;
}

export const CustomGame: React.FC<CustomGameProps> = ({
  customInstructions = 'Ingresa el código secreto entregado durante el directo de los Viernes en Los Daddys Live.',
  customCode = 'DADDYS2026',
  onFinish
}) => {
  const [inputCode, setInputCode] = useState('');
  const [error, setError] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputCode.trim().toUpperCase() === (customCode || 'DADDYS2026').toUpperCase()) {
      setSubmitted(true);
      onFinish(5000, { codeSubmitted: inputCode });
    } else {
      setError(true);
    }
  };

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 max-w-xl mx-auto shadow-2xl text-center">
      <div className="mb-6">
        <h4 className="text-xl font-bold text-white font-display flex items-center justify-center gap-2">
          <Sparkles className="w-5 h-5 text-purple-400" /> Evento Especial de Los Daddys Live
        </h4>
        <p className="text-xs text-slate-300 mt-2">{customInstructions}</p>
      </div>

      {submitted ? (
        <div className="p-6 bg-emerald-950/60 border border-emerald-500/40 rounded-2xl animate-in zoom-in-95">
          <CheckCircle className="w-12 h-12 text-emerald-400 mx-auto mb-2" />
          <h5 className="text-xl font-bold text-white">¡Código Válido Canjeado!</h5>
          <p className="text-xs text-slate-300 mt-1">Has participado exitosamente en este evento.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
          <div className="relative">
            <Key className="w-5 h-5 text-purple-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={inputCode}
              onChange={(e) => {
                setInputCode(e.target.value);
                setError(false);
              }}
              placeholder="Escribe el código clave..."
              className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-11 pr-4 py-3 text-sm text-white font-mono tracking-widest uppercase focus:outline-none focus:border-purple-500"
            />
          </div>

          {error && (
            <p className="text-xs text-red-400 font-semibold">
              Código incorrecto. Revisa el directo o canal de Discord.
            </p>
          )}

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-purple-600 hover:bg-purple-500 font-bold text-white text-sm shadow-lg transition-all"
          >
            VALIDAR Y CANJEAR PUNTOS
          </button>
        </form>
      )}
    </div>
  );
};
