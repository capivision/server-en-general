import React, { useState } from 'react';
import { 
  HelpCircle, 
  ChevronDown, 
  Search, 
  Sparkles 
} from 'lucide-react';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

const NEW_ERA_FAQS: FAQItem[] = [
  {
    id: 'faq-1',
    question: '¿Por qué se eliminaron las monedas, el casino y los minijuegos?',
    answer: 'Esa época cumplió su ciclo y nos brindó grandes momentos, pero también generaba distracciones, spam de comandos y rivalidades innecesarias. Decidimos cerrar ese capítulo para inaugurar una comunidad más madura, sana y enfocada en lo que de verdad vale la pena: la amistad, las risas en canales de voz y el gaming.',
    category: 'Comunidad'
  },
  {
    id: 'faq-2',
    question: '¿Qué actividades hacemos ahora en el servidor?',
    answer: 'Nuestras actividades principales son las charlas libres en canales de voz, noches de videojuegos en equipo (Valorant, GTA, Rust, Among Us, Counter-Strike, etc.), transmisiones de directos oficiales de Los Daddys y dinámicas comunitarias.',
    category: 'Actividades'
  },
  {
    id: 'faq-3',
    question: '¿Cómo puedo obtener roles en la nueva era?',
    answer: 'Los roles se asignan por mérito comunitario: antigüedad en el servidor, participación activa y respetuosa en los chats de voz y texto, o roles especiales para streamers, creadores y amigos de la casa.',
    category: 'Roles'
  },
  {
    id: 'faq-4',
    question: '¿Es completamente gratis participar en la comunidad?',
    answer: '¡Por supuesto! Todo en Server en General y Los Daddys es 100% abierto y gratuito. No hay pagos, membresías forzadas ni micropagos de ningún tipo.',
    category: 'General'
  },
  {
    id: 'faq-5',
    question: '¿Puedo revivir la ceremonia del corte de cinta?',
    answer: '¡Sí! Si quieres volver a ver las tijeras cortar la cinta ceremonial y leer la dedicatoria oficial, pulsa el botón "✂️ Inauguración" ubicado en el menú superior de la página o en el pie de página.',
    category: 'Inauguración'
  }
];

export const FAQSection: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>('faq-1');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredFAQs = NEW_ERA_FAQS.filter(
    (item) =>
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section id="faq" className="py-16 md:py-24 bg-[#0b0f17] relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-bold uppercase tracking-wider mb-3">
            <HelpCircle className="w-4 h-4 text-cyan-400" />
            <span>Resolución de Dudas</span>
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-black text-white tracking-tight">
            Preguntas Frecuentes (FAQ)
          </h2>
          <p className="mt-4 text-slate-300 text-base sm:text-lg">
            Todo lo que necesitas saber sobre la nueva etapa y el funcionamiento de la comunidad.
          </p>
        </div>

        {/* Search input */}
        <div className="relative mb-8">
          <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Buscar pregunta o palabra clave..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-slate-900 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/80 transition-all text-sm"
          />
        </div>

        {/* Accordion list */}
        <div className="space-y-4">
          {filteredFAQs.length > 0 ? (
            filteredFAQs.map((item) => {
              const isOpen = openId === item.id;
              return (
                <div
                  key={item.id}
                  className="glass-card rounded-2xl border border-slate-800/80 overflow-hidden transition-all duration-200"
                >
                  <button
                    onClick={() => setOpenId(isOpen ? null : item.id)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 font-display font-bold text-base sm:text-lg text-white hover:text-cyan-400 transition-colors focus:outline-none"
                    aria-expanded={isOpen}
                  >
                    <span className="flex items-center gap-3">
                      <Sparkles className="w-4 h-4 text-cyan-400 shrink-0" />
                      <span>{item.question}</span>
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-cyan-400' : ''
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-slate-300 text-sm leading-relaxed border-t border-slate-800/60 bg-slate-950/40 animate-in fade-in">
                      <p className="pl-7">{item.answer}</p>
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <div className="text-center py-12 text-slate-500 text-sm">
              No se encontraron preguntas coincidentes con "{searchQuery}"
            </div>
          )}
        </div>

      </div>
    </section>
  );
};
