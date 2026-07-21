export type BodyType =
  | 'Sedan'
  | 'SUV'
  | 'Coupe'
  | 'Convertible'
  | 'Hatchback'
  | 'Truck'
  | 'Van';

export type FuelType = 'Petrol' | 'Diesel' | 'Hybrid' | 'Electric';

export type TransmissionType = 'Automatic' | 'Manual' | 'Dual-Clutch';

export type Drivetrain = 'FWD' | 'RWD' | 'AWD' | '4WD';

export type CarStatus = 'available' | 'reserved' | 'sold';

export interface Car {
  id: string;
  slug: string;
  brand: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  bodyType: BodyType;
  fuelType: FuelType;
  transmission: TransmissionType;
  drivetrain: Drivetrain;
  engineSize: number;
  horsepower: number;
  topSpeed: number;
  acceleration: number;
  seats: number;
  doors: number;
  color: string;
  interiorColor: string;
  description: string;
  features: string[];
  images: string[];
  condition: 'New' | 'Certified Pre-Owned' | 'Used';
  status: CarStatus;
  featured: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Brand {
  id: string;
  name: string;
  country: string;
  logoText: string;
  count: number;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  avatar: string;
  rating: number;
  text: string;
}

export interface Inquiry {
  id: string;
  carId: string;
  carTitle: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  type: 'test_drive' | 'info' | 'offer' | 'financing';
  status: 'new' | 'contacted' | 'closed';
  createdAt: string;
}

export interface CarFilters {
  search?: string;
  brand?: string | null;
  bodyType?: BodyType | null;
  fuelType?: FuelType | null;
  transmission?: TransmissionType | null;
  drivetrain?: Drivetrain | null;
  minPrice?: number | null;
  maxPrice?: number | null;
  minYear?: number | null;
  maxYear?: number | null;
  minMileage?: number | null;
  maxMileage?: number | null;
  condition?: Car['condition'] | null;
  featured?: boolean;
}

export type SortKey =
  | 'newest'
  | 'price_asc'
  | 'price_desc'
  | 'year_desc'
  | 'mileage_asc'
  | 'horsepower_desc';

export interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'editor';
  avatar?: string;
}

export interface AuthSession {
  user: AdminUser;
  token: string;
  expiresAt: number;
}

export interface ToastPayload {
  id: string;
  type: 'success' | 'error' | 'info';
  message: string;
}
