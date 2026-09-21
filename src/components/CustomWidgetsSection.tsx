import React, { useState } from 'react';
import { ServerConfig } from '../types';
import { 
  LayoutGrid, 
  Bell, 
  Code, 
  Sparkles, 
  Edit3, 
  Check, 
  Info
} from 'lucide-react';

interface CustomWidgetsSectionProps {
  config: ServerConfig;
  onUpdateConfig: (newConfig: Partial<ServerConfig>) => void;
}

export const CustomWidgetsSection: React.FC<CustomWidgetsSectionProps> = ({
  config,
  onUpdateConfig,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [titleInput, setTitleInput] = useState(config.noticeWidgetTitle);
  const [contentInput, setContentInput] = useState(config.noticeWidgetContent);

  const handleSave = () => {
    onUpdateConfig({
      noticeWidgetTitle: titleInput,
      noticeWidgetContent: contentInput,
    });
    setIsEditing(false);
  };

  return (
    <section id="widgets" className="py-16 md:py-24 bg-[#0d1322] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-bold uppercase tracking-wider mb-3">
              <LayoutGrid className="w-4 h-4 text-cyan-400" />
              <span>Paneles & Avisos del Servidor</span>
            </div>
            <h2 className="font-display text-3xl sm:text-5xl font-black text-white tracking-tight">
              Avisos y Widgets de UnbelievaBoat
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-400">
              Espacio configurable para insertar avisos importantes, comunicados de staff o widgets de estadísticas.
            </p>
          </div>

          <button
            onClick={() => setIsEditing(!isEditing)}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-slate-800 text-slate-200 hover:text-white hover:bg-slate-700 border border-slate-700/80 transition-all self-start md:self-auto"
          >
            {isEditing ? <Check className="w-4 h-4 text-emerald-400" /> : <Edit3 className="w-4 h-4 text-cyan-400" />}
            <span>{isEditing ? 'Cancelar Edición' : 'Editar Bloque de Avisos'}</span>
          </button>
        </div>

        {/* Editing Mode */}
        {isEditing && (
          <div className="glass-card rounded-3xl p-6 border border-cyan-500/40 mb-8 space-y-4 animate-in fade-in">
            <h3 className="font-bold text-white text-lg flex items-center gap-2">
              <Code className="w-5 h-5 text-cyan-400" />
              <span>Personalizar Contenido del Widget / Aviso</span>
            </h3>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Título del Aviso:
              </label>
              <input
                type="text"
                value={titleInput}
                onChange={(e) => setTitleInput(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Texto / Comunicado (Soporta texto libre o avisos de eventos):
              </label>
              <textarea
                rows={4}
                value={contentInput}
                onChange={(e) => setContentInput(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 text-sm text-white focus:outline-none focus:border-cyan-500 font-sans"
              />
            </div>

            <button
              onClick={handleSave}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-400 to-cyan-400 text-slate-950 font-bold text-sm hover:brightness-110 transition-all"
            >
              Guardar Cambios
            </button>
          </div>
        )}

        {/* Display Card */}
        <div className="glass-card rounded-3xl p-6 sm:p-10 border border-slate-800 relative overflow-hidden bg-gradient-to-br from-[#111827] via-[#0d1322] to-[#0b0f17]">
          <div className="flex items-start gap-4 mb-6">
            <div className="p-3.5 rounded-2xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 shrink-0">
              <Bell className="w-7 h-7" />
            </div>
            <div>
              <h3 className="font-display text-2xl font-bold text-white flex items-center gap-3">
                {config.noticeWidgetTitle}
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold">
                  Oficial
                </span>
              </h3>
              <p className="text-slate-400 text-xs mt-1">
                Anuncio actualizado para la economía del servidor
              </p>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800/80 text-slate-200 text-base leading-relaxed whitespace-pre-line font-sans">
            {config.noticeWidgetContent}
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-400 pt-4 border-t border-slate-800/60">
            <div className="flex items-center gap-2">
              <Info className="w-4 h-4 text-cyan-400" />
              <span>Puedes incrustar más widgets de stats de UnbelievaBoat en este panel usando la opción de configuración.</span>
            </div>

            <a
              href={config.discordInviteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-emerald-400 hover:underline flex items-center gap-1"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Unirte al canal de avisos en Discord →</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
