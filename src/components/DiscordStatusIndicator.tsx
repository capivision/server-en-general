import React, { useState } from 'react';
import { 
  MessageSquare, 
  Sparkles, 
  ExternalLink, 
  ShieldCheck, 
  Radio, 
  Headphones, 
  Gamepad2, 
  Users,
  CheckCircle2,
  Info
} from 'lucide-react';

interface DiscordStatusIndicatorProps {
  serverId?: string;
  serverName: string;
  inviteUrl: string;
}

export const DiscordStatusIndicator: React.FC<DiscordStatusIndicatorProps> = ({
  serverId = '1431732304031780998',
  serverName,
  inviteUrl
}) => {
  const [isIframeLoaded, setIsIframeLoaded] = useState(false);

  return (
    <div className="w-full rounded-3xl bg-gradient-to-br from-slate-900/95 via-[#0b0f19]/98 to-[#06080e]/95 border border-cyan-500/30 p-6 sm:p-8 backdrop-blur-xl shadow-[0_0_50px_rgba(6,182,212,0.12)] relative overflow-hidden">
      
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
        
        {/* Left / Info & Community Highlights (7 cols on lg) */}
        <div className="lg:col-span-7 space-y-6">
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 text-xs font-mono font-bold tracking-wider uppercase shadow-[0_0_15px_rgba(6,182,212,0.25)]">
            <Radio className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
            <span>WIDGET OFICIAL EN DIRECTO</span>
          </div>

          <div>
            <h3 className="font-display text-2xl sm:text-4xl font-black text-white tracking-tight leading-tight">
              Conéctate a la Comunidad de{' '}
              <span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-indigo-400 bg-clip-text text-transparent">
                {serverName}
              </span>
            </h3>
            <p className="mt-3 text-slate-300 text-sm sm:text-base leading-relaxed">
              Mira en vivo quiénes están charlando en los canales de voz, qué partidas se están jugando y únete con un solo clic a la Nueva Era de Los Daddys.
            </p>
          </div>

          {/* Highlights grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 font-mono text-xs">
            <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-start gap-3">
              <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 shrink-0">
                <Headphones className="w-4 h-4" />
              </div>
              <div>
                <strong className="text-white block font-sans font-bold text-xs">Canales de Voz 24/7</strong>
                <span className="text-slate-400 text-[11px]">Salas abiertas para charlar y conocer gente</span>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-start gap-3">
              <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20 shrink-0">
                <Gamepad2 className="w-4 h-4" />
              </div>
              <div>
                <strong className="text-white block font-sans font-bold text-xs">Noches de Gaming</strong>
                <span className="text-slate-400 text-[11px]">Juegos cooperativos, streams y partidas comunitarias</span>
              </div>
            </div>
          </div>

          {/* Join CTA and Helper info */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <a
              href={inviteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-cyan-400 via-teal-300 to-indigo-500 text-slate-950 font-bold text-sm hover:brightness-110 shadow-[0_0_25px_rgba(6,182,212,0.35)] transition-all transform active:scale-95 cursor-pointer"
            >
              <MessageSquare className="w-4 h-4 fill-slate-950" />
              <span>Entrar al Discord Ahora</span>
              <ExternalLink className="w-3.5 h-3.5 ml-0.5 opacity-80" />
            </a>

            <div className="flex items-center gap-1.5 text-xs text-slate-400 font-mono">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Servidor verificado y seguro</span>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 flex items-center gap-2.5 text-[11px] text-slate-400 font-mono">
            <Info className="w-4 h-4 text-cyan-400 shrink-0" />
            <span>
              Para que el cuadro muestre todos los usuarios, recuerda tener marcada la opción <strong>"Habilitar widget del servidor"</strong> en los Ajustes de Discord.
            </span>
          </div>

        </div>

        {/* Right / Modern Discord Widget Iframe Container (5 cols on lg) */}
        <div className="lg:col-span-5 flex justify-center lg:justify-end">
          
          <div className="w-full max-w-[350px] relative rounded-3xl p-1 bg-gradient-to-b from-cyan-500/40 via-slate-800/60 to-purple-500/30 shadow-[0_10px_40px_rgba(0,0,0,0.8)] border border-cyan-500/20">
            
            {/* Glossy shine bar on top */}
            <div className="h-2 w-20 bg-white/20 rounded-full mx-auto my-1.5 blur-[0.5px]" />

            <div className="rounded-[22px] overflow-hidden bg-[#2f3136] relative shadow-inner">
              
              {/* Fallback spinner while iframe loads */}
              {!isIframeLoaded && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#2f3136] text-slate-300 gap-3 z-10">
                  <div className="w-8 h-8 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
                  <span className="text-xs font-mono text-slate-400">Cargando Discord Widget...</span>
                </div>
              )}

              {/* The requested Discord Widget Iframe */}
              <iframe
                src={`https://discord.com/widget?id=${serverId}&theme=dark`}
                width="350"
                height="500"
                title="Discord Widget"
                sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
                onLoad={() => setIsIframeLoaded(true)}
                className="w-full h-[500px] border-0 block"
              />

            </div>

            {/* Bottom glow accent */}
            <div className="flex items-center justify-between px-3 py-2 text-[10px] font-mono text-slate-400">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Widget Interactivo</span>
              </span>
              <span className="text-cyan-400">Discord® API</span>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
};
