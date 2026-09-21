import React from 'react';
import { ServerConfig } from '../types';
import { 
  Sparkles, 
  ArrowRight, 
  Headphones, 
  Gamepad2, 
  Radio, 
  Users, 
  Heart,
  MessageSquare
} from 'lucide-react';

interface HeroProps {
  config: ServerConfig;
}

export const Hero: React.FC<HeroProps> = ({ config }) => {
  return (
    <section id="inicio" className="relative pt-12 pb-20 md:pt-20 md:pb-28 overflow-hidden bg-[#0b0f17]">
      {/* Background Neon Gradients */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[380px] bg-gradient-to-tr from-cyan-500/20 via-emerald-500/20 to-purple-500/20 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute top-10 right-10 w-72 h-72 bg-emerald-500/10 blur-[90px] rounded-full pointer-events-none" />
      <div className="absolute bottom-5 left-10 w-80 h-80 bg-cyan-500/10 blur-[100px] rounded-full pointer-events-none" />

      {/* Grid Pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293d15_1px,transparent_1px),linear-gradient(to_bottom,#1f293d15_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Status Pills */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/90 border border-cyan-500/30 text-xs font-semibold text-cyan-400 mb-8 shadow-[0_0_15px_rgba(6,182,212,0.2)]">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-500"></span>
          </span>
          <span className="text-slate-200">Bienvenido a:</span>
          <span className="text-cyan-300 font-bold">La Nueva Era de Los Daddys</span>
          <Sparkles className="w-3.5 h-3.5 text-yellow-400 ml-1" />
        </div>

        {/* Main Title */}
        <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[1.1] max-w-4xl mx-auto">
          <span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400 bg-clip-text text-transparent drop-shadow-sm">
            {config.serverName}
          </span>
        </h1>

        {/* Subtitle */}
        <p className="mt-6 text-lg sm:text-2xl text-slate-300 font-medium max-w-2xl mx-auto leading-relaxed">
          Amistad, risas, gaming y directos sin filtros
        </p>

        <p className="mt-2 text-sm sm:text-base text-slate-400 max-w-xl mx-auto leading-relaxed">
          La época de las apuestas y las monedas ha terminado. Inauguramos este nuevo espacio dedicado a lo que de verdad importa: nuestra gente.
        </p>

        {/* Hero CTA Buttons */}
        <div className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
          <a
            href={config.discordInviteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl font-bold text-base text-slate-950 bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400 hover:brightness-110 shadow-[0_0_25px_rgba(6,182,212,0.35)] transition-all transform hover:-translate-y-0.5 active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-cyan-400"
          >
            <MessageSquare className="w-5 h-5 fill-slate-950" />
            <span>Entrar al Servidor</span>
            <ArrowRight className="w-4 h-4 ml-0.5" />
          </a>

          <a
            href="#nueva-era"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-2xl font-semibold text-base text-slate-200 bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 hover:border-cyan-500/40 transition-all hover:text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
          >
            <Sparkles className="w-5 h-5 text-amber-400" />
            <span>Conocer la Nueva Era</span>
          </a>
        </div>

        {/* Community Highlights Pillars Banner */}
        <div className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto text-left">
          
          <div className="glass-card p-5 rounded-2xl border border-slate-800/80 bg-slate-900/60 hover:border-cyan-500/30 transition-all">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400">
                <Headphones className="w-5 h-5" />
              </div>
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Voz Activa</span>
            </div>
            <p className="text-xl font-bold text-white font-display">
              Canales 24/7
            </p>
            <span className="text-xs text-slate-400">Charlas libres y música sin parar</span>
          </div>

          <div className="glass-card p-5 rounded-2xl border border-slate-800/80 bg-slate-900/60 hover:border-purple-500/30 transition-all">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400">
                <Gamepad2 className="w-5 h-5" />
              </div>
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Gaming</span>
            </div>
            <p className="text-xl font-bold text-white font-display">
              Partidas en Grupo
            </p>
            <span className="text-xs text-slate-400">Diversión en equipo todos los días</span>
          </div>

          <div className="glass-card p-5 rounded-2xl border border-slate-800/80 bg-slate-900/60 hover:border-red-500/30 transition-all">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-xl bg-red-500/10 text-red-400">
                <Radio className="w-5 h-5" />
              </div>
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Transmisiones</span>
            </div>
            <p className="text-xl font-bold text-white font-display">
              Los Daddys Live
            </p>
            <span className="text-xs text-slate-400">Directos y momentos especiales</span>
          </div>

          <div className="glass-card p-5 rounded-2xl border border-slate-800/80 bg-slate-900/60 hover:border-emerald-500/30 transition-all">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400">
                <Heart className="w-5 h-5" />
              </div>
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Convivencia</span>
            </div>
            <p className="text-xl font-bold text-white font-display">
              Pura Amistad
            </p>
            <span className="text-xs text-slate-400">Cero deudas, cero rivalidades</span>
          </div>

        </div>

      </div>
    </section>
  );
};
