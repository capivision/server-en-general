import React, { useState } from 'react';
import { ServerConfig } from '../types';
import { 
  X, 
  Settings, 
  RotateCcw, 
  Save, 
  Copy, 
  Check, 
  Info,
  Link,
  Coins,
  Server
} from 'lucide-react';

interface ConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: ServerConfig;
  onSaveConfig: (newConfig: ServerConfig) => void;
  onResetDefaults: () => void;
}

export const ConfigModal: React.FC<ConfigModalProps> = ({
  isOpen,
  onClose,
  config,
  onSaveConfig,
  onResetDefaults,
}) => {
  const [formData, setFormData] = useState<ServerConfig>(config);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveConfig(formData);
    onClose();
  };

  const handleCopyJSON = () => {
    navigator.clipboard.writeText(JSON.stringify(formData, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in">
      <div className="glass-card w-full max-w-2xl rounded-3xl p-6 sm:p-8 border border-slate-700/80 shadow-2xl max-h-[90vh] overflow-y-auto relative">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <Settings className="w-6 h-6" />
            </div>
            <div>
              <h2 className="font-display font-bold text-xl text-white">
                Configuración del Servidor y Enlaces
              </h2>
              <p className="text-xs text-slate-400">
                Personaliza los enlaces de Discord, iframe de UnbelievaBoat y textos
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Section: Server Details */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-2">
              <Server className="w-4 h-4" />
              <span>Datos del Servidor & Moneda</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Nombre del Servidor
                </label>
                <input
                  type="text"
                  name="serverName"
                  value={formData.serverName}
                  onChange={handleChange}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Subtítulo / Powered By
                </label>
                <input
                  type="text"
                  name="poweredBy"
                  value={formData.poweredBy || ''}
                  onChange={handleChange}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
                  placeholder="powered by LosDaddys®"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  URL del Logo del Servidor (Imagen Superior Izquierda)
                </label>
                <input
                  type="text"
                  name="serverLogoUrl"
                  value={formData.serverLogoUrl || ''}
                  onChange={handleChange}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500 font-mono text-xs"
                  placeholder="https://..."
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Nombre de Moneda
                </label>
                <input
                  type="text"
                  name="currencyName"
                  value={formData.currencyName}
                  onChange={handleChange}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Emoji de Moneda
                </label>
                <input
                  type="text"
                  name="currencyEmoji"
                  value={formData.currencyEmoji}
                  onChange={handleChange}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500 font-mono text-center"
                  required
                />
              </div>
            </div>
          </div>

          {/* Section: URLs */}
          <div className="space-y-4 pt-2 border-t border-slate-800">
            <h3 className="text-xs font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-2">
              <Link className="w-4 h-4" />
              <span>URLs y Enlaces de Integración</span>
            </h3>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                URL del Leaderboard Público de UnbelievaBoat (Iframe):
              </label>
              <input
                type="url"
                name="leaderboardIframeUrl"
                value={formData.leaderboardIframeUrl}
                onChange={handleChange}
                placeholder="https://unbelievaboat.com/leaderboard/YOUR_SERVER_ID"
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white font-mono text-xs focus:outline-none focus:border-cyan-500"
                required
              />
              <p className="text-[11px] text-slate-400 mt-1 flex items-center gap-1">
                <Info className="w-3 h-3 text-cyan-400" />
                Obtenla en el Dashboard de UnbelievaBoat &gt; Leaderboard &gt; Public Leaderboard URL
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  URL de Invitación al Servidor Discord:
                </label>
                <input
                  type="text"
                  name="discordInviteUrl"
                  value={formData.discordInviteUrl}
                  onChange={handleChange}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white font-mono text-xs focus:outline-none focus:border-emerald-500"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  URL Invitación de UnbelievaBoat:
                </label>
                <input
                  type="text"
                  name="botInviteUrl"
                  value={formData.botInviteUrl}
                  onChange={handleChange}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white font-mono text-xs focus:outline-none focus:border-emerald-500"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Enlace de Normas del Servidor:
                </label>
                <input
                  type="text"
                  name="serverRulesUrl"
                  value={formData.serverRulesUrl}
                  onChange={handleChange}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white font-mono text-xs focus:outline-none focus:border-emerald-500"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Enlace de Soporte / Tickets:
                </label>
                <input
                  type="text"
                  name="supportTicketUrl"
                  value={formData.supportTicketUrl}
                  onChange={handleChange}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white font-mono text-xs focus:outline-none focus:border-emerald-500"
                  required
                />
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onResetDefaults}
                className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-colors flex items-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5 text-amber-400" />
                <span>Restaurar Valores por Defecto</span>
              </button>

              <button
                type="button"
                onClick={handleCopyJSON}
                className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-colors flex items-center gap-1.5"
                title="Copiar configuración en formato JSON"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? '¡Copiado!' : 'Copiar Config JSON'}</span>
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition-colors"
              >
                Cancelar
              </button>
              
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-400 to-cyan-400 text-slate-950 font-bold text-xs hover:brightness-110 shadow-md transition-all flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                <span>Guardar y Aplicar</span>
              </button>
            </div>
          </div>

        </form>

      </div>
    </div>
  );
};
