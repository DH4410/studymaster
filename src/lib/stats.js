const STATS_KEY = 'studyMasterStats';

// Default state if new user
const defaultStats = {
  totalSeconds: 0,
  cardsMastered: 0,
  streak: 0,
  lastStudyDate: null // "YYYY-MM-DD"
};

// --- GETTERS ---
export const getStats = () => {
  try {
    const saved = localStorage.getItem(STATS_KEY);
    return saved ? JSON.parse(saved) : defaultStats;
  } catch {
    return defaultStats;
  }
};

// --- ACTIONS ---

// 1. Add Study Time (Seconds)
export const addStudyTime = (seconds) => {
  const stats = getStats();
  stats.totalSeconds += seconds;
  save(stats);
  updateStreak(); // Check streak whenever we study
};

// 2. Add Mastered Card
export const addMasteredCard = () => {
  const stats = getStats();
  stats.cardsMastered += 1;
  save(stats);
};

// 3. Smart Streak Logic
export const updateStreak = () => {
  const stats = getStats();
  const today = new Date().toISOString().split('T')[0]; // "2024-01-01"
  
  if (stats.lastStudyDate === today) return; // Already counted today

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayStr = yesterday.toISOString().split('T')[0];

  if (stats.lastStudyDate === yesterdayStr) {
    // Consecutive day
    stats.streak += 1;
  } else {
    // Missed a day (or new user) -> Reset to 1
    stats.streak = 1;
  }

  stats.lastStudyDate = today;
  save(stats);
};

// --- HELPER ---
const save = (data) => {
  localStorage.setItem(STATS_KEY, JSON.stringify(data));
  // Dispatch event so Dashboard updates instantly without refresh
  window.dispatchEvent(new Event('storage'));
};

export const formatTime = (totalSeconds) => {
  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  if (h > 0) return `${h}h ${m}m`;
  return `${m}m`; // Show just minutes if less than 1 hour
};