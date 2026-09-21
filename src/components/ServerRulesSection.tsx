import React, { useState } from 'react';
import { ServerConfig } from '../types';
import { 
  Scroll, 
  AlertTriangle, 
  Gavel, 
  Search,
  ShieldCheck,
  Ban,
  CheckCircle2,
  Users
} from 'lucide-react';

interface ServerRulesSectionProps {
  config: ServerConfig;
}

export interface CommunityRuleItem {
  id: number;
  emoji: string;
  title: string;
  description: string;
  sanction: string;
  isSevere?: boolean;
}

export const COMMUNITY_RULES: CommunityRuleItem[] = [
  {
    id: 1,
    emoji: '🤝',
    title: 'Trato respetuoso y convivencia sana.',
    description: 'Trata a todos los miembros con educación. Prohibidos los insultos personales, el acoso y cualquier forma de discriminación.',
    sanction: 'Advertencia / Mute temporal',
  },
  {
    id: 2,
    emoji: '🎙️',
    title: 'Comportamiento en canales de voz.',
    description: 'No grites, no satures el micrófono deliberadamente ni pongas ruidos molestos. Si tienes ruido de fondo, usa pulsar para hablar.',
    sanction: 'Mute en canal de voz',
  },
  {
    id: 3,
    emoji: '🚫',
    title: 'Cero toxicidad y discusiones destructivas.',
    description: 'Los debates son bienvenidos, pero si una conversación se torna hostil o agresiva, el staff intervendrá para cortar el tema.',
    sanction: 'Mute temporal de 24h',
  },
  {
    id: 4,
    emoji: '🔞',
    title: 'Prohibido contenido NSFW, gore o peligroso.',
    description: 'Tolerancia cero con imágenes, enlaces o textos explícitos de índole sexual, gore o violenta.',
    sanction: 'Baneo permanente inmediato',
    isSevere: true,
  },
  {
    id: 5,
    emoji: '📢',
    title: 'No realizar autopromoción ni spam no autorizado.',
    description: 'No compartas enlaces de otros servidores de Discord, redes sociales ajenas o ventas sin autorización previa de la administración.',
    sanction: 'Eliminación del mensaje + Aviso',
  },
  {
    id: 6,
    emoji: '📁',
    title: 'Utiliza cada canal según su propósito.',
    description: 'Respeta la temática asignada a cada canal (#general, #gaming, #memes, #musica, etc.) para mantener el orden.',
    sanction: 'Aviso amistoso del Staff',
  },
  {
    id: 7,
    emoji: '🔠',
    title: 'No hacer spam masivo de menciones o mayúsculas.',
    description: 'Evita mencionar repetidamente al Staff o a @everyone/@here sin motivo urgente, y no inundes los chats con flood.',
    sanction: 'Mute temporal por spam',
  },
  {
    id: 8,
    emoji: '🎭',
    title: 'No suplantar la identidad de otros miembros o del Staff.',
    description: 'Hacerse pasar por administradores, streamers o moderadores acarreará sanciones severas e inmediatas.',
    sanction: 'Expulsión / Baneo del servidor',
    isSevere: true,
  },
  {
    id: 9,
    emoji: '🛡️',
    title: 'Privacidad y seguridad de los miembros.',
    description: 'Prohibido filtrar datos personales (doxxing), fotos privadas o conversaciones privadas sin el consentimiento explícito de la persona.',
    sanction: 'Baneo permanente',
    isSevere: true,
  },
  {
    id: 10,
    emoji: '🔗',
    title: 'Prohibido enviar enlaces maliciosos, phishing o virus.',
    description: 'Cualquier enlace sospechoso de robar cuentas de Discord, Steam o información personal provocará expulsión directa.',
    sanction: 'Baneo permanente',
    isSevere: true,
  },
  {
    id: 11,
    emoji: '⚖️',
    title: 'Respeto a las decisiones de la moderación.',
    description: 'Si consideras que una sanción ha sido injusta, contacta pacíficamente por mensaje privado a un Administrador en lugar de montar drama en el chat general.',
    sanction: 'Aviso / Suspensión temporal',
  },
  {
    id: 12,
    emoji: '✨',
    title: 'Ven a pasarla bien y hacer amigos.',
    description: 'La regla más importante de la nueva era: pásalo genial, disfruta de los juegos y apoya a los compañeros de la comunidad.',
    sanction: '¡Premio de bienvenida y buen rollo!',
  }
];

export const ServerRulesSection: React.FC<ServerRulesSectionProps> = ({ config }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredRules = COMMUNITY_RULES.filter(
    (rule) =>
      rule.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rule.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rule.sanction.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section id="reglas" className="py-16 md:py-24 bg-[#0b0f17] relative">
      {/* Decorative gradient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-cyan-500/5 blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-bold uppercase tracking-wider mb-3">
            <Scroll className="w-4 h-4 text-cyan-400" />
            <span>Convivencia & Comunidad</span>
          </div>

          <h2 className="font-display text-3xl sm:text-5xl font-black text-white tracking-tight flex items-center justify-center gap-3">
            <span>📜 Reglas de Convivencia</span>
          </h2>

          <p className="mt-4 text-slate-300 text-base sm:text-lg">
            Normativa oficial para garantizar una estancia divertida, segura y acogedora en {config.serverName}.
          </p>
        </div>

        {/* Global Staff Notice */}
        <div className="mb-10 bg-slate-900/90 border border-cyan-500/30 rounded-2xl p-5 sm:p-6 backdrop-blur-md flex flex-col sm:flex-row items-start sm:items-center gap-4 text-slate-200 shadow-[0_0_20px_rgba(6,182,212,0.08)]">
          <div className="p-3 bg-cyan-500/20 rounded-xl text-cyan-400 shrink-0">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-display font-bold text-base text-cyan-300 flex items-center gap-2">
              🛡️ Una Comunidad Basada en el Sentido Común
            </h4>
            <p className="text-sm mt-0.5 text-slate-300 leading-relaxed">
              En esta nueva era no existen multas de dinero ni penalizaciones económicas. Las sanciones se limitan a medidas de moderación necesarias para proteger la armonía de todos los miembros.
            </p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="max-w-md mx-auto mb-10">
          <div className="relative">
            <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar regla por palabra clave..."
              className="w-full bg-slate-900/90 border border-slate-800 rounded-2xl pl-11 pr-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all"
            />
          </div>
        </div>

        {/* Rules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filteredRules.map((rule) => {
            return (
              <div
                key={rule.id}
                className={`group relative rounded-2xl p-5 border transition-all duration-200 flex flex-col justify-between ${
                  rule.isSevere
                    ? 'bg-gradient-to-b from-red-950/20 to-slate-900/80 border-red-900/40 hover:border-red-500/60 shadow-[0_0_15px_rgba(239,68,68,0.05)]'
                    : 'bg-slate-900/70 hover:bg-slate-900 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl p-2 rounded-xl bg-slate-800/80 border border-slate-700/50 shrink-0">
                        {rule.emoji}
                      </span>
                      <span className="text-xs font-mono font-semibold px-2.5 py-1 rounded-full bg-slate-800 text-slate-400 border border-slate-700">
                        Norma #{rule.id}
                      </span>
                    </div>

                    {rule.isSevere && (
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full bg-red-500/10 text-red-400 border border-red-500/30 shrink-0">
                        <Ban className="w-3 h-3" />
                        Infracción Grave
                      </span>
                    )}
                  </div>

                  <h3 className="font-display font-bold text-base text-white group-hover:text-cyan-300 transition-colors leading-snug">
                    {rule.title}
                  </h3>

                  <p className="text-slate-400 text-xs mt-1.5 leading-relaxed">
                    {rule.description}
                  </p>
                </div>

                {/* Sanction Callout */}
                <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
                  <span className="text-slate-400 font-medium flex items-center gap-1.5">
                    <Gavel className="w-3.5 h-3.5 text-slate-500" />
                    Medida de Moderación:
                  </span>
                  <span
                    className={`font-mono font-bold px-2.5 py-1 rounded-lg border ${
                      rule.isSevere
                        ? 'bg-red-950/50 text-red-300 border-red-800/60'
                        : 'bg-cyan-950/40 text-cyan-300 border-cyan-800/40'
                    }`}
                  >
                    {rule.sanction}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {filteredRules.length === 0 && (
          <div className="text-center py-12 bg-slate-900/50 rounded-2xl border border-slate-800 text-slate-400 text-sm">
            No se encontraron reglas con la palabra "<span className="text-white">{searchTerm}</span>".
          </div>
        )}

      </div>
    </section>
  );
};
