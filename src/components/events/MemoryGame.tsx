import React, { useState, useEffect } from 'react';
import { Trophy, Clock, RefreshCw, CheckCircle2 } from 'lucide-react';

interface MemoryGameProps {
  pairCount?: number;
  onFinish: (score: number, details: any) => void;
}

const EMOJI_POOL = ['🪙', '💎', '🏆', '👑', '🎁', '🎰', '🎲', '🔥', '⚡', '🎉'];

interface CardItem {
  id: number;
  emoji: string;
  isFlipped: boolean;
  isMatched: boolean;
}

export const MemoryGame: React.FC<MemoryGameProps> = ({ pairCount = 6, onFinish }) => {
  const [cards, setCards] = useState<CardItem[]>([]);
  const [flippedIds, setFlippedIds] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);

  // Initialize deck
  useEffect(() => {
    initDeck();
  }, [pairCount]);

  const initDeck = () => {
    const selectedEmojis = EMOJI_POOL.slice(0, pairCount);
    const deckEmojis = [...selectedEmojis, ...selectedEmojis];
    
    // Shuffle
    for (let i = deckEmojis.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [deckEmojis[i], deckEmojis[j]] = [deckEmojis[j], deckEmojis[i]];
    }

    const cardItems: CardItem[] = deckEmojis.map((emoji, idx) => ({
      id: idx,
      emoji,
      isFlipped: false,
      isMatched: false,
    }));

    setCards(cardItems);
    setFlippedIds([]);
    setMoves(0);
    setSeconds(0);
    setIsGameOver(false);
  };

  // Timer
  useEffect(() => {
    if (isGameOver || cards.length === 0) return;
    const timer = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(timer);
  }, [isGameOver, cards]);

  const handleCardClick = (id: number) => {
    if (isGameOver || flippedIds.length >= 2) return;

    const clickedCard = cards.find((c) => c.id === id);
    if (!clickedCard || clickedCard.isFlipped || clickedCard.isMatched) return;

    const updatedCards = cards.map((c) => (c.id === id ? { ...c, isFlipped: true } : c));
    setCards(updatedCards);

    const newFlipped = [...flippedIds, id];
    setFlippedIds(newFlipped);

    if (newFlipped.length === 2) {
      setMoves((m) => m + 1);
      const card1 = cards.find((c) => c.id === newFlipped[0]);
      const card2 = cards.find((c) => c.id === id);

      if (card1 && card2 && card1.emoji === card2.emoji) {
        // Match!
        setTimeout(() => {
          const matchedCards = updatedCards.map((c) =>
            c.id === card1.id || c.id === card2.id ? { ...c, isMatched: true } : c
          );
          setCards(matchedCards);
          setFlippedIds([]);

          // Check if all matched
          if (matchedCards.every((c) => c.isMatched)) {
            setIsGameOver(true);
            const totalScore = Math.max(200, 10000 - moves * 150 - seconds * 50);
            onFinish(totalScore, { moves, seconds });
          }
        }, 500);
      } else {
        // No match, unflip
        setTimeout(() => {
          setCards(updatedCards.map((c) => (newFlipped.includes(c.id) ? { ...c, isFlipped: false } : c)));
          setFlippedIds([]);
        }, 900);
      }
    }
  };

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 max-w-2xl mx-auto shadow-2xl">
      <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
        <div>
          <h4 className="text-xl font-bold text-white font-display flex items-center gap-2">
            🧠 Juego de Memoria
          </h4>
          <p className="text-xs text-slate-400">Encuentra los {pairCount} pares de cartas</p>
        </div>

        <div className="flex items-center gap-4 text-xs sm:text-sm font-mono font-bold text-slate-300">
          <span className="flex items-center gap-1.5 bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800">
            <RefreshCw className="w-3.5 h-3.5 text-cyan-400" /> Movimientos: {moves}
          </span>
          <span className="flex items-center gap-1.5 bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800">
            <Clock className="w-3.5 h-3.5 text-emerald-400" /> {seconds}s
          </span>
        </div>
      </div>

      {isGameOver ? (
        <div className="text-center py-8 animate-in zoom-in-95">
          <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 mx-auto flex items-center justify-center mb-4">
            <Trophy className="w-8 h-8" />
          </div>
          <h3 className="text-2xl font-bold text-white mb-2 font-display">¡Memoria Completa!</h3>
          <p className="text-slate-300 text-sm mb-6">
            Completado en <span className="text-emerald-400 font-bold">{moves} movimientos</span> y <span className="text-cyan-400 font-bold">{seconds} segundos</span>.
          </p>
          <button
            onClick={initDeck}
            className="px-6 py-2.5 rounded-xl bg-emerald-500 text-slate-950 font-bold text-sm hover:bg-emerald-400 transition-all shadow-lg"
          >
            Jugar de Nuevo
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
          {cards.map((card) => (
            <button
              key={card.id}
              onClick={() => handleCardClick(card.id)}
              disabled={card.isFlipped || card.isMatched}
              className={`h-24 rounded-2xl text-3xl font-bold flex items-center justify-center border-2 transition-all duration-300 transform select-none ${
                card.isMatched
                  ? 'bg-emerald-950/40 border-emerald-500/60 text-emerald-400 scale-95 opacity-80'
                  : card.isFlipped
                  ? 'bg-slate-800 border-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.3)] rotate-0'
                  : 'bg-slate-950 border-slate-800 hover:border-slate-700 hover:bg-slate-900 cursor-pointer'
              }`}
            >
              {card.isFlipped || card.isMatched ? (
                card.emoji
              ) : (
                <span className="text-slate-700 text-xl font-bold font-mono">DADDYS</span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
