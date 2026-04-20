import { createContext, useContext, useState, type ReactNode } from 'react';

interface WatchlistContextType {
  watchlist: Set<string>;
  toggleWatchlist: (coin: string) => void;
  isWatched: (coin: string) => boolean;
}

const WatchlistContext = createContext<WatchlistContextType | null>(null);

export function WatchlistProvider({ children }: { children: ReactNode }) {
  const [watchlist, setWatchlist] = useState<Set<string>>(() => {
    const saved = localStorage.getItem('koinx-watchlist');
    return saved ? new Set(JSON.parse(saved)) : new Set();
  });

  const toggleWatchlist = (coin: string) => {
    setWatchlist((prev) => {
      const next = new Set(prev);
      if (next.has(coin)) {
        next.delete(coin);
      } else {
        next.add(coin);
      }
      localStorage.setItem('koinx-watchlist', JSON.stringify([...next]));
      return next;
    });
  };

  const isWatched = (coin: string) => watchlist.has(coin);

  return (
    <WatchlistContext.Provider value={{ watchlist, toggleWatchlist, isWatched }}>
      {children}
    </WatchlistContext.Provider>
  );
}

export function useWatchlist() {
  const ctx = useContext(WatchlistContext);
  if (!ctx) throw new Error('useWatchlist must be used within WatchlistProvider');
  return ctx;
}
