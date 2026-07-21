import type { Car, BodyType, FuelType, TransmissionType, Drivetrain } from '@/types';
import { USD_TO_PKR_RATE } from '@/lib/format';

interface Spec {
  brand: string;
  model: string;
  bodyType: BodyType;
  basePrice: number;
  hp: number;
  topSpeed: number;
  accel: number;
  engine: number;
  fuel: FuelType;
  drive: Drivetrain;
  trans: TransmissionType;
}

const SPECS: Spec[] = [
  { brand: 'BMW', model: 'M4 Competition', bodyType: 'Coupe', basePrice: 79000, hp: 503, topSpeed: 290, accel: 3.5, engine: 3.0, fuel: 'Petrol', drive: 'RWD', trans: 'Dual-Clutch' },
  { brand: 'BMW', model: 'X5 xDrive40i', bodyType: 'SUV', basePrice: 68900, hp: 375, topSpeed: 243, accel: 5.5, engine: 3.0, fuel: 'Petrol', drive: 'AWD', trans: 'Automatic' },
  { brand: 'BMW', model: '330i Sedan', bodyType: 'Sedan', basePrice: 45200, hp: 255, topSpeed: 250, accel: 5.8, engine: 2.0, fuel: 'Petrol', drive: 'RWD', trans: 'Automatic' },
  { brand: 'BMW', model: 'i4 eDrive40', bodyType: 'Sedan', basePrice: 56800, hp: 335, topSpeed: 190, accel: 5.7, engine: 0, fuel: 'Electric', drive: 'RWD', trans: 'Automatic' },
  { brand: 'BMW', model: 'Z4 M40i', bodyType: 'Convertible', basePrice: 64200, hp: 382, topSpeed: 250, accel: 4.5, engine: 3.0, fuel: 'Petrol', drive: 'RWD', trans: 'Automatic' },
  { brand: 'Mercedes-Benz', model: 'C-Class C300', bodyType: 'Sedan', basePrice: 46900, hp: 255, topSpeed: 240, accel: 6.0, engine: 2.0, fuel: 'Petrol', drive: 'RWD', trans: 'Automatic' },
  { brand: 'Mercedes-Benz', model: 'GLE 450', bodyType: 'SUV', basePrice: 73500, hp: 375, topSpeed: 245, accel: 5.7, engine: 3.0, fuel: 'Petrol', drive: 'AWD', trans: 'Automatic' },
  { brand: 'Mercedes-Benz', model: 'AMG GT 53', bodyType: 'Coupe', basePrice: 99500, hp: 429, topSpeed: 280, accel: 4.4, engine: 3.0, fuel: 'Petrol', drive: 'AWD', trans: 'Automatic' },
  { brand: 'Mercedes-Benz', model: 'EQS 450+', bodyType: 'Sedan', basePrice: 104500, hp: 329, topSpeed: 210, accel: 5.9, engine: 0, fuel: 'Electric', drive: 'RWD', trans: 'Automatic' },
  { brand: 'Mercedes-Benz', model: 'E-Class Cabriolet', bodyType: 'Convertible', basePrice: 81200, hp: 255, topSpeed: 250, accel: 6.1, engine: 2.0, fuel: 'Petrol', drive: 'AWD', trans: 'Automatic' },
  { brand: 'Audi', model: 'A4 45 TFSI', bodyType: 'Sedan', basePrice: 44100, hp: 261, topSpeed: 240, accel: 5.8, engine: 2.0, fuel: 'Petrol', drive: 'AWD', trans: 'Automatic' },
  { brand: 'Audi', model: 'Q7 55 TFSI', bodyType: 'SUV', basePrice: 67500, hp: 335, topSpeed: 250, accel: 5.9, engine: 3.0, fuel: 'Petrol', drive: 'AWD', trans: 'Automatic' },
  { brand: 'Audi', model: 'RS 5 Coupe', bodyType: 'Coupe', basePrice: 78900, hp: 444, topSpeed: 280, accel: 3.9, engine: 2.9, fuel: 'Petrol', drive: 'AWD', trans: 'Automatic' },
  { brand: 'Audi', model: 'e-tron GT', bodyType: 'Sedan', basePrice: 106500, hp: 469, topSpeed: 245, accel: 4.0, engine: 0, fuel: 'Electric', drive: 'AWD', trans: 'Automatic' },
  { brand: 'Audi', model: 'A5 Cabriolet', bodyType: 'Convertible', basePrice: 59900, hp: 261, topSpeed: 240, accel: 5.6, engine: 2.0, fuel: 'Petrol', drive: 'AWD', trans: 'Automatic' },
  { brand: 'Porsche', model: '911 Carrera', bodyType: 'Coupe', basePrice: 116000, hp: 379, topSpeed: 293, accel: 4.0, engine: 3.0, fuel: 'Petrol', drive: 'RWD', trans: 'Dual-Clutch' },
  { brand: 'Porsche', model: 'Cayenne', bodyType: 'SUV', basePrice: 88500, hp: 335, topSpeed: 245, accel: 6.2, engine: 3.0, fuel: 'Petrol', drive: 'AWD', trans: 'Automatic' },
  { brand: 'Porsche', model: 'Taycan 4S', bodyType: 'Sedan', basePrice: 110900, hp: 530, topSpeed: 250, accel: 3.8, engine: 0, fuel: 'Electric', drive: 'AWD', trans: 'Automatic' },
  { brand: 'Porsche', model: '718 Boxster', bodyType: 'Convertible', basePrice: 71900, hp: 300, topSpeed: 275, accel: 4.9, engine: 2.0, fuel: 'Petrol', drive: 'RWD', trans: 'Manual' },
  { brand: 'Tesla', model: 'Model S Plaid', bodyType: 'Sedan', basePrice: 94990, hp: 1020, topSpeed: 322, accel: 2.1, engine: 0, fuel: 'Electric', drive: 'AWD', trans: 'Automatic' },
  { brand: 'Tesla', model: 'Model Y Long Range', bodyType: 'SUV', basePrice: 52990, hp: 384, topSpeed: 217, accel: 5.0, engine: 0, fuel: 'Electric', drive: 'AWD', trans: 'Automatic' },
  { brand: 'Tesla', model: 'Model 3 Performance', bodyType: 'Sedan', basePrice: 52990, hp: 510, topSpeed: 261, accel: 3.1, engine: 0, fuel: 'Electric', drive: 'AWD', trans: 'Automatic' },
  { brand: 'Tesla', model: 'Model X Plaid', bodyType: 'SUV', basePrice: 99990, hp: 1020, topSpeed: 262, accel: 2.5, engine: 0, fuel: 'Electric', drive: 'AWD', trans: 'Automatic' },
  { brand: 'Lexus', model: 'IS 350 F Sport', bodyType: 'Sedan', basePrice: 44600, hp: 311, topSpeed: 230, accel: 5.6, engine: 3.5, fuel: 'Petrol', drive: 'RWD', trans: 'Automatic' },
  { brand: 'Lexus', model: 'RX 350', bodyType: 'SUV', basePrice: 50150, hp: 295, topSpeed: 200, accel: 7.2, engine: 2.4, fuel: 'Petrol', drive: 'AWD', trans: 'Automatic' },
  { brand: 'Lexus', model: 'LC 500', bodyType: 'Coupe', basePrice: 99300, hp: 471, topSpeed: 270, accel: 4.4, engine: 5.0, fuel: 'Petrol', drive: 'RWD', trans: 'Automatic' },
  { brand: 'Lexus', model: 'ES 300h', bodyType: 'Sedan', basePrice: 44500, hp: 215, topSpeed: 180, accel: 8.1, engine: 2.5, fuel: 'Hybrid', drive: 'FWD', trans: 'Automatic' },
  { brand: 'Toyota', model: 'Camry XSE', bodyType: 'Sedan', basePrice: 32500, hp: 301, topSpeed: 200, accel: 6.0, engine: 2.4, fuel: 'Petrol', drive: 'FWD', trans: 'Automatic' },
  { brand: 'Toyota', model: 'RAV4 Hybrid', bodyType: 'SUV', basePrice: 36800, hp: 219, topSpeed: 180, accel: 7.8, engine: 2.5, fuel: 'Hybrid', drive: 'AWD', trans: 'Automatic' },
  { brand: 'Toyota', model: 'GR Supra 3.0', bodyType: 'Coupe', basePrice: 56200, hp: 382, topSpeed: 250, accel: 3.9, engine: 3.0, fuel: 'Petrol', drive: 'RWD', trans: 'Manual' },
  { brand: 'Toyota', model: 'Corolla Hatchback', bodyType: 'Hatchback', basePrice: 24900, hp: 169, topSpeed: 200, accel: 8.0, engine: 2.0, fuel: 'Petrol', drive: 'FWD', trans: 'Manual' },
  { brand: 'Honda', model: 'Civic Sport', bodyType: 'Sedan', basePrice: 25700, hp: 158, topSpeed: 200, accel: 8.0, engine: 2.0, fuel: 'Petrol', drive: 'FWD', trans: 'Manual' },
  { brand: 'Honda', model: 'CR-V EX', bodyType: 'SUV', basePrice: 33800, hp: 190, topSpeed: 190, accel: 7.9, engine: 1.5, fuel: 'Petrol', drive: 'AWD', trans: 'Automatic' },
  { brand: 'Honda', model: 'Accord Hybrid', bodyType: 'Sedan', basePrice: 32800, hp: 204, topSpeed: 190, accel: 6.6, engine: 2.0, fuel: 'Hybrid', drive: 'FWD', trans: 'Automatic' },
  { brand: 'Ford', model: 'Mustang GT', bodyType: 'Coupe', basePrice: 41920, hp: 480, topSpeed: 250, accel: 4.2, engine: 5.0, fuel: 'Petrol', drive: 'RWD', trans: 'Manual' },
  { brand: 'Ford', model: 'F-150 Lariat', bodyType: 'Truck', basePrice: 57800, hp: 400, topSpeed: 170, accel: 6.0, engine: 3.5, fuel: 'Petrol', drive: '4WD', trans: 'Automatic' },
  { brand: 'Ford', model: 'Explorer ST', bodyType: 'SUV', basePrice: 52600, hp: 400, topSpeed: 230, accel: 5.3, engine: 3.0, fuel: 'Petrol', drive: 'AWD', trans: 'Automatic' },
  { brand: 'Chevrolet', model: 'Corvette Stingray', bodyType: 'Coupe', basePrice: 68900, hp: 495, topSpeed: 312, accel: 2.9, engine: 6.2, fuel: 'Petrol', drive: 'RWD', trans: 'Dual-Clutch' },
  { brand: 'Chevrolet', model: 'Tahoe Premier', bodyType: 'SUV', basePrice: 72400, hp: 355, topSpeed: 200, accel: 7.3, engine: 5.3, fuel: 'Petrol', drive: '4WD', trans: 'Automatic' },
  { brand: 'Chevrolet', model: 'Malibu LT', bodyType: 'Sedan', basePrice: 28400, hp: 160, topSpeed: 190, accel: 8.0, engine: 1.5, fuel: 'Petrol', drive: 'FWD', trans: 'Automatic' },
  { brand: 'Jaguar', model: 'F-TYPE R', bodyType: 'Convertible', basePrice: 113500, hp: 575, topSpeed: 300, accel: 3.7, engine: 5.0, fuel: 'Petrol', drive: 'AWD', trans: 'Automatic' },
  { brand: 'Jaguar', model: 'XF R-Dynamic', bodyType: 'Sedan', basePrice: 53900, hp: 296, topSpeed: 250, accel: 5.4, engine: 2.0, fuel: 'Petrol', drive: 'RWD', trans: 'Automatic' },
  { brand: 'Land Rover', model: 'Range Rover Velar', bodyType: 'SUV', basePrice: 64800, hp: 340, topSpeed: 241, accel: 6.0, engine: 3.0, fuel: 'Petrol', drive: 'AWD', trans: 'Automatic' },
  { brand: 'Land Rover', model: 'Defender 110', bodyType: 'SUV', basePrice: 64200, hp: 395, topSpeed: 208, accel: 5.8, engine: 3.0, fuel: 'Petrol', drive: '4WD', trans: 'Automatic' },
  { brand: 'Volvo', model: 'XC60 Recharge', bodyType: 'SUV', basePrice: 58300, hp: 455, topSpeed: 180, accel: 4.7, engine: 2.0, fuel: 'Hybrid', drive: 'AWD', trans: 'Automatic' },
  { brand: 'Volvo', model: 'S90 B6', bodyType: 'Sedan', basePrice: 57200, hp: 295, topSpeed: 180, accel: 6.4, engine: 2.0, fuel: 'Petrol', drive: 'AWD', trans: 'Automatic' },
  { brand: 'Mazda', model: 'Mazda3 Turbo', bodyType: 'Sedan', basePrice: 32800, hp: 250, topSpeed: 230, accel: 5.6, engine: 2.5, fuel: 'Petrol', drive: 'AWD', trans: 'Automatic' },
  { brand: 'Mazda', model: 'CX-5 Premium', bodyType: 'SUV', basePrice: 36800, hp: 187, topSpeed: 200, accel: 8.3, engine: 2.5, fuel: 'Petrol', drive: 'AWD', trans: 'Automatic' },
  { brand: 'Subaru', model: 'Outback Wilderness', bodyType: 'SUV', basePrice: 38200, hp: 260, topSpeed: 210, accel: 6.1, engine: 2.4, fuel: 'Petrol', drive: 'AWD', trans: 'Automatic' },
  { brand: 'Subaru', model: 'WRX STI', bodyType: 'Sedan', basePrice: 44800, hp: 310, topSpeed: 255, accel: 4.8, engine: 2.4, fuel: 'Petrol', drive: 'AWD', trans: 'Manual' },
  { brand: 'Honda', model: 'Odyssey Elite', bodyType: 'Van', basePrice: 50600, hp: 280, topSpeed: 190, accel: 7.0, engine: 3.5, fuel: 'Petrol', drive: 'FWD', trans: 'Automatic' },
];

const COLOR_PAIRS: [string, string][] = [
  ['Alpine White', 'Black Dakota Leather'],
  ['Black Sapphire', 'Coral Red Leather'],
  ['Mineral Grey', 'Ivory White Leather'],
  ['Portofino Blue', 'Tartufo Brown Leather'],
  ['Designo Diamond White', 'Macchiato Beige Leather'],
  ['Obsidian Black', 'Nappa Black Leather'],
  ['Selenite Grey', 'Black Nappa Leather'],
  ['Mythos Black', 'Rotor Grey Leather'],
  ['Nardo Grey', 'Black Fine Nappa'],
  ['Carrera White', 'Black Leather'],
  ['Guards Red', 'Black Leather'],
  ['Racing Yellow', 'Black Leather'],
  ['Midnight Silver', 'All Black'],
  ['Red Multi-Coat', 'Black & White'],
  ['Pearl White', 'Black Premium'],
  ['Atomic Silver', 'Rioja Red Leather'],
  ['Nebula Grey', 'Glacier White Leather'],
  ['Caviar', 'Black Leather'],
  ['Blueprint', 'Black Leather'],
  ['Soul Red Crystal', 'Black Leather'],
  ['Ice White', 'Black Leather'],
  ['Phantom Black', 'Black Leather'],
  ['Carpathian Grey', 'Ebony Leather'],
  ['Fuji White', 'Caraway Leather'],
];

const DESC_TEMPLATES = [
  'A meticulously maintained {brand} {model} with a full service history and a single previous owner. The cabin is spotless, the paint depth is consistent across all panels, and the tires have 80%+ tread remaining.',
  'This {year} {brand} {model} combines performance and daily comfort with rare balance. Recently inspected and reconditioned, including fresh fluids, new brake pads, and a detailed interior.',
  'A flagship {brand} {model} loaded with the desirable option packages. The infotainment, driver-assist, and premium audio systems have been tested and verified. Two keys, books, and floor mats included.',
  'One of the nicest {bodyType}s in our inventory. This {brand} {model} shows no accident history, has a clean title, and wears original paint verified with a depth gauge. Ready for immediate delivery.',
  'A performance-oriented {brand} {model} with the upgraded wheels, sport exhaust, and adaptive suspension. Carbon trim and upgraded brakes round out a package that feels far newer than the mileage suggests.',
];

const FEATURE_POOL = [
  'Adaptive cruise control', 'Lane keep assist', 'Blind-spot monitoring', 'Heads-up display',
  'Panoramic sunroof', 'Harman Kardon audio', 'Burmester audio', 'Bowers & Wilkins audio',
  'Heated front seats', 'Ventilated front seats', 'Heated rear seats', 'Memory seats',
  'Wireless Apple CarPlay', 'Wireless Android Auto', '360° camera', 'Parking sensors',
  'Power tailgate', 'Hands-free tailgate', 'Wireless charging', 'Digital cockpit',
  'Matrix LED headlights', 'Ambient lighting', 'Sport package', 'M Sport package',
  'AMG Line exterior', 'Black optic package', 'Carbon trim', 'Burmester sound',
  'Adaptive M suspension', 'Air suspension', 'Rear-wheel steering', 'LSD',
  'Sport exhaust', 'Ceramic brakes', 'Pano roof', 'Massage seats',
];

const CONDITION_BY_INDEX = ['New', 'Certified Pre-Owned', 'Used'] as const;

function seedRand(seed: number) {
  let s = seed;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

const PHOTOS: Record<BodyType, string[]> = {
  Coupe: [
    'https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&cs=tinysrgb&w=1280',
    'https://images.pexels.com/photos/707046/pexels-photo-707046.jpeg?auto=compress&cs=tinysrgb&w=1280',
    'https://images.pexels.com/photos/1592384/pexels-photo-1592384.jpeg?auto=compress&cs=tinysrgb&w=1280',
  ],
  Sedan: [
    'https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?auto=compress&cs=tinysrgb&w=1280',
    'https://images.pexels.com/photos/210019/pexels-photo-210019.jpeg?auto=compress&cs=tinysrgb&w=1280',
    'https://images.pexels.com/photos/120049/pexels-photo-120049.jpeg?auto=compress&cs=tinysrgb&w=1280',
  ],
  SUV: [
    'https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg?auto=compress&cs=tinysrgb&w=1280',
    'https://images.pexels.com/photos/331690/pexels-photo-331690.jpeg?auto=compress&cs=tinysrgb&w=1280',
    'https://images.pexels.com/photos/3954571/pexels-photo-3954571.jpeg?auto=compress&cs=tinysrgb&w=1280',
  ],
  Convertible: [
    'https://images.pexels.com/photos/372946/pexels-photo-372946.jpeg?auto=compress&cs=tinysrgb&w=1280',
    'https://images.pexels.com/photos/39897/pexels-photo-39897.jpeg?auto=compress&cs=tinysrgb&w=1280',
    'https://images.pexels.com/photos/2873571/pexels-photo-2873571.jpeg?auto=compress&cs=tinysrgb&w=1280',
  ],
  Hatchback: [
    'https://images.pexels.com/photos/3954571/pexels-photo-3954571.jpeg?auto=compress&cs=tinysrgb&w=1280',
    'https://images.pexels.com/photos/210019/pexels-photo-210019.jpeg?auto=compress&cs=tinysrgb&w=1280',
    'https://images.pexels.com/photos/120049/pexels-photo-120049.jpeg?auto=compress&cs=tinysrgb&w=1280',
  ],
  Truck: [
    'https://images.pexels.com/photos/2676551/pexels-photo-2676551.jpeg?auto=compress&cs=tinysrgb&w=1280',
    'https://images.pexels.com/photos/331690/pexels-photo-331690.jpeg?auto=compress&cs=tinysrgb&w=1280',
  ],
  Van: [
    'https://images.pexels.com/photos/1078910/pexels-photo-1078910.jpeg?auto=compress&cs=tinysrgb&w=1280',
    'https://images.pexels.com/photos/3954571/pexels-photo-3954571.jpeg?auto=compress&cs=tinysrgb&w=1280',
  ],
};

function slugify(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

export function generateCars(): Car[] {
  const rand = seedRand(42);
  const cars: Car[] = [];
  SPECS.forEach((spec, i) => {
    const year = 2022 + (i % 4); // 2022-2025
    const isUsed = (i % 3) === 2;
    const isCPO = (i % 3) === 1;
    const condition = isUsed ? 'Used' : isCPO ? 'Certified Pre-Owned' : 'New';
    const mileage = condition === 'New' ? 0 : Math.floor(rand() * 60000) + 5000;
    const priceAdj = (1 - (2025 - year) * 0.06) * (1 - mileage / 400000);
    const price = Math.round((spec.basePrice * USD_TO_PKR_RATE * priceAdj) / 100) * 100;
    const [color, interior] = COLOR_PAIRS[i % COLOR_PAIRS.length];
    const desc = DESC_TEMPLATES[i % DESC_TEMPLATES.length]
      .replace('{brand}', spec.brand)
      .replace('{model}', spec.model)
      .replace('{year}', String(year))
      .replace('{bodyType}', spec.bodyType);
    const featCount = 8 + (i % 6);
    const features: string[] = [];
    const pool = [...FEATURE_POOL];
    for (let f = 0; f < featCount; f++) {
      const idx = Math.floor(rand() * pool.length);
      features.push(pool.splice(idx, 1)[0]);
    }
    const photos = PHOTOS[spec.bodyType];
    const images = [
      photos[i % photos.length],
      photos[(i + 1) % photos.length],
      photos[(i + 2) % photos.length],
    ];
    const statusRoll = rand();
    const status = statusRoll > 0.9 ? 'sold' : statusRoll > 0.8 ? 'reserved' : 'available';
    const featured = i % 6 === 0 || i % 7 === 0;
    const createdAt = new Date(Date.now() - i * 36e5 * 12).toISOString();
    const id = `car_${(i + 1).toString().padStart(3, '0')}`;
    const slug = `${slugify(spec.brand)}-${slugify(spec.model)}-${year}`;
    cars.push({
      id,
      slug,
      brand: spec.brand,
      model: spec.model,
      year,
      price,
      mileage,
      bodyType: spec.bodyType,
      fuelType: spec.fuel,
      transmission: spec.trans,
      drivetrain: spec.drive,
      engineSize: spec.engine,
      horsepower: spec.hp,
      topSpeed: spec.topSpeed,
      acceleration: spec.accel,
      seats: spec.bodyType === 'Coupe' || spec.bodyType === 'Convertible' ? 4 : 5,
      doors: spec.bodyType === 'Coupe' ? 2 : spec.bodyType === 'Convertible' ? 2 : 4,
      color,
      interiorColor: interior,
      description: desc,
      features,
      images,
      condition,
      status,
      featured,
      createdAt,
      updatedAt: createdAt,
    });
  });
  return cars;
}

export const CARS = generateCars();

export function getCarById(id: string): Car | undefined {
  return CARS.find((c) => c.id === id);
}
export function getCarBySlug(slug: string): Car | undefined {
  return CARS.find((c) => c.slug === slug);
}
