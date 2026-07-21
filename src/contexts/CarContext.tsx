import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { carService } from '@/services';
import type { Car } from '@/types';
import { CARS } from '@/data/cars';
import { STORAGE_KEYS } from '@/constants';

interface CarContextValue {
  cars: Car[];
  loading: boolean;
  refresh: () => Promise<void>;
  getById: (id: string) => Car | undefined;
  favorites: string[];
  toggleFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
  compare: string[];
  toggleCompare: (id: string) => void;
  inCompare: (id: string) => boolean;
  clearCompare: () => void;
}

const CarContext = createContext<CarContextValue | undefined>(undefined);

export function CarProvider({ children }: { children: ReactNode }) {
  const [cars, setCars] = useState<Car[]>(CARS);
  const [loading, setLoading] = useState(false);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [compare, setCompare] = useState<string[]>([]);

  useEffect(() => {
    try {
      setFavorites(JSON.parse(localStorage.getItem(STORAGE_KEYS.favorites) || '[]'));
      setCompare(JSON.parse(localStorage.getItem(STORAGE_KEYS.compare) || '[]'));
    } catch {
      /* noop */
    }
  }, []);

  const refresh = useCallback(async () => {
    setLoading(true);
    const all = await carService.getAll();
    setCars(all);
    setLoading(false);
  }, []);

  const persistFav = (next: string[]) => {
    setFavorites(next);
    localStorage.setItem(STORAGE_KEYS.favorites, JSON.stringify(next));
  };
  const persistCmp = (next: string[]) => {
    setCompare(next);
    localStorage.setItem(STORAGE_KEYS.compare, JSON.stringify(next));
  };

  const toggleFavorite = useCallback((id: string) => {
    setFavorites((prev) => {
      const next = prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id];
      localStorage.setItem(STORAGE_KEYS.favorites, JSON.stringify(next));
      return next;
    });
  }, []);

  const toggleCompare = useCallback((id: string) => {
    setCompare((prev) => {
      let next: string[];
      if (prev.includes(id)) {
        next = prev.filter((x) => x !== id);
      } else if (prev.length >= 3) {
        next = [...prev.slice(1), id];
      } else {
        next = [...prev, id];
      }
      localStorage.setItem(STORAGE_KEYS.compare, JSON.stringify(next));
      return next;
    });
  }, []);

  const clearCompare = useCallback(() => persistCmp([]), []);

  const value = useMemo<CarContextValue>(
    () => ({
      cars,
      loading,
      refresh,
      getById: (id) => cars.find((c) => c.id === id),
      favorites,
      toggleFavorite,
      isFavorite: (id) => favorites.includes(id),
      compare,
      toggleCompare,
      inCompare: (id) => compare.includes(id),
      clearCompare,
    }),
    [cars, loading, refresh, favorites, toggleFavorite, compare, toggleCompare, clearCompare],
  );

  return <CarContext.Provider value={value}>{children}</CarContext.Provider>;
}

export function useCars() {
  const ctx = useContext(CarContext);
  if (!ctx) throw new Error('useCars must be used within CarProvider');
  return ctx;
}
