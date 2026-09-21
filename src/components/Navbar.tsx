import React, { useState } from 'react';
import { ServerConfig } from '../types';
import { 
  Sparkles, 
  Scroll, 
  HelpCircle,
  Menu, 
  X, 
  Users,
  Award,
  MessageSquare,
  Orbit
} from 'lucide-react';

interface NavbarProps {
  config: ServerConfig;
  onOpenConfig?: () => void;
  onReopenCeremony?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ config, onReopenCeremony }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Inicio', href: '#inicio', icon: Sparkles },
    { label: 'La Nueva Era', href: '#nueva-era', icon: Users },
    { label: 'Desfase Cósmico 🌌', href: '#classified-mystery', icon: Orbit, isSpecial: true },
    { label: 'Adiós al Casino', href: '#despedida', icon: Award },
    { label: 'Reglas de Convivencia', href: '#reglas', icon: Scroll },
    { label: 'Preguntas Frecuentes', href: '#faq', icon: HelpCircle },
  ];

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-xl bg-[#0b0f17]/85 border-b border-slate-800/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand logo & Server Badge */}
        <div className="flex items-center gap-3">
          <a href="#inicio" className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-cyan-400 rounded-xl p-1">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-cyan-500 via-teal-500 to-indigo-500 p-0.5 shadow-[0_0_15px_rgba(6,182,212,0.4)] group-hover:shadow-[0_0_22px_rgba(6,182,212,0.6)] transition-all overflow-hidden shrink-0">
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
              <span className="font-display font-extrabold text-lg text-white tracking-tight flex items-center gap-2">
                {config.serverName}
                <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                  La Nueva Era
                </span>
              </span>
              <span className="text-xs text-slate-400 font-medium block -mt-0.5">
                {config.poweredBy || 'powered by LosDaddys®'}
              </span>
            </div>
          </a>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
          {navLinks.map((link) => {
            const Icon = link.icon;
            if (link.isSpecial) {
              return (
                <a
                  key={link.label}
                  href={link.href}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono font-bold text-purple-200 bg-purple-950/60 border border-purple-500/40 hover:border-purple-400 hover:bg-purple-900/60 transition-all shadow-[0_0_15px_rgba(168,85,247,0.25)] animate-pulse"
                >
                  <Icon className="w-3.5 h-3.5 text-purple-400" />
                  <span>{link.label}</span>
                </a>
              );
            }
            return (
              <a
                key={link.label}
                href={link.href}
                className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800/60 transition-all focus:outline-none focus:ring-2 focus:ring-cyan-400"
              >
                <Icon className="w-4 h-4 text-cyan-400/80" />
                <span>{link.label}</span>
              </a>
            );
          })}
        </nav>

        {/* Action buttons */}
        <div className="hidden sm:flex items-center gap-3">
          {onReopenCeremony && (
            <button
              onClick={onReopenCeremony}
              title="Revivir la ceremonia del corte de cinta"
              className="px-3.5 py-2 rounded-xl text-xs font-bold text-amber-300 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 transition-all flex items-center gap-1.5 active:scale-95 cursor-pointer shadow-[0_0_15px_rgba(245,158,11,0.15)]"
            >
              <span>✂️</span>
              <span>Inauguración</span>
            </button>
          )}

          <a
            href={config.discordInviteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="relative inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm text-slate-950 bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400 hover:brightness-110 shadow-[0_0_20px_rgba(6,182,212,0.3)] transition-all focus:outline-none focus:ring-2 focus:ring-cyan-400 active:scale-[0.98]"
          >
            <MessageSquare className="w-4 h-4 fill-slate-950" />
            <span>Entrar al Servidor</span>
          </a>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex items-center gap-2 lg:hidden">
          {onReopenCeremony && (
            <button
              onClick={onReopenCeremony}
              className="px-2.5 py-1.5 rounded-xl text-xs font-bold text-amber-300 bg-amber-500/10 border border-amber-500/30 flex items-center gap-1"
            >
              <span>✂️</span>
              <span>Cinta</span>
            </button>
          )}

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2.5 rounded-xl bg-slate-800/80 text-slate-200 border border-slate-700/60 hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-cyan-400"
            aria-label="Abrir menú de navegación"
          >
            {mobileMenuOpen ? <X className="w-6 h-6 text-cyan-400" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0e1422] border-b border-slate-800 px-4 pt-3 pb-6 space-y-3 animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="grid grid-cols-1 gap-2 pt-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-300 bg-slate-900/60 border border-slate-800 hover:text-cyan-400 hover:border-cyan-500/30"
                >
                  <Icon className="w-4 h-4 text-cyan-400" />
                  <span>{link.label}</span>
                </a>
              );
            })}
          </div>

          <div className="pt-2 space-y-2">
            {onReopenCeremony && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onReopenCeremony();
                }}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl font-bold text-xs text-amber-300 bg-amber-500/10 border border-amber-500/30"
              >
                <span>✂️</span>
                <span>Revivir Ceremonia de Corte de Cinta</span>
              </button>
            )}

            <a
              href={config.discordInviteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm text-slate-950 bg-gradient-to-r from-cyan-400 to-emerald-400 shadow-md"
            >
              <MessageSquare className="w-4 h-4 fill-slate-950" />
              <span>Entrar al Servidor de Discord</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
