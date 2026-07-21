import type { BodyType, FuelType, TransmissionType, Drivetrain, SortKey, Car } from '@/types';

export const BRANDS: { name: string; country: string }[] = [
  { name: 'BMW', country: 'Germany' },
  { name: 'Mercedes-Benz', country: 'Germany' },
  { name: 'Audi', country: 'Germany' },
  { name: 'Porsche', country: 'Germany' },
  { name: 'Tesla', country: 'USA' },
  { name: 'Lexus', country: 'Japan' },
  { name: 'Toyota', country: 'Japan' },
  { name: 'Honda', country: 'Japan' },
  { name: 'Ford', country: 'USA' },
  { name: 'Chevrolet', country: 'USA' },
  { name: 'Jaguar', country: 'UK' },
  { name: 'Land Rover', country: 'UK' },
  { name: 'Volvo', country: 'Sweden' },
  { name: 'Mazda', country: 'Japan' },
  { name: 'Subaru', country: 'Japan' },
];

export const BODY_TYPES: BodyType[] = [
  'Sedan', 'SUV', 'Coupe', 'Convertible', 'Hatchback', 'Truck', 'Van',
];

export const FUEL_TYPES: FuelType[] = ['Petrol', 'Diesel', 'Hybrid', 'Electric'];

export const TRANSMISSIONS: TransmissionType[] = ['Automatic', 'Manual', 'Dual-Clutch'];

export const DRIVETRAINS: Drivetrain[] = ['FWD', 'RWD', 'AWD', '4WD'];

export const CONDITIONS: Car['condition'][] = ['New', 'Certified Pre-Owned', 'Used'];

export const SORT_OPTIONS: { key: SortKey; label: string }[] = [
  { key: 'newest', label: 'Newest arrivals' },
  { key: 'price_asc', label: 'Price: Low to High' },
  { key: 'price_desc', label: 'Price: High to Low' },
  { key: 'year_desc', label: 'Year: Newest' },
  { key: 'mileage_asc', label: 'Mileage: Lowest' },
  { key: 'horsepower_desc', label: 'Most powerful' },
];

export const PRICE_BOUNDS = { min: 15000, max: 350000 };
export const YEAR_BOUNDS = { min: 2015, max: 2025 };
export const MILEAGE_BOUNDS = { min: 0, max: 120000 };

export const PAGE_SIZE = 9;

export const STORAGE_KEYS = {
  session: 'mm_session',
  favorites: 'mm_favorites',
  compare: 'mm_compare',
  draftInquiry: 'mm_draft_inquiry',
} as const;

export const NAV_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'Inventory', to: '/inventory' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
];

export const ADMIN_NAV = [
  { label: 'Dashboard', to: '/admin', icon: 'LayoutDashboard' },
  { label: 'Inventory', to: '/admin/cars', icon: 'Car' },
  { label: 'New car', to: '/admin/cars/new', icon: 'PlusCircle' },
  { label: 'Profile', to: '/admin/profile', icon: 'UserCircle' },
] as const;

export const CONTACT_INFO = {
  phone: '+1 (415) 555-0142',
  email: 'care@marquemotors.com',
  address: '1280 Showroom Row, San Francisco, CA 94107',
  hours: 'Mon–Sat: 9:00 – 19:00 · Sun: 11:00 – 17:00',
};

export const SOCIALS = [
  { label: 'Instagram', href: 'https://instagram.com', icon: 'Instagram' },
  { label: 'Facebook', href: 'https://facebook.com', icon: 'Facebook' },
  { label: 'YouTube', href: 'https://youtube.com', icon: 'Youtube' },
  { label: 'X', href: 'https://x.com', icon: 'Twitter' },
] as const;

export const TESTIMONIALS = [
  {
    id: 't1',
    name: 'Daniel Reyes',
    role: 'Entrepreneur · San Francisco',
    avatar: 'https://images.pexels.com/pexels/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=160&h=160&fit=crop',
    rating: 5,
    text: 'From the first walkaround to the keys in my hand, Marque Motors made buying my BMW M4 feel effortless. The financing team beat my credit union by a full point.',
  },
  {
    id: 't2',
    name: 'Aisha Karim',
    role: 'Architect · Oakland',
    avatar: 'https://images.pexels.com/pexels/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=160&h=160&fit=crop',
    rating: 5,
    text: 'I shopped three dealers for a used Tesla. Marque had the cleanest history report and the most honest walkthrough of every panel. Zero pressure, real expertise.',
  },
  {
    id: 't3',
    name: 'Marcus Lee',
    role: 'Software Engineer · San Jose',
    avatar: 'https://images.pexels.com/pexels/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=160&h=160&fit=crop',
    rating: 4,
    text: 'The test drive was booked in under two minutes from the website. They answered every question about the Porsche 911 without upselling me on coatings I did not need.',
  },
  {
    id: 't4',
    name: 'Priya Natarajan',
    role: 'Cardiologist · Palo Alto',
    avatar: 'https://images.pexels.com/pexels/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=160&h=160&fit=crop',
    rating: 5,
    text: 'I bought a Certified Pre-Owned Lexus RX and the team handled the trade-in, paperwork, and delivery to my driveway. The kind of white-glove service I did not expect.',
  },
];

export const FAQS = [
  {
    q: 'Do you offer financing on every vehicle?',
    a: 'Yes. We work with a network of credit unions and lenders to offer financing on new, certified, and used vehicles. Pre-qualification takes a few minutes and will not affect your credit score.',
  },
  {
    q: 'Can I schedule a test drive online?',
    a: 'Absolutely. Open any car listing and tap "Schedule test drive". Pick a time slot and we will confirm by email within one business hour.',
  },
  {
    q: 'Are your Certified Pre-Owned vehicles inspected?',
    a: 'Every CPO vehicle passes a 150-point inspection covering powertrain, electronics, brakes, tires, and cosmetics. You receive the full report before purchase.',
  },
  {
    q: 'Do you accept trade-ins?',
    a: 'Yes. Bring your vehicle in for a complimentary appraisal, or upload photos through the contact form for a preliminary estimate. We settle the trade value at signing.',
  },
  {
    q: 'How is the listed price determined?',
    a: 'Prices reflect market data, vehicle condition, mileage, and history. We do not add hidden fees at signing — the listed price is the price you pay plus taxes and registration.',
  },
];

export const STATS = [
  { label: 'Vehicles in stock', value: '50+' },
  { label: 'Brands carried', value: '15' },
  { label: 'Cars delivered', value: '2,400' },
  { label: 'Avg. customer rating', value: '4.9 / 5' },
];

export const FEATURES_GRID = [
  { icon: 'ShieldCheck', title: '150-point inspection', text: 'Every certified vehicle passes a 150-point mechanical and cosmetic inspection.' },
  { icon: 'BadgePercent', title: 'Transparent pricing', text: 'No hidden fees. The price you see is the price you pay, plus taxes and registration.' },
  { icon: 'Banknote', title: 'Flexible financing', text: 'Pre-qualify in minutes with rates from 12 competing lenders. Soft pull only.' },
  { icon: 'RotateCcw', title: '7-day return', text: 'Change your mind within 7 days or 250 miles and return the vehicle, no questions.' },
  { icon: 'Truck', title: 'Nationwide delivery', text: 'We deliver to your driveway in all 50 states with enclosed transport options.' },
  { icon: 'Headset', title: 'Concierge support', text: 'A single advisor handles your deal end to end, from inquiry to delivery.' },
];
