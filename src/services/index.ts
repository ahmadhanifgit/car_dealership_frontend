import { CARS } from '@/data/cars';
import type { Car, CarFilters, SortKey } from '@/types';
import { STORAGE_KEYS } from '@/constants';
import type { AdminUser, AuthSession, Inquiry } from '@/types';

const LATENCY = 250;
function delay<T>(value: T, ms = LATENCY): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), ms));
}

let carStore: Car[] = CARS.map((c) => ({ ...c }));
let inquiryStore: Inquiry[] = [];

function clone<T>(v: T): T {
  return JSON.parse(JSON.stringify(v));
}

function applyFilters(cars: Car[], filters: CarFilters): Car[] {
  return cars.filter((c) => {
    if (filters.search) {
      const q = filters.search.toLowerCase();
      const hay = `${c.brand} ${c.model} ${c.year} ${c.bodyType} ${c.fuelType}`.toLowerCase();
      if (!hay.includes(q)) return false;
    }
    if (filters.brand && c.brand !== filters.brand) return false;
    if (filters.bodyType && c.bodyType !== filters.bodyType) return false;
    if (filters.fuelType && c.fuelType !== filters.fuelType) return false;
    if (filters.transmission && c.transmission !== filters.transmission) return false;
    if (filters.drivetrain && c.drivetrain !== filters.drivetrain) return false;
    if (filters.condition && c.condition !== filters.condition) return false;
    if (typeof filters.minPrice === 'number' && c.price < filters.minPrice) return false;
    if (typeof filters.maxPrice === 'number' && c.price > filters.maxPrice) return false;
    if (typeof filters.minYear === 'number' && c.year < filters.minYear) return false;
    if (typeof filters.maxYear === 'number' && c.year > filters.maxYear) return false;
    if (typeof filters.minMileage === 'number' && c.mileage < filters.minMileage) return false;
    if (typeof filters.maxMileage === 'number' && c.mileage > filters.maxMileage) return false;
    if (filters.featured && !c.featured) return false;
    return true;
  });
}

function applySort(cars: Car[], sort: SortKey): Car[] {
  const arr = [...cars];
  switch (sort) {
    case 'price_asc': return arr.sort((a, b) => a.price - b.price);
    case 'price_desc': return arr.sort((a, b) => b.price - a.price);
    case 'year_desc': return arr.sort((a, b) => b.year - a.year);
    case 'mileage_asc': return arr.sort((a, b) => a.mileage - b.mileage);
    case 'horsepower_desc': return arr.sort((a, b) => b.horsepower - a.horsepower);
    case 'newest':
    default:
      return arr.sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt));
  }
}

export const carService = {
  async list(params: { filters?: CarFilters; sort?: SortKey; page?: number; pageSize?: number } = {}) {
    const { filters = {}, sort = 'newest', page = 1, pageSize = 9 } = params;
    const filtered = applyFilters(carStore, filters);
    const sorted = applySort(filtered, sort);
    const total = sorted.length;
    const start = (page - 1) * pageSize;
    const items = sorted.slice(start, start + pageSize);
    return delay({ items, total, page, pageSize, totalPages: Math.max(1, Math.ceil(total / pageSize)) });
  },
  async getAll() {
    return delay(clone(carStore));
  },
  async getBySlug(slug: string) {
    const car = carStore.find((c) => c.slug === slug);
    return delay(clone(car));
  },
  async getById(id: string) {
    const car = carStore.find((c) => c.id === id);
    return delay(clone(car));
  },
  async getRelated(slug: string, limit = 3) {
    const car = carStore.find((c) => c.slug === slug);
    if (!car) return delay([]);
    const related = carStore
      .filter((c) => c.slug !== slug && c.brand === car.brand)
      .slice(0, limit);
    return delay(clone(related));
  },
  async getFeatured(limit = 6) {
    return delay(clone(carStore.filter((c) => c.featured).slice(0, limit)));
  },
  async create(input: Omit<Car, 'id' | 'slug' | 'createdAt' | 'updatedAt'>) {
    const now = new Date().toISOString();
    const id = `car_${(carStore.length + 1).toString().padStart(3, '0')}`;
    const slug = `${input.brand}-${input.model}-${input.year}`.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    const car: Car = { ...input, id, slug, createdAt: now, updatedAt: now };
    carStore = [car, ...carStore];
    return delay(clone(car));
  },
  async update(id: string, patch: Partial<Car>) {
    carStore = carStore.map((c) => (c.id === id ? { ...c, ...patch, updatedAt: new Date().toISOString() } : c));
    return delay(clone(carStore.find((c) => c.id === id)));
  },
  async remove(id: string) {
    carStore = carStore.filter((c) => c.id !== id);
    return delay({ id });
  },
};

export const inquiryService = {
  async create(input: Omit<Inquiry, 'id' | 'createdAt' | 'status'>) {
    const inquiry: Inquiry = {
      ...input,
      id: `inq_${Date.now()}`,
      status: 'new',
      createdAt: new Date().toISOString(),
    };
    inquiryStore = [inquiry, ...inquiryStore];
    return delay(clone(inquiry));
  },
  async list() {
    return delay(clone(inquiryStore));
  },
};

const DEMO_ADMIN: AdminUser = {
  id: 'usr_001',
  email: 'admin@marquemotors.com',
  name: 'Alex Morgan',
  role: 'admin',
  avatar: 'https://images.pexels.com/pexels/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=160&h=160&fit=crop',
};

export const authService = {
  async login(email: string, password: string): Promise<AuthSession> {
    await delay(null, 400);
    if (password.length < 4) throw new Error('Invalid email or password.');
    const user: AdminUser = { ...DEMO_ADMIN, email: email || DEMO_ADMIN.email };
    const session: AuthSession = {
      user,
      token: `tok_${Date.now()}`,
      expiresAt: Date.now() + 1000 * 60 * 60 * 8,
    };
    localStorage.setItem(STORAGE_KEYS.session, JSON.stringify(session));
    return session;
  },
  async requestReset(email: string): Promise<void> {
    await delay(null, 400);
    if (!email.includes('@')) throw new Error('Enter a valid email address.');
  },
  async resetPassword(token: string, password: string): Promise<void> {
    await delay(null, 400);
    if (token.length < 4 || password.length < 6) throw new Error('Invalid token or password too short.');
  },
  async logout(): Promise<void> {
    localStorage.removeItem(STORAGE_KEYS.session);
    await delay(null, 100);
  },
  getSession(): AuthSession | null {
    const raw = localStorage.getItem(STORAGE_KEYS.session);
    if (!raw) return null;
    try {
      const s = JSON.parse(raw) as AuthSession;
      if (s.expiresAt < Date.now()) {
        localStorage.removeItem(STORAGE_KEYS.session);
        return null;
      }
      return s;
    } catch {
      return null;
    }
  },
};
