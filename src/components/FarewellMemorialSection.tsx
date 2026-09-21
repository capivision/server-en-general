import React from 'react';
import { Sparkles, Heart, ShieldCheck, Award, Flame, Lock } from 'lucide-react';

export const FarewellMemorialSection: React.FC = () => {
  return (
    <section id="despedida" className="py-16 md:py-24 bg-gradient-to-b from-[#0b0f17] via-[#0d1322] to-[#0b0f17] relative overflow-hidden border-t border-slate-800/80">
      
      {/* Ambient background glows */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-amber-500/10 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-red-500/10 blur-[130px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Badge */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-mono font-bold tracking-wider uppercase mb-3">
            <Award className="w-4 h-4 text-amber-400" />
            <span>HOMENAJE Y MEMORIAL OFICIAL</span>
          </div>

          <h2 className="font-display text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            El Adiós a la Época del Casino{' '}
            <span className="bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-500 bg-clip-text text-transparent block sm:inline">
              y las Monedas Virtuales
            </span>
          </h2>

          <p className="mt-4 text-slate-300 text-base sm:text-lg leading-relaxed">
            Recordamos con una sonrisa cada apuesta, cada bancarrota y cada minijuego. Pero hoy cerramos esa puerta para inaugurar una comunidad mucho más unida, sana y real.
          </p>
        </div>

        {/* Nostalgic Memory Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          
          <div className="glass-card rounded-2xl p-6 border border-slate-800/90 hover:border-amber-500/40 transition-all bg-slate-900/60 relative group">
            <div className="w-12 h-12 rounded-xl bg-red-500/10 text-red-400 flex items-center justify-center text-2xl mb-4 border border-red-500/20 group-hover:scale-110 transition-transform">
              🎰
            </div>
            <h3 className="font-display font-bold text-lg text-white mb-2 flex items-center gap-2">
              <span>Las Ruletas & Tragaperras</span>
            </h3>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
              Tirar la ruleta diaria esperando el Jackpot o arriesgarlo todo en el blackjack a las 3 de la mañana. Vivimos momentos de euforia y risas cuando alguien perdía todo su saldo en 3 segundos.
            </p>
            <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] font-mono text-amber-400/80 flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5" />
              <span>Etapa Concluida y Archivada</span>
            </div>
          </div>

          <div className="glass-card rounded-2xl p-6 border border-slate-800/90 hover:border-amber-500/40 transition-all bg-slate-900/60 relative group">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center text-2xl mb-4 border border-amber-500/20 group-hover:scale-110 transition-transform">
              🪙
            </div>
            <h3 className="font-display font-bold text-lg text-white mb-2 flex items-center gap-2">
              <span>La Carrera por el Dinero</span>
            </h3>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
              Trabajar con <code className="text-amber-300">!work</code>, arriesgarse en <code className="text-amber-300">!crime</code> y guardar todo en el banco para no ser robado. Aprendimos que el dinero virtual no define el valor de una persona en el servidor.
            </p>
            <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] font-mono text-amber-400/80 flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5" />
              <span>Cero Deudas, Cero Rivalidad</span>
            </div>
          </div>

          <div className="glass-card rounded-2xl p-6 border border-slate-800/90 hover:border-emerald-500/40 transition-all bg-slate-900/60 relative group">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center text-2xl mb-4 border border-emerald-500/20 group-hover:scale-110 transition-transform">
              🤝
            </div>
            <h3 className="font-display font-bold text-lg text-white mb-2 flex items-center gap-2">
              <span>La Verdadera Esencia</span>
            </h3>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
              Lo mejor de esa época no fueron las monedas, sino las personas que conocimos mientras jugábamos. Hoy nos quedamos con los amigos, las charlas y las ganas de seguir compartiendo grandes momentos.
            </p>
            <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] font-mono text-emerald-400 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>El Legado Que Permanece</span>
            </div>
          </div>

        </div>

        {/* Large Memorial Tribute Banner */}
        <div className="bg-gradient-to-r from-slate-900 via-amber-950/30 to-slate-900 border border-amber-500/30 rounded-3xl p-8 sm:p-10 text-center relative overflow-hidden shadow-2xl">
          <div className="max-w-2xl mx-auto space-y-4">
            <span className="text-3xl">🏛️</span>
            <h4 className="font-display font-black text-2xl sm:text-3xl text-white">
              "Gracias por cada tirada, cada risa y cada intento."
            </h4>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Los Daddys y Server en General agradecen a todos los veteranos que formaron parte de aquella era. Hoy inauguramos un espacio libre de economía virtual donde todos somos iguales y donde lo que cuenta es pasar un buen rato.
            </p>
            <div className="pt-2 flex items-center justify-center gap-2 text-xs font-mono text-amber-300">
              <Heart className="w-4 h-4 text-red-400 fill-red-400" />
              <span>La época ha terminado oficialmente con honor y cariño.</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
