import React from 'react';
import { ServerConfig } from '../types';
import { Heart, Sparkles, MessageSquare, ExternalLink } from 'lucide-react';
import { DiscordStatusIndicator } from './DiscordStatusIndicator';

interface FooterProps {
  config: ServerConfig;
  onReopenCeremony?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ config, onReopenCeremony }) => {
  return (
    <footer className="bg-[#080b11] border-t border-slate-800/80 pt-12 pb-12 text-slate-400 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Real-time Discord Status Indicator using Widget API */}
        <div className="mb-12">
          <DiscordStatusIndicator
            serverId={config.discordServerId || '1431732304031780998'}
            serverName={config.serverName}
            inviteUrl={config.discordInviteUrl}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-12 border-b border-slate-800/80">
          
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 via-teal-500 to-indigo-500 p-0.5 overflow-hidden shrink-0 shadow-md">
                {config.serverLogoUrl ? (
                  <img
                    src={config.serverLogoUrl}
                    alt={config.serverName}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover rounded-[10px]"
                  />
                ) : (
                  <div className="w-full h-full bg-[#0d1322] rounded-[10px] flex items-center justify-center text-cyan-400 font-bold font-display text-lg">
                    <span>👑</span>
                  </div>
                )}
              </div>
              <div>
                <span className="font-display font-extrabold text-xl text-white">
                  {config.serverName}
                </span>
                <span className="text-xs text-cyan-400 block font-semibold">
                  La Nueva Era
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-400 max-w-md leading-relaxed">
              Página oficial y punto de encuentro de la comunidad. Canales de voz, directos en vivo, tardes de gaming y pura amistad en Discord.
            </p>

            {/* Inauguration Replay Banner Button */}
            {onReopenCeremony && (
              <div className="pt-1">
                <button
                  onClick={onReopenCeremony}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-xs text-amber-300 font-bold transition-all cursor-pointer shadow-sm active:scale-95"
                >
                  <span>✂️</span>
                  <span>Revivir Ceremonia de Inauguración (Corte de Cinta)</span>
                </button>
              </div>
            )}
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="font-display font-bold text-white text-sm uppercase tracking-wider text-slate-200">
              Navegación
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#inicio" className="hover:text-cyan-400 transition-colors">
                  Inicio
                </a>
              </li>
              <li>
                <a href="#nueva-era" className="hover:text-cyan-400 transition-colors">
                  La Nueva Era
                </a>
              </li>
              <li>
                <a href="#classified-mystery" className="text-fuchsia-400 hover:text-fuchsia-300 transition-colors flex items-center gap-1 font-mono font-bold">
                  <span>🌴 El Gran Golpe de la Zona ($25M)</span>
                </a>
              </li>
              <li>
                <a href="#despedida" className="hover:text-amber-400 transition-colors">
                  Adiós a las Monedas & Casino
                </a>
              </li>
              <li>
                <a href="#reglas" className="hover:text-cyan-400 transition-colors">
                  Reglas de Convivencia
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-cyan-400 transition-colors">
                  Preguntas Frecuentes
                </a>
              </li>
            </ul>
          </div>

          {/* Discord & Community Links */}
          <div className="space-y-3">
            <h4 className="font-display font-bold text-white text-sm uppercase tracking-wider text-slate-200">
              Comunidad Oficial
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a
                  href={config.discordInviteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-cyan-400 transition-colors flex items-center gap-1.5 text-cyan-300 font-semibold"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Unirse al Discord</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <span className="text-slate-500">Comunidad libre de apuestas</span>
              </li>
              <li>
                <span className="text-slate-500">Vocales 24/7 y Gaming</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Credits */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} {config.serverName}. Nueva Era inaugurada.</p>
          
          <div className="flex items-center gap-1">
            <span>Construido con</span>
            <Heart className="w-3.5 h-3.5 text-red-400 fill-red-400 inline" />
            <span>para la comunidad & {config.poweredBy || 'LosDaddys®'}</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
