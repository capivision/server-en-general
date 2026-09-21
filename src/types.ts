export interface ServerConfig {
  serverName: string;
  serverLogoUrl?: string;
  poweredBy?: string;
  currencyName: string;
  currencyEmoji: string;
  discordInviteUrl: string;
  discordServerId?: string;
  leaderboardIframeUrl: string;
  botInviteUrl: string;
  serverRulesUrl: string;
  supportTicketUrl: string;
  noticeWidgetTitle: string;
  noticeWidgetContent: string;
}

export interface LeaderboardUser {
  rank: number;
  username: string;
  discriminator: string;
  avatarUrl: string;
  cash: number;
  bank: number;
  total: number;
  role?: string;
  roleColor?: string;
}

export interface EconomyCommand {
  command: string;
  description: string;
  category: 'básico' | 'ganancia' | 'casino' | 'gestión';
  cooldown?: string;
  example: string;
}

export interface CasinoLimitRule {
  game: string;
  minBet: string;
  maxBet: string;
  cooldown: string;
  penalty: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export type EventGameType = 
  | 'trivia' 
  | 'rapid' 
  | 'memory' 
  | 'reaction' 
  | 'object_hunt' 
  | 'roulette' 
  | 'skill' 
  | 'custom';

export type EventStatus = 'active' | 'upcoming' | 'ended';

export interface TriviaQuestion {
  question: string;
  options: string[];
  correctIndex: number;
}

export interface ObjectItem {
  id: string;
  name: string;
  icon: string;
  x: number; // percentage 0-100
  y: number; // percentage 0-100
}

export interface EventGameData {
  triviaQuestions?: TriviaQuestion[];
  memoryPairCount?: number;
  reactionTargetMs?: number;
  objectList?: ObjectItem[];
  rouletteSlices?: { label: string; value: number; color: string }[];
  skillTargetCount?: number;
  customCode?: string;
  customInstructions?: string;
}

export interface EventItem {
  id: string;
  title: string;
  description: string;
  gameType: EventGameType;
  status: EventStatus;
  prizePool: string;
  startDate: string;
  endDate: string;
  rules: string;
  gameData?: EventGameData;
  winnersList?: {
    userName: string;
    rank: number;
    reward: string;
    score: number;
  }[];
  createdAt: string;
}

export interface EventParticipation {
  id: string;
  eventId: string;
  userName: string;
  userAvatar?: string;
  score: number;
  completionTimeMs?: number;
  timestamp: string;
  details?: Record<string, any>;
}

export interface HallOfFameEntry {
  id: string;
  eventId: string;
  eventTitle: string;
  userName: string;
  userAvatar?: string;
  score: number;
  rank: number;
  reward: string;
  victoryDate: string;
  badge?: string;
}

export interface EventLeaderboardUser {
  id: string;
  userName: string;
  userAvatar?: string;
  totalPoints: number;
  totalWins: number;
  eventsPlayed: number;
  lastActive: string;
}

