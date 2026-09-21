import { 
  collection, 
  getDocs, 
  doc, 
  setDoc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  orderBy, 
  onSnapshot 
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import { 
  EventItem, 
  EventParticipation, 
  HallOfFameEntry, 
  EventLeaderboardUser 
} from '../types';

const EVENTS_COLLECTION = 'events';
const PARTICIPATIONS_COLLECTION = 'participations';
const HALL_OF_FAME_COLLECTION = 'hall_of_fame';
const LEADERBOARD_COLLECTION = 'leaderboard';

// Initial default seed events for Los Daddys Live
export const INITIAL_EVENTS: EventItem[] = [
  {
    id: 'evt_trivia_01',
    title: '🎉 Trivia Ultra Difícil de los Viernes - Los Daddys',
    description: 'Demuestra tus conocimientos avanzados sobre algoritmos del servidor, economía, comandos y lore. ¡Solo los verdaderos expertos lograrán puntaje perfecto!',
    gameType: 'trivia',
    status: 'active',
    prizePool: '🪙 50,000 + Rol VIP Diamante (7 días)',
    startDate: '2026-07-31T20:00:00Z',
    endDate: '2026-08-01T23:59:59Z',
    rules: '5 preguntas extremas con opción múltiple. Solo tienes 12 segundos por pregunta.',
    createdAt: new Date().toISOString(),
    gameData: {
      triviaQuestions: [
        {
          question: '¿Cuál es el cooldown exacto y la probabilidad de éxito sin boosts del comando !crime en la economía Daddys?',
          options: ['1 hora, 70% tasa base', '4 horas, 45% tasa base', '2 horas, 50% tasa base', '12 horas, 30% tasa base'],
          correctIndex: 1,
        },
        {
          question: '¿Qué fórmula determina el multiplicador de bono por racha diaria (!daily) en Nivel Diamante?',
          options: ['Base * 1.5 + (Racha * 25)', 'Base * 2.0 constante', 'Base + (Racha * 100)', 'Base * 1.1^Racha'],
          correctIndex: 0,
        },
        {
          question: '¿Qué requisito estricto se exige en Discord para solicitar el cobro de bote del Casino Daddys?',
          options: ['Nivel 5 de actividad + 100 Coins', 'Mínimo Nivel 15 de actividad + 5,000 Coins en banco', 'Cualquier usuario sin nivel ni verificación', 'Tener cuenta Nitro activa'],
          correctIndex: 1,
        },
        {
          question: '¿Cuál es la penalización máxima de quiebra en un !heist fallido en equipo sin Seguro de Atraco?',
          options: ['Perder el 10% del dinero', 'Perder el 60% del saldo líquido actual', 'Perder sólo 500 Coins', 'Perder todo el nivel acumulado'],
          correctIndex: 1,
        },
        {
          question: '¿Cuál es el tiempo de refresco oficial del mercado negro de items raros en Los Daddys?',
          options: ['Cada 12 horas exactas', 'Cada 6 horas a las 00:00 UTC', 'Cada 24 horas a medianoche', 'Cada 48 horas en fin de semana'],
          correctIndex: 1,
        }
      ]
    }
  },
  {
    id: 'evt_reaction_02',
    title: '⚡ Desafío de Reacción Rápida Formula Daddys',
    description: 'HUD estilo Fórmula 1. Reacciona al apagar las 5 luces rojas (LIGHTS OUT). Desafío extremo de reflejos para auténticos pilotos.',
    gameType: 'reaction',
    status: 'active',
    prizePool: '🪙 30,000 + Rol Piloto Leyenda',
    startDate: '2026-07-31T21:00:00Z',
    endDate: '2026-08-02T23:59:59Z',
    rules: 'Atento al semáforo de 5 luces rojas. Tan pronto se apague la quinta luz (¡LIGHTS OUT!), presiona el pedal inmediatamente. Salir antes dará Salida En Falso (+1000ms de penalización).',
    createdAt: new Date().toISOString(),
    gameData: {
      reactionTargetMs: 200
    }
  },
  {
    id: 'evt_memory_03',
    title: '🧠 Reto Extremo de Memoria Casino Daddys',
    description: 'Encuentra todas las parejas de símbolos del servidor con el menor número de movimientos posibles.',
    gameType: 'memory',
    status: 'active',
    prizePool: '🪙 40,000 + Pase de Casino VIP',
    startDate: '2026-07-31T22:00:00Z',
    endDate: '2026-08-03T23:59:59Z',
    rules: 'Voltea las cartas de 2 en 2. Menos movimientos y menor tiempo equivalen a un puntaje récord más alto.',
    createdAt: new Date().toISOString(),
    gameData: {
      memoryPairCount: 8
    }
  },
  {
    id: 'evt_roulette_04',
    title: '🎰 Ruleta de la Suerte Diaria (1 Tiro por Usuario)',
    description: 'Solo 1 giro al día por jugador. Puedes ganar enormes botes o caer en casillas trampa con penalizaciones.',
    gameType: 'roulette',
    status: 'active',
    prizePool: '🪙 Bote Acumulado de 100,000 Coins',
    startDate: '2026-07-31T18:00:00Z',
    endDate: '2026-08-04T23:59:59Z',
    rules: 'Estricto límite de 1 tiro diario por usuario. Existen casillas de bonos gigantes y casillas de trampa con puntuación negativa.',
    createdAt: new Date().toISOString(),
    gameData: {
      rouletteSlices: [
        { label: '🪙 +500 Coins', value: 500, color: '#10b981' },
        { label: '💥 Trampa: -1,000', value: -1000, color: '#ef4444' },
        { label: '🪙 +2,500 Coins', value: 2500, color: '#3b82f6' },
        { label: '💀 MULTA: -2,500', value: -2500, color: '#7f1d1d' },
        { label: '🪙 +5,000 Coins', value: 5000, color: '#8b5cf6' },
        { label: '🤡 Broma: 0 Pts', value: 0, color: '#64748b' },
        { label: '👑 10,000 JACKPOT', value: 10000, color: '#f59e0b' },
        { label: '⚡ Perder -500 Pts', value: -500, color: '#dc2626' }
      ]
    }
  },
  {
    id: 'evt_hunt_05',
    title: '🔍 Búsqueda de Objetos Ocultos de Los Daddys',
    description: 'Mueve y elimina obstáculos (cajas, barriles, rocas, plantas) para descubrir las 5 monedas y gemas ocultas debajo.',
    gameType: 'object_hunt',
    status: 'active',
    prizePool: '🪙 35,000 Coins',
    startDate: '2026-07-31T19:00:00Z',
    endDate: '2026-08-02T23:59:59Z',
    rules: 'Haz clic en los obstáculos para moverlos o despejarlos. ¡Debes despejar la zona rápidamente!',
    createdAt: new Date().toISOString(),
    gameData: {
      objectList: [
        { id: 'obj1', name: 'Moneda Daddys #1', icon: '🪙', x: 18, y: 35 },
        { id: 'obj2', name: 'Gema VIP #2', icon: '💎', x: 82, y: 22 },
        { id: 'obj3', name: 'Cofre Secreto #3', icon: '🎁', x: 48, y: 72 },
        { id: 'obj4', name: 'Trofeo de Oro #4', icon: '🏆', x: 74, y: 62 },
        { id: 'obj5', name: 'Corona de Leyenda #5', icon: '👑', x: 28, y: 80 }
      ]
    }
  }
];

export const INITIAL_HALL_OF_FAME: HallOfFameEntry[] = [];

export const INITIAL_LEADERBOARD: EventLeaderboardUser[] = [];

// Seed Firestore initial data if empty
export async function seedFirestoreIfEmpty(): Promise<void> {
  try {
    const eventsSnap = await getDocs(collection(db, EVENTS_COLLECTION));
    if (eventsSnap.empty) {
      console.log('Seeding initial events to Firestore...');
      for (const evt of INITIAL_EVENTS) {
        await setDoc(doc(db, EVENTS_COLLECTION, evt.id), evt);
      }
    }

    const hofSnap = await getDocs(collection(db, HALL_OF_FAME_COLLECTION));
    if (hofSnap.empty) {
      for (const item of INITIAL_HALL_OF_FAME) {
        await setDoc(doc(db, HALL_OF_FAME_COLLECTION, item.id), item);
      }
    }

    const leadSnap = await getDocs(collection(db, LEADERBOARD_COLLECTION));
    if (leadSnap.empty) {
      for (const usr of INITIAL_LEADERBOARD) {
        await setDoc(doc(db, LEADERBOARD_COLLECTION, usr.id), usr);
      }
    }
  } catch (err) {
    console.warn('Firestore seeding check warning (using local fallback if offline):', err);
  }
}

// Subscribe to real-time events from Firestore with fallback
export function subscribeToEvents(callback: (events: EventItem[]) => void): () => void {
  try {
    const q = query(collection(db, EVENTS_COLLECTION));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      if (snapshot.empty) {
        // If empty in database, trigger seed & use initial
        seedFirestoreIfEmpty();
        callback(INITIAL_EVENTS);
      } else {
        const eventsList: EventItem[] = [];
        snapshot.forEach((docSnap) => {
          eventsList.push({ id: docSnap.id, ...docSnap.data() } as EventItem);
        });
        callback(eventsList);
      }
    }, (error) => {
      console.warn('Error subscribing to events:', error);
      callback(INITIAL_EVENTS);
    });
    return unsubscribe;
  } catch (err) {
    console.warn('Firestore connection fallback:', err);
    callback(INITIAL_EVENTS);
    return () => {};
  }
}

// Subscribe to Hall of Fame real-time
export function subscribeToHallOfFame(callback: (entries: HallOfFameEntry[]) => void): () => void {
  try {
    const q = query(collection(db, HALL_OF_FAME_COLLECTION));
    return onSnapshot(q, (snapshot) => {
      if (snapshot.empty) {
        callback(INITIAL_HALL_OF_FAME);
      } else {
        const list: HallOfFameEntry[] = [];
        snapshot.forEach((d) => list.push({ id: d.id, ...d.data() } as HallOfFameEntry));
        callback(list.sort((a, b) => new Date(b.victoryDate).getTime() - new Date(a.victoryDate).getTime()));
      }
    }, () => callback(INITIAL_HALL_OF_FAME));
  } catch (err) {
    callback(INITIAL_HALL_OF_FAME);
    return () => {};
  }
}

// Subscribe to Event Leaderboard real-time
export function subscribeToEventLeaderboard(callback: (users: EventLeaderboardUser[]) => void): () => void {
  try {
    const q = query(collection(db, LEADERBOARD_COLLECTION));
    return onSnapshot(q, (snapshot) => {
      if (snapshot.empty) {
        callback(INITIAL_LEADERBOARD);
      } else {
        const list: EventLeaderboardUser[] = [];
        snapshot.forEach((d) => list.push({ id: d.id, ...d.data() } as EventLeaderboardUser));
        callback(list.sort((a, b) => b.totalPoints - a.totalPoints));
      }
    }, () => callback(INITIAL_LEADERBOARD));
  } catch (err) {
    callback(INITIAL_LEADERBOARD);
    return () => {};
  }
}

// Get participations for an event
export async function getParticipationsForEvent(eventId: string): Promise<EventParticipation[]> {
  try {
    const q = query(collection(db, PARTICIPATIONS_COLLECTION), where('eventId', '==', eventId));
    const snap = await getDocs(q);
    const list: EventParticipation[] = [];
    snap.forEach((docSnap) => {
      list.push({ id: docSnap.id, ...docSnap.data() } as EventParticipation);
    });
    return list.sort((a, b) => b.score - a.score);
  } catch (err) {
    console.warn('Error fetching participations:', err);
    return [];
  }
}

// Record a new user participation / game score to Firestore
export async function submitParticipation(
  eventId: string,
  userName: string,
  score: number,
  completionTimeMs?: number,
  details?: Record<string, any>
): Promise<void> {
  const participationData = {
    eventId,
    userName: userName.trim() || 'Jugador_Anonimo',
    score,
    completionTimeMs: completionTimeMs || 0,
    timestamp: new Date().toISOString(),
    details: details || {}
  };

  try {
    // Add participation document
    await addDoc(collection(db, PARTICIPATIONS_COLLECTION), participationData);

    // Update global leaderboard record for this user
    const userDocId = `usr_${userName.toLowerCase().replace(/\s+/g, '_')}`;
    const leaderboardRef = doc(db, LEADERBOARD_COLLECTION, userDocId);
    
    // Check if user already in leaderboard
    const userSnap = await getDocs(query(collection(db, LEADERBOARD_COLLECTION), where('userName', '==', userName)));
    if (!userSnap.empty) {
      const existingDoc = userSnap.docs[0];
      const data = existingDoc.data() as EventLeaderboardUser;
      await updateDoc(doc(db, LEADERBOARD_COLLECTION, existingDoc.id), {
        totalPoints: data.totalPoints + score,
        eventsPlayed: data.eventsPlayed + 1,
        lastActive: new Date().toISOString()
      });
    } else {
      await setDoc(leaderboardRef, {
        id: userDocId,
        userName,
        totalPoints: score,
        totalWins: 0,
        eventsPlayed: 1,
        lastActive: new Date().toISOString()
      });
    }
  } catch (err) {
    console.error('Error saving participation to Firestore:', err);
  }
}

// Admin: Save or Create an Event in Firestore
export async function saveEvent(event: EventItem): Promise<void> {
  try {
    await setDoc(doc(db, EVENTS_COLLECTION, event.id), event);
  } catch (err) {
    console.error('Error saving event:', err);
  }
}

// Admin: Delete Event from Firestore
export async function deleteEvent(eventId: string): Promise<void> {
  try {
    await deleteDoc(doc(db, EVENTS_COLLECTION, eventId));
  } catch (err) {
    console.error('Error deleting event:', err);
  }
}

// Admin: Finalize Event and automatically post winners to Hall of Fame
export async function finalizeEvent(eventId: string): Promise<void> {
  try {
    const participations = await getParticipationsForEvent(eventId);
    const topWinners = participations.slice(0, 3);

    // Get event title
    const eventRef = doc(db, EVENTS_COLLECTION, eventId);

    const winnersList = topWinners.map((p, idx) => ({
      userName: p.userName,
      rank: idx + 1,
      reward: idx === 0 ? '🏆 1er Lugar Premio Mayor' : idx === 1 ? '🥈 2do Lugar Premio Especial' : '🥉 3er Lugar Premio Consolación',
      score: p.score
    }));

    // Update event status to ended
    await updateDoc(eventRef, {
      status: 'ended',
      winnersList
    });

    // Post to Hall of Fame
    for (let i = 0; i < topWinners.length; i++) {
      const winner = topWinners[i];
      const hofEntry: HallOfFameEntry = {
        id: `hof_${eventId}_${i + 1}_${Date.now()}`,
        eventId,
        eventTitle: 'Evento de Los Daddys Live',
        userName: winner.userName,
        score: winner.score,
        rank: i + 1,
        reward: i === 0 ? '🏆 Gran Recompensa Live' : i === 1 ? '🥈 Premio Plata' : '🥉 Premio Bronce',
        victoryDate: new Date().toISOString().split('T')[0],
        badge: i === 0 ? '👑 Campeón Evento' : i === 1 ? '🥈 Subcampeón' : '🥉 Top 3'
      };
      await setDoc(doc(db, HALL_OF_FAME_COLLECTION, hofEntry.id), hofEntry);

      // Increment total wins for top winner
      if (i === 0) {
        const userSnap = await getDocs(query(collection(db, LEADERBOARD_COLLECTION), where('userName', '==', winner.userName)));
        if (!userSnap.empty) {
          const docItem = userSnap.docs[0];
          const data = docItem.data();
          await updateDoc(doc(db, LEADERBOARD_COLLECTION, docItem.id), {
            totalWins: (data.totalWins || 0) + 1
          });
        }
      }
    }
  } catch (err) {
    console.error('Error finalizing event:', err);
  }
}

// Admin: Reset Classifications
export async function resetEventLeaderboard(): Promise<void> {
  try {
    const snap = await getDocs(collection(db, LEADERBOARD_COLLECTION));
    for (const d of snap.docs) {
      await deleteDoc(doc(db, LEADERBOARD_COLLECTION, d.id));
    }
  } catch (err) {
    console.error('Error resetting leaderboard:', err);
  }
}
