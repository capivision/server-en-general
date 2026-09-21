import React from 'react';
import { ServerConfig } from '../types';
import { 
  Headphones, 
  Gamepad2, 
  Radio, 
  Users, 
  ShieldCheck, 
  Smile, 
  Sparkles, 
  MessageSquare,
  ArrowRight
} from 'lucide-react';

interface NewEraCommunitySectionProps {
  config: ServerConfig;
}

export const NewEraCommunitySection: React.FC<NewEraCommunitySectionProps> = ({ config }) => {
  const pillars = [
    {
      icon: Headphones,
      color: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20',
      title: 'Canales de Voz 24/7',
      description: 'Salas de charla libres para hablar de cualquier tema, escuchar música, compartir anécdotas o simplemente pasar la tarde con amigos.'
    },
    {
      icon: Gamepad2,
      color: 'text-purple-400 bg-purple-500/10 border-purple-500/20',
      title: 'Noches de Gaming en Grupo',
      description: 'Partidas conjuntas a videojuegos de todo tipo sin la presión de ganar monedas virtuales. Ven a divertirte y jugar en equipo.'
    },
    {
      icon: Radio,
      color: 'text-red-400 bg-red-500/10 border-red-500/20',
      title: 'Los Daddys Live & Directos',
      description: 'Transmisiones en vivo, charlas especiales de los administradores y momentos destacados compartidos con toda la comunidad.'
    },
    {
      icon: Smile,
      color: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
      title: 'Ambiente Sin Toxicidad',
      description: 'Al eliminar el dinero y las apuestas del servidor, garantizamos una convivencia sana, libre de robos, deudas o enfados innecesarios.'
    },
    {
      icon: Users,
      color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
      title: 'Roles de Comunidad Reales',
      description: 'Reconocimientos por lealtad, simpatía y aportación a la comunidad, en lugar de cuántas monedas acumulaste con comandos.'
    },
    {
      icon: ShieldCheck,
      color: 'text-blue-400 bg-blue-500/10 border-blue-500/20',
      title: 'Moderación Activa & Respeto',
      description: 'Un equipo de moderadores atento para que cada miembro, nuevo o veterano, se sienta seguro y bien recibido.'
    }
  ];

  return (
    <section id="nueva-era" className="py-16 md:py-24 bg-[#0b0f17] relative">
      {/* Background glow */}
      <div className="absolute top-1/3 right-10 w-80 h-80 bg-cyan-500/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-purple-500/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono font-bold tracking-wider uppercase mb-3">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span>LA NUEVA ERA DE LOS DADDYS</span>
          </div>

          <h2 className="font-display text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            ¿Qué Hacemos Ahora en{' '}
            <span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400 bg-clip-text text-transparent">
              {config.serverName}?
            </span>
          </h2>

          <p className="mt-4 text-slate-300 text-base sm:text-lg leading-relaxed">
            Una comunidad pura para conectar personas. Sin monedas, sin bots de apuestas y sin barreras. Solo buena vibra y diversión real.
          </p>
        </div>

        {/* Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {pillars.map((pillar, index) => {
            const Icon = pillar.icon;
            return (
              <div
                key={index}
                className="glass-card rounded-2xl p-6 border border-slate-800/90 hover:border-cyan-500/40 transition-all hover:-translate-y-1 group bg-slate-900/60"
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center border mb-5 transition-transform group-hover:scale-110 ${pillar.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-display font-bold text-lg text-white group-hover:text-cyan-300 transition-colors mb-2">
                  {pillar.title}
                </h3>
                <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Join Call to Action Card */}
        <div className="rounded-3xl bg-gradient-to-r from-slate-900 via-cyan-950/40 to-slate-900 border border-cyan-500/30 p-8 sm:p-12 text-center relative overflow-hidden shadow-2xl">
          <div className="max-w-2xl mx-auto space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/20 border border-cyan-400/40 text-cyan-300 text-xs font-bold font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>SERVIDOR ACTIVO EN DISCORD</span>
            </div>

            <h3 className="font-display text-2xl sm:text-4xl font-black text-white">
              ¿Listo para formar parte de la nueva etapa?
            </h3>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Únete hoy mismo a nuestro servidor de Discord. Preséntate en el canal de bienvenida, saluda a la gente y ven a pasar tus mejores mañanas, tardes y noches con nosotros.
            </p>

            <div className="pt-2">
              <a
                href={config.discordInviteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl font-bold text-base text-slate-950 bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400 hover:brightness-110 shadow-[0_0_25px_rgba(6,182,212,0.35)] transition-all transform hover:-translate-y-0.5 active:scale-95"
              >
                <MessageSquare className="w-5 h-5 fill-slate-950" />
                <span>Entrar al Servidor de Discord</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
