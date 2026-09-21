import { ServerConfig, LeaderboardUser, EconomyCommand, CasinoLimitRule, FAQItem } from '../types';
import serverCarLogo from '../assets/images/server_car_logo_1785183530702.jpg';

export const DEFAULT_CONFIG: ServerConfig = {
  serverName: 'Server en general',
  serverLogoUrl: serverCarLogo,
  poweredBy: 'powered by LosDaddys®',
  currencyName: 'Monedas',
  currencyEmoji: '🪙',
  discordInviteUrl: 'https://discord.gg/Tfbznzrb8g',
  discordServerId: '1431732304031780998',
  leaderboardIframeUrl: 'https://unbelievaboat.com/leaderboard/1431732304031780998',
  botInviteUrl: 'https://unbelievaboat.com/',
  serverRulesUrl: '#rules',
  supportTicketUrl: '#support',
  noticeWidgetTitle: 'Anuncios Económicos & Novedades',
  noticeWidgetContent: '¡Nuevo evento de Fin de Semana! multiplicador x2 de monedas en chat de voz y premios dobles en el casino todos los sábados.',
};

export const SAMPLE_LEADERBOARD: LeaderboardUser[] = [
  {
    rank: 1,
    username: 'ApexPredator',
    discriminator: '0001',
    avatarUrl: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=150&auto=format&fit=crop&q=80',
    cash: 2450000,
    bank: 15800000,
    total: 18250000,
    role: 'VIP Diamond',
    roleColor: 'border-cyan-400 text-cyan-400 bg-cyan-950/50'
  },
  {
    rank: 2,
    username: 'CyberQueen',
    discriminator: '1337',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    cash: 890000,
    bank: 12400000,
    total: 13290000,
    role: 'Casino Master',
    roleColor: 'border-emerald-400 text-emerald-400 bg-emerald-950/50'
  },
  {
    rank: 3,
    username: 'NeonRider',
    discriminator: '7777',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    cash: 1200000,
    bank: 9800000,
    total: 11000000,
    role: 'High Roller',
    roleColor: 'border-purple-400 text-purple-400 bg-purple-950/50'
  },
  {
    rank: 4,
    username: 'Vortex_Gamer',
    discriminator: '4040',
    avatarUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
    cash: 340000,
    bank: 7200000,
    total: 7540000,
    role: 'Booster',
    roleColor: 'border-pink-400 text-pink-400 bg-pink-950/50'
  },
  {
    rank: 5,
    username: 'ShadowTrader',
    discriminator: '9090',
    avatarUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
    cash: 510000,
    bank: 5400000,
    total: 5910000,
    role: 'Trader Pro',
    roleColor: 'border-amber-400 text-amber-400 bg-amber-950/50'
  },
  {
    rank: 6,
    username: 'GigaChad_DC',
    discriminator: '2024',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    cash: 120000,
    bank: 4300000,
    total: 4420000,
    role: 'Activo',
    roleColor: 'border-slate-400 text-slate-300 bg-slate-800/50'
  },
  {
    rank: 7,
    username: 'PixelWarrior',
    discriminator: '8888',
    avatarUrl: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80',
    cash: 95000,
    bank: 3100000,
    total: 3195000,
    role: 'Miembro',
    roleColor: 'border-slate-500 text-slate-400 bg-slate-800/40'
  },
  {
    rank: 8,
    username: 'Astraea',
    discriminator: '1212',
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    cash: 450000,
    bank: 2200000,
    total: 2650000,
    role: 'Miembro',
    roleColor: 'border-slate-500 text-slate-400 bg-slate-800/40'
  }
];

export const ECONOMY_COMMANDS: EconomyCommand[] = [
  {
    command: '!balance',
    description: 'Consulta tus monedas en efectivo y en el banco.',
    category: 'básico',
    example: '!balance [usuario]'
  },
  {
    command: '!collect-income',
    description: 'Reclama tu ingreso diario gratuito de monedas.',
    category: 'ganancia',
    cooldown: '24 horas',
    example: '!collect-income'
  },
  {
    command: '!work',
    description: 'Trabaja en el servidor para ganar un sueldo fijo.',
    category: 'ganancia',
    cooldown: '2 minutos',
    example: '!work'
  },
  {
    command: '!crime',
    description: 'Arriésgate a cometer un crimen para ganar gran botín (¡o multa!).',
    category: 'ganancia',
    cooldown: '4 horas',
    example: '!crime'
  },
  {
    command: '!deposit',
    description: 'Guarda tu dinero en efectivo en el banco para protegerlo.',
    category: 'gestión',
    example: '!deposit all'
  },
  {
    command: '!withdraw',
    description: 'Saca monedas del banco para jugar o comerciar.',
    category: 'gestión',
    example: '!withdraw 5000'
  },
  {
    command: '!roulette',
    description: 'Apuesta a colores o números en la ruleta del casino.',
    category: 'casino',
    example: '!roulette 1000 red'
  },
  {
    command: '!blackjack',
    description: 'Juega al Blackjack contra el bot para duplicar tu apuesta.',
    category: 'casino',
    example: '!blackjack 5000'
  },
  {
    command: '!cockfight',
    description: 'Apuesta en peleas de minijuegos con probabilidad de ganancia.',
    category: 'casino',
    example: '!cockfight 2500'
  },
  {
    command: '!slot-machine',
    description: 'Apuesta tus monedas en la máquina tragaperras.',
    category: 'casino',
    cooldown: '10 segundos',
    example: '!slot-machine 1000'
  },
  {
    command: '!russian-roulette',
    description: 'Desafía tu suerte en la ruleta rusa con riesgo de perder tus monedas.',
    category: 'casino',
    cooldown: '30 segundos',
    example: '!russian-roulette 5000'
  },
  {
    command: '!store',
    description: 'Muestra la tienda oficial para comprar roles, ventajas y items.',
    category: 'gestión',
    example: '!store'
  }
];

export const CASINO_LIMITS: CasinoLimitRule[] = [
  {
    game: 'Ruleta (Roulette)',
    minBet: '🪙 100',
    maxBet: '🪙 100,000',
    cooldown: '15 segundos',
    penalty: 'Advertencia / Cooldown temporal'
  },
  {
    game: 'Blackjack',
    minBet: '🪙 500',
    maxBet: '🪙 250,000',
    cooldown: '30 segundos',
    penalty: 'Reinicio de partida sin reembolso'
  },
  {
    game: 'Tragaperras (Slots / Slot-Machine)',
    minBet: '🪙 50',
    maxBet: '🪙 50,000',
    cooldown: '10 segundos',
    penalty: 'Advertencia por spam de comandos'
  },
  {
    game: 'Ruleta Rusa (Russian Roulette)',
    minBet: '🪙 1,000',
    maxBet: '🪙 100,000',
    cooldown: '30 segundos',
    penalty: 'Pérdida total del saldo o ban de juego'
  },
  {
    game: 'Lanzamiento de Moneda (Coinflip)',
    minBet: '🪙 100',
    maxBet: '🪙 500,000',
    cooldown: '10 segundos',
    penalty: 'Bloqueo temporal del comando'
  },
  {
    game: 'Robo entre Usuarios (Rob/Steal)',
    minBet: 'N/A (Costo éxito/fallo)',
    maxBet: '50% del saldo libre',
    cooldown: '4 horas',
    penalty: 'Multa automática del banco'
  }
];

export const FAQ_ITEMS: FAQItem[] = [
  {
    id: 'faq-1',
    question: '¿Cómo conecto mi cuenta de Discord?',
    answer: 'No necesitas ningún registro externo. Basta con estar dentro de nuestro servidor de Discord y empezar a hablar en canales de texto o voz, o usar comandos como !collect-income para que UnbelievaBoat registre tus monedas automáticamente.',
    category: 'General'
  },
  {
    id: 'faq-2',
    question: '¿Cuándo se actualiza el ranking del Leaderboard?',
    answer: 'El leaderboard público se actualiza en tiempo real de forma inmediata en cuanto UnbelievaBoat procesa cada transacción, recompensa o apuesta en el servidor.',
    category: 'Leaderboard'
  },
  {
    id: 'faq-3',
    question: '¿Qué pasa si hago trampa, uso macros o cuentas secundarias?',
    answer: 'El uso de autoclickers, macros, cuentas alter/multi-cuentas o explotación de errores resultará en el reseteo completo de tu saldo, ban permanente del sistema de economía y posibles sanciones en el servidor.',
    category: 'Seguridad'
  },
  {
    id: 'faq-4',
    question: '¿Cómo protejo mis monedas de robos?',
    answer: 'Usa el comando !deposit all para mover todo tu efectivo al banco. Las monedas guardadas en el banco no pueden ser robadas con el comando !rob por otros jugadores.',
    category: 'Economía'
  },
  {
    id: 'faq-5',
    question: '¿Las monedas equivalen a dinero real?',
    answer: 'No. La economía del servidor es 100% ficticia y virtual para entretenimiento de la comunidad. No tienen valor monetario real ni se pueden cambiar por dinero fiduciario.',
    category: 'General'
  }
];
